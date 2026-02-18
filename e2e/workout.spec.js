import { test, expect } from './fixtures.js';
import { mockSupabaseAuth, loginViaOtp } from './supabase-mock.js';

test.describe('Workout Flow', () => {
  test.beforeEach(async ({ page }) => {
    await mockSupabaseAuth(page);
    await page.goto('/');
    await expect(page.locator('#login')).toBeVisible({ timeout: 5000 });
    await loginViaOtp(page);
    await expect(page.locator('.exercise-card').first()).toBeVisible({ timeout: 5000 });
  });

  test('nav tabs switch pages', async ({ page }) => {
    const activeTab = page.locator('.nav-tab.uk-active');
    await expect(activeTab).toBeVisible();

    const otherIdx = (await activeTab.getAttribute('data-idx')) === '1' ? '2' : '1';
    await page.click(`.nav-tab[data-idx="${otherIdx}"]`);
    await expect(page.locator(`.nav-tab[data-idx="${otherIdx}"]`)).toHaveClass(/uk-active/);
  });

  test('exercise card expands and collapses', async ({ page }) => {
    const card = page.locator('.exercise-card').first();
    const top = card.locator('.exercise-top');
    await top.click();
    await expect(card).toHaveClass(/open/);
    await expect(top).toHaveAttribute('aria-expanded', 'true');

    await top.click();
    await expect(card).not.toHaveClass(/open/);
  });

  test('weight and reps inputs accept values', async ({ page }) => {
    const card = page.locator('.exercise-card').first();
    await card.locator('.exercise-top').click();
    await expect(card).toHaveClass(/open/);

    const weightInput = card.locator('.weight-input').first();
    const repsInput = card.locator('.reps-input').first();
    await weightInput.fill('80');
    await repsInput.fill('10');
    await expect(weightInput).toHaveValue('80');
    await expect(repsInput).toHaveValue('10');
  });

  test('marking set done shows check state', async ({ page }) => {
    const card = page.locator('.exercise-card').first();
    await card.locator('.exercise-top').click();

    const weightInput = card.locator('.weight-input').first();
    const repsInput = card.locator('.reps-input').first();
    await weightInput.fill('60');
    await repsInput.fill('8');

    const checkBtn = card.locator('.set-check').first();
    await checkBtn.click();
    await expect(checkBtn).toHaveAttribute('aria-checked', 'true');
  });

  test('rest timer activates after marking set done', async ({ page }) => {
    const card = page.locator('.exercise-card').first();
    await card.locator('.exercise-top').click();

    await card.locator('.weight-input').first().fill('60');
    await card.locator('.reps-input').first().fill('8');
    await card.locator('.set-check').first().click();

    await expect(page.locator('#restTimerBar')).toHaveClass(/visible/, { timeout: 3000 });
  });

  test('STATS tab shows stats content', async ({ page }) => {
    await page.click('.nav-tab[data-idx="8"]');
    await expect(page.locator('.nav-tab[data-idx="8"]')).toHaveClass(/uk-active/);
    const statsContent = page.locator('.info-title, .no-data-msg');
    await expect(statsContent.first()).toBeVisible({ timeout: 5000 });
  });

  test('CALENDAR tab shows calendar', async ({ page }) => {
    await page.click('.nav-tab[data-idx="9"]');
    await expect(page.locator('.nav-tab[data-idx="9"]')).toHaveClass(/uk-active/);
    await expect(page.locator('.calendar-month').first()).toBeVisible({ timeout: 5000 });
  });
});
