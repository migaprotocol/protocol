import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ArrowRight, Coins, TrendingUp, Shield, Droplets } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function Index() {
  const { connected } = useWallet();

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-40 overflow-hidden">
          {/* Subtle gold gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-gold/5 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent opacity-50" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center">
              <h1 className="text-6xl lg:text-8xl font-medium mb-8 tracking-tight">
                <span className="gradient-text">$MIGA</span>
              </h1>
              <p className="text-xl lg:text-2xl text-zinc-300 mb-4 max-w-3xl mx-auto font-light">
                Fair Launch Token on Solana
              </p>
              <p className="text-base text-zinc-500 mb-10 max-w-2xl mx-auto font-mono">
                10% Meteora LP · 40% Bonding Curve · 50% Treasury
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {connected ? (
                  <a href="#buy" className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-600 text-black px-8 py-3 rounded-lg font-medium transition-all">
                    Buy $MIGA <ArrowRight size={18} />
                  </a>
                ) : (
                  <WalletMultiButton />
                )}
                <a
                  href="https://birdeye.so/token/MIGA_ADDRESS"
                  className="px-6 py-3 border border-zinc-800 rounded-lg hover:border-gold/50 hover:text-gold transition-all text-center text-zinc-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Birdeye
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Tokenomics Section */}
        <section id="tokenomics" className="py-24 border-y border-zinc-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-medium text-center mb-16 tracking-tight">
              <span className="gradient-text">Tokenomics</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mb-16">
              <div className="card-glass rounded-xl p-8 text-center transition-all hover:glow-gold">
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                  <Droplets className="text-gold" size={28} />
                </div>
                <p className="text-4xl font-medium text-gold mb-3">10%</p>
                <p className="text-lg font-medium mb-2 text-white">Meteora LP</p>
                <p className="text-zinc-500 text-sm leading-relaxed">100M tokens paired with SOL for deep initial liquidity via Meteora DLMM</p>
              </div>

              <div className="card-glass rounded-xl p-8 text-center transition-all hover:glow-gold">
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="text-gold" size={28} />
                </div>
                <p className="text-4xl font-medium text-gold mb-3">40%</p>
                <p className="text-lg font-medium mb-2 text-white">Bonding Curve</p>
                <p className="text-zinc-500 text-sm leading-relaxed">400M tokens sold via one-sided bonding curve for fair price discovery</p>
              </div>

              <div className="card-glass rounded-xl p-8 text-center transition-all hover:glow-gold">
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                  <Shield className="text-gold" size={28} />
                </div>
                <p className="text-4xl font-medium text-gold mb-3">50%</p>
                <p className="text-lg font-medium mb-2 text-white">Treasury</p>
                <p className="text-zinc-500 text-sm leading-relaxed">500M tokens held by DAO treasury, governed by community</p>
              </div>
            </div>

            <div className="card-glass rounded-xl p-8 max-w-2xl mx-auto glow-gold">
              <div className="flex items-center gap-4 mb-4">
                <Coins className="text-gold" />
                <h3 className="text-lg font-medium">Total Supply</h3>
              </div>
              <p className="text-3xl font-medium gradient-text font-mono">1,000,000,000 MIGA</p>
              <p className="text-zinc-500 mt-3 text-sm">Fixed supply · No inflation · No minting</p>
            </div>
          </div>
        </section>

        {/* How to Buy Section */}
        <section id="buy" className="py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-medium text-center mb-16 tracking-tight">
              How to <span className="gradient-text">Buy</span>
            </h2>

            <div className="space-y-4">
              <div className="card-glass rounded-xl p-6 flex gap-5 transition-all hover:border-gold/30">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold font-mono text-sm">01</span>
                <div>
                  <h3 className="text-base font-medium mb-1">Connect Wallet</h3>
                  <p className="text-zinc-500 text-sm">Connect your Phantom, Solflare, or any Solana wallet</p>
                </div>
              </div>

              <div className="card-glass rounded-xl p-6 flex gap-5 transition-all hover:border-gold/30">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold font-mono text-sm">02</span>
                <div>
                  <h3 className="text-base font-medium mb-1">Get SOL</h3>
                  <p className="text-zinc-500 text-sm">Make sure you have SOL in your wallet for the purchase and gas fees</p>
                </div>
              </div>

              <div className="card-glass rounded-xl p-6 flex gap-5 transition-all hover:border-gold/30">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold font-mono text-sm">03</span>
                <div>
                  <h3 className="text-base font-medium mb-1">Buy on Meteora</h3>
                  <p className="text-zinc-500 text-sm">Swap SOL for MIGA on Meteora DLMM pool or via bonding curve</p>
                </div>
              </div>
            </div>

            <div className="mt-10 text-center">
              <a
                href="https://app.meteora.ag/pools/MIGA_POOL"
                className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-600 text-black px-8 py-3 rounded-lg font-medium transition-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                Trade on Meteora <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-gold/5 via-transparent to-transparent" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <h2 className="text-3xl lg:text-4xl font-medium mb-6 tracking-tight">
              Join the <span className="gradient-text">MIGA</span> Community
            </h2>
            <p className="text-zinc-400 text-lg mb-10 font-light">
              Participate in governance, earn rewards, and shape the future of the protocol.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://miga.us.org" className="bg-gold hover:bg-gold-600 text-black px-8 py-3 rounded-lg font-medium transition-all">
                Visit DAO Site
              </a>
              <a href="https://discord.gg/miga" className="px-6 py-3 border border-zinc-800 rounded-lg hover:border-gold/50 hover:text-gold transition-all text-zinc-300">
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
