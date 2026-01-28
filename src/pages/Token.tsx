import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Copy, ExternalLink, Check, Coins, ArrowRightLeft, Lock, TrendingUp, Shield, Layers } from 'lucide-react';
import { useState } from 'react';

const chains = [
  { name: 'Solana', standard: 'SPL Token', bridge: 'Native', purpose: 'Primary chain, bonding curve', color: '#9945FF', live: true },
  { name: 'Ethereum', standard: 'ERC-20', bridge: 'Wormhole', purpose: 'DeFi integrations, DAO contracts', color: '#627EEA', live: false },
  { name: 'Base', standard: 'ERC-20', bridge: 'Wormhole', purpose: 'Low-cost transactions', color: '#0052FF', live: false },
  { name: 'Arbitrum', standard: 'ERC-20', bridge: 'Wormhole', purpose: 'L2 scaling', color: '#28A0F0', live: false },
  { name: 'Polygon', standard: 'ERC-20', bridge: 'Wormhole', purpose: 'Mass adoption', color: '#8247E5', live: false },
  { name: 'Pars Network', standard: 'ERC-20', bridge: 'Native Bridge', purpose: 'Privacy & governance', color: '#C9A227', live: false },
  { name: 'Bitcoin', standard: 'Native', bridge: 'HD Wallet', purpose: 'Store of value', color: '#F7931A', live: false },
];

const governanceTokens = [
  { symbol: 'MIGA', type: 'Collateral', purpose: 'Alignment—stake what you cannot afford to lose', color: '#C9A227' },
  { symbol: 'PARS', type: 'Emission', purpose: 'Coordination—flows to builders, decays when idle', color: '#8B5CF6' },
  { symbol: 'sPARS', type: 'Rebasing', purpose: 'Multiplied rewards for continuous participation', color: '#10B981' },
  { symbol: 'vePARS', type: 'Vote-Escrow', purpose: 'Governance power—lock PARS + MIGA together', color: '#3B82F6' },
];

export default function Token() {
  const [copied, setCopied] = useState(false);
  const tokenAddress = "MIGA_TOKEN_ADDRESS_HERE"; // Replace with actual address when deployed

  const copyAddress = () => {
    navigator.clipboard.writeText(tokenAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-6">
          {/* Hero */}
          <div className="flex items-center gap-4 mb-6">
            <img src="/images/migacoin.png" alt="MIGA" className="w-16 h-16 rounded-full" />
            <div>
              <h1 className="text-4xl lg:text-5xl font-medium tracking-tight">
                <span className="text-gold">$MIGA</span> Token
              </h1>
              <p className="text-white/50 text-sm mt-1">Collateral for the civil government OS. Ten DAOs. Quantum-safe privacy.</p>
            </div>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="card rounded-xl p-4">
              <p className="text-xs text-white/40 mb-1">Total Supply</p>
              <p className="text-2xl font-mono font-medium text-gold">7B</p>
              <p className="text-xs text-white/40">7,000,000,000 MIGA</p>
            </div>
            <div className="card rounded-xl p-4">
              <p className="text-xs text-white/40 mb-1">Chains</p>
              <p className="text-2xl font-medium">7</p>
              <p className="text-xs text-white/40">Multi-chain native</p>
            </div>
            <div className="card rounded-xl p-4">
              <p className="text-xs text-white/40 mb-1">Team Allocation</p>
              <p className="text-2xl font-medium text-emerald-400">0%</p>
              <p className="text-xs text-white/40">No insider tokens</p>
            </div>
            <div className="card rounded-xl p-4">
              <p className="text-xs text-white/40 mb-1">Treasury</p>
              <p className="text-2xl font-mono font-medium">50%</p>
              <p className="text-xs text-white/40">DAO-governed</p>
            </div>
          </div>

          {/* Contract Address */}
          <section className="mb-12">
            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
              <Shield size={20} className="text-gold" />
              Contract Address
            </h2>
            <div className="card rounded-xl p-6">
              <div className="flex items-center gap-2 bg-white/5 rounded-lg p-3 mb-4">
                <span className="text-xs text-white/40 mr-2">Solana:</span>
                <code className="flex-1 text-sm text-gold font-mono break-all">{tokenAddress}</code>
                <button
                  onClick={copyAddress}
                  className="p-2 hover:bg-white/10 rounded transition-colors"
                >
                  {copied ? <Check size={18} className="text-gold" /> : <Copy size={18} className="text-white/40" />}
                </button>
              </div>
              <p className="text-xs text-white/40">
                Additional chain addresses will be published as bridges go live. Verify addresses through official channels only.
              </p>
            </div>
          </section>

          {/* Distribution */}
          <section className="mb-12">
            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
              <Coins size={20} className="text-gold" />
              Token Distribution
            </h2>
            <div className="card rounded-xl p-6">
              <div className="space-y-4 mb-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Meteora DLMM LP</span>
                    <span className="font-mono text-gold">10% (700M)</span>
                  </div>
                  <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-gold/40 rounded-full" style={{ width: '10%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>One-Sided Bonding Curve</span>
                    <span className="font-mono text-gold">40% (2.8B)</span>
                  </div>
                  <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-gold/60 rounded-full" style={{ width: '40%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Treasury (DAO-governed)</span>
                    <span className="font-mono text-gold">50% (3.5B)</span>
                  </div>
                  <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-gold rounded-full" style={{ width: '50%' }} />
                  </div>
                </div>
              </div>
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                <p className="text-emerald-400 text-sm font-medium">No team allocation. No advisor tokens. No VC rounds.</p>
                <p className="text-white/50 text-xs mt-1">The team participates like everyone else through the public bonding curve.</p>
              </div>
            </div>
          </section>

          {/* Bonding Curve */}
          <section className="mb-12">
            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
              <TrendingUp size={20} className="text-gold" />
              Bonding Curve Mechanics
            </h2>
            <div className="card rounded-xl p-6">
              <p className="text-white/60 text-sm mb-6">
                The bonding curve provides fair price discovery with no presale or preferential treatment.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-white/50 text-sm">Start Price</span>
                    <span className="font-mono text-sm">0.0000001 SOL</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-white/50 text-sm">End Price</span>
                    <span className="font-mono text-sm">0.00001 SOL</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-white/50 text-sm">Price Increase</span>
                    <span className="font-mono text-sm text-gold">100x</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-white/50 text-sm">Curve Type</span>
                    <span className="text-sm">Linear</span>
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-xs text-white/40 mb-2">Price Formula</p>
                  <code className="text-sm text-gold font-mono block">
                    Price = Start + (Sold / Total) × (End - Start)
                  </code>
                  <p className="text-xs text-white/40 mt-4">Slippage Protection</p>
                  <p className="text-xs text-white/60 mt-1">
                    Each transaction includes a minimum tokens out parameter to prevent front-running.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Multi-Chain */}
          <section className="mb-12">
            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
              <Layers size={20} className="text-gold" />
              Seven Chains, One Token
            </h2>
            <div className="card rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left p-4 text-white/50 font-medium">Chain</th>
                      <th className="text-left p-4 text-white/50 font-medium">Standard</th>
                      <th className="text-left p-4 text-white/50 font-medium">Bridge</th>
                      <th className="text-left p-4 text-white/50 font-medium">Purpose</th>
                      <th className="text-left p-4 text-white/50 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chains.map((chain) => (
                      <tr key={chain.name} className="border-b border-white/5 hover:bg-white/[0.02]">
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: chain.color }} />
                            <span className="font-medium">{chain.name}</span>
                          </div>
                        </td>
                        <td className="p-4 font-mono text-xs text-white/60">{chain.standard}</td>
                        <td className="p-4 text-white/60">{chain.bridge}</td>
                        <td className="p-4 text-white/50 text-xs">{chain.purpose}</td>
                        <td className="p-4">
                          {chain.live ? (
                            <span className="text-xs px-2 py-1 rounded bg-emerald-500/10 text-emerald-400">Live</span>
                          ) : (
                            <span className="text-xs px-2 py-1 rounded bg-white/5 text-white/40">Coming</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Governance Token Architecture */}
          <section className="mb-12">
            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
              <Lock size={20} className="text-gold" />
              Governance Token Architecture
            </h2>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {governanceTokens.map((token) => (
                <div key={token.symbol} className="card rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-sm"
                      style={{ backgroundColor: `${token.color}20`, color: token.color }}
                    >
                      {token.symbol.substring(0, 4)}
                    </div>
                    <div>
                      <p className="font-medium">{token.symbol}</p>
                      <p className="text-xs text-white/40">{token.type}</p>
                    </div>
                  </div>
                  <p className="text-sm text-white/60">{token.purpose}</p>
                </div>
              ))}
            </div>

            {/* vePARS Formula */}
            <div className="card rounded-xl p-6">
              <h3 className="text-base font-medium mb-4">Governance Power Formula</h3>
              <div className="bg-white/5 rounded-lg p-4 mb-4 text-center">
                <code className="text-gold font-mono">vePARS = min(PARS, MIGA) × √(lock_duration / max_duration)</code>
              </div>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gold font-medium mb-1">Balance</p>
                  <p className="text-white/50 text-xs">Need both tokens—whales without MIGA cannot dominate</p>
                </div>
                <div>
                  <p className="text-gold font-medium mb-1">Commitment</p>
                  <p className="text-white/50 text-xs">Longer locks earn more governance power</p>
                </div>
                <div>
                  <p className="text-gold font-medium mb-1">Anti-Capture</p>
                  <p className="text-white/50 text-xs">Square root prevents single-entity control</p>
                </div>
              </div>
            </div>
          </section>

          {/* Bridge Architecture */}
          <section className="mb-12">
            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
              <ArrowRightLeft size={20} className="text-gold" />
              Cross-Chain Bridge Architecture
            </h2>
            <div className="card rounded-xl p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-medium mb-2">EVM Bridges</h3>
                  <p className="text-sm text-white/50 mb-3">Cross-chain bridges connect EVM networks:</p>
                  <div className="bg-white/5 rounded-lg p-4 font-mono text-xs text-white/60 overflow-x-auto">
                    <pre>{`Solana (SPL) --> Bridge --> Ethereum (wMIGA)
                         --> Base (wMIGA)
                         --> Arbitrum (wMIGA)
                         --> Polygon (wMIGA)`}</pre>
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-medium mb-2">Pars Network Bridge</h3>
                  <p className="text-sm text-white/50 mb-3">Native bridge to Pars Network for privacy and governance:</p>
                  <div className="bg-white/5 rounded-lg p-4 font-mono text-xs text-white/60">
                    EVM Chains → Native Bridge → Pars Network (MIGA)
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-medium mb-2">Bitcoin Integration</h3>
                  <p className="text-sm text-white/50 mb-3">Native Bitcoin support via HD wallet derivation:</p>
                  <div className="bg-white/5 rounded-lg p-4 font-mono text-xs text-white/60">
                    Bitcoin (BTC) → Unique Deposit Address → DAO Treasury
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Links */}
          <section>
            <h2 className="text-xl font-medium mb-4">Links & Resources</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
              <a
                href="https://solscan.io/token/MIGA_ADDRESS"
                className="card rounded-xl p-4 hover:border-gold/20 transition-all group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm group-hover:text-gold transition-colors">Solscan</span>
                  <ExternalLink size={14} className="text-white/30 group-hover:text-gold transition-colors" />
                </div>
                <p className="text-xs text-white/40 mt-1">Explorer</p>
              </a>
              <a
                href="https://birdeye.so/token/MIGA_ADDRESS"
                className="card rounded-xl p-4 hover:border-gold/20 transition-all group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm group-hover:text-gold transition-colors">Birdeye</span>
                  <ExternalLink size={14} className="text-white/30 group-hover:text-gold transition-colors" />
                </div>
                <p className="text-xs text-white/40 mt-1">Analytics</p>
              </a>
              <a
                href="https://app.meteora.ag/pools/MIGA_POOL"
                className="card rounded-xl p-4 hover:border-gold/20 transition-all group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm group-hover:text-gold transition-colors">Meteora</span>
                  <ExternalLink size={14} className="text-white/30 group-hover:text-gold transition-colors" />
                </div>
                <p className="text-xs text-white/40 mt-1">DLMM Pool</p>
              </a>
              <a
                href="https://jup.ag/swap/SOL-MIGA"
                className="card rounded-xl p-4 hover:border-gold/20 transition-all group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm group-hover:text-gold transition-colors">Jupiter</span>
                  <ExternalLink size={14} className="text-white/30 group-hover:text-gold transition-colors" />
                </div>
                <p className="text-xs text-white/40 mt-1">Swap</p>
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
