import type { BoosterId, GameConfig, PlayerState, ShareChannel } from "./types";

export function createInitialState(config: GameConfig): PlayerState {
  const sceneProgress = Object.fromEntries(
    config.scenes.map((scene) => [scene.id, createEmptySceneProgress()])
  );
  const today = getTodayKey();

  return {
    currentSceneId: config.scenes[0]?.id ?? "office",
    foundEvidenceIds: [],
    sceneProgress,
    adViews: {},
    economy: {
      hintTicket: 0,
      magnifier: 0,
      reviveCard: 0
    },
    socialStats: {
      shareCount: 0,
      groupShareCount: 0,
      inviteCount: 0,
      helpedFriends: 0,
      provinceContribution: 0,
      shareRewardsDate: today,
      shareRewardsToday: 0,
      claimedAssistKeys: []
    },
    dailyChallenge: {
      date: today,
      attemptsUsed: 0,
      extraAttemptsToday: 0,
      clearsToday: 0,
      streak: 0,
      regionScore: 0,
      completedSceneIds: []
    },
    lastSavedAt: Date.now()
  };
}

export function setCurrentScene(state: PlayerState, sceneId: string): PlayerState {
  return {
    ...state,
    currentSceneId: sceneId,
    lastSavedAt: Date.now()
  };
}

export function addEvidence(state: PlayerState, evidenceId: string): PlayerState {
  if (state.foundEvidenceIds.includes(evidenceId)) {
    return state;
  }

  return {
    ...state,
    foundEvidenceIds: [...state.foundEvidenceIds, evidenceId],
    lastSavedAt: Date.now()
  };
}

export function addSceneHotspot(state: PlayerState, sceneId: string, hotspotId: string, evidenceId: string): PlayerState {
  const sceneProgress = state.sceneProgress[sceneId] ?? createEmptySceneProgress();
  if (sceneProgress.foundHotspotIds.includes(hotspotId)) {
    return state;
  }

  return {
    ...state,
    foundEvidenceIds: state.foundEvidenceIds.includes(evidenceId) ? state.foundEvidenceIds : [...state.foundEvidenceIds, evidenceId],
    sceneProgress: {
      ...state.sceneProgress,
      [sceneId]: {
        ...sceneProgress,
        foundHotspotIds: [...sceneProgress.foundHotspotIds, hotspotId]
      }
    },
    lastSavedAt: Date.now()
  };
}

export function setSceneChallengeActive(state: PlayerState, sceneId: string, challengeActive: boolean): PlayerState {
  const sceneProgress = state.sceneProgress[sceneId] ?? createEmptySceneProgress();

  return {
    ...state,
    sceneProgress: {
      ...state.sceneProgress,
      [sceneId]: {
        ...sceneProgress,
        challengeActive,
        failed: challengeActive ? false : sceneProgress.failed,
        missCount: challengeActive && sceneProgress.failed ? 0 : sceneProgress.missCount
      }
    },
    lastSavedAt: Date.now()
  };
}

export function recordAdView(state: PlayerState, placement: string): PlayerState {
  return {
    ...state,
    adViews: {
      ...state.adViews,
      [placement]: (state.adViews[placement] ?? 0) + 1
    },
    lastSavedAt: Date.now()
  };
}

export function grantBooster(state: PlayerState, booster: BoosterId, amount: number): PlayerState {
  return {
    ...state,
    economy: {
      ...state.economy,
      [booster]: Math.max(0, (state.economy[booster] ?? 0) + amount)
    },
    lastSavedAt: Date.now()
  };
}

export function spendBooster(state: PlayerState, booster: BoosterId, amount: number): PlayerState {
  const owned = state.economy[booster] ?? 0;
  if (owned < amount) return state;

  return {
    ...state,
    economy: {
      ...state.economy,
      [booster]: owned - amount
    },
    lastSavedAt: Date.now()
  };
}

export function recordSocialShare(state: PlayerState, channel: ShareChannel, rewardGranted: boolean): PlayerState {
  const today = getTodayKey();
  const sameRewardDate = state.socialStats.shareRewardsDate === today;
  const shareRewardsToday = sameRewardDate ? state.socialStats.shareRewardsToday : 0;

  return {
    ...state,
    socialStats: {
      ...state.socialStats,
      shareCount: state.socialStats.shareCount + 1,
      groupShareCount: state.socialStats.groupShareCount + (channel === "group" ? 1 : 0),
      shareRewardsDate: today,
      shareRewardsToday: shareRewardsToday + (rewardGranted ? 1 : 0)
    },
    lastSavedAt: Date.now()
  };
}

export function recordInviteLaunch(state: PlayerState): PlayerState {
  return {
    ...state,
    socialStats: {
      ...state.socialStats,
      inviteCount: state.socialStats.inviteCount + 1
    },
    lastSavedAt: Date.now()
  };
}

export function claimShareAssist(state: PlayerState, assistKey: string): PlayerState {
  if (state.socialStats.claimedAssistKeys.includes(assistKey)) return state;

  return {
    ...state,
    socialStats: {
      ...state.socialStats,
      inviteCount: state.socialStats.inviteCount + 1,
      helpedFriends: state.socialStats.helpedFriends + 1,
      claimedAssistKeys: [...state.socialStats.claimedAssistKeys, assistKey]
    },
    lastSavedAt: Date.now()
  };
}

export function recordDailyClear(state: PlayerState, sceneId: string, contribution: number): PlayerState {
  const today = getTodayKey();
  const sameDate = state.dailyChallenge.date === today;
  const completedSceneIds = sameDate ? state.dailyChallenge.completedSceneIds : [];
  if (completedSceneIds.includes(sceneId)) return state;

  const nextCompletedSceneIds = [...completedSceneIds, sceneId];
  const nextClearsToday = (sameDate ? state.dailyChallenge.clearsToday : 0) + 1;
  const nextRegionScore = (sameDate ? state.dailyChallenge.regionScore : 0) + contribution;

  return {
    ...state,
    socialStats: {
      ...state.socialStats,
      provinceContribution: state.socialStats.provinceContribution + contribution
    },
    dailyChallenge: {
      date: today,
      attemptsUsed: sameDate ? state.dailyChallenge.attemptsUsed : 0,
      extraAttemptsToday: sameDate ? state.dailyChallenge.extraAttemptsToday : 0,
      clearsToday: nextClearsToday,
      streak: Math.max(state.dailyChallenge.streak, 0) + 1,
      regionScore: nextRegionScore,
      completedSceneIds: nextCompletedSceneIds
    },
    lastSavedAt: Date.now()
  };
}

export function recordSceneMiss(state: PlayerState, sceneId: string, mistakeLimit: number): PlayerState {
  const sceneProgress = state.sceneProgress[sceneId] ?? createEmptySceneProgress();
  if (!sceneProgress.challengeActive || sceneProgress.failed) return state;

  const missCount = sceneProgress.missCount + 1;
  const failed = missCount >= mistakeLimit;

  return {
    ...state,
    sceneProgress: {
      ...state.sceneProgress,
      [sceneId]: {
        ...sceneProgress,
        missCount,
        failed,
        challengeActive: !failed
      }
    },
    lastSavedAt: Date.now()
  };
}

export function reviveScene(state: PlayerState, sceneId: string): PlayerState {
  const sceneProgress = state.sceneProgress[sceneId] ?? createEmptySceneProgress();

  return {
    ...state,
    sceneProgress: {
      ...state.sceneProgress,
      [sceneId]: {
        ...sceneProgress,
        challengeActive: true,
        failed: false,
        missCount: 0
      }
    },
    lastSavedAt: Date.now()
  };
}

export function recordDailyAttempt(state: PlayerState): PlayerState {
  const today = getTodayKey();
  const sameDate = state.dailyChallenge.date === today;

  return {
    ...state,
    dailyChallenge: {
      date: today,
      attemptsUsed: (sameDate ? state.dailyChallenge.attemptsUsed : 0) + 1,
      extraAttemptsToday: sameDate ? state.dailyChallenge.extraAttemptsToday : 0,
      clearsToday: sameDate ? state.dailyChallenge.clearsToday : 0,
      streak: sameDate ? state.dailyChallenge.streak : 0,
      regionScore: sameDate ? state.dailyChallenge.regionScore : 0,
      completedSceneIds: sameDate ? state.dailyChallenge.completedSceneIds : []
    },
    lastSavedAt: Date.now()
  };
}

export function grantDailyAttempt(state: PlayerState, amount: number): PlayerState {
  const today = getTodayKey();
  const sameDate = state.dailyChallenge.date === today;

  return {
    ...state,
    dailyChallenge: {
      date: today,
      attemptsUsed: sameDate ? state.dailyChallenge.attemptsUsed : 0,
      extraAttemptsToday: (sameDate ? state.dailyChallenge.extraAttemptsToday : 0) + amount,
      clearsToday: sameDate ? state.dailyChallenge.clearsToday : 0,
      streak: sameDate ? state.dailyChallenge.streak : 0,
      regionScore: sameDate ? state.dailyChallenge.regionScore : 0,
      completedSceneIds: sameDate ? state.dailyChallenge.completedSceneIds : []
    },
    lastSavedAt: Date.now()
  };
}

export function getTodayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export function createEmptySceneProgress() {
  return {
    challengeActive: false,
    foundHotspotIds: [],
    missCount: 0,
    failed: false
  };
}
