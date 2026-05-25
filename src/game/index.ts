import Phaser from "phaser";
import { BootScene } from "./bootScene";
import { PreloadScene } from "./preloadScene";
import { OfficeScene, type OfficeSceneData } from "./scenes/officeScene";
import { RooftopScene, type RooftopSceneData } from "./scenes/rooftopScene";
import { ConvenienceScene, type ConvenienceSceneData } from "./scenes/convenienceScene";

export type InvestigationGameData = OfficeSceneData | RooftopSceneData | ConvenienceSceneData;

export function createInvestigationGame(parent: HTMLElement, data: InvestigationGameData): Phaser.Game {
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.CANVAS,
    parent,
    width: 1280,
    height: 720,
    backgroundColor: "#14231d",
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    render: {
      antialias: true,
      pixelArt: false
    },
    scene: []
  };

  const game = new Phaser.Game(config);
  game.registry.set("sceneData", data);
  game.registry.set("activeSceneKey", data.scene.id);
  game.scene.add("BootScene", BootScene, true);
  game.scene.add("PreloadScene", PreloadScene, false);
  game.scene.add("OfficeScene", OfficeScene, false);
  game.scene.add("RooftopScene", RooftopScene, false);
  game.scene.add("ConvenienceScene", ConvenienceScene, false);
  return game;
}

export function createOfficeGame(parent: HTMLElement, data: OfficeSceneData): Phaser.Game {
  return createInvestigationGame(parent, data);
}
