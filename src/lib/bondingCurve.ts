// MIGA Bonding Curve - Per-Chain Pricing
//
// 7 consolidated chains. Each has its own bonding curve:
// - Starting price: $0.01 per MIGA
// - Ending price: $1.00 per MIGA (when chain target is reached)
// - Linear curve: price = 0.01 + 0.99 * (raised / chainTarget)
//
// Total target: $100M across all chains.
// Real on-chain balances from treasury.ts drive pricing.

export const TOTAL_SUPPLY = 1_000_000_000 // 1B MIGA total
export const FUND_TARGET = 100_000_000    // $100M goal
export const MIN_PRICE = 0.01             // Starting price per MIGA
export const MAX_PRICE = 1.00             // Ending price per MIGA

// 7 consolidated chains — static metadata
export const CONSOLIDATED_CHAINS = [
  { id: 'BITCOIN', name: 'Bitcoin', symbol: 'BTC', color: '#F7931A', icon: '/images/tokens/bitcoin.png' },
  { id: 'ETHEREUM', name: 'Ethereum', symbol: 'ETH', color: '#627EEA', icon: '/images/tokens/ethereum.png', subChains: ['Base', 'Optimism', 'Arbitrum'] },
  { id: 'BSC', name: 'BNB Chain', symbol: 'BNB', color: '#F0B90B', icon: '/images/tokens/bnb.png' },
  { id: 'SOLANA', name: 'Solana', symbol: 'SOL', color: '#9945FF', icon: '/images/tokens/solana.png' },
  { id: 'XRP', name: 'XRP Ledger', symbol: 'XRP', color: '#23292F', icon: '/images/tokens/xrp.png' },
  { id: 'TON', name: 'TON', symbol: 'TON', color: '#0088CC', icon: '/images/tokens/ton.png' },
  { id: 'LUX', name: 'Lux', symbol: 'LUX', color: '#C9A227', icon: '/images/tokens/lux.png' },
] as const

// Per-chain allocation (percentage of total target)
// ETH includes all L2s (Base, Optimism, Arbitrum)
export const CHAIN_ALLOCATIONS: Record<string, number> = {
  BITCOIN:   0.20, // 20% — $20M target
  ETHEREUM:  0.25, // 25% — $25M target (incl. L2s)
  BSC:       0.10, // 10% — $10M target
  SOLANA:    0.15, // 15% — $15M target
  XRP:       0.10, // 10% — $10M target
  TON:       0.10, // 10% — $10M target
  LUX:       0.10, // 10% — $10M target
}

// Max USD target per chain
export const CHAIN_MAX_USD: Record<string, number> = Object.fromEntries(
  Object.entries(CHAIN_ALLOCATIONS).map(([id, pct]) => [id, FUND_TARGET * pct])
)

// Map individual chain IDs (from networks.ts) to consolidated treasury chain IDs
export const TREASURY_CHAIN_MAP: Record<string, string> = {
  BITCOIN: 'BITCOIN',
  ETHEREUM: 'ETHEREUM',
  BASE: 'ETHEREUM',
  OPTIMISM: 'ETHEREUM',
  ARBITRUM: 'ETHEREUM',
  BSC: 'BSC',
  SOLANA: 'SOLANA',
  XRP: 'XRP',
  TON: 'TON',
  LUX: 'LUX',
}

/**
 * Calculate current mint price based on amount raised (USD) for a chain
 */
export function getMintPrice(raisedUsd: number, chainId: string): number {
  const id = TREASURY_CHAIN_MAP[chainId] || chainId
  const maxUsd = CHAIN_MAX_USD[id] || 0
  if (maxUsd === 0) return MAX_PRICE
  const progress = Math.min(raisedUsd / maxUsd, 1)
  return MIN_PRICE + (MAX_PRICE - MIN_PRICE) * progress
}

/**
 * Calculate how many MIGA tokens for a given USD amount
 */
export function getMigaForUsd(raisedUsd: number, chainId: string, usdAmount: number): number {
  const price = getMintPrice(raisedUsd, chainId)
  if (price === 0) return 0
  return usdAmount / price
}

/**
 * Get the percentage of target filled for a chain
 */
export function getChainProgress(raisedUsd: number, chainId: string): number {
  const id = TREASURY_CHAIN_MAP[chainId] || chainId
  const maxUsd = CHAIN_MAX_USD[id] || 0
  if (maxUsd === 0) return 0
  return Math.min((raisedUsd / maxUsd) * 100, 100)
}

/**
 * Get MIGA allocation for a chain
 */
export function getChainAllocation(chainId: string): number {
  const id = TREASURY_CHAIN_MAP[chainId] || chainId
  const pct = CHAIN_ALLOCATIONS[id] || 0
  return TOTAL_SUPPLY * pct
}

/**
 * Format MIGA amount
 */
export function formatMiga(amount: number): string {
  if (amount >= 1_000_000_000) return `${(amount / 1_000_000_000).toFixed(1)}B`
  if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(0)}M`
  if (amount >= 1_000) return `${(amount / 1_000).toFixed(0)}K`
  return amount.toFixed(0)
}
