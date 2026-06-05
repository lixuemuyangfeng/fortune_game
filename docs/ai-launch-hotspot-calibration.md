# AI Launch Hotspot Calibration

Scene: `ai_launch`

Status: first raster frozen and calibrated from `ai-launch-progress-0.png`. Runtime QA found h2/h3/h5/h6 semantic drift; those hotspot centers have been recalibrated against the source raster and rechecked with the source overlay.

## Source Image

- Final raster: `public/assets/game/ai-launch/states/ai-launch-progress-0.png`
- Expected source size: 1280 x 720
- Runtime stage: Phaser 1280 x 720, fit-scaled without internal crop

Formula:

```text
hitX = sourceX / 1280 * 100
hitY = sourceY / 720 * 100
```

## Calibration Table

| Hotspot | Evidence | Object center to measure | Source center | Config percent | Hit box | QA note |
| --- | --- | --- | --- | --- | --- | --- |
| h1 | `polished_ai_demo_rows` | center of the too-perfect 100% demo row grid on the monitor | 998, 135 | 78.0, 18.8 | 17.0 x 18.0 | Targets the grid, not the whole monitor. |
| h2 | `manual_review_sheet` | body/title area of the physical `待处理申请清单` sheet, left of the red stamp | 832, 526 | 65.0, 73.0 | 9.0 x 8.0 | Targets the actual pending-review form, not the approval-chain notebook. |
| h3 | `panic_course_checkout` | `23:59` course checkout/payment card on the right tablet | 1126, 418 | 88.0, 58.0 | 11.0 x 14.0 | Moved off the pen cup and onto the timer/payment card. |
| h4 | `legacy_ie_token` | old security token/USB object among receipt clutter | 358, 590 | 28.0, 82.0 | 8.0 x 7.0 | Must not drift to the nearby ordinary receipts. |
| h5 | `approval_chain_notebook` | red-circled approval chain diagram in the open notebook | 678, 441 | 53.0, 61.2 | 11.0 x 10.0 | Narrowed to the relationship diagram so the notebook edge is not treated as the clue. |
| h6 | `manual_stamp_queue` | red stamp and form-stack contact point | 883, 558 | 69.0, 77.5 | 5.5 x 6.2 | Distinct from h2 by focusing on the stamp, not the whole form stack. |
| h7 | `seventeen_tabs_fatigue` | overloaded browser tab strip across the top monitor | 929, 35 | 72.6, 4.8 | 25.0 x 5.8 | Wide but shallow; should not make all monitor text clickable. |
| h8 | `job_replacement_clip` | replacement-news clipping at lower center | 534, 598 | 41.7, 83.0 | 20.0 x 13.0 | One clipping among decoy papers. |
| h9 | `boss_followup_unanswered` | unread boss phone notification on lower-left phone | 109, 547 | 8.5, 76.0 | 11.0 x 17.0 | Separate from ordinary paper clutter. |

## Screenshot QA

- [x] `progress-0` screenshot confirms scene density and 9 clue bodies: `artifacts/playtest-ai-launch-intro.png`.
- [x] Mid-progress screenshot confirms found markers are local and small: `artifacts/playtest-ai-launch-mid-progress.png`.
- [x] Completion screenshot confirms no large markers or panels occlude the scene: `artifacts/playtest-ai-launch-complete.png`.
- [x] Mobile screenshot confirms objects remain identifiable: `artifacts/playtest-ai-launch-mobile-intro.png`.
- [x] Decoy-click check confirms ordinary papers, tabs, cables, mugs, and receipts do not advance progress.

## QA Notes

- First Playwright run found h2/h6 overlap: `待人工处理清单` was intercepted by `人工盖章表单`.
- Fixed by narrowing h2 to source center `781, 498` and h6 to source center `879, 557`; reran the AI-launch flow and then the full 7-flow e2e suite successfully.
- User review on 2026-06-05 found hint/marker semantics still weak around the notebook/table-paper cluster. Source overlay QA confirmed h3 was incorrectly sitting on the pen cup; h2 was too close to the notebook; h5 was too broad; h6 was close but benefited from tightening. Recalibrated h2/h3/h5/h6 and moved the `打印纸` decoy center outside h3.
- Remaining art risk: `progress-1..9` are mechanically derived local-state rasters, not true generated expression/posture redraws. They are acceptable as a playable WIP but should be replaced by real same-camera character-state variants before final art approval.
