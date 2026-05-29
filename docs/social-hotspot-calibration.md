# Social Hotspot Calibration

Base image: `public/assets/game/social/states/social-progress-0.png`
Source size: `1672 x 941`
Runtime stage: `1280 x 720`

The fourth level uses embedded raster clues. Coordinates are recorded from source-pixel centers first, then converted into percentages for `src/core/config.ts`.

| Hotspot | Evidence | Source center | Config center | Hit size |
| --- | --- | --- | --- | --- |
| h1 | `cropped_profit_screenshot` | `694, 545` | `41.5, 57.9` | `8.5 x 23` |
| h2 | `humblebrag_group_qr` | `420, 735` | `25.1, 78.1` | `10.5 x 20.5` |
| h3 | `home_photo_loan_folder` | `955, 732` | `57.1, 77.8` | `22 x 15` |
| h4 | `ai_course_deadline` | `1302, 644` | `77.9, 68.4` | `18 x 24` |
| h5 | `unsent_reply_draft` | `1152, 760` | `68.9, 80.8` | `17 x 13` |

Review notes:

- Use the object center, not the found marker center, when adjusting hit points.
- If a future redraw moves an in-world clue, update this file before changing `hitX` / `hitY`.
- Avoid using generated text alone as a clue. Each target must have a visible object: phone screen, QR card, photo/folder stack, course poster, or message draft.
