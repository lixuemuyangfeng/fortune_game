import type { EmotionId, GameConfig, PlayerState, SortResult } from "./types";

export function createInitialState(config: GameConfig): PlayerState {
  const resources = Object.keys(config.emotions).reduce(
    (acc, id) => ({ ...acc, [id]: 0 }),
    {} as Record<EmotionId, number>
  );

  const facilities = Object.fromEntries(config.facilities.map((facility) => [facility.id, facility.level]));
  const sceneProgress = Object.fromEntries(
    config.scenes.map((scene) => [scene.id, { challengeActive: false, foundHotspotIds: [] }])
  );

  return {
    resources,
    facilities,
    foundEvidenceIds: [],
    sceneProgress,
    collectedCardIds: [],
    adViews: {},
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

export function sortEvidence(
  config: GameConfig,
  state: PlayerState,
  evidenceId: string,
  selectedEmotion: EmotionId,
  multiplier = 1
): { state: PlayerState; result: SortResult } {
  const evidence = config.evidences[evidenceId];
  const correct = evidence.emotion === selectedEmotion;
  const gained = correct ? 12 * multiplier : 3;
  const emotion = correct ? selectedEmotion : evidence.emotion;

  return {
    state: {
      ...state,
      resources: {
        ...state.resources,
        [emotion]: state.resources[emotion] + gained
      },
      lastSavedAt: Date.now()
    },
    result: { correct, gained, emotion }
  };
}

export function collectOffline(config: GameConfig, state: PlayerState, multiplier = 1): PlayerState {
  const hours = Math.min(6, Math.max(0.1, (Date.now() - state.lastSavedAt) / 3_600_000));
  const resources = { ...state.resources };

  for (const facility of config.facilities) {
    const level = state.facilities[facility.id] ?? 1;
    resources[facility.emotion] += Math.round(facility.baseOutput * level * hours * multiplier);
  }

  return { ...state, resources, lastSavedAt: Date.now() };
}

export function upgradeFacility(config: GameConfig, state: PlayerState, facilityId: string): PlayerState {
  const facility = config.facilities.find((item) => item.id === facilityId);
  if (!facility) return state;

  const currentLevel = state.facilities[facilityId] ?? 1;
  const cost = currentLevel * 25;
  const available = state.resources[facility.emotion];

  if (available < cost) return state;

  return {
    ...state,
    resources: {
      ...state.resources,
      [facility.emotion]: available - cost
    },
    facilities: {
      ...state.facilities,
      [facilityId]: currentLevel + 1
    },
    lastSavedAt: Date.now()
  };
}

export function unlockCard(config: GameConfig, state: PlayerState): PlayerState {
  const nextCard = config.cards.find((card) => !state.collectedCardIds.includes(card.id));
  if (!nextCard) return state;

  return {
    ...state,
    collectedCardIds: [...state.collectedCardIds, nextCard.id],
    lastSavedAt: Date.now()
  };
}

export function generatePersonality(config: GameConfig, state: PlayerState) {
  return config.personalities
    .map((personality) => {
      const score = Object.entries(personality.weights).reduce((total, [emotion, weight]) => {
        return total + (state.resources[emotion as EmotionId] ?? 0) * (weight ?? 0);
      }, 0);
      return { personality, score };
    })
    .sort((a, b) => b.score - a.score)[0].personality;
}
