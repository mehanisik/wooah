import { state } from '../state/store.js';

let wakeLock = null;

export async function requestWakeLock() {
  try {
    if ('wakeLock' in navigator) {
      wakeLock = await navigator.wakeLock.request('screen');
      wakeLock.addEventListener('release', () => { wakeLock = null; });
    }
  } catch {}
}

export function initWakeLock() {
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && state.activeTab >= 0 && state.activeTab <= 5) {
      requestWakeLock();
    }
  });
  if (state.activeTab >= 0 && state.activeTab <= 5) requestWakeLock();
}
