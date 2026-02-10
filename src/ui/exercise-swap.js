import { $ } from './helpers.js';
import { getExerciseSwap, setExerciseSwap } from '../state/store.js';
import { PROGRAM } from '../data/program.js';
import { renderPages } from '../render/workout.js';
import { closeAllModals } from './events.js';
import { trapFocus, releaseFocus } from './focus-trap.js';

export function showSwapModal(dayIdx, exIdx) {
  closeAllModals();
  const ex = PROGRAM[dayIdx].exercises[exIdx];
  if (!ex || !ex.alternatives || ex.alternatives.length === 0) return;

  const current = getExerciseSwap(dayIdx, exIdx) || ex.name;
  let existing = $('#swapModal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.className = 'uk-modal';
  modal.id = 'swapModal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');

  const options = [ex.name, ...ex.alternatives];
  const optionsHtml = options.map(name =>
    `<button class="uk-btn ${name === current ? 'uk-btn-primary' : 'uk-btn-default'} swap-option" data-swap="${name}" style="width:100%;margin-bottom:6px;font-family:var(--font-body);font-size:0.85rem;letter-spacing:0.5px;">${name}${name === ex.name ? ' (default)' : ''}</button>`
  ).join('');

  modal.innerHTML = `<div class="uk-modal-dialog" style="max-width:340px;">
    <div class="uk-modal-body">
      <h3 class="uk-modal-title">SWAP EXERCISE</h3>
      <p style="margin-bottom:12px;">Choose an alternative for this slot. PRs and history stay linked to the slot.</p>
      ${optionsHtml}
    </div>
    <div class="uk-modal-footer">
      <button class="uk-btn uk-btn-default" id="swapClose" aria-label="Close swap modal">Cancel</button>
    </div>
  </div>`;

  document.body.appendChild(modal);
  modal.classList.add('uk-open');
  trapFocus(modal);

  modal.querySelectorAll('.swap-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.swap;
      if (name === ex.name) setExerciseSwap(dayIdx, exIdx, null);
      else setExerciseSwap(dayIdx, exIdx, name);
      releaseFocus();
      modal.classList.remove('uk-open');
      setTimeout(() => modal.remove(), 300);
      renderPages();
    });
  });

  const close = () => { releaseFocus(); modal.classList.remove('uk-open'); setTimeout(() => modal.remove(), 300); };
  modal.querySelector('#swapClose').addEventListener('click', close);
  modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
}

export function getDisplayName(dayIdx, exIdx) {
  const swap = getExerciseSwap(dayIdx, exIdx);
  return swap || PROGRAM[dayIdx].exercises[exIdx].name;
}
