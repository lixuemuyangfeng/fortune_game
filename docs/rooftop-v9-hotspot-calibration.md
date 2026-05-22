# Rooftop V9 Hotspot Calibration

Base image: `public/assets/game/rooftop/states/rooftop-v9-progress-0.png`

Image size: `1672x941`

Runtime stage: `1280x720`

Scale rule: Phaser fits the image to stage width, so percentage coordinates in `src/core/config.ts` can be converted to source pixels with:

```text
imageX = hitX / 100 * 1672
imageY ~= hitY / 100 * 940.5
```

The tiny Y difference comes from the source image being a fraction taller than exact 16:9 and Phaser center-cropping by about 0.19 runtime pixels.

| Hotspot | Target object | Percent center | Source image center | Source box |
| --- | --- | ---: | ---: | ---: |
| `h1` 金店小票 | right foreground gold-shop receipt | `77.1, 83.6` | `1289, 787` | `87x68` |
| `h2` 稳健避险交流群 | center-left hand-held chat phone screen | `44.1, 36.2` | `737, 341` | `60x68` |
| `h3` 避险快讯截图 | AC-unit risk-news poster | `92.7, 31.2` | `1550, 294` | `114x105` |
| `h4` 跌幅提醒手机 | right toolbox black price-alert phone screen | `85.7, 71.9` | `1432, 676` | `54x49` |
| `h5` 踩线告示 | white boundary-risk notice below the yellow electrical sign | `33.0, 32.5` | `552, 306` | `70x81` |
| `h6` 杠杆合同边角 | right toolbox contract folder and key ring | `96.2, 76.4` | `1608, 719` | `87x83` |

Calibration rule: generated art cannot reliably encode exact clickable center points. Treat the final raster as immutable, record the object center in source-image pixels, then convert to config percentages. Do not infer points from prompt text after generation.
