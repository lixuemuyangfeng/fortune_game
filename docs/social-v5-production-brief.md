# Social V5 Production Brief

Scene: `social` / `小红薯暴击夜`

## Theme

睡前想刷手机放松，却被别人高光和自己现实成本夹击。

## Core Correction

The previous social scene failed three times: V2 was mostly visible text blocks, V3 made true objects too isolated, and V4 stacked multiple answers on one phone while turning digital behaviors into vague paper cards. V5 uses clear object/interface bodies, but keeps the evidence meaning contextual.

Core principle: the player should immediately recognize "this is a phone chart", "this is a group invite modal", "this is a comment panel", or "this is a draft notebook"; they should not immediately know why it is the answer until they relate it to Zhou's late-night envy loop.

## Camera & Layout

- Canvas: 16:9 hidden-object game scene.
- Camera: high 3/4 view over a cramped bedside sofa/low table area.
- Main action: Zhou Qiming half-reclines in a worn armchair or sofa corner, phone in hand, posture believable for late-night scrolling.
- Foreground: blanket, slippers, power strip, paper scraps, envelopes, keys, snack bag, mug.
- Midground: phone, low table, laptop/tablet, ordinary clutter, most clue objects.
- Background: window, dim shelf, side lamp, non-interactive household objects.
- The image must be dense enough that ordinary clutter competes with clue objects.
- Each clue group needs nearby same-category false targets so the level cannot be solved by clicking every visible paper or screen.
- Digital behaviors must stay on digital surfaces. Do not represent a group invitation or pinned comment as a random physical paper card unless the scene explicitly shows it as a printout.

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

1. `cropped_profit_screenshot`: Zhou's single handheld phone shows only a cropped-up red chart segment, while principal, holding time, and drawdown context are outside the crop. This is the only clue on that phone.
2. `unsent_reply_draft`: an open notebook or memo pad on the sofa arm/table shows an awkward handwritten blessing draft with crossed or stalled words. Do not describe it as a digital message unless the art actually shows a chat input.
3. `group_invite_popup`: a separate small device/tablet shows a group invite modal with avatar row and join button shape.
4. `pinned_review_comment`: laptop/tablet comment interface shows a high-like-count/top course-comment row that turns passive viewing into a paid-learning funnel.
5. `ai_course_deadline`: a yellow course-deadline sticky note on the desk carries the urgency. Do not rely on an hourglass alone to imply a deadline.
6. `side_hustle_bookmark`: one colored bookmark ribbon sticks out from a course book/tablet stack among many ordinary tabs.
7. `mortgage_debit_notice`: a bank repayment notice sits beside the home photo. The marker belongs on the notice text/body, not on the key or photo center.
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
- No multiple true clues on one phone screen.
- No vague paper-card version of a digital group invite or digital pinned comment.

## Acceptance Notes

- The level must have 8 hotspots and 9 progress states.
- At least 5/8 active clues must be visually supported by object state or object relationship.
- Runtime must include at least 18 false-positive decoy zones.
- Hotspot calibration must be re-measured from the final source image.
- Playwright must capture intro, mid-progress, completion, and mobile intro screenshots.
- Config validation must prove social clue count exceeds convenience clue count and social progress images are distinct.
