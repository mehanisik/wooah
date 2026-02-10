export function renderInfoPage() {
  return `
    <div class="info-section">
      <div class="info-title">PROGRESSIVE OVERLOAD</div>
      <div class="info-subtitle">Compound Lifts (Bench, Squat, Deadlift, OHP)</div>
      <ul class="info-list">
        <li>Linear progression: add 2.5 kg per session when you hit 5+ reps on the AMRAP set</li>
        <li>If you fail to hit 5 reps on AMRAP for two consecutive sessions, deload by 10%</li>
        <li>Track AMRAP reps weekly — 6-8+ is ideal progress</li>
      </ul>
      <div class="info-subtitle">Accessory Lifts</div>
      <ul class="info-list">
        <li>Double progression: start at low end of rep range</li>
        <li>When you hit top of range on ALL sets, increase weight by smallest increment (2.5 kg)</li>
        <li>Example: 3x8-12 — start at 20kg for 3x8, build to 3x12, then increase to 22.5kg at 3x8</li>
      </ul>
      <div class="info-subtitle">When Progress Stalls</div>
      <ul class="info-list">
        <li>Deload every 6-8 weeks: reduce all weights by 40-50%, keep sets/reps same</li>
        <li>After deload, resume at pre-stall weights</li>
        <li>If still stuck after 2 deload cycles, switch the movement variation</li>
      </ul>
    </div>
    <div class="info-section">
      <div class="info-title">REST PERIODS</div>
      <table class="uk-table uk-table-divider info-table">
        <thead><tr><th>Exercise Type</th><th>Rest</th></tr></thead>
        <tbody>
          <tr><td>Main compound (Bench/Squat/DL/OHP)</td><td>3-4 min</td></tr>
          <tr><td>Secondary compound (rows, incline, etc.)</td><td>2 min</td></tr>
          <tr><td>Isolation work</td><td>60-90 sec</td></tr>
          <tr><td>Supersets</td><td>60 sec after both exercises</td></tr>
        </tbody>
      </table>
    </div>
    <div class="info-section">
      <div class="info-title">RECOVERY & NUTRITION</div>
      <div class="info-subtitle">Sleep</div>
      <ul class="info-list">
        <li>7-9 hours per night minimum — non-negotiable for hypertrophy</li>
        <li>Keep a consistent sleep schedule</li>
      </ul>
      <div class="info-subtitle">Protein</div>
      <ul class="info-list">
        <li>1.6-2.2g per kg bodyweight daily</li>
        <li>Spread across 4-5 meals (30-50g per meal)</li>
        <li>Post-workout meal within 2 hours</li>
      </ul>
      <div class="info-subtitle">Calories</div>
      <ul class="info-list">
        <li>Bulking: +300-500 cal surplus (lean bulk)</li>
        <li>Recomp: maintenance calories with high protein</li>
        <li>Cutting: -300-500 cal deficit, keep protein high</li>
      </ul>
      <div class="info-subtitle">Hydration</div>
      <ul class="info-list"><li>3-4 liters of water daily, more on training days</li></ul>
      <div class="info-subtitle">Supplements (evidence-based)</div>
      <ul class="info-list">
        <li>Creatine monohydrate: 5g daily (no loading needed)</li>
        <li>Caffeine: 200-400mg pre-workout (30 min before)</li>
        <li>Vitamin D: 2000-5000 IU daily</li>
      </ul>
    </div>
    <div class="info-section">
      <div class="info-title">TERMINOLOGY</div>
      <div class="uk-card uk-card-body term-card"><span class="term-abbr">RIR</span><span class="term-def">Reps In Reserve — how many reps you could still do before failure</span></div>
      <div class="uk-card uk-card-body term-card"><span class="term-abbr">AMRAP</span><span class="term-def">As Many Reps As Possible — with good form, on the last set of compound lifts</span></div>
      <div class="uk-card uk-card-body term-card"><span class="term-abbr">SUPERSET</span><span class="term-def">Two exercises back-to-back with no rest between them</span></div>
      <div class="uk-card uk-card-body term-card"><span class="term-abbr">DELOAD</span><span class="term-def">Planned reduction in intensity/volume for recovery (every 6-8 weeks)</span></div>
      <div class="uk-card uk-card-body term-card"><span class="term-abbr">1RM</span><span class="term-def">One Rep Max — the heaviest weight you can lift for a single repetition</span></div>
      <div class="uk-card uk-card-body term-card"><span class="term-abbr">RPE</span><span class="term-def">Rate of Perceived Exertion — subjective difficulty scale (10 = max effort)</span></div>
    </div>
  `;
}
