import { useState, useMemo } from 'react'
import { Calculator, TrendingUp, Coins, ArrowRight } from 'lucide-react'
import { useTreasury } from '@/lib/treasury'

const TOTAL_MIGA = 7_000_000_000 // 7B total supply
const BASE_PER_CHAIN = 1_000_000_000 // 1B base per chain

// Approximate prices for quick conversion (updated from treasury)
const TOKEN_SYMBOLS: Record<string, string> = {
  BITCOIN: 'BTC',
  ETHEREUM: 'ETH',
  BSC: 'BNB',
  SOLANA: 'SOL',
  XRP: 'XRP',
  TON: 'TON',
  LUX: 'LUX',
}

export function MigaCalculator() {
  const { chains, totalUsd, prices } = useTreasury()
  const [selectedChain, setSelectedChain] = useState('ETHEREUM')
  const [depositAmount, setDepositAmount] = useState<string>('1')
  const [inputMode, setInputMode] = useState<'native' | 'usd'>('native')

  // Calculate what the user would get
  const calculation = useMemo(() => {
    const amount = parseFloat(depositAmount) || 0
    const chain = chains.find(c => c.id === selectedChain)
    if (!chain || amount <= 0) return null

    // Get price for selected chain
    const price = prices[selectedChain] || 0
    const depositUsd = inputMode === 'native' ? amount * price : amount
    const depositNative = inputMode === 'native' ? amount : (price > 0 ? amount / price : 0)

    // Current state
    const currentChainUsd = chain.usdValue
    const currentTotalUsd = totalUsd

    // After deposit state
    const newChainUsd = currentChainUsd + depositUsd
    const newTotalUsd = currentTotalUsd + depositUsd

    // Calculate allocations
    const currentChainPct = currentTotalUsd > 0 ? currentChainUsd / currentTotalUsd : 1/7
    const newChainPct = newTotalUsd > 0 ? newChainUsd / newTotalUsd : 1/7

    const currentChainMiga = TOTAL_MIGA * currentChainPct
    const newChainMiga = TOTAL_MIGA * newChainPct

    // User's share of the chain's allocation
    // Their contribution as % of chain's total = their MIGA from chain's pool
    const userShareOfChain = newChainUsd > 0 ? depositUsd / newChainUsd : 0
    const userMiga = newChainMiga * userShareOfChain

    // Price per MIGA based on user's deposit
    const pricePerMiga = userMiga > 0 ? depositUsd / userMiga : 0

    // Bonus: how much extra MIGA the chain gets from this deposit
    const chainMigaGain = newChainMiga - currentChainMiga

    return {
      depositUsd,
      depositNative,
      userMiga,
      pricePerMiga,
      currentChainMiga,
      newChainMiga,
      chainMigaGain,
      currentChainPct: currentChainPct * 100,
      newChainPct: newChainPct * 100,
      chainSymbol: TOKEN_SYMBOLS[selectedChain] || selectedChain,
      chainName: chain.name,
      chainColor: chain.color,
    }
  }, [chains, selectedChain, depositAmount, inputMode, totalUsd, prices])

  const formatMiga = (num: number) => {
    if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(2)}B`
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(2)}M`
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`
    return num.toFixed(0)
  }

  const formatUsd = (num: number) => {
    if (num >= 1_000_000) return `$${(num / 1_000_000).toFixed(2)}M`
    if (num >= 1_000) return `$${(num / 1_000).toFixed(1)}K`
    return `$${num.toFixed(2)}`
  }

  return (
    <section id="calculator" className="section border-t border-white/[0.04] scroll-mt-32">
      <div className="container-lg">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFD36A]/10 border border-[#FFD36A]/20 rounded-full mb-6">
            <Calculator className="w-4 h-4 text-[#FFD36A]" />
            <span className="text-sm text-[#FFD36A] font-medium">MIGA Calculator</span>
          </div>
          <h2 className="mb-4">
            <span className="text-gradient-ember">How Much MIGA</span> Will You Get?
          </h2>
          <p className="body-md max-w-2xl mx-auto text-[#9999A5]">
            Your MIGA depends on which chain you deposit on and how much others deposit.
            The earlier you join, the better your rate.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Input Panel */}
            <div className="card bg-[#0f0f1a] border border-white/[0.06]">
              <h3 className="text-lg font-medium mb-6 flex items-center gap-2">
                <Coins className="w-5 h-5 text-[#FFD36A]" />
                Your Deposit
              </h3>

              {/* Chain Selector */}
              <div className="mb-6">
                <label className="text-sm text-[#6B6B7B] mb-2 block">Select Chain</label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {chains.map(chain => (
                    <button
                      key={chain.id}
                      onClick={() => setSelectedChain(chain.id)}
                      className={`
                        p-2 rounded-lg border transition-all flex flex-col items-center gap-1
                        ${selectedChain === chain.id
                          ? 'border-[#FFD36A] bg-[#FFD36A]/10'
                          : 'border-white/[0.06] hover:border-white/20'}
                      `}
                    >
                      <img src={chain.icon} alt={chain.symbol} className="w-6 h-6 rounded-full" />
                      <span className="text-[10px] text-[#9999A5]">{chain.symbol}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount Input */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm text-[#6B6B7B]">Amount</label>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setInputMode('native')}
                      className={`px-2 py-1 text-xs rounded ${inputMode === 'native' ? 'bg-[#FFD36A] text-black' : 'bg-white/5 text-[#9999A5]'}`}
                    >
                      {TOKEN_SYMBOLS[selectedChain]}
                    </button>
                    <button
                      onClick={() => setInputMode('usd')}
                      className={`px-2 py-1 text-xs rounded ${inputMode === 'usd' ? 'bg-[#FFD36A] text-black' : 'bg-white/5 text-[#9999A5]'}`}
                    >
                      USD
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full px-4 py-3 bg-black/30 border border-white/[0.06] rounded-lg text-xl font-mono focus:outline-none focus:border-[#FFD36A]/50"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B6B7B]">
                    {inputMode === 'native' ? TOKEN_SYMBOLS[selectedChain] : 'USD'}
                  </span>
                </div>
              </div>

              {/* Quick amounts */}
              <div className="flex gap-2 flex-wrap">
                {inputMode === 'native' ? (
                  <>
                    <button onClick={() => setDepositAmount('0.1')} className="px-3 py-1.5 text-xs bg-white/5 hover:bg-white/10 rounded-lg transition-colors">0.1</button>
                    <button onClick={() => setDepositAmount('0.5')} className="px-3 py-1.5 text-xs bg-white/5 hover:bg-white/10 rounded-lg transition-colors">0.5</button>
                    <button onClick={() => setDepositAmount('1')} className="px-3 py-1.5 text-xs bg-white/5 hover:bg-white/10 rounded-lg transition-colors">1</button>
                    <button onClick={() => setDepositAmount('5')} className="px-3 py-1.5 text-xs bg-white/5 hover:bg-white/10 rounded-lg transition-colors">5</button>
                    <button onClick={() => setDepositAmount('10')} className="px-3 py-1.5 text-xs bg-white/5 hover:bg-white/10 rounded-lg transition-colors">10</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setDepositAmount('100')} className="px-3 py-1.5 text-xs bg-white/5 hover:bg-white/10 rounded-lg transition-colors">$100</button>
                    <button onClick={() => setDepositAmount('500')} className="px-3 py-1.5 text-xs bg-white/5 hover:bg-white/10 rounded-lg transition-colors">$500</button>
                    <button onClick={() => setDepositAmount('1000')} className="px-3 py-1.5 text-xs bg-white/5 hover:bg-white/10 rounded-lg transition-colors">$1K</button>
                    <button onClick={() => setDepositAmount('5000')} className="px-3 py-1.5 text-xs bg-white/5 hover:bg-white/10 rounded-lg transition-colors">$5K</button>
                    <button onClick={() => setDepositAmount('10000')} className="px-3 py-1.5 text-xs bg-white/5 hover:bg-white/10 rounded-lg transition-colors">$10K</button>
                  </>
                )}
              </div>
            </div>

            {/* Results Panel */}
            <div className="card bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] border border-[#FFD36A]/20">
              <h3 className="text-lg font-medium mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#FFD36A]" />
                Your Estimated MIGA
              </h3>

              {calculation ? (
                <div className="space-y-6">
                  {/* Main result */}
                  <div className="text-center py-6 bg-black/20 rounded-xl">
                    <div className="text-4xl md:text-5xl font-bold text-gradient-ember mb-2">
                      {formatMiga(calculation.userMiga)}
                    </div>
                    <div className="text-sm text-[#9999A5]">MIGA tokens</div>
                  </div>

                  {/* Breakdown */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#6B6B7B]">Your deposit</span>
                      <span>
                        {calculation.depositNative.toFixed(4)} {calculation.chainSymbol}
                        <span className="text-[#6B6B7B] ml-1">({formatUsd(calculation.depositUsd)})</span>
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-[#6B6B7B]">Price per MIGA</span>
                      <span className="text-emerald-400">
                        ${calculation.pricePerMiga.toFixed(6)}
                      </span>
                    </div>

                    <div className="border-t border-white/[0.04] pt-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-[#6B6B7B]">{calculation.chainName} pool</span>
                        <div className="text-right">
                          <span>{formatMiga(calculation.currentChainMiga)}</span>
                          <ArrowRight className="w-3 h-3 inline mx-1 text-[#6B6B7B]" />
                          <span className="text-emerald-400">{formatMiga(calculation.newChainMiga)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-[#6B6B7B]">Chain share</span>
                      <div className="text-right">
                        <span>{calculation.currentChainPct.toFixed(1)}%</span>
                        <ArrowRight className="w-3 h-3 inline mx-1 text-[#6B6B7B]" />
                        <span className="text-emerald-400">{calculation.newChainPct.toFixed(1)}%</span>
                      </div>
                    </div>

                    {calculation.chainMigaGain > 0 && (
                      <div className="flex justify-between text-sm bg-emerald-500/10 p-2 rounded-lg">
                        <span className="text-emerald-400">Your deposit steals</span>
                        <span className="text-emerald-400 font-medium">
                          +{formatMiga(calculation.chainMigaGain)} for {calculation.chainName}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <a
                    href={`/mint/${selectedChain.toLowerCase()}`}
                    className="block w-full py-3 bg-[#FFD36A] text-black font-semibold rounded-lg text-center hover:bg-[#FFE57A] transition-colors"
                  >
                    Deposit on {calculation.chainName}
                  </a>
                </div>
              ) : (
                <div className="text-center py-12 text-[#6B6B7B]">
                  Enter an amount to see your estimated MIGA
                </div>
              )}
            </div>
          </div>

          {/* Comparison Table */}
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Compare All Chains</h3>
            <p className="text-sm text-[#6B6B7B] mb-4">
              Same deposit amount on different chains = different MIGA. Choose wisely.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-left py-3 px-4 text-[#6B6B7B] font-medium">Chain</th>
                    <th className="text-right py-3 px-4 text-[#6B6B7B] font-medium">Current Pool</th>
                    <th className="text-right py-3 px-4 text-[#6B6B7B] font-medium">Share %</th>
                    <th className="text-right py-3 px-4 text-[#6B6B7B] font-medium">
                      {calculation ? `${formatUsd(calculation.depositUsd)} gets you` : 'MIGA/USD'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {chains.map(chain => {
                    const depositUsd = calculation?.depositUsd || 1000
                    const currentPct = totalUsd > 0 ? chain.usdValue / totalUsd : 1/7
                    const newChainUsd = chain.usdValue + depositUsd
                    const newTotalUsd = totalUsd + depositUsd
                    const newPct = newTotalUsd > 0 ? newChainUsd / newTotalUsd : 1/7
                    const newChainMiga = TOTAL_MIGA * newPct
                    const userShare = newChainUsd > 0 ? depositUsd / newChainUsd : 0
                    const userMiga = newChainMiga * userShare

                    return (
                      <tr
                        key={chain.id}
                        className={`border-b border-white/[0.04] hover:bg-white/[0.02] cursor-pointer transition-colors ${selectedChain === chain.id ? 'bg-[#FFD36A]/5' : ''}`}
                        onClick={() => setSelectedChain(chain.id)}
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <img src={chain.icon} alt={chain.symbol} className="w-5 h-5 rounded-full" />
                            <span>{chain.name}</span>
                            {selectedChain === chain.id && (
                              <span className="text-[10px] px-1.5 py-0.5 bg-[#FFD36A]/20 text-[#FFD36A] rounded">Selected</span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right font-mono">
                          {formatMiga(TOTAL_MIGA * currentPct)}
                        </td>
                        <td className="py-3 px-4 text-right">
                          {(currentPct * 100).toFixed(1)}%
                        </td>
                        <td className="py-3 px-4 text-right font-mono text-emerald-400">
                          {formatMiga(userMiga)}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Note */}
          <div className="mt-6 p-4 bg-white/[0.02] border border-white/[0.06] rounded-lg">
            <p className="text-xs text-[#6B6B7B]">
              <strong className="text-[#9999A5]">Note:</strong> These estimates are based on current deposit levels and will change as more people deposit.
              The earlier you deposit, the better rate you get. All calculations use live on-chain data.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
