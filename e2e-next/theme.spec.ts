import { expect, test } from '@playwright/test'

test.describe('Theme', () => {
  test('settings page has theme selector', async ({ page }) => {
    await page.goto('/settings')
    await expect(page.getByText('THEME')).toBeVisible()
  })

  test('info page has terminology section', async ({ page }) => {
    await page.goto('/info')
    await expect(page.getByText('TERMINOLOGY')).toBeVisible()
    await expect(page.getByText('RIR')).toBeVisible()
    await expect(page.getByText('AMRAP')).toBeVisible()
  })
})
