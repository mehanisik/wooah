const FOCUSABLE =
  'button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

let _trapElement = null;
let _previousFocus = null;

function handleTrapKeydown(e) {
  if (e.key !== 'Tab' || !_trapElement) return;
  const focusable = [..._trapElement.querySelectorAll(FOCUSABLE)];
  if (focusable.length === 0) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

export function trapFocus(element) {
  _previousFocus = document.activeElement;
  _trapElement = element;
  document.addEventListener('keydown', handleTrapKeydown);
  const first = element.querySelector(FOCUSABLE);
  if (first) first.focus();
}

export function releaseFocus() {
  document.removeEventListener('keydown', handleTrapKeydown);
  _trapElement = null;
  if (_previousFocus?.focus) _previousFocus.focus();
  _previousFocus = null;
}
