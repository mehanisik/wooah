const ICON_SIZE = 64;
const STROKE = 'var(--text-muted)';
const ACCENT = 'var(--brand)';

function wrap(svg, title, subtitle) {
  return `<div class="no-data-msg">
    <div class="empty-state-icon">${svg}</div>
    <strong>${title}</strong>${subtitle}
  </div>`;
}

export function emptyStats() {
  return wrap(
    `<svg width="${ICON_SIZE}" height="${ICON_SIZE}" viewBox="0 0 64 64" fill="none" stroke="${STROKE}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="10" y="38" width="8" height="16" rx="1" fill="${ACCENT}" opacity="0.15" stroke="${ACCENT}"/>
      <rect x="22" y="28" width="8" height="26" rx="1" fill="${ACCENT}" opacity="0.25" stroke="${ACCENT}"/>
      <rect x="34" y="18" width="8" height="36" rx="1" fill="${ACCENT}" opacity="0.35" stroke="${ACCENT}"/>
      <rect x="46" y="10" width="8" height="44" rx="1" fill="${ACCENT}" opacity="0.5" stroke="${ACCENT}"/>
      <line x1="6" y1="56" x2="58" y2="56"/>
    </svg>`,
    'NO DATA YET',
    'Finish your first workout to see stats here.<br>Every session builds your progress history.',
  );
}

export function emptyPhotos() {
  return wrap(
    `<svg width="${ICON_SIZE}" height="${ICON_SIZE}" viewBox="0 0 64 64" fill="none" stroke="${STROKE}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="14" width="48" height="36" rx="4" fill="${ACCENT}" opacity="0.1"/>
      <circle cx="24" cy="28" r="6" stroke="${ACCENT}"/>
      <path d="M8 42l12-10 8 6 12-14 16 18" stroke="${ACCENT}" opacity="0.5"/>
      <circle cx="44" cy="24" r="3" fill="${ACCENT}" opacity="0.3" stroke="none"/>
    </svg>`,
    'NO PHOTOS YET',
    'Take your first progress photo after a workout!',
  );
}

export function emptyExercise() {
  return wrap(
    `<svg width="${ICON_SIZE}" height="${ICON_SIZE}" viewBox="0 0 64 64" fill="none" stroke="${STROKE}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="12" y1="32" x2="52" y2="32"/>
      <rect x="16" y="22" width="6" height="20" rx="1.5" fill="${ACCENT}" opacity="0.2" stroke="${ACCENT}"/>
      <rect x="42" y="22" width="6" height="20" rx="1.5" fill="${ACCENT}" opacity="0.2" stroke="${ACCENT}"/>
      <rect x="8" y="26" width="4" height="12" rx="1" fill="${ACCENT}" opacity="0.35" stroke="${ACCENT}"/>
      <rect x="52" y="26" width="4" height="12" rx="1" fill="${ACCENT}" opacity="0.35" stroke="${ACCENT}"/>
    </svg>`,
    'NO HISTORY YET',
    'No history for this exercise yet.',
  );
}

export function emptyVolume() {
  return wrap(
    `<svg width="${ICON_SIZE}" height="${ICON_SIZE}" viewBox="0 0 64 64" fill="none" stroke="${STROKE}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="8,48 20,36 32,40 44,24 56,16" stroke="${ACCENT}" stroke-width="2"/>
      <circle cx="20" cy="36" r="2.5" fill="${ACCENT}" opacity="0.4"/>
      <circle cx="32" cy="40" r="2.5" fill="${ACCENT}" opacity="0.4"/>
      <circle cx="44" cy="24" r="2.5" fill="${ACCENT}" opacity="0.4"/>
      <circle cx="56" cy="16" r="2.5" fill="${ACCENT}" opacity="0.4"/>
      <line x1="8" y1="52" x2="58" y2="52"/>
    </svg>`,
    'NO VOLUME DATA',
    'Complete workouts to see volume trends.',
  );
}

export function emptyCalendar() {
  return `<div class="no-data-msg">No workout on this day.</div>`;
}

export function emptyCompare() {
  return `<div class="no-data-msg">Select exercises with 1RM history.</div>`;
}
