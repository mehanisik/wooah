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
const isStandalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;

let supabase = null;
let currentUser = null;

export function getSupabaseClient() {
  return supabase;
}

export function getAuthUser() {
  return currentUser;
}

export async function initSupabase() {
  localStorage.removeItem('ironppl_neon');
  localStorage.removeItem('ironppl_supabase_url');
  localStorage.removeItem('ironppl_supabase_key');

  loadGoogleScript();
  if (!SUPABASE_URL || !SUPABASE_KEY) return false;
  try {
    supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    setSupabaseClient(supabase, getAuthUser);

    supabase.auth.onAuthStateChange(async (event, session) => {
      currentUser = session?.user ?? null;
      updateSyncDot(currentUser ? 'online' : 'offline');
      updateAuthUI();

      if (event === 'SIGNED_IN' && currentUser) {
        await migrateExistingData(currentUser.id);
      }
    });

    const {
      data: { session },
    } = await supabase.auth.getSession();
    currentUser = session?.user ?? null;
    updateSyncDot(currentUser ? 'online' : 'offline');
    return true;
  } catch {
    supabase = null;
    setSupabaseClient(null, null);
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
  dot.className = `sync-dot ${status}`;
  dot.title = status === 'online' ? 'Cloud synced' : status === 'syncing' ? 'Syncing...' : 'Offline (local only)';
}

function updateAuthUI() {
  const status = $('#authStatus');
  const signedOutUI = $('#authSignedOut');
  const signedInUI = $('#authSignedIn');
  if (!status) return;

  if (currentUser) {
    status.textContent = currentUser.email;
    status.style.color = 'var(--green)';
    signedOutUI.style.display = 'none';
    signedInUI.style.display = 'block';
  } else {
    status.textContent = 'NOT SIGNED IN';
    status.style.color = '';
    signedOutUI.style.display = 'block';
    signedInUI.style.display = 'none';
  }

  const emailStep = $('#authEmailStep');
  const otpStep = $('#authOtpStep');
  if (emailStep && otpStep && currentUser) {
    emailStep.style.display = 'block';
    otpStep.style.display = 'none';
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

function loadGoogleScript() {
  if (typeof google !== 'undefined' || isStandalone) return;
  const s = document.createElement('script');
  s.src = 'https://accounts.google.com/gsi/client';
  s.async = true;
  document.head.appendChild(s);
}

async function signInWithGoogle() {
  if (!supabase || !GOOGLE_CLIENT_ID) {
    showToast('Sign-in unavailable');
    return;
  }
  if (typeof google === 'undefined') {
    showToast('Google sign-in loading — try again');
    loadGoogleScript();
    return;
  }
  const rawNonce = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32))));
  const hashedNonce = btoa(
    String.fromCharCode(...new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(rawNonce)))),
  );
  google.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID,
    nonce: hashedNonce,
    callback: async (response) => {
      const { error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: response.credential,
        nonce: rawNonce,
      });
      const msg = $('#authMsg');
      if (error) {
        msg.textContent = error.message;
        msg.className = 'setup-msg error';
      } else {
        msg.textContent = 'Signed in with Google!';
        msg.className = 'setup-msg success';
      }
    },
  });
  google.accounts.id.prompt();
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

export function initSettingsHandlers() {
  $('#settingsBtn').addEventListener('click', () => {
    updateAuthUI();
    openModal($('#settingsModal'));
  });

  $('#settingsClose').addEventListener('click', () => closeAllModals());

  $('#settingsModal').addEventListener('click', (e) => {
    if (e.target === $('#settingsModal')) closeAllModals();
  });

  if (isStandalone) {
    $('#authGoogle').style.display = 'none';
    const divider = $('#authOrDivider');
    if (divider) divider.style.display = 'none';
  } else {
    $('#authGoogle').addEventListener('click', () => signInWithGoogle());
  }

  let pendingEmail = '';

  $('#authSendCode').addEventListener('click', async () => {
    const email = $('#authEmail').value.trim();
    if (!email || !email.includes('@')) {
      $('#authMsg').textContent = 'Enter a valid email address';
      $('#authMsg').className = 'setup-msg error';
      return;
    }
    $('#authSendCode').disabled = true;
    $('#authSendCode').textContent = 'SENDING...';
    const { error } = await sendOtpCode(email);
    $('#authSendCode').disabled = false;
    $('#authSendCode').textContent = 'SEND CODE';
    if (error) {
      $('#authMsg').textContent = error.message;
      $('#authMsg').className = 'setup-msg error';
    } else {
      pendingEmail = email;
      $('#authEmailStep').style.display = 'none';
      $('#authOtpStep').style.display = 'block';
      $('#authOtpInput').value = '';
      $('#authOtpInput').focus();
      $('#authMsg').textContent = 'Check your email for the 6-digit code';
      $('#authMsg').className = 'setup-msg success';
    }
  });

  $('#authVerifyOtp').addEventListener('click', async () => {
    const token = $('#authOtpInput').value.trim();
    if (!token || token.length !== 6) {
      $('#authMsg').textContent = 'Enter the 6-digit code';
      $('#authMsg').className = 'setup-msg error';
      return;
    }
    $('#authVerifyOtp').disabled = true;
    $('#authVerifyOtp').textContent = 'VERIFYING...';
    const { error } = await verifyOtp(pendingEmail, token);
    $('#authVerifyOtp').disabled = false;
    $('#authVerifyOtp').textContent = 'VERIFY';
    if (error) {
      $('#authMsg').textContent = error.message;
      $('#authMsg').className = 'setup-msg error';
    } else {
      $('#authMsg').textContent = 'Signed in!';
      $('#authMsg').className = 'setup-msg success';
    }
  });

  $('#authOtpBack').addEventListener('click', () => {
    $('#authOtpStep').style.display = 'none';
    $('#authEmailStep').style.display = 'block';
    $('#authMsg').textContent = '';
    $('#authMsg').className = 'setup-msg';
  });

  $('#authSignOut').addEventListener('click', async () => {
    await signOut();
    $('#authMsg').textContent = 'Signed out.';
    $('#authMsg').className = 'setup-msg';
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
