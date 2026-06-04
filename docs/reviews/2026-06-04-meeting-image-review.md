# meeting Image Review

Generated: 2026-06-04


## Config Snapshot

- Scene: `meeting`
- Name: 邢总画饼复盘会
- Theme: ai
- Description: 早上九点，会议室里写满成长机会，桌上的表单却把资源和风险都推回周启明这边。
- Background: /assets/game/meeting/states/meeting-progress-0.png
- Machine embedded: true
- Clue count: 10
- Required character/proxy states: 11

## Generation Brief

- [x] Theme is one sentence and specific to this level.
- [x] Scene logic explains why people and objects are in this location.
- [x] Camera and main action area are fixed before generation.
- [x] Foreground, midground, and background all have roles.
- [x] There is enough believable object density to hide clues.
- [ ] Main/proxy character has a planned visible state for each progress step.
- [x] Each clue is a concrete object with a reason to exist in the scene.
- [x] UI copy is player-facing and contains no implementation language.

## Production Prompt Contract

Fill this before generating or editing art. Do not leave it as generic intent.

```text
Use case: stylized-concept game scene raster
Scene purpose:
Scene purpose: corporate blame shifting disguised as a growth opportunity after a review meeting.
Camera/layout: fixed 16:9 glass meeting room, table-driven hidden-object composition.
Foreground: calendar, crossed risk memo, action tracker, budget folder/lock, calculator, chart, coffee, papers.
Midground: Zhou Qiming at the table, name cards, laptop, whiteboard, rejected headcount form on empty chair.
Background: boss leaving through glass door, office floor, projector slide, whiteboard.
People and actions: Zhou is tired and writing notes; the boss has already left after pointing at the opportunity slide.
Required clue objects: empty resource slide boxes, Zhou owner nameplate, crossed risk memo, action tracker, target/budget chart, rejected headcount form, Friday calendar/cold coffee, laser pointer, locked budget folder, whiteboard risk notes.
Character/proxy state: playable WIP uses same-camera state rasters; final pass needs true posture/expression redraws.
Lighting/color: deep green/warm gold office palette with cool projector light.
Mobile readability: clue objects must be visible as object clusters, not only as small text.
Forbidden: click-all-text solution, giant labels, red boxes, baked markers, pasted characters, all clues as paper slips.
Output/layers: coherent full-scene raster; future final should split character/proxy states.
```

## Layout Map

```text
Canvas: 1280 x 720 runtime raster from a 1672 x 941 generated source.
Main playable area: table, screen, whiteboard, empty-chair form, and foreground paperwork.
Quiet zones for markers/callouts: local object areas only; no global answer overlays.
Forbidden zones: Zhou's face/hands and the boss silhouette.
Foreground objects: calendar/cup, risk memo, action tracker, target chart, locked folder, calculator.
Midground objects: name cards, laptop, rejected form, whiteboard pinned sheets.
Background objects: projector slide, glass door, leaving boss, office floor.
```

## Generation Passes

- [x] Composition pass accepted before adding detail.
- [x] Semantic pass confirms every clue has a believable object body.
- [x] Character pass confirms scale, posture, grounding, and contact shadows.
- [x] Clarity pass confirms varied clue shapes and mobile readability.
- [ ] State pass keeps camera/props fixed across progress variants.
- [x] Calibration pass records source-pixel centers after final raster freeze.

## Reference Images

| Image | Role | Must preserve | Must ignore |
| --- | --- | --- | --- |
|  | style/layout/character/edit-target/insert-object |  |  |

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
- [ ] All progress states show readable body-language or expression changes.
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
| `h1` | 空着的资源协同格 | `empty_resource_collab_slide` | 88.7, 22.9 | 17.0 x 15.0 | kline | 1135, 165 | Empty support/resource boxes on projector. |
| `h2` | 周启明负责人牌 | `zhou_owner_nameplate` | 50.0, 59.7 | 8.0 x 8.0 | contract | 640, 430 | Zhou's table tent among other name cards. |
| `h3` | 红叉风险页 | `crossed_out_risk_page` | 28.9, 72.6 | 14.0 x 13.0 | news | 370, 523 | Red-X risk memo in the paper cluster. |
| `h4` | 行动跟踪表 | `scope_creep_action_sheet` | 37.5, 74.3 | 15.0 x 17.0 | paper | 480, 535 | Expanded action tracker clipboard. |
| `h5` | 目标预算剪刀差 | `target_budget_gap_chart` | 53.5, 71.1 | 15.0 x 14.0 | kline | 685, 512 | Target/budget chart near calculator. |
| `h6` | 人头申请不通过 | `rejected_headcount_form` | 83.6, 51.0 | 13.0 x 20.0 | receipt | 1070, 367 | Rejected form clipped to empty chair. |
| `h7` | 周五截止日历 | `friday_deadline_calendar` | 12.5, 77.2 | 17.0 x 17.0 | note | 160, 556 | Calendar/cold coffee deadline cluster. |
| `h8` | 机会激光笔 | `opportunity_laser_pointer` | 64.5, 24.3 | 13.0 x 20.0 | alert | 826, 175 | Laser pointer relation on the screen. |
| `h9` | 预算锁盒 | `budget_locked_folder` | 71.9, 81.4 | 20.0 x 20.0 | contract | 920, 586 | Lock/folder cluster on right table. |
| `h10` | 白板淡掉的风险 | `erased_whiteboard_risk` | 43.8, 23.6 | 14.0 x 20.0 | sign | 560, 170 | Whiteboard risk cluster; moved right/narrowed after screenshot QA to avoid Zhou's face. |

## Decision

- [ ] Pass: image can proceed to implementation/handoff.
- [ ] Revise art: regenerate or edit the raster.
- [x] Revise config: update hotspot centers, hit boxes, feedback, or copy.
- [ ] Blocked: needs product/design decision.

## Review Notes

- The first meeting image was rejected by self-review because the fastest path was close to "click all text/table blocks".
- The replacement image improves scene logic and clue form: boss leaving, Zhou at the table, empty support boxes, name-card cluster, red-X paper, action tracker, rejected form on empty chair, Friday calendar/cold coffee, pointer, chart/calculator, and locked budget folder.
- Desktop screenshot QA found the original whiteboard target too close to Zhou's face; h10 was moved right and narrowed, then the meeting Playwright flow was rerun successfully.
- Remaining risk: progress states are mechanically derived same-scene rasters rather than true posture/expression variants. Do not call these final production character states.
- Remaining risk: several clues still include Chinese text because the meeting-room premise naturally uses forms/slides. Runtime review must confirm the answer is not obvious by text alone.
