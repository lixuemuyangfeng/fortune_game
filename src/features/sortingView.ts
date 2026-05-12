import type { EmotionId, HotspotEvidence } from "../core/types";

export interface SortingProgress {
  current: number;
  target: number;
}

export interface RenderSortingViewParams {
  emotions: Record<EmotionId, string>;
  foundEvidences: HotspotEvidence[];
  selectedEvidence?: HotspotEvidence;
  sortCount?: number;
  progress?: SortingProgress;
  title?: string;
  subtitle?: string;
  adLabel?: string;
  emptyMessage?: string;
}

const emotionOrder: EmotionId[] = ["envy", "stubborn", "breakdown", "fantasy", "pretend"];

export function renderSortingView(params: RenderSortingViewParams): string {
  const {
    emotions,
    foundEvidences,
    sortCount,
    progress,
    title = "情绪投递站",
    subtitle = "把线索丢进最像的桶",
    adLabel = "广告双倍",
    emptyMessage = "背包还空着。先去图里抓一个暴富噪声。"
  } = params;

  const selectedEvidence = params.selectedEvidence ?? foundEvidences[0];
  const progressText = formatProgress(sortCount, progress);

  return `
    <article class="machine-card">
      <div class="panel-head">
        <div>
          <p class="eyebrow">${escapeHtml(title)}</p>
          <h2>${escapeHtml(subtitle)}</h2>
        </div>
        <button class="ghost" data-action="sort-ad">${escapeHtml(adLabel)}</button>
      </div>
      ${progressText ? `<p class="empty">已分类 ${escapeHtml(progressText)}</p>` : ""}
      <div class="evidence-tray">
        <p class="eyebrow">噪声背包</p>
        <div>
          ${renderEvidenceBackpack(foundEvidences, selectedEvidence)}
        </div>
      </div>
      ${renderCurrentEvidence(selectedEvidence, emotions, emptyMessage)}
    </article>
  `;
}

function renderEvidenceBackpack(foundEvidences: HotspotEvidence[], selectedEvidence?: HotspotEvidence): string {
  if (foundEvidences.length === 0) {
    return `<span class="empty">先去图里抓一个暴富噪声。</span>`;
  }

  return foundEvidences
    .map((evidence) => {
      const activeClass = selectedEvidence?.id === evidence.id ? " active" : "";
      return `
        <button
          class="evidence-chip${activeClass}"
          data-action="pick-evidence"
          data-id="${escapeAttribute(evidence.id)}"
        >${escapeHtml(evidence.title)}</button>
      `;
    })
    .join("");
}

function renderCurrentEvidence(selectedEvidence: HotspotEvidence | undefined, emotions: Record<EmotionId, string>, emptyMessage: string): string {
  if (!selectedEvidence) {
    return `<div class="empty-machine">${escapeHtml(emptyMessage)}</div>`;
  }

  return `
    <div class="evidence-card">
      <strong>${escapeHtml(selectedEvidence.title)}</strong>
      <span>${escapeHtml(selectedEvidence.detail)}</span>
    </div>
    <div class="emotion-buttons machine-buttons">
      ${renderEmotionBuckets(emotions)}
    </div>
  `;
}

function renderEmotionBuckets(emotions: Record<EmotionId, string>): string {
  return emotionOrder
    .map((emotion) => {
      return `
        <button data-action="sort" data-emotion="${emotion}">
          ${escapeHtml(emotions[emotion])}
        </button>
      `;
    })
    .join("");
}

function formatProgress(sortCount: number | undefined, progress: SortingProgress | undefined): string {
  if (progress) {
    return `${progress.current}/${progress.target}`;
  }

  if (typeof sortCount === "number") {
    return String(sortCount);
  }

  return "";
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttribute(value: string): string {
  return escapeHtml(value);
}
