import { state, debouncedSave } from '../state/store.js';

const DEFAULT_PLATES = [25, 20, 15, 10, 5, 2.5, 1.25];

const PLATE_COLORS = {
  25: '#c0392b',
  20: '#2980b9',
  15: '#f1c40f',
  10: '#27ae60',
  5: '#ecf0f1',
  2.5: '#2c3e50',
  1.25: '#95a5a6',
};

export function getPlateSettings() {
  if (!state.plateSettings) {
    state.plateSettings = { barWeight: 20, unit: 'kg', plates: [...DEFAULT_PLATES] };
  }
  return state.plateSettings;
}

export function setBarWeight(weight) {
  getPlateSettings().barWeight = weight;
  debouncedSave();
}

function detectBarWeight(exerciseName) {
  const name = exerciseName.toLowerCase();
  if (name.includes('curl') || name.includes('ez')) return 10;
  return getPlateSettings().barWeight;
}

function isBarbell(exerciseName) {
  const name = exerciseName.toLowerCase();
  const barbellTerms = [
    'barbell',
    'bench press',
    'squat',
    'deadlift',
    'ohp',
    'row',
    'hip thrust',
    'front squat',
    'rdl',
    'romanian',
    'good morning',
    'rack pull',
    'floor press',
    'sumo',
    'deficit',
    'block pull',
    'pendlay',
    'curl (ez',
  ];
  return barbellTerms.some((t) => name.includes(t));
}

export function calcPlates(targetWeight, exerciseName) {
  if (!targetWeight || targetWeight <= 0) return null;
  const barWeight = detectBarWeight(exerciseName);
  if (targetWeight <= barWeight) return { barWeight, plates: [], remainder: 0 };

  const perSide = (targetWeight - barWeight) / 2;
  const available = getPlateSettings()
    .plates.slice()
    .sort((a, b) => b - a);
  const plates = [];
  let remaining = perSide;

  for (const plate of available) {
    const count = Math.floor(remaining / plate);
    for (let i = 0; i < count; i++) plates.push(plate);
    remaining -= plate * count;
    remaining = Math.round(remaining * 100) / 100;
  }

  return { barWeight, plates, remainder: remaining };
}

export function renderPlateBreakdown(weight, exerciseName) {
  if (!weight || !isBarbell(exerciseName)) return '';
  const result = calcPlates(parseFloat(weight), exerciseName);
  if (!result || result.plates.length === 0) return '';

  let h = '<div class="plate-breakdown">';
  const grouped = {};
  result.plates.forEach((p) => {
    grouped[p] = (grouped[p] || 0) + 1;
  });

  Object.entries(grouped)
    .sort((a, b) => b[0] - a[0])
    .forEach(([plate, count]) => {
      const color = PLATE_COLORS[plate] || '#666';
      const label = count > 1 ? `${count}×${plate}` : plate;
      h += `<span class="plate-pill" style="background:${color};color:${parseFloat(plate) === 5 ? '#333' : '#fff'}">${label}</span>`;
    });

  h += `<span class="plate-info">per side</span>`;
  if (result.remainder > 0) h += `<span class="plate-info warn">+${result.remainder}kg unmatched</span>`;
  h += '</div>';
  return h;
}
