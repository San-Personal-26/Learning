# Lesson plan — Chart Explorer (F.2)

Companion plan for `lessons/chart-explorer.html`. Written before the build per this project's chat=planning / Claude Code=implementation workflow (see `CLAUDE.md`). Follows the required page structure and non-negotiables in `LESSON_TEMPLATE.md` — open that alongside this doc.

## Curriculum mapping

- **NC ref**: F.2 — "Construct and interpret appropriate tables, charts, and diagrams, including frequency tables, bar charts, pie charts, and pictograms for categorical data, and vertical line (or bar) charts for ungrouped and grouped numerical data."
- **Sub-skills covered** (all 5 — see `CURRICULUM_REFERENCE.md`):
  - F.2.1 Construct/interpret a frequency table
  - F.2.2 Construct/interpret a bar chart
  - F.2.3 Construct/interpret a pie chart
  - F.2.4 Construct/interpret a pictogram
  - F.2.5 Construct/interpret a line/bar chart for grouped numerical data
- This is a wider sub-skill spread than any lesson built so far (D.10 had 3, A.2 had 4) — justified because all five are really one skill ("turn raw data into a picture") applied to different chart shapes, not five separate concepts.

## Why this is a different UI shape

Every lesson so far (A.1, A.2, D.10) is fundamentally: *drag a slider / pick a chip, watch a diagram update*. F.2 is about **construction from data**, not just reading a live diagram, so the interactive section needs a new pattern: the learner builds a chart by classifying/entering raw data points themselves, and gets a "does this match the data?" check — closer to the Practice section's correct/incorrect feedback than to a slider readout. That's the "completely different UI shape" this lesson is meant to stress-test.

## Real-life dataset (one story, used throughout)

A Year 8 class of 24 students is surveyed on **how they get to school**, and (for the grouped-data half) **how many minutes their journey takes**. One consistent, relatable real-life context threads the whole page instead of a different toy example per chart type.

- **Categorical data** (transport method, 24 raw responses, deliberately shuffled not pre-sorted):
  `Walk, Car, Bus, Walk, Bike, Car, Walk, Bus, Car, Walk, Bike, Bus, Walk, Car, Walk, Bus, Car, Walk, Bike, Bus, Car, Walk, Car, Walk`
  → Frequencies: **Walk 9 · Car 7 · Bus 5 · Bike 3** (sums to 24). All four counts are odd on purpose, so every category needs a half-symbol in the pictogram (F.2.4's key idea).
- **Numerical data** (journey time in minutes, 24 raw values, for F.2.5):
  `4,7,2,9,6,3, 12,15,11,18,14,17,13,19,16,10, 22,27,24,21,29, 33,38,31`
  → Grouped into class intervals of width 10: **0–9 → 6 · 10–19 → 10 · 20–29 → 5 · 30–39 → 3** (sums to 24).

## Page structure (per LESSON_TEMPLATE.md)

**Header** — Eyebrow `Statistics · F.2 · Year 8`. Title **"Chart Explorer"** (keeps the `<Topic> Explorer` naming pattern). Lede hooks on "a list of 24 answers is hard to read — a chart makes it click," ends with the standard no-clock line. Outcomes block lists all five refs in plain language.

**01 Explore** —
- Real-life hook: show the raw, unsorted list of 24 transport responses as a wall of text/chips — deliberately hard to scan — to motivate *why* we tally and chart data.
- `.vocab` dt/dl block: **categorical data**, **frequency**, **frequency table**, **class interval**.
- Concept cards (`.concept-card`, one per chart type, each tagged with its ref): frequency table (F.2.1), bar chart (F.2.2), pie chart (F.2.3), pictogram (F.2.4), each with a small static SVG example and a real-life "when you'd use this" note. A closing concept card covers grouping numerical data into class intervals (F.2.5), using the journey-time story.
- Aside cards (3, one per block, not bunched):
  1. "Why tally in groups of 5?" (the historical/practical tallying convention).
  2. "Bar chart or pie chart?" (bar = compare exact counts; pie = show parts of a whole).
  3. "The half-symbol trick" (a pictogram symbol can represent more than 1, so odd counts need a half-symbol — ties directly to this dataset having all-odd frequencies).

**02 Chart Builder** (the new interaction) — a five-mode tool (chip row, same switcher pattern as Angle Explorer's playground), sharing the one dataset above:
1. **Tally it** (F.2.1) — the 24 transport chips are shown *unclassified*; clicking one "sorts" it into its category (chip fades/checks off) and live-increments that category's row in an on-screen frequency table being built. Complete when all 24 are tallied.
2. **Bar it** (F.2.2) — given the frequency table, per-category +/− steppers grow/shrink an SVG bar; a "✓ matches the data" state appears per bar once its height equals the true frequency. (+/− steppers, not drag, to sidestep the drag-vs-innerHTML bug the template already warns about — see Interaction notes.)
3. **Pie it** (F.2.3) — four sliders sharing a fixed total of 24 (three free + one auto-computed, extending the "two sliders summing to a fixed total" pattern from Angle Explorer's "at a point" mode to four categories), rendered live as a pie/donut built from the same polar-coordinate helpers as the angle diagrams.
4. **Picto it** (F.2.4) — per-category +/− steppers add/remove whole and half symbols (key: 1 symbol = 2 students) until the row matches; surfaces the half-symbol case for every category.
5. **Group it** (F.2.5) — switches dataset to the 24 journey-time values; clicking a raw number sorts it into its class-interval bucket, live-building a grouped bar chart (same tally interaction as mode 1, applied to numeric ranges instead of categories).

**03 Practice** — 4 untimed multiple-choice questions (immediate feedback, hints, unlimited retries, no score), one per representation: reading a frequency table, reading a bar chart, reading a pie chart (as a fraction/proportion of the whole), and reading a grouped bar chart. Pictogram reading is reinforced through the "Picto it" builder rather than a fifth question, per the template's 4-question convention.

**04 Recap** — plain-language takeaways: a frequency table counts how often each thing happens; bar charts compare counts directly, pie charts show parts of a whole, pictograms use symbols (including half-symbols); numerical data can be grouped into class intervals so it can be charted too. Footer cites "National Curriculum ref F.2 (sub-skills F.2.1–F.2.5)."

## New component patterns (candidates for LESSON_TEMPLATE.md once proven)

- **Click-to-classify tally list** — a set of raw-data chips, each click reassigns it to a "counted" state and increments a live tally/frequency display exactly once (must guard against double-counting a chip that's already been clicked). New pattern; not covered by the existing slider-focused "Interactive control pattern" section.
- **Four-way shared-total sliders** — extends the existing "two sliders summing to a fixed total" rule (update the constrained slider's `min`/`max`/`value` as DOm properties, never rebuild it) to three free sliders plus one computed value.
- **Stepper (+/−) control** — a simpler alternative to a slider for small integer ranges (bar height, symbol count), built once and updated via textContent/attribute changes only, never innerHTML-replaced while live.

## Non-negotiables checklist (from LESSON_TEMPLATE.md)

- No timers, scores or countdowns anywhere (the Chart Builder's "matches the data" state is a correctness check, not a score).
- Outcomes list present before the stepper, covering F.2.1–F.2.5, each with a matching activity.
- Real-life grounding: the single transport/journey-time survey story throughout.
- 3 aside cards, not bunched.
- Design tokens/components copied verbatim from `angle-explorer.html` (most recently built lesson).
- Every interactive piece written as a standalone, parameterized function (`render<Mode>()` / `update<Mode>()` split) per the reuse rule in `CLAUDE.md`.
- Screenshot + interaction sanity check (including drag-testing the pie sliders) before marking done.
