# Task State

## Current Goal

Upgrade `fortune-game` from a rough Vite/TypeScript prototype into a playable black-humor game slice with clear clue interaction, coherent art direction, and backend-ready logic for level progress, friend leaderboard, and ad placement.

## Scope And Constraints

- Continue from the existing dirty worktree; do not revert user or prior-session changes.
- Keep the current Vite + TypeScript DOM prototype for now.
- First fix interaction clarity before replacing all art assets.
- Use raster PNG/WebP art direction for future formal assets; do not keep mixing SVG stickers with raster backgrounds.
- Keep first level focused on office/workplace noise; do not turn it into a cross-level asset sampler.

## Completed

- Replaced `AGENTS.md` with a concise repository contributor guide.
- Added `docs/art-direction.md` with visual production rules, clue clarity rules, interaction animation principles, and level theme boundaries.
- Added `docs/level-campaign.md` with the refined 7-level story arc.
- Updated `PRODUCT_BLUEPRINT.md` to reference the new campaign and art-direction docs.
- Saved the current approved visual-direction sample at `docs/art-samples/office-clarity-sample.png`.
- Improved hotspot rendering in `src/features/investigationView.ts` with explicit hidden, hinted, selected, found, and just-found states.
- Improved `src/styles.css` with clearer hover/focus/hint/selected feedback and K-line heartbeat-style overlay animation for market clues.
- Added `src/core/backend.ts` as a local backend abstraction for level progress snapshots, friend leaderboard data, and ad placement decisions.
- Added ad view accounting in `src/core/state.ts`.
- Wired `src/main.ts` to use the local backend for hint and sort-double ad checks, plus a simulated friend leaderboard.
- Implemented the first pass of click-after-hit feedback from `docs/click-animation-plan.md`: per-clue local effects, found check markers, and embedded machine pulse.

## Current First-Level Status

The first level now has a playable raster-background iteration, but still needs user visual approval before treating it as final.

- Done: current office level can be started, clicked through, completed, and tested end-to-end.
- Done: selected clue, hint, found state, and K-line animation feedback are in place.
- Done: first level now uses `public/assets/office-level/office-raster-v2.png` as its playable background.
- Done: first level no longer overlays the old office SVG clue assets.
- Done: first level config now matches the campaign boundary: `亏损曲线`, `owner 意识消息`, `金价手机`, `花呗便利贴`, `刮刮泪`.
- Done: `AI直播` has been removed from level 1 and remains available for later AI-focused content.
- Done: hidden hotspots no longer reveal visible boxes on mouse hover; only explicit hint/found states show markers.
- Done: scene framing is locked to 16:9 for the office raster image to avoid coordinate drift.
- Done: widened and lowered the `金价手机` hotspot after user feedback so clicks on the visible phone body trigger correctly.
- Done: first level hotspots now have explicit click animation kinds: K-line pulse, chat stamp, gold line scan, paper bounce, and scratch sheen.
- Done: redesigned the left-side investigation panel into a story-first layout with scene time/place, current task, progress rail, status strip, and evidence bag.
- Done: simplified the investigation panel again after user feedback: removed duplicate theme/room labels, removed left-side pollution/status text, made place/time prominent, turned the task block into a mission meter, and changed found clues into a pin-board style evidence stash.
- Done: moved Zhou Qiming's state feedback from left-side text to the right scene image as a small expression overlay on the office character.
- Done: refined the same-row visual language after user feedback: place/time now share one tag style, English `MISSION/CLEAR` labels were replaced, and the five square slots became a slimmer recovery meter.
- Done: installed the requested `canvas-design` skill into `/Users/df_sla/.codex/skills/canvas-design`.
- Done: applied the frontend-design review pass: replaced the scene dropdown with case-file buttons, made evidence notes visually varied, upgraded the task meter into machine indicator lights, and folded the lower processing systems behind a completion dock.
- Done: refined the completion page after frontend-design review: removed the numbered evidence slots, kept the post-clear page focused on the scene, evidence board, next-level button, and sealed-evidence dock.
- Done: connected first-level collection progress back into the office scene itself with non-text character feedback: Zhou Qiming's face area now shifts from sighing/low-energy to a subtle recovery glow and spark when all five clues are found.
- Done: added `scripts/commit-push.sh` and `npm run ship` for repeatable local verification, commit, rebase/autostash, SSH remote setup, and push.
- Done: recorded the current UI aesthetic, clue clarity, completion-state, mobile, and interaction feedback rules in `docs/art-direction.md`; `AGENTS.md` now points future contributors there before changing UI or assets.
- Not done: final user approval on the new level-1 raster art and hotspot positions.

## Next Steps

- Review level 1 in browser with the user and tune art/hotspot positions based on concrete feedback.
- Decide whether `office-raster-v2.png` is acceptable as the first playable raster background or needs another image generation pass.
- If accepted, remove or archive unused old office SVG foreground assets later.
- Add tests for backend ad placement limits and level progress snapshots.
- Then implement real backend adapter boundaries for WeChat friend ranking and remote ad placement.

## Known Blockers

- No technical blocker.
- Product/design decision needed: approve or reject `office-raster-v2.png` as first-level visual direction.

## Latest Verification

- `npm run build` passed on 2026-05-12.
- `npm test` passed on 2026-05-12.
- `npm run test:e2e` passed on 2026-05-12 after installing Playwright Chromium locally.
- After wiring `office-raster-v1.png`, `npm run build`, `npm test`, and `npm run test:e2e` passed again on 2026-05-12.
- After replacing it with `office-raster-v2.png` and removing hover-reveal boxes, `npm run build`, `npm test`, and `npm run test:e2e` passed again on 2026-05-12.
- After retuning the `金价手机` hotspot, `npm test` and `npm run build` passed again on 2026-05-12.
- After implementing click-after-hit animations, `npm test`, `npm run build`, and `npm run test:e2e` passed on 2026-05-13.
- After redesigning the left-side investigation panel, `npm test`, `npm run build`, and `npm run test:e2e` passed on 2026-05-13.
- After the second left-panel simplification, `npm test`, `npm run build`, and `npm run test:e2e` passed on 2026-05-13.
- After the task-card language and meter refinement, `npm test`, `npm run build`, and `npm run test:e2e` passed on 2026-05-13.
- After the frontend-design implementation pass, `npm test`, `npm run build`, and `npm run test:e2e` passed on 2026-05-13.
- After the character-progress, intro-card, and ship-script refinements, `npm test`, `npm run build`, and `npm run test:e2e` passed on 2026-05-13.
