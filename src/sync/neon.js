import { $ } from '../ui/helpers.js';
import { state, getLog, getWorkoutTimer, historyKey } from '../state/store.js';
import { PROGRAM } from '../data/program.js';
import { showToast } from '../ui/toast.js';
import { closeAllModals, openModal } from '../ui/events.js';

let neonSQL = null;

function getNeonConfig() {
  try {
    return localStorage.getItem('ironppl_neon') || null;
  } catch { return null; }
}

function saveNeonConfig(connStr) {
  localStorage.setItem('ironppl_neon', connStr);
}

function clearNeonConfig() {
  localStorage.removeItem('ironppl_neon');
}

export async function initNeon() {
  const connStr = getNeonConfig();
  if (!connStr) return false;
  try {
    const { neon } = await import('https://esm.sh/@neondatabase/serverless@0.10.4');
    neonSQL = neon(connStr);
    updateSyncDot('online');
    return true;
  } catch {
    neonSQL = null;
    return false;
  }
}

function updateSyncDot(status) {
  const dot = $('#syncDot');
  dot.className = 'sync-dot ' + status;
  dot.title = status === 'online' ? 'Cloud synced' : status === 'syncing' ? 'Syncing...' : 'Offline (local only)';
}

function updateSettingsUI() {
  const connStr = getNeonConfig();
  const input = $('#neonConnStr');
  const connectBtn = $('#neonConnect');
  const disconnectBtn = $('#neonDisconnect');
  const testBtn = $('#neonTest');
  const statusEl = $('#neonStatus');

  if (connStr) {
    input.value = connStr;
    input.disabled = true;
    connectBtn.style.display = 'none';
    disconnectBtn.style.display = 'block';
    testBtn.style.display = 'block';
    statusEl.textContent = neonSQL ? 'CONNECTED' : 'SAVED (NOT VERIFIED)';
    statusEl.style.color = neonSQL ? 'var(--green)' : 'var(--yellow)';
  } else {
    input.value = '';
    input.disabled = false;
    connectBtn.style.display = 'block';
    disconnectBtn.style.display = 'none';
    testBtn.style.display = 'none';
    statusEl.textContent = 'NOT CONNECTED';
    statusEl.style.color = '';
  }
}

export async function syncToNeon(dayIdx) {
  if (!neonSQL) return;
  updateSyncDot('syncing');

  try {
    const day = PROGRAM[dayIdx];
    const wTimer = getWorkoutTimer(dayIdx);
    const startedAt = wTimer ? wTimer.startedAt : new Date().toISOString();
    const duration = wTimer ? wTimer.duration : 0;

    const sessionResult = await neonSQL`
      INSERT INTO sessions (week, day_index, day_name, workout_type, started_at, finished_at, duration_sec)
      VALUES (${state.currentWeek}, ${dayIdx}, ${day.name}, ${day.type}, ${startedAt}, ${new Date().toISOString()}, ${duration})
      RETURNING id`;

    const sessionId = sessionResult[0].id;

    for (let exIdx = 0; exIdx < day.exercises.length; exIdx++) {
      const ex = day.exercises[exIdx];
      for (let s = 0; s < ex.sets; s++) {
        const log = getLog(dayIdx, exIdx, s);
        await neonSQL`
          INSERT INTO sets (session_id, exercise_index, exercise_name, set_index, weight, reps, is_amrap)
          VALUES (${sessionId}, ${exIdx}, ${ex.name}, ${s},
                  ${parseFloat(log.weight) || 0}, ${parseInt(log.reps) || 0},
                  ${!!(ex.amrap && s === ex.sets - 1)})`;
      }
    }

    for (let exIdx = 0; exIdx < day.exercises.length; exIdx++) {
      const ex = day.exercises[exIdx];
      const prKey = historyKey(dayIdx, exIdx);
      const pr = state.personalRecords[prKey];
      if (!pr) continue;

      let bestW = 0, bestR = 0;
      for (let s = 0; s < ex.sets; s++) {
        const log = getLog(dayIdx, exIdx, s);
        const w = parseFloat(log.weight) || 0;
        const r = parseInt(log.reps) || 0;
        if (w * r > bestW * bestR) { bestW = w; bestR = r; }
      }

      await neonSQL`
        INSERT INTO personal_records (day_index, exercise_index, exercise_name, best_weight, best_reps, best_volume, achieved_at)
        VALUES (${dayIdx}, ${exIdx}, ${ex.name}, ${bestW}, ${bestR}, ${pr.volume}, ${pr.date})
        ON CONFLICT (day_index, exercise_index)
        DO UPDATE SET best_weight = EXCLUDED.best_weight, best_reps = EXCLUDED.best_reps,
                      best_volume = EXCLUDED.best_volume, achieved_at = EXCLUDED.achieved_at
        WHERE EXCLUDED.best_volume > personal_records.best_volume`;
    }

    updateSyncDot('online');
    showToast('Synced to cloud');
  } catch (err) {
    updateSyncDot('offline');
    showToast('Sync failed — data saved locally');
  }
}

export function initSettingsHandlers() {
  $('#settingsBtn').addEventListener('click', () => {
    updateSettingsUI();
    openModal($('#settingsModal'));
  });

  $('#settingsClose').addEventListener('click', () => closeAllModals());

  $('#settingsModal').addEventListener('click', (e) => {
    if (e.target === $('#settingsModal')) closeAllModals();
  });

  $('#neonConnect').addEventListener('click', async () => {
    const connStr = $('#neonConnStr').value.trim();
    if (!connStr || !connStr.startsWith('postgresql://')) {
      $('#settingsMsg').textContent = 'Enter a valid PostgreSQL connection string';
      $('#settingsMsg').className = 'setup-msg error';
      return;
    }
    saveNeonConfig(connStr);
    $('#neonConnect').disabled = true;
    $('#neonConnect').textContent = 'CONNECTING...';
    const ok = await initNeon();
    $('#neonConnect').disabled = false;
    $('#neonConnect').textContent = 'CONNECT';
    if (ok) {
      try {
        await neonSQL`SELECT 1`;
        updateSettingsUI();
        $('#settingsMsg').textContent = 'Connected to NeonDB!';
        $('#settingsMsg').className = 'setup-msg success';
      } catch (err) {
        clearNeonConfig();
        neonSQL = null;
        updateSyncDot('offline');
        updateSettingsUI();
        $('#settingsMsg').textContent = 'Connection failed: ' + (err.message || 'Check your connection string');
        $('#settingsMsg').className = 'setup-msg error';
      }
    } else {
      clearNeonConfig();
      updateSettingsUI();
      $('#settingsMsg').textContent = 'Failed to load Neon driver.';
      $('#settingsMsg').className = 'setup-msg error';
    }
  });

  $('#neonDisconnect').addEventListener('click', () => {
    neonSQL = null;
    clearNeonConfig();
    updateSyncDot('offline');
    updateSettingsUI();
    $('#settingsMsg').textContent = 'Disconnected.';
    $('#settingsMsg').className = 'setup-msg';
  });

  $('#neonTest').addEventListener('click', async () => {
    if (!neonSQL) {
      await initNeon();
    }
    if (!neonSQL) {
      $('#settingsMsg').textContent = 'Not connected';
      $('#settingsMsg').className = 'setup-msg error';
      return;
    }
    $('#neonTest').disabled = true;
    $('#neonTest').textContent = 'TESTING...';
    try {
      const result = await neonSQL`SELECT COUNT(*) as n FROM sessions`;
      $('#settingsMsg').textContent = `Connection OK — ${result[0].n} sessions in database`;
      $('#settingsMsg').className = 'setup-msg success';
      updateSyncDot('online');
    } catch (err) {
      $('#settingsMsg').textContent = 'Test failed: ' + (err.message || 'Unknown error');
      $('#settingsMsg').className = 'setup-msg error';
      updateSyncDot('offline');
    }
    $('#neonTest').disabled = false;
    $('#neonTest').textContent = 'TEST CONNECTION';
  });

  function applyTheme(theme) {
    const html = document.documentElement;
    html.classList.remove('light', 'dark');
    if (theme === 'light') html.classList.add('light');
    else if (theme === 'dark') html.classList.add('dark');
    localStorage.setItem('ironppl_theme', theme);
    updateThemeButtons(theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
      meta.content = isDark ? '#0a0a0a' : '#ffffff';
    }
  }

  function updateThemeButtons(active) {
    document.querySelectorAll('.theme-btn').forEach(b => {
      b.classList.toggle('uk-btn-primary', b.dataset.theme === active);
      b.classList.toggle('uk-btn-default', b.dataset.theme !== active);
    });
  }

  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => applyTheme(btn.dataset.theme));
  });

  const savedTheme = localStorage.getItem('ironppl_theme') || 'system';
  updateThemeButtons(savedTheme);

  $('#exportData').addEventListener('click', () => {
    const data = JSON.stringify(state, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ironppl-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Data exported');
  });
}
