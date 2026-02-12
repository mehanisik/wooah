import { $ } from '../ui/helpers.js';

let restTimerInterval = null;
let restTimerRemaining = 0;

export function startRestTimer(seconds, exerciseName) {
  clearInterval(restTimerInterval);
  restTimerRemaining = seconds;
  const bar = $('#restTimerBar');
  const display = $('#restTimerDisplay');
  const label = $('#restTimerLabel');

  bar.classList.add('visible');
  label.textContent = exerciseName || 'REST';
  display.className = 'rest-timer-display';

  function tick() {
    const m = Math.floor(restTimerRemaining / 60);
    const s = restTimerRemaining % 60;
    display.textContent = `${m}:${s.toString().padStart(2, '0')}`;

    if (restTimerRemaining <= 10 && restTimerRemaining > 0) {
      display.className = 'rest-timer-display warning';
    }

    if (restTimerRemaining <= 0) {
      display.className = 'rest-timer-display done';
      display.textContent = 'GO!';
      label.textContent = 'TIME TO LIFT';
      clearInterval(restTimerInterval);

      if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
      setTimeout(() => {
        bar.classList.remove('visible');
      }, 4000);
      return;
    }
    restTimerRemaining--;
  }

  tick();
  restTimerInterval = setInterval(tick, 1000);
}

export function initRestTimerClose() {
  $('#restTimerClose').addEventListener('click', () => {
    clearInterval(restTimerInterval);
    $('#restTimerBar').classList.remove('visible');
  });
}
