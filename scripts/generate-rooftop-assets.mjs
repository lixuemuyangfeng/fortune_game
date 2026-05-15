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

function foldedReceipt() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="360" height="250" viewBox="0 0 360 250">
    <defs>
      <filter id="s" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="12" stdDeviation="10" flood-color="#24150d" flood-opacity=".28"/></filter>
      <linearGradient id="paper" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#fff1c7"/><stop offset=".7" stop-color="#d9b16d"/><stop offset="1" stop-color="#9a7044"/></linearGradient>
    </defs>
    <g filter="url(#s)" transform="rotate(-8 180 125)">
      <path d="M54 36h216l42 50-29 126H75L42 82z" fill="url(#paper)"/>
      <path d="M270 36l42 50-56-6z" fill="#f8d99a"/>
      <path d="M73 76h164" stroke="#6c4a2b" stroke-width="7" stroke-linecap="round" opacity=".55"/>
      <path d="M83 116h142M92 148h104M87 181h152" stroke="#6c4a2b" stroke-width="8" stroke-linecap="round" opacity=".42"/>
      <rect x="212" y="120" width="62" height="38" rx="8" fill="#b63b24" opacity=".88"/>
      ${text(221, 147, "追高", 23, "#fff1c7")}
      <path d="M58 91c58 24 122 28 205 8" stroke="#8e693e" stroke-width="4" fill="none" opacity=".45"/>
    </g>
  </svg>`;
}

function groupChat() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="310" viewBox="0 0 400 310">
    <defs><filter id="s"><feDropShadow dx="0" dy="14" stdDeviation="12" flood-color="#020806" flood-opacity=".35"/></filter></defs>
    <g filter="url(#s)">
      <rect x="48" y="30" width="304" height="250" rx="34" fill="#17261f"/>
      <rect x="70" y="57" width="260" height="196" rx="22" fill="#e9eddc"/>
      <circle cx="100" cy="93" r="17" fill="#b9944c"/>
      <rect x="127" y="77" width="155" height="32" rx="16" fill="#fff8df"/>
      <circle cx="292" cy="139" r="17" fill="#3d8457"/>
      <rect x="116" y="123" width="158" height="32" rx="16" fill="#dff0dc"/>
      <circle cx="101" cy="185" r="17" fill="#c64628"/>
      <rect x="128" y="169" width="120" height="32" rx="16" fill="#fff8df"/>
      <path d="M82 224h236" stroke="#829174" stroke-width="8" stroke-linecap="round" opacity=".45"/>
      ${text(127, 99, "还拿吗", 24)}
      ${text(140, 145, "长期", 22, "#1d3a2d")}
      ${text(132, 191, "越跌买", 22)}
      <path d="M68 47h264" stroke="#f3c45b" stroke-width="5" opacity=".5"/>
    </g>
  </svg>`;
}

function newsShot() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="390" height="260" viewBox="0 0 390 260">
    <defs>
      <filter id="s"><feDropShadow dx="0" dy="12" stdDeviation="11" flood-color="#030b08" flood-opacity=".35"/></filter>
      <linearGradient id="g" x1="0" x2="1"><stop stop-color="#3d1f19"/><stop offset="1" stop-color="#0e221b"/></linearGradient>
    </defs>
    <g filter="url(#s)" transform="rotate(5 195 130)">
      <rect x="40" y="34" width="310" height="194" rx="18" fill="#f7e5b6"/>
      <rect x="58" y="53" width="274" height="50" rx="10" fill="url(#g)"/>
      ${text(77, 87, "避险买盘", 30, "#fff1c7")}
      <path d="M72 132h223M72 162h184M72 192h228" stroke="#775332" stroke-width="12" stroke-linecap="round" opacity=".45"/>
      <circle cx="314" cy="134" r="11" fill="#c64628"/>
      <path d="M286 70l25-14 13 24" stroke="#f3c45b" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M84 218h165" stroke="#c64628" stroke-width="5" stroke-dasharray="11 8" opacity=".65"/>
    </g>
  </svg>`;
}

function priceAlert() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="250" height="420" viewBox="0 0 250 420">
    <defs><filter id="s"><feDropShadow dx="0" dy="16" stdDeviation="12" flood-color="#020806" flood-opacity=".42"/></filter></defs>
    <g filter="url(#s)" transform="rotate(-4 125 210)">
      <rect x="45" y="22" width="160" height="365" rx="34" fill="#101815"/>
      <rect x="61" y="58" width="128" height="286" rx="18" fill="#e4d8aa"/>
      <rect x="78" y="88" width="94" height="42" rx="14" fill="#c64628"/>
      ${text(88, 117, "-0.5%", 28, "#fff7df")}
      <path d="M78 178l23-28 22 22 20-42 21 15" stroke="#b63b24" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M82 236h80M82 270h58" stroke="#6d5637" stroke-width="11" stroke-linecap="round" opacity=".55"/>
      <circle cx="125" cy="364" r="12" fill="#2d3c33"/>
      <circle cx="178" cy="76" r="18" fill="#f3c45b"/>
    </g>
  </svg>`;
}

function warningSign() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="460" height="260" viewBox="0 0 460 260">
    <defs><filter id="s"><feDropShadow dx="0" dy="10" stdDeviation="9" flood-color="#020806" flood-opacity=".35"/></filter></defs>
    <g filter="url(#s)" transform="rotate(2 230 130)">
      <path d="M62 55h336l-18 145H86z" fill="#e7d18f"/>
      <path d="M82 74h294l-12 104H96z" fill="#26342b"/>
      <path d="M100 91h248M101 137h206" stroke="#f3c45b" stroke-width="12" stroke-linecap="round"/>
      ${text(116, 122, "禁止聚集", 34, "#fff2ba")}
      ${text(116, 166, "讨论敏感行情", 29, "#fff2ba")}
      <path d="M56 202h354" stroke="#8d6b35" stroke-width="16" stroke-linecap="round"/>
      <circle cx="82" cy="66" r="10" fill="#b63b24"/><circle cx="378" cy="66" r="10" fill="#b63b24"/>
    </g>
  </svg>`;
}

function coolingFurnace() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="360" height="300" viewBox="0 0 360 300">
    <defs>
      <filter id="s"><feDropShadow dx="0" dy="14" stdDeviation="12" flood-color="#020806" flood-opacity=".42"/></filter>
      <linearGradient id="m" x1="0" x2="1"><stop stop-color="#17261f"/><stop offset="1" stop-color="#315344"/></linearGradient>
    </defs>
    <g filter="url(#s)">
      <rect x="48" y="70" width="264" height="164" rx="28" fill="url(#m)" stroke="#7f9e86" stroke-width="8"/>
      <rect x="82" y="101" width="130" height="72" rx="16" fill="#09120f" stroke="#f3c45b" stroke-width="5"/>
      <path d="M104 138h22l14-20 18 40 16-28 18 8" stroke="#f3c45b" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="256" cy="122" r="21" fill="#c64628"/><circle cx="256" cy="178" r="21" fill="#4f8d5d"/>
      <path d="M77 238h206" stroke="#0b1712" stroke-width="18" stroke-linecap="round"/>
      ${text(95, 213, "接盘冷却", 28, "#fff1c7")}
    </g>
  </svg>`;
}

function characterFrame(progress, frame) {
  const x = frame * 720;
  const lean = -12 + progress * 5;
  const headY = 188 - progress * 5 + (frame % 2) * 3;
  const shoulderY = 330 - progress * 8;
  const phoneY = 430 + progress * 18;
  const eye = progress < 2 ? "M322 191h26M374 191h26" : progress < 5 ? "M322 187q13 8 26 0M374 187q13 8 26 0" : "M322 184q13 12 26 0M374 184q13 12 26 0";
  const mouth = progress < 2 ? "M345 238q28 -8 55 0" : progress < 4 ? "M348 239q24 6 49 0" : "M346 236q27 16 55 0";
  const phoneAngle = progress < 4 ? -12 : 8;
  return `<g transform="translate(${x} 0) rotate(${lean} 360 390)">
    <ellipse cx="365" cy="720" rx="160" ry="34" fill="#04100d" opacity=".22"/>
    <path d="M245 ${shoulderY + 90}q120-72 242 0l42 235H204z" fill="${progress < 3 ? "#24342e" : "#2f4d3f"}"/>
    <path d="M257 ${shoulderY + 98}q104 38 211 0l15 70q-112 45-241 0z" fill="#17261f" opacity=".55"/>
    <path d="M291 ${shoulderY + 190}q-52 48-72 112" stroke="#c69a64" stroke-width="42" stroke-linecap="round" fill="none"/>
    <path d="M438 ${shoulderY + 190}q46 42 61 108" stroke="#c69a64" stroke-width="42" stroke-linecap="round" fill="none"/>
    <g transform="translate(0 ${headY - 185})">
      <path d="M301 132q28-66 103-54q64 11 77 74q9 42-12 79q-25 45-84 52q-70 8-95-44q-22-46 11-107z" fill="#d2a06d"/>
      <path d="M294 153q32-87 120-78q51 5 76 43q-49-14-99-8q-52 7-97 43z" fill="#2b211b"/>
      <path d="${eye}" stroke="#241814" stroke-width="9" stroke-linecap="round" fill="none"/>
      <path d="${mouth}" stroke="#8b3d2e" stroke-width="8" stroke-linecap="round" fill="none"/>
      <path d="M358 205q-9 17-22 32" stroke="#b98255" stroke-width="7" stroke-linecap="round" fill="none"/>
    </g>
    <g transform="translate(352 ${phoneY}) rotate(${phoneAngle})">
      <rect x="-48" y="-78" width="96" height="142" rx="19" fill="#111814"/>
      <rect x="-36" y="-55" width="72" height="92" rx="9" fill="${progress < 3 ? "#f0d783" : "#bcd5ae"}"/>
      <path d="M-23-8l18-22 17 15 16-34" stroke="#c64628" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    <path d="M290 627h68M385 627h72" stroke="#1b251f" stroke-width="58" stroke-linecap="round"/>
  </g>`;
}

function characterSheet(progress) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="2880" height="820" viewBox="0 0 2880 820">
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
