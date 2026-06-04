import Phaser from "phaser";
export class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  preload(): void {
    this.load.image("office-background", "/assets/game/office/office-background-clean.png");
    this.load.image("office-foreground", "/assets/game/office/office-foreground-occluders.png");
    for (const state of ["progress-0", "progress-1", "progress-2", "progress-3", "progress-4", "progress-5", "progress-6"]) {
      this.load.image(`rooftop-background-${state}`, `/assets/game/rooftop/states/rooftop-v9-${state}.png`);
    }
    for (const state of ["progress-0", "progress-1", "progress-2", "progress-3", "progress-4", "progress-5", "progress-6", "progress-7"]) {
      this.load.image(`convenience-background-${state}`, `/assets/game/convenience/states/convenience-${state}.png`);
    }
    for (const state of ["progress-0", "progress-1", "progress-2", "progress-3", "progress-4", "progress-5", "progress-6", "progress-7", "progress-8"]) {
      this.load.image(`social-background-${state}`, `/assets/game/social/states/social-${state}.png`);
    }
    for (const state of ["progress-0", "progress-1", "progress-2", "progress-3", "progress-4", "progress-5", "progress-6", "progress-7", "progress-8", "progress-9"]) {
      this.load.image(`ai-launch-background-${state}`, `/assets/game/ai-launch/states/ai-launch-${state}.png`);
    }
    for (const state of ["progress-0", "progress-1", "progress-2", "progress-3", "progress-4", "progress-5", "progress-6", "progress-7", "progress-8", "progress-9", "progress-10"]) {
      this.load.image(`meeting-background-${state}`, `/assets/game/meeting/states/meeting-${state}.png`);
    }
    this.load.image("rooftop-cooling-furnace", "/assets/game/rooftop/machines/cooling-furnace.png");
    [
      ["h1", "/assets/game/rooftop/clues/folded-receipt.png"],
      ["h2", "/assets/game/rooftop/clues/group-chat.png"],
      ["h3", "/assets/game/rooftop/clues/risk-news.png"],
      ["h4", "/assets/game/rooftop/clues/price-alert.png"],
      ["h5", "/assets/game/rooftop/clues/warning-sign.png"],
      ["h6", "/assets/game/rooftop/clues/leverage-paper.png"]
    ].forEach(([id, path]) => this.load.image(`rooftop-clue-${id}`, path));
    for (const state of ["progress-0", "progress-1", "progress-2", "progress-3", "progress-4", "progress-5"]) {
      this.load.spritesheet(`zhou-${state}`, `/assets/game/office/characters/zhou-${state}-sheet.png`, {
        frameWidth: 720,
        frameHeight: 820
      });
    }
    for (const state of ["progress-0", "progress-1", "progress-2", "progress-3", "progress-4", "progress-5", "progress-6"]) {
      this.load.spritesheet(`trader-${state}`, `/assets/game/rooftop/characters/trader-${state}-sheet.png`, {
        frameWidth: 720,
        frameHeight: 820
      });
    }
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
                : "OfficeScene";
    this.scene.start(sceneName, this.registry.get("sceneData"));
  }
}
