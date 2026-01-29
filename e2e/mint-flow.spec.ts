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

  async function enterReceivingAddress(page: any) {
    // Enter a valid EVM address to unlock the deposit section
    const input = page.locator('input[placeholder="0x..."]');
    await input.fill('0x1234567890123456789012345678901234567890');
    await page.waitForTimeout(500);
  }

  test('drawer shows deposit address after entering receiving address', async ({ page }) => {
    await openDrawerForChain(page, 'ETHEREUM');
    await enterReceivingAddress(page);

    const address = page.locator('[data-testid="deposit-address"]');
    await expect(address).toBeVisible({ timeout: 5000 });
  });

  test('drawer shows memo for XRP after entering receiving address', async ({ page }) => {
    await openDrawerForChain(page, 'XRP');

    const drawer = page.locator('[data-testid="chain-mint-drawer"]');
    await expect(drawer.getByText('Mint on XRP')).toBeVisible();

    await enterReceivingAddress(page);

    // XRP requires a memo
    const memo = page.locator('[data-testid="memo-section"]');
    await expect(memo).toBeVisible({ timeout: 5000 });
    await expect(memo.getByText('Memo Required')).toBeVisible();
  });

  test('drawer shows memo for TON after entering receiving address', async ({ page }) => {
    await openDrawerForChain(page, 'TON');

    const drawer = page.locator('[data-testid="chain-mint-drawer"]');
    await expect(drawer.getByText('Mint on TON')).toBeVisible();

    await enterReceivingAddress(page);

    // TON requires a memo
    const memo = page.locator('[data-testid="memo-section"]');
    await expect(memo).toBeVisible({ timeout: 5000 });
    await expect(memo.getByText('Memo Required')).toBeVisible();
  });

  test('drawer does NOT show memo for Ethereum', async ({ page }) => {
    await openDrawerForChain(page, 'ETHEREUM');
    await enterReceivingAddress(page);

    // Ethereum doesn't require a memo
    const memo = page.locator('[data-testid="memo-section"]');
    await expect(memo).not.toBeVisible();
  });

  test('drawer shows 3-step indicator', async ({ page }) => {
    await openDrawerForChain(page, 'ETHEREUM');

    const drawer = page.locator('[data-testid="chain-mint-drawer"]');
    // Actual step labels in the component (inside span elements)
    await expect(drawer.locator('span').getByText('Your Address')).toBeVisible();
    await expect(drawer.locator('span').getByText('Send Funds')).toBeVisible();
    await expect(drawer.locator('span').getByText('Claim MIGA', { exact: true })).toBeVisible();
  });

  test('drawer shows DAO treasury label after entering address', async ({ page }) => {
    await openDrawerForChain(page, 'ETHEREUM');
    await enterReceivingAddress(page);

    const drawer = page.locator('[data-testid="chain-mint-drawer"]');
    await expect(drawer.getByText('DAO Treasury Address')).toBeVisible({ timeout: 10000 });
  });

  test('drawer shows multi-sig security badge', async ({ page }) => {
    await openDrawerForChain(page, 'ETHEREUM');

    const drawer = page.locator('[data-testid="chain-mint-drawer"]');
    await expect(drawer.getByText(/Multi-sig secured/)).toBeVisible();
  });

  test('drawer close button works', async ({ page }) => {
    await openDrawerForChain(page, 'ETHEREUM');

    const drawer = page.locator('[data-testid="chain-mint-drawer"]');
    await expect(drawer).toBeVisible();

    // Click the X button in drawer header
    await drawer.locator('button').first().click();

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

    // Enter receiving address to unlock deposit section
    const input = page.locator('input[placeholder="0x..."]');
    await input.fill('0x1234567890123456789012345678901234567890');
    await page.waitForTimeout(500);
    await expect(page.locator('[data-testid="deposit-address"]')).toBeVisible({ timeout: 5000 });

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
