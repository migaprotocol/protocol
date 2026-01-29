// MIGA Bonding Curve - Per-Chain Pricing
//
// Each chain has its own bonding curve:
// - Starting price: $0.01 per MIGA
// - Ending price: $1.00 per MIGA (at max allocation)
// - Linear curve: price = 0.01 + 0.99 * (raised / maxAllocation)
//
// This creates arbitrage opportunity between chains —
// cheaper chains attract more minting until prices equalize.

export const TOTAL_SUPPLY = 1_000_000_000 // 1B MIGA total
export const MIN_PRICE = 0.01 // Starting price per MIGA
export const MAX_PRICE = 1.00 // Ending price per MIGA

// Per-chain allocation (percentage of total supply)
// Minting chains only — excludes redemption networks (Pars, SPC, Hanzo)
export const CHAIN_ALLOCATIONS: Record<string, number> = {
  BITCOIN:   0.20, // 20% — 200M MIGA
  ETHEREUM:  0.15, // 15% — 150M MIGA
  SOLANA:    0.15, // 15% — 150M MIGA
  BASE:      0.10, // 10% — 100M MIGA
  OPTIMISM:  0.05, //  5% —  50M MIGA
  ARBITRUM:  0.05, //  5% —  50M MIGA
  BSC:       0.05, //  5% —  50M MIGA
  XRP:       0.10, // 10% — 100M MIGA
  TON:       0.10, // 10% — 100M MIGA
  LUX:       0.05, //  5% —  50M MIGA
}

// Max USD allocation per chain (based on fully-minted average price ~$0.50)
// These represent the approximate USD value at average price across the curve
export const CHAIN_MAX_USD: Record<string, number> = {
  BITCOIN:   100_000_000, // $100M
  ETHEREUM:   75_000_000, // $75M
  SOLANA:     75_000_000, // $75M
  BASE:       50_000_000, // $50M
  OPTIMISM:   25_000_000, // $25M
  ARBITRUM:   25_000_000, // $25M
  BSC:        25_000_000, // $25M
  XRP:        50_000_000, // $50M
  TON:        50_000_000, // $50M
  LUX:        25_000_000, // $25M
}

// Current amounts raised per chain (mock data — starts at $0)
// In production this would come from on-chain data / API
export const CHAIN_RAISED: Record<string, number> = {
  BITCOIN:   0,
  ETHEREUM:  0,
  SOLANA:    0,
  BASE:      0,
  OPTIMISM:  0,
  ARBITRUM:  0,
  BSC:       0,
  XRP:       0,
  TON:       0,
  LUX:       0,
}

/**
 * Calculate current mint price for a chain based on amount raised
 */
export function getMintPrice(chainId: string): number {
  const maxUsd = CHAIN_MAX_USD[chainId] || 0
  const raised = CHAIN_RAISED[chainId] || 0
  if (maxUsd === 0) return MAX_PRICE
  const progress = Math.min(raised / maxUsd, 1)
  return MIN_PRICE + (MAX_PRICE - MIN_PRICE) * progress
}

/**
 * Calculate how many MIGA tokens you get for a given USD amount on a chain
 */
export function getMigaForUsd(chainId: string, usdAmount: number): number {
  const price = getMintPrice(chainId)
  if (price === 0) return 0
  return usdAmount / price
}

/**
 * Get the percentage of allocation filled for a chain
 */
export function getChainProgress(chainId: string): number {
  const maxUsd = CHAIN_MAX_USD[chainId] || 0
  const raised = CHAIN_RAISED[chainId] || 0
  if (maxUsd === 0) return 0
  return Math.min((raised / maxUsd) * 100, 100)
}

/**
 * Get MIGA allocation for a chain
 */
export function getChainAllocation(chainId: string): number {
  const pct = CHAIN_ALLOCATIONS[chainId] || 0
  return TOTAL_SUPPLY * pct
}

/**
 * Get total raised across all chains
 */
export function getTotalRaised(): number {
  return Object.values(CHAIN_RAISED).reduce((sum, v) => sum + v, 0)
}

/**
 * Format USD amount
 */
export function formatUsd(amount: number): string {
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(0)}K`
  return `$${amount.toFixed(2)}`
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
