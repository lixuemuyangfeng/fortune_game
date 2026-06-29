import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");
const outputDir = resolve(repoRoot, "artifacts/openai-stock-pipeline");
const sourceDir = resolve(repoRoot, "public/assets/game/stock/source/openai-layered");

function loadDotEnv() {
  const envPath = resolve(repoRoot, ".env");
  if (!existsSync(envPath)) return;
  const lines = readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match) continue;
    const [, key, rawValue] = match;
    if (process.env[key]) continue;
    process.env[key] = rawValue.replace(/^["']|["']$/g, "");
  }
}

loadDotEnv();

const imageModel = process.env.OPENAI_IMAGE_MODEL || "gpt-image-1";
const imageSize = process.env.OPENAI_IMAGE_SIZE || "1536x1024";
const imageQuality = process.env.OPENAI_IMAGE_QUALITY || "high";

const basePrompt = [
  "Photorealistic cinematic 16:9 hidden-object game background.",
  "Nighttime Chinese apartment study, rainy city high-rises outside the window, warm desk lamp, cluttered wooden desk.",
  "One tired middle-aged Chinese man in a dark green overshirt sits at the desk, left-middle foreground.",
  "He presses one hand against his forehead/temple in stress, head lowered, furrowed brow, tired eyes, anxious expression.",
  "His other hand is empty and naturally resting on the desk or near his lap. He is not holding a phone.",
  "A smartphone lies on the desk directly in front of him, slightly propped on papers or a small stand, with believable contact shadow.",
  "The phone screen faces the man and is also visible to the viewer. Leave the phone screen suitable for later replacement with a crisp UI overlay.",
  "Leave a monitor, tablet, papers, receipts, calculator, house photo and keys, repayment bill, risk disclosure paper, news clipping, sticky notes, snack bag, crumpled papers.",
  "Do not rely on readable text inside the generated image; text and UI will be added later as deterministic overlays.",
  "No phone in hand, no floating phone, no black blank phone back, no duplicate people, no duplicate phones, no red boxes, no checkmarks, no game UI overlay, no cartoon style.",
].join(" ");

function ensureDir(path) {
  mkdirSync(path, { recursive: true });
}

function writeDeterministicOverlays() {
  ensureDir(outputDir);
  ensureDir(sourceDir);
  execFileSync("python3", [join(__dirname, "render-stock-overlays.py")], { stdio: "inherit" });
}

async function generateBaseImage() {
  const apiKey = process.env.OPENAI_API_KEY;
  const payload = {
    model: imageModel,
    prompt: basePrompt,
    size: imageSize,
    quality: imageQuality,
    output_format: "png",
  };
  writeFileSync(join(outputDir, "openai-stock-base-request.json"), JSON.stringify(payload, null, 2));

  if (!apiKey) {
    console.error("OPENAI_API_KEY is missing. Wrote deterministic overlays and request payload only.");
    process.exitCode = 2;
    return;
  }

  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const body = await response.json();
  writeFileSync(join(outputDir, "openai-stock-base-response.json"), JSON.stringify(body, null, 2));
  if (!response.ok) {
    throw new Error(`OpenAI image generation failed: ${response.status} ${JSON.stringify(body)}`);
  }

  const b64 = body?.data?.[0]?.b64_json;
  if (!b64) {
    throw new Error("OpenAI image response did not include data[0].b64_json.");
  }

  const generatedPath = join(outputDir, "stock-openai-base-raw.png");
  writeFileSync(generatedPath, Buffer.from(b64, "base64"));
  const runtimeCandidate = join(sourceDir, "stock-openai-base-1280.png");
  execFileSync("magick", [generatedPath, "-resize", "1280x720^", "-gravity", "center", "-extent", "1280x720", runtimeCandidate]);
  console.log(`Generated ${runtimeCandidate}`);
}

ensureDir(outputDir);
ensureDir(sourceDir);
writeDeterministicOverlays();
await generateBaseImage();
