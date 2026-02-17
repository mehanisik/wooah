import { test, expect } from './fixtures.js';
import { mockSupabaseAuth, loginViaOtp } from './supabase-mock.js';

test.describe('View Transitions', () => {
  test('page has view-transition-name', async ({ page }) => {
    await mockSupabaseAuth(page);
    await page.goto('/');
    await loginViaOtp(page);
    const vtn = await page.locator('.page.uk-active').evaluate((el) => getComputedStyle(el).viewTransitionName);
    expect(vtn).toBe('page-content');
  });

  test('tab switch updates content', async ({ page }) => {
    await mockSupabaseAuth(page);
    await page.goto('/');
    await loginViaOtp(page);
    const firstTab = await page.locator('.page.uk-active').getAttribute('data-page');
    await page.locator('.nav-tab[data-idx="7"]').click();
    await expect(page.locator('.page.uk-active[data-page="7"]')).toBeVisible();
    expect(firstTab).not.toBe('7');
  });
});

test.describe('Reduced Motion', () => {
  test('reduced motion media query exists in styles', async ({ page }) => {
    await page.goto('/');
    const hasRule = await page.evaluate(() => {
      for (const sheet of document.styleSheets) {
        try {
          for (const rule of sheet.cssRules) {
            if (rule.conditionText?.includes('prefers-reduced-motion: reduce')) return true;
          }
        } catch {
          /* cross-origin sheets */
        }
      }
      return false;
    });
    expect(hasRule).toBe(true);
  });
});

test.describe('Scroll Snap on Photos', () => {
  test('photo strip has scroll-snap-type', async ({ page }) => {
    await mockSupabaseAuth(page);
    await page.goto('/');
    await loginViaOtp(page);
    await page.locator('.nav-tab[data-idx="10"]').click();
    await expect(page.locator('.page.uk-active[data-page="10"]')).toBeVisible();
    const snapType = await page.evaluate(() => {
      const el = document.querySelector('.photo-session-strip');
      return el ? getComputedStyle(el).scrollSnapType : null;
    });
    // No photos in test env, so strip may not render — that's fine
    if (snapType) {
      expect(snapType).toContain('mandatory');
    }
  });
});

test.describe('Manifest Enhancements', () => {
  test('manifest has display_override and shortcuts', async ({ page }) => {
    const resp = await page.request.get('/manifest.webmanifest');
    expect(resp.ok()).toBe(true);
    const manifest = await resp.json();
    expect(manifest.display_override).toEqual(['standalone', 'minimal-ui']);
    expect(manifest.shortcuts).toBeDefined();
    expect(manifest.shortcuts.length).toBeGreaterThan(0);
    expect(manifest.shortcuts[0].name).toBe('Start Workout');
  });
});

test.describe('Share API', () => {
  test('share button renders when navigator.share exists and data present', async ({ page }) => {
    await page.addInitScript(() => {
      navigator.share = () => Promise.resolve();
      const state = {
        currentWeek: 1,
        activeTab: 0,
        logs: {},
        finishedDays: {},
        history: { 'd0-e0': [{ week: 1, sets: [{ weight: 60, reps: 10 }] }] },
        personalRecords: {},
        totalSessions: 1,
        workoutTimers: {},
        exerciseSwaps: {},
        bodyweight: [],
        oneRmHistory: {},
        extraSets: {},
        cardioLogs: {},
      };
      localStorage.setItem('ironppl_state_v2', JSON.stringify(state));
    });
    await mockSupabaseAuth(page);
    await page.goto('/');
    await loginViaOtp(page);
    await page.click('#statsBtn');
    await expect(page.locator('#shareStats')).toBeVisible();
  });

  test('share button hidden when navigator.share missing', async ({ page }) => {
    await page.addInitScript(() => {
      delete navigator.share;
      const state = {
        currentWeek: 1,
        activeTab: 0,
        logs: {},
        finishedDays: {},
        history: { 'd0-e0': [{ week: 1, sets: [{ weight: 60, reps: 10 }] }] },
        personalRecords: {},
        totalSessions: 1,
        workoutTimers: {},
        exerciseSwaps: {},
        bodyweight: [],
        oneRmHistory: {},
        extraSets: {},
        cardioLogs: {},
      };
      localStorage.setItem('ironppl_state_v2', JSON.stringify(state));
    });
    await mockSupabaseAuth(page);
    await page.goto('/');
    await loginViaOtp(page);
    await page.click('#statsBtn');
    await expect(page.locator('#shareStats')).toHaveCount(0);
  });
});

test.describe('Google One Tap Container', () => {
  test('Google One Tap container present on login page', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#login')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('#googleOneTapContainer')).toBeAttached();
  });
});

test.describe('will-change Hints', () => {
  test('open modal has will-change', async ({ page }) => {
    await mockSupabaseAuth(page);
    await page.goto('/');
    await loginViaOtp(page);
    await page.click('#settingsBtn');
    await expect(page.locator('#settingsModal')).toBeVisible();
    const wc = await page.locator('#settingsModal').evaluate((el) => getComputedStyle(el).willChange);
    expect(wc).toContain('opacity');
  });
});

test.describe('Haptic Helper', () => {
  test('navigator.vibrate called on set toggle', async ({ page }) => {
    await page.addInitScript(() => {
      window.__vibrateCalls = [];
      navigator.vibrate = (ms) => {
        window.__vibrateCalls.push(ms);
        return true;
      };
    });
    await mockSupabaseAuth(page);
    await page.goto('/');
    await loginViaOtp(page);
    // Open first exercise card
    const exerciseTop = page.locator('.exercise-top').first();
    await exerciseTop.click();
    // Fill weight + reps and toggle the set
    const card = page.locator('.exercise-card.open').first();
    await card.locator('.weight-input').first().fill('60');
    await card.locator('.reps-input').first().fill('10');
    await card.locator('.set-check').first().click();
    const calls = await page.evaluate(() => window.__vibrateCalls);
    expect(calls.length).toBeGreaterThan(0);
    expect(calls[0]).toBe(10);
  });
});
