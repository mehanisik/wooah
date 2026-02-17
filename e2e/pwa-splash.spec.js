import { test, expect } from './fixtures.js';

test.describe('Splash Screen', () => {
  test('normal load hides splash and shows login', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#splash')).toBeHidden({ timeout: 5000 });
    await expect(page.locator('#login')).toBeVisible();
  });

  test('JS module blocked — 5s fallback shows login', async ({ page }) => {
    await page.route('**/assets/index-*.js', (route) => route.abort());
    await page.goto('/');
    await expect(page.locator('#login')).toBeVisible({ timeout: 7000 });
    await expect(page.locator('#splash')).toBeHidden();
  });

  test('Supabase init failure shows login', async ({ page }) => {
    await page.route('**/*.supabase.co/**', (route) => route.abort());
    await page.goto('/');
    await expect(page.locator('#login')).toBeVisible({ timeout: 5000 });
  });

  test('app stays hidden during unauthenticated load', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#login')).toBeVisible({ timeout: 5000 });
    const appDisplay = await page.locator('#app').evaluate((el) => getComputedStyle(el).display);
    expect(appDisplay).toBe('none');
  });
});
