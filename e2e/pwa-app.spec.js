import { test, expect } from './fixtures.js';
import { mockSupabaseAuth, loginViaOtp } from './supabase-mock.js';

test.describe('App Shell', () => {
  test('viewport meta has viewport-fit=cover', async ({ page }) => {
    await page.goto('/');
    const content = await page.locator('meta[name="viewport"]').getAttribute('content');
    expect(content).toContain('viewport-fit=cover');
  });

  test('Apple PWA meta tags present', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('meta[name="apple-mobile-web-app-capable"]')).toHaveAttribute('content', 'yes');
    await expect(page.locator('meta[name="apple-mobile-web-app-status-bar-style"]')).toHaveAttribute(
      'content',
      'black-translucent',
    );
    await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveAttribute('href', /\.png$/);
  });

  test('settings modal opens and closes after login', async ({ page }) => {
    await mockSupabaseAuth(page);
    await page.goto('/');
    await expect(page.locator('#login')).toBeVisible({ timeout: 5000 });
    await loginViaOtp(page);
    await page.click('#settingsBtn');
    await expect(page.locator('#settingsModal')).toBeVisible();
    await page.click('#settingsClose');
    await expect(page.locator('#settingsModal')).toBeHidden();
  });

  test('theme persists across reload', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('ironppl_theme', 'dark'));
    await page.reload();
    const hasDark = await page.locator('html').evaluate((el) => el.classList.contains('dark'));
    expect(hasDark).toBe(true);
  });

  test('theme toggle changes class on html', async ({ page }) => {
    await mockSupabaseAuth(page);
    await page.goto('/');
    await expect(page.locator('#login')).toBeVisible({ timeout: 5000 });
    await loginViaOtp(page);
    await page.click('#settingsBtn');
    await expect(page.locator('#settingsModal')).toBeVisible();
    await page.click('[data-theme="light"]');
    const hasLight = await page.locator('html').evaluate((el) => el.classList.contains('light'));
    expect(hasLight).toBe(true);
    await page.click('[data-theme="dark"]');
    const hasDark = await page.locator('html').evaluate((el) => el.classList.contains('dark'));
    expect(hasDark).toBe(true);
  });
});
