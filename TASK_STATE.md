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

The second level is now wired as a playable Phaser flow and has been rebuilt with final-direction bitmap assets instead of the previous script-generated placeholder art.

- Done: added the real campaign second level `黄金大师天台局` after the office level.
- Done: first-level completion now enters the rooftop level instead of a placeholder.
- Done: added second-level gameplay config, evidence entries, local state switching, Phaser scene loading, hotspot access buttons, click feedback, audio profiles, and Playwright coverage.
- Done: replaced the old rooftop background with a clean 16:9 semi-realistic 3D/clay-render bitmap background plate.
- Done: replaced all second-level foreground clue, machine, and character assets with unified bitmap assets generated from the same art direction.
- Done: increased the second level to 6 clues, so it now escalates after the 5-clue office level.
- Done: preserved the `progress-0` through `progress-6` trader spritesheet contract with seven distinct body-language/expression states.
- Done: replaced the rounded toy-like trader with an adult human-proportioned rooftop character.
- Done: moved the trader back onto the rooftop floor with a smaller scale and local contact shadow so he no longer reads as floating on the front wall.
- Done: removed always-on floating clue tweens; clue objects now stay physically placed and only animate through local hit feedback.
- Done: added local contact shadows for all rooftop clues and the cooling furnace.
- Done: removed the old `scripts/generate-rooftop-assets.mjs` SVG generation path and obsolete SVG source directories so final assets are not overwritten by placeholder art.
- Done: saved the generated source plates under `public/assets/game/rooftop/source/`.
- Done: retuned second-level hotspot positions and object sizes against the final bitmap assets.
- Done: reworked the latest rooftop layout review findings: character scale/grounding was adjusted, the group-chat clue now uses the trader's hand-held phone as an embedded hotspot instead of an extra phone on the floor, found markers were reduced and removed from the completion scene, and the completion machine panel was shrunk so it no longer blocks the furnace.
- Done: second-level clue placement now escalates beyond the office by using 6 clues across multiple scene layers: wall sign, pipe-side contract, hand-held phone, machine-side news, floor receipt, and price alert.
- Done: rebuilt the second level against `docs/phaser3-requirements-spec.md` after identifying the structural mismatch with level 1. The rooftop now uses a unified generated background plate with embedded environmental clue objects instead of separate post-composited props scattered on the floor.
- Done: replaced the sparse rooftop plate with `public/assets/game/rooftop/rooftop-background-v3.png`, increasing foreground and mid-ground density with pipes, crates, tarp, cables, tools, utility cart, clipboard, AC unit, paper clutter, and machine props so the level has real places to hide clues.
- Done: replaced the dense-but-odd rooftop plate with `public/assets/game/rooftop/rooftop-background-v4.png`, adding several background adults to make the rooftop "gold discussion" scene socially coherent and correcting the oversized/standing phone problem.
- Done: repositioned the independent trader sprite back onto the central platform area so he no longer reads as sitting on the front parapet.
- Done: replaced the rooftop plate again with `public/assets/game/rooftop/rooftop-background-v5.png`, keeping coherent background adults while making phone clues human-scale and semantically tied to hands, clothes, toolbox, AC news, door receipt, warning sign, and pipe-contract locations.
- Done: raised the local hint placement daily limit from 5 to 12 so a 6-clue level can still reveal the final remaining clue.
- Done: changed the rooftop machine to an embedded scene object and removed the duplicate overlaid cooling-furnace sprite from runtime.
- Done: changed all six rooftop clues to embedded-scene hotspots. Phaser still owns hit zones, found markers, localized feedback, progress, and character state switching, but no longer renders mismatched clue sprites over the background.
- Done: replaced the rooftop plate with `public/assets/game/rooftop/rooftop-background-v6.png`, moving from a mostly open scenic roof to a tighter U-shaped rooftop discussion setup with multiple adults, table papers, hand-held phones, tool cart, wall sign, AC poster, hose-side contract, crates, cups, and foreground cover so clues sit in explainable places.
- Done: retuned the v6 embedded hotspots so the table receipt and left hand-held phone no longer overlap and the sixth clue remains accessible.
- Done: resized, darkened, and grounded the independent trader state sprite on the foreground ledge so it reads as a foreground character state rather than a tiny floating sticker.
- Done: strengthened the active hint marker with a local double outline and dot; Playwright verified the sixth hint lands on `杠杆合同边角` after the first five rooftop clues are found.
- Done: replaced the old seated rooftop trader spritesheets with standing full-body protagonist spritesheets generated on chroma key and converted into the existing `progress-0` through `progress-6` Phaser sheet contract.
- Done: changed the rooftop protagonist from a wall/ground seated pose to a grounded standing pose, retuned his scene scale, origin, shadow, and completion-state scale so the character reads closer to the background adults.
- Done: replaced the v6 rooftop plate with `public/assets/game/rooftop/rooftop-background-v7.png`, changing the background adults from work/inspection poses into a casual rooftop bragging session with phones, drinks, rumor sheets, snacks, receipts, and an ashtray.
- Done: replaced the standing-center protagonist with corner-smoking/cold-smirk protagonist states, moved him into the left corner, and retuned scale/shadows so he no longer occupies the center of the scene.
- Done: retuned v7 clue hotspots for the new composition and separated the right-side `金店小票` and `跌幅提醒手机` hit zones so Playwright can click each clue cleanly.
- QA finding resolved: the previous script-generated flat/sticker mismatch has been replaced by unified bitmap scene art.
- QA finding resolved: the quick-news clipping now sits on the rooftop floor instead of floating.
- QA finding resolved: green chroma-key fringe was removed from transparent character and prop assets.
- QA finding resolved: second-level clue count now increases from 5 to 6, with a new `杠杆合同边角` clue.
- QA finding resolved: the trader no longer uses toy/mascot proportions and no longer reads as a small floating sticker in the completed scene.
- QA finding resolved: the completion state no longer exposes all answers through large green check markers.
- QA finding resolved: not all rooftop clues are separate floor props; the group-chat clue is now embedded in the character's phone.
- QA finding resolved: the previous second-level composition used a clean background plus post-attached props, unlike the first level's integrated clue composition. The new pass matches the level-1 design logic more closely: scene art carries the clue bodies, Phaser carries interaction.
- QA finding resolved: the previous rooftop plate was still too scenic and empty, with too much floor and skyline. The v3 plate reduces skyline dominance and makes the investigation area the visual focus.
- QA finding resolved: phone clues no longer appear larger than people or standing upright as props; they now read as normal-scale hand/table objects.
- QA finding resolved: the rooftop scene no longer feels like one isolated person surrounded by props; background people now support the "天台局" premise.
- QA finding resolved: the sixth hint no longer gets blocked by the old 5-hint daily cap.
- QA finding resolved: the v5 pass still looked too similar from the player view. The v6 pass changes the actual composition and investigation density instead of only nudging clue positions.
- QA finding resolved: h1/h2 access hotspots no longer overlap, so label-based clicks hit the intended clue.
- QA finding resolved: the sixth hint waits for the rewarded-ad flow and then highlights the remaining contract clue visibly.
- QA finding resolved: the protagonist is no longer the old small seated cutout; Playwright screenshots `artifacts/rooftop-standing-progress-0.png` and `artifacts/rooftop-standing-progress-6.png` verify the replacement standing state in both start and completion states.
- QA finding resolved: the background adults no longer read as working on the rooftop; the v7 plate frames them as phone-checking, drinking, rumor-reading, and bragging.
- QA finding resolved: the protagonist is now in the left corner smoking/cold-smiling instead of standing in the center foreground; Playwright screenshots `artifacts/rooftop-v7-progress-0.png` and `artifacts/rooftop-v7-progress-6.png` verify start and completion states.
- Remaining QA risk: final user visual approval is still needed, but the runtime no longer relies on placeholder SVG/vector-generated rooftop assets.

Second-level optimization plan:

- Keep future level difficulty increasing by clue count, smaller object scale, and placement across different scene layers instead of dumping props on one floor band.
- If future rooftop art is rejected, iterate through the bitmap generation/editing pipeline, not through SVG placeholder scripts.

## Next Steps

- Keep later levels on the bitmap asset pipeline; do not restart SVG placeholder generation for production scenes.
- Apply the second-level lesson to later levels before coding them: each next level needs more deliberate clue hiding, scene-layer distribution, and per-clue character/proxy state progression.
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
- After replacing the second-level placeholder art with final-direction bitmap assets and removing the SVG generation path, `npm test`, `npm run build`, and `npm run test:e2e` passed on 2026-05-18; Playwright screenshots were captured at `artifacts/rooftop-final-pass2-progress-0.png`, `artifacts/rooftop-final-pass2-progress-3.png`, `artifacts/rooftop-final-pass2-progress-5.png`, and `artifacts/rooftop-final-pass2-mobile-complete.png`.
- After increasing the rooftop level to 6 clues and replacing the trader with an adult human-proportioned 7-state character, `npm test`, `npm run build`, and `npm run test:e2e` passed on 2026-05-18; Playwright screenshots were captured at `artifacts/rooftop-incremental-human-grounded-progress-0.png`, `artifacts/rooftop-incremental-human-grounded-progress-6.png`, and `artifacts/rooftop-incremental-human-grounded-mobile-complete.png`.
- After shrinking and embedding the second-level visible clue sprites into the rooftop scene, `npm test`, `npm run build`, and `npm run test:e2e` passed on 2026-05-18; Playwright screenshots were captured at `artifacts/rooftop-hidden-scale-progress-0.png`, `artifacts/rooftop-hidden-scale-progress-3.png`, `artifacts/rooftop-hidden-scale-progress-6.png`, `artifacts/rooftop-hidden-scale-mobile-progress-0.png`, and `artifacts/rooftop-hidden-scale-mobile-complete.png`.
- After the latest rooftop QA pass for character scale, clue layering, embedded group-chat hotspot, found-marker spoilers, and completion-panel occlusion, Playwright screenshots were captured at `artifacts/rooftop-layout-review-progress-0.png`, `artifacts/rooftop-layout-review-progress-3.png`, `artifacts/rooftop-layout-review-progress-6.png`, `artifacts/rooftop-layout-review-mobile-progress-0.png`, and `artifacts/rooftop-layout-review-mobile-complete.png`.
- After redesigning the second level per the Phaser 3 requirements spec, Playwright screenshots were captured at `artifacts/rooftop-redesign-progress-0.png`, `artifacts/rooftop-redesign-progress-3.png`, `artifacts/rooftop-redesign-progress-6.png`, `artifacts/rooftop-redesign-mobile-progress-0.png`, and `artifacts/rooftop-redesign-mobile-complete.png`.
- After increasing the second-level scene density and re-marking embedded hotspots, Playwright screenshots were captured at `artifacts/rooftop-density-progress-0.png`, `artifacts/rooftop-density-progress-3.png`, `artifacts/rooftop-density-progress-6.png`, `artifacts/rooftop-density-mobile-progress-0.png`, and `artifacts/rooftop-density-mobile-complete.png`.
- After adding background people and correcting phone scale/placement, Playwright screenshots were captured at `artifacts/rooftop-people-progress-0.png`, `artifacts/rooftop-people-progress-3.png`, `artifacts/rooftop-people-progress-6.png`, `artifacts/rooftop-people-mobile-progress-0.png`, and `artifacts/rooftop-people-mobile-complete.png`.
- After improving rooftop clue semantics and raising the hint limit, Playwright screenshots were captured at `artifacts/rooftop-v5-progress-0.png`, `artifacts/rooftop-v5-hint-sixth.png`, and `artifacts/rooftop-v5-progress-6.png`.
