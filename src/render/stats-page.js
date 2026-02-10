import { $, getPRCount, formatDuration } from '../ui/helpers.js';
import { state, historyKey } from '../state/store.js';
import { PROGRAM } from '../data/program.js';

export function renderStatsPage() {
  const allExercises = [];
  PROGRAM.forEach((day, dayIdx) => {
    if (day.type === 'rest') return;
    day.exercises.forEach((ex, exIdx) => {
      const key = historyKey(dayIdx, exIdx);
      const h = state.history[key];
      if (h && h.length > 0) {
        allExercises.push({ name: ex.name, dayIdx, exIdx, key, type: day.type });
      }
    });
  });

  if (allExercises.length === 0) {
    return `<div class="no-data-msg"><strong>NO DATA YET</strong>Finish your first workout to see stats here.<br>Every session you complete builds your progress history.</div>`;
  }

  let h = '';

  const totalSessions = state.totalSessions || 0;
  const totalPRs = getPRCount();
  const totalWeeks = state.currentWeek;
  let totalVolume = 0;
  Object.values(state.history).forEach(sessions => {
    sessions.forEach(sess => {
      sess.sets.forEach(s => { totalVolume += (s.weight || 0) * (s.reps || 0); });
    });
  });

  h += `<div class="info-section">
    <div class="info-title">YOUR JOURNEY</div>
    <div class="stat-row"><span class="stat-row-label">Total Sessions</span><span class="stat-row-value">${totalSessions}</span></div>
    <div class="stat-row"><span class="stat-row-label">Current Week</span><span class="stat-row-value">${totalWeeks}</span></div>
    <div class="stat-row"><span class="stat-row-label">Personal Records</span><span class="stat-row-value up">${totalPRs}</span></div>
    <div class="stat-row"><span class="stat-row-label">Total Volume Lifted</span><span class="stat-row-value">${totalVolume >= 1000 ? (totalVolume / 1000).toFixed(1) + ' t' : totalVolume.toFixed(0) + ' kg'}</span></div>
    <div class="stat-row"><span class="stat-row-label">Avg Workout Time</span><span class="stat-row-value">${(() => {
      const durations = Object.values(state.workoutTimers || {}).filter(t => t.duration > 0).map(t => t.duration);
      if (durations.length === 0) return '—';
      const avg = Math.round(durations.reduce((a, b) => a + b, 0) / durations.length);
      return formatDuration(avg);
    })()}</span></div>
    <div class="stat-row"><span class="stat-row-label">Training Since</span><span class="stat-row-value">${state.startDate || '—'}</span></div>
  </div>`;

  h += `<div class="chart-section">
    <div class="chart-title">WEIGHT PROGRESSION</div>
    <div class="chart-subtitle">Select exercise to view history</div>
    <select class="uk-select exercise-select" id="statsExerciseSelect">`;
  allExercises.forEach((ex, i) => {
    h += `<option value="${ex.key}" ${i === 0 ? 'selected' : ''}>${ex.name}</option>`;
  });
  h += `</select>
    <div id="progressionChart"></div>
  </div>`;

  h += `<div class="chart-section">
    <div class="chart-title">WEEKLY VOLUME</div>
    <div class="chart-subtitle">Total weight × reps per week</div>
    <div id="volumeChart"></div>
  </div>`;

  const prEntries = Object.entries(state.personalRecords);
  if (prEntries.length > 0) {
    h += `<div class="info-section">
      <div class="info-title">PERSONAL RECORDS</div>`;
    prEntries.forEach(([key, pr]) => {
      const parts = key.match(/d(\d+)-e(\d+)/);
      if (!parts) return;
      const dayIdx = parseInt(parts[1]);
      const exIdx = parseInt(parts[2]);
      const ex = PROGRAM[dayIdx]?.exercises?.[exIdx];
      if (!ex) return;
      h += `<div class="stat-row">
        <span class="stat-row-label">${ex.name}</span>
        <span class="stat-row-value up">${pr.volume.toFixed(0)} vol · ${pr.date}</span>
      </div>`;
    });
    h += `</div>`;
  }

  return h;
}

export function renderProgressionChart(exerciseKey) {
  const container = $('#progressionChart');
  if (!container) return;
  const history = state.history[exerciseKey];
  if (!history || history.length === 0) {
    container.innerHTML = '<div class="no-data-msg">No history for this exercise yet.</div>';
    return;
  }

  const data = history.map(sess => ({
    week: sess.week,
    maxWeight: Math.max(...sess.sets.map(s => s.weight || 0)),
    totalVolume: sess.sets.reduce((a, s) => a + (s.weight || 0) * (s.reps || 0), 0),
    topSet: sess.sets.reduce((best, s) => {
      const v = (s.weight || 0) * (s.reps || 0);
      return v > best.vol ? { w: s.weight, r: s.reps, vol: v } : best;
    }, { w: 0, r: 0, vol: 0 })
  }));

  const maxW = Math.max(...data.map(d => d.maxWeight));

  let h = '<div class="chart-bars">';
  data.forEach(d => {
    const pct = maxW > 0 ? (d.maxWeight / maxW) * 100 : 0;
    h += `<div class="chart-bar-col">
      <div class="chart-bar-value">${d.maxWeight}</div>
      <div class="chart-bar accent" style="height:${Math.max(pct, 3)}%"></div>
      <div class="chart-bar-label">W${d.week}</div>
    </div>`;
  });
  h += '</div>';

  const latest = data[data.length - 1];
  const prev = data.length > 1 ? data[data.length - 2] : null;
  const diff = prev ? latest.maxWeight - prev.maxWeight : 0;

  h += `<div style="margin-top:12px;">
    <div class="stat-row"><span class="stat-row-label">Latest Max</span><span class="stat-row-value">${latest.maxWeight} kg</span></div>
    <div class="stat-row"><span class="stat-row-label">Best Set</span><span class="stat-row-value">${latest.topSet.w}kg × ${latest.topSet.r}</span></div>`;
  if (prev) {
    h += `<div class="stat-row"><span class="stat-row-label">Change</span><span class="stat-row-value ${diff > 0 ? 'up' : diff < 0 ? 'down' : ''}">${diff > 0 ? '+' : ''}${diff} kg</span></div>`;
  }
  h += `</div>`;

  container.innerHTML = h;
}

export function renderVolumeChart() {
  const container = $('#volumeChart');
  if (!container) return;

  const weeklyVol = {};
  Object.entries(state.history).forEach(([key, sessions]) => {
    sessions.forEach(sess => {
      if (!weeklyVol[sess.week]) weeklyVol[sess.week] = { push: 0, pull: 0, legs: 0 };
      const parts = key.match(/d(\d+)/);
      if (!parts) return;
      const dayIdx = parseInt(parts[1]);
      const type = PROGRAM[dayIdx]?.type || 'push';
      sess.sets.forEach(s => { weeklyVol[sess.week][type] += (s.weight || 0) * (s.reps || 0); });
    });
  });

  const weeks = Object.keys(weeklyVol).map(Number).sort((a, b) => a - b).slice(-8);
  if (weeks.length === 0) {
    container.innerHTML = '<div class="no-data-msg">Complete workouts to see volume trends.</div>';
    return;
  }

  const maxVol = Math.max(...weeks.map(w => weeklyVol[w].push + weeklyVol[w].pull + weeklyVol[w].legs));

  let h = '<div class="chart-bars" style="height:140px;">';
  weeks.forEach(w => {
    const total = weeklyVol[w].push + weeklyVol[w].pull + weeklyVol[w].legs;
    const pct = maxVol > 0 ? (total / maxVol) * 100 : 0;
    h += `<div class="chart-bar-col">
      <div class="chart-bar-value">${total >= 1000 ? (total / 1000).toFixed(0) + 'k' : total}</div>
      <div class="chart-bar green" style="height:${Math.max(pct, 3)}%"></div>
      <div class="chart-bar-label">W${w}</div>
    </div>`;
  });
  h += '</div>';

  const latestWeek = weeks[weeks.length - 1];
  const lv = weeklyVol[latestWeek];
  h += `<div style="margin-top:12px;">
    <div class="stat-row"><span class="stat-row-label">Push Volume</span><span class="stat-row-value" style="color:var(--push-color);">${lv.push.toFixed(0)} kg</span></div>
    <div class="stat-row"><span class="stat-row-label">Pull Volume</span><span class="stat-row-value" style="color:var(--pull-color);">${lv.pull.toFixed(0)} kg</span></div>
    <div class="stat-row"><span class="stat-row-label">Legs Volume</span><span class="stat-row-value" style="color:var(--legs-color);">${lv.legs.toFixed(0)} kg</span></div>
  </div>`;

  container.innerHTML = h;
}

export function attachStatsListeners() {
  const sel = $('#statsExerciseSelect');
  if (sel) {
    renderProgressionChart(sel.value);
    renderVolumeChart();
    sel.addEventListener('change', () => renderProgressionChart(sel.value));
  }
}
