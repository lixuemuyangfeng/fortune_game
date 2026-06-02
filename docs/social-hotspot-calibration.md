# Social Hotspot Calibration

Base image: `public/assets/game/social/states/social-progress-0.png`

Source image size: `1672 x 941`.

Runtime stage: `1280 x 720`, no center crop expected because the source is 16:9.

Fourth-level difficulty rule: this level must be harder than the 7-clue convenience level and must not collapse into "click every text block". The active clues are anchored to object state or object relationships, while ordinary household clutter acts as decoy space.

| Hotspot | Evidence | Source center px | Runtime % | Hit size % | Visual anchor |
| --- | --- | ---: | ---: | ---: | --- |
| h1 | `cropped_profit_screenshot` | `639, 330` | `38.2, 35.1` | `8.0 x 13.5` | phone upper chart area partly hidden by hand/screen crop |
| h2 | `unsent_reply_draft` | `639, 395` | `38.2, 42.0` | `7.8 x 5.4` | phone bottom input/send strip |
| h3 | `group_invite_popup` | `722, 534` | `43.2, 56.7` | `12.0 x 9.5` | small invite card tucked into blanket |
| h4 | `pinned_review_comment` | `934, 614` | `55.9, 65.2` | `10.8 x 15.0` | pinned note with red pushpin among ordinary notes |
| h5 | `ai_course_deadline` | `1167, 278` | `69.8, 29.5` | `16.0 x 18.0` | laptop course screen plus countdown/hourglass area |
| h6 | `side_hustle_bookmark` | `1481, 370` | `88.6, 39.3` | `8.5 x 20.0` | right-side course/bookmark stack |
| h7 | `mortgage_debit_notice` | `1129, 698` | `67.5, 74.2` | `12.0 x 15.0` | key and repayment envelope, narrowed to avoid pinned-note overlap |
| h8 | `household_overdue_bill` | `1434, 748` | `85.8, 79.5` | `15.5 x 17.5` | utility envelope near power strip and plug |

## Decoy Zones

| Decoy | Runtime % | Hit size % | Visual anchor |
| --- | ---: | ---: | --- |
| `blanket-fold` | `29.5, 58.0` | `10.0 x 22.0` | folded blanket edge |
| `alarm-clock` | `54.2, 28.6` | `6.6 x 7.2` | bedside digital clock |
| `snack-bag` | `58.8, 47.5` | `9.4 x 10.5` | ordinary snack package |
| `table-mug` | `78.9, 47.2` | `6.0 x 10.0` | mug near lamp |
| `pen-stack` | `59.2, 84.4` | `16.0 x 8.0` | ordinary pen and paper scraps |
| `tissue-box` | `88.3, 66.2` | `9.4 x 15.0` | tissue box and crumpled tissue |
| `charging-cable` | `92.6, 74.8` | `7.5 x 14.0` | loose charging cable |
| `shelf-books` | `90.5, 14.5` | `12.0 x 17.0` | upper shelf books |

Calibration rule: use the center of the object relationship, not the center of nearby text. If a future art pass changes the object positions, update this source-pixel record before changing config percentages.
