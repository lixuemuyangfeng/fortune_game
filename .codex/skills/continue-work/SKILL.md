---
name: continue-work
description: Continue a long-running coding task after context compression, interruption, or session resume. Use when the user asks to keep working, resume, recover context, or finish an in-progress task.
---

# Continue Work

## Purpose

Use this skill to recover task context from durable project files and the current worktree, then continue the task without restarting from scratch.

## Recovery Workflow

1. Read `TASK_STATE.md` first.
2. Run `git status --short` to understand current changes.
3. Inspect relevant diffs before editing any modified file:
   - `git diff -- <path>`
   - `git diff --stat`
4. Read nearby implementation files and project docs as needed:
   - `AGENTS.md`
   - `IMPLEMENTATION.md`
   - `PRODUCT_BLUEPRINT.md`
   - Relevant files under `src/`
5. Rebuild the working plan from:
   - The latest user message
   - `TASK_STATE.md`
   - Current source files
   - Current git diff
   - Latest test or build output
6. Continue from the current worktree state.

## Update Rules

Update `TASK_STATE.md` when any of these happen:

- The current goal changes.
- A meaningful milestone is completed.
- A verification command is run.
- A blocker is found.
- You are about to stop with incomplete work.

Keep updates short, factual, and useful for the next agent turn.

## Verification

For this project, prefer `npm run build` as the default final check unless the active task calls for a different command.

If verification cannot run, record the reason in `TASK_STATE.md` and mention it in the final response.

## Handoff Format

When stopping before the task is complete, make sure `TASK_STATE.md` includes:

- Current goal
- Completed work
- Next concrete step
- Known blockers
- Latest verification result

