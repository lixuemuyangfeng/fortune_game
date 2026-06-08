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
- QA finding resolved: the fourth rooftop protagonist state no longer contains adjacent-row contact-sheet residue, so the fourth clue no longer spawns floating legs or visual clipping; Playwright screenshot `artifacts/rooftop-v7-progress-4.png` verifies the repaired state in-scene.
- QA finding resolved: the corner-smoking protagonist has been scaled down and moved inward from the front parapet so he reads as standing on the rooftop corner floor rather than stepping through the foreground wall.
- QA finding resolved: the rooftop protagonist was moved off the left coil/pipe area onto the left-side open floor, and the blocked `杠杆合同边角` clue moved to the right toolbox/key paper so the character no longer stands on the clue or the pipe.
- QA finding resolved: the rooftop protagonist is no longer a separately composited green-screen cutout. `rooftop-background-v8.png` regenerates the rooftop, background adults, and lower-left smoking protagonist as one coherent bitmap scene so scale, rim light, shadows, and edge treatment match.
- QA finding resolved: v9 replaces the single v8 rooftop plate with seven same-source full-scene progress backgrounds, `rooftop-v9-progress-0.png` through `rooftop-v9-progress-6.png`, so the protagonist visibly changes expression/posture without reintroducing a pasted green-screen sprite.
- QA finding resolved: v9 diversifies the second-level clue bodies from mostly paper into a hand-held group-chat phone, AC risk-news poster, right-side price-alert phone, door warning sign, gold receipt, and contract/key folder.
- QA finding resolved: v9 hotspots were re-marked against the new clue bodies so the found markers land closer to the visible objects instead of detached paper-like areas.
- QA finding resolved: the v9 rooftop hotspot centers were tightened again after screenshot review: the group-chat target now sits on the hand-held phone, the risk-news target sits on the AC poster body, and the right-side price-alert/contract targets sit on their visible phone and contract/key objects.
- QA finding resolved: v9 found markers no longer use the old `+8,-8` visual offset, and the price-alert hit effect now pulses from the phone center instead of drifting toward the contract paper.
- QA finding resolved: the ambiguous rooftop warning clue no longer uses the semantically weak high-voltage sign. It now targets the white `踩线告示` under the sign, which reads as boundary-risk/overtrading context instead of unrelated electrical safety.
- QA finding resolved: second-level hotspot centers are now recorded as source-image pixel centers in `docs/rooftop-v9-hotspot-calibration.md`, with config percentages derived from those measured positions instead of prompt guesses.
- QA finding resolved: the right-side price-alert phone hotspot was moved left/up to the phone screen center after user crop review.
- QA finding resolved: the second-level left mission-panel copy no longer exposes implementation language like Phaser/占位 and uses a more player-facing tone for goals, completion, and next-level teaser text.
- Process improvement: added `docs/image-review-optimize-loop.md` and `npm run art:review -- <sceneId>` so future level art must pass a repeatable generation brief, review-gate, hotspot-calibration, and screenshot-inspection loop before handoff.
- Process improvement: generated baseline image review checklists for the current office and rooftop levels under `docs/reviews/`.
- Process improvement: expanded the image-generation loop with concrete production tactics: layout locking, staged generation passes, reference-role labeling, prompt-contract blocks, negative prompts from prior failures, local-edit-first repair rules, progress-state consistency, and required layer decisions.
- Third level progress: replaced the old third-slot `moments` placeholder with the playable `convenience` level, using generated bitmap convenience-store art, 7 embedded clues, a dedicated Phaser scene, route from the rooftop completion button, review/checkpoint docs, and Playwright coverage.
- Third level QA finding resolved: `convenience-progress-1` through `convenience-progress-7` are no longer byte-identical duplicates; each now uses a locally composited Zhou Qiming state over the accepted base scene so the Phaser progress switch has visible character/proxy movement.
- Third level QA finding resolved: third-level clue labels were tightened after screenshot review so targets are concrete objects instead of abstract phrases: a single middle scratched ticket, rider vacation memo, counter note, and Zhou Qiming's tea bottle.
- Third level QA finding resolved: the convenience scene received a targeted local redraw pass for clue objects: rider phone memo, counter tag, single middle scratched ticket, taped-over winner amount, salesman pocket ticket, fictional scratch-card branding, and Zhou Qiming's hand-held tea bottle.
- Third level QA finding resolved: the weak inducements `骑手休假备忘` and `周启明手里的无糖茶` were removed from the evidence set. Their slots now target `付款码旁加购贴` and `最高奖金立牌`, which directly explain checkout-time add-on pressure and maximum-prize salience.
- Third level QA finding resolved: the new `付款码旁加购贴` and `最高奖金立牌` anchors were tightened against source-image crops; the payment target now centers on the blue checkout sign and the prize target on the maximum-prize strip instead of the whole rack.
- Third level QA finding resolved: convenience hit feedback for note/photo clues was upgraded from plain underlines/text stamps to localized scan sweeps, corner pulses, and prize sparkles that stay inside or near the clicked object.
- Third level QA risk: progress states are improved but still use local compositing from generated full-scene variants rather than clean transparent character source layers. Treat them as a playable improvement, not the final layered production pipeline.
- Fourth level progress: replaced the old 5-clue social slice with an 8-clue `social` / `小红薯暴击夜` rebuild, so difficulty now increases after the 7-clue convenience level.
- Fourth level QA note: the new social slice splits clues across phone content, phone-adjacent invite/comment cards, other screens, and household cost paperwork instead of concentrating everything in one phone or one pile of paper.
- Fourth level QA risk reopened: `social-progress-0..8` are hash-distinct but visually near-identical at runtime size. They must not be treated as valid protagonist state progression until a regenerated/redrawn set shows readable expression or body-language changes from `progress-0` through `progress-8`.
- Fourth level QA finding resolved: social hit feedback now uses eight clue-specific local effects: profit crop, unsent input cursor, invite card lines, pinned comment pulse, deadline flash, bookmark fold, repayment underline, and bill stamp.
- Fourth level QA finding resolved: after the social V3 asset swap, all eight hotspot centers were recalibrated from object-state and object-relationship anchors. Playwright screenshots were regenerated and manually checked for the 8/8 counter, distributed clue placement, and completion-state expression change.
- Fourth level difficulty pass: clue labels were softened from answer names into observation prompts, and `socialScene` now includes eight false-positive decoy zones on ordinary clutter so the player has to separate real pressure/cost evidence from plausible bedroom noise.
- Fourth level V3 rebuild: replaced the text-heavy social scene with object-relationship clue art. The clue set now uses thumb-cropped profit chart, unpressed send strip, invite card, pinned note, laptop countdown/hourglass, bookmark stack, house key plus repayment envelope, and utility envelope near a power strip; DOM and Phaser both consume config-level decoys.
- Fourth level QA finding resolved: manual browser checks confirmed three decoy clicks kept social progress at `0/8`, while four real object-relation clues advanced to `4/8` with local markers on the intended objects.
- Fourth level QA finding resolved: the fourth-level scene intro card was moved off Zhou Qiming's face and phone, and Playwright now captures social mid-progress plus mobile-first screenshots.
- Fourth level QA finding resolved: the iron-rule runtime guard now includes `convenienceScene` and `socialScene`, so later level scenes are covered by the same no-patchwork/no-fake-feedback checks as the first two scenes.
- Fourth level V4 difficulty rebuild: replaced the too-obvious V3 social image with a denser same-category decoy scene. The eight active targets are now small subparts or relationships: phone chart crop, unsent send corner, invite card edge, note-wall red pin, keyboard-side hourglass, book-stack bookmark, key/envelope corner, and red-stamped bill corner.
- Fourth level QA finding resolved: social now has 20 config-level decoy zones, and config validation requires at least 18 decoys so future fourth-level changes cannot regress to a few isolated answer objects.
- Fourth level QA finding resolved: manual Playwright checks confirmed four decoy clicks (`普通便签墙`, `黑色马克杯`, `插头适配器`, `线缆圈`) kept progress at `0/8`, while four real clues advanced to `4/8`. The overlapping adapter/cable decoy zones were narrowed after QA.
- Fourth level QA finding resolved: social hotspot centers were recalibrated from the final V4 source raster and recorded in `docs/social-hotspot-calibration.md`; the art review file now records pass/fail notes and source-pixel centers.
- Fourth level V5 semantic rebuild: fixed the structural issue where two true clues were stacked on the same phone and digital behaviors were represented as vague paper cards. V5 keeps only one phone clue, moves the unsent reply to a visible draft notebook, renders the group invite on a separate device modal, and renders the pinned review as a laptop comment-interface row.
- Fourth level QA finding resolved: Playwright screenshot `artifacts/social-v5-mid.png` confirms the first four found markers land on four distinct objects: phone chart, draft notebook, group invite device, and laptop comment panel.
- Fourth level QA finding resolved: user review found several clue meanings were too explanation-dependent. Reframed the phone clue as a cropped-up chart segment, the notebook clue as an awkward handwritten blessing draft, the laptop comment as a high-like-count course/comment funnel, and the deadline as the yellow course-deadline sticky. Recalibrated the repayment clue from the key/photo area to the bank notice text itself.
- Fourth level QA risk: the progress states are full-scene bitmap states rather than clean transparent character layers. They now match the current second/third-level bitmap-state approach, but the longer-term production pipeline should still move toward layered character/proxy assets.
- Fifth level WIP: added the production brief for `AI 发布会公开处刑` in `docs/ai-launch-production-brief.md`, expanded the level from the campaign's original 5 clues to 9 clues to preserve increasing difficulty after the 8-clue social level, and wired the `ai_launch` config/route/Phaser scene reuse/test guards. This is not yet a complete playable level because the final raster art, source-pixel hotspot calibration, progress-state rasters, and Playwright visual QA are still pending.
- Fifth level blocker note: built-in image generation returned `TooManyRequests` during this pass, so no placeholder or recycled image was committed as production art.
- Fifth level guardrail update: added fifth-level Playwright flow coverage, filled the AI-launch image-review prompt contract, and added a config-validation guard that will reject byte-identical `ai-launch-progress-0..9` rasters once assets exist. The image generation service then returned `ServerError`, so final art remains externally blocked.
- Fifth level progress: generated and integrated the first playable AI-launch raster scene under `public/assets/game/ai-launch/`, calibrated all 9 hotspots from the 1280x720 final raster, fixed the h2/h6 overlap found by Playwright, and passed `npm test`, `npm run build`, and the full `npm run test:e2e` suite.
- Fifth level QA risk: `ai-launch-progress-1..9` are mechanically derived local-state rasters, not true generated same-camera posture/expression redraws. The level is playable, but this state-asset shortcut should be replaced before final art approval.
- Fifth level QA finding resolved: runtime hint/click review found h3 `课程付款倒计时` had drifted onto the pen-cup area, and h2/h5/h6 were too ambiguous around the notebook/form stack. Recalibrated h2 to the pending-review sheet, h3 to the right-side 23:59 checkout card, h5 to the approval-chain notebook diagram, and h6 to the red stamp; moved the `打印纸` decoy center outside the h3 answer zone.
- Fifth level QA finding resolved: tightened AI-launch clue semantics after review. `太干净的演示数据` became `只跑样例的满分屏`, `预算审批人脉图` became `人情审批流程图`, `待人工处理清单` became `待人工复核清单`, `人工盖章队列` became `红章兜底流程`, and `恐慌课结账倒计时` became `平板结账倒计时` so each clue has a clearer relationship to AI-launch fear instead of relying on explanation.
- Fifth level QA finding resolved: separated the `待人工复核清单` hotspot from the red stamp. h2 now lands on the upper form/list body while h6 remains on the red stamp, so the two clues no longer share the same visual center.
- Hint-flow QA finding resolved: hint-ad usage is now scoped by scene (`hint:<sceneId>`) so earlier-level hints cannot exhaust the ninth AI-launch hint. Playwright now covers using all social hints first, then revealing all nine AI-launch clues through the hint button.
- Sixth level progress: added playable `meeting` / `邢总画饼复盘会` with 10 clues, increasing difficulty after the 9-clue AI-launch level. Routing, config, Phaser preload/scene reuse, local dev scene picker flow, Playwright coverage, production brief, image review, hotspot calibration, and `meeting-progress-0..10` raster states are in place.
- Sixth level QA finding resolved: the first meeting raster was rejected during self-review because it was too close to "click all text/table blocks". It was replaced with a denser meeting-room scene where clues are anchored to object relationships: empty support boxes, Zhou's name card, red-X risk memo, expanded action tracker, target/budget chart, rejected headcount form on an empty chair, Friday calendar/cold coffee, laser pointer, locked budget folder, and whiteboard risk cluster.
- Sixth level QA finding resolved: completion screenshot review found the whiteboard clue effect too close to Zhou Qiming's face. The h10 source center was moved from 477,187 to 560,170 and the hit box was narrowed from 20.0 x 25.0 to 14.0 x 20.0.
- Sixth level QA risk: `meeting-progress-1..10` are mechanically derived local-state rasters, not true generated posture/expression redraws. Treat the level as playable WIP, not final production character-state art.
- Seventh level progress: added playable final `nest` / `暴富噪声母巢` with 12 clues, increasing difficulty after the 10-clue meeting level. Routing, config, Phaser preload/scene registration, local dev picker flow, Playwright coverage, production brief, image review, hotspot calibration, and `nest-progress-0..12` raster states are in place.
- Seventh level QA finding resolved: the first generated mother-nest candidate was rejected before integration because it used too many readable labels. The accepted candidate relies more on object/icon relationships: cracked keyboard/chart, burned gold receipt, scratch-ticket roll, lens/photo shard, AI timer module, blame pipe, toy-car tag, shield tag, stop token, film-frame tag, warning price tag, and process lock tag.
- Seventh level QA finding resolved: Playwright caught overlap between `连环差一点票卷` and `止损停牌`. h3/h9 were narrowed and separated in both config and `docs/nest-hotspot-calibration.md`.
- Seventh level QA risk: `nest-progress-1..12` are mechanically derived local-state rasters, not true generated posture/expression redraws. Treat the final level as playable WIP, not final production character-state art.
- Late-level difficulty guard added: Playwright now verifies levels 5-7 do not advance progress when the player clicks selected same-scene decoys. This locks in the rule that late levels need plausible non-answer objects, not "click every readable/interesting label" gameplay.
- Hotspot quality guard added: config validation now rejects any scene decoy whose center sits inside a true hotspot. Existing late-level decoy centers were retuned so ordinary objects are still plausible nearby clutter without being swallowed by answer zones.
- Fourth level microexpression pass: added `public/assets/game/social/expressions/social-expression-progress-0.png` through `social-expression-progress-8.png` and wired `socialScene` to use a stable social base background plus progress-specific face/head expression overlays. This fixes the fourth-level "no visible expression change" issue without reintroducing detached face geometry or full-scene reload churn.
- Fourth level QA risk: the new social expression layers are pragmatic transparent head/face overlays generated from the existing raster, not final regenerated full-scene character-state art. They are acceptable as a visible runtime state improvement, but final production art should still replace them with same-camera full-state assets or clean layered character assets.
- Semantic validation hook added: `scripts/validate-level-semantics.mjs`, `npm run semantic:check`, `docs/semantic-validation.md`, and `npm test` integration now enforce the clue reasoning chain, increasing clue count, late-level decoy density, placeholder-copy bans, and warnings for same-object overuse.
- Phaser preload stability fix: `PreloadScene` now loads only the active scene's assets instead of queueing all seven levels on every state update. This prevents rapid level progression from aborting large image requests and leaving the social canvas with only markers over a blank wash.
- Visual QA hook added: Playwright now samples the Phaser canvas during the fourth-level mid and complete states and fails if the canvas looks like a blank background instead of a real scene image.
- Eighth level progress: added playable `stock` / `暴涨榜深夜场` with 13 clues, increasing difficulty after the 12-clue mother-nest level. The level uses the user's stock涨幅榜 direction as temptation material while framing it as in-game追涨噪声, not financial advice.
- Eighth level hint fix: raised the scene-scoped hint budget from 12 to 20 and added Playwright coverage that completes all 13 stock clues through hints, including the final clue.
- Eighth level QA risk: built-in image generation failed with server errors during this pass, so the first stock artwork is a local redraw/composite based on the existing night-room raster. It is playable and tested, but still too card/text-heavy for final production art and should be replaced by a formal same-camera generated scene or targeted inpaint pass.
- Remaining QA risk: final user visual approval is still needed, but the runtime no longer relies on placeholder SVG/vector-generated rooftop assets.

Second-level optimization plan:

- Keep future level difficulty increasing by clue count, smaller object scale, and placement across different scene layers instead of dumping props on one floor band.
- If future rooftop art is rejected, iterate through the bitmap generation/editing pipeline, not through SVG placeholder scripts.

## Next Steps

- Keep later levels on the bitmap asset pipeline; do not restart SVG placeholder generation for production scenes.
- Apply the second-level lesson to later levels before coding them: each next level needs more deliberate clue hiding, scene-layer distribution, and per-clue character/proxy state progression.
- Next product pass should review all seven playable levels for final-art gaps, especially mechanically derived progress states in levels 5-7, before claiming production-grade completion.
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
- After fixing the v7 corner-smoking protagonist sheet and placement, Playwright screenshots were captured at `artifacts/rooftop-v7-progress-0.png`, `artifacts/rooftop-v7-progress-4.png`, and `artifacts/rooftop-v7-progress-6.png`.
- After moving the v7 protagonist off the pipe area and relocating the blocked contract clue, Playwright screenshots were captured at `artifacts/rooftop-v7-leftwall-progress-0.png`, `artifacts/rooftop-v7-leftwall-progress-4.png`, and `artifacts/rooftop-v7-leftwall-progress-6.png`.
- After replacing the rooftop plate with same-source v8 artwork and disabling the old pasted protagonist sprite, Playwright screenshots were captured at `artifacts/rooftop-v8-unified-progress-0.png`, `artifacts/rooftop-v8-unified-progress-4.png`, and `artifacts/rooftop-v8-unified-progress-6.png`.
- After adding v9 same-source progress backgrounds, varied clue objects, and updated hotspot positions, Playwright screenshots were captured at `artifacts/rooftop-v9-progress-0.png`, `artifacts/rooftop-v9-progress-4.png`, and `artifacts/rooftop-v9-progress-6.png`.
- After tightening the v9 hotspot centers, Playwright screenshots were captured at `artifacts/rooftop-v9-hotspots-progress-0.png`, `artifacts/rooftop-v9-hotspots-progress-4.png`, and `artifacts/rooftop-v9-hotspots-progress-6.png`.
- After removing found-marker offset and centering the price-alert hit pulse, Playwright screenshots were captured at `artifacts/rooftop-v9-marker-center-progress-4b.png` and `artifacts/rooftop-v9-marker-center-progress-6b.png`.
- After clarifying the yellow high-voltage warning clue and calibrating source-pixel hotspot centers, Playwright screenshots were captured at `artifacts/rooftop-v9-calibrated-progress-4.png` and `artifacts/rooftop-v9-calibrated-progress-6.png`.
- After polishing the second-level left-panel copy, `npm test`, `npm run build`, and `npm run test:e2e` passed; Playwright updated `artifacts/playtest-rooftop-complete.png`.
- After adding the image review/optimize mechanism, `npm run art:review -- office` and `npm run art:review -- rooftop` generated baseline review files for the first two levels.
- After adding concrete image-generation tactics to the review template, `npm run art:review -- office` and `npm run art:review -- rooftop` regenerated the baseline review files.
- After adding the playable third `convenience` level, `npm run art:review -- convenience`, `npm test`, `npm run build`, and `npm run test:e2e` passed; Playwright captured `artifacts/playtest-convenience-intro.png` and `artifacts/playtest-convenience-complete.png`.
- After tightening third-level clue labels and shrinking the large losing-ticket hotspot to one ticket, `npm test`, `npm run build`, and `npm run test:e2e` passed again.
- After locally redrawing unreasonable third-level clue elements, all `convenience-progress-0..7` rasters were updated from the new base image and `docs/convenience-hotspot-calibration.md` was recalibrated with new source-pixel centers.
- After adding third-level progress-state composites, `convenience-progress-1..7` now have distinct Zhou Qiming posture/expression states while retaining the accepted clue layout.
- After adding the playable fourth `social` level, `npm run art:review -- social`, `npm test`, `npm run build`, and `npm run test:e2e` passed; Playwright captured `artifacts/playtest-social-intro.png` and `artifacts/playtest-social-complete.png`.
- After improving fourth-level progress states and social-specific hit feedback, `npm test`, `npm run build`, and `npm run test:e2e` passed; Playwright captured `artifacts/playtest-social-intro.png`, `artifacts/playtest-social-mid-progress.png`, `artifacts/playtest-social-complete.png`, and `artifacts/playtest-social-mobile-intro.png`.
- After rebuilding the fourth-level social scene for higher hidden-object difficulty, `npm run art:review -- social`, `npm test`, `npm run build`, and `npm run test:e2e` passed on 2026-06-02; Playwright captured `artifacts/social-v4-intro.png` and `artifacts/social-v4-mid.png`.
- After the fourth-level V5 semantic rebuild, `npm run art:review -- social`, `npm test`, `npm run build`, and `npm run test:e2e` passed on 2026-06-03; Playwright captured `artifacts/social-v5-intro.png` and `artifacts/social-v5-mid.png`.
- After the fourth-level clue-semantic repair on 2026-06-05, `npm test`, `npm run build`, and `npm run test:e2e` passed. Source overlay review confirms the course deadline marker lands on the yellow sticky and the repayment marker lands on the bank notice text rather than the key.
- During the fifth-level WIP pass on 2026-06-04, `npm run build` passed with the existing chunk-size warning after adding `ai_launch` routing and config. Full `npm test` and Playwright QA are intentionally pending until the final `ai-launch-progress-0..9` rasters exist.
- After adding fifth-level hit-effect specialization, Playwright coverage, and raster-state hash guards on 2026-06-04, `npm run build` passed again with the existing chunk-size warning. `npm test` remains intentionally unrunnable until the required AI-launch assets are generated.
- After adding the first playable AI-launch raster assets and hotspot calibration on 2026-06-04, `npm test`, `npm run build`, and `npm run test:e2e` passed. Playwright captured `artifacts/playtest-ai-launch-intro.png`, `artifacts/playtest-ai-launch-mid-progress.png`, `artifacts/playtest-ai-launch-complete.png`, and `artifacts/playtest-ai-launch-mobile-intro.png`.
- After adding and self-reworking the sixth `meeting` level on 2026-06-04, `npm test`, `npm run build`, and `npm run test:e2e` passed. Playwright captured `artifacts/playtest-meeting-intro.png`, `artifacts/playtest-meeting-mid-progress.png`, `artifacts/playtest-meeting-complete.png`, and `artifacts/playtest-meeting-mobile-intro.png`.
- After adding and self-reworking the seventh `nest` final level on 2026-06-04, `npm test`, `npm run build`, and `npm run test:e2e` passed. Playwright captured `artifacts/playtest-nest-intro.png`, `artifacts/playtest-nest-mid-progress.png`, `artifacts/playtest-nest-complete.png`, and `artifacts/playtest-nest-mobile-intro.png`.
- After adding late-level decoy regression coverage on 2026-06-05, `npm test`, `npm run build`, and `npm run test:e2e` passed. The new Playwright check covers `ai_launch`, `meeting`, and `nest` and asserts decoy clicks stay at 0 progress before a true clue advances the meter.
- After adding decoy-center hotspot validation on 2026-06-05, `npm test`, `npm run build`, and `npm run test:e2e` passed. The validation guards against decoy centers being covered by real clue hit zones.
- After recalibrating AI-launch h2/h3/h5/h6 on 2026-06-05, `npm test`, `npm run build`, and `npm run test:e2e` passed. The source overlay check now places the course checkout clue on the right tablet timer/payment card instead of the pen cup.
- After adding social microexpression overlays and the semantic validation hook on 2026-06-08, `npm run semantic:check`, `npm test`, focused social Playwright, `npm run build`, and the full `npm run test:e2e` suite were rerun before commit.
- After adding the eighth stock heatlist level on 2026-06-08, `npm test`, `npm run build`, and `npm run test:e2e` passed. Playwright verified all 13 stock clues can be revealed through the hint flow and captured `artifacts/playtest-stock-intro.png`, `artifacts/playtest-stock-mid-progress.png`, and `artifacts/playtest-stock-complete.png`.
