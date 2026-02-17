import { test, expect } from './fixtures.js';
import { mockSupabaseAuth, loginViaOtp, MOCK_USER } from './supabase-mock.js';

test.describe('Auth Flow', () => {
  test('invalid email shows error', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#login')).toBeVisible({ timeout: 5000 });
    await page.click('#loginSendCode');
    await expect(page.locator('#loginMsg')).toHaveText('Enter a valid email address');
  });

  test('email without @ shows error', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#login')).toBeVisible({ timeout: 5000 });
    await page.fill('#loginEmail', 'notanemail');
    await page.click('#loginSendCode');
    await expect(page.locator('#loginMsg')).toHaveText('Enter a valid email address');
  });

  test('SEND CODE transitions to OTP step', async ({ page }) => {
    await mockSupabaseAuth(page);
    await page.goto('/');
    await expect(page.locator('#login')).toBeVisible({ timeout: 5000 });
    await page.fill('#loginEmail', 'test@example.com');
    await page.click('#loginSendCode');
    await expect(page.locator('#loginOtpStep')).toBeVisible();
    await expect(page.locator('#loginEmailStep')).toBeHidden();
    await expect(page.locator('#loginMsg')).toHaveText('Check your email for the 6-digit code');
  });

  test('OTP back button returns to email step', async ({ page }) => {
    await mockSupabaseAuth(page);
    await page.goto('/');
    await expect(page.locator('#login')).toBeVisible({ timeout: 5000 });
    await page.fill('#loginEmail', 'test@example.com');
    await page.click('#loginSendCode');
    await expect(page.locator('#loginOtpStep')).toBeVisible();
    await page.click('#loginOtpBack');
    await expect(page.locator('#loginEmailStep')).toBeVisible();
    await expect(page.locator('#loginOtpStep')).toBeHidden();
  });

  test('short OTP code shows error', async ({ page }) => {
    await mockSupabaseAuth(page);
    await page.goto('/');
    await expect(page.locator('#login')).toBeVisible({ timeout: 5000 });
    await page.fill('#loginEmail', 'test@example.com');
    await page.click('#loginSendCode');
    await expect(page.locator('#loginOtpStep')).toBeVisible();
    await page.fill('#loginOtpInput', '12');
    await page.click('#loginVerifyOtp');
    await expect(page.locator('#loginMsg')).toHaveText('Enter the 6-digit code');
  });

  test('full OTP login shows app', async ({ page }) => {
    await mockSupabaseAuth(page);
    await page.goto('/');
    await expect(page.locator('#login')).toBeVisible({ timeout: 5000 });
    await loginViaOtp(page);
    await expect(page.locator('#app')).toBeVisible();
    await expect(page.locator('#login')).toBeHidden();
    await expect(page.locator('#splash')).toBeHidden();
    const email = await page.locator('#authStatus').textContent();
    expect(email).toBe(MOCK_USER.email);
  });

  test('sign out returns to login', async ({ page }) => {
    await mockSupabaseAuth(page);
    await page.goto('/');
    await expect(page.locator('#login')).toBeVisible({ timeout: 5000 });
    await loginViaOtp(page);
    await expect(page.locator('#app')).toBeVisible();
    await page.click('#settingsBtn');
    await expect(page.locator('#settingsModal')).toBeVisible();
    await page.click('#authSignOut');
    await expect(page.locator('#login')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('#app')).toBeHidden();
  });

  test('Google sign-in visible in standalone mode', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#login')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('#loginGoogle')).toBeVisible();
  });
});
