# Social Hotspot Calibration

Base image: `public/assets/game/social/states/social-progress-0.png`

Source image size: `1672 x 941`.

Runtime stage: `1280 x 720`, scaled with center crop by `SocialScene`.

The fourth level must be harder than the third level, so this calibration uses 8 clues after the 7-clue convenience level. The clues are intentionally split across phone content, phone-adjacent cards, other screens, and life-cost paperwork so the search does not collapse into one phone rectangle.

| Hotspot | Evidence | Source center px | Runtime % | Hit size % | Visual anchor |
| --- | --- | ---: | ---: | ---: | --- |
| h1 | `cropped_profit_screenshot` | `819, 361` | `49.0, 38.4` | `8.2 x 15.0` | upper phone feed profit chart |
| h2 | `unsent_reply_draft` | `819, 471` | `49.0, 50.0` | `8.0 x 5.8` | lower phone reply/input strip |
| h3 | `group_invite_popup` | `906, 551` | `54.2, 58.6` | `12.0 x 10.0` | invite card near the blanket |
| h4 | `pinned_review_comment` | `893, 654` | `53.4, 69.5` | `12.0 x 12.0` | pinned comment/replay card below the blanket |
| h5 | `ai_course_deadline` | `1199, 299` | `71.7, 31.8` | `18.0 x 20.0` | laptop deadline/course page |
| h6 | `side_hustle_bookmark` | `1592, 315` | `95.2, 33.5` | `8.2 x 25.0` | right-side side-hustle page |
| h7 | `mortgage_debit_notice` | `1189, 642` | `71.1, 68.2` | `21.0 x 19.0` | home photo plus repayment notice |
| h8 | `household_overdue_bill` | `1418, 707` | `84.8, 75.1` | `17.0 x 19.0` | household overdue bill near the cabinet |

Calibration rule: use the center of the actual object body, not the center of the check marker or the nearest label. If a later image revision changes object placement, re-measure in source pixels first, then update percentages and Playwright screenshots together.
