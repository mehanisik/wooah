import { state, saveState } from '../state/store.js';
import { $, haptic } from './helpers.js';
import { renderPages } from '../render/workout.js';
import { updateFinishBar } from './finish.js';

let _snapshot = null;
let _undoTimer = null;

export function captureSnapshot() {
  _snapshot = JSON.parse(JSON.stringify(state.logs));
}

export function showUndoToast() {
  clearTimeout(_undoTimer);
  let toast = $('#undoToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'undoToast';
    toast.className = 'toast undo-toast';
    toast.innerHTML = '<span>Change made</span><button class="undo-btn">UNDO</button>';
    document.body.appendChild(toast);
    toast.querySelector('.undo-btn').addEventListener('click', () => {
      haptic(20);
      if (_snapshot) {
        state.logs = _snapshot;
        saveState();
        renderPages();
        updateFinishBar();
        _snapshot = null;
      }
      toast.classList.remove('show');
    });
  }
  toast.classList.add('show');
  _undoTimer = setTimeout(() => {
    toast.classList.remove('show');
    _snapshot = null;
  }, 5000);
}
