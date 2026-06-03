# social Image Review

Generated: 2026-06-02


> Existing review file overwritten by the latest config snapshot.

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
- [ ] Main/proxy character has a planned visible state for each progress step. Current V4 prioritizes clue difficulty and uses one accepted raster across progress states; strict transparent-character state production remains a follow-up.
- [x] Each clue is a concrete object with a reason to exist in the scene.
- [x] UI copy is player-facing and contains no implementation language.

## Production Prompt Contract

Fill this before generating or editing art. Do not leave it as generic intent.

```text
Use case: stylized-concept game scene raster
Scene purpose:
Late-night social-media high-light anxiety; find the costs and hidden hooks behind a feed that looks easy.
Camera/layout:
16:9 high three-quarter apartment scene, protagonist left, dense sofa/table/desk clutter across the playable field.
Foreground:
Coins, receipts, keys, cable, power strip, mugs, snack wrappers, blanket folds.
Midground:
Phone, invite card cluster, laptop/hourglass, key/envelope cluster, book stack, note wall.
Background:
Window, shelf, lamp, ordinary household dressing.
People and actions:
Zhou Qiming reclines on the sofa and scrolls at 01:30; phone faces him naturally.
Required clue objects:
Phone chart crop, unsent send corner, invite card edge, red pushpin note corner, hourglass, colored bookmark, key/envelope corner, red-stamped bill corner.
Character/proxy state:
Accepted base posture is tired and grounded. Progress-state art is not fully solved in this V4 pass.
Lighting/color:
Cold city blue at left, warm desk lamp at right, deep green/amber game palette.
Mobile readability:
Object groups remain visible, but true targets are smaller subparts inside decoy clusters.
Forbidden:
Large answer papers, direct labels, QR codes, giant phone, baked markers, sparse table, all-paper clue set.
Output/layers:
Single coherent raster for current runtime; later production should split protagonist and occluders.
```

## Layout Map

```text
Canvas:
1672 x 941 source, 16:9 scene.
Main playable area:
Sofa, blanket, table, desk, shelves, power strip.
Quiet zones for markers/callouts:
Small local markers only; no marker should cover Zhou's face or the whole phone.
Forbidden zones:
Protagonist face, hands, image edge, large whole-paper boxes.
Foreground objects:
Coins, keys, receipts, power strip, cable, mugs, tissues.
Midground objects:
Phone, invite card, laptop, hourglass, book stack, note wall.
Background objects:
Window, shelf, lamp, ordinary notes.
```

## Generation Passes

- [x] Composition pass accepted before adding detail.
- [x] Semantic pass confirms every clue has a believable object body.
- [x] Character pass confirms scale, posture, grounding, and contact shadows.
- [x] Clarity pass confirms varied clue shapes and mobile readability.
- [ ] State pass keeps camera/props fixed across progress variants. A model-generated variant drifted and was rejected; current pass uses the accepted raster for difficulty validation.
- [x] Calibration pass records source-pixel centers after final raster freeze.

## Reference Images

| Image | Role | Must preserve | Must ignore |
| --- | --- | --- | --- |
| Generated V4 raster `ig_0b7ceff6206d8450016a1ea44271d4819bac7d66de396c9885.png` | edit-target/final calibration source | camera, clutter, clue positions, color | earlier V3 markers and oversized answer papers |

## Negative Prompt Items

- [x] No oversized phones or upright phone props unless mounted as a screen.
- [x] No floating people, pipe standing, wall clipping, or missing contact shadows.
- [x] No work poses in a scene where people should gossip, rest, browse, drink, smoke, or perform another believable action.
- [x] No identical paper slips for every clue.
- [x] No unrelated safety signs used as financial/emotional clues.
- [x] No empty scenic area dominating the playable area.
- [x] No pasted character with mismatched sharpness, contrast, color temperature, rim light, or shadow.
- [x] No contact-sheet residue, extra limbs, cut-off torsos, or green-screen fringe.
- [x] No baked-in answer markers or labels that spoil clues.

## Edit Strategy

- [x] Use local edit for small object, scale, clutter, palette, or hotspot fixes.
- [x] Use full regeneration only for failed camera, failed premise, sparse layout, or unrecoverable clue distribution.
- [x] If progress states drift, edit from the accepted base instead of generating unrelated variants. The first progress variant drifted into old marker behavior and was rejected.

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
- [ ] All progress states show readable body-language or expression changes. Not solved in this pass; requires transparent protagonist/state asset pass.
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

- [ ] Captured progress-0 screenshot.
- [ ] Captured at least one mid-progress screenshot.
- [ ] Captured completion screenshot.
- [ ] Captured mobile first-screen screenshot.
- [ ] Manually inspected screenshots in the game shell.

## Hotspot Calibration

Record source-pixel centers before converting to config percentages.

| ID | Label | Evidence | Config center | Config box | Animation | Source center | Review note |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `h1` | 手机红线裁边 | `cropped_profit_screenshot` | 39.5, 40.7 | 4.4 x 5.4 | phone | `660, 383` | moved from phone notch area to red chart middle |
| `h2` | 没按下的发送角 | `unsent_reply_draft` | 39.5, 45.5 | 3.8 x 3.8 | chat | `660, 428` | moved down to bottom send/input corner only |
| `h3` | 毯边进群卡 | `group_invite_popup` | 41.9, 54.6 | 6.2 x 5.8 | chat | `700, 514` | card edge inside blanket/card cluster |
| `h4` | 便签墙红图钉 | `pinned_review_comment` | 71.9, 12.5 | 4.6 x 5.8 | chat | `1202, 118` | red pin and folded note corner |
| `h5` | 键盘边沙漏 | `ai_course_deadline` | 72.4, 34.6 | 5.4 x 7.0 | note | `1210, 326` | small hourglass/timer area |
| `h6` | 书堆里的彩色书签 | `side_hustle_bookmark` | 86.4, 45.0 | 4.8 x 8.2 | note | `1445, 423` | colored ribbon among other book tabs |
| `h7` | 钥匙压住的信封角 | `mortgage_debit_notice` | 54.4, 71.7 | 6.6 x 6.8 | contract | `910, 675` | key tooth plus envelope corner |
| `h8` | 插排旁红章纸角 | `household_overdue_bill` | 82.4, 72.3 | 6.0 x 7.4 | paper | `1378, 680` | red-stamped bill corner near power strip |

## Decision

- [x] Pass: image can proceed to implementation/handoff for difficulty/hotspot validation.
- [ ] Revise art: regenerate or edit the raster.
- [ ] Revise config: update hotspot centers, hit boxes, feedback, or copy.
- [ ] Blocked: needs product/design decision.
