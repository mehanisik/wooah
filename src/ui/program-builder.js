import Sortable from 'sortablejs';
import { state, saveState, getEffectiveProgram } from '../state/store.js';
import { PROGRAM } from '../data/program.js';
import { MUSCLE_MAP, MUSCLE_GROUPS } from '../data/muscles.js';
import { $, $$ } from './helpers.js';
import { closeAllModals } from './events.js';
import { trapFocus, releaseFocus } from './focus-trap.js';
import { refreshIcons } from './icons.js';

let editMode = false;
let sortableInstance = null;

export function isEditMode() { return editMode; }

export function toggleEditMode(dayIdx) {
  editMode = !editMode;
  if (editMode) enterEditMode(dayIdx);
  else exitEditMode(dayIdx);
}

function buildOverrideFromCurrent(dayIdx) {
  const base = PROGRAM[dayIdx];
  const existing = state.programOverrides?.[dayIdx];
  if (existing) return [...existing];
  return base.exercises.map((_, i) => ({ originalIdx: i }));
}

function enterEditMode(dayIdx) {
  const container = $('.page.uk-active');
  if (!container) return;

  container.classList.add('edit-mode');
  const editBtn = $('#editModeToggle');
  if (editBtn) editBtn.classList.add('active');

  const cards = container.querySelectorAll('.exercise-card');
  cards.forEach(card => {
    const exIdx = parseInt(card.dataset.ex, 10);
    const day = getEffectiveProgram(dayIdx);
    const ex = day.exercises[exIdx];
    if (!ex) return;

    const handle = document.createElement('div');
    handle.className = 'edit-drag-handle';
    handle.innerHTML = '<i data-lucide="grip-vertical"></i>';
    card.prepend(handle);

    const controls = document.createElement('div');
    controls.className = 'edit-controls';
    controls.innerHTML = `
      <div class="edit-field">
        <label>Sets</label>
        <input class="uk-input edit-input" type="number" min="1" max="10" value="${ex.sets}" data-edit-field="sets" data-edit-day="${dayIdx}" data-edit-ex="${exIdx}">
      </div>
      <div class="edit-field">
        <label>Reps</label>
        <input class="uk-input edit-input" type="text" value="${ex.reps}" data-edit-field="reps" data-edit-day="${dayIdx}" data-edit-ex="${exIdx}">
      </div>
      <div class="edit-field">
        <label>Rest (s)</label>
        <input class="uk-input edit-input" type="number" min="0" max="600" step="15" value="${ex.rest}" data-edit-field="rest" data-edit-day="${dayIdx}" data-edit-ex="${exIdx}">
      </div>
      <button class="uk-btn uk-btn-destructive edit-remove-btn" data-remove-day="${dayIdx}" data-remove-ex="${exIdx}"><i data-lucide="x"></i></button>
    `;
    const logEl = card.querySelector('.exercise-log');
    if (logEl) logEl.before(controls);
    else card.appendChild(controls);
  });

  const addBtn = document.createElement('button');
  addBtn.className = 'uk-btn uk-btn-default edit-add-btn';
  addBtn.id = 'editAddExercise';
  addBtn.innerHTML = '<i data-lucide="plus"></i> ADD EXERCISE';
  addBtn.dataset.addDay = dayIdx;

  const resetBtn = document.createElement('button');
  resetBtn.className = 'uk-btn uk-btn-default edit-reset-btn';
  resetBtn.id = 'editResetDay';
  resetBtn.innerHTML = '<i data-lucide="rotate-ccw"></i> RESET TO DEFAULT';
  resetBtn.dataset.resetDay = dayIdx;

  const wrapper = document.createElement('div');
  wrapper.className = 'edit-action-buttons';
  wrapper.append(addBtn, resetBtn);

  const cardioSection = container.querySelector('.cardio-section');
  if (cardioSection) cardioSection.before(wrapper);
  else container.querySelector('.page.uk-active, .warmup-section')?.parentNode?.appendChild(wrapper) || container.appendChild(wrapper);

  refreshIcons();

  const exerciseList = container;
  const cardElements = [...container.querySelectorAll('.exercise-card')];
  if (cardElements.length > 1) {
    const parent = cardElements[0].parentNode;
    sortableInstance = new Sortable(parent, {
      animation: 150,
      handle: '.edit-drag-handle',
      draggable: '.exercise-card',
      delayOnTouchOnly: true,
      delay: 150,
      ghostClass: 'sortable-ghost',
      onEnd: (evt) => handleReorder(dayIdx, evt),
    });
  }
}

function exitEditMode(dayIdx) {
  editMode = false;
  const container = $('.page.uk-active');
  if (!container) return;

  container.classList.remove('edit-mode');
  const editBtn = $('#editModeToggle');
  if (editBtn) editBtn.classList.remove('active');

  container.querySelectorAll('.edit-drag-handle, .edit-controls, .edit-action-buttons').forEach(el => el.remove());

  if (sortableInstance) {
    sortableInstance.destroy();
    sortableInstance = null;
  }

  import('../render/workout.js').then(m => m.renderPages());
}

function handleReorder(dayIdx, evt) {
  const override = buildOverrideFromCurrent(dayIdx);
  const item = override.splice(evt.oldIndex, 1)[0];
  override.splice(evt.newIndex, 0, item);
  if (!state.programOverrides) state.programOverrides = {};
  state.programOverrides[dayIdx] = override;
  saveState();
}

function handleFieldEdit(dayIdx, exIdx, field, value) {
  const override = buildOverrideFromCurrent(dayIdx);
  if (!override[exIdx]) return;

  if (field === 'sets') override[exIdx].sets = parseInt(value, 10) || 3;
  else if (field === 'reps') override[exIdx].reps = value;
  else if (field === 'rest') override[exIdx].rest = parseInt(value, 10) || 90;

  if (!state.programOverrides) state.programOverrides = {};
  state.programOverrides[dayIdx] = override;
  saveState();
}

function handleRemove(dayIdx, exIdx) {
  const override = buildOverrideFromCurrent(dayIdx);
  override.splice(exIdx, 1);
  if (!state.programOverrides) state.programOverrides = {};
  state.programOverrides[dayIdx] = override;
  saveState();
  import('../render/workout.js').then(m => m.renderPages());
}

function handleReset(dayIdx) {
  if (!state.programOverrides) return;
  delete state.programOverrides[dayIdx];
  if (Object.keys(state.programOverrides).length === 0) delete state.programOverrides;
  saveState();
  editMode = false;
  import('../render/workout.js').then(m => m.renderPages());
}

function getAllExercises() {
  const exercises = new Map();
  Object.entries(MUSCLE_MAP).forEach(([name, muscles]) => {
    exercises.set(name, { name, primary: muscles.primary, secondary: muscles.secondary });
  });
  return exercises;
}

function showExercisePicker(dayIdx) {
  closeAllModals();
  const existing = $('#exercisePickerModal');
  if (existing) existing.remove();

  const allExercises = getAllExercises();
  const grouped = {};
  MUSCLE_GROUPS.forEach(g => { grouped[g] = []; });

  allExercises.forEach(ex => {
    ex.primary.forEach(g => {
      if (grouped[g]) grouped[g].push(ex.name);
    });
  });

  const modal = document.createElement('div');
  modal.className = 'uk-modal';
  modal.id = 'exercisePickerModal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');

  let content = `<div class="uk-modal-dialog">
    <div class="uk-modal-header"><div class="uk-modal-title">ADD EXERCISE</div></div>
    <div class="uk-modal-body">
      <input class="uk-input" type="text" id="exercisePickerSearch" placeholder="Search exercises...">
      <div class="exercise-picker-list" id="exercisePickerList">`;

  MUSCLE_GROUPS.forEach(group => {
    const items = grouped[group];
    if (!items || items.length === 0) return;
    content += `<div class="picker-group-label">${group}</div>`;
    items.forEach(name => {
      content += `<button class="uk-btn uk-btn-default picker-item" data-pick-name="${name}" data-pick-day="${dayIdx}">${name}</button>`;
    });
  });

  content += `</div></div>
    <div class="uk-modal-footer">
      <button class="uk-btn uk-btn-default" id="exercisePickerClose">CANCEL</button>
    </div>
  </div>`;

  modal.innerHTML = content;
  document.body.appendChild(modal);
  requestAnimationFrame(() => {
    modal.classList.add('uk-open');
    trapFocus(modal);
  });

  const searchInput = $('#exercisePickerSearch');
  searchInput?.addEventListener('input', () => {
    const q = searchInput.value.toLowerCase();
    modal.querySelectorAll('.picker-item').forEach(btn => {
      btn.style.display = btn.dataset.pickName.toLowerCase().includes(q) ? '' : 'none';
    });
    modal.querySelectorAll('.picker-group-label').forEach(label => {
      let next = label.nextElementSibling;
      let hasVisible = false;
      while (next && !next.classList.contains('picker-group-label')) {
        if (next.style.display !== 'none') hasVisible = true;
        next = next.nextElementSibling;
      }
      label.style.display = hasVisible ? '' : 'none';
    });
  });

  modal.addEventListener('click', (e) => {
    const pickBtn = e.target.closest('.picker-item');
    if (pickBtn) {
      const name = pickBtn.dataset.pickName;
      addCustomExercise(dayIdx, name);
      closePickerModal();
      return;
    }
    const closeBtn = e.target.closest('#exercisePickerClose');
    if (closeBtn || e.target === modal) {
      closePickerModal();
    }
  });

  searchInput?.focus();
}

function closePickerModal() {
  const modal = $('#exercisePickerModal');
  if (modal) {
    modal.classList.remove('uk-open');
    releaseFocus();
    setTimeout(() => modal.remove(), 200);
  }
}

function addCustomExercise(dayIdx, name) {
  const override = buildOverrideFromCurrent(dayIdx);
  override.push({
    custom: true,
    name,
    sets: 3,
    reps: '10-12',
    rest: 90,
    rir: '1-2',
    equipment: 'dumbbell',
  });
  if (!state.programOverrides) state.programOverrides = {};
  state.programOverrides[dayIdx] = override;
  saveState();
  editMode = true;
  import('../render/workout.js').then(m => m.renderPages());
}

export function renderEditToggle() {
  return `<button class="edit-mode-btn ${editMode ? 'active' : ''}" id="editModeToggle"><i data-lucide="settings-2"></i> EDIT</button>`;
}

export function attachEditListeners() {
  const pages = $('#pages');
  if (!pages) return;

  const editBtn = $('#editModeToggle');
  if (editBtn) {
    editBtn.addEventListener('click', () => {
      const dayIdx = state.activeTab;
      if (dayIdx < 0 || dayIdx > 5) return;
      toggleEditMode(dayIdx);
    });
  }

  pages.addEventListener('input', (e) => {
    const input = e.target.closest('.edit-input');
    if (!input) return;
    const dayIdx = parseInt(input.dataset.editDay, 10);
    const exIdx = parseInt(input.dataset.editEx, 10);
    const field = input.dataset.editField;
    handleFieldEdit(dayIdx, exIdx, field, input.value);
  });

  pages.addEventListener('click', (e) => {
    const removeBtn = e.target.closest('.edit-remove-btn');
    if (removeBtn) {
      e.stopPropagation();
      handleRemove(parseInt(removeBtn.dataset.removeDay, 10), parseInt(removeBtn.dataset.removeEx, 10));
      return;
    }

    const addBtn = e.target.closest('#editAddExercise');
    if (addBtn) {
      e.stopPropagation();
      showExercisePicker(parseInt(addBtn.dataset.addDay, 10));
      return;
    }

    const resetBtn = e.target.closest('#editResetDay');
    if (resetBtn) {
      e.stopPropagation();
      handleReset(parseInt(resetBtn.dataset.resetDay, 10));
      return;
    }
  });
}
