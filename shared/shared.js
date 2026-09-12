/* =============================================================
   shared.js — shared utilities for all Year 8 lesson pages
   Load this file before any lesson-specific scripts.
   ============================================================= */

/* ---- Geometry helpers (used by angle, probability, chart) ---- */
/* Standard math convention: 0° = right, angles increase counter-clockwise.
   SVG Y-axis is flipped, so we negate sin to keep CCW on screen. */
function polarPoint(cx, cy, r, deg) {
  const rad = deg * Math.PI / 180;
  return { x: cx + r * Math.cos(rad), y: cy - r * Math.sin(rad) };
}

function wedgePath(cx, cy, r, startDeg, endDeg) {
  const s = polarPoint(cx, cy, r, startDeg);
  const e = polarPoint(cx, cy, r, endDeg);
  const largeArc = (endDeg - startDeg) > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${s.x} ${s.y} A ${r} ${r} 0 ${largeArc} 0 ${e.x} ${e.y} Z`;
}

/* ---- Fraction helpers (used by number-line, probability) ---- */
function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }

function simplifyFraction(n, d) {
  const g = gcd(Math.abs(n), Math.abs(d));
  return { n: n / g, d: d / g };
}

/* ---- Question renderer ---- */
/**
 * Renders a multiple-choice question card into `container`.
 * q.options is an array of strings; q.answerIndex is the correct one.
 * On correct answer, adds q.id to `solved`, updates the progress UI,
 * and calls `onAllSolved` once if all questions are answered.
 * Wrong answers keep the question live (allow retrying).
 */
function renderQuestion(q, container, solved, questions, onAllSolved) {
  const div = document.createElement('div');
  div.className = 'card question';
  div.setAttribute('data-qid', q.id);

  const prompt = document.createElement('p');
  prompt.className = 'prompt';
  prompt.textContent = q.prompt;
  div.appendChild(prompt);

  const opts = document.createElement('div');
  opts.className = 'options';
  div.appendChild(opts);

  const feedback = document.createElement('p');
  feedback.className = 'feedback';
  feedback.setAttribute('aria-live', 'polite');
  div.appendChild(feedback);

  if (q.hint) {
    const hintBtn = document.createElement('button');
    hintBtn.type = 'button';
    hintBtn.className = 'hint-toggle';
    hintBtn.textContent = 'Need a hint?';
    const hintText = document.createElement('p');
    hintText.className = 'hint-text';
    hintText.hidden = true;
    hintText.textContent = q.hint;
    hintBtn.addEventListener('click', () => {
      hintText.hidden = !hintText.hidden;
      hintBtn.textContent = hintText.hidden ? 'Need a hint?' : 'Hide hint';
    });
    div.appendChild(hintBtn);
    div.appendChild(hintText);
  }

  const explain = document.createElement('div');
  explain.className = 'explain-reveal';
  explain.hidden = true;
  explain.textContent = q.explain || '';
  div.appendChild(explain);

  q.options.forEach((optionText, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'option';
    btn.textContent = optionText;
    btn.addEventListener('click', () => {
      if (solved.has(q.id)) return;
      const isCorrect = i === q.answerIndex;
      opts.querySelectorAll('.option').forEach(o => o.classList.remove('correct', 'incorrect'));
      if (isCorrect) {
        btn.classList.add('correct');
        feedback.textContent = "That's it — well spotted.";
        feedback.className = 'feedback correct-text';
        opts.querySelectorAll('.option').forEach(o => o.disabled = true);
        explain.hidden = false;
        solved.add(q.id);
        updateProgress(solved, questions);
        if (solved.size === questions.length && typeof onAllSolved === 'function') {
          onAllSolved();
        }
      } else {
        btn.classList.add('incorrect');
        feedback.textContent = 'Not quite — have another go.';
        feedback.className = 'feedback incorrect-text';
      }
    });
    opts.appendChild(btn);
  });

  container.appendChild(div);
}

/* ---- Progress bar ---- */
function updateProgress(solved, questions) {
  const txt = document.getElementById('progress-text');
  if (txt) txt.textContent = solved.size + ' of ' + questions.length + ' explored';
  const dots = document.querySelectorAll('#progress-dots span');
  dots.forEach((dot, i) => {
    dot.classList.toggle('done', solved.has(questions[i].id));
  });
}

/* ---- ProfileManager ---- */
const ProfileManager = (() => {
  const KEY_PROFILES = 'ls_profiles';
  const KEY_ACTIVE   = 'ls_active_profile';

  function _read(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  }
  function _write(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
  }

  function getProfiles() { return _read(KEY_PROFILES, []); }
  function getActiveId()  { return _read(KEY_ACTIVE, null); }
  function getActive()    { return getProfiles().find(p => p.id === getActiveId()) ?? null; }

  function setActive(id) { _write(KEY_ACTIVE, id); }

  function addProfile(name) {
    const profiles = getProfiles();
    const id = 'p_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
    profiles.push({ id, name });
    _write(KEY_PROFILES, profiles);
    return id;
  }

  function removeProfile(id) {
    _write(KEY_PROFILES, getProfiles().filter(p => p.id !== id));
    try { localStorage.removeItem('ls_progress_' + id); } catch {}
    if (getActiveId() === id) _write(KEY_ACTIVE, null);
  }

  function getProgress(profileId) {
    return _read('ls_progress_' + profileId, {});
  }

  function markLessonComplete(lessonId, score) {
    const pid = getActiveId();
    if (!pid) return;
    const prog = getProgress(pid);
    const prev = prog[lessonId];
    prog[lessonId] = {
      score,
      completedAt: new Date().toISOString(),
      attempts: (prev?.attempts ?? 0) + 1,
    };
    _write('ls_progress_' + pid, prog);
  }

  function getLessonProgress(lessonId) {
    const pid = getActiveId();
    if (!pid) return null;
    return getProgress(pid)[lessonId] ?? null;
  }

  return { getProfiles, getActiveId, getActive, setActive, addProfile, removeProfile, getProgress, markLessonComplete, getLessonProgress };
})();

/* ---- Profile bar ---- */
/**
 * Injects a profile bar at the top of `.page` for the given lesson.
 * `lessonId` should match the id used in ProfileManager (e.g. 'place-value-explorer').
 */
function renderProfileBar(lessonId) {
  const page = document.querySelector('.page');
  if (!page) return;

  const bar = document.createElement('div');
  bar.className = 'profile-bar';
  bar.id = 'profile-bar';

  const backLink = document.createElement('a');
  backLink.className = 'back-link';
  backLink.href = '../../../../../index.html';
  backLink.textContent = '← All lessons';
  bar.appendChild(backLink);

  const sep = document.createElement('span');
  sep.className = 'bar-sep';
  sep.textContent = '|';
  bar.appendChild(sep);

  const badge = document.createElement('a');
  badge.className = 'learner-badge';
  badge.href = '../../../../../index.html#profiles';
  const active = ProfileManager.getActive();
  if (active) {
    badge.textContent = '👤 ' + active.name;
    badge.title = 'Switch learner profile';
  } else {
    badge.className = 'learner-badge no-profile';
    badge.textContent = '+ Choose learner';
    badge.title = 'Pick or create a learner profile';
  }
  bar.appendChild(badge);

  const prog = lessonId ? ProfileManager.getLessonProgress(lessonId) : null;
  if (prog) {
    const doneBadge = document.createElement('span');
    doneBadge.className = 'done-badge';
    doneBadge.textContent = '✓ ' + prog.score + ' answered';
    bar.appendChild(doneBadge);
  }

  page.insertBefore(bar, page.firstChild);
}
