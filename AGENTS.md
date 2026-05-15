# Repository Guidelines

## Project Structure & Module Organization

This repository is a Vite + TypeScript browser game. Runtime code lives in `src/`: `src/main.ts` wires the app, `src/core/` holds shared config, state, and types, `src/features/` contains view renderers, and `src/platform/` contains web, WeChat, and Douyin adapters. Global styling is in `src/styles.css`.

Static visual assets are served from `public/assets/`, grouped by level or machine. Tests live in `test/`. Product notes and implementation context are in `PRODUCT_BLUEPRINT.md`, `IMPLEMENTATION.md`, and `TASK_STATE.md`.

Before changing level art, clue layout, or investigation UI, read `docs/art-direction.md`. For the Phaser 3 migration, also read `docs/phaser3-requirements-spec.md`; it is the source of truth for engine choice, UI requirements, asset layering, interaction feedback, platform bridge scope, and delivery checks.

## Product Iron Rules

These rules are stricter than ordinary implementation preferences. Any gameplay, level-art, clue, animation, or UI change must satisfy them before handoff.

- No fake narrative feedback. Do not write a line such as "drink water", "relax", "machine repaired", or similar unless the scene actually shows that action through proper art, animation, or a clearly visible state change.
- No placeholder geometry in the game scene. Do not cover raster art with translucent circles, rectangles, white bars, yellow bars, or generic overlays unless they are deliberately styled as in-world objects such as paper, stamps, screens, light cones, or machine UI.
- No detached labels. Text feedback must point to and make sense for the exact object just clicked. If the clicked clue is a boss chat, the feedback must read as chat/work-pressure feedback, not a generic moral judgment or unrelated stamp.
- No hover or found-state spoilers. Default and hover states must not expose answers. Found markers must be small, local, and must not cover neighboring clues or the main character.
- No "design by explanation". If a visual only makes sense after explaining it in text, remove it or replace it with a clearer in-world visual.
- No patchwork character state. Character recovery must come from real character state assets, sprite sheets, full-body/head-shoulder overlays, lighting, or scene state changes. Do not draw ghost bodies, face parts, water cups, blush, eyes, mouths, or transparent avatars over raster characters.
- Phaser migration is not game-feel by itself. Do not describe a level as a game-like slice if the main character remains a static background figure. A shippable level needs progress-linked character states with visible expression or body-language changes from real assets.
- Every clue must move the character state forward. For a level with `N` clues, prepare at least `N + 1` protagonist/proxy-character states, from `progress-0` through `progress-N`. Each newly found clue must visibly change expression, posture, or body language, not only text, lighting, score, or machine state.
- Characters must be independent scene units. Do not animate a rectangular crop of a background that contains desks, coworkers, windows, or other baked-in scenery. Use a clean background, transparent character sprite/spritesheet, and foreground occluder layer when the character needs to sit behind desks or screens.
- No effect bigger than the clue unless the clue itself is large. Click feedback must stay inside or immediately around the clicked object and must be visually quieter than the object.
- No generic web-dashboard UI inside the level. Keep first-level UI as a game scene with a compact mission panel, evidence board, and completion ritual; do not introduce resource cards, step dashboards, rankings, facility upgrades, or SaaS-style metrics.
- Visual QA is mandatory after frontend or game-scene changes. Run the relevant Playwright flow, inspect screenshots manually, and reject the change if it introduces unexplained overlays, unreadable text, occlusion, or a visual that feels like a placeholder.

## Build, Test, and Development Commands

- `npm install`: install dependencies from `package-lock.json`.
- `npm run dev`: start the Vite dev server on `0.0.0.0`.
- `npm run build`: run TypeScript checks and build production assets.
- `npm test`: run Node-based config validation tests.
- `npm run test:e2e`: run the Playwright level playtest.
- `npm run preview`: serve the production build locally.
- `npm run ship -- "message"`: verify, commit code and assets, rebase/autostash if needed, and push the current branch.

## Coding Style & Naming Conventions

Use TypeScript ES modules with explicit imports and exported types where they clarify module boundaries. Match the existing two-space indentation style and keep object literals readable with trailing commas only where already used by the surrounding code. Use `camelCase` for variables and functions, `PascalCase` for classes such as platform adapters, and descriptive file names like `investigationView.ts` or `wechatAdapter.ts`.

Keep feature UI code in `src/features/`, shared mechanics in `src/core/`, and platform-specific behavior behind `src/platform/adapter.ts`.

## Testing Guidelines

The config validation suite uses `node:test` and `node:assert` in `test/config-validation.test.mjs`. Add or update these tests when changing level configuration, evidence IDs, hotspot metadata, or asset paths. Playwright coverage lives in `test/level-playtest.spec.mjs`; update it for user-facing flow changes.

Run `npm test` for config/content changes and `npm run test:e2e` when navigation, rendering, or gameplay interactions change. Run `npm run build` before handing off substantial TypeScript changes.

## Commit & Pull Request Guidelines

Recent history uses short imperative commit messages such as `Upload src/styles.css`. Prefer clearer scoped messages when possible, for example `Add temple level hotspot validation` or `Fix Douyin adapter login event`.

Pull requests should include a concise summary, the commands run, and any visible UI changes. Include screenshots or recordings for layout, asset, or gameplay changes. Link related issues or design notes when the change implements documented work from `docs/superpowers/`.

## Security & Configuration Tips

Do not commit local secrets or platform credentials. Keep browser storage keys versioned in code when state shape changes, and keep public asset references under `/assets/...` so Vite serves them from `public/assets/`.
