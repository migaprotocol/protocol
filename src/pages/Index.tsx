import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ArrowRight, Coins, TrendingUp, Shield, Droplets } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function Index() {
  const { connected } = useWallet();

  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-indigo-500/10" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center">
              <h1 className="text-5xl lg:text-7xl font-bold mb-6">
                <span className="gradient-text">$MIGA</span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto">
                Fair Launch Token on Solana
              </p>
              <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
                10% Meteora LP | 40% Bonding Curve | 50% Treasury
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {connected ? (
                  <a href="#buy" className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition">
                    Buy $MIGA <ArrowRight size={18} />
                  </a>
                ) : (
                  <WalletMultiButton />
                )}
                <a
                  href="https://birdeye.so/token/MIGA_ADDRESS"
                  className="px-6 py-3 border border-slate-600 rounded-lg hover:bg-slate-800 transition text-center"
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
        <section id="tokenomics" className="py-20 border-y border-slate-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
              <span className="gradient-text">Tokenomics</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="card-glass rounded-xl p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                  <Droplets className="text-emerald-400" size={32} />
                </div>
                <p className="text-4xl font-bold text-emerald-400 mb-2">10%</p>
                <p className="text-xl font-semibold mb-2">Meteora LP</p>
                <p className="text-gray-400">100M tokens paired with SOL for deep initial liquidity via Meteora DLMM</p>
              </div>

              <div className="card-glass rounded-xl p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="text-indigo-400" size={32} />
                </div>
                <p className="text-4xl font-bold text-indigo-400 mb-2">40%</p>
                <p className="text-xl font-semibold mb-2">Bonding Curve</p>
                <p className="text-gray-400">400M tokens sold via one-sided bonding curve for fair price discovery</p>
              </div>

              <div className="card-glass rounded-xl p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                  <Shield className="text-purple-400" size={32} />
                </div>
                <p className="text-4xl font-bold text-purple-400 mb-2">50%</p>
                <p className="text-xl font-semibold mb-2">Treasury</p>
                <p className="text-gray-400">500M tokens held by DAO treasury, governed by community</p>
              </div>
            </div>

            <div className="card-glass rounded-xl p-6 max-w-2xl mx-auto">
              <div className="flex items-center gap-4 mb-4">
                <Coins className="text-emerald-400" />
                <h3 className="text-xl font-semibold">Total Supply</h3>
              </div>
              <p className="text-3xl font-bold gradient-text">1,000,000,000 MIGA</p>
              <p className="text-gray-400 mt-2">Fixed supply, no inflation, no minting</p>
            </div>
          </div>
        </section>

        {/* How to Buy Section */}
        <section id="buy" className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
              How to <span className="gradient-text">Buy</span>
            </h2>

            <div className="space-y-6">
              <div className="card-glass rounded-xl p-6 flex gap-4">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">1</span>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Connect Wallet</h3>
                  <p className="text-gray-400">Connect your Phantom, Solflare, or any Solana wallet</p>
                </div>
              </div>

              <div className="card-glass rounded-xl p-6 flex gap-4">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">2</span>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Get SOL</h3>
                  <p className="text-gray-400">Make sure you have SOL in your wallet for the purchase and gas fees</p>
                </div>
              </div>

              <div className="card-glass rounded-xl p-6 flex gap-4">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">3</span>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Buy on Meteora</h3>
                  <p className="text-gray-400">Swap SOL for MIGA on Meteora DLMM pool or via bonding curve</p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <a
                href="https://app.meteora.ag/pools/MIGA_POOL"
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                Trade on Meteora <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-emerald-500/10 to-indigo-500/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Join the MIGA Community
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Participate in governance, earn rewards, and shape the future of the protocol.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://miga.us.org" className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition">
                Visit DAO Site
              </a>
              <a href="https://discord.gg/miga" className="px-6 py-3 border border-slate-600 rounded-lg hover:bg-slate-800 transition">
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
