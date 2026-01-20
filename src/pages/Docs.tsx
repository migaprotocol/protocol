import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FileText, ExternalLink } from 'lucide-react';

export default function Docs() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />

      <main className="flex-1 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-medium mb-10 tracking-tight">
            <span className="gradient-text">Documentation</span>
          </h1>

          {/* Whitepaper CTA */}
          <a
            href="https://github.com/miga-protocol/miga/blob/main/whitepaper/MIGA-Whitepaper.md"
            className="card-glass rounded-xl p-6 mb-12 flex items-center gap-4 hover:border-gold/30 transition-all group"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center">
              <FileText className="text-gold" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-medium group-hover:text-gold transition-colors">MIGA Whitepaper</h3>
              <p className="text-zinc-500 text-sm">Full technical documentation and protocol design</p>
            </div>
            <ExternalLink className="text-zinc-600 group-hover:text-gold transition-colors" size={18} />
          </a>

          <div className="prose prose-invert prose-zinc max-w-none
            prose-headings:font-medium prose-headings:tracking-tight
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-white
            prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-zinc-200
            prose-p:text-zinc-400 prose-p:leading-relaxed prose-p:text-sm
            prose-li:text-zinc-400 prose-li:text-sm
            prose-strong:text-gold prose-strong:font-medium
            prose-a:text-gold prose-a:no-underline hover:prose-a:underline
            prose-table:text-sm
            prose-th:text-zinc-300 prose-th:font-medium prose-th:border-zinc-800
            prose-td:text-zinc-400 prose-td:border-zinc-800
          ">
            <h2>Overview</h2>
            <p>
              MIGA is a community-driven DAO on Solana with a focus on fair distribution
              and decentralized governance. The protocol uses Meteora DLMM for liquidity
              provisioning and a one-sided bonding curve for fair price discovery.
            </p>
            <p className="text-gold font-medium">
              No VCs. No presales. No team allocation. Just fair launch + deep liquidity + community treasury.
            </p>

            <h2>Tokenomics</h2>
            <h3>Distribution</h3>
            <ul>
              <li><strong>10% (100M)</strong> — Meteora DLMM Liquidity Pool — Deep initial liquidity</li>
              <li><strong>40% (400M)</strong> — One-sided Bonding Curve Sale — Fair price discovery</li>
              <li><strong>50% (500M)</strong> — Treasury (DAO Governed) — Community fund</li>
            </ul>

            <h3>Meteora LP (10%)</h3>
            <p>
              100 million MIGA tokens are paired with SOL in a Meteora DLMM pool to provide
              deep initial liquidity. The DLMM (Dynamic Liquidity Market Maker) offers
              concentrated liquidity with better capital efficiency than traditional AMMs.
            </p>

            <h3>Bonding Curve (40%)</h3>
            <p>
              400 million tokens are sold through a one-sided bonding curve. This mechanism
              ensures fair price discovery — as more tokens are purchased, the price gradually
              increases. Everyone buys on the same curve with no presale or insider pricing.
            </p>

            <h3>Treasury (50%)</h3>
            <p>
              500 million tokens are held in the DAO treasury — the largest community allocation
              in the space. These tokens are governed by MIGA holders through on-chain voting:
            </p>
            <ul>
              <li>Ecosystem development grants</li>
              <li>Liquidity incentives</li>
              <li>Community initiatives</li>
              <li>Strategic partnerships</li>
              <li>Security audits</li>
            </ul>

            <h2>Governance</h2>
            <p>
              MIGA uses Realms for on-chain governance. Token holders can:
            </p>
            <ul>
              <li>Submit proposals (minimum 0.1% of supply required)</li>
              <li>Vote on proposals (1 MIGA = 1 vote)</li>
              <li>Execute passed proposals after timelock</li>
            </ul>

            <h3>Voting Parameters</h3>
            <table>
              <thead>
                <tr>
                  <th>Parameter</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Proposal Threshold</td>
                  <td className="font-mono">1,000,000 MIGA (0.1%)</td>
                </tr>
                <tr>
                  <td>Quorum</td>
                  <td className="font-mono">40,000,000 MIGA (4%)</td>
                </tr>
                <tr>
                  <td>Approval</td>
                  <td className="font-mono">51% majority</td>
                </tr>
                <tr>
                  <td>Voting Period</td>
                  <td className="font-mono">3 days</td>
                </tr>
                <tr>
                  <td>Timelock</td>
                  <td className="font-mono">24 hours</td>
                </tr>
              </tbody>
            </table>

            <h2>Security</h2>
            <p>
              The MIGA token is a standard SPL token with no admin keys or special privileges.
              The treasury is controlled by the DAO and cannot be accessed without
              community approval through governance.
            </p>
            <ul>
              <li>Open source smart contracts</li>
              <li>No mint authority post-launch</li>
              <li>Timelock on all governance actions</li>
              <li>Multi-sig treasury protection</li>
            </ul>

            <h2>Links</h2>
            <ul>
              <li><a href="https://miga.us.org">DAO Website</a></li>
              <li><a href="https://github.com/miga-protocol">GitHub</a></li>
              <li><a href="https://discord.gg/miga">Discord</a></li>
              <li><a href="https://twitter.com/migaprotocol">Twitter</a></li>
              <li><a href="https://realms.today/dao/miga">Governance (Realms)</a></li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
