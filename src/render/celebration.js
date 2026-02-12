import { $ } from '../ui/helpers.js';
import { formatDuration } from '../ui/helpers.js';
import { MOTIVATIONAL } from '../data/program.js';
import { refreshIcons } from '../ui/icons.js';
import { savePhoto } from '../ui/photo-store.js';
import { closeAllModals } from '../ui/events.js';
import { trapFocus, releaseFocus } from '../ui/focus-trap.js';

async function fetchMotivationalImage() {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const resp = await fetch('https://inspirobot.me/api?generate=true', { signal: controller.signal });
    clearTimeout(timeout);
    if (!resp.ok) throw new Error('API error');
    const imageUrl = (await resp.text()).trim();
    return { success: true, imageUrl };
  } catch {
    return { success: false, fallbackQuote: MOTIVATIONAL[Math.floor(Math.random() * MOTIVATIONAL.length)] };
  }
}

export function showMotivationalModal(dayName, newPRs, duration, week, dayIdx) {
  closeAllModals();
  const existing = $('#celebrationModal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.className = 'uk-modal celebration-modal';
  modal.id = 'celebrationModal';
  modal.setAttribute('data-uk-modal', '');
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'celebTitle');

  const statsHtml = [
    duration ? `<i data-lucide="timer"></i> ${formatDuration(duration)}` : '',
    newPRs > 0 ? `<span class="pr-count"><i data-lucide="trophy"></i> ${newPRs} PR${newPRs > 1 ? 's' : ''}</span>` : '',
  ]
    .filter(Boolean)
    .join('');

  modal.innerHTML = `<div class="celebration-content">
    <div class="celebration-header" id="celebTitle">${dayName} COMPLETE</div>
    ${statsHtml ? `<div class="celebration-stats">${statsHtml}</div>` : ''}
    <div class="image-skeleton" id="celebSkeleton"></div>
    <div class="photo-upload-section" id="photoSection">
      <input type="file" accept="image/*" capture="environment" id="photoInput" hidden>
      <button class="uk-btn uk-btn-default photo-upload-btn" id="photoBtn"><i data-lucide="camera"></i> PROGRESS PHOTO</button>
    </div>
    <button class="uk-btn uk-btn-primary celebration-btn" id="celebDismiss">CONTINUE</button>
  </div>`;

  document.body.appendChild(modal);
  requestAnimationFrame(() => {
    modal.classList.add('uk-open');
    refreshIcons();
    trapFocus(modal);
  });

  let autoDismiss = setTimeout(() => {
    releaseFocus();
    modal.classList.remove('uk-open');
    setTimeout(() => modal.remove(), 300);
  }, 10000);
  const dismiss = () => {
    clearTimeout(autoDismiss);
    releaseFocus();
    modal.classList.remove('uk-open');
    setTimeout(() => modal.remove(), 300);
  };
  modal.querySelector('#celebDismiss').addEventListener('click', dismiss);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) dismiss();
  });

  const photoBtn = modal.querySelector('#photoBtn');
  const photoInput = modal.querySelector('#photoInput');

  photoBtn.addEventListener('click', () => {
    clearTimeout(autoDismiss);
    photoInput.click();
  });

  photoInput.addEventListener('change', async () => {
    const file = photoInput.files[0];
    if (!file) return;

    const section = modal.querySelector('#photoSection');
    section.innerHTML = '<div class="photo-preview"><img></div>';
    const img = section.querySelector('img');
    img.src = URL.createObjectURL(file);

    try {
      await savePhoto(week, dayIdx, file);
    } catch {
      /* IndexedDB save failed silently */
    }

    autoDismiss = setTimeout(() => {
      modal.classList.remove('uk-open');
      setTimeout(() => modal.remove(), 300);
    }, 8000);
  });

  fetchMotivationalImage().then((result) => {
    const skeleton = modal.querySelector('#celebSkeleton');
    if (!skeleton) return;
    if (result.success) {
      const img = document.createElement('img');
      img.className = 'motivation-image';
      img.alt = 'Motivational image';
      img.onload = () => img.classList.add('loaded');
      img.onerror = () => {
        img.remove();
        const fallback = document.createElement('div');
        fallback.className = 'celebration-fallback';
        fallback.textContent = `"${MOTIVATIONAL[Math.floor(Math.random() * MOTIVATIONAL.length)]}"`;
        skeleton.replaceWith(fallback);
      };
      img.src = result.imageUrl;
      skeleton.replaceWith(img);
    } else {
      const fallback = document.createElement('div');
      fallback.className = 'celebration-fallback';
      fallback.textContent = `"${result.fallbackQuote}"`;
      skeleton.replaceWith(fallback);
    }
  });
}

export function loadRestDayImage() {
  const restPage = document.querySelector('.page.uk-active .rest-page');
  if (!restPage || restPage.querySelector('.rest-motivation-wrap')) return;

  const quote = restPage.querySelector('.rest-quote');
  if (!quote) return;

  const wrap = document.createElement('div');
  wrap.className = 'rest-motivation-wrap';
  wrap.innerHTML = '<div class="image-skeleton"></div>';
  quote.insertAdjacentElement('afterend', wrap);

  function load() {
    const skeleton = wrap.querySelector('.image-skeleton');
    if (!skeleton) {
      const oldImg = wrap.querySelector('.motivation-image');
      if (oldImg) {
        oldImg.classList.remove('loaded');
        const newSkeleton = document.createElement('div');
        newSkeleton.className = 'image-skeleton';
        oldImg.replaceWith(newSkeleton);
      }
    }

    fetchMotivationalImage().then((result) => {
      const target = wrap.querySelector('.image-skeleton') || wrap.querySelector('.motivation-image');
      if (!target) return;
      if (result.success) {
        const img = document.createElement('img');
        img.className = 'motivation-image';
        img.alt = 'Motivational image';
        img.onload = () => img.classList.add('loaded');
        img.onerror = () => img.remove();
        img.src = result.imageUrl;
        target.replaceWith(img);
      } else {
        target.remove();
      }
    });
  }

  load();

  const btn = document.createElement('button');
  btn.className = 'refresh-icon-btn';
  btn.innerHTML = '<i data-lucide="refresh-cw"></i> NEW IMAGE';
  refreshIcons();
  btn.addEventListener('click', () => {
    const oldImg = wrap.querySelector('.motivation-image');
    if (oldImg) {
      const skel = document.createElement('div');
      skel.className = 'image-skeleton';
      oldImg.replaceWith(skel);
    }
    load();
  });
  wrap.appendChild(btn);
}
