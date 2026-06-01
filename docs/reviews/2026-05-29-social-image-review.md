# social Image Review

Generated: 2026-05-29


## Config Snapshot

- Scene: `social`
- Name: 小红薯暴击夜
- Theme: ai
- Description: 凌晨一点半，周启明想刷手机放松，首页第一条就把别人的高光推到脸上。
- Background: /assets/game/social/states/social-progress-0.png
- Machine embedded: true
- Clue count: 5
- Required character/proxy states: 6

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
凌晨独自在家刷到别人高光内容后的社交比较焦虑。
Camera/layout:
16:9 fixed camera, cramped apartment dining table as main playable area, phone/social objects clustered around Zhou Qiming.
Foreground:
Notebook draft, housing photo, QR card, laptop course ad, small household objects.
Midground:
Zhou Qiming holding phone at the table, dirty dishes and paper clutter.
Background:
Kitchen, sofa, washing machine, late-night apartment window.
People and actions:
One tired adult man staring at social feed, no unrelated crowd.
Required clue objects:
cropped profit screenshot, group QR card, new-home photo plus loan contract, AI course deadline, unsent reply draft.
Character/proxy state:
Six fixed-camera full-scene progress rasters now move Zhou Qiming from anxious and collapsed to calmer and self-aware while preserving all clue bodies.
Lighting/color:
Warm kitchen light against cool late-night apartment shadows.
Mobile readability:
Clues must stay large enough for 1280x720 stage and mobile fit view.
Forbidden:
No oversized freestanding phone, no clue as plain loose text only, no pasted UI labels, no random office/work scene.
Output/layers:
Single full-scene raster for this pass; future pass should separate stable background and protagonist/proxy state.
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

- [x] Composition pass accepted before adding detail.
- [x] Semantic pass confirms every clue has a believable object body.
- [x] Character pass confirms scale, posture, grounding, and contact shadows.
- [x] Clarity pass confirms varied clue shapes and mobile readability.
- [x] State pass keeps camera/props fixed across progress variants.
- [x] Calibration pass records source-pixel centers after final raster freeze.

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

- [x] Every major object supports the theme or believable scene dressing.
- [x] No clue needs a written explanation to make visual sense.
- [x] No object is being force-fit into the narrative.

### Layout Gate

- [x] Playable area is not dominated by empty scenic background.
- [x] Clues are distributed across scene layers.
- [x] Objects do not all sit on one floor/table band.
- [x] Important objects remain visible in the game layout.

### Character Gate

- [x] Character scale matches nearby people and props.
- [x] Pose, grounding, contact shadow, and light direction are plausible.
- [x] All progress states show readable body-language or expression changes.
- [x] No pasted crop, green fringe, contact-sheet residue, or scene cutout remains.

### Clue Gate

- [x] Each clue body is a concrete visible object.
- [x] Clue form varies across the set.
- [x] Clue object matches its label and evidence copy.
- [x] No hover/found/default state spoils answers.

### Interaction Gate

- [x] Every hotspot center is measured from final source pixels.
- [x] Found marker lands on the object center or meaningful subpart.
- [x] Hit animation stays inside or close to the object.
- [x] Hint and found states do not cover neighboring clues or character faces.

### Color & Style Gate

- [x] People, props, and background share lighting and contrast.
- [x] The scene avoids a one-note palette.
- [x] No object reads as a mismatched sticker or placeholder geometry.
- [x] Text remains readable without turning the level into a dashboard.

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
| `h1` | 没露本金的收益图 | `cropped_profit_screenshot` | 41.5, 57.9 | 8.5 x 23 | phone | 694, 545 | centered on hand-held phone screen |
| `h2` | 收益帖下的社群码 | `humblebrag_group_qr` | 25.1, 78.1 | 10.5 x 20.5 | note | 420, 735 | centered on QR/social card |
| `h3` | 新房照后的贷款合同 | `home_photo_loan_folder` | 57.1, 77.8 | 22 x 15 | photo | 955, 732 | covers photo plus loan folder |
| `h4` | 裁掉日期的课程截止 | `ai_course_deadline` | 77.9, 68.4 | 18 x 24 | note | 1302, 644 | covers laptop course ad and deadline sticker |
| `h5` | 没发出去的祝福 | `unsent_reply_draft` | 68.9, 80.8 | 17 x 13 | chat | 1152, 760 | centered on notebook reply draft |

## Decision

- [x] Pass: image can proceed to implementation/handoff.
- [ ] Revise art: regenerate or edit the raster.
- [ ] Revise config: update hotspot centers, hit boxes, feedback, or copy.
- [ ] Blocked: needs product/design decision.

Residual risk: the six social progress states are now distinct and playable, but they are still same-layout full-scene raster states rather than clean transparent character layers. Treat this as matching the current second/third-level bitmap-state approach, not the final long-term layered asset pipeline.
