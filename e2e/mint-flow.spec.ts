import { test, expect } from '@playwright/test';

// Increase default timeout for all tests

// Helper to wait for React hydration
async function waitForApp(page: any) {
  await page.waitForLoadState('domcontentloaded');
  // Wait for the hero mint button to be visible (indicates React has hydrated)
  await expect(page.locator('[data-testid="mint-button-hero"]')).toBeVisible({ timeout: 15000 });
}

test.describe('Full Mint Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await waitForApp(page);
  });

  test('hero "Mint MIGA" button opens MintPopup', async ({ page }) => {
    const mintBtn = page.locator('[data-testid="mint-button-hero"]');
    await mintBtn.click();

    // MintPopup should appear
    const popup = page.locator('[data-testid="mint-popup"]');
    await expect(popup).toBeVisible({ timeout: 10000 });

    // Should show "Mint MIGA" heading and goal info
    await expect(popup.getByText('Mint MIGA')).toBeVisible({ timeout: 10000 });
    await expect(popup.getByText(/% of goal/)).toBeVisible({ timeout: 10000 });
  });

  test('footer "Mint MIGA" button opens MintPopup', async ({ page }) => {
    const footerBtn = page.locator('[data-testid="mint-button-footer"]');
    // Scroll down to make it visible
    await footerBtn.scrollIntoViewIfNeeded();
    await expect(footerBtn).toBeVisible({ timeout: 15000 });
    await footerBtn.click();

    const popup = page.locator('[data-testid="mint-popup"]');
    await expect(popup).toBeVisible({ timeout: 10000 });
  });

  test('MintPopup shows chain list with progress bars', async ({ page }) => {
    // Open popup
    await page.locator('[data-testid="mint-button-hero"]').click();
    const popup = page.locator('[data-testid="mint-popup"]');
    await expect(popup).toBeVisible({ timeout: 10000 });

    // Wait for chain buttons to render (they load async)
    const chainBtns = popup.locator('button[data-testid^="mint-chain-"]');
    await expect(chainBtns.first()).toBeVisible({ timeout: 15000 });

    // Should show 7 consolidated chain buttons (BTC, ETH, BNB, SOL, XRP, TON, LUX)
    const count = await chainBtns.count();
    expect(count).toBe(7);

    // Should show progress info
    await expect(popup.getByText(/% of goal/)).toBeVisible({ timeout: 10000 });

    // Should show chain count
    await expect(popup.getByText(/7 chains/)).toBeVisible({ timeout: 10000 });
  });

  test('MintPopup shows specific chains', async ({ page }) => {
    await page.locator('[data-testid="mint-button-hero"]').click();
    const popup = page.locator('[data-testid="mint-popup"]');
    await expect(popup).toBeVisible({ timeout: 10000 });

    // Wait for chain buttons to load first
    const chainBtns = popup.locator('button[data-testid^="mint-chain-"]');
    await expect(chainBtns.first()).toBeVisible({ timeout: 15000 });

    // Check for key chains
    for (const chain of ['Bitcoin', 'Ethereum', 'Solana']) {
      await expect(popup.getByText(chain)).toBeVisible({ timeout: 10000 });
    }
  });

  test('MintPopup close button works', async ({ page }) => {
    await page.locator('[data-testid="mint-button-hero"]').click();
    const popup = page.locator('[data-testid="mint-popup"]');
    await expect(popup).toBeVisible({ timeout: 10000 });

    // Click the X close button (inside the popup header)
    await popup.locator('button').filter({ has: page.locator('svg') }).first().click();

    // Popup should disappear
    await expect(popup).not.toBeVisible({ timeout: 10000 });
  });

  test('MintPopup backdrop click closes popup', async ({ page }) => {
    await page.locator('[data-testid="mint-button-hero"]').click();
    const popup = page.locator('[data-testid="mint-popup"]');
    await expect(popup).toBeVisible({ timeout: 10000 });

    // Click backdrop (the black overlay behind the popup)
    await page.locator('.absolute.inset-0.bg-black\\/80').click({ position: { x: 10, y: 10 } });

    await expect(popup).not.toBeVisible({ timeout: 10000 });
  });
});

test.describe('MintPopup → ChainMintDrawer Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await waitForApp(page);
  });

  test('clicking Ethereum in popup opens drawer with correct chain', async ({ page }) => {
    // Open popup
    await page.locator('[data-testid="mint-button-hero"]').click();
    await expect(page.locator('[data-testid="mint-popup"]')).toBeVisible({ timeout: 10000 });

    // Wait for chain buttons to load, then click Ethereum
    const ethBtn = page.locator('[data-testid="mint-chain-ETHEREUM"]');
    await expect(ethBtn).toBeVisible({ timeout: 15000 });
    await ethBtn.click();

    // Popup should close
    await expect(page.locator('[data-testid="mint-popup"]')).not.toBeVisible({ timeout: 10000 });

    // Drawer should open with Ethereum branding
    const drawer = page.locator('[data-testid="chain-mint-drawer"]');
    await expect(drawer).toBeVisible({ timeout: 10000 });
    await expect(drawer.getByText('Mint on Ethereum')).toBeVisible({ timeout: 10000 });
    await expect(drawer.getByText(/Send ETH/)).toBeVisible({ timeout: 10000 });
  });

  test('clicking Bitcoin in popup opens drawer with correct chain', async ({ page }) => {
    await page.locator('[data-testid="mint-button-hero"]').click();
    await expect(page.locator('[data-testid="mint-popup"]')).toBeVisible({ timeout: 10000 });

    // Wait for chain buttons to load
    const btcBtn = page.locator('[data-testid="mint-chain-BITCOIN"]');
    await expect(btcBtn).toBeVisible({ timeout: 15000 });
    await btcBtn.click();

    const drawer = page.locator('[data-testid="chain-mint-drawer"]');
    await expect(drawer).toBeVisible({ timeout: 10000 });
    await expect(drawer.getByText('Mint on Bitcoin')).toBeVisible({ timeout: 10000 });
    await expect(drawer.getByText(/Send BTC/)).toBeVisible({ timeout: 10000 });
  });

  test('clicking Solana in popup opens drawer with correct chain', async ({ page }) => {
    await page.locator('[data-testid="mint-button-hero"]').click();
    await expect(page.locator('[data-testid="mint-popup"]')).toBeVisible({ timeout: 10000 });

    // Wait for chain buttons to load
    const solBtn = page.locator('[data-testid="mint-chain-SOLANA"]');
    await expect(solBtn).toBeVisible({ timeout: 15000 });
    await solBtn.click();

    const drawer = page.locator('[data-testid="chain-mint-drawer"]');
    await expect(drawer).toBeVisible({ timeout: 10000 });
    await expect(drawer.getByText('Mint on Solana')).toBeVisible({ timeout: 10000 });
    await expect(drawer.getByText(/Send SOL/)).toBeVisible({ timeout: 10000 });
  });
});

test.describe('ChainMintDrawer Details', () => {
  async function openDrawerForChain(page: any, chainId: string) {
    await page.goto('/');
    await waitForApp(page);
    await page.locator('[data-testid="mint-button-hero"]').click();
    const popup = page.locator('[data-testid="mint-popup"]');
    await expect(popup).toBeVisible({ timeout: 10000 });
    // Wait for chain buttons to load before clicking
    const chainBtn = page.locator(`[data-testid="mint-chain-${chainId}"]`);
    await expect(chainBtn).toBeVisible({ timeout: 15000 });
    await chainBtn.click();
    await expect(page.locator('[data-testid="chain-mint-drawer"]')).toBeVisible({ timeout: 10000 });
  }

  async function enterReceivingAddress(page: any) {
    // Enter a valid EVM address to unlock the deposit section
    const input = page.locator('input[placeholder="0x..."]');
    await expect(input).toBeVisible({ timeout: 10000 });
    await input.fill('0x1234567890123456789012345678901234567890');
    // Wait for the deposit address to appear (indicates form has processed)
    await expect(page.locator('[data-testid="deposit-address"]')).toBeVisible({ timeout: 10000 });
  }

  test('drawer shows deposit address after entering receiving address', async ({ page }) => {
    await openDrawerForChain(page, 'ETHEREUM');
    await enterReceivingAddress(page);

    const address = page.locator('[data-testid="deposit-address"]');
    await expect(address).toBeVisible({ timeout: 10000 });
  });

  test('drawer shows memo for XRP after entering receiving address', async ({ page }) => {
    await openDrawerForChain(page, 'XRP');

    const drawer = page.locator('[data-testid="chain-mint-drawer"]');
    await expect(drawer.getByText('Mint on XRP')).toBeVisible({ timeout: 10000 });

    await enterReceivingAddress(page);

    // XRP requires a memo
    const memo = page.locator('[data-testid="memo-section"]');
    await expect(memo).toBeVisible({ timeout: 10000 });
    await expect(memo.getByText('Memo Required')).toBeVisible({ timeout: 10000 });
  });

  test('drawer shows memo for TON after entering receiving address', async ({ page }) => {
    await openDrawerForChain(page, 'TON');

    const drawer = page.locator('[data-testid="chain-mint-drawer"]');
    await expect(drawer.getByText('Mint on TON')).toBeVisible({ timeout: 10000 });

    await enterReceivingAddress(page);

    // TON requires a memo
    const memo = page.locator('[data-testid="memo-section"]');
    await expect(memo).toBeVisible({ timeout: 10000 });
    await expect(memo.getByText('Memo Required')).toBeVisible({ timeout: 10000 });
  });

  test('drawer does NOT show memo for Ethereum', async ({ page }) => {
    await openDrawerForChain(page, 'ETHEREUM');
    await enterReceivingAddress(page);

    // Ethereum doesn't require a memo - wait a bit then check it's not there
    const memo = page.locator('[data-testid="memo-section"]');
    // Use a short timeout since we expect it to NOT be visible
    await expect(memo).not.toBeVisible({ timeout: 3000 });
  });

  test('drawer shows 3-step indicator', async ({ page }) => {
    await openDrawerForChain(page, 'ETHEREUM');

    const drawer = page.locator('[data-testid="chain-mint-drawer"]');
    // Actual step labels in the component (inside span elements)
    await expect(drawer.locator('span').getByText('Your Address')).toBeVisible({ timeout: 10000 });
    await expect(drawer.locator('span').getByText('Send Funds')).toBeVisible({ timeout: 10000 });
    await expect(drawer.locator('span').getByText('Claim MIGA', { exact: true })).toBeVisible({ timeout: 10000 });
  });

  test('drawer shows DAO treasury label after entering address', async ({ page }) => {
    await openDrawerForChain(page, 'ETHEREUM');
    await enterReceivingAddress(page);

    const drawer = page.locator('[data-testid="chain-mint-drawer"]');
    await expect(drawer.getByText('DAO Treasury Address', { exact: true })).toBeVisible({ timeout: 15000 });
  });

  test('drawer shows multi-sig security badge', async ({ page }) => {
    await openDrawerForChain(page, 'ETHEREUM');

    const drawer = page.locator('[data-testid="chain-mint-drawer"]');
    await expect(drawer.getByText(/Multi-sig secured/)).toBeVisible({ timeout: 10000 });
  });

  test('drawer close button works', async ({ page }) => {
    await openDrawerForChain(page, 'ETHEREUM');

    const drawer = page.locator('[data-testid="chain-mint-drawer"]');
    await expect(drawer).toBeVisible({ timeout: 10000 });

    // Click the X button in drawer header
    await drawer.locator('button').first().click();

    await expect(drawer).not.toBeVisible({ timeout: 10000 });
  });

  test('drawer backdrop click closes drawer', async ({ page }) => {
    await openDrawerForChain(page, 'ETHEREUM');

    const drawer = page.locator('[data-testid="chain-mint-drawer"]');
    await expect(drawer).toBeVisible({ timeout: 10000 });

    // Click backdrop
    await page.locator('.absolute.inset-0.bg-black\\/70').click({ position: { x: 10, y: 10 } });

    await expect(drawer).not.toBeVisible({ timeout: 10000 });
  });
});

test.describe('Full Round-Trip Flow', () => {
  test('open popup → select chain → view drawer → close → reopen', async ({ page }) => {
    await page.goto('/');
    await waitForApp(page);

    // Step 1: Open mint popup
    await page.locator('[data-testid="mint-button-hero"]').click();
    const popup = page.locator('[data-testid="mint-popup"]');
    await expect(popup).toBeVisible({ timeout: 10000 });

    // Step 2: Wait for chain buttons, then select Ethereum
    const ethBtn = page.locator('[data-testid="mint-chain-ETHEREUM"]');
    await expect(ethBtn).toBeVisible({ timeout: 15000 });
    await ethBtn.click();
    await expect(popup).not.toBeVisible({ timeout: 10000 });

    // Step 3: Drawer is visible with Ethereum details
    const drawer = page.locator('[data-testid="chain-mint-drawer"]');
    await expect(drawer).toBeVisible({ timeout: 10000 });
    await expect(drawer.getByText('Mint on Ethereum')).toBeVisible({ timeout: 10000 });

    // Enter receiving address to unlock deposit section
    const input = page.locator('input[placeholder="0x..."]');
    await expect(input).toBeVisible({ timeout: 10000 });
    await input.fill('0x1234567890123456789012345678901234567890');
    await expect(page.locator('[data-testid="deposit-address"]')).toBeVisible({ timeout: 10000 });

    // Step 4: Close drawer
    await page.locator('.absolute.inset-0.bg-black\\/70').click({ position: { x: 10, y: 10 } });
    await expect(drawer).not.toBeVisible({ timeout: 10000 });

    // Step 5: Re-open popup and select a different chain
    await page.locator('[data-testid="mint-button-hero"]').click();
    await expect(popup).toBeVisible({ timeout: 10000 });

    // Wait for chain buttons to load again
    const solBtn = page.locator('[data-testid="mint-chain-SOLANA"]');
    await expect(solBtn).toBeVisible({ timeout: 15000 });
    await solBtn.click();
    await expect(drawer).toBeVisible({ timeout: 10000 });
    await expect(drawer.getByText('Mint on Solana')).toBeVisible({ timeout: 10000 });
  });
});
