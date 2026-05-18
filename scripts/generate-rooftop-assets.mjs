import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { execFileSync } from "node:child_process";

const root = new URL("..", import.meta.url).pathname;
const out = (...parts) => join(root, ...parts);

function ensure(path) {
  mkdirSync(dirname(path), { recursive: true });
}

function saveSvg(path, svg) {
  ensure(path);
  writeFileSync(path, svg, "utf8");
}

function render(svgPath, pngPath, width, height) {
  ensure(pngPath);
  execFileSync("rsvg-convert", ["-w", String(width), "-h", String(height), "-o", pngPath, svgPath], {
    stdio: "inherit"
  });
}

function text(x, y, content, size = 30, color = "#2b1a13", weight = 700) {
  return `<text x="${x}" y="${y}" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="${size}" font-weight="${weight}" fill="${color}">${content}</text>`;
}

function commonDefs() {
  return `<filter id="ground" x="-35%" y="-35%" width="170%" height="170%">
      <feDropShadow dx="0" dy="18" stdDeviation="12" flood-color="#020806" flood-opacity=".34"/>
    </filter>
    <filter id="grain" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="9"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="table" tableValues="0 .08"/></feComponentTransfer>
      <feBlend mode="multiply" in2="SourceGraphic"/>
    </filter>`;
}

function foldedReceipt() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="360" height="250" viewBox="0 0 360 250">
    <defs>
      ${commonDefs()}
      <linearGradient id="paper" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#fff3c9"/><stop offset=".58" stop-color="#dbc07e"/><stop offset="1" stop-color="#8f6a43"/></linearGradient>
    </defs>
    <ellipse cx="178" cy="214" rx="130" ry="22" fill="#03100c" opacity=".22"/>
    <g filter="url(#ground)" transform="rotate(-12 180 125)">
      <path d="M50 70l214-39 58 49-26 105L84 218 36 117z" fill="url(#paper)"/>
      <path d="M264 31l58 49-66 3z" fill="#f6d99a"/>
      <path d="M70 103c62 12 129 3 211-23" stroke="#6c4a2b" stroke-width="8" stroke-linecap="round" opacity=".42"/>
      <path d="M91 132l139-25M103 158l102-18M101 187l150-27" stroke="#6c4a2b" stroke-width="7" stroke-linecap="round" opacity=".35"/>
      <path d="M204 128l72-13 10 39-72 12z" fill="#a83a27" opacity=".82"/>
      <path d="M217 143l45-8M222 155l34-6" stroke="#fff1c7" stroke-width="5" stroke-linecap="round" opacity=".82"/>
      <path d="M55 124c58 23 126 20 214-16" stroke="#8e693e" stroke-width="4" fill="none" opacity=".35"/>
      <rect x="37" y="49" width="270" height="170" fill="#fff" opacity=".01" filter="url(#grain)"/>
    </g>
  </svg>`;
}

function groupChat() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="310" viewBox="0 0 400 310">
    <defs>
      ${commonDefs()}
      <linearGradient id="body" x1="0" x2="1"><stop stop-color="#0e1713"/><stop offset="1" stop-color="#26362d"/></linearGradient>
    </defs>
    <ellipse cx="206" cy="268" rx="142" ry="24" fill="#03100c" opacity=".24"/>
    <g filter="url(#ground)" transform="rotate(3 200 155)">
      <path d="M67 42l263 18 20 199-287-25z" fill="#07100d"/>
      <path d="M88 65l221 15 14 149-237-18z" fill="#dfe6d2"/>
      <circle cx="113" cy="95" r="12" fill="#b9944c"/>
      <path d="M136 84l122 9" stroke="#fff8df" stroke-width="19" stroke-linecap="round"/>
      <circle cx="277" cy="139" r="12" fill="#3d8457"/>
      <path d="M122 130l126 9" stroke="#cddfc7" stroke-width="19" stroke-linecap="round"/>
      <circle cx="109" cy="178" r="12" fill="#b9462c"/>
      <path d="M134 169l96 7" stroke="#fff8df" stroke-width="19" stroke-linecap="round"/>
      <path d="M101 211l196 15" stroke="#829174" stroke-width="7" stroke-linecap="round" opacity=".44"/>
      <path d="M88 65l221 15" stroke="#f3c45b" stroke-width="5" opacity=".35"/>
      <circle cx="198" cy="245" r="8" fill="#2c3d34"/>
      <path d="M72 45l260 18" stroke="#53665a" stroke-width="9" opacity=".38"/>
    </g>
  </svg>`;
}

function newsShot() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="390" height="260" viewBox="0 0 390 260">
    <defs>
      ${commonDefs()}
      <linearGradient id="g" x1="0" x2="1"><stop stop-color="#3d1f19"/><stop offset="1" stop-color="#0e221b"/></linearGradient>
    </defs>
    <ellipse cx="196" cy="228" rx="136" ry="20" fill="#03100c" opacity=".2"/>
    <g filter="url(#ground)" transform="rotate(4 195 130)">
      <path d="M42 55l291-29 21 170-284 36z" fill="#e6d1a0"/>
      <path d="M66 69l248-24 6 46-247 26z" fill="url(#g)"/>
      <path d="M89 89l126-13M235 75l48-5 24 18" stroke="#f3c45b" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M82 139l205-24M86 167l165-19M90 194l214-27" stroke="#775332" stroke-width="11" stroke-linecap="round" opacity=".42"/>
      <circle cx="303" cy="120" r="10" fill="#bd4129"/>
      <path d="M84 215l155-20" stroke="#bd4129" stroke-width="5" stroke-dasharray="11 8" opacity=".55"/>
      <path d="M45 58c78 22 160 17 286-27" stroke="#fff5d1" stroke-width="5" opacity=".24"/>
      <rect x="40" y="35" width="312" height="190" fill="#fff" opacity=".01" filter="url(#grain)"/>
    </g>
  </svg>`;
}

function priceAlert() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="250" height="420" viewBox="0 0 250 420">
    <defs>
      ${commonDefs()}
      <linearGradient id="phone" x1="0" x2="1"><stop stop-color="#080d0b"/><stop offset="1" stop-color="#243229"/></linearGradient>
    </defs>
    <ellipse cx="126" cy="372" rx="78" ry="24" fill="#03100c" opacity=".28"/>
    <g filter="url(#ground)" transform="rotate(-7 125 210)">
      <path d="M47 33h153l16 329-152 18z" fill="url(#phone)"/>
      <path d="M66 67h111l12 247-113 13z" fill="#ddd1a0"/>
      <path d="M82 91h84l3 39-83 7z" fill="#b9462c"/>
      <path d="M94 113l41-4M91 172l20-31 20 17 23-44 19 15" stroke="#fff0bd" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M83 220l76-8M87 254l56-7" stroke="#6d5637" stroke-width="10" stroke-linecap="round" opacity=".5"/>
      <circle cx="129" cy="342" r="10" fill="#2d3c33"/>
      <circle cx="174" cy="71" r="14" fill="#f3c45b"/>
      <path d="M51 42l151-1" stroke="#53665a" stroke-width="7" opacity=".38"/>
    </g>
  </svg>`;
}

function warningSign() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="460" height="260" viewBox="0 0 460 260">
    <defs>
      ${commonDefs()}
      <linearGradient id="board" x1="0" x2="1"><stop stop-color="#d9c385"/><stop offset="1" stop-color="#8d6b35"/></linearGradient>
    </defs>
    <g filter="url(#ground)" transform="rotate(1 230 130)">
      <path d="M64 57l335 4-24 137-290-7z" fill="url(#board)"/>
      <path d="M86 76l288 4-17 95-254-7z" fill="#26342b"/>
      <path d="M107 98l218 5M108 137l184 4" stroke="#f3c45b" stroke-width="11" stroke-linecap="round"/>
      <path d="M112 119l108 2M112 157l154 4" stroke="#fff2ba" stroke-width="10" stroke-linecap="round" opacity=".82"/>
      <path d="M58 202h352" stroke="#7a5b2f" stroke-width="18" stroke-linecap="round"/>
      <circle cx="86" cy="68" r="10" fill="#b63b24"/><circle cx="378" cy="70" r="10" fill="#b63b24"/>
      <path d="M70 58l322 4" stroke="#fff2ba" stroke-width="5" opacity=".18"/>
    </g>
  </svg>`;
}

function coolingFurnace() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="360" height="300" viewBox="0 0 360 300">
    <defs>
      ${commonDefs()}
      <linearGradient id="m" x1="0" x2="1"><stop stop-color="#13211b"/><stop offset=".62" stop-color="#315344"/><stop offset="1" stop-color="#16231d"/></linearGradient>
    </defs>
    <ellipse cx="183" cy="251" rx="125" ry="25" fill="#03100c" opacity=".28"/>
    <g filter="url(#ground)">
      <path d="M52 78h250l23 131-22 29H57l-23-31z" fill="url(#m)" stroke="#6f8f79" stroke-width="8"/>
      <path d="M82 106h128l10 64H91z" fill="#08120f" stroke="#d8bd61" stroke-width="5"/>
      <path d="M105 141h21l13-19 19 39 16-29 18 9" stroke="#f3c45b" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="265" cy="122" r="18" fill="#b9462c"/><circle cx="272" cy="174" r="18" fill="#4f8d5d"/>
      <path d="M83 210h194" stroke="#0b1712" stroke-width="16" stroke-linecap="round"/>
      <path d="M87 234v28M276 234v28" stroke="#0b1712" stroke-width="15" stroke-linecap="round"/>
      <path d="M66 81h224" stroke="#f2e0a4" stroke-width="5" opacity=".16"/>
      <path d="M236 205l35 1" stroke="#fff1c7" stroke-width="8" stroke-linecap="round" opacity=".78"/>
    </g>
  </svg>`;
}

function characterFrame(progress, frame) {
  const x = frame * 720;
  const lean = -15 + progress * 5.4;
  const headY = 194 - progress * 7 + (frame % 2) * 3;
  const shoulderY = 320 - progress * 11;
  const phoneY = 412 + progress * 24;
  const handTension = progress < 3 ? 42 : 30;
  const eye = progress < 2 ? "M322 191h26M374 191h26" : progress < 5 ? "M322 187q13 8 26 0M374 187q13 8 26 0" : "M322 184q13 12 26 0M374 184q13 12 26 0";
  const mouth = progress < 2 ? "M345 238q28 -8 55 0" : progress < 4 ? "M348 239q24 6 49 0" : "M346 236q27 16 55 0";
  const phoneAngle = progress < 4 ? -12 : 8;
  const neckTop = headY + 74;
  return `<g transform="translate(${x} 0) rotate(${lean} 360 390)">
    <ellipse cx="365" cy="720" rx="160" ry="34" fill="#04100d" opacity=".22"/>
    <path d="M338 ${neckTop}q28 18 64 1l-5 92q-34 22-69 0z" fill="url(#skin)"/>
    <path d="M250 ${shoulderY + 44}q114-50 230 0l50 280H203z" fill="${progress < 3 ? "url(#coat-cold)" : "url(#coat-warm)"}"/>
    <path d="M270 ${shoulderY + 50}q90 30 184 0l14 66q-96 42-212 0z" fill="#17261f" opacity=".46"/>
    <path d="M291 ${shoulderY + 142}q-${handTension} 48-72 112" stroke="url(#skin)" stroke-width="42" stroke-linecap="round" fill="none"/>
    <path d="M438 ${shoulderY + 142}q${Math.max(28, handTension - 4)} 42 61 108" stroke="url(#skin)" stroke-width="42" stroke-linecap="round" fill="none"/>
    <g transform="translate(0 ${headY - 185})">
      <path d="M301 132q28-66 103-54q64 11 77 74q9 42-12 79q-25 45-84 52q-70 8-95-44q-22-46 11-107z" fill="url(#skin)"/>
      <path d="M294 153q32-87 120-78q51 5 76 43q-49-14-99-8q-52 7-97 43z" fill="#2b211b"/>
      <path d="M438 135q24 42 8 87" stroke="#b98255" stroke-width="9" stroke-linecap="round" opacity=".28"/>
      <path d="${eye}" stroke="#241814" stroke-width="9" stroke-linecap="round" fill="none"/>
      <path d="${mouth}" stroke="#8b3d2e" stroke-width="8" stroke-linecap="round" fill="none"/>
      <path d="M358 205q-9 17-22 32" stroke="#b98255" stroke-width="7" stroke-linecap="round" fill="none"/>
    </g>
    <g transform="translate(352 ${phoneY + 8}) rotate(${phoneAngle})">
      <rect x="-48" y="-78" width="96" height="142" rx="19" fill="#111814"/>
      <rect x="-36" y="-55" width="72" height="92" rx="9" fill="${progress < 3 ? "#f0d783" : "#bcd5ae"}"/>
      <path d="M-23-8l18-22 17 15 16-34" stroke="#c64628" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    <path d="M290 627h68M385 627h72" stroke="#1b251f" stroke-width="58" stroke-linecap="round"/>
  </g>`;
}

function characterSheet(progress) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="2880" height="820" viewBox="0 0 2880 820">
    <defs>
      <linearGradient id="skin" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#ddb27b"/><stop offset=".64" stop-color="#c8925d"/><stop offset="1" stop-color="#8f5839"/></linearGradient>
      <linearGradient id="coat-cold" x1="0" x2="1"><stop stop-color="#182520"/><stop offset=".62" stop-color="#2d4037"/><stop offset="1" stop-color="#101a16"/></linearGradient>
      <linearGradient id="coat-warm" x1="0" x2="1"><stop stop-color="#233a30"/><stop offset=".62" stop-color="#42664f"/><stop offset="1" stop-color="#17241e"/></linearGradient>
    </defs>
    ${[0, 1, 2, 3].map((frame) => characterFrame(progress, frame)).join("")}
  </svg>`;
}

const clueAssets = [
  ["folded-receipt", foldedReceipt(), 360, 250],
  ["group-chat", groupChat(), 400, 310],
  ["risk-news", newsShot(), 390, 260],
  ["price-alert", priceAlert(), 250, 420],
  ["warning-sign", warningSign(), 460, 260]
];

for (const [name, svg, width, height] of clueAssets) {
  const source = out("public/assets/game/rooftop/clues/source", `${name}.svg`);
  const target = out("public/assets/game/rooftop/clues", `${name}.png`);
  saveSvg(source, svg);
  render(source, target, width, height);
}

const machineSource = out("public/assets/game/rooftop/machines/source/cooling-furnace.svg");
const machineTarget = out("public/assets/game/rooftop/machines/cooling-furnace.png");
saveSvg(machineSource, coolingFurnace());
render(machineSource, machineTarget, 360, 300);

for (let progress = 0; progress <= 5; progress += 1) {
  const source = out("public/assets/game/rooftop/characters/source", `trader-progress-${progress}-sheet.svg`);
  const sheet = out("public/assets/game/rooftop/characters", `trader-progress-${progress}-sheet.png`);
  saveSvg(source, characterSheet(progress));
  render(source, sheet, 2880, 820);
}
