import { $ } from './helpers.js';

export function showToast(msg) {
  const toast = $('#toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}
