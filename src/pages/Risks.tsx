import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AlertTriangle } from 'lucide-react';

export default function Risks() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <AlertTriangle className="text-amber-500" />
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-medium tracking-tight">
                <span className="text-amber-500">Risk Disclosure</span>
              </h1>
              <p className="text-white/50 text-sm mt-1">Last updated: January 2026</p>
            </div>
          </div>

          {/* Warning Banner */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6 mb-12">
            <p className="text-amber-500 font-medium mb-2">⚠️ Important Notice</p>
            <p className="text-white/70 text-sm">
              Digital assets and decentralized finance (DeFi) involve significant risks.
              You could lose some or all of your investment. Please read this entire
              disclosure carefully before participating in the MIGA Protocol.
            </p>
          </div>

          <div className="prose prose-invert max-w-none
            prose-headings:font-medium prose-headings:tracking-tight
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-white prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-3
            prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-white/90
            prose-h4:text-base prose-h4:mt-6 prose-h4:mb-2 prose-h4:text-white/80
            prose-p:text-white/60 prose-p:leading-relaxed prose-p:text-sm
            prose-li:text-white/60 prose-li:text-sm
            prose-strong:text-white prose-strong:font-medium
            prose-a:text-gold prose-a:no-underline hover:prose-a:underline
          ">
            <h2>1. General Investment Risks</h2>

            <h3>1.1 Market Volatility</h3>
            <p>
              The value of digital assets, including MIGA tokens, can be extremely volatile.
              Prices can rise or fall significantly within very short periods. Historical price
              performance is not indicative of future results.
            </p>
            <ul>
              <li>Token values can drop to zero</li>
              <li>Liquidity may not always be available</li>
              <li>Market conditions can change rapidly</li>
              <li>External events can cause sudden price movements</li>
            </ul>

            <h3>1.2 No Guaranteed Returns</h3>
            <p>
              <strong>There are no guaranteed returns in DeFi.</strong> Any yields, rewards, or
              returns are subject to market conditions, protocol performance, and various risks.
              Projected or historical returns should not be relied upon as indicators of future performance.
            </p>

            <h3>1.3 Loss of Principal</h3>
            <p>
              You should only participate with funds you can afford to lose entirely.
              Never invest emergency funds, retirement savings, or borrowed money in digital assets.
            </p>

            <h2>2. Smart Contract Risks</h2>

            <h3>2.1 Code Vulnerabilities</h3>
            <p>
              Smart contracts are computer programs that may contain bugs, vulnerabilities, or
              unintended behaviors:
            </p>
            <ul>
              <li><strong>Exploits:</strong> Malicious actors may discover and exploit vulnerabilities</li>
              <li><strong>Logic errors:</strong> Contract logic may not behave as intended</li>
              <li><strong>Upgrade risks:</strong> Contract upgrades may introduce new issues</li>
              <li><strong>Dependency risks:</strong> Reliance on external contracts or oracles</li>
            </ul>

            <h3>2.2 Audit Limitations</h3>
            <p>
              While the Protocol undergoes security audits, audits do not guarantee the absence
              of vulnerabilities. Audits are point-in-time assessments and may not cover all
              attack vectors or future changes.
            </p>

            <h3>2.3 Immutability</h3>
            <p>
              Once deployed, many smart contract functions cannot be modified. This means bugs
              or issues may be difficult or impossible to fix after deployment.
            </p>

            <h2>3. Protocol-Specific Risks</h2>

            <h3>3.1 Token Distribution Risks</h3>
            <p>The MIGA mint process involves specific risks:</p>
            <ul>
              <li>Token distribution is proportional to contributions at mint close</li>
              <li>The value of contributed assets may fluctuate before distribution</li>
              <li>Chain Leaderboard rankings affect relative allocations</li>
              <li>Mint parameters are set by governance and cannot be reversed</li>
            </ul>

            <h3>3.2 Governance Risks</h3>
            <p>
              Governance token holders make decisions about the Protocol. These decisions may not
              always align with your interests:
            </p>
            <ul>
              <li>Proposals may change Protocol parameters</li>
              <li>Treasury allocations are determined by governance votes</li>
              <li>Fee structures can be modified</li>
              <li>Large token holders may have outsized influence</li>
            </ul>

            <h3>3.3 Multi-Chain Risks</h3>
            <p>
              MIGA accepts contributions across 7+ blockchain networks, each with unique risks:
            </p>
            <ul>
              <li><strong>Bitcoin:</strong> Irreversible transactions, longer confirmation times</li>
              <li><strong>Ethereum:</strong> High gas fees, MEV exposure</li>
              <li><strong>EVM L2s (Base, Optimism, Arbitrum):</strong> Sequencer risks, bridge dependencies</li>
              <li><strong>Solana:</strong> Network congestion, validator concentration</li>
              <li><strong>XRP / TON:</strong> Memo requirements — missing memo results in lost funds</li>
              <li><strong>Pars Network:</strong> New network, evolving validator set</li>
            </ul>

            <h3>3.4 Bridge Risks</h3>
            <p>
              Cross-chain bridges are historically high-risk components in DeFi. Bridge failures
              can result in loss of bridged assets, inability to transfer tokens, or price
              discrepancies between chains. All bridge infrastructure used by MIGA undergoes
              security review, but no bridge is risk-free.
            </p>

            <h2>4. Regulatory and Legal Risks</h2>

            <h3>4.1 Regulatory Uncertainty</h3>
            <p>
              The regulatory environment for digital assets is evolving and uncertain:
            </p>
            <ul>
              <li>Laws may change making Protocol participation illegal in your jurisdiction</li>
              <li>Tokens may be classified as securities in some jurisdictions</li>
              <li>Tax treatment varies by jurisdiction and may change</li>
              <li>Enforcement actions may affect Protocol operations</li>
            </ul>

            <h3>4.2 Jurisdictional Restrictions</h3>
            <p>
              The Protocol may not be available in all jurisdictions. You are responsible for
              ensuring your participation complies with all applicable laws and regulations in
              your jurisdiction.
            </p>

            <h3>4.3 Sanctions Compliance</h3>
            <p>
              Users subject to economic sanctions or located in sanctioned jurisdictions may be
              prohibited from using the Protocol. Use of the Protocol by sanctioned persons may
              result in asset seizure or legal consequences.
            </p>

            <h2>5. Technical and Operational Risks</h2>

            <h3>5.1 Private Key Security</h3>
            <p>
              You are solely responsible for securing your private keys and wallet credentials:
            </p>
            <ul>
              <li>Lost private keys result in permanent loss of assets</li>
              <li>Compromised keys can lead to theft of all assets</li>
              <li>No recovery mechanism exists for lost or stolen keys</li>
              <li>Hardware wallet failures can result in access loss</li>
            </ul>

            <h3>5.2 Transaction Risks</h3>
            <p>
              Blockchain transactions are irreversible:
            </p>
            <ul>
              <li>Incorrect addresses result in permanent loss</li>
              <li>Failed transactions may still incur fees</li>
              <li>Network congestion may delay transactions</li>
              <li>Front-running and MEV may affect transaction outcomes</li>
            </ul>

            <h3>5.3 Oracle Risks</h3>
            <p>
              The Protocol may rely on price oracles and external data feeds. Oracle manipulation
              or failure can result in incorrect pricing, liquidations, or other adverse outcomes.
            </p>

            <h3>5.4 Infrastructure Risks</h3>
            <p>
              The Protocol depends on external infrastructure:
            </p>
            <ul>
              <li>RPC node failures may prevent transactions</li>
              <li>Website unavailability may prevent access to UI</li>
              <li>IPFS or decentralized storage failures may affect data availability</li>
              <li>Internet connectivity is required for all interactions</li>
            </ul>

            <h2>6. DAO Treasury Risks</h2>

            <h3>6.1 Treasury Management</h3>
            <p>
              DAO treasuries are managed by governance processes:
            </p>
            <ul>
              <li>Investment strategies may result in losses</li>
              <li>Treasury assets may be allocated to failed initiatives</li>
              <li>Multi-sig compromises may affect treasury security</li>
              <li>Yield strategies carry their own DeFi risks</li>
            </ul>

            <h3>6.2 Program Risks</h3>
            <p>
              Each funded program carries specific risks related to its domain, jurisdiction,
              and implementation. Research each program and its governance proposals before
              participating.
            </p>

            <h2>7. External Risks</h2>

            <h3>7.1 Third-Party Dependencies</h3>
            <p>
              The Protocol relies on third-party protocols and services:
            </p>
            <ul>
              <li>DEX liquidity and availability</li>
              <li>Wallet provider security and reliability</li>
              <li>Blockchain network operation and governance</li>
              <li>External protocol integrations</li>
            </ul>

            <h3>7.2 Economic Attacks</h3>
            <p>
              DeFi protocols can be vulnerable to economic attacks:
            </p>
            <ul>
              <li>Flash loan attacks</li>
              <li>Price manipulation</li>
              <li>Governance attacks</li>
              <li>Liquidity drain attacks</li>
            </ul>

            <h3>7.3 Force Majeure</h3>
            <p>
              Events beyond anyone's control may affect the Protocol:
            </p>
            <ul>
              <li>Natural disasters affecting infrastructure</li>
              <li>War or civil unrest</li>
              <li>Pandemic-related disruptions</li>
              <li>Major economic crises</li>
            </ul>

            <h2>8. No Insurance or Guarantees</h2>
            <p>
              <strong>Digital assets held in the Protocol are not insured</strong> by any
              government agency, deposit insurance corporation, or private insurance unless
              explicitly stated. There is no guarantee of recovery in case of loss.
            </p>

            <h2>9. Due Diligence Recommendations</h2>
            <p>Before participating in the MIGA Protocol, you should:</p>
            <ul>
              <li>Read and understand all documentation, including the whitepaper</li>
              <li>Review smart contract audits and security assessments</li>
              <li>Consult with financial, legal, and tax professionals</li>
              <li>Start with small amounts you can afford to lose</li>
              <li>Diversify and avoid putting all assets in one protocol</li>
              <li>Stay informed about Protocol updates and governance</li>
              <li>Use hardware wallets and strong security practices</li>
              <li>Understand the specific risks of each chain and feature</li>
            </ul>

            <h2>10. Acknowledgment</h2>
            <p>
              By using the MIGA Protocol, you acknowledge that:
            </p>
            <ul>
              <li>You have read and understood this Risk Disclosure</li>
              <li>You accept all risks associated with using the Protocol</li>
              <li>You are acting on your own judgment and at your own risk</li>
              <li>You are not relying on any representations or guarantees</li>
              <li>You understand that past performance does not indicate future results</li>
              <li>You may lose some or all of your investment</li>
            </ul>

            <h2>Contact</h2>
            <p>
              For questions about risks or security concerns:
            </p>
            <ul>
              <li>Discord: <a href="https://discord.gg/miga" target="_blank" rel="noopener noreferrer">discord.gg/miga</a></li>
              <li>Security: Report vulnerabilities through our bug bounty program</li>
              <li>GitHub: <a href="https://github.com/migaprotocol" target="_blank" rel="noopener noreferrer">github.com/migaprotocol</a></li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
