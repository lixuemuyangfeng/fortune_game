#!/usr/bin/env node
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { isAbsolute, join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const sceneId = process.argv[2];
const configSource = readFileSync(join(root, "src", "core", "config.ts"), "utf8");
const scenes = sceneSummaries();
const knownScenes = [...scenes.keys()];

if (!sceneId || !knownScenes.includes(sceneId)) {
  console.error(`Usage: npm run visual:gate -- <${knownScenes.join("|")}>`);
  process.exit(1);
}

const verdictPath = join(root, "artifacts", "visual-qa", sceneId, "verdict.json");
if (!existsSync(verdictPath)) {
  console.error(`${sceneId}: missing ${verdictPath}. Run npm run visual:qa -- ${sceneId} first.`);
  process.exit(1);
}

const verdict = JSON.parse(readFileSync(verdictPath, "utf8"));
const errors = [];
const evidenceWarnings = [
  "todo",
  "tbd",
  "pass",
  "ok",
  "true",
  "yes",
  "看过",
  "通过",
  "应该",
  "可能",
  "大概",
];

if (verdict.scene !== sceneId) errors.push(`scene mismatch: expected ${sceneId}, got ${verdict.scene}`);

validateMechanizedReview(verdict.mechanizedReview);
const contactSheetPath = join(root, "artifacts", "visual-qa", sceneId, "board-contact.jpg");
if (!existsSync(contactSheetPath)) {
  errors.push(`missing board-contact.jpg; rerun npm run visual:qa -- ${sceneId} with the current QA generator`);
}

const currentHashes = currentAssetHashes(sceneId);
for (const [key, expectedHash] of Object.entries(verdict.assetHashes ?? {})) {
  if (!currentHashes[key]) {
    errors.push(`asset hash ${key} no longer exists`);
  } else if (currentHashes[key] !== expectedHash) {
    errors.push(`${key} changed since verdict was generated`);
  }
}

for (const [key, check] of Object.entries(verdict.requiredHumanChecks ?? {})) {
  validateCheck(`human check ${key}`, check);
}

if (!Array.isArray(verdict.records) || verdict.records.length === 0) {
  errors.push("verdict has no inspected hotspot records");
} else {
  const expectedHotspots = scenes.get(sceneId)?.hotspots ?? [];
  if (verdict.records.length !== expectedHotspots.length) {
    errors.push(`verdict records ${verdict.records.length} does not match configured hotspot count ${expectedHotspots.length}`);
  }

  for (const [index, record] of verdict.records.entries()) {
    const expected = expectedHotspots[index];
    const labelPrefix = `record ${index + 1}${record?.label ? ` (${record.label})` : ""}`;
    if (expected) {
      if (record.id !== expected.id) errors.push(`${labelPrefix}: id mismatch; expected ${expected.id}, got ${record.id ?? "<missing>"}`);
      if (record.evidenceId !== expected.evidenceId) {
        errors.push(`${labelPrefix}: evidenceId mismatch; expected ${expected.evidenceId}, got ${record.evidenceId ?? "<missing>"}`);
      }
      if (record.label !== expected.label) {
        errors.push(`${labelPrefix}: label mismatch; expected ${expected.label}, got ${record.label ?? "<missing>"}`);
      }
    }

    for (const [name, relativePath] of Object.entries(record.screenshots ?? {})) {
      const screenshotPath = isAbsolute(relativePath) ? relativePath : join(root, relativePath);
      if (!existsSync(screenshotPath)) errors.push(`${record.label}: missing screenshot ${name}: ${relativePath}`);
    }

    const checks = record.checks && typeof record.checks === "object" ? record.checks : {};
    for (const key of requiredRecordChecks()) {
      validateCheck(`${labelPrefix} check ${key}`, checks[key]);
    }
  }
}

if (errors.length > 0) {
  console.error(`${sceneId}: visual QA gate failed:`);
  const visibleErrors = errors.slice(0, 80);
  for (const error of visibleErrors) console.error(`- ${error}`);
  if (errors.length > visibleErrors.length) {
    console.error(`- ... ${errors.length - visibleErrors.length} more visual QA errors omitted`);
  }
  process.exit(1);
}

console.log(`${sceneId}: visual QA gate passed.`);

function validateMechanizedReview(review) {
  if (!review || typeof review !== "object") {
    errors.push("missing mechanizedReview; rerun npm run visual:qa so machine-checkable visual risks are recorded");
    return;
  }
  if (review.version !== 3) {
    errors.push(`mechanizedReview version mismatch; expected 3, got ${review.version ?? "<missing>"}`);
  }
  if (!Array.isArray(review.findings)) {
    errors.push("mechanizedReview.findings must be an array");
    return;
  }
  for (const finding of review.findings) {
    const severity = String(finding?.severity ?? "");
    const code = String(finding?.code ?? "");
    const evidence = String(finding?.evidence ?? "").trim();
    if (!["warn", "block"].includes(severity)) {
      errors.push(`mechanizedReview finding ${code || "<missing-code>"} has invalid severity ${severity || "<missing>"}`);
    }
    if (!code) errors.push("mechanizedReview finding is missing code");
    if (evidence.length < 50) errors.push(`mechanizedReview finding ${code || "<missing-code>"} needs concrete evidence`);
    if (severity === "block") {
      errors.push(`mechanizedReview blocks handoff: ${code}: ${evidence}`);
    }
  }
}

function validateCheck(label, check) {
  const status = typeof check === "object" && check ? String(check.status ?? "").trim() : "";
  const evidence = typeof check === "object" && check ? String(check.evidence ?? "").trim() : String(check ?? "").trim();

  if (!["pass", "block"].includes(status)) {
    errors.push(`${label} needs status "pass" or "block"`);
  } else if (status === "block") {
    errors.push(`${label} is explicitly blocked: ${evidence || "missing evidence"}`);
  }

  if (evidence.length < 40) {
    errors.push(`${label} needs a concrete evidence sentence from crop/board`);
  }
  const lowerEvidence = evidence.toLowerCase();
  if (evidenceWarnings.some((word) => lowerEvidence.includes(word)) && evidence.length < 70) {
    errors.push(`${label} is too generic; cite visible evidence from crop/board`);
  }
  if (!/(board|crop|overlay|hit|settled|before|截图|红框|黄框|中心|物体|线索|反馈|标记)/i.test(evidence)) {
    errors.push(`${label} must cite a visible board/crop/overlay detail, not only a conclusion`);
  }
}

function requiredRecordChecks() {
  return [
    "hotspotCenterMatchesObject",
    "clueSemanticsAreVisibleWithoutExplanation",
    "clueIsOneSpecificObjectOrRelation",
    "noPatchArtifactsOnTarget",
    "perspectiveLightingAndScaleMatch",
    "hitFeedbackIsLocalAndSmallerThanClue",
    "foundMarkerDoesNotCoverNeighbor",
  ];
}

function hashFile(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

function hashIfExists(path) {
  return existsSync(path) ? hashFile(path) : null;
}

function currentAssetHashes(id) {
  const scene = scenes.get(id);
  const hashes = {};

  if (scene?.backgroundImage) {
    const backgroundPath = publicAssetPath(scene.backgroundImage);
    const backgroundHash = hashIfExists(backgroundPath);
    if (backgroundHash) hashes.background = backgroundHash;
  }

  for (let index = 0; index <= (scene?.hotspots.length ?? 0); index += 1) {
    const path = progressStateAssetPath(id, scene, index);
    if (!path) continue;
    const hash = hashIfExists(path);
    if (hash) hashes[`progress-${index}`] = hash;
  }
  hashes.config = hashFile(join(root, "src", "core", "config.ts"));
  hashes.sceneCode = hashFile(join(root, "src", "game", "scenes", "socialScene.ts"));
  return hashes;
}

function sceneSummaries() {
  const summaries = new Map();
  for (const id of sceneIds()) {
    const block = sceneBlock(id);
    const backgroundImage = stringValue(block, "backgroundImage");
    summaries.set(id, {
      backgroundImage,
      hotspots: hotspotRows(block),
      ...stateInfoFromBackground(backgroundImage),
    });
  }
  return summaries;
}

function sceneIds() {
  const scenesStart = configSource.indexOf("\n  scenes:");
  const scenesBlock = configSource.slice(scenesStart);
  return [...scenesBlock.matchAll(/\n      id: "([^"]+)"/g)].map((match) => match[1]);
}

function sceneBlock(id) {
  const idIndex = configSource.indexOf(`id: "${id}"`, configSource.indexOf("\n  scenes:"));
  if (idIndex === -1) {
    throw new Error(`Scene not found in src/core/config.ts: ${id}`);
  }

  const start = configSource.lastIndexOf("{", idIndex);
  const nextScene = configSource.indexOf("\n    {\n      id:", idIndex + 1);
  const scenesEnd = configSource.indexOf("\n  ]\n};", idIndex);
  return configSource.slice(start, nextScene === -1 ? scenesEnd : nextScene);
}

function arrayBody(block, key) {
  const keyStart = block.indexOf(`${key}: [`);
  if (keyStart === -1) return "";

  const arrayStart = block.indexOf("[", keyStart);
  let depth = 0;
  for (let index = arrayStart; index < block.length; index += 1) {
    if (block[index] === "[") depth += 1;
    if (block[index] === "]") depth -= 1;
    if (depth === 0) return block.slice(arrayStart + 1, index);
  }

  return "";
}

function hotspotRows(block) {
  return [...arrayBody(block, "hotspots").matchAll(/\{([^{}]*)\}/g)].map((match) => {
    const raw = match[1];
    return {
      id: stringValue(raw, "id"),
      evidenceId: stringValue(raw, "evidenceId"),
      label: stringValue(raw, "label"),
    };
  });
}

function stringValue(block, key) {
  return block.match(new RegExp(`${key}: "([^"]*)"`))?.[1] ?? "";
}

function stateInfoFromBackground(backgroundImage) {
  if (!backgroundImage) return {};
  const match = backgroundImage.match(/^\/assets\/(.+)\/states\/(.+)-progress-0\.png$/);
  if (!match) return {};
  const [, dir, prefix] = match;
  return {
    stateDir: join(root, "public", "assets", dir, "states"),
    statePrefix: prefix,
  };
}

function progressStateAssetPath(id, scene, index) {
  if (id === "office") {
    return join(root, "public", "assets", "game", "office", "characters", `zhou-progress-${index}.png`);
  }
  if (id === "social") {
    return join(root, "public", "assets", "game", "social", "expressions", `social-expression-progress-${index}.png`);
  }
  if (!scene?.stateDir || !scene?.statePrefix) return "";
  return join(scene.stateDir, `${scene.statePrefix}-progress-${index}.png`);
}

function publicAssetPath(assetPath) {
  return join(root, "public", assetPath.replace(/^\//, "").replace(/^assets\//, "assets/"));
}
