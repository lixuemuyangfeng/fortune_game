# Nest Hotspot Calibration

Scene: `nest`

Status: V2 runtime raster and independent protagonist state composites calibrated from `nest-progress-0.png`. `npm run visual:qa -- nest` and `npm run visual:gate -- nest` have confirmed marker placement with screenshot evidence.

## Source Image

- Final raster: `public/assets/game/nest/states/nest-progress-0.png`
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
| h1 | `nest_office_noise_core` | market mini-screen/chart paper beside Zhou | 727, 351 | 56.8, 48.7 | 7.5 x 12.0 | Moved off Zhou's body and narrowed to the chart/screen object. |
| h2 | `nest_gold_receipt_heat` | half-burned gold receipt on left tray | 154, 489 | 12.0, 67.9 | 14.0 x 15.0 | Targets receipt/ash cluster, not all burned paper. |
| h3 | `nest_lottery_near_miss_roll` | left body of the rolled scratch-ticket strip | 404, 514 | 31.6, 71.4 | 10.0 x 14.0 | Separated from h9 stop token after overlap QA. |
| h4 | `nest_social_filter_shard` | lens/photo shard near Zhou's feet | 630, 525 | 49.2, 72.9 | 7.0 x 14.0 | Targets the shard, not Zhou's leg. |
| h5 | `nest_ai_panic_meter` | laptop/course timer module on left workbench | 225, 230 | 17.6, 31.9 | 18.0 x 17.0 | Targets timer/screen cluster, not the whole left desk. |
| h6 | `nest_meeting_blame_pipe` | pipe/folder chute feeding responsibility trays | 1000, 336 | 78.1, 46.7 | 20.0 x 20.0 | Targets folder-to-pipe relation on right machine. |
| h7 | `tag_not_every_car` | car/ramp metal tag on right wood box | 1115, 607 | 87.1, 84.3 | 13.0 x 14.0 | Targets tag below toy cars. |
| h8 | `tag_stubborn_not_strategy` | cracked shield tag in foreground token cluster | 346, 617 | 27.0, 85.7 | 11.0 x 12.0 | Targets shield, not surrounding notes. |
| h9 | `tag_near_miss_not_next` | stop token below the ticket roll | 520, 594 | 40.6, 82.5 | 8.0 x 9.0 | Narrowed to the stop token; no longer intercepts h3. |
| h10 | `tag_publishable_version` | film-frame tag clipped to right photo corner | 751, 522 | 58.7, 72.5 | 7.0 x 14.0 | Targets film-frame tag and avoids h4. |
| h11 | `tag_panic_sellers_profit` | warning price tag hanging from left cable | 161, 317 | 12.6, 44.0 | 4.5 x 8.0 | Moved from timer screen to the hanging tag body. |
| h12 | `tag_no_resource_blame` | process seal/lock on right pipe row | 1160, 263 | 90.6, 36.5 | 7.5 x 12.0 | Targets the seal relation, not all pipe locks. |

## Screenshot QA

- [x] `progress-0` screenshot confirms scene density and 12 clue bodies.
- [x] Mid-progress screenshot confirms found markers are local and small.
- [x] Completion screenshot confirms no large markers or panels occlude Zhou or the mother-nest device.
- [x] Mobile screenshot confirms the final-level image remains usable as an intro scene.
- [x] `visual:gate -- nest` confirms the current QA verdict has screenshot-backed pass evidence for every hotspot.

## QA Notes

- The current V2 pass uses a clean clue-dense raster plus independent protagonist state composites for `nest-progress-0..12`.
- The first generated candidate was rejected before integration because it had too many readable text labels. The accepted candidate uses more icon-like tags and object relationships.
- Playwright caught an h3/h9 overlap around the lottery ticket roll and stop tag. h3/h9 were narrowed and separated before the final e2e pass.
- Progress rasters `nest-progress-1..12` now show visible protagonist state changes from independent character assets; keep future edits on this separated background/character route rather than rectangular scene crops.
- Because the final level intentionally includes six counter-tags, some clue bodies include icon-like tag surfaces. Review must ensure the level is not reduced to clicking every visible tag; same-category decoys are configured to counter that.
