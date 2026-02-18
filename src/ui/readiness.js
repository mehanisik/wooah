import { state, getLog, getExtraSets, getEffectiveProgram } from '../state/store.js';
import { PROGRAM } from '../data/program.js';
import { getSessionNotes } from './session-notes.js';

const ENERGY_SCORES = { Low: 25, Normal: 50, High: 75, Peak: 100 };
const SLEEP_SCORES = { '<5h': 20, '5-6h': 40, '7-8h': 80, '8+h': 100 };
const MOOD_SCORES = { Rough: 25, Meh: 50, Good: 75, Great: 100 };
const SORENESS_SCORES = { 'Very Sore': 20, Moderate: 50, Mild: 80, None: 100 };

function getSubjectiveScore(dayIdx) {
  const notes = getSessionNotes(dayIdx);
  if (!notes.energy && !notes.sleep && !notes.mood && !notes.soreness) return null;

  const energy = ENERGY_SCORES[notes.energy] ?? 50;
  const sleep = SLEEP_SCORES[notes.sleep] ?? 50;
  const mood = MOOD_SCORES[notes.mood] ?? 50;
  const soreness = SORENESS_SCORES[notes.soreness] ?? 50;

  return energy * 0.25 + sleep * 0.25 + mood * 0.20 + soreness * 0.20;
}

function calcVolumeLoad(week, dayIdx) {
  let load = 0;
  const day = getEffectiveProgram(dayIdx);
  if (!day.exercises.length) return 0;

  day.exercises.forEach((ex, e) => {
    const totalSets = ex.sets + getExtraSets(dayIdx, e);
    for (let s = 0; s < totalSets; s++) {
      const log = state.logs[`w${week}-d${dayIdx}-e${e}-s${s}`];
      if (log?.done) {
        const w = parseFloat(log.weight) || 0;
        const r = parseInt(log.reps, 10) || 0;
        load += w * r;
      }
    }
  });
  return load;
}

function getWeeklyVolumeLoad(week) {
  let total = 0;
  for (let d = 0; d < 6; d++) total += calcVolumeLoad(week, d);
  return total;
}

function getACWR() {
  const currentWeek = state.currentWeek;
  const acute = getWeeklyVolumeLoad(currentWeek);
  if (acute === 0) return 1.0;

  let chronicTotal = 0;
  let chronicWeeks = 0;
  for (let w = currentWeek - 4; w < currentWeek; w++) {
    if (w < 1) continue;
    const wl = getWeeklyVolumeLoad(w);
    if (wl > 0) {
      chronicTotal += wl;
      chronicWeeks++;
    }
  }

  if (chronicWeeks === 0) return 1.0;
  const chronic = chronicTotal / chronicWeeks;
  return chronic > 0 ? acute / chronic : 1.0;
}

function getPerformanceScore() {
  const acwr = getACWR();
  if (acwr >= 0.8 && acwr <= 1.3) return 100;
  if (acwr < 0.8) return Math.max(0, 100 - (0.8 - acwr) * 200);
  return Math.max(0, 100 - (acwr - 1.3) * 150);
}

export function calcReadiness(dayIdx) {
  const subjective = getSubjectiveScore(dayIdx);
  if (subjective === null) return null;

  const performance = getPerformanceScore();
  return Math.round(subjective * 0.9 + performance * 0.1);
}

export function getReadinessZone(score) {
  if (score <= 40) return { zone: 'rest', label: 'Rest', color: 'red' };
  if (score <= 60) return { zone: 'light', label: 'Light day', color: 'yellow' };
  if (score <= 80) return { zone: 'normal', label: 'Train normally', color: 'green' };
  return { zone: 'push', label: 'Push hard', color: 'blue' };
}

export function renderReadinessBadge(dayIdx) {
  const score = calcReadiness(dayIdx);
  if (score === null) return '';
  const { zone, label } = getReadinessZone(score);
  return `<span class="readiness-badge ${zone}" title="${label}">${score}</span>`;
}
