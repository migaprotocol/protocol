import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MigaBridge } from '@/components/bridge';
import { MIGA_CHAINS, MIGA_DAO_WALLET } from '@/components/bridge/networks';
import { Wallet, Shield, ExternalLink, ArrowRight, Sparkles, Users, Lock, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  {
    number: '1',
    title: 'Select Chain',
    description: 'Choose from 7 supported blockchains',
  },
  {
    number: '2',
    title: 'Send Donation',
    description: 'Send tokens to the DAO treasury address',
  },
  {
    number: '3',
    title: 'Receive MIGA',
    description: 'Get MIGA tokens on Lux network via bridge',
  },
];

const features = [
  {
    icon: Shield,
    title: '3-of-5 MPC Security',
    description: 'All donations are secured by Utila MPC with 3-of-5 DAO signers required for any transaction.',
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
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm mb-6">
              <Sparkles size={16} />
              <span>Multi-Chain Donations Open</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-medium tracking-tight mb-4">
              Mint <span className="text-gold">$MIGA</span>
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto">
              Donate from any of 7 supported chains. All donations go directly to the DAO treasury
              and are used for protocol development and community initiatives.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Bridge Widget */}
            <div>
              <MigaBridge className="sticky top-24" />
            </div>

            {/* How It Works */}
            <div>
              <h2 className="text-xl font-medium mb-6 flex items-center gap-2">
                <ArrowRight size={20} className="text-gold" />
                How It Works
              </h2>

              <div className="space-y-4 mb-8">
                {steps.map((step, idx) => (
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

              {/* Supported Chains */}
              <div className="card rounded-xl p-6 mb-6">
                <h3 className="text-base font-medium mb-4">Supported Chains</h3>
                <div className="flex flex-wrap gap-2">
                  {MIGA_CHAINS.filter(c => c.enabled).map((chain) => (
                    <div
                      key={chain.id}
                      className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg"
                    >
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: chain.color }}
                      />
                      <span className="text-sm">{chain.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security Notice */}
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                <div className="flex items-start gap-3">
                  <Shield className="text-emerald-500 mt-0.5" size={20} />
                  <div>
                    <p className="text-sm font-medium text-emerald-400 mb-1">Secured by Utila MPC</p>
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
            <h2 className="text-2xl font-medium text-center mb-8">Why Donate to MIGA?</h2>
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
              <h3 className="text-xl font-medium mb-4">Learn More About MIGA</h3>
              <p className="text-white/50 mb-6">
                Read our whitepaper to understand the tokenomics, governance structure, and roadmap.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/token"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gold text-black font-semibold rounded-full hover:bg-gold/90 transition-colors"
                >
                  <Wallet size={18} />
                  Token Details
                </Link>
                <Link
                  to="/docs"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/20 rounded-full hover:bg-white/5 transition-colors"
                >
                  <ExternalLink size={18} />
                  Read Whitepaper
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
