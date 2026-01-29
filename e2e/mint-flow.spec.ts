import { test, expect } from '@playwright/test';

test.describe('Full Mint Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    // Wait for React hydration
    await page.waitForTimeout(2000);
  });

  test('hero "Mint MIGA" button opens MintPopup', async ({ page }) => {
    const mintBtn = page.locator('[data-testid="mint-button-hero"]');
    await expect(mintBtn).toBeVisible({ timeout: 10000 });
    await mintBtn.click();

    // MintPopup should appear
    const popup = page.locator('[data-testid="mint-popup"]');
    await expect(popup).toBeVisible({ timeout: 5000 });

    // Should show "Mint MIGA" heading and goal info
    await expect(popup.getByText('Mint MIGA')).toBeVisible();
    await expect(popup.getByText(/% of goal/)).toBeVisible();
  });

  test('footer "Mint MIGA" button opens MintPopup', async ({ page }) => {
    const footerBtn = page.locator('[data-testid="mint-button-footer"]');
    // Scroll down to make it visible
    await footerBtn.scrollIntoViewIfNeeded();
    await expect(footerBtn).toBeVisible({ timeout: 10000 });
    await footerBtn.click();

    const popup = page.locator('[data-testid="mint-popup"]');
    await expect(popup).toBeVisible({ timeout: 5000 });
  });

  test('MintPopup shows chain list with progress bars', async ({ page }) => {
    // Open popup
    await page.locator('[data-testid="mint-button-hero"]').click();
    const popup = page.locator('[data-testid="mint-popup"]');
    await expect(popup).toBeVisible({ timeout: 5000 });

    // Should show 7 consolidated chain buttons (BTC, ETH, BNB, SOL, XRP, TON, LUX)
    const chainBtns = popup.locator('button[data-testid^="mint-chain-"]');
    const count = await chainBtns.count();
    expect(count).toBe(7);

    // Should show progress info
    await expect(popup.getByText(/% of goal/)).toBeVisible();

    // Should show chain count
    await expect(popup.getByText(/7 chains/)).toBeVisible();
  });

  test('MintPopup shows specific chains', async ({ page }) => {
    await page.locator('[data-testid="mint-button-hero"]').click();
    const popup = page.locator('[data-testid="mint-popup"]');
    await expect(popup).toBeVisible({ timeout: 5000 });

    // Check for key chains
    for (const chain of ['Bitcoin', 'Ethereum', 'Solana']) {
      await expect(popup.getByText(chain)).toBeVisible();
    }
  });

  test('MintPopup close button works', async ({ page }) => {
    await page.locator('[data-testid="mint-button-hero"]').click();
    const popup = page.locator('[data-testid="mint-popup"]');
    await expect(popup).toBeVisible({ timeout: 5000 });

    // Click the X close button (inside the popup header)
    await popup.locator('button').filter({ has: page.locator('svg') }).first().click();

    // Popup should disappear
    await expect(popup).not.toBeVisible({ timeout: 3000 });
  });

  test('MintPopup backdrop click closes popup', async ({ page }) => {
    await page.locator('[data-testid="mint-button-hero"]').click();
    const popup = page.locator('[data-testid="mint-popup"]');
    await expect(popup).toBeVisible({ timeout: 5000 });

    // Click backdrop (the black overlay behind the popup)
    await page.locator('.absolute.inset-0.bg-black\\/80').click({ position: { x: 10, y: 10 } });

    await expect(popup).not.toBeVisible({ timeout: 3000 });
  });
});

test.describe('MintPopup → ChainMintDrawer Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
  });

  test('clicking Ethereum in popup opens drawer with correct chain', async ({ page }) => {
    // Open popup
    await page.locator('[data-testid="mint-button-hero"]').click();
    await expect(page.locator('[data-testid="mint-popup"]')).toBeVisible({ timeout: 5000 });

    // Click Ethereum chain
    await page.locator('[data-testid="mint-chain-ETHEREUM"]').click();

    // Popup should close
    await expect(page.locator('[data-testid="mint-popup"]')).not.toBeVisible({ timeout: 3000 });

    // Drawer should open with Ethereum branding
    const drawer = page.locator('[data-testid="chain-mint-drawer"]');
    await expect(drawer).toBeVisible({ timeout: 5000 });
    await expect(drawer.getByText('Mint on Ethereum')).toBeVisible();
    await expect(drawer.getByText(/Send ETH/)).toBeVisible();
  });

  test('clicking Bitcoin in popup opens drawer with correct chain', async ({ page }) => {
    await page.locator('[data-testid="mint-button-hero"]').click();
    await expect(page.locator('[data-testid="mint-popup"]')).toBeVisible({ timeout: 5000 });

    await page.locator('[data-testid="mint-chain-BITCOIN"]').click();

    const drawer = page.locator('[data-testid="chain-mint-drawer"]');
    await expect(drawer).toBeVisible({ timeout: 5000 });
    await expect(drawer.getByText('Mint on Bitcoin')).toBeVisible();
    await expect(drawer.getByText(/Send BTC/)).toBeVisible();
  });

  test('clicking Solana in popup opens drawer with correct chain', async ({ page }) => {
    await page.locator('[data-testid="mint-button-hero"]').click();
    await expect(page.locator('[data-testid="mint-popup"]')).toBeVisible({ timeout: 5000 });

    await page.locator('[data-testid="mint-chain-SOLANA"]').click();

    const drawer = page.locator('[data-testid="chain-mint-drawer"]');
    await expect(drawer).toBeVisible({ timeout: 5000 });
    await expect(drawer.getByText('Mint on Solana')).toBeVisible();
    await expect(drawer.getByText(/Send SOL/)).toBeVisible();
  });
});

test.describe('ChainMintDrawer Details', () => {
  async function openDrawerForChain(page: any, chainId: string) {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    await page.locator('[data-testid="mint-button-hero"]').click();
    await expect(page.locator('[data-testid="mint-popup"]')).toBeVisible({ timeout: 5000 });
    await page.locator(`[data-testid="mint-chain-${chainId}"]`).click();
    await expect(page.locator('[data-testid="chain-mint-drawer"]')).toBeVisible({ timeout: 5000 });
  }

  test('drawer shows deposit address for Ethereum', async ({ page }) => {
    await openDrawerForChain(page, 'ETHEREUM');

    const address = page.locator('[data-testid="deposit-address"]');
    await expect(address).toBeVisible();

    // Should show actual EVM deposit address (starts with 0x)
    const text = await address.textContent();
    expect(text).toMatch(/^0x[a-fA-F0-9]+/);
  });

  test('drawer shows deposit address for Bitcoin', async ({ page }) => {
    await openDrawerForChain(page, 'BITCOIN');

    const address = page.locator('[data-testid="deposit-address"]');
    await expect(address).toBeVisible();

    // Bitcoin address starts with bc1
    const text = await address.textContent();
    expect(text).toMatch(/^bc1/);
  });

  test('drawer shows deposit address for Solana', async ({ page }) => {
    await openDrawerForChain(page, 'SOLANA');

    const address = page.locator('[data-testid="deposit-address"]');
    await expect(address).toBeVisible();

    // Solana address is base58
    const text = await address.textContent();
    expect(text!.length).toBeGreaterThan(30);
  });

  test('drawer shows memo for XRP', async ({ page }) => {
    await openDrawerForChain(page, 'XRP');

    const drawer = page.locator('[data-testid="chain-mint-drawer"]');
    await expect(drawer.getByText('Mint on XRP')).toBeVisible();

    // XRP requires a memo
    const memo = page.locator('[data-testid="memo-section"]');
    await expect(memo).toBeVisible();
    await expect(memo.getByText('Memo Required')).toBeVisible();
    await expect(memo.getByText(/must include this memo/)).toBeVisible();
  });

  test('drawer shows memo for TON', async ({ page }) => {
    await openDrawerForChain(page, 'TON');

    const drawer = page.locator('[data-testid="chain-mint-drawer"]');
    await expect(drawer.getByText('Mint on TON')).toBeVisible();

    // TON requires a memo
    const memo = page.locator('[data-testid="memo-section"]');
    await expect(memo).toBeVisible();
    await expect(memo.getByText('Memo Required')).toBeVisible();
  });

  test('drawer does NOT show memo for Ethereum', async ({ page }) => {
    await openDrawerForChain(page, 'ETHEREUM');

    // Ethereum doesn't require a memo
    const memo = page.locator('[data-testid="memo-section"]');
    await expect(memo).not.toBeVisible();
  });

  test('drawer shows 3-step indicator', async ({ page }) => {
    await openDrawerForChain(page, 'ETHEREUM');

    const drawer = page.locator('[data-testid="chain-mint-drawer"]');
    await expect(drawer.getByText('Select Asset')).toBeVisible();
    await expect(drawer.getByText('Send Payment')).toBeVisible();
    await expect(drawer.getByText('Receive MIGA')).toBeVisible();
  });

  test('drawer shows DAO treasury label', async ({ page }) => {
    await openDrawerForChain(page, 'ETHEREUM');

    const drawer = page.locator('[data-testid="chain-mint-drawer"]');
    await expect(drawer.getByText('DAO Treasury Address')).toBeVisible();
  });

  test('drawer shows MPC security badge', async ({ page }) => {
    await openDrawerForChain(page, 'ETHEREUM');

    const drawer = page.locator('[data-testid="chain-mint-drawer"]');
    await expect(drawer.getByText(/3-of-5 Utila MPC/)).toBeVisible();
  });

  test('drawer shows Lux Bridge link', async ({ page }) => {
    await openDrawerForChain(page, 'ETHEREUM');

    const drawer = page.locator('[data-testid="chain-mint-drawer"]');
    const bridgeLink = drawer.getByText('Use Lux Bridge for Cross-Chain Swaps');
    await expect(bridgeLink).toBeVisible();
  });

  test('drawer close button works', async ({ page }) => {
    await openDrawerForChain(page, 'ETHEREUM');

    const drawer = page.locator('[data-testid="chain-mint-drawer"]');
    await expect(drawer).toBeVisible();

    // Click the X button in drawer header
    await drawer.locator('button').filter({ has: page.locator('svg.text-white\\/60') }).first().click();

    await expect(drawer).not.toBeVisible({ timeout: 3000 });
  });

  test('drawer backdrop click closes drawer', async ({ page }) => {
    await openDrawerForChain(page, 'ETHEREUM');

    const drawer = page.locator('[data-testid="chain-mint-drawer"]');
    await expect(drawer).toBeVisible();

    // Click backdrop
    await page.locator('.absolute.inset-0.bg-black\\/70').click({ position: { x: 10, y: 10 } });

    await expect(drawer).not.toBeVisible({ timeout: 3000 });
  });
});

test.describe('Full Round-Trip Flow', () => {
  test('open popup → select chain → view drawer → close → reopen', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);

    // Step 1: Open mint popup
    await page.locator('[data-testid="mint-button-hero"]').click();
    const popup = page.locator('[data-testid="mint-popup"]');
    await expect(popup).toBeVisible({ timeout: 5000 });

    // Step 2: Select Ethereum
    await page.locator('[data-testid="mint-chain-ETHEREUM"]').click();
    await expect(popup).not.toBeVisible({ timeout: 3000 });

    // Step 3: Drawer is visible with Ethereum details
    const drawer = page.locator('[data-testid="chain-mint-drawer"]');
    await expect(drawer).toBeVisible({ timeout: 5000 });
    await expect(drawer.getByText('Mint on Ethereum')).toBeVisible();
    await expect(page.locator('[data-testid="deposit-address"]')).toBeVisible();

    // Step 4: Close drawer
    await page.locator('.absolute.inset-0.bg-black\\/70').click({ position: { x: 10, y: 10 } });
    await expect(drawer).not.toBeVisible({ timeout: 3000 });

    // Step 5: Re-open popup and select a different chain
    await page.locator('[data-testid="mint-button-hero"]').click();
    await expect(popup).toBeVisible({ timeout: 5000 });

    await page.locator('[data-testid="mint-chain-SOLANA"]').click();
    await expect(drawer).toBeVisible({ timeout: 5000 });
    await expect(drawer.getByText('Mint on Solana')).toBeVisible();
  });
});
