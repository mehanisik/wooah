import { test, expect } from './fixtures.js';
import { mockSupabaseAuth, loginViaOtp } from './supabase-mock.js';

test.describe('Program Builder', () => {
  test.beforeEach(async ({ page }) => {
    await mockSupabaseAuth(page);
    await page.goto('/');
    await expect(page.locator('#login')).toBeVisible({ timeout: 5000 });
    await loginViaOtp(page);
    await expect(page.locator('.exercise-card').first()).toBeVisible({ timeout: 5000 });
  });

  test('edit mode toggle activates edit mode', async ({ page }) => {
    const editBtn = page.locator('#editModeToggle');
    await editBtn.click();
    await expect(editBtn).toHaveClass(/active/);
    await expect(page.locator('.page.uk-active')).toHaveClass(/edit-mode/);
  });

  test('edit controls show sets/reps/rest inputs', async ({ page }) => {
    await page.click('#editModeToggle');
    const controls = page.locator('.edit-controls').first();
    await expect(controls).toBeVisible();

    await expect(controls.locator('.edit-input[data-edit-field="sets"]')).toBeVisible();
    await expect(controls.locator('.edit-input[data-edit-field="reps"]')).toBeVisible();
    await expect(controls.locator('.edit-input[data-edit-field="rest"]')).toBeVisible();
  });

  test('editing sets value persists', async ({ page }) => {
    await page.click('#editModeToggle');
    const setsInput = page.locator('.edit-input[data-edit-field="sets"]').first();
    await setsInput.fill('5');
    await setsInput.dispatchEvent('change');

    await page.click('#editModeToggle');
    await page.click('#editModeToggle');

    const updatedInput = page.locator('.edit-input[data-edit-field="sets"]').first();
    await expect(updatedInput).toHaveValue('5');
  });

  test('remove exercise reduces card count', async ({ page }) => {
    await page.click('#editModeToggle');
    const initialCount = await page.locator('.exercise-card').count();

    await page.locator('.edit-remove-btn').first().click();

    const newCount = await page.locator('.exercise-card').count();
    expect(newCount).toBe(initialCount - 1);
  });

  test('add exercise opens picker modal', async ({ page }) => {
    await page.click('#editModeToggle');
    await page.click('#editAddExercise');
    await expect(page.locator('#exercisePickerModal')).toBeVisible();
    await expect(page.locator('#exercisePickerSearch')).toBeVisible();
  });

  test('picker search filters exercises', async ({ page }) => {
    await page.click('#editModeToggle');
    await page.click('#editAddExercise');
    await expect(page.locator('#exercisePickerModal')).toBeVisible();

    await page.fill('#exercisePickerSearch', 'curl');
    await page.waitForTimeout(300);
    const visible = page.locator('.picker-item:visible');
    const count = await visible.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < Math.min(count, 5); i++) {
      const text = await visible.nth(i).textContent();
      expect(text.toLowerCase()).toContain('curl');
    }
  });

  test('reset to default restores exercises', async ({ page }) => {
    await page.click('#editModeToggle');
    const initialCount = await page.locator('.exercise-card').count();

    await page.locator('.edit-remove-btn').first().click();
    await expect(page.locator('.exercise-card')).toHaveCount(initialCount - 1);

    // handleRemove re-renders page without edit controls; re-enter edit mode
    await page.click('#editModeToggle');
    await page.click('#editModeToggle');
    await expect(page.locator('#editResetDay')).toBeVisible({ timeout: 3000 });

    await page.click('#editResetDay');
    await expect(page.locator('.exercise-card')).toHaveCount(initialCount, { timeout: 5000 });
  });

  test('exit edit mode returns to normal view', async ({ page }) => {
    await page.click('#editModeToggle');
    await expect(page.locator('.edit-controls').first()).toBeVisible();

    await page.click('#editModeToggle');
    await expect(page.locator('#editModeToggle')).not.toHaveClass(/active/);
    await expect(page.locator('.edit-controls')).toHaveCount(0);
  });
});
