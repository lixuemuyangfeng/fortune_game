# nest Image Review

Generated: 2026-06-04


## Config Snapshot

- Scene: `nest`
- Name: 暴富噪声母巢
- Theme: ai
- Description: 地下室里，前六关的噪声被重新接线，等着再把人拖回同一个循环。
- Background: /assets/game/nest/states/nest-progress-0.png
- Machine embedded: true
- Clue count: 12
- Required character/proxy states: 13

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
Scene purpose: final level where the previous six wealth-noise systems are classified and dismantled.
Camera/layout: fixed 16:9 basement salvage room with foreground sorting table, midground Zhou/crusher, background shelves and pipe wall.
Foreground: burned receipts, scratch-ticket roll, stop token, shield tags, photo box, lenses, toy-car crate.
Midground: Zhou operating the crusher, cracked keyboard, market paper, mother-nest device, pipe valves.
Background: AI course screen/timer, shelves, cable tags, folder chutes, lock tags.
People and actions: Zhou is focused and operating the dismantling process, not being passively attacked.
Required clue objects: six source relics and six counter-tags from the campaign finale.
Character/proxy state: V2 runtime uses a clean background plus independent Zhou state composites from progress-0 through progress-12.
Lighting/color: dark green/gold basement industrial light with coherent metal/paper/glass materials.
Mobile readability: object clusters remain visible in intro; search is primarily desktop/landscape.
Forbidden: large answer labels, red boxes, numbers, baked markers, all-paper clues, pasted character.
Output/layers: coherent full-scene raster; future final should split character/proxy states.
```

## Layout Map

```text
Canvas: 1280 x 720 runtime raster from a generated source.
Main playable area: sorting table, mother-nest crusher, pipe wall, left AI bench, right toy-car crate.
Quiet zones for markers/callouts: local object clusters only.
Forbidden zones: Zhou's face/hands, central crusher mouth, screen borders.
Foreground objects: receipts, ticket roll, tags, lenses, photo box, toy cars.
Midground objects: Zhou, keyboard, market paper, machine controls, pipe valves.
Background objects: laptop/timer, shelves, hanging tags, folder chutes.
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
| `h1` | 碎键盘行情芯 | `nest_office_noise_core` | 56.8, 48.7 | 7.5 x 12.0 | kline | 727, 351 | Market mini-screen/chart paper; moved off Zhou's body. |
| `h2` | 半焦金店小票 | `nest_gold_receipt_heat` | 12.0, 67.9 | 14.0 x 15.0 | receipt | 154, 489 | Burned receipt cluster. |
| `h3` | 连环差一点票卷 | `nest_lottery_near_miss_roll` | 31.6, 71.4 | 10.0 x 14.0 | ticket | 404, 514 | Ticket roll body; separated from h9. |
| `h4` | 高光滤镜碎片 | `nest_social_filter_shard` | 49.2, 72.9 | 7.0 x 14.0 | photo | 630, 525 | Lens/photo shard near Zhou's feet. |
| `h5` | 恐慌课程计时器 | `nest_ai_panic_meter` | 17.6, 31.9 | 18.0 x 17.0 | alert | 225, 230 | Timer/screen cluster. |
| `h6` | 甩锅管阀 | `nest_meeting_blame_pipe` | 78.1, 46.7 | 20.0 x 20.0 | contract | 1000, 336 | Folder-to-pipe relation. |
| `h7` | 不上车金属牌 | `tag_not_every_car` | 87.1, 84.3 | 13.0 x 14.0 | sign | 1115, 607 | Car/ramp tag. |
| `h8` | 裂盾策略牌 | `tag_stubborn_not_strategy` | 27.0, 85.7 | 11.0 x 12.0 | goldLine | 346, 617 | Shield tag. |
| `h9` | 止损停牌 | `tag_near_miss_not_next` | 40.6, 82.5 | 8.0 x 9.0 | scratch | 520, 594 | Stop token; no longer overlaps h3. |
| `h10` | 可发布画框 | `tag_publishable_version` | 58.7, 72.5 | 7.0 x 14.0 | photo | 751, 522 | Film-frame tag; separated from h4. |
| `h11` | 恐慌价签 | `tag_panic_sellers_profit` | 12.6, 44.0 | 4.5 x 8.0 | note | 161, 317 | Left cable hanging price tag. |
| `h12` | 流程封签 | `tag_no_resource_blame` | 90.6, 36.5 | 7.5 x 12.0 | contract | 1160, 263 | Process seal/lock on right pipe row. |

## Decision

- [x] Pass: image can proceed to implementation/handoff.
- [ ] Revise art: regenerate or edit the raster.
- [x] Revise config: update hotspot centers, hit boxes, feedback, or copy.
- [ ] Blocked: needs product/design decision.

## Review Notes

- The first generated candidate had too many readable labels. It was rejected before integration. The accepted candidate uses more icon/object-based evidence.
- Playwright initially found h3/h9 overlap around the lottery ticket roll and stop tag. h3 was narrowed to the ticket-roll body and h9 was narrowed/moved to the stop token before the final e2e pass.
- 2026-06-15 V2 update: replaced the old same-scene state set with clean-background plus independent Zhou state composites, recalibrated h1/h11/h12, regenerated `artifacts/visual-qa/nest`, and passed `npm run visual:gate -- nest` with screenshot-backed per-hotspot evidence.
