# Repository Guidelines

## Project Structure & Module Organization

This repository is a Vite + TypeScript browser game. Runtime code lives in `src/`: `src/main.ts` wires the app, `src/core/` holds shared config, state, and types, `src/features/` contains view renderers, and `src/platform/` contains web, WeChat, and Douyin adapters. Global styling is in `src/styles.css`.

Static visual assets are served from `public/assets/`, grouped by level or machine. Tests live in `test/`. Product notes and implementation context are in `PRODUCT_BLUEPRINT.md`, `IMPLEMENTATION.md`, and `TASK_STATE.md`.

## Build, Test, and Development Commands

- `npm install`: install dependencies from `package-lock.json`.
- `npm run dev`: start the Vite dev server on `0.0.0.0`.
- `npm run build`: run TypeScript checks and build production assets.
- `npm test`: run Node-based config validation tests.
- `npm run test:e2e`: run the Playwright level playtest.
- `npm run preview`: serve the production build locally.

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
