import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FileText } from 'lucide-react';

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-lg bg-[#C9A227]/10 flex items-center justify-center">
              <FileText className="text-gold" />
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-medium tracking-tight">
                <span className="text-gold">Terms of Service</span>
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
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using the MIGA Protocol ("Protocol"), including all associated websites,
              smart contracts, decentralized applications, and services (collectively, "Services"),
              you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these
              Terms, do not use the Services.
            </p>

            <h2>2. Nature of the Protocol</h2>

            <h3>2.1 Decentralized Autonomous Organization</h3>
            <p>
              MIGA is a decentralized on-chain DAO owned by no single person or entity. The DAO is
              governed by its token holders through on-chain voting. During the initial fundraise
              period, governance and fund distribution for humanitarian causes is facilitated through
              infrastructure provided by supporting organizations.
            </p>

            <h3>2.2 Non-Custodial</h3>
            <p>
              The Protocol is entirely non-custodial. No entity has custody of your wallet or the
              funds you send. All contributions are sent directly to on-chain multi-signature
              treasury addresses. No intermediary takes custody of funds at any point.
            </p>

            <h3>2.3 Humanitarian Purpose</h3>
            <p>
              MIGA exists to fund anti-censorship technology, independent media, and cultural
              expression for the people of Iran. 100% of contributed funds (less blockchain
              processing fees) go to the DAO multi-sig treasury. No fees are taken by any party.
              This is a humanitarian effort.
            </p>

            <h3>2.4 Tax Deductibility</h3>
            <p>
              Contributions to the MIGA DAO may qualify as tax-deductible charitable donations
              depending on your jurisdiction. Consult with a qualified tax professional regarding
              the deductibility of your contribution. The Protocol does not provide tax advice.
            </p>

            <h2>3. Eligibility</h2>
            <p>
              You must be at least 18 years old and capable of forming a binding contract to use the
              Services. By using the Services, you represent and warrant that:
            </p>
            <ul>
              <li>You are at least 18 years of age</li>
              <li>You have the legal capacity to enter into these Terms</li>
              <li>You are not located in, or a citizen or resident of, any Restricted Jurisdiction (see Section 4)</li>
              <li>You are not subject to any sanctions or listed on any prohibited party lists</li>
              <li>Your use of the Services does not violate any applicable laws or regulations</li>
            </ul>

            <h2>4. Restricted Jurisdictions</h2>
            <p>
              The Services are <strong>not available</strong> to persons located in, incorporated in,
              or citizens of the following jurisdictions ("Restricted Jurisdictions"):
            </p>
            <ul>
              <li><strong>Iran</strong> (Islamic Republic of Iran)</li>
              <li><strong>North Korea</strong> (Democratic People's Republic of Korea)</li>
              <li><strong>Cuba</strong></li>
              <li><strong>Syria</strong></li>
              <li><strong>Russia</strong></li>
              <li><strong>Belarus</strong></li>
              <li><strong>Myanmar</strong> (Burma)</li>
              <li><strong>Venezuela</strong></li>
              <li><strong>Zimbabwe</strong></li>
              <li><strong>Sudan</strong></li>
              <li><strong>South Sudan</strong></li>
              <li><strong>Somalia</strong></li>
              <li><strong>Libya</strong></li>
              <li><strong>Yemen</strong></li>
              <li>The <strong>Crimea</strong>, <strong>Donetsk</strong>, and <strong>Luhansk</strong> regions of Ukraine</li>
            </ul>
            <p>
              This list reflects jurisdictions subject to comprehensive sanctions by the United States
              (OFAC), European Union, and United Nations. It may be updated as sanctions regimes change.
            </p>
            <p>
              <strong>Note regarding Iran:</strong> While MIGA's mission is to support the Iranian people's
              access to information and culture, US sanctions law prohibits financial transactions
              with persons in Iran. The DAO's funded programs operate outside Iran and serve the
              global Iranian diaspora and civil society organizations that provide tools and resources
              accessible to Iranians.
            </p>

            <h2>5. Token Distribution</h2>
            <h3>5.1 Proportional Allocation</h3>
            <p>
              MIGA tokens are distributed proportionally based on the total value contributed through
              each supported chain at mint time. The Chain Leaderboard tracks contributions by network.
              Final distribution ratios are determined at the close of each mint phase.
            </p>

            <h3>5.2 No Investment Contract</h3>
            <p>
              MIGA tokens are governance tokens that grant voting power in the DAO (1 MIGA = 1 Vote).
              They are not securities, investment contracts, or financial instruments. MIGA tokens
              do not represent equity, debt, or any claim to profits or revenue.
            </p>

            <h3>5.3 Fair Launch</h3>
            <p>
              There is no founders allocation, no VC allocation, and no hidden wallets. 100% of the
              token supply is distributed to contributors through the public mint process.
            </p>

            <h2>6. DAO Governance</h2>
            <p>
              MIGA token holders participate in governance through on-chain voting. Governance decisions
              include treasury allocations, grant proposals, and protocol parameters. All governance
              actions are executed by smart contracts and recorded on-chain.
            </p>

            <h2>7. Risks and Disclaimers</h2>
            <p>
              Using blockchain technology involves inherent risks including smart contract vulnerabilities,
              blockchain network failures, private key loss, and regulatory changes. Digital assets are
              highly volatile. You should not contribute more than you can afford to lose. See our
              <a href="/risks">Risk Disclosure</a> for comprehensive information.
            </p>

            <h2>8. Prohibited Activities</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use the Services from a Restricted Jurisdiction</li>
              <li>Use the Services for any illegal purpose or in violation of any laws</li>
              <li>Attempt to exploit or compromise the Protocol's smart contracts</li>
              <li>Use the Services to launder money or finance terrorism</li>
              <li>Misrepresent your identity or jurisdiction</li>
              <li>Interfere with or disrupt the Protocol's infrastructure</li>
            </ul>

            <h2>9. Intellectual Property</h2>
            <p>
              The Protocol's smart contracts are open source. The MIGA brand, logos, and website content
              are owned by the MIGA DAO and its contributors.
            </p>

            <h2>10. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE PROTOCOL, ITS CONTRIBUTORS, GOVERNANCE
              PARTICIPANTS, AND SUPPORTING ORGANIZATIONS SHALL NOT BE LIABLE FOR ANY INDIRECT,
              INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS,
              DATA, OR DIGITAL ASSETS.
            </p>

            <h2>11. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless the MIGA DAO, its contributors,
              governance participants, and supporting organizations from any claims, damages, losses,
              or expenses arising from your use of the Services or violation of these Terms.
            </p>

            <h2>12. Modifications</h2>
            <p>
              These Terms may be modified through the Protocol's governance process. Material changes
              will be communicated through official channels. Your continued use of the Services after
              changes take effect constitutes acceptance of the modified Terms.
            </p>

            <h2>13. Severability</h2>
            <p>
              If any provision of these Terms is found to be unenforceable, the remaining provisions
              shall continue in full force and effect.
            </p>

            <h2>14. Contact</h2>
            <p>
              For questions about these Terms:
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
