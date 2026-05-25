# Convenience Hotspot Calibration

Base image: `public/assets/game/convenience/states/convenience-progress-0.png`

Image size: `1672x941`

Runtime stage: `1280x720`

Scale rule:

```text
imageX = hitX / 100 * 1672
imageY = hitY / 100 * 941
```

These centers were estimated from the accepted base raster and must be tightened after the first Playwright screenshot review.

| Hotspot | Target object | Percent center | Source image center | Source box |
| --- | --- | ---: | ---: | ---: |
| `h1` 中间那张刮花废票 | single heavily scratched middle losing ticket under glass counter | `49.3, 77.1` | `824, 725` | `192x152` |
| `h2` 遮金额中奖合影 | right wall winner photo with covered amount | `79.9, 18.7` | `1336, 176` | `268x207` |
| `h3` 骑手休假备忘 | delivery rider phone memo | `37.1, 31.8` | `620, 299` | `87x145` |
| `h4` 西装内袋废票 | salesman pocket ticket | `53.5, 32.0` | `894, 301` | `114x124` |
| `h5` 柜台这本快了牌 | small counter note near lottery booklet | `62.1, 63.3` | `1038, 596` | `207x96` |
| `h6` 老板娘指的彩票本 | lottery booklet under shopkeeper finger | `49.8, 61.6` | `833, 580` | `311x126` |
| `h7` 周启明手里的无糖茶 | Zhou's tea bottle near lottery counter | `25.8, 61.8` | `431, 582` | `97x139` |

Known review risk: current `progress-1` through `progress-7` images are duplicated from the accepted base raster while the next local-edit pass creates true progress-state variants from this base. Do not treat these duplicated states as final production character-state art.
