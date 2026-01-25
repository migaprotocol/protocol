import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { MigaScene, type SceneLayout } from '@/components/3d'
import { RaceToNowruz } from '@/components/RaceToNowruz'
import { SocialFeed } from '@/components/SocialFeed'
import { RezaNews } from '@/components/RezaNews'
import {
  ArrowRight,
  Shield,
  CheckCircle2,
  ExternalLink,
  Lock,
  FileCheck,
  ChevronRight,
  Settings2,
  X
} from 'lucide-react'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

// Layout options for 3D scene
const LAYOUT_OPTIONS: { value: SceneLayout; label: string; description: string }[] = [
  { value: 'cinematic', label: 'A: Cinematic', description: 'Dramatic 3/4 perspective' },
  { value: 'profile', label: 'B: Profile', description: 'Side view for hero layouts' },
  { value: 'topdown', label: 'C: Top-Down', description: 'Overview of all chains' },
]

export default function Index() {
  const { connected } = useWallet()
  const heroSkyRef = useRef<HTMLDivElement>(null)
  const [searchParams, setSearchParams] = useSearchParams()

  // Get layout from URL query param or default to 'cinematic'
  const layoutParam = searchParams.get('layout') as SceneLayout | null
  const [layout, setLayout] = useState<SceneLayout>(
    layoutParam && ['cinematic', 'profile', 'topdown'].includes(layoutParam)
      ? layoutParam
      : 'cinematic'
  )

  // Toggle for layout options panel
  const [showLayoutPanel, setShowLayoutPanel] = useState(false)

  // Update URL when layout changes
  const handleLayoutChange = (newLayout: SceneLayout) => {
    setLayout(newLayout)
    setSearchParams({ layout: newLayout })
  }

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
            <MigaScene layout={layout} />
          </div>

          {/* Layout customization - small toggle button + collapsible panel */}
          <div className="fixed bottom-4 right-4 z-[100]">
            {/* Expanded panel */}
            {showLayoutPanel && (
              <div className="mb-2 flex flex-col gap-2 p-3 rounded-xl bg-black/90 backdrop-blur-sm border border-white/10 animate-in fade-in slide-in-from-bottom-2 duration-200">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-xs text-white/50">3D Layout:</div>
                  <button
                    onClick={() => setShowLayoutPanel(false)}
                    className="p-1 rounded hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
                {LAYOUT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      handleLayoutChange(opt.value)
                      setShowLayoutPanel(false)
                    }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                      layout === opt.value
                        ? 'bg-[#FFD700] text-black font-medium'
                        : 'bg-white/5 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    <span className="font-mono">{opt.label}</span>
                    <span className="text-xs opacity-60 hidden sm:inline">- {opt.description}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Collapsed customize button */}
            {!showLayoutPanel && (
              <button
                onClick={() => setShowLayoutPanel(true)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 text-white/70 hover:bg-black/80 hover:text-white transition-all text-sm"
                title="Customize 3D view"
              >
                <Settings2 size={16} />
                <span className="hidden sm:inline">Customize</span>
              </button>
            )}
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
                A civil government operating system for the global Persian community.
                Ten DAOs. Full transparency. Quantum-safe privacy.
              </p>

              {/* Hidden on mobile for cleaner look */}
              <p className="hidden md:block text-sm text-[#9999A5] mb-8">
                <span className="text-[#FFD36A]">pars.network</span> — Decentralized network of blockchains serving the global Persian community.
                Private. Quantum-safe. Powered by <span className="text-[#B8B8C6]">Lux FHE</span>.
              </p>

              {/* Button hierarchy: Primary, Secondary, Link */}
              <div className="flex flex-wrap items-center gap-3 md:gap-4">
                <a
                  href="https://dao.miga.network/fund"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-cta-btn"
                >
                  Join the Movement
                </a>
                <a
                  href="https://github.com/migaprotocol/miga/blob/main/whitepaper/MIGA-Whitepaper.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-btn-outline"
                >
                  Whitepaper
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
                  7 Chains
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
            RACE TO NOWRUZ - Chain Investment Competition
            ============================================ */}
        <RaceToNowruz />

        {/* ============================================
            TEN DAOs SECTION
            ============================================ */}
        <section className="section border-t border-white/[0.04]">
          <div className="container-lg">
            <div className="text-center mb-16">
              <h2 className="mb-4">
                Ten DAOs. <span className="text-gradient-ember">One mission.</span>
              </h2>
              <p className="body-md max-w-2xl mx-auto">
                Core functions of civil governance, each funded automatically by 1% of protocol fees.
                Voted, timelocked, and auditable with receipts.
              </p>
            </div>

            <div className="grid md:grid-cols-5 gap-4 mb-8">
              {[
                { name: 'Security', icon: '🛡️', desc: 'Protection & defense' },
                { name: 'Treasury', icon: '🏦', desc: 'Capital allocation' },
                { name: 'Health', icon: '🏥', desc: 'Medical programs' },
                { name: 'Culture', icon: '🎭', desc: 'Arts & heritage' },
                { name: 'Research', icon: '🔬', desc: 'Science & innovation' },
              ].map((dao) => (
                <div key={dao.name} className="pillar-card text-center py-6">
                  <div className="text-3xl mb-3">{dao.icon}</div>
                  <h3 className="text-base mb-1">{dao.name}</h3>
                  <p className="text-xs text-[#6B6B7B]">{dao.desc}</p>
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-5 gap-4">
              {[
                { name: 'Infrastructure', icon: '🏗️', desc: 'Building & utilities' },
                { name: 'Partnerships', icon: '🤝', desc: 'Global relations' },
                { name: 'Investing', icon: '📈', desc: 'Growth capital' },
                { name: 'Oversight', icon: '⚖️', desc: 'Accountability' },
                { name: 'Humanitarian', icon: '❤️', desc: 'Aid & relief' },
              ].map((dao) => (
                <div key={dao.name} className="pillar-card text-center py-6">
                  <div className="text-3xl mb-3">{dao.icon}</div>
                  <h3 className="text-base mb-1">{dao.name}</h3>
                  <p className="text-xs text-[#6B6B7B]">{dao.desc}</p>
                </div>
              ))}
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
                All mint proceeds seed the treasury. Protocol fees fund ongoing operations.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 relative">
              {/* Connector line */}
              <div className="hidden md:block absolute top-6 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-[#FFD36A]/30 to-transparent" />

              {/* Step 1 */}
              <div className="flow-step">
                <div className="flow-number mb-4">1</div>
                <h3 className="mb-2">Mint</h3>
                <p className="body-sm">
                  Fair launch token sale. 100% of proceeds go to DAO treasury.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flow-step">
                <div className="flow-number mb-4">2</div>
                <h3 className="mb-2">Vote</h3>
                <p className="body-sm">
                  All decisions voted on-chain. Timelocked execution. Full receipts.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flow-step">
                <div className="flow-number mb-4">3</div>
                <h3 className="mb-2">Fund</h3>
                <p className="body-sm">
                  1% of protocol fees auto-distributed to each of the 10 DAOs.
                </p>
              </div>

              {/* Step 4 */}
              <div className="flow-step">
                <div className="flow-number mb-4">4</div>
                <h3 className="mb-2">Build</h3>
                <p className="body-sm">
                  Humanitarian programs, partnerships, and long-term nation-building.
                </p>
              </div>
            </div>

            {/* Metric callout */}
            <div className="mt-12 text-center">
              <div className="stat-badge inline-flex">
                <span className="stat-badge-value">10%</span>
                <span className="stat-badge-label">of protocol fees → DAOs</span>
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
                All mint proceeds seed the treasury. Starting as an NGO.
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
                <span className="stat-badge-value">7B</span>
                <span className="stat-badge-label">Across 7 Chains</span>
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
                Privacy & <span className="text-gradient-ember">Security</span>
              </h2>
              <p className="body-md max-w-2xl mx-auto">
                Built for high-threat environments. Private participation protects people.
                Publicly verifiable execution ensures accountability.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Quantum Security */}
              <div className="card">
                <Shield className="text-emerald-400 mb-4" size={24} />
                <h3 className="text-lg mb-2">Quantum-Safe</h3>
                <p className="body-sm mb-4">
                  Post-quantum cryptography via Lux FHE. Future-proof against quantum attacks.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded">Active</span>
                </div>
              </div>

              {/* Private Participation */}
              <div className="card">
                <Lock className="text-[#FFD36A] mb-4" size={24} />
                <h3 className="text-lg mb-2">Private Participation</h3>
                <p className="body-sm mb-4">
                  Identity protection for contributors. Shielded voting to prevent coercion.
                </p>
                <a href="#" className="btn-link text-xs">
                  Learn more <ChevronRight size={12} />
                </a>
              </div>

              {/* Public Verification */}
              <div className="card">
                <FileCheck className="text-[#FFB14A] mb-4" size={24} />
                <h3 className="text-lg mb-2">Public Verification</h3>
                <p className="body-sm mb-4">
                  All execution auditable on-chain. Full receipts for every transaction.
                </p>
                <a href="#" className="btn-link text-xs">
                  View proofs <ExternalLink size={12} />
                </a>
              </div>

              {/* Timelocked Governance */}
              <div className="card">
                <CheckCircle2 className="text-[#FF7A2F] mb-4" size={24} />
                <h3 className="text-lg mb-2">Timelocked Governance</h3>
                <p className="body-sm mb-4">
                  All decisions voted and timelocked. No unilateral action possible.
                </p>
                <a href="#" className="btn-link text-xs">
                  View governance <ChevronRight size={12} />
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
              Join the movement. Humanitarian programs, partnerships, and
              long-term nation-building with every dollar proven on-chain.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://dao.miga.network/fund"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Join the Movement <ArrowRight size={18} />
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

        {/* ============================================
            SOCIAL FEED - X.com & Farcaster
            ============================================ */}
        <SocialFeed />

        {/* ============================================
            REZA NEWS - Video & News from Cyrus Foundation
            ============================================ */}
        <RezaNews />

      </main>

      <Footer />
    </div>
  )
}
