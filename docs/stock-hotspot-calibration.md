# Stock Hotspot Calibration

Scene: `stock`

Status: V4 runtime candidate. The current config coordinates belong to the V4 state set under `public/assets/game/stock/states/`. `stock-progress-0.png` comes from `stock-base-v4-semantic-1280.png`; `stock-progress-6.png` comes from the same-scene edit candidate `stock-progress-6-v4-semantic-1280.png`; `stock-progress-13.png` uses `stock-progress-13-v4-semantic-1280.png`; the remaining intermediate states are controlled blends between those anchors.

This is a runtime candidate, not final user sign-off. The state set now passes the distinct-state gate and shows a readable stress-to-cooldown arc in `artifacts/stock-state-contact-sheet.jpg`, while preserving clue positions for play.

2026-06-09 update: `stock-base-v2-1280.png` and `stock-progress-1..13-v2-1280.png` now exist under `public/assets/game/stock/source/` as the integrated source candidate set. They have been copied into runtime state assets and recalibrated from the V2 image.

Do not reuse these centers for a regenerated or inpainted stock scene. Once final art exists:

1. Freeze `stock-progress-0.png` or the accepted clean base.
2. Measure every clue center in source pixels.
3. Record object box, center, and semantic subpart below.
4. Convert to config percentages.
5. Verify markers through Playwright screenshots after actual clicks and hints.

## Current Runtime Coordinates

Assumed source size: 1280 x 720.

| ID | Label | Evidence | Source center | Config center | Box | Review status |
| --- | --- | --- | --- | --- | --- | --- |
| h1 | 走势诱饵光斑 | `stock_top_row_highlight` | 900, 215 | 70.3, 29.9 | 12.0 x 12.0 | Main monitor chart glow, not the rank row itself; tightened after visual QA oversized-hotspot finding. |
| h2 | 桌边涨幅截图 | `stock_seven_hundred_card` | 342, 551 | 26.7, 76.5 | 13.0 x 15.0 | Cropped gain screenshot mixed into calculator-side receipts. |
| h3 | 红箭头笔记本 | `stock_three_bagger_note` | 627, 409 | 49.0, 56.8 | 9.0 x 7.0 | Notebook chart/arrow relation, narrowed away from ordinary-note decoy. |
| h4 | 压账单黄便签 | `stock_five_times_sticky` | 627, 452 | 49.0, 62.8 | 8.0 x 6.0 | Small sticky tab half tucked near bill pressure; separated from h10 after runtime click QA. |
| h5 | 风险消息红点 | `stock_limit_up_notice` | 1132, 328 | 88.4, 45.5 | 10.0 x 5.0 | Top subpart of the right-side digital message device; separated from h9 access zone. |
| h6 | 计算器旁小票 | `stock_twenty_cm_card` | 179, 547 | 14.0, 76.0 | 12.0 x 10.0 | Calculator-side slip/receipt cluster; tightened after visual QA oversized-hotspot finding. |
| h7 | 桌面的下单屏幕 | `stock_broker_margin_phone` | 433, 539 | 33.8, 74.9 | 7.0 x 16.0 | Desk phone with trading UI, normal human scale. |
| h8 | 模拟曲线盒 | `stock_simulation_full_position` | 915, 378 | 71.5, 52.5 | 12.0 x 10.0 | Separate green simulation tablet, narrowed away from mug/sticky decoys. |
| h9 | 荐股群入口卡 | `stock_recommend_group_card` | 1137, 373 | 88.8, 51.8 | 10.0 x 5.0 | Lower chat/group subpart of the right-side digital device; separated from h5 access zone. |
| h10 | 财经快讯报纸 | `stock_dragon_tiger_clip` | 745, 480 | 58.2, 66.6 | 10.0 x 7.0 | News clipping under/near mug and house papers; narrowed so it no longer eats h4 clicks. |
| h11 | 房照钥匙账本 | `stock_sell_house_sheet` | 723, 589 | 56.5, 81.8 | 10.0 x 14.0 | House photo plus keys cluster, narrowed away from pen decoys. |
| h12 | 风险揭示折角 | `stock_risk_disclosure_corner` | 1034, 571 | 80.8, 79.3 | 12.0 x 10.0 | Folded risk disclosure under metal weight; tightened after visual QA oversized-hotspot finding. |
| h13 | 热榜催促红点 | `stock_heat_push_phone` | 1024, 122 | 80.0, 16.9 | 3.8 x 3.8 | Tiny urgency badge on main monitor. |

## V2 Candidate Object Centers

Source image: `public/assets/game/stock/source/stock-base-v2-1280.png`

Status: candidate only. These centers are measured from the coordinate-grid QA image `artifacts/stock-v2-base-grid.png` and need final review in Phaser screenshots before runtime adoption.

| ID | Current evidence id | Proposed visible object | Source center | Config center | Proposed box | Semantic note |
| --- | --- | --- | --- | --- | --- | --- |
| h1 | `stock_top_row_highlight` | red-highlighted first row on the heatlist monitor | 805, 138 | 62.9, 19.2 | 26.0 x 7.0 | Past涨幅 is already selected before any research. |
| h2 | `stock_seven_hundred_card` | second high-gain row cluster on monitor, not a separate card | 800, 166 | 62.5, 23.1 | 22.0 x 6.5 | Needs evidence copy rename if kept; current `700%截图卡` is not visible enough. |
| h3 | `stock_three_bagger_note` | red-arrow chart in the open notebook | 690, 452 | 53.9, 62.8 | 18.0 x 15.0 | Object relation is clear: hand-written chart turns past line into plan. |
| h4 | `stock_five_times_sticky` | small yellow sticky/marker beside the notebook and bills | 765, 505 | 59.8, 70.1 | 8.0 x 7.0 | Needs label/copy rewrite; visible object is a pressure tab, not five-times text. |
| h5 | `stock_limit_up_notice` | right chat tablet notification bubble | 1085, 315 | 84.8, 43.8 | 16.0 x 14.0 | Digital notification is plausible and visible. |
| h6 | `stock_twenty_cm_card` | calculator/receipt cluster in the lower-left desk | 445, 610 | 34.8, 84.7 | 15.0 x 14.0 | Needs evidence copy rewrite; not clearly `20cm`. |
| h7 | `stock_broker_margin_phone` | phone held in Zhou's hand with the screen turned inward, only the dark back visible to the player | 525, 356 | 41.0, 49.4 | 9.0 x 15.0 | Strong object relation: one-tap trading temptation is physically in hand without impossible back-side screen text. |
| h8 | `stock_simulation_full_position` | green tablet chart below the monitor | 855, 370 | 66.8, 51.4 | 16.0 x 10.0 | Clear chart device; can become simulated/secondary-account clue. |
| h9 | `stock_recommend_group_card` | social/recommendation group tablet on right | 1070, 286 | 83.6, 39.7 | 18.0 x 16.0 | Better than old paper card; keep as screen clue. |
| h10 | `stock_dragon_tiger_clip` | financial-news clipping at lower left | 280, 512 | 21.9, 71.1 | 20.0 x 13.0 | Strong newspaper body but copy should not over-explain. |
| h11 | `stock_sell_house_sheet` | house photo and keys cluster | 690, 628 | 53.9, 87.2 | 18.0 x 13.0 | Good semantic relation: life asset plus keys. |
| h12 | `stock_risk_disclosure_corner` | folded risk disclosure at lower-right foreground | 905, 635 | 70.7, 88.2 | 18.0 x 14.0 | Clear and low-key; good hidden-object target. |
| h13 | `stock_heat_push_phone` | right-side heat/group push tablet red badge | 1160, 354 | 90.6, 49.2 | 10.0 x 12.0 | If h5/h9 also use same tablet, separate to subparts or rewrite one clue. |

V2 semantic risks:

- h2, h4, and h6 still inherit labels from the old WIP asset and need copy/label rewrites before config migration.
- h5, h9, and h13 all live on the right tablet area. At least one should move to a different object or become a clearly separated subpart to avoid same-object overloading.
- Monitor text is readable enough that h1/h2 should not both be obvious "click the榜单" answers unless surrounded by stronger decoys.
- The generated state set changes small desk details between progress images. Before runtime replacement, use Playwright screenshots to confirm clue bodies remain findable across progress states.

## Final Calibration Checklist

- [x] Every runtime center is measured from the accepted V2 raster, not copied from the old WIP table.
- [x] Phone clues target screen/button subparts, not whole device boxes.
- [x] Paper clues target the meaningful fold, stamp, chart, key relation, or covered corner.
- [x] At least 26 decoys remain outside true hotspot boxes.
- [x] Hint markers land on the clue object or meaningful subpart in the stock Playwright path.
