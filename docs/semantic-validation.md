# Level Semantic Validation

This project treats clue semantics as a build-time concern, not only a review comment. New or revised levels must pass `npm run semantic:check` before handoff.

## What The Tool Checks

- Clue count increases across the campaign order: office, rooftop, convenience, social, AI launch, meeting, nest.
- Later levels include enough decoys to avoid "click every interesting thing" gameplay.
- Every hotspot label and evidence title has a concrete visible anchor: phone, screen, receipt, bill, note, form, tag, key, chart, stamp, card, sign, etc.
- Evidence detail explains the object-context relationship, not just a moral or abstract judgment.
- Evidence feedback has enough text to connect the clicked object to the narrative response.
- Runtime/config copy must not leak implementation language such as Phaser, placeholder, TODO, or temporary-art wording.
- Warnings flag same-object overuse, such as too many ticket clues in one scene, for manual review.

## Semantic Review Pattern

For every clue, write the relationship in this format before generating or wiring art:

```text
visible object -> nearby context -> why this creates the urge/noise -> why the counter-message is fair
```

Examples:

- `待人工复核清单 -> AI 演示屏旁边 -> 说明生成结果仍然需要人工确认 -> 工具能生成结果，流程还会把人叫回来确认`
- `红章兜底流程 -> 同一表单下方的已受理章 -> 说明自动化最后仍靠人工接责任 -> 自动化很强，兜底流程仍然要人盖章`
- `平板结账倒计时 -> 课程付款屏旁边的 23:59 -> 先制造来不及再让人付款 -> 学习可以，别把恐慌当付款理由`

Reject the clue if this chain cannot be written without explaining away the image.

## Hook

- `npm run semantic:check`: fast semantic validation.
- `npm test`: runs `semantic:check` first, then config validation.
- `npm run test:e2e`: validates the playable flow, decoy behavior, hint flow, and screenshots.

Semantic validation is deliberately heuristic. It catches low-level mistakes early, but it does not replace screenshot review or source-pixel hotspot calibration.
