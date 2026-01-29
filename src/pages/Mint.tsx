import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MigaBridge } from '@/components/bridge';
import { MIGA_CHAINS, MIGA_DAO_WALLET } from '@/components/bridge/networks';
import { Wallet, Shield, ExternalLink, ArrowRight, Sparkles, Users, Lock, TrendingUp, Share2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import {
  getMintPrice,
  getChainProgress,
  getChainAllocation,
  formatUsd,
  formatMiga,
  getTotalRaised,
  CHAIN_RAISED,
  CHAIN_MAX_USD,
} from '@/lib/bondingCurve';

const steps = [
  {
    number: '1',
    title: 'Select Chain',
    description: 'Choose from 10 supported blockchains',
  },
  {
    number: '2',
    title: 'Send Funds',
    description: 'Send tokens to the DAO treasury address',
  },
  {
    number: '3',
    title: 'Claim MIGA',
    description: 'Claim MIGA on Pars Network after Nowruz',
  },
];

const features = [
  {
    icon: Shield,
    title: '3-of-5 Multi-sig',
    description: 'All funds are secured by multi-sig with 3-of-5 DAO signers required for any transaction.',
  },
  {
    icon: Users,
    title: 'DAO Governed',
    description: 'Treasury funds are managed by MIGA token holders through transparent on-chain governance.',
  },
  {
    icon: Lock,
    title: 'No Middlemen',
    description: 'Direct chain-to-chain transfers. No centralized custody or counterparty risk.',
  },
  {
    icon: TrendingUp,
    title: 'Fair Launch',
    description: '0% team allocation. Everyone participates equally through the bonding curve.',
  },
];

export default function Mint() {
  const { chain } = useParams<{ chain?: string }>();
  
  // Map URL param to chain ID (e.g., 'solana' -> 'SOLANA')
  const getChainId = (chainSlug?: string): string => {
    if (!chainSlug) return 'SOLANA';
    const slug = chainSlug.toLowerCase();
    const chainMap: Record<string, string> = {
      bitcoin: 'BITCOIN',
      btc: 'BITCOIN',
      ethereum: 'ETHEREUM',
      eth: 'ETHEREUM',
      base: 'BASE',
      optimism: 'OPTIMISM',
      op: 'OPTIMISM',
      arbitrum: 'ARBITRUM',
      arb: 'ARBITRUM',
      bnb: 'BSC',
      bsc: 'BSC',
      solana: 'SOLANA',
      sol: 'SOLANA',
      xrp: 'XRP',
      ripple: 'XRP',
      ton: 'TON',
      lux: 'LUX',
    };
    return chainMap[slug] || 'SOLANA';
  };
  
  const defaultChain = getChainId(chain);

  const mintableChains = MIGA_CHAINS.filter(c => c.enabled && !c.isRedemptionNetwork);
  const totalRaised = getTotalRaised();

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm mb-6">
              <Sparkles size={16} />
              <span>Multi-Chain Minting</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-medium tracking-tight mb-4">
              Mint <span className="text-gold">$MIGA</span>
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto mb-6">
              Mint from any of 10 supported chains. Each chain has its own bonding curve from
              $0.01 to $1. All funds go directly to the DAO treasury.
            </p>
            <div className="inline-flex items-center gap-6 text-sm">
              <div className="text-center">
                <p className="text-2xl font-bold text-gold">{formatUsd(totalRaised)}</p>
                <p className="text-white/40 text-xs">Total Raised</p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="text-center">
                <p className="text-2xl font-bold text-white">10</p>
                <p className="text-white/40 text-xs">Chains</p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="text-center">
                <p className="text-2xl font-bold text-white">$0.01</p>
                <p className="text-white/40 text-xs">Starting Price</p>
              </div>
            </div>
          </div>

          {/* Chain Leaderboard / Pillars */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium flex items-center gap-2">
                <TrendingUp size={20} className="text-gold" />
                Chain Leaderboard
              </h2>
              <span className="text-xs text-white/30">Bonding curve: $0.01 → $1.00</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {mintableChains.map((chain) => {
                const price = getMintPrice(chain.id);
                const progress = getChainProgress(chain.id);
                const raised = CHAIN_RAISED[chain.id] || 0;
                const maxUsd = CHAIN_MAX_USD[chain.id] || 0;
                const allocation = getChainAllocation(chain.id);

                return (
                  <Link
                    key={chain.id}
                    to={`/mint/${chain.id.toLowerCase()}`}
                    className="group p-4 bg-white/[0.03] border border-white/10 rounded-xl hover:border-gold/30 transition-all"
                  >
                    {/* Chain icon + name */}
                    <div className="flex items-center gap-2 mb-3">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${chain.color}20` }}
                      >
                        <img
                          src={chain.icon}
                          alt={chain.name}
                          className="w-4 h-4"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                      </div>
                      <span className="text-sm font-medium truncate">{chain.name}</span>
                    </div>

                    {/* Price */}
                    <p className="text-lg font-bold text-gold mb-1">
                      ${price.toFixed(2)}
                    </p>
                    <p className="text-[10px] text-white/30 mb-3">per MIGA</p>

                    {/* Progress bar */}
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-2">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.max(progress, 1)}%`,
                          backgroundColor: chain.color,
                          opacity: progress > 0 ? 1 : 0.3,
                        }}
                      />
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-[10px] text-white/40">
                      <span>{formatUsd(raised)}</span>
                      <span>{formatMiga(allocation)} MIGA</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Bridge Widget */}
            <div>
              <MigaBridge className="sticky top-24" defaultChain={defaultChain} />
            </div>

            {/* How It Works */}
            <div>
              <h2 className="text-xl font-medium mb-6 flex items-center gap-2">
                <ArrowRight size={20} className="text-gold" />
                How It Works
              </h2>

              <div className="space-y-4 mb-8">
                {steps.map((step) => (
                  <div key={step.number} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold font-mono font-bold flex-shrink-0">
                      {step.number}
                    </div>
                    <div className="pt-2">
                      <h3 className="text-base font-medium mb-1">{step.title}</h3>
                      <p className="text-sm text-white/50">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bonding Curve Explainer */}
              <div className="card rounded-xl p-6 mb-6">
                <h3 className="text-base font-medium mb-3">Bonding Curve Pricing</h3>
                <p className="text-sm text-white/50 mb-4">
                  Each chain starts at <span className="text-gold font-medium">$0.01</span> per MIGA and increases to{' '}
                  <span className="text-gold font-medium">$1.00</span> as more is raised. Cheaper chains offer more MIGA per dollar — creating arbitrage opportunities across chains.
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-white/5 rounded-lg text-center">
                    <p className="text-lg font-bold text-emerald-400">$0.01</p>
                    <p className="text-[10px] text-white/30">First Mint</p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg text-center">
                    <p className="text-lg font-bold text-amber-400">$0.50</p>
                    <p className="text-[10px] text-white/30">Midpoint</p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg text-center">
                    <p className="text-lg font-bold text-red-400">$1.00</p>
                    <p className="text-[10px] text-white/30">Last Mint</p>
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                <div className="flex items-start gap-3">
                  <Shield className="text-emerald-500 mt-0.5" size={20} />
                  <div>
                    <p className="text-sm font-medium text-emerald-400 mb-1">Multi-sig secured</p>
                    <p className="text-xs text-emerald-300/70">
                      All treasury operations require {MIGA_DAO_WALLET.threshold} of {MIGA_DAO_WALLET.signers} DAO
                      signers. No single point of failure.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <section className="mb-16">
            <h2 className="text-2xl font-medium text-center mb-8">Why Mint MIGA?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {features.map((feature) => (
                <div key={feature.title} className="card rounded-xl p-6">
                  <feature.icon className="text-gold mb-4" size={24} />
                  <h3 className="text-base font-medium mb-2">{feature.title}</h3>
                  <p className="text-sm text-white/50">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="text-center">
            <div className="card rounded-xl p-8 max-w-2xl mx-auto">
              <h3 className="text-xl font-medium mb-4">Spread the Word</h3>
              <p className="text-white/50 mb-6">
                Share MIGA with your community. Every chain has its own bonding curve — help your chain win the leaderboard.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/share"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gold text-black font-semibold rounded-full hover:bg-gold/90 transition-colors"
                >
                  <Share2 size={18} />
                  Share MIGA
                </Link>
                <Link
                  to="/token"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/20 rounded-full hover:bg-white/5 transition-colors"
                >
                  <Wallet size={18} />
                  Token Details
                </Link>
                <Link
                  to="/docs"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/20 rounded-full hover:bg-white/5 transition-colors"
                >
                  <ExternalLink size={18} />
                  Whitepaper
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
