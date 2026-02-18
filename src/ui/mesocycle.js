import { state, saveState, debouncedSave } from '../state/store.js';

const DEFAULT_CONFIG = { length: 4, deloadLength: 1, startWeek: null, rampRate: 2 };

export function getMesoConfig() {
  if (!state.mesocycleConfig) state.mesocycleConfig = { ...DEFAULT_CONFIG };
  return state.mesocycleConfig;
}

export function getMesoWeek() {
  const cfg = getMesoConfig();
  if (!cfg.startWeek) return null;
  const cycleLen = cfg.length + cfg.deloadLength;
  const weeksSinceStart = state.currentWeek - cfg.startWeek;
  if (weeksSinceStart < 0) return null;
  return (weeksSinceStart % cycleLen) + 1;
}

export function isDeloadWeek() {
  const cfg = getMesoConfig();
  const week = getMesoWeek();
  if (week === null) return false;
  return week > cfg.length;
}

export function startMesocycle() {
  const cfg = getMesoConfig();
  cfg.startWeek = state.currentWeek;
  saveState();
}

export function getRIR() {
  const week = getMesoWeek();
  if (week === null) return null;
  if (isDeloadWeek()) return '3-4';
  if (week === 1) return '3';
  if (week === 2) return '2-3';
  if (week === 3) return '2';
  return '1';
}

export function getTargetVolume(baseVolume) {
  const cfg = getMesoConfig();
  const week = getMesoWeek();
  if (week === null) return baseVolume;
  if (isDeloadWeek()) return Math.round(baseVolume * 0.6);
  return baseVolume + (week - 1) * cfg.rampRate;
}

export function getMesoSuggestion(currentSets, targetSets) {
  const diff = targetSets - currentSets;
  if (diff > 0) return `Add ${diff} set${diff > 1 ? 's' : ''}`;
  if (diff < 0) return `Remove ${-diff} set${diff < -1 ? 's' : ''}`;
  return null;
}

export function renderMesoBanner() {
  const week = getMesoWeek();
  if (week === null) return '';
  const cfg = getMesoConfig();
  const cycleLen = cfg.length + cfg.deloadLength;
  const rir = getRIR();

  if (isDeloadWeek()) {
    return `<div class="meso-banner deload">
      <div class="meso-banner-title"><i data-lucide="battery-charging"></i> DELOAD WEEK</div>
      <div class="meso-banner-sub">Reduce volume to 60%, focus on recovery. RIR ${rir}</div>
    </div>`;
  }

  return `<div class="meso-banner">
    <div class="meso-banner-title"><i data-lucide="trending-up"></i> MESO WEEK ${week}/${cfg.length}</div>
    <div class="meso-banner-sub">Target RIR: ${rir} · Ramp +${cfg.rampRate} sets/muscle</div>
    <div class="meso-progress-track">
      <div class="meso-progress-fill" style="width:${(week / cycleLen) * 100}%"></div>
    </div>
  </div>`;
}

export function renderMesoSetup() {
  const cfg = getMesoConfig();
  if (cfg.startWeek) return '';

  return `<div class="meso-setup">
    <div class="meso-setup-title">MESOCYCLE</div>
    <div class="meso-setup-desc">Start a ${cfg.length}+${cfg.deloadLength} mesocycle for progressive overload</div>
    <button class="uk-btn uk-btn-default meso-start-btn" id="mesoStartBtn">START MESOCYCLE</button>
  </div>`;
}

export function attachMesoListeners() {
  const btn = document.getElementById('mesoStartBtn');
  if (btn) {
    btn.addEventListener('click', () => {
      startMesocycle();
      import('../render/workout.js').then(m => m.renderPages());
    });
  }
}
