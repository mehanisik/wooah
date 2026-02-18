import { getLastSession } from '../state/store.js';
import { calcPlates } from './plate-calc.js';

function roundTo2_5(n) {
  return Math.round(n / 2.5) * 2.5;
}

function detectBarWeight(exerciseName) {
  const name = exerciseName.toLowerCase();
  if (name.includes('curl') || name.includes('ez')) return 10;
  return 20;
}

export function generateWarmupSets(workingWeight, exerciseName) {
  if (!workingWeight || workingWeight <= 0) return [];
  const bar = detectBarWeight(exerciseName);
  const sets = [];

  if (workingWeight <= 60) {
    sets.push({ pct: 0, weight: bar, reps: 10 });
    sets.push({ pct: 60, weight: roundTo2_5(workingWeight * 0.6), reps: 8 });
  } else if (workingWeight <= 100) {
    sets.push({ pct: 0, weight: bar, reps: 10 });
    sets.push({ pct: 50, weight: roundTo2_5(workingWeight * 0.5), reps: 8 });
    sets.push({ pct: 75, weight: roundTo2_5(workingWeight * 0.75), reps: 5 });
  } else {
    sets.push({ pct: 0, weight: bar, reps: 10 });
    sets.push({ pct: 50, weight: roundTo2_5(workingWeight * 0.5), reps: 8 });
    sets.push({ pct: 65, weight: roundTo2_5(workingWeight * 0.65), reps: 5 });
    sets.push({ pct: 80, weight: roundTo2_5(workingWeight * 0.8), reps: 3 });
    if (workingWeight > 140) {
      sets.push({ pct: 90, weight: roundTo2_5(workingWeight * 0.9), reps: 1 });
    }
  }

  return sets.filter((s) => s.weight >= bar);
}

export function renderDynamicWarmup(dayIdx, exIdx, exerciseName) {
  const last = getLastSession(dayIdx, exIdx);
  if (!last || !last.sets.length) return '';

  const workingWeight = Math.max(...last.sets.map((s) => s.weight || 0));
  if (workingWeight <= 0) return '';

  const warmupSets = generateWarmupSets(workingWeight, exerciseName);
  if (warmupSets.length === 0) return '';

  let h = `<div class="warmup-calc">
    <div class="warmup-calc-title">DYNAMIC WARM-UP (based on ${workingWeight}kg)</div>
    <table class="warmup-table">
      <thead><tr><th>#</th><th>WEIGHT</th><th>REPS</th><th>%</th><th>PLATES</th></tr></thead>
      <tbody>`;

  warmupSets.forEach((s, i) => {
    const plates = calcPlates(s.weight, exerciseName);
    const plateStr = plates?.plates.length ? plates.plates.map((p) => p).join('+') : 'bar only';
    h += `<tr>
      <td>${i + 1}</td>
      <td>${s.weight}kg</td>
      <td>×${s.reps}</td>
      <td>${s.pct ? `${s.pct}%` : 'Bar'}</td>
      <td class="warmup-plates">${plateStr}</td>
    </tr>`;
  });

  h += `</tbody></table>
    <div class="warmup-calc-note">Rest 45s between warmup sets</div>
  </div>`;
  return h;
}
