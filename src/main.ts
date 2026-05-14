import "./styles.css";
import { LocalGameBackend } from "./core/backend";
import { gameConfig } from "./core/config";
import {
  addSceneHotspot,
  collectOffline,
  createInitialState,
  generatePersonality,
  recordAdView,
  setSceneChallengeActive,
  sortEvidence,
  unlockCard,
  upgradeFacility
} from "./core/state";
import type { EmotionId, InvestigationScene, PlayerState, SceneInvestigationState } from "./core/types";
import { renderInvestigationView } from "./features/investigationView";
import { renderSortingView } from "./features/sortingView";
import { WebAdapter } from "./platform/webAdapter";

const storageKey = "fortune-game-state-v2";
const sortCountKey = "fortune-sort-count-v2";
const platform = new WebAdapter();
const backend = new LocalGameBackend(gameConfig);
let currentUserId = "local_player";
let state = loadState();
let activeScene: InvestigationScene = cloneScene(gameConfig.scenes[0]);
let selectedEvidenceId = state.foundEvidenceIds[0] ?? "";
let hintedHotspotId = "";
let justFoundHotspotId = "";
let sceneReaction: "celebrate" | "deflate" | "" = "";
let toast = "抓住偷走注意力的噪声。";
let sortCount = Number(localStorage.getItem(sortCountKey) ?? "0");
let justFoundHotspotTimer: number | undefined;
let sceneReactionTimer: number | undefined;
let systemsOpen = false;

const appContainer = document.querySelector<HTMLDivElement>("#app");
if (!appContainer) {
  throw new Error("Missing app container");
}

const app = appContainer;

void platform.login().then((user) => {
  currentUserId = user.userId;
  platform.reportEvent("login_success", { ...user });
  render();
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

  for (const [index, scene] of gameConfig.scenes.entries()) {
    const stored = storedSceneProgress[scene.id];
    sceneProgress[scene.id] = {
      challengeActive: stored?.challengeActive ?? false,
      foundHotspotIds:
        stored?.foundHotspotIds ??
        (index === 0
          ? scene.hotspots
              .filter((hotspot) => nextState.foundEvidenceIds.includes(hotspot.evidenceId))
              .map((hotspot) => hotspot.id)
          : [])
    };
  }

  return {
    ...initialState,
    ...nextState,
    resources: { ...initialState.resources, ...nextState.resources },
    facilities: { ...initialState.facilities, ...nextState.facilities },
    sceneProgress
  };
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function cloneScene(scene: InvestigationScene): InvestigationScene {
  const sceneProgress = getSceneState(scene.id);
  return { ...scene, hotspots: scene.hotspots.map((hotspot) => ({ ...hotspot, found: sceneProgress.foundHotspotIds.includes(hotspot.id) })) };
}

function getSceneState(sceneId: string): SceneInvestigationState {
  return state.sceneProgress[sceneId] ?? { challengeActive: false, foundHotspotIds: [] };
}

function setState(nextState: PlayerState) {
  state = nextState;
  activeScene = cloneScene(activeScene);
  saveState();
  render();
}

function clearFoundPulse() {
  if (justFoundHotspotTimer) {
    window.clearTimeout(justFoundHotspotTimer);
    justFoundHotspotTimer = undefined;
  }
  justFoundHotspotId = "";
}

function clearSceneReaction() {
  if (sceneReactionTimer) {
    window.clearTimeout(sceneReactionTimer);
    sceneReactionTimer = undefined;
  }
  sceneReaction = "";
}

function triggerSceneReaction(nextReaction: "celebrate" | "deflate", durationMs = 900) {
  clearSceneReaction();
  sceneReaction = nextReaction;
  sceneReactionTimer = window.setTimeout(() => {
    clearSceneReaction();
    render();
  }, durationMs);
}

function render() {
  const activeSceneState = getSceneState(activeScene.id);
  const challengeActive = activeSceneState.challengeActive;
  const personality = generatePersonality(gameConfig, state);
  const foundEvidences = state.foundEvidenceIds.map((id) => gameConfig.evidences[id]).filter(Boolean);
  const foundInActiveScene = activeScene.hotspots
    .filter((hotspot) => hotspot.found)
    .map((hotspot) => gameConfig.evidences[hotspot.evidenceId]?.title)
    .filter(Boolean);
  const selectedEvidence = gameConfig.evidences[selectedEvidenceId] ?? foundEvidences[0];
  const foundInScene = activeScene.hotspots.filter((hotspot) => hotspot.found).length;
  const totalInScene = activeScene.hotspots.length;
  const activeSceneComplete = totalInScene > 0 && foundInScene >= totalInScene;
  const sceneFindTarget = totalInScene;
  const activeSceneIndex = gameConfig.scenes.findIndex((scene) => scene.id === activeScene.id);
  const upgradedFacilities = Object.values(state.facilities).filter((level) => level > 1).length;
  const challengeSteps = [
    { label: `抓出 ${sceneFindTarget} 个噪声`, done: activeSceneComplete, value: `${Math.min(sceneFindTarget, foundInScene)}/${sceneFindTarget}` },
    { label: "投入处理机", done: sortCount >= 2, value: `${Math.min(2, sortCount)}/2` },
    { label: "升级幻想所", done: upgradedFacilities >= 1, value: `${Math.min(1, upgradedFacilities)}/1` },
    { label: "生成今日人设", done: foundInScene >= 1, value: foundInScene >= 1 ? "可开" : "憋着" }
  ];
  const completion = challengeSteps.filter((step) => step.done).length;
  const hasProgress = challengeActive || foundInScene > 0;
  const showResourceBelt = activeSceneComplete && systemsOpen;
  const showProcessingSystems = activeSceneComplete && systemsOpen;
  const nextScene = gameConfig.scenes[activeSceneIndex + 1];
  const leaderboard = backend.getFriendLeaderboard(currentUserId, state);

  app.innerHTML = `
    <main class="game-shell">
      <section class="game-phone ${hasProgress ? "is-started" : "is-idle"}">
        <header class="game-top">
          <div>
            <h1>暴富幻想所</h1>
          </div>
          <button class="secondary compact" data-action="reset">重置</button>
        </header>

        ${renderInvestigationView({
          activeScene,
          sceneOptions: gameConfig.scenes.map((scene) => ({ id: scene.id, name: scene.name })),
          themeLabel: `第${Math.max(1, activeSceneIndex + 1)}间处理室`,
          challengeActive,
          hintedHotspotId,
          justFoundHotspotId,
          sceneReaction,
          foundCount: foundInScene,
          totalCount: totalInScene,
          foundItemTitles: foundInActiveScene,
          toast,
          description: activeScene.description,
          nextSceneId: nextScene?.id,
          nextSceneName: nextScene?.name,
          challengeLabel: challengeActive ? "继续还魂" : "开始还魂",
          hintLabel: "给个提示",
          selectedEvidenceId
        })}

        ${
          activeSceneComplete
            ? `
              <section class="completion-dock">
                <span class="evidence-bag" aria-hidden="true">
                  <i></i><i></i><i></i>
                </span>
                <div>
                  <span>证据袋已封口</span>
                  <strong>${foundInActiveScene.length} 份证据已装袋</strong>
                </div>
                <button class="light" data-action="toggle-systems">${systemsOpen ? "收起回收线" : "封袋回收"}</button>
              </section>
            `
            : ""
        }

        ${
          showResourceBelt
            ? `
              <section class="resource-belt">
                ${Object.entries(gameConfig.emotions)
                  .map(([id, label]) => `<div class="resource-chip"><span>${label}</span><b>${state.resources[id as EmotionId]}</b></div>`)
                  .join("")}
              </section>
            `
            : ""
        }
      </section>

      ${
        showProcessingSystems
          ? `
            <section class="play-board">
              ${renderSortingView({
                emotions: gameConfig.emotions,
                foundEvidences,
                selectedEvidence,
                sortCount,
                progress: { current: Math.min(2, sortCount), target: 2 },
                title: "幻想处理线",
                subtitle: "把噪声丢进最像的处理机",
                adLabel: "广告双倍",
                emptyMessage: "处理线空转中。先去图里抓一个暴富噪声。"
              })}

              <article class="result-panel">
                <div class="panel-head">
                  <div>
                    <p class="eyebrow">今日结果</p>
                    <h2>${personality.name}</h2>
                  </div>
                  <button class="ghost" data-action="share">分享人格</button>
                </div>
                <p class="personality">${personality.description}</p>
                <div class="result-card">
                  <span>踏空指数</span>
                  <strong>${Math.min(99, 38 + state.resources.breakdown + state.resources.envy)}%</strong>
                  <small>娱乐指数，不构成任何投资建议</small>
                </div>
                <div class="challenge-mini">
                  <div><span>进度</span><strong>${completion}/${challengeSteps.length}</strong></div>
                  ${challengeSteps.map((step) => `<p class="${step.done ? "done" : ""}">${step.label}<em>${step.value}</em></p>`).join("")}
                </div>
                ${renderFriendLeaderboard(leaderboard)}
              </article>
            </section>
          `
          : ""
      }

      ${
        showProcessingSystems
          ? `
            <section class="bottom-board">
              <article class="facility-board">
                <div class="board-head">
                  <div>
                    <p class="eyebrow">幻想所后台</p>
                    <h2>收完顺手升级，明天继续发财幻想</h2>
                  </div>
                  <button data-action="offline">收菜</button>
                </div>
                <div class="facility-list">
                  ${gameConfig.facilities
                    .map((facility) => {
                      const level = state.facilities[facility.id] ?? 1;
                      const cost = level * 25;
                      const canUpgrade = state.resources[facility.emotion] >= cost;
                      return `
                        <button class="facility ${canUpgrade ? "ready" : ""}" data-action="upgrade" data-id="${facility.id}">
                          <span>
                            <strong>${facility.name} Lv.${level}</strong>
                            <small>${facility.description}</small>
                          </span>
                          <em>${canUpgrade ? "可升级" : `${gameConfig.emotions[facility.emotion]} ${cost}`}</em>
                        </button>
                      `;
                    })
                    .join("")}
                </div>
              </article>
              <article class="collection-board">
                <div class="board-head">
                  <div>
                    <p class="eyebrow">热点卡</p>
                    <h2>把今天的离谱东西收进图鉴</h2>
                  </div>
                  <button data-action="unlock-card">开卡</button>
                </div>
                <div class="cards">
                  ${state.collectedCardIds
                    .map((id) => gameConfig.cards.find((card) => card.id === id))
                    .filter(Boolean)
                    .map((card) => `<div class="card"><strong>${card!.title}</strong><span>${card!.text}</span></div>`)
                    .join("") || `<p class="empty">还没有热点卡。去解锁第一张。</p>`}
                </div>
              </article>
            </section>
          `
          : ""
      }
    </main>
  `;

  bindEvents();
}

function bindEvents() {
  app.querySelectorAll<HTMLElement>("[data-action]").forEach((element) => {
    element.addEventListener("click", async () => {
      const action = element.dataset.action;
      if (action === "hotspot") handleHotspot(element.dataset.id ?? "");
      if (action === "upgrade") setState(upgradeFacility(gameConfig, state, element.dataset.id ?? ""));
      if (action === "offline") setState(collectOffline(gameConfig, state));
      if (action === "unlock-card") setState(unlockCard(gameConfig, state));
      if (action === "hint-ad") await rewardHint();
      if (action === "sort-ad") await rewardSortDouble();
      if (action === "share") await sharePersonality();
      if (action === "reset") resetDemo();
      if (action === "start-challenge") startChallenge();
      if (action === "next-scene") selectScene(element.dataset.id ?? "");
      if (action === "scene-tab") selectScene(element.dataset.id ?? "");
      if (action === "toggle-systems") {
        systemsOpen = !systemsOpen;
        render();
      }
      if (action === "sort") handleSort(element.dataset.emotion as EmotionId, 1);
      if (action === "pick-evidence") {
        selectedEvidenceId = element.dataset.id ?? "";
        toast = "换个噪声，重新判断该丢哪台机器。";
        render();
      }
    });
  });

  app.querySelector<HTMLSelectElement>('[data-action="scene"]')?.addEventListener("change", (event) => {
    const sceneId = (event.target as HTMLSelectElement).value;
    selectScene(sceneId);
  });

  app.querySelector<HTMLSelectElement>('[data-action="evidence"]')?.addEventListener("change", (event) => {
    selectedEvidenceId = (event.target as HTMLSelectElement).value;
    render();
  });
}

function selectScene(sceneId: string) {
  const scene = gameConfig.scenes.find((item) => item.id === sceneId);
  if (!scene) return;

  activeScene = cloneScene(scene);
  hintedHotspotId = "";
  systemsOpen = false;
  clearFoundPulse();
  clearSceneReaction();
  toast = getSceneState(scene.id).challengeActive ? "继续扫，场景里还有噪声。" : "抓住偷走注意力的噪声。";
  render();
}

function handleHotspot(hotspotId: string) {
  const challengeActive = getSceneState(activeScene.id).challengeActive;
  if (!challengeActive) return;
  const hotspot = activeScene.hotspots.find((item) => item.id === hotspotId);
  if (!hotspot || hotspot.found) return;
  const willComplete = activeScene.hotspots.every((item) => item.found || item.id === hotspotId);
  selectedEvidenceId = hotspot.evidenceId;
  hintedHotspotId = "";
  justFoundHotspotId = hotspotId;
  triggerSceneReaction("celebrate", willComplete ? 1200 : 800);
  if (justFoundHotspotTimer) window.clearTimeout(justFoundHotspotTimer);
  justFoundHotspotTimer = window.setTimeout(() => {
    clearFoundPulse();
    render();
  }, 700);
  const evidence = gameConfig.evidences[hotspot.evidenceId];
  toast = evidence.counterText ?? "继续扫，场景里还有噪声。";
  platform.reportEvent("hotspot_found", { sceneId: activeScene.id, evidenceId: hotspot.evidenceId });
  if (willComplete) {
    toast = activeScene.completeText ?? `${activeScene.name} 的噪声收齐了。`;
  }
  setState(addSceneHotspot(state, activeScene.id, hotspot.id, hotspot.evidenceId));
}

function handleSort(emotion: EmotionId, multiplier: number) {
  if (!selectedEvidenceId) return;
  const result = sortEvidence(gameConfig, state, selectedEvidenceId, emotion, multiplier);
  sortCount += 1;
  localStorage.setItem(sortCountKey, String(sortCount));
  toast = result.result.correct
    ? `投得准，回收 ${result.result.gained} 点${gameConfig.emotions[result.result.emotion]}。`
    : `也行，处理线照单全收 ${result.result.gained} 点。`;
  triggerSceneReaction(result.result.correct ? "celebrate" : "deflate", result.result.correct ? 800 : 900);
  platform.reportEvent("sort_challenge_finish", { ...result.result });
  setState(result.state);
}

function startChallenge() {
  toast = `抓出 ${activeScene.hotspots.length} 个正在污染工位的噪声。`;
  document.querySelector(".game-stage")?.scrollIntoView({ behavior: "auto", block: "start" });
  setState(setSceneChallengeActive(state, activeScene.id, true));
}

async function rewardHint() {
  const challengeActive = getSceneState(activeScene.id).challengeActive;
  if (!challengeActive) {
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
  const next = activeScene.hotspots.find((hotspot) => !hotspot.found);
  hintedHotspotId = next?.id ?? "";
  render();
}

async function rewardSortDouble() {
  if (!selectedEvidenceId) return;
  const placement = backend.getAdPlacement("sort_double", state);
  if (!placement.available) {
    toast = placement.reason ?? "处理线广告位今天已经满负荷。";
    render();
    return;
  }
  const ad = await platform.showRewardedAd("sort_double");
  toast = "机器加压了，这次噪声翻倍回收。";
  if (ad.completed) {
    state = recordAdView(state, "sort_double");
    saveState();
    handleSort(gameConfig.evidences[selectedEvidenceId].emotion, placement.rewardMultiplier);
  }
}

async function sharePersonality() {
  const personality = generatePersonality(gameConfig, state);
  toast = `今日嘴脸：${personality.name}。`;
  await platform.share({
    title: `今日财富人格：${personality.name}。${personality.description}`
  });
  platform.reportEvent("share_success", { personalityId: personality.id });
}

function resetDemo() {
  localStorage.removeItem(storageKey);
  localStorage.removeItem(sortCountKey);
  state = createInitialState(gameConfig);
  sortCount = 0;
  hintedHotspotId = "";
  clearFoundPulse();
  clearSceneReaction();
  selectedEvidenceId = "";
  systemsOpen = false;
  activeScene = cloneScene(gameConfig.scenes[0]);
  toast = "抓住偷走注意力的噪声。";
  render();
}

function renderFriendLeaderboard(leaderboard: ReturnType<LocalGameBackend["getFriendLeaderboard"]>): string {
  return `
    <div class="friend-leaderboard">
      <div class="friend-leaderboard-head">
        <span>好友榜</span>
        <small>本地模拟，后续替换微信关系链</small>
      </div>
      ${leaderboard
        .slice(0, 4)
        .map(
          (entry, index) => `
            <div class="friend-rank ${entry.isCurrentUser ? "current" : ""}">
              <b>${index + 1}</b>
              <span>
                <strong>${escapeHtml(entry.nickname)}</strong>
                <small>${escapeHtml(entry.badge)} · ${entry.completedLevels}/${gameConfig.scenes.length} 关</small>
              </span>
              <em>${entry.score}</em>
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
