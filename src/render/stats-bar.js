import { $ } from '../ui/helpers.js';
import { getStreak, getPRCount } from '../ui/helpers.js';
import { getCompletedThisWeek } from '../state/store.js';

export function renderStats() {
  const el = $('#statsBar');
  const completed = getCompletedThisWeek();
  const streak = getStreak();
  const prs = getPRCount();

  el.innerHTML = `
    <div class="stat-card">
      <div class="stat-value fire">${completed}<span style="font-size:0.8rem;color:var(--text-muted);">/6</span></div>
      <div class="stat-label">This Week</div>
    </div>
    <div class="stat-card">
      <div class="stat-value streak">${streak}</div>
      <div class="stat-label">Day Streak</div>
    </div>
    <div class="stat-card">
      <div class="stat-value prs">${prs}</div>
      <div class="stat-label">PRs Set</div>
    </div>
  `;
}
