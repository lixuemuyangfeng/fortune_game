# Level Completion Design

## Goal

Finish the current `fortune-game` prototype as a coherent three-level browser-game slice: office, moments, and temple. Each level should clearly communicate what the player is doing, where to click, what changed after a click, and why the scene matters in the game's satire.

## Recommended Approach

Use the existing Vite + TypeScript DOM renderer and strengthen the content/configuration layer. This is the right scope because the project already has scene, hotspot, sorting, facility, and sharing loops; replacing the renderer would slow delivery without improving the current prototype's main weakness: incomplete level content and uneven feedback.

Alternative approaches considered:

- Rebuild in Phaser: better long-term for a larger 2D game, but too disruptive for this milestone.
- Keep adding only static content: fastest, but interaction quality would stay uneven.
- Finish three strong levels now: best balance of polish, scope, and testability.

## Player Flow

1. Player lands on the office level intro.
2. Player starts the challenge and finds all visible wealth-anxiety objects.
3. Each found object produces a short counter-message and visible animation.
4. Completing a level unlocks the processing/sorting/management panels and a next-level button.
5. Player advances to moments, then temple.
6. Sorting, resources, facility upgrades, cards, and personality sharing continue to use found evidence across the session.

## Level Arc

Office is the starting scene: workplace pressure, gold FOMO, AI anxiety, boss messages, fund loss, and lottery coping.

Moments is the social comparison scene: profit screenshots, gold phones, mortgage pressure, AI layoff posts, and hidden loss corners. It should feel like a phone/social feed wall, not a generic fallback scene.

Temple is the low-cost fantasy scene: incense, wish wall, lottery stand, macro news signs, and boss-call omens. It should feel like a ritualized emotional processing room, not only a joke background.

## Interaction Standards

- Before start: no accidental hotspot clicks; the intro card explains the threat.
- During search: target areas must be large enough for desktop and mobile clicks.
- Hint: reveals the next unfound target without auto-solving it.
- Found state: object remains visible, marked, and logged.
- Completion: clear badge, machine output, next-level button when available.
- Sorting: selected evidence and emotion buttons remain visible after each level.

## Visual Standards

- Each level uses a distinct background image or constructed scene.
- Important objects use real asset files rather than invisible hit zones.
- Scene-specific atmosphere is allowed, but text and buttons must not obstruct click targets.
- Mobile layout must keep the playfield readable and buttons accessible.
- Avoid a single-hue look; use the existing green, gold, red, and neutral palette with per-level accents.

## Testing And Verification

Add a dependency-free Node test script that validates level configuration:

- every scene has at least five hotspots;
- every hotspot references existing evidence;
- every hotspot has a click target and visible asset;
- every scene has narrative metadata and a completion machine;
- all referenced public assets exist.

Then run:

- `npm test`
- `npm run build`
- browser playtest through all levels on desktop and mobile widths.

## Out Of Scope

- New engine migration.
- Server APIs.
- Real ad SDK integration.
- New monetization systems.
- Full campaign beyond the three currently configured levels.
