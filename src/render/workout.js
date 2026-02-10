import { $, $$, formatRest, parseRepRange, formatDuration, formatTimeShort } from '../ui/helpers.js';
import { state, getLog, setLog, getLastSession, isDayFinished, getWorkoutTimer, startWorkoutTimer, historyKey, getExtraSets, addExtraSet } from '../state/store.js';
import { PROGRAM } from '../data/program.js';
import { renderInfoPage } from './info.js';
import { renderStatsPage, attachStatsListeners } from './stats-page.js';
import { renderRestDay } from './rest-day.js';
import { loadRestDayImage } from './celebration.js';
import { startRestTimer } from '../timers/rest-timer.js';
import { startWorkoutClock } from '../timers/workout-clock.js';
import { updateFinishBar } from '../ui/finish.js';
import { refreshIcons } from '../ui/icons.js';

export function renderPages() {
  const pages = $('#pages');
  let html = '';

  PROGRAM.forEach((day, dayIdx) => {
    const isActive = dayIdx === state.activeTab;
    if (day.type === 'rest') {
      html += `<div class="page ${isActive ? 'uk-active' : ''}" data-page="${dayIdx}">${renderRestDay()}</div>`;
      return;
    }

    html += `<div class="page ${isActive ? 'uk-active' : ''}" data-page="${dayIdx}">`;
    html += renderWorkoutPage(day, dayIdx);
    html += `</div>`;
  });

  html += `<div class="page ${state.activeTab === 7 ? 'uk-active' : ''}" data-page="7">${renderInfoPage()}</div>`;
  html += `<div class="page ${state.activeTab === 8 ? 'uk-active' : ''}" data-page="8">${renderStatsPage()}</div>`;
  pages.innerHTML = html;
  refreshIcons();
  attachExerciseListeners();
  if (state.activeTab === 8) attachStatsListeners();

  if (state.activeTab >= 0 && state.activeTab <= 5) {
    const timer = getWorkoutTimer(state.activeTab);
    if (timer && !timer.finishedAt) startWorkoutClock(state.activeTab);
  }

  if (state.activeTab === 6) loadRestDayImage();
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
    <button class="warmup-toggle" data-warmup="${dayIdx}">
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

  if (day.cardio) {
    h += `<div class="warmup-section">
      <button class="warmup-toggle" data-cardio="${dayIdx}">
        <span class="arrow"><i data-lucide="chevron-right"></i></span> <i data-lucide="heart-pulse" style="width:16px;height:16px;display:inline;vertical-align:-2px;"></i> POST-WORKOUT CARDIO
      </button>
      <div class="warmup-content" data-cardio-content="${dayIdx}">
        <p>${day.cardio}</p>
      </div>
    </div>`;
  }

  return h;
}

function renderExerciseCard(ex, dayIdx, exIdx) {
  let h = '';
  const totalSets = ex.sets + getExtraSets(dayIdx, exIdx);
  const allDone = Array.from({length: totalSets}, (_, i) => getLog(dayIdx, exIdx, i).done).every(Boolean);
  const prKey = historyKey(dayIdx, exIdx);
  const hasPR = !!state.personalRecords[prKey];

  h += `<div class="exercise-card ${allDone ? 'done' : ''}" data-day="${dayIdx}" data-ex="${exIdx}">`;
  h += `<div class="exercise-top">`;
  h += `<div class="exercise-num ${allDone ? 'done' : ''}">${exIdx + 1}</div>`;
  h += `<div class="exercise-info">`;
  h += `<div class="exercise-name">${ex.name}</div>`;
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
    h += `<input class="uk-input set-input weight-input" type="number" inputmode="decimal" step="0.5" placeholder="—" value="${log.weight || ''}" data-field="weight">`;
    h += `<input class="uk-input set-input reps-input" type="number" inputmode="numeric" placeholder="${isAmrapSet ? '5+' : ex.reps}" value="${log.reps || ''}" data-field="reps">`;
    h += `<div class="set-check ${log.done ? 'done' : ''}" data-action="toggle">${log.done ? '<i data-lucide="check"></i>' : ''}</div>`;
    h += `</div>`;
  }

  h += `<button class="add-set-btn" data-add-set data-day="${dayIdx}" data-ex="${exIdx}"><i data-lucide="plus"></i> Add Set</button>`;
  h += renderProgression(ex, dayIdx, exIdx);
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
    top.addEventListener('click', () => { top.closest('.exercise-card').classList.toggle('open'); });
  });

  $$('.warmup-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const content = $(`[data-warmup-content="${btn.dataset.warmup}"]`);
      btn.classList.toggle('open');
      content.classList.toggle('open');
    });
  });

  $$('[data-cardio]').forEach(btn => {
    btn.addEventListener('click', () => {
      const content = $(`[data-cardio-content="${btn.dataset.cardio}"]`);
      btn.classList.toggle('open');
      content.classList.toggle('open');
    });
  });

  $$('.set-row:not(.header)').forEach(row => attachSetRowListener(row));

  $$('[data-add-set]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const dayIdx = parseInt(btn.dataset.day);
      const exIdx = parseInt(btn.dataset.ex);
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
      btn.before(row);
      attachSetRowListener(row);
      refreshIcons();
    });
  });
}

function attachSetRowListener(row) {
  const dayIdx = parseInt(row.dataset.day);
  const exIdx = parseInt(row.dataset.ex);
  const setIdx = parseInt(row.dataset.set);
  const restSec = parseInt(row.dataset.rest);

  row.querySelectorAll('.set-input').forEach(input => {
    input.addEventListener('input', () => {
      const current = getLog(dayIdx, exIdx, setIdx);
      current[input.dataset.field] = input.value;
      setLog(dayIdx, exIdx, setIdx, current);
    });
    input.addEventListener('click', e => e.stopPropagation());
  });

  const check = row.querySelector('.set-check');
  if (check) {
    check.addEventListener('click', (e) => {
      e.stopPropagation();
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
        refreshIcons();
        const ex = PROGRAM[dayIdx].exercises[exIdx];
        startRestTimer(restSec, ex.name);
      } else {
        check.classList.remove('done');
        check.innerHTML = '';
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
    });
  }
}
