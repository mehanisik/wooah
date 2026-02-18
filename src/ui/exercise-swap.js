import { $ } from './helpers.js';
import { state, getExerciseSwap, setExerciseSwap, debouncedSave, getEffectiveProgram } from '../state/store.js';
import { getAltName, getAltEquipment, getEquipLabel } from '../data/program.js';
import { renderPages } from '../render/workout.js';
import { closeAllModals } from './events.js';
import { trapFocus, releaseFocus } from './focus-trap.js';

let gymBusy = false;
export function isGymBusy() {
  return gymBusy;
}
export function toggleGymBusy() {
  gymBusy = !gymBusy;
}

function getSwapFreq(dayIdx, exIdx, name) {
  if (!state.swapFrequency) return 0;
  return state.swapFrequency[`d${dayIdx}-e${exIdx}-${name}`] || 0;
}

function bumpSwapFreq(dayIdx, exIdx, name) {
  if (!state.swapFrequency) state.swapFrequency = {};
  const key = `d${dayIdx}-e${exIdx}-${name}`;
  state.swapFrequency[key] = (state.swapFrequency[key] || 0) + 1;
  debouncedSave();
}

const FILTER_CHIPS = [
  { key: 'all', label: 'ALL' },
  { key: 'barbell', label: 'BB' },
  { key: 'dumbbell', label: 'DB' },
  { key: 'machine', label: 'MACH' },
  { key: 'cable', label: 'CABLE' },
  { key: 'bodyweight', label: 'BW' },
];

export function showSwapModal(dayIdx, exIdx) {
  closeAllModals();
  const ex = getEffectiveProgram(dayIdx).exercises[exIdx];
  if (!ex || !ex.alternatives || ex.alternatives.length === 0) return;

  const current = getExerciseSwap(dayIdx, exIdx) || ex.name;
  const existing = $('#swapModal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.className = 'uk-modal';
  modal.id = 'swapModal';
  modal.setAttribute('data-uk-modal', '');
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'swapTitle');

  const options = [
    { name: ex.name, equipment: ex.equipment },
    ...ex.alternatives.map((a) => ({ name: getAltName(a), equipment: getAltEquipment(a) })),
  ];

  options.sort((a, b) => {
    if (a.name === ex.name) return -1;
    if (b.name === ex.name) return 1;
    return getSwapFreq(dayIdx, exIdx, b.name) - getSwapFreq(dayIdx, exIdx, a.name);
  });

  const mainEquipment = ex.equipment;

  const chipsHtml = FILTER_CHIPS.map(
    (c) =>
      `<button class="swap-filter-chip ${c.key === 'all' ? 'active' : ''}" data-filter="${c.key}">${c.label}</button>`,
  ).join('');

  function buildOptions(filter) {
    let filtered = options;
    if (gymBusy && filter === 'all') {
      filtered = options.filter((o) => o.name === ex.name || o.equipment !== mainEquipment);
    } else if (filter !== 'all') {
      filtered = options.filter((o) => o.equipment === filter || o.name === ex.name);
    }

    return filtered
      .map((o) => {
        const eqLabel = o.equipment ? getEquipLabel(o.equipment) : '';
        return `<button class="uk-btn ${o.name === current ? 'uk-btn-primary' : 'uk-btn-default'} swap-option" data-swap="${o.name}" style="width:100%;margin-bottom:6px;font-family:var(--font-body);font-size:0.85rem;letter-spacing:0.5px;display:flex;justify-content:space-between;align-items:center;">
        <span>${o.name}${o.name === ex.name ? ' (default)' : ''}</span>
        ${eqLabel ? `<span class="equip-badge">${eqLabel}</span>` : ''}
      </button>`;
      })
      .join('');
  }

  modal.innerHTML = `<div class="uk-modal-dialog" style="max-width:340px;">
    <div class="uk-modal-body">
      <h3 class="uk-modal-title" id="swapTitle">SWAP EXERCISE</h3>
      <p style="margin-bottom:12px;">Choose an alternative for this slot. PRs and history stay linked to the slot.</p>
      ${gymBusy ? '<div class="gym-busy-badge">GYM BUSY MODE</div>' : ''}
      <div class="swap-filter-row">${chipsHtml}</div>
      <div class="swap-options-list">${buildOptions('all')}</div>
    </div>
    <div class="uk-modal-footer">
      <button class="uk-btn uk-btn-default" id="swapClose" aria-label="Close swap modal">Cancel</button>
    </div>
  </div>`;

  document.body.appendChild(modal);
  modal.classList.add('uk-open');
  trapFocus(modal);

  modal.querySelectorAll('.swap-filter-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      modal.querySelectorAll('.swap-filter-chip').forEach((c) => {
        c.classList.remove('active');
      });
      chip.classList.add('active');
      modal.querySelector('.swap-options-list').innerHTML = buildOptions(chip.dataset.filter);
      attachOptionListeners();
    });
  });

  function attachOptionListeners() {
    modal.querySelectorAll('.swap-option').forEach((btn) => {
      btn.addEventListener('click', () => {
        const name = btn.dataset.swap;
        if (name === ex.name) setExerciseSwap(dayIdx, exIdx, null);
        else {
          setExerciseSwap(dayIdx, exIdx, name);
          bumpSwapFreq(dayIdx, exIdx, name);
        }
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
