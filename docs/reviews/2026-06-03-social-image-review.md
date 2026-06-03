# social Image Review

Generated: 2026-06-03


## Config Snapshot

- Scene: `social`
- Name: 小红薯暴击夜
- Theme: ai
- Description: 凌晨一点半，周启明靠在沙发里想刷手机放松，桌上那些小角落却比首页更诚实。
- Background: /assets/game/social/states/social-progress-0.png
- Machine embedded: true
- Clue count: 8
- Required character/proxy states: 9

## Generation Brief

- [x] Theme is one sentence and specific to this level.
- [x] Scene logic explains why people and objects are in this location.
- [x] Camera and main action area are fixed before generation.
- [x] Foreground, midground, and background all have roles.
- [x] There is enough believable object density to hide clues.
- [ ] Main/proxy character has a planned visible state for each progress step. Current V5 keeps the accepted full-scene raster across progress states; layered character states remain a follow-up.
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

- [ ] Captured progress-0 screenshot.
- [ ] Captured at least one mid-progress screenshot.
- [ ] Captured completion screenshot.
- [ ] Captured mobile first-screen screenshot.
- [ ] Manually inspected screenshots in the game shell.

## Hotspot Calibration

Record source-pixel centers before converting to config percentages.

| ID | Label | Evidence | Config center | Config box | Animation | Source center | Review note |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `h1` | 手机里的收益红线 | `cropped_profit_screenshot` | 40.4, 37.7 | 5.2 x 7.4 | phone | `675, 355` | only true clue on Zhou's phone |
| `h2` | 沙发扶手草稿本 | `unsent_reply_draft` | 9.2, 72.6 | 7.8 x 8.6 | chat | `154, 683` | moved off phone to visible draft notebook |
| `h3` | 小屏上的进群弹窗 | `group_invite_popup` | 53.0, 15.9 | 8.0 x 8.0 | chat | `886, 150` | independent digital invite modal with avatar/button shape |
| `h4` | 电脑置顶评论行 | `pinned_review_comment` | 73.1, 16.0 | 9.0 x 8.5 | chat | `1222, 151` | laptop comment interface, not paper card |
| `h5` | 键盘边沙漏 | `ai_course_deadline` | 70.8, 26.2 | 5.2 x 7.2 | note | `1184, 247` | physical hourglass/timer |
| `h6` | 书堆里的彩色书签 | `side_hustle_bookmark` | 88.5, 35.1 | 5.2 x 9.2 | note | `1480, 330` | colored bookmark ribbon |
| `h7` | 照片旁还款钥匙 | `mortgage_debit_notice` | 67.3, 76.9 | 8.2 x 7.2 | contract | `1126, 724` | house key and repayment envelope near home photo |
| `h8` | 桌沿逾期红章 | `household_overdue_bill` | 66.7, 94.9 | 8.2 x 6.6 | paper | `1116, 893` | overdue stamp on bill near table edge |

## Decision

- [x] Pass: image can proceed to implementation/handoff.
- [ ] Revise art: regenerate or edit the raster.
- [ ] Revise config: update hotspot centers, hit boxes, feedback, or copy.
- [ ] Blocked: needs product/design decision.
