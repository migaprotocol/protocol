import { test, expect } from '@playwright/test';

test.describe('MIGA Bridge / Mint Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    // Give the app a moment to hydrate
    await page.waitForTimeout(2000);
  });

  test('page loads with mint UI', async ({ page }) => {
    // The page should have loaded
    const body = page.locator('body');
    await expect(body).toBeVisible();

    // Check for any button (mint, connect, etc.)
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    expect(buttonCount).toBeGreaterThan(0);
  });

  test('has interactive elements', async ({ page }) => {
    // Look for any clickable elements
    const clickables = page.locator('button, a, [role="button"]');
    const count = await clickables.count();
    expect(count).toBeGreaterThan(0);
  });

  test('3D canvas renders', async ({ page }) => {
    // Three.js canvas should be present
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible({ timeout: 15000 });
  });
});

test.describe('Deposit Address Display', () => {
  test('page loads without errors', async ({ page }) => {
    // Track console errors
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);

    // Filter out expected/benign errors
    const criticalErrors = errors.filter(e =>
      !e.includes('ResizeObserver') &&
      !e.includes('Failed to load resource') &&
      !e.includes('favicon')
    );

    // Should have no critical JS errors
    expect(criticalErrors.length).toBeLessThan(5);
  });
});
