# AI Launch Level Production Brief

## Theme

`AI 发布会公开处刑` handles one anxiety: AI change is real, but panic merchants turn it into an immediate personal extinction story.

## Scene Logic

It is 02:00 in Zhou Qiming's living room and work corner. He has been watching AI launch replays, course ads, and internal-workflow examples for too long. The room is not a sci-fi lab. It is a tired home workstation: cold noodles, mugs, family clutter, work notebooks, company forms, old USB tokens, chargers, bills, and two screens. The tension comes from the gap between polished AI demos and the messy company processes that still require people, approvals, and blame.

## Layout Map

```text
Canvas: 16:9, 1280x720 game scene, left mission panel outside image.
Foreground: table edge, cold food, chargers, approval stamps, loose forms, decoy receipts.
Midground: Zhou Qiming at the desk/couch, main monitor/laptop/tablet cluster, notebooks and old company tools.
Background: window at night, bookshelf, printer/router, cardboard boxes; supports fatigue, not decoration-first scenery.
Quiet zones: upper-left wall/window and lower-right desk corner for small found markers.
Forbidden zones: protagonist face and hands, main monitor title area, screen borders, identical paper piles.
```

## Clue Plan

Fifth level must increase difficulty after the 8-clue social level, so it uses 9 clues.

| ID | Evidence | Visible clue body | Why it belongs | Same-category decoys |
| --- | --- | --- | --- | --- |
| h1 | `polished_ai_demo_rows` | Monitor demo panel with unnaturally perfect rows/cards | Launch demo looks too clean for real company data | Ordinary browser/video cards around it |
| h2 | `manual_review_sheet` | Physical pending-review sheet beside the automated AI screen | AI output still returns to manual process checks | Other meeting papers and notes |
| h3 | `panic_course_checkout` | Course checkout card with timer/hourglass and payment state | Fear becomes a paid rescue product | Ordinary sticky notes, calendar cards |
| h4 | `legacy_ie_token` | Old USB token/IE compatibility icon beside modern AI screen | AI cannot replace legacy systems overnight | Other cables, adapters, drives |
| h5 | `approval_chain_notebook` | Notebook org chart with red circles and arrows to approvers | Work still depends on who can approve budget | Other notebooks and books |
| h6 | `manual_stamp_queue` | Stack of forms with physical approval stamp/chop | Human workflow remains manual | Ordinary receipts and paper stacks |
| h7 | `seventeen_tabs_fatigue` | Browser tab strip / second device overloaded with video thumbnails | Panic comes from binge-watching, not facts | Normal open tabs and bookmarks |
| h8 | `job_replacement_clip` | Clipped job-risk newspaper/paper tucked under keyboard | Replacement fear is clipped and amplified | Normal clippings and family papers |
| h9 | `boss_followup_unanswered` | Phone notification/voice memo left unanswered beside the desk | AI can draft, but boss follow-up still lands on him | Other phone notifications or chat bubbles |

## Character Plan

Required state count: `progress-0` through `progress-9`. For this implementation pass, use same-source full-scene progress rasters to avoid pasted character overlays. Camera and clue bodies stay fixed; only Zhou Qiming's expression, posture, screen attention, and local light should cool down gradually.

Progress direction:

- `progress-0`: rigid, sleepless, face lit by screen.
- `progress-1..3`: still tense, starts looking away from the keynote.
- `progress-4..6`: shoulders loosen, phone/laptop no longer dominate his gaze.
- `progress-7..9`: calmer, skeptical rather than frightened.

## Interaction Plan

Hotspots must be measured from the final raster, recorded in `docs/ai-launch-hotspot-calibration.md`, and verified in Playwright screenshots. Hit effects stay local and smaller than the clue: screen scan, note underline, stamp pulse, small tab flicker, phone vibration ring.

## Prompt Contract

```text
Use case: stylized-concept game scene raster
Scene purpose: a hidden-object game level about AI replacement panic amplified by launch videos and paid courses.
Camera/layout: fixed 16:9, dense believable home workstation at 02:00, foreground desk clutter, midground protagonist and screen cluster, background window/bookshelf/printer.
People: Zhou Qiming, 38-year-old exhausted Chinese office worker, human scale, seated/leaning naturally at home, not a mascot, not pasted, no floating body.
Required clue objects: polished demo monitor rows, AI meeting-summary tablet/page, course checkout timer/hourglass, old IE/USB token, approval-chain notebook, physical stamp/form queue, overloaded tab strip, job-risk clipping, unanswered boss phone.
Decoys: normal receipts, notebooks, books, cables, chargers, mugs, ordinary tabs, ordinary sticky notes, regular paperwork.
Lighting/color: deep green game palette, warm desk lamp, cool blue screen light, low saturation, material contrast from paper, metal, glass, plastic, cloth.
Readability: objects clear at game size but meaning delayed by context; no clue relies only on tiny text.
Forbidden: empty scenic room, one giant phone, all clues on one screen, obvious answer labels, floating props, pasted cutout character, unrelated warning signs, numbered clue labels, huge readable tutorial text.
Output/layers: one coherent 16:9 raster suitable as the accepted base image; progress variants must preserve camera and clue positions.
```
