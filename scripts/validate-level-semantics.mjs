import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const configSource = readFileSync(join(root, "src/core/config.ts"), "utf8");

const sceneOrder = ["office", "rooftop", "convenience", "social", "ai_launch", "meeting", "nest"];
const concreteAnchorPattern =
  /(手机|屏|表格|清单|平板|令牌|流程图|红章|标签页|剪报|消息|小票|合同|告示|票|合影|付款码|立牌|草稿|评论|便签|便利贴|书签|还款单|红章|图|纸|单|本|表|页|日历|激光笔|文件|锁盒|白板|键盘|收据|管阀|牌|盾|价签|封签|照片|钥匙|信封|账单|通知|票卷|碎片|计时器|曲线|角落|弹窗|走势|交流群|快讯|提醒|邀请|新闻|协同格|剪刀差|申请|画框|刮刮泪)/;
const implementationLeakPattern = /(Phaser|占位|placeholder|TODO|临时半|脚本生成)/i;
const tooAbstractTitlePattern = /^(数据|人脉|队列|关系|流程|诱因|问题|风险|机会|恐慌|焦虑)$/;

function sceneBlock(sceneId) {
  const idIndex = configSource.indexOf(`id: "${sceneId}"`);
  if (idIndex === -1) throw new Error(`scene ${sceneId} not found`);
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

function configObjects(block, key) {
  return [...arrayBody(block, key).matchAll(/\{([^{}]*)\}/g)].map((match) => {
    const raw = match[1];
    return {
      raw,
      id: raw.match(/id: "([^"]+)"/)?.[1] ?? "",
      evidenceId: raw.match(/evidenceId: "([^"]+)"/)?.[1] ?? "",
      label: raw.match(/label: "([^"]+)"/)?.[1] ?? "",
    };
  });
}

function evidenceEntries() {
  const evidencesStart = configSource.indexOf("evidences: {");
  const scenesStart = configSource.indexOf("\n  scenes:", evidencesStart);
  const block = configSource.slice(evidencesStart, scenesStart);
  const entries = new Map();
  for (const match of block.matchAll(/\n    ([a-z0-9_]+): \{([\s\S]*?)\n    \}/g)) {
    const [, id, raw] = match;
    entries.set(id, {
      id,
      title: raw.match(/title: "([^"]+)"/)?.[1] ?? "",
      detail: raw.match(/detail: "([^"]+)"/)?.[1] ?? "",
      counterText: raw.match(/counterText: "([^"]+)"/)?.[1] ?? "",
      raw,
    });
  }
  return entries;
}

const errors = [];
const warnings = [];
const evidences = evidenceEntries();
let previousHotspotCount = 0;

for (const sceneId of sceneOrder) {
  const block = sceneBlock(sceneId);
  const hotspots = configObjects(block, "hotspots");
  const decoys = configObjects(block, "decoys");

  if (hotspots.length <= previousHotspotCount && sceneId !== "office") {
    errors.push(`${sceneId}: clue count ${hotspots.length} must increase after previous ${previousHotspotCount}`);
  }
  previousHotspotCount = hotspots.length;

  if (sceneOrder.indexOf(sceneId) >= sceneOrder.indexOf("social") && decoys.length < hotspots.length * 2) {
    errors.push(`${sceneId}: late level needs at least 2x same-category decoys (${decoys.length}/${hotspots.length * 2})`);
  }

  for (const hotspot of hotspots) {
    if (!concreteAnchorPattern.test(hotspot.label)) {
      errors.push(`${sceneId}/${hotspot.id}: label "${hotspot.label}" lacks a concrete visible object anchor`);
    }
    if (implementationLeakPattern.test(hotspot.raw)) {
      errors.push(`${sceneId}/${hotspot.id}: hotspot copy leaks implementation/placeholder wording`);
    }

    const evidence = evidences.get(hotspot.evidenceId);
    if (!evidence) {
      errors.push(`${sceneId}/${hotspot.id}: missing evidence ${hotspot.evidenceId}`);
      continue;
    }
    if (!concreteAnchorPattern.test(evidence.title)) {
      errors.push(`${sceneId}/${hotspot.id}: evidence title "${evidence.title}" lacks a concrete object anchor`);
    }
    if (tooAbstractTitlePattern.test(evidence.title)) {
      errors.push(`${sceneId}/${hotspot.id}: evidence title "${evidence.title}" is abstract, not object-led`);
    }
    if (evidence.detail.length < 12) {
      errors.push(`${sceneId}/${hotspot.id}: evidence detail is too short to explain the object-context relationship`);
    }
    if (evidence.counterText.length < 6) {
      errors.push(`${sceneId}/${hotspot.id}: counterText is too short to give semantic feedback`);
    }
    if (implementationLeakPattern.test(`${evidence.title}${evidence.detail}${evidence.counterText}`)) {
      errors.push(`${sceneId}/${hotspot.id}: evidence copy leaks implementation/placeholder wording`);
    }
  }

  const repeatedObjectWords = new Map();
  for (const hotspot of hotspots) {
    const match = hotspot.label.match(concreteAnchorPattern);
    if (!match) continue;
    repeatedObjectWords.set(match[1], (repeatedObjectWords.get(match[1]) ?? 0) + 1);
  }
  for (const [word, count] of repeatedObjectWords) {
    if (count >= Math.max(3, Math.ceil(hotspots.length / 3))) {
      warnings.push(`${sceneId}: ${count} hotspot labels share object word "${word}"; review for same-object overloading`);
    }
  }
}

if (warnings.length > 0) {
  console.warn("Semantic review warnings:");
  for (const warning of warnings) console.warn(`- ${warning}`);
}

if (errors.length > 0) {
  console.error("Semantic validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Semantic validation passed for ${sceneOrder.length} scenes.`);
