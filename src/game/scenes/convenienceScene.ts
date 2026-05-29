import Phaser from "phaser";
import type { HotspotEvidence, InvestigationScene, SceneHotspot } from "../../core/types";
import { playHitSound } from "../systems/audioSystem";
import { getOfficeProgress } from "../systems/progressSystem";

const worldWidth = 1280;
const worldHeight = 720;
const characterStates = ["progress-0", "progress-1", "progress-2", "progress-3", "progress-4", "progress-5", "progress-6", "progress-7"] as const;
type CharacterState = (typeof characterStates)[number];

export interface ConvenienceSceneData {
  scene: InvestigationScene;
  evidences: Record<string, HotspotEvidence>;
  challengeActive: boolean;
  hintedHotspotId: string;
  justFoundHotspotId: string;
  foundHotspotIds: string[];
  onHotspotFound: (hotspotId: string) => void;
  onMiss: () => void;
}

export class ConvenienceScene extends Phaser.Scene {
  private convenienceData!: ConvenienceSceneData;

  constructor() {
    super("ConvenienceScene");
  }

  create(data: ConvenienceSceneData): void {
    this.convenienceData = data;
    this.cameras.main.setBackgroundColor("#101915");

    this.addBackground();
    this.addStoreWash();
    this.addIntroCopy();

    if (data.challengeActive && !getOfficeProgress(data.scene, data.foundHotspotIds).complete) {
      this.addHotspotZones();
    }

    this.addFoundMarkers();
    this.addHintMarker();
    this.addRecentHitEffect();
    this.addCompletionState();
  }

  private addBackground(): void {
    const backgroundKey = `convenience-background-${this.getCharacterState()}`;
    if (!this.textures.exists(backgroundKey)) return;
    const image = this.add.image(worldWidth / 2, worldHeight / 2, backgroundKey);
    const scale = Math.max(worldWidth / image.width, worldHeight / image.height);
    image.setScale(scale).setDepth(0);
  }

  private addStoreWash(): void {
    const progress = getOfficeProgress(this.convenienceData.scene, this.convenienceData.foundHotspotIds);
    const tint = progress.complete ? 0xf3c45b : this.convenienceData.challengeActive ? 0x26361f : 0x06120f;
    const alpha = progress.complete ? 0.08 : this.convenienceData.challengeActive ? 0.1 : 0.28;
    this.add.rectangle(worldWidth / 2, worldHeight / 2, worldWidth, worldHeight, tint, alpha).setDepth(2);

    const vignette = this.add.graphics().setDepth(3);
    vignette.fillGradientStyle(0x06120f, 0x06120f, 0x06120f, 0x06120f, 0.48, 0.08, 0.08, 0.5);
    vignette.fillRect(0, 0, worldWidth, worldHeight);
  }

  private addIntroCopy(): void {
    if (this.convenienceData.challengeActive) return;

    const panel = this.add.graphics().setDepth(35);
    panel.fillStyle(0x17261f, 0.88);
    panel.lineStyle(2, 0xf3c45b, 0.38);
    panel.fillRoundedRect(72, 132, 458, 158, 10);
    panel.strokeRoundedRect(72, 132, 458, 158, 10);

    this.add.text(100, 154, "只买无糖茶", {
      color: "#f3c45b",
      fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif',
      fontSize: "22px",
      fontStyle: "bold"
    }).setDepth(36);
    this.add.text(100, 190, this.convenienceData.scene.name, {
      color: "#fff7df",
      fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif',
      fontSize: "38px",
      fontStyle: "bold"
    }).setDepth(36);
    this.add.text(100, 240, "开始后，把差一点、这本快了和顺手买票都拎出来。", {
      color: "#dce8dc",
      fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif',
      fontSize: "19px"
    }).setDepth(36);
  }

  private addHotspotZones(): void {
    const progress = getOfficeProgress(this.convenienceData.scene, this.convenienceData.foundHotspotIds);
    if (progress.complete) return;

    for (const hotspot of this.convenienceData.scene.hotspots) {
      if (this.convenienceData.foundHotspotIds.includes(hotspot.id)) continue;
      const rect = this.getHotspotRect(hotspot);
      const zone = this.add.zone(rect.x, rect.y, rect.width, rect.height).setDepth(42).setInteractive({ useHandCursor: true });
      zone.on("pointerdown", () => this.handleHotspot(hotspot));
    }

    this.input.on("pointerdown", (_pointer: Phaser.Input.Pointer, objects: Phaser.GameObjects.GameObject[]) => {
      if (objects.length > 0) return;
      playHitSound("miss");
      this.convenienceData.onMiss();
    });
  }

  private handleHotspot(hotspot: SceneHotspot): void {
    playHitSound(hotspot.animationKind ?? "paper");
    this.convenienceData.onHotspotFound(hotspot.id);
  }

  private addFoundMarkers(): void {
    const progress = getOfficeProgress(this.convenienceData.scene, this.convenienceData.foundHotspotIds);
    if (progress.complete) return;

    for (const hotspot of this.convenienceData.scene.hotspots) {
      if (!this.convenienceData.foundHotspotIds.includes(hotspot.id)) continue;
      const { x, y } = this.getHotspotPoint(hotspot);
      const marker = this.add.container(x, y).setDepth(45);
      const pin = this.add.graphics();
      pin.fillStyle(0x2f7a49, 0.96);
      pin.lineStyle(1.5, 0xffffff, 0.78);
      pin.fillCircle(0, 0, 6);
      pin.strokeCircle(0, 0, 6);
      const check = this.add.text(0, -2, "✓", {
        color: "#ffffff",
        fontFamily: "Arial, sans-serif",
        fontSize: "8px",
        fontStyle: "bold"
      }).setOrigin(0.5);
      marker.add([pin, check]);
    }
  }

  private addHintMarker(): void {
    const hotspot = this.convenienceData.scene.hotspots.find((item) => item.id === this.convenienceData.hintedHotspotId);
    if (!hotspot) return;
    const rect = this.getHotspotRect(hotspot);
    const hint = this.add.graphics().setDepth(44);
    hint.lineStyle(6, 0xf3c45b, 0.95);
    hint.strokeRoundedRect(rect.x - rect.width / 2, rect.y - rect.height / 2, rect.width, rect.height, 16);
    hint.lineStyle(2, 0xfff7df, 0.75);
    hint.strokeRoundedRect(rect.x - rect.width / 2 + 5, rect.y - rect.height / 2 + 5, rect.width - 10, rect.height - 10, 12);
    this.tweens.add({ targets: hint, alpha: 0.42, duration: 520, yoyo: true, repeat: 5, ease: "Sine.inOut" });
  }

  private addRecentHitEffect(): void {
    const hotspot = this.convenienceData.scene.hotspots.find((item) => item.id === this.convenienceData.justFoundHotspotId);
    if (!hotspot) return;

    const rect = this.getHotspotRect(hotspot);
    const kind = hotspot.animationKind;
    if (kind === "scratch" || kind === "ticket") this.addScratchEffect(rect);
    else if (kind === "photo") this.addPhotoEffect(rect, hotspot.evidenceId);
    else if (kind === "phone") this.addPhoneEffect(rect);
    else if (kind === "bottle") this.addBottleEffect(rect);
    else this.addNoteEffect(rect, hotspot.evidenceId);
  }

  private addScratchEffect(rect: { x: number; y: number; width: number; height: number }): void {
    const line = this.add.graphics().setDepth(52);
    line.lineStyle(5, 0xfff0b8, 0.78);
    line.beginPath();
    line.moveTo(rect.x - rect.width * 0.34, rect.y + rect.height * 0.08);
    line.lineTo(rect.x + rect.width * 0.32, rect.y - rect.height * 0.12);
    line.strokePath();
    this.tweens.add({ targets: line, alpha: 0.18, duration: 100, yoyo: true, repeat: 5, ease: "Sine.inOut" });
    this.tweens.add({ targets: line, alpha: 0, duration: 180, delay: 620 });
  }

  private addPhotoEffect(rect: { x: number; y: number; width: number; height: number }, evidenceId?: string): void {
    const frame = this.add.graphics().setDepth(52);
    frame.lineStyle(3, evidenceId === "max_prize_stand" ? 0xf3c45b : 0xfff0b8, 0.86);
    frame.strokeRoundedRect(rect.x - rect.width / 2, rect.y - rect.height / 2, rect.width, rect.height, 8);

    const sweep = this.add.graphics().setDepth(53);
    sweep.fillStyle(evidenceId === "max_prize_stand" ? 0xf3c45b : 0xffffff, 0.24);
    sweep.fillRoundedRect(rect.x - rect.width * 0.5, rect.y - rect.height * 0.34, rect.width * 0.22, rect.height * 0.68, 4);
    this.tweens.add({ targets: sweep, x: rect.width * 0.72, alpha: 0.04, duration: 520, ease: "Cubic.out" });

    if (evidenceId === "max_prize_stand") {
      this.addPrizeSparkles(rect);
    } else {
      this.addCornerTicks(rect, 0xfff0b8);
    }

    this.tweens.add({ targets: frame, alpha: 0, scaleX: 1.08, scaleY: 1.08, duration: 620, ease: "Cubic.out" });
    this.tweens.add({ targets: sweep, alpha: 0, duration: 120, delay: 520 });
  }

  private addPhoneEffect(rect: { x: number; y: number; width: number; height: number }): void {
    const pulse = this.add.graphics().setDepth(52);
    pulse.fillStyle(0xf3c45b, 0.72);
    pulse.fillCircle(rect.x, rect.y, 8);
    this.tweens.add({ targets: pulse, x: 7, duration: 70, yoyo: true, repeat: 5, ease: "Sine.inOut" });
    this.tweens.add({ targets: pulse, alpha: 0, scale: 1.45, duration: 220, delay: 520 });
  }

  private addBottleEffect(rect: { x: number; y: number; width: number; height: number }): void {
    const ring = this.add.graphics().setDepth(52);
    ring.lineStyle(4, 0x95d493, 0.76);
    ring.strokeEllipse(rect.x, rect.y, rect.width * 0.8, rect.height * 0.7);
    this.tweens.add({ targets: ring, alpha: 0, scaleX: 1.25, scaleY: 1.18, duration: 560, ease: "Cubic.out" });
  }

  private addNoteEffect(rect: { x: number; y: number; width: number; height: number }, evidenceId?: string): void {
    const glow = this.add.graphics().setDepth(52);
    glow.lineStyle(3, 0xf3c45b, 0.78);
    glow.strokeRoundedRect(rect.x - rect.width / 2, rect.y - rect.height / 2, rect.width, rect.height, 7);

    const scan = this.add.graphics().setDepth(53);
    scan.lineStyle(evidenceId === "payment_addon_prompt" ? 5 : 7, 0xfff0b8, 0.76);
    scan.beginPath();
    scan.moveTo(rect.x - rect.width * 0.36, rect.y - rect.height * 0.12);
    scan.lineTo(rect.x + rect.width * 0.34, rect.y - rect.height * 0.12);
    scan.strokePath();

    const dot = this.add.graphics().setDepth(54);
    dot.fillStyle(0xf3c45b, 0.86);
    dot.fillCircle(rect.x + rect.width * 0.28, rect.y + rect.height * 0.24, 4);

    this.tweens.add({ targets: glow, alpha: 0.18, scaleX: 1.08, scaleY: 1.08, duration: 620, ease: "Cubic.out" });
    this.tweens.add({ targets: scan, y: rect.height * 0.34, alpha: 0.08, duration: 520, ease: "Cubic.out" });
    this.tweens.add({ targets: dot, alpha: 0, scale: 2.2, duration: 420, ease: "Cubic.out" });
  }

  private addCornerTicks(rect: { x: number; y: number; width: number; height: number }, color: number): void {
    const ticks = this.add.graphics().setDepth(54);
    ticks.lineStyle(3, color, 0.82);
    const left = rect.x - rect.width / 2;
    const right = rect.x + rect.width / 2;
    const top = rect.y - rect.height / 2;
    const bottom = rect.y + rect.height / 2;
    const tick = Math.min(rect.width, rect.height) * 0.18;
    ticks.beginPath();
    ticks.moveTo(left, top + tick);
    ticks.lineTo(left, top);
    ticks.lineTo(left + tick, top);
    ticks.moveTo(right - tick, bottom);
    ticks.lineTo(right, bottom);
    ticks.lineTo(right, bottom - tick);
    ticks.strokePath();
    this.tweens.add({ targets: ticks, alpha: 0, duration: 580, ease: "Cubic.out" });
  }

  private addPrizeSparkles(rect: { x: number; y: number; width: number; height: number }): void {
    for (const point of [
      { x: -0.34, y: -0.24, r: 3 },
      { x: 0.18, y: -0.18, r: 4 },
      { x: 0.38, y: 0.12, r: 3 }
    ]) {
      const spark = this.add.graphics().setDepth(54);
      spark.fillStyle(0xf3c45b, 0.86);
      spark.fillCircle(rect.x + rect.width * point.x, rect.y + rect.height * point.y, point.r);
      this.tweens.add({ targets: spark, alpha: 0, scale: 2.6, duration: 520, ease: "Cubic.out" });
    }
  }

  private addCompletionState(): void {
    const progress = getOfficeProgress(this.convenienceData.scene, this.convenienceData.foundHotspotIds);
    if (!progress.complete) return;
    if (this.convenienceData.justFoundHotspotId) playHitSound("complete");

    const panel = this.add.graphics().setDepth(58);
    panel.fillStyle(0x17261f, 0.82);
    panel.lineStyle(1.5, 0xf3c45b, 0.42);
    panel.fillRoundedRect(892, 514, 190, 54, 8);
    panel.strokeRoundedRect(892, 514, 190, 54, 8);
    this.add.text(910, 526, "证据封口", {
      color: "#f3c45b",
      fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif',
      fontSize: "11px",
      fontStyle: "bold"
    }).setDepth(59);
    this.add.text(910, 542, "幻想已断电", {
      color: "#fff7df",
      fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif',
      fontSize: "18px",
      fontStyle: "bold"
    }).setDepth(59);
  }

  private getCharacterState(): CharacterState {
    const progress = getOfficeProgress(this.convenienceData.scene, this.convenienceData.foundHotspotIds);
    return `progress-${Math.min(progress.foundCount, characterStates.length - 1)}` as CharacterState;
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
