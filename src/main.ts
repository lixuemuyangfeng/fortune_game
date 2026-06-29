import type Phaser from "phaser";
import "./styles.css";
import { LocalGameBackend } from "./core/backend";
import type { DailyChallengeSnapshot, LeaderboardSnapshot } from "./core/backend";
import { gameConfig } from "./core/config";
import {
  addSceneHotspot,
  claimShareAssist,
  createInitialState,
  grantBooster,
  grantDailyAttempt,
  recordAdView,
  recordDailyAttempt,
  recordDailyClear,
  recordInviteLaunch,
  recordSceneMiss,
  recordSocialShare,
  reviveScene,
  setCurrentScene,
  setSceneChallengeActive,
  spendBooster
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
const nestSceneId = "nest";
const stockSceneId = "stock";
const mistakeLimit = 3;
const platform = new WebAdapter();
const platformBridge = new PhaserPlatformBridge(platform);
const backend = new LocalGameBackend(gameConfig);
let launchToast = "";
let state = loadState();
const socialContext = platform.getSocialContext?.();
if (socialContext?.fromShare) {
  state = applyShareAssist(state);
  saveState();
}
let toast = launchToast || "抓住偷走注意力的噪声。";
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
      foundHotspotIds: stored?.foundHotspotIds ?? [],
      missCount: stored?.missCount ?? 0,
      failed: stored?.failed ?? false
    };
  }

  return {
    ...initialState,
    ...nextState,
    currentSceneId: gameConfig.scenes.some((scene) => scene.id === nextState.currentSceneId) ? nextState.currentSceneId : officeSceneId,
    sceneProgress,
    economy: {
      ...initialState.economy,
      ...nextState.economy
    },
    socialStats: {
      ...initialState.socialStats,
      ...nextState.socialStats,
      claimedAssistKeys: nextState.socialStats?.claimedAssistKeys ?? []
    },
    dailyChallenge: {
      ...initialState.dailyChallenge,
      ...nextState.dailyChallenge,
      extraAttemptsToday: nextState.dailyChallenge?.extraAttemptsToday ?? 0,
      completedSceneIds: nextState.dailyChallenge?.completedSceneIds ?? []
    }
  };
}

function applyShareAssist(currentState: PlayerState): PlayerState {
  if (!socialContext?.fromShare) return currentState;

  const assistKey = socialContext.assistKey ?? `${socialContext.inviterId ?? "unknown"}:${socialContext.sceneId ?? "unknown"}:${socialContext.reward ?? "none"}`;
  if (currentState.socialStats.claimedAssistKeys.includes(assistKey)) {
    launchToast = "这个助力已经记过了，继续挑战。";
    return currentState;
  }

  let nextState = claimShareAssist(currentState, assistKey);
  if (socialContext.reward === "revive") {
    nextState = grantBooster(nextState, "reviveCard", 1);
    launchToast = "好友助力已到账，复活卡 +1。";
  } else if (socialContext.reward === "hint") {
    nextState = grantBooster(nextState, "hintTicket", 1);
    launchToast = "好友助力已到账，提示券 +1。";
  } else {
    nextState = grantBooster(nextState, "hintTicket", 1);
    launchToast = "好友战报已接收，提示券 +1。";
  }
  platform.reportEvent("share_assist_claimed", { reward: socialContext.reward ?? "hint", sceneId: socialContext.sceneId ?? "" });
  return nextState;
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
  return state.sceneProgress[sceneId] ?? { challengeActive: false, foundHotspotIds: [], missCount: 0, failed: false };
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
  const dailyChallenge = backend.getDailyChallenge(state);
  const leaderboard = backend.getLeaderboard(state);

  app.innerHTML = `
    <main class="game-shell phaser-shell">
      <section class="game-phone phaser-phone ${sceneState.challengeActive ? "is-started" : "is-idle"} ${sceneState.failed ? "is-failed" : ""} ${progress.complete ? "is-complete" : ""}">
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

            ${renderStatusToast()}
            <div class="case-progress">
              <div class="case-progress-head">
                <div>
                  <span>${progress.complete ? "收工" : "先做这件事"}</span>
                  <strong>${escapeHtml(progress.complete ? sceneMeta.completeGoal : sceneMeta.goal)}</strong>
                </div>
                <b>${progress.foundCount}/${progress.totalCount}</b>
              </div>
              <p>${escapeHtml(getProgressDetail(scene, sceneState, progress.complete, sceneMeta.goalDetail))}</p>
              <div class="progress-rail" aria-hidden="true"><i style="width:${Math.round((progress.foundCount / progress.totalCount) * 100)}%"></i></div>
              <div class="progress-dots" aria-hidden="true">
                ${Array.from({ length: progress.totalCount }, (_, index) => `<span class="${index < progress.foundCount ? "done" : ""}"><i></i></span>`).join("")}
              </div>
            </div>

            ${renderWechatGrowthPanel(dailyChallenge, leaderboard)}
            ${renderEvidenceBoard(foundTitles)}
          </aside>

          <div class="phaser-stage-wrap">
            <div id="phaser-game" class="phaser-game" aria-label="${escapeAttribute(`${scene.name} Phaser 游戏场景`)}"></div>
            ${renderAccessibilityHotspots(scene, sceneState, progress.complete)}
          </div>

          <div class="stage-actions phaser-actions">
            ${
              sceneState.failed && !progress.complete
                ? `
                  <button class="primary" data-action="revive-ad">看广告复活</button>
                  <button class="secondary" data-action="revive-card">${state.economy.reviveCard > 0 ? `用复活卡 ${state.economy.reviveCard}` : "分享拿复活卡"}</button>
                `
                : dailyChallenge.attemptsRemaining <= 0 && !sceneState.challengeActive && !progress.complete
                  ? `<button class="primary" data-action="extra-attempt-ad">看广告加体力</button>`
                  : progress.complete
                ? `<button class="primary" data-action="next-scene">${nextButtonText}</button>`
                : `<button class="primary" data-action="start-challenge">${escapeHtml(sceneState.challengeActive ? sceneMeta.continueAction : sceneMeta.startAction)}</button>`
            }
            ${
              sceneState.challengeActive && !sceneState.failed && !progress.complete
                ? `<button data-action="hint-ad">${state.economy.hintTicket > 0 ? `用提示券 ${state.economy.hintTicket}` : "看广告拿提示"}</button>`
                : ""
            }
            <button class="secondary" data-action="share-reward">分享领提示</button>
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
                  <strong>${foundTitles.length} 份证据已装袋，${escapeHtml(leaderboard.provinceName)} +${scene.hotspots.length * 3}</strong>
                  <small>${escapeHtml(dailyChallenge.goalComplete ? "今日目标已达成，可以继续冲群榜。" : `今日目标 ${dailyChallenge.clearsToday}/${dailyChallenge.clearGoal}`)}</small>
                </div>
                <button class="primary compact" data-action="share-clear">晒到群里</button>
                <button class="secondary compact" data-action="double-clear-ad">广告翻倍</button>
              </section>
            `
            : sceneState.failed
              ? `
                <section class="failure-dock">
                  <span>本局失误已满</span>
                  <strong>复活后保留已找证据，继续这局。</strong>
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
    challengeActive: sceneState.challengeActive && !sceneState.failed,
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

function renderStatusToast(): string {
  if (!toast || toast === "抓住偷走注意力的噪声。") return "";

  return `
    <div class="status-toast" aria-live="polite">
      ${escapeHtml(toast)}
    </div>
  `;
}

function getProgressDetail(scene: InvestigationScene, sceneState: SceneInvestigationState, complete: boolean, goalDetail: string): string {
  if (complete) return scene.completeText ?? "现场噪声已处理。";
  if (sceneState.failed) return `错点 ${mistakeLimit}/${mistakeLimit}，本局已失败。复活后保留已找到的证据。`;
  if (sceneState.challengeActive && sceneState.missCount > 0) return `${goalDetail} 失误 ${sceneState.missCount}/${mistakeLimit}。`;
  return goalDetail;
}

function renderWechatGrowthPanel(dailyChallenge: DailyChallengeSnapshot, leaderboard: LeaderboardSnapshot): string {
  const topFriend = leaderboard.friendRows[0];
  const selfFriend = leaderboard.friendRows.find((row) => row.relation === "self") ?? leaderboard.friendRows[1];

  return `
    <section class="wechat-growth-panel" aria-label="微信小游戏挑战">
      <div class="daily-strip">
        <div>
          <span>今日局</span>
          <strong>${dailyChallenge.clearsToday}/${dailyChallenge.clearGoal} 通关</strong>
        </div>
        <div>
          <span>连续</span>
          <strong>${dailyChallenge.streak} 天</strong>
        </div>
        <div>
          <span>体力</span>
          <strong>${dailyChallenge.attemptsRemaining}/${dailyChallenge.attemptsLimit}</strong>
        </div>
      </div>

      <div class="province-race">
        <div>
          <span>${escapeHtml(leaderboard.provinceName)}第 ${leaderboard.provinceRank}</span>
          <strong>${leaderboard.provinceScore.toLocaleString("zh-CN")}</strong>
        </div>
        <button class="compact light" data-action="open-province-rank">省队榜</button>
      </div>

      <div class="friend-race">
        <span>群榜</span>
        <p>你第 ${selfFriend.rank}，距 ${escapeHtml(topFriend.name)} 还差 ${Math.max(0, topFriend.score - selfFriend.score)} 分</p>
        <button class="compact secondary" data-action="open-friend-rank">好友榜</button>
      </div>

      <div class="booster-row" aria-label="道具库存">
        <span>提示券 ${state.economy.hintTicket}</span>
        <span>放大镜 ${state.economy.magnifier}</span>
        <span>复活卡 ${state.economy.reviveCard}</span>
      </div>
      <p class="daily-goal-note">${escapeHtml(dailyChallenge.goalComplete ? "今日目标已达成，继续冲群榜。" : `今日目标还差 ${dailyChallenge.clearGoal - dailyChallenge.clearsToday} 关。`)}</p>
    </section>
  `;
}

function renderAccessibilityHotspots(scene: InvestigationScene, sceneState: SceneInvestigationState, complete: boolean): string {
  if (!sceneState.challengeActive || sceneState.failed || complete) return "";

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
      }
      if (action === "hint-ad") await rewardHint();
      if (action === "share-reward") await shareForReward();
      if (action === "share-clear") await shareClearReport();
      if (action === "double-clear-ad") await doubleClearReward();
      if (action === "revive-ad") await reviveWithAd();
      if (action === "revive-card") await reviveWithCardOrShare();
      if (action === "extra-attempt-ad") await gainExtraAttempt();
      if (action === "open-friend-rank") await openLeaderboard("friend");
      if (action === "open-province-rank") await openLeaderboard("province");
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
  if (!sceneState.challengeActive || sceneState.failed) return;

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
  const nextState = addSceneHotspot(state, scene.id, hotspot.id, hotspot.evidenceId);
  setState(willComplete ? recordDailyClear(nextState, scene.id, scene.hotspots.length * 3) : nextState);
}

function handleMiss(): void {
  const scene = getActiveScene();
  const sceneState = getSceneState(scene.id);
  if (!sceneState.challengeActive || sceneState.failed) return;

  const nextState = recordSceneMiss(state, scene.id, mistakeLimit);
  const nextSceneState = nextState.sceneProgress[scene.id];
  toast = nextSceneState.failed
    ? "错点已满，本局失败。复活能保留已找到的证据。"
    : `这里暂时只有空响，剩余失误 ${mistakeLimit - nextSceneState.missCount} 次。`;
  platformBridge.vibrate(nextSceneState.failed ? 36 : 12);
  platform.reportEvent("scene_miss", { sceneId: scene.id, missCount: nextSceneState.missCount, failed: nextSceneState.failed });
  setState(nextState);
}

function startChallenge(): void {
  const scene = getActiveScene();
  const sceneState = getSceneState(scene.id);
  if (sceneState.challengeActive && !sceneState.failed) {
    toast = getSceneMeta(scene.id).startToast;
    render();
    return;
  }

  const dailyChallenge = backend.getDailyChallenge(state);
  if (dailyChallenge.attemptsRemaining <= 0) {
    toast = "今日体力用完了，可以看广告加一次挑战机会。";
    render();
    return;
  }

  toast = getSceneMeta(scene.id).startToast;
  nextScenePlaceholderActive = false;
  setState(setSceneChallengeActive(recordDailyAttempt(state), scene.id, true));
}

async function rewardHint(): Promise<void> {
  const scene = getActiveScene();
  const sceneState = getSceneState(scene.id);
  if (!sceneState.challengeActive) {
    startChallenge();
    return;
  }
  if (sceneState.failed) {
    toast = "本局已经失败，先复活再继续找。";
    render();
    return;
  }

  if (state.economy.hintTicket > 0) {
    state = spendBooster(state, "hintTicket", 1);
    saveState();
    revealNextHint("提示券已用，先看一个最靠近的破绽。");
    return;
  }

  const placement = backend.getAdPlacement("hint", state, scene.id);
  if (!placement.available) {
    toast = placement.reason ?? "今天这个提示位先冷却一下。";
    render();
    return;
  }

  const ad = await platform.showRewardedAd("hint");
  if (!ad.completed) return;

  state = recordAdView(state, `hint:${scene.id}`);
  saveState();
  revealNextHint("红圈借你一秒，噪声自己露头。");
}

function revealNextHint(message: string): void {
  const scene = getActiveScene();
  const sceneState = getSceneState(scene.id);
  toast = message;
  const next = scene.hotspots.find((hotspot) => !sceneState.foundHotspotIds.includes(hotspot.id));
  hintedHotspotId = next?.id ?? "";
  render();
}

async function shareForReward(): Promise<void> {
  const scene = getActiveScene();
  const today = new Date().toISOString().slice(0, 10);
  const rewardsToday = state.socialStats.shareRewardsDate === today ? state.socialStats.shareRewardsToday : 0;
  const rewardLimit = rewardsToday >= 3;
  const result = await platform.share({
    title: `我在暴富幻想所卡在「${scene.name}」，来帮我找一个破绽`,
    query: createShareQuery(scene.id, "hint")
  });
  if (!result.shared) return;

  let nextState = recordSocialShare(state, "friend", !rewardLimit);
  if (!rewardLimit) {
    nextState = grantBooster(nextState, "hintTicket", 1);
    toast = "分享已发出，提示券 +1。";
  } else {
    toast = "分享已发出，今天的分享奖励先到这里。";
  }
  platform.reportEvent("share_reward", { sceneId: scene.id, rewardGranted: !rewardLimit });
  setState(nextState);
}

async function shareClearReport(): Promise<void> {
  const scene = getActiveScene();
  const progress = getOfficeProgress(scene, getSceneState(scene.id).foundHotspotIds);
  const result = await platform.share({
    title: `我拆掉了「${scene.name}」${progress.foundCount}/${progress.totalCount} 个破绽，给${backend.getLeaderboard(state).provinceName}加分了`,
    query: createShareQuery(scene.id, "clear")
  });
  if (!result.shared) return;

  toast = "战报已发到群里，好友榜会刷新你的通关记录。";
  platform.reportEvent("share_clear_report", { sceneId: scene.id, foundCount: progress.foundCount });
  setState(recordSocialShare(state, "group", false));
}

async function doubleClearReward(): Promise<void> {
  const scene = getActiveScene();
  const placement = backend.getAdPlacement("double_reward", state);
  if (!placement.available) {
    toast = placement.reason ?? "今天的翻倍广告先到这里。";
    render();
    return;
  }

  const ad = await platform.showRewardedAd("double_reward");
  if (!ad.completed) return;

  let nextState = recordAdView(state, "double_reward");
  nextState = grantBooster(nextState, "hintTicket", 2);
  toast = "翻倍奖励到账，提示券 +2。";
  platform.reportEvent("double_reward_ad", { sceneId: scene.id });
  setState(nextState);
}

async function reviveWithAd(): Promise<void> {
  const scene = getActiveScene();
  const sceneState = getSceneState(scene.id);
  if (!sceneState.failed) {
    toast = "这一局还没失败，不需要复活。";
    render();
    return;
  }

  const placement = backend.getAdPlacement("revive", state, scene.id);
  if (!placement.available) {
    toast = placement.reason ?? "今天的复活广告先到这里。";
    render();
    return;
  }

  const ad = await platform.showRewardedAd("revive");
  if (!ad.completed) return;

  let nextState = recordAdView(state, `revive:${scene.id}`);
  nextState = reviveScene(nextState, scene.id);
  toast = "复活成功，已找到的证据保留。";
  platform.reportEvent("revive_ad", { sceneId: scene.id });
  setState(nextState);
}

async function reviveWithCardOrShare(): Promise<void> {
  const scene = getActiveScene();
  const sceneState = getSceneState(scene.id);
  if (!sceneState.failed) {
    toast = "这一局还没失败，不需要复活。";
    render();
    return;
  }

  if (state.economy.reviveCard > 0) {
    let nextState = spendBooster(state, "reviveCard", 1);
    nextState = reviveScene(nextState, scene.id);
    toast = "复活卡已使用，继续这局。";
    platform.reportEvent("revive_card", { sceneId: scene.id });
    setState(nextState);
    return;
  }

  const result = await platform.share({
    title: `我在「${scene.name}」失误满了，拉我一把复活继续找`,
    query: createShareQuery(scene.id, "revive")
  });
  if (!result.shared) return;

  let nextState = recordSocialShare(state, "group", true);
  nextState = grantBooster(nextState, "reviveCard", 1);
  nextState = spendBooster(nextState, "reviveCard", 1);
  nextState = reviveScene(nextState, scene.id);
  toast = "群助力已发出，本次复活生效。";
  platform.reportEvent("revive_share", { sceneId: scene.id });
  setState(nextState);
}

async function gainExtraAttempt(): Promise<void> {
  const placement = backend.getAdPlacement("extra_attempt", state);
  if (!placement.available) {
    toast = placement.reason ?? "今天的加体力广告先到这里。";
    render();
    return;
  }

  const ad = await platform.showRewardedAd("extra_attempt");
  if (!ad.completed) return;

  let nextState = recordAdView(state, "extra_attempt");
  nextState = grantDailyAttempt(nextState, 1);
  toast = "体力 +1，今天还能再开一局。";
  platform.reportEvent("extra_attempt_ad", { attemptsRemaining: backend.getDailyChallenge(nextState).attemptsRemaining });
  setState(nextState);
}

async function openLeaderboard(scope: "friend" | "province"): Promise<void> {
  await platform.openLeaderboard?.(scope);
  const leaderboard = backend.getLeaderboard(state);
  toast =
    scope === "province"
      ? `${leaderboard.provinceName}现在第 ${leaderboard.provinceRank}，继续通关给省队加分。`
      : `群榜已打开，你现在排第 ${leaderboard.friendRows.find((row) => row.relation === "self")?.rank ?? 2}。`;
  platform.reportEvent("open_leaderboard", { scope });
  render();
}

function createShareQuery(sceneId: string, reward: "hint" | "revive" | "clear"): Record<string, string> {
  return {
    scene: sceneId,
    inviter: "local-player",
    reward,
    assist: `${sceneId}:${reward}:${Date.now()}`
  };
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
  if (scene.id === meetingSceneId) {
    toast = "地下室传来轰鸣，暴富噪声母巢开始接线。";
    nextScenePlaceholderActive = false;
    hintedHotspotId = "";
    clearFoundPulse();
    setState(setCurrentScene(state, nestSceneId));
    return;
  }
  if (scene.id === nestSceneId) {
    toast = "热榜又亮了，深夜追涨冷却器开始接线。";
    nextScenePlaceholderActive = false;
    hintedHotspotId = "";
    clearFoundPulse();
    setState(setCurrentScene(state, stockSceneId));
    return;
  }

  toast = "热榜也冷下来了。暴富幻想所正式开张，只是不保证发财。";
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
  if (sceneId === nestSceneId) {
    return {
      place: "暴富幻想所地下室",
      time: "周四 23:59",
      goal: "找出 12 个母巢残片",
      goalDetail: "把六类污染源和六枚反击标签从噪声堆里分出来。",
      completeGoal: "母巢已拆解",
      startAction: "开始粉碎",
      continueAction: "继续粉碎",
      startToast: "别急着被它们轮流打，先给这些噪声分类。",
      introNarrative: "办公室、天台、便利站、家里、发布会和会议室的残片，都被接进了同一台机器。",
      completeNarrative: "踏空、接盘、差一点、高光、恐慌和甩锅都拆成了残骸。以前它们轮流打你，现在轮到你给它们挂牌。"
    };
  }
  if (sceneId === stockSceneId) {
    return {
      place: "周启明家里",
      time: "周五 00:40",
      goal: "找出 13 个追涨陷阱",
      goalDetail: "把暴涨榜、热榜推送、融资按钮和卖房加仓草算拆开。",
      completeGoal: "热榜已冷却",
      startAction: "开始降温",
      continueAction: "继续降温",
      startToast: "先别看涨幅下单，把这张榜单旁边的诱因都找出来。",
      introNarrative: "他已经拆完母巢，结果一张暴涨榜又把几只票推到眼前。",
      completeNarrative: "榜首、截图、涨停贴、融资弹窗、群卡、龙虎榜和风险折角都装进袋里。涨得多不是买入理由。"
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
