import { state, historyKey, saveState } from '../state/store.js';
import { PROGRAM } from '../data/program.js';
import { getMesoConfig, getMesoWeek, isDeloadWeek } from './mesocycle.js';
import { getSessionNotes } from './session-notes.js';

function getRecentOneRMDrops() {
  if (!state.oneRmHistory) return 0;
  let drops = 0;
  Object.values(state.oneRmHistory).forEach(entries => {
    if (entries.length < 3) return;
    const recent = entries.slice(-3);
    const peak = Math.max(...recent.map(e => e.value));
    const latest = recent[recent.length - 1].value;
    if (latest < peak * 0.95) drops++;
  });
  return drops;
}

function getWeeksSinceDeload() {
  const cfg = getMesoConfig();
  if (!cfg.startWeek) return state.currentWeek;
  const week = getMesoWeek();
  if (week === null) return state.currentWeek;
  return week;
}

function getRecentFatigue() {
  let fatigueCount = 0;
  for (let offset = 0; offset < 3; offset++) {
    for (let d = 0; d < 6; d++) {
      const key = `w${state.currentWeek - offset}-d${d}`;
      const notes = state.sessionNotes?.[key];
      if (!notes) continue;
      if (notes.energy === 'Low' && notes.soreness === 'Very Sore') fatigueCount++;
    }
  }
  return fatigueCount;
}

export function checkDeloadSignals() {
  if (isDeloadWeek()) return null;
  if (state.deloadDismissed === state.currentWeek) return null;

  const oneRMDrops = getRecentOneRMDrops();
  const weeksSinceDeload = getWeeksSinceDeload();
  const fatigueCount = getRecentFatigue();

  if (oneRMDrops >= 2) {
    return { level: 'red', reason: `1RM dropped on ${oneRMDrops} exercises — performance declining` };
  }

  if (weeksSinceDeload >= 5) {
    return { level: 'yellow', reason: `${weeksSinceDeload} weeks without deload — proactive recovery suggested` };
  }

  if (fatigueCount >= 2) {
    return { level: 'yellow', reason: 'Multiple sessions with low energy + high soreness' };
  }

  return null;
}

export function renderDeloadBanner() {
  const signal = checkDeloadSignals();
  if (!signal) return '';

  return `<div class="deload-banner ${signal.level}">
    <div class="deload-banner-text">
      <i data-lucide="alert-triangle"></i>
      <span>${signal.reason}</span>
    </div>
    <div class="deload-banner-actions">
      <button class="uk-btn uk-btn-default deload-accept-btn" id="deloadAccept">DELOAD</button>
      <button class="uk-btn uk-btn-default deload-dismiss-btn" id="deloadDismiss">DISMISS</button>
    </div>
  </div>`;
}

export function attachDeloadListeners() {
  const acceptBtn = document.getElementById('deloadAccept');
  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      const cfg = getMesoConfig();
      cfg.startWeek = state.currentWeek - cfg.length;
      saveState();
      import('../render/workout.js').then(m => m.renderPages());
    });
  }
  const dismissBtn = document.getElementById('deloadDismiss');
  if (dismissBtn) {
    dismissBtn.addEventListener('click', () => {
      state.deloadDismissed = state.currentWeek;
      saveState();
      const banner = dismissBtn.closest('.deload-banner');
      if (banner) banner.remove();
    });
  }
}
