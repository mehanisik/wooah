import { test, expect } from './fixtures.js';
import { mockSupabaseAuth, loginViaOtp } from './supabase-mock.js';

test.describe('Session Notes', () => {
  test.beforeEach(async ({ page }) => {
    await mockSupabaseAuth(page);
    await page.goto('/');
    await expect(page.locator('#login')).toBeVisible({ timeout: 5000 });
    await loginViaOtp(page);
    await expect(page.locator('.exercise-card').first()).toBeVisible({ timeout: 5000 });
  });

  test('session strip toggles open/closed', async ({ page }) => {
    const strip = page.locator('.session-strip').first();
    const toggle = strip.locator('[data-toggle-strip]');
    await toggle.click();
    await expect(strip).toHaveClass(/open/);
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');

    await toggle.click();
    await expect(strip).not.toHaveClass(/open/);
  });

  test('pill buttons activate on tap and deselect on re-tap', async ({ page }) => {
    const strip = page.locator('.session-strip').first();
    await strip.locator('[data-toggle-strip]').click();
    await expect(strip).toHaveClass(/open/);

    const pill = strip.locator('.pill-btn').first();
    await pill.click();
    await expect(pill).toHaveClass(/active/);

    await pill.click();
    await expect(pill).not.toHaveClass(/active/);
  });

  test('only one pill per group is active', async ({ page }) => {
    const strip = page.locator('.session-strip').first();
    await strip.locator('[data-toggle-strip]').click();

    const pillRow = strip.locator('.pill-row').first();
    const pills = pillRow.locator('.pill-btn');

    await pills.nth(0).click();
    await expect(pills.nth(0)).toHaveClass(/active/);

    await pills.nth(1).click();
    await expect(pills.nth(1)).toHaveClass(/active/);
    await expect(pills.nth(0)).not.toHaveClass(/active/);
  });

  test('exercise note area opens from pencil button', async ({ page }) => {
    const card = page.locator('.exercise-card').first();
    await card.locator('.exercise-top').click();
    await expect(card).toHaveClass(/open/);

    const noteBtn = card.locator('.exercise-note-btn');
    await noteBtn.click();

    const noteArea = card.locator('.exercise-note-area');
    await expect(noteArea).toBeVisible({ timeout: 3000 });
    await expect(noteArea.locator('textarea')).toBeVisible();
  });
});
