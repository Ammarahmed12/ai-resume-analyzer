import { test, expect } from '@playwright/test';

test('homepage should have the correct title and navbar', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Resumind/i);
  await expect(page.locator('nav')).toBeVisible();
}); 