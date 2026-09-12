# Maths — subject notes

Addendum to `docs/LESSON_TEMPLATE.md` for anything specific to the maths subject. Read the universal template first; this file only covers where maths adds to or concretely implements it.

## Reference lessons (all Year 8, KS3)

Current lessons, in build order — open one as a working reference rather than re-deriving a pattern from scratch:

- `subjects/maths/ks3/year-8/lessons/place-value-explorer.html` (A.1)
- `subjects/maths/ks3/year-8/lessons/number-line-explorer.html` (A.2) — clean reference for the "build once, update on input" slider pattern from the universal template.
- `subjects/maths/ks3/year-8/lessons/angle-explorer.html` (D.10) — three-mode playground; good reference for `render<Mode>()` / `update<Mode>Diagram()` when one tool has multiple sub-modes.
- `subjects/maths/ks3/year-8/lessons/probability-explorer.html` (E.1)
- `subjects/maths/ks3/year-8/lessons/equation-balance-explorer.html` (B.7)
- `subjects/maths/ks3/year-8/lessons/factors-primes-explorer.html` (A.3.1–A.3.3)

## Maths-only component classes

On top of the universal Tier 1 classes in `docs/LESSON_TEMPLATE.md`, maths lessons also use:

- `.symbol-grid` — reference/glossary cards (e.g. notation tables).
- `.frac` — stacked fraction glyph.
- `.numline-*` — SVG classes for number-line ticks, zero line, point markers.

Keep these maths-scoped rather than promoting them to `shared/styles/` unless another subject genuinely needs the same visual (e.g. a future subject needing a fraction-like stacked glyph for something unrelated to maths — unlikely, but the bar for promotion to Tier 1 is real reuse, not resemblance).

## Curriculum reference

`subjects/maths/curriculum/ks3-reference.md` is the full KS3 maths programme of study, structured as lettered strands (A–F) with numbered statements and draft sub-skill breakdowns — see that file's own header for sourcing and caveats. A `ks2-reference.md` should be added to the same folder, in the same structure, before any KS2 maths lesson work starts.

## Open work within maths (context for planning, not a status tracker — see PROGRESS.md for that)

- A.3.4–A.3.6 (HCF, LCM, HCF/LCM word problems) build directly on `factors-primes-explorer.html`.
- B.7.3–B.7.5 (unknown on both sides, brackets, word problems) extend `equation-balance-explorer.html`.
- Ratio (strand C) and Statistics (F.2) are untouched strands within KS3 maths.
