# Social V2 Production Brief

Scene: `social` / `小红薯暴击夜`

## Theme

凌晨刷手机本想放松，却被别人高光内容和自己现实账单一起夹击。

## Scene Logic

周启明在家中睡前半躺在沙发/床边刷手机，不是在办公、不在餐桌前端坐。手机是焦虑触发器，但不是全部谜底。玩家需要从手机内容、手机周边设备、现实生活杂物里找出高光背后的成本。

## Camera & Layout

- Canvas: 16:9 hidden-object game scene.
- Camera: over-the-shoulder / high 3/4 angle from behind and slightly above Zhou Qiming.
- Phone logic: phone screen is tilted toward Zhou Qiming but still readable to player; no screen directly facing camera while character cannot see it.
- Main action: sofa/bed edge plus low coffee table/bedside clutter.
- Foreground: blanket, slippers, tissues, snack bag, bills, charging cable.
- Midground: Zhou Qiming half-reclined/side-sitting, holding phone naturally.
- Background: dim apartment, night window, side table, laptop/tablet glow.

## Character Plan

Fourth level has 8 clues, so runtime needs 9 progress states: `progress-0` through `progress-8`.

- `progress-0`: doomscrolling, body curled, shoulders tight.
- `progress-1..3`: still tense but starting to notice the trick.
- `progress-4..6`: phone lowers gradually, posture opens up.
- `progress-7`: skeptical, no longer swallowed by the feed.
- `progress-8`: relaxed, faint cold-smile / self-aware, phone no longer controlling posture.

States may use same-layout full-scene rasters for this project phase, matching current second/third-level production approach. They must not remove, hide, or move unfound clue bodies.

## Clue Plan

Total: 8 clues, increasing difficulty beyond the third level's 7 clues.

Phone screen layer, 2 clues:

1. `cropped_profit_screenshot`: social feed profit post showing chart/gain but no principal.
2. `unsent_reply_draft`: bottom comment/reply input with an unsent message.

Phone-near layer, 2 clues:

3. `group_invite_popup`: nearby chat notification / group invite card, not a raw QR code.
4. `pinned_review_comment`: small pinned comment / saved comment card implying “join group for replay”.

Other-device layer, 2 clues:

5. `ai_course_deadline`: laptop/tablet course page with a 23:59 countdown.
6. `side_hustle_bookmark`: browser/bookmark/sidebar showing another monetization course saved for later.

Life-environment layer, 2 clues:

7. `mortgage_debit_notice`: mortgage/debit notice or repayment slip near a housing photo.
8. `household_overdue_bill`: household bill / reminder letter partly hidden under ordinary clutter.

## Forbidden

- No standalone giant QR code.
- No all-clues-inside-phone layout.
- No office-work posture, desk-work pose, rooftop-like crowd, or lottery-store props.
- No phone screen facing the camera while the character clearly cannot see it.
- No floating props, pasted character, giant phones, empty scenic areas, or baked-in answer markers.
- No clue that only works as a text label; each must have an object body.

## Acceptance Notes

- The level must have 8 hotspots and 9 progress states.
- Hotspot calibration must be re-measured from the final source image.
- Playwright must capture intro, mid-progress, completion, and mobile intro screenshots.
- Config validation must prove social clue count exceeds convenience clue count and social progress images are distinct.
