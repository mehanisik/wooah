import { PROGRAM } from '../data/program.js';
import { setCardioLog, getCardioLog } from '../state/store.js';
import { refreshIcons } from '../ui/icons.js';

const WORK_TIME = 45;
const REST_TIME = 15;
const PREPARE_TIME = 3;

let timerInterval = null;
let overlay = null;

function beep(freq = 880, duration = 150) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = freq;
    gain.gain.value = 0.15;
    osc.start();
    osc.stop(ctx.currentTime + duration / 1000);
  } catch (_) {}
}

function vibrate(pattern) {
  if (navigator.vibrate) navigator.vibrate(pattern);
}

export function startCircuit(dayIdx) {
  const day = PROGRAM[dayIdx];
  if (!day || !day.cardio || !day.cardio.length) return;

  const items = day.cardio.filter((_, i) => !getCardioLog(dayIdx, i));
  if (items.length === 0) return;

  const startIdx = day.cardio.findIndex((_, i) => !getCardioLog(dayIdx, i));

  createOverlay();
  runCircuit(dayIdx, day.cardio, startIdx);
}

function createOverlay() {
  if (overlay) overlay.remove();
  overlay = document.createElement('div');
  overlay.className = 'circuit-overlay';
  overlay.innerHTML = `
    <div class="circuit-phase"></div>
    <div class="circuit-exercise"></div>
    <div class="circuit-ring">
      <svg viewBox="0 0 120 120">
        <circle class="circuit-ring-bg" cx="60" cy="60" r="54" />
        <circle class="circuit-ring-progress" cx="60" cy="60" r="54" />
      </svg>
      <div class="circuit-time"></div>
    </div>
    <div class="circuit-next"></div>
    <div class="circuit-controls">
      <button class="circuit-ctrl-btn" data-circuit-action="prev"><i data-lucide="skip-back" style="width:20px;height:20px;"></i></button>
      <button class="circuit-ctrl-btn circuit-pause" data-circuit-action="pause"><i data-lucide="pause" style="width:24px;height:24px;"></i></button>
      <button class="circuit-ctrl-btn" data-circuit-action="next"><i data-lucide="skip-forward" style="width:20px;height:20px;"></i></button>
    </div>
    <button class="circuit-close" data-circuit-action="close"><i data-lucide="x" style="width:20px;height:20px;"></i></button>
  `;
  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('visible'));
  refreshIcons();

  overlay.addEventListener('click', handleOverlayClick);
}

function handleOverlayClick(e) {
  const btn = e.target.closest('[data-circuit-action]');
  if (!btn) return;
  const action = btn.dataset.circuitAction;
  if (action === 'close') stopCircuit();
  else if (action === 'pause') togglePause();
  else if (action === 'next') skipNext();
  else if (action === 'prev') skipPrev();
}

let circuitState = null;

function runCircuit(dayIdx, exercises, startIdx) {
  circuitState = {
    dayIdx,
    exercises,
    currentIdx: startIdx,
    phase: 'prepare',
    remaining: PREPARE_TIME,
    totalTime: PREPARE_TIME,
    paused: false,
    onSkipNext: null,
    onSkipPrev: null,
  };

  runPhase();
}

function runPhase() {
  if (!circuitState || !overlay) return;

  const { exercises, currentIdx, phase } = circuitState;
  const current = exercises[currentIdx];
  const nextIdx = currentIdx + 1;
  const next = nextIdx < exercises.length ? exercises[nextIdx] : null;

  const phaseEl = overlay.querySelector('.circuit-phase');
  const exerciseEl = overlay.querySelector('.circuit-exercise');
  const timeEl = overlay.querySelector('.circuit-time');
  const nextEl = overlay.querySelector('.circuit-next');
  const ring = overlay.querySelector('.circuit-ring-progress');
  const circumference = 2 * Math.PI * 54;
  ring.style.strokeDasharray = circumference;

  if (phase === 'prepare') {
    overlay.dataset.phase = 'prepare';
    phaseEl.textContent = 'GET READY';
    exerciseEl.textContent = current.name;
    nextEl.textContent = '';
  } else if (phase === 'work') {
    overlay.dataset.phase = 'work';
    phaseEl.textContent = 'WORK';
    exerciseEl.textContent = current.name;
    nextEl.textContent = next ? `Next: ${next.name}` : 'Last exercise!';
  } else if (phase === 'rest') {
    overlay.dataset.phase = 'rest';
    phaseEl.textContent = 'REST';
    exerciseEl.textContent = next ? next.name : '';
    nextEl.textContent = next ? 'Up next' : '';
  }

  clearInterval(timerInterval);

  function tick() {
    if (circuitState.paused) return;

    const { remaining, totalTime } = circuitState;
    timeEl.textContent = remaining;

    const progress = 1 - (remaining / totalTime);
    ring.style.strokeDashoffset = circumference * progress;

    if (remaining <= 3 && remaining > 0 && circuitState.phase !== 'prepare') {
      beep(660, 100);
    }

    if (remaining <= 0) {
      clearInterval(timerInterval);
      advancePhase();
      return;
    }

    circuitState.remaining--;
  }

  tick();
  timerInterval = setInterval(tick, 1000);
}

function advancePhase() {
  if (!circuitState) return;

  const { dayIdx, exercises, currentIdx, phase } = circuitState;

  if (phase === 'prepare') {
    beep(1000, 200);
    vibrate([100, 50, 100]);
    circuitState.phase = 'work';
    circuitState.remaining = WORK_TIME;
    circuitState.totalTime = WORK_TIME;
    runPhase();
  } else if (phase === 'work') {
    setCardioLog(dayIdx, currentIdx, true);
    updateCardioUI(dayIdx, currentIdx);
    beep(440, 300);
    vibrate([200, 100, 200]);

    if (currentIdx + 1 < exercises.length) {
      circuitState.phase = 'rest';
      circuitState.remaining = REST_TIME;
      circuitState.totalTime = REST_TIME;
      runPhase();
    } else {
      finishCircuit();
    }
  } else if (phase === 'rest') {
    circuitState.currentIdx++;
    circuitState.phase = 'work';
    circuitState.remaining = WORK_TIME;
    circuitState.totalTime = WORK_TIME;
    beep(1000, 200);
    vibrate([100, 50, 100]);
    runPhase();
  }
}

function togglePause() {
  if (!circuitState) return;
  circuitState.paused = !circuitState.paused;
  const btn = overlay.querySelector('.circuit-pause');
  btn.innerHTML = circuitState.paused
    ? '<i data-lucide="play" style="width:24px;height:24px;"></i>'
    : '<i data-lucide="pause" style="width:24px;height:24px;"></i>';
  refreshIcons();
}

function skipNext() {
  if (!circuitState) return;
  clearInterval(timerInterval);

  const { dayIdx, exercises, currentIdx, phase } = circuitState;

  if (phase === 'work') {
    setCardioLog(dayIdx, currentIdx, true);
    updateCardioUI(dayIdx, currentIdx);
  }

  if (currentIdx + 1 < exercises.length) {
    circuitState.currentIdx = phase === 'rest' ? currentIdx + 1 : currentIdx + 1;
    circuitState.phase = 'prepare';
    circuitState.remaining = PREPARE_TIME;
    circuitState.totalTime = PREPARE_TIME;
    runPhase();
  } else {
    finishCircuit();
  }
}

function skipPrev() {
  if (!circuitState) return;
  if (circuitState.currentIdx <= 0) return;
  clearInterval(timerInterval);

  circuitState.currentIdx--;
  circuitState.phase = 'prepare';
  circuitState.remaining = PREPARE_TIME;
  circuitState.totalTime = PREPARE_TIME;
  runPhase();
}

function finishCircuit() {
  const phaseEl = overlay.querySelector('.circuit-phase');
  const exerciseEl = overlay.querySelector('.circuit-exercise');
  const timeEl = overlay.querySelector('.circuit-time');
  const nextEl = overlay.querySelector('.circuit-next');

  overlay.dataset.phase = 'done';
  phaseEl.textContent = 'CIRCUIT COMPLETE';
  exerciseEl.textContent = '';
  timeEl.textContent = '';
  nextEl.textContent = '';

  const ring = overlay.querySelector('.circuit-ring-progress');
  ring.style.strokeDashoffset = 0;

  beep(1000, 100);
  setTimeout(() => beep(1200, 100), 150);
  setTimeout(() => beep(1400, 200), 300);
  vibrate([100, 80, 100, 80, 200]);

  setTimeout(() => stopCircuit(), 2500);
}

function stopCircuit() {
  clearInterval(timerInterval);
  timerInterval = null;
  circuitState = null;

  if (overlay) {
    overlay.classList.remove('visible');
    setTimeout(() => { overlay.remove(); overlay = null; }, 300);
  }

  import('../render/workout.js').then(m => m.renderPages());
}

function updateCardioUI(dayIdx, itemIdx) {
  const row = document.querySelector(`.cardio-row[data-day="${dayIdx}"][data-cardio-idx="${itemIdx}"]`);
  if (!row) return;
  row.classList.add('done');
  const check = row.querySelector('.set-check');
  if (check) check.classList.add('done');
  const section = row.closest('.cardio-section');
  if (section) {
    const day = PROGRAM[dayIdx];
    const allDone = day.cardio.every((_, i) => getCardioLog(dayIdx, i));
    section.classList.toggle('done', allDone);
  }
  refreshIcons();
}
