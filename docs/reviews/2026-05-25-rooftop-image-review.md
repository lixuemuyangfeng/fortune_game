# rooftop Image Review

Generated: 2026-05-25


> Existing review file overwritten by the latest config snapshot.

## Config Snapshot

- Scene: `rooftop`
- Name: 黄金大师天台局
- Theme: gold
- Description: 傍晚天台，刚追完黄金的人都说自己不是短线，只是每三分钟看一次价格。
- Background: /assets/game/rooftop/states/rooftop-v9-progress-0.png
- Machine embedded: true
- Clue count: 6
- Required character/proxy states: 7

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
| `h1` | 金店小票 | `gold_receipt` | 77.1, 83.6 | 5.2 x 7.2 | receipt |  |  |
| `h2` | 稳健避险交流群 | `hedge_group` | 44.1, 36.2 | 3.6 x 7.2 | chat |  |  |
| `h3` | 避险快讯截图 | `risk_headline` | 92.7, 31.2 | 6.8 x 11.2 | news |  |  |
| `h4` | 跌幅提醒手机 | `price_alarm` | 85.7, 71.9 | 3.2 x 5.2 | alert |  |  |
| `h5` | 踩线告示 | `rooftop_warning` | 33, 32.5 | 4.2 x 8.6 | sign |  |  |
| `h6` | 杠杆合同边角 | `leverage_contract` | 96.2, 76.4 | 5.2 x 8.8 | contract |  |  |

## Decision

- [ ] Pass: image can proceed to implementation/handoff.
- [ ] Revise art: regenerate or edit the raster.
- [ ] Revise config: update hotspot centers, hit boxes, feedback, or copy.
- [ ] Blocked: needs product/design decision.
