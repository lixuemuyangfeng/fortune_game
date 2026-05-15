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
          <button class="secondary compact" data-action="reset">重置</button>
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
                  <span>${progress.complete ? "已完成" : "当前目标"}</span>
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
      if (action === "hint-ad") await rewardHint();
      if (action === "reset") resetDemo();
      if (action === "start-challenge") startChallenge();
      if (action === "next-scene") showNextScenePlaceholder();
    });
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

  toast = "第三关入口已占位：刮刮泪便利站会在后续 Phaser 阶段接入。";
  nextScenePlaceholderActive = true;
  render();
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

function getNarrative(scene: InvestigationScene, challengeActive: boolean, foundCount: number, totalCount: number, complete: boolean): string {
  if (complete && nextScenePlaceholderActive) return toast;
  if (complete) return getSceneMeta(scene.id).completeNarrative;
  if (challengeActive && foundCount > 0) return `已回收 ${foundCount}/${totalCount} 个诱因。${toast}`;
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
      goal: "找齐 5 个接盘证据",
      goalDetail: "抓出 5 个把追高伪装成理性的嘴硬证据。",
      completeGoal: "接盘已冷却",
      startAction: "开始冷却",
      continueAction: "继续冷却",
      startToast: "抓出 5 个正在给追高加温的嘴硬证据。",
      introNarrative: "把追高、快讯和嘴硬从天台风里拽出来。",
      completeNarrative: "天台终于降温，快讯、群聊和价格提醒都被贴上标签。"
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
