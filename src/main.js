import '@fontsource/bebas-neue';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/600.css';
import '@fontsource/jetbrains-mono/700.css';
import '@fontsource/barlow-condensed/300.css';
import '@fontsource/barlow-condensed/400.css';
import '@fontsource/barlow-condensed/500.css';
import '@fontsource/barlow-condensed/600.css';
import '@fontsource/barlow-condensed/700.css';
import './styles/main.css';
import { state, loadState } from './state/store.js';
import { getTodayDayIdx } from './ui/helpers.js';
import { renderGreeting } from './render/greeting.js';
import { renderStats } from './render/stats-bar.js';
import { renderNav } from './render/nav.js';
import { renderPages } from './render/workout.js';
import { updateFinishBar } from './ui/finish.js';
import { initEvents } from './ui/events.js';
import { initRestTimerClose } from './timers/rest-timer.js';
import { initNeon } from './sync/neon.js';
import { initWakeLock } from './ui/wake-lock.js';
import { refreshIcons } from './ui/icons.js';

loadState();
state.activeTab = getTodayDayIdx();
renderGreeting();
renderStats();
renderNav();
renderPages();
updateFinishBar();
initEvents();
initRestTimerClose();
initNeon();
initWakeLock();
refreshIcons();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(() => {});
}
