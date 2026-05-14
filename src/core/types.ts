export type EmotionId = "envy" | "stubborn" | "breakdown" | "fantasy" | "pretend";

export type ThemeId = "gold" | "ai" | "lottery";

export interface HotspotEvidence {
  id: string;
  title: string;
  detail: string;
  emotion: EmotionId;
  theme: ThemeId;
  counterText?: string;
}

export interface SceneHotspot {
  id: string;
  evidenceId: string;
  x: number;
  y: number;
  hitX?: number;
  hitY?: number;
  hitWidth?: number;
  hitHeight?: number;
  radius: number;
  label: string;
  found: boolean;
  image?: string;
  imageWidth?: number;
  renderMode?: "asset" | "embedded";
  anchorX?: number;
  anchorY?: number;
  hitScale?: number;
  revealText?: string;
  animationKind?: "kline" | "goldLine" | "chat" | "paper" | "scratch";
}

export interface InvestigationScene {
  id: string;
  name: string;
  theme: ThemeId;
  description: string;
  backgroundImage?: string;
  character?: SceneCharacter;
  hint?: string;
  enemyName?: string;
  enemyDescription?: string;
  machineName?: string;
  machineImage?: string;
  machineEmbedded?: boolean;
  completeText?: string;
  hotspots: SceneHotspot[];
}

export interface SceneCharacter {
  x: number;
  y: number;
  scale?: number;
  flipX?: boolean;
  width?: number;
  height?: number;
  source?: "cutout" | "mascot";
  cropX?: number;
  cropY?: number;
  cropWidth?: number;
  cropHeight?: number;
}

export interface Facility {
  id: string;
  name: string;
  description: string;
  emotion: EmotionId;
  level: number;
  baseOutput: number;
}

export interface Card {
  id: string;
  title: string;
  rarity: "normal" | "rare" | "epic";
  theme: ThemeId;
  text: string;
}

export interface Personality {
  id: string;
  name: string;
  description: string;
  weights: Partial<Record<EmotionId, number>>;
}

export interface GameConfig {
  emotions: Record<EmotionId, string>;
  themes: Record<ThemeId, string>;
  evidences: Record<string, HotspotEvidence>;
  scenes: InvestigationScene[];
  facilities: Facility[];
  cards: Card[];
  personalities: Personality[];
  fortunes: string[];
}

export interface PlayerState {
  resources: Record<EmotionId, number>;
  facilities: Record<string, number>;
  foundEvidenceIds: string[];
  sceneProgress: Record<string, SceneInvestigationState>;
  collectedCardIds: string[];
  adViews: Record<string, number>;
  lastSavedAt: number;
}

export interface SceneInvestigationState {
  challengeActive: boolean;
  foundHotspotIds: string[];
}

export interface SortResult {
  correct: boolean;
  gained: number;
  emotion: EmotionId;
}
