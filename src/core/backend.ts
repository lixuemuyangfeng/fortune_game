import type { GameConfig, PlayerState } from "./types";

export type AdPlacementId = "hint" | "magnifier" | "revive" | "extra_attempt" | "double_reward" | "interstitial_clear";

export interface LevelProgressSnapshot {
  sceneId: string;
  sceneName: string;
  challengeActive: boolean;
  foundHotspotIds: string[];
  foundCount: number;
  totalCount: number;
  complete: boolean;
  updatedAt: number;
}

export interface AdPlacementDecision {
  placement: AdPlacementId;
  available: boolean;
  remainingToday: number;
  rewardMultiplier: number;
  reason?: string;
}

export interface DailyChallengeSnapshot {
  date: string;
  attemptsUsed: number;
  attemptsLimit: number;
  attemptsRemaining: number;
  clearGoal: number;
  goalComplete: boolean;
  clearsToday: number;
  streak: number;
  regionScore: number;
}

export interface LeaderboardRow {
  rank: number;
  name: string;
  score: number;
  relation: "self" | "friend" | "province";
}

export interface LeaderboardSnapshot {
  provinceName: string;
  provinceRank: number;
  provinceScore: number;
  friendRows: LeaderboardRow[];
  provinceRows: LeaderboardRow[];
}

export interface GameBackend {
  getLevelProgress(state: PlayerState, sceneId: string): LevelProgressSnapshot | undefined;
  getAdPlacement(placement: AdPlacementId, state: PlayerState, scopeId?: string): AdPlacementDecision;
  getDailyChallenge(state: PlayerState): DailyChallengeSnapshot;
  getLeaderboard(state: PlayerState): LeaderboardSnapshot;
}

export const placementLimits: Record<AdPlacementId, { dailyLimit: number; rewardMultiplier: number }> = {
  hint: { dailyLimit: 20, rewardMultiplier: 1 },
  magnifier: { dailyLimit: 8, rewardMultiplier: 1 },
  revive: { dailyLimit: 6, rewardMultiplier: 1 },
  extra_attempt: { dailyLimit: 5, rewardMultiplier: 1 },
  double_reward: { dailyLimit: 4, rewardMultiplier: 2 },
  interstitial_clear: { dailyLimit: 10, rewardMultiplier: 1 }
};

export class LocalGameBackend implements GameBackend {
  constructor(private readonly config: GameConfig) {}

  getLevelProgress(state: PlayerState, sceneId: string): LevelProgressSnapshot | undefined {
    const scene = this.config.scenes.find((item) => item.id === sceneId);
    if (!scene) return undefined;

    const progress = state.sceneProgress[sceneId] ?? { challengeActive: false, foundHotspotIds: [] };
    const foundCount = progress.foundHotspotIds.length;
    const totalCount = scene.hotspots.length;

    return {
      sceneId,
      sceneName: scene.name,
      challengeActive: progress.challengeActive,
      foundHotspotIds: [...progress.foundHotspotIds],
      foundCount,
      totalCount,
      complete: totalCount > 0 && foundCount >= totalCount,
      updatedAt: state.lastSavedAt
    };
  }

  getAdPlacement(placement: AdPlacementId, state: PlayerState, scopeId?: string): AdPlacementDecision {
    const rule = placementLimits[placement];
    const adViewKey = scopeId ? `${placement}:${scopeId}` : placement;
    const used = state.adViews[adViewKey] ?? 0;
    const remainingToday = Math.max(0, rule.dailyLimit - used);

    return {
      placement,
      available: remainingToday > 0,
      remainingToday,
      rewardMultiplier: rule.rewardMultiplier,
      reason: remainingToday > 0 ? undefined : "今日这个广告点已经降噪到上限。"
    };
  }

  getDailyChallenge(state: PlayerState): DailyChallengeSnapshot {
    const today = new Date().toISOString().slice(0, 10);
    const sameDate = state.dailyChallenge.date === today;
    const attemptsUsed = sameDate ? state.dailyChallenge.attemptsUsed : 0;
    const extraAttemptsToday = sameDate ? state.dailyChallenge.extraAttemptsToday : 0;
    const attemptsLimit = 5 + state.socialStats.inviteCount + extraAttemptsToday;

    return {
      date: today,
      attemptsUsed,
      attemptsLimit,
      attemptsRemaining: Math.max(0, attemptsLimit - attemptsUsed),
      clearGoal: 3,
      goalComplete: (sameDate ? state.dailyChallenge.clearsToday : 0) >= 3,
      clearsToday: sameDate ? state.dailyChallenge.clearsToday : 0,
      streak: sameDate ? state.dailyChallenge.streak : 0,
      regionScore: sameDate ? state.dailyChallenge.regionScore : 0
    };
  }

  getLeaderboard(state: PlayerState): LeaderboardSnapshot {
    const ownScore = Math.max(18, state.socialStats.provinceContribution + state.foundEvidenceIds.length * 3);

    return {
      provinceName: "广东队",
      provinceRank: ownScore >= 120 ? 2 : 6,
      provinceScore: 420000 + ownScore,
      friendRows: [
        { rank: 1, name: "群友小林", score: Math.max(ownScore + 24, 58), relation: "friend" },
        { rank: 2, name: "你", score: ownScore, relation: "self" },
        { rank: 3, name: "同事阿敏", score: Math.max(12, ownScore - 9), relation: "friend" }
      ],
      provinceRows: [
        { rank: 1, name: "浙江队", score: 436200, relation: "province" },
        { rank: 2, name: "广东队", score: 420000 + ownScore, relation: "self" },
        { rank: 3, name: "江苏队", score: 398600, relation: "province" }
      ]
    };
  }
}
