import type { GameConfig, PlayerState } from "./types";

export function createInitialState(config: GameConfig): PlayerState {
  const sceneProgress = Object.fromEntries(
    config.scenes.map((scene) => [scene.id, { challengeActive: false, foundHotspotIds: [] }])
  );

  return {
    currentSceneId: config.scenes[0]?.id ?? "office",
    foundEvidenceIds: [],
    sceneProgress,
    adViews: {},
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
  const sceneProgress = state.sceneProgress[sceneId] ?? { challengeActive: false, foundHotspotIds: [] };
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
  const sceneProgress = state.sceneProgress[sceneId] ?? { challengeActive: false, foundHotspotIds: [] };

  return {
    ...state,
    sceneProgress: {
      ...state.sceneProgress,
      [sceneId]: {
        ...sceneProgress,
        challengeActive
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
