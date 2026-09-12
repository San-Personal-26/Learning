# Lesson Page Template

**Read this file in full before starting design on any new lesson — don't rely on memory of a previous read, even from earlier in the same session.** A lesson built from memory of this file (rather than a fresh read) has already slipped out of step with it once; treat that as a standing risk, not a one-off.

This is the **universal** structural checklist for every interactive lesson prototype, across all subjects (see `CLAUDE.md` for the project-wide rules this implements — interactivity, real-life examples, no time pressure, modular reusable code). Check every new lesson against this before calling it done.

**If the subject you're working in has its own addendum** (e.g. `subjects/maths/MATHS_NOTES.md`), read that too — it covers subject-specific component classes and interaction patterns that build on top of this file, not instead of it. Maths is currently the only subject with lessons built, so the worked examples below reference maths lessons; treat them as illustrations of the *pattern*, not as maths-only requirements.

## Required page structure, in order

**File structure:** Every lesson is an HTML fragment — no `<!DOCTYPE html>`, `<html>`, `<head>`, or `<body>` tags. Start the file with these two lines before anything else:

```html
<title>Topic Explorer</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
```

The viewport meta is required. Without it, mobile browsers render at a default ~980px width and every layout breakpoint — in `shared/shared.css` and in lesson-specific styles — is bypassed entirely.

1. **Header**
   - Eyebrow: `<Strand> · <ref, e.g. A.2> · Year <n>`
   - Title (H1): short and specific, following the `<Topic> Explorer` naming pattern.
   - Lede: one or two sentence hook, ending with a no-time-pressure line ("No clock is running — take as long as you like.").
   - **"By the end of this page, you'll be able to" outcomes list — required.** One line per sub-skill ref the page covers (e.g. A.2.1–A.2.4), plain kid-facing language, each line tagged with its ref code (`.ref-tag`). This must appear before the section nav — it's the introduction that was missing from the first draft of every lesson so far, so treat it as non-negotiable, not a nice-to-have.
2. **Section nav (stepper)**: four anchor-linked steps — `01 Explore`, `02 <topic-specific>`, `03 Practice`, `04 Recap`.
3. **Section 01 "Explore"** — two parts, in order:
   - **Opening sequence (required, before any per-concept breakdown):** a short run of `.intro-block`s that build up the topic as a whole — **what it actually is** (a plain definition), **how it works / is measured or done**, **a bit of history** (a `.history-note` block — one real, specific fact, not filler), and **why it matters beyond the classroom** (a real-world tie-in). Pair one or more of these with a small `.figure-card` (static or live) where it clarifies the idea — not all four need one; a topic that doesn't suit a figure for a given block can skip it.
   - **Per sub-skill:** a plain-language concept explanation (a `.vocab` dt/dl block, or a `.split` + `.card.concept-card`, both work) grounded in at least one real-life example — and check the example is actually *plausible* for the target year group (right order of magnitude, believable numbers), not just structurally present. Add margin `.aside-card` snippets for genuinely useful tangential concepts (a precision/estimation point, a common misconception, a real-world curiosity) — up to 3 per lesson, each positioned next to the block it's actually about, never all bunched at the top. **Where practical, give each concept its own small live figure right there in Explore** rather than saving all interactivity for Section 02 — a static diagram or a "try it in the playground below" pointer is an acceptable fallback when the concept doesn't suit a small standalone figure, but that should be a deliberate call, not a default.
4. **Section 02**: the main hands-on interactive tool specific to this sub-skill. Check the subject's existing lessons and any subject addendum for established component patterns before inventing a new interaction style.
5. **Section 03 "Practice"**: 4 untimed multiple-choice questions. Each needs immediate correct/incorrect feedback, unlimited retries, an explanation revealed on success, and a "Need a hint?" toggle. Progress shown as calm dots + "X of N explored" — never a score, percentage, or timer.
6. **Section 04 "Recap"**: 3–4 plain-language takeaway bullets, plus a footer note citing the NC ref(s) and sub-skills covered (e.g. "Covers National Curriculum ref A.2 (sub-skills A.2.1–A.2.4)").

## Design system — reuse verbatim, don't reinvent per lesson

Copy the entire `:root` token block, font imports, and base component CSS from `shared/styles/` (once the consolidation pass has extracted them there) or, until then, from the most recently built lesson file — rather than redefining colors or type from scratch.

**Universal (Tier 1 — applies to every subject):**

- **Fonts**: Fraunces (display/headings), Karla (body), IBM Plex Mono (numerals, tags, data) — all via Google Fonts.
- **Color tokens**: `--bg`, `--surface`, `--surface-alt`, `--ink`, `--ink-soft`, `--ink-faint`, `--teal` / `--teal-deep` / `--teal-soft`, `--amber` / `--amber-soft`, `--success` / `--success-bg`, `--error` / `--error-bg`, `--border`, `--on-accent`, `--shadow` — each with a light definition and a dark-mode override (see any existing lesson file for the exact values and the `prefers-color-scheme` / `[data-theme]` guarding pattern).
- **Component classes**: `.card`, `.chip` / `.chip[aria-pressed]` (teal = primary selection, `.variant-b` amber = secondary selection), `.split` / `.aside-card` (margin notes), `.option` / `.options` / `.feedback` / `.explain-reveal` / `.hint-toggle`, `.progress-row` / `.progress-dots`, `.recap-list`, `.outcomes-block` / `.outcomes-list` / `.ref-tag`, and the styled `input[type="range"]` slider base.
- Teal = primary interactive accent; amber = secondary/highlight accent. Don't introduce a new hue for a new lesson without a specific reason — reuse the existing two.

**Responsive design:**

- `shared/shared.css` already handles breakpoints for all shared layout components: `.split` / `.aside-card` collapse at ≤680px; `nav.stepper`, `.options`, and `.page` horizontal padding all adjust at ≤520px. Don't re-declare these in lesson styles.
- Lesson-specific `<style>` blocks must add their own breakpoints for any custom multi-column or side-by-side layout (a two-panel tool, a grid of interactive tiles, etc.). Use the shared thresholds as a guide: collapse side-by-side panels at ≤680px, collapse multi-column grids at ≤520px.
- The target minimum width is **375px** (iPhone SE / most Android entry-level phones). Test there before calling a lesson done — no horizontal overflow, no crushed labels, interactive controls reachable with a thumb.

**Subject-specific (Tier 2)**: component classes that only make sense for one subject (e.g. maths's `.frac`, `.numline-*`, `.symbol-grid`) belong in that subject's addendum, not here. Check `subjects/<subject>/` for one before inventing subject-specific markup.

## Interactive control pattern — sliders and other live inputs (non-negotiable)

A real bug in an early lesson draft: dragging a slider felt resistive/stuttery — clicking straight to a position worked, but click-and-drag didn't. Root cause: the slider's own `input` handler was calling a "render" function that rewrote its parent container's `innerHTML`, which destroys and recreates the slider's DOM node in the middle of the browser's native drag gesture. Never do this. The pattern to follow instead, for every slider or other live control, in any subject:

- **Build once, update on input** — split each interactive tool into two functions:
  - a `render<X>()` that builds the control markup (e.g. the `<input type="range">`) once — either as static HTML in the page, or called only when the tool/mode first appears (e.g. on a mode switch) — and attaches the `input`/`change` listener there, once.
  - an `update<X>()` that the listener calls on every `input` event, touching **only the output elements** (the diagram/SVG container, a readout, a caption) — never the control's own container via `innerHTML`.
- If one control's value constrains another (e.g. two sliders whose values must sum to a fixed total), update the second control's `min`/`max`/`value` as DOM **properties** (`el.max = ...`, `el.value = ...`) inside `update<X>()` — this reflows the existing node instead of replacing it, so dragging one slider never interrupts the other.
- Check the current subject's existing lessons (or its addendum, if one exists) for a reference implementation of this split before writing a new one from scratch.

## Non-negotiables (from CLAUDE.md, restated here for the checklist)

- No timers, countdowns, or scores anywhere on the page.
- At least one real-life grounding per concept introduced.
- Every interactive piece (question renderer, comparison tool, etc.) written as a standalone, parameterized function — not one-off inline code — so it can be extracted during a subject's consolidation pass, per `CLAUDE.md`'s Development approach.

## Before calling a lesson "done" — checklist

- [ ] Outcomes list present in the header, before the stepper nav, covering every sub-skill ref the page addresses?
- [ ] Every sub-skill ref listed in the outcomes block actually has a matching activity or explanation somewhere on the page (no ref listed but never taught)?
- [ ] At least one aside snippet present, no more than three?
- [ ] Explore opens with the definition → mechanics → history → real-world-relevance sequence before the per-concept breakdown?
- [ ] Every real-life example in Explore is actually plausible (believable numbers/scenario for the target year group), not just structurally present?
- [ ] Explore gives each concept its own small live figure where practical, rather than deferring all interactivity to Section 02 — and if it doesn't, was that a deliberate call (documented in PROGRESS.md or a subject addendum), not an oversight?
- [ ] Footer note citing the NC ref(s) and sub-skills present in Recap?
- [ ] No timer, countdown, score, or percentage anywhere?
- [ ] Screenshot-checked (light mode at minimum) and interactions sanity-tested before publishing?
- [ ] Any slider/range input **drag-tested**, not just click-to-position tested — dragging must feel smooth, never resistive (see the Interactive control pattern above)?
- [ ] Design tokens and shared component CSS copied from `shared/styles/` (or an existing lesson, pre-consolidation) rather than redefined?
- [ ] Any subject-specific addendum (e.g. `subjects/maths/MATHS_NOTES.md`) checked and followed, if one exists for this subject?
- [ ] `<meta name="viewport" content="width=device-width, initial-scale=1">` present as the second line of the file, immediately after `<title>`?
- [ ] Tested at 375px viewport width — no horizontal overflow, stepper nav readable as a 2×2 grid, all interactive controls reachable with a thumb?
