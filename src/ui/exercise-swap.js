import { $ } from './helpers.js';
import { getExerciseSwap, setExerciseSwap, getEffectiveProgram } from '../state/store.js';
import { MUSCLE_MAP, MUSCLE_GROUPS } from '../data/muscles.js';
import { renderPages } from '../render/workout.js';
import { closeAllModals } from './events.js';
import { trapFocus, releaseFocus } from './focus-trap.js';

export function showSwapModal(dayIdx, exIdx) {
  closeAllModals();
  const ex = getEffectiveProgram(dayIdx).exercises[exIdx];
  if (!ex) return;

  const current = getExerciseSwap(dayIdx, exIdx) || ex.name;
  const existing = $('#swapModal');
  if (existing) existing.remove();

  const allExercises = Object.keys(MUSCLE_MAP);
  const grouped = {};
  for (const group of MUSCLE_GROUPS) grouped[group] = [];
  for (const name of allExercises) {
    const primary = MUSCLE_MAP[name].primary[0];
    if (primary && grouped[primary]) grouped[primary].push(name);
  }

  const modal = document.createElement('div');
  modal.className = 'uk-modal';
  modal.id = 'swapModal';
  modal.setAttribute('data-uk-modal', '');
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'swapTitle');

  function buildGroupedList(filter) {
    let html = '';
    for (const group of MUSCLE_GROUPS) {
      const exercises = grouped[group].filter((name) => !filter || name.toLowerCase().includes(filter));
      if (!exercises.length) continue;
      html += `<div class="picker-group-label">${group}</div>`;
      for (const name of exercises) {
        const isDefault = name === ex.name;
        const isCurrent = name === current;
        html += `<button class="uk-btn ${isCurrent ? 'uk-btn-primary' : 'uk-btn-default'} swap-option" data-swap="${name}" style="width:100%;margin-bottom:4px;font-size:0.82rem;letter-spacing:0.3px;text-align:left;justify-content:flex-start;">
          ${name}${isDefault ? ' (default)' : ''}
        </button>`;
      }
    }
    return html;
  }

  modal.innerHTML = `<div class="uk-modal-dialog" style="max-width:340px;">
    <div class="uk-modal-body">
      <h3 class="uk-modal-title" id="swapTitle">SWAP EXERCISE</h3>
      <p style="margin-bottom:12px;">Choose an alternative for this slot. PRs and history stay linked to the slot.</p>
      <input class="uk-input swap-search" type="text" placeholder="Search exercises..." aria-label="Search exercises">
      <div class="swap-options-list" style="max-height:50vh;overflow-y:auto;">${buildGroupedList('')}</div>
    </div>
    <div class="uk-modal-footer">
      <button class="uk-btn uk-btn-default" id="swapClose" aria-label="Close swap modal">Cancel</button>
    </div>
  </div>`;

  document.body.appendChild(modal);
  modal.classList.add('uk-open');
  trapFocus(modal);

  const searchInput = modal.querySelector('.swap-search');
  const optionsList = modal.querySelector('.swap-options-list');

  searchInput.addEventListener('input', () => {
    const filter = searchInput.value.trim().toLowerCase();
    optionsList.innerHTML = buildGroupedList(filter);
    attachOptionListeners();
  });

  function attachOptionListeners() {
    modal.querySelectorAll('.swap-option').forEach((btn) => {
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
  }
  attachOptionListeners();

  const close = () => {
    releaseFocus();
    modal.classList.remove('uk-open');
    setTimeout(() => modal.remove(), 300);
  };
  modal.querySelector('#swapClose').addEventListener('click', close);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });
}

export function getDisplayName(dayIdx, exIdx) {
  const swap = getExerciseSwap(dayIdx, exIdx);
  return swap || getEffectiveProgram(dayIdx).exercises[exIdx].name;
}
