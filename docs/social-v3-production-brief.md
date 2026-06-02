# Social V3 Production Brief

Scene: `social` / `小红薯暴击夜`

## Theme

睡前想刷手机放松，却被别人高光和自己现实成本夹击。

## Core Correction

The previous social scene failed because most correct targets were visible text blocks. The new scene must follow the convenience-store direction: hide pressure inside believable objects and object relationships. Text can exist, but it cannot be the only reason a clue is suspicious.

## Camera & Layout

- Canvas: 16:9 hidden-object game scene.
- Camera: high 3/4 view over a cramped bedside sofa/low table area.
- Main action: Zhou Qiming half-reclines in a worn armchair or sofa corner, phone in hand, posture believable for late-night scrolling.
- Foreground: blanket, slippers, power strip, paper scraps, envelopes, keys, snack bag, mug.
- Midground: phone, low table, laptop/tablet, ordinary clutter, most clue objects.
- Background: window, dim shelf, side lamp, non-interactive household objects.
- The image must be dense enough that ordinary clutter competes with clue objects.

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

At least 5 clues must be object/relationship driven rather than pure text.

1. `cropped_profit_screenshot`: phone feed shows a red upward chart, but Zhou's thumb or screen crop hides the principal/position area.
2. `unsent_reply_draft`: phone bottom has a visible send arrow/input area that was not pressed; this is a button-state clue, not a text-only clue.
3. `group_invite_popup`: a small invitation card with avatar dots and a join button is tucked partly under the phone/blanket, visually connected to the profit post.
4. `pinned_review_comment`: a pinned/replay card uses a physical pushpin or red pin marker, mixed with ordinary sticky notes.
5. `ai_course_deadline`: laptop/tablet has a course screen plus a physical timer/hourglass/sticky countdown on the keyboard area.
6. `side_hustle_bookmark`: a bookmark ribbon or saved-course card sticks out from a side notebook/tablet stack, not just a text page.
7. `mortgage_debit_notice`: a house key and home photo sit on a bank envelope or repayment slip; the object relationship carries the meaning.
8. `household_overdue_bill`: a red-stamped utility envelope sits near a power strip/plug, competing with ordinary paper clutter.

## Required Decoys

Place at least 8 plausible non-clue decoys:

- ordinary receipt, blank envelope, snack package, mug, tissue pile, book spine, charging cable, clock, pen, harmless photo, folded blanket edge, water bottle.

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
- Runtime must include false-positive decoy zones.
- Hotspot calibration must be re-measured from the final source image.
- Playwright must capture intro, mid-progress, completion, and mobile intro screenshots.
- Config validation must prove social clue count exceeds convenience clue count and social progress images are distinct.
