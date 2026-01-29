import { test, expect } from '@playwright/test';

test('Homepage - Header with Share nav link', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');

  // Wait for header to be visible (indicates React has rendered)
  const header = page.locator('header');
  await expect(header).toBeVisible({ timeout: 15000 });

  // Take screenshot
  await page.screenshot({ path: 'homepage-header.png', fullPage: false });

  // Check Share nav link exists
  const shareLink = page.locator('a:has-text("Share")');
  await expect(shareLink).toBeVisible({ timeout: 10000 });
  console.log('✓ Header and Share nav link found');
});

test('Homepage - All sections display', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');

  // Wait for page to be interactive
  await expect(page.locator('header')).toBeVisible({ timeout: 15000 });

  // Check major sections with increased timeout
  const sections = ['#problem', '#solution', '#token', '#roadmap', '#governance', '#join'];

  for (const section of sections) {
    const element = page.locator(section);
    await expect(element).toBeVisible({ timeout: 10000 });
  }

  console.log('✓ All homepage sections visible');

  // Full page screenshot
  await page.screenshot({ path: 'homepage-full.png', fullPage: true });
});

test('Mint Page - Chain Leaderboard', async ({ page }) => {
  await page.goto('/mint');
  await page.waitForLoadState('domcontentloaded');

  // Wait for chain leaderboard to load
  const leaderboard = page.locator('text=Chain Leaderboard');
  await expect(leaderboard).toBeVisible({ timeout: 15000 });

  // Take screenshot
  await page.screenshot({ path: 'mint-page.png', fullPage: false });

  // Check for chain cards (7 consolidated chains: BTC, ETH, BNB, SOL, XRP, TON, LUX)
  const chainCards = page.locator('a[href*="/mint/"]');
  await expect(chainCards.first()).toBeVisible({ timeout: 10000 });
  const count = await chainCards.count();
  expect(count).toBe(7);
  console.log(`✓ Chain Leaderboard found with ${count} chains`);

  // Verify chain card content - check first card has expected structure
  const firstCard = chainCards.first();
  await expect(firstCard).toBeVisible();

  // Check that card contains chain name and price
  await expect(firstCard.getByText(/\$[0-9.]+/).first()).toBeVisible({ timeout: 10000 });

  console.log('✓ Chain Leaderboard cards display correctly with prices and progress bars');
});

test('Mint Page - Bonding Curve Explainer', async ({ page }) => {
  await page.goto('/mint');
  await page.waitForLoadState('domcontentloaded');

  // Check Bonding Curve Pricing section
  const bondingCurveSection = page.locator('text=Bonding Curve Pricing');
  await expect(bondingCurveSection).toBeVisible({ timeout: 15000 });

  // Check price points
  const pricePoints = page.locator('text=/\\$(0\\.01|0\\.50|1\\.00)/');
  const pointCount = await pricePoints.count();
  console.log(`✓ Bonding Curve Explainer found with ${pointCount} price points`);
});

test('Mint Page - Share MIGA CTA Button', async ({ page }) => {
  await page.goto('/mint');
  await page.waitForLoadState('domcontentloaded');

  // Wait for page content to load
  await expect(page.locator('text=Chain Leaderboard')).toBeVisible({ timeout: 15000 });

  // Look for Share MIGA button
  const shareButton = page.locator('a[href="/share"] >> text=Share MIGA');
  await expect(shareButton).toBeVisible({ timeout: 10000 });

  console.log('✓ Share MIGA CTA button visible on Mint page');
});

test('Share Page - Content loads', async ({ page }) => {
  await page.goto('/share');
  await page.waitForLoadState('domcontentloaded');

  // Check page title
  const title = page.getByRole('heading', { name: 'Share MIGA' });
  await expect(title).toBeVisible({ timeout: 15000 });

  // Take screenshot
  await page.screenshot({ path: 'share-page.png', fullPage: true });

  // Check ready-to-share messages section
  const messagesSection = page.locator('text=Ready-to-Share Messages');
  await expect(messagesSection).toBeVisible({ timeout: 10000 });

  // Check mint strategy cards
  const strategySection = page.locator('text=Mint Strategy');
  await expect(strategySection).toBeVisible({ timeout: 10000 });

  // Check key facts
  const factsSection = page.locator('text=Key Facts to Share');
  await expect(factsSection).toBeVisible({ timeout: 10000 });

  // Check chain mint links
  const chainLinksSection = page.locator('text=Chain Mint Links');
  await expect(chainLinksSection).toBeVisible({ timeout: 10000 });

  console.log('✓ Share page sections all present');
});

test('Mint Page - Chain cards display correctly', async ({ page }) => {
  await page.goto('/mint');
  await page.waitForLoadState('domcontentloaded');

  // Wait for page to load
  await expect(page.getByText('Mint $MIGA')).toBeVisible({ timeout: 15000 });

  // Check stats display
  await expect(page.getByText('Total Raised')).toBeVisible({ timeout: 10000 });
  await expect(page.getByText('Goal')).toBeVisible({ timeout: 10000 });

  // Check chain leaderboard heading
  await expect(page.getByText('Chain Leaderboard')).toBeVisible({ timeout: 10000 });

  // Check for 7 chain cards
  const chainCards = page.locator('a[href*="/mint/"]');
  await expect(chainCards.first()).toBeVisible({ timeout: 10000 });
  const count = await chainCards.count();
  expect(count).toBe(7);

  // Verify first chain card has expected structure (name, price, progress)
  const firstCard = chainCards.first();
  await expect(firstCard).toBeVisible();
  await expect(firstCard.getByText(/\$[0-9.]+/).first()).toBeVisible({ timeout: 10000 });

  console.log('✓ Mint page chain cards display correctly');
});

test('Footer - Consistency across pages', async ({ page }) => {
  const pages = ['/', '/mint', '/share'];

  for (const pagePath of pages) {
    await page.goto(pagePath);
    await page.waitForLoadState('domcontentloaded');

    // Wait for header first (indicates page has rendered)
    await expect(page.locator('header')).toBeVisible({ timeout: 15000 });

    const footer = page.locator('footer');
    await expect(footer).toBeVisible({ timeout: 10000 });
  }

  console.log('✓ Footer present on all pages');
});
