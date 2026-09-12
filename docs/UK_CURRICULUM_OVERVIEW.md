<!-- Destination in repo: docs/UK_CURRICULUM_OVERVIEW.md (new file) -->

# UK Curriculum Overview

General, subject-agnostic reference for how the English school system is structured — key stages, year groups, ages, and what's statutory where. This is background context for planning, not a source to cite in lesson footers: for actual teachable content, always cite the relevant subject's own DfE programme of study under `subjects/<subject>/curriculum/`, not this file.

This covers England specifically. Wales, Scotland, and Northern Ireland use different structures (Wales: similar age/year pathway, different terminology; Scotland: P1–P7 / S1–S6 labels; Northern Ireland: its own Foundation/Key Stage system) — out of scope unless the project's audience changes.

## Key stages, years, and ages

| Stage | Year groups | Typical ages | In this project's scope? |
|---|---|---|---|
| EYFS (Early Years Foundation Stage) | Nursery, Reception | 3–5 | No — not part of the National Curriculum proper (Early Learning Goals, not NC programmes of study) |
| Key Stage 1 (KS1) | Years 1–2 | 5–7 | Not yet — v1 targets KS2/KS3 |
| Key Stage 2 (KS2) | Years 3–6 | 7–11 | Yes — not yet started (maths KS3 was the v1 starting point) |
| Key Stage 3 (KS3) | Years 7–9 | 11–14 | Yes — maths underway, Year 8 built first |
| Key Stage 4 (KS4) | Years 10–11 | 14–16 | No — GCSE years, future work per `CLAUDE.md` |
| Key Stage 5 (KS5) | Years 12–13 | 16–18 | No — A-level/post-16, no set National Curriculum exists for this stage anyway (colleges/sixth forms set their own) |

A child's year group is based on their date of birth (school year runs 1 September–31 August), not readiness — worth remembering if this project ever needs to map a specific child's age to a year group rather than just picking a year group directly.

## What's statutory, broadly

- **Core subjects across KS1–KS4**: English, maths, science. Computing and PE are also included across these stages.
- **Foundation subjects vary by key stage** — art & design, design & technology, geography, history, music are taught from KS1 onward; a foreign language becomes statutory at KS2 (titled "foreign language") and continues at KS3 (titled "modern foreign language"); citizenship is added at KS3.
- **Religious education (and, from secondary age, relationships/sex education)** are statutory in maintained schools but are **not** part of the National Curriculum programmes of study — each locally-agreed syllabus (RE) or the DfE's separate RSE guidance applies instead of a National-Curriculum-style subject document. Not a fit for this project's "build from the NC document" approach if ever considered — flag rather than force into the existing pattern.
- At **KS4**, most foundation subjects become optional (GCSE choices); only English, maths, science, computing, PE, and citizenship stay compulsory. Not relevant yet since KS4 is out of scope, but worth remembering when that expansion happens — the "cover all subjects for the year group" approach from `CLAUDE.md` won't map the same way once subjects become optional.

## A structural quirk worth knowing before building a new subject's curriculum doc

For **maths at KS3**, the DfE publishes the programme of study as a single document spanning all of Years 7–9, with no year-by-year split — which is why `subjects/maths/curriculum/ks3-reference.md` has to make its own sequencing call about which statements belong to Year 7 vs 8 vs 9 (see that file's own caveat).

This is **not necessarily true of every subject or every key stage** — for example, maths and English at KS1–KS2 are published by DfE broken out year-by-year (Year 1 through Year 6 individually), not as one combined KS1–2 block. **Don't assume the KS3-maths pattern generalizes** — check the actual DfE source document for whatever subject and key stage is being added next, and note in that subject's curriculum reference doc whether a sequencing decision was needed or the source already did it.

## Where this fits with the rest of the repo

- This file: general system knowledge, doesn't change often, not subject-specific.
- `subjects/<subject>/curriculum/<key-stage>-reference.md`: the actual DfE subject content for one subject at one key stage, plus this project's own sub-skill breakdowns. Ref codes (e.g. `A.3.2`) are scoped per subject, not global — see `CLAUDE.md`'s Data & persistence section for how that's namespaced in storage.
- `CLAUDE.md`: the project's own scope decisions (which key stages/subjects are actually being built) — this file explains the *system*, `CLAUDE.md` explains *this project's chosen slice of it*. Keep scope decisions in `CLAUDE.md`, not here.
