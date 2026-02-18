import { $, $$, viewTransition, haptic } from './helpers.js';
import { state, saveState } from '../state/store.js';
import { renderNav } from '../render/nav.js';
import { renderPages } from '../render/workout.js';
import { updateFinishBar } from './finish.js';
import { initSettingsHandlers } from '../sync/supabase.js';
import { trapFocus, releaseFocus } from './focus-trap.js';

const MAX_TAB = 10;

function initSwipeGesture() {
  const pages = $('#pages');
  if (!pages) return;

  let startX = 0;
  let startY = 0;
  let tracking = false;

  pages.addEventListener(
    'touchstart',
    (e) => {
      if (e.target.closest('input, textarea, select, .uk-modal, .rest-timer-bar, .circuit-overlay, .celebration-modal'))
        return;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      tracking = true;
    },
    { passive: true },
  );

  pages.addEventListener(
    'touchmove',
    (e) => {
      if (!tracking) return;
      const dy = Math.abs(e.touches[0].clientY - startY);
      if (dy > 30) tracking = false;
    },
    { passive: true },
  );

  pages.addEventListener(
    'touchend',
    (e) => {
      if (!tracking) return;
      tracking = false;
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) < 60) return;

      const dir = dx < 0 ? 1 : -1;
      const next = state.activeTab + dir;
      if (next < 0 || next > MAX_TAB) return;

      haptic();
      state.activeTab = next;
      saveState();
      viewTransition(() => {
        renderNav();
        renderPages();
        updateFinishBar();
      });
    },
    { passive: true },
  );
}

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
  $('#statsBtn').addEventListener('click', () => {
    state.activeTab = 8;
    saveState();
    viewTransition(() => {
      renderNav();
      renderPages();
      updateFinishBar();
    });
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
  initSwipeGesture();
}
