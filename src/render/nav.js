import { $, getTodayDayIdx, getWeekDates } from '../ui/helpers.js';
import { state, saveState, isDayFinished } from '../state/store.js';
import { PROGRAM } from '../data/program.js';
import { renderPages } from './workout.js';
import { updateFinishBar } from '../ui/finish.js';
import { refreshIcons } from '../ui/icons.js';

export function renderNav() {
  const nav = $('#nav');
  const todayIdx = getTodayDayIdx();
  const dates = getWeekDates();
  const tabs = PROGRAM.map((d, i) => {
    const isToday = i === todayIdx;
    const done = isDayFinished(i);
    const typeAttr = d.type;
    const classes = ['nav-tab'];
    if (i === state.activeTab) classes.push('uk-active');
    if (isToday) classes.push('today');
    const doneDot = done ? '<span class="done-dot"></span>' : '';
    return `<button class="${classes.join(' ')}" data-idx="${i}" data-type="${typeAttr}" role="tab" aria-selected="${i === state.activeTab}">${d.day}<span class="nav-date">${dates[i]}</span>${doneDot}</button>`;
  });
  tabs.push(
    `<button class="nav-tab ${state.activeTab === 7 ? 'uk-active' : ''}" data-idx="7" data-type="info" role="tab" aria-selected="${state.activeTab === 7}">INFO</button>`,
  );
  tabs.push(
    `<button class="nav-tab ${state.activeTab === 8 ? 'uk-active' : ''}" data-idx="8" data-type="info" role="tab" aria-selected="${state.activeTab === 8}">STATS</button>`,
  );
  tabs.push(
    `<button class="nav-tab ${state.activeTab === 9 ? 'uk-active' : ''}" data-idx="9" data-type="info" role="tab" aria-selected="${state.activeTab === 9}">CALENDAR</button>`,
  );
  tabs.push(
    `<button class="nav-tab ${state.activeTab === 10 ? 'uk-active' : ''}" data-idx="10" data-type="info" role="tab" aria-selected="${state.activeTab === 10}">PHOTOS</button>`,
  );
  nav.innerHTML = tabs.join('');
  refreshIcons();

  nav.querySelectorAll('.nav-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      state.activeTab = parseInt(tab.dataset.idx, 10);
      saveState();
      renderNav();
      renderPages();
      updateFinishBar();
    });
  });
}
