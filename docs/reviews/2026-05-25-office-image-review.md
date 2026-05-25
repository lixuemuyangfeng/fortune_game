# office Image Review

Generated: 2026-05-25


## Config Snapshot

- Scene: `office`
- Name: 键盘声变轻了
- Theme: gold
- Description: 字节跳桶下午三点二十七，工位还在，人已经被行情和弹窗偷走了。
- Background: /assets/office-level/office-raster-v2.png
- Machine embedded: true
- Clue count: 5
- Required character/proxy states: 6

## Generation Brief

- [ ] Theme is one sentence and specific to this level.
- [ ] Scene logic explains why people and objects are in this location.
- [ ] Camera and main action area are fixed before generation.
- [ ] Foreground, midground, and background all have roles.
- [ ] There is enough believable object density to hide clues.
- [ ] Main/proxy character has a planned visible state for each progress step.
- [ ] Each clue is a concrete object with a reason to exist in the scene.
- [ ] UI copy is player-facing and contains no implementation language.

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
| `h1` | 亏损曲线 | `fund_loss` | 37, 58 | 27 x 19 | kline |  |  |
| `h2` | owner 意识消息 | `boss_mail` | 80.5, 36.2 | 24 x 25 | chat |  |  |
| `h3` | 金价手机 | `phone_gold` | 15.7, 47.2 | 11.5 x 27 | goldLine |  |  |
| `h4` | 花呗便利贴 | `debt_note` | 27, 71.8 | 11 x 12 | paper |  |  |
| `h5` | 刮刮泪 | `lottery_ticket` | 42.2, 88.2 | 19 x 13 | scratch |  |  |

## Decision

- [ ] Pass: image can proceed to implementation/handoff.
- [ ] Revise art: regenerate or edit the raster.
- [ ] Revise config: update hotspot centers, hit boxes, feedback, or copy.
- [ ] Blocked: needs product/design decision.
