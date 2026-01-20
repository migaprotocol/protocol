import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ArrowRight, Shield, Users, Globe, Coins, Lock, Zap } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function Index() {
  const { connected } = useWallet();

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1565967511849-76a60a516170?w=1920&q=80')`,
            }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />

          {/* Content */}
          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9A227]/30 bg-[#C9A227]/10 mb-8">
              <span className="w-2 h-2 rounded-full bg-[#C9A227] animate-pulse" />
              <span className="text-[#C9A227] text-sm font-medium">Fair Launch on Solana</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-6">
              <span className="gradient-text">MIGA</span>
              <span className="text-white"> Protocol</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-white/80 mb-4 max-w-3xl mx-auto font-light">
              The Token Powering a Diaspora-Led Civic Operating System
            </p>

            {/* Quote */}
            <p className="text-base text-white/50 italic mb-8 max-w-2xl mx-auto">
              "Building in code what tyrants cannot burn."
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {connected ? (
                <a href="#buy" className="btn-primary inline-flex items-center gap-2">
                  Get $MIGA <ArrowRight size={18} />
                </a>
              ) : (
                <WalletMultiButton />
              )}
              <a href="https://miga.us.org" className="btn-outline">
                Explore the DAO
              </a>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
              <div className="w-1 h-2 bg-white/40 rounded-full animate-bounce" />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="stat-card">
                <div className="stat-value">1B</div>
                <div className="stat-label">Total Supply</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">50%</div>
                <div className="stat-label">DAO Treasury</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">40%</div>
                <div className="stat-label">Fair Sale</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">10%</div>
                <div className="stat-label">Liquidity</div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="section">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-6">
                  A Token for <span className="text-gold">8 Million</span> Iranians Worldwide
                </h2>
                <p className="text-white/60 text-lg mb-6 leading-relaxed">
                  MIGA isn't just another token. It's the economic engine for a decentralized
                  nation-in-exile — funding humanitarian programs, cultural preservation,
                  and civic infrastructure for the Persian diaspora.
                </p>
                <p className="text-white/60 mb-8 leading-relaxed">
                  No VCs. No presales. No team allocation. 50% goes directly to the
                  community-governed DAO treasury.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm">Solana Native</span>
                  <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm">7 Chains via Wormhole</span>
                  <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm">10 Specialized DAOs</span>
                </div>
              </div>
              <div className="relative">
                <div
                  className="aspect-[4/3] rounded-2xl bg-cover bg-center"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80')`,
                  }}
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* Tokenomics Section */}
        <section id="tokenomics" className="section bg-white/[0.02]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">
                <span className="text-gold">Fair Launch</span> Tokenomics
              </h2>
              <p className="text-white/50 max-w-2xl mx-auto">
                Designed for community ownership from day one
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="feature-card text-center">
                <div className="w-14 h-14 rounded-xl bg-[#C9A227]/10 flex items-center justify-center mx-auto mb-6">
                  <Coins className="text-gold" size={28} />
                </div>
                <div className="text-3xl font-medium text-gold mb-2">10%</div>
                <h3 className="text-lg font-medium mb-2">Meteora LP</h3>
                <p className="text-white/50 text-sm">
                  100M tokens paired with SOL for deep initial liquidity via Meteora DLMM
                </p>
              </div>

              <div className="feature-card text-center">
                <div className="w-14 h-14 rounded-xl bg-[#C9A227]/10 flex items-center justify-center mx-auto mb-6">
                  <Zap className="text-gold" size={28} />
                </div>
                <div className="text-3xl font-medium text-gold mb-2">40%</div>
                <h3 className="text-lg font-medium mb-2">Bonding Curve</h3>
                <p className="text-white/50 text-sm">
                  400M tokens sold via one-sided bonding curve for fair price discovery
                </p>
              </div>

              <div className="feature-card text-center">
                <div className="w-14 h-14 rounded-xl bg-[#C9A227]/10 flex items-center justify-center mx-auto mb-6">
                  <Shield className="text-gold" size={28} />
                </div>
                <div className="text-3xl font-medium text-gold mb-2">50%</div>
                <h3 className="text-lg font-medium mb-2">DAO Treasury</h3>
                <p className="text-white/50 text-sm">
                  500M tokens governed by the community for humanitarian programs
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-white/60">Total Supply:</span>
                <span className="text-2xl font-medium text-gold font-mono">1,000,000,000 MIGA</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="section">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">
                Why <span className="text-gold">MIGA</span>?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="feature-card">
                <Globe className="text-gold mb-4" size={24} />
                <h3 className="text-lg font-medium mb-2">Multi-Chain</h3>
                <p className="text-white/50 text-sm">
                  Native on Solana, bridged to 6 more chains via Wormhole for maximum accessibility.
                </p>
              </div>

              <div className="feature-card">
                <Users className="text-gold mb-4" size={24} />
                <h3 className="text-lg font-medium mb-2">Community Governed</h3>
                <p className="text-white/50 text-sm">
                  10 specialized DAOs manage treasury funds for health, education, culture, and more.
                </p>
              </div>

              <div className="feature-card">
                <Lock className="text-gold mb-4" size={24} />
                <h3 className="text-lg font-medium mb-2">Privacy Protected</h3>
                <p className="text-white/50 text-sm">
                  Shielded voting for sensitive governance. Public outcomes, private participation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Buy Section */}
        <section id="buy" className="section bg-white/[0.02]">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">
                How to <span className="text-gold">Buy</span>
              </h2>
            </div>

            <div className="space-y-4">
              {[
                { step: '01', title: 'Connect Wallet', desc: 'Use Phantom, Solflare, or any Solana wallet' },
                { step: '02', title: 'Get SOL', desc: 'Ensure you have SOL for purchase and transaction fees' },
                { step: '03', title: 'Swap on Meteora', desc: 'Buy MIGA through Meteora DLMM pool or bonding curve' },
              ].map((item) => (
                <div key={item.step} className="card p-6 flex items-start gap-5">
                  <span className="text-gold font-mono text-sm">{item.step}</span>
                  <div>
                    <h3 className="font-medium mb-1">{item.title}</h3>
                    <p className="text-white/50 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <a
                href="https://app.meteora.ag/pools/MIGA_POOL"
                className="btn-primary inline-flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Trade on Meteora <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&q=80')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/80" />

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-6">
              Join the <span className="text-gold">Movement</span>
            </h2>
            <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
              Participate in governance, fund humanitarian programs, and help build
              a decentralized future for the Persian diaspora.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://miga.us.org" className="btn-primary">
                Visit the DAO
              </a>
              <a href="https://discord.gg/miga" className="btn-outline">
                Join Discord
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
