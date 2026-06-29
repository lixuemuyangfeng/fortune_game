# Stock Level Production Brief

Scene: `stock` / `暴涨榜深夜场`

Status: V2 runtime candidate integrated. The current playable assets use one coherent stock-room state set and have passed the stock Playwright flow; keep them under visual review until final user approval.

## Theme

Late-night stock heatlist anxiety: a tired person sees past涨幅 and social proof arranged like an entry signal, while the room already contains the bills, risk warnings, and leverage traps that should slow him down.

## Scene Logic

Zhou Qiming is alone in a cramped home study after midnight. He has not opened a trading account page as a confident investor; he is doom-scrolling a heatlist while household paperwork, screenshots, course notes, broker popups, and risk materials compete for attention. The scene should feel believable as a desk where a tired person makes bad decisions, not as a financial dashboard collage.

## Camera And Layout

- Fixed 16:9 game raster, same framing used by Phaser.
- Left/mid-left: Zhou Qiming, tired and tense, seated or leaning at the desk with one active device near his hand.
- Midground desk: main clue clusters, because the level must be played from object relationships.
- Right side: monitor/laptop with heatlist/course/chart surfaces, but no giant clean dashboard that makes the answer obvious.
- Foreground: ordinary bills, keys, receipts, cables, cups, tissues, snacks, and notebooks as believable decoy clutter.
- Background: night window, bookshelf, old papers, calendar, and storage. It must support atmosphere only, not dominate the scene.

Forbidden layout failures:

- no large dark pasted panel
- no readable answer cards lined up like UI labels
- no clue object larger than its real-world scale
- no two true clues stacked on the same phone screen unless the clue is explicitly a subpart relation
- no empty desk/floor regions used as difficulty

## Character State Plan

There are 13 clues, so the level needs `stock-progress-0` through `stock-progress-13`.

The accepted final direction must show visible expression or posture changes:

- `progress-0`: distracted, drawn toward the screen, tense mouth, hand hovering near phone/mouse.
- `progress-1..4`: suspicion starts, eyes narrow, posture shifts away from the heatlist.
- `progress-5..8`: fatigue becomes self-check, one hand away from buy/finance controls.
- `progress-9..12`: clearer boundary, shoulders drop, face less tense, attention turns to bills/risk objects.
- `progress-13`: phone/monitor no longer owns his gaze; expression reads cooled down, not triumphant.

Interim local overlays are not final. Final art should be same-camera state renders or clean layered character assets.

## Clue Plan

Each clue must be a clear object with delayed meaning. Text may support the object, but the clue cannot be just a written label.

| id | Evidence | Visible object body | Context relation | Decoys |
| --- | --- | --- | --- | --- |
| h1 | `stock_top_row_highlight` | compact right-side chart panel on the monitor, not the ranking row itself | The heatlist is backed by a seductive curve that looks like evidence after the fact. | other rows, normal cursor, monitor frame |
| h2 | `stock_seven_hundred_card` | torn screenshot print mixed into receipts near the calculator | Past gain is cropped into a tonight signal without showing entry timing. | normal screenshots, family photo, ordinary print |
| h3 | `stock_three_bagger_note` | notebook margin where a red arrow connects a past chart to a buy idea | The route is missing, only the endpoint is copied. | ordinary notes, pen marks, bookmarks |
| h4 | `stock_five_times_sticky` | sticky/tab half tucked under a bill or cup, showing only a hot percentage edge | Temptation is physically next to spending pressure. | blank sticky tabs, shopping notes |
| h5 | `stock_limit_up_notice` | broker/news push notification on a secondary device | The notification asks for attention, not decision quality. | ordinary notifications, calendar alert |
| h6 | `stock_twenty_cm_card` | small exchange/news slip beside a calculator, not a poster | The extreme daily move is treated like a routine coupon. | calculator tape, ordinary receipt |
| h7 | `stock_broker_margin_phone` | phone held in Zhou's hand, screen facing him and dark back facing the player | Leverage is one tap away, not abstract risk; the clue is the tense grip and screen orientation, not impossible text on the phone back. | other phone UI areas, charger, wallet |
| h8 | `stock_simulation_full_position` | practice-account sheet or tablet reflection marked full-position, separated from real bills | Simulation has no real-world penalty nearby. | real bills, normal worksheets |
| h9 | `stock_recommend_group_card` | actual chat invite/pinned group bubble on a screen, not a paper card | The invitation looks social, not analytical. | normal chat bubbles, contact cards |
| h10 | `stock_dragon_tiger_clip` | newspaper/app clipping half under a mug, showing seats/flow rather than recommendation | Institutional movement is mistaken for safety. | ordinary news, paper scraps |
| h11 | `stock_sell_house_sheet` | house photo plus mortgage/sell-house math beside keys | Life asset is being converted into chasing ammo. | ordinary keys, old property photo, repayment envelope |
| h12 | `stock_risk_disclosure_corner` | folded risk disclosure under a heavier object | The warning exists but is physically covered. | ordinary agreements, envelopes |
| h13 | `stock_heat_push_phone` | phone/desktop push that says the heatlist is hot now | Heat is presented as urgency. | normal push notifications, time display |

## Decoy Requirement

The final image must include at least 26 believable decoys:

- ordinary bills near debt/risk clues
- normal receipts near gain/limit-up clues
- normal phone UI regions near true phone subparts
- ordinary screenshots/photos near gain screenshots
- blank sticky notes near percentage tabs
- ordinary news clippings near dragon-tiger clue
- keys, coins, charger, mug, snacks, cables, pens, calendar, books, and tissue clutter

Late-level difficulty should come from this density and object similarity, not from unreadable tiny text.

## Interaction And Calibration

- Freeze final raster before calibration.
- Measure each clue center in source pixels.
- Record every center and bounding box in `docs/stock-hotspot-calibration.md`.
- `hitX/hitY` must land on the meaningful subpart, not the surrounding paper or desk.
- Found marker and hit animation must stay smaller than the object.
- Playwright screenshots must cover start, mid-progress, completion, mobile, and final-hint path.

## Review Gate

Reject the art if any of these are true:

- the scene can be solved by clicking every readable text block
- stock clues are mostly paper labels
- a digital behavior is drawn as an unexplained physical card
- Zhou Qiming has no visible state change
- objects are pasted with mismatched edge, light, scale, or shadow
- a clue needs UI copy to explain why it matters
- hotspots are guessed from prompt text instead of measured from pixels
