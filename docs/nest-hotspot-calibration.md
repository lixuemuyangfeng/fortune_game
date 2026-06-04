# Nest Hotspot Calibration

Scene: `nest`

Status: first accepted raster candidate calibrated from `nest-progress-0.png`. Playwright visual QA still needs to confirm marker placement in the runtime shell.

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
| h1 | `nest_office_noise_core` | cracked keyboard and market-chart paper entering grinder | 676, 310 | 52.8, 43.0 | 14.0 x 18.0 | Targets keyboard/chart relation, not Zhou's hand. |
| h2 | `nest_gold_receipt_heat` | half-burned gold receipt on left tray | 128, 491 | 10.0, 68.2 | 14.0 x 16.0 | Targets receipt/ash cluster, not all burned paper. |
| h3 | `nest_lottery_near_miss_roll` | left body of the rolled scratch-ticket strip | 479, 488 | 37.4, 67.8 | 9.0 x 13.0 | Narrowed after Playwright found overlap with h9. |
| h4 | `nest_social_filter_shard` | lens over staged apartment photo in photo box | 735, 531 | 57.4, 73.7 | 16.0 x 18.0 | Targets lens/photo relationship. |
| h5 | `nest_ai_panic_meter` | laptop/course timer module on left workbench | 230, 255 | 18.0, 35.4 | 18.0 x 18.0 | Targets timer/screen cluster, not the whole left desk. |
| h6 | `nest_meeting_blame_pipe` | pipe/folder chute feeding responsibility trays | 998, 300 | 78.0, 41.6 | 22.0 x 22.0 | Targets folder-to-pipe relation on right machine. |
| h7 | `tag_not_every_car` | car/ramp metal tag on right wood box | 1119, 585 | 87.4, 81.2 | 14.0 x 16.0 | Targets tag below toy cars. |
| h8 | `tag_stubborn_not_strategy` | cracked shield tag in foreground token cluster | 402, 655 | 31.4, 91.0 | 12.0 x 12.0 | Targets shield, not surrounding notes. |
| h9 | `tag_near_miss_not_next` | stop token below the ticket roll | 550, 553 | 43.0, 76.8 | 7.0 x 8.0 | Narrowed and moved down-right to avoid intercepting h3. |
| h10 | `tag_publishable_version` | film-frame tag clipped to right photo corner | 886, 527 | 69.2, 73.2 | 10.0 x 17.0 | Targets film-frame tag. |
| h11 | `tag_panic_sellers_profit` | warning price tag hanging from left cable | 60, 256 | 4.7, 35.6 | 9.0 x 14.0 | Targets hanging tag; left edge must still be clickable. |
| h12 | `tag_no_resource_blame` | locked process tag on upper-right pipe valve | 1171, 194 | 91.5, 27.0 | 12.0 x 18.0 | Targets lock/valve tag, not all pipe locks. |

## Screenshot QA

- [x] `progress-0` screenshot confirms scene density and 12 clue bodies.
- [x] Mid-progress screenshot confirms found markers are local and small.
- [x] Completion screenshot confirms no large markers or panels occlude Zhou or the mother-nest device.
- [x] Mobile screenshot confirms the final-level image remains usable as an intro scene.
- [ ] Decoy-click check confirms ordinary keyboards, tickets, photos, tags, toy cars, pipes, and lenses do not advance progress.

## QA Notes

- This first playable final-level pass uses a coherent full-scene raster with embedded clue bodies and 12 mechanically derived progress rasters.
- The first generated candidate was rejected before integration because it had too many readable text labels. The accepted candidate uses more icon-like tags and object relationships.
- Playwright caught an h3/h9 overlap around the lottery ticket roll and stop tag. h3/h9 were narrowed and separated before the final e2e pass.
- Progress rasters `nest-progress-1..12` are mechanically derived local-state rasters, not true generated expression/posture redraws. They are acceptable as playable WIP but should be replaced before final art approval.
- Because the final level intentionally includes six counter-tags, some clue bodies include icon-like tag surfaces. Review must ensure the level is not reduced to clicking every visible tag; same-category decoys are configured to counter that.
