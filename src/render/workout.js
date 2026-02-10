import { $, $$, formatRest, parseRepRange, formatDuration, formatTimeShort } from '../ui/helpers.js';
import { state, getLog, setLog, getLastSession, isDayFinished, getWorkoutTimer, startWorkoutTimer, historyKey, getExtraSets, addExtraSet, debouncedSave, getCardioLog, setCardioLog } from '../state/store.js';
import { PROGRAM } from '../data/program.js';
import { renderInfoPage } from './info.js';
import { renderStatsPage, attachStatsListeners } from './stats-page.js';
import { renderCalendarPage, attachCalendarListeners } from './calendar.js';
import { renderPhotosPage, attachPhotosListeners } from './photos.js';
import { renderRestDay } from './rest-day.js';
import { loadRestDayImage } from './celebration.js';
import { startRestTimer } from '../timers/rest-timer.js';
import { startWorkoutClock } from '../timers/workout-clock.js';
import { updateFinishBar } from '../ui/finish.js';
import { refreshIcons } from '../ui/icons.js';
import { captureSnapshot, showUndoToast } from '../ui/undo.js';
import { getDisplayName, showSwapModal } from '../ui/exercise-swap.js';
import { renderOneRMDisplay, updateOneRMAfterSet } from '../ui/one-rm.js';

export function renderPages() {
  const pages = $('#pages');
  const tab = state.activeTab;
  let content = '';

  if (tab >= 0 && tab <= 6) {
    const day = PROGRAM[tab];
    if (day.type === 'rest') {
      content = renderRestDay();
    } else {
      content = renderWorkoutPage(day, tab);
    }
  } else if (tab === 7) {
    content = renderInfoPage();
  } else if (tab === 8) {
    content = renderStatsPage();
  } else if (tab === 9) {
    content = renderCalendarPage();
  } else if (tab === 10) {
    content = renderPhotosPage();
  }

  pages.innerHTML = `<div class="page uk-active" data-page="${tab}">${content}</div>`;
  refreshIcons();
  attachExerciseListeners();
  if (tab === 8) attachStatsListeners();
  if (tab === 9) attachCalendarListeners();
  if (tab === 10) attachPhotosListeners();

  if (tab >= 0 && tab <= 5) {
    const timer = getWorkoutTimer(tab);
    if (timer && !timer.finishedAt) startWorkoutClock(tab);
  }

  if (tab === 6) loadRestDayImage();
}

function renderWorkoutPage(day, dayIdx) {
  let h = '';
  const finished = isDayFinished(dayIdx);

  h += `<div class="workout-header">
    <span class="workout-tag ${day.type}">${day.type}</span>
    ${finished ? '<span class="workout-tag" style="background:var(--green-dim);color:var(--green);margin-left:6px;">DONE</span>' : ''}
    <div class="workout-title">${day.name}</div>
    <div class="workout-focus">${day.focus}</div>
  </div>`;

  const timer = getWorkoutTimer(dayIdx);
  if (timer) {
    const isRunning = !timer.finishedAt;
    const elapsed = isRunning
      ? Math.round((Date.now() - new Date(timer.startedAt).getTime()) / 1000)
      : timer.duration;
    h += `<div class="workout-timer">
      <span class="workout-timer-icon">${isRunning ? '<i data-lucide="timer"></i>' : '<i data-lucide="circle-check"></i>'}</span>
      <span class="workout-timer-display ${isRunning ? 'active' : 'finished'}" id="workoutTimerDisplay-${dayIdx}">${formatDuration(elapsed)}</span>
      <span class="workout-timer-label">${isRunning ? 'ELAPSED' : 'TOTAL TIME'}</span>
      <span class="workout-timer-start">${formatTimeShort(timer.startedAt)}${timer.finishedAt ? ' — ' + formatTimeShort(timer.finishedAt) : ''}</span>
    </div>`;
  }

  h += `<div class="warmup-section">
    <button class="warmup-toggle" data-warmup="${dayIdx}" aria-expanded="false" aria-label="Toggle warm-up protocol">
      <span class="arrow"><i data-lucide="chevron-right"></i></span> WARM-UP PROTOCOL
    </button>
    <div class="warmup-content" data-warmup-content="${dayIdx}">
      <ul>
        <li>5 min light cardio (bike, treadmill, rowing)</li>
        <li>Dynamic stretches: arm circles, leg swings, hip circles, band pull-aparts (2 min)</li>
        <li>Specific: ${day.warmup}</li>
      </ul>
    </div>
  </div>`;

  day.exercises.forEach((ex, exIdx) => {
    h += renderExerciseCard(ex, dayIdx, exIdx);
  });

  if (day.cardio && day.cardio.length) {
    const allCardioDone = day.cardio.every((_, i) => getCardioLog(dayIdx, i));
    h += `<div class="cardio-section ${allCardioDone ? 'done' : ''}">
      <div class="cardio-header">
        <i data-lucide="heart-pulse" style="width:16px;height:16px;"></i> ABS / CARDIO
        <button class="circuit-start-btn" data-circuit-day="${dayIdx}" ${allCardioDone ? 'disabled' : ''}>${allCardioDone ? 'DONE' : 'START CIRCUIT'}</button>
      </div>`;
    day.cardio.forEach((item, i) => {
      const done = getCardioLog(dayIdx, i);
      h += `<div class="cardio-row ${done ? 'done' : ''}" data-day="${dayIdx}" data-cardio-idx="${i}">
        <div class="set-check ${done ? 'done' : ''}" data-action="cardio-toggle"><i data-lucide="check" style="width:14px;height:14px;"></i></div>
        <span class="cardio-name">${item.name}</span>
        <span class="cardio-duration">${item.duration}</span>
      </div>`;
    });
    h += `</div>`;
  }

  return h;
}

function renderExerciseCard(ex, dayIdx, exIdx) {
  let h = '';
  const totalSets = ex.sets + getExtraSets(dayIdx, exIdx);
  const allDone = Array.from({length: totalSets}, (_, i) => getLog(dayIdx, exIdx, i).done).every(Boolean);
  const prKey = historyKey(dayIdx, exIdx);
  const hasPR = !!state.personalRecords[prKey];

  h += `<div class="exercise-card ${allDone ? 'done' : ''}" data-day="${dayIdx}" data-ex="${exIdx}" role="region" aria-label="${ex.name}">`;
  h += `<div class="exercise-top" role="button" tabindex="0" aria-expanded="false" aria-label="Expand ${ex.name}">`;
  h += `<div class="exercise-num ${allDone ? 'done' : ''}">${exIdx + 1}</div>`;
  h += `<div class="exercise-info">`;
  const displayName = getDisplayName(dayIdx, exIdx);
  const isSwapped = displayName !== ex.name;
  h += `<div class="exercise-name">${displayName}${isSwapped ? ' <span class="swap-indicator">swapped</span>' : ''}</div>`;
  h += `<div class="exercise-meta">`;
  h += `<span>${ex.sets} x ${ex.reps}</span>`;
  h += `<span><i data-lucide="timer"></i> ${formatRest(ex.rest)}</span>`;
  h += `<span>RIR ${ex.rir}</span>`;
  if (ex.amrap) h += `<span style="color:var(--brand);">AMRAP</span>`;
  h += `</div>`;
  if (ex.notes) h += `<div class="exercise-note">${ex.notes}</div>`;
  if (ex.superset) h += `<span class="uk-badge superset-badge"><i data-lucide="zap"></i> Superset</span>`;
  if (hasPR) h += `<span class="uk-badge pr-badge"><i data-lucide="trophy"></i> PR</span>`;
  h += `</div>`;
  if (ex.alternatives && ex.alternatives.length > 0) {
    h += `<button class="swap-btn" data-swap-day="${dayIdx}" data-swap-ex="${exIdx}" aria-label="Swap exercise" title="Swap exercise">&#x21c4;</button>`;
  }
  h += `<div class="exercise-expand"><i data-lucide="chevron-down"></i></div>`;
  h += `</div>`;

  h += `<div class="exercise-log">`;

  const lastSession = getLastSession(dayIdx, exIdx);
  if (lastSession) {
    h += `<div class="prev-performance">`;
    h += `<div class="prev-label">Previous (Week ${lastSession.week})</div>`;
    h += `<div class="prev-sets">`;
    lastSession.sets.forEach(s => { h += `<span class="prev-set">${s.weight}kg x ${s.reps}</span>`; });
    h += `</div></div>`;
  }

  h += `<div class="set-row header"><span>#</span><span>KG</span><span>REPS</span><span></span></div>`;

  for (let s = 0; s < totalSets; s++) {
    const log = getLog(dayIdx, exIdx, s);
    const isAmrapSet = ex.amrap && s === ex.sets - 1;

    h += `<div class="set-row" data-day="${dayIdx}" data-ex="${exIdx}" data-set="${s}" data-rest="${ex.rest}">`;
    h += `<span class="set-label ${isAmrapSet ? 'amrap' : ''}">${isAmrapSet ? 'A' : s + 1}</span>`;
    h += `<input class="uk-input set-input weight-input" type="number" inputmode="decimal" step="0.5" min="0" max="500" placeholder="—" value="${log.weight || ''}" data-field="weight">`;
    h += `<input class="uk-input set-input reps-input" type="number" inputmode="numeric" step="1" min="0" max="100" placeholder="${isAmrapSet ? '5+' : ex.reps}" value="${log.reps || ''}" data-field="reps">`;
    h += `<div class="set-check ${log.done ? 'done' : ''}" data-action="toggle" role="checkbox" aria-checked="${log.done}" aria-label="Mark set ${s + 1} done" tabindex="0">${log.done ? '<i data-lucide="check"></i>' : ''}</div>`;
    h += `</div>`;
  }

  h += `<button class="add-set-btn" data-add-set data-day="${dayIdx}" data-ex="${exIdx}" aria-label="Add extra set for ${ex.name}"><i data-lucide="plus"></i> Add Set</button>`;
  h += renderProgression(ex, dayIdx, exIdx);
  h += renderOneRMDisplay(dayIdx, exIdx);
  h += `</div>`;
  h += `</div>`;
  return h;
}

function renderProgression(ex, dayIdx, exIdx) {
  const lastSession = getLastSession(dayIdx, exIdx);
  if (!lastSession) return '';

  const currentSets = [];
  for (let s = 0; s < ex.sets; s++) currentSets.push(getLog(dayIdx, exIdx, s));
  if (!currentSets.every(s => s.done)) return '';

  let h = '<div class="progression-bar">';

  if (ex.compound && ex.amrap) {
    const currentAmrap = currentSets[currentSets.length - 1];
    if (currentAmrap.reps >= 5) {
      h += `<div class="progression-msg up"><i data-lucide="arrow-up"></i> Add 2.5kg next session (AMRAP: ${currentAmrap.reps} reps)</div>`;
    } else {
      h += `<div class="progression-msg hold"><i data-lucide="minus"></i> Keep weight, aim for 5+ AMRAP reps</div>`;
    }
  } else {
    const range = parseRepRange(ex.reps);
    const allAtTop = currentSets.every(s => parseInt(s.reps) >= range.high);
    if (allAtTop) {
      h += `<div class="progression-msg up"><i data-lucide="arrow-up"></i> Increase weight next session (all sets hit ${range.high} reps)</div>`;
    } else {
      const avgReps = currentSets.reduce((a, s) => a + (parseInt(s.reps) || 0), 0) / currentSets.length;
      h += `<div class="progression-msg hold"><i data-lucide="minus"></i> Build to ${range.high} reps on all sets (avg: ${avgReps.toFixed(0)})</div>`;
    }
  }

  h += '</div>';
  return h;
}

function attachExerciseListeners() {
  $$('.exercise-top').forEach(top => {
    top.addEventListener('click', () => {
      const card = top.closest('.exercise-card');
      card.classList.toggle('open');
      top.setAttribute('aria-expanded', card.classList.contains('open'));
    });
  });

  $$('.warmup-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const content = $(`[data-warmup-content="${btn.dataset.warmup}"]`);
      btn.classList.toggle('open');
      content.classList.toggle('open');
      btn.setAttribute('aria-expanded', btn.classList.contains('open'));
    });
  });


  const pageContainer = $('#pages');
  pageContainer.addEventListener('click', (e) => {
    const swapBtn = e.target.closest('.swap-btn');
    if (swapBtn) {
      e.stopPropagation();
      showSwapModal(parseInt(swapBtn.dataset.swapDay), parseInt(swapBtn.dataset.swapEx));
      return;
    }

    const circuitBtn = e.target.closest('.circuit-start-btn');
    if (circuitBtn) {
      e.stopPropagation();
      const dayIdx = parseInt(circuitBtn.dataset.circuitDay);
      import('../timers/circuit-timer.js').then(m => m.startCircuit(dayIdx));
      return;
    }

    const addBtn = e.target.closest('[data-add-set]');
    if (addBtn) {
      e.stopPropagation();
      const dayIdx = parseInt(addBtn.dataset.day);
      const exIdx = parseInt(addBtn.dataset.ex);
      addExtraSet(dayIdx, exIdx);
      const ex = PROGRAM[dayIdx].exercises[exIdx];
      const totalSets = ex.sets + getExtraSets(dayIdx, exIdx);
      const s = totalSets - 1;
      const log = getLog(dayIdx, exIdx, s);

      const row = document.createElement('div');
      row.className = 'set-row';
      row.dataset.day = dayIdx;
      row.dataset.ex = exIdx;
      row.dataset.set = s;
      row.dataset.rest = ex.rest;
      row.innerHTML = `<span class="set-label">${s + 1}</span><input class="uk-input set-input weight-input" type="number" inputmode="decimal" step="0.5" placeholder="—" value="${log.weight || ''}" data-field="weight"><input class="uk-input set-input reps-input" type="number" inputmode="numeric" placeholder="${ex.reps}" value="${log.reps || ''}" data-field="reps"><div class="set-check" data-action="toggle"></div>`;
      addBtn.before(row);
      refreshIcons();
      return;
    }

    const check = e.target.closest('.set-check');
    if (check) {
      e.stopPropagation();
      const cardioRow = check.closest('.cardio-row');
      if (cardioRow) {
        const dayIdx = parseInt(cardioRow.dataset.day);
        const idx = parseInt(cardioRow.dataset.cardioIdx);
        const done = !getCardioLog(dayIdx, idx);
        setCardioLog(dayIdx, idx, done);
        check.classList.toggle('done', done);
        cardioRow.classList.toggle('done', done);
        const section = cardioRow.closest('.cardio-section');
        const day = PROGRAM[dayIdx];
        const allDone = day.cardio.every((_, i) => getCardioLog(dayIdx, i));
        section.classList.toggle('done', allDone);
        refreshIcons();
        if (done && !allDone) {
          startRestTimer(15, day.cardio[idx].name);
        }
        return;
      }
      const row = check.closest('.set-row');
      if (!row || row.classList.contains('header')) return;
      handleSetToggle(row, check);
      return;
    }
  });

  pageContainer.addEventListener('input', (e) => {
    const input = e.target.closest('.set-input');
    if (!input) return;
    const row = input.closest('.set-row');
    if (!row || row.classList.contains('header')) return;

    let val = parseFloat(input.value);
    const isReps = input.dataset.field === 'reps';
    if (isReps) val = Math.floor(val);
    const min = parseFloat(input.min) || 0;
    const max = parseFloat(input.max) || (isReps ? 100 : 500);

    if (input.value !== '' && (isNaN(val) || val < min || val > max)) {
      input.classList.add('invalid');
      return;
    }
    input.classList.remove('invalid');

    if (input.value !== '' && val < min) input.value = min;

    const dayIdx = parseInt(row.dataset.day);
    const exIdx = parseInt(row.dataset.ex);
    const setIdx = parseInt(row.dataset.set);
    const current = getLog(dayIdx, exIdx, setIdx);
    current[input.dataset.field] = input.value;
    state.logs[`w${state.currentWeek}-d${dayIdx}-e${exIdx}-s${setIdx}`] = current;
    debouncedSave();
  });
}

function handleSetToggle(row, check) {
  captureSnapshot();
  const dayIdx = parseInt(row.dataset.day);
  const exIdx = parseInt(row.dataset.ex);
  const setIdx = parseInt(row.dataset.set);
  const restSec = parseInt(row.dataset.rest);
  const current = getLog(dayIdx, exIdx, setIdx);
  current.done = !current.done;

  if (current.done && !getWorkoutTimer(dayIdx)) {
    startWorkoutTimer(dayIdx);
    const timerData = getWorkoutTimer(dayIdx);
    const page = row.closest('.page');
    const warmup = page.querySelector('.warmup-section');
    if (warmup) {
      const timerEl = document.createElement('div');
      timerEl.className = 'workout-timer';
      timerEl.innerHTML = `<span class="workout-timer-icon"><i data-lucide="timer"></i></span><span class="workout-timer-display active" id="workoutTimerDisplay-${dayIdx}">0:00</span><span class="workout-timer-label">ELAPSED</span><span class="workout-timer-start">${formatTimeShort(timerData.startedAt)}</span>`;
      refreshIcons();
      warmup.before(timerEl);
    }
    startWorkoutClock(dayIdx);
  }

  if (current.done && !current.weight) {
    if (setIdx > 0) {
      const prev = getLog(dayIdx, exIdx, setIdx - 1);
      if (prev.weight) current.weight = prev.weight;
    } else {
      const last = getLastSession(dayIdx, exIdx);
      if (last && last.sets[0]) current.weight = last.sets[0].weight;
    }
  }

  setLog(dayIdx, exIdx, setIdx, current);

  if (current.done) {
    check.classList.add('done');
    check.innerHTML = '<i data-lucide="check"></i>';
    check.setAttribute('aria-checked', 'true');
    refreshIcons();
    const ex = PROGRAM[dayIdx].exercises[exIdx];
    startRestTimer(restSec, ex.name);
  } else {
    check.classList.remove('done');
    check.innerHTML = '';
    check.setAttribute('aria-checked', 'false');
  }

  const weightInput = row.querySelector('.weight-input');
  if (current.weight && !weightInput.value) weightInput.value = current.weight;

  const card = row.closest('.exercise-card');
  const ex = PROGRAM[dayIdx].exercises[exIdx];
  const totalSets = ex.sets + getExtraSets(dayIdx, exIdx);
  const allDone = Array.from({length: totalSets}, (_, i) => getLog(dayIdx, exIdx, i).done).every(Boolean);
  const numEl = card.querySelector('.exercise-num');
  if (allDone) { numEl.classList.add('done'); card.classList.add('done'); }
  else { numEl.classList.remove('done'); card.classList.remove('done'); }

  updateFinishBar();
  showUndoToast();
}
