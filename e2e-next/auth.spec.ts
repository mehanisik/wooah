import { expect, type Page, test } from '@playwright/test'

async function clearAuthState(page: Page) {
  await page.goto('/')
  await page.evaluate(() => localStorage.clear())
  await page.reload()
  await expect(page.getByText('Push Pull Legs Tracker')).toBeVisible({
    timeout: 10_000,
  })
}

test.describe('Authentication', () => {
  test.describe('Login Page', () => {
    test.beforeEach(async ({ page }) => {
      await clearAuthState(page)
    })

    test('renders all login elements', async ({ page }) => {
      await expect(page.getByText('Push Pull Legs Tracker')).toBeVisible()
      await expect(page.getByPlaceholder('Email address')).toBeVisible()
      await expect(
        page.getByRole('button', { name: 'SEND CODE' })
      ).toBeVisible()
      await expect(page.getByText('OR')).toBeVisible()
      await expect(
        page.getByRole('button', { name: 'SIGN IN WITH GOOGLE' })
      ).toBeVisible()
    })

    test('send code button is disabled without email', async ({ page }) => {
      await expect(
        page.getByRole('button', { name: 'SEND CODE' })
      ).toBeDisabled()
    })

    test('send code button enables with valid email', async ({ page }) => {
      await page.getByPlaceholder('Email address').fill('test@example.com')
      await expect(
        page.getByRole('button', { name: 'SEND CODE' })
      ).toBeEnabled()
    })
  })

  test.describe('Email OTP Flow', () => {
    test.beforeEach(async ({ page }) => {
      await clearAuthState(page)
      await page.route(/\/auth\/v1\/otp/, async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({}),
        })
      })
    })

    test('transitions to verification form after sending code', async ({
      page,
    }) => {
      await page.getByPlaceholder('Email address').fill('test@example.com')
      await page.getByRole('button', { name: 'SEND CODE' }).click()

      await expect(
        page.getByText('Code sent to test@example.com')
      ).toBeVisible()
      await expect(page.getByPlaceholder('Enter code')).toBeVisible()
      await expect(page.getByRole('button', { name: 'VERIFY' })).toBeVisible()
      await expect(page.getByText('Use different email')).toBeVisible()
    })

    test('verify button is disabled with short code', async ({ page }) => {
      await page.getByPlaceholder('Email address').fill('test@example.com')
      await page.getByRole('button', { name: 'SEND CODE' }).click()
      await expect(page.getByPlaceholder('Enter code')).toBeVisible()

      await page.getByPlaceholder('Enter code').fill('12345')
      await expect(page.getByRole('button', { name: 'VERIFY' })).toBeDisabled()
    })

    test('"Use different email" returns to email form', async ({ page }) => {
      await page.getByPlaceholder('Email address').fill('test@example.com')
      await page.getByRole('button', { name: 'SEND CODE' }).click()
      await expect(
        page.getByText('Code sent to test@example.com')
      ).toBeVisible()

      await page.getByText('Use different email').click()

      await expect(page.getByPlaceholder('Email address')).toBeVisible()
      await expect(
        page.getByRole('button', { name: /SEND CODE|WAIT/ })
      ).toBeVisible()
    })

    test('shows error for invalid verification code', async ({ page }) => {
      await page.route(/\/auth\/v1\/token/, async (route) => {
        await route.fulfill({
          status: 403,
          contentType: 'application/json',
          body: JSON.stringify({
            error: 'otp_expired',
            error_description: 'Token has expired or is invalid',
          }),
        })
      })

      await page.getByPlaceholder('Email address').fill('test@example.com')
      await page.getByRole('button', { name: 'SEND CODE' }).click()
      await page.getByPlaceholder('Enter code').fill('123456')
      await page.getByRole('button', { name: 'VERIFY' }).click()

      await expect(
        page.getByText(/Token has expired|Invalid code/i)
      ).toBeVisible()
    })

    test('shows cooldown after sending code', async ({ page }) => {
      await page.getByPlaceholder('Email address').fill('test@example.com')
      await page.getByRole('button', { name: 'SEND CODE' }).click()
      await expect(
        page.getByText('Code sent to test@example.com')
      ).toBeVisible()

      await page.getByText('Use different email').click()
      await expect(
        page.getByRole('button', { name: /WAIT \d+s/ })
      ).toBeVisible()
    })
  })

  test.describe('Google OAuth', () => {
    test.beforeEach(async ({ page }) => {
      await clearAuthState(page)
    })

    test('initiates OAuth redirect to Supabase', async ({ page }) => {
      await page.route(/\/auth\/v1\/authorize/, async (route) => {
        await route.fulfill({ status: 200, body: '' })
      })

      const [request] = await Promise.all([
        page.waitForRequest((req) => req.url().includes('/auth/v1/authorize')),
        page.getByRole('button', { name: 'SIGN IN WITH GOOGLE' }).click(),
      ])

      const url = request.url()
      expect(url).toContain('provider=google')
      expect(url).toContain('redirect_to=')
    })
  })

  test.describe('Auth Guard', () => {
    test('protected routes show login page when unauthenticated', async ({
      page,
    }) => {
      await page.goto('/')
      await page.evaluate(() => localStorage.clear())

      const protectedRoutes = [
        '/workout/0',
        '/stats',
        '/settings',
        '/calendar',
        '/photos',
      ]

      for (const route of protectedRoutes) {
        await page.goto(route)
        await expect(page.getByText('Push Pull Legs Tracker')).toBeVisible({
          timeout: 10_000,
        })
      }
    })
  })
})
