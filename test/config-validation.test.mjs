import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

const root = new URL("..", import.meta.url).pathname;
const configSource = readFileSync(join(root, "src/core/config.ts"), "utf8");
const agentsSource = readFileSync(join(root, "AGENTS.md"), "utf8");
const phaserSpecSource = readFileSync(join(root, "docs/phaser3-requirements-spec.md"), "utf8");
const artDirectionSource = readFileSync(join(root, "docs/art-direction.md"), "utf8");
const imageReviewSource = readFileSync(join(root, "docs/image-review-optimize-loop.md"), "utf8");
const semanticValidationSource = readFileSync(join(root, "docs/semantic-validation.md"), "utf8");
const taskStateSource = readFileSync(join(root, "TASK_STATE.md"), "utf8");
const backendSource = readFileSync(join(root, "src/core/backend.ts"), "utf8");
const mainSource = readFileSync(join(root, "src/main.ts"), "utf8");
const packageSource = readFileSync(join(root, "package.json"), "utf8");

function sceneBlock(sceneId) {
  const idIndex = configSource.indexOf(`id: "${sceneId}"`);
  assert.notEqual(idIndex, -1, `scene ${sceneId} exists`);

  const start = configSource.lastIndexOf("{", idIndex);
  const nextScene = configSource.indexOf("\n    {\n      id:", idIndex + 1);
  const scenesEnd = configSource.indexOf("\n  ]\n};", idIndex);
  const end = nextScene === -1 ? scenesEnd : nextScene;

  return configSource.slice(start, end);
}

function evidenceIds() {
  const evidencesStart = configSource.indexOf("evidences: {");
  const scenesStart = configSource.indexOf("\n  scenes:", evidencesStart);
  const evidenceBlock = configSource.slice(evidencesStart, scenesStart);
  return new Set([...evidenceBlock.matchAll(/\n    ([a-z0-9_]+): \{/g)].map((match) => match[1]));
}

function hotspotObjects(block) {
  return [...block.matchAll(/\{ id: "h\d+"[^}]+ \}/g)].map((match) => match[0]);
}

function arrayBody(block, key) {
  const keyStart = block.indexOf(`${key}: [`);
  if (keyStart === -1) return "";

  const arrayStart = block.indexOf("[", keyStart);
  let depth = 0;
  for (let index = arrayStart; index < block.length; index++) {
    if (block[index] === "[") depth += 1;
    if (block[index] === "]") depth -= 1;
    if (depth === 0) return block.slice(arrayStart + 1, index);
  }

  return "";
}

function configObjects(block, key) {
  return [...arrayBody(block, key).matchAll(/\{([^{}]*)\}/g)].map((match) => {
    const raw = match[1];
    const item = {};

    for (const field of ["id", "label"]) {
      const value = raw.match(new RegExp(`${field}: "([^"]+)"`))?.[1];
      if (value) item[field] = value;
    }

    for (const field of ["x", "y", "hitX", "hitY", "hitWidth", "hitHeight", "radius"]) {
      const value = raw.match(new RegExp(`${field}: ([0-9.]+)`))?.[1];
      if (value) item[field] = Number(value);
    }

    return item;
  });
}

function hitRect(item) {
  const x = item.hitX ?? item.x;
  const y = item.hitY ?? item.y;
  const width = item.hitWidth ?? Math.max(7, item.radius * 2);
  const height = item.hitHeight ?? Math.max(7, item.radius * 2);

  return {
    left: x - width / 2,
    right: x + width / 2,
    top: y - height / 2,
    bottom: y + height / 2
  };
}

function rectContainsPoint(rect, x, y) {
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}

function assetPaths(block) {
  return [...block.matchAll(/"(\/assets\/[^"]+)"/g)].map((match) => match[1]);
}

function fileHash(path) {
  return createHash("sha1").update(readFileSync(path)).digest("hex");
}

test("all playable levels meet narrative and interaction content requirements", () => {
  const knownEvidenceIds = evidenceIds();

  for (const sceneId of ["office", "rooftop", "convenience", "social", "ai_launch", "meeting", "nest", "stock"]) {
    const block = sceneBlock(sceneId);
    const hotspots = hotspotObjects(block);

    assert.match(block, /backgroundImage: "\/assets\//, `${sceneId} has a visual background`);
    assert.match(block, /hint: "[^"]+"/, `${sceneId} has intro hint copy`);
    assert.match(block, /enemyName: "[^"]+"/, `${sceneId} names the pollution source`);
    assert.match(block, /enemyDescription: "[^"]+"/, `${sceneId} describes the threat`);
    assert.match(block, /machineName: "[^"]+"/, `${sceneId} names the processing machine`);
    assert.match(block, /(machineImage: "\/assets\/|machineEmbedded: true)/, `${sceneId} has a machine asset or embedded machine`);
    assert.match(block, /completeText: "[^"]+"/, `${sceneId} has completion copy`);
    assert.ok(hotspots.length >= 5, `${sceneId} has at least five hotspots`);
    if (sceneId === "rooftop") {
      assert.ok(hotspots.length > hotspotObjects(sceneBlock("office")).length, "rooftop increases clue count after the office level");
    }

    const decoys = configObjects(block, "decoys");
    if (decoys.length > 0) {
      const parsedHotspots = configObjects(block, "hotspots");
      for (const decoy of decoys) {
        const coveringHotspot = parsedHotspots.find((hotspot) => rectContainsPoint(hitRect(hotspot), decoy.x, decoy.y));
        assert.equal(
          coveringHotspot,
          undefined,
          `${sceneId} decoy "${decoy.label}" center must not sit inside true hotspot "${coveringHotspot?.label}"`
        );
      }
    }

    for (const hotspot of hotspots) {
      const evidenceId = hotspot.match(/evidenceId: "([^"]+)"/)?.[1];
      assert.ok(evidenceId, `${sceneId} hotspot references evidence`);
      assert.ok(knownEvidenceIds.has(evidenceId), `${sceneId} hotspot evidence ${evidenceId} exists`);
      assert.match(hotspot, /(image: "\/assets\/|renderMode: "embedded")/, `${sceneId} hotspot ${evidenceId} has visible art or embedded scene art`);
      assert.match(hotspot, /hitX: [0-9.]+/, `${sceneId} hotspot ${evidenceId} has tuned hitX`);
      assert.match(hotspot, /hitY: [0-9.]+/, `${sceneId} hotspot ${evidenceId} has tuned hitY`);
      assert.match(hotspot, /revealText: "[^"]+"/, `${sceneId} hotspot ${evidenceId} has reveal copy`);
    }

    if (sceneId === "office") {
      const animationKinds = hotspots.map((hotspot) => hotspot.match(/animationKind: "([^"]+)"/)?.[1]);
      assert.deepEqual(
        animationKinds,
        ["kline", "chat", "goldLine", "paper", "scratch"],
        "office hotspots have explicit click feedback animations"
      );
    }

    if (sceneId === "rooftop") {
      const animationKinds = hotspots.map((hotspot) => hotspot.match(/animationKind: "([^"]+)"/)?.[1]);
      assert.deepEqual(
        animationKinds,
        ["receipt", "chat", "news", "alert", "sign", "contract"],
        "rooftop hotspots have explicit click feedback animations"
      );
    }
    if (sceneId === "convenience") {
      assert.ok(hotspots.length > hotspotObjects(sceneBlock("rooftop")).length, "convenience increases clue count after the rooftop level");
      const animationKinds = hotspots.map((hotspot) => hotspot.match(/animationKind: "([^"]+)"/)?.[1]);
      assert.deepEqual(
        animationKinds,
        ["scratch", "photo", "note", "ticket", "note", "ticket", "photo"],
        "convenience hotspots have explicit click feedback animations"
      );
    }
    if (sceneId === "social") {
      assert.ok(hotspots.length > hotspotObjects(sceneBlock("convenience")).length, "social increases clue count after the convenience level");
      assert.match(block, /decoys: \[/, "social has config-level decoy zones");
      assert.ok([...block.matchAll(/\{ id: "[a-z-]+", x: [0-9.]+, y: [0-9.]+, hitWidth: [0-9.]+, hitHeight: [0-9.]+, label: "[^"]+" \}/g)].length >= 18, "social has at least eighteen decoys");
      const animationKinds = hotspots.map((hotspot) => hotspot.match(/animationKind: "([^"]+)"/)?.[1]);
      assert.deepEqual(
        animationKinds,
        ["phone", "chat", "chat", "chat", "note", "note", "contract", "paper"],
        "social hotspots have explicit click feedback animations"
      );
    }
    if (sceneId === "ai_launch") {
      assert.ok(hotspots.length > hotspotObjects(sceneBlock("social")).length, "ai launch increases clue count after the social level");
      assert.match(block, /decoys: \[/, "ai launch has config-level decoy zones");
      assert.ok([...block.matchAll(/\{ id: "[a-z-]+", x: [0-9.]+, y: [0-9.]+, hitWidth: [0-9.]+, hitHeight: [0-9.]+, label: "[^"]+" \}/g)].length >= 20, "ai launch has at least twenty decoys");
      const animationKinds = hotspots.map((hotspot) => hotspot.match(/animationKind: "([^"]+)"/)?.[1]);
      assert.deepEqual(
        animationKinds,
        ["kline", "paper", "note", "alert", "contract", "receipt", "chat", "news", "phone"],
        "ai launch hotspots have explicit click feedback animations"
      );
    }
    if (sceneId === "meeting") {
      assert.ok(hotspots.length > hotspotObjects(sceneBlock("ai_launch")).length, "meeting increases clue count after the AI launch level");
      assert.match(block, /decoys: \[/, "meeting has config-level decoy zones");
      assert.ok([...block.matchAll(/\{ id: "[a-z-]+", x: [0-9.]+, y: [0-9.]+, hitWidth: [0-9.]+, hitHeight: [0-9.]+, label: "[^"]+" \}/g)].length >= 22, "meeting has at least twenty-two decoys");
      const animationKinds = hotspots.map((hotspot) => hotspot.match(/animationKind: "([^"]+)"/)?.[1]);
      assert.deepEqual(
        animationKinds,
        ["kline", "contract", "news", "paper", "kline", "receipt", "note", "alert", "contract", "sign"],
        "meeting hotspots have explicit click feedback animations"
      );
    }
    if (sceneId === "nest") {
      assert.ok(hotspots.length > hotspotObjects(sceneBlock("meeting")).length, "nest increases clue count after the meeting level");
      assert.match(block, /decoys: \[/, "nest has config-level decoy zones");
      assert.ok([...block.matchAll(/\{ id: "[a-z-]+", x: [0-9.]+, y: [0-9.]+, hitWidth: [0-9.]+, hitHeight: [0-9.]+, label: "[^"]+" \}/g)].length >= 30, "nest has at least thirty decoys");
      const animationKinds = hotspots.map((hotspot) => hotspot.match(/animationKind: "([^"]+)"/)?.[1]);
      assert.deepEqual(
        animationKinds,
        ["kline", "receipt", "ticket", "photo", "alert", "contract", "sign", "goldLine", "scratch", "photo", "note", "contract"],
        "nest hotspots have explicit click feedback animations"
      );
    }
    if (sceneId === "stock") {
      assert.ok(hotspots.length > hotspotObjects(sceneBlock("nest")).length, "stock increases clue count after the nest level");
      assert.match(block, /decoys: \[/, "stock has config-level decoy zones");
      assert.ok([...block.matchAll(/\{ id: "[a-z-]+", x: [0-9.]+, y: [0-9.]+, hitWidth: [0-9.]+, hitHeight: [0-9.]+, label: "[^"]+" \}/g)].length >= 26, "stock has at least twenty-six decoys");
      const animationKinds = hotspots.map((hotspot) => hotspot.match(/animationKind: "([^"]+)"/)?.[1]);
      assert.deepEqual(
        animationKinds,
        ["kline", "photo", "note", "note", "alert", "sign", "phone", "kline", "chat", "news", "contract", "paper", "phone"],
        "stock hotspots have explicit click feedback animations"
      );
    }

    for (const assetPath of assetPaths(block)) {
      assert.ok(existsSync(join(root, "public", assetPath)), `${sceneId} asset exists: ${assetPath}`);
    }
  }
});

test("game scene design iron rules are documented and obvious failed placeholders stay out of runtime", () => {
  const runtimeSources = [
    readFileSync(join(root, "src/game/scenes/officeScene.ts"), "utf8"),
    readFileSync(join(root, "src/game/scenes/rooftopScene.ts"), "utf8"),
    readFileSync(join(root, "src/game/scenes/convenienceScene.ts"), "utf8"),
    readFileSync(join(root, "src/game/scenes/socialScene.ts"), "utf8"),
    readFileSync(join(root, "src/styles.css"), "utf8")
  ].join("\n");

  assert.match(agentsSource, /Product Iron Rules/, "AGENTS.md documents product iron rules");
  assert.match(agentsSource, /N \+ 1/, "AGENTS.md requires one character state per clue progress");
  assert.match(agentsSource, /Hash-distinct state files are not character states/, "AGENTS.md blocks hash-only character state validation");
  assert.match(agentsSource, /progress-0.*readable protagonist emotion/s, "AGENTS.md requires readable initial character emotion");
  assert.match(agentsSource, /Characters must be independent scene units/, "AGENTS.md forbids background-crop character animation");
  assert.match(agentsSource, /Clue difficulty must come from context, not illegibility/, "AGENTS.md requires clear objects with delayed meaning");
  assert.match(agentsSource, /Digital behavior must stay on digital or clearly drafted surfaces/, "AGENTS.md blocks paper-card substitutes for digital behavior");
  assert.match(agentsSource, /Do not overload one object with multiple true clues/, "AGENTS.md blocks stacking multiple clues on one object");
  assert.match(agentsSource, /Use same-category decoys, not random clutter/, "AGENTS.md requires category-matched decoys");
  assert.match(agentsSource, /Hotspots must be calibrated from the final raster/, "AGENTS.md requires source-pixel hotspot calibration");
  assert.match(phaserSpecSource, /视觉铁律/, "Phaser spec documents visual iron rules");
  assert.match(phaserSpecSource, /Phaser 版本描述为“更像游戏”/, "Phaser spec blocks engine-only game-feel claims");
  assert.match(phaserSpecSource, /progress-0.*progress-N/s, "Phaser spec defines progress-linked character states for all levels");
  assert.match(phaserSpecSource, /禁止背景块动画/, "Phaser spec forbids animating rectangular background crops");
  assert.match(artDirectionSource, /角色进度反馈/, "Art direction documents character progress feedback");
  assert.match(artDirectionSource, /截图验收清单/, "Art direction requires screenshot QA");
  assert.match(artDirectionSource, /image-review-optimize-loop/, "Art direction requires the image review loop");
  assert.match(phaserSpecSource, /art:review/, "Phaser spec requires generated image review files");
  assert.match(imageReviewSource, /Generation Brief/, "Image review loop includes a pre-generation brief");
  assert.match(imageReviewSource, /Review Gates/, "Image review loop includes review gates");
  assert.match(imageReviewSource, /Hotspot Calibration/, "Image review loop includes source-pixel hotspot calibration");
  assert.match(imageReviewSource, /Required Loop/, "Image review loop defines the repeat-until-pass process");
  assert.match(semanticValidationSource, /visible object -> nearby context -> why this creates the urge/, "semantic validation documents the clue reasoning chain");
  assert.match(packageSource, /semantic:check/, "package scripts expose semantic validation");
  assert.ok(existsSync(join(root, "scripts/validate-level-semantics.mjs")), "semantic validation script exists");
  assert.match(backendSource, /scopeId\?: string/, "hint ad placement can be scoped per scene");
  assert.match(mainSource, /getAdPlacement\("hint", state, scene\.id\)/, "hint availability is checked per current scene");
  assert.match(mainSource, /recordAdView\(state, `hint:\$\{scene\.id\}`\)/, "hint views are recorded per current scene");
  assert.ok(existsSync(join(root, "scripts/create-image-review.mjs")), "image review generator script exists");
  for (const state of ["progress-0", "progress-1", "progress-2", "progress-3", "progress-4", "progress-5"]) {
    assert.ok(
      existsSync(join(root, "public/assets/game/office/characters", `zhou-${state}-sheet.png`)),
      `office character ${state} spritesheet exists`
    );
  }
  for (const state of ["progress-0", "progress-1", "progress-2", "progress-3", "progress-4", "progress-5", "progress-6"]) {
    assert.ok(
      existsSync(join(root, "public/assets/game/rooftop/characters", `trader-${state}-sheet.png`)),
      `rooftop character ${state} spritesheet exists`
    );
  }
  for (const state of ["progress-0", "progress-1", "progress-2", "progress-3", "progress-4", "progress-5", "progress-6", "progress-7"]) {
    assert.ok(
      existsSync(join(root, "public/assets/game/convenience/states", `convenience-${state}.png`)),
      `convenience ${state} raster state exists`
    );
  }
  for (const state of ["progress-0", "progress-1", "progress-2", "progress-3", "progress-4", "progress-5", "progress-6", "progress-7", "progress-8"]) {
    assert.ok(
      existsSync(join(root, "public/assets/game/social/states", `social-${state}.png`)),
      `social ${state} raster state exists`
    );
    assert.ok(
      existsSync(join(root, "public/assets/game/social/expressions", `social-expression-${state}.png`)),
      `social ${state} expression overlay exists`
    );
  }
  for (const state of ["progress-0", "progress-1", "progress-2", "progress-3", "progress-4", "progress-5", "progress-6", "progress-7", "progress-8", "progress-9"]) {
    assert.ok(
      existsSync(join(root, "public/assets/game/ai-launch/states", `ai-launch-${state}.png`)),
      `ai launch ${state} raster state exists`
    );
  }
  for (const state of ["progress-0", "progress-1", "progress-2", "progress-3", "progress-4", "progress-5", "progress-6", "progress-7", "progress-8", "progress-9", "progress-10"]) {
    assert.ok(
      existsSync(join(root, "public/assets/game/meeting/states", `meeting-${state}.png`)),
      `meeting ${state} raster state exists`
    );
  }
  for (const state of ["progress-0", "progress-1", "progress-2", "progress-3", "progress-4", "progress-5", "progress-6", "progress-7", "progress-8", "progress-9", "progress-10", "progress-11", "progress-12"]) {
    assert.ok(
      existsSync(join(root, "public/assets/game/nest/states", `nest-${state}.png`)),
      `nest ${state} raster state exists`
    );
  }
  for (const state of ["progress-0", "progress-1", "progress-2", "progress-3", "progress-4", "progress-5", "progress-6", "progress-7", "progress-8", "progress-9", "progress-10", "progress-11", "progress-12", "progress-13"]) {
    assert.ok(
      existsSync(join(root, "public/assets/game/stock/states", `stock-${state}.png`)),
      `stock ${state} raster state exists`
    );
  }
  const socialStateHashes = new Set(
    ["progress-0", "progress-1", "progress-2", "progress-3", "progress-4", "progress-5", "progress-6", "progress-7", "progress-8"].map((state) =>
      fileHash(join(root, "public/assets/game/social/states", `social-${state}.png`))
    )
  );
  assert.equal(socialStateHashes.size, 9, "social progress rasters are distinct state images");
  const socialExpressionHashes = new Set(
    ["progress-0", "progress-1", "progress-2", "progress-3", "progress-4", "progress-5", "progress-6", "progress-7", "progress-8"].map((state) =>
      fileHash(join(root, "public/assets/game/social/expressions", `social-expression-${state}.png`))
    )
  );
  assert.equal(socialExpressionHashes.size, 9, "social expression overlays are distinct state images");
  if (existsSync(join(root, "public/assets/game/ai-launch/states", "ai-launch-progress-0.png"))) {
    const aiLaunchStateHashes = new Set(
      ["progress-0", "progress-1", "progress-2", "progress-3", "progress-4", "progress-5", "progress-6", "progress-7", "progress-8", "progress-9"].map((state) =>
        fileHash(join(root, "public/assets/game/ai-launch/states", `ai-launch-${state}.png`))
      )
    );
    assert.equal(aiLaunchStateHashes.size, 10, "ai launch progress rasters are distinct state images");
  }
  const meetingStateHashes = new Set(
    ["progress-0", "progress-1", "progress-2", "progress-3", "progress-4", "progress-5", "progress-6", "progress-7", "progress-8", "progress-9", "progress-10"].map((state) =>
      fileHash(join(root, "public/assets/game/meeting/states", `meeting-${state}.png`))
    )
  );
  assert.equal(meetingStateHashes.size, 11, "meeting progress rasters are distinct state images");
  const nestStateHashes = new Set(
    ["progress-0", "progress-1", "progress-2", "progress-3", "progress-4", "progress-5", "progress-6", "progress-7", "progress-8", "progress-9", "progress-10", "progress-11", "progress-12"].map((state) =>
      fileHash(join(root, "public/assets/game/nest/states", `nest-${state}.png`))
    )
  );
  assert.equal(nestStateHashes.size, 13, "nest progress rasters are distinct state images");
  const stockStateHashes = new Set(
    ["progress-0", "progress-1", "progress-2", "progress-3", "progress-4", "progress-5", "progress-6", "progress-7", "progress-8", "progress-9", "progress-10", "progress-11", "progress-12", "progress-13"].map((state) =>
      fileHash(join(root, "public/assets/game/stock/states", `stock-${state}.png`))
    )
  );
  assert.equal(stockStateHashes.size, 14, "stock progress rasters are distinct state images");
  assert.match(taskStateSource, /foreground Zhou Qiming character object/, "task state records the foreground character object");
  assert.doesNotMatch(runtimeSources, /已归还/, "runtime does not use semantically detached chat feedback");
  assert.doesNotMatch(runtimeSources, /喝水/, "runtime does not claim actions that are not visually represented");
  assert.doesNotMatch(runtimeSources, /addCharacterState|fillCircle\(x/, "runtime does not draw patchwork character overlays");
  assert.doesNotMatch(runtimeSources, /scene-character|char-head|char-body/, "runtime does not keep CSS-built character fallbacks");
  assert.match(readFileSync(join(root, "src/game/scenes/socialScene.ts"), "utf8"), /scene\.decoys/, "social scene consumes config-level decoy zones");
  assert.match(readFileSync(join(root, "src/game/scenes/socialScene.ts"), "utf8"), /ai_launch/, "ai launch scene uses the same decoy-aware scene path");
  assert.match(readFileSync(join(root, "src/game/scenes/socialScene.ts"), "utf8"), /meeting/, "meeting scene uses the same decoy-aware scene path");
  assert.match(readFileSync(join(root, "src/game/scenes/socialScene.ts"), "utf8"), /nest/, "nest scene uses the same decoy-aware scene path");
  assert.match(readFileSync(join(root, "src/game/scenes/socialScene.ts"), "utf8"), /StockScene/, "stock scene uses the same decoy-aware scene path");
});
