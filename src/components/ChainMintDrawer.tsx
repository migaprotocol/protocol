import { X, ExternalLink, Shield, Copy, Check, QrCode, Info, ChevronDown } from 'lucide-react'
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
      <div className="relative w-full max-w-md h-full overflow-y-auto bg-[#0D0D14] border-l border-white/10 shadow-2xl animate-slide-in-right">
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
                  Send {chain.symbol} → Receive MIGA
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
          {/* Step indicator */}
          <div className="flex items-center gap-3">
            {['Select Asset', 'Send Payment', 'Receive MIGA'].map(
              (step, i) => (
                <div key={step} className="flex items-center gap-2 flex-1">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      backgroundColor: i === 0 ? chain.color : 'rgba(255,255,255,0.1)',
                      color: i === 0 ? '#000' : 'rgba(255,255,255,0.5)',
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
              ),
            )}
          </div>

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
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
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
              <div className="text-xs text-blue-200/80 space-y-1">
                <p>
                  Send{' '}
                  <span className="font-medium text-blue-200">
                    {asset?.symbol || chain.symbol}
                  </span>{' '}
                  on{' '}
                  <span className="font-medium text-blue-200">
                    {chain.name}
                  </span>{' '}
                  to the address above.
                </p>
                <p className="text-blue-300/50">
                  MIGA tokens will be minted to your wallet on Pars.Network. All
                  funds go to the DAO treasury.
                </p>
              </div>
            </div>
          </div>

          {/* Security badge */}
          <div className="flex items-center justify-center gap-2 py-3 text-xs text-white/30">
            <Shield size={14} className="text-emerald-500/70" />
            <span>
              Secured by {MIGA_DAO_WALLET.threshold}-of-
              {MIGA_DAO_WALLET.signers} Utila MPC
            </span>
          </div>

          {/* Lux Bridge link */}
          <a
            href="https://bridge.lux.network"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl border border-white/10 text-white/50 hover:text-white/80 hover:bg-white/5 transition-all text-sm"
          >
            <ExternalLink size={14} />
            Use Lux Bridge for Cross-Chain Swaps
          </a>
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
