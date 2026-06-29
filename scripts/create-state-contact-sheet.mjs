#!/usr/bin/env node
import { existsSync, mkdirSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { spawnSync } from "node:child_process";

const root = new URL("..", import.meta.url).pathname;
const sceneId = process.argv[2];

const sceneAssets = {
  office: { dir: "office", prefix: "office" },
  rooftop: { dir: "rooftop", prefix: "rooftop" },
  convenience: { dir: "convenience", prefix: "convenience" },
  social: { dir: "social", prefix: "social" },
  ai_launch: { dir: "ai-launch", prefix: "ai-launch" },
  meeting: { dir: "meeting", prefix: "meeting" },
  nest: { dir: "nest", prefix: "nest" },
  stock: { dir: "stock", prefix: "stock" },
};

if (!sceneId || !sceneAssets[sceneId]) {
  console.error(`Usage: npm run art:states -- <${Object.keys(sceneAssets).join("|")}>`);
  process.exit(1);
}

const asset = sceneAssets[sceneId];
const stateDir = join(root, "public", "assets", "game", asset.dir, "states");
if (!existsSync(stateDir)) {
  console.error(`${sceneId}: missing state directory ${stateDir}`);
  process.exit(1);
}

const files = readdirSync(stateDir)
  .filter((file) => file.startsWith(`${asset.prefix}-progress-`) && file.endsWith(".png"))
  .map((file) => {
    const progress = Number(file.match(/progress-(\d+)/)?.[1] ?? Number.NaN);
    return { file, progress };
  })
  .filter((item) => Number.isInteger(item.progress))
  .sort((a, b) => a.progress - b.progress);

if (files.length < 2) {
  console.error(`${sceneId}: expected at least two progress-state PNGs`);
  process.exit(1);
}

const outputPath = join(root, "artifacts", `${sceneId}-state-contact-sheet.jpg`);
mkdirSync(dirname(outputPath), { recursive: true });

const rowSize = Math.ceil(files.length / 2);
const rows = [files.slice(0, rowSize), files.slice(rowSize)];
const tempRows = rows.map((_, index) => join(root, "artifacts", `.tmp-${sceneId}-states-row-${index}.jpg`));

for (let index = 0; index < rows.length; index += 1) {
  const row = rows[index];
  if (row.length === 0) continue;
  const args = [];
  for (const item of row) {
    args.push("(", join(stateDir, item.file), "-resize", "320x180", ")");
  }
  args.push("+append", tempRows[index]);
  const result = spawnSync("magick", args, { encoding: "utf8" });
  if (result.status !== 0) {
    console.error(result.stderr || result.stdout || `magick failed while creating row ${index + 1}`);
    process.exit(result.status ?? 1);
  }
}

const existingRows = tempRows.filter((path) => existsSync(path));
const result = spawnSync("magick", [...existingRows, "-append", outputPath], { encoding: "utf8" });
if (result.status !== 0) {
  console.error(result.stderr || result.stdout || "magick failed while creating contact sheet");
  process.exit(result.status ?? 1);
}

console.log(`${sceneId}: wrote ${outputPath}`);
