#!/usr/bin/env node
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, relative as pathRelative } from "node:path";
import { spawn, spawnSync } from "node:child_process";
import { chromium } from "playwright";

const root = new URL("..", import.meta.url).pathname;
const sceneId = process.argv[2];
const mode = process.argv.includes("--reuse-server") ? "reuse" : "serve";

const configSource = readFileSync(join(root, "src", "core", "config.ts"), "utf8");
const scenes = sceneSummaries();

if (!sceneId || !scenes.has(sceneId)) {
  console.error(`Usage: npm run visual:qa -- <${[...scenes.keys()].join("|")}> [--reuse-server]`);
  process.exit(1);
}

const scene = scenes.get(sceneId);
const outputDir = join(root, "artifacts", "visual-qa", sceneId);
rmSync(outputDir, { recursive: true, force: true });
mkdirSync(outputDir, { recursive: true });

function hashFile(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

function fileHashIfExists(path) {
  return existsSync(path) ? hashFile(path) : null;
}

function runMagick(args, label) {
  const result = spawnSync("magick", args, { cwd: root, encoding: "utf8" });
  if (result.status !== 0) {
    console.error(result.stderr || result.stdout || `${label} failed`);
    process.exit(result.status ?? 1);
  }
}

function runMagickText(args, label) {
  const result = spawnSync("magick", args, { cwd: root, encoding: "utf8" });
  const output = `${result.stdout ?? ""}${result.stderr ?? ""}`.trim();
  if (result.status !== 0) {
    console.error(output || `${label} failed`);
    process.exit(result.status ?? 1);
  }
  return output;
}

function cropImage(source, output, box) {
  runMagick([source, "-crop", `${box.width}x${box.height}+${box.x}+${box.y}`, "+repage", output], `crop ${output}`);
}

function overlayHotspot(source, output, box) {
  runMagick(
    [
      source,
      "-stroke",
      "#ff4b4b",
      "-strokewidth",
      "4",
      "-fill",
      "none",
      "-draw",
      `rectangle ${box.x},${box.y} ${box.x + box.width},${box.y + box.height}`,
      output,
    ],
    `overlay ${output}`,
  );
}

function overlayHotspotCrop(source, output, cropBox, hitBox) {
  const localBox = {
    x: Math.max(0, hitBox.x - cropBox.x),
    y: Math.max(0, hitBox.y - cropBox.y),
    width: hitBox.width,
    height: hitBox.height,
  };
  runMagick(
    [
      source,
      "-crop",
      `${cropBox.width}x${cropBox.height}+${cropBox.x}+${cropBox.y}`,
      "+repage",
      "-stroke",
      "#ff4b4b",
      "-strokewidth",
      "4",
      "-fill",
      "none",
      "-draw",
      `rectangle ${localBox.x},${localBox.y} ${localBox.x + localBox.width},${localBox.y + localBox.height}`,
      output,
    ],
    `overlay crop ${output}`,
  );
}

function buildComparisonBoard(images, output) {
  const existing = images.filter((path) => existsSync(path));
  runMagick(
    [
      ...existing.flatMap((path) => ["(", path, "-resize", "420x236", ")"]),
      "-background",
      "#101915",
      "-gravity",
      "center",
      "+append",
      output,
    ],
    `comparison ${output}`,
  );
}

function buildContactSheet(images, output) {
  const existing = images.filter((path) => existsSync(path));
  if (existing.length === 0) return;
  runMagick(
    [
      ...existing.flatMap((path) => ["(", path, "-resize", "520x292", ")"]),
      "-background",
      "#101915",
      "-gravity",
      "center",
      "-append",
      output,
    ],
    `contact sheet ${output}`,
  );
}

function compareMeanAbsoluteErrorRatio(basePath, targetPath) {
  const result = spawnSync(
    "magick",
    ["compare", "-metric", "MAE", basePath, targetPath, "null:"],
    { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] },
  );
  const output = `${result.stdout ?? ""}${result.stderr ?? ""}`;
  const match = /\((0|0?\.\d+|1(?:\.0+)?)\)/.exec(output);
  return match ? Number(match[1]) : Number.NaN;
}

function differenceBoundingBox(beforePath, afterPath, threshold = "20%") {
  const output = runMagickText(
    [
      beforePath,
      afterPath,
      "-compose",
      "difference",
      "-composite",
      "-threshold",
      threshold,
      "-format",
      "%@",
      "info:",
    ],
    `difference ${beforePath} ${afterPath}`,
  );
  const match = output.match(/^(\d+)x(\d+)\+(\d+)\+(\d+)$/);
  if (!match) return null;
  return {
    width: Number(match[1]),
    height: Number(match[2]),
    x: Number(match[3]),
    y: Number(match[4]),
  };
}

function assetHashes() {
  const hashes = {};

  if (scene.backgroundImage) {
    const backgroundPath = publicAssetPath(scene.backgroundImage);
    const backgroundHash = fileHashIfExists(backgroundPath);
    if (backgroundHash) hashes.background = backgroundHash;
  }

  for (let index = 0; index <= scene.hotspots.length; index += 1) {
    const path = progressStateAssetPath(scene, index);
    if (!path) continue;
    const hash = fileHashIfExists(path);
    if (hash) hashes[`progress-${index}`] = hash;
  }
  hashes.config = hashFile(join(root, "src", "core", "config.ts"));
  hashes.sceneCode = hashFile(join(root, "src", "game", "scenes", "socialScene.ts"));
  return hashes;
}

async function waitForServer(url) {
  const deadline = Date.now() + 15_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // wait
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Timed out waiting for ${url}`);
}

let server;
if (mode === "serve") {
  server = spawn("npm", ["run", "dev", "--", "--host", "127.0.0.1"], {
    cwd: root,
    stdio: ["ignore", "pipe", "pipe"],
  });
  server.stdout.on("data", () => {});
  server.stderr.on("data", () => {});
}

const baseUrl = "http://127.0.0.1:5173/";

try {
  await waitForServer(baseUrl);
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 2048, height: 1125 }, deviceScaleFactor: 1 });

  const records = [];
  const boardPaths = [];
  for (const [index, hotspot] of scene.hotspots.entries()) {
    const runtimeScene = await enterCleanScene(page);
    const canvasBox = runtimeScene.canvasBox;
    const beforePath = join(outputDir, `before-${index + 1}-${slug(hotspot.label)}.png`);
    await page.screenshot({ path: beforePath, fullPage: true });

    await page.getByRole("button", { name: hotspot.label }).click();
    await page.waitForTimeout(120);
    const hitPath = join(outputDir, `hit-${index + 1}-${slug(hotspot.label)}.png`);
    await page.screenshot({ path: hitPath, fullPage: true });
    await page.waitForTimeout(360);
    const settledPath = join(outputDir, `settled-${index + 1}-${slug(hotspot.label)}.png`);
    await page.screenshot({ path: settledPath, fullPage: true });

    const cropBox = cropBoxForHotspot(canvasBox, hotspot);
    const beforeCrop = join(outputDir, `crop-before-${index + 1}-${slug(hotspot.label)}.png`);
    const hitCrop = join(outputDir, `crop-hit-${index + 1}-${slug(hotspot.label)}.png`);
    const settledCrop = join(outputDir, `crop-settled-${index + 1}-${slug(hotspot.label)}.png`);
    cropImage(beforePath, beforeCrop, cropBox);
    cropImage(hitPath, hitCrop, cropBox);
    cropImage(settledPath, settledCrop, cropBox);

    const hitBox = hitBoxForHotspot(canvasBox, hotspot);
    const feedbackDiff = {
      beforeToHit: differenceBoundingBox(beforeCrop, hitCrop),
      beforeToSettled: differenceBoundingBox(beforeCrop, settledCrop),
      hitToSettled: differenceBoundingBox(hitCrop, settledCrop),
      hitBox: {
        width: hitBox.width,
        height: hitBox.height,
      },
    };
    const overlayPath = join(outputDir, `overlay-${index + 1}-${slug(hotspot.label)}.png`);
    overlayHotspotCrop(settledPath, overlayPath, cropBox, hitBox);

    const fullOverlayPath = join(outputDir, `overlay-full-${index + 1}-${slug(hotspot.label)}.png`);
    overlayHotspot(settledPath, fullOverlayPath, hitBox);

    const boardPath = join(outputDir, `board-${index + 1}-${slug(hotspot.label)}.jpg`);
    buildComparisonBoard([beforeCrop, hitCrop, settledCrop, overlayPath], boardPath);
    boardPaths.push(boardPath);

    records.push({
      id: hotspot.id,
      evidenceId: hotspot.evidenceId,
      label: hotspot.label,
      animationKind: hotspot.animationKind,
      hotspot: {
        x: hotspot.x,
        y: hotspot.y,
        width: hotspot.width,
        height: hotspot.height,
      },
      screenshots: {
        before: relative(beforePath),
        hit: relative(hitPath),
        settled: relative(settledPath),
        beforeCrop: relative(beforeCrop),
        hitCrop: relative(hitCrop),
        settledCrop: relative(settledCrop),
        overlay: relative(overlayPath),
        overlayFull: relative(fullOverlayPath),
        board: relative(boardPath),
      },
      runtimeScene: {
        selectedSceneId: runtimeScene.selectedSceneId,
        sceneNameVisible: runtimeScene.sceneNameVisible,
      },
      feedbackDiff,
      checks: {
        hotspotCenterMatchesObject: emptyCheck(),
        clueSemanticsAreVisibleWithoutExplanation: emptyCheck(),
        clueIsOneSpecificObjectOrRelation: emptyCheck(),
        noPatchArtifactsOnTarget: emptyCheck(),
        perspectiveLightingAndScaleMatch: emptyCheck(),
        hitFeedbackIsLocalAndSmallerThanClue: emptyCheck(),
        foundMarkerDoesNotCoverNeighbor: emptyCheck(),
      },
    });
  }

  const contactSheetPath = join(outputDir, "board-contact.jpg");
  buildContactSheet(boardPaths, contactSheetPath);

  await browser.close();

  const verdictPath = join(outputDir, "verdict.json");
  const mechanizedReview = mechanizedSceneReview(scene, records);
  const manifest = {
    scene: sceneId,
    generatedAt: new Date().toISOString(),
    assetHashes: assetHashes(),
    mechanizedReview,
    requiredHumanChecks: {
      noDuplicateCharacters: emptyCheck(),
      noPatchArtifacts: emptyCheck(),
      objectPerspectiveAndLightingMatch: emptyCheck(),
      handOrOccluderContactIsNatural: emptyCheck(),
      hotspotCenterMatchesObject: emptyCheck(),
      animationShowsStateChangeBeyondBrightness: emptyCheck(),
      clueSemanticsAreVisibleWithoutExplanation: emptyCheck(),
      noOversizedHintOrAnswerSpoiler: emptyCheck(),
    },
    records,
  };
  writeFileSync(verdictPath, `${JSON.stringify(manifest, null, 2)}\n`);

  console.log(`${sceneId}: wrote visual QA package to ${outputDir}`);
  if (mechanizedReview.findings.some((finding) => finding.severity === "block")) {
    console.log(`${sceneId}: mechanized review found blocking risks; inspect mechanizedReview in verdict.json`);
  }
  console.log(`${sceneId}: fill ${verdictPath}, then run npm run visual:gate -- ${sceneId}`);
} finally {
  if (server) server.kill("SIGINT");
}

async function enterCleanScene(page) {
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: "networkidle" });
  await page.locator("[data-action='local-scene-picker']").selectOption(sceneId);
  await page.waitForTimeout(250);

  const buttons = page.getByRole("button");
  const labels = await buttons.evaluateAll((items) => items.map((item) => item.textContent?.trim() || item.getAttribute("aria-label") || ""));
  const startIndex = labels.findIndex((text) => scene.startButton.test(text));
  if (startIndex >= 0) await buttons.nth(startIndex).click();
  await page.waitForTimeout(350);

  const canvasBox = await page.locator("canvas").boundingBox();
  if (!canvasBox) throw new Error("Missing Phaser canvas");
  const runtime = await page.evaluate(() => {
    const picker = document.querySelector("[data-action='local-scene-picker']");
    const selectedSceneId = picker instanceof HTMLSelectElement ? picker.value : "";
    return {
      selectedSceneId,
      pageText: document.body.innerText,
    };
  });
  return {
    canvasBox,
    selectedSceneId: runtime.selectedSceneId,
    sceneNameVisible: runtime.pageText.includes(scene.name),
  };
}

function cropBoxForHotspot(canvasBox, hotspot) {
  const centerX = canvasBox.x + canvasBox.width * (hotspot.x / 100);
  const centerY = canvasBox.y + canvasBox.height * (hotspot.y / 100);
  const width = Math.max(260, canvasBox.width * (hotspot.width / 100) * 2.4);
  const height = Math.max(220, canvasBox.height * (hotspot.height / 100) * 2.4);
  return {
    x: Math.max(0, Math.round(centerX - width / 2)),
    y: Math.max(0, Math.round(centerY - height / 2)),
    width: Math.round(width),
    height: Math.round(height),
  };
}

function hitBoxForHotspot(canvasBox, hotspot) {
  const centerX = canvasBox.x + canvasBox.width * (hotspot.x / 100);
  const centerY = canvasBox.y + canvasBox.height * (hotspot.y / 100);
  const width = canvasBox.width * (hotspot.width / 100);
  const height = canvasBox.height * (hotspot.height / 100);
  return {
    x: Math.max(0, Math.round(centerX - width / 2)),
    y: Math.max(0, Math.round(centerY - height / 2)),
    width: Math.round(width),
    height: Math.round(height),
  };
}

function sceneSummaries() {
  const summaries = new Map();
  for (const id of sceneIds()) {
    const block = sceneBlock(id);
    const backgroundImage = stringValue(block, "backgroundImage");
    const stateInfo = stateInfoFromBackground(backgroundImage);
    summaries.set(id, {
      id,
      name: stringValue(block, "name"),
      backgroundImage,
      startButton: /开始|继续/,
      ...stateInfo,
      hotspots: hotspotRows(block),
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
    const x = numberValue(raw, "hitX") ?? numberValue(raw, "x") ?? 0;
    const y = numberValue(raw, "hitY") ?? numberValue(raw, "y") ?? 0;
    const radius = numberValue(raw, "radius") ?? 7;
    return {
      id: stringValue(raw, "id"),
      evidenceId: stringValue(raw, "evidenceId"),
      label: stringValue(raw, "label"),
      animationKind: stringValue(raw, "animationKind"),
      x,
      y,
      width: numberValue(raw, "hitWidth") ?? Math.max(7, radius * 2),
      height: numberValue(raw, "hitHeight") ?? Math.max(7, radius * 2),
    };
  });
}

function mechanizedSceneReview(scene, records = []) {
  const findings = [];
  const carrierCounts = new Map();
  const lateScene = scene.hotspots.length >= 8;
  const minStateDeltaRatio = 0.003;

  const runtimeMismatches = records.filter((record) => {
    return record.runtimeScene?.selectedSceneId !== scene.id || record.runtimeScene?.sceneNameVisible !== true;
  });
  if (runtimeMismatches.length > 0) {
    findings.push({
      severity: "block",
      code: "runtime_scene_identity_mismatch",
      evidence: `${runtimeMismatches.length}/${records.length} QA captures did not prove the local picker selected ${scene.id} and the page showed the expected scene name ${scene.name}. This blocks claims that the inspected image belongs to the intended level.`,
    });
  }

  findings.push(...progressStateFindings(scene, minStateDeltaRatio));

  for (const hotspot of scene.hotspots) {
    const area = Number((hotspot.width * hotspot.height).toFixed(2));
    const longSide = Math.max(hotspot.width, hotspot.height);
    const shortSide = Math.min(hotspot.width, hotspot.height);
    if (lateScene && area > 260) {
      findings.push({
        severity: "block",
        code: "oversized_hotspot",
        hotspotId: hotspot.id,
        label: hotspot.label,
        evidence: `Hotspot ${hotspot.label} is ${hotspot.width}x${hotspot.height}% (${area}% area units), too large for a late-level hidden-object target; inspect its board crop and split or tighten it.`,
      });
    } else if (lateScene && longSide > 20 && shortSide > 10) {
      findings.push({
        severity: "warn",
        code: "broad_hotspot",
        hotspotId: hotspot.id,
        label: hotspot.label,
        evidence: `Hotspot ${hotspot.label} spans ${hotspot.width}x${hotspot.height}%; verify the red overlay is on one meaningful sub-object rather than a whole screen, form, or desk area.`,
      });
    }

    for (const carrier of carriersForLabel(hotspot.label)) {
      carrierCounts.set(carrier, (carrierCounts.get(carrier) ?? 0) + 1);
    }
  }

  for (const record of records) {
    const hitArea = (record.feedbackDiff?.hitBox?.width ?? 0) * (record.feedbackDiff?.hitBox?.height ?? 0);
    for (const [phase, box] of Object.entries({
      hitToSettled: record.feedbackDiff?.hitToSettled,
    })) {
      if (!box || hitArea <= 0) continue;
      const diffArea = box.width * box.height;
      const ratio = diffArea / hitArea;
      const hitWidth = record.feedbackDiff?.hitBox?.width ?? 0;
      if (ratio > 16 && box.width > hitWidth * 4) {
        findings.push({
          severity: "warn",
          code: "large_feedback_diff",
          hotspotId: record.id,
          label: record.label,
          evidence: `${record.label} ${phase} changed a ${box.width}x${box.height}px crop region, ${ratio.toFixed(1)}x the configured hit-box area after the hit moment. Inspect the board to ensure feedback is local and not an oversized answer spoiler.`,
        });
      }
    }
  }

  const screenLikeCount = scene.hotspots.filter((hotspot) => carriersForLabel(hotspot.label).some((carrier) => carrier === "screen")).length;
  if (lateScene && screenLikeCount / scene.hotspots.length > 0.4) {
    findings.push({
      severity: "block",
      code: "screen_carrier_overload",
      evidence: `${screenLikeCount}/${scene.hotspots.length} clue labels read as screen/phone/tablet/monitor targets. Later levels must hide evidence across varied physical objects, not collapse into clicking screens/text.`,
    });
  }

  for (const [carrier, count] of carrierCounts.entries()) {
    const max = carrier === "paper" ? 4 : carrier === "screen" ? 3 : carrier === "prop" ? 5 : 3;
    if (lateScene && count > max) {
      findings.push({
        severity: "block",
        code: "carrier_overload",
        carrier,
        evidence: `${count} clue labels share the ${carrier} carrier. This risks same-object or same-form overloading; split the evidence across clearer varied props before accepting the level.`,
      });
    }
  }

  return {
    version: 3,
    generatedAt: new Date().toISOString(),
    summary: findings.length === 0 ? "No mechanized blocking risks from scene identity, progress-state deltas, hotspot geometry, carrier distribution, or feedback diff size." : `${findings.length} mechanized risk finding(s).`,
    findings,
  };
}

function progressStateFindings(scene, minStateDeltaRatio) {
  const findings = [];
  const basePath = progressStateAssetPath(scene, 0);
  if (!basePath) {
    findings.push({
      severity: "block",
      code: "missing_progress_state_source",
      evidence: `${scene.id} has no parsed progress-state directory from backgroundImage. Every level needs N+1 protagonist or proxy state rasters/sprites so each found clue visibly moves character state forward.`,
    });
    return findings;
  }

  if (!existsSync(basePath)) {
    findings.push({
      severity: "block",
      code: "missing_progress_zero",
      evidence: `${scene.id} is missing progress-0 at ${pathRelative(root, basePath)}. Visual QA cannot prove the opening protagonist/proxy state exists.`,
    });
    return findings;
  }

  for (let index = 1; index <= scene.hotspots.length; index += 1) {
    const statePath = progressStateAssetPath(scene, index);
    if (!existsSync(statePath)) {
      findings.push({
        severity: "block",
        code: "missing_progress_state",
        evidence: `${scene.id} has ${scene.hotspots.length} clues but is missing progress-${index} at ${pathRelative(root, statePath)}. Every clue must advance to a visible state.`,
      });
      continue;
    }
    const ratio = compareMeanAbsoluteErrorRatio(basePath, statePath);
    if (!Number.isFinite(ratio)) {
      findings.push({
        severity: "warn",
        code: "unreadable_progress_delta",
        evidence: `${scene.id} progress-${index} could not be compared against progress-0. Inspect the state contact sheet manually before accepting character-state animation.`,
      });
      continue;
    }
    if (ratio < minStateDeltaRatio) {
      findings.push({
        severity: "block",
        code: "weak_progress_state_delta",
        evidence: `${scene.id} progress-${index} has MAE ratio ${ratio.toFixed(6)} against progress-0, below ${minStateDeltaRatio}. This is too weak to prove a visible protagonist/proxy state change for clue ${index}.`,
      });
    }
  }
  return findings;
}

function progressStateAssetPath(scene, index) {
  if (scene.id === "office") {
    return join(root, "public", "assets", "game", "office", "characters", `zhou-progress-${index}.png`);
  }
  if (scene.id === "social") {
    return join(root, "public", "assets", "game", "social", "expressions", `social-expression-progress-${index}.png`);
  }
  if (!scene.stateDir || !scene.statePrefix) return "";
  return join(scene.stateDir, `${scene.statePrefix}-progress-${index}.png`);
}

function carriersForLabel(label) {
  const text = String(label);
  const carriers = new Set();
  if (/(屏|手机|平板|显示器|投影|电脑|弹窗|推送|群|评论|标签页)/.test(text)) carriers.add("screen");
  if (/(纸|便签|文件|草稿|折角)/.test(text)) carriers.add("paper");
  if (/(票|小票|刮花)/.test(text)) carriers.add("ticket");
  if (/(单|表|合同|清单|日历)/.test(text)) carriers.add("form");
  if (/(图|截图|合影|照片|剪报|快讯)/.test(text)) carriers.add("image");
  if (/(笔记|账本)/.test(text)) carriers.add("notebook");
  if (/(名牌|牌|告示|立牌)/.test(text)) carriers.add("sign");
  if (/(钥匙|锁|盒|令牌|印章|红章|笔|杯|瓶|袋|炉|香|管|阀|车|盾|镜|灯|沙漏|计算器)/.test(text)) carriers.add("prop");
  return [...carriers];
}

function stringValue(block, key) {
  return block.match(new RegExp(`${key}: "([^"]*)"`))?.[1] ?? "";
}

function numberValue(block, key) {
  const raw = block.match(new RegExp(`${key}: ([0-9.]+)`))?.[1];
  return raw ? Number(raw) : undefined;
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

function publicAssetPath(assetPath) {
  return join(root, "public", assetPath.replace(/^\//, "").replace(/^assets\//, "assets/"));
}

function slug(text) {
  return text
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

function relative(path) {
  return pathRelative(root, path);
}

function emptyCheck() {
  return {
    status: "",
    evidence: "",
  };
}
