# AI Launch Hotspot Calibration

Scene: `ai_launch`

Status: first raster frozen and calibrated from `ai-launch-progress-0.png`. Playwright visual QA still needs to confirm marker placement in the runtime shell.

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
| h2 | `manual_review_sheet` | left/top body of the physical pending-review sheet under the stamp queue | 781, 498 | 61.0, 69.2 | 8.8 x 9.6 | Replaced weaker meeting-summary concept because final art shows a manual processing sheet; narrowed to avoid h6 overlap. |
| h3 | `panic_course_checkout` | course checkout timer/payment card on the right tablet | 1114, 318 | 87.0, 44.2 | 10.6 x 15.4 | Includes timer and payment context. |
| h4 | `legacy_ie_token` | old security token/USB object among receipt clutter | 358, 590 | 28.0, 82.0 | 8.0 x 7.0 | Must not drift to the nearby ordinary receipts. |
| h5 | `approval_chain_notebook` | red-circled approval chain diagram in the open notebook | 676, 438 | 52.8, 60.8 | 14.0 x 13.0 | Targets the relationship diagram, not the whole notebook. |
| h6 | `manual_stamp_queue` | red stamp and form-stack contact point | 879, 557 | 68.7, 77.4 | 6.6 x 7.4 | Distinct from h2 by focusing on the stamp/manual queue. |
| h7 | `seventeen_tabs_fatigue` | overloaded browser tab strip across the top monitor | 929, 35 | 72.6, 4.8 | 25.0 x 5.8 | Wide but shallow; should not make all monitor text clickable. |
| h8 | `job_replacement_clip` | replacement-news clipping at lower center | 534, 598 | 41.7, 83.0 | 20.0 x 13.0 | One clipping among decoy papers. |
| h9 | `boss_followup_unanswered` | unread boss phone notification on lower-left phone | 109, 547 | 8.5, 76.0 | 11.0 x 17.0 | Separate from ordinary paper clutter. |

## Screenshot QA

- [x] `progress-0` screenshot confirms scene density and 9 clue bodies: `artifacts/playtest-ai-launch-intro.png`.
- [x] Mid-progress screenshot confirms found markers are local and small: `artifacts/playtest-ai-launch-mid-progress.png`.
- [x] Completion screenshot confirms no large markers or panels occlude the scene: `artifacts/playtest-ai-launch-complete.png`.
- [x] Mobile screenshot confirms objects remain identifiable: `artifacts/playtest-ai-launch-mobile-intro.png`.
- [ ] Decoy-click check confirms ordinary papers, tabs, cables, mugs, and receipts do not advance progress.

## QA Notes

- First Playwright run found h2/h6 overlap: `待人工处理清单` was intercepted by `人工盖章表单`.
- Fixed by narrowing h2 to source center `781, 498` and h6 to source center `879, 557`; reran the AI-launch flow and then the full 7-flow e2e suite successfully.
- Remaining art risk: `progress-1..9` are mechanically derived local-state rasters, not true generated expression/posture redraws. They are acceptable as a playable WIP but should be replaced by real same-camera character-state variants before final art approval.
