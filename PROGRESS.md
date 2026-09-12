# Progress

One line per lesson so a new session (or a new chat) can see exactly where things stand without needing this project's chat history. Update this file whenever a lesson's status changes — treat it as more reliable than memory of past conversations.

## Repository

Source is live on GitHub: [San-Personal-26/Learning](https://github.com/San-Personal-26/Learning) (public repo, `main` branch). Restructured 2026-09-12 into a multi-subject layout — see `CLAUDE.md`'s Repository structure section for the full folder scheme (`shared/` for cross-subject code, `subjects/<subject>/` per subject, `docs/LESSON_TEMPLATE.md` for the universal template). GitHub Pages is enabled — site is live at [https://san-personal-26.github.io/Learning/](https://san-personal-26.github.io/Learning/).

This file currently tracks maths only, since maths is the only subject with lessons built. When a second subject gets its first lesson, split this table by subject (one table per subject, or a `subjects/<subject>/PROGRESS.md` per subject with this file becoming a top-level index) — don't wait until the single table gets unwieldy to do it.

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

## Known issues

- **A.2 (Number Line Explorer) is out of sync.** A "By the end of this page..." outcomes-block was added to the working copy, but the published artifact and the committed file still reflect the version *without* it. Repeated attempts to republish the artifact have hung/timed out in the tool itself (not a content or size issue — the file is small); this was paused at the user's request rather than retried. To finish: republish `number-line-explorer.html` as an Artifact (same URL, ends `...d94670a592d4`), then re-send and re-commit the file to `subjects/maths/ks3/year-8/lessons/number-line-explorer.html`.
- **D.10 (Angle Explorer) intro has minor content overlap.** The "Where does 360 come from?" history paragraph (in the Explore section) and the existing "🔢 Why 360?" aside-card under D.10.1 now cover overlapping ground (Babylon, base-60, 360's divisors). Not fixed — flagged as a possible trim, not urgent.
- **F.2 (Chart Explorer) Explore section uses static mini-figures only.** All five concept cards in Explore have small static previews (a mini-table, mini bar chart, pie, pictogram, and histogram) rather than live interactive figures. Deliberate call — Section 02 is a full five-mode interactive Chart Builder covering every sub-skill; a duplicated interactive figure per concept in Explore would either be redundant (same tool, smaller) or too minimal to be meaningful. Static previews give a visual anchor for the concept without front-loading interaction before the explanation.

- **B.7 (Equation Balance Explorer) Explore section has no per-concept live figure.** `docs/LESSON_TEMPLATE.md` asks for each Explore concept to get its own small live figure where practical (as D.10 and E.1 both do); B.7 uses text + a real-life example instead, with the interactive balance tool deferred to Section 02. Deliberate call, not an oversight — the balance tool needs the full equation-picker to mean anything, so a small standalone figure per concept didn't have an obvious shape. Documented per the template's own checklist item; revisit if a good small-figure idea comes up.

## Up next

1. **Verify and publish F.2 (Chart Explorer)** — screenshot-check, drag-test the pie-chart sliders, publish as a Claude Artifact, then mark Verified ✅ and Published ✅ in the table above.
2. **Fix A.2 (Number Line Explorer) out-of-sync artifact** — see Known issues above.
3. **Move backlog tracking into GitHub Issues + a GitHub Projects Kanban board**, per `CLAUDE.md`'s Workflow section — turn each "Known issues" bullet and the open lesson work below into real issues so this file stays short.

Next lesson candidates: A.3.4–A.3.6 (HCF, LCM, HCF/LCM word problems) build directly on Factors & Primes Explorer. B.7.3–B.7.5 (unknown on both sides, brackets, word problems) extend Equation Balance Explorer. Ratio (strand C) is the only completely untouched strand within KS3 maths. See `subjects/maths/MATHS_NOTES.md` for more.

**Beyond maths:** no other subject has started. When one does, add its curriculum reference doc under `subjects/<subject>/curriculum/`, start its lesson table in this file (or a split file, per the note above), and only create a subject addendum doc once real subject-specific conventions emerge — don't pre-write one.

## Maintenance note

Keep this file short and current rather than a full changelog — one row per lesson, a short bullet per real open issue. When a lesson moves to the next status (verified, published, committed), update its row in the same turn. When an issue in "Known issues" is resolved, delete the bullet rather than marking it done.
