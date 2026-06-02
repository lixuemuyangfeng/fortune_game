# social Image Review

Generated: 2026-06-02


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

- Decision: pass after V3 rebuild.
- Reason: the level no longer relies on clicking every text block. The main clue bodies are object states or object relationships: thumb-cropped chart, unpressed send strip, invite card, pinned note, laptop countdown/hourglass, bookmark stack, house key plus repayment envelope, and utility envelope beside a power strip.
- Difficulty note: 8 config-level decoys are present and shared by DOM accessibility and Phaser interaction layers, so ordinary clutter can be clicked without advancing progress.
- Visual QA: Playwright and manual browser checks confirmed that three decoy clicks kept progress at `0/8`, while four real clues advanced to `4/8` with local found markers on the intended objects.
- Remaining risk: the progress states remain full-scene raster variants instead of layered character assets, consistent with the current second/third-level production phase.

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
| `h1` | 手机上半截红线 | `cropped_profit_screenshot` | 38.2, 35.1 | 8 x 13.5 | phone | `639, 330` | thumb/screen crop hides principal area |
| `h2` | 屏幕底部那句话 | `unsent_reply_draft` | 38.2, 42 | 7.8 x 5.4 | chat | `639, 395` | unpressed phone input/send strip |
| `h3` | 被顺手接上的邀请 | `group_invite_popup` | 43.2, 56.7 | 12 x 9.5 | chat | `722, 534` | invite card tucked into blanket |
| `h4` | 被顶到最前的评论 | `pinned_review_comment` | 55.9, 65.2 | 10.8 x 15 | chat | `934, 614` | pinned note with red pushpin |
| `h5` | 电脑上的今晚截止 | `ai_course_deadline` | 69.8, 29.5 | 16 x 18 | note | `1167, 278` | laptop countdown plus hourglass |
| `h6` | 右侧没关的收藏页 | `side_hustle_bookmark` | 88.6, 39.3 | 8.5 x 20 | note | `1481, 370` | side bookmark/course stack |
| `h7` | 相片旁的扣款纸 | `mortgage_debit_notice` | 67.5, 74.2 | 12 x 15 | contract | `1129, 698` | key and repayment envelope |
| `h8` | 插座边的催缴单 | `household_overdue_bill` | 85.8, 79.5 | 15.5 x 17.5 | paper | `1434, 748` | utility envelope near power strip |

## Decision

- [x] Pass: image can proceed to implementation/handoff.
- [ ] Revise art: regenerate or edit the raster.
- [ ] Revise config: update hotspot centers, hit boxes, feedback, or copy.
- [ ] Blocked: needs product/design decision.
