import { X, Zap, TrendingUp, Loader2 } from 'lucide-react'
import { useTreasury, formatUsd, formatNative, FUND_TARGET } from '@/lib/treasury'

interface MintPopupProps {
  open: boolean
  onClose: () => void
  onSelectChain?: (chainId: string) => void
}

export function MintPopup({ open, onClose, onSelectChain }: MintPopupProps) {
  const { chains, totalUsd, progressPct, loading } = useTreasury()

  if (!open) return null

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
                <p className="text-xs text-white/50">Freedom Fund — on-chain treasury</p>
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
                <span className="text-2xl font-bold text-[#FFD700]">{formatUsd(totalUsd)}</span>
                <span className="text-sm text-white/40 ml-2">/ {formatUsd(FUND_TARGET)}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-white/50">
                {loading ? (
                  <Loader2 size={12} className="animate-spin" />
                ) : (
                  <TrendingUp size={12} />
                )}
                <span>{chains.length} chains</span>
              </div>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] transition-all duration-1000"
                style={{ width: `${Math.max(progressPct, 0.5)}%` }}
              />
            </div>
            <p className="text-xs text-white/30 mt-1">{progressPct.toFixed(1)}% of goal</p>
          </div>
        </div>

        {/* Chain list */}
        <div className="overflow-y-auto px-6 py-4 space-y-3" style={{ maxHeight: 'calc(85vh - 200px)' }}>
          {loading && chains.length === 0 ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 size={24} className="text-[#FFD700] animate-spin" />
              <span className="text-white/40 text-sm ml-3">Fetching on-chain balances...</span>
            </div>
          ) : (
            chains.map(chain => {
              const chainPct = totalUsd > 0 ? (chain.usdValue / FUND_TARGET) * 100 : 0
              return (
                <button
                  key={chain.id}
                  data-testid={`mint-chain-${chain.id}`}
                  onClick={() => handleMintOnChain(chain.id)}
                  className="w-full flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-transparent hover:border-[#FFD700]/30 transition-all group"
                >
                  {/* Chain icon */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden"
                    style={{ backgroundColor: `${chain.color}20` }}
                  >
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
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-white group-hover:text-[#FFD700] transition-colors">
                          {chain.name}
                        </span>
                        {chain.subChains && (
                          <span className="text-[10px] text-white/20">
                            incl. {chain.subChains.filter(s => s !== 'Mainnet').join(', ')}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-white/50">{formatUsd(chain.usdValue)}</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${Math.max(chainPct, 0.5)}%`,
                          backgroundColor: chain.color,
                          opacity: chain.usdValue > 0 ? 1 : 0.3,
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[10px] text-white/30">
                        {formatNative(chain.nativeBalance, chain.symbol)}
                      </span>
                      <span className="text-[10px] text-white/30">
                        {chain.price > 0 ? `$${chain.price.toLocaleString()}` : '—'}
                      </span>
                    </div>
                  </div>

                  {/* Mint CTA */}
                  <div className="flex-shrink-0 px-3 py-1.5 rounded-lg bg-[#FFD700]/10 text-[#FFD700] text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Mint →
                  </div>
                </button>
              )
            })
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-[#0D0D14] border-t border-white/10 px-6 py-3">
          <p className="text-[10px] text-amber-400/80 text-center font-medium mb-1">
            Mint is not live yet — preview only
          </p>
          <p className="text-[10px] text-white/30 text-center">
            100% of funds go to DAO treasury • All tokens swap to native asset • 1 MIGA = 1 Vote
          </p>
        </div>
      </div>
    </div>
  )
}
