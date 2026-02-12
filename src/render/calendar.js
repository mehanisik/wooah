import { state, historyKey } from '../state/store.js';
import { PROGRAM } from '../data/program.js';

export function renderCalendarPage() {
  const workoutDates = buildWorkoutMap();
  const { current, longest } = getStreaks(workoutDates);

  let h = '';
  h += `<div class="info-section">
    <div class="info-title">WORKOUT CALENDAR</div>
    <div style="display:flex;gap:12px;margin-bottom:16px;">
      <div class="stat-row" style="flex:1;"><span class="stat-row-label">Current Streak</span><span class="stat-row-value streak">${current}</span></div>
      <div class="stat-row" style="flex:1;"><span class="stat-row-label">Longest Streak</span><span class="stat-row-value up">${longest}</span></div>
    </div>
    <div class="calendar-legend">
      <span class="legend-item"><span class="legend-dot push"></span>Push</span>
      <span class="legend-item"><span class="legend-dot pull"></span>Pull</span>
      <span class="legend-item"><span class="legend-dot legs"></span>Legs</span>
      <span class="legend-item"><span class="legend-dot rest"></span>Rest</span>
    </div>
  </div>`;

  const months = getMonthsToShow(workoutDates);
  months.forEach(({ year, month }) => {
    h += renderMonth(year, month, workoutDates);
  });

  h += `<div id="calendarDetail"></div>`;

  return h;
}

function buildWorkoutMap() {
  const map = {};
  Object.entries(state.finishedDays).forEach(([key, timestamp]) => {
    const match = key.match(/^w(\d+)-d(\d+)$/);
    if (!match) return;
    const dayIdx = parseInt(match[2], 10);
    const day = PROGRAM[dayIdx];
    if (!day) return;
    const date = new Date(timestamp);
    const dateKey = date.toISOString().split('T')[0];
    const exData = [];
    day.exercises.forEach((ex, exIdx) => {
      const hKey = historyKey(dayIdx, exIdx);
      const hist = state.history[hKey];
      if (hist && hist.length > 0) {
        const latest = hist[hist.length - 1];
        const vol = latest.sets.reduce((a, s) => a + (s.weight || 0) * (s.reps || 0), 0);
        exData.push({ name: ex.name, vol, sets: latest.sets.length });
      }
    });
    const pr = PROGRAM[dayIdx].exercises.reduce((count, _, exIdx) => {
      const prKey = `d${dayIdx}-e${exIdx}`;
      return count + (state.personalRecords[prKey] ? 1 : 0);
    }, 0);
    map[dateKey] = { type: day.type, name: day.name, exercises: exData, prs: pr, timestamp };
  });
  return map;
}

function getStreaks(workoutDates) {
  const dates = Object.keys(workoutDates).sort();
  if (dates.length === 0) return { current: 0, longest: 0 };

  let longest = 1;
  let currentRun = 1;
  for (let i = 1; i < dates.length; i++) {
    const prev = new Date(dates[i - 1]);
    const curr = new Date(dates[i]);
    const diff = (curr - prev) / (1000 * 60 * 60 * 24);
    if (diff === 1) {
      currentRun++;
      longest = Math.max(longest, currentRun);
    } else {
      currentRun = 1;
    }
  }

  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  let current = 0;
  if (workoutDates[today] || workoutDates[yesterday]) {
    current = 1;
    let checkDate = workoutDates[today] ? today : yesterday;
    while (true) {
      const prev = new Date(new Date(checkDate).getTime() - 86400000).toISOString().split('T')[0];
      if (workoutDates[prev]) {
        current++;
        checkDate = prev;
      } else break;
    }
  }

  return { current, longest: Math.max(longest, current) };
}

function getMonthsToShow(_workoutDates) {
  const months = [];
  const now = new Date();
  for (let i = 2; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({ year: d.getFullYear(), month: d.getMonth() });
  }
  return months;
}

function renderMonth(year, month, workoutDates) {
  const monthName = new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const firstDay = new Date(year, month, 1).getDay();
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let h = `<div class="calendar-month">
    <div class="calendar-month-title">${monthName}</div>
    <div class="calendar-grid">
      <span class="calendar-weekday">M</span><span class="calendar-weekday">T</span><span class="calendar-weekday">W</span>
      <span class="calendar-weekday">T</span><span class="calendar-weekday">F</span><span class="calendar-weekday">S</span><span class="calendar-weekday">S</span>`;

  for (let i = 0; i < startOffset; i++) h += '<span class="calendar-cell empty"></span>';

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const workout = workoutDates[dateStr];
    const type = workout ? workout.type : '';
    const today = new Date().toISOString().split('T')[0] === dateStr ? ' today' : '';
    h += `<span class="calendar-cell ${type}${today}" data-date="${dateStr}">${d}</span>`;
  }

  h += `</div></div>`;
  return h;
}

export function renderCalendarDetail(dateStr, workoutDates) {
  const workout = workoutDates[dateStr];
  if (!workout) return `<div class="calendar-detail"><div class="no-data-msg">No workout on this day.</div></div>`;

  let h = `<div class="calendar-detail">
    <div class="calendar-detail-title">${workout.name} — ${dateStr}</div>`;

  if (workout.prs > 0) h += `<div class="calendar-detail-prs">${workout.prs} PR${workout.prs > 1 ? 's' : ''}</div>`;

  workout.exercises.forEach((ex) => {
    h += `<div class="stat-row"><span class="stat-row-label">${ex.name}</span><span class="stat-row-value">${ex.sets}s · ${ex.vol.toFixed(0)} vol</span></div>`;
  });

  h += `</div>`;
  return h;
}

export function attachCalendarListeners() {
  const workoutDates = buildWorkoutMap();
  document.querySelectorAll('.calendar-cell:not(.empty)').forEach((cell) => {
    cell.addEventListener('click', () => {
      const detail = document.querySelector('#calendarDetail');
      if (detail) detail.innerHTML = renderCalendarDetail(cell.dataset.date, workoutDates);
    });
  });
}
