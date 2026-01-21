import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { MigaScene } from '@/components/3d'
import {
  ArrowRight,
  Shield,
  TrendingUp,
  Landmark,
  Layers,
  CheckCircle2,
  ExternalLink,
  Lock,
  FileCheck,
  Bug,
  ChevronRight
} from 'lucide-react'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useEffect, useRef } from 'react'

export default function Index() {
  const { connected } = useWallet()
  const heroSkyRef = useRef<HTMLDivElement>(null)

  // Scroll-based parallax for hero background
  useEffect(() => {
    const handleScroll = () => {
      if (heroSkyRef.current) {
        const scrollY = window.scrollY
        // Subtle vertical parallax - background moves slower than scroll
        const parallaxOffset = scrollY * 0.3
        heroSkyRef.current.style.transform = `translateY(${parallaxOffset}px)`
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#07070A]">
      {/* Parallax night sky background */}
      <div className="parallax-night-sky" />

      <Header />

      <main>
        {/* ============================================
            HERO SECTION - Full-width 3D overlay with content
            ============================================ */}
        <section className="hero-section">
          {/* Night sky background with scroll parallax */}
          <div ref={heroSkyRef} className="hero-night-sky" />

          {/* Full-width 3D Scene */}
          <div className="hero-3d-full">
            <MigaScene />
          </div>

          {/* Content overlay on left */}
          <div className="hero-content-overlay">
            <div className="hero-content">
              <h1 className="mb-6 leading-[1.05]">
                <span className="block text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold">
                  <span className="text-gradient-ember">The future of</span>
                  <br />
                  <span className="text-gradient-ember">Iran</span>{' '}
                  <span className="text-[#EDEDF2]">is in your hands.</span>
                </span>
              </h1>

              <p className="hero-subcopy mb-6">
                MIGA = reconstruction-grade capital OS for the global Persian community.
                Build wealth. Fund public goods. Prove every dollar.
              </p>

              {/* Hidden on mobile for cleaner look */}
              <p className="hidden md:block text-sm text-[#9999A5] mb-8">
                <span className="text-[#FFD36A]">pars.network</span> — First Persian blockchain.
                Powered by <span className="text-[#B8B8C6]">Lux quantum-safe FHE technology</span>.
              </p>

              {/* Button hierarchy: Primary, Secondary, Link */}
              <div className="flex flex-wrap items-center gap-3 md:gap-4">
                <a
                  href="https://dao.miga.network/fund"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-cta-btn"
                >
                  Fund the Movement
                </a>
                <a href="#tokenomics" className="hero-btn-outline">
                  Tokenomics
                </a>
                <a href="/docs" className="hero-link hidden md:flex">
                  Read docs <ArrowRight size={14} />
                </a>
                {/* Wallet button for connected users */}
                <div className={connected ? '' : 'hidden'}>
                  <WalletMultiButton />
                </div>
              </div>

              {/* Subtle chain indicator - hidden on mobile (shown in header) */}
              <div className="hidden md:flex mt-10 items-center gap-3">
                <span className="text-xs text-[#6B6B7B]">Live on</span>
                <span className="text-xs text-[#9999A5] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  Solana
                </span>
              </div>
            </div>
          </div>

          {/* Scroll indicator - hidden on mobile */}
          <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
            <div className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center pt-2">
              <div className="w-1 h-2 bg-white/40 rounded-full animate-bounce" />
            </div>
          </div>
        </section>

        {/* ============================================
            THREE PILLARS SECTION
            ============================================ */}
        <section className="section border-t border-white/[0.04]">
          <div className="container-lg">
            <div className="text-center mb-16">
              <h2 className="mb-4">
                Three pillars of <span className="text-gradient-ember">compliant DeFi</span>
              </h2>
              <p className="body-md max-w-2xl mx-auto">
                Simple primitives, sophisticated execution. Shariah-attestable. Choose how you participate.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Earn */}
              <div className="pillar-card">
                <div className="icon-box-lg mb-6">
                  <TrendingUp className="text-[#FFD36A]" size={28} />
                </div>
                <h3 className="mb-3">Earn</h3>
                <p className="body-sm mb-6">
                  Deposit into compliant yield strategies with transparent risk bands.
                  Fee-based returns, no interest (riba-free).
                </p>
                <a href="#" className="btn-link">
                  Learn more <ChevronRight size={16} />
                </a>
              </div>

              {/* Advance (formerly Borrow) */}
              <div className="pillar-card">
                <div className="icon-box-lg mb-6">
                  <Landmark className="text-[#FFB14A]" size={28} />
                </div>
                <h3 className="mb-3">Advance</h3>
                <p className="body-sm mb-6">
                  Unlock liquidity against future yield. Your vault yield
                  repays the balance over time—no interest, just fees.
                </p>
                <a href="#" className="btn-link">
                  Learn more <ChevronRight size={16} />
                </a>
              </div>

              {/* Stake */}
              <div className="pillar-card">
                <div className="icon-box-lg mb-6">
                  <Layers className="text-[#FF7A2F]" size={28} />
                </div>
                <h3 className="mb-3">Stake</h3>
                <p className="body-sm mb-6">
                  Govern treasury allocation, risk parameters, and impact funding
                  via vePARS. Direct where value flows.
                </p>
                <a href="#" className="btn-link">
                  Learn more <ChevronRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            HOW IT WORKS
            ============================================ */}
        <section className="section-sm bg-gradient-to-b from-transparent via-[#0A0A10] to-transparent">
          <div className="container-md">
            <div className="text-center mb-12">
              <h2 className="mb-4">How it works</h2>
              <p className="body-md max-w-xl mx-auto">
                Self-repaying advances: deposit, unlock liquidity, yield repays.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connector line */}
              <div className="hidden md:block absolute top-6 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-[#FFD36A]/30 to-transparent" />

              {/* Step 1 */}
              <div className="flow-step">
                <div className="flow-number mb-4">1</div>
                <h3 className="mb-2">Deposit</h3>
                <p className="body-sm">
                  Connect wallet and deposit assets to compliant vault strategies.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flow-step">
                <div className="flow-number mb-4">2</div>
                <h3 className="mb-2">Advance</h3>
                <p className="body-sm">
                  Take an advance against future yield. No interest—fixed fee only.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flow-step">
                <div className="flow-number mb-4">3</div>
                <h3 className="mb-2">Auto-Repay</h3>
                <p className="body-sm">
                  Vault yield repays your balance over time. Withdraw when clear.
                </p>
              </div>
            </div>

            {/* Metric callout */}
            <div className="mt-12 text-center">
              <div className="stat-badge inline-flex">
                <span className="stat-badge-value">~12 blocks</span>
                <span className="stat-badge-label">average rebalance time</span>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            TOKENOMICS
            ============================================ */}
        <section id="tokenomics" className="section border-t border-white/[0.04]">
          <div className="container-lg">
            <div className="text-center mb-16">
              <h2 className="mb-4">
                <span className="text-gradient-ember">7B</span> tokens across 7 chains
              </h2>
              <p className="body-md max-w-2xl mx-auto">
                Fair launch. No VCs. No presales. No team allocation.
                50% directly to DAO treasury.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="card text-center">
                <div className="text-4xl font-bold text-gradient-ember mb-2">10%</div>
                <h3 className="text-lg mb-2">Liquidity</h3>
                <p className="body-sm">
                  700M tokens paired for deep initial liquidity via Meteora & DEXs
                </p>
              </div>

              <div className="card text-center">
                <div className="text-4xl font-bold text-gradient-ember mb-2">40%</div>
                <h3 className="text-lg mb-2">Fair Sale</h3>
                <p className="body-sm">
                  2.8B tokens sold via bonding curves for fair price discovery
                </p>
              </div>

              <div className="card text-center">
                <div className="text-4xl font-bold text-gradient-ember mb-2">50%</div>
                <h3 className="text-lg mb-2">DAO Treasury</h3>
                <p className="body-sm">
                  3.5B tokens governed by the community for protocol development
                </p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <div className="stat-badge">
                <span className="stat-badge-value">7,000,000,000</span>
                <span className="stat-badge-label">Total Supply</span>
              </div>
              <div className="stat-badge">
                <span className="stat-badge-value">1B</span>
                <span className="stat-badge-label">Live on Solana</span>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            RISK & SECURITY
            ============================================ */}
        <section id="security" className="section bg-gradient-to-b from-[#0A0A10] to-transparent">
          <div className="container-lg">
            <div className="text-center mb-16">
              <h2 className="mb-4">
                Risk & <span className="text-gradient-ember">Compliance</span>
              </h2>
              <p className="body-md max-w-2xl mx-auto">
                Defense in depth. Independent audits, on-chain proofs,
                and Shariah attestation for compliant strategies.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Audits */}
              <div className="card">
                <FileCheck className="text-emerald-400 mb-4" size={24} />
                <h3 className="text-lg mb-2">Smart Contract Audits</h3>
                <p className="body-sm mb-4">
                  Independent security audits in progress. Results published on-chain.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 bg-amber-500/20 text-amber-400 rounded">In Progress</span>
                </div>
              </div>

              {/* Shariah Attestation */}
              <div className="card">
                <CheckCircle2 className="text-[#FFD36A] mb-4" size={24} />
                <h3 className="text-lg mb-2">Shariah Attestation</h3>
                <p className="body-sm mb-4">
                  Compliant strategies reviewed by qualified scholars. Attestations on IPFS.
                </p>
                <a href="#" className="btn-link text-xs">
                  View attestations <ExternalLink size={12} />
                </a>
              </div>

              {/* Risk Bands */}
              <div className="card">
                <Shield className="text-[#FFB14A] mb-4" size={24} />
                <h3 className="text-lg mb-2">Risk Bands</h3>
                <p className="body-sm mb-4">
                  LTV limits, liquidation thresholds, and circuit breakers per vault.
                </p>
                <a href="#" className="btn-link text-xs">
                  View parameters <ChevronRight size={12} />
                </a>
              </div>

              {/* On-chain Proofs */}
              <div className="card">
                <Lock className="text-[#FF7A2F] mb-4" size={24} />
                <h3 className="text-lg mb-2">On-chain Proofs</h3>
                <p className="body-sm mb-4">
                  Verifiable reserves and real-time proof of solvency.
                </p>
                <a href="#" className="btn-link text-xs">
                  View proofs <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            ECOSYSTEM
            ============================================ */}
        <section className="section border-t border-white/[0.04]">
          <div className="container-lg">
            <div className="text-center mb-16">
              <h2 className="mb-4">Ecosystem</h2>
              <p className="body-md max-w-2xl mx-auto">
                Integrated with leading wallets, oracles, bridges, and chains.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Phantom', type: 'Wallet' },
                { name: 'Solflare', type: 'Wallet' },
                { name: 'Pyth', type: 'Oracle' },
                { name: 'Chainlink', type: 'Oracle' },
                { name: 'Wormhole', type: 'Bridge' },
                { name: 'LayerZero', type: 'Bridge' },
                { name: 'Meteora', type: 'DEX' },
                { name: 'Jupiter', type: 'DEX' },
              ].map((partner) => (
                <div key={partner.name} className="card-glass p-5 text-center">
                  <p className="font-medium mb-1">{partner.name}</p>
                  <p className="text-xs text-[#6B6B7B]">{partner.type}</p>
                </div>
              ))}
            </div>

            {/* Chains */}
            <div className="mt-12 text-center">
              <p className="body-sm mb-4">Supported Chains</p>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { name: 'Solana', status: 'Live' },
                  { name: 'Ethereum', status: 'Q2' },
                  { name: 'Base', status: 'Q2' },
                  { name: 'Arbitrum', status: 'Q3' },
                  { name: 'Polygon', status: 'Q3' },
                  { name: 'Lux', status: 'Q4' },
                  { name: 'Bitcoin', status: '2027' },
                ].map((chain) => (
                  <span
                    key={chain.name}
                    className={`chain-badge ${chain.status === 'Live' ? 'border-emerald-500/30 text-emerald-400' : ''}`}
                  >
                    {chain.name}
                    {chain.status === 'Live' && <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full ml-1" />}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            FINAL CTA
            ============================================ */}
        <section className="section">
          <div className="container-md text-center">
            <h2 className="mb-6">
              Build with <span className="text-gradient-ember">MIGA</span>
            </h2>
            <p className="body-lg mb-10 max-w-xl mx-auto">
              Join the movement. Participate in governance, fund public goods,
              and prove every dollar on-chain.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://dao.miga.network/fund"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Fund the Movement <ArrowRight size={18} />
              </a>
              <a href="/docs" className="btn-secondary">
                Documentation
              </a>
              <a href="https://github.com/miga" className="btn-secondary">
                SDK
              </a>
            </div>
          </div>
        </section>

        {/* ============================================
            TOKEN DETAILS
            ============================================ */}
        <section id="token" className="section-sm border-t border-white/[0.04]">
          <div className="container-md">
            <div className="text-center mb-12">
              <h2 className="mb-4">
                <span className="text-gradient-ember">MIGA</span> Token
              </h2>
              <p className="body-md max-w-xl mx-auto">
                Fair launch. Community governed. Multi-chain.
              </p>
            </div>

            {/* Token Details Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="card">
                <h3 className="text-lg font-medium mb-4 text-[#FFD36A]">Contract Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-white/[0.04]">
                    <span className="text-[#9999A5]">Token Name</span>
                    <span className="font-medium">MIGA</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/[0.04]">
                    <span className="text-[#9999A5]">Symbol</span>
                    <span className="font-medium">MIGA</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/[0.04]">
                    <span className="text-[#9999A5]">Decimals</span>
                    <span className="font-medium">9</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/[0.04]">
                    <span className="text-[#9999A5]">Network</span>
                    <span className="font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                      Solana
                    </span>
                  </div>
                  <div className="flex justify-between items-start py-2">
                    <span className="text-[#9999A5]">Contract</span>
                    <div className="text-right">
                      <code className="text-xs text-[#FFD36A] font-mono break-all">
                        MIGAx...pending
                      </code>
                      <button className="ml-2 text-xs text-[#6B6B7B] hover:text-[#FFD36A]">
                        Copy
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-medium mb-4 text-[#FFD36A]">Supply Distribution</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">DAO Treasury</span>
                      <span className="text-sm text-[#FFD36A]">50%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full w-[50%] bg-gradient-to-r from-[#FFD36A] to-[#FF7A2F] rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Fair Sale</span>
                      <span className="text-sm text-[#FFB14A]">40%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full w-[40%] bg-gradient-to-r from-[#FFB14A] to-[#FF7A2F] rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Liquidity</span>
                      <span className="text-sm text-[#FF7A2F]">10%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full w-[10%] bg-gradient-to-r from-[#FF7A2F] to-[#C9A86C] rounded-full" />
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-white/[0.04]">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#9999A5]">Total Supply</span>
                    <span className="font-medium">7,000,000,000 MIGA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            TRADE ON METEORA
            ============================================ */}
        <section id="trade" className="section-sm bg-gradient-to-b from-[#0A0A10] to-transparent">
          <div className="container-md">
            <div className="text-center mb-12">
              <h2 className="mb-4">Trade on <span className="text-gradient-ember">Meteora</span></h2>
              <p className="body-md max-w-xl mx-auto">
                Deep liquidity via DLMM pools. Best execution for MIGA swaps.
              </p>
            </div>

            {/* Meteora Integration Card */}
            <div className="card max-w-2xl mx-auto text-center">
              <div className="mb-6">
                <img src="/images/migacoin.png" alt="MIGA" className="w-20 h-20 mx-auto mb-4 rounded-full object-cover" />
                <h3 className="text-xl font-medium mb-2">MIGA / SOL</h3>
                <p className="text-sm text-[#9999A5]">Dynamic Liquidity Market Maker</p>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-white/[0.02] rounded-lg">
                  <p className="text-2xl font-bold text-gradient-ember">$0.00</p>
                  <p className="text-xs text-[#6B6B7B]">Price</p>
                </div>
                <div className="p-4 bg-white/[0.02] rounded-lg">
                  <p className="text-2xl font-bold text-[#EDEDF2]">--</p>
                  <p className="text-xs text-[#6B6B7B]">24h Volume</p>
                </div>
                <div className="p-4 bg-white/[0.02] rounded-lg">
                  <p className="text-2xl font-bold text-[#EDEDF2]">--</p>
                  <p className="text-xs text-[#6B6B7B]">TVL</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://app.meteora.ag/dlmm/MIGA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Trade on Meteora <ExternalLink size={16} />
                </a>
                <a
                  href="https://jup.ag/swap/SOL-MIGA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  Swap on Jupiter <ExternalLink size={16} />
                </a>
              </div>
            </div>

            {/* How to Buy Steps */}
            <div className="mt-16">
              <h3 className="text-center text-lg mb-8">How to Buy</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    step: '01',
                    title: 'Connect Wallet',
                    desc: 'Use Phantom, Solflare, or any Solana wallet'
                  },
                  {
                    step: '02',
                    title: 'Get SOL',
                    desc: 'Ensure you have SOL for purchase and fees'
                  },
                  {
                    step: '03',
                    title: 'Swap on Meteora',
                    desc: 'Buy MIGA through Meteora DLMM pool'
                  },
                ].map((item) => (
                  <div key={item.step} className="card flex items-start gap-4">
                    <span className="text-[#FFD36A] font-mono text-sm">{item.step}</span>
                    <div>
                      <h3 className="text-base font-medium mb-1">{item.title}</h3>
                      <p className="body-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
