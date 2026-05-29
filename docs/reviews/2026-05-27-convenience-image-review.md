# convenience Image Review

Generated: 2026-05-27


## Config Snapshot

- Scene: `convenience`
- Name: 刮刮泪便利站
- Theme: lottery
- Description: 公司楼下的便利站亮着冷光，周启明本来只想买无糖茶，柜台却把差一点摆成一整排。
- Background: /assets/game/convenience/states/convenience-progress-0.png
- Machine embedded: true
- Clue count: 7
- Required character/proxy states: 8

## Generation Brief

- [ ] Theme is one sentence and specific to this level.
- [ ] Scene logic explains why people and objects are in this location.
- [ ] Camera and main action area are fixed before generation.
- [ ] Foreground, midground, and background all have roles.
- [ ] There is enough believable object density to hide clues.
- [ ] Main/proxy character has a planned visible state for each progress step.
- [ ] Each clue is a concrete object with a reason to exist in the scene.
- [ ] UI copy is player-facing and contains no implementation language.

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
| `h1` | 中间那张刮花废票 | `near_miss_tickets` | 46.2, 82.8 | 7.2 x 13 | scratch | 772, 779 | Target is the distinct bent middle ticket, not the whole row. |
| `h2` | 遮金额中奖合影 | `covered_winner_photo` | 81.1, 25.9 | 10 x 8.2 | photo | 1356, 244 | Target is the taped amount strip inside the frame. |
| `h3` | 付款码旁加购贴 | `payment_addon_prompt` | 77.7, 68.1 | 5.4 x 13.8 | note | 1299, 641 | Target is the blue checkout-side add-on/payment sign, tightened after crop review. |
| `h4` | 西装内袋废票 | `pocket_losing_ticket` | 52.6, 34.6 | 4.2 x 8.2 | ticket | 879, 326 | Target is the pocket ticket protruding from the jacket. |
| `h5` | 柜台这本快了牌 | `almost_due_note` | 65.6, 67.2 | 8 x 8.8 | note | 1097, 632 | Target is the worn tag beside the booklet. |
| `h6` | 老板娘指的彩票本 | `lottery_booklet` | 49.6, 65.1 | 18.6 x 10.8 | ticket | 829, 613 | Target is the booklet under the shopkeeper's finger. |
| `h7` | 最高奖金立牌 | `max_prize_stand` | 88.3, 47.0 | 11.2 x 9.8 | photo | 1476, 442 | Target is the maximum-prize strip, not the whole ticket rack. |

## Decision

- [x] Pass: image can proceed to implementation/handoff for clue-object semantics and hotspot recalibration.
- [ ] Revise art: regenerate or edit the raster.
- [ ] Revise config: update hotspot centers, hit boxes, feedback, or copy.
- [ ] Blocked: needs product/design decision.

Residual risk: `payment_addon_prompt` is still a small object in the current raster. Runtime feedback now uses localized scan/glow instead of plain text stamps, but the object itself should be visually strengthened in the next art pass if it remains too subtle on mobile.
