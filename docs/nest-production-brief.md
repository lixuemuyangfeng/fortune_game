# Nest Level Production Brief

## Theme

`暴富噪声母巢` handles the final anxiety: all previous wealth-noise systems recombine into one machine that must be classified, paired, and dismantled.

## Scene Logic

The basement under `暴富幻想所` is a salvage-processing room. Objects from the first six cases have been dragged downstairs: office keyboards, rooftop gold receipts, lottery waste, social-media fragments, AI course devices, and meeting-room blame pipes. Zhou Qiming is no longer passively hit by the noise; he is in the room as an operator, sorting fragments into tagged trays before feeding them into a central crusher.

## Layout Map

```text
Canvas: 1280 x 720, 16:9, no runtime crop.
Foreground: trays, tags, cables, ticket scraps, receipts, keys, course timer, sealed evidence bags.
Midground: central mother-nest crusher, Zhou Qiming operating a sorting table, six pollution-source clusters.
Background: shelves with previous-level relics, pipe wall, warning lamps, glass jars, furnace chute.
Quiet zones: local object clusters only; no global answer markers.
Forbidden zones: Zhou's face and hands, central crusher mouth, screen borders, overlapping true clue clusters.
```

## Difficulty Plan

Seventh level must increase after the 10-clue meeting level, so it uses 12 true clues and at least 30 same-category decoys. It should not be solvable by clicking text. True targets are small subparts or relationships inside noisy clusters.

## Clue Plan

The final gameplay theme is pairing counter-tags with pollution sources. The current Phaser implementation expresses this as 12 hidden-object targets: six source relics and six counter-tag plates. Each target has same-category decoys nearby.

| ID | Evidence | Visible clue body | Why it belongs | Same-category decoys |
| --- | --- | --- | --- | --- |
| h1 | `nest_office_noise_core` | cracked office keyboard feeding a market-chart paper into a small grinder | `踏空噪声` from level 1 | normal keyboards, office paper, coffee cups |
| h2 | `nest_gold_receipt_heat` | folded gold receipt half-burned under a cooling lamp | `接盘幻影` from level 2 | ordinary receipts and metal tags |
| h3 | `nest_lottery_near_miss_roll` | roll of failed scratch tickets with one repeated near-miss pattern | `差一点怪圈` from level 3 | ordinary tickets and wrappers |
| h4 | `nest_social_filter_shard` | phone/photo-filter lens shard reflecting a staged apartment photo | `高光滤镜兽` from level 4 | normal photos, lenses, photo sleeves |
| h5 | `nest_ai_panic_meter` | course timer plugged into a blinking AI-demo laptop module | `替代恐慌体` from level 5 | ordinary chargers, timers, screens |
| h6 | `nest_meeting_blame_pipe` | meeting-room pipe/funnel labeled by arrows from resource slide to Zhou's tray | `画饼增殖体` from level 6 | normal pipes, folders, binder clips |
| h7 | `tag_not_every_car` | small metal tag pinned near a toy car/market ramp | counter to `踏空噪声` | spare tags with harmless icons |
| h8 | `tag_stubborn_not_strategy` | cracked shield tag beside gold receipt scraps | counter to `接盘幻影` | other shield/medal tags |
| h9 | `tag_near_miss_not_next` | stop-token tag laid across a scratch-ticket roll | counter to `差一点怪圈` | ordinary tokens and ticket clips |
| h10 | `tag_publishable_version` | film-frame tag clipped to a staged photo corner | counter to `高光滤镜兽` | ordinary clips and photo corners |
| h11 | `tag_panic_sellers_profit` | price-tag-shaped warning hanging from the AI course timer cable | counter to `替代恐慌体` | other cable tags and labels |
| h12 | `tag_no_resource_blame` | sealed process tag attached to a locked budget/blame pipe valve | counter to `画饼增殖体` | ordinary valve labels and seals |

## Character Plan

Required state count: `progress-0` through `progress-12`. Playable implementation may use same-camera full-scene progress rasters, but final production should replace them with true same-camera posture/expression redraws.

- `progress-0`: Zhou is overwhelmed by the mixed noise, one hand on the sorting table.
- `progress-1..4`: starts separating relics into trays.
- `progress-5..8`: posture straightens; he points tags toward the correct noise clusters.
- `progress-9..12`: calm operator stance; the mother-nest crusher is being fed in order.

## Interaction Plan

Hotspots must be measured from the final 1280x720 raster. Found markers must be smaller than clue bodies and should sit on the exact subpart: keyboard crack, folded receipt, ticket roll edge, lens shard, timer plug, pipe valve, or tag plate.

## Prompt Contract

```text
Use case: stylized-concept game scene raster
Scene purpose: final hidden-object level where all previous wealth-noise sources are sorted and dismantled in a basement salvage room.
Camera/layout: fixed 16:9 basement workshop, dense but readable, central crusher in midground, foreground sorting table, shelves and pipe wall in background.
People: Zhou Qiming, tired but now focused, human-scaled, operating a sorting table or crusher controls, proper contact shadows.
Required clue objects: cracked office keyboard/market paper, folded gold receipt under cooling lamp, roll of failed scratch tickets, phone/photo-filter shard, AI course timer/laptop module, meeting blame pipe/valve, and six small counter-tags paired with those source clusters.
Decoys: ordinary receipts, tickets, keys, sticky notes, cables, chargers, tags, cups, folders, photo sleeves, old keyboards, pipe labels, drawers, binders, lamps, jars.
Lighting/color: deep green/warm gold game palette, basement industrial light, low-saturation metal/paper/glass/plastic materials, coherent shadows.
Readability: object silhouettes clear at game size; meaning delayed by object relationship and decoys; no click-all-text solution.
Forbidden: huge explanatory labels, red boxes, numbered clues, answer markers, toy people, floating props, all clues as paper slips, empty scenic background, dashboard UI.
Output/layers: one coherent 16:9 raster suitable as accepted base image; same-camera progress variants preserve clue positions.
```
