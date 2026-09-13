# Progress

One line per lesson so a new session (or a new chat) can see exactly where things stand without needing this project's chat history. Update this file whenever a lesson's status changes — treat it as more reliable than memory of past conversations.

## Repository

Source is live on GitHub: [San-Personal-26/Learning](https://github.com/San-Personal-26/Learning) (public repo, `main` branch). Restructured 2026-09-12 into a multi-subject layout — see `CLAUDE.md`'s Repository structure section for the full folder scheme (`shared/` for cross-subject code, `subjects/<subject>/` per subject, `docs/LESSON_TEMPLATE.md` for the universal template). GitHub Pages is enabled — site is live at [https://san-personal-26.github.io/Learning/](https://san-personal-26.github.io/Learning/).

**This file (and the rest of the claude.ai "Tutorial" Project's docs) is a snapshot of the repo, not a live link to it.** It drifted out of sync once already — a Claude Code session restructured the repo (multi-subject layout, a 7th maths lesson, GitHub Pages) without this Project being updated in step. Re-synced 2026-09-13. If something here looks inconsistent with what a fresh clone of the repo shows, trust the repo and re-sync this file rather than assuming chat history is current.

**Sessions working from this Project currently have no push access to the GitHub repo** (the cloud sandbox's git proxy only allows repos explicitly authorized for the session, and this repo isn't in that set yet). A lesson finished in a chat session gets handed off as a file with its exact destination path for the user (or a Claude Code session with real repo access) to commit — see each subject's "Committed" column below.

This file currently tracks maths and science. When a subject's table grows unwieldy, split it into its own `subjects/<subject>/PROGRESS.md` with this file becoming a top-level index — don't wait until it's actually unwieldy to do it.

## Lessons — Maths, KS3, Year 8

| Ref | Lesson (file) | Built | Verified | Published (artifact) | Committed (repo) |
|---|---|---|---|---|---|
| A.1 | `subjects/maths/ks3/year-8/lessons/place-value-explorer.html` — Place Value Explorer | ✅ | ✅ | ✅ | ✅ |
| A.2 | `subjects/maths/ks3/year-8/lessons/number-line-explorer.html` — Number Line Explorer | ✅ | ✅ | ⚠️ stale — see Known issues | ⚠️ stale — see Known issues |
| D.10 | `subjects/maths/ks3/year-8/lessons/angle-explorer.html` — Angle Explorer | ✅ | ✅ | ✅ | ✅ |
| E.1 | `subjects/maths/ks3/year-8/lessons/probability-explorer.html` — Probability Explorer | ✅ | ✅ | ✅ | ✅ |
| B.7 | `subjects/maths/ks3/year-8/lessons/equation-balance-explorer.html` — Equation Balance Explorer | ✅ | ✅ | ✅ | ✅ |
| A.3 | `subjects/maths/ks3/year-8/lessons/factors-primes-explorer.html` — Factors & Primes Explorer (scoped to A.3.1–A.3.3; A.3.4–A.3.6 deferred; Prime Check mode has a "Run the Sieve" step-by-step animation of the Sieve of Eratosthenes) | ✅ | ✅ | ✅ | ✅ |
| F.2 | `subjects/maths/ks3/year-8/lessons/chart-explorer.html` — Chart Explorer (covers F.2.1–F.2.5: frequency tables, bar charts, pie charts, pictograms, grouped data) | ✅ | ⚠️ | ⚠️ | ✅ |

Legend: **Built** = prototype written. **Verified** = screenshot + scripted interaction check (Playwright) done, including drag-testing any slider. **Published** = live as a Claude Artifact. **Committed** = current version written to its path in the repo.

## Lessons — Science, KS3

First lesson in a new subject, and the first real test of whether `docs/LESSON_TEMPLATE.md` (written and generalised while only maths existed) actually holds up for a different subject — see the O.1 notes below. Filed under a `year-8` folder to keep the same folder depth as maths (`shared.js`'s back-link path depends on it — see `CLAUDE.md`'s Repository structure section) even though the science content itself hasn't been sequenced into specific years; the on-page eyebrow says "KS3", not a year.

| Ref | Lesson (file) | Built | Verified | Published (artifact) | Committed (repo) |
|---|---|---|---|---|---|
| O.1 | `subjects/science/ks3/year-8/lessons/speed.html` — Speed (Motion and Forces; sub-skills O.1.1–O.1.2) | ✅ | ✅ | ✅ | ✅ |

**O.1 (Speed) notes:**
- First lesson built under the new no-"Explorer" title convention.
- Template-fit finding: the structural skeleton (header/stepper/Explore/tool/Practice/Recap) and the entire Tier 1 design system carried over to physics with zero changes needed. Two gaps, both already anticipated by the template's own design rather than requiring a rewrite: (1) the eyebrow uses `KS3` instead of a specific year, since science hasn't been sequenced into year groups yet; (2) two new Tier 2 physics-only components were built inline in this lesson (a formula-triangle widget for distance/speed/time, and a track-and-moving-icon figure) since no `subjects/science/SCIENCE_NOTES.md` addendum exists yet — candidates to seed one once a second science lesson confirms the same patterns are reused.
- Verified via Playwright: screenshot-checked in light mode, dark mode, and at 375px width (stepper renders as a 2×2 grid, no horizontal overflow); every slider drag-tested (keyboard, `fill()`, and pixel-accurate mouse drag, not just click-to-position); practice question correct/incorrect states, hint toggle, and explain-reveal all confirmed working; re-verified against the live repo's actual `shared/shared.css`/`shared/shared.js` (byte-identical to the Project's copies) once placed at its real path, confirming the asset paths and the 5-level back-link both resolve correctly on disk.
- Three real bugs caught and fixed during verification:
  1. The formula-triangle's default "Speed" state wasn't applied on page load (state only updated on click, so the initial highlighted segment and its caption were out of sync until first interaction) — fixed by calling the update function once at load.
  2. The active segment's label text used a CSS selector (`.active + .triangle-label`) that could never match the actual DOM order, so label text had poor contrast against the highlighted colour in both light and dark mode — fixed by toggling the label's own class directly in JS instead of relying on a sibling-selector that didn't match the markup.
  3. **User-caught, post-publish:** the car emoji in all three animated tracks was travelling backwards — 🚗/🚙 face left by default in most emoji fonts, so left-to-right motion visually read as reversing — fixed with `transform: scaleX(-1)` on `.track-dot`. Not caught by any automated Playwright check, since those only assert DOM/computed-style state, not whether a moving graphic visually "looks right" — a manual visual pass remains worthwhile even after automated checks pass, especially for anything animated.
- Placed at its real repo path (`subjects/science/ks3/year-8/lessons/speed.html`) and verified there, but **not yet committed to GitHub** — this session has no push access to the repo (see Repository note above). The finished file needs to be committed by the user or a session with repo access.

## Known issues

- **A.2 (Number Line Explorer) is out of sync.** A "By the end of this page..." outcomes-block was added to the working copy, but the published artifact and the committed file still reflect the version *without* it. Repeated attempts to republish the artifact have hung/timed out in the tool itself (not a content or size issue — the file is small); this was paused at the user's request rather than retried. To finish: republish `number-line-explorer.html` as an Artifact (same URL, ends `...d94670a592d4`), then re-send and re-commit the file to `subjects/maths/ks3/year-8/lessons/number-line-explorer.html`.
- **D.10 (Angle Explorer) intro has minor content overlap.** The "Where does 360 come from?" history paragraph (in the Explore section) and the existing "🔢 Why 360?" aside-card under D.10.1 now cover overlapping ground (Babylon, base-60, 360's divisors). Not fixed — flagged as a possible trim, not urgent.
- **F.2 (Chart Explorer) Explore section uses static mini-figures only.** All five concept cards in Explore have small static previews (a mini-table, mini bar chart, pie, pictogram, and histogram) rather than live interactive figures. Deliberate call — Section 02 is a full five-mode interactive Chart Builder covering every sub-skill; a duplicated interactive figure per concept in Explore would either be redundant (same tool, smaller) or too minimal to be meaningful. Static previews give a visual anchor for the concept without front-loading interaction before the explanation.
- **B.7 (Equation Balance Explorer) Explore section has no per-concept live figure.** `docs/LESSON_TEMPLATE.md` asks for each Explore concept to get its own small live figure where practical (as D.10 and E.1 both do); B.7 uses text + a real-life example instead, with the interactive balance tool deferred to Section 02. Deliberate call, not an oversight — the balance tool needs the full equation-picker to mean anything, so a small standalone figure per concept didn't have an obvious shape. Documented per the template's own checklist item; revisit if a good small-figure idea comes up.

## Up next

1. **Commit `docs/NEW_LESSON_PREREQ.md`** to the repo (currently only in the claude.ai Project) — see Known issues above.
2. **Add A.3 (Factors & Primes Explorer) to `index.html` CURRICULUM** — the lesson exists at `subjects/maths/ks3/year-8/lessons/factors-primes-explorer.html` but has no card on the home page.
3. **Verify and publish F.2 (Chart Explorer)** — screenshot-check, drag-test the pie-chart sliders, publish as a Claude Artifact, then mark Verified ✅ and Published ✅ in the maths table above.
4. **Fix A.2 (Number Line Explorer) out-of-sync artifact** — see Known issues above.
5. **Move backlog tracking into GitHub Issues + a GitHub Projects Kanban board**, per `CLAUDE.md`'s Workflow section — turn each "Known issues" bullet and the open lesson work below into real issues so this file stays short.
6. **Once a second science lesson is built**, check whether its component needs overlap with O.1's formula-triangle/track figures — if so, extract them into a `subjects/science/SCIENCE_NOTES.md` Tier 2 addendum, mirroring `MATHS_NOTES.md`.

Next maths lesson candidates: A.3.4–A.3.6 (HCF, LCM, HCF/LCM word problems) build directly on Factors & Primes Explorer. B.7.3–B.7.5 (unknown on both sides, brackets, word problems) extend Equation Balance Explorer. Ratio (strand C) is the only completely untouched strand within KS3 maths. See `subjects/maths/MATHS_NOTES.md` for more.

Next science lesson candidates: any other sub-skill within O. Motion and Forces (O.2–O.17), or a different strand within KS3 science — see `CURRICULUM_REFERENCE_SCIENCE_KS3.md` for the full list.

## Maintenance note

Keep this file short and current rather than a full changelog — one row per lesson, a short bullet per real open issue. When a lesson moves to the next status (verified, published, committed), update its row in the same turn. When an issue in "Known issues" is resolved, delete the bullet rather than marking it done.
