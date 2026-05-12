import type { InvestigationScene, SceneHotspot } from "../core/types";

export interface InvestigationSceneOption {
  id: string;
  name: string;
}

export interface InvestigationViewParams {
  activeScene: InvestigationScene;
  sceneOptions?: InvestigationSceneOption[];
  themeLabel: string;
  challengeActive?: boolean;
  hintedHotspotId?: string;
  justFoundHotspotId?: string;
  sceneReaction?: "celebrate" | "deflate" | "";
  selectedEvidenceId?: string;
  foundCount?: number;
  totalCount?: number;
  foundItemTitles?: string[];
  toast?: string;
  description?: string;
  hotspots?: SceneHotspot[];
  challengeLabel?: string;
  hintLabel?: string;
  nextSceneId?: string;
  nextSceneName?: string;
}

export interface SceneProgress {
  found: number;
  total: number;
  complete: boolean;
  remaining: number;
}

export function getSceneProgress(hotspots: readonly Pick<SceneHotspot, "found">[]): SceneProgress {
  const total = hotspots.length;
  const found = hotspots.filter((hotspot) => hotspot.found).length;

  return {
    found,
    total,
    complete: total > 0 && found >= total,
    remaining: Math.max(0, total - found)
  };
}

export function renderInvestigationView(params: InvestigationViewParams): string {
  const hotspots = params.hotspots ?? params.activeScene.hotspots;
  const progress = getSceneProgress(hotspots);
  const foundCount = params.foundCount ?? progress.found;
  const totalCount = params.totalCount ?? progress.total;
  const sceneOptions = params.sceneOptions ?? [{ id: params.activeScene.id, name: params.activeScene.name }];
  const description = params.description ?? params.activeScene.description;
  const toast = params.toast ?? description;
  const challengeLabel = params.challengeLabel ?? "开始翻找";
  const hintLabel = params.hintLabel ?? "给个提示";
  const challengeActive = params.challengeActive ?? true;
  const hintedHotspotId = params.hintedHotspotId ?? "";
  const justFoundHotspotId = params.justFoundHotspotId ?? "";
  const selectedEvidenceId = params.selectedEvidenceId ?? "";
  const sceneReaction = params.sceneReaction ?? "";
  const foundItemTitles = params.foundItemTitles ?? [];
  const sceneComplete = progress.complete;
  const activeFoundHotspot = justFoundHotspotId ? hotspots.find((hotspot) => hotspot.id === justFoundHotspotId) : undefined;
  const revealText = activeFoundHotspot?.revealText ?? (sceneComplete ? params.activeScene.completeText : "");
  const phaseClass = sceneComplete ? "phase-complete" : challengeActive ? "phase-search" : "phase-intro";

  return `
    <section class="game-stage investigation-view ${phaseClass} ${sceneComplete ? "scene-complete" : ""} ${sceneReaction ? `reaction-${sceneReaction}` : ""}" data-scene-id="${escapeAttribute(params.activeScene.id)}">
      <div class="stage-copy">
        <span>${escapeHtml(params.themeLabel)}</span>
        <h2>${escapeHtml(params.activeScene.name)}</h2>
        <p>${escapeHtml(toast)}</p>
        <small class="investigation-description">${escapeHtml(description)}</small>
        ${renderMoodCard(params.activeScene, sceneReaction, sceneComplete, challengeActive)}
        ${renderEnemyBrief(params.activeScene)}
        ${renderFindLog(foundItemTitles)}
        ${sceneComplete ? `<div class="completion-badge">找齐了</div>` : ""}
      </div>
      <div class="scene-control">
        <select data-action="scene" aria-label="切换找茬场景">
          ${sceneOptions
            .map(
              (scene) =>
                `<option value="${escapeAttribute(scene.id)}" ${scene.id === params.activeScene.id ? "selected" : ""}>${escapeHtml(scene.name)}</option>`
            )
            .join("")}
        </select>
        <strong>${foundCount}/${totalCount}</strong>
      </div>
      <div class="scene-art ${params.activeScene.backgroundImage ? "image-scene" : ""}" role="group" aria-label="${escapeAttribute(`${params.activeScene.name}找茬区域`)}">
        ${renderSceneBackdrop(params.activeScene)}
        ${challengeActive && !sceneComplete ? renderNoiseLayer(params.activeScene) : ""}
        ${renderSceneReactionLayer(sceneReaction)}
        ${renderSceneCharacter(params.activeScene, sceneReaction, sceneComplete)}
        ${challengeActive || sceneComplete ? hotspots.map((hotspot) => renderHotspotObject(hotspot, hintedHotspotId, justFoundHotspotId, selectedEvidenceId, challengeActive)).join("") : ""}
        ${challengeActive && !sceneComplete ? hotspots.map((hotspot) => renderHotspot(hotspot, hintedHotspotId, justFoundHotspotId, selectedEvidenceId)).join("") : ""}
        ${renderSceneMachine(params.activeScene, revealText ?? "")}
        ${!challengeActive && !sceneComplete ? renderSceneIntro(params.activeScene) : ""}
        ${sceneComplete ? `<div class="scene-complete-stamp" aria-hidden="true">找<br />齐了</div>` : ""}
      </div>
      <div class="stage-actions">
        ${
          sceneComplete && params.nextSceneId
            ? `<button class="primary" data-action="next-scene" data-id="${escapeAttribute(params.nextSceneId)}">下一关：${escapeHtml(params.nextSceneName ?? "继续")}</button>`
            : !sceneComplete
              ? `<button class="primary" data-action="start-challenge">${escapeHtml(challengeLabel)}</button>`
              : ""
        }
        ${
          challengeActive && !sceneComplete
            ? `
              <button data-action="hint-ad">${escapeHtml(hintLabel)}</button>
            `
            : ""
        }
      </div>
    </section>
  `;
}

function renderSceneBackdrop(scene: InvestigationScene): string {
  if (scene.backgroundImage) {
    return `<img class="scene-bg" src="${escapeAttribute(scene.backgroundImage)}" alt="${escapeAttribute(scene.name)}" draggable="false" />`;
  }

  return `
    <div class="scene-sun"></div>
    <div class="wall-title">破防现场</div>
    <div class="poster poster-a">金价</div>
    <div class="poster poster-b">AI</div>
    <div class="desk"></div>
    <div class="screen"></div>
    <div class="paper"></div>
    <div class="phone"></div>
  `;
}

function renderMoodCard(
  scene: InvestigationScene,
  sceneReaction: "celebrate" | "deflate" | "",
  sceneComplete: boolean,
  challengeActive: boolean
): string {
  const mood = sceneComplete ? "complete" : sceneReaction || (challengeActive ? "watch" : "idle");
  const label =
    mood === "complete"
      ? "暂时松口气"
      : mood === "celebrate"
        ? "找对了"
        : mood === "deflate"
          ? "想偏了"
          : getSceneHint(scene.id);

  return `
    <div class="mood-card mood-${escapeAttribute(mood)}" aria-live="polite">
      <div class="mood-face">
        <span class="mood-brow mood-brow-left"></span>
        <span class="mood-brow mood-brow-right"></span>
        <span class="mood-eye mood-eye-left"></span>
        <span class="mood-eye mood-eye-right"></span>
        <span class="mood-mouth"></span>
        <span class="mood-cheek mood-cheek-left"></span>
        <span class="mood-cheek mood-cheek-right"></span>
      </div>
      <div class="mood-copy">
        <strong>${label}</strong>
      </div>
    </div>
  `;
}

function getSceneHint(sceneId: string): string {
  if (sceneId === "office") return "听见了吗";
  if (sceneId === "moments") return "别人赚钱";
  if (sceneId === "temple") return "低成本暴富";
  return "先看处境";
}

function renderEnemyBrief(scene: InvestigationScene): string {
  if (!scene.enemyName && !scene.enemyDescription) {
    return "";
  }

  return `
    <div class="enemy-brief">
      <span>污染源</span>
      <strong>${escapeHtml(scene.enemyName ?? "未知噪声")}</strong>
      ${scene.enemyDescription ? `<p>${escapeHtml(scene.enemyDescription)}</p>` : ""}
    </div>
  `;
}

function renderSceneMachine(scene: InvestigationScene, revealText: string): string {
  if (scene.machineEmbedded) {
    return revealText
      ? `
        <div class="embedded-machine-output" aria-live="polite">
          <span>${escapeHtml(scene.machineName ?? "处理完成")}</span>
          <strong>${escapeHtml(revealText)}</strong>
        </div>
      `
      : "";
  }

  if (!scene.machineImage) {
    return "";
  }

  return `
    <div class="scene-machine ${revealText ? "has-output" : ""}" aria-live="polite">
      <img src="${escapeAttribute(scene.machineImage)}" alt="${escapeAttribute(scene.machineName ?? "处理机器")}" draggable="false" />
      ${
        revealText
          ? `
            <div class="machine-output">
              <span>${escapeHtml(scene.machineName ?? "处理完成")}</span>
              <strong>${escapeHtml(revealText)}</strong>
            </div>
          `
          : ""
      }
    </div>
  `;
}

function renderSceneIntro(scene: InvestigationScene): string {
  return `
    <div class="scene-intro-card" aria-hidden="true">
      <span>${escapeHtml(scene.hint ?? "先听现场")}</span>
      <strong>${escapeHtml(scene.enemyName ?? "噪声还没现形")}</strong>
      <p>${escapeHtml(scene.enemyDescription ?? "启动处理后，藏在画面里的东西会开始露头。")}</p>
    </div>
  `;
}

function renderNoiseLayer(scene: InvestigationScene): string {
  const linesByScene: Record<string, string[]> = {
    office: ["别人都上车了", "今晚先给一版", "普通人最后机会", "回本先还花呗"],
    moments: ["他又赚了", "只是运气好", "房贷已扣款", "AI 又裁人"],
    temple: ["再来一张", "大棋来了", "香火很旺", "老板来电"]
  };
  const lines = linesByScene[scene.id] ?? [];
  if (lines.length === 0) return "";

  return `
    <div class="noise-layer" aria-hidden="true">
      ${lines
        .map(
          (line, index) =>
            `<span class="noise-chip noise-chip-${index + 1}">${escapeHtml(line)}</span>`
        )
        .join("")}
    </div>
  `;
}

function renderSceneCharacter(scene: InvestigationScene, sceneReaction: "celebrate" | "deflate" | "", sceneComplete: boolean): string {
  const character = scene.character;
  if (!character) return "";

  const stateClass = sceneComplete ? "scene-complete" : sceneReaction ? `reaction-${sceneReaction}` : "";
  const sourceClass = character.source === "cutout" ? "cutout" : "mascot";
  const flipClass = character.flipX ? "flip-x" : "";
  const width = character.width ? `--character-width:${character.width}%;` : "";
  const height = character.height ? `--character-height:${character.height}%;` : "";

  return `
    <div
      class="scene-character ${sourceClass} ${flipClass} ${stateClass}"
      style="left:${toPercent(character.x)}%; top:${toPercent(character.y)}%; --character-scale:${character.scale ?? 1}; ${width}${height}"
      aria-hidden="true"
    >
      <span class="char-shadow"></span>
      <span class="char-head"></span>
      <span class="char-body"></span>
      <span class="char-arm char-arm-left"></span>
      <span class="char-arm char-arm-right"></span>
      <span class="char-leg char-leg-left"></span>
      <span class="char-leg char-leg-right"></span>
      <span class="char-face"></span>
      <span class="char-sweat"></span>
      <span class="char-spark char-spark-left"></span>
      <span class="char-spark char-spark-right"></span>
      <span class="char-panic char-panic-left"></span>
      <span class="char-panic char-panic-right"></span>
      <span class="char-boost"></span>
    </div>
  `;
}

function renderHotspotObject(
  hotspot: SceneHotspot,
  hintedHotspotId: string,
  justFoundHotspotId: string,
  selectedEvidenceId: string,
  challengeActive: boolean
): string {
  if (!hotspot.image || hotspot.renderMode === "embedded") {
    return "";
  }

  const width = hotspot.imageWidth ?? Math.max(8, hotspot.radius * 2);
  const selected = hotspot.evidenceId === selectedEvidenceId;
  const stateClass = [
    hotspot.found ? (hotspot.id === justFoundHotspotId ? "found just-found" : "found") : "",
    hotspot.id === hintedHotspotId ? "hinted" : "",
    selected ? "selected" : ""
  ]
    .filter(Boolean)
    .join(" ");
  const offsetX = hotspot.anchorX ?? 50;
  const offsetY = hotspot.anchorY ?? 50;
  const actionAttrs = challengeActive
    ? `data-action="hotspot" data-id="${escapeAttribute(hotspot.id)}" data-evidence-id="${escapeAttribute(hotspot.evidenceId)}"`
    : "";
  return `
    <button
      class="hotspot-object-trigger ${stateClass}"
      style="left:${toPercent(hotspot.x)}%; top:${toPercent(hotspot.y)}%; width:${width}%; --anchor-x:${offsetX}%; --anchor-y:${offsetY}%"
      aria-label="${escapeAttribute(hotspot.label)}"
      aria-pressed="${selected ? "true" : "false"}"
      data-status="${hotspot.found ? "found" : "hidden"}"
      data-evidence-id="${escapeAttribute(hotspot.evidenceId)}"
      ${actionAttrs}
      ${hotspot.found ? "disabled" : ""}
    >
      <img
        class="hotspot-object ${stateClass}"
        src="${escapeAttribute(hotspot.image)}"
        alt=""
        draggable="false"
      />
    </button>
  `;
}

function renderHotspot(hotspot: SceneHotspot, hintedHotspotId: string, justFoundHotspotId: string, selectedEvidenceId: string): string {
  const diameter = Math.max(0, hotspot.radius * 2);
  const hitScale = hotspot.hitScale ?? 1;
  const embedded = hotspot.renderMode === "embedded";
  const hitSize = hotspot.image
    ? `${Math.max(11, (hotspot.imageWidth ?? hotspot.radius * 2) * 1.4 * hitScale)}%`
    : embedded
      ? `${Math.max(6, diameter * hitScale)}%`
    : `${Math.max(40, diameter * hitScale)}px`;
  const hitWidth = hotspot.hitWidth ? `${hotspot.hitWidth}%` : hitSize;
  const hitHeight = hotspot.hitHeight ? `${hotspot.hitHeight}%` : hitSize;
  const hitX = hotspot.hitX ?? hotspot.x;
  const hitY = hotspot.hitY ?? hotspot.y;
  const revealed = hotspot.found || hotspot.id === hintedHotspotId;
  const selected = hotspot.evidenceId === selectedEvidenceId;
  const stateClass = [
    hotspot.found ? (hotspot.id === justFoundHotspotId ? "found just-found" : "found") : revealed ? "hinted" : "hidden",
    selected ? "selected" : ""
  ]
    .filter(Boolean)
    .join(" ");

  return `
    <button
      class="hotspot ${hotspot.image ? "object-target" : ""} ${stateClass}"
      style="left:${toPercent(hitX)}%; top:${toPercent(hitY)}%; --r:${diameter}px; --hit-size:${hitSize}; --hit-width:${hitWidth}; --hit-height:${hitHeight}"
      data-action="hotspot"
      data-id="${escapeAttribute(hotspot.id)}"
      data-evidence-id="${escapeAttribute(hotspot.evidenceId)}"
      aria-label="${escapeAttribute(hotspot.label)}"
      aria-pressed="${hotspot.found ? "true" : "false"}"
      ${hotspot.found ? "disabled" : ""}
    >${hotspot.found ? "✓" : revealed ? "!" : ""}</button>
  `;
}

function renderFindLog(foundItemTitles: string[]): string {
  if (foundItemTitles.length === 0) {
    return "";
  }

  return `
    <div class="find-log" aria-live="polite">
      <span>已找到</span>
      <div>
        ${foundItemTitles.map((title) => `<b>${escapeHtml(title)}</b>`).join("")}
      </div>
    </div>
  `;
}

function renderSceneReactionLayer(sceneReaction: "celebrate" | "deflate" | ""): string {
  if (!sceneReaction) {
    return "";
  }

  if (sceneReaction === "celebrate") {
    return `
      <div class="reaction-layer celebrate" aria-hidden="true">
        <span style="--x:18%;--y:68%;--dx:-12px;--dy:-42px;--s:18px;--d:0ms"></span>
        <span style="--x:30%;--y:72%;--dx:4px;--dy:-36px;--s:12px;--d:60ms"></span>
        <span style="--x:50%;--y:64%;--dx:10px;--dy:-48px;--s:16px;--d:120ms"></span>
        <span style="--x:66%;--y:70%;--dx:-2px;--dy:-34px;--s:10px;--d:180ms"></span>
        <span style="--x:80%;--y:62%;--dx:14px;--dy:-40px;--s:14px;--d:240ms"></span>
        <span style="--x:54%;--y:50%;--dx:0px;--dy:-62px;--s:22px;--d:90ms"></span>
      </div>
    `;
  }

  return `
    <div class="reaction-layer deflate" aria-hidden="true">
      <span style="--x:22%;--y:32%;--dx:-6px;--dy:18px;--s:14px;--d:0ms"></span>
      <span style="--x:46%;--y:42%;--dx:8px;--dy:24px;--s:18px;--d:80ms"></span>
      <span style="--x:64%;--y:30%;--dx:-2px;--dy:20px;--s:12px;--d:140ms"></span>
      <span style="--x:54%;--y:56%;--dx:0px;--dy:28px;--s:16px;--d:200ms"></span>
    </div>
  `;
}

function toPercent(value: number): string {
  return String(Math.min(100, Math.max(0, value)));
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttribute(value: string): string {
  return escapeHtml(value);
}
