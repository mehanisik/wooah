import { PROGRAM } from '../data/program.js';

export let state = {
  currentWeek: 1,
  activeTab: -1,
  logs: {},
  history: {},
  finishedDays: {},
  totalSessions: 0,
  personalRecords: {},
  startDate: null,
  workoutTimers: {},
  extraSets: {},
};

export function loadState() {
  try {
    const saved = localStorage.getItem('ironppl_state_v2');
    if (saved) {
      const parsed = JSON.parse(saved);
      Object.assign(state, parsed);
    }
  } catch(e) {}
  if (!state.startDate) {
    state.startDate = new Date().toISOString().split('T')[0];
    saveState();
  }
}

export function saveState() {
  try { localStorage.setItem('ironppl_state_v2', JSON.stringify(state)); } catch(e) {}
}

export function logKey(dayIdx, exIdx, setIdx) { return `w${state.currentWeek}-d${dayIdx}-e${exIdx}-s${setIdx}`; }
export function historyKey(dayIdx, exIdx) { return `d${dayIdx}-e${exIdx}`; }
export function finishedKey(dayIdx) { return `w${state.currentWeek}-d${dayIdx}`; }

export function getLog(dayIdx, exIdx, setIdx) {
  return state.logs[logKey(dayIdx, exIdx, setIdx)] || { weight: '', reps: '', done: false };
}

export function setLog(dayIdx, exIdx, setIdx, data) {
  state.logs[logKey(dayIdx, exIdx, setIdx)] = data;
  saveState();
}

export function getHistory(dayIdx, exIdx) { return state.history[historyKey(dayIdx, exIdx)] || []; }

export function getLastSession(dayIdx, exIdx) {
  const h = getHistory(dayIdx, exIdx);
  return h.length > 0 ? h[h.length - 1] : null;
}

export function isDayComplete(dayIdx) {
  const day = PROGRAM[dayIdx];
  if (!day.exercises.length) return false;
  for (let e = 0; e < day.exercises.length; e++) {
    const totalSets = day.exercises[e].sets + getExtraSets(dayIdx, e);
    for (let s = 0; s < totalSets; s++) {
      if (!getLog(dayIdx, e, s).done) return false;
    }
  }
  return true;
}

export function isDayFinished(dayIdx) {
  return !!state.finishedDays[finishedKey(dayIdx)];
}

export function getCompletedThisWeek() {
  let count = 0;
  for (let d = 0; d < 6; d++) {
    if (isDayFinished(d)) count++;
  }
  return count;
}

export function timerKey(dayIdx) { return `w${state.currentWeek}-d${dayIdx}`; }

export function getWorkoutTimer(dayIdx) {
  return state.workoutTimers[timerKey(dayIdx)] || null;
}

export function startWorkoutTimer(dayIdx) {
  const key = timerKey(dayIdx);
  if (state.workoutTimers[key]) return;
  state.workoutTimers[key] = { startedAt: new Date().toISOString(), finishedAt: null, duration: 0 };
  saveState();
}

function extraSetsKey(dayIdx, exIdx) { return `w${state.currentWeek}-d${dayIdx}-e${exIdx}`; }
export function getExtraSets(dayIdx, exIdx) { return state.extraSets[extraSetsKey(dayIdx, exIdx)] || 0; }
export function addExtraSet(dayIdx, exIdx) {
  const key = extraSetsKey(dayIdx, exIdx);
  state.extraSets[key] = (state.extraSets[key] || 0) + 1;
  saveState();
}

export function stopWorkoutTimer(dayIdx) {
  const key = timerKey(dayIdx);
  const timer = state.workoutTimers[key];
  if (!timer || timer.finishedAt) return;
  timer.finishedAt = new Date().toISOString();
  timer.duration = Math.round((new Date(timer.finishedAt) - new Date(timer.startedAt)) / 1000);
  saveState();
}
