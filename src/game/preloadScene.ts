import Phaser from "phaser";
export class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  preload(): void {
    this.load.image("office-background", "/assets/game/office/office-background-clean.png");
    this.load.image("office-foreground", "/assets/game/office/office-foreground-occluders.png");
    this.load.image("rooftop-background", "/assets/game/rooftop/rooftop-background.png");
    this.load.image("rooftop-cooling-furnace", "/assets/game/rooftop/machines/cooling-furnace.png");
    [
      ["h1", "/assets/game/rooftop/clues/folded-receipt.png"],
      ["h2", "/assets/game/rooftop/clues/group-chat.png"],
      ["h3", "/assets/game/rooftop/clues/risk-news.png"],
      ["h4", "/assets/game/rooftop/clues/price-alert.png"],
      ["h5", "/assets/game/rooftop/clues/warning-sign.png"]
    ].forEach(([id, path]) => this.load.image(`rooftop-clue-${id}`, path));
    for (const state of ["progress-0", "progress-1", "progress-2", "progress-3", "progress-4", "progress-5"]) {
      this.load.spritesheet(`zhou-${state}`, `/assets/game/office/characters/zhou-${state}-sheet.png`, {
        frameWidth: 720,
        frameHeight: 820
      });
      this.load.spritesheet(`trader-${state}`, `/assets/game/rooftop/characters/trader-${state}-sheet.png`, {
        frameWidth: 720,
        frameHeight: 820
      });
    }
  }

  create(): void {
    const activeSceneKey = this.registry.get("activeSceneKey") as string | undefined;
    this.scene.start(activeSceneKey === "rooftop" ? "RooftopScene" : "OfficeScene", this.registry.get("sceneData"));
  }
}
