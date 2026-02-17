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
import { registerSW } from 'virtual:pwa-register';
import { state, loadState } from './state/store.js';
import { getTodayDayIdx } from './ui/helpers.js';
import { renderGreeting } from './render/greeting.js';
import { renderStats } from './render/stats-bar.js';
import { renderNav } from './render/nav.js';
import { renderPages } from './render/workout.js';
import { updateFinishBar } from './ui/finish.js';
import { initEvents } from './ui/events.js';
import { initRestTimerClose } from './timers/rest-timer.js';
import { initSupabase, initLoginHandlers } from './sync/supabase.js';
import { initWakeLock } from './ui/wake-lock.js';
import { refreshIcons } from './ui/icons.js';

try {
  loadState();
  state.activeTab = getTodayDayIdx();
  renderGreeting();
  renderStats();
  renderNav();
  renderPages();
  updateFinishBar();
  initEvents();
  initRestTimerClose();
} catch (err) {
  console.error('[IRON PPL] Pre-auth init failed:', err);
}
initLoginHandlers();
window.addEventListener('ironppl:synced', () => {
  renderGreeting();
  renderStats();
  renderNav();
  renderPages();
  updateFinishBar();
  refreshIcons();
});
await initSupabase();
initWakeLock();
refreshIcons();

const updateSW = registerSW({
  onNeedRefresh() {
    const toast = document.getElementById('toast');
    toast.innerHTML =
      'Update available <button id="swReload" style="margin-left:8px;padding:2px 10px;border-radius:4px;background:var(--brand);color:#151716;font-weight:700;border:none;cursor:pointer;">RELOAD</button>';
    toast.classList.add('show');
    document.getElementById('swReload').addEventListener('click', () => updateSW(true));
  },
});

setInterval(() => updateSW(), 60 * 60 * 1000);
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') updateSW();
});
