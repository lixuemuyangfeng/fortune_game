# Convenience Hotspot Calibration

Base image: `public/assets/game/convenience/states/convenience-progress-0.png`

Image size: `1672x941`

Runtime stage: `1280x720`

Scale rule:

```text
imageX = hitX / 100 * 1672
imageY = hitY / 100 * 941
```

These centers were recalibrated after the 2026-05-27 local redraw pass.

| Hotspot | Target object | Percent center | Source image center | Source box |
| --- | --- | ---: | ---: | ---: |
| `h1` 中间那张刮花废票 | distinct bent middle losing ticket under glass counter | `46.2, 82.8` | `772, 779` | `120x122` |
| `h2` 遮金额中奖合影 | taped-over prize amount inside the winner photo | `81.1, 25.9` | `1356, 244` | `167x77` |
| `h3` 付款码旁加购贴 | checkout payment-code add-on prompt on the blue sign | `77.7, 68.1` | `1299, 641` | `90x130` |
| `h4` 西装内袋废票 | bent losing ticket protruding from salesman pocket | `52.6, 34.6` | `879, 326` | `70x77` |
| `h5` 柜台这本快了牌 | worn shop tag beside the lottery booklet | `65.6, 67.2` | `1097, 632` | `134x83` |
| `h6` 老板娘指的彩票本 | lottery booklet under shopkeeper finger | `49.6, 65.1` | `829, 613` | `311x102` |
| `h7` 最高奖金立牌 | maximum-prize strip on the right display stand | `88.3, 47.0` | `1476, 442` | `187x92` |

Local redraw notes:

- Removed the rider phone memo from the evidence set because it read as a bystander fantasy, not a purchase trigger.
- Replaced the counter arrow sign with a worn shop tag near the lottery booklet.
- Reworked the ticket row so one middle scratched ticket is the intended target.
- Reworked the winner photo amount area as taped-over physical paper.
- Replaced right-side real-world lottery branding with fictional in-world scratch-card signage.
- Retargeted the tea-bottle evidence to the maximum-prize stand because the tea is only the errand object, not the inducement.
- Tightened the new `付款码旁加购贴` and `最高奖金立牌` centers after source-image crop review on 2026-05-29.

Known review risk: `progress-1` through `progress-7` are now distinct local composites, but they still come from generated full-scene variants rather than a clean transparent character-layer pipeline. Treat them as playable progress art, not final layered production assets.
