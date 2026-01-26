import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ParsIdentityMint } from '@/components/identity/ParsIdentity';
import { Fingerprint, Shield, Globe, Zap, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const networks = [
  {
    name: 'Pars Network',
    did: 'did:pars',
    chainId: 494949,
    color: '#E6B800',
    description: 'Coercion-resistant identity for the Persian diaspora',
    features: ['Duress codes', 'Dead man switch', 'Post-quantum encryption'],
    mintUrl: '/identity/pars',
    active: true,
  },
  {
    name: 'Hanzo Network',
    did: 'did:hanzo',
    chainId: 36963,
    color: '#8B5CF6',
    description: 'AI-native identity for agent coordination',
    features: ['AI agent attestations', 'Compute proofs', 'Model verification'],
    mintUrl: 'https://hanzo.id',
    active: true,
  },
  {
    name: 'Zoo Network',
    did: 'did:zoo',
    chainId: 200200,
    color: '#10B981',
    description: 'Research identity for decentralized science',
    features: ['Research credentials', 'Peer review', 'Publication proofs'],
    mintUrl: 'https://zoo.id',
    active: true,
  },
  {
    name: 'Sparkle Pony',
    did: 'did:sparkle',
    chainId: 36911,
    color: '#FF69B4',
    description: 'High-performance identity with multiple DID methods',
    features: ['did:sparkle', 'did:spc', 'did:sparklepony'],
    mintUrl: 'https://sparklepony.xyz/id',
    active: false,
  },
  {
    name: 'Lux Network',
    did: 'did:lux',
    chainId: 96369,
    color: '#FFFFFF',
    description: 'Primary network identity with quantum-safe security',
    features: ['Cross-chain resolution', 'ENS integration', 'Privacy layer'],
    mintUrl: 'https://lux.id',
    active: true,
  },
];

export default function Identity() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm mb-6">
              <Fingerprint size={16} />
              <span>Decentralized Identity</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-medium tracking-tight mb-4">
              Mint Your <span className="text-emerald-400">DID</span>
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto">
              Create a decentralized identity on any MIGA ecosystem network.
              Your identity, your control. No KYC required.
            </p>
          </div>

          {/* Main Content - Pars Identity Mint */}
          <div className="mb-16">
            <ParsIdentityMint />
          </div>

          {/* All Networks */}
          <section className="mb-16">
            <h2 className="text-2xl font-medium text-center mb-8">Identity Networks</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {networks.map((network) => (
                <div
                  key={network.name}
                  className={`card rounded-xl p-6 ${!network.active ? 'opacity-50' : ''}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${network.color}20` }}
                    >
                      <Fingerprint
                        className="w-5 h-5"
                        style={{ color: network.color }}
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{network.name}</h3>
                      <code className="text-xs text-neutral-400">{network.did}</code>
                    </div>
                  </div>

                  <p className="text-sm text-white/60 mb-4">{network.description}</p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {network.features.map((feature) => (
                      <span
                        key={feature}
                        className="text-xs px-2 py-1 bg-white/5 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {network.active ? (
                    network.mintUrl.startsWith('/') ? (
                      <Link
                        to={network.mintUrl}
                        className="w-full py-2 px-4 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-colors text-center block"
                      >
                        Mint Identity
                      </Link>
                    ) : (
                      <a
                        href={network.mintUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 px-4 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-colors text-center flex items-center justify-center gap-2"
                      >
                        Mint on {network.name.split(' ')[0]}
                        <ExternalLink size={14} />
                      </a>
                    )
                  ) : (
                    <button
                      disabled
                      className="w-full py-2 px-4 bg-white/5 text-white/40 text-sm font-medium rounded-lg cursor-not-allowed"
                    >
                      Coming Soon
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Features */}
          <section className="mb-16">
            <h2 className="text-2xl font-medium text-center mb-8">Why Decentralized Identity?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="card rounded-xl p-6 text-center">
                <Shield className="w-8 h-8 text-emerald-400 mx-auto mb-4" />
                <h3 className="font-medium mb-2">Privacy First</h3>
                <p className="text-sm text-white/50">
                  No KYC, no email, no phone. Your identity is a cryptographic key
                  that you control completely.
                </p>
              </div>
              <div className="card rounded-xl p-6 text-center">
                <Globe className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                <h3 className="font-medium mb-2">Cross-Chain</h3>
                <p className="text-sm text-white/50">
                  Resolve your DID across all MIGA ecosystem networks.
                  One identity, everywhere.
                </p>
              </div>
              <div className="card rounded-xl p-6 text-center">
                <Zap className="w-8 h-8 text-amber-400 mx-auto mb-4" />
                <h3 className="font-medium mb-2">Coercion Resistant</h3>
                <p className="text-sm text-white/50">
                  Duress codes, dead man switches, and plausible deniability
                  for high-threat environments.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center">
            <div className="card rounded-xl p-8 max-w-2xl mx-auto">
              <h3 className="text-xl font-medium mb-4">Already have a DID?</h3>
              <p className="text-white/50 mb-6">
                Connect your wallet to see your identities across all networks.
              </p>
              <Link
                to="/mint"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold rounded-full hover:from-amber-600 hover:to-orange-600 transition-colors"
              >
                Mint MIGA Tokens
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
