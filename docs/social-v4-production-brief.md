# Social V4 Production Brief

Scene: `social` / `小红薯暴击夜`

## Theme

睡前想刷手机放松，却被别人高光和自己现实成本夹击。

## Core Correction

The previous social scene failed twice: V2 was mostly visible text blocks, and V3 still made the true objects too isolated. V4 follows the convenience-store direction more strictly: every true target is a small subpart or object relationship hidden inside a group of similar decoys.

## Camera & Layout

- Canvas: 16:9 hidden-object game scene.
- Camera: high 3/4 view over a cramped bedside sofa/low table area.
- Main action: Zhou Qiming half-reclines in a worn armchair or sofa corner, phone in hand, posture believable for late-night scrolling.
- Foreground: blanket, slippers, power strip, paper scraps, envelopes, keys, snack bag, mug.
- Midground: phone, low table, laptop/tablet, ordinary clutter, most clue objects.
- Background: window, dim shelf, side lamp, non-interactive household objects.
- The image must be dense enough that ordinary clutter competes with clue objects.
- Each clue group needs nearby same-category false targets so the level cannot be solved by clicking every visible paper or screen.

## Character Plan

Fourth level has 8 clues and needs 9 progress states: `progress-0` through `progress-8`.

- `progress-0`: tightly doomscrolling, shoulders closed.
- `progress-1..3`: gaze starts leaving the phone.
- `progress-4..6`: body opens, phone lowers.
- `progress-7`: skeptical half-smile, no longer swallowed by the feed.
- `progress-8`: relaxed, phone no longer controls posture.

State variants may use same-layout full-scene rasters for this project phase. Clue bodies and decoys must stay in place across all states.

## Clue Plan

Total: 8 clues, harder than the third level's 7 clues.

At least 6 clues must be object/relationship driven rather than pure text. Hotspots must land on subparts, not whole cards.

1. `cropped_profit_screenshot`: handheld phone shows only a cropped red chart corner; thumb/screen crop hides principal and account context.
2. `unsent_reply_draft`: the same phone has a tiny bottom input/send corner that was not pressed.
3. `group_invite_popup`: a small invite card with avatar dots and join button is partly tucked under blanket folds and ordinary cards.
4. `pinned_review_comment`: a red pushpin/folded note corner is mixed into a busy note wall.
5. `ai_course_deadline`: hourglass/timer beside the laptop keyboard carries the urgency more than the screen text.
6. `side_hustle_bookmark`: one colored bookmark ribbon sticks out from a course book/tablet stack among many ordinary tabs.
7. `mortgage_debit_notice`: a house key tooth crosses a small repayment envelope corner near family/home photos and harmless receipts.
8. `household_overdue_bill`: a red-stamped utility bill corner is partly trapped under cable near the power strip and ordinary plugs.

## Required Decoys

Place at least 18 plausible non-clue decoys:

- ordinary receipt, blank envelope, snack package, mug, tissue pile, book spine, charging cable, clock, pen, harmless photo, folded blanket edge, water bottle, ordinary sticky note, ordinary book tab, ordinary key/coin, laptop body, remote control, power adapter.

Decoys should be close enough in material and shape that the player cannot solve the level by clicking every text block.

## Forbidden

- No all-clues-are-text design.
- No giant QR code.
- No standalone UI cards floating over the scene.
- No clue label baked into the art.
- No office-work pose.
- No phone screen that only faces the camera while the character cannot see it.
- No empty scenic background dominating the playable area.
- No duplicate paper-slip clues that only differ by written words.

## Acceptance Notes

- The level must have 8 hotspots and 9 progress states.
- At least 5/8 active clues must be visually supported by object state or object relationship.
- Runtime must include at least 18 false-positive decoy zones.
- Hotspot calibration must be re-measured from the final source image.
- Playwright must capture intro, mid-progress, completion, and mobile intro screenshots.
- Config validation must prove social clue count exceeds convenience clue count and social progress images are distinct.
