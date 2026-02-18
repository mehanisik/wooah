import { test, expect } from './fixtures.js';
import { mockSupabaseAuth, loginViaOtp } from './supabase-mock.js';
import { injectTestState } from './test-data.js';

test.describe('Calendar Page', () => {
  test.beforeEach(async ({ page }) => {
    await mockSupabaseAuth(page);
    await injectTestState(page);
    await page.goto('/');
    await expect(page.locator('#login')).toBeVisible({ timeout: 5000 });
    await loginViaOtp(page);
    await page.click('.nav-tab[data-idx="9"]');
    await expect(page.locator('.calendar-month').first()).toBeVisible({ timeout: 5000 });
  });

  test('3-month calendar grid renders', async ({ page }) => {
    const months = page.locator('.calendar-month');
    expect(await months.count()).toBe(3);
  });

  test('calendar has weekday headers', async ({ page }) => {
    const weekdays = page.locator('.calendar-weekday');
    expect(await weekdays.count()).toBeGreaterThanOrEqual(7);
  });

  test('finished days have color classes', async ({ page }) => {
    const coloredCells = page.locator('.calendar-cell.push, .calendar-cell.pull, .calendar-cell.legs');
    const count = await coloredCells.count();
    expect(count).toBeGreaterThan(0);
  });

  test('clicking a colored cell shows detail', async ({ page }) => {
    const coloredCell = page.locator('.calendar-cell.push, .calendar-cell.pull, .calendar-cell.legs').first();

    if (await coloredCell.isVisible()) {
      await coloredCell.click();
      await expect(page.locator('#calendarDetail')).toBeVisible({ timeout: 3000 });
    }
  });

  test('legend shows workout types', async ({ page }) => {
    const legend = page.locator('.calendar-legend');
    await expect(legend).toBeVisible();
    expect(await legend.locator('.legend-item').count()).toBeGreaterThanOrEqual(3);
  });
});
