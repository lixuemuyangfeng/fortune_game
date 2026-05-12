# Level Completion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Finish the office, moments, and temple levels as a polished playable three-level prototype.

**Architecture:** Keep the current config-driven TypeScript structure. Add dependency-free config validation, expand scene metadata/assets, then improve renderer and CSS only where needed for level clarity.

**Tech Stack:** Vite, TypeScript, DOM-rendered HTML/CSS, Node built-in test runner.

---

## File Structure

- `test/config-validation.test.mjs`: Node test file that checks scene configuration and referenced public assets.
- `package.json`: add `npm test` script.
- `src/core/config.ts`: expand moments and temple level content and add missing metadata.
- `src/features/investigationView.ts`: render reusable character and scene-specific narrative layers.
- `src/styles.css`: add scene-specific styling for moments and temple, refine responsive playfield readability.
- `TASK_STATE.md`: keep the milestone and verification state current.

## Tasks

### Task 1: Add Configuration Validation

- [ ] Create `test/config-validation.test.mjs` that imports `src/core/config.ts` through a small text parser and validates scenes, evidence references, and asset paths.
- [ ] Add `"test": "node --test test/config-validation.test.mjs"` to `package.json`.
- [ ] Run `npm test` and confirm it fails because moments and temple currently have fewer than five asset-backed hotspots and missing machine metadata.

### Task 2: Complete Level Content

- [ ] Update `src/core/config.ts` so moments and temple have at least five hotspots each.
- [ ] Add background images, machine names/images, completion text, intro hints, pollution-source copy, object images, hit coordinates, and reveal text.
- [ ] Add any missing evidence entries needed for the new hotspots.
- [ ] Run `npm test` and confirm the configuration checks pass.

### Task 3: Improve Scene Rendering

- [ ] Update `src/features/investigationView.ts` to render scene characters if configured.
- [ ] Keep hotspots inactive until the challenge starts.
- [ ] Keep found object, log, machine output, hint, and completion states consistent across all scenes.
- [ ] Run `npm test` and `npm run build`.

### Task 4: Polish Visual Presentation

- [ ] Update `src/styles.css` with scene-specific visual treatments for moments and temple.
- [ ] Ensure mobile layout keeps stage controls, playfield, and action buttons readable.
- [ ] Avoid blocking hotspots with narrative overlays during search.
- [ ] Run `npm run build`.

### Task 5: Browser Playtest And Iteration

- [ ] Start the Vite dev server.
- [ ] Use browser/playtest workflow to reset, complete office, moments, and temple.
- [ ] Capture desktop and mobile screenshots.
- [ ] Fix any observed click-target, overlap, readability, or pacing issues.
- [ ] Re-run `npm test` and `npm run build`.

## Self-Review

This plan covers the design spec requirements: content completion, clear interaction states, visual distinction, mobile readability, and verification. It intentionally does not include server APIs, real ad SDK work, or engine migration.
