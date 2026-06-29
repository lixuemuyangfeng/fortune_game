#!/usr/bin/env node
import { existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { execFileSync } from "node:child_process";

const root = new URL("..", import.meta.url).pathname;
const sourceDir = join(root, "public", "assets", "game", "nest", "source", "v2");
const background = join(sourceDir, "nest-v2-clean-bg-1280.png");
const stateDir = join(sourceDir, "generated-states");
const outputDir = join(sourceDir, "candidate-states");
const artifactDir = join(root, "artifacts", "nest-state-repair");

const stateCount = 13;
const spriteHeight = 335;
const spriteX = 490;
const spriteY = 305;
const shadowX = 505;
const shadowY = 615;
const stateSourceByProgress = [
  "00",
  "01",
  "04",
  "02",
  "03",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];
const stateOffsetsByProgress = new Map([
  [3, { x: 38, y: 0 }],
]);

if (!existsSync(background)) {
  fail(`Missing clean nest background: ${relative(background)}`);
}

mkdirSync(outputDir, { recursive: true });
mkdirSync(artifactDir, { recursive: true });
rmSync(outputDir, { recursive: true, force: true });
mkdirSync(outputDir, { recursive: true });

const outputs = [];
for (let index = 0; index < stateCount; index += 1) {
  const id = String(index).padStart(2, "0");
  const source = preferredStateSource(stateSourceByProgress[index] ?? id);
  const offset = stateOffsetsByProgress.get(index) ?? { x: 0, y: 0 };
  const output = join(outputDir, `nest-v2-progress-${index}.png`);

  runMagick([
    background,
    "(",
    "-size",
    "210x36",
    "xc:none",
    "-fill",
    "rgba(0,0,0,0.45)",
    "-draw",
    "ellipse 105,18 105,18 0,360",
    "-blur",
    "0x5",
    ")",
    "-geometry",
    `+${shadowX + offset.x}+${shadowY + offset.y}`,
    "-composite",
    "(",
    source,
    "-resize",
    `x${spriteHeight}`,
    "-modulate",
    "78,86,100",
    ")",
    "-geometry",
    `+${spriteX + offset.x}+${spriteY + offset.y}`,
    "-composite",
    output,
  ]);
  outputs.push(output);
}

const resizedDir = join(artifactDir, "nest-v2-candidate-resized");
rmSync(resizedDir, { recursive: true, force: true });
mkdirSync(resizedDir, { recursive: true });

for (const [index, output] of outputs.entries()) {
  const id = String(index).padStart(2, "0");
  runMagick([
    output,
    "-resize",
    "420x236",
    "-background",
    "#101915",
    "-gravity",
    "center",
    "-extent",
    "448x252",
    join(resizedDir, `state-${id}.jpg`),
  ]);
}

const resizedFiles = readdirSync(resizedDir)
  .filter((file) => file.endsWith(".jpg"))
  .sort()
  .map((file) => join(resizedDir, file));
const rowPaths = [];
for (let index = 0; index < resizedFiles.length; index += 4) {
  const rowPath = join(resizedDir, `row-${String(index / 4).padStart(2, "0")}.jpg`);
  runMagick([...resizedFiles.slice(index, index + 4), "+append", rowPath]);
  rowPaths.push(rowPath);
}

runMagick([...rowPaths, "-append", join(artifactDir, "nest-v2-candidate-state-contact.jpg")]);

console.log(`nest v2: wrote ${stateCount} candidate state images to ${relative(outputDir)}`);
console.log(`nest v2: wrote ${relative(join(artifactDir, "nest-v2-candidate-state-contact.jpg"))}`);

function preferredStateSource(id) {
  const candidates = [
    join(stateDir, `zhou-state-helper-${id}.png`),
    join(stateDir, `zhou-state-alpha-contract-${id}.png`),
    join(stateDir, `zhou-state-alpha-${id}.png`),
    join(stateDir, `zhou-state-green-${id}.png`),
  ];
  const source = candidates.find((path) => existsSync(path));
  if (!source) fail(`Missing generated Zhou state ${id} under ${relative(stateDir)}`);
  return source;
}

function runMagick(args) {
  execFileSync("magick", args, { cwd: root, stdio: "pipe" });
}

function fail(message) {
  console.error(message);
  process.exit(1);
}

function relative(path) {
  return path.replace(root, "").replace(/^\//, "");
}
