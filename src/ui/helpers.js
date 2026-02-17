import { state, getLog, getExtraSets } from '../state/store.js';
import { PROGRAM } from '../data/program.js';

export function $(sel) {
  return document.querySelector(sel);
}
export function $$(sel) {
  return document.querySelectorAll(sel);
}

export function parseRepRange(reps) {
  const clean = reps.replace(/[^0-9-]/g, '');
  const parts = clean.split('-').map(Number);
  return { low: parts[0] || 0, high: parts[parts.length - 1] || parts[0] || 0 };
}

export function getTodayDayIdx() {
  const jsDay = new Date().getDay();
  return jsDay === 0 ? 6 : jsDay - 1;
}

export function getWeekDates() {
  const today = new Date();
  const todayIdx = getTodayDayIdx();
  const monday = new Date(today);
  monday.setDate(today.getDate() - todayIdx);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d.getDate();
  });
}

export function getStreak() {
  let streak = 0;
  for (let w = state.currentWeek; w >= 1; w--) {
    for (let d = 5; d >= 0; d--) {
      if (state.finishedDays[`w${w}-d${d}`]) {
        streak++;
      } else if (streak > 0) {
        return streak;
      }
    }
  }
  return streak;
}

export function getPRCount() {
  return Object.keys(state.personalRecords).length;
}

export function checkForPR(dayIdx, exIdx) {
  const key = `d${dayIdx}-e${exIdx}`;
  const ex = PROGRAM[dayIdx].exercises[exIdx];
  if (!ex) return false;

  const totalSets = ex.sets + getExtraSets(dayIdx, exIdx);
  let bestVolume = 0;
  for (let s = 0; s < totalSets; s++) {
    const log = getLog(dayIdx, exIdx, s);
    const vol = Math.round((parseFloat(log.weight) || 0) * (parseInt(log.reps, 10) || 0) * 100) / 100;
    bestVolume = Math.max(bestVolume, vol);
  }

  const prev = state.personalRecords[key];
  bestVolume = Math.round(bestVolume * 100) / 100;
  if (bestVolume > 0 && (!prev || bestVolume > Math.round((prev.volume || 0) * 100) / 100)) {
    state.personalRecords[key] = {
      volume: bestVolume,
      date: new Date().toISOString().split('T')[0],
    };
    return true;
  }
  return false;
}

export function formatRest(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return m > 0 ? (s > 0 ? `${m}m ${s}s` : `${m} min`) : `${sec}s`;
}

export function formatDuration(totalSec) {
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function formatTimeShort(iso) {
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function haptic(ms = 10) {
  navigator.vibrate?.(ms);
}

export function viewTransition(callback) {
  if (document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.startViewTransition(callback);
  } else {
    callback();
  }
}
