import { $ } from '../ui/helpers.js';
import { getTodayDayIdx } from '../ui/helpers.js';
import { getCompletedThisWeek, isDayFinished } from '../state/store.js';
import { PROGRAM, MOTIVATIONAL } from '../data/program.js';

export function renderGreeting() {
  const el = $('#greeting');
  const hour = new Date().getHours();
  const todayIdx = getTodayDayIdx();
  const todayWorkout = PROGRAM[todayIdx];
  const completedThisWeek = getCompletedThisWeek();

  let timeGreeting;
  if (hour < 6) timeGreeting = 'LATE NIGHT GRIND';
  else if (hour < 12) timeGreeting = 'GOOD MORNING';
  else if (hour < 17) timeGreeting = 'GOOD AFTERNOON';
  else if (hour < 21) timeGreeting = 'EVENING SESSION';
  else timeGreeting = 'LATE NIGHT GRIND';

  const dateStr = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  const quote = MOTIVATIONAL[Math.floor(Math.random() * MOTIVATIONAL.length)];

  let todayMsg;
  if (todayWorkout.type === 'rest') {
    todayMsg = `Rest day. <em>${completedThisWeek}/6</em> sessions done this week.`;
  } else if (isDayFinished(todayIdx)) {
    todayMsg = `Today's <em>${todayWorkout.name}</em> is done. <em>${completedThisWeek}/6</em> this week.`;
  } else {
    todayMsg = `Today: <em>${todayWorkout.name}</em> — ${todayWorkout.focus}`;
  }

  el.innerHTML = `
    <div class="greeting-text">${timeGreeting} — ${dateStr}</div>
    <div class="greeting-sub">${todayMsg}</div>
    <div class="greeting-sub" style="margin-top:4px;font-style:italic;color:var(--text-muted);font-size:0.75rem;">"${quote}"</div>
  `;
}
