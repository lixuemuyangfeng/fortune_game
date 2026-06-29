#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { basename, join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const docsDir = join(root, "docs");

const errors = [];
const warnings = [];

const scenes = [
  { id: "office", brief: "office" },
  { id: "rooftop", brief: "rooftop" },
  { id: "convenience", brief: "convenience" },
  { id: "social", brief: "social-v5" },
  { id: "ai_launch", brief: "ai-launch" },
  { id: "meeting", brief: "meeting" },
  { id: "nest", brief: "nest" },
  { id: "stock", brief: "stock" },
];

const blockingArtRiskPattern =
  /mechanically derived|not true generated|not true .*posture|not true .*expression|playable WIP|local composite WIP|not final production art/i;

const stateVisualDeltaChecks = [
  { id: "ai_launch", dir: "ai-launch", prefix: "ai-launch", maxProgress: 9 },
  { id: "meeting", dir: "meeting", prefix: "meeting", maxProgress: 10 },
  { id: "nest", dir: "nest", prefix: "nest", maxProgress: 12 },
  { id: "stock", dir: "stock", prefix: "stock", maxProgress: 13 },
];

const minStateDeltaRatio = 0.003;

function readIfExists(path) {
  return existsSync(path) ? readFileSync(path, "utf8") : "";
}

function latestReviewFor(sceneId) {
  const suffix = `-${sceneId}-image-review.md`;
  return readdirSync(join(docsDir, "reviews"))
    .filter((file) => file.endsWith(suffix))
    .sort()
    .at(-1);
}

function compareMeanAbsoluteErrorRatio(basePath, targetPath) {
  try {
    const output = execFileSync(
      "magick",
      ["compare", "-metric", "MAE", basePath, targetPath, "null:"],
      { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] },
    );
    return parseImageMagickRatio(output);
  } catch (error) {
    const output = `${error.stdout ?? ""}${error.stderr ?? ""}`;
    return parseImageMagickRatio(output);
  }
}

function parseImageMagickRatio(output) {
  const match = /\((0?\.\d+|1(?:\.0+)?)\)/.exec(output);
  return match ? Number(match[1]) : Number.NaN;
}

for (const scene of scenes) {
  const briefPath = join(docsDir, `${scene.brief}-production-brief.md`);
  const brief = readIfExists(briefPath);
  if (!brief) {
    warnings.push(`${scene.id}: missing production brief`);
    continue;
  }

  if (/formal art reset required|playable WIP|local composite WIP|not final production art/i.test(brief)) {
    errors.push(`${scene.id}: production brief marks art as WIP/reset-required`);
  }

  const reviewFile = latestReviewFor(scene.id);
  if (!reviewFile) {
    warnings.push(`${scene.id}: missing image review checklist`);
    continue;
  }
  const review = readIfExists(join(docsDir, "reviews", reviewFile));
  if (/\[ \].*(Theme Gate|Layout Gate|Character Gate|Clue Gate|Interaction Gate|Screenshot Gate)/i.test(review)) {
    warnings.push(`${scene.id}: ${reviewFile} still contains unchecked review gates`);
  }
  if (blockingArtRiskPattern.test(review)) {
    errors.push(`${scene.id}: ${reviewFile} documents blocking progress-state or WIP art risk`);
  }

  const calibration = readIfExists(join(docsDir, `${scene.brief}-hotspot-calibration.md`));
  if (blockingArtRiskPattern.test(calibration)) {
    errors.push(`${scene.id}: ${scene.brief}-hotspot-calibration.md documents blocking progress-state or WIP art risk`);
  }
}

const wipGenerators = [
  "tools/generate-stock-level-assets.py",
];

for (const relativePath of wipGenerators) {
  const source = readIfExists(join(root, relativePath));
  if (!source) continue;
  if (/local redraw|composite|fit_source|add_expression_state|social-progress-0/i.test(source)) {
    errors.push(`${basename(relativePath)}: still documents or implements local-composite WIP asset generation`);
  }
}

for (const stateSet of stateVisualDeltaChecks) {
  const stateDir = join(root, "public", "assets", "game", stateSet.dir, "states");
  const basePath = join(stateDir, `${stateSet.prefix}-progress-0.png`);
  if (!existsSync(basePath)) {
    warnings.push(`${stateSet.id}: missing progress-0 state image`);
    continue;
  }

  for (let index = 1; index <= stateSet.maxProgress; index += 1) {
    const statePath = join(stateDir, `${stateSet.prefix}-progress-${index}.png`);
    if (!existsSync(statePath)) {
      errors.push(`${stateSet.id}: missing progress-${index} state image`);
      continue;
    }

    const ratio = compareMeanAbsoluteErrorRatio(basePath, statePath);
    if (!Number.isFinite(ratio)) {
      warnings.push(`${stateSet.id}: could not compare progress-0 to progress-${index}`);
      continue;
    }
    if (ratio < minStateDeltaRatio) {
      errors.push(
        `${stateSet.id}: progress-${index} is visually too close to progress-0 (MAE ratio ${ratio.toFixed(6)} < ${minStateDeltaRatio})`,
      );
    }
  }
}

if (warnings.length > 0) {
  console.warn("Art production warnings:");
  for (const warning of warnings) console.warn(`- ${warning}`);
}

if (errors.length > 0) {
  console.error("Art production gate failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Art production gate passed.");
