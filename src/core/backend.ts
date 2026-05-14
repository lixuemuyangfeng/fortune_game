import type { GameConfig, PlayerState } from "./types";

export type AdPlacementId = "hint";

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

export interface GameBackend {
  getLevelProgress(state: PlayerState, sceneId: string): LevelProgressSnapshot | undefined;
  getAdPlacement(placement: AdPlacementId, state: PlayerState): AdPlacementDecision;
}

const placementLimits: Record<AdPlacementId, { dailyLimit: number; rewardMultiplier: number }> = {
  hint: { dailyLimit: 5, rewardMultiplier: 1 }
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
