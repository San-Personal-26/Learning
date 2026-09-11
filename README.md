# Year 8 Maths Explorer

An interactive maths learning platform for a specific small set of kids — personal/family use only, not a public product. Built around the UK National Curriculum for Key Stage 3 (Year 8), starting with maths.

See [`CLAUDE.md`](./CLAUDE.md) for the full project scope, pedagogy, and architecture conventions — read that first before changing anything here.

## What's in this repo

- `CLAUDE.md` — project scope, pedagogy, and architecture rules (read this first).
- `LESSON_TEMPLATE.md` — the required page structure, design system, and pre-publish checklist every lesson must follow.
- `CURRICULUM_REFERENCE.md` — the Year 8 National Curriculum objectives this project maps lessons to.
- `PROGRESS.md` — current status of every lesson (built/verified/published/committed) and known issues — check this before starting new work.
- `lessons/` — one self-contained HTML/CSS/JS prototype per sub-skill, built and reviewed individually before being folded into a shared site structure.

## Status

Currently in the prototype phase: each lesson in `lessons/` is a standalone file with its own copy of the shared design system. A consolidation pass — extracting shared CSS/JS into reusable files and building a real site skeleton (navigation, curriculum map, per-child profiles with progress tracking) — is planned once the lesson template has proven itself across enough sub-skills. See `PROGRESS.md` for the current recommendation on what's next.

## Hosting

Served as a static site via GitHub Pages once the site skeleton exists — no backend, no build step, no paid services (see `CLAUDE.md`'s "Keep the stack as simple and cheap as possible" principle).

## Workflow

- Backlog and task tracking: GitHub Issues + a GitHub Projects Kanban board.
- Built collaboratively using Claude chat (planning, content, per-lesson prototyping) and Claude Code (multi-file structural work, consolidation, site skeleton).
