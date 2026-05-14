import "./styles.css";
import { LocalGameBackend } from "./core/backend";
import { gameConfig } from "./core/config";
import {
  addSceneHotspot,
  createInitialState,
  recordAdView,
  setSceneChallengeActive
} from "./core/state";
import type { InvestigationScene, PlayerState, SceneInvestigationState } from "./core/types";
import { renderInvestigationView } from "./features/investigationView";
import { WebAdapter } from "./platform/webAdapter";

const storageKey = "fortune-game-state-v2";
const platform = new WebAdapter();
const backend = new LocalGameBackend(gameConfig);
let state = loadState();
let activeScene: InvestigationScene = cloneScene(gameConfig.scenes[0]);
let selectedEvidenceId = state.foundEvidenceIds[0] ?? "";
let hintedHotspotId = "";
let justFoundHotspotId = "";
let sceneReaction: "celebrate" | "deflate" | "" = "";
let toast = "抓住偷走注意力的噪声。";
let justFoundHotspotTimer: number | undefined;
let sceneReactionTimer: number | undefined;

const appContainer = document.querySelector<HTMLDivElement>("#app");
if (!appContainer) {
  throw new Error("Missing app container");
}

const app = appContainer;

void platform.login().then((user) => {
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
  const foundInActiveScene = activeScene.hotspots
    .filter((hotspot) => hotspot.found)
    .map((hotspot) => gameConfig.evidences[hotspot.evidenceId]?.title)
    .filter(Boolean);
  const foundInScene = activeScene.hotspots.filter((hotspot) => hotspot.found).length;
  const totalInScene = activeScene.hotspots.length;
  const activeSceneComplete = totalInScene > 0 && foundInScene >= totalInScene;
  const activeSceneIndex = gameConfig.scenes.findIndex((scene) => scene.id === activeScene.id);
  const hasProgress = challengeActive || foundInScene > 0;
  const nextScene = gameConfig.scenes[activeSceneIndex + 1];

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
              </section>
            `
            : ""
        }
      </section>
    </main>
  `;

  bindEvents();
}

function bindEvents() {
  app.querySelectorAll<HTMLElement>("[data-action]").forEach((element) => {
    element.addEventListener("click", async () => {
      const action = element.dataset.action;
      if (action === "hotspot") handleHotspot(element.dataset.id ?? "");
      if (action === "hint-ad") await rewardHint();
      if (action === "reset") resetDemo();
      if (action === "start-challenge") startChallenge();
      if (action === "next-scene") selectScene(element.dataset.id ?? "");
    });
  });
}

function selectScene(sceneId: string) {
  const scene = gameConfig.scenes.find((item) => item.id === sceneId);
  if (!scene) return;

  activeScene = cloneScene(scene);
  hintedHotspotId = "";
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

function resetDemo() {
  localStorage.removeItem(storageKey);
  state = createInitialState(gameConfig);
  hintedHotspotId = "";
  clearFoundPulse();
  clearSceneReaction();
  selectedEvidenceId = "";
  activeScene = cloneScene(gameConfig.scenes[0]);
  toast = "抓住偷走注意力的噪声。";
  render();
}
