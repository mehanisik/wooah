import { test, expect } from './fixtures.js';

test.describe('Offline Behavior', () => {
  test('Supabase calls fail gracefully offline', async ({ page }) => {
    const errors = [];
    page.on('pageerror', (err) => errors.push(err.message));

    await page.route('**/*.supabase.co/**', (route) => route.abort());
    await page.goto('/');
    await expect(page.locator('#login')).toBeVisible({ timeout: 6000 });
    expect(errors.length).toBe(0);
  });
});
