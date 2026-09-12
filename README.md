# Learning Platform

An interactive learning platform for a specific small set of kids — personal/family use only, not a public product. Built around the UK National Curriculum for Key Stages 2 and 3, starting with maths.

See [`CLAUDE.md`](./CLAUDE.md) for the full project scope, pedagogy, and architecture conventions — read that first before changing anything here.

## What's in this repo

- `CLAUDE.md` — project scope, pedagogy, and architecture rules (read this first).
- `docs/LESSON_TEMPLATE.md` — the required page structure, design system, and pre-publish checklist every lesson must follow.
- `PROGRESS.md` — current status of every lesson (built/verified/published/committed) and known issues — check this before starting new work.
- `subjects/maths/curriculum/ks3-reference.md` — the KS3 maths National Curriculum objectives this project maps lessons to.
- `subjects/maths/MATHS_NOTES.md` — maths-specific component classes and interaction patterns (addendum to the universal template).
- `subjects/maths/ks3/year-8/lessons/` — one HTML/CSS/JS prototype per sub-skill.

## Status

Maths (KS3, Year 8) is the only subject built out so far, with 6 lessons across 4 strands. See `PROGRESS.md` for lesson status and what's next.

## Hosting

Served as a static site via GitHub Pages — no backend, no build step, no paid services (see `CLAUDE.md`'s "Keep the stack as simple and cheap as possible" principle).

## Workflow

- Backlog and task tracking: GitHub Issues + a GitHub Projects Kanban board.
- Built collaboratively using Claude chat (planning, content, per-lesson prototyping) and Claude Code (multi-file structural work, consolidation, site skeleton).
