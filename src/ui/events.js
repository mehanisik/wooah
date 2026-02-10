import { $ } from './helpers.js';
import { state, saveState } from '../state/store.js';
import { renderStats } from '../render/stats-bar.js';
import { renderNav } from '../render/nav.js';
import { renderPages } from '../render/workout.js';
import { updateFinishBar, finishWorkout } from './finish.js';
import { initSettingsHandlers } from '../sync/neon.js';

export function initEvents() {
  $('#weekPrev').addEventListener('click', () => {
    if (state.currentWeek > 1) {
      state.currentWeek--;
      saveState();
      updateWeekDisplay();
      renderStats();
      renderNav();
      renderPages();
      updateFinishBar();
    }
  });

  $('#weekNext').addEventListener('click', () => {
    state.currentWeek++;
    saveState();
    updateWeekDisplay();
    renderStats();
    renderNav();
    renderPages();
    updateFinishBar();
  });

  $('#finishBtn').addEventListener('click', finishWorkout);

  // Stats button
  $('#statsBtn').addEventListener('click', () => {
    state.activeTab = 8;
    saveState();
    renderNav();
    renderPages();
    updateFinishBar();
  });

  // Prevent iOS rubber-band scrolling on fixed elements
  document.addEventListener('touchmove', function(e) {
    if (e.target.closest('.uk-modal, .rest-timer-bar, .celebration-modal')) {
      e.preventDefault();
    }
  }, { passive: false });

  // Settings handlers
  initSettingsHandlers();
}

export function updateWeekDisplay() {
  $('#weekNum').textContent = `WEEK ${state.currentWeek}`;
}
