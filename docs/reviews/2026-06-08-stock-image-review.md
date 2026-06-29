# stock Image Review

Generated: 2026-06-08


## Config Snapshot

- Scene: `stock`
- Name: 暴涨榜深夜场
- Theme: stock
- Description: 周启明本来已经拆掉母巢，深夜又被一张 2026 暴涨榜拽回屏幕前。
- Background: /assets/game/stock/states/stock-progress-0.png
- Machine embedded: true
- Clue count: 13
- Required character/proxy states: 14

## Current Review Result

Result: V4 bottom-image semantic repair and 14-state runtime candidate integrated; final user approval still pending.

The current runtime uses `public/assets/game/stock/source/stock-base-v4-semantic-1280.png` for `stock-progress-0.png`, the same-scene edit `stock-progress-6-v4-semantic-1280.png` for the mid-state anchor, and `stock-progress-13-v4-semantic-1280.png` for the completion state. Intermediate `progress-1..5` and `progress-7..12` are controlled blends between those anchors to keep the clue field stable while making Zhou Qiming visibly cool down. V4 redraws the bottom image around object relationships instead of the earlier right-tablet/monitor overload: the trading phone is now desk-scale, the monitor chart is a subpart rather than the answer row, the cropped gain screenshot and calculator receipt are separate, and the risk disclosure, house-photo/key cluster, notebook arrow, simulation tablet, and digital chat device have clearer semantic bodies.

The first built-in edit attempt for `progress-1` drifted the scene layout and was rejected. The accepted state route instead uses V4 same-scene anchors plus controlled blends; `npm test` and `npm run art:gate` now pass, and the contact sheet shows readable posture/expression movement from `progress-0` through `progress-13`.

Blocking findings:

- A new integrated base candidate was generated successfully after reducing prompt complexity: `public/assets/game/stock/source/stock-base-v2-generated.png`.
- The project-size crop is `public/assets/game/stock/source/stock-base-v2-1280.png`.
- The new base fixes the major collage/pasted-panel issue: Zhou, desk clutter, stock screen, bills, keys, risk disclosure, chat screen, calculator, and decoys share one coherent camera and lighting setup.
- The V4 base candidate exists at `public/assets/game/stock/source/stock-base-v4-semantic-1280.png` and is now used by runtime for stable clue positions.
- The V4 completion-state candidate exists at `public/assets/game/stock/source/stock-progress-13-v4-semantic-1280.png` and is now used for `progress-13`.
- `stock-progress-1..12.png` are now distinct runtime states. `progress-6` is a same-scene edit anchor; the other intermediate states are controlled blends that avoid clue-object drift while preserving a readable character-state arc.
- The base still needs user visual approval: several stock/finance surfaces are intentionally readable decoys, and the accepted difficulty depends on object density plus calibrated subpart targets rather than hiding everything in text.
- The old WIP source-pixel centers were discarded; current centers are recorded in `docs/stock-hotspot-calibration.md`.
- A completion-state candidate was generated successfully: `public/assets/game/stock/source/stock-progress-13-v4-semantic-1280.png`. It improves Zhou's body language without moving the clue field enough to invalidate the final posture direction.
- 2026-06-09 follow-up: `stock-progress-1..12-v2-1280.png` candidates were generated and copied into `public/assets/game/stock/source/`, so the level now has a full 0..13 candidate state set.
- The current contact sheet is `artifacts/stock-state-contact-sheet.jpg`. Runtime screenshots are `artifacts/playtest-stock-v4-mid-progress.png` and `artifacts/playtest-stock-v4-complete.png`.

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
Scene purpose: Late-night stock heatlist anxiety; past涨幅 and social proof tempt Zhou Qiming while bills, risk materials, and leverage traps should slow him down.
Camera/layout: fixed 16:9 game raster, cramped home study, desk-level perspective, main action on the midground desk rather than a clean dashboard.
Foreground: ordinary bills, keys, receipts, cables, cup, tissues, snacks, pens, calculator, and decoy paper clutter.
Midground: Zhou Qiming near the desk, one active phone/device near his hand, monitor/laptop with heatlist content, notebook and household paperwork clusters.
Background: night window, bookshelf, calendar, storage boxes, old documents; atmosphere only, not the main clue area.
People and actions: Zhou is alone, tired, tense, pulled toward the heatlist but surrounded by evidence of real-life consequences.
Required clue objects: highlighted heatlist row, cropped multi-year gain screenshot, red-arrow notebook chart, percentage sticky/tab, broker/news push, 20cm slip near calculator, screen-inward phone held in hand, simulation full-position worksheet/tablet, chat invite bubble on a real screen, dragon-tiger clipping, house-photo/mortgage math with keys, covered risk-disclosure corner, heatlist push notification.
Character/proxy state: stock-progress-0..13 with fixed camera and visible expression/posture cooling down after each clue.
Lighting/color: dark green/gold game identity, cool night window, warm desk lamp, mixed paper/metal/glass/skin contrast.
Mobile readability: objects must have recognizable silhouettes at game size; text is secondary and short.
Forbidden: local-composite collage, giant dashboards, giant phones, paper cards for digital behavior, answer labels, empty desk dominance, pasted character edges, unreadable tiny-text-only clues.
Output/layers: final integrated raster set or clean background + independent character states + optional foreground occluder; WIP composite states are not final.
```

## Layout Map

```text
Canvas: 1280 x 720 source equivalent, 16:9.
Main playable area: desk surface, Zhou's device hand, monitor/laptop, notebook/paper clusters, right-side household paperwork.
Quiet zones for markers/callouts: small gaps around clue clusters only; no marker should cover Zhou's face or the main phone screen.
Forbidden zones: Zhou's eyes/mouth, hand grip edges, monitor bezel edges, screen crop edges, and any large whole-paper target when a subpart is the real clue.
Foreground objects: bills, keys, receipts, cup, tissue, cables, calculator, snacks, ordinary decoy notes.
Midground objects: Zhou, active phone, monitor heatlist, notebook chart, broker/chat devices, risk disclosure and mortgage paperwork.
Background objects: night window, shelves, storage, calendar, old books, dim room clutter.
```

## Generation Passes

- [x] Composition pass accepted before adding detail.
- [x] Semantic pass confirms every clue has a believable object body.
- [x] Character pass confirms scale, posture, grounding, and contact shadows.
- [x] Clarity pass confirms varied clue shapes and desktop readability.
- [x] State pass has a full same-camera `progress-0..13` runtime candidate set.
- [x] Calibration pass records runtime source-pixel centers after V4 raster freeze.

## Reference Images

| Image | Role | Must preserve | Must ignore |
| --- | --- | --- | --- |
| `public/assets/game/stock/source/stock-base-v4-semantic-1280.png` | accepted V4 base candidate | coherent room, desk-scale phone, distributed clue bodies, character scale | final user sign-off |
| `public/assets/game/stock/source/stock-progress-6-v4-semantic-1280.png` | mid-state anchor | hand leaves temple, gaze starts dropping, clue field stays stable | treating it as a new calibration base |
| `public/assets/game/stock/source/stock-progress-13-v4-semantic-1280.png` | completion-state anchor | cooled-down Zhou posture and expression | clue-object drift unless reviewed in runtime |
| `artifacts/stock-state-contact-sheet.jpg` | state review artifact | V4 stress-to-cooldown arc | source-pixel calibration |

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

- [x] Every hotspot center is measured from current V4 runtime pixels.
- [x] Found marker lands on the object center or meaningful subpart in the Playwright path.
- [x] Hit animation stays inside or close to the object.
- [x] Hint and found states do not cover neighboring clues or character faces in reviewed desktop screenshots.

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
| `h1` | 走势诱饵光斑 | `stock_top_row_highlight` | 70.3, 29.9 | 12.0 x 12.0 | kline | 900, 215 | main monitor chart glow, not the rank row itself; tightened after visual QA oversized-hotspot finding |
| `h2` | 桌边涨幅截图 | `stock_seven_hundred_card` | 26.7, 76.5 | 13.0 x 15.0 | kline | 342, 551 | cropped gain screenshot mixed into calculator-side receipts |
| `h3` | 红箭头笔记本 | `stock_three_bagger_note` | 49.0, 56.8 | 9.0 x 7.0 | note | 627, 409 | notebook chart/arrow relation, narrowed away from ordinary-note decoy |
| `h4` | 压账单黄便签 | `stock_five_times_sticky` | 49.0, 62.8 | 8.0 x 6.0 | note | 627, 452 | small sticky tab near bill pressure; separated from h10 after runtime click QA |
| `h5` | 风险消息红点 | `stock_limit_up_notice` | 88.4, 45.5 | 10.0 x 5.0 | alert | 1132, 328 | top subpart of right-side digital message device; separated from h9 access zone |
| `h6` | 计算器旁小票 | `stock_twenty_cm_card` | 14.0, 76.0 | 12.0 x 10.0 | receipt | 179, 547 | calculator-side slip/receipt cluster; tightened after visual QA oversized-hotspot finding |
| `h7` | 桌面的下单屏幕 | `stock_broker_margin_phone` | 33.8, 74.9 | 7.0 x 16.0 | phone | 433, 539 | desk phone with trading UI, normal scale |
| `h8` | 模拟曲线盒 | `stock_simulation_full_position` | 71.5, 52.5 | 12.0 x 10.0 | kline | 915, 378 | separate green simulation tablet, narrowed away from mug/sticky decoys |
| `h9` | 荐股群入口卡 | `stock_recommend_group_card` | 88.8, 51.8 | 10.0 x 5.0 | chat | 1137, 373 | lower chat/group subpart of right-side digital device; separated from h5 access zone |
| `h10` | 财经快讯报纸 | `stock_dragon_tiger_clip` | 58.2, 66.6 | 10.0 x 7.0 | news | 745, 480 | news clipping under/near mug and house papers; narrowed so it no longer eats h4 clicks |
| `h11` | 房照钥匙账本 | `stock_sell_house_sheet` | 56.5, 81.8 | 10.0 x 14.0 | contract | 723, 589 | house photo plus keys cluster, narrowed away from pen decoys |
| `h12` | 风险揭示折角 | `stock_risk_disclosure_corner` | 80.8, 79.3 | 12.0 x 10.0 | paper | 1034, 571 | folded risk disclosure under metal weight; tightened after visual QA oversized-hotspot finding |
| `h13` | 热榜催促红点 | `stock_heat_push_phone` | 80.0, 16.9 | 3.8 x 3.8 | phone | 1024, 122 | tiny urgency badge on main monitor |

## Decision

- [x] Pass: V4 bottom image can proceed as runtime candidate.
- [x] Revise art: reduce obvious text-click difficulty before runtime replacement.
- [x] Revise art: generate same-camera `progress-1..12` character states.
- [x] Revise config: update hotspot centers, hit boxes, feedback, or copy.
- [ ] Blocked: needs successful integrated raster generation or an explicitly approved external/CLI image path.
