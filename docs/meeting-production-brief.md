# Meeting Level Production Brief

## Theme

`邢总画饼复盘会` handles one anxiety: responsibility gets disguised as opportunity when resources disappear.

## Scene Logic

It is 09:00 in a glass meeting room after a rushed review meeting. The boss has left a confident presentation on the screen, but the room tells the truth: cold coffee, a blinking projector, scratched whiteboard, empty chairs, rejected headcount forms, budget freeze stamps, overwritten meeting minutes, and unsigned collaboration sheets. Zhou Qiming is physically present in the meeting room, carrying the weight of the action list.

## Layout Map

```text
Canvas: 1280 x 720, 16:9, no runtime crop.
Foreground: meeting table edge with forms, coffee, calendar, pens, laptop, action list, rejected headcount request.
Midground: Zhou Qiming, boss chair/laser pointer, screen/projector, whiteboard, empty chairs.
Background: glass wall, office silhouettes, cabinet, flip chart, meeting-room clutter.
Quiet zones: lower-right table edge and upper-left glass wall for small found markers.
Forbidden zones: protagonist face, boss face if present, screen title center, UI intro card area, all hotspot overlaps.
```

## Clue Plan

Sixth level must increase difficulty after the 9-clue AI-launch level, so it uses 10 clues.

| ID | Evidence | Visible clue body | Why it belongs | Same-category decoys |
| --- | --- | --- | --- | --- |
| h1 | `empty_resource_collab_slide` | slide/table showing resource collaboration with blank partner boxes | Resources are promised but not assigned | normal charts and slide thumbnails |
| h2 | `zhou_only_owner_column` | action list / RACI sheet where only Zhou's row is filled | Responsibility is moved to one person | other meeting sheets and name tags |
| h3 | `risk_page_crossed_out` | risk page with red cross-out or crumpled discard | Risk is suppressed instead of handled | other draft pages and sticky notes |
| h4 | `minutes_scope_creep` | meeting minutes overwritten from draft to full proposal | The deliverable expands after the meeting | ordinary minutes and notebooks |
| h5 | `target_budget_gap_chart` | target-up / budget-down chart beside calculator | Opportunity has no money behind it | ordinary charts and calculators |
| h6 | `rejected_headcount_form` | headcount request with rejection mark beside empty chair | Target grows while people do not | normal HR/attendance papers |
| h7 | `friday_deadline_calendar` | calendar with Friday circled next to cold coffee | Urgency is transferred to Zhou's week | ordinary calendars and mugs |
| h8 | `opportunity_laser_pointer` | boss pointer/remote aimed at "opportunity" while task list points away | Slogan hides the handoff | other remotes and clickers |
| h9 | `budget_locked_folder` | locked budget folder/box beside the target chart | Opportunity is public, budget is locked | ordinary folders and seals |
| h10 | `erased_whiteboard_risk` | whiteboard risk notes and target arrows left behind after the meeting | Risk was discussed but not carried into the task story | ordinary whiteboard notes and magnets |

## Character Plan

Required state count: `progress-0` through `progress-10`. For the first playable implementation, use same-camera full-scene progress rasters. Final art should replace mechanical variants with true expression/posture changes:

- `progress-0`: tense, cornered, looking at the task list.
- `progress-1..3`: still guarded, starts separating slogans from facts.
- `progress-4..7`: calmer, pointing at missing resources and crossed-out risks.
- `progress-8..10`: dry-smiling, ready to route the responsibility back through process.

## Interaction Plan

Hotspots must be measured from the final 1280x720 raster. Hit effects stay local and smaller than the clue: stamp pulse, redline slash, scope-creep overwrite, budget-lock blink, calendar ring, pointer sparkle, signature-box scan.

## Prompt Contract

```text
Use case: stylized-concept game scene raster
Scene purpose: hidden-object game level about responsibility transfer disguised as growth opportunity in a corporate review meeting.
Camera/layout: fixed 16:9 glass meeting room, dense table and screen composition, foreground paperwork, midground protagonist and meeting screen, background glass office.
People: Zhou Qiming, 38-year-old tired Chinese office worker, human-scaled, seated/leaning naturally in a meeting room; one boss presence can be implied by a chair, hand, pointer, or silhouette, not a distracting main character.
Required clue objects: resource-collaboration slide with blank partner boxes, action list with only Zhou as owner, crossed-out risk page, overwritten meeting minutes, target-up/budget-down chart, rejected headcount request beside empty chair, Friday deadline calendar with cold coffee, opportunity laser pointer/remote, locked budget folder/box, whiteboard risk notes.
Decoys: ordinary slides, meeting notes, pens, mugs, laptops, name tags, attendance sheets, folders, sticky notes, whiteboard scribbles.
Lighting/color: deep green/warm gold game palette, morning office light through glass, cool projector light, low saturation, coherent paper/metal/glass/cloth materials.
Readability: clue bodies clear at game size but meaning delayed by object relationships; do not rely only on tiny text.
Forbidden: giant PPT text answers, empty glass-room scenery, all clues on one table pile, floating props, pasted cutout person, answer labels, numbered clues, red boxes, baked-in markers, cartoon dashboard UI.
Output/layers: one coherent 16:9 raster suitable as accepted base image; same-camera progress variants preserve all clue bodies.
```
