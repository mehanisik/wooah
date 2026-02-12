import { $ } from '../ui/helpers.js';
import { formatDuration } from '../ui/helpers.js';
import { getWorkoutTimer } from '../state/store.js';

let workoutTimerInterval = null;

export function startWorkoutClock(dayIdx) {
  if (workoutTimerInterval) return;
  workoutTimerInterval = setInterval(() => {
    const display = $(`#workoutTimerDisplay-${dayIdx}`);
    if (!display) {
      clearInterval(workoutTimerInterval);
      return;
    }
    const timer = getWorkoutTimer(dayIdx);
    if (!timer || timer.finishedAt) {
      clearInterval(workoutTimerInterval);
      return;
    }
    const elapsed = Math.round((Date.now() - new Date(timer.startedAt).getTime()) / 1000);
    display.textContent = formatDuration(elapsed);
  }, 1000);
}

export function clearWorkoutClock() {
  clearInterval(workoutTimerInterval);
  workoutTimerInterval = null;
}
