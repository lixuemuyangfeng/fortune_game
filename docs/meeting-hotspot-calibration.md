# Meeting Hotspot Calibration

Scene: `meeting`

Status: second raster candidate accepted after the first pass failed the constitution review for text-heavy clue bodies. Hotspots are recalibrated from `meeting-progress-0.png`; Playwright visual QA must confirm marker placement in the runtime shell.

## Source Image

- Final raster: `public/assets/game/meeting/states/meeting-progress-0.png`
- Source size: 1280 x 720
- Runtime stage: Phaser 1280 x 720, fit-scaled without internal crop

Formula:

```text
hitX = sourceX / 1280 * 100
hitY = sourceY / 720 * 100
```

## Calibration Table

| Hotspot | Evidence | Object center to measure | Source center | Config percent | Hit box | QA note |
| --- | --- | --- | --- | --- | --- | --- |
| h1 | `empty_resource_collab_slide` | empty support/resource boxes on the projected slide | 1135, 165 | 88.7, 22.9 | 17.0 x 15.0 | Targets the blank resource boxes, not the whole slide. |
| h2 | `zhou_owner_nameplate` | Zhou Qiming owner nameplate at the front of the table | 640, 430 | 50.0, 59.7 | 8.0 x 8.0 | Targets Zhou's table tent among other name cards. |
| h3 | `crossed_out_risk_page` | red-crossed risk memo among ordinary papers | 370, 523 | 28.9, 72.6 | 14.0 x 13.0 | Targets red X and paper body, not surrounding notes. |
| h4 | `scope_creep_action_sheet` | action tracker clipboard and added sticky rows | 480, 535 | 37.5, 74.3 | 15.0 x 17.0 | Targets the expanded tracker, not the nearby red-X memo. |
| h5 | `target_budget_gap_chart` | target-up / budget-down chart beside calculator | 685, 512 | 53.5, 71.1 | 15.0 x 14.0 | Targets chart body and contradictory arrows. |
| h6 | `rejected_headcount_form` | rejected headcount form clipped to the empty chair | 1102, 361 | 86.1, 50.2 | 9.5 x 15.0 | Targets the rejection stamp/form body instead of the chair back. |
| h7 | `friday_deadline_calendar` | Friday deadline calendar with cold coffee | 160, 556 | 12.5, 77.2 | 10.0 x 11.0 | Targets the calendar/cup core instead of the surrounding desk area. |
| h8 | `opportunity_laser_pointer` | laser pointer/remote and red dot aimed at opportunity slide | 826, 175 | 64.5, 24.3 | 13.0 x 20.0 | Targets pointer relationship, not the full screen text. |
| h9 | `budget_locked_folder` | locked budget folder/box near target chart | 920, 586 | 71.9, 81.4 | 11.0 x 11.0 | Targets the lock/folder core instead of the whole right table. |
| h10 | `erased_whiteboard_risk` | risk/target notes pinned on the whiteboard | 560, 170 | 43.8, 23.6 | 9.0 x 12.0 | Targets the risk note cluster and keeps the hit effect away from Zhou's face. |

## Screenshot QA

- [x] `progress-0` screenshot confirms scene density and 10 clue bodies.
- [x] Mid-progress screenshot confirms found markers are local and small.
- [x] Completion screenshot confirms no large markers or panels occlude the scene.
- [x] Mobile screenshot confirms objects remain identifiable.
- [ ] Decoy-click check confirms ordinary charts, mugs, paper stacks, laptops, and name-card rows do not advance progress.

## QA Notes

- The first meeting raster was rejected during self-review because too many clues were simply text/table blocks. The second candidate increases object relationships: boss leaving, empty support boxes, name cards, red-X risk memo, action tracker, rejected form on empty chair, calendar/cold coffee, chart/calculator, laser pointer, and locked budget folder.
- After desktop completion screenshot review, h10 was moved from 477,187 to 560,170 and narrowed from 20.0 x 25.0 to 14.0 x 20.0 so the whiteboard hit effect no longer overlaps Zhou Qiming's face.
- 2026-06-15 mechanized visual QA flagged h7, h9, and h10 as oversized late-level hotspots. Their hit boxes were tightened to 10.0 x 11.0, 11.0 x 11.0, and 9.0 x 12.0 respectively. A follow-up board review tightened h6 to the form body at 86.1, 50.2 with a 9.5 x 15.0 hit box.
- Progress rasters `meeting-progress-1..10` were replaced with generated character-state overlays composited onto the accepted base scene. Screenshot QA and `artifacts/meeting-state-contact-sheet.jpg` confirm visible posture/expression progression without moving the calibrated clue objects.
