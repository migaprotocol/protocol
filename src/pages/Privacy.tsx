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
            prose-table:text-sm
            prose-th:text-white/80 prose-th:font-medium prose-th:border-white/10
            prose-td:text-white/60 prose-td:border-white/10
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
              including shielded transactions and private voting capabilities.
            </p>

            <h2>1. Information We Collect</h2>

            <h3>1.1 Blockchain Data (Public)</h3>
            <p>
              When you interact with the Protocol's smart contracts, certain information is recorded
              on public blockchains:
            </p>
            <ul>
              <li>Wallet addresses you use to interact with the Protocol</li>
              <li>Transaction history and amounts (unless using shielded features)</li>
              <li>Governance votes (unless using private voting)</li>
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
              <li>Referral sources</li>
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

            <h2>2. Privacy-Preserving Features</h2>
            <p>
              MIGA Protocol incorporates advanced privacy technologies through the Lux Network:
            </p>

            <table>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Technology</th>
                  <th>Protection</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Private Voting</td>
                  <td>TFHE (T-Chain)</td>
                  <td>Individual votes encrypted</td>
                </tr>
                <tr>
                  <td>Shielded Treasury</td>
                  <td>FHE (Z-Chain)</td>
                  <td>Beneficiary identities hidden</td>
                </tr>
                <tr>
                  <td>Secure Communications</td>
                  <td>ML-KEM (Q-Chain)</td>
                  <td>Post-quantum encryption</td>
                </tr>
                <tr>
                  <td>Public Governance</td>
                  <td>Standard EVM (C-Chain)</td>
                  <td>Transparent when needed</td>
                </tr>
              </tbody>
            </table>

            <h3>2.1 What Is Public vs. Private</h3>
            <table>
              <thead>
                <tr>
                  <th>Public (by design)</th>
                  <th>Private (protected)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Governance outcomes and totals</td>
                  <td>Individual votes</td>
                </tr>
                <tr>
                  <td>Treasury balances and rules</td>
                  <td>Beneficiary identities</td>
                </tr>
                <tr>
                  <td>Audit trails and receipts</td>
                  <td>Transfer routes</td>
                </tr>
                <tr>
                  <td>Protocol parameters</td>
                  <td>Operator keys</td>
                </tr>
              </tbody>
            </table>

            <h2>3. How We Use Information</h2>
            <p>Limited information may be used for:</p>
            <ul>
              <li>Improving Protocol functionality and user experience</li>
              <li>Analyzing aggregate usage patterns</li>
              <li>Ensuring Protocol security and preventing abuse</li>
              <li>Responding to legal requirements when applicable</li>
            </ul>

            <h2>4. Data Sharing</h2>
            <p>We do not sell, rent, or share personal information. Data may be disclosed only in:</p>
            <ul>
              <li><strong>Public blockchain data:</strong> Inherently visible on-chain</li>
              <li><strong>Legal requirements:</strong> When required by law or legal process</li>
              <li><strong>Security incidents:</strong> To protect users and the Protocol</li>
              <li><strong>Governance:</strong> Aggregated, anonymized data for DAO decision-making</li>
            </ul>

            <h2>5. Third-Party Services</h2>
            <p>
              The Protocol integrates with third-party services that have their own privacy policies:
            </p>
            <ul>
              <li><strong>Blockchain Networks:</strong> Solana, Ethereum, Base, Arbitrum, Polygon, Lux, Bitcoin</li>
              <li><strong>Bridge Protocols:</strong> Wormhole, Lux Bridge, Zeus Network</li>
              <li><strong>Wallet Providers:</strong> MetaMask, Phantom, WalletConnect, and others</li>
              <li><strong>RPC Providers:</strong> Various blockchain node providers</li>
            </ul>
            <p>
              Please review the privacy policies of these services as they may collect additional data.
            </p>

            <h2>6. Cookies and Local Storage</h2>
            <p>The website may use:</p>
            <ul>
              <li><strong>Essential cookies:</strong> Required for basic functionality</li>
              <li><strong>Local storage:</strong> To remember your preferences</li>
              <li><strong>Session data:</strong> Temporary data during your visit</li>
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
              <li><strong>Privacy features:</strong> Use shielded transactions and private voting</li>
            </ul>
            <p>
              <strong>Note:</strong> Blockchain data cannot be modified or deleted due to the
              immutable nature of distributed ledgers.
            </p>

            <h2>8. Security</h2>
            <p>
              We implement security measures to protect information including:
            </p>
            <ul>
              <li>Smart contract audits by reputable security firms</li>
              <li>Encrypted communications (HTTPS/TLS)</li>
              <li>Access controls and authentication for administrative functions</li>
              <li>Regular security reviews and updates</li>
              <li>Post-quantum cryptography preparation (via Lux Network)</li>
            </ul>

            <h2>9. International Users</h2>
            <p>
              The Protocol is accessible globally. If you access the Services from outside the
              jurisdiction where servers are located, your information may be transferred across
              borders. By using the Services, you consent to such transfers.
            </p>

            <h2>10. Children's Privacy</h2>
            <p>
              The Services are not intended for users under 18 years of age. We do not knowingly
              collect information from children. If you believe a child has provided information,
              please contact us.
            </p>

            <h2>11. Changes to This Policy</h2>
            <p>
              This Privacy Policy may be updated through the Protocol's governance process.
              Significant changes will be communicated through official channels. The "Last updated"
              date at the top indicates when changes were made.
            </p>

            <h2>12. Contact</h2>
            <p>
              For privacy-related questions or requests:
            </p>
            <ul>
              <li>Discord: <a href="https://discord.gg/miga" target="_blank" rel="noopener noreferrer">discord.gg/miga</a></li>
              <li>Telegram: <a href="https://t.me/MIGADAO" target="_blank" rel="noopener noreferrer">t.me/MIGADAO</a></li>
              <li>GitHub: <a href="https://github.com/migaprotocol" target="_blank" rel="noopener noreferrer">github.com/migaprotocol</a></li>
            </ul>

            <h2>Summary</h2>
            <p>
              <strong>Our commitment:</strong> MIGA Protocol is built with privacy as a first principle.
              We collect minimal data, provide strong privacy tools, and give you control over your
              information. The decentralized nature of the Protocol means no single entity has access
              to your assets or complete transaction history.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
