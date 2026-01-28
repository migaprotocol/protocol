import { X, ExternalLink, Shield, Copy, Check, QrCode, Info, ChevronDown, AlertCircle } from 'lucide-react'
import { useState, useMemo, useEffect } from 'react'
import { MIGA_CHAINS, MIGA_DAO_WALLET, getChainAssets } from '@/components/bridge/networks'

interface ChainMintDrawerProps {
  open: boolean
  chainId: string | null
  onClose: () => void
}

export function ChainMintDrawer({ open, chainId, onClose }: ChainMintDrawerProps) {
  const [copied, setCopied] = useState<'address' | 'memo' | null>(null)
  const [showQR, setShowQR] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState('')
  const [showAssetDropdown, setShowAssetDropdown] = useState(false)
  const [receivingAddress, setReceivingAddress] = useState('')

  const isValidEvmAddress = (addr: string) => /^0x[a-fA-F0-9]{40}$/.test(addr)
  const hasValidReceiving = isValidEvmAddress(receivingAddress)
  const isBitcoin = chainId === 'BITCOIN'
  const isEvmSource = chainId ? ['ETHEREUM', 'BASE', 'OPTIMISM', 'ARBITRUM', 'BSC', 'LUX'].includes(chainId) : false

  const chain = useMemo(
    () => (chainId ? MIGA_CHAINS.find(c => c.id === chainId) : null),
    [chainId],
  )
  const assets = useMemo(() => (chainId ? getChainAssets(chainId) : []), [chainId])
  const asset = useMemo(
    () => assets.find(a => a.symbol === selectedAsset) || assets[0],
    [assets, selectedAsset],
  )

  // Reset state when chain changes
  useEffect(() => {
    setCopied(null)
    setShowQR(false)
    setSelectedAsset('')
    setShowAssetDropdown(false)
    setReceivingAddress('')
  }, [chainId])

  const depositAddress =
    chain?.depositAddress ||
    (chainId ? MIGA_DAO_WALLET.addresses[chainId] : null) ||
    ''
  const hasAddress = !!depositAddress && !depositAddress.includes('coming soon')

  const copyText = async (text: string, type: 'address' | 'memo') => {
    await navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  const openExplorer = () => {
    if (!chain || !hasAddress) return
    window.open(
      `${chain.explorer}/address/${depositAddress}`,
      '_blank',
      'noopener,noreferrer',
    )
  }

  if (!open || !chain) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div data-testid="chain-mint-drawer" className="relative w-full max-w-md h-full overflow-y-auto bg-[#0D0D14] border-l border-white/10 shadow-2xl animate-slide-in-right">
        {/* Header with chain branding */}
        <div
          className="sticky top-0 z-10 border-b border-white/10 px-6 py-5"
          style={{
            background: `linear-gradient(135deg, ${chain.color}15, transparent)`,
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden"
                style={{ backgroundColor: `${chain.color}20` }}
              >
                <img
                  src={chain.icon}
                  alt={chain.name}
                  className="w-8 h-8 object-contain"
                  onError={e => {
                    ;(e.target as HTMLImageElement).style.display = 'none'
                  }}
                />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">
                  Mint on {chain.name}
                </h2>
                <p className="text-xs text-white/50">
                  Send {chain.symbol} → Claim MIGA on Pars Network
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X size={20} className="text-white/60" />
            </button>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Not live banner */}
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
            <AlertCircle size={16} className="text-amber-400 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-amber-300/90">
              <p className="font-semibold mb-1">Mint is not live yet</p>
              <p className="text-amber-400/70">
                The mint opens soon and closes at Nowruz (March 20). You can preview the process below. Funds sent before the mint is live will not be credited.
              </p>
            </div>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-3">
            {['Your Address', 'Send Funds', 'Claim MIGA'].map(
              (step, i) => {
                const activeStep = hasValidReceiving ? 1 : 0
                return (
                  <div key={step} className="flex items-center gap-2 flex-1">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{
                        backgroundColor: i <= activeStep ? chain.color : 'rgba(255,255,255,0.1)',
                        color: i <= activeStep ? '#000' : 'rgba(255,255,255,0.5)',
                      }}
                    >
                      {i + 1}
                    </div>
                    <span className="text-xs text-white/50 hidden sm:block">
                      {step}
                    </span>
                    {i < 2 && (
                      <div className="flex-1 h-px bg-white/10 hidden sm:block" />
                    )}
                  </div>
                )
              },
            )}
          </div>

          {/* Step 1: Receiving address */}
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden">
            <div className="px-4 py-3 border-b border-white/5">
              <span className="text-xs font-medium text-white/60">
                Step 1: Pars Network Receiving Address
              </span>
            </div>
            <div className="p-4 space-y-3">
              <p className="text-xs text-white/50">
                Enter the EVM address where you'll claim MIGA tokens on Pars Network after the mint closes.
              </p>
              <input
                type="text"
                value={receivingAddress}
                onChange={(e) => setReceivingAddress(e.target.value.trim())}
                placeholder="0x..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm font-mono text-gold placeholder:text-white/20 focus:outline-none focus:border-gold/40 transition-colors"
              />
              {receivingAddress && !hasValidReceiving && (
                <p className="text-xs text-red-400">Enter a valid EVM address (0x + 40 hex characters)</p>
              )}
              {hasValidReceiving && (
                <p className="text-xs text-emerald-400">Valid address</p>
              )}
              {isEvmSource && !receivingAddress && (
                <p className="text-xs text-white/30">
                  Tip: Your {chain.name} wallet address works as your Pars Network address.
                </p>
              )}
              {!isEvmSource && !receivingAddress && (
                <p className="text-xs text-white/30">
                  You can also claim later by proving ownership of your sending wallet.
                </p>
              )}
            </div>
          </div>

          {/* Step 2: Payment details (gated behind valid receiving address) */}
          {hasValidReceiving ? (<>

          {/* Non-EVM claim note */}
          {!isEvmSource && (
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <p className="text-xs text-blue-300/80">
                <span className="font-medium text-blue-200">How claiming works:</span>{' '}
                After the mint closes at Nowruz, prove you control your {chain.name} sending wallet to claim MIGA on Pars Network. Your receiving address above will be linked to your contribution.
              </p>
            </div>
          )}

          {/* Asset selector (if chain has multiple assets) */}
          {assets.length > 1 && (
            <div>
              <label className="text-xs text-white/40 mb-2 block">
                Select Asset
              </label>
              <div className="relative">
                <button
                  onClick={() => setShowAssetDropdown(!showAssetDropdown)}
                  className="w-full flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {asset && (
                      <>
                        <img
                          src={asset.logo}
                          alt={asset.symbol}
                          className="w-6 h-6 rounded-full"
                          onError={e => {
                            ;(e.target as HTMLImageElement).src =
                              '/images/migacoin.png'
                          }}
                        />
                        <div className="text-left">
                          <p className="text-sm font-medium text-white">
                            {asset.symbol}
                          </p>
                          <p className="text-xs text-white/40">{asset.name}</p>
                        </div>
                      </>
                    )}
                  </div>
                  <ChevronDown size={16} className="text-white/40" />
                </button>

                {showAssetDropdown && (
                  <div className="absolute z-20 w-full mt-2 bg-[#0D0D14] border border-white/10 rounded-xl shadow-xl overflow-hidden">
                    {assets
                      .filter(a => a.enabled)
                      .map(a => (
                        <button
                          key={a.symbol}
                          onClick={() => {
                            setSelectedAsset(a.symbol)
                            setShowAssetDropdown(false)
                          }}
                          className={`w-full flex items-center gap-3 p-3 hover:bg-white/5 transition-colors ${
                            a.symbol === (asset?.symbol || '')
                              ? 'bg-white/5'
                              : ''
                          }`}
                        >
                          <img
                            src={a.logo}
                            alt={a.symbol}
                            className="w-6 h-6 rounded-full"
                            onError={e => {
                              ;(e.target as HTMLImageElement).src =
                                '/images/migacoin.png'
                            }}
                          />
                          <div className="text-left">
                            <p className="text-sm font-medium text-white">
                              {a.symbol}
                            </p>
                            <p className="text-xs text-white/40">{a.name}</p>
                          </div>
                          {a.symbol === (asset?.symbol || '') && (
                            <Check
                              size={14}
                              className="ml-auto"
                              style={{ color: chain.color }}
                            />
                          )}
                        </button>
                      ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Deposit address card */}
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
              <span className="text-xs font-medium text-white/60">
                DAO Treasury Address
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowQR(!showQR)}
                  className="text-xs text-white/40 hover:text-white/70 transition-colors flex items-center gap-1"
                >
                  <QrCode size={12} />
                  QR
                </button>
                <button
                  onClick={openExplorer}
                  className="text-xs text-white/40 hover:text-white/70 transition-colors flex items-center gap-1"
                >
                  <ExternalLink size={12} />
                  Explorer
                </button>
              </div>
            </div>

            {showQR && hasAddress && (
              <div className="flex justify-center p-6 bg-white rounded-none">
                <div className="w-40 h-40 bg-neutral-100 rounded-lg flex items-center justify-center text-neutral-400 text-xs">
                  QR Code
                </div>
              </div>
            )}

            <div className="p-4">
              <div className="flex items-center gap-2">
                <code
                  data-testid="deposit-address"
                  className="flex-1 text-sm font-mono break-all"
                  style={{ color: hasAddress ? chain.color : 'rgba(255,255,255,0.3)' }}
                >
                  {hasAddress ? depositAddress : 'Wallet address coming soon...'}
                </code>
                {hasAddress && (
                  <button
                    onClick={() => copyText(depositAddress, 'address')}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0"
                  >
                    {copied === 'address' ? (
                      <Check size={16} className="text-emerald-400" />
                    ) : (
                      <Copy size={16} className="text-white/40" />
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Memo warning (XRP, TON) */}
          {chain.memo && (
            <div data-testid="memo-section" className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Memo Required
                </span>
                <button
                  onClick={() => copyText(chain.memo!, 'memo')}
                  className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1"
                >
                  {copied === 'memo' ? (
                    <Check size={12} />
                  ) : (
                    <Copy size={12} />
                  )}
                  Copy
                </button>
              </div>
              <code className="text-lg font-mono text-amber-300 block">
                {chain.memo}
              </code>
              <p className="text-xs text-amber-400/70 mt-2">
                You must include this memo or your deposit will be lost.
              </p>
            </div>
          )}

          {/* Min amount */}
          {chain.minAmount && (
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
              <p className="text-xs text-white/50">
                Minimum deposit:{' '}
                <span className="font-medium" style={{ color: chain.color }}>
                  {chain.minAmount} {chain.symbol}
                </span>
              </p>
            </div>
          )}

          {/* How it works */}
          <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
            <div className="flex items-start gap-3">
              <Info size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-blue-200/80 space-y-2">
                <p>
                  Send{' '}
                  <span className="font-medium text-blue-200">
                    {asset?.symbol || chain.symbol}
                  </span>{' '}
                  on{' '}
                  <span className="font-medium text-blue-200">
                    {chain.name}
                  </span>{' '}
                  to the DAO treasury address above.
                </p>
                <p className="text-blue-300/50">
                  All funds go directly to the multi-sig DAO treasury. After the mint closes at <span className="text-blue-200">Nowruz (March 20)</span>, MIGA is distributed proportionally based on each chain's total contributions.
                </p>
                <p className="text-blue-300/50">
                  Claim MIGA natively on <span className="text-blue-200">Pars Network</span> by proving you control your sending wallet. Unsold MIGA returns to the DAO for future fundraises.
                </p>
                <p className="text-blue-300/50">
                  The <span className="text-blue-200">Chain Leaderboard</span> tracks which networks contribute the most. Higher-performing chains may receive bonus allocation.
                </p>
              </div>
            </div>
          </div>

          </>) : (
            <div className="text-center py-8 space-y-2">
              <p className="text-white/30 text-sm">Enter your Pars Network receiving address to continue</p>
              <p className="text-white/20 text-xs">Any EVM-compatible address works on Pars Network</p>
            </div>
          )}

          {/* Security + legal links */}
          <div className="flex items-center justify-center gap-2 py-3 text-xs text-white/30">
            <Shield size={14} className="text-emerald-500/70" />
            <span>Multi-sig secured treasury</span>
          </div>

          <div className="flex items-center justify-center gap-4 text-[10px] text-white/25">
            <a href="/terms" className="hover:text-white/50 transition-colors">Terms</a>
            <span>|</span>
            <a href="/privacy" className="hover:text-white/50 transition-colors">Privacy</a>
            <span>|</span>
            <a href="/risks" className="hover:text-white/50 transition-colors">Risks</a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
