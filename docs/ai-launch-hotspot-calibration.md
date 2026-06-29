# AI Launch Hotspot Calibration

Scene: `ai_launch`

Status: V2 progress-state set integrated. The base raster remains calibrated from `ai-launch-progress-0.png`; runtime QA found h2/h3/h5/h6 semantic drift and those centers were recalibrated. The latest pass replaces the previous mechanical `progress-1..9` state rasters with generated posture/expression variants and rechecks the focused AI-launch flow.

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
| h2 | `manual_review_sheet` | title/body area of the physical `待处理申请清单` sheet above the red stamp | 922, 475 | 72.0, 66.0 | 9.0 x 7.0 | Targets the pending-review form itself; vertically separated from h6's stamp center. |
| h3 | `panic_course_checkout` | `23:59` course checkout/payment card on the right desktop tablet/small screen | 1126, 418 | 88.0, 58.0 | 11.0 x 14.0 | Moved off the pen cup and onto the timer/payment card. |
| h4 | `legacy_ie_token` | old security token/USB object among receipt clutter | 358, 590 | 28.0, 82.0 | 8.0 x 7.0 | Must not drift to the nearby ordinary receipts. |
| h5 | `approval_chain_notebook` | red-circled approval/person-dependency diagram in the open notebook | 678, 441 | 53.0, 61.2 | 11.0 x 10.0 | Narrowed to the relationship diagram so the notebook edge is not treated as the clue. |
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
- [x] State contact sheet confirms visible posture/expression progression: `artifacts/ai_launch-state-contact-sheet.jpg`.

## QA Notes

- First Playwright run found h2/h6 overlap: `待人工处理清单` was intercepted by `人工盖章表单`.
- Fixed by narrowing h2 to source center `781, 498` and h6 to source center `879, 557`; reran the AI-launch flow and then the full 7-flow e2e suite successfully.
- User review on 2026-06-05 found hint/marker semantics still weak around the notebook/table-paper cluster. Source overlay QA confirmed h3 was incorrectly sitting on the pen cup; h2 was too close to the notebook; h5 was too broad; h6 was close but benefited from tightening. Recalibrated h2/h3/h5/h6 and moved the `打印纸` decoy center outside h3.
- Follow-up review on 2026-06-05 found the `待处理清单` marker still reading as if it belonged to the stamp. Reframed h2 as `待人工复核清单`, h6 as `红章兜底流程`, and moved h2 to source center `922,475`, the upper form/title area. The source overlay `artifacts/ai-launch-hotspot-overlay-latest.png` confirms h2 and h6 are now separate visual centers.
- Same pass reframed weak AI semantics: `太干净的演示数据` became `只跑样例的满分屏`, `预算审批人脉图` became `人情审批流程图`, and the course timer became a `平板结账倒计时`.
- 2026-06-09 state repair: `progress-1..9` were replaced with generated same-theme posture/expression variants. The focused AI-launch Playwright flow passed and the mid/complete screenshots were manually inspected for character state, marker placement, and clue-object continuity.
