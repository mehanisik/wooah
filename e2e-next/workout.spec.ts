import { expect, test } from '@playwright/test'

test.describe('Workout Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/workout/0')
  })

  test('shows workout day info', async ({ page }) => {
    await expect(page.getByText('Push A')).toBeVisible()
  })

  test('shows exercise cards', async ({ page }) => {
    await expect(page.getByText('Flat Barbell Bench Press')).toBeVisible()
  })

  test('has set input rows', async ({ page }) => {
    const weightInputs = page.getByLabel('Weight')
    const count = await weightInputs.count()
    expect(count).toBeGreaterThan(0)
  })
})
