#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const sceneId = process.argv[2];

if (!sceneId) {
  console.error("Usage: npm run art:review -- <sceneId>");
  process.exit(1);
}

const configSource = readFileSync(join(root, "src/core/config.ts"), "utf8");

function sceneBlock(id) {
  const idIndex = configSource.indexOf(`id: "${id}"`);
  if (idIndex === -1) {
    throw new Error(`Scene not found in src/core/config.ts: ${id}`);
  }

  const start = configSource.lastIndexOf("{", idIndex);
  const nextScene = configSource.indexOf("\n    {\n      id:", idIndex + 1);
  const scenesEnd = configSource.indexOf("\n  ]\n};", idIndex);
  const end = nextScene === -1 ? scenesEnd : nextScene;
  return configSource.slice(start, end);
}

function stringValue(block, key) {
  return block.match(new RegExp(`${key}: "([^"]*)"`))?.[1] ?? "";
}

function boolValue(block, key) {
  return block.match(new RegExp(`${key}: (true|false)`))?.[1] ?? "";
}

function numberValue(block, key) {
  return block.match(new RegExp(`${key}: ([0-9.]+)`))?.[1] ?? "";
}

function hotspotObjects(block) {
  return [...block.matchAll(/\{ id: "h\d+"[^}]+ \}/g)].map((match) => match[0]);
}

function hotspotRows(block) {
  return hotspotObjects(block).map((hotspot) => ({
    id: stringValue(hotspot, "id"),
    evidenceId: stringValue(hotspot, "evidenceId"),
    label: stringValue(hotspot, "label"),
    hitX: numberValue(hotspot, "hitX"),
    hitY: numberValue(hotspot, "hitY"),
    hitWidth: numberValue(hotspot, "hitWidth") || numberValue(hotspot, "radius"),
    hitHeight: numberValue(hotspot, "hitHeight") || numberValue(hotspot, "radius"),
    renderMode: stringValue(hotspot, "renderMode"),
    image: stringValue(hotspot, "image"),
    animationKind: stringValue(hotspot, "animationKind"),
    revealText: stringValue(hotspot, "revealText")
  }));
}

function checklist(items) {
  return items.map((item) => `- [ ] ${item}`).join("\n");
}

const block = sceneBlock(sceneId);
const hotspots = hotspotRows(block);
const outDir = join(root, "docs/reviews");
mkdirSync(outDir, { recursive: true });

const today = new Date().toISOString().slice(0, 10);
const outPath = join(outDir, `${today}-${sceneId}-image-review.md`);
const existingNotice = existsSync(outPath)
  ? "\n> Existing review file overwritten by the latest config snapshot.\n"
  : "";

const hotspotTable = hotspots
  .map((hotspot) => (
    `| \`${hotspot.id}\` | ${hotspot.label} | \`${hotspot.evidenceId}\` | ` +
    `${hotspot.hitX || "TODO"}, ${hotspot.hitY || "TODO"} | ` +
    `${hotspot.hitWidth || "TODO"} x ${hotspot.hitHeight || "TODO"} | ` +
    `${hotspot.animationKind || "TODO"} |  |  |`
  ))
  .join("\n");

const content = `# ${sceneId} Image Review

Generated: ${today}

${existingNotice}
## Config Snapshot

- Scene: \`${sceneId}\`
- Name: ${stringValue(block, "name")}
- Theme: ${stringValue(block, "theme")}
- Description: ${stringValue(block, "description")}
- Background: ${stringValue(block, "backgroundImage")}
- Machine embedded: ${boolValue(block, "machineEmbedded") || "false"}
- Clue count: ${hotspots.length}
- Required character/proxy states: ${hotspots.length + 1}

## Generation Brief

${checklist([
  "Theme is one sentence and specific to this level.",
  "Scene logic explains why people and objects are in this location.",
  "Camera and main action area are fixed before generation.",
  "Foreground, midground, and background all have roles.",
  "There is enough believable object density to hide clues.",
  "Main/proxy character has a planned visible state for each progress step.",
  "Each clue is a concrete object with a reason to exist in the scene.",
  "UI copy is player-facing and contains no implementation language."
])}

## Review Gates

### Theme Gate

${checklist([
  "Every major object supports the theme or believable scene dressing.",
  "No clue needs a written explanation to make visual sense.",
  "No object is being force-fit into the narrative."
])}

### Layout Gate

${checklist([
  "Playable area is not dominated by empty scenic background.",
  "Clues are distributed across scene layers.",
  "Objects do not all sit on one floor/table band.",
  "Important objects remain visible in the game layout."
])}

### Character Gate

${checklist([
  "Character scale matches nearby people and props.",
  "Pose, grounding, contact shadow, and light direction are plausible.",
  "All progress states show readable body-language or expression changes.",
  "No pasted crop, green fringe, contact-sheet residue, or scene cutout remains."
])}

### Clue Gate

${checklist([
  "Each clue body is a concrete visible object.",
  "Clue form varies across the set.",
  "Clue object matches its label and evidence copy.",
  "No hover/found/default state spoils answers."
])}

### Interaction Gate

${checklist([
  "Every hotspot center is measured from final source pixels.",
  "Found marker lands on the object center or meaningful subpart.",
  "Hit animation stays inside or close to the object.",
  "Hint and found states do not cover neighboring clues or character faces."
])}

### Color & Style Gate

${checklist([
  "People, props, and background share lighting and contrast.",
  "The scene avoids a one-note palette.",
  "No object reads as a mismatched sticker or placeholder geometry.",
  "Text remains readable without turning the level into a dashboard."
])}

### Screenshot Gate

${checklist([
  "Captured progress-0 screenshot.",
  "Captured at least one mid-progress screenshot.",
  "Captured completion screenshot.",
  "Captured mobile first-screen screenshot.",
  "Manually inspected screenshots in the game shell."
])}

## Hotspot Calibration

Record source-pixel centers before converting to config percentages.

| ID | Label | Evidence | Config center | Config box | Animation | Source center | Review note |
| --- | --- | --- | --- | --- | --- | --- | --- |
${hotspotTable}

## Decision

- [ ] Pass: image can proceed to implementation/handoff.
- [ ] Revise art: regenerate or edit the raster.
- [ ] Revise config: update hotspot centers, hit boxes, feedback, or copy.
- [ ] Blocked: needs product/design decision.
`;

writeFileSync(outPath, content);
console.log(`Created image review: ${outPath}`);
