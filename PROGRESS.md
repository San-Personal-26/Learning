# Progress

One line per lesson so a new session (or a new chat) can see exactly where things stand without needing this project's chat history. Update this file whenever a lesson's status changes — treat it as more reliable than memory of past conversations.

## Lessons

| Ref | Lesson (file) | Built | Verified | Published (artifact) | Committed (Tutorial folder) |
|---|---|---|---|---|---|
| A.1 | `lessons/place-value-explorer.html` — Place Value Explorer | ✅ | ✅ | ✅ | ✅ |
| A.2 | `lessons/number-line-explorer.html` — Number Line Explorer | ✅ | ✅ | ⚠️ stale — see Known issues | ⚠️ stale — see Known issues |
| D.10 | `lessons/angle-explorer.html` — Angle Explorer | ✅ | ✅ | ✅ | ✅ |
| E.1 | `lessons/probability-explorer.html` — Probability Explorer | ✅ | ✅ | ✅ | ✅ |
| B.7 | `lessons/equation-balance-explorer.html` — Equation Balance Explorer | ✅ | ✅ | ✅ | ✅ |

Legend: **Built** = prototype written. **Verified** = screenshot + scripted interaction check (Playwright) done, including drag-testing any slider. **Published** = live as a Claude Artifact. **Committed** = current version written to the `lessons/` folder on disk.

## Known issues

- **A.2 (Number Line Explorer) is out of sync.** A "By the end of this page..." outcomes-block was added to the working copy, but the published artifact and the committed file in `lessons/` still reflect the version *without* it. Repeated attempts to republish the artifact have hung/timed out in the tool itself (not a content or size issue — the file is small); this was paused at the user's request rather than retried. To finish: republish `number-line-explorer.html` as an Artifact (same URL, ends `...d94670a592d4`), then re-send and re-commit the file to `lessons/number-line-explorer.html`.
- **D.10 (Angle Explorer) intro has minor content overlap.** The new "Where does 360 come from?" history paragraph (in the Explore section) and the existing "🔢 Why 360?" aside-card under D.10.1 now cover overlapping ground (Babylon, base-60, 360's divisors). Not fixed — flagged as a possible trim, not urgent.
- **B.7 (Equation Balance Explorer) Explore section has no per-concept live figure.** `LESSON_TEMPLATE.md` now asks for each Explore concept to get its own small live figure where practical (as D.10 and E.1 both do); B.7 uses text + a real-life example instead, with the interactive balance tool deferred to Section 02. Deliberate call, not an oversight — the balance tool needs the full equation-picker to mean anything, so a small standalone figure per concept didn't have an obvious shape. Documented per the template's own checklist item; revisit if a good small-figure idea comes up.

## Up next

**Recommendation: start the consolidation pass described in `CLAUDE.md`'s Development approach**, rather than building another isolated prototype. Its stated trigger — the template holding up "across a handful of sub-skills spanning more than one strand" — is now clearly met: 5 lessons across 4 strands (Number, Geometry, Probability, Algebra), each hand-copying the same design tokens and component patterns without needing a structural rewrite. Next: extract the shared CSS/JS into real reusable files, build a minimal site skeleton (home/curriculum map, navigation between the 5 existing lessons, per-child profile + localStorage progress tracking per CLAUDE.md's Data & persistence section), and migrate each lesson's content into that shared structure as data.

If another prototype is wanted first instead: B.7 only covered one-step and two-step equations (B.7.1–B.7.2) — B.7.3 (unknown on both sides), B.7.4 (brackets) and B.7.5 (word problems) are still open within the same NC ref and would extend the balance-scale metaphor rather than needing a new one. Ratio (strand C) and Statistics (F.2) remain the only completely untouched strands.

## Maintenance note

Keep this file short and current rather than a full changelog — one row per lesson, a short bullet per real open issue. When a lesson moves to the next status (verified, published, committed), update its row in the same turn. When an issue in "Known issues" is resolved, delete the bullet rather than marking it done.
