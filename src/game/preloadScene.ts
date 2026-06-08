import Phaser from "phaser";
export class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  preload(): void {
    const activeSceneKey = this.registry.get("activeSceneKey") as string | undefined;
    if (!activeSceneKey || activeSceneKey === "office") {
      this.preloadOffice();
      return;
    }
    if (activeSceneKey === "rooftop") {
      this.preloadRooftop();
      return;
    }
    if (activeSceneKey === "convenience") {
      this.preloadStateBackgrounds("convenience", 7, (state) => `/assets/game/convenience/states/convenience-${state}.png`);
      return;
    }
    if (activeSceneKey === "social") {
      this.preloadSocial();
      return;
    }
    if (activeSceneKey === "ai_launch") {
      this.preloadStateBackgrounds("ai-launch", 9, (state) => `/assets/game/ai-launch/states/ai-launch-${state}.png`);
      return;
    }
    if (activeSceneKey === "meeting") {
      this.preloadStateBackgrounds("meeting", 10, (state) => `/assets/game/meeting/states/meeting-${state}.png`);
      return;
    }
    if (activeSceneKey === "nest") {
      this.preloadStateBackgrounds("nest", 12, (state) => `/assets/game/nest/states/nest-${state}.png`);
    }
  }

  private preloadOffice(): void {
    this.load.image("office-background", "/assets/game/office/office-background-clean.png");
    this.load.image("office-foreground", "/assets/game/office/office-foreground-occluders.png");
    for (const state of ["progress-0", "progress-1", "progress-2", "progress-3", "progress-4", "progress-5"]) {
      this.load.spritesheet(`zhou-${state}`, `/assets/game/office/characters/zhou-${state}-sheet.png`, {
        frameWidth: 720,
        frameHeight: 820
      });
    }
  }

  private preloadRooftop(): void {
    this.preloadStateBackgrounds("rooftop", 6, (state) => `/assets/game/rooftop/states/rooftop-v9-${state}.png`);
    this.load.image("rooftop-cooling-furnace", "/assets/game/rooftop/machines/cooling-furnace.png");
    [
      ["h1", "/assets/game/rooftop/clues/folded-receipt.png"],
      ["h2", "/assets/game/rooftop/clues/group-chat.png"],
      ["h3", "/assets/game/rooftop/clues/risk-news.png"],
      ["h4", "/assets/game/rooftop/clues/price-alert.png"],
      ["h5", "/assets/game/rooftop/clues/warning-sign.png"],
      ["h6", "/assets/game/rooftop/clues/leverage-paper.png"]
    ].forEach(([id, path]) => this.load.image(`rooftop-clue-${id}`, path));
    for (const state of ["progress-0", "progress-1", "progress-2", "progress-3", "progress-4", "progress-5", "progress-6"]) {
      this.load.spritesheet(`trader-${state}`, `/assets/game/rooftop/characters/trader-${state}-sheet.png`, {
        frameWidth: 720,
        frameHeight: 820
      });
    }
  }

  private preloadSocial(): void {
    this.load.image("social-background-progress-0", "/assets/game/social/states/social-progress-0.png");
    for (const state of this.getStates(8)) {
      this.load.image(`social-expression-${state}`, `/assets/game/social/expressions/social-expression-${state}.png`);
    }
  }

  private preloadStateBackgrounds(prefix: string, maxProgress: number, pathForState: (state: string) => string): void {
    for (const state of this.getStates(maxProgress)) {
      this.load.image(`${prefix}-background-${state}`, pathForState(state));
    }
  }

  private getStates(maxProgress: number): string[] {
    return Array.from({ length: maxProgress + 1 }, (_, index) => `progress-${index}`);
  }

  create(): void {
    const activeSceneKey = this.registry.get("activeSceneKey") as string | undefined;
    const sceneName =
      activeSceneKey === "rooftop"
        ? "RooftopScene"
        : activeSceneKey === "convenience"
          ? "ConvenienceScene"
          : activeSceneKey === "social"
            ? "SocialScene"
            : activeSceneKey === "ai_launch"
              ? "AiLaunchScene"
              : activeSceneKey === "meeting"
                ? "MeetingScene"
                : activeSceneKey === "nest"
                  ? "NestScene"
                  : "OfficeScene";
    this.scene.start(sceneName, this.registry.get("sceneData"));
  }
}
