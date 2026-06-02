# Image Review & Optimize Loop

This document is the required loop for future level image generation and visual integration. It exists because the first two levels repeatedly failed in predictable places: unclear clue semantics, mismatched character scale, pasted-looking people, sparse layouts, same-looking clue bodies, off-center hotspots, and UI copy that exposed implementation language.

The loop is not optional for new level art. A level image is not ready for handoff until every gate below is marked pass with screenshots or source-pixel notes.

## Generation Brief

Before generating or editing an image, write a one-page brief with these decisions. Do not generate first and explain later.

- Theme: one sentence naming the exact anxiety/fantasy the level is about.
- Scene logic: why these people and props are in this location.
- Camera: fixed 16:9 frame, main action area, foreground/midground/background roles.
- Density: enough believable objects to hide clues; no large empty floor/wall areas unless emptiness is the clue.
- Character plan: main/proxy character, `N + 1` visible progress states, and how posture/expression changes per clue.
- Clue plan: each clue is a specific object with a visible shape and a reason to exist in the scene.
- Interaction plan: each clue has a source-pixel center, hit box, animation kind, and found marker position.
- UI plan: left panel copy must be player-facing, not implementation-facing.

## Practical Image Generation Workflow

Use this workflow before any new scene image, not only after a bad result appears.

### 1. Lock the Layout Before Rendering

Do not ask the model for "a rich scene" and hope it composes correctly. First write a layout map in plain language:

```text
Canvas: 16:9, game crop must leave the left mission panel outside the image.
Foreground: 2-3 occluding props and 1-2 small clues.
Midground: main character, social/action cluster, most interactive clues.
Background: setting proof only, never more visually important than the playable area.
Reserved quiet zones: where UI callouts or found markers may appear.
Forbidden zones: character faces, main hands, screen edges, future hotspot overlap areas.
```

For dense hidden-object scenes, the midground must carry the game. If skyline, wall, floor, or decorative scenery takes more attention than the clue area, regenerate the composition before polishing.

### 2. Generate in Passes, Not One Giant Prompt

Use a staged process:

1. Composition pass: low-detail scene layout, people positions, big props, camera, lighting.
2. Semantic pass: add or correct clue-bearing objects so every clue has a believable body.
3. Character pass: lock scale, posture, expression direction, and contact shadows.
4. Clarity pass: remove ambiguous labels/objects, diversify clue shapes, improve mobile readability.
5. State pass: create `progress-0` to `progress-N` variants from the accepted base image.
6. Calibration pass: freeze final raster and record source-pixel hotspot centers.

Do not polish a composition that already fails scale, logic, or clue semantics. Throw it away or edit the large structure first.

### 3. Use Reference Roles Explicitly

When using images as references, label each one:

- Style reference: lighting, palette, material feel only.
- Layout reference: camera and object distribution only.
- Character reference: identity, body scale, wardrobe, and expression direction.
- Edit target: the actual image to preserve.
- Insert object reference: a clue/object that must be integrated into the target.

Never let a style reference override layout, and never let an insert-object reference dictate the whole scene. This avoids the common failure where a phone, paper, or person arrives at the wrong scale because it dominated the generation.

### 4. Write Prompts as Contracts

Every production prompt should include these blocks:

```text
Use case: stylized-concept game scene raster
Scene purpose: <what anxiety/fantasy this level expresses>
Camera/layout: <16:9, perspective, foreground/midground/background>
People: <who is present, what each person is doing, why it makes sense here>
Required clue objects: <object list with placement and semantic reason>
Character state: <progress state and body-language change>
Lighting/color: <shared light direction, palette, material contrast>
Readability: <mobile-visible object silhouettes, no tiny text dependence>
Forbidden: <empty floor dominance, giant phones, floating props, pasted cutouts, unrelated warning signs, labels that spoil answers>
Output: <single coherent raster / clean background / transparent character / occluder layer>
```

If a clue depends on text, the text must be short, large, and secondary to the object shape. The object should remain understandable even if the text is unreadable.

### 5. Use Negative Prompts From Actual Failures

Carry these avoid items into future prompts when relevant:

- no oversized phones or upright phone props unless mounted as a screen
- no people floating, standing on pipes, clipping through walls, or lacking contact shadows
- no office-work poses in non-office locations
- no identical paper slips for every clue
- no unrelated safety signs used as financial clues
- no huge scenic background with an empty playable floor
- no pasted character with different sharpness, contrast, color temperature, or rim light
- no contact-sheet residue, extra limbs, cut-off torsos, or green-screen fringe
- no clue labels that only make sense in UI copy but not in the picture
- no answer-spoiling markers baked into the art

### 6. Prefer Local Edits Over Full Regeneration

After the base image passes composition and style, do not regenerate the entire scene for small fixes. Use targeted edits:

- Off-center hotspot: keep art, update source-pixel calibration.
- Wrong clue object: edit only that object area.
- Character scale/pose wrong: edit the character region and nearby shadows/occluders.
- Sparse local area: edit that region with crates, cables, cups, receipts, tools, shelves, or believable clutter.
- Palette mismatch: color-match the inserted region, do not recolor the whole scene unless the whole scene fails.

Full regeneration is reserved for structural failures: bad camera, empty layout, nonsensical scene premise, incompatible character placement, or clue distribution that cannot be repaired locally.

### 7. Build State Variants From an Accepted Base

For progress states, keep camera, props, clue positions, and lighting fixed. Only change the protagonist/proxy state and any intended small scene-state feedback.

Allowed state differences:

- expression, gaze, head angle
- shoulders, hands, body weight, seated/standing micro-pose
- held object state, smoke direction, phone posture, minor local light

Forbidden state differences:

- moving clue objects unless the clue was found and explicitly removed/marked
- changing camera angle or object scale between states
- changing unrelated background people or architecture
- introducing extra body parts or residue from a sheet/contact grid

If state variants drift, return to image editing from the accepted base instead of asking for "six similar images" from scratch.

### 8. Decide What Must Be Separate Layers

Use a single integrated raster only when the element never needs independent motion. Use separate assets when:

- the protagonist/proxy must animate or change state cleanly
- a foreground object must occlude a character
- a clue needs a hit animation inside its own bounds
- an object must be hidden, revealed, removed, or replaced

Required layer set for high-risk scenes:

```text
background-clean.png
foreground-occluders.png
character-progress-0..N.png or spritesheets
optional clue sprites for objects that need independent animation
final screenshot reference for calibration
```

## Image Generation Rules

Use these rules when prompting or editing raster art.

- Generate an integrated scene first: shared camera, lighting, lens, color temperature, material language, and level density.
- Do not paste mismatched cutouts into the final scene. If a character or object must animate independently, generate clean background, transparent character/object layer, and foreground occluders.
- Keep humans human-scaled. A phone cannot be larger than a head unless it is an intentional poster/screen. Sitting, standing, leaning, and hand-held props must respect gravity and contact shadows.
- Put people where their behavior makes sense. Rooftop people can brag, smoke, check phones, drink, or gossip; they should not look like office workers doing desk work on a roof.
- Make clues varied in form: phone, receipt, poster, ticket, key, bag, cup, chart, contract, screen, stamp, shelf object. Do not make all clues paper slips.
- Make clue semantics direct. A high-voltage sign is not automatically a financial-risk clue. If the clue is "杠杆合同", the visible object should read as contract/key/folder/debt, not a random warning label.
- For later levels, do not let "click every text block" become the solution. At least half of the clues should be readable from object state or object relationships without relying on text: a covered amount, a thumb hiding principal, a key sitting on a repayment envelope, a timer attached to a course device, a send button that was never pressed, or a pile of failed tickets arranged to imply near-miss pressure.
- Add believable decoys during the image brief, not after the fact. Decoys should share the same material family as clues, such as ordinary receipts near a debt notice, snacks near a course laptop, paper scraps near a contract, or household clutter near a bill.
- Preserve mobile readability. Important objects must still be identifiable when the scene is displayed in the game layout, not only in the raw image.
- Avoid single-hue palettes. Keep the game's deep-green/warm-gold identity, but use material contrast from paper, metal, cloth, plastic, skin, glass, and city light.

## Review Gates

Run these gates in order. If any gate fails, fix the image or config before moving on.

1. Theme Gate
   - Every major visible object supports the level theme or believable scene dressing.
   - No clue requires a written explanation to make sense.

2. Layout Gate
   - The image has foreground, midground, and background depth.
   - The playable area is not dominated by empty scenic background.
   - Clues are distributed across layers and object types, not dumped on one floor band.

3. Character Gate
   - Character scale, pose, grounding, shadows, and color match the scene.
   - The protagonist/proxy has `N + 1` visible states.
   - No state uses a pasted crop with unrelated scenery or contact-sheet residue.

4. Clue Gate
   - Every clue has a concrete visible object.
   - The object shape relates to the clue name and evidence copy.
   - Clues are findable but not spoiled by labels, hover states, or oversized markers.

5. Interaction Gate
   - Every hotspot is measured from the final raster source image, not guessed from the prompt.
   - `hitX/hitY` land on the object center or the most clickable meaningful subpart, such as a phone screen.
   - Hit effects and found markers are smaller than the clue unless the clue itself is large.

6. Color & Style Gate
   - People, props, and background share lighting and contrast.
   - No green-screen fringe, sticker edge, toy proportion, or pasted shadow.
   - UI text does not cover the scene, clip on mobile, or read like a dashboard.

7. Screenshot Gate
   - Capture `progress-0`, at least one mid-progress state, completion, and mobile first screen.
   - Inspect screenshots manually in the game shell, not only the raw generated image.
   - Reject if text is cut, clues are hidden by UI, found markers drift, or the image looks coherent only outside the game layout.

## Hotspot Calibration

Generated images cannot reliably encode exact pixel centers. The reliable workflow is:

1. Freeze the candidate final raster.
2. Measure each clue center in source image pixels.
3. Record object boxes and centers in a calibration doc.
4. Convert to config percentages.
5. Verify in Playwright screenshots after clicking/finding the clue.

For 16:9 Phaser scenes that fill a `1280x720` stage, use the current scene's source dimensions:

```text
hitX = imageX / sourceWidth * 100
hitY = imageY / sourceHeight * 100
```

If the runtime image is center-cropped, record the crop offset in the calibration doc and apply it consistently. Do not keep nudging coordinates without updating the source-pixel record.

## Required Loop

For each new or revised level image:

1. Draft the generation brief.
2. Generate or edit the art.
3. Run `npm run art:review -- <sceneId>` to create a review checklist.
4. Fill the checklist with pass/fail notes and source-pixel centers.
5. Update config and calibration docs.
6. Run Playwright and inspect screenshots manually.
7. Fix every failed item, then repeat from step 2 or step 4 depending on whether art or only coordinates changed.

The loop stops only when there are no remaining low-level issues: semantic mismatch, bad scale, pasted edges, sparse layout, unreadable clue, off-center hotspot, oversized feedback, UI clipping, or implementation-facing copy.
