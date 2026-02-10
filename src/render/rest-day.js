import { getCompletedThisWeek } from '../state/store.js';
import { REST_QUOTES } from '../data/program.js';

export function renderRestDay() {
  const quote = REST_QUOTES[Math.floor(Math.random() * REST_QUOTES.length)];
  const completed = getCompletedThisWeek();
  return `<div class="rest-page">
    <div class="rest-icon"><i data-lucide="dumbbell"></i></div>
    <div class="rest-title">REST DAY</div>
    <div class="rest-quote">"${quote}"</div>
    <div style="font-family:var(--font-mono);font-size:0.68rem;color:var(--text-muted);margin-bottom:16px;letter-spacing:1px;">${completed}/6 SESSIONS DONE THIS WEEK</div>
    <ul class="rest-checklist">
      <li><span class="rest-check"></span> Sleep 7-9 hours</li>
      <li><span class="rest-check"></span> Hit protein target (1.6-2.2g/kg)</li>
      <li><span class="rest-check"></span> Drink 3-4L water</li>
      <li><span class="rest-check"></span> Light stretching or walk</li>
      <li><span class="rest-check"></span> 5g creatine</li>
    </ul>
  </div>`;
}
