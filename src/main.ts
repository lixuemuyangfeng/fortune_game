import type Phaser from "phaser";
import "./styles.css";
import { LocalGameBackend } from "./core/backend";
import { gameConfig } from "./core/config";
import {
  addSceneHotspot,
  createInitialState,
  recordAdView,
  setCurrentScene,
  setSceneChallengeActive
} from "./core/state";
import type { InvestigationScene, PlayerState, SceneInvestigationState } from "./core/types";
import { createInvestigationGame } from "./game";
import { getOfficeProgress } from "./game/systems/progressSystem";
import { PhaserPlatformBridge } from "./game/systems/platformBridge";
import { WebAdapter } from "./platform/webAdapter";

const storageKey = "fortune-game-state-v3";
const officeSceneId = "office";
const rooftopSceneId = "rooftop";
const convenienceSceneId = "convenience";
const socialSceneId = "social";
const aiLaunchSceneId = "ai_launch";
const meetingSceneId = "meeting";
const platform = new WebAdapter();
const platformBridge = new PhaserPlatformBridge(platform);
const backend = new LocalGameBackend(gameConfig);
let state = loadState();
let toast = "抓住偷走注意力的噪声。";
let hintedHotspotId = "";
let justFoundHotspotId = "";
let nextScenePlaceholderActive = false;
let justFoundHotspotTimer: number | undefined;
let phaserGame: Phaser.Game | undefined;
const localDevToolsEnabled = getViteDevMode() && isLocalRuntime();

const appContainer = document.querySelector<HTMLDivElement>("#app");
if (!appContainer) {
  throw new Error("Missing app container");
}
const app = appContainer;

void platform.login().then((user) => {
  platform.reportEvent("login_success", { ...user });
});

render();

function loadState(): PlayerState {
  const raw = localStorage.getItem(storageKey);
  if (!raw) return createInitialState(gameConfig);

  try {
    return normalizeState({ ...createInitialState(gameConfig), ...JSON.parse(raw) } as PlayerState);
  } catch {
    return createInitialState(gameConfig);
  }
}

function normalizeState(nextState: PlayerState): PlayerState {
  const initialState = createInitialState(gameConfig);
  const storedSceneProgress = nextState.sceneProgress ?? {};
  const sceneProgress = { ...initialState.sceneProgress };

  for (const scene of gameConfig.scenes) {
    const stored = storedSceneProgress[scene.id];
    sceneProgress[scene.id] = {
      challengeActive: stored?.challengeActive ?? false,
      foundHotspotIds: stored?.foundHotspotIds ?? []
    };
  }

  return {
    ...initialState,
    ...nextState,
    currentSceneId: gameConfig.scenes.some((scene) => scene.id === nextState.currentSceneId) ? nextState.currentSceneId : officeSceneId,
    sceneProgress
  };
}

function saveState(): void {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function getActiveScene(): InvestigationScene {
  const scene = gameConfig.scenes.find((item) => item.id === state.currentSceneId) ?? gameConfig.scenes.find((item) => item.id === officeSceneId);
  if (!scene) {
    throw new Error("Active scene is missing from config");
  }
  return scene;
}

function getSceneState(sceneId: string): SceneInvestigationState {
  return state.sceneProgress[sceneId] ?? { challengeActive: false, foundHotspotIds: [] };
}

function setState(nextState: PlayerState): void {
  state = nextState;
  saveState();
  render();
}

function clearFoundPulse(): void {
  if (justFoundHotspotTimer) {
    window.clearTimeout(justFoundHotspotTimer);
    justFoundHotspotTimer = undefined;
  }
  justFoundHotspotId = "";
}

function render(): void {
  const scene = getActiveScene();
  const sceneState = getSceneState(scene.id);
  const progress = getOfficeProgress(scene, sceneState.foundHotspotIds);
  const foundTitles = scene.hotspots
    .filter((hotspot) => sceneState.foundHotspotIds.includes(hotspot.id))
    .map((hotspot) => gameConfig.evidences[hotspot.evidenceId]?.title)
    .filter(Boolean);
  const nextButtonText = progress.complete ? "下一关入口" : "";
  const sceneMeta = getSceneMeta(scene.id);

  app.innerHTML = `
    <main class="game-shell phaser-shell">
      <section class="game-phone phaser-phone ${sceneState.challengeActive ? "is-started" : "is-idle"} ${progress.complete ? "is-complete" : ""}">
        <header class="game-top">
          <div>
            <h1>暴富幻想所</h1>
          </div>
          <div class="top-actions">
            ${renderLocalScenePicker(scene.id)}
            <button class="secondary compact" data-action="reset">重置</button>
          </div>
        </header>

        <section class="phaser-layout" data-scene-id="${escapeAttribute(scene.id)}">
          <aside class="mission-panel">
            <div class="case-header">
              <div class="case-meta">
                <span>${escapeHtml(sceneMeta.place)}</span>
                <span>${escapeHtml(sceneMeta.time)}</span>
              </div>
              <h2>${escapeHtml(scene.name)}</h2>
              <p>${escapeHtml(getNarrative(scene, sceneState.challengeActive, progress.foundCount, progress.totalCount, progress.complete))}</p>
            </div>

            <div class="case-progress">
              <div class="case-progress-head">
                <div>
                  <span>${progress.complete ? "收工" : "先做这件事"}</span>
                  <strong>${escapeHtml(progress.complete ? sceneMeta.completeGoal : sceneMeta.goal)}</strong>
                </div>
                <b>${progress.foundCount}/${progress.totalCount}</b>
              </div>
              <p>${escapeHtml(progress.complete ? scene.completeText ?? "现场噪声已处理。" : sceneMeta.goalDetail)}</p>
              <div class="progress-rail" aria-hidden="true"><i style="width:${Math.round((progress.foundCount / progress.totalCount) * 100)}%"></i></div>
              <div class="progress-dots" aria-hidden="true">
                ${Array.from({ length: progress.totalCount }, (_, index) => `<span class="${index < progress.foundCount ? "done" : ""}"><i></i></span>`).join("")}
              </div>
            </div>

            ${renderEvidenceBoard(foundTitles)}
          </aside>

          <div class="phaser-stage-wrap">
            <div id="phaser-game" class="phaser-game" aria-label="${escapeAttribute(`${scene.name} Phaser 游戏场景`)}"></div>
            ${renderAccessibilityHotspots(scene, sceneState, progress.complete)}
          </div>

          <div class="stage-actions phaser-actions">
            ${
              progress.complete
                ? `<button class="primary" data-action="next-scene">${nextButtonText}</button>`
                : `<button class="primary" data-action="start-challenge">${escapeHtml(sceneState.challengeActive ? sceneMeta.continueAction : sceneMeta.startAction)}</button>`
            }
            ${
              sceneState.challengeActive && !progress.complete
                ? `<button data-action="hint-ad">给个提示</button>`
                : ""
            }
          </div>
        </section>

        ${
          progress.complete
            ? `
              <section class="completion-dock">
                <span class="evidence-bag" aria-hidden="true">
                  <i></i><i></i><i></i>
                </span>
                <div>
                  <span>证据袋已封口</span>
                  <strong>${foundTitles.length} 份证据已装袋</strong>
                </div>
              </section>
            `
            : ""
        }
      </section>
    </main>
  `;

  mountOfficeGame(scene, sceneState);
  bindEvents();
}

function mountOfficeGame(scene: InvestigationScene, sceneState: SceneInvestigationState): void {
  phaserGame?.destroy(true);
  const parent = app.querySelector<HTMLElement>("#phaser-game");
  if (!parent) return;

  phaserGame = createInvestigationGame(parent, {
    scene,
    evidences: gameConfig.evidences,
    challengeActive: sceneState.challengeActive,
    hintedHotspotId,
    justFoundHotspotId,
    foundHotspotIds: sceneState.foundHotspotIds,
    onHotspotFound: handleHotspot,
    onMiss: handleMiss
  });
}

function renderEvidenceBoard(foundTitles: string[]): string {
  if (foundTitles.length === 0) {
    return `
      <div class="find-log empty-board" aria-live="polite">
        <span>证据板</span>
        <div><em>还没有封存的证据</em></div>
      </div>
    `;
  }

  return `
    <div class="find-log" aria-live="polite">
      <span>已找到</span>
      <div>
        ${foundTitles.map((title) => `<b>${escapeHtml(title)}</b>`).join("")}
      </div>
    </div>
  `;
}

function renderAccessibilityHotspots(scene: InvestigationScene, sceneState: SceneInvestigationState, complete: boolean): string {
  if (!sceneState.challengeActive || complete) return "";

  return `
    <div class="game-accessibility" aria-label="可点击线索">
      ${(scene.decoys ?? [])
        .map(
          (decoy) => `
            <button
              class="access-hotspot access-decoy"
              style="left:${toPercent(decoy.x)}%; top:${toPercent(decoy.y)}%; width:${toPercent(decoy.hitWidth)}%; height:${toPercent(decoy.hitHeight)}%;"
              data-action="decoy"
              data-id="${escapeAttribute(decoy.id)}"
              aria-label="${escapeAttribute(decoy.label)}"
            ></button>
          `
        )
        .join("")}
      ${scene.hotspots
        .filter((hotspot) => !sceneState.foundHotspotIds.includes(hotspot.id))
        .map(
          (hotspot) => `
            <button
              class="access-hotspot ${hotspot.id === hintedHotspotId ? "is-hinted" : ""}"
              style="left:${toPercent(hotspot.hitX ?? hotspot.x)}%; top:${toPercent(hotspot.hitY ?? hotspot.y)}%; width:${toPercent(hotspot.hitWidth ?? hotspot.radius * 2)}%; height:${toPercent(hotspot.hitHeight ?? hotspot.radius * 2)}%;"
              data-action="hotspot"
              data-id="${escapeAttribute(hotspot.id)}"
              aria-label="${escapeAttribute(hotspot.label)}"
            ></button>
          `
        )
        .join("")}
    </div>
  `;
}

function bindEvents(): void {
  app.querySelectorAll<HTMLElement>("[data-action]").forEach((element) => {
    element.addEventListener("click", async () => {
      const action = element.dataset.action;
      if (action === "hotspot") handleHotspot(element.dataset.id ?? "");
      if (action === "decoy") {
        handleMiss();
        render();
      }
      if (action === "hint-ad") await rewardHint();
      if (action === "reset") resetDemo();
      if (action === "start-challenge") startChallenge();
      if (action === "next-scene") showNextScenePlaceholder();
    });
  });

  const localScenePicker = app.querySelector<HTMLSelectElement>("[data-action='local-scene-picker']");
  localScenePicker?.addEventListener("change", () => {
    selectLocalScene(localScenePicker.value);
  });
}

function handleHotspot(hotspotId: string): void {
  const scene = getActiveScene();
  const sceneState = getSceneState(scene.id);
  if (!sceneState.challengeActive) return;

  const hotspot = scene.hotspots.find((item) => item.id === hotspotId);
  if (!hotspot || sceneState.foundHotspotIds.includes(hotspot.id)) return;

  const willComplete = scene.hotspots.every((item) => sceneState.foundHotspotIds.includes(item.id) || item.id === hotspotId);
  hintedHotspotId = "";
  justFoundHotspotId = hotspotId;
  nextScenePlaceholderActive = false;
  platformBridge.vibrate(willComplete ? 32 : 18);
  platformBridge.reportEvent("hotspot_found", { sceneId: scene.id, evidenceId: hotspot.evidenceId });

  if (justFoundHotspotTimer) window.clearTimeout(justFoundHotspotTimer);
  justFoundHotspotTimer = window.setTimeout(() => {
    clearFoundPulse();
    render();
  }, 900);

  const evidence = gameConfig.evidences[hotspot.evidenceId];
  toast = willComplete ? scene.completeText ?? "工位已回魂。" : evidence.counterText ?? "继续扫，场景里还有噪声。";
  setState(addSceneHotspot(state, scene.id, hotspot.id, hotspot.evidenceId));
}

function handleMiss(): void {
  toast = "这里暂时只有空响，别急着自证。";
}

function startChallenge(): void {
  const scene = getActiveScene();
  toast = getSceneMeta(scene.id).startToast;
  nextScenePlaceholderActive = false;
  setState(setSceneChallengeActive(state, scene.id, true));
}

async function rewardHint(): Promise<void> {
  const scene = getActiveScene();
  const sceneState = getSceneState(scene.id);
  if (!sceneState.challengeActive) {
    startChallenge();
    return;
  }

  const placement = backend.getAdPlacement("hint", state);
  if (!placement.available) {
    toast = placement.reason ?? "今天这个提示位先冷却一下。";
    render();
    return;
  }

  const ad = await platform.showRewardedAd("hint");
  if (!ad.completed) return;

  state = recordAdView(state, "hint");
  saveState();
  toast = "红圈借你一秒，噪声自己露头。";
  const next = scene.hotspots.find((hotspot) => !sceneState.foundHotspotIds.includes(hotspot.id));
  hintedHotspotId = next?.id ?? "";
  render();
}

function showNextScenePlaceholder(): void {
  const scene = getActiveScene();
  if (scene.id === officeSceneId) {
    toast = "天台风声接入，接盘冷却炉已预热。";
    nextScenePlaceholderActive = false;
    hintedHotspotId = "";
    clearFoundPulse();
    setState(setCurrentScene(state, rooftopSceneId));
    return;
  }
  if (scene.id === rooftopSceneId) {
    toast = "便利站灯还亮着，差一点怪圈已经开门。";
    nextScenePlaceholderActive = false;
    hintedHotspotId = "";
    clearFoundPulse();
    setState(setCurrentScene(state, convenienceSceneId));
    return;
  }
  if (scene.id === convenienceSceneId) {
    toast = "凌晨首页已经刷新，高光滤镜兽正在开屏。";
    nextScenePlaceholderActive = false;
    hintedHotspotId = "";
    clearFoundPulse();
    setState(setCurrentScene(state, socialSceneId));
    return;
  }
  if (scene.id === socialSceneId) {
    toast = "发布会还在自动连播，恐慌降噪器开始预热。";
    nextScenePlaceholderActive = false;
    hintedHotspotId = "";
    clearFoundPulse();
    setState(setCurrentScene(state, aiLaunchSceneId));
    return;
  }
  if (scene.id === aiLaunchSceneId) {
    toast = "玻璃会议室已经亮灯，责任切割机开始预热。";
    nextScenePlaceholderActive = false;
    hintedHotspotId = "";
    clearFoundPulse();
    setState(setCurrentScene(state, meetingSceneId));
    return;
  }

  toast = "画饼这波先切开了。母巢还在地下室接线，先把锅走完流程。";
  nextScenePlaceholderActive = true;
  render();
}

function selectLocalScene(sceneId: string): void {
  if (!localDevToolsEnabled) return;
  if (!gameConfig.scenes.some((scene) => scene.id === sceneId)) return;
  if (sceneId === state.currentSceneId) return;

  hintedHotspotId = "";
  nextScenePlaceholderActive = false;
  clearFoundPulse();
  const sceneName = gameConfig.scenes.find((scene) => scene.id === sceneId)?.name ?? sceneId;
  toast = `本机临时入口：已切到「${sceneName}」。`;
  setState(setCurrentScene(state, sceneId));
}

function renderLocalScenePicker(activeSceneId: string): string {
  if (!localDevToolsEnabled) return "";

  return `
    <label class="local-scene-picker">
      <span>本机选关</span>
      <select data-action="local-scene-picker" aria-label="本机临时选关">
        ${gameConfig.scenes
          .map(
            (scene) => `
              <option value="${escapeAttribute(scene.id)}" ${scene.id === activeSceneId ? "selected" : ""}>
                ${escapeHtml(scene.name)}
              </option>
            `
          )
          .join("")}
      </select>
    </label>
  `;
}

function resetDemo(): void {
  phaserGame?.destroy(true);
  localStorage.removeItem(storageKey);
  state = createInitialState(gameConfig);
  hintedHotspotId = "";
  nextScenePlaceholderActive = false;
  clearFoundPulse();
  toast = "抓住偷走注意力的噪声。";
  render();
}

function isLocalRuntime(): boolean {
  const { hostname } = window.location;
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1";
}

function getViteDevMode(): boolean {
  return Boolean((import.meta as ImportMeta & { env?: { DEV?: boolean } }).env?.DEV);
}

function getNarrative(scene: InvestigationScene, challengeActive: boolean, foundCount: number, totalCount: number, complete: boolean): string {
  if (complete && nextScenePlaceholderActive) return toast;
  if (complete) return getSceneMeta(scene.id).completeNarrative;
  if (challengeActive && foundCount > 0) return `已经抓到 ${foundCount}/${totalCount} 个破绽。${toast}`;
  if (challengeActive) return toast;
  return getSceneMeta(scene.id).introNarrative;
}

function getSceneMeta(sceneId: string): {
  place: string;
  time: string;
  goal: string;
  goalDetail: string;
  completeGoal: string;
  startAction: string;
  continueAction: string;
  startToast: string;
  introNarrative: string;
  completeNarrative: string;
} {
  if (sceneId === rooftopSceneId) {
    return {
      place: "字节跳桶公司天台",
      time: "周三 18:46",
      goal: "找出 6 个上头证据",
      goalDetail: "把这些人越聊越上头的证据找出来。",
      completeGoal: "这波先冷下来了",
      startAction: "开始冷却",
      continueAction: "继续冷却",
      startToast: "别急着劝，先把他们上头的证据一件件找出来。",
      introNarrative: "他们嘴上说稳健，手指已经快把价格刷冒烟了。",
      completeNarrative: "天台这波先冷下来了。群聊、快讯、价格提醒和合同边角都装进袋里。"
    };
  }
  if (sceneId === convenienceSceneId) {
    return {
      place: "福踩便利站",
      time: "周三 21:07",
      goal: "找出 7 个差一点仪式",
      goalDetail: "把柜台里那些劝你顺手加一张的东西找出来。",
      completeGoal: "幻想已断电",
      startAction: "开始断电",
      continueAction: "继续断电",
      startToast: "别急着付款，先看清楚是谁在劝你再来一张。",
      introNarrative: "他本来只想买无糖茶，柜台已经把差一点摆成一整排。",
      completeNarrative: "便利站这波先断电。废票、合影、备忘和那句这本快了都装进袋里。"
    };
  }
  if (sceneId === socialSceneId) {
    return {
      place: "周启明家里",
      time: "周四 01:30",
      goal: "找出 8 个滤镜裂缝",
      goalDetail: "把收益、房子、副业和祝福背后的成本找出来。",
      completeGoal: "比较心已降噪",
      startAction: "开始拆帧",
      continueAction: "继续拆帧",
      startToast: "别急着比较，先看清每张高光没拍进去的部分。",
      introNarrative: "他只是想睡前刷十分钟，屏幕已经把收益、房子和副业一起推过来。",
      completeNarrative: "收益图、进群邀请、课程截止、月供和没发出去的祝福都拆开了。"
    };
  }
  if (sceneId === aiLaunchSceneId) {
    return {
      place: "周启明家里",
      time: "周四 02:00",
      goal: "找出 9 个恐慌放大器",
      goalDetail: "把发布会、课程、旧系统和审批流程里真正吓人的部分分开。",
      completeGoal: "替代恐慌已降噪",
      startAction: "开始降噪",
      continueAction: "继续降噪",
      startToast: "别急着报名转型，先把恐慌是从哪里来的找出来。",
      introNarrative: "发布会很顺，课程很急，桌上的旧系统和审批单一点也不配合。",
      completeNarrative: "演示、课程、旧令牌、盖章队列和老板追问都被拆开了。AI 可以用，恐慌不用买。"
    };
  }
  if (sceneId === meetingSceneId) {
    return {
      place: "字节跳桶玻璃会议室",
      time: "周四 09:00",
      goal: "找出 10 个甩锅接口",
      goalDetail: "把机会、协同、预算和人手之间缺掉的部分找出来。",
      completeGoal: "画饼锅已切开",
      startAction: "开始切割",
      continueAction: "继续切割",
      startToast: "先别接锅，看看哪些资源只停在嘴上。",
      introNarrative: "屏幕上写着关键在协同，桌上的表格却只把周启明写进了流程。",
      completeNarrative: "空资源格、红叉风险、预算剪刀差、人头申请和周五日历都切开了。没有资源的机会，叫甩锅。"
    };
  }

  return {
    place: "字节跳桶开放办公区",
    time: "周三 15:27",
    goal: "找齐 5 个诱因",
    goalDetail: "找齐 5 个让工位失魂的诱因。",
    completeGoal: "工位已回魂",
    startAction: "开始还魂",
    continueAction: "继续还魂",
    startToast: "抓出 5 个正在污染工位的噪声。",
    introNarrative: "把行情、弹窗和嘴硬从工位里拽出来。",
    completeNarrative: "工位终于回魂，行情、弹窗和嘴硬都被贴上标签。"
  };
}

function toPercent(value: number): string {
  return String(Math.min(100, Math.max(0, value)));
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttribute(value: string): string {
  return escapeHtml(value);
}
