import { expect, test } from '@playwright/test'

test.describe('Navigation', () => {
  test('redirects root to today workout', async ({ page }) => {
    await page.goto('/')
    await page.waitForURL(/\/workout\/\d|\/rest/)
    const url = page.url()
    expect(url).toMatch(/\/workout\/\d|\/rest/)
  })

  test('navigates between workout days', async ({ page }) => {
    await page.goto('/workout/0')
    await expect(page.locator('body')).toBeVisible()
    await page.goto('/workout/1')
    await expect(page.locator('body')).toBeVisible()
  })

  test('navigates to info page', async ({ page }) => {
    await page.goto('/info')
    await expect(page.getByText('PROGRESSIVE OVERLOAD')).toBeVisible()
  })

  test('navigates to stats page', async ({ page }) => {
    await page.goto('/stats')
    await expect(page.getByText('JOURNEY')).toBeVisible()
  })

  test('navigates to calendar page', async ({ page }) => {
    await page.goto('/calendar')
    await expect(page.getByText('CURRENT')).toBeVisible()
  })

  test('navigates to rest page', async ({ page }) => {
    await page.goto('/rest')
    await expect(page.getByText('REST DAY')).toBeVisible()
  })

  test('navigates to settings page', async ({ page }) => {
    await page.goto('/settings')
    await expect(page.getByText('SETTINGS')).toBeVisible()
  })

  test('navigates to photos page', async ({ page }) => {
    await page.goto('/photos')
    await expect(page.getByText('PHOTOS')).toBeVisible()
  })
})
