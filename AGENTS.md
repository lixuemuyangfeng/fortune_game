# AGENTS.md

## Project Overview

This repository is a Vite + TypeScript game project named `fortune-game`.

Primary source files live in `src/`:

- `src/main.ts` starts the app.
- `src/core/` contains shared game configuration, state, and types.
- `src/features/` contains feature views.
- `src/platform/` contains platform adapters.
- `src/styles.css` contains global styles.

Product and implementation context may be documented in:

- `PRODUCT_BLUEPRINT.md`
- `IMPLEMENTATION.md`
- `TASK_STATE.md`

## Commands

- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Build and type-check: `npm run build`
- Preview production build: `npm run preview`

## Working Rules

- Read the relevant code before editing.
- Prefer existing project patterns over new abstractions.
- Keep changes scoped to the requested task.
- Do not revert user changes or unrelated dirty worktree changes.
- Use `rg` or `rg --files` for search when available.
- Use `apply_patch` for manual file edits.
- Run relevant checks before finishing, usually `npm run build` for this project.

## Work Status Protocol

For any task that may take more than a few minutes, clearly mark work state in user-facing updates:

- `[开始]`: state the goal, immediate action, and next expected update time.
- `[执行中]`: state the command or concrete action currently running.
- `[等待中]`: state what result is being waited on, such as build, recording, browser verification, or sub-agent output.
- `[15min同步]`: send this every 15 minutes during long work, even when there is no major new result. Include current conclusion, completed work, current action, risks/blockers, and next step.
- `[结束]`: state that active work has stopped, summarize result, verification, and remaining risks.

If work is interrupted or context is compacted, resume this protocol after reading `TASK_STATE.md`.

## Session Discipline

Multiple Codex sessions can technically point at the same working directory, but only one session should actively write in this worktree at a time.

- Treat the current user-facing session as the primary writer unless the user explicitly delegates parallel work.
- If parallel work is needed, prefer separate `git worktree` directories.
- Before editing, inspect `git status --short` and relevant diffs to avoid overwriting another session's changes.
- If another session appears to be actively writing in this directory, pause and report the conflict instead of editing the same files blindly.

## Context Compression And Recovery

When continuing after context compression, interruption, or a resumed session:

1. Read `TASK_STATE.md`.
2. Check `git status --short`.
3. Inspect relevant diffs with `git diff` before editing files that are already modified.
4. Reconstruct the active task from the task state, current files, and latest user message.
5. Continue from the current workspace state rather than restarting from scratch.
6. Update `TASK_STATE.md` when the task materially changes, a milestone is completed, tests are run, or a blocker appears.

## Task State Expectations

`TASK_STATE.md` should stay concise and current. It should include:

- Current goal
- Scope and constraints
- Completed work
- Next steps
- Known blockers
- Latest verification result

For long-running work, update it before any risky change and after each meaningful milestone.

## Final Response Expectations

When finishing a task, report:

- What changed
- Which checks were run
- Any remaining risks or follow-up work
