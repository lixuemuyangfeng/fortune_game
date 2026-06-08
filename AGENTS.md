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
- No "click all text" levels. A level fails review if the fastest strategy is to click every visible text block, poster, note, screen, or label. Text may support a clue, but the evidence must be carried by a concrete object, object state, or object relationship.
- Clue difficulty must come from context, not illegibility. A clue object/interface must be visually recognizable at game size, while its evidence meaning should require scene reasoning. Do not make a clue "hard" by shrinking it until it cannot be identified.
- Good clue hiding means "clear object, delayed meaning". The player should be able to see a phone, key, receipt, ticket, cup, charger, calendar, course timer, envelope, or screen clearly, but need to infer why it matters from placement, adjacency, body language, or contradiction with nearby decoys.
- Digital behavior must stay on digital or clearly drafted surfaces. Group invites, pinned comments, comment threads, unsent replies, and similar UI states should appear on plausible phones/tablets/laptops or explicit draft notebooks, not as unexplained paper cards.
- Do not overload one object with multiple true clues. A single phone, laptop, paper, or sign may carry one strong clue unless the visual clearly separates independent sub-interfaces; otherwise split the evidence across different objects.
- Use same-category decoys, not random clutter. Later levels should hide clues among plausible neighbors: ordinary receipts near a debt notice, normal tabs near a suspicious bookmark, harmless notifications near a group invite, spare keys near a repayment envelope, and ordinary notes near a real draft.
- Make clue form varied and semantically matched. Do not solve a level by making every clue a paper slip or generic screen card. Each clue's visible form must match its meaning: a repayment clue can use keys/envelopes/bills, a course deadline can use a timer/calendar/laptop, a group invite should read as a real chat invite, and a comment clue should read as an actual comment interface.
- Difficulty must increase across levels. Later levels need more clues, tighter but fairer hotspots, stronger same-category decoy clusters, and more evidence hidden in relationships or subparts. Do not reduce difficulty by placing every clue as an isolated readable object on an empty surface.
- Hotspots must be calibrated from the final raster. Record source-pixel centers, convert to runtime percentages, verify with Playwright screenshots, and update the calibration doc whenever art changes. Do not keep nudging coordinates without source-pixel records.
- Hotspot centers must land on the meaningful visual center of the clue or sub-clue, not on a nearby empty area, found marker, text block, or oversized bounding box. If the generated image cannot give precise anchors, freeze the raster, measure manually from source pixels, and store those measurements before changing config.
- No patchwork character state. Character recovery must come from real character state assets, sprite sheets, full-body/head-shoulder overlays, lighting, or scene state changes. Do not draw ghost bodies, face parts, water cups, blush, eyes, mouths, or transparent avatars over raster characters.
- Phaser migration is not game-feel by itself. Do not describe a level as a game-like slice if the main character remains a static background figure. A shippable level needs progress-linked character states with visible expression or body-language changes from real assets.
- Every clue must move the character state forward. For a level with `N` clues, prepare at least `N + 1` protagonist/proxy-character states, from `progress-0` through `progress-N`. Each newly found clue must visibly change expression, posture, or body language, not only text, lighting, score, or machine state.
- Hash-distinct state files are not character states. A `progress-0` image must show readable protagonist emotion or body language at runtime size, and progress images must be visually different without zooming. If the protagonist still reads blank, static, or identical after a clue, reject the asset and regenerate or redraw a real full-body/head-shoulder state.
- Characters must be independent scene units. Do not animate a rectangular crop of a background that contains desks, coworkers, windows, or other baked-in scenery. Use a clean background, transparent character sprite/spritesheet, and foreground occluder layer when the character needs to sit behind desks or screens.
- No effect bigger than the clue unless the clue itself is large. Click feedback must stay inside or immediately around the clicked object and must be visually quieter than the object.
- No generic web-dashboard UI inside the level. Keep first-level UI as a game scene with a compact mission panel, evidence board, and completion ritual; do not introduce resource cards, step dashboards, rankings, facility upgrades, or SaaS-style metrics.
- Visual QA is mandatory after frontend or game-scene changes. Run the relevant Playwright flow, inspect screenshots manually, and reject the change if it introduces unexplained overlays, unreadable text, occlusion, or a visual that feels like a placeholder.
- Image review is a production gate, not a note. Before accepting or shipping any generated or edited level image, run the loop in `docs/image-review-optimize-loop.md`, fill the review artifact with actual pass/fail observations, inspect desktop and mobile Playwright screenshots, and keep iterating until all low-level issues are gone.
- Semantic validation is a required hook. Before handing off clue or level-copy changes, run `npm run semantic:check` or `npm test`; the validator in `scripts/validate-level-semantics.mjs` must pass, and any warning about same-object overuse must be reviewed against the level theme.

## Level Image Production Constitution

These rules exist because earlier level production repeatedly failed in predictable ways: theme drift, oversized or pasted characters, clues that only worked as text explanations, same-looking paper clues, empty playable areas, off-center hotspots, and "fixed" screenshots that did not visibly change. Treat this section as a required workflow for every new or revised level.

- Start with a written level brief before generating art. The brief must define theme, scene logic, camera, density, character plan, clue list, decoy plan, interaction plan, and UI copy direction.
- Lock composition before polishing. If the playable area is mostly skyline, empty floor, blank wall, or decorative background, regenerate or structurally edit the image before adding details.
- Put people where their behavior makes sense. Rooftop characters can brag, smoke, drink, check phones, or gossip; home scenes can show late-night scrolling, bills, courses, chores, or fatigue; shop scenes can show buying, selling, queueing, counting, or displaying goods. Do not put office-work poses into a location where that behavior is absurd.
- Keep character scale, grounding, posture, and contact shadows consistent with the scene. A protagonist must not float, stand on pipes, clip through props, appear as a toy, or use a posture that contradicts the story beat.
- Hide information through believable props and relationships. Prefer "key on repayment envelope", "timer beside course laptop", "thumb covering principal on a phone", "ordinary receipts surrounding one debt notice", "similar bookmarks around one suspicious tab", or "many lottery tickets with one pattern break" over explicit labels.
- Add decoys at generation time. Decoys must be visually plausible and same-category, not decorative noise added after the clue list is finished.
- Avoid clue concentration. Do not place several true clues on one phone, one laptop, one paper pile, or one screen unless the sub-interfaces are visually separated and each has its own precise hotspot. If the object cannot support that separation at runtime size, split the evidence across multiple scene objects.
- Use text sparingly and diegetically. Visible words should look like real labels, receipts, notes, chat UI, posters, forms, or screen content inside the world. Do not use floating numbers, red boxes, answer labels, or UI-looking explanation cards inside the scene raster.
- Calibrate only after the final raster is frozen. Any change to crop, scale, object placement, or generated art invalidates previous hotspot measurements.
- Review the rendered game, not only the raw image. A raw generated image can look acceptable while failing inside the game shell because the side panel, crop, mobile layout, found markers, animation, or hit target shifts the actual experience.
- Do not claim a level is done while known visual defects remain. If a state asset is mechanically derived, a character state is not truly expressive, a clue is semantically weak, or a hotspot was eyeballed instead of measured, record that as a risk and keep it out of "final production asset" language.

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
