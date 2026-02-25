import { useState, useEffect, useRef } from 'react'
import { TrendingUp, TrendingDown, Trophy, Flame, Clock, ExternalLink, Users, Swords } from 'lucide-react'
import { useTreasury, type ChainBalance } from '@/lib/treasury'

// Nowruz 2025 - March 20, 2025 at 09:01 UTC (vernal equinox)
const NOWRUZ_DATE = new Date('2025-03-20T09:01:00Z')

// Chain metadata (icons, colors, mint URLs)
const CHAIN_META: Record<string, { color: string; mintUrl: string }> = {
  BITCOIN:  { color: '#F7931A', mintUrl: '/mint/bitcoin' },
  ETHEREUM: { color: '#627EEA', mintUrl: '/mint/ethereum' },
  BSC:      { color: '#F0B90B', mintUrl: '/mint/bnb' },
  SOLANA:   { color: '#9945FF', mintUrl: '/mint/solana' },
  XRP:      { color: '#23292F', mintUrl: '/mint/xrp' },
  TON:      { color: '#0088CC', mintUrl: '/mint/ton' },
  LUX:      { color: '#C9A227', mintUrl: '/mint/lux' },
}

// Token allocation: 7B MIGA total
// - Each chain STARTS with 1B MIGA allocation
// - Chains that deposit MORE steal from chains that deposit LESS
// - Final allocation = (your chain's USD / total USD) × 7B
// - Unsold allocation returns to DAO treasury
const TOTAL_MIGA = 7_000_000_000 // 7B total supply
const BASE_PER_CHAIN = 1_000_000_000 // 1B base allocation per chain

interface RaceChain extends ChainBalance {
  mintUrl: string
  previousAmount: number
  tokenAllocation: number
  allocationPct: number
  deltaFromBase: number // +/- from 1B base
  rank: number
}

function calculateAllocations(chains: ChainBalance[], previousAmounts: Record<string, number>): RaceChain[] {
  const totalDeposits = chains.reduce((sum, c) => sum + c.usdValue, 0)
  const sorted = [...chains].sort((a, b) => b.usdValue - a.usdValue)

  return sorted.map((chain, index) => {
    // Proportional allocation: your share = (your USD / total USD) × 7B
    // If equal deposits: each gets 1B (14.28%)
    // If you deposit MORE: you steal from weaker chains
    const allocationPct = totalDeposits > 0 ? chain.usdValue / totalDeposits : 1 / 7
    const allocation = TOTAL_MIGA * allocationPct
    const deltaFromBase = allocation - BASE_PER_CHAIN // +/- from 1B base

    const meta = CHAIN_META[chain.id] || { color: '#888', mintUrl: '/mint' }
    return {
      ...chain,
      mintUrl: meta.mintUrl,
      color: meta.color,
      previousAmount: previousAmounts[chain.id] || 0,
      tokenAllocation: Math.floor(allocation),
      allocationPct: allocationPct * 100,
      deltaFromBase: Math.floor(deltaFromBase),
      rank: index + 1,
    }
  })
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface RaceToNowruzProps {
  onSelectChain?: (chainId: string) => void
}

export function RaceToNowruz({ onSelectChain }: RaceToNowruzProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [selectedChain, setSelectedChain] = useState<string | null>(null)

  // Live treasury data from on-chain APIs
  const { chains, totalUsd, loading, isTestnet } = useTreasury()

  // Track previous amounts for 24h change calculation
  const previousAmountsRef = useRef<Record<string, number>>({})
  useEffect(() => {
    // Store current values as "previous" for next comparison (simplified 24h change)
    const newPrevious: Record<string, number> = {}
    chains.forEach(c => {
      // Only update previous if current is higher (deposits only increase)
      newPrevious[c.id] = previousAmountsRef.current[c.id] || c.usdValue * 0.95
    })
    previousAmountsRef.current = newPrevious
  }, [chains])

  // Calculate allocations with ranking bonuses
  const rankedChains = calculateAllocations(chains, previousAmountsRef.current)
  const totalDeposits = totalUsd

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = NOWRUZ_DATE.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatNumber = (num: number) => {
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(2)}M`
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`
    return num.toLocaleString()
  }

  const formatTokens = (num: number) => {
    if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(2)}B`
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`
    return num.toLocaleString()
  }

  const getChangePercent = (current: number, previous: number) => {
    if (previous === 0) return 0
    return ((current - previous) / previous) * 100
  }


  return (
    <section id="leaderboard" className="section border-t border-white/[0.04] bg-gradient-to-b from-[#0A0A10] to-transparent scroll-mt-32">
      <div className="container-lg">
        {/* Header */}
        <div className="text-center mb-12">
          {/* Testnet indicator */}
          {isTestnet && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-500/20 border border-orange-500/40 rounded-full mb-4 text-orange-400 text-xs font-medium">
              <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
              TESTNET MODE — Data from test networks
            </div>
          )}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFD36A]/10 border border-[#FFD36A]/20 rounded-full mb-6">
            <Swords className="w-4 h-4 text-[#FFD36A]" />
            <span className="text-sm text-[#FFD36A] font-medium">Race to Nowruz</span>
          </div>
          <h2 className="mb-4">
            <span className="text-gradient-ember">7 Chains Fight</span> for <span className="text-gradient-ember">7B MIGA</span>
          </h2>
          <p className="body-md max-w-2xl mx-auto">
            Each chain starts with <strong className="text-[#FFD36A]">1 Billion MIGA</strong>.
            {' '}Deposit more than other chains to <strong className="text-white">steal their allocation</strong>.
            {' '}Pre-sale ends at Nowruz — this is your window for the best prices. Token launches New Year's 2026.
          </p>
        </div>

        {/* How It Works */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-[#0f0f1a] border border-white/[0.06] rounded-xl text-center">
              <div className="text-2xl font-bold text-[#FFD36A] mb-1">1B</div>
              <div className="text-sm text-[#9999A5]">Starting allocation per chain</div>
            </div>
            <div className="p-4 bg-[#0f0f1a] border border-white/[0.06] rounded-xl text-center">
              <div className="text-2xl font-bold text-emerald-400 mb-1">+</div>
              <div className="text-sm text-[#9999A5]">Deposit more = steal from others</div>
            </div>
            <div className="p-4 bg-[#0f0f1a] border border-white/[0.06] rounded-xl text-center">
              <div className="text-2xl font-bold text-red-400 mb-1">−</div>
              <div className="text-sm text-[#9999A5]">Deposit less = lose allocation</div>
            </div>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="card bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] border border-[#FFD36A]/20">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Clock className="w-5 h-5 text-[#FFD36A]" />
              <span className="text-sm text-[#9999A5]">Pre-sale closes at Nowruz 1404 — Lock in the best price</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-center">
              {[
                { value: timeLeft.days, label: 'Days' },
                { value: timeLeft.hours, label: 'Hours' },
                { value: timeLeft.minutes, label: 'Minutes' },
                { value: timeLeft.seconds, label: 'Seconds' },
              ].map((item) => (
                <div key={item.label} className="p-3 sm:p-4 bg-black/30 rounded-xl">
                  <div className="text-2xl sm:text-3xl md:text-5xl font-bold text-gradient-ember font-mono">
                    {String(item.value).padStart(2, '0')}
                  </div>
                  <div className="text-xs text-[#6B6B7B] mt-1">{item.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-white/[0.04] text-center">
              <p className="text-sm text-[#9999A5]">
                March 20, 2025 • Persian New Year • نوروز ۱۴۰۴
              </p>
            </div>
          </div>
        </div>

        {/* Total Raised */}
        <div className="text-center mb-12">
          <div className="inline-block">
            <div className="text-5xl md:text-6xl font-bold text-gradient-ember mb-2">
              ${formatNumber(totalDeposits)}
            </div>
            <p className="text-sm text-[#6B6B7B]">Total Invested Across All 7 Chains</p>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-medium flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#FFD36A]" />
              Live Leaderboard
            </h3>
            <span className="text-sm text-[#6B6B7B]">Rankings update with each deposit</span>
          </div>

          <div className="space-y-3">
            {rankedChains.map((chain) => {
              const percentOfTotal = totalDeposits > 0 ? (chain.usdValue / totalDeposits) * 100 : 0
              const changePercent = getChangePercent(chain.usdValue, chain.previousAmount)
              const isPositive = changePercent >= 0
              const isLeader = chain.rank === 1
              const isSelected = selectedChain === chain.symbol

              return (
                <div
                  key={chain.symbol}
                  onClick={() => {
                    if (isSelected) {
                      // If already expanded, open deposit drawer
                      onSelectChain?.(chain.id)
                    } else {
                      // First click expands
                      setSelectedChain(chain.symbol)
                    }
                  }}
                  className={`
                    relative overflow-hidden rounded-xl border transition-all cursor-pointer
                    ${isLeader ? 'border-[#FFD36A]/50 bg-gradient-to-r from-[#FFD36A]/10 to-transparent' : 'border-white/[0.06] bg-[#0f0f1a]'}
                    ${isSelected ? 'ring-2 ring-[#FFD36A]/50' : ''}
                    hover:border-[#FFD36A]/30
                  `}
                >
                  {/* Progress bar background */}
                  <div
                    className="absolute inset-y-0 left-0 opacity-20"
                    style={{
                      width: `${Math.max(percentOfTotal, 5)}%`,
                      background: `linear-gradient(90deg, ${chain.color}40, transparent)`
                    }}
                  />

                  <div className="relative p-3 sm:p-4 flex items-center gap-2 sm:gap-4">
                    {/* Rank */}
                    <div className={`
                      w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm
                      ${chain.rank === 1 ? 'bg-[#FFD700] text-black' : ''}
                      ${chain.rank === 2 ? 'bg-[#C0C0C0] text-black' : ''}
                      ${chain.rank === 3 ? 'bg-[#CD7F32] text-black' : ''}
                      ${chain.rank > 3 ? 'bg-white/10 text-white/60' : ''}
                    `}>
                      {chain.rank}
                    </div>

                    {/* Chain icon */}
                    <div
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2"
                      style={{ borderColor: chain.color }}
                    >
                      <img src={chain.icon} alt={chain.name} className="w-full h-full object-cover" />
                    </div>

                    {/* Chain info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{chain.name}</span>
                        <span className="text-xs text-[#6B6B7B]">{chain.symbol}</span>
                        <span className="text-[10px] px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 rounded">
                          LIVE
                        </span>
                      </div>
                      <div className="text-xs flex items-center gap-2">
                        <span className="text-[#6B6B7B]">{formatTokens(chain.tokenAllocation)} MIGA</span>
                        <span className={chain.deltaFromBase >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                          ({chain.deltaFromBase >= 0 ? '+' : ''}{formatTokens(chain.deltaFromBase)} from 1B)
                        </span>
                      </div>
                    </div>

                    {/* Investment amount */}
                    <div className="text-right">
                      <div className="font-bold text-lg" style={{ color: chain.color }}>
                        ${formatNumber(chain.usdValue)}
                      </div>
                      <div className={`flex items-center justify-end gap-1 text-xs ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                        {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {isPositive ? '+' : ''}{changePercent.toFixed(1)}%
                      </div>
                    </div>

                    {/* Percentage of total - hidden on mobile */}
                    <div className="hidden sm:block w-20 text-right">
                      <div className="text-sm font-medium">{percentOfTotal.toFixed(1)}%</div>
                      <div className="text-xs text-[#6B6B7B]">of total</div>
                    </div>
                  </div>

                  {/* Expanded details */}
                  {isSelected && (
                    <div className="px-4 pb-4 pt-2 border-t border-white/[0.04] grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-xs text-[#6B6B7B]">Share of Total</div>
                        <div className="font-medium">{chain.allocationPct.toFixed(1)}%</div>
                      </div>
                      <div>
                        <div className="text-xs text-[#6B6B7B]">Gain/Loss from 1B</div>
                        <div className={`font-medium ${chain.deltaFromBase >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {chain.deltaFromBase >= 0 ? '+' : ''}{formatTokens(chain.deltaFromBase)}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-[#6B6B7B]">24h Change</div>
                        <div className={`font-medium ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                          {isPositive ? '+' : ''}${formatNumber(chain.usdValue - chain.previousAmount)}
                        </div>
                      </div>
                      <div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            onSelectChain?.(chain.id)
                          }}
                          className="inline-flex items-center gap-1 px-3 py-2 bg-[#FFD36A] text-black text-sm font-medium rounded-lg hover:bg-[#FFE57A] transition-colors"
                        >
                          Deposit Now <Swords className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Top Contributors */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-medium flex items-center gap-2">
              <Users className="w-5 h-5 text-[#FFD36A]" />
              Top Contributors
            </h3>
            <span className="text-sm text-[#6B6B7B]">Your name on the leaderboard</span>
          </div>

          <div className="card bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] border border-white/[0.06] text-center py-12">
            <div className="text-[#FFD36A] text-4xl mb-4">👑</div>
            <h4 className="text-lg font-medium mb-2">Be the First Champion</h4>
            <p className="text-sm text-[#9999A5] max-w-md mx-auto mb-6">
              Deposit on any chain to appear on the contributor leaderboard.
              Top contributors get recognition and exclusive benefits.
            </p>
            <a
              href="/mint"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#FFD36A] text-[#FFD36A] font-medium rounded-lg hover:bg-[#FFD36A] hover:text-black transition-all"
            >
              Join Now <Trophy className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-sm text-[#9999A5] mb-4">
            Contribute now for the best rates. Tokens distributed at launch (New Year's 2026).
          </p>
          <a
            href="/mint"
            className="btn-primary inline-flex items-center gap-2"
          >
            Join the Pre-Sale <Swords className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
