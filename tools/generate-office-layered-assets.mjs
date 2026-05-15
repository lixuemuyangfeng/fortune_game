import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const source = join(root, "public/assets/office-level/office-raster-v2.png");
const outDir = join(root, "public/assets/game/office");
const characterDir = join(outDir, "characters");
const generatedCharacterSheet = join(characterDir, "source/zhou-progress-sheet-green.png");
const tempDir = join(root, "tmp/layered-office");

mkdirSync(characterDir, { recursive: true });
mkdirSync(tempDir, { recursive: true });

const baseSize = ["1672x941"];
const characterMask = join(tempDir, "character-mask.png");
const foregroundMask = join(tempDir, "foreground-mask.png");

execFileSync(
  "magick",
  [
    "-size",
    ...baseSize,
    "xc:black",
    "-fill",
    "white",
    "-draw",
    [
      "ellipse 835,225 130,126 0,360",
      "polygon 680,335 1048,312 1138,544 1032,762 730,736 610,548",
      "polygon 620,315 750,235 790,520 650,672 548,552",
      "polygon 725,640 1050,622 1082,812 700,812",
      "polygon 705,120 912,75 990,250 735,290"
    ].join(" "),
    "-blur",
    "0x2",
    characterMask
  ],
  { stdio: "inherit" }
);

execFileSync(
  "magick",
  [
    "-size",
    ...baseSize,
    "xc:black",
    "-fill",
    "white",
    "-draw",
    [
      "polygon 329,392 775,392 801,688 325,671",
      "polygon 0,615 982,613 982,941 0,941",
      "ellipse 852,667 72,54 0,360",
      "polygon 948,506 1235,510 1264,770 926,760",
      "polygon 517,704 982,704 1014,921 455,928"
    ].join(" "),
    "-blur",
    "0x1.5",
    foregroundMask
  ],
  { stdio: "inherit" }
);

execFileSync(
  "magick",
  [
    source,
    characterMask,
    "-alpha",
    "off",
    "-compose",
    "CopyOpacity",
    "-composite",
    "-compose",
    "over",
    join(tempDir, "character-cutout.png")
  ],
  { stdio: "inherit" }
);

execFileSync(
  "magick",
  [
    source,
    foregroundMask,
    "-alpha",
    "off",
    "-compose",
    "CopyOpacity",
    "-composite",
    "-compose",
    "over",
    join(outDir, "office-foreground-occluders.png")
  ],
  { stdio: "inherit" }
);

const transparentCharacterSheet = join(tempDir, "zhou-progress-sheet-transparent.png");
execFileSync(
  "magick",
  [
    generatedCharacterSheet,
    "-alpha",
    "set",
    "-fuzz",
    "30%",
    "-transparent",
    "#00ff00",
    "-channel",
    "A",
    "-morphology",
    "Erode",
    "Disk:1",
    "-blur",
    "0x0.35",
    "+channel",
    transparentCharacterSheet
  ],
  { stdio: "inherit" }
);

const states = [
  {
    id: "progress-0",
    crop: "362x724+0+0",
    modulate: "92,92,100",
    frames: [
      { y: 0, x: 0, rotate: -0.25, scale: 100 },
      { y: 3, x: -1, rotate: -0.4, scale: 100 },
      { y: 5, x: -1, rotate: -0.5, scale: 100 },
      { y: 2, x: 0, rotate: -0.3, scale: 100 }
    ]
  },
  {
    id: "progress-1",
    crop: "338x724+386+0",
    modulate: "95,92,101",
    frames: [
      { y: 0, x: 0, rotate: -0.05, scale: 100 },
      { y: -2, x: 0, rotate: 0.12, scale: 100.2 },
      { y: -4, x: 1, rotate: 0.22, scale: 100.3 },
      { y: -1, x: 0, rotate: 0.05, scale: 100.1 }
    ]
  },
  {
    id: "progress-2",
    crop: "362x724+724+0",
    modulate: "98,94,102",
    frames: [
      { y: 0, x: 0, rotate: 0, scale: 100 },
      { y: -3, x: 1, rotate: 0.18, scale: 100.4 },
      { y: -5, x: 1, rotate: 0.28, scale: 100.6 },
      { y: -2, x: 0, rotate: 0.1, scale: 100.2 }
    ]
  },
  {
    id: "progress-3",
    crop: "338x724+1110+0",
    modulate: "101,96,103",
    frames: [
      { y: 0, x: 0, rotate: 0.02, scale: 100.2 },
      { y: -4, x: 1, rotate: 0.16, scale: 100.5 },
      { y: -6, x: 1, rotate: 0.24, scale: 100.7 },
      { y: -2, x: 0, rotate: 0.08, scale: 100.3 }
    ]
  },
  {
    id: "progress-4",
    crop: "338x724+1472+0",
    modulate: "105,98,104",
    frames: [
      { y: 0, x: 0, rotate: 0.04, scale: 100.4 },
      { y: -5, x: 1, rotate: 0.22, scale: 100.8 },
      { y: -7, x: 2, rotate: 0.3, scale: 101 },
      { y: -3, x: 1, rotate: 0.12, scale: 100.5 }
    ]
  },
  {
    id: "progress-5",
    crop: "362x724+1810+0",
    modulate: "108,100,104",
    frames: [
      { y: 0, x: 0, rotate: 0.05, scale: 100.5 },
      { y: -6, x: 1, rotate: 0.25, scale: 101 },
      { y: -8, x: 2, rotate: 0.35, scale: 101.2 },
      { y: -3, x: 1, rotate: 0.12, scale: 100.7 }
    ]
  }
];

for (const state of states) {
  const croppedCharacter = join(tempDir, `character-${state.id}.png`);
  execFileSync(
    "magick",
    [
      transparentCharacterSheet,
      "-crop",
      state.crop,
      "+repage",
      "-trim",
      "+repage",
      "-resize",
      "620x700>",
      "-background",
      "none",
      "-gravity",
      "center",
      "-extent",
      "720x820",
      croppedCharacter
    ],
    { stdio: "inherit" }
  );

  const framePaths = state.frames.map((frame, index) => {
    const framed = join(tempDir, `${state.id}-${index}.png`);
    execFileSync(
      "magick",
      [
        "-size",
        "720x820",
        "xc:none",
        croppedCharacter,
        "-modulate",
        state.modulate,
        "-background",
        "none",
        "-virtual-pixel",
        "transparent",
        "-distort",
        "SRT",
        `${frame.scale / 100} ${frame.rotate}`,
        "-gravity",
        "center",
        "-extent",
        "720x820",
        "-geometry",
        `${frame.x >= 0 ? "+" : ""}${frame.x}${frame.y >= 0 ? "+" : ""}${frame.y}`,
        "-compose",
        "over",
        "-composite",
        framed
      ],
      { stdio: "inherit" }
    );
    return framed;
  });
  execFileSync("cp", [framePaths[0], join(characterDir, `zhou-${state.id}.png`)], { stdio: "inherit" });
  execFileSync("magick", [...framePaths, "+append", "-depth", "8", join(characterDir, `zhou-${state.id}-sheet.png`)], { stdio: "inherit" });
}

rmSync(tempDir, { recursive: true, force: true });
