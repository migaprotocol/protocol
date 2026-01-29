import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Share2, Copy, Check, Twitter, MessageCircle, Link as LinkIcon, Users, TrendingUp, Zap, Globe } from 'lucide-react';
import { useState } from 'react';
import { CONSOLIDATED_CHAINS } from '@/lib/bondingCurve';

const SHARE_BASE_URL = 'https://migaprotocol.xyz';

const shareMessages = [
  {
    platform: 'Twitter / X',
    icon: Twitter,
    color: '#1DA1F2',
    messages: [
      'MIGA is the Freedom of Information DAO for the Iranian people. Mint from any chain — BTC, ETH, SOL, and more. 100% goes to the DAO treasury. No VC allocation. Fair launch.\n\nmigaprotocol.xyz',
      'Each chain has its own bonding curve from $0.01 to $1. Find the cheapest chain and mint first.\n\nThe arbitrage window is open.\n\nmigaprotocol.xyz/mint',
      'MIGA funds anti-censorship tech, independent media, and cultural expression for Iran. Not against Iran — for the Iranian people.\n\nmigaprotocol.xyz',
    ],
  },
  {
    platform: 'Telegram',
    icon: MessageCircle,
    color: '#0088CC',
    messages: [
      'MIGA — Freedom of Information DAO\n\nMint from any chain (BTC, ETH, SOL, BNB, XRP, TON, LUX)\n100% to DAO treasury\nNo founders allocation\n1 MIGA = 1 Vote\n\nmigaprotocol.xyz',
      'Each chain has its own bonding curve: $0.01 → $1\n\nCheaper chains = more MIGA per dollar\nArbitrage between chains until prices equalize\n\nmigaprotocol.xyz/mint',
    ],
  },
  {
    platform: 'Group Chats',
    icon: Users,
    color: '#FFD700',
    messages: [
      'Hey — check out MIGA. It\'s a DAO funding anti-censorship tools and independent media for Iran. Fair launch on 7 chains, bonding curve from $0.01 to $1. No VC, no team tokens.\n\nmigaprotocol.xyz',
    ],
  },
];

const strategies = [
  {
    icon: TrendingUp,
    title: 'Bonding Curve Arbitrage',
    description: 'Each chain has its own price curve from $0.01 to $1. Mint on the cheapest chain first. As one chain fills up, the next cheapest becomes the opportunity.',
  },
  {
    icon: Zap,
    title: 'Early Minter Advantage',
    description: 'Price starts at $0.01 on every chain. The earlier you mint, the more MIGA you get per dollar. First movers get 100x more tokens than last minters.',
  },
  {
    icon: Globe,
    title: 'Multi-Chain Strategy',
    description: 'Spread across chains to find the best price. Bitcoin and Ethereum fill fastest. Try Solana, TON, or LUX for potentially cheaper entry points.',
  },
  {
    icon: Users,
    title: 'Community Leaderboard',
    description: 'The Chain Leaderboard tracks which networks contribute the most. Higher-performing chains may receive bonus allocation. Rally your chain\'s community.',
  },
];

export default function Share() {
  const [copiedIdx, setCopiedIdx] = useState<string | null>(null);

  const copyText = async (text: string, idx: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm mb-6">
              <Share2 size={16} />
              <span>Spread the Word</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-medium tracking-tight mb-4">
              Share <span className="text-gold">MIGA</span>
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto">
              Help build the freedom of information movement. Share MIGA with your community
              and help fund anti-censorship technology for the Iranian people.
            </p>
          </div>

          {/* Quick Share Links */}
          <section className="mb-12">
            <h2 className="text-xl font-medium mb-6">Quick Share</h2>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { label: 'Main Site', url: SHARE_BASE_URL },
                { label: 'Mint Page', url: `${SHARE_BASE_URL}/mint` },
                { label: 'Token Info', url: `${SHARE_BASE_URL}/token` },
              ].map((link) => (
                <button
                  key={link.label}
                  onClick={() => copyText(link.url, `link-${link.label}`)}
                  className="flex items-center justify-between p-4 bg-white/[0.03] border border-white/10 rounded-xl hover:border-gold/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <LinkIcon size={16} className="text-gold" />
                    <span className="text-sm">{link.label}</span>
                  </div>
                  {copiedIdx === `link-${link.label}` ? (
                    <Check size={16} className="text-emerald-400" />
                  ) : (
                    <Copy size={16} className="text-white/30" />
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* Chain-Specific Mint Links */}
          <section className="mb-12">
            <h2 className="text-xl font-medium mb-4">Chain Mint Links</h2>
            <p className="text-sm text-white/40 mb-4">
              Share a direct link to mint on a specific chain. Each chain has its own bonding curve — cheaper chains attract early minters.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {CONSOLIDATED_CHAINS.map((chain) => (
                <button
                  key={chain.id}
                  onClick={() => copyText(`${SHARE_BASE_URL}/mint/${chain.id.toLowerCase()}`, `chain-${chain.id}`)}
                  className="flex items-center gap-2 p-3 bg-white/[0.03] border border-white/10 rounded-lg hover:border-white/20 transition-colors"
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${chain.color}20` }}
                  >
                    <img
                      src={chain.icon}
                      alt={chain.name}
                      className="w-4 h-4"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  </div>
                  <span className="text-xs truncate">{chain.name}</span>
                  {copiedIdx === `chain-${chain.id}` ? (
                    <Check size={12} className="text-emerald-400 ml-auto flex-shrink-0" />
                  ) : (
                    <Copy size={12} className="text-white/20 ml-auto flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* Mint Strategy */}
          <section className="mb-12">
            <h2 className="text-xl font-medium mb-6">Mint Strategy</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {strategies.map((s) => (
                <div key={s.title} className="p-5 bg-white/[0.03] border border-white/10 rounded-xl">
                  <s.icon size={20} className="text-gold mb-3" />
                  <h3 className="text-base font-medium mb-2">{s.title}</h3>
                  <p className="text-sm text-white/50">{s.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Ready-to-Share Messages */}
          <section className="mb-12">
            <h2 className="text-xl font-medium mb-6">Ready-to-Share Messages</h2>
            <div className="space-y-6">
              {shareMessages.map((platform) => (
                <div key={platform.platform}>
                  <div className="flex items-center gap-2 mb-3">
                    <platform.icon size={18} style={{ color: platform.color }} />
                    <h3 className="text-sm font-medium" style={{ color: platform.color }}>
                      {platform.platform}
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {platform.messages.map((msg, idx) => {
                      const key = `${platform.platform}-${idx}`;
                      return (
                        <div
                          key={key}
                          className="p-4 bg-white/[0.03] border border-white/10 rounded-xl"
                        >
                          <pre className="text-sm text-white/70 whitespace-pre-wrap font-sans mb-3">
                            {msg}
                          </pre>
                          <button
                            onClick={() => copyText(msg, key)}
                            className="flex items-center gap-2 text-xs text-white/40 hover:text-gold transition-colors"
                          >
                            {copiedIdx === key ? (
                              <>
                                <Check size={14} className="text-emerald-400" />
                                <span className="text-emerald-400">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy size={14} />
                                <span>Copy message</span>
                              </>
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Key Facts */}
          <section className="mb-12">
            <h2 className="text-xl font-medium mb-6">Key Facts to Share</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                '1,000,000,000 total MIGA supply',
                '0% founders / VC allocation',
                '100% of raised funds → DAO treasury',
                '1 MIGA = 1 vote in governance',
                '7 supported chains for minting',
                'Bonding curve: $0.01 → $1 per chain',
                'Mint closes at Nowruz (March 20)',
                'Unsold MIGA returns to DAO',
                'Claim natively on Pars Network',
                'Funds anti-censorship tech for Iran',
              ].map((fact) => (
                <div
                  key={fact}
                  className="flex items-start gap-2 p-3 bg-white/[0.02] border border-white/5 rounded-lg"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                  <span className="text-sm text-white/60">{fact}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
