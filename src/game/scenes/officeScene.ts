import Phaser from "phaser";
import type { HotspotEvidence, InvestigationScene, SceneHotspot } from "../../core/types";
import { playHitSound } from "../systems/audioSystem";
import { getOfficeProgress } from "../systems/progressSystem";

const worldWidth = 1280;
const worldHeight = 720;
const characterCenterX = 676;
const characterCenterY = 360;
const characterSceneScale = 0.62;
const characterStates = ["progress-0", "progress-1", "progress-2", "progress-3", "progress-4", "progress-5"] as const;
type CharacterState = (typeof characterStates)[number];

export interface OfficeSceneData {
  scene: InvestigationScene;
  evidences: Record<string, HotspotEvidence>;
  challengeActive: boolean;
  hintedHotspotId: string;
  justFoundHotspotId: string;
  foundHotspotIds: string[];
  onHotspotFound: (hotspotId: string) => void;
  onMiss: () => void;
}

export class OfficeScene extends Phaser.Scene {
  private officeData!: OfficeSceneData;

  constructor() {
    super("OfficeScene");
  }

  create(data: OfficeSceneData): void {
    this.officeData = data;
    this.cameras.main.setBackgroundColor("#14231d");

    this.addBackground();
    this.addTreatmentRoomWash();
    this.addEmbeddedMachine();
    this.addProgressLighting();
    this.addPlayableCharacter();
    this.addSceneCopy();

    if (data.challengeActive) {
      this.addNoiseChips();
      this.addHotspotZones();
    }

    this.addFoundMarkers();
    this.addHintMarker();
    this.addRecentHitEffect();
    this.addCompletionState();
  }

  private addBackground(): void {
    if (this.textures.exists("office-background")) {
      const image = this.add.image(worldWidth / 2, worldHeight / 2, "office-background");
      const scale = Math.max(worldWidth / image.width, worldHeight / image.height);
      image.setScale(scale).setDepth(0);
    }

    this.add.rectangle(worldWidth / 2, worldHeight / 2, worldWidth, worldHeight, 0x07110e, 0.2).setDepth(1);
  }

  private addTreatmentRoomWash(): void {
    const complete = getOfficeProgress(this.officeData.scene, this.officeData.foundHotspotIds).complete;
    const tint = complete ? 0xf3c45b : this.officeData.challengeActive ? 0x2f7a49 : 0x07110e;
    const alpha = complete ? 0.13 : this.officeData.challengeActive ? 0.17 : 0.38;
    this.add.rectangle(worldWidth / 2, worldHeight / 2, worldWidth, worldHeight, tint, alpha).setDepth(2);

    const vignette = this.add.graphics().setDepth(3);
    vignette.fillGradientStyle(0x07110e, 0x07110e, 0x07110e, 0x07110e, 0.62, 0.18, 0.18, 0.58);
    vignette.fillRect(0, 0, worldWidth, worldHeight);
    this.addForegroundOccluders();
  }

  private addForegroundOccluders(): void {
    if (!this.textures.exists("office-foreground")) return;
    const foreground = this.add.image(worldWidth / 2, worldHeight / 2, "office-foreground");
    const scale = Math.max(worldWidth / foreground.width, worldHeight / foreground.height);
    foreground.setScale(scale).setDepth(34);
  }

  private addSceneCopy(): void {
    if (this.officeData.challengeActive) return;

    const panel = this.add.graphics().setDepth(35);
    panel.fillStyle(0x17261f, 0.9);
    panel.lineStyle(2, 0xf3c45b, 0.38);
    panel.fillRoundedRect(410, 132, 460, 144, 10);
    panel.strokeRoundedRect(410, 132, 460, 144, 10);

    this.add.text(436, 154, "听见了吗", {
      color: "#f3c45b",
      fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif',
      fontSize: "22px",
      fontStyle: "bold"
    }).setDepth(36);
    this.add.text(436, 188, this.officeData.scene.name, {
      color: "#fff7df",
      fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif',
      fontSize: "40px",
      fontStyle: "bold"
    }).setDepth(36);
    this.add.text(436, 238, "开始后，把行情、弹窗和嘴硬从工位里拽出来。", {
      color: "#dce8dc",
      fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif',
      fontSize: "22px"
    }).setDepth(36);
  }

  private addNoiseChips(): void {
    const chips = [
      { text: "别人都上车了", x: 300, y: 160 },
      { text: "今晚先给一版", x: 890, y: 142 },
      { text: "普通人最后机会", x: 740, y: 454 },
      { text: "回本先还花呗", x: 1055, y: 300 }
    ];

    chips.forEach((chip, index) => {
      const container = this.add.container(chip.x, chip.y).setDepth(20);
      const bg = this.add.graphics();
      bg.fillStyle(index % 2 === 0 ? 0x17261f : 0xc64628, 0.82);
      bg.lineStyle(1, 0xffffff, 0.18);
      bg.fillRoundedRect(-92, -22, 184, 44, 22);
      bg.strokeRoundedRect(-92, -22, 184, 44, 22);
      const label = this.add.text(0, -1, chip.text, {
        color: "#fff7df",
        fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif',
        fontSize: "20px",
        fontStyle: "bold"
      }).setOrigin(0.5);
      container.add([bg, label]);
      this.tweens.add({ targets: container, y: chip.y - 8, duration: 1500 + index * 180, yoyo: true, repeat: -1, ease: "Sine.inOut" });
    });
  }

  private addHotspotZones(): void {
    const complete = getOfficeProgress(this.officeData.scene, this.officeData.foundHotspotIds).complete;
    if (complete) return;

    for (const hotspot of this.officeData.scene.hotspots) {
      if (this.officeData.foundHotspotIds.includes(hotspot.id)) continue;

      const rect = this.getHotspotRect(hotspot);
      const zone = this.add.zone(rect.x, rect.y, rect.width, rect.height).setDepth(42).setInteractive({ useHandCursor: true });
      zone.on("pointerdown", () => this.handleHotspot(hotspot));
    }

    this.input.on("pointerdown", (pointer: Phaser.Input.Pointer, objects: Phaser.GameObjects.GameObject[]) => {
      if (objects.length > 0) return;
      playHitSound("miss");
      this.officeData.onMiss();
    });
  }

  private handleHotspot(hotspot: SceneHotspot): void {
    playHitSound(hotspot.animationKind ?? "paper");
    this.officeData.onHotspotFound(hotspot.id);
  }

  private addFoundMarkers(): void {
    for (const hotspot of this.officeData.scene.hotspots) {
      if (!this.officeData.foundHotspotIds.includes(hotspot.id)) continue;

      const { x, y } = this.getHotspotPoint(hotspot);
      const marker = this.add.container(x, y).setDepth(45);
      const pin = this.add.graphics();
      pin.fillStyle(0x2f7a49, 0.96);
      pin.lineStyle(3, 0xffffff, 0.9);
      pin.fillCircle(0, 0, 19);
      pin.strokeCircle(0, 0, 19);
      const check = this.add.text(0, -2, "✓", {
        color: "#ffffff",
        fontFamily: "Arial, sans-serif",
        fontSize: "25px",
        fontStyle: "bold"
      }).setOrigin(0.5);
      marker.add([pin, check]);
    }
  }

  private addHintMarker(): void {
    const hotspot = this.officeData.scene.hotspots.find((item) => item.id === this.officeData.hintedHotspotId);
    if (!hotspot) return;

    const rect = this.getHotspotRect(hotspot);
    const hint = this.add.graphics().setDepth(44);
    hint.lineStyle(5, 0xf3c45b, 0.92);
    hint.strokeRoundedRect(rect.x - rect.width / 2, rect.y - rect.height / 2, rect.width, rect.height, 18);
    this.tweens.add({ targets: hint, alpha: 0.25, duration: 480, yoyo: true, repeat: 4, ease: "Sine.inOut" });
  }

  private addRecentHitEffect(): void {
    const hotspot = this.officeData.scene.hotspots.find((item) => item.id === this.officeData.justFoundHotspotId);
    if (!hotspot) return;

    const kind = hotspot.animationKind;
    if (kind === "kline") this.addKlineEffect(hotspot);
    if (kind === "goldLine") this.addGoldLineEffect(hotspot);
    if (kind === "chat") this.addStampEffect(hotspot);
    if (kind === "paper") this.addPaperEffect(hotspot);
    if (kind === "scratch") this.addScratchEffect(hotspot);
    this.addMachinePulse();
  }

  private addKlineEffect(hotspot: SceneHotspot): void {
    const rect = this.getHotspotRect(hotspot);
    const effect = this.add.graphics().setDepth(52);
    effect.lineStyle(7, 0xc64628, 0.95);
    const points = [
      [-0.42, 0.18],
      [-0.24, -0.12],
      [-0.04, 0.05],
      [0.13, -0.23],
      [0.31, 0.08],
      [0.43, -0.16]
    ];
    points.forEach((point, index) => {
      const px = rect.x + point[0] * rect.width;
      const py = rect.y + point[1] * rect.height;
      if (index === 0) effect.moveTo(px, py);
      else effect.lineTo(px, py);
    });
    effect.strokePath();
    this.tweens.add({ targets: effect, x: 10, duration: 80, yoyo: true, repeat: 5, ease: "Sine.inOut" });
    this.tweens.add({ targets: effect, alpha: 0, duration: 220, delay: 680 });
  }

  private addGoldLineEffect(hotspot: SceneHotspot): void {
    const rect = this.getHotspotRect(hotspot);
    const effect = this.add.graphics().setDepth(52);
    const left = rect.x - rect.width * 0.28;
    const top = rect.y - rect.height * 0.22;
    effect.lineStyle(4, 0xf3c45b, 0.88);
    effect.beginPath();
    effect.moveTo(left, top + rect.height * 0.34);
    effect.lineTo(left + rect.width * 0.16, top + rect.height * 0.2);
    effect.lineTo(left + rect.width * 0.34, top + rect.height * 0.28);
    effect.lineTo(left + rect.width * 0.52, top + rect.height * 0.1);
    effect.strokePath();
    effect.lineStyle(2, 0xfff2a6, 0.7);
    effect.strokeCircle(left + rect.width * 0.57, top + rect.height * 0.08, 6);
    effect.setBlendMode(Phaser.BlendModes.ADD);
    this.tweens.add({ targets: effect, alpha: 0.25, duration: 120, yoyo: true, repeat: 3, ease: "Sine.inOut" });
    this.tweens.add({ targets: effect, alpha: 0, duration: 180, delay: 580 });
  }

  private addStampEffect(hotspot: SceneHotspot): void {
    const rect = this.getHotspotRect(hotspot);
    const stamp = this.add.text(rect.x + rect.width * 0.18, rect.y + rect.height * 0.14, "催办截获", {
      color: "#c64628",
      backgroundColor: "rgba(255, 246, 223, 0.86)",
      fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif',
      fontSize: "23px",
      fontStyle: "bold",
      padding: { x: 10, y: 6 }
    }).setOrigin(0.5).setAngle(-8).setDepth(52).setScale(1.5);
    this.tweens.add({ targets: stamp, scale: 1, duration: 180, ease: "Back.out" });
    this.tweens.add({ targets: stamp, alpha: 0, duration: 260, delay: 720 });
  }

  private addPaperEffect(hotspot: SceneHotspot): void {
    const rect = this.getHotspotRect(hotspot);
    const paper = this.add.graphics().setDepth(52);
    paper.lineStyle(4, 0xffdf7e, 0.82);
    paper.beginPath();
    paper.moveTo(rect.x - rect.width * 0.32, rect.y - rect.height * 0.18);
    paper.lineTo(rect.x + rect.width * 0.26, rect.y - rect.height * 0.24);
    paper.moveTo(rect.x - rect.width * 0.28, rect.y + rect.height * 0.08);
    paper.lineTo(rect.x + rect.width * 0.32, rect.y + rect.height * 0.02);
    paper.strokePath();
    this.tweens.add({ targets: paper, y: -12, duration: 160, yoyo: true, ease: "Quad.out" });
    this.tweens.add({ targets: paper, alpha: 0, duration: 180, delay: 480 });
  }

  private addScratchEffect(hotspot: SceneHotspot): void {
    const rect = this.getHotspotRect(hotspot);
    const scratch = this.add.graphics().setDepth(52);
    scratch.lineStyle(4, 0xfff7df, 0.72);
    for (let index = 0; index < 5; index += 1) {
      const y = rect.y - rect.height * 0.26 + index * rect.height * 0.13;
      scratch.beginPath();
      scratch.moveTo(rect.x - rect.width * 0.28, y);
      scratch.lineTo(rect.x + rect.width * 0.22, y - 8);
      scratch.strokePath();
    }
    this.tweens.add({ targets: scratch, x: 8, duration: 80, yoyo: true, repeat: 3, ease: "Sine.inOut" });
    this.tweens.add({ targets: scratch, alpha: 0, duration: 180, delay: 560 });
  }

  private addEmbeddedMachine(): void {
    const progress = getOfficeProgress(this.officeData.scene, this.officeData.foundHotspotIds);
    const machine = this.add.graphics().setDepth(28);
    const x = 1015;
    const y = 515;
    machine.fillStyle(progress.complete ? 0x244d34 : 0x17261f, 0.88);
    machine.lineStyle(3, progress.complete ? 0xf3c45b : 0x6b7c6d, 0.75);
    machine.fillRoundedRect(x - 74, y - 38, 148, 76, 12);
    machine.strokeRoundedRect(x - 74, y - 38, 148, 76, 12);

    const wave = this.add.graphics().setDepth(29);
    wave.lineStyle(4, progress.complete ? 0xf3c45b : 0x87b46d, 0.92);
    wave.beginPath();
    for (let index = 0; index < 8; index += 1) {
      const px = x - 52 + index * 15;
      const py = progress.complete ? y : y + (index % 2 === 0 ? -10 : 10);
      if (index === 0) wave.moveTo(px, py);
      else wave.lineTo(px, py);
    }
    wave.strokePath();
  }

  private addMachinePulse(): void {
    const pulse = this.add.rectangle(1015, 515, 150, 78, 0xf3c45b, 0.25).setDepth(31);
    this.tweens.add({ targets: pulse, alpha: 0, scale: 1.35, duration: 680, ease: "Cubic.out" });
  }

  private addPlayableCharacter(): void {
    const state = this.getCharacterState();
    this.ensureCharacterAnimations();
    const sprite = this.add.sprite(characterCenterX, characterCenterY, `zhou-${state}`, 0).setDepth(24);
    const progressIndex = this.getCharacterProgressIndex();
    sprite.setScale(characterSceneScale * (1 + progressIndex * 0.003));
    sprite.setOrigin(0.5, 0.5);
    sprite.play(`zhou-${state}-anim`);

    if (progressIndex === 0) {
      sprite.setAlpha(0.96);
      this.tweens.add({ targets: sprite, y: sprite.y + 3, alpha: 0.9, duration: 1100, yoyo: true, repeat: -1, ease: "Sine.inOut" });
    } else if (progressIndex < 5) {
      sprite.setAlpha(0.98);
      this.tweens.add({ targets: sprite, y: sprite.y - 2 - progressIndex, alpha: 0.98, duration: 860, yoyo: true, repeat: -1, ease: "Sine.inOut" });
    } else {
      sprite.setAlpha(1);
      this.tweens.add({ targets: sprite, y: sprite.y - 7, scaleX: sprite.scaleX * 1.012, scaleY: sprite.scaleY * 1.012, duration: 520, yoyo: true, repeat: 1, ease: "Back.out" });
    }

    if (this.officeData.justFoundHotspotId) {
      this.tweens.add({
        targets: sprite,
        y: sprite.y - 24,
        scaleX: sprite.scaleX * 1.018,
        scaleY: sprite.scaleY * 1.018,
        duration: 180,
        yoyo: true,
        repeat: 1,
        ease: "Quad.out"
      });
    }
  }

  private getCharacterState(): CharacterState {
    return `progress-${this.getCharacterProgressIndex()}` as CharacterState;
  }

  private getCharacterProgressIndex(): number {
    const progress = getOfficeProgress(this.officeData.scene, this.officeData.foundHotspotIds);
    return Math.min(progress.foundCount, 5);
  }

  private ensureCharacterAnimations(): void {
    for (const state of characterStates) {
      const progressIndex = Number(state.replace("progress-", ""));
      const key = `zhou-${state}-anim`;
      if (this.anims.exists(key)) continue;
      this.anims.create({
        key,
        frames: this.anims.generateFrameNumbers(`zhou-${state}`, { start: 0, end: 3 }),
        frameRate: progressIndex === 0 ? 3 : progressIndex === 5 ? 6 : 5,
        repeat: -1,
        yoyo: true
      });
    }
  }

  private addProgressLighting(): void {
    const progress = getOfficeProgress(this.officeData.scene, this.officeData.foundHotspotIds);
    const state = progress.complete ? "complete" : progress.foundCount > 0 ? "recovering" : "idle";

    if (state !== "idle") {
      const warmth = this.add.rectangle(worldWidth / 2, worldHeight / 2, worldWidth, worldHeight, 0xf3c45b, state === "complete" ? 0.08 : 0.04).setDepth(4);
      warmth.setBlendMode(Phaser.BlendModes.ADD);
      this.tweens.add({ targets: warmth, alpha: state === "complete" ? 0.12 : 0.07, duration: 900, yoyo: true, repeat: -1, ease: "Sine.inOut" });
    }
  }

  private addCompletionState(): void {
    const progress = getOfficeProgress(this.officeData.scene, this.officeData.foundHotspotIds);
    if (!progress.complete) return;

    if (this.officeData.justFoundHotspotId) {
      playHitSound("complete");
    }
    const panel = this.add.graphics().setDepth(58);
    panel.fillStyle(0x17261f, 0.9);
    panel.lineStyle(2, 0xf3c45b, 0.5);
    panel.fillRoundedRect(910, 418, 190, 74, 12);
    panel.strokeRoundedRect(910, 418, 190, 74, 12);

    this.add.text(930, 436, "证据袋已封口", {
      color: "#f3c45b",
      fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif',
      fontSize: "15px",
      fontStyle: "bold"
    }).setDepth(59);
    this.add.text(930, 460, "工位已回魂", {
      color: "#fff7df",
      fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif',
      fontSize: "20px",
      fontStyle: "bold",
      wordWrap: { width: 150 }
    }).setDepth(59);
  }

  private getHotspotPoint(hotspot: SceneHotspot): { x: number; y: number } {
    return {
      x: ((hotspot.hitX ?? hotspot.x) / 100) * worldWidth,
      y: ((hotspot.hitY ?? hotspot.y) / 100) * worldHeight
    };
  }

  private getHotspotRect(hotspot: SceneHotspot): { x: number; y: number; width: number; height: number } {
    const point = this.getHotspotPoint(hotspot);
    return {
      ...point,
      width: ((hotspot.hitWidth ?? Math.max(7, hotspot.radius * 2)) / 100) * worldWidth,
      height: ((hotspot.hitHeight ?? Math.max(7, hotspot.radius * 2)) / 100) * worldHeight
    };
  }
}
