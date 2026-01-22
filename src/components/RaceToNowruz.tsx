import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Trophy, Flame, Clock, ExternalLink } from 'lucide-react'

// Nowruz 2025 - March 20, 2025 at 09:01 UTC (vernal equinox)
const NOWRUZ_DATE = new Date('2025-03-20T09:01:00Z')

// Chain data with live investment tracking
const chainRaceData = [
  {
    name: 'Solana',
    symbol: 'SOL',
    color: '#14F195',
    icon: '/images/tokens/solana.png',
    depositAmount: 125000,
    previousAmount: 118000, // For +/- calculation
    tokenAllocation: 0, // Will be calculated based on deposit ratio
    mintUrl: 'https://migaprotocol.xyz/mint/solana',
    status: 'live',
  },
  {
    name: 'Lux',
    symbol: 'LUX',
    color: '#FFD700',
    icon: '/images/tokens/lux.png',
    depositAmount: 89500,
    previousAmount: 82000,
    tokenAllocation: 0,
    mintUrl: 'https://migaprotocol.xyz/mint/lux',
    status: 'live',
  },
  {
    name: 'Zoo',
    symbol: 'ZOO',
    color: '#FF6B6B',
    icon: '/images/tokens/zoo.png',
    depositAmount: 67200,
    previousAmount: 61500,
    tokenAllocation: 0,
    mintUrl: 'https://migaprotocol.xyz/mint/zoo',
    status: 'live',
  },
  {
    name: 'Base',
    symbol: 'BASE',
    color: '#0052FF',
    icon: '/images/tokens/base.png',
    depositAmount: 42100,
    previousAmount: 38000,
    tokenAllocation: 0,
    mintUrl: 'https://migaprotocol.xyz/mint/base',
    status: 'next',
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    color: '#627EEA',
    icon: '/images/tokens/ethereum.png',
    depositAmount: 38500,
    previousAmount: 35000,
    tokenAllocation: 0,
    mintUrl: 'https://migaprotocol.xyz/mint/ethereum',
    status: 'next',
  },
  {
    name: 'TON',
    symbol: 'TON',
    color: '#0098EA',
    icon: '/images/tokens/ton.png',
    depositAmount: 28300,
    previousAmount: 25000,
    tokenAllocation: 0,
    mintUrl: 'https://migaprotocol.xyz/mint/ton',
    status: 'next',
  },
  {
    name: 'Mystery',
    symbol: '?',
    color: '#9D7AED',
    icon: '/images/tokens/mystery.png',
    depositAmount: 15200,
    previousAmount: 12000,
    tokenAllocation: 0,
    mintUrl: 'https://migaprotocol.xyz/vote',
    status: 'mystery',
  },
]

// Calculate token allocation based on deposit ratio
const totalDeposits = chainRaceData.reduce((sum, c) => sum + c.depositAmount, 0)
const FAIR_SALE_TOKENS = 2_800_000_000 // 40% of 7B = 2.8B tokens for fair sale

chainRaceData.forEach(chain => {
  chain.tokenAllocation = totalDeposits > 0
    ? Math.floor((chain.depositAmount / totalDeposits) * FAIR_SALE_TOKENS)
    : 0
})

// Sort by deposit amount for leaderboard
const sortedChains = [...chainRaceData].sort((a, b) => b.depositAmount - a.depositAmount)

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function RaceToNowruz() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [selectedChain, setSelectedChain] = useState<string | null>(null)

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
    <section className="section border-t border-white/[0.04] bg-gradient-to-b from-[#0A0A10] to-transparent">
      <div className="container-lg">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFD36A]/10 border border-[#FFD36A]/20 rounded-full mb-6">
            <Flame className="w-4 h-4 text-[#FFD36A]" />
            <span className="text-sm text-[#FFD36A] font-medium">Race to Nowruz</span>
          </div>
          <h2 className="mb-4">
            <span className="text-gradient-ember">7 Chains</span> compete for <span className="text-gradient-ember">2.8B</span> MIGA
          </h2>
          <p className="body-md max-w-2xl mx-auto">
            The more your chain invests, the more tokens it gets. Race ends at Nowruz.
            All proceeds fund the DAO treasury. 10% reserved for liquidity.
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="card bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] border border-[#FFD36A]/20">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Clock className="w-5 h-5 text-[#FFD36A]" />
              <span className="text-sm text-[#9999A5]">Sale ends at Nowruz 1404</span>
            </div>

            <div className="grid grid-cols-4 gap-4 text-center">
              {[
                { value: timeLeft.days, label: 'Days' },
                { value: timeLeft.hours, label: 'Hours' },
                { value: timeLeft.minutes, label: 'Minutes' },
                { value: timeLeft.seconds, label: 'Seconds' },
              ].map((item) => (
                <div key={item.label} className="p-4 bg-black/30 rounded-xl">
                  <div className="text-3xl md:text-5xl font-bold text-gradient-ember font-mono">
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
            <p className="text-sm text-[#6B6B7B]">Total Invested Across All Chains</p>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-medium flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#FFD36A]" />
              Chain Leaderboard
            </h3>
            <span className="text-sm text-[#6B6B7B]">Sorted by investment</span>
          </div>

          <div className="space-y-3">
            {sortedChains.map((chain, index) => {
              const percentOfTotal = totalDeposits > 0 ? (chain.depositAmount / totalDeposits) * 100 : 0
              const changePercent = getChangePercent(chain.depositAmount, chain.previousAmount)
              const isPositive = changePercent >= 0
              const isLeader = index === 0
              const isSelected = selectedChain === chain.symbol

              return (
                <div
                  key={chain.symbol}
                  onClick={() => setSelectedChain(isSelected ? null : chain.symbol)}
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
                      width: `${percentOfTotal}%`,
                      background: `linear-gradient(90deg, ${chain.color}40, transparent)`
                    }}
                  />

                  <div className="relative p-4 flex items-center gap-4">
                    {/* Rank */}
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                      ${index === 0 ? 'bg-[#FFD700] text-black' : ''}
                      ${index === 1 ? 'bg-[#C0C0C0] text-black' : ''}
                      ${index === 2 ? 'bg-[#CD7F32] text-black' : ''}
                      ${index > 2 ? 'bg-white/10 text-white/60' : ''}
                    `}>
                      {index + 1}
                    </div>

                    {/* Chain icon */}
                    <div
                      className="w-10 h-10 rounded-full overflow-hidden border-2"
                      style={{ borderColor: chain.color }}
                    >
                      <img src={chain.icon} alt={chain.name} className="w-full h-full object-cover" />
                    </div>

                    {/* Chain info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{chain.name}</span>
                        <span className="text-xs text-[#6B6B7B]">{chain.symbol}</span>
                        {chain.status === 'live' && (
                          <span className="text-[10px] px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 rounded">
                            LIVE
                          </span>
                        )}
                        {chain.status === 'mystery' && (
                          <span className="text-[10px] px-1.5 py-0.5 bg-purple-500/20 text-purple-400 rounded">
                            VOTE
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-[#6B6B7B]">
                        {formatTokens(chain.tokenAllocation)} MIGA allocation
                      </div>
                    </div>

                    {/* Investment amount */}
                    <div className="text-right">
                      <div className="font-bold text-lg" style={{ color: chain.color }}>
                        ${formatNumber(chain.depositAmount)}
                      </div>
                      <div className={`flex items-center justify-end gap-1 text-xs ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                        {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {isPositive ? '+' : ''}{changePercent.toFixed(1)}%
                      </div>
                    </div>

                    {/* Percentage of total */}
                    <div className="w-20 text-right">
                      <div className="text-sm font-medium">{percentOfTotal.toFixed(1)}%</div>
                      <div className="text-xs text-[#6B6B7B]">of total</div>
                    </div>
                  </div>

                  {/* Expanded details */}
                  {isSelected && (
                    <div className="px-4 pb-4 pt-2 border-t border-white/[0.04] grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-xs text-[#6B6B7B]">Token Allocation</div>
                        <div className="font-medium">{formatTokens(chain.tokenAllocation)}</div>
                      </div>
                      <div>
                        <div className="text-xs text-[#6B6B7B]">Share of Pool</div>
                        <div className="font-medium">{percentOfTotal.toFixed(2)}%</div>
                      </div>
                      <div>
                        <div className="text-xs text-[#6B6B7B]">24h Change</div>
                        <div className={`font-medium ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                          {isPositive ? '+' : ''}${formatNumber(chain.depositAmount - chain.previousAmount)}
                        </div>
                      </div>
                      <div>
                        <a
                          href={chain.mintUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-2 bg-[#FFD36A] text-black text-sm font-medium rounded-lg hover:bg-[#FFE57A] transition-colors"
                        >
                          {chain.status === 'mystery' ? 'Vote' : 'Invest'}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-sm text-[#9999A5] mb-4">
            Deposit to your chain's MPC wallet. Tokens distributed proportionally at Nowruz.
          </p>
          <a
            href="/mint"
            className="btn-primary inline-flex items-center gap-2"
          >
            Join the Race <Flame className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
