# Social Hotspot Calibration

Base image: `public/assets/game/social/states/social-progress-0.png`

Generated source: `/Users/df_sla/.codex/generated_images/019e2b0b-9c12-7072-b0a2-b2fcade66ca1/ig_0b7ceff6206d8450016a1ea44271d4819bac7d66de396c9885.png`

Source image size: `1672 x 941`.

Runtime stage: `1280 x 720`, no center crop expected because the source is 16:9.

Fourth-level difficulty rule: this level must be harder than the 7-clue convenience level and must not collapse into "click every text block". The active clues are now small subparts inside same-category decoy clusters.

| Hotspot | Evidence | Source center px | Runtime % | Hit size % | Visual anchor |
| --- | --- | ---: | ---: | ---: | --- |
| h1 | `cropped_profit_screenshot` | `660, 383` | `39.5, 40.7` | `4.4 x 5.4` | handheld phone red chart middle, not the notch or whole phone |
| h2 | `unsent_reply_draft` | `660, 428` | `39.5, 45.5` | `3.8 x 3.8` | tiny bottom input/send corner |
| h3 | `group_invite_popup` | `700, 514` | `41.9, 54.6` | `6.2 x 5.8` | invite card edge tucked in blanket/card cluster |
| h4 | `pinned_review_comment` | `1202, 118` | `71.9, 12.5` | `4.6 x 5.8` | red pushpin/folded note corner on busy note wall |
| h5 | `ai_course_deadline` | `1210, 326` | `72.4, 34.6` | `5.4 x 7.0` | hourglass/timer beside laptop keyboard |
| h6 | `side_hustle_bookmark` | `1445, 423` | `86.4, 45.0` | `4.8 x 8.2` | colored bookmark ribbon in book stack |
| h7 | `mortgage_debit_notice` | `910, 675` | `54.4, 71.7` | `6.6 x 6.8` | key tooth and envelope corner in coin/key cluster |
| h8 | `household_overdue_bill` | `1378, 680` | `82.4, 72.3` | `6.0 x 7.4` | red-stamped bill corner under cable near power strip |

## Decoy Zones

| Decoy | Runtime % | Hit size % | Visual anchor |
| --- | ---: | ---: | --- |
| `window-photo` | `5.0, 18.2` | `6.8 x 9.2` | window-side family photo |
| `blanket-fold` | `24.8, 61.1` | `13.0 x 18.0` | folded blanket edge |
| `alarm-clock` | `49.0, 29.2` | `5.8 x 6.8` | bedside digital clock |
| `laptop-body` | `63.1, 33.6` | `13.5 x 12.0` | laptop body decoy |
| `notice-board` | `67.6, 15.6` | `16.0 x 18.0` | ordinary note wall |
| `water-bottle` | `45.9, 58.6` | `5.2 x 13.0` | water bottle |
| `snack-bag` | `53.8, 52.2` | `10.4 x 11.2` | ordinary snack package |
| `black-mug` | `71.5, 55.0` | `7.0 x 9.0` | black mug |
| `white-mug` | `67.9, 58.7` | `6.0 x 7.4` | white mug |
| `coin-scatter` | `51.4, 69.0` | `10.0 x 7.8` | coins near true key clue |
| `table-pen` | `57.1, 77.7` | `8.6 x 6.2` | table pen |
| `normal-receipts` | `45.5, 78.1` | `13.0 x 12.0` | ordinary receipts |
| `remote-control` | `43.5, 76.0` | `7.2 x 8.0` | remote control |
| `ordinary-cards` | `40.1, 56.9` | `8.5 x 7.0` | ordinary cards near invite clue |
| `book-stack` | `85.8, 49.4` | `12.0 x 14.0` | book stack around bookmark clue |
| `photo-stack` | `82.8, 59.0` | `10.5 x 9.0` | harmless photo stack |
| `tissue-box` | `92.0, 53.5` | `9.5 x 12.5` | tissue box |
| `power-adapter` | `87.4, 73.2` | `5.8 x 7.2` | power adapter decoy, narrowed to avoid cable-loop overlap |
| `cable-loop` | `92.5, 67.8` | `6.4 x 8.8` | cable loop, narrowed to avoid adapter overlap |
| `paper-rubble` | `72.8, 77.4` | `11.5 x 11.0` | miscellaneous paper pile |

Calibration rule: use the center of the object relationship, not the center of nearby text. If a future art pass changes the object positions, update this source-pixel record before changing config percentages.
