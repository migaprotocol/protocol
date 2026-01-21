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
            <p>
              The Protocol is operated by MIGA Foundation, a decentralized autonomous organization.
              These Terms constitute a legally binding agreement between you and the Protocol's
              governance participants.
            </p>

            <h2>2. Eligibility</h2>
            <p>
              You must be at least 18 years old and capable of forming a binding contract to use the
              Services. By using the Services, you represent and warrant that:
            </p>
            <ul>
              <li>You are at least 18 years of age</li>
              <li>You have the legal capacity to enter into these Terms</li>
              <li>You are not located in, or a citizen/resident of, any jurisdiction where use of the Services would be illegal or prohibited</li>
              <li>You are not subject to any sanctions or listed on any prohibited party lists</li>
              <li>Your use of the Services does not violate any applicable laws or regulations</li>
            </ul>

            <h2>3. Nature of the Protocol</h2>
            <h3>3.1 Decentralized Infrastructure</h3>
            <p>
              MIGA is a decentralized protocol that operates on multiple blockchain networks. The Protocol
              consists of smart contracts deployed across Solana, Ethereum, Base, Arbitrum, Polygon, Lux,
              and Bitcoin (via Runes). No single entity controls the Protocol.
            </p>

            <h3>3.2 Non-Custodial</h3>
            <p>
              The Protocol is entirely non-custodial. You maintain complete control over your digital
              assets at all times. The Protocol does not have access to, control over, or custody of
              your assets, private keys, or funds.
            </p>

            <h3>3.3 Governance</h3>
            <p>
              Protocol governance is conducted through on-chain voting mechanisms. PARS and vePARS token
              holders have the ability to propose and vote on changes to Protocol parameters, treasury
              allocations, and other governance matters.
            </p>

            <h2>4. Services Description</h2>
            <p>The Protocol provides the following services:</p>
            <ul>
              <li><strong>Token Operations</strong>: Acquisition and transfer of MIGA tokens via bonding curves and DEX liquidity pools</li>
              <li><strong>Governance</strong>: Participation in DAO governance through PARS and vePARS tokens</li>
              <li><strong>Cross-Chain Bridges</strong>: Transfer of tokens between supported blockchain networks</li>
              <li><strong>Treasury Participation</strong>: Access to DAO-governed treasury programs</li>
              <li><strong>Community Features</strong>: Chapter participation, proposal submission, and voting</li>
            </ul>

            <h2>5. Risks and Disclaimers</h2>
            <h3>5.1 Blockchain Risks</h3>
            <p>
              Using blockchain technology involves inherent risks including but not limited to:
            </p>
            <ul>
              <li>Smart contract vulnerabilities and exploits</li>
              <li>Blockchain network congestion and failures</li>
              <li>Private key loss resulting in permanent loss of assets</li>
              <li>Regulatory changes affecting blockchain operations</li>
              <li>Bridge failures or security breaches</li>
            </ul>

            <h3>5.2 Financial Risks</h3>
            <p>
              Digital assets are highly volatile. The value of MIGA tokens and other digital assets
              can fluctuate significantly. You should not invest more than you can afford to lose.
              Past performance does not indicate future results.
            </p>

            <h3>5.3 No Financial Advice</h3>
            <p>
              Nothing in the Services constitutes financial, investment, legal, or tax advice.
              You should consult with qualified professionals before making any financial decisions.
            </p>

            <h2>6. Prohibited Activities</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use the Services for any illegal purpose or in violation of any laws</li>
              <li>Attempt to exploit, hack, or compromise the Protocol's smart contracts</li>
              <li>Engage in market manipulation or fraudulent trading activities</li>
              <li>Use the Services to launder money or finance terrorism</li>
              <li>Interfere with or disrupt the Protocol's infrastructure</li>
              <li>Violate the intellectual property rights of others</li>
              <li>Use automated systems to abuse or exploit the Services</li>
            </ul>

            <h2>7. Intellectual Property</h2>
            <p>
              The Protocol's smart contracts are open source and available under their respective licenses.
              The MIGA brand, logos, and website content are owned by the MIGA Foundation and contributors.
              You may not use MIGA trademarks without prior written permission.
            </p>

            <h2>8. Privacy</h2>
            <p>
              Your use of the Services is also governed by our <a href="/privacy">Privacy Policy</a>.
              Please review the Privacy Policy to understand our practices regarding data collection
              and use.
            </p>

            <h2>9. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless the MIGA Foundation, its contributors,
              DAO participants, and affiliates from any claims, damages, losses, or expenses arising
              from your use of the Services or violation of these Terms.
            </p>

            <h2>10. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE PROTOCOL AND ITS CONTRIBUTORS SHALL NOT BE
              LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES,
              INCLUDING LOSS OF PROFITS, DATA, OR DIGITAL ASSETS, REGARDLESS OF THE CAUSE OF ACTION
              OR THE THEORY OF LIABILITY.
            </p>

            <h2>11. Dispute Resolution</h2>
            <p>
              Any disputes arising from these Terms or your use of the Services shall be resolved
              through binding arbitration in accordance with the rules of the International Chamber
              of Commerce. The arbitration shall be conducted in English.
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
              For questions about these Terms, please reach out through our community channels:
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
