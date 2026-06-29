#!/usr/bin/env node
import { spawn, spawnSync } from "node:child_process";

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

const root = new URL("..", import.meta.url).pathname;
const server = spawn("npm", ["run", "dev", "--", "--host", "127.0.0.1"], {
  cwd: root,
  stdio: ["ignore", "pipe", "pipe"],
});

server.stdout.on("data", () => {});
server.stderr.on("data", () => {});

try {
  await waitForServer("http://127.0.0.1:5173/");
  for (const scene of scenes) {
    console.log(`visual:qa ${scene}`);
    const result = spawnSync("npm", ["run", "visual:qa", "--", scene, "--reuse-server"], {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    process.stdout.write(result.stdout);
    process.stderr.write(result.stderr);
    if (result.status !== 0) process.exit(result.status ?? 1);
  }
} finally {
  server.kill("SIGINT");
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
