import { $, getPRCount, formatDuration } from '../ui/helpers.js';
import { state, historyKey, getEffectiveProgram } from '../state/store.js';
import { PROGRAM } from '../data/program.js';
import { renderBodyweightSection, attachBodyweightListeners } from './bodyweight.js';
import { renderOneRMStatsSection } from '../ui/one-rm.js';
import { MUSCLE_GROUPS, VOLUME_LANDMARKS, calcWeeklyVolume, calcDayVolume, getVolumeZone } from '../data/muscles.js';

export function renderStatsPage() {
  const allExercises = [];
  PROGRAM.forEach((_, dayIdx) => {
    const day = getEffectiveProgram(dayIdx);
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
  Object.values(state.history).forEach((sessions) => {
    sessions.forEach((sess) => {
      sess.sets.forEach((s) => {
        totalVolume += (s.weight || 0) * (s.reps || 0);
      });
    });
  });

  h += `<div class="info-section">
    <div class="info-title">YOUR JOURNEY</div>
    ${navigator.share ? '<button class="uk-btn uk-btn-default" id="shareStats" style="width:100%;margin-bottom:12px;display:flex;align-items:center;justify-content:center;gap:6px;"><i data-lucide="share-2" style="width:16px;height:16px;"></i> SHARE PROGRESS</button>' : ''}
    <div class="stat-row"><span class="stat-row-label">Total Sessions</span><span class="stat-row-value">${totalSessions}</span></div>
    <div class="stat-row"><span class="stat-row-label">Current Week</span><span class="stat-row-value">${totalWeeks}</span></div>
    <div class="stat-row"><span class="stat-row-label">Personal Records</span><span class="stat-row-value up">${totalPRs}</span></div>
    <div class="stat-row"><span class="stat-row-label">Total Volume Lifted</span><span class="stat-row-value">${totalVolume >= 1000 ? `${(totalVolume / 1000).toFixed(1)} t` : `${totalVolume.toFixed(0)} kg`}</span></div>
    <div class="stat-row"><span class="stat-row-label">Avg Workout Time</span><span class="stat-row-value">${(() => {
      const durations = Object.values(state.workoutTimers || {})
        .filter((t) => t.duration > 0)
        .map((t) => t.duration);
      if (durations.length === 0) return '—';
      const avg = Math.round(durations.reduce((a, b) => a + b, 0) / durations.length);
      return formatDuration(avg);
    })()}</span></div>
    <div class="stat-row"><span class="stat-row-label">Training Since</span><span class="stat-row-value">${state.startDate || '—'}</span></div>
  </div>`;

  h += renderMuscleVolumeSection();
  h += renderFrequencyHeatmap();
  h += renderBodyweightSection();
  h += renderOneRMStatsSection();

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

  h += renderExerciseComparison(allExercises);

  const prEntries = Object.entries(state.personalRecords);
  if (prEntries.length > 0) {
    h += `<div class="info-section">
      <div class="info-title">PERSONAL RECORDS</div>`;
    prEntries.forEach(([key, pr]) => {
      const parts = key.match(/d(\d+)-e(\d+)/);
      if (!parts) return;
      const dayIdx = parseInt(parts[1], 10);
      const exIdx = parseInt(parts[2], 10);
      const ex = getEffectiveProgram(dayIdx)?.exercises?.[exIdx];
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

function renderFrequencyHeatmap() {
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const dayVols = days.map((_, i) => calcDayVolume(i));
  const weeklyVol = calcWeeklyVolume(state.currentWeek);
  const hasData = Object.values(weeklyVol).some(v => v > 0);

  let h = `<div class="info-section">
    <div class="info-title">TRAINING FREQUENCY</div>
    <div class="chart-subtitle">Sets per muscle per day</div>
    <div class="heatmap-scroll"><table class="heatmap-table">
      <thead><tr><th></th>`;
  days.forEach(d => { h += `<th>${d}</th>`; });
  h += `<th>TOTAL</th></tr></thead><tbody>`;

  MUSCLE_GROUPS.forEach(group => {
    const lm = VOLUME_LANDMARKS[group];
    if (!lm) return;
    h += `<tr><td class="heatmap-label">${group}</td>`;
    days.forEach((_, di) => {
      const val = dayVols[di][group] || 0;
      const cls = val > 0 ? 'has-data' : '';
      h += `<td class="heatmap-cell ${cls}">${val || ''}</td>`;
    });
    const total = weeklyVol[group] || 0;
    const zone = getVolumeZone(total, lm.mev, lm.mav, lm.mrv);
    h += `<td class="heatmap-cell heatmap-total ${zone}">${total % 1 === 0 ? total : total.toFixed(1)}</td>`;
    h += `</tr>`;
  });

  h += `</tbody></table></div></div>`;
  return h;
}

function renderMuscleVolumeSection() {
  const vol = calcWeeklyVolume(state.currentWeek);
  const hasData = Object.values(vol).some(v => v > 0);
  if (!hasData) return '';

  let h = `<div class="info-section">
    <div class="info-title">WEEKLY MUSCLE VOLUME</div>
    <div class="chart-subtitle">Sets per muscle group (Week ${state.currentWeek})</div>
    <div class="volume-grid">`;

  MUSCLE_GROUPS.forEach(group => {
    const sets = vol[group] || 0;
    const lm = VOLUME_LANDMARKS[group];
    if (!lm) return;
    const zone = getVolumeZone(sets, lm.mev, lm.mav, lm.mrv);
    const pct = Math.min((sets / lm.mrv) * 100, 120);

    h += `<div class="volume-row">
      <span class="volume-label">${group}</span>
      <div class="volume-bar-track">
        <div class="volume-bar-fill ${zone}" style="width:${Math.max(pct, 2)}%"></div>
        <div class="volume-marker mev" style="left:${(lm.mev / lm.mrv) * 100}%"></div>
        <div class="volume-marker mav" style="left:${(lm.mav / lm.mrv) * 100}%"></div>
        <div class="volume-marker mrv" style="left:100%"></div>
      </div>
      <span class="volume-count ${zone}">${sets % 1 === 0 ? sets : sets.toFixed(1)}</span>
    </div>`;
  });

  h += `</div>
    <div class="volume-legend">
      <span class="volume-legend-item"><span class="volume-dot under"></span>Under MEV</span>
      <span class="volume-legend-item"><span class="volume-dot maintenance"></span>MEV-MAV</span>
      <span class="volume-legend-item"><span class="volume-dot optimal"></span>Optimal</span>
      <span class="volume-legend-item"><span class="volume-dot pushing"></span>Pushing</span>
      <span class="volume-legend-item"><span class="volume-dot over"></span>Over MRV</span>
    </div>
  </div>`;
  return h;
}

function renderExerciseComparison(allExercises) {
  const withOneRM = allExercises.filter(ex => {
    const h = state.oneRmHistory?.[ex.key];
    return h && h.length >= 2;
  });
  if (withOneRM.length < 2) return '';

  const opts = withOneRM.map(ex =>
    `<option value="${ex.key}">${ex.name}</option>`
  ).join('');

  return `<div class="chart-section">
    <div class="chart-title">EXERCISE COMPARISON</div>
    <div class="chart-subtitle">Compare estimated 1RM trends</div>
    <div class="compare-selects">
      <select class="uk-select exercise-select" id="compareA">${opts}</select>
      <span style="color:var(--text-muted);font-size:0.7rem;">vs</span>
      <select class="uk-select exercise-select" id="compareB">${withOneRM.length > 1 ? opts.replace('selected', '') : opts}</select>
    </div>
    <div class="compare-range-row">
      <button class="compare-range-btn active" data-range="all">ALL</button>
      <button class="compare-range-btn" data-range="6">6M</button>
      <button class="compare-range-btn" data-range="3">3M</button>
      <button class="compare-range-btn" data-range="1">1M</button>
    </div>
    <div id="compareChart"></div>
  </div>`;
}

export function renderCompareChart() {
  const selA = $('#compareA');
  const selB = $('#compareB');
  const container = $('#compareChart');
  if (!selA || !selB || !container) return;

  const keyA = selA.value;
  const keyB = selB.value;
  const histA = state.oneRmHistory?.[keyA] || [];
  const histB = state.oneRmHistory?.[keyB] || [];
  if (histA.length === 0 && histB.length === 0) {
    container.innerHTML = '<div class="no-data-msg">Select exercises with 1RM history.</div>';
    return;
  }

  const activeRange = document.querySelector('.compare-range-btn.active')?.dataset.range || 'all';
  const filterByRange = (entries) => {
    if (activeRange === 'all') return entries;
    const months = parseInt(activeRange, 10);
    const cutoff = new Date();
    cutoff.setMonth(cutoff.getMonth() - months);
    const cutoffStr = cutoff.toISOString().split('T')[0];
    return entries.filter(e => e.date >= cutoffStr);
  };

  const a = filterByRange(histA);
  const b = filterByRange(histB);
  const allWeeks = [...new Set([...a.map(e => e.week), ...b.map(e => e.week)])].sort((x, y) => x - y);
  const maxVal = Math.max(...a.map(e => e.value), ...b.map(e => e.value), 1);

  const aMap = Object.fromEntries(a.map(e => [e.week, e.value]));
  const bMap = Object.fromEntries(b.map(e => [e.week, e.value]));

  let h = '<div class="chart-bars compare-bars" style="height:100px;">';
  allWeeks.forEach(w => {
    const va = aMap[w] || 0;
    const vb = bMap[w] || 0;
    const pctA = (va / maxVal) * 100;
    const pctB = (vb / maxVal) * 100;
    h += `<div class="chart-bar-col">
      <div class="compare-bar-pair">
        ${va ? `<div class="chart-bar accent" style="height:${Math.max(pctA, 3)}%;flex:1;" title="${va}kg"></div>` : '<div style="flex:1;"></div>'}
        ${vb ? `<div class="chart-bar green" style="height:${Math.max(pctB, 3)}%;flex:1;" title="${vb}kg"></div>` : '<div style="flex:1;"></div>'}
      </div>
      <div class="chart-bar-label">W${w}</div>
    </div>`;
  });
  h += '</div>';
  h += `<div class="compare-legend">
    <span class="compare-legend-item"><span class="compare-dot accent"></span>${selA.options[selA.selectedIndex]?.text || 'A'}</span>
    <span class="compare-legend-item"><span class="compare-dot green"></span>${selB.options[selB.selectedIndex]?.text || 'B'}</span>
  </div>`;

  container.innerHTML = h;
}

export function renderProgressionChart(exerciseKey) {
  const container = $('#progressionChart');
  if (!container) return;
  const history = state.history[exerciseKey];
  if (!history || history.length === 0) {
    container.innerHTML = '<div class="no-data-msg">No history for this exercise yet.</div>';
    return;
  }

  const data = history.map((sess) => ({
    week: sess.week,
    maxWeight: Math.max(...sess.sets.map((s) => s.weight || 0)),
    totalVolume: sess.sets.reduce((a, s) => a + (s.weight || 0) * (s.reps || 0), 0),
    topSet: sess.sets.reduce(
      (best, s) => {
        const v = (s.weight || 0) * (s.reps || 0);
        return v > best.vol ? { w: s.weight, r: s.reps, vol: v } : best;
      },
      { w: 0, r: 0, vol: 0 },
    ),
  }));

  const maxW = Math.max(...data.map((d) => d.maxWeight));

  let h = '<div class="chart-bars">';
  data.forEach((d) => {
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
    sessions.forEach((sess) => {
      if (!weeklyVol[sess.week]) weeklyVol[sess.week] = { push: 0, pull: 0, legs: 0 };
      const parts = key.match(/d(\d+)/);
      if (!parts) return;
      const dayIdx = parseInt(parts[1], 10);
      const type = getEffectiveProgram(dayIdx)?.type || 'push';
      sess.sets.forEach((s) => {
        weeklyVol[sess.week][type] += (s.weight || 0) * (s.reps || 0);
      });
    });
  });

  const weeks = Object.keys(weeklyVol)
    .map(Number)
    .sort((a, b) => a - b)
    .slice(-8);
  if (weeks.length === 0) {
    container.innerHTML = '<div class="no-data-msg">Complete workouts to see volume trends.</div>';
    return;
  }

  const maxVol = Math.max(...weeks.map((w) => weeklyVol[w].push + weeklyVol[w].pull + weeklyVol[w].legs));

  let h = '<div class="chart-bars" style="height:140px;">';
  weeks.forEach((w) => {
    const total = weeklyVol[w].push + weeklyVol[w].pull + weeklyVol[w].legs;
    const pct = maxVol > 0 ? (total / maxVol) * 100 : 0;
    h += `<div class="chart-bar-col">
      <div class="chart-bar-value">${total >= 1000 ? `${(total / 1000).toFixed(0)}k` : total}</div>
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

  const compareA = $('#compareA');
  const compareB = $('#compareB');
  if (compareA && compareB) {
    if (compareB.options.length > 1) compareB.selectedIndex = 1;
    renderCompareChart();
    compareA.addEventListener('change', () => renderCompareChart());
    compareB.addEventListener('change', () => renderCompareChart());
    document.querySelectorAll('.compare-range-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.compare-range-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderCompareChart();
      });
    });
  }
  attachBodyweightListeners(() => {
    import('../render/workout.js').then((m) => m.renderPages());
  });

  const shareBtn = $('#shareStats');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      const sessions = state.totalSessions || 0;
      const prs = Object.keys(state.personalRecords).length;
      const text = `IRON PPL — Week ${state.currentWeek} · ${sessions} sessions · ${prs} PRs`;
      navigator.share({ title: 'IRON PPL', text, url: location.href }).catch(() => {});
    });
  }
}
