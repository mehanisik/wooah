import { startRestTimer } from './rest-timer.js';
import { getEffectiveProgram } from '../state/store.js';

const TRANSITION_SEC = 15;
const REST_SEC = 90;

export function getSupersetPartner(dayIdx, exIdx) {
  const ex = getEffectiveProgram(dayIdx).exercises[exIdx];
  if (!ex || !ex.superset) return null;
  const partnerIdx = ex.superset - 1;
  const partner = getEffectiveProgram(dayIdx).exercises[partnerIdx];
  if (!partner || !partner.superset) return null;
  return partnerIdx;
}

export function isSupersetExercise(dayIdx, exIdx) {
  return getEffectiveProgram(dayIdx).exercises[exIdx]?.superset != null;
}

export function handleSupersetToggle(dayIdx, exIdx) {
  const partnerIdx = getSupersetPartner(dayIdx, exIdx);
  if (partnerIdx === null) return false;

  const partnerCard = document.querySelector(`.exercise-card[data-day="${dayIdx}"][data-ex="${partnerIdx}"]`);
  if (!partnerCard) return false;

  partnerCard.classList.add('superset-highlight');
  const badge = document.createElement('div');
  badge.className = 'superset-turn-badge';
  badge.textContent = 'YOUR TURN';
  const existingBadge = partnerCard.querySelector('.superset-turn-badge');
  if (!existingBadge) {
    partnerCard.querySelector('.exercise-top')?.appendChild(badge);
  }

  if (!partnerCard.classList.contains('open')) {
    partnerCard.classList.add('open');
    const top = partnerCard.querySelector('.exercise-top');
    if (top) top.setAttribute('aria-expanded', 'true');
  }

  const partnerName = getEffectiveProgram(dayIdx).exercises[partnerIdx].name;
  startRestTimer(TRANSITION_SEC, `→ ${partnerName}`);

  setTimeout(
    () => {
      partnerCard.classList.remove('superset-highlight');
      const b = partnerCard.querySelector('.superset-turn-badge');
      if (b) b.remove();
    },
    TRANSITION_SEC * 1000 + 2000,
  );

  return true;
}

export function startSupersetRest(dayIdx, exIdx) {
  const partnerIdx = getSupersetPartner(dayIdx, exIdx);
  if (partnerIdx === null) return;
  startRestTimer(REST_SEC, 'Superset Rest');
}
