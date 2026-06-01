# social Image Review

Generated: 2026-06-01


> Existing review file overwritten by the latest config snapshot.

## Config Snapshot

- Scene: `social`
- Name: 小红薯暴击夜
- Theme: ai
- Description: 凌晨一点半，周启明靠在沙发边想刷手机放松，首页第一条就把别人的高光推到脸上。
- Background: /assets/game/social/states/social-progress-0.png
- Machine embedded: true
- Clue count: 8
- Required character/proxy states: 9

## Review Result

- Decision: pass for implementation after the social-v2 rebuild.
- Reason: clue count increases from the third level's 7 to 8, objects are distributed across phone content, phone-adjacent cards, other screens, and household paperwork, and the main character stays in a believable late-night relaxation posture.
- Visual QA: Playwright desktop start, mid-progress, completion, and mobile screenshots were regenerated after hotspot recalibration. Manual inspection confirmed the left panel says 8 clues, markers land on the intended object groups, and completion state shows a clear calmer expression.
- Remaining risk: the progress states are still same-layout full-scene rasters, matching the current second/third-level pipeline. The longer-term production target remains layered character/state assets.

## Generation Brief

- [x] Theme is one sentence and specific to this level.
- [x] Scene logic explains why people and objects are in this location.
- [x] Camera and main action area are fixed before generation.
- [x] Foreground, midground, and background all have roles.
- [x] There is enough believable object density to hide clues.
- [x] Main/proxy character has a planned visible state for each progress step.
- [x] Each clue is a concrete object with a reason to exist in the scene.
- [x] UI copy is player-facing and contains no implementation language.

## Production Prompt Contract

Fill this before generating or editing art. Do not leave it as generic intent.

```text
Use case: stylized-concept game scene raster
Scene purpose:
Camera/layout:
Foreground:
Midground:
Background:
People and actions:
Required clue objects:
Character/proxy state:
Lighting/color:
Mobile readability:
Forbidden:
Output/layers:
```

## Layout Map

```text
Canvas:
Main playable area:
Quiet zones for markers/callouts:
Forbidden zones:
Foreground objects:
Midground objects:
Background objects:
```

## Generation Passes

- [ ] Composition pass accepted before adding detail.
- [ ] Semantic pass confirms every clue has a believable object body.
- [ ] Character pass confirms scale, posture, grounding, and contact shadows.
- [ ] Clarity pass confirms varied clue shapes and mobile readability.
- [ ] State pass keeps camera/props fixed across progress variants.
- [ ] Calibration pass records source-pixel centers after final raster freeze.

## Reference Images

| Image | Role | Must preserve | Must ignore |
| --- | --- | --- | --- |
|  | style/layout/character/edit-target/insert-object |  |  |

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

- [x] Captured progress-0 screenshot.
- [x] Captured at least one mid-progress screenshot.
- [x] Captured completion screenshot.
- [x] Captured mobile first-screen screenshot.
- [x] Manually inspected screenshots in the game shell.

## Hotspot Calibration

Record source-pixel centers before converting to config percentages.

| ID | Label | Evidence | Config center | Config box | Animation | Source center | Review note |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `h1` | 没露本金的收益图 | `cropped_profit_screenshot` | 49, 38.4 | 8.2 x 15 | phone | `819, 361` | upper phone feed chart |
| `h2` | 没发出去的祝福 | `unsent_reply_draft` | 49, 50 | 8 x 5.8 | chat | `819, 471` | lower phone reply strip |
| `h3` | 收益帖旁的进群邀请 | `group_invite_popup` | 54.2, 58.6 | 12 x 10 | chat | `906, 551` | nearby invite card |
| `h4` | 置顶复盘评论 | `pinned_review_comment` | 53.4, 69.5 | 12 x 12 | chat | `893, 654` | pinned/replay card |
| `h5` | 裁掉日期的课程截止 | `ai_course_deadline` | 71.7, 31.8 | 18 x 20 | note | `1199, 299` | laptop deadline page |
| `h6` | 副业课程收藏页 | `side_hustle_bookmark` | 95.2, 33.5 | 8.2 x 25 | note | `1592, 315` | right-side saved course page |
| `h7` | 新房照旁的还款单 | `mortgage_debit_notice` | 71.1, 68.2 | 21 x 19 | contract | `1189, 642` | home photo and repayment notice |
| `h8` | 电费催缴通知 | `household_overdue_bill` | 84.8, 75.1 | 17 x 19 | paper | `1418, 707` | lower-right household bill |

## Decision

- [x] Pass: image can proceed to implementation/handoff.
- [ ] Revise art: regenerate or edit the raster.
- [ ] Revise config: update hotspot centers, hit boxes, feedback, or copy.
- [ ] Blocked: needs product/design decision.
