import { getCompletedThisWeek } from '../state/store.js';
import { REST_QUOTES } from '../data/program.js';

const CHECKLIST = [
  { icon: 'moon', text: 'Sleep 7-9 hours' },
  { icon: 'beef', text: 'Hit protein target (1.6-2.2g/kg)' },
  { icon: 'droplets', text: 'Drink 3-4L water' },
  { icon: 'stretch-horizontal', text: 'Light stretching or walk' },
  { icon: 'pill', text: '5g creatine' },
];

function restIllustration() {
  return `<svg class="rest-illustration" width="80" height="80" viewBox="0 0 80 80" fill="none" stroke="var(--brand)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="40" cy="40" r="28" fill="var(--brand)" opacity="0.06" stroke="none"/>
    <circle cx="40" cy="40" r="18" fill="var(--brand)" opacity="0.1" stroke="none"/>
    <path d="M28 44c2-8 10-14 18-12s12 12 8 20" stroke="var(--brand)" opacity="0.4"/>
    <circle cx="36" cy="34" r="2" fill="var(--brand)" opacity="0.5" stroke="none"/>
    <circle cx="46" cy="36" r="1.5" fill="var(--brand)" opacity="0.35" stroke="none"/>
    <path d="M32 50l-6 6M48 50l6 6" stroke="var(--text-muted)" opacity="0.3"/>
    <path d="M26 26l-4-4M54 26l4-4M40 18v-6" stroke="var(--brand)" opacity="0.25"/>
  </svg>`;
}

export function renderRestDay() {
  const quote = REST_QUOTES[Math.floor(Math.random() * REST_QUOTES.length)];
  const completed = getCompletedThisWeek();

  const items = CHECKLIST.map((c) => `<li><i data-lucide="${c.icon}" class="rest-check-icon"></i> ${c.text}</li>`).join(
    '',
  );

  return `<div class="rest-page">
    ${restIllustration()}
    <div class="rest-title">REST DAY</div>
    <div class="rest-quote">"${quote}"</div>
    <div style="font-family:var(--font-mono);font-size:0.68rem;color:var(--text-muted);margin-bottom:16px;letter-spacing:1px;">${completed}/6 SESSIONS DONE THIS WEEK</div>
    <ul class="rest-checklist">${items}</ul>
  </div>`;
}
