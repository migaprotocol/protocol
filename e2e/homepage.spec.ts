import { test, expect } from '@playwright/test';

test.describe('MIGA Protocol Homepage', () => {
  test('loads homepage successfully', async ({ page }) => {
    await page.goto('/');

    // Wait for DOM to be ready (don't wait for all network requests)
    await page.waitForLoadState('domcontentloaded');

    // Check that the page has a title
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
  });

  test('displays MIGA branding', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Look for MIGA text somewhere on the page
    const migaText = page.getByText(/MIGA/i).first();
    await expect(migaText).toBeVisible({ timeout: 10000 });
  });

  test('3D scene container is present', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Canvas for Three.js should be present
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible({ timeout: 15000 });
  });
});
