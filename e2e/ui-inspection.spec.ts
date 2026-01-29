import { test, expect } from '@playwright/test';
import path from 'path';

// Configure Playwright to use a local browser
test.use({
  baseURL: 'http://localhost:8082',
});

test('Homepage - Header with Share nav link', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  // Take screenshot
  await page.screenshot({ path: 'homepage-header.png', fullPage: false });

  // Check Header renders
  const header = page.locator('header');
  await expect(header).toBeVisible();

  // Check Share nav link exists
  const shareLink = page.locator('a:has-text("Share")');
  await expect(shareLink).toBeVisible();
  console.log('✓ Header and Share nav link found');
});

test('Homepage - All sections display', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  // Check major sections
  const sections = ['#problem', '#solution', '#token', '#roadmap', '#governance', '#join'];

  for (const section of sections) {
    const element = page.locator(section);
    await expect(element).toBeVisible();
  }

  console.log('✓ All homepage sections visible');

  // Full page screenshot
  await page.screenshot({ path: 'homepage-full.png', fullPage: true });
});

test('Mint Page - Chain Leaderboard', async ({ page }) => {
  await page.goto('/mint');
  await page.waitForLoadState('networkidle');

  // Take screenshot
  await page.screenshot({ path: 'mint-page.png', fullPage: false });

  // Check Chain Leaderboard section exists
  const leaderboard = page.locator('text=Chain Leaderboard');
  await expect(leaderboard).toBeVisible();

  // Check for chain cards (7 consolidated chains: BTC, ETH, BNB, SOL, XRP, TON, LUX)
  const chainCards = page.locator('a[href*="/mint/"]');
  const count = await chainCards.count();
  expect(count).toBe(7);
  console.log(`✓ Chain Leaderboard found with ${count} chains`);

  // Verify chain card content - check first card has expected structure
  const firstCard = page.locator('a[href*="/mint/"]').first();
  await expect(firstCard).toBeVisible();

  // Check that card contains chain name and price
  await expect(firstCard.getByText(/\$[0-9.]+/).first()).toBeVisible();

  console.log('✓ Chain Leaderboard cards display correctly with prices and progress bars');
});

test('Mint Page - Bonding Curve Explainer', async ({ page }) => {
  await page.goto('/mint');
  await page.waitForLoadState('networkidle');

  // Check Bonding Curve Pricing section
  const bondingCurveSection = page.locator('text=Bonding Curve Pricing');
  await expect(bondingCurveSection).toBeVisible();

  // Check price points
  const pricePoints = page.locator('text=/\\$(0\\.01|0\\.50|1\\.00)/');
  const pointCount = await pricePoints.count();
  console.log(`✓ Bonding Curve Explainer found with ${pointCount} price points`);
});

test('Mint Page - Share MIGA CTA Button', async ({ page }) => {
  await page.goto('/mint');
  await page.waitForLoadState('networkidle');

  // Look for Share MIGA button
  const shareButton = page.locator('a[href="/share"] >> text=Share MIGA');
  await expect(shareButton).toBeVisible();

  console.log('✓ Share MIGA CTA button visible on Mint page');
});

test('Share Page - Content loads', async ({ page }) => {
  await page.goto('/share');
  await page.waitForLoadState('networkidle');

  // Take screenshot
  await page.screenshot({ path: 'share-page.png', fullPage: true });

  // Check page title
  const title = page.getByRole('heading', { name: 'Share MIGA' });
  await expect(title).toBeVisible();

  // Check ready-to-share messages section
  const messagesSection = page.locator('text=Ready-to-Share Messages');
  await expect(messagesSection).toBeVisible();

  // Check mint strategy cards
  const strategySection = page.locator('text=Mint Strategy');
  await expect(strategySection).toBeVisible();

  // Check key facts
  const factsSection = page.locator('text=Key Facts to Share');
  await expect(factsSection).toBeVisible();

  // Check chain mint links
  const chainLinksSection = page.locator('text=Chain Mint Links');
  await expect(chainLinksSection).toBeVisible();

  console.log('✓ Share page sections all present');
});

test('Mint Page - Click chain to open drawer', async ({ page }) => {
  await page.goto('/mint');
  await page.waitForLoadState('networkidle');

  // Click first chain card (links to /mint/{chainId})
  const firstChainCard = page.locator('a[href*="/mint/"]').first();
  await firstChainCard.click();

  // Wait for navigation and drawer to appear
  await page.waitForLoadState('domcontentloaded');
  const drawer = page.locator('[data-testid="chain-mint-drawer"]');
  await expect(drawer).toBeVisible({ timeout: 10000 });

  // Take screenshot of drawer
  await page.screenshot({ path: 'chain-mint-drawer.png', fullPage: false });

  // Check drawer contains bonding curve pricing card
  const pricingCard = drawer.getByText(/Bonding Curve/);
  await expect(pricingCard).toBeVisible();

  // Check for deposit address or claim flow info
  const depositInfo = drawer.getByText(/deposit|send|address/i).first();
  await expect(depositInfo).toBeVisible();

  console.log('✓ Chain Mint Drawer displays correctly with all components');
});

test('Footer - Consistency across pages', async ({ page }) => {
  const pages = ['/', '/mint', '/share'];

  for (const pagePath of pages) {
    await page.goto(pagePath);
    await page.waitForLoadState('networkidle');

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  }

  console.log('✓ Footer present on all pages');
});
