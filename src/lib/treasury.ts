// MIGA Treasury — Real On-Chain Balance Fetcher
//
// Fetches actual treasury wallet balances from public APIs.
// 7 consolidated chains: BTC, ETH (incl. L2s), BNB, SOL, XRP, TON, LUX
// All stablecoins auto-swap to native asset (ETH via Uniswap, etc.)

export const FUND_TARGET = 100_000_000 // $100M goal

// Treasury wallet addresses
export const TREASURY = {
  BITCOIN:  'bc1qem8jywyuc9wtgf7y5n9tyq6tknpj3l85tzg9y6',
  EVM:      '0xAaf3a7253c73a58f2713f454717C5338c6573d62', // ETH, Base, OP, Arb, BSC
  SOLANA:   'BPTZhkTdRwqnrb7PnWvi6SkCWQHcvUZrfaYvPkZ2YD8R',
  XRP:      'raBQUYdAhnnojJQ6Xi3eXztZ74ot24RDq1',
  TON:      'UQCx0_0l9AxIouVBxThCRAwO7Yrz6rpQGI-1CS7h-lwjqRTW',
  LUX:      '0x14542918a9032248ef30d9bc1d57983691e3ade4',
} as const

// EVM RPCs for balance queries
const EVM_RPCS: Record<string, string> = {
  ethereum: 'https://eth.llamarpc.com',
  base:     'https://mainnet.base.org',
  optimism: 'https://mainnet.optimism.io',
  arbitrum: 'https://arb1.arbitrum.io/rpc',
  bsc:      'https://bsc-dataseed.binance.org',
  lux:      'https://api.lux.network',
}

// CoinGecko IDs for price lookup
const COINGECKO_IDS: Record<string, string> = {
  BTC: 'bitcoin',
  ETH: 'ethereum',
  BNB: 'binancecoin',
  SOL: 'solana',
  XRP: 'ripple',
  TON: 'the-open-network',
  LUX: 'lux-network',
}

export interface ChainBalance {
  id: string
  name: string
  symbol: string
  color: string
  icon: string
  nativeBalance: number
  usdValue: number
  price: number
  subChains?: string[] // e.g., ETH includes Base, OP, Arb
}

export interface TreasuryState {
  chains: ChainBalance[]
  totalUsd: number
  progressPct: number
  lastUpdated: number
}

// --- Fetchers ---

async function fetchJson(url: string, init?: RequestInit): Promise<any> {
  try {
    const res = await fetch(url, { ...init, signal: AbortSignal.timeout(8000) })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

async function fetchBtcBalance(): Promise<number> {
  const data = await fetchJson(
    `https://blockstream.info/api/address/${TREASURY.BITCOIN}`
  )
  if (!data?.chain_stats) return 0
  const sats =
    (data.chain_stats.funded_txo_sum || 0) -
    (data.chain_stats.spent_txo_sum || 0)
  return Math.max(sats / 1e8, 0)
}

async function fetchEvmBalance(rpc: string, address: string): Promise<number> {
  const data = await fetchJson(rpc, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'eth_getBalance',
      params: [address, 'latest'],
      id: 1,
    }),
  })
  if (!data?.result) return 0
  return parseInt(data.result, 16) / 1e18
}

async function fetchSolBalance(): Promise<number> {
  const data = await fetchJson('https://api.mainnet-beta.solana.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'getBalance',
      params: [TREASURY.SOLANA],
      id: 1,
    }),
  })
  if (!data?.result?.value) return 0
  return data.result.value / 1e9
}

async function fetchXrpBalance(): Promise<number> {
  const data = await fetchJson(
    `https://api.xrpscan.com/api/v1/account/${TREASURY.XRP}`
  )
  if (!data?.xrpBalance) return 0
  return parseFloat(data.xrpBalance) || 0
}

async function fetchTonBalance(): Promise<number> {
  const data = await fetchJson(
    `https://toncenter.com/api/v2/getAddressBalance?address=${TREASURY.TON}`
  )
  if (!data?.result) return 0
  return parseInt(data.result) / 1e9
}

// Fetch USD prices from CoinGecko
async function fetchPrices(): Promise<Record<string, number>> {
  const ids = Object.values(COINGECKO_IDS).join(',')
  const data = await fetchJson(
    `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
  )
  if (!data) {
    // Fallback prices if API is down
    return { BTC: 100000, ETH: 3500, BNB: 600, SOL: 200, XRP: 2.5, TON: 5, LUX: 0.5 }
  }
  const prices: Record<string, number> = {}
  for (const [symbol, geckoId] of Object.entries(COINGECKO_IDS)) {
    prices[symbol] = data[geckoId]?.usd || 0
  }
  return prices
}

// --- Main Fetcher ---

export async function fetchTreasuryBalances(): Promise<TreasuryState> {
  // Fetch everything in parallel
  const [
    btcBalance,
    ethMainnet,
    ethBase,
    ethOptimism,
    ethArbitrum,
    bnbBalance,
    solBalance,
    xrpBalance,
    tonBalance,
    luxBalance,
    prices,
  ] = await Promise.all([
    fetchBtcBalance(),
    fetchEvmBalance(EVM_RPCS.ethereum, TREASURY.EVM),
    fetchEvmBalance(EVM_RPCS.base, TREASURY.EVM),
    fetchEvmBalance(EVM_RPCS.optimism, TREASURY.EVM),
    fetchEvmBalance(EVM_RPCS.arbitrum, TREASURY.EVM),
    fetchEvmBalance(EVM_RPCS.bsc, TREASURY.EVM),
    fetchSolBalance(),
    fetchXrpBalance(),
    fetchTonBalance(),
    fetchEvmBalance(EVM_RPCS.lux, TREASURY.LUX),
    fetchPrices(),
  ])

  // Consolidate ETH balance across all L2s
  const totalEth = ethMainnet + ethBase + ethOptimism + ethArbitrum

  const chains: ChainBalance[] = [
    {
      id: 'BITCOIN',
      name: 'Bitcoin',
      symbol: 'BTC',
      color: '#F7931A',
      icon: '/images/tokens/bitcoin.png',
      nativeBalance: btcBalance,
      usdValue: btcBalance * (prices.BTC || 0),
      price: prices.BTC || 0,
    },
    {
      id: 'ETHEREUM',
      name: 'Ethereum',
      symbol: 'ETH',
      color: '#627EEA',
      icon: '/images/tokens/ethereum.png',
      nativeBalance: totalEth,
      usdValue: totalEth * (prices.ETH || 0),
      price: prices.ETH || 0,
      subChains: ['Mainnet', 'Base', 'Optimism', 'Arbitrum'],
    },
    {
      id: 'BSC',
      name: 'BNB Chain',
      symbol: 'BNB',
      color: '#F0B90B',
      icon: '/images/tokens/bnb.png',
      nativeBalance: bnbBalance,
      usdValue: bnbBalance * (prices.BNB || 0),
      price: prices.BNB || 0,
    },
    {
      id: 'SOLANA',
      name: 'Solana',
      symbol: 'SOL',
      color: '#9945FF',
      icon: '/images/tokens/solana.png',
      nativeBalance: solBalance,
      usdValue: solBalance * (prices.SOL || 0),
      price: prices.SOL || 0,
    },
    {
      id: 'XRP',
      name: 'XRP Ledger',
      symbol: 'XRP',
      color: '#23292F',
      icon: '/images/tokens/xrp.png',
      nativeBalance: xrpBalance,
      usdValue: xrpBalance * (prices.XRP || 0),
      price: prices.XRP || 0,
    },
    {
      id: 'TON',
      name: 'TON',
      symbol: 'TON',
      color: '#0088CC',
      icon: '/images/tokens/ton.png',
      nativeBalance: tonBalance,
      usdValue: tonBalance * (prices.TON || 0),
      price: prices.TON || 0,
    },
    {
      id: 'LUX',
      name: 'Lux',
      symbol: 'LUX',
      color: '#C9A227',
      icon: '/images/tokens/lux.png',
      nativeBalance: luxBalance,
      usdValue: luxBalance * (prices.LUX || 0),
      price: prices.LUX || 0,
    },
  ]

  // Sort by USD value descending
  chains.sort((a, b) => b.usdValue - a.usdValue)

  const totalUsd = chains.reduce((sum, c) => sum + c.usdValue, 0)

  return {
    chains,
    totalUsd,
    progressPct: Math.min((totalUsd / FUND_TARGET) * 100, 100),
    lastUpdated: Date.now(),
  }
}

// --- React Hook ---

import { useState, useEffect, useCallback } from 'react'

const REFRESH_INTERVAL = 60_000 // 60s

export function useTreasury() {
  const [state, setState] = useState<TreasuryState>({
    chains: [],
    totalUsd: 0,
    progressPct: 0,
    lastUpdated: 0,
  })
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    try {
      const data = await fetchTreasuryBalances()
      setState(data)
    } catch {
      // Keep previous state on error
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
    const interval = setInterval(refresh, REFRESH_INTERVAL)
    return () => clearInterval(interval)
  }, [refresh])

  return { ...state, loading, refresh }
}

// --- Formatting ---

export function formatUsd(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`
  if (n > 0 && n < 1) return `$${n.toFixed(2)}`
  return `$${n.toFixed(0)}`
}

export function formatNative(n: number, symbol: string): string {
  if (symbol === 'BTC') return `${n.toFixed(4)} BTC`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K ${symbol}`
  return `${n.toFixed(2)} ${symbol}`
}
