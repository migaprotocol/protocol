import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Shield } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-lg bg-[#C9A227]/10 flex items-center justify-center">
              <Shield className="text-gold" />
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-medium tracking-tight">
                <span className="text-gold">Privacy Policy</span>
              </h1>
              <p className="text-white/50 text-sm mt-1">Last updated: January 2026</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none
            prose-headings:font-medium prose-headings:tracking-tight
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-white prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-3
            prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-white/90
            prose-p:text-white/60 prose-p:leading-relaxed prose-p:text-sm
            prose-li:text-white/60 prose-li:text-sm
            prose-strong:text-gold prose-strong:font-medium
            prose-a:text-gold prose-a:no-underline hover:prose-a:underline
          ">
            <h2>Introduction</h2>
            <p>
              MIGA Protocol ("we," "our," or "Protocol") is committed to protecting user privacy.
              This Privacy Policy explains how information is collected, used, and protected when
              you use our decentralized protocol and associated services.
            </p>
            <p>
              <strong>Privacy is a core principle of MIGA.</strong> We believe in minimal data collection
              and maximum user control. The Protocol is designed to operate with strong privacy guarantees,
              including private voting and encrypted communications on Pars Network.
            </p>

            <h2>1. Information We Collect</h2>

            <h3>1.1 Blockchain Data (Public)</h3>
            <p>
              When you interact with the Protocol's smart contracts, certain information is recorded
              on public blockchains:
            </p>
            <ul>
              <li>Wallet addresses you use to interact with the Protocol</li>
              <li>Transaction history and amounts</li>
              <li>Smart contract interactions and timestamps</li>
            </ul>
            <p>
              <strong>Note:</strong> This data is inherent to blockchain technology and is publicly
              accessible. We do not control or have the ability to delete blockchain data.
            </p>

            <h3>1.2 Website Analytics (Minimal)</h3>
            <p>
              Our website may collect limited, anonymized analytics data to improve user experience:
            </p>
            <ul>
              <li>Page views and navigation patterns (anonymized)</li>
              <li>Browser type and device information</li>
              <li>Approximate geographic region</li>
            </ul>
            <p>
              We use privacy-respecting analytics tools that do not track individual users across
              websites or create advertising profiles.
            </p>

            <h3>1.3 Information We Do NOT Collect</h3>
            <ul>
              <li>Personal identification documents</li>
              <li>Email addresses (unless voluntarily provided)</li>
              <li>Phone numbers</li>
              <li>Real names or physical addresses</li>
              <li>Financial account information</li>
              <li>Private keys or seed phrases</li>
            </ul>

            <h2>2. Privacy Features</h2>
            <p>
              MIGA operates on Pars Network, a privacy-first blockchain with built-in protections:
            </p>
            <ul>
              <li><strong>Private Voting:</strong> Individual governance votes are encrypted</li>
              <li><strong>Quantum-Safe Encryption:</strong> Post-quantum cryptography protects communications</li>
              <li><strong>Shielded Treasury:</strong> Beneficiary identities can be protected</li>
              <li><strong>Public Accountability:</strong> Governance outcomes and treasury totals remain transparent</li>
            </ul>

            <h3>2.1 What Is Public vs. Private</h3>
            <ul>
              <li><strong>Public:</strong> Governance outcomes, treasury balances, audit trails, protocol parameters</li>
              <li><strong>Private:</strong> Individual votes, beneficiary identities, transfer routes, operator keys</li>
            </ul>

            <h2>3. How We Use Information</h2>
            <p>Limited information may be used for:</p>
            <ul>
              <li>Improving Protocol functionality and user experience</li>
              <li>Analyzing aggregate usage patterns</li>
              <li>Ensuring Protocol security and preventing abuse</li>
              <li>Responding to legal requirements when applicable</li>
            </ul>

            <h2>4. Data Sharing</h2>
            <p>We do not sell, rent, or share personal information. Data may be disclosed only:</p>
            <ul>
              <li><strong>Public blockchain data:</strong> Inherently visible on-chain</li>
              <li><strong>Legal requirements:</strong> When required by law</li>
              <li><strong>Security incidents:</strong> To protect users and the Protocol</li>
            </ul>

            <h2>5. Third-Party Services</h2>
            <p>
              The Protocol integrates with third-party services (blockchain networks, wallet providers,
              bridge protocols) that have their own privacy policies. Please review their policies as
              they may collect additional data.
            </p>

            <h2>6. Cookies and Local Storage</h2>
            <p>The website may use:</p>
            <ul>
              <li><strong>Essential cookies:</strong> Required for basic functionality</li>
              <li><strong>Local storage:</strong> To remember your preferences</li>
            </ul>
            <p>
              We do not use tracking cookies or third-party advertising cookies.
            </p>

            <h2>7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li><strong>Access:</strong> Request information about data associated with your wallet</li>
              <li><strong>Portability:</strong> Export your on-chain data (publicly available)</li>
              <li><strong>Erasure:</strong> Request deletion of off-chain data where applicable</li>
              <li><strong>Opt-out:</strong> Disable non-essential analytics</li>
            </ul>
            <p>
              <strong>Note:</strong> Blockchain data cannot be modified or deleted due to the
              immutable nature of distributed ledgers.
            </p>

            <h2>8. Security</h2>
            <p>
              We implement security measures including smart contract audits, encrypted communications
              (HTTPS/TLS), access controls, and regular security reviews.
            </p>

            <h2>9. Children's Privacy</h2>
            <p>
              The Services are not intended for users under 18 years of age. We do not knowingly
              collect information from children.
            </p>

            <h2>10. Changes to This Policy</h2>
            <p>
              This Privacy Policy may be updated through the Protocol's governance process.
              Significant changes will be communicated through official channels.
            </p>

            <h2>11. Contact</h2>
            <p>
              For privacy-related questions:
            </p>
            <ul>
              <li>Discord: <a href="https://discord.gg/miga" target="_blank" rel="noopener noreferrer">discord.gg/miga</a></li>
              <li>Telegram: <a href="https://t.me/MIGADAO" target="_blank" rel="noopener noreferrer">t.me/MIGADAO</a></li>
              <li>GitHub: <a href="https://github.com/migaprotocol" target="_blank" rel="noopener noreferrer">github.com/migaprotocol</a></li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
