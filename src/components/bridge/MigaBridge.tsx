// MIGA Bridge - Multi-chain Minting Widget
// Supports 7 chains: Bitcoin, Ethereum, BNB, Solana, TON, Lux, Zoo
// Uses Utila MPC for 5-signer DAO treasury wallet

import { useState, useMemo } from 'react';
import {
  ArrowRight,
  Copy,
  Check,
  ExternalLink,
  Shield,
  ChevronDown,
  Wallet,
  QrCode,
  Info
} from 'lucide-react';
import { MIGA_CHAINS, MINT_ASSETS, MIGA_DAO_WALLET, getChainAssets } from './networks';
import type { ChainConfig, DonationAsset } from './types';

interface MigaBridgeProps {
  className?: string;
  compact?: boolean;
  defaultChain?: string;
}

export function MigaBridge({ className = '', compact = false, defaultChain = 'SOLANA' }: MigaBridgeProps) {
  const [selectedChain, setSelectedChain] = useState<string>(defaultChain);
  const [selectedAsset, setSelectedAsset] = useState<string>('');
  const [showChainDropdown, setShowChainDropdown] = useState(false);
  const [showAssetDropdown, setShowAssetDropdown] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const chain = useMemo(() => MIGA_CHAINS.find(c => c.id === selectedChain), [selectedChain]);
  const assets = useMemo(() => getChainAssets(selectedChain), [selectedChain]);
  const asset = useMemo(() => assets.find(a => a.symbol === selectedAsset) || assets[0], [assets, selectedAsset]);

  // Get the DAO deposit address for the selected chain
  const depositAddress = chain?.depositAddress || MIGA_DAO_WALLET.addresses[selectedChain] || 'Address coming soon...';
  const hasAddress = depositAddress && !depositAddress.includes('coming soon');

  const copyAddress = async () => {
    if (!hasAddress) return;
    await navigator.clipboard.writeText(depositAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openExplorer = () => {
    if (!chain || !hasAddress) return;
    const url = `${chain.explorer}/address/${depositAddress}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Select first asset when chain changes
  const handleChainChange = (chainId: string) => {
    setSelectedChain(chainId);
    const chainAssets = getChainAssets(chainId);
    setSelectedAsset(chainAssets[0]?.symbol || '');
    setShowChainDropdown(false);
  };

  return (
    <div className={`bg-neutral-900/50 border border-neutral-800 rounded-xl ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <Wallet className="text-gold" size={20} />
          <h3 className="text-base font-medium">Mint MIGA</h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-neutral-400">
          <Shield size={14} className="text-emerald-500" />
          <span>{MIGA_DAO_WALLET.threshold}-of-{MIGA_DAO_WALLET.signers} MPC</span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Chain Selector */}
        <div>
          <label className="text-xs text-neutral-400 mb-2 block">Select Chain</label>
          <div className="relative">
            <button
              onClick={() => setShowChainDropdown(!showChainDropdown)}
              className="w-full flex items-center justify-between p-3 bg-neutral-800/50 border border-neutral-700 rounded-lg hover:border-neutral-600 transition-colors"
            >
              <div className="flex items-center gap-3">
                {chain && (
                  <>
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${chain.color}20` }}
                    >
                      <img
                        src={chain.icon}
                        alt={chain.name}
                        className="w-5 h-5 rounded-full"
                        onError={(e) => {
                          e.currentTarget.src = '/images/migacoin.png';
                        }}
                      />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium">{chain.name}</p>
                      <p className="text-xs text-neutral-400">{chain.symbol}</p>
                    </div>
                  </>
                )}
              </div>
              <ChevronDown size={18} className="text-neutral-400" />
            </button>

            {/* Chain Dropdown */}
            {showChainDropdown && (
              <div className="absolute z-20 w-full mt-2 bg-neutral-900 border border-neutral-700 rounded-lg shadow-xl overflow-hidden">
                {MIGA_CHAINS.filter(c => c.enabled).map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleChainChange(c.id)}
                    className={`w-full flex items-center gap-3 p-3 hover:bg-neutral-800 transition-colors ${
                      c.id === selectedChain ? 'bg-neutral-800' : ''
                    }`}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${c.color}20` }}
                    >
                      <img
                        src={c.icon}
                        alt={c.name}
                        className="w-5 h-5 rounded-full"
                        onError={(e) => {
                          e.currentTarget.src = '/images/migacoin.png';
                        }}
                      />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium">{c.name}</p>
                      <p className="text-xs text-neutral-400">{c.symbol}</p>
                    </div>
                    {c.id === selectedChain && (
                      <Check size={16} className="ml-auto text-gold" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Asset Selector */}
        {!compact && assets.length > 1 && (
          <div>
            <label className="text-xs text-neutral-400 mb-2 block">Select Asset</label>
            <div className="relative">
              <button
                onClick={() => setShowAssetDropdown(!showAssetDropdown)}
                className="w-full flex items-center justify-between p-3 bg-neutral-800/50 border border-neutral-700 rounded-lg hover:border-neutral-600 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {asset && (
                    <>
                      <img
                        src={asset.logo}
                        alt={asset.symbol}
                        className="w-6 h-6 rounded-full"
                        onError={(e) => {
                          e.currentTarget.src = '/images/migacoin.png';
                        }}
                      />
                      <div className="text-left">
                        <p className="text-sm font-medium">{asset.symbol}</p>
                        <p className="text-xs text-neutral-400">{asset.name}</p>
                      </div>
                    </>
                  )}
                </div>
                <ChevronDown size={18} className="text-neutral-400" />
              </button>

              {/* Asset Dropdown */}
              {showAssetDropdown && (
                <div className="absolute z-20 w-full mt-2 bg-neutral-900 border border-neutral-700 rounded-lg shadow-xl overflow-hidden">
                  {assets.filter(a => a.enabled).map((a) => (
                    <button
                      key={a.symbol}
                      onClick={() => {
                        setSelectedAsset(a.symbol);
                        setShowAssetDropdown(false);
                      }}
                      className={`w-full flex items-center gap-3 p-3 hover:bg-neutral-800 transition-colors ${
                        a.symbol === (asset?.symbol || '') ? 'bg-neutral-800' : ''
                      }`}
                    >
                      <img
                        src={a.logo}
                        alt={a.symbol}
                        className="w-6 h-6 rounded-full"
                        onError={(e) => {
                          e.currentTarget.src = '/images/migacoin.png';
                        }}
                      />
                      <div className="text-left">
                        <p className="text-sm font-medium">{a.symbol}</p>
                        <p className="text-xs text-neutral-400">{a.name}</p>
                      </div>
                      {a.symbol === (asset?.symbol || '') && (
                        <Check size={16} className="ml-auto text-gold" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Deposit Address */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs text-neutral-400">Deposit Address</label>
            <button
              onClick={() => setShowQR(!showQR)}
              className="text-xs text-neutral-400 hover:text-gold transition-colors flex items-center gap-1"
            >
              <QrCode size={14} />
              {showQR ? 'Hide' : 'Show'} QR
            </button>
          </div>

          {/* QR Code Placeholder */}
          {showQR && hasAddress && (
            <div className="flex justify-center p-4 bg-white rounded-lg mb-3">
              <div className="w-32 h-32 bg-neutral-100 rounded flex items-center justify-center text-neutral-400 text-xs">
                QR Code
              </div>
            </div>
          )}

          {/* Address Display */}
          <div className="flex items-center gap-2 p-3 bg-neutral-800/50 border border-neutral-700 rounded-lg">
            <code className={`flex-1 text-sm font-mono ${hasAddress ? 'text-gold' : 'text-neutral-500'} break-all`}>
              {hasAddress ? depositAddress : 'Wallet address coming soon...'}
            </code>
            {hasAddress && (
              <div className="flex items-center gap-1">
                <button
                  onClick={copyAddress}
                  className="p-2 hover:bg-neutral-700 rounded transition-colors"
                  title="Copy address"
                >
                  {copied ? (
                    <Check size={16} className="text-emerald-400" />
                  ) : (
                    <Copy size={16} className="text-neutral-400" />
                  )}
                </button>
                <button
                  onClick={openExplorer}
                  className="p-2 hover:bg-neutral-700 rounded transition-colors"
                  title="View on explorer"
                >
                  <ExternalLink size={16} className="text-neutral-400" />
                </button>
              </div>
            )}
          </div>

          {/* Memo (required for XRP/TON) */}
          {chain?.memo && (
            <div className="mt-3 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs text-amber-400 font-medium">⚠️ MEMO REQUIRED</label>
                <button
                  onClick={async () => {
                    await navigator.clipboard.writeText(chain.memo!);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1"
                >
                  <Copy size={12} />
                  Copy
                </button>
              </div>
              <code className="text-sm font-mono text-amber-300 break-all">{chain.memo}</code>
              <p className="text-xs text-amber-400/70 mt-2">Include this memo or your deposit will be lost!</p>
            </div>
          )}

          {/* Min amount warning */}
          {chain?.minAmount && (
            <div className="mt-3 p-2 bg-neutral-800/50 border border-neutral-700 rounded-lg">
              <p className="text-xs text-neutral-400">
                Minimum deposit: <span className="text-gold font-medium">{chain.minAmount} {chain.symbol}</span>
              </p>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex items-start gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <Info size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
          <div className="text-xs text-blue-200">
            <p className="mb-1">Send <span className="font-medium">{asset?.symbol || chain?.symbol}</span> on <span className="font-medium">{chain?.name}</span> to this address.</p>
            <p className="text-blue-300/70">Funds go directly to the DAO treasury and are used for protocol development and community initiatives.</p>
          </div>
        </div>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 text-xs text-neutral-400">
          <Shield size={14} className="text-emerald-500" />
          <span>Multi-sig secured treasury ({MIGA_DAO_WALLET.threshold}-of-{MIGA_DAO_WALLET.signers})</span>
        </div>
      </div>

      {/* Footer */}
      {!compact && (
        <div className="p-4 border-t border-neutral-800">
          <div className="flex items-center justify-center gap-4 text-[10px] text-neutral-500">
            <a href="/terms" className="hover:text-neutral-300 transition-colors">Terms</a>
            <span>|</span>
            <a href="/privacy" className="hover:text-neutral-300 transition-colors">Privacy</a>
            <span>|</span>
            <a href="/risks" className="hover:text-neutral-300 transition-colors">Risks</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default MigaBridge;
