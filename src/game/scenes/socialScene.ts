import Phaser from "phaser";
import type { HotspotEvidence, InvestigationScene, SceneDecoy, SceneHotspot } from "../../core/types";
import { playHitSound } from "../systems/audioSystem";
import { getOfficeProgress } from "../systems/progressSystem";

const worldWidth = 1280;
const worldHeight = 720;
const characterStates = [
  "progress-0",
  "progress-1",
  "progress-2",
  "progress-3",
  "progress-4",
  "progress-5",
  "progress-6",
  "progress-7",
  "progress-8",
  "progress-9",
  "progress-10",
  "progress-11",
  "progress-12",
  "progress-13"
] as const;
type CharacterState = (typeof characterStates)[number];

interface RenderedSceneState {
  backgroundKey?: string;
  expressionKey?: string;
  foundCount: number;
  challengeActive: boolean;
}

const renderedSceneStates = new Map<string, RenderedSceneState>();

export interface SocialSceneData {
  scene: InvestigationScene;
  evidences: Record<string, HotspotEvidence>;
  challengeActive: boolean;
  hintedHotspotId: string;
  justFoundHotspotId: string;
  foundHotspotIds: string[];
  onHotspotFound: (hotspotId: string) => void;
  onMiss: () => void;
}

export class SocialScene extends Phaser.Scene {
  private socialData!: SocialSceneData;
  private previousRenderedState?: RenderedSceneState;

  constructor(sceneKey = "SocialScene") {
    super(sceneKey);
  }

  create(data: SocialSceneData): void {
    this.socialData = data;
    this.previousRenderedState = renderedSceneStates.get(data.scene.id);
    this.cameras.main.setBackgroundColor("#101915");

    this.addBackground();
    this.addStoreWash();
    this.addSocialExpressionOverlay();
    this.addIntroCopy();

    if (data.challengeActive && !getOfficeProgress(data.scene, data.foundHotspotIds).complete) {
      this.addHotspotZones();
    }

    this.addFoundMarkers();
    this.addHintMarker();
    this.addRecentHitEffect();
    this.addCompletionState();
    this.rememberRenderedState();
  }

  private addBackground(): void {
    const backgroundKey = this.getBackgroundTextureKey();
    if (!backgroundKey) return;
    const image = this.addScaledSceneImage(backgroundKey, 0);
    if (this.shouldAnimateProgressReveal(backgroundKey)) {
      image.setAlpha(0.72);
      this.tweens.add({ targets: image, alpha: 1, duration: 300, ease: "Cubic.out" });
    }
  }

  private addScaledSceneImage(textureKey: string, depth: number): Phaser.GameObjects.Image {
    const image = this.add.image(worldWidth / 2, worldHeight / 2, textureKey);
    const scale = Math.max(worldWidth / image.width, worldHeight / image.height);
    image.setScale(scale).setDepth(0);
    image.setDepth(depth);
    return image;
  }

  private getBackgroundTextureKey(): string | undefined {
    if (this.socialData.scene.id === "social" && this.textures.exists("social-background-progress-0")) {
      return "social-background-progress-0";
    }
    const backgroundKey = `${this.getTexturePrefix()}-background-${this.getCharacterState()}`;
    if (this.textures.exists(backgroundKey)) return backgroundKey;
    return undefined;
  }

  private shouldAnimateProgressReveal(nextKey?: string): boolean {
    const previous = this.previousRenderedState;
    if (!previous || !nextKey || previous.backgroundKey === nextKey) return false;
    if (!this.socialData.challengeActive || !previous.challengeActive) return false;
    const progress = getOfficeProgress(this.socialData.scene, this.socialData.foundHotspotIds);
    return previous.foundCount !== progress.foundCount;
  }

  private addStoreWash(): void {
    const progress = getOfficeProgress(this.socialData.scene, this.socialData.foundHotspotIds);
    const tint = progress.complete ? 0xf3c45b : this.socialData.challengeActive ? 0x26361f : 0x06120f;
    const alpha = progress.complete ? 0.08 : this.socialData.challengeActive ? 0.1 : 0.28;
    this.add.rectangle(worldWidth / 2, worldHeight / 2, worldWidth, worldHeight, tint, alpha).setDepth(2);

    const vignette = this.add.graphics().setDepth(3);
    vignette.fillGradientStyle(0x06120f, 0x06120f, 0x06120f, 0x06120f, 0.48, 0.08, 0.08, 0.5);
    vignette.fillRect(0, 0, worldWidth, worldHeight);

    if (this.shouldAnimateProgressReveal(this.getBackgroundTextureKey())) {
      const reveal = this.add.rectangle(worldWidth / 2, worldHeight / 2, worldWidth, worldHeight, 0x06120f, 0.26).setDepth(6);
      this.tweens.add({
        targets: reveal,
        alpha: 0,
        duration: 260,
        ease: "Cubic.out",
        onComplete: () => reveal.destroy()
      });
    }
  }

  private addSocialExpressionOverlay(): void {
    if (this.socialData.scene.id !== "social") return;
    const expressionKey = `social-expression-${this.getCharacterState()}`;
    if (!this.textures.exists(expressionKey)) return;
    const current = this.add.image(worldWidth / 2, worldHeight / 2, expressionKey).setDepth(4).setAlpha(0.94);
    const previousKey = this.previousRenderedState?.expressionKey;
    if (this.shouldAnimateExpressionTransition(previousKey, expressionKey)) {
      current.setAlpha(0.18);
      const previous = this.add.image(worldWidth / 2, worldHeight / 2, previousKey).setDepth(5).setAlpha(0.94);
      this.tweens.add({ targets: current, alpha: 0.94, duration: 300, ease: "Cubic.out" });
      this.tweens.add({
        targets: previous,
        alpha: 0,
        duration: 390,
        ease: "Cubic.out",
        onComplete: () => previous.destroy()
      });
    }
  }

  private shouldAnimateExpressionTransition(previousKey: string | undefined, nextKey: string): previousKey is string {
    if (!previousKey || previousKey === nextKey || !this.textures.exists(previousKey)) return false;
    const previous = this.previousRenderedState;
    if (!previous) return false;
    const progress = getOfficeProgress(this.socialData.scene, this.socialData.foundHotspotIds);
    return this.socialData.challengeActive && previous.challengeActive && previous.foundCount !== progress.foundCount;
  }

  private addIntroCopy(): void {
    if (this.socialData.challengeActive) return;

    const panel = this.add.graphics().setDepth(35);
    panel.fillStyle(0x17261f, 0.88);
    panel.lineStyle(2, 0xf3c45b, 0.38);
    panel.fillRoundedRect(468, 70, 430, 128, 10);
    panel.strokeRoundedRect(468, 70, 430, 128, 10);

    this.add.text(494, 92, this.getIntroKicker(), {
      color: "#f3c45b",
      fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif',
      fontSize: "22px",
      fontStyle: "bold"
    }).setDepth(36);
    this.add.text(494, 126, this.socialData.scene.name, {
      color: "#fff7df",
      fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif',
      fontSize: "38px",
      fontStyle: "bold"
    }).setDepth(36);
    this.add.text(494, 172, this.getIntroHelpText(), {
      color: "#dce8dc",
      fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif',
      fontSize: "18px"
    }).setDepth(36);
  }

  private addHotspotZones(): void {
    const progress = getOfficeProgress(this.socialData.scene, this.socialData.foundHotspotIds);
    if (progress.complete) return;

    for (const decoy of this.socialData.scene.decoys ?? []) {
      const rect = this.getDecoyRect(decoy);
      const zone = this.add.zone(rect.x, rect.y, rect.width, rect.height).setDepth(40).setInteractive({ useHandCursor: true });
      zone.on("pointerdown", () => this.handleDecoy(rect));
    }

    for (const hotspot of this.socialData.scene.hotspots) {
      if (this.socialData.foundHotspotIds.includes(hotspot.id)) continue;
      const rect = this.getHotspotRect(hotspot);
      const zone = this.add.zone(rect.x, rect.y, rect.width, rect.height).setDepth(42).setInteractive({ useHandCursor: true });
      zone.on("pointerdown", () => this.handleHotspot(hotspot));
    }

    this.input.on("pointerdown", (_pointer: Phaser.Input.Pointer, objects: Phaser.GameObjects.GameObject[]) => {
      if (objects.length > 0) return;
      playHitSound("miss");
      this.socialData.onMiss();
    });
  }

  private handleHotspot(hotspot: SceneHotspot): void {
    playHitSound(hotspot.animationKind ?? "paper");
    this.socialData.onHotspotFound(hotspot.id);
  }

  private handleDecoy(rect: { x: number; y: number; width: number; height: number }): void {
    playHitSound("miss");
    this.addDecoyEffect(rect);
    this.socialData.onMiss();
  }

  private addFoundMarkers(): void {
    const progress = getOfficeProgress(this.socialData.scene, this.socialData.foundHotspotIds);
    if (progress.complete) return;

    for (const hotspot of this.socialData.scene.hotspots) {
      if (!this.socialData.foundHotspotIds.includes(hotspot.id)) continue;
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
    const hotspot = this.socialData.scene.hotspots.find((item) => item.id === this.socialData.hintedHotspotId);
    if (!hotspot) return;
    const rect = this.getHotspotRect(hotspot);
    const hint = this.add.graphics().setDepth(44);
    if (this.socialData.scene.id === "stock") {
      hint.lineStyle(3, 0xf3c45b, 0.82);
      hint.strokeRoundedRect(rect.x - rect.width * 0.44, rect.y - rect.height * 0.34, rect.width * 0.88, rect.height * 0.68, 8);
      hint.fillStyle(0xf3c45b, 0.72);
      hint.fillCircle(rect.x + rect.width * 0.31, rect.y - rect.height * 0.22, 3.5);
      this.tweens.add({ targets: hint, alpha: 0.34, duration: 500, yoyo: true, repeat: 5, ease: "Sine.inOut" });
      return;
    }
    hint.lineStyle(6, 0xf3c45b, 0.95);
    hint.strokeRoundedRect(rect.x - rect.width / 2, rect.y - rect.height / 2, rect.width, rect.height, 16);
    hint.lineStyle(2, 0xfff7df, 0.75);
    hint.strokeRoundedRect(rect.x - rect.width / 2 + 5, rect.y - rect.height / 2 + 5, rect.width - 10, rect.height - 10, 12);
    this.tweens.add({ targets: hint, alpha: 0.42, duration: 520, yoyo: true, repeat: 5, ease: "Sine.inOut" });
  }

  private addRecentHitEffect(): void {
    const hotspot = this.socialData.scene.hotspots.find((item) => item.id === this.socialData.justFoundHotspotId);
    if (!hotspot) return;

    const rect = this.getFeedbackRect(this.getHotspotRect(hotspot));
    if (this.socialData.scene.id === "stock") {
      this.addCompactStockHitEffect(rect);
      return;
    }
    if (hotspot.evidenceId === "cropped_profit_screenshot") this.addProfitEffect(rect);
    else if (hotspot.evidenceId === "unsent_reply_draft") this.addDraftEffect(rect);
    else if (hotspot.evidenceId === "group_invite_popup") this.addInviteEffect(rect);
    else if (hotspot.evidenceId === "pinned_review_comment") this.addPinnedCommentEffect(rect);
    else if (hotspot.evidenceId === "ai_course_deadline") this.addDeadlineEffect(rect);
    else if (hotspot.evidenceId === "side_hustle_bookmark") this.addBookmarkEffect(rect);
    else if (hotspot.evidenceId === "mortgage_debit_notice") this.addMortgageEffect(rect);
    else if (hotspot.evidenceId === "household_overdue_bill") this.addBillEffect(rect);
    else this.addAnimationKindEffect(hotspot, rect);
  }

  private addProfitEffect(rect: { x: number; y: number; width: number; height: number }): void {
    const screen = this.add.graphics().setDepth(52);
    screen.lineStyle(2, 0xf3c45b, 0.82);
    screen.strokeRoundedRect(rect.x - rect.width * 0.32, rect.y - rect.height * 0.35, rect.width * 0.64, rect.height * 0.7, 6);

    const chart = this.add.graphics().setDepth(53);
    chart.lineStyle(3, 0x87c779, 0.88);
    chart.beginPath();
    chart.moveTo(rect.x - rect.width * 0.22, rect.y + rect.height * 0.15);
    chart.lineTo(rect.x - rect.width * 0.08, rect.y + rect.height * 0.05);
    chart.lineTo(rect.x + rect.width * 0.05, rect.y + rect.height * 0.08);
    chart.lineTo(rect.x + rect.width * 0.21, rect.y - rect.height * 0.15);
    chart.strokePath();

    const cropLine = this.add.graphics().setDepth(54);
    cropLine.lineStyle(2, 0xfff0b8, 0.78);
    cropLine.beginPath();
    cropLine.moveTo(rect.x - rect.width * 0.28, rect.y - rect.height * 0.04);
    cropLine.lineTo(rect.x + rect.width * 0.28, rect.y - rect.height * 0.04);
    cropLine.strokePath();

    this.tweens.add({ targets: chart, alpha: 0.2, y: -8, duration: 130, yoyo: true, repeat: 3, ease: "Sine.inOut" });
    this.tweens.add({ targets: [screen, chart, cropLine], alpha: 0, duration: 240, delay: 560, ease: "Cubic.out" });
  }

  private addInviteEffect(rect: { x: number; y: number; width: number; height: number }): void {
    const frame = this.add.graphics().setDepth(52);
    frame.lineStyle(2, 0xf3c45b, 0.82);
    frame.strokeRoundedRect(rect.x - rect.width * 0.36, rect.y - rect.height * 0.35, rect.width * 0.72, rect.height * 0.7, 6);

    for (let index = 0; index < 3; index += 1) {
      const line = this.add.graphics().setDepth(53);
      line.lineStyle(4, index === 2 ? 0x87c779 : 0xfff0b8, 0.72);
      line.beginPath();
      line.moveTo(rect.x - rect.width * 0.22, rect.y - rect.height * 0.12 + index * rect.height * 0.13);
      line.lineTo(rect.x + rect.width * (index === 2 ? 0.12 : 0.24), rect.y - rect.height * 0.12 + index * rect.height * 0.13);
      line.strokePath();
      this.tweens.add({ targets: line, alpha: 0, x: 8, duration: 420, delay: 80 * index, ease: "Cubic.out" });
    }

    this.tweens.add({ targets: frame, alpha: 0, scaleX: 1.08, scaleY: 1.08, duration: 680, ease: "Cubic.out" });
  }

  private addPinnedCommentEffect(rect: { x: number; y: number; width: number; height: number }): void {
    const card = this.add.graphics().setDepth(52);
    card.lineStyle(3, 0xf3c45b, 0.78);
    card.strokeRoundedRect(rect.x - rect.width * 0.42, rect.y - rect.height * 0.3, rect.width * 0.84, rect.height * 0.6, 6);

    const pin = this.add.graphics().setDepth(53);
    pin.fillStyle(0xd35a36, 0.82);
    pin.fillCircle(rect.x - rect.width * 0.33, rect.y - rect.height * 0.21, 5);
    pin.lineStyle(2, 0xfff0b8, 0.8);
    pin.beginPath();
    pin.moveTo(rect.x - rect.width * 0.22, rect.y - rect.height * 0.08);
    pin.lineTo(rect.x + rect.width * 0.24, rect.y - rect.height * 0.08);
    pin.strokePath();

    this.tweens.add({ targets: pin, y: -4, alpha: 0.2, duration: 130, yoyo: true, repeat: 3, ease: "Sine.inOut" });
    this.tweens.add({ targets: [card, pin], alpha: 0, duration: 260, delay: 620, ease: "Cubic.out" });
  }

  private addMortgageEffect(rect: { x: number; y: number; width: number; height: number }): void {
    const paper = this.add.graphics().setDepth(52);
    paper.lineStyle(3, 0xf3c45b, 0.82);
    paper.strokeRoundedRect(rect.x - rect.width * 0.42, rect.y - rect.height * 0.32, rect.width * 0.84, rect.height * 0.64, 5);

    const underline = this.add.graphics().setDepth(54);
    underline.lineStyle(4, 0xd35a36, 0.72);
    underline.beginPath();
    underline.moveTo(rect.x - rect.width * 0.22, rect.y + rect.height * 0.02);
    underline.lineTo(rect.x + rect.width * 0.26, rect.y + rect.height * 0.02);
    underline.strokePath();

    this.tweens.add({ targets: underline, alpha: 0.1, duration: 120, yoyo: true, repeat: 4, ease: "Sine.inOut" });
    this.tweens.add({ targets: [paper, underline], alpha: 0, duration: 260, delay: 620, ease: "Cubic.out" });
  }

  private addDeadlineEffect(rect: { x: number; y: number; width: number; height: number }): void {
    const glow = this.add.graphics().setDepth(52);
    glow.lineStyle(3, 0xf3c45b, 0.78);
    glow.strokeRoundedRect(rect.x - rect.width / 2, rect.y - rect.height / 2, rect.width, rect.height, 7);

    const scan = this.add.graphics().setDepth(53);
    scan.lineStyle(5, 0xfff0b8, 0.76);
    scan.beginPath();
    scan.moveTo(rect.x - rect.width * 0.24, rect.y + rect.height * 0.2);
    scan.lineTo(rect.x + rect.width * 0.34, rect.y + rect.height * 0.2);
    scan.strokePath();

    const tick = this.add.text(rect.x + rect.width * 0.27, rect.y + rect.height * 0.16, "23:59", {
      color: "#fff0b8",
      fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif',
      fontSize: "13px",
      fontStyle: "bold"
    }).setOrigin(0.5).setDepth(54);

    this.tweens.add({ targets: glow, alpha: 0.18, scaleX: 1.08, scaleY: 1.08, duration: 620, ease: "Cubic.out" });
    this.tweens.add({ targets: scan, alpha: 0.08, duration: 520, ease: "Cubic.out" });
    this.tweens.add({ targets: tick, alpha: 0, scale: 1.18, duration: 420, delay: 260, ease: "Cubic.out" });
  }

  private addDraftEffect(rect: { x: number; y: number; width: number; height: number }): void {
    const input = this.add.graphics().setDepth(52);
    input.lineStyle(3, 0xf3c45b, 0.78);
    input.strokeRoundedRect(rect.x - rect.width * 0.42, rect.y - rect.height * 0.28, rect.width * 0.72, rect.height * 0.42, 6);

    const cursor = this.add.graphics().setDepth(53);
    cursor.lineStyle(3, 0xfff0b8, 0.86);
    cursor.beginPath();
    cursor.moveTo(rect.x + rect.width * 0.25, rect.y - rect.height * 0.22);
    cursor.lineTo(rect.x + rect.width * 0.25, rect.y + rect.height * 0.05);
    cursor.strokePath();

    const unsent = this.add.graphics().setDepth(54);
    unsent.lineStyle(2, 0xd35a36, 0.76);
    unsent.strokeCircle(rect.x + rect.width * 0.34, rect.y - rect.height * 0.2, 6);

    this.tweens.add({ targets: cursor, alpha: 0.08, duration: 120, yoyo: true, repeat: 4, ease: "Stepped" });
    this.tweens.add({ targets: [input, cursor, unsent], alpha: 0, duration: 220, delay: 620, ease: "Cubic.out" });
  }

  private addCompactStockHitEffect(rect: { x: number; y: number; width: number; height: number }): void {
    const ringRadius = Math.max(7, Math.min(rect.width, rect.height) * 0.16);
    const centerX = rect.x;
    const centerY = rect.y;
    const ring = this.add.graphics().setDepth(52);
    ring.lineStyle(2.5, 0xf3c45b, 0.82);
    ring.strokeCircle(centerX, centerY, ringRadius);

    const tick = this.add.graphics().setDepth(53);
    tick.lineStyle(2.5, 0x87c779, 0.86);
    tick.beginPath();
    tick.moveTo(centerX - ringRadius * 0.42, centerY);
    tick.lineTo(centerX - ringRadius * 0.1, centerY + ringRadius * 0.34);
    tick.lineTo(centerX + ringRadius * 0.48, centerY - ringRadius * 0.4);
    tick.strokePath();

    const underline = this.add.graphics().setDepth(52);
    underline.lineStyle(2, 0xfff0b8, 0.52);
    underline.beginPath();
    underline.moveTo(rect.x - rect.width * 0.2, rect.y + rect.height * 0.26);
    underline.lineTo(rect.x + rect.width * 0.2, rect.y + rect.height * 0.26);
    underline.strokePath();

    this.tweens.add({ targets: ring, alpha: 0.18, scaleX: 1.35, scaleY: 1.35, duration: 440, ease: "Cubic.out" });
    this.tweens.add({ targets: tick, alpha: 0, y: -3, duration: 460, delay: 160, ease: "Cubic.out" });
    this.tweens.add({ targets: [ring, underline], alpha: 0, duration: 260, delay: 540, ease: "Cubic.out" });
  }

  private addBookmarkEffect(rect: { x: number; y: number; width: number; height: number }): void {
    const tab = this.add.graphics().setDepth(52);
    tab.lineStyle(3, 0xf3c45b, 0.78);
    tab.strokeRoundedRect(rect.x - rect.width * 0.32, rect.y - rect.height * 0.38, rect.width * 0.64, rect.height * 0.76, 5);

    const fold = this.add.graphics().setDepth(53);
    fold.lineStyle(3, 0xfff0b8, 0.78);
    fold.beginPath();
    fold.moveTo(rect.x + rect.width * 0.16, rect.y - rect.height * 0.3);
    fold.lineTo(rect.x + rect.width * 0.27, rect.y - rect.height * 0.18);
    fold.lineTo(rect.x + rect.width * 0.16, rect.y - rect.height * 0.06);
    fold.strokePath();

    this.tweens.add({ targets: fold, alpha: 0.16, duration: 140, yoyo: true, repeat: 4, ease: "Sine.inOut" });
    this.tweens.add({ targets: [tab, fold], alpha: 0, duration: 260, delay: 620, ease: "Cubic.out" });
  }

  private addBillEffect(rect: { x: number; y: number; width: number; height: number }): void {
    const paper = this.add.graphics().setDepth(52);
    paper.lineStyle(3, 0xf3c45b, 0.78);
    paper.strokeRoundedRect(rect.x - rect.width * 0.38, rect.y - rect.height * 0.36, rect.width * 0.76, rect.height * 0.72, 5);

    const stamp = this.add.graphics().setDepth(53);
    stamp.lineStyle(3, 0xd35a36, 0.78);
    stamp.strokeCircle(rect.x + rect.width * 0.18, rect.y + rect.height * 0.12, 13);
    stamp.lineStyle(2, 0xfff0b8, 0.76);
    stamp.beginPath();
    stamp.moveTo(rect.x - rect.width * 0.22, rect.y - rect.height * 0.1);
    stamp.lineTo(rect.x + rect.width * 0.1, rect.y - rect.height * 0.1);
    stamp.strokePath();

    this.tweens.add({ targets: stamp, angle: 7, alpha: 0.18, duration: 120, yoyo: true, repeat: 4, ease: "Sine.inOut" });
    this.tweens.add({ targets: [paper, stamp], alpha: 0, duration: 260, delay: 620, ease: "Cubic.out" });
  }

  private addAnimationKindEffect(hotspot: SceneHotspot, rect: { x: number; y: number; width: number; height: number }): void {
    if (hotspot.animationKind === "kline") {
      this.addDemoRowsEffect(rect);
      return;
    }
    if (hotspot.animationKind === "paper") {
      this.addSummaryEffect(rect);
      return;
    }
    if (hotspot.animationKind === "note") {
      this.addDeadlineEffect(rect);
      return;
    }
    if (hotspot.animationKind === "goldLine") {
      this.addGoldLineEffect(rect);
      return;
    }
    if (hotspot.animationKind === "scratch" || hotspot.animationKind === "ticket") {
      this.addScratchTicketEffect(rect);
      return;
    }
    if (hotspot.animationKind === "sign") {
      this.addSignPlateEffect(rect);
      return;
    }
    if (hotspot.animationKind === "photo") {
      this.addPhotoFrameEffect(rect);
      return;
    }
    if (hotspot.animationKind === "bottle") {
      this.addBottleCapEffect(rect);
      return;
    }
    if (hotspot.animationKind === "alert") {
      this.addLegacyTokenEffect(rect);
      return;
    }
    if (hotspot.animationKind === "contract") {
      this.addApprovalChainEffect(rect);
      return;
    }
    if (hotspot.animationKind === "receipt") {
      this.addStampQueueEffect(rect);
      return;
    }
    if (hotspot.animationKind === "chat") {
      this.addTabStripEffect(rect);
      return;
    }
    if (hotspot.animationKind === "news") {
      this.addClippingEffect(rect);
      return;
    }
    if (hotspot.animationKind === "phone") {
      this.addPhoneBuzzEffect(rect);
      return;
    }
    this.addGenericHitEffect(rect);
  }

  private addGoldLineEffect(rect: { x: number; y: number; width: number; height: number }): void {
    const chart = this.add.graphics().setDepth(52);
    chart.lineStyle(2.5, 0xf3c45b, 0.82);
    chart.strokeRoundedRect(rect.x - rect.width * 0.38, rect.y - rect.height * 0.28, rect.width * 0.76, rect.height * 0.56, 5);
    chart.lineStyle(3.5, 0xd35a36, 0.78);
    chart.beginPath();
    chart.moveTo(rect.x - rect.width * 0.28, rect.y + rect.height * 0.1);
    chart.lineTo(rect.x - rect.width * 0.12, rect.y - rect.height * 0.03);
    chart.lineTo(rect.x + rect.width * 0.02, rect.y + rect.height * 0.04);
    chart.lineTo(rect.x + rect.width * 0.24, rect.y - rect.height * 0.18);
    chart.strokePath();

    const cap = this.add.graphics().setDepth(53);
    cap.fillStyle(0xfff0b8, 0.78);
    cap.fillCircle(rect.x + rect.width * 0.24, rect.y - rect.height * 0.18, Math.max(3, Math.min(rect.width, rect.height) * 0.08));

    this.tweens.add({ targets: chart, alpha: 0.18, x: 4, duration: 120, yoyo: true, repeat: 3, ease: "Sine.inOut" });
    this.tweens.add({ targets: [chart, cap], alpha: 0, duration: 260, delay: 620, ease: "Cubic.out" });
  }

  private addScratchTicketEffect(rect: { x: number; y: number; width: number; height: number }): void {
    const ticket = this.add.graphics().setDepth(52);
    ticket.lineStyle(2.5, 0xf3c45b, 0.78);
    ticket.strokeRoundedRect(rect.x - rect.width * 0.38, rect.y - rect.height * 0.32, rect.width * 0.76, rect.height * 0.64, 5);

    const scratch = this.add.graphics().setDepth(53);
    scratch.lineStyle(4, 0xfff0b8, 0.72);
    scratch.beginPath();
    scratch.moveTo(rect.x - rect.width * 0.24, rect.y + rect.height * 0.12);
    scratch.lineTo(rect.x + rect.width * 0.2, rect.y - rect.height * 0.16);
    scratch.moveTo(rect.x - rect.width * 0.12, rect.y + rect.height * 0.18);
    scratch.lineTo(rect.x + rect.width * 0.3, rect.y - rect.height * 0.04);
    scratch.strokePath();

    this.tweens.add({ targets: scratch, alpha: 0.14, x: 5, duration: 110, yoyo: true, repeat: 4, ease: "Sine.inOut" });
    this.tweens.add({ targets: [ticket, scratch], alpha: 0, duration: 250, delay: 610, ease: "Cubic.out" });
  }

  private addSignPlateEffect(rect: { x: number; y: number; width: number; height: number }): void {
    const plate = this.add.graphics().setDepth(52);
    plate.lineStyle(2.5, 0xf3c45b, 0.8);
    plate.strokeRoundedRect(rect.x - rect.width * 0.34, rect.y - rect.height * 0.34, rect.width * 0.68, rect.height * 0.68, 4);
    plate.lineStyle(3, 0xfff0b8, 0.78);
    plate.beginPath();
    plate.moveTo(rect.x, rect.y - rect.height * 0.18);
    plate.lineTo(rect.x - rect.width * 0.16, rect.y + rect.height * 0.12);
    plate.lineTo(rect.x + rect.width * 0.16, rect.y + rect.height * 0.12);
    plate.closePath();
    plate.strokePath();

    this.tweens.add({ targets: plate, alpha: 0.18, scaleX: 1.05, scaleY: 1.05, duration: 150, yoyo: true, repeat: 3, ease: "Sine.inOut" });
    this.tweens.add({ targets: plate, alpha: 0, duration: 250, delay: 600, ease: "Cubic.out" });
  }

  private addPhotoFrameEffect(rect: { x: number; y: number; width: number; height: number }): void {
    const frame = this.add.graphics().setDepth(52);
    frame.lineStyle(2.5, 0xf3c45b, 0.78);
    frame.strokeRoundedRect(rect.x - rect.width * 0.4, rect.y - rect.height * 0.3, rect.width * 0.8, rect.height * 0.6, 5);

    const crop = this.add.graphics().setDepth(53);
    crop.lineStyle(2.5, 0xfff0b8, 0.74);
    crop.beginPath();
    crop.moveTo(rect.x - rect.width * 0.32, rect.y - rect.height * 0.18);
    crop.lineTo(rect.x - rect.width * 0.2, rect.y - rect.height * 0.18);
    crop.moveTo(rect.x + rect.width * 0.2, rect.y + rect.height * 0.18);
    crop.lineTo(rect.x + rect.width * 0.32, rect.y + rect.height * 0.18);
    crop.strokePath();

    this.tweens.add({ targets: crop, alpha: 0.16, x: 4, y: -3, duration: 130, yoyo: true, repeat: 3, ease: "Sine.inOut" });
    this.tweens.add({ targets: [frame, crop], alpha: 0, duration: 260, delay: 620, ease: "Cubic.out" });
  }

  private addBottleCapEffect(rect: { x: number; y: number; width: number; height: number }): void {
    const cap = this.add.graphics().setDepth(52);
    cap.lineStyle(3, 0x87c779, 0.78);
    cap.strokeEllipse(rect.x, rect.y, rect.width * 0.52, rect.height * 0.34);
    cap.lineStyle(2.5, 0xfff0b8, 0.72);
    cap.beginPath();
    cap.moveTo(rect.x - rect.width * 0.18, rect.y);
    cap.lineTo(rect.x + rect.width * 0.18, rect.y);
    cap.strokePath();
    this.tweens.add({ targets: cap, angle: 5, alpha: 0.16, duration: 120, yoyo: true, repeat: 4, ease: "Sine.inOut" });
    this.tweens.add({ targets: cap, alpha: 0, duration: 250, delay: 620, ease: "Cubic.out" });
  }

  private addDemoRowsEffect(rect: { x: number; y: number; width: number; height: number }): void {
    const frame = this.add.graphics().setDepth(52);
    frame.lineStyle(2.5, 0xf3c45b, 0.78);
    frame.strokeRoundedRect(rect.x - rect.width * 0.42, rect.y - rect.height * 0.34, rect.width * 0.84, rect.height * 0.68, 6);

    const rows: Phaser.GameObjects.Graphics[] = [];
    for (let index = 0; index < 4; index += 1) {
      const row = this.add.graphics().setDepth(53);
      row.lineStyle(3, index % 2 === 0 ? 0x87c779 : 0xfff0b8, 0.72);
      row.beginPath();
      row.moveTo(rect.x - rect.width * 0.28, rect.y - rect.height * 0.18 + index * rect.height * 0.12);
      row.lineTo(rect.x + rect.width * 0.28, rect.y - rect.height * 0.18 + index * rect.height * 0.12);
      row.strokePath();
      rows.push(row);
      this.tweens.add({ targets: row, alpha: 0.14, x: 6, duration: 140, delay: index * 55, yoyo: true, repeat: 2, ease: "Sine.inOut" });
    }
    this.tweens.add({ targets: [frame, ...rows], alpha: 0, duration: 260, delay: 680, ease: "Cubic.out" });
  }

  private addSummaryEffect(rect: { x: number; y: number; width: number; height: number }): void {
    const page = this.add.graphics().setDepth(52);
    page.lineStyle(2.5, 0xf3c45b, 0.78);
    page.strokeRoundedRect(rect.x - rect.width * 0.38, rect.y - rect.height * 0.34, rect.width * 0.76, rect.height * 0.68, 5);

    const check = this.add.graphics().setDepth(53);
    check.lineStyle(4, 0x87c779, 0.82);
    check.beginPath();
    check.moveTo(rect.x - rect.width * 0.18, rect.y + rect.height * 0.02);
    check.lineTo(rect.x - rect.width * 0.04, rect.y + rect.height * 0.15);
    check.lineTo(rect.x + rect.width * 0.24, rect.y - rect.height * 0.16);
    check.strokePath();

    const erase = this.add.graphics().setDepth(54);
    erase.lineStyle(3, 0xd35a36, 0.74);
    erase.beginPath();
    erase.moveTo(rect.x - rect.width * 0.28, rect.y - rect.height * 0.12);
    erase.lineTo(rect.x + rect.width * 0.2, rect.y - rect.height * 0.12);
    erase.strokePath();

    this.tweens.add({ targets: check, alpha: 0.16, duration: 120, yoyo: true, repeat: 4, ease: "Sine.inOut" });
    this.tweens.add({ targets: [page, check, erase], alpha: 0, duration: 260, delay: 620, ease: "Cubic.out" });
  }

  private addLegacyTokenEffect(rect: { x: number; y: number; width: number; height: number }): void {
    const token = this.add.graphics().setDepth(52);
    token.lineStyle(3, 0xf3c45b, 0.8);
    token.strokeRoundedRect(rect.x - rect.width * 0.24, rect.y - rect.height * 0.34, rect.width * 0.48, rect.height * 0.68, 5);
    token.lineStyle(2, 0xd35a36, 0.72);
    token.strokeCircle(rect.x, rect.y, Math.min(rect.width, rect.height) * 0.15);

    const spark = this.add.graphics().setDepth(53);
    spark.lineStyle(3, 0xfff0b8, 0.78);
    spark.beginPath();
    spark.moveTo(rect.x - rect.width * 0.3, rect.y - rect.height * 0.08);
    spark.lineTo(rect.x - rect.width * 0.14, rect.y - rect.height * 0.2);
    spark.moveTo(rect.x + rect.width * 0.18, rect.y + rect.height * 0.2);
    spark.lineTo(rect.x + rect.width * 0.32, rect.y + rect.height * 0.08);
    spark.strokePath();

    this.tweens.add({ targets: token, x: 3, duration: 80, yoyo: true, repeat: 5, ease: "Stepped" });
    this.tweens.add({ targets: [token, spark], alpha: 0, duration: 260, delay: 560, ease: "Cubic.out" });
  }

  private addApprovalChainEffect(rect: { x: number; y: number; width: number; height: number }): void {
    const chain = this.add.graphics().setDepth(52);
    chain.lineStyle(3, 0xf3c45b, 0.78);
    chain.strokeRoundedRect(rect.x - rect.width * 0.42, rect.y - rect.height * 0.32, rect.width * 0.84, rect.height * 0.64, 5);
    chain.lineStyle(2.5, 0xd35a36, 0.82);
    chain.strokeCircle(rect.x - rect.width * 0.18, rect.y - rect.height * 0.04, 7);
    chain.strokeCircle(rect.x + rect.width * 0.08, rect.y + rect.height * 0.1, 7);
    chain.beginPath();
    chain.moveTo(rect.x - rect.width * 0.1, rect.y - rect.height * 0.02);
    chain.lineTo(rect.x + rect.width * 0.01, rect.y + rect.height * 0.06);
    chain.strokePath();

    this.tweens.add({ targets: chain, alpha: 0.18, scaleX: 1.04, scaleY: 1.04, duration: 180, yoyo: true, repeat: 2, ease: "Sine.inOut" });
    this.tweens.add({ targets: chain, alpha: 0, duration: 260, delay: 620, ease: "Cubic.out" });
  }

  private addStampQueueEffect(rect: { x: number; y: number; width: number; height: number }): void {
    const stack = this.add.graphics().setDepth(52);
    stack.lineStyle(2.5, 0xf3c45b, 0.78);
    for (let index = 0; index < 3; index += 1) {
      stack.strokeRoundedRect(
        rect.x - rect.width * 0.35 + index * 4,
        rect.y - rect.height * 0.28 + index * 4,
        rect.width * 0.7,
        rect.height * 0.44,
        4
      );
    }
    const stamp = this.add.graphics().setDepth(53);
    stamp.lineStyle(3, 0xd35a36, 0.8);
    stamp.strokeCircle(rect.x + rect.width * 0.18, rect.y + rect.height * 0.12, 12);
    this.tweens.add({ targets: stamp, angle: -8, scaleX: 1.12, scaleY: 1.12, duration: 130, yoyo: true, repeat: 3, ease: "Sine.inOut" });
    this.tweens.add({ targets: [stack, stamp], alpha: 0, duration: 260, delay: 620, ease: "Cubic.out" });
  }

  private addTabStripEffect(rect: { x: number; y: number; width: number; height: number }): void {
    const tabs: Phaser.GameObjects.Graphics[] = [];
    for (let index = 0; index < 5; index += 1) {
      const tab = this.add.graphics().setDepth(52 + index);
      tab.lineStyle(2, index === 4 ? 0xd35a36 : 0xf3c45b, 0.76);
      tab.strokeRoundedRect(rect.x - rect.width * 0.44 + index * rect.width * 0.17, rect.y - rect.height * 0.28, rect.width * 0.18, rect.height * 0.5, 4);
      tabs.push(tab);
      this.tweens.add({ targets: tab, y: index % 2 === 0 ? -4 : 4, alpha: 0.2, duration: 120, delay: index * 45, yoyo: true, repeat: 3, ease: "Sine.inOut" });
    }
    this.tweens.add({ targets: tabs, alpha: 0, duration: 260, delay: 640, ease: "Cubic.out" });
  }

  private addClippingEffect(rect: { x: number; y: number; width: number; height: number }): void {
    const clip = this.add.graphics().setDepth(52);
    clip.lineStyle(3, 0xf3c45b, 0.78);
    clip.strokeRoundedRect(rect.x - rect.width * 0.38, rect.y - rect.height * 0.3, rect.width * 0.76, rect.height * 0.6, 4);
    clip.lineStyle(3, 0xd35a36, 0.8);
    clip.beginPath();
    clip.moveTo(rect.x - rect.width * 0.26, rect.y - rect.height * 0.08);
    clip.lineTo(rect.x + rect.width * 0.24, rect.y - rect.height * 0.08);
    clip.strokePath();

    this.tweens.add({ targets: clip, angle: 2, alpha: 0.16, duration: 120, yoyo: true, repeat: 4, ease: "Sine.inOut" });
    this.tweens.add({ targets: clip, alpha: 0, duration: 260, delay: 620, ease: "Cubic.out" });
  }

  private addPhoneBuzzEffect(rect: { x: number; y: number; width: number; height: number }): void {
    const phone = this.add.graphics().setDepth(52);
    phone.lineStyle(3, 0xf3c45b, 0.8);
    phone.strokeRoundedRect(rect.x - rect.width * 0.26, rect.y - rect.height * 0.38, rect.width * 0.52, rect.height * 0.76, 7);
    const ring = this.add.graphics().setDepth(53);
    ring.lineStyle(2, 0xd35a36, 0.72);
    ring.strokeCircle(rect.x + rect.width * 0.16, rect.y - rect.height * 0.2, 7);

    this.tweens.add({ targets: phone, x: 4, duration: 70, yoyo: true, repeat: 6, ease: "Stepped" });
    this.tweens.add({ targets: ring, alpha: 0.12, scaleX: 1.6, scaleY: 1.6, duration: 520, ease: "Cubic.out" });
    this.tweens.add({ targets: [phone, ring], alpha: 0, duration: 240, delay: 620, ease: "Cubic.out" });
  }

  private addDecoyEffect(rect: { x: number; y: number; width: number; height: number }): void {
    const centerX = rect.x + rect.width * Phaser.Math.FloatBetween(-0.08, 0.08);
    const centerY = rect.y + rect.height * Phaser.Math.FloatBetween(-0.08, 0.08);
    const dust = this.add.graphics().setDepth(51);
    dust.lineStyle(2, 0x94a093, 0.5);
    dust.strokeCircle(centerX, centerY, Math.min(rect.width, rect.height) * 0.18);

    const tick = this.add.graphics().setDepth(52);
    tick.lineStyle(2, 0x5d6a60, 0.72);
    tick.beginPath();
    tick.moveTo(centerX - 8, centerY + 1);
    tick.lineTo(centerX + 8, centerY - 1);
    tick.strokePath();

    this.tweens.add({ targets: dust, alpha: 0, scaleX: 1.6, scaleY: 1.6, duration: 360, ease: "Cubic.out" });
    this.tweens.add({ targets: tick, alpha: 0, duration: 260, delay: 130, ease: "Cubic.out" });
  }

  private addGenericHitEffect(rect: { x: number; y: number; width: number; height: number }): void {
    const frame = this.add.graphics().setDepth(52);
    frame.lineStyle(3, 0xf3c45b, 0.78);
    frame.strokeRoundedRect(rect.x - rect.width * 0.42, rect.y - rect.height * 0.36, rect.width * 0.84, rect.height * 0.72, 6);

    const scan = this.add.graphics().setDepth(53);
    scan.lineStyle(4, 0xfff0b8, 0.78);
    scan.beginPath();
    scan.moveTo(rect.x - rect.width * 0.28, rect.y);
    scan.lineTo(rect.x + rect.width * 0.28, rect.y);
    scan.strokePath();

    this.tweens.add({ targets: scan, alpha: 0.12, y: -6, duration: 160, yoyo: true, repeat: 3, ease: "Sine.inOut" });
    this.tweens.add({ targets: [frame, scan], alpha: 0, duration: 260, delay: 620, ease: "Cubic.out" });
  }

  private addCompletionState(): void {
    const progress = getOfficeProgress(this.socialData.scene, this.socialData.foundHotspotIds);
    if (!progress.complete) return;
    if (this.socialData.justFoundHotspotId) playHitSound("complete");

    const panel = this.add.graphics().setDepth(58);
    panel.fillStyle(0x17261f, 0.82);
    panel.lineStyle(1.5, 0xf3c45b, 0.42);
    panel.fillRoundedRect(882, 514, 210, 54, 8);
    panel.strokeRoundedRect(882, 514, 210, 54, 8);
    this.add.text(900, 526, this.getCompletionKicker(), {
      color: "#f3c45b",
      fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif',
      fontSize: "11px",
      fontStyle: "bold"
    }).setDepth(59);
    this.add.text(900, 542, this.getCompletionLabel(), {
      color: "#fff7df",
      fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif',
      fontSize: "18px",
      fontStyle: "bold"
    }).setDepth(59);
  }

  private getCharacterState(): CharacterState {
    const progress = getOfficeProgress(this.socialData.scene, this.socialData.foundHotspotIds);
    return `progress-${Math.min(progress.foundCount, characterStates.length - 1)}` as CharacterState;
  }

  private rememberRenderedState(): void {
    const progress = getOfficeProgress(this.socialData.scene, this.socialData.foundHotspotIds);
    renderedSceneStates.set(this.socialData.scene.id, {
      backgroundKey: this.getBackgroundTextureKey(),
      expressionKey: this.socialData.scene.id === "social" ? `social-expression-${this.getCharacterState()}` : undefined,
      foundCount: progress.foundCount,
      challengeActive: this.socialData.challengeActive
    });
  }

  private getTexturePrefix(): "social" | "ai-launch" | "meeting" | "nest" | "stock" {
    if (this.socialData.scene.id === "ai_launch") return "ai-launch";
    if (this.socialData.scene.id === "meeting") return "meeting";
    if (this.socialData.scene.id === "nest") return "nest";
    if (this.socialData.scene.id === "stock") return "stock";
    return "social";
  }

  private getIntroHelpText(): string {
    if (this.socialData.scene.id === "nest") return "开始后，把六类污染源和六枚反击标签从母巢里分出来。";
    if (this.socialData.scene.id === "meeting") return "开始后，把机会话术背后缺掉的资源和责任转移找出来。";
    if (this.socialData.scene.id === "ai_launch") return "开始后，把发布会和课程里真正放大恐慌的东西找出来。";
    if (this.socialData.scene.id === "stock") return "开始后，把暴涨榜旁边的追涨诱因和风险折角分出来。";
    return "开始后，把高光里没拍进去的成本找出来。";
  }

  private getIntroKicker(): string {
    if (this.socialData.scene.id === "nest") return "地下室已接线";
    if (this.socialData.scene.id === "meeting") return "复盘会刚散场";
    if (this.socialData.scene.id === "ai_launch") return "发布会自动连播";
    if (this.socialData.scene.id === "stock") return "热榜深夜亮起";
    return "凌晨刷到第一条";
  }

  private getCompletionKicker(): string {
    if (this.socialData.scene.id === "nest") return "母巢粉碎";
    if (this.socialData.scene.id === "meeting") return "责任切割";
    if (this.socialData.scene.id === "ai_launch") return "恐慌降噪";
    if (this.socialData.scene.id === "stock") return "热榜冷却";
    return "高光拆帧";
  }

  private getCompletionLabel(): string {
    if (this.socialData.scene.id === "nest") return "噪声已挂牌";
    if (this.socialData.scene.id === "meeting") return "画饼锅已切开";
    if (this.socialData.scene.id === "ai_launch") return "替代恐慌已降噪";
    if (this.socialData.scene.id === "stock") return "追涨冲动已降温";
    return "比较心已降噪";
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

  private getFeedbackRect(rect: { x: number; y: number; width: number; height: number }): { x: number; y: number; width: number; height: number } {
    const width = Phaser.Math.Clamp(rect.width * 0.68, 42, 132);
    const height = Phaser.Math.Clamp(rect.height * 0.68, 34, 112);
    return {
      x: rect.x,
      y: rect.y,
      width,
      height
    };
  }

  private getDecoyRect(decoy: SceneDecoy): { x: number; y: number; width: number; height: number } {
    return {
      x: (decoy.x / 100) * worldWidth,
      y: (decoy.y / 100) * worldHeight,
      width: (decoy.hitWidth / 100) * worldWidth,
      height: (decoy.hitHeight / 100) * worldHeight
    };
  }
}

export class AiLaunchScene extends SocialScene {
  constructor() {
    super("AiLaunchScene");
  }
}

export class MeetingScene extends SocialScene {
  constructor() {
    super("MeetingScene");
  }
}

export class NestScene extends SocialScene {
  constructor() {
    super("NestScene");
  }
}

export class StockScene extends SocialScene {
  constructor() {
    super("StockScene");
  }
}
