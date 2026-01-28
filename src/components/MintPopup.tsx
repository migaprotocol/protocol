import { useState, useEffect } from 'react'
import { X, Zap, TrendingUp } from 'lucide-react'
import { MIGA_CHAINS } from '@/components/bridge/networks'

interface ChainFunding {
  id: string
  name: string
  symbol: string
  color: string
  icon: string
  raised: number
  target: number
  minters: number
  enabled: boolean
}

// Simulated live funding data per chain
// In production this would come from on-chain reads
const FUNDING_DATA: ChainFunding[] = MIGA_CHAINS
  .filter(c => c.enabled && !c.isRedemptionNetwork)
  .map(c => ({
    id: c.id,
    name: c.name,
    symbol: c.nativeAsset,
    color: c.color,
    icon: c.icon,
    raised: 0,
    target: 0,
    minters: 0,
    enabled: c.enabled,
  }))

// Phase I target: $5M split across chains
const PHASE_TARGET = 5_000_000
const CHAIN_TARGETS: Record<string, number> = {
  BITCOIN: 1_500_000,
  ETHEREUM: 1_000_000,
  BASE: 300_000,
  OPTIMISM: 200_000,
  ARBITRUM: 200_000,
  BSC: 300_000,
  SOLANA: 800_000,
  XRP: 200_000,
  TON: 300_000,
  LUX: 200_000,
}

// Simulated raised amounts (demo)
const CHAIN_RAISED: Record<string, number> = {
  BITCOIN: 42_800,
  ETHEREUM: 128_500,
  BASE: 31_200,
  OPTIMISM: 8_400,
  ARBITRUM: 12_100,
  BSC: 18_700,
  SOLANA: 215_600,
  XRP: 5_300,
  TON: 9_800,
  LUX: 3_200,
}

const CHAIN_MINTERS: Record<string, number> = {
  BITCOIN: 34,
  ETHEREUM: 412,
  BASE: 187,
  OPTIMISM: 56,
  ARBITRUM: 89,
  BSC: 143,
  SOLANA: 1247,
  XRP: 28,
  TON: 67,
  LUX: 15,
}

function formatUSD(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`
  return `$${n.toFixed(0)}`
}

function formatNumber(n: number): string {
  return n.toLocaleString()
}

interface MintPopupProps {
  open: boolean
  onClose: () => void
  onSelectChain?: (chainId: string) => void
}

export function MintPopup({ open, onClose, onSelectChain }: MintPopupProps) {
  const [chains, setChains] = useState<ChainFunding[]>([])
  const [totalRaised, setTotalRaised] = useState(0)
  const [totalMinters, setTotalMinters] = useState(0)

  useEffect(() => {
    // Initialize with demo data
    const data = FUNDING_DATA.map(c => ({
      ...c,
      raised: CHAIN_RAISED[c.id] || 0,
      target: CHAIN_TARGETS[c.id] || 500_000,
      minters: CHAIN_MINTERS[c.id] || 0,
    }))
    setChains(data)
    setTotalRaised(data.reduce((sum, c) => sum + c.raised, 0))
    setTotalMinters(data.reduce((sum, c) => sum + c.minters, 0))
  }, [])

  // Simulate live updates
  useEffect(() => {
    if (!open) return
    const interval = setInterval(() => {
      setChains(prev => {
        const updated = prev.map(c => {
          // Random small increment to simulate live activity
          const bump = Math.random() < 0.3 ? Math.floor(Math.random() * 500) + 50 : 0
          const minterBump = bump > 0 && Math.random() < 0.2 ? 1 : 0
          return {
            ...c,
            raised: c.raised + bump,
            minters: c.minters + minterBump,
          }
        })
        setTotalRaised(updated.reduce((sum, c) => sum + c.raised, 0))
        setTotalMinters(updated.reduce((sum, c) => sum + c.minters, 0))
        return updated
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [open])

  if (!open) return null

  const totalPct = Math.min((totalRaised / PHASE_TARGET) * 100, 100)

  const handleMintOnChain = (chainId: string) => {
    onClose()
    if (onSelectChain) {
      onSelectChain(chainId)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Popup */}
      <div data-testid="mint-popup" className="relative w-full max-w-lg max-h-[85vh] overflow-hidden rounded-2xl bg-[#0D0D14] border border-[#FFD700]/20 shadow-2xl shadow-[#FFD700]/10">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#0D0D14] border-b border-white/10 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FFD700]/20 flex items-center justify-center">
                <Zap size={20} className="text-[#FFD700]" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Mint MIGA</h2>
                <p className="text-xs text-white/50">Phase I — Freedom Fund</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
              <X size={20} className="text-white/60" />
            </button>
          </div>

          {/* Total progress */}
          <div className="mt-4">
            <div className="flex items-end justify-between mb-2">
              <div>
                <span className="text-2xl font-bold text-[#FFD700]">{formatUSD(totalRaised)}</span>
                <span className="text-sm text-white/40 ml-2">/ {formatUSD(PHASE_TARGET)}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-white/50">
                <TrendingUp size={12} />
                <span>{formatNumber(totalMinters)} minters</span>
              </div>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] transition-all duration-1000"
                style={{ width: `${totalPct}%` }}
              />
            </div>
            <p className="text-xs text-white/30 mt-1">{totalPct.toFixed(1)}% of Phase I target</p>
          </div>
        </div>

        {/* Chain list */}
        <div className="overflow-y-auto px-6 py-4 space-y-3" style={{ maxHeight: 'calc(85vh - 200px)' }}>
          {chains.map(chain => {
            const pct = Math.min((chain.raised / chain.target) * 100, 100)
            return (
              <button
                key={chain.id}
                data-testid={`mint-chain-${chain.id}`}
                onClick={() => handleMintOnChain(chain.id)}
                className="w-full flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-transparent hover:border-[#FFD700]/30 transition-all group"
              >
                {/* Chain icon */}
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <img
                    src={chain.icon}
                    alt={chain.name}
                    className="w-6 h-6 object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none'
                    }}
                  />
                </div>

                {/* Info + progress */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-white group-hover:text-[#FFD700] transition-colors">
                      {chain.name}
                    </span>
                    <span className="text-xs text-white/50">{formatUSD(chain.raised)}</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: chain.color,
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px] text-white/30">{pct.toFixed(1)}%</span>
                    <span className="text-[10px] text-white/30">{chain.minters} minters</span>
                  </div>
                </div>

                {/* Mint CTA */}
                <div className="flex-shrink-0 px-3 py-1.5 rounded-lg bg-[#FFD700]/10 text-[#FFD700] text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Mint →
                </div>
              </button>
            )
          })}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-[#0D0D14] border-t border-white/10 px-6 py-3">
          <p className="text-[10px] text-amber-400/80 text-center font-medium mb-1">
            Mint is not live yet — preview only
          </p>
          <p className="text-[10px] text-white/30 text-center">
            100% of funds go to DAO treasury • Proportional distribution • 1 MIGA = 1 Vote
          </p>
        </div>
      </div>
    </div>
  )
}
