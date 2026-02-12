import { state, saveState } from '../state/store.js';

export function renderBodyweightSection() {
  const entries = state.bodyweight || [];
  const latest = entries.length > 0 ? entries[entries.length - 1] : null;
  const first = entries.length > 0 ? entries[0] : null;
  const change = latest && first ? (latest.weight - first.weight).toFixed(1) : null;

  let h = `<div class="info-section">
    <div class="info-title">BODY WEIGHT</div>
    <div style="display:flex;gap:8px;margin-bottom:12px;align-items:flex-end;">
      <input class="uk-input set-input" id="bwInput" type="number" inputmode="decimal" step="0.1" min="30" max="300" placeholder="kg" style="width:100px;font-family:var(--font-mono);text-align:center;">
      <button class="uk-btn uk-btn-primary" id="bwSave" style="font-family:var(--font-display);letter-spacing:2px;">LOG</button>
    </div>`;

  if (latest) {
    h += `<div class="stat-row"><span class="stat-row-label">Current</span><span class="stat-row-value">${latest.weight} kg</span></div>`;
    if (change !== null && entries.length > 1) {
      const cls = parseFloat(change) > 0 ? 'up' : parseFloat(change) < 0 ? 'down' : '';
      h += `<div class="stat-row"><span class="stat-row-label">Change (from start)</span><span class="stat-row-value ${cls}">${parseFloat(change) > 0 ? '+' : ''}${change} kg</span></div>`;
    }
  }

  if (entries.length >= 2) {
    h += renderWeightChart(entries);
  }

  h += `</div>`;
  return h;
}

function renderWeightChart(entries) {
  const recent = entries.slice(-14);
  const weights = recent.map((e) => e.weight);
  const maxW = Math.max(...weights);
  const minW = Math.min(...weights);
  const range = maxW - minW || 1;

  let h = `<div class="chart-section" style="margin-top:12px;">
    <div class="chart-subtitle">Last ${recent.length} entries</div>
    <div class="chart-bars" style="height:100px;">`;

  recent.forEach((e) => {
    const pct = ((e.weight - minW) / range) * 80 + 15;
    h += `<div class="chart-bar-col">
      <div class="chart-bar-value">${e.weight}</div>
      <div class="chart-bar accent" style="height:${pct}%"></div>
      <div class="chart-bar-label">${e.date.slice(5)}</div>
    </div>`;
  });

  h += `</div></div>`;

  if (recent.length >= 7) {
    const last7 = recent.slice(-7).map((e) => e.weight);
    const avg = (last7.reduce((a, b) => a + b, 0) / last7.length).toFixed(1);
    h += `<div class="stat-row"><span class="stat-row-label">7-day Moving Avg</span><span class="stat-row-value">${avg} kg</span></div>`;
  }

  return h;
}

export function attachBodyweightListeners(onSave) {
  const input = document.querySelector('#bwInput');
  const btn = document.querySelector('#bwSave');
  if (!input || !btn) return;

  btn.addEventListener('click', () => {
    const val = parseFloat(input.value);
    if (Number.isNaN(val) || val < 30 || val > 300) return;
    const today = new Date().toISOString().split('T')[0];
    if (!state.bodyweight) state.bodyweight = [];
    const existing = state.bodyweight.findIndex((e) => e.date === today);
    if (existing >= 0) state.bodyweight[existing].weight = val;
    else state.bodyweight.push({ date: today, weight: val });
    saveState();
    input.value = '';
    if (onSave) onSave();
  });
}
