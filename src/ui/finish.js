import { $, checkForPR, haptic } from './helpers.js';
import {
  state,
  saveState,
  isDayComplete,
  isDayFinished,
  finishedKey,
  historyKey,
  getLog,
  getWorkoutTimer,
  stopWorkoutTimer,
  getExtraSets,
} from '../state/store.js';
import { PROGRAM } from '../data/program.js';
import { showMotivationalModal } from '../render/celebration.js';
import { clearWorkoutClock } from '../timers/workout-clock.js';
import { updateOneRMAfterSet } from './one-rm.js';
import { syncToSupabase } from '../sync/supabase.js';
import { renderGreeting } from '../render/greeting.js';
import { renderStats } from '../render/stats-bar.js';
import { renderNav } from '../render/nav.js';
import { renderPages } from '../render/workout.js';

export function updateFinishBar() {
  const dayIdx = state.activeTab;
  if (dayIdx >= PROGRAM.length || PROGRAM[dayIdx].type === 'rest' || dayIdx >= 7) return;
  if (isDayFinished(dayIdx)) return;

  if (isDayComplete(dayIdx)) {
    finishWorkout();
  }
}

export async function finishWorkout() {
  const dayIdx = state.activeTab;
  if (!isDayComplete(dayIdx) || isDayFinished(dayIdx)) return;

  const day = PROGRAM[dayIdx];
  let newPRs = 0;

  day.exercises.forEach((ex, exIdx) => {
    const key = historyKey(dayIdx, exIdx);
    if (!state.history[key]) state.history[key] = [];

    const sets = [];
    const totalSets = ex.sets + getExtraSets(dayIdx, exIdx);
    for (let s = 0; s < totalSets; s++) {
      const log = getLog(dayIdx, exIdx, s);
      sets.push({ weight: parseFloat(log.weight) || 0, reps: parseInt(log.reps, 10) || 0 });
    }

    if (checkForPR(dayIdx, exIdx)) newPRs++;
    updateOneRMAfterSet(dayIdx, exIdx);

    state.history[key].push({ week: state.currentWeek, sets });
    if (state.history[key].length > 12) state.history[key] = state.history[key].slice(-12);
  });

  haptic(50);
  stopWorkoutTimer(dayIdx);
  clearWorkoutClock();
  state.finishedDays[finishedKey(dayIdx)] = Date.now();
  state.totalSessions++;
  saveState();

  syncToSupabase(dayIdx);

  const wTimer = getWorkoutTimer(dayIdx);
  const duration = wTimer?.duration ? wTimer.duration : 0;

  if (newPRs > 0) {
    const flash = $('#prFlash');
    flash.classList.add('show');
    setTimeout(() => flash.classList.remove('show'), 1500);
  }

  showMotivationalModal(day.name, newPRs, duration, state.currentWeek, dayIdx);

  renderGreeting();
  renderStats();
  renderNav();
  renderPages();
}
