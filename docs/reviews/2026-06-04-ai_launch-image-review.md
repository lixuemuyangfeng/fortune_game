# ai_launch Image Review

Generated: 2026-06-04


## Config Snapshot

- Scene: `ai_launch`
- Name: AI 发布会公开处刑
- Theme: ai
- Description: 凌晨两点，周启明把发布会、课程广告和旧系统工单一起看完，恐慌比泡面先凉。
- Background: /assets/game/ai-launch/states/ai-launch-progress-0.png
- Machine embedded: true
- Clue count: 9
- Required character/proxy states: 10

## Generation Brief

- [x] Theme is one sentence and specific to this level: AI change is real, panic packaging is the enemy.
- [x] Scene logic explains why people and objects are in this location: 02:00 home workstation after watching launch replays and course ads.
- [x] Camera and main action area are fixed before generation: 16:9 dense desk/living-room work corner.
- [x] Foreground, midground, and background all have roles.
- [x] There is enough believable object density to hide clues.
- [x] Main/proxy character has a planned visible state for each progress step.
- [x] Each clue is a concrete object with a reason to exist in the scene.
- [x] UI copy is player-facing and contains no implementation language.

## Production Prompt Contract

Fill this before generating or editing art. Do not leave it as generic intent.

```text
Use case: stylized-concept game scene raster
Scene purpose: hidden-object game level about AI replacement panic amplified by launch videos, paid courses, and messy real company workflows.
Camera/layout: fixed 16:9, 1280x720, dense believable home workstation at 02:00; desk/couch in midground; screens and papers distributed across the playable area.
Foreground: table edge, cold noodles, chargers, approval stamp, forms, ordinary receipts, cables, decoy papers.
Midground: Zhou Qiming at the desk/couch, main monitor/laptop/tablet cluster, notebook, phone, USB token, course checkout card.
Background: night window, bookshelf, printer/router, boxes, family clutter; background supports fatigue and does not dominate the playable area.
People and actions: Zhou Qiming is a tired 38-year-old Chinese office worker, human-scaled, seated or leaning naturally, lit by screens and desk lamp, gradually calming across progress states.
Required clue objects: polished demo monitor rows, pending manual-review sheet, course checkout timer/hourglass, old IE/USB token, approval-chain notebook, physical stamp/form queue, overloaded tab strip, job-risk clipping, unanswered boss phone.
Character/proxy state: progress-0 rigid and sleepless; progress-1..3 tense but starting to look away; progress-4..6 shoulders loosen; progress-7..9 calmer and skeptical.
Lighting/color: deep green game palette, warm desk lamp, cool blue screen light, low saturation, coherent material contrast across paper, metal, glass, plastic, cloth, skin.
Mobile readability: clue bodies clear at game size, but meaning delayed by context; no clue relies only on tiny text.
Forbidden: empty scenic room, one giant phone, all clues on one screen, obvious answer labels, floating props, pasted cutout character, unrelated warning signs, numbered clue labels, huge readable tutorial text, clue marker baked into art.
Output/layers: one coherent 16:9 raster suitable as accepted base image; then same-camera progress-0..9 rasters with fixed clue bodies and only character/body-language changes.
```

## Layout Map

```text
Canvas: 1280 x 720 source, no runtime crop.
Main playable area: desk/couch workstation spans the whole frame, with clues spread left/middle/right and foreground/midground.
Quiet zones for markers/callouts: upper-left wall/window edge, lower-right desk corner, small pockets beside object centers.
Forbidden zones: protagonist face and hands, exact screen borders, identical paper piles, screen title text areas.
Foreground objects: table edge, stamp, forms, cold noodles, cables, adapters, receipts.
Midground objects: Zhou Qiming, main screen cluster, phone, tablet/page, notebook, old token, course timer.
Background objects: window, bookshelf, printer/router, boxes, family objects, ordinary decoy notes.
```

## Generation Passes

- [x] Composition pass accepted before adding detail.
- [x] Semantic pass confirms every clue has a believable object body.
- [x] Character pass confirms scale, posture, grounding, and contact shadows.
- [x] Clarity pass confirms varied clue shapes and mobile readability.
- [ ] State pass keeps camera/props fixed across progress variants. Current variants keep camera/props fixed, but character change is only a mechanical local adjustment.
- [x] Calibration pass records source-pixel centers after final raster freeze.

## Reference Images

| Image | Role | Must preserve | Must ignore |
| --- | --- | --- | --- |
| `docs/art-samples/office-clarity-sample.png` | style reference | clear semi-real material, readable silhouettes, warm/cool light mix | exact office layout and old clue types |
| `public/assets/game/social/states/social-progress-0.png` | difficulty/layout reference | dense home setting, object-relation clues, same-category decoys | old phone-overload mistakes and social-comparison theme |

## Negative Prompt Items

- [ ] No oversized phones or upright phone props unless mounted as a screen.
- [ ] No floating people, pipe standing, wall clipping, or missing contact shadows.
- [ ] No work poses in a scene where people should gossip, rest, browse, drink, smoke, or perform another believable action.
- [ ] No identical paper slips for every clue.
- [ ] No unrelated safety signs used as financial/emotional clues.
- [ ] No empty scenic area dominating the playable area.
- [ ] No pasted character with mismatched sharpness, contrast, color temperature, rim light, or shadow.
- [ ] No contact-sheet residue, extra limbs, cut-off torsos, or green-screen fringe.
- [ ] No baked-in answer markers or labels that spoil clues.

## Edit Strategy

- [ ] Use local edit for small object, scale, clutter, palette, or hotspot fixes.
- [ ] Use full regeneration only for failed camera, failed premise, sparse layout, or unrecoverable clue distribution.
- [ ] If progress states drift, edit from the accepted base instead of generating unrelated variants.

## Review Gates

### Theme Gate

- [ ] Every major object supports the theme or believable scene dressing.
- [ ] No clue needs a written explanation to make visual sense.
- [ ] No object is being force-fit into the narrative.

### Layout Gate

- [ ] Playable area is not dominated by empty scenic background.
- [ ] Clues are distributed across scene layers.
- [ ] Objects do not all sit on one floor/table band.
- [ ] Important objects remain visible in the game layout.

### Character Gate

- [ ] Character scale matches nearby people and props.
- [ ] Pose, grounding, contact shadow, and light direction are plausible.
- [ ] All progress states show readable body-language or expression changes.
- [ ] No pasted crop, green fringe, contact-sheet residue, or scene cutout remains.

### Clue Gate

- [ ] Each clue body is a concrete visible object.
- [ ] Clue form varies across the set.
- [ ] Clue object matches its label and evidence copy.
- [ ] No hover/found/default state spoils answers.

### Interaction Gate

- [ ] Every hotspot center is measured from final source pixels.
- [ ] Found marker lands on the object center or meaningful subpart.
- [ ] Hit animation stays inside or close to the object.
- [ ] Hint and found states do not cover neighboring clues or character faces.

### Color & Style Gate

- [ ] People, props, and background share lighting and contrast.
- [ ] The scene avoids a one-note palette.
- [ ] No object reads as a mismatched sticker or placeholder geometry.
- [ ] Text remains readable without turning the level into a dashboard.

### Screenshot Gate

- [ ] Captured progress-0 screenshot.
- [ ] Captured at least one mid-progress screenshot.
- [ ] Captured completion screenshot.
- [ ] Captured mobile first-screen screenshot.
- [ ] Manually inspected screenshots in the game shell.

## Hotspot Calibration

Record source-pixel centers before converting to config percentages.

| ID | Label | Evidence | Config center | Config box | Animation | Source center | Review note |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `h1` | 发布会演示表格 | `polished_ai_demo_rows` | 78.0, 18.8 | 17.0 x 18.0 | kline | 998, 135 | Final art targets monitor grid. |
| `h2` | 待人工处理清单 | `manual_review_sheet` | 61.0, 69.2 | 8.8 x 9.6 | paper | 781, 498 | Re-scoped from meeting-summary; narrowed to avoid h6. |
| `h3` | 课程付款倒计时 | `panic_course_checkout` | 87.0, 44.2 | 10.6 x 15.4 | note | 1114, 318 | Right tablet checkout timer. |
| `h4` | 旧系统令牌 | `legacy_ie_token` | 28.0, 82.0 | 8.0 x 7.0 | alert | 358, 590 | Small old token among paper clutter. |
| `h5` | 审批人脉笔记 | `approval_chain_notebook` | 52.8, 60.8 | 14.0 x 13.0 | contract | 676, 438 | Red-circled approval chain. |
| `h6` | 人工盖章表单 | `manual_stamp_queue` | 68.7, 77.4 | 6.6 x 7.4 | receipt | 879, 557 | Red stamp and stacked forms. |
| `h7` | 连播标签页 | `seventeen_tabs_fatigue` | 72.6, 4.8 | 25.0 x 5.8 | chat | 929, 35 | Top monitor tab strip. |
| `h8` | 替代新闻剪报 | `job_replacement_clip` | 41.7, 83.0 | 20.0 x 13.0 | news | 534, 598 | Lower-center clipping. |
| `h9` | 未接老板消息 | `boss_followup_unanswered` | 8.5, 76.0 | 11.0 x 17.0 | phone | 109, 547 | Lower-left phone notification. |

## Decision

- [x] Pass: image can proceed to playable implementation.
- [ ] Revise art: replace mechanical `progress-1..9` rasters with true same-camera character expression/posture states before final art approval.
- [ ] Revise config: update hotspot centers, hit boxes, feedback, or copy.
- [ ] Blocked: needs product/design decision.

## Runtime QA

- `npm test`: passed on 2026-06-04.
- `npm run build`: passed on 2026-06-04 with the existing Phaser chunk-size warning.
- `npm run test:e2e`: passed on 2026-06-04 after h2/h6 overlap calibration.
- Screenshots: `artifacts/playtest-ai-launch-intro.png`, `artifacts/playtest-ai-launch-mid-progress.png`, `artifacts/playtest-ai-launch-complete.png`, `artifacts/playtest-ai-launch-mobile-intro.png`.
