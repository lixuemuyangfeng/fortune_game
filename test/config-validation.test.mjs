import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

const root = new URL("..", import.meta.url).pathname;
const configSource = readFileSync(join(root, "src/core/config.ts"), "utf8");

function sceneBlock(sceneId) {
  const idIndex = configSource.indexOf(`id: "${sceneId}"`);
  assert.notEqual(idIndex, -1, `scene ${sceneId} exists`);

  const start = configSource.lastIndexOf("{", idIndex);
  const nextScene = configSource.indexOf("\n    {\n      id:", idIndex + 1);
  const scenesEnd = configSource.indexOf("\n  ],\n  facilities:", idIndex);
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

  for (const sceneId of ["office", "moments", "temple"]) {
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

    for (const assetPath of assetPaths(block)) {
      assert.ok(existsSync(join(root, "public", assetPath)), `${sceneId} asset exists: ${assetPath}`);
    }
  }
});
