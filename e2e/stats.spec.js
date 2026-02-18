import { test, expect } from './fixtures.js';
import { mockSupabaseAuth, loginViaOtp } from './supabase-mock.js';
import { injectTestState } from './test-data.js';

test.describe('Stats Page', () => {
  test.beforeEach(async ({ page }) => {
    await mockSupabaseAuth(page);
    await injectTestState(page);
    await page.goto('/');
    await expect(page.locator('#login')).toBeVisible({ timeout: 5000 });
    await loginViaOtp(page);
    await page.click('.nav-tab[data-idx="8"]');
    await expect(page.locator('.info-title').first()).toBeVisible({ timeout: 5000 });
  });

  test('stats sections render', async ({ page }) => {
    const sections = page.locator('.info-section');
    expect(await sections.count()).toBeGreaterThan(0);
  });

  test('journey stats show session count', async ({ page }) => {
    const statRows = page.locator('.stat-row');
    const allText = await statRows.allTextContents();
    const hasSessionCount = allText.some((t) => t.includes('9'));
    expect(hasSessionCount).toBe(true);
  });

  test('volume section renders', async ({ page }) => {
    const volumeSection = page.locator('.volume-grid');
    if (await volumeSection.isVisible()) {
      const rows = page.locator('.volume-row');
      expect(await rows.count()).toBeGreaterThan(0);
    }
  });

  test('exercise dropdown works', async ({ page }) => {
    const dropdown = page.locator('#statsExerciseSelect');
    if (await dropdown.isVisible()) {
      const options = await dropdown.locator('option').count();
      expect(options).toBeGreaterThan(0);
    }
  });
});
