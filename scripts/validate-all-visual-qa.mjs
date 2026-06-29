#!/usr/bin/env node
import { spawnSync } from "node:child_process";

const scenes = [
  "office",
  "rooftop",
  "convenience",
  "social",
  "ai_launch",
  "meeting",
  "nest",
  "stock",
];

const failures = [];

for (const scene of scenes) {
  const result = spawnSync("npm", ["run", "visual:gate", "--", scene], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });

  if (result.status !== 0) {
    failures.push(scene);
    process.stderr.write(result.stdout);
    process.stderr.write(result.stderr);
  } else {
    process.stdout.write(result.stdout);
  }
}

if (failures.length > 0) {
  console.error(`visual:gate:all failed for ${failures.join(", ")}`);
  process.exit(1);
}

console.log("visual:gate:all passed.");
