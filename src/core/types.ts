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
  animationKind?: "kline" | "goldLine" | "chat" | "paper" | "scratch" | "receipt" | "news" | "alert" | "sign" | "contract" | "photo" | "phone" | "ticket" | "note" | "bottle";
}

export interface SceneDecoy {
  id: string;
  x: number;
  y: number;
  hitWidth: number;
  hitHeight: number;
  label: string;
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
  decoys?: SceneDecoy[];
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

export interface GameConfig {
  evidences: Record<string, HotspotEvidence>;
  scenes: InvestigationScene[];
}

export interface PlayerState {
  currentSceneId: string;
  foundEvidenceIds: string[];
  sceneProgress: Record<string, SceneInvestigationState>;
  adViews: Record<string, number>;
  lastSavedAt: number;
}

export interface SceneInvestigationState {
  challengeActive: boolean;
  foundHotspotIds: string[];
}
