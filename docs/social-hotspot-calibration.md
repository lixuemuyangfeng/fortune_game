# Social Hotspot Calibration

Base image: `public/assets/game/social/states/social-progress-0.png`

Generated source: `/Users/df_sla/.codex/generated_images/019e2b0b-9c12-7072-b0a2-b2fcade66ca1/ig_0b7ceff6206d8450016a1fc6e937a0819bbafe76d4752718c5.png`

Source image size: `1672 x 941`.

Runtime stage: `1280 x 720`, no center crop expected because the source is 16:9.

Fourth-level difficulty rule: this level must be harder than the 7-clue convenience level and must not collapse into "click every text block". V5 adds an extra semantic rule: each clue object must be visually clear as a real object/interface, but its evidence meaning should require context. Do not stack multiple true clues on one phone.

2026-06-05 semantic repair: user review found several labels were too explanation-dependent. The level now treats the handwritten notebook as a visible awkward blessing draft, the laptop comment as a high-like-count course/comment funnel, the deadline as the yellow course-deadline sticky note, and the repayment clue as the bank notice/photo relation rather than the key itself.

| Hotspot | Evidence | Source center px | Runtime % | Hit size % | Visual anchor |
| --- | --- | ---: | ---: | ---: | --- |
| h1 | `cropped_profit_screenshot` | `675, 355` | `40.4, 37.7` | `5.2 x 7.4` | one handheld phone with a cropped-up red chart; this is the only phone clue and it must read as "only this segment is shown", not "guaranteed all-red profit" |
| h2 | `unsent_reply_draft` | `154, 683` | `9.2, 72.6` | `7.8 x 8.6` | open notebook with crossed/awkward handwritten blessing draft; do not describe it as a sent-message UI |
| h3 | `group_invite_popup` | `910, 183` | `54.4, 19.4` | `7.4 x 7.2` | independent small device, centered on the invite modal/join button area |
| h4 | `pinned_review_comment` | `1222, 151` | `73.1, 16.0` | `9.0 x 8.5` | laptop/tablet comment interface with a high-like-count/top course-comment row |
| h5 | `ai_course_deadline` | `1200, 431` | `71.8, 45.8` | `8.6 x 7.4` | yellow sticky note on the desk that explicitly reads as a course deadline |
| h6 | `side_hustle_bookmark` | `1547, 291` | `92.5, 30.9` | `4.2 x 7.6` | colored bookmark ribbon in book stack |
| h7 | `mortgage_debit_notice` | `1204, 668` | `72.0, 71.0` | `8.0 x 6.0` | bank repayment notice text area above the home photo; found marker should not sit on the key or the photo center |
| h8 | `household_overdue_bill` | `1268, 889` | `75.8, 94.5` | `7.2 x 5.8` | red overdue stamp on bill near table edge/power area |

## Decoy Zones

| Decoy | Runtime % | Hit size % | Visual anchor |
| --- | ---: | ---: | --- |
| `window-photo` | `2.7, 21.6` | `5.2 x 10.0` | window-side family photo |
| `window-plant` | `18.0, 12.3` | `6.8 x 7.4` | window plant |
| `bedside-clock` | `22.4, 16.3` | `6.8 x 8.4` | bedside calendar clock |
| `shelf-books` | `41.3, 12.1` | `11.8 x 16.0` | left shelf books |
| `tablet-cards` | `52.6, 30.6` | `9.8 x 8.4` | harmless notification cards |
| `pen-cup` | `62.2, 24.5` | `6.0 x 11.0` | pen cup |
| `course-sticky` | `82.0, 42.5` | `8.6 x 7.4` | ordinary course sticky |
| `desk-mug` | `80.0, 52.0` | `7.4 x 8.0` | desk mug |
| `snack-bag` | `38.9, 84.0` | `12.0 x 12.0` | snack package |
| `remote-control` | `52.6, 95.6` | `9.2 x 5.6` | remote control |
| `ashtray` | `58.9, 87.7` | `9.0 x 8.0` | ashtray |
| `normal-receipts` | `47.9, 66.7` | `10.0 x 10.5` | ordinary receipts |
| `loose-keys` | `49.2, 73.1` | `8.0 x 6.8` | ordinary keys |
| `black-notebook` | `52.5, 76.1` | `9.0 x 9.0` | black notebook |
| `cable-loop` | `87.3, 75.8` | `12.0 x 13.0` | cable loop |
| `power-strip` | `89.0, 88.0` | `11.0 x 10.0` | power strip |
| `adapter` | `93.9, 76.5` | `6.2 x 9.0` | charger adapter |
| `book-tabs` | `89.0, 27.2` | `10.0 x 9.0` | ordinary book tabs |
| `desk-lamp` | `84.4, 13.8` | `8.0 x 12.0` | desk lamp |
| `thermos` | `79.7, 25.1` | `5.5 x 14.5` | thermos bottle |
| `blank-envelopes` | `76.0, 67.1` | `10.5 x 10.0` | blank envelopes |

Calibration rule: use the center of the object relationship, not the center of nearby text. If a future art pass changes the object positions, update this source-pixel record before changing config percentages.
