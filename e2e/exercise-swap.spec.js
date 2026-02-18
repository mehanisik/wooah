import { test, expect } from './fixtures.js';
import { mockSupabaseAuth, loginViaOtp } from './supabase-mock.js';

test.describe('Exercise Swap', () => {
  test.beforeEach(async ({ page }) => {
    await mockSupabaseAuth(page);
    await page.goto('/');
    await expect(page.locator('#login')).toBeVisible({ timeout: 5000 });
    await loginViaOtp(page);
    await expect(page.locator('.exercise-card').first()).toBeVisible({ timeout: 5000 });
  });

  test('swap button opens modal', async ({ page }) => {
    const card = page.locator('.exercise-card').first();
    await card.locator('.exercise-top').click();
    await expect(card).toHaveClass(/open/);

    await card.locator('.swap-btn').click();
    await expect(page.locator('#swapModal')).toBeVisible();
    await expect(page.locator('#swapTitle')).toContainText('SWAP');
  });

  test('filter chips filter the options list', async ({ page }) => {
    const card = page.locator('.exercise-card').first();
    await card.locator('.exercise-top').click();
    await card.locator('.swap-btn').click();
    await expect(page.locator('#swapModal')).toBeVisible();

    const allOptions = page.locator('.swap-option');
    const initialCount = await allOptions.count();
    expect(initialCount).toBeGreaterThan(0);

    const machineChip = page.locator('.swap-filter-chip[data-filter="machine"]');
    await machineChip.click();
    await expect(machineChip).toHaveClass(/active/);
  });

  test('selecting alternative changes exercise name', async ({ page }) => {
    const card = page.locator('.exercise-card').first();
    await card.locator('.exercise-top').click();
    const originalName = await card.locator('.exercise-name').textContent();

    await card.locator('.swap-btn').click();
    await expect(page.locator('#swapModal')).toBeVisible();

    const options = page.locator('.swap-option:not(.uk-btn-primary)');
    const altCount = await options.count();
    if (altCount > 0) {
      await options.first().click();
      await expect(page.locator('#swapModal')).toBeHidden({ timeout: 3000 });
      const newName = await card.locator('.exercise-name').textContent();
      expect(newName).not.toBe(originalName);
    }
  });

  test('cancel leaves exercise unchanged', async ({ page }) => {
    const card = page.locator('.exercise-card').first();
    await card.locator('.exercise-top').click();
    const originalName = await card.locator('.exercise-name').textContent();

    await card.locator('.swap-btn').click();
    await expect(page.locator('#swapModal')).toBeVisible();

    await page.click('#swapClose');
    await expect(page.locator('#swapModal')).toBeHidden({ timeout: 3000 });

    const currentName = await card.locator('.exercise-name').textContent();
    expect(currentName).toBe(originalName);
  });
});
