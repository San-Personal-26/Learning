# CLAUDE.md

Guidance for Claude when working in this repository. This is a small-scale, personal/family educational platform for kids — keep every decision in service of that: simple, cheap to run, and easy for one person to maintain.

## Project overview

An interactive learning platform for children, covering the UK National Curriculum. It is not a general tutoring product — it's built for a specific small set of kids, each with their own profile, and scoped tightly to keep the build manageable.

- Audience: children across Key Stages 2 and 3 (roughly ages 7–14). Key Stages 4 and 5 are out of scope until further notice.
- Purpose: personal/family use only. No revenue generation, no public sign-ups.
- Subjects: maths is the only subject built out so far. Other subjects (English, Science, etc.) are added one at a time, each starting from the same lesson template and folder pattern — see Repository structure below. Don't scaffold folders for a subject that hasn't started yet.

## Curriculum scope

- Key Stages 2 and 3, built out year-by-year and subject-by-subject rather than all at once. Maths Year 8 (KS3) was the v1 starting point; expansion to other years and subjects follows the same pattern.
- Content must be built directly from the UK National Curriculum document itself for the relevant subject and key stage — do not mirror a specific exam board's scheme of work. If a topic's framing is ambiguous, go back to the National Curriculum text rather than inferring from a textbook or exam board source.
- When adding or editing lesson content, cite or reference the relevant National Curriculum objective it maps to (ref codes are per-subject — see each subject's curriculum reference doc under `subjects/<subject>/curriculum/`).

## Repository structure

```
shared/                          # Tier 1 — reusable across every subject and key stage
  styles/                        # design tokens, shared component CSS
  scripts/                       # MCQ engine, progress-tracking/localStorage logic

subjects/<subject>/
  curriculum/                    # National Curriculum reference docs, one per key stage
  shared/                        # Tier 2 — reusable within this subject only
  <key-stage>/<year>/lessons/    # the actual lesson prototypes/pages

docs/
  LESSON_TEMPLATE.md             # universal page structure & checklist, all subjects
```

- **Tier 1 (`shared/`)**: things that make sense for any subject — design tokens, `.card`/`.chip`/`.option` component CSS, the practice-question renderer, progress storage. Promote something here only once it's actually been reused across more than one subject; don't pre-guess.
- **Tier 2 (`subjects/<subject>/shared/`)**: reusable within a subject but not general — e.g. maths's number-line SVG helper or digit-tile renderer. A future English equivalent might be a passage-highlighter.
- **Tier 3 (inline in the lesson file)**: anything still one-off. Every lesson still writes its interaction logic as standalone, parameterized functions (per Development approach below) so it can be promoted to Tier 2 or 1 later without a rewrite.
- Each subject's `curriculum/` folder holds one reference doc per key stage (e.g. `ks3-reference.md`), structured the same lettered/numbered way, so ref codes stay a short citable code per subject (e.g. maths `A.3.2`). Lesson pages tag themselves with a year (e.g. "Year 8") even though the source curriculum document is published per key stage, not per year — deciding which statements belong to which year within a key stage is this project's own sequencing call, not something the NC document specifies.
- If a subject develops conventions that diverge meaningfully from `docs/LESSON_TEMPLATE.md` (e.g. maths's slider-drag interaction pattern or its maths-only CSS classes), document them in a short addendum at `subjects/<subject>/` (e.g. `subjects/maths/MATHS_NOTES.md`), rather than bloating the universal template. Only write one when a real divergence shows up — don't write one speculatively for a subject with no lessons yet.

## Pedagogy & interaction model

- **Lessons must be interactive** — this is a core requirement, not a nice-to-have. Avoid static walls of text or explanation-only screens.
- Core v1 flow is: guided explanation → step-through worked example → practice questions. Don't ship a bare question bank without the guided/worked-example steps in front of it.
- **Use real-life examples wherever possible** when introducing or explaining a concept. Prefer a concrete, relatable scenario over an abstract one when both are equally valid for teaching the objective, and check the example is actually plausible for the target year group (right order of magnitude, believable numbers/scenario) rather than just structurally present.
- Content should be customizable to an individual child's needs — avoid hardcoding a single fixed path through material where a simple parameter or config would let it flex per child instead.
- **Every lesson page must open with a plain-language "By the end of this page, you'll be able to" outcomes list, tagged with the specific sub-skill refs it covers, positioned before any section navigation.** This was missing from the first draft of every lesson built so far — don't let it slip again. See `docs/LESSON_TEMPLATE.md` for the full required page structure, the shared design system to reuse, and a pre-publish checklist. Check every new lesson against it before considering it done.

## Architecture & code conventions

- **Favor a modular structure wherever possible.** Lesson logic, question-generation logic, progress tracking, and UI presentation should be separable, not tangled together in one file or component.
- **Reuse aggressively, at the right tier.** Before writing a new function or component, check whether something in `shared/` (cross-subject) or `subjects/<subject>/shared/` (subject-specific) already covers it, or should be extended to. Only write new one-off logic in the lesson file itself when nothing at either shared tier fits yet.
- Prefer composition over duplication even when it costs a little extra upfront structure — this codebase grows lesson-by-lesson and subject-by-subject, and duplicated logic compounds fast.
- Keep the stack as simple and cheap as possible. Don't introduce infrastructure, paid services, or heavy frameworks unless there's a clear, specific need — this is a hobby-scale project, not a product with a budget.

## Development approach

- Build lessons iteratively, one sub-skill at a time, as standalone self-contained prototypes (single HTML/CSS/JS file) that get reviewed as their own artifact before moving to the next. This lets content and interaction patterns get tested and refined in isolation without committing to site-wide structure too early.
- Even though each prototype currently duplicates some CSS/JS, write the digit/question/interaction logic as standalone, parameterized functions rather than one-off inline code — this is what makes promotion to a shared tier possible without a rewrite.
- Once a lesson template pattern has held up across a handful of sub-skills spanning more than one strand within a subject, do a consolidation pass for that subject: extract shared renderers/styles into `subjects/<subject>/shared/` and, where something is proven reusable across subjects too, up into the top-level `shared/`. Migrate finished prototypes' content into that shared structure as data rather than continuing to duplicate boilerplate per lesson.
- Don't build the site skeleton or a new subject's shared tier before its pattern has stabilized, and don't let duplicated prototype boilerplate pile up indefinitely either.

## Data & persistence (v1)

- Persistence is **localStorage on a single device**. No backend database and no cross-device sync in v1.
- Multiple child profiles must be supported locally, each with its own progress tracking, even though storage is on one shared device.
- Progress keys should be namespaced by subject and ref (e.g. `maths.A.3.2`) so tracking stays unambiguous once more than one subject exists, even though displayed ref tags on the page stay short (e.g. `A.3.2`).
- Design data structures so that a future move to server-side storage/sync wouldn't require a full rewrite, but don't build that infrastructure now — YAGNI applies.

## Workflow

- Source is maintained on GitHub: [San-Personal-26/Learning](https://github.com/San-Personal-26/Learning) (public repo, `main` branch). Public rather than private specifically so the site can be hosted on GitHub Pages for free — GitHub Pages requires a paid plan for private repos.
- Hosting: GitHub Pages, once a site skeleton with an `index.html` exists (see Development approach). No separate hosting service.
- Backlog and feature/task tracking happens via **GitHub Issues + a GitHub Projects Kanban board** — do not introduce a separate project management tool.
- Built collaboratively using Claude chat (for planning, curriculum-grounded content, and per-lesson prototyping) and Claude Code (for multi-file structural work — folder restructuring, consolidation passes, the site skeleton, and anything spanning more than one file at once).

## Commands

_No build tooling exists yet — this repo is pre-scaffold. Once a stack is chosen, add the actual install/dev/test/lint commands here so they don't have to be rediscovered each session._

## Maintenance note

This file should be updated whenever a v1 decision changes (e.g. scope expands beyond KS2/KS3, persistence moves off localStorage) or when a convention gets established that isn't obvious from the code. Keep it short — it should stay a quick, high-value read, not a full spec.
