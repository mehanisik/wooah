import { createClient } from '@supabase/supabase-js';
import { $ } from '../ui/helpers.js';
import { state, getLog, getWorkoutTimer, historyKey } from '../state/store.js';
import { PROGRAM } from '../data/program.js';
import { showToast } from '../ui/toast.js';
import { closeAllModals, openModal } from '../ui/events.js';
import { setSupabaseClient } from '../ui/photo-store.js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

let supabase = null;
let currentUser = null;

export function getSupabaseClient() {
  return supabase;
}

export function getAuthUser() {
  return currentUser;
}

function showLogin() {
  document.getElementById('splash').style.display = 'none';
  document.getElementById('login').style.display = '';
  document.getElementById('app').style.display = 'none';
}

function showApp() {
  document.getElementById('splash').style.display = 'none';
  document.getElementById('login').style.display = 'none';
  document.getElementById('app').style.display = 'contents';
}

export async function initSupabase() {
  localStorage.removeItem('ironppl_neon');
  localStorage.removeItem('ironppl_supabase_url');
  localStorage.removeItem('ironppl_supabase_key');

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    showLogin();
    return false;
  }
  try {
    supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    setSupabaseClient(supabase, getAuthUser);

    supabase.auth.onAuthStateChange(async (event, session) => {
      currentUser = session?.user ?? null;
      updateSyncDot(currentUser ? 'online' : 'offline');
      updateAuthUI();

      if ((event === 'SIGNED_IN' || event === 'INITIAL_SESSION') && currentUser) {
        showApp();
        await migrateExistingData(currentUser.id);
      } else if (event === 'SIGNED_OUT' || (event === 'INITIAL_SESSION' && !currentUser)) {
        showLogin();
      }
    });

    const {
      data: { session },
    } = await Promise.race([
      supabase.auth.getSession(),
      new Promise((_, reject) => setTimeout(() => reject(new Error('getSession timeout')), 5000)),
    ]);
    currentUser = session?.user ?? null;
    updateSyncDot(currentUser ? 'online' : 'offline');

    if (currentUser) {
      showApp();
    } else {
      showLogin();
    }

    return true;
  } catch (err) {
    console.error('[IRON PPL] initSupabase failed:', err);
    supabase = null;
    setSupabaseClient(null, null);
    showLogin();
    return false;
  }
}

async function migrateExistingData(userId) {
  const flag = `ironppl_data_migrated_${userId}`;
  if (localStorage.getItem(flag)) return;
  try {
    await supabase.rpc('migrate_orphaned_data', { p_user_id: userId });
    localStorage.setItem(flag, '1');
  } catch {
    // migration failed — will retry next sign-in
  }
}

function updateSyncDot(status) {
  const dot = $('#syncDot');
  if (!dot) return;
  dot.className = `sync-dot ${status}`;
  dot.title = status === 'online' ? 'Cloud synced' : status === 'syncing' ? 'Syncing...' : 'Offline (local only)';
}

function updateAuthUI() {
  const status = $('#authStatus');
  if (!status) return;

  if (currentUser) {
    status.textContent = currentUser.email;
    status.style.color = 'var(--green)';
  } else {
    status.textContent = '';
    status.style.color = '';
  }
}

export async function sendOtpCode(email) {
  if (!supabase) return { error: { message: 'Supabase not initialized' } };
  return supabase.auth.signInWithOtp({ email });
}

export async function verifyOtp(email, token) {
  if (!supabase) return { error: { message: 'Supabase not initialized' } };
  return supabase.auth.verifyOtp({ email, token, type: 'email' });
}

export async function signOut() {
  if (!supabase) return;
  await supabase.auth.signOut();
  currentUser = null;
  updateSyncDot('offline');
  updateAuthUI();
}

async function generateNonce() {
  const raw = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32))));
  const encoded = new TextEncoder().encode(raw);
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoded);
  const hashed = Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return { raw, hashed };
}

async function signInWithGoogle() {
  if (!supabase || !GOOGLE_CLIENT_ID) {
    showToast('Sign-in unavailable');
    return;
  }

  if (typeof google === 'undefined' || !google.accounts) {
    showToast('Google sign-in loading, try again');
    return;
  }

  const msg = document.getElementById('loginMsg');

  try {
    const { raw, hashed } = await generateNonce();

    google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      nonce: hashed,
      callback: async (response) => {
        const { error } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: response.credential,
          nonce: raw,
        });
        if (error && msg) {
          msg.textContent = error.message;
          msg.className = 'setup-msg error';
        }
      },
      use_fedcm_for_prompt: true,
    });

    google.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        renderGoogleButton();
      }
    });
  } catch {
    if (msg) {
      msg.textContent = 'Google sign-in failed. Use email instead.';
      msg.className = 'setup-msg error';
    }
  }
}

function renderGoogleButton() {
  const container = document.getElementById('googleOneTapContainer');
  if (!container || typeof google === 'undefined') return;
  container.innerHTML = '';
  google.accounts.id.renderButton(container, {
    type: 'standard',
    theme: document.documentElement.classList.contains('dark') ? 'filled_black' : 'outline',
    size: 'large',
    width: 320,
    text: 'signin_with',
  });
}

export async function syncToSupabase(dayIdx) {
  if (!supabase || !currentUser) return;
  updateSyncDot('syncing');

  try {
    const day = PROGRAM[dayIdx];
    const wTimer = getWorkoutTimer(dayIdx);
    const startedAt = wTimer ? wTimer.startedAt : new Date().toISOString();
    const duration = wTimer ? wTimer.duration : 0;

    const { data: sessionData, error: sessionErr } = await supabase
      .from('sessions')
      .insert({
        user_id: currentUser.id,
        week: state.currentWeek,
        day_index: dayIdx,
        day_name: day.name,
        workout_type: day.type,
        started_at: startedAt,
        finished_at: new Date().toISOString(),
        duration_sec: duration,
      })
      .select('id')
      .single();

    if (sessionErr) throw sessionErr;
    const sessionId = sessionData.id;

    const setsRows = [];
    for (let exIdx = 0; exIdx < day.exercises.length; exIdx++) {
      const ex = day.exercises[exIdx];
      for (let s = 0; s < ex.sets; s++) {
        const log = getLog(dayIdx, exIdx, s);
        setsRows.push({
          user_id: currentUser.id,
          session_id: sessionId,
          exercise_index: exIdx,
          exercise_name: ex.name,
          set_index: s,
          weight: parseFloat(log.weight) || 0,
          reps: parseInt(log.reps, 10) || 0,
          is_amrap: !!(ex.amrap && s === ex.sets - 1),
        });
      }
    }

    if (setsRows.length) {
      const { error: setsErr } = await supabase.from('sets').insert(setsRows);
      if (setsErr) throw setsErr;
    }

    for (let exIdx = 0; exIdx < day.exercises.length; exIdx++) {
      const ex = day.exercises[exIdx];
      const prKey = historyKey(dayIdx, exIdx);
      const pr = state.personalRecords[prKey];
      if (!pr) continue;

      let bestW = 0,
        bestR = 0;
      for (let s = 0; s < ex.sets; s++) {
        const log = getLog(dayIdx, exIdx, s);
        const w = parseFloat(log.weight) || 0;
        const r = parseInt(log.reps, 10) || 0;
        if (w * r > bestW * bestR) {
          bestW = w;
          bestR = r;
        }
      }

      await supabase.rpc('upsert_pr', {
        p_user_id: currentUser.id,
        p_day_index: dayIdx,
        p_exercise_index: exIdx,
        p_exercise_name: ex.name,
        p_best_weight: bestW,
        p_best_reps: bestR,
        p_best_volume: pr.volume,
        p_achieved_at: pr.date,
      });
    }

    updateSyncDot('online');
    showToast('Synced to cloud');
  } catch {
    updateSyncDot('offline');
    showToast('Sync failed — data saved locally');
  }
}

export function initLoginHandlers() {
  document.getElementById('loginGoogle').addEventListener('click', () => signInWithGoogle());

  let pendingEmail = '';

  document.getElementById('loginSendCode').addEventListener('click', async () => {
    const email = document.getElementById('loginEmail').value.trim();
    const msg = document.getElementById('loginMsg');
    if (!email || !email.includes('@')) {
      msg.textContent = 'Enter a valid email address';
      msg.className = 'setup-msg error';
      return;
    }
    const btn = document.getElementById('loginSendCode');
    btn.disabled = true;
    btn.textContent = 'SENDING...';
    const { error } = await sendOtpCode(email);
    btn.disabled = false;
    btn.textContent = 'SEND CODE';
    if (error) {
      msg.textContent = error.message;
      msg.className = 'setup-msg error';
    } else {
      pendingEmail = email;
      document.getElementById('loginEmailStep').style.display = 'none';
      document.getElementById('loginOtpStep').style.display = 'block';
      document.getElementById('loginOtpInput').value = '';
      document.getElementById('loginOtpInput').focus();
      msg.textContent = 'Check your email for the 6-digit code';
      msg.className = 'setup-msg success';
    }
  });

  document.getElementById('loginVerifyOtp').addEventListener('click', async () => {
    const token = document.getElementById('loginOtpInput').value.trim();
    const msg = document.getElementById('loginMsg');
    if (!token || token.length !== 6) {
      msg.textContent = 'Enter the 6-digit code';
      msg.className = 'setup-msg error';
      return;
    }
    const btn = document.getElementById('loginVerifyOtp');
    btn.disabled = true;
    btn.textContent = 'VERIFYING...';
    const { error } = await verifyOtp(pendingEmail, token);
    btn.disabled = false;
    btn.textContent = 'VERIFY';
    if (error) {
      msg.textContent = error.message;
      msg.className = 'setup-msg error';
    }
  });

  document.getElementById('loginOtpBack').addEventListener('click', () => {
    document.getElementById('loginOtpStep').style.display = 'none';
    document.getElementById('loginEmailStep').style.display = 'block';
    const msg = document.getElementById('loginMsg');
    msg.textContent = '';
    msg.className = 'setup-msg';
  });
}

export function initSettingsHandlers() {
  $('#settingsBtn').addEventListener('click', () => {
    updateAuthUI();
    openModal($('#settingsModal'));
  });

  $('#settingsClose').addEventListener('click', () => closeAllModals());

  $('#settingsModal').addEventListener('click', (e) => {
    if (e.target === $('#settingsModal')) closeAllModals();
  });

  $('#authSignOut').addEventListener('click', async () => {
    closeAllModals();
    await signOut();
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
      const isDark =
        theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
      meta.content = isDark ? '#0a0a0a' : '#ffffff';
    }
  }

  function updateThemeButtons(active) {
    document.querySelectorAll('.theme-btn').forEach((b) => {
      b.classList.toggle('uk-btn-primary', b.dataset.theme === active);
      b.classList.toggle('uk-btn-default', b.dataset.theme !== active);
    });
  }

  document.querySelectorAll('.theme-btn').forEach((btn) => {
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
