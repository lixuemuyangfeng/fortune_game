import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

const root = new URL("..", import.meta.url).pathname;
const configSource = readFileSync(join(root, "src/core/config.ts"), "utf8");
const agentsSource = readFileSync(join(root, "AGENTS.md"), "utf8");
const phaserSpecSource = readFileSync(join(root, "docs/phaser3-requirements-spec.md"), "utf8");
const artDirectionSource = readFileSync(join(root, "docs/art-direction.md"), "utf8");
const taskStateSource = readFileSync(join(root, "TASK_STATE.md"), "utf8");

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

function assetPaths(block) {
  return [...block.matchAll(/"(\/assets\/[^"]+)"/g)].map((match) => match[1]);
}

test("all playable levels meet narrative and interaction content requirements", () => {
  const knownEvidenceIds = evidenceIds();

  for (const sceneId of ["office", "rooftop", "moments", "temple"]) {
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
        ["receipt", "chat", "news", "alert", "sign"],
        "rooftop hotspots have explicit click feedback animations"
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
    readFileSync(join(root, "src/styles.css"), "utf8")
  ].join("\n");

  assert.match(agentsSource, /Product Iron Rules/, "AGENTS.md documents product iron rules");
  assert.match(agentsSource, /N \+ 1/, "AGENTS.md requires one character state per clue progress");
  assert.match(agentsSource, /Characters must be independent scene units/, "AGENTS.md forbids background-crop character animation");
  assert.match(phaserSpecSource, /视觉铁律/, "Phaser spec documents visual iron rules");
  assert.match(phaserSpecSource, /Phaser 版本描述为“更像游戏”/, "Phaser spec blocks engine-only game-feel claims");
  assert.match(phaserSpecSource, /progress-0.*progress-N/s, "Phaser spec defines progress-linked character states for all levels");
  assert.match(phaserSpecSource, /禁止背景块动画/, "Phaser spec forbids animating rectangular background crops");
  assert.match(artDirectionSource, /角色进度反馈/, "Art direction documents character progress feedback");
  assert.match(artDirectionSource, /截图验收清单/, "Art direction requires screenshot QA");
  for (const state of ["progress-0", "progress-1", "progress-2", "progress-3", "progress-4", "progress-5"]) {
    assert.ok(
      existsSync(join(root, "public/assets/game/office/characters", `zhou-${state}-sheet.png`)),
      `office character ${state} spritesheet exists`
    );
    assert.ok(
      existsSync(join(root, "public/assets/game/rooftop/characters", `trader-${state}-sheet.png`)),
      `rooftop character ${state} spritesheet exists`
    );
  }
  assert.match(taskStateSource, /foreground Zhou Qiming character object/, "task state records the foreground character object");
  assert.doesNotMatch(runtimeSources, /已归还/, "runtime does not use semantically detached chat feedback");
  assert.doesNotMatch(runtimeSources, /喝水/, "runtime does not claim actions that are not visually represented");
  assert.doesNotMatch(runtimeSources, /addCharacterState|fillCircle\(x/, "runtime does not draw patchwork character overlays");
  assert.doesNotMatch(runtimeSources, /scene-character|char-head|char-body/, "runtime does not keep CSS-built character fallbacks");
});
