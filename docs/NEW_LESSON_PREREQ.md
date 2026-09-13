<!-- Destination in repo: docs/NEW_LESSON_PREREQ.md (new file) -->

# New Lesson — Pre-Build Checklist & Pipeline

What to do before asking Claude (chat) to build a new lesson prototype, and the full sequence from "build it" to "it's live." Read this alongside `docs/LESSON_TEMPLATE.md` — that file covers what a lesson page must contain; this one covers the process around building and shipping it.

## Why this exists

Claude chat and Claude Code are separate environments. Chat has no access to your local repo clone or to GitHub — it only knows what's actually been pasted or uploaded into that conversation. Since the site's shared CSS/JS now live in `shared/` (post-consolidation-pass) rather than being duplicated into every lesson file, a lesson built in chat without the real current contents of `shared/` risks either re-duplicating code that should be reused, or calling functions/classes that don't actually match what's really there.

## Before you start: what to bring into the chat session

| What | How often to refresh it | Why |
|---|---|---|
| `docs/LESSON_TEMPLATE.md` | Every time, even mid-session | The template's own instructions call for a fresh read before every lesson — it has drifted from memory once before (see the file's own opening note). |
| `shared/styles/*.css` | Once per new chat session, or any time you know/suspect `shared/` changed | Doesn't drift the way the template does, but chat has no way to detect a change on its own. |
| `shared/scripts/*.js` (incl. `progress-store.js`) | Same as above | Needed to call the real API (e.g. the actual `ProgressStore` method names) rather than a guessed one. |

Rule of thumb — this is triggered by **whether `shared/` might have changed, not by how many lessons have been built**:

- **Continuing the same chat, building lesson 2 right after lesson 1** — no need to re-paste `shared/` files; nothing's changed since chat last saw them.
- **Starting a brand-new chat session** — re-sync `shared/` files, since the new session starts with zero memory of the old one.
- **Any time `shared/` may have changed, regardless of session** — re-sync. Claude Code can and does change `shared/` independently of any chat conversation (as happened with the consolidation pass), so "it's the same session" doesn't guarantee `shared/` is still what chat thinks it is.

Cheap way to check without re-pasting everything: ask Claude Code *"has anything under shared/ changed since [last known commit / last time we synced it]?"* — if no, just remind chat what was already established; if yes, re-paste the changed file(s).

## Full pipeline, once prerequisites are in place

1. **Sync the current shared foundation into chat** (see table above) — skip if nothing's changed since last sync in this session.
2. **Build and review the lesson prototype in chat** — links to the real shared CSS/JS rather than embedding a copy; calls the real `ProgressStore` API at the point the lesson is completed; checked against `docs/LESSON_TEMPLATE.md`'s checklist as it's built.
3. **Download the finished file** once it's ready as an artifact.
4. **Place it directly at its real destination** — `subjects/<subject>/<key-stage>/<year>/lessons/<name>.html`. A single new lesson has one unambiguous destination, so no staging folder (e.g. `_incoming/`) is needed — that's only useful for a batch of files where more than one destination is involved.
5. **Register it in the site's navigation data** — add its ref, title, and path to whatever data structure the home page's strand grid reads from. Easy to skip by accident: the lesson will exist in the repo but won't be reachable from the home page until this is done.
6. **Hand off to Claude Code for verification and integration** — confirm the relative paths to `shared/` resolve correctly from the lesson's actual folder depth, run the `LESSON_TEMPLATE.md` checklist, drag-test any sliders, update the lesson's row in `PROGRESS.md` (Built/Verified/Committed), then commit.
7. **Push and spot-check the live Pages URL** — GitHub Pages rebuilds automatically on a push to `main`, usually within a minute or two. Click through from the live home page to the new lesson afterward rather than trusting the commit alone.

## Maintenance note

If the site's navigation data structure changes shape (e.g. moves from an inline array to a separate JSON/data file), update step 5 above to say exactly where and how to register a new lesson — don't leave it vague once the real shape is known.
