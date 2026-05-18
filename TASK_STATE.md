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
- Added `src/core/backend.ts` as a local backend abstraction for level progress snapshots and hint-ad placement decisions.
- Added ad view accounting in `src/core/state.ts`.
- Wired `src/main.ts` to use the local backend for hint ad checks.
- Implemented the first pass of click-after-hit feedback from `docs/click-animation-plan.md`: per-clue local effects, found check markers, and embedded machine pulse.

## Current First-Level Status

The first level now has a playable raster-background iteration, but still needs user visual approval before treating it as final.

- Done: current office level can be started, clicked through, completed, and tested end-to-end.
- Done: the Phaser office scene now has an independent foreground Zhou Qiming character object with `progress-0` through `progress-5` raster spritesheet states, plus progress-driven body motion and hit reactions.
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
- Done: connected first-level collection progress back into the office scene itself with non-text character feedback, then removed the face-drawing overlay after review because CSS-painted facial features looked like patchwork on the raster image.
- Done: added `scripts/commit-push.sh` and `npm run ship` for repeatable local verification, commit, rebase/autostash, SSH remote setup, and push.
- Done: recorded the current UI aesthetic, clue clarity, completion-state, mobile, and interaction feedback rules in `docs/art-direction.md`; `AGENTS.md` now points future contributors there before changing UI or assets.
- Done: removed the post-clear processing line/resource cards/leaderboard from the first-level completion flow; completion now stops at evidence bag + next-level entry.
- Done: removed the first-level post-clear face expression overlay. Future visible expression changes must use a proper completed raster/person layer/sprite asset instead of CSS-drawn eyes or mouths.
- Done: on `phaser3-requirements-spec`, removed unused DOM-prototype sorting/resource/facility/personality/leaderboard code so the branch only keeps the active clue-finding flow, level progress state, and hint-ad mock.
- Done: documented that Phaser migration alone is not game-feel; visible character expression/body-language changes from real assets are now a blocking requirement for calling the first level a game slice.
- Done: replaced the baked-in center character with `public/assets/game/office/office-background-clean.png`, `office-foreground-occluders.png`, and independent Zhou Qiming spritesheets generated by `tools/generate-office-layered-assets.mjs`.
- Done: removed the old DOM/CSS-built character fallback so project runtime no longer keeps a path for patchwork character overlays.
- Done: expanded Zhou Qiming from 3 broad states to 6 progress states so every newly found clue swaps to a visibly different expression/body-language sprite.
- Done: abstracted this round's character/game-feel lessons into `AGENTS.md`, `docs/phaser3-requirements-spec.md`, and `docs/art-direction.md`, including cross-level `N + 1` character states, independent character layering, no background-crop animation, and screenshot QA requirements.
- Not done: final user approval on the new level-1 raster art and hotspot positions.

## Current Second-Level Status

The second level is now wired as a playable Phaser flow and has received a first art-repair pass. It is playable and visually cleaner than the rejected sticker pass, but still should be treated as interim generated art until final production assets are approved.

- Done: added the real campaign second level `黄金大师天台局` after the office level.
- Done: first-level completion now enters the rooftop level instead of a placeholder.
- Done: added second-level gameplay config, evidence entries, local state switching, Phaser scene loading, hotspot access buttons, click feedback, audio profiles, and Playwright coverage.
- Done: added generated rooftop background, five clue assets, a cooling-furnace asset, and `progress-0` through `progress-5` trader spritesheets.
- Done: replaced the first temporary flat clue/machine assets with heavier shaded PNG assets from `scripts/generate-rooftop-assets.mjs`.
- Done: removed always-on floating clue tweens; clue objects now stay physically placed and only animate through local hit feedback.
- Done: added local contact shadows for all five rooftop clues and the cooling furnace.
- Done: retuned second-level hotspot positions so the group-chat clue no longer overlaps the character head.
- Done: rebuilt the trader spritesheets with stronger progress-linked posture changes, gradient shading, and an attached neck/body silhouette so the character reads as one scene unit.
- Not done: final second-level art acceptance.
- Remaining QA risk: the rooftop background is still more realistic than the script-generated character and foreground props. The pass reduces sticker/floating issues, but final acceptance likely still needs coherent rendered PNG/WebP assets.
- Remaining QA risk: the proxy character now has six readable states and a connected body, but it is still stylized temporary art rather than final production character art.
- Remaining QA risk: the news/screen/sign props still contain abstract in-world marks. They are no longer answer-label cards, but final art should make them look more naturally printed or displayed.

Second-level optimization plan:

- Replace current temporary foreground assets with coherent semi-realistic/clay-render PNG/WebP assets that match the rooftop camera angle, light, saturation, and material.
- Rebuild the proxy character as a proper transparent scene unit or spritesheet in the same rendered style, preserving the `progress-0` through `progress-5` contract but improving expression, posture, and body-language readability.
- Rebuild the five clues as physical rooftop props: receipt on the floor/parapet, phone in hand or on ground, group chat as an actual phone screen, quick-news screenshot as a paper/phone prop, and warning sign attached to the rooftop door or railing.
- Rebuild the cooling furnace as an in-world machine with feet, shadow, depth, and a clear connection to the rooftop floor.
- Add or generate foreground occluder/contact-shadow layers where props or the character need to sit behind parapets, railings, or rooftop equipment.
- Retune hotspot coordinates after the new assets land, then rerun screenshot QA for `progress-0` through `progress-5`, completion, and mobile.

## Next Steps

- Review the new 6-state layered character screenshots with the user and tune final art direction if the generated character style is not accepted.
- If the generated raster character direction is accepted, replace the script-generated placeholder art with final production art while keeping the same spritesheet contract.
- Add tests for backend ad placement limits and level progress snapshots.
- Then implement real backend adapter boundaries for WeChat friend ranking and remote ad placement.

## Known Blockers

- No technical blocker.
- Product/design decision needed: approve or reject the generated independent Zhou Qiming art style as the temporary first-level character direction.

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
- After removing the first-level post-clear systems and making the character completion expression visible, `npm test`, `npm run build`, and `npm run test:e2e` passed on 2026-05-14.
- After removing the CSS-drawn face overlay and documenting that real expression changes require proper art assets, `npm test`, `npm run build`, and `npm run test:e2e` passed on 2026-05-14.
- After cleaning unused sorting/resource/facility/personality/leaderboard prototype code on `phaser3-requirements-spec`, `npm test`, `npm run build`, and `npm run test:e2e` passed on 2026-05-14.
- After replacing the baked-in character with layered Phaser character sprites, `npm test`, `npm run build`, and `npm run test:e2e` passed on 2026-05-15; Playwright screenshots were captured at `artifacts/layered-final-idle.png`, `artifacts/layered-final-recovering.png`, and `artifacts/layered-final-complete.png`.
- After expanding Zhou Qiming to 6 per-clue progress expressions, `npm test`, `npm run build`, and `npm run test:e2e` passed on 2026-05-15; Playwright screenshots were captured at `artifacts/progress-expression-scale-0.png` through `artifacts/progress-expression-scale-5.png`.
- After documenting the cross-level game-feel rules and adding validation coverage, `npm test` and `npm run build` passed on 2026-05-15.
- After adding the playable second-level rooftop loop, `npm test`, `npm run build`, and `npm run test:e2e` passed on 2026-05-15; Playwright screenshots were captured at `artifacts/rooftop-progress-0.png` through `artifacts/rooftop-progress-5.png` and `artifacts/rooftop-mobile-complete.png`.
- After the second-level art-repair pass, `npm test`, `npm run build`, and `npm run test:e2e` passed on 2026-05-18; Playwright screenshots were captured at `artifacts/rooftop-v4-progress-0.png`, `artifacts/rooftop-v3-progress-3.png`, `artifacts/rooftop-v3-progress-5.png`, and `artifacts/rooftop-v2-mobile-complete.png`.
