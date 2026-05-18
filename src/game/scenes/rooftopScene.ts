import Phaser from "phaser";
import type { HotspotEvidence, InvestigationScene, SceneHotspot } from "../../core/types";
import { playHitSound } from "../systems/audioSystem";
import { getOfficeProgress } from "../systems/progressSystem";

const worldWidth = 1280;
const worldHeight = 720;
const characterStates = ["progress-0", "progress-1", "progress-2", "progress-3", "progress-4", "progress-5"] as const;
type CharacterState = (typeof characterStates)[number];

export interface RooftopSceneData {
  scene: InvestigationScene;
  evidences: Record<string, HotspotEvidence>;
  challengeActive: boolean;
  hintedHotspotId: string;
  justFoundHotspotId: string;
  foundHotspotIds: string[];
  onHotspotFound: (hotspotId: string) => void;
  onMiss: () => void;
}

export class RooftopScene extends Phaser.Scene {
  private rooftopData!: RooftopSceneData;

  constructor() {
    super("RooftopScene");
  }

  create(data: RooftopSceneData): void {
    this.rooftopData = data;
    this.cameras.main.setBackgroundColor("#0f1a16");

    this.addBackground();
    this.addRooftopWash();
    this.addCoolingFurnace();
    this.addPlayableCharacter();
    this.addSceneCopy();

    if (data.challengeActive && !getOfficeProgress(data.scene, data.foundHotspotIds).complete) {
      this.addClueObjects();
      this.addHotspotZones();
    } else if (data.challengeActive) {
      this.addClueObjects();
    }

    this.addFoundMarkers();
    this.addHintMarker();
    this.addRecentHitEffect();
    this.addCompletionState();
  }

  private addBackground(): void {
    if (!this.textures.exists("rooftop-background")) return;
    const image = this.add.image(worldWidth / 2, worldHeight / 2, "rooftop-background");
    const scale = Math.max(worldWidth / image.width, worldHeight / image.height);
    image.setScale(scale).setDepth(0);
  }

  private addRooftopWash(): void {
    const progress = getOfficeProgress(this.rooftopData.scene, this.rooftopData.foundHotspotIds);
    const tint = progress.complete ? 0xf3c45b : this.rooftopData.challengeActive ? 0x244d34 : 0x07110e;
    const alpha = progress.complete ? 0.1 : this.rooftopData.challengeActive ? 0.14 : 0.32;
    this.add.rectangle(worldWidth / 2, worldHeight / 2, worldWidth, worldHeight, tint, alpha).setDepth(2);

    const vignette = this.add.graphics().setDepth(3);
    vignette.fillGradientStyle(0x07110e, 0x07110e, 0x07110e, 0x07110e, 0.58, 0.12, 0.12, 0.55);
    vignette.fillRect(0, 0, worldWidth, worldHeight);
  }

  private addSceneCopy(): void {
    if (this.rooftopData.challengeActive) return;

    const panel = this.add.graphics().setDepth(35);
    panel.fillStyle(0x17261f, 0.9);
    panel.lineStyle(2, 0xf3c45b, 0.4);
    panel.fillRoundedRect(72, 132, 420, 154, 10);
    panel.strokeRoundedRect(72, 132, 420, 154, 10);

    this.add.text(100, 154, "风有点大", {
      color: "#f3c45b",
      fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif',
      fontSize: "22px",
      fontStyle: "bold"
    }).setDepth(36);
    this.add.text(100, 190, this.rooftopData.scene.name, {
      color: "#fff7df",
      fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif',
      fontSize: "38px",
      fontStyle: "bold"
    }).setDepth(36);
    this.add.text(100, 240, "开始后，把追高、快讯和嘴硬送进冷却炉。", {
      color: "#dce8dc",
      fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif',
      fontSize: "20px"
    }).setDepth(36);
  }

  private addPressurePhrases(): void {
    const chips = [
      { text: "长期配置", x: 290, y: 156 },
      { text: "越跌越买", x: 908, y: 162 },
      { text: "我不是短线", x: 722, y: 512 },
      { text: "避险而已", x: 1048, y: 310 }
    ];

    chips.forEach((chip, index) => {
      const container = this.add.container(chip.x, chip.y).setDepth(20);
      const bg = this.add.graphics();
      bg.fillStyle(index % 2 === 0 ? 0x17261f : 0x6f3c20, 0.8);
      bg.lineStyle(1, 0xfff7df, 0.18);
      bg.fillRoundedRect(-80, -20, 160, 40, 20);
      bg.strokeRoundedRect(-80, -20, 160, 40, 20);
      const label = this.add.text(0, -1, chip.text, {
        color: "#fff7df",
        fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif',
        fontSize: "19px",
        fontStyle: "bold"
      }).setOrigin(0.5);
      container.add([bg, label]);
      this.tweens.add({ targets: container, y: chip.y - 7, duration: 1400 + index * 220, yoyo: true, repeat: -1, ease: "Sine.inOut" });
    });
  }

  private addClueObjects(): void {
    for (const hotspot of this.rooftopData.scene.hotspots) {
      if (!hotspot.image) continue;
      const key = this.getClueTextureKey(hotspot);
      if (!this.textures.exists(key)) continue;
      const { x, y } = this.getHotspotPoint(hotspot, false);
      this.addClueContactShadow(hotspot, x, y);
      const image = this.add.image(x, y, key).setDepth(this.getClueDepth(hotspot));
      const width = ((hotspot.imageWidth ?? hotspot.radius * 2) / 100) * worldWidth;
      image.setDisplaySize(width, width * (image.height / image.width));
      image.setAlpha(this.rooftopData.foundHotspotIds.includes(hotspot.id) ? 0.72 : 1);
      image.setAngle(this.getClueAngle(hotspot));
    }
  }

  private addClueContactShadow(hotspot: SceneHotspot, x: number, y: number): void {
    const shadow = this.getClueShadow(hotspot);
    const ellipse = this.add.ellipse(
      x + shadow.offsetX,
      y + shadow.offsetY,
      shadow.width,
      shadow.height,
      0x03100c,
      this.rooftopData.foundHotspotIds.includes(hotspot.id) ? shadow.alpha * 0.6 : shadow.alpha
    ).setDepth(shadow.depth);
    ellipse.setAngle(shadow.angle);
  }

  private addHotspotZones(): void {
    const progress = getOfficeProgress(this.rooftopData.scene, this.rooftopData.foundHotspotIds);
    if (progress.complete) return;

    for (const hotspot of this.rooftopData.scene.hotspots) {
      if (this.rooftopData.foundHotspotIds.includes(hotspot.id)) continue;
      const rect = this.getHotspotRect(hotspot);
      const zone = this.add.zone(rect.x, rect.y, rect.width, rect.height).setDepth(42).setInteractive({ useHandCursor: true });
      zone.on("pointerdown", () => this.handleHotspot(hotspot));
    }

    this.input.on("pointerdown", (pointer: Phaser.Input.Pointer, objects: Phaser.GameObjects.GameObject[]) => {
      if (objects.length > 0) return;
      playHitSound("miss");
      this.rooftopData.onMiss();
    });
  }

  private handleHotspot(hotspot: SceneHotspot): void {
    playHitSound(hotspot.animationKind ?? "paper");
    this.rooftopData.onHotspotFound(hotspot.id);
  }

  private addFoundMarkers(): void {
    for (const hotspot of this.rooftopData.scene.hotspots) {
      if (!this.rooftopData.foundHotspotIds.includes(hotspot.id)) continue;
      const { x, y } = this.getHotspotPoint(hotspot);
      const marker = this.add.container(x + 22, y - 20).setDepth(45);
      const pin = this.add.graphics();
      pin.fillStyle(0x2f7a49, 0.96);
      pin.lineStyle(3, 0xffffff, 0.88);
      pin.fillCircle(0, 0, 12);
      pin.strokeCircle(0, 0, 12);
      const check = this.add.text(0, -2, "✓", {
        color: "#ffffff",
        fontFamily: "Arial, sans-serif",
        fontSize: "16px",
        fontStyle: "bold"
      }).setOrigin(0.5);
      marker.add([pin, check]);
    }
  }

  private addHintMarker(): void {
    const hotspot = this.rooftopData.scene.hotspots.find((item) => item.id === this.rooftopData.hintedHotspotId);
    if (!hotspot) return;
    const rect = this.getHotspotRect(hotspot);
    const hint = this.add.graphics().setDepth(44);
    hint.lineStyle(5, 0xf3c45b, 0.9);
    hint.strokeRoundedRect(rect.x - rect.width / 2, rect.y - rect.height / 2, rect.width, rect.height, 16);
    this.tweens.add({ targets: hint, alpha: 0.24, duration: 460, yoyo: true, repeat: 4, ease: "Sine.inOut" });
  }

  private addRecentHitEffect(): void {
    const hotspot = this.rooftopData.scene.hotspots.find((item) => item.id === this.rooftopData.justFoundHotspotId);
    if (!hotspot) return;

    const kind = hotspot.animationKind;
    if (kind === "receipt") this.addReceiptEffect(hotspot);
    if (kind === "chat") this.addStampEffect(hotspot);
    if (kind === "news") this.addNewsEffect(hotspot);
    if (kind === "alert") this.addAlertEffect(hotspot);
    if (kind === "sign") this.addSignEffect(hotspot);
    this.addMachinePulse();
  }

  private addReceiptEffect(hotspot: SceneHotspot): void {
    const rect = this.getHotspotRect(hotspot);
    const crease = this.add.graphics().setDepth(52);
    crease.lineStyle(5, 0xfff0b8, 0.85);
    crease.beginPath();
    crease.moveTo(rect.x - rect.width * 0.3, rect.y - rect.height * 0.16);
    crease.lineTo(rect.x + rect.width * 0.22, rect.y + rect.height * 0.16);
    crease.strokePath();
    this.tweens.add({ targets: crease, y: -10, duration: 160, yoyo: true, repeat: 1, ease: "Quad.out" });
    this.tweens.add({ targets: crease, alpha: 0, duration: 180, delay: 520 });
  }

  private addStampEffect(hotspot: SceneHotspot): void {
    const rect = this.getHotspotRect(hotspot);
    const stamp = this.add.text(rect.x + rect.width * 0.12, rect.y + rect.height * 0.1, "截获", {
      color: "#c64628",
      backgroundColor: "rgba(255, 246, 223, 0.88)",
      fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif',
      fontSize: "18px",
      fontStyle: "bold",
      padding: { x: 7, y: 4 }
    }).setOrigin(0.5).setAngle(-7).setDepth(52).setScale(1.26);
    this.tweens.add({ targets: stamp, scale: 1, duration: 170, ease: "Back.out" });
    this.tweens.add({ targets: stamp, alpha: 0, duration: 240, delay: 700 });
  }

  private addNewsEffect(hotspot: SceneHotspot): void {
    const rect = this.getHotspotRect(hotspot);
    const line = this.add.graphics().setDepth(52);
    line.lineStyle(6, 0xf3c45b, 0.8);
    line.strokeRoundedRect(rect.x - rect.width * 0.34, rect.y - rect.height * 0.25, rect.width * 0.68, rect.height * 0.28, 8);
    line.lineStyle(5, 0xc64628, 0.75);
    line.beginPath();
    line.moveTo(rect.x - rect.width * 0.28, rect.y + rect.height * 0.18);
    line.lineTo(rect.x + rect.width * 0.25, rect.y + rect.height * 0.18);
    line.strokePath();
    this.tweens.add({ targets: line, alpha: 0.18, duration: 120, yoyo: true, repeat: 4, ease: "Sine.inOut" });
    this.tweens.add({ targets: line, alpha: 0, duration: 190, delay: 650 });
  }

  private addAlertEffect(hotspot: SceneHotspot): void {
    const rect = this.getHotspotRect(hotspot);
    const pulse = this.add.graphics().setDepth(52);
    pulse.fillStyle(0xc64628, 0.82);
    pulse.fillCircle(rect.x + rect.width * 0.28, rect.y - rect.height * 0.3, 14);
    this.tweens.add({ targets: pulse, x: 8, duration: 70, yoyo: true, repeat: 5, ease: "Sine.inOut" });
    this.tweens.add({ targets: pulse, alpha: 0, scale: 1.5, duration: 220, delay: 520 });
  }

  private addSignEffect(hotspot: SceneHotspot): void {
    const rect = this.getHotspotRect(hotspot);
    const underline = this.add.graphics().setDepth(52);
    underline.lineStyle(8, 0xf3c45b, 0.82);
    underline.beginPath();
    underline.moveTo(rect.x - rect.width * 0.36, rect.y + rect.height * 0.06);
    underline.lineTo(rect.x + rect.width * 0.34, rect.y + rect.height * 0.06);
    underline.strokePath();
    this.tweens.add({ targets: underline, angle: 2, duration: 80, yoyo: true, repeat: 5, ease: "Sine.inOut" });
    this.tweens.add({ targets: underline, alpha: 0, duration: 180, delay: 600 });
  }

  private addCoolingFurnace(): void {
    if (!this.textures.exists("rooftop-cooling-furnace")) return;
    const progress = getOfficeProgress(this.rooftopData.scene, this.rooftopData.foundHotspotIds);
    this.add.ellipse(1036, 603, 182, 32, 0x03100c, 0.28).setDepth(25);
    const machine = this.add.image(1035, 538, "rooftop-cooling-furnace").setDepth(27);
    machine.setDisplaySize(176, 147);
    machine.setAlpha(progress.complete ? 1 : 0.93);

    if (progress.complete) {
      this.tweens.add({ targets: machine, scaleX: machine.scaleX * 1.03, scaleY: machine.scaleY * 1.03, duration: 760, yoyo: true, repeat: -1, ease: "Sine.inOut" });
    }
  }

  private addMachinePulse(): void {
    const pulse = this.add.ellipse(1008, 515, 66, 34, 0xf3c45b, 0.22).setDepth(31);
    this.tweens.add({ targets: pulse, alpha: 0, scaleX: 1.4, scaleY: 1.18, duration: 560, ease: "Cubic.out" });
  }

  private addPlayableCharacter(): void {
    const state = this.getCharacterState();
    this.ensureCharacterAnimations();
    const sprite = this.add.sprite(630, 438, `trader-${state}`, 0).setDepth(24);
    const progressIndex = this.getCharacterProgressIndex();
    sprite.setScale(0.45 * (1 + progressIndex * 0.01));
    sprite.setOrigin(0.5, 0.58);
    sprite.play(`trader-${state}-anim`);

    if (progressIndex === 0) {
      this.tweens.add({ targets: sprite, y: sprite.y + 4, alpha: 0.92, duration: 980, yoyo: true, repeat: -1, ease: "Sine.inOut" });
    } else if (progressIndex < 5) {
      this.tweens.add({ targets: sprite, y: sprite.y - 3 - progressIndex, duration: 820, yoyo: true, repeat: -1, ease: "Sine.inOut" });
    } else {
      this.tweens.add({ targets: sprite, y: sprite.y - 12, scaleX: sprite.scaleX * 1.018, scaleY: sprite.scaleY * 1.018, duration: 560, yoyo: true, repeat: 1, ease: "Back.out" });
    }

    if (this.rooftopData.justFoundHotspotId) {
      this.tweens.add({
        targets: sprite,
        y: sprite.y - 22,
        scaleX: sprite.scaleX * 1.018,
        scaleY: sprite.scaleY * 1.018,
        duration: 170,
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
    const progress = getOfficeProgress(this.rooftopData.scene, this.rooftopData.foundHotspotIds);
    return Math.min(progress.foundCount, 5);
  }

  private ensureCharacterAnimations(): void {
    for (const state of characterStates) {
      const progressIndex = Number(state.replace("progress-", ""));
      const key = `trader-${state}-anim`;
      if (this.anims.exists(key)) continue;
      this.anims.create({
        key,
        frames: this.anims.generateFrameNumbers(`trader-${state}`, { start: 0, end: 3 }),
        frameRate: progressIndex === 0 ? 3 : progressIndex === 5 ? 6 : 5,
        repeat: -1,
        yoyo: true
      });
    }
  }

  private addCompletionState(): void {
    const progress = getOfficeProgress(this.rooftopData.scene, this.rooftopData.foundHotspotIds);
    if (!progress.complete) return;
    if (this.rooftopData.justFoundHotspotId) playHitSound("complete");

    const panel = this.add.graphics().setDepth(58);
    panel.fillStyle(0x17261f, 0.9);
    panel.lineStyle(2, 0xf3c45b, 0.5);
    panel.fillRoundedRect(910, 418, 204, 78, 12);
    panel.strokeRoundedRect(910, 418, 204, 78, 12);
    this.add.text(930, 436, "证据袋已封口", {
      color: "#f3c45b",
      fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif',
      fontSize: "15px",
      fontStyle: "bold"
    }).setDepth(59);
    this.add.text(930, 460, "接盘已冷却", {
      color: "#fff7df",
      fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif',
      fontSize: "20px",
      fontStyle: "bold"
    }).setDepth(59);
  }

  private getClueTextureKey(hotspot: SceneHotspot): string {
    return `rooftop-clue-${hotspot.id}`;
  }

  private getClueDepth(hotspot: SceneHotspot): number {
    if (hotspot.id === "h5") return 18;
    if (hotspot.id === "h1") return 28;
    return 26;
  }

  private getClueAngle(hotspot: SceneHotspot): number {
    const angles: Record<string, number> = { h1: -7, h2: 2, h3: 4, h4: -8, h5: 1 };
    return angles[hotspot.id] ?? 0;
  }

  private getClueShadow(hotspot: SceneHotspot): { width: number; height: number; offsetX: number; offsetY: number; angle: number; alpha: number; depth: number } {
    const shadows: Record<string, { width: number; height: number; offsetX: number; offsetY: number; angle: number; alpha: number; depth: number }> = {
      h1: { width: 168, height: 28, offsetX: 4, offsetY: 50, angle: -9, alpha: 0.28, depth: 25 },
      h2: { width: 150, height: 24, offsetX: 0, offsetY: 54, angle: 3, alpha: 0.22, depth: 24 },
      h3: { width: 150, height: 20, offsetX: 8, offsetY: 45, angle: 4, alpha: 0.18, depth: 24 },
      h4: { width: 84, height: 20, offsetX: 4, offsetY: 72, angle: -8, alpha: 0.26, depth: 24 },
      h5: { width: 186, height: 18, offsetX: 0, offsetY: 44, angle: 1, alpha: 0.16, depth: 17 }
    };
    return shadows[hotspot.id] ?? { width: 120, height: 22, offsetX: 0, offsetY: 42, angle: 0, alpha: 0.22, depth: 24 };
  }

  private getHotspotPoint(hotspot: SceneHotspot, hit = true): { x: number; y: number } {
    return {
      x: ((hit ? hotspot.hitX ?? hotspot.x : hotspot.x) / 100) * worldWidth,
      y: ((hit ? hotspot.hitY ?? hotspot.y : hotspot.y) / 100) * worldHeight
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
