import { $, $$ } from './helpers.js';
import { state, saveState } from '../state/store.js';
import { renderNav } from '../render/nav.js';
import { renderPages } from '../render/workout.js';
import { updateFinishBar } from './finish.js';
import { initSettingsHandlers } from '../sync/supabase.js';
import { trapFocus, releaseFocus } from './focus-trap.js';

export function closeAllModals() {
  $$('.uk-modal.uk-open').forEach((m) => {
    m.classList.remove('uk-open');
  });
  const celeb = $('.celebration-modal.uk-open');
  if (celeb) {
    celeb.classList.remove('uk-open');
    setTimeout(() => celeb.remove(), 300);
  }
  releaseFocus();
}

export function openModal(el) {
  closeAllModals();
  el.classList.add('uk-open');
  trapFocus(el);
}

export function initEvents() {
  // Stats button
  $('#statsBtn').addEventListener('click', () => {
    state.activeTab = 8;
    saveState();
    renderNav();
    renderPages();
    updateFinishBar();
  });

  // Prevent iOS rubber-band scrolling on fixed elements
  document.addEventListener(
    'touchmove',
    (e) => {
      if (e.target.closest('.uk-modal, .rest-timer-bar, .celebration-modal')) {
        e.preventDefault();
      }
    },
    { passive: false },
  );

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllModals();

    const nav = $('#nav');
    if (document.activeElement?.closest('.nav') && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
      e.preventDefault();
      const tabs = [...nav.querySelectorAll('.nav-tab')];
      const idx = tabs.indexOf(document.activeElement);
      if (idx === -1) return;
      const next = e.key === 'ArrowRight' ? (idx + 1) % tabs.length : (idx - 1 + tabs.length) % tabs.length;
      tabs[next].focus();
    }

    if (e.key === 'Enter' && document.activeElement?.classList.contains('exercise-top')) {
      document.activeElement.click();
    }

    if (e.key === 'Enter' && document.activeElement?.classList.contains('set-check')) {
      document.activeElement.click();
    }
  });

  initSettingsHandlers();
}
