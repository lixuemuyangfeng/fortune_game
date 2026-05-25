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

## Image Generation Rules

Use these rules when prompting or editing raster art.

- Generate an integrated scene first: shared camera, lighting, lens, color temperature, material language, and level density.
- Do not paste mismatched cutouts into the final scene. If a character or object must animate independently, generate clean background, transparent character/object layer, and foreground occluders.
- Keep humans human-scaled. A phone cannot be larger than a head unless it is an intentional poster/screen. Sitting, standing, leaning, and hand-held props must respect gravity and contact shadows.
- Put people where their behavior makes sense. Rooftop people can brag, smoke, check phones, drink, or gossip; they should not look like office workers doing desk work on a roof.
- Make clues varied in form: phone, receipt, poster, ticket, key, bag, cup, chart, contract, screen, stamp, shelf object. Do not make all clues paper slips.
- Make clue semantics direct. A high-voltage sign is not automatically a financial-risk clue. If the clue is "杠杆合同", the visible object should read as contract/key/folder/debt, not a random warning label.
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
