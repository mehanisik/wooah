import { $ } from '../ui/helpers.js';
import { state } from '../state/store.js';
import { PROGRAM } from '../data/program.js';
import { getAllPhotos, savePhoto, deletePhoto } from '../ui/photo-store.js';
import { refreshIcons } from '../ui/icons.js';
import { showToast } from '../ui/toast.js';

const DAY_NAMES = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export function renderPhotosPage() {
  return `<div class="info-section">
    <div class="info-title">PROGRESS PHOTOS</div>
    <div class="chart-subtitle">Track your transformation week by week</div>
    <div id="photoGallery" class="photo-gallery"><div class="no-data-msg">Loading photos...</div></div>
  </div>`;
}

export async function attachPhotosListeners() {
  await loadGallery();
}

async function loadGallery() {
  const container = $('#photoGallery');
  if (!container) return;

  const photos = await getAllPhotos();

  if (photos.length === 0) {
    container.innerHTML = `<div class="no-data-msg">No photos yet.<br>Take your first progress photo after a workout!</div>`;
    return;
  }

  const groups = {};
  photos.forEach((p) => {
    const gKey = `w${p.week}-d${p.dayIdx}`;
    if (!groups[gKey]) groups[gKey] = { week: p.week, dayIdx: p.dayIdx, photos: [] };
    groups[gKey].photos.push(p);
  });

  const sorted = Object.values(groups).sort((a, b) => {
    if (b.week !== a.week) return b.week - a.week;
    return b.dayIdx - a.dayIdx;
  });

  let h = '';
  sorted.forEach((group) => {
    const dayName = DAY_NAMES[group.dayIdx] || '';
    const workout = PROGRAM[group.dayIdx];
    const workoutName = workout ? workout.name : '';
    const oldest = group.photos[group.photos.length - 1];
    const date = new Date(oldest.timestamp);
    const dateStr = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

    h += `<div class="photo-session">
      <div class="photo-session-header">
        <div class="photo-session-title">
          <span class="photo-session-week">WEEK ${group.week}</span>
          <span class="photo-session-day">${dayName} — ${workoutName}</span>
        </div>
        <span class="photo-session-date">${dateStr}</span>
      </div>
      <div class="photo-session-strip">`;

    group.photos.forEach((p) => {
      const url = p.url || URL.createObjectURL(p.blob);
      h += `<div class="photo-thumb" data-photo-key="${p.key}">
        <img src="${url}" alt="W${p.week} ${dayName}" loading="lazy">
        <button class="photo-delete-btn" data-delete-key="${p.key}" aria-label="Delete photo"><i data-lucide="trash-2" style="width:12px;height:12px;"></i></button>
      </div>`;
    });

    h += `<label class="photo-add-thumb">
        <input type="file" accept="image/*" capture="environment" hidden data-add-week="${group.week}" data-add-day="${group.dayIdx}">
        <i data-lucide="plus" style="width:24px;height:24px;"></i>
      </label>
    </div></div>`;
  });

  h += `<div class="photo-new-session">
    <input type="file" accept="image/*" capture="environment" id="newSessionPhoto" hidden>
    <button class="uk-btn uk-btn-primary" id="newSessionBtn" style="width:100%;"><i data-lucide="camera"></i> NEW PHOTO</button>
  </div>`;

  container.innerHTML = h;
  refreshIcons();
  attachGalleryEvents(container);
}

function attachGalleryEvents(container) {
  container.querySelectorAll('.photo-delete-btn').forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      await deletePhoto(btn.dataset.deleteKey);
      showToast('Photo deleted');
      await loadGallery();
    });
  });

  container.querySelectorAll('.photo-thumb').forEach((thumb) => {
    thumb.addEventListener('click', (e) => {
      if (e.target.closest('.photo-delete-btn')) return;
      const img = thumb.querySelector('img');
      if (img) showFullscreen(img.src, img.alt);
    });
  });

  container.querySelectorAll('.photo-add-thumb input').forEach((input) => {
    input.addEventListener('change', async () => {
      const file = input.files[0];
      if (!file) return;
      const week = parseInt(input.dataset.addWeek, 10);
      const day = parseInt(input.dataset.addDay, 10);
      await savePhoto(week, day, file);
      showToast('Photo saved');
      await loadGallery();
    });
  });

  const newBtn = container.querySelector('#newSessionBtn');
  const newInput = container.querySelector('#newSessionPhoto');
  if (newBtn && newInput) {
    newBtn.addEventListener('click', () => newInput.click());
    newInput.addEventListener('change', async () => {
      const file = newInput.files[0];
      if (!file) return;
      const dayIdx = state.activeTab <= 6 ? state.activeTab : getTodayDay();
      await savePhoto(state.currentWeek, dayIdx, file);
      showToast('Photo saved');
      await loadGallery();
    });
  }
}

function getTodayDay() {
  const d = new Date().getDay();
  return d === 0 ? 6 : d - 1;
}

function showFullscreen(src, label) {
  const overlay = document.createElement('div');
  overlay.className = 'photo-fullscreen';
  overlay.innerHTML = `
    <img src="${src}" alt="${label}">
    <div class="photo-fullscreen-label">${label}</div>
    <button class="photo-fullscreen-close"><i data-lucide="x" style="width:24px;height:24px;"></i></button>
  `;
  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('visible'));
  refreshIcons();

  const close = () => {
    overlay.classList.remove('visible');
    setTimeout(() => overlay.remove(), 300);
  };
  overlay.querySelector('.photo-fullscreen-close').addEventListener('click', close);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });
}
