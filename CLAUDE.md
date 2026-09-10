# CLAUDE.md

Guidance for Claude when working in this repository. This is a small-scale, personal/family educational platform for kids — keep every decision in service of that: simple, cheap to run, and easy for one person to maintain.

## Project overview

An interactive maths learning platform for children, starting with a single UK school year group. It is not a general tutoring product — it's built for a specific small set of kids, each with their own profile, and scoped tightly to keep the build manageable.

- Audience: children in the target year group (see Curriculum scope below); platform is designed to eventually extend across ages 8–15, but v1 is intentionally narrow.
- Purpose: personal/family use only. No revenue generation, no public sign-ups.
- Subject: maths only for v1. Other subjects are out of scope until maths is solid.

## Curriculum scope (v1)

- **Year group: Year 8**, covering *all* topics for that year (breadth across the year, not depth on one topic).
- Content must be built directly from the UK National Curriculum document itself — do not mirror a specific exam board's scheme of work. If a topic's framing is ambiguous, go back to the National Curriculum text rather than inferring from a textbook or exam board source.
- When adding or editing lesson content, cite or reference the relevant National Curriculum objective it maps to.

## Pedagogy & interaction model

- **Lessons must be interactive** — this is a core requirement, not a nice-to-have. Avoid static walls of text or explanation-only screens.
- Core v1 flow is: guided explanation → step-through worked example → practice questions. Don't ship a bare question bank without the guided/worked-example steps in front of it.
- **Use real-life examples wherever possible** when introducing or explaining a concept. Prefer a concrete, relatable scenario over an abstract one when both are equally valid for teaching the objective.
- Content should be customizable to an individual child's needs — avoid hardcoding a single fixed path through material where a simple parameter or config would let it flex per child instead.
- **Every lesson page must open with a plain-language "By the end of this page, you'll be able to" outcomes list, tagged with the specific sub-skill refs it covers, positioned before any section navigation.** This was missing from the first draft of every lesson built so far — don't let it slip again. See `LESSON_TEMPLATE.md` for the full required page structure, the shared design system to reuse, and a pre-publish checklist. Check every new lesson against it before considering it done.

## Architecture & code conventions

- **Favor a modular structure wherever possible.** Lesson logic, question-generation logic, progress tracking, and UI presentation should be separable, not tangled together in one file or component.
- **Reuse logic aggressively.** Before writing a new function or component, check whether an existing one (e.g. a question-type renderer, a validation helper, a progress-tracking utility) can be extended or parameterized instead of duplicated. Topics and question types should share common building blocks rather than each shipping bespoke one-off code.
- Prefer composition over duplication even when it costs a little extra upfront structure — this codebase will grow topic-by-topic and duplicated logic compounds fast.
- Keep the stack as simple and cheap as possible. Don't introduce infrastructure, paid services, or heavy frameworks unless there's a clear, specific need — this is a hobby-scale project, not a product with a budget.

## Development approach

- Build lessons iteratively, one sub-skill at a time, as standalone self-contained prototypes (single HTML/CSS/JS file) that get reviewed as their own artifact before moving to the next. This lets content and interaction patterns get tested and refined in isolation without committing to site-wide structure too early.
- Even though each prototype is currently self-contained (its own copy of CSS/JS), write the digit/question/interaction logic as standalone, parameterized functions rather than one-off inline code — this is what makes the next step below possible without a rewrite.
- Once the lesson template (structure, interaction patterns, design tokens) has held up across a handful of sub-skills spanning more than one strand — not just Number — do a consolidation pass: extract the shared renderers, styles and design tokens into their own reusable files, and build the real site skeleton (navigation between lessons, a curriculum map/home page, and the per-child profile and progress tracking described under Data & persistence). Migrate each finished prototype's content into that shared structure as data, rather than continuing to duplicate boilerplate per lesson.
- Don't build the site skeleton before the pattern has stabilized, and don't let duplicated prototype boilerplate pile up indefinitely either — revisit this once several sub-skills across multiple strands exist.

## Data & persistence (v1)

- Persistence is **localStorage on a single device**. No backend database and no cross-device sync in v1.
- Multiple child profiles must be supported locally, each with its own progress tracking, even though storage is on one shared device.
- Design data structures so that a future move to server-side storage/sync wouldn't require a full rewrite, but don't build that infrastructure now — YAGNI applies.

## Workflow

- Source is maintained on GitHub.
- Backlog and feature/task tracking happens via **GitHub Issues + a GitHub Projects Kanban board** — do not introduce a separate project management tool.
- Built collaboratively using Claude chat (for planning/ideation) and Claude Code (for implementation).

## Commands

_No build tooling exists yet — this repo is pre-scaffold. Once a stack is chosen, add the actual install/dev/test/lint commands here so they don't have to be rediscovered each session._

## Maintenance note

This file should be updated whenever a v1 decision changes (e.g. scope expands beyond Year 8, persistence moves off localStorage) or when a convention gets established that isn't obvious from the code. Keep it short — it should stay a quick, high-value read, not a full spec.
