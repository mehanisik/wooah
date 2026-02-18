import { state, debouncedSave } from '../state/store.js';

function sessionKey(dayIdx) {
  return `w${state.currentWeek}-d${dayIdx}`;
}

function exerciseNoteKey(dayIdx, exIdx) {
  return `w${state.currentWeek}-d${dayIdx}-e${exIdx}`;
}

function pinnedKey(dayIdx, exIdx) {
  return `d${dayIdx}-e${exIdx}`;
}

export function getSessionNotes(dayIdx) {
  if (!state.sessionNotes) state.sessionNotes = {};
  return state.sessionNotes[sessionKey(dayIdx)] || {};
}

export function setSessionNote(dayIdx, field, value) {
  if (!state.sessionNotes) state.sessionNotes = {};
  const key = sessionKey(dayIdx);
  if (!state.sessionNotes[key]) state.sessionNotes[key] = {};
  state.sessionNotes[key][field] = value;
  debouncedSave();
}

export function getExerciseNote(dayIdx, exIdx) {
  if (!state.exerciseNotes) state.exerciseNotes = {};
  return state.exerciseNotes[exerciseNoteKey(dayIdx, exIdx)] || '';
}

export function setExerciseNote(dayIdx, exIdx, text) {
  if (!state.exerciseNotes) state.exerciseNotes = {};
  const key = exerciseNoteKey(dayIdx, exIdx);
  if (text) state.exerciseNotes[key] = text;
  else delete state.exerciseNotes[key];
  debouncedSave();
}

export function getPinnedNote(dayIdx, exIdx) {
  if (!state.pinnedNotes) state.pinnedNotes = {};
  return state.pinnedNotes[pinnedKey(dayIdx, exIdx)] || '';
}

export function setPinnedNote(dayIdx, exIdx, text) {
  if (!state.pinnedNotes) state.pinnedNotes = {};
  const key = pinnedKey(dayIdx, exIdx);
  if (text) state.pinnedNotes[key] = text;
  else delete state.pinnedNotes[key];
  debouncedSave();
}

export function clearPinnedNote(dayIdx, exIdx) {
  if (!state.pinnedNotes) return;
  delete state.pinnedNotes[pinnedKey(dayIdx, exIdx)];
  debouncedSave();
}

const PILL_OPTIONS = {
  energy:   ['Low', 'Normal', 'High', 'Peak'],
  sleep:    ['<5h', '5-6h', '7-8h', '8+h'],
  mood:     ['Rough', 'Meh', 'Good', 'Great'],
  soreness: ['None', 'Mild', 'Moderate', 'Very Sore'],
};

export function renderSessionStrip(dayIdx) {
  const notes = getSessionNotes(dayIdx);
  const expanded = notes.energy || notes.sleep || notes.mood || notes.soreness;

  let h = `<div class="session-strip ${expanded ? 'open' : ''}" data-session-day="${dayIdx}">
    <button class="session-strip-toggle" data-toggle-strip="${dayIdx}" aria-expanded="${expanded}" aria-label="Toggle session notes">
      <span class="session-strip-icon"><i data-lucide="clipboard-list"></i></span>
      <span>HOW ARE YOU FEELING?</span>
      <span class="session-strip-arrow"><i data-lucide="chevron-down"></i></span>
    </button>
    <div class="session-strip-body">`;

  Object.entries(PILL_OPTIONS).forEach(([field, options]) => {
    const selected = notes[field] || '';
    h += `<div class="pill-group">
      <span class="pill-group-label">${field}</span>
      <div class="pill-row">`;
    options.forEach(opt => {
      h += `<button class="pill-btn ${selected === opt ? 'active' : ''}" data-pill-field="${field}" data-pill-value="${opt}" data-pill-day="${dayIdx}">${opt}</button>`;
    });
    h += `</div></div>`;
  });

  if (notes.text !== undefined) {
    h += `<textarea class="uk-input session-text" data-session-text="${dayIdx}" placeholder="Additional notes..." rows="2">${notes.text || ''}</textarea>`;
  } else {
    h += `<button class="add-note-btn" data-add-session-text="${dayIdx}"><i data-lucide="plus"></i> Add Notes</button>`;
  }

  h += `</div></div>`;
  return h;
}

export function renderRatingStars(dayIdx) {
  const notes = getSessionNotes(dayIdx);
  const rating = notes.rating || 0;
  let h = `<div class="rating-stars" data-rating-day="${dayIdx}">
    <span class="rating-label">Rate this session</span>
    <div class="star-row">`;
  for (let i = 1; i <= 5; i++) {
    h += `<button class="star-btn ${i <= rating ? 'active' : ''}" data-star="${i}" data-star-day="${dayIdx}" aria-label="Rate ${i} stars">&#9733;</button>`;
  }
  h += `</div></div>`;
  return h;
}

export function attachSessionListeners(container) {
  container.addEventListener('click', (e) => {
    const toggleBtn = e.target.closest('[data-toggle-strip]');
    if (toggleBtn) {
      const strip = toggleBtn.closest('.session-strip');
      strip.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', strip.classList.contains('open'));
      return;
    }

    const pill = e.target.closest('.pill-btn');
    if (pill) {
      const field = pill.dataset.pillField;
      const value = pill.dataset.pillValue;
      const dayIdx = parseInt(pill.dataset.pillDay, 10);
      const current = getSessionNotes(dayIdx)[field];
      if (current === value) {
        setSessionNote(dayIdx, field, '');
        pill.classList.remove('active');
      } else {
        setSessionNote(dayIdx, field, value);
        pill.closest('.pill-row').querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
        pill.classList.add('active');
      }
      return;
    }

    const addNoteBtn = e.target.closest('[data-add-session-text]');
    if (addNoteBtn) {
      const dayIdx = parseInt(addNoteBtn.dataset.addSessionText, 10);
      setSessionNote(dayIdx, 'text', '');
      const textarea = document.createElement('textarea');
      textarea.className = 'uk-input session-text';
      textarea.dataset.sessionText = dayIdx;
      textarea.placeholder = 'Additional notes...';
      textarea.rows = 2;
      addNoteBtn.replaceWith(textarea);
      textarea.focus();
      return;
    }

    const noteBtn = e.target.closest('.exercise-note-btn');
    if (noteBtn) {
      e.stopPropagation();
      const dayIdx = parseInt(noteBtn.dataset.noteDay, 10);
      const exIdx = parseInt(noteBtn.dataset.noteEx, 10);
      const card = noteBtn.closest('.exercise-card');
      const existing = card.querySelector('.exercise-note-area');
      if (existing) {
        existing.remove();
        return;
      }
      const text = getExerciseNote(dayIdx, exIdx);
      const area = document.createElement('div');
      area.className = 'exercise-note-area';
      area.innerHTML = `<div class="note-area-row">
        <textarea class="uk-input ex-note-input" data-ex-note-day="${dayIdx}" data-ex-note-ex="${exIdx}" placeholder="Notes for this exercise..." rows="2">${text}</textarea>
        <button class="pin-btn ${getPinnedNote(dayIdx, exIdx) ? 'pinned' : ''}" data-pin-day="${dayIdx}" data-pin-ex="${exIdx}" aria-label="Pin note" title="Pin to show every session"><i data-lucide="pin"></i></button>
      </div>`;
      const top = card.querySelector('.exercise-top');
      top.insertAdjacentElement('afterend', area);
      import('./icons.js').then(m => m.refreshIcons());
      area.querySelector('.ex-note-input').focus();
      return;
    }

    const pinBtn = e.target.closest('.pin-btn');
    if (pinBtn) {
      e.stopPropagation();
      const dayIdx = parseInt(pinBtn.dataset.pinDay, 10);
      const exIdx = parseInt(pinBtn.dataset.pinEx, 10);
      const textarea = pinBtn.closest('.note-area-row').querySelector('.ex-note-input');
      const text = textarea.value.trim();
      if (pinBtn.classList.contains('pinned')) {
        clearPinnedNote(dayIdx, exIdx);
        pinBtn.classList.remove('pinned');
      } else if (text) {
        setPinnedNote(dayIdx, exIdx, text);
        pinBtn.classList.add('pinned');
      }
      return;
    }

    const star = e.target.closest('.star-btn');
    if (star) {
      const val = parseInt(star.dataset.star, 10);
      const dayIdx = parseInt(star.dataset.starDay, 10);
      setSessionNote(dayIdx, 'rating', val);
      star.closest('.star-row').querySelectorAll('.star-btn').forEach((b, i) => {
        b.classList.toggle('active', i < val);
      });
      return;
    }
  });

  container.addEventListener('input', (e) => {
    const sessionText = e.target.closest('[data-session-text]');
    if (sessionText) {
      setSessionNote(parseInt(sessionText.dataset.sessionText, 10), 'text', sessionText.value);
      return;
    }

    const exNote = e.target.closest('.ex-note-input');
    if (exNote) {
      setExerciseNote(
        parseInt(exNote.dataset.exNoteDay, 10),
        parseInt(exNote.dataset.exNoteEx, 10),
        exNote.value.trim()
      );
    }
  });
}
