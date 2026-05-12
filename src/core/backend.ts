import type { GameConfig, PlayerState } from "./types";

export type AdPlacementId = "hint" | "sort_double" | "offline_double" | "level_complete";

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

export interface LeaderboardEntry {
  userId: string;
  nickname: string;
  score: number;
  completedLevels: number;
  badge: string;
  isCurrentUser?: boolean;
}

export interface AdPlacementDecision {
  placement: AdPlacementId;
  available: boolean;
  remainingToday: number;
  rewardMultiplier: number;
  reason?: string;
}

export interface GameBackend {
  getLevelProgress(state: PlayerState, sceneId: string): LevelProgressSnapshot | undefined;
  getFriendLeaderboard(userId: string, state: PlayerState): LeaderboardEntry[];
  getAdPlacement(placement: AdPlacementId, state: PlayerState): AdPlacementDecision;
}

const placementLimits: Record<AdPlacementId, { dailyLimit: number; rewardMultiplier: number }> = {
  hint: { dailyLimit: 5, rewardMultiplier: 1 },
  sort_double: { dailyLimit: 8, rewardMultiplier: 2 },
  offline_double: { dailyLimit: 3, rewardMultiplier: 2 },
  level_complete: { dailyLimit: 2, rewardMultiplier: 1 }
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

  getFriendLeaderboard(userId: string, state: PlayerState): LeaderboardEntry[] {
    const completedLevels = this.config.scenes.filter((scene) => this.getLevelProgress(state, scene.id)?.complete).length;
    const resourceScore = Object.values(state.resources).reduce((total, value) => total + value, 0);
    const cardScore = state.collectedCardIds.length * 18;
    const score = completedLevels * 120 + state.foundEvidenceIds.length * 12 + resourceScore + cardScore;

    return [
      { userId: "friend_old_money", nickname: "财务老钱", score: 428, completedLevels: 3, badge: "嘴硬配置派" },
      { userId: "friend_xiaolu", nickname: "产品小陆", score: 372, completedLevels: 3, badge: "宏观复读机" },
      { userId, nickname: "周启明", score, completedLevels, badge: score >= 360 ? "噪声回收员" : "工位还魂中", isCurrentUser: true },
      { userId: "friend_security", nickname: "楼下保安", score: 188, completedLevels: 2, badge: "刮刮泪守门人" }
    ].sort((a, b) => b.score - a.score);
  }

  getAdPlacement(placement: AdPlacementId, state: PlayerState): AdPlacementDecision {
    const rule = placementLimits[placement];
    const used = state.adViews[placement] ?? 0;
    const remainingToday = Math.max(0, rule.dailyLimit - used);

    return {
      placement,
      available: remainingToday > 0,
      remainingToday,
      rewardMultiplier: rule.rewardMultiplier,
      reason: remainingToday > 0 ? undefined : "今日这个广告点已经降噪到上限。"
    };
  }
}
