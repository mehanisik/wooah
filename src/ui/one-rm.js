import { state, saveState, getLog, historyKey, getEffectiveProgram } from '../state/store.js';

export function calcOneRM(weight, reps) {
  if (reps <= 0 || weight <= 0) return 0;
  if (reps === 1) return weight;
  return Math.round(weight * (1 + reps / 30) * 10) / 10;
}

export function updateOneRMAfterSet(dayIdx, exIdx) {
  const ex = getEffectiveProgram(dayIdx).exercises[exIdx];
  if (!ex || !ex.compound || !ex.amrap) return null;

  const amrapSetIdx = ex.sets - 1;
  const log = getLog(dayIdx, exIdx, amrapSetIdx);
  const w = parseFloat(log.weight) || 0;
  const r = parseInt(log.reps, 10) || 0;
  if (w <= 0 || r <= 0 || !log.done) return null;

  const oneRM = calcOneRM(w, r);
  const key = historyKey(dayIdx, exIdx);
  if (!state.oneRmHistory) state.oneRmHistory = {};
  if (!state.oneRmHistory[key]) state.oneRmHistory[key] = [];
  const today = new Date().toISOString().split('T')[0];
  const existing = state.oneRmHistory[key].findIndex((e) => e.date === today);
  if (existing >= 0) state.oneRmHistory[key][existing].value = oneRM;
  else state.oneRmHistory[key].push({ date: today, value: oneRM, week: state.currentWeek });
  if (state.oneRmHistory[key].length > 24) state.oneRmHistory[key] = state.oneRmHistory[key].slice(-24);
  saveState();

  return oneRM;
}

export function renderOneRMDisplay(dayIdx, exIdx) {
  const ex = getEffectiveProgram(dayIdx).exercises[exIdx];
  if (!ex || !ex.compound || !ex.amrap) return '';

  const amrapSetIdx = ex.sets - 1;
  const log = getLog(dayIdx, exIdx, amrapSetIdx);
  const w = parseFloat(log.weight) || 0;
  const r = parseInt(log.reps, 10) || 0;
  if (w <= 0 || r <= 0 || !log.done) return '';

  const oneRM = calcOneRM(w, r);
  return `<div class="one-rm-display">Est. 1RM: <strong>${oneRM} kg</strong></div>`;
}

export function renderOneRMStatsSection() {
  if (!state.oneRmHistory) return '';
  const entries = Object.entries(state.oneRmHistory).filter(([_, h]) => h.length > 0);
  if (entries.length === 0) return '';

  let h = `<div class="info-section">
    <div class="info-title">ESTIMATED 1RM</div>
    <div class="chart-subtitle">Epley formula: weight × (1 + reps/30)</div>`;

  entries.forEach(([key, history]) => {
    const match = key.match(/d(\d+)-e(\d+)/);
    if (!match) return;
    const dayIdx = parseInt(match[1], 10);
    const exIdx = parseInt(match[2], 10);
    const ex = getEffectiveProgram(dayIdx)?.exercises?.[exIdx];
    if (!ex) return;

    const latest = history[history.length - 1];
    const prev = history.length > 1 ? history[history.length - 2] : null;
    const diff = prev ? (latest.value - prev.value).toFixed(1) : null;

    h += `<div class="stat-row">
      <span class="stat-row-label">${ex.name}</span>
      <span class="stat-row-value">${latest.value} kg${diff !== null ? ` <span style="font-size:0.6rem;color:${parseFloat(diff) >= 0 ? 'var(--green)' : 'var(--brand)'};">${parseFloat(diff) >= 0 ? '+' : ''}${diff}</span>` : ''}</span>
    </div>`;
  });

  if (entries.some(([_, h]) => h.length >= 3)) {
    h += `<div class="chart-section" style="margin-top:12px;">
      <div class="chart-subtitle">1RM Progression</div>`;

    entries
      .filter(([_, h]) => h.length >= 3)
      .forEach(([key, history]) => {
        const match = key.match(/d(\d+)-e(\d+)/);
        if (!match) return;
        const ex = getEffectiveProgram(parseInt(match[1], 10))?.exercises?.[parseInt(match[2], 10)];
        if (!ex) return;

        const recent = history.slice(-8);
        const maxVal = Math.max(...recent.map((e) => e.value));

        h += `<div style="margin-bottom:8px;"><div class="chart-subtitle">${ex.name}</div>
        <div class="chart-bars" style="height:80px;">`;
        recent.forEach((e) => {
          const pct = maxVal > 0 ? (e.value / maxVal) * 100 : 0;
          h += `<div class="chart-bar-col">
          <div class="chart-bar-value">${e.value}</div>
          <div class="chart-bar accent" style="height:${Math.max(pct, 3)}%"></div>
          <div class="chart-bar-label">W${e.week}</div>
        </div>`;
        });
        h += `</div></div>`;
      });

    h += `</div>`;
  }

  h += `</div>`;
  return h;
}
