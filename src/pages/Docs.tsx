import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FileText, ExternalLink, Shield, Users, Globe, Coins, Vote, Lock, Heart, BookOpen } from 'lucide-react';

export default function Docs() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl lg:text-5xl font-medium mb-10 tracking-tight">
            <span className="text-gold">Documentation</span>
          </h1>

          {/* Whitepaper CTA */}
          <a
            href="https://github.com/migaprotocol/miga/blob/main/whitepaper/MIGA-Whitepaper.md"
            className="card rounded-xl p-6 mb-12 flex items-center gap-4 hover:border-[#C9A227]/30 transition-all group"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="w-12 h-12 rounded-lg bg-[#C9A227]/10 flex items-center justify-center">
              <FileText className="text-gold" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-medium group-hover:text-gold transition-colors">MIGA Whitepaper</h3>
              <p className="text-white/50 text-sm">Full technical documentation and protocol design</p>
            </div>
            <ExternalLink className="text-white/30 group-hover:text-gold transition-colors" size={18} />
          </a>

          <div className="prose prose-invert max-w-none
            prose-headings:font-medium prose-headings:tracking-tight
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-white prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-3
            prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-white/90
            prose-h4:text-base prose-h4:mt-6 prose-h4:mb-2 prose-h4:text-white/80
            prose-p:text-white/60 prose-p:leading-relaxed prose-p:text-sm
            prose-li:text-white/60 prose-li:text-sm
            prose-strong:text-gold prose-strong:font-medium
            prose-a:text-gold prose-a:no-underline hover:prose-a:underline
            prose-table:text-sm
            prose-th:text-white/80 prose-th:font-medium prose-th:border-white/10
            prose-td:text-white/60 prose-td:border-white/10
            prose-blockquote:border-l-gold prose-blockquote:bg-gold/5 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r
          ">
            {/* Quick Nav */}
            <div className="not-prose mb-12 grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { icon: BookOpen, label: 'The Cyrus Legacy', href: '#cyrus-legacy' },
                { icon: Globe, label: 'MIGA Vision', href: '#vision' },
                { icon: Coins, label: 'Tokenomics', href: '#tokenomics' },
                { icon: Vote, label: 'The Ten DAOs', href: '#ten-daos' },
                { icon: Shield, label: 'Shariah Compliance', href: '#shariah' },
                { icon: Heart, label: 'Humanitarian', href: '#humanitarian' },
                { icon: Users, label: 'Chapters', href: '#chapters' },
                { icon: Lock, label: 'Privacy', href: '#privacy' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-2 p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-gold/20 transition-colors text-sm text-white/60 hover:text-gold"
                >
                  <item.icon size={16} />
                  {item.label}
                </a>
              ))}
            </div>

            <h2 id="cyrus-legacy">The Cyrus Legacy</h2>
            <p>
              In 539 BCE, Cyrus the Great conquered Babylon—and instead of plunder, issued
              <strong> the first human rights declaration</strong>. Religious freedom. Repatriation
              of displaced peoples. Freedom from forced labor. Recorded on the Cyrus Cylinder,
              now in the British Museum.
            </p>
            <p>
              This was revolutionary statecraft. Not empire by extraction, but empire by consent.
              Twenty-five hundred years later, the Persian diaspora inherits this tradition—scattered
              across 40+ countries, yet bound by language, history, and a shared identity.
            </p>

            <h3>The Diaspora Today</h3>
            <ul>
              <li><strong>8+ million</strong> people across 40+ countries</li>
              <li><strong>Highly skilled</strong>: engineers, doctors, entrepreneurs, artists</li>
              <li><strong>Capital-connected</strong>: significant economic influence</li>
              <li><strong>Culturally cohesive</strong>: shared language, history, identity</li>
              <li><strong>Yet fragmented</strong>: no coordination infrastructure</li>
            </ul>

            <blockquote>
              <p><strong>We are not stateless. We are the state-in-exile.</strong></p>
            </blockquote>

            <h2 id="vision">The MIGA Vision: Civic OS</h2>
            <p>
              MIGA is not another DAO. MIGA is a <strong>Civic Operating System</strong>—a programmable
              commons that can:
            </p>
            <ol>
              <li><strong>Start as infrastructure</strong>: Coordination tools for diaspora</li>
              <li><strong>Scale toward state-like functions</strong>: Treasury, governance, services</li>
              <li><strong>Avoid old failure modes</strong>: No centralization, no capture, no corruption</li>
              <li><strong>Prepare for return</strong>: When borders open, we bring home institutions</li>
            </ol>

            <h3>The Core Innovation</h3>
            <p>
              Separating <strong>political governance</strong> (one token: PARS) from <strong>capital
              allocation</strong> (ten DAO program tokens) enables specialized funding programs
              without fragmenting governance.
            </p>

            <h3>From NGO to Nation-Scale</h3>
            <table>
              <thead>
                <tr>
                  <th>Phase</th>
                  <th>Period</th>
                  <th>Capability</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Foundation</td>
                  <td className="font-mono">2026–2027</td>
                  <td>NGO structure, core contracts, 3 DAOs</td>
                </tr>
                <tr>
                  <td>Civic OS</td>
                  <td className="font-mono">2027–2028</td>
                  <td>All 10 DAOs, privacy layer, 10K+ members</td>
                </tr>
                <tr>
                  <td>Scale</td>
                  <td className="font-mono">2028–2030</td>
                  <td>40+ countries, 100K+ members, $100M+ TVL</td>
                </tr>
                <tr>
                  <td>Nation-Ready</td>
                  <td className="font-mono">2030+</td>
                  <td>Full civic services, multi-generational endowment</td>
                </tr>
              </tbody>
            </table>

            <h3>Design Principles</h3>
            <ul>
              <li><strong>Consent</strong> — Governance derives from opt-in participation</li>
              <li><strong>Constraint</strong> — Authority limited by code: bounded parameters, timelocks</li>
              <li><strong>Transparency</strong> — Public execution and receipt standards</li>
              <li><strong>Safety</strong> — Private voting and shielded disbursements protect humans</li>
              <li><strong>Neutrality</strong> — Anti-capture: outlasts personalities and factions</li>
              <li><strong>Pluralism</strong> — Multiple communities under common rules</li>
            </ul>

            <h2 id="tokenomics">Token Architecture: Multi-Chain Native</h2>

            <h3>Seven Blockchains, One Token</h3>
            <p>
              MIGA token is native to Solana with bridges to six additional chains:
            </p>
            <table>
              <thead>
                <tr>
                  <th>Chain</th>
                  <th>Standard</th>
                  <th>Bridge</th>
                  <th>Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Solana</td><td>SPL Token</td><td>Native</td><td>Primary chain, bonding curve</td></tr>
                <tr><td>Ethereum</td><td>ERC-20</td><td>Wormhole</td><td>DeFi integrations, DAO contracts</td></tr>
                <tr><td>Base</td><td>ERC-20</td><td>Wormhole</td><td>Low-cost transactions</td></tr>
                <tr><td>Arbitrum</td><td>ERC-20</td><td>Wormhole</td><td>L2 scaling</td></tr>
                <tr><td>Polygon</td><td>ERC-20</td><td>Wormhole</td><td>Mass adoption</td></tr>
                <tr><td>Lux</td><td>ERC-20</td><td>Lux Bridge</td><td>Privacy features</td></tr>
                <tr><td>Bitcoin</td><td>Runes</td><td>Zeus Network</td><td>Store of value</td></tr>
              </tbody>
            </table>

            <h3>Distribution</h3>
            <table>
              <thead>
                <tr>
                  <th>Allocation</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Total Supply</td><td className="font-mono">7,000,000,000 MIGA</td></tr>
                <tr><td>Meteora DLMM LP</td><td className="font-mono">700,000,000 (10%)</td></tr>
                <tr><td>One-Sided Bonding Curve</td><td className="font-mono">2,800,000,000 (40%)</td></tr>
                <tr><td>Treasury (DAO-governed)</td><td className="font-mono">3,500,000,000 (50%)</td></tr>
              </tbody>
            </table>
            <p className="text-emerald-400 font-medium">
              No team allocation. No advisor tokens. No VC rounds. The team participates like everyone else.
            </p>

            <h3>Bonding Curve Mechanics</h3>
            <p>The bonding curve provides fair price discovery:</p>
            <ul>
              <li><strong>Start Price</strong>: 0.0000001 SOL per token</li>
              <li><strong>End Price</strong>: 0.00001 SOL per token (100x increase)</li>
              <li><strong>Curve</strong>: Linear progression based on tokens sold</li>
              <li><strong>Slippage Protection</strong>: Minimum tokens out parameter</li>
            </ul>
            <p className="font-mono text-xs bg-white/5 p-3 rounded">
              Price = StartPrice + (TokensSold / TotalSupply) × (EndPrice - StartPrice)
            </p>

            <h3>Governance Token Architecture</h3>
            <table>
              <thead>
                <tr>
                  <th>Token</th>
                  <th>Type</th>
                  <th>Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>MIGA</td><td>Collateral</td><td>Alignment—stake what you cannot afford to lose</td></tr>
                <tr><td>PARS</td><td>Emission</td><td>Coordination—flows to builders, decays when idle</td></tr>
                <tr><td>sPARS</td><td>Rebasing</td><td>Multiplied rewards for continuous participation</td></tr>
                <tr><td>vePARS</td><td>Vote-Escrow</td><td>Governance power—lock PARS + MIGA together</td></tr>
              </tbody>
            </table>

            <h3>Governance Power Formula</h3>
            <p className="font-mono text-xs bg-white/5 p-3 rounded">
              vePARS = min(PARS, MIGA) × √(lock_duration / max_duration)
            </p>
            <p>This enforces:</p>
            <ul>
              <li><strong>Balance</strong>: Need both tokens—whales without MIGA cannot dominate</li>
              <li><strong>Commitment</strong>: Longer locks earn more power</li>
              <li><strong>Diminishing Returns</strong>: Square root prevents capture</li>
            </ul>

            <h2 id="ten-daos">The Ten DAOs: Specialized Pillars</h2>
            <p>
              The DAO layer operates on EVM (Ethereum/Lux) while the token remains native on Solana:
            </p>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Symbol</th>
                  <th>Persian Name</th>
                  <th>Domain</th>
                  <th>Strategy</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>1</td><td className="font-mono text-gold">AMN</td><td>Amniyat</td><td>Security</td><td>Stablecoin-only, audits</td></tr>
                <tr><td>2</td><td className="font-mono text-gold">KHAZ</td><td>Khazaneh</td><td>Treasury</td><td>Diversified reserves</td></tr>
                <tr><td>3</td><td className="font-mono text-gold">DAD</td><td>Dad</td><td>Governance</td><td>Minimal, tooling</td></tr>
                <tr><td>4</td><td className="font-mono text-gold">SAL</td><td>Salamat</td><td>Health</td><td>Stablecoin + yield</td></tr>
                <tr><td>5</td><td className="font-mono text-gold">FARH</td><td>Farhang</td><td>Culture</td><td>Creator grants</td></tr>
                <tr><td>6</td><td className="font-mono text-gold">DAN</td><td>Danesh</td><td>Research</td><td>Research grants</td></tr>
                <tr><td>7</td><td className="font-mono text-gold">SAZ</td><td>Sazandegi</td><td>Infrastructure</td><td>Procurement</td></tr>
                <tr><td>8</td><td className="font-mono text-gold">PAY</td><td>Payam</td><td>Consular</td><td>Coordination</td></tr>
                <tr><td>9</td><td className="font-mono text-gold">WAQF</td><td>Waqf</td><td>Endowment</td><td>Long-horizon venture</td></tr>
                <tr><td>10</td><td className="font-mono text-gold">MIZ</td><td>Mizan</td><td>Integrity</td><td>Impact audits</td></tr>
              </tbody>
            </table>

            <h3>Fee Allocation</h3>
            <table>
              <thead>
                <tr>
                  <th>DAO</th>
                  <th>Allocation</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>KHAZ (Treasury)</td><td className="font-mono">25%</td></tr>
                <tr><td>WAQF (Endowment)</td><td className="font-mono">15%</td></tr>
                <tr><td>SAL (Health)</td><td className="font-mono">10%</td></tr>
                <tr><td>DAN (Research)</td><td className="font-mono">10%</td></tr>
                <tr><td>SAZ (Infrastructure)</td><td className="font-mono">10%</td></tr>
                <tr><td>FARH (Culture)</td><td className="font-mono">7%</td></tr>
                <tr><td>AMN (Security)</td><td className="font-mono">5%</td></tr>
                <tr><td>DAD (Governance)</td><td className="font-mono">5%</td></tr>
                <tr><td>MIZ (Integrity)</td><td className="font-mono">5%</td></tr>
                <tr><td>PAY (Consular)</td><td className="font-mono">3%</td></tr>
                <tr><td>Emergency Reserve</td><td className="font-mono">5%</td></tr>
              </tbody>
            </table>

            <h3>DAO Token Architecture (ERC-4626)</h3>
            <p>Each DAO operates on EVM with:</p>
            <ul>
              <li><strong>DaoVault</strong>: ERC-4626 vault holding assets</li>
              <li><strong>DaoShare</strong>: DAO token = shares in vault</li>
              <li><strong>BondDepository</strong>: Discounted entry with vesting</li>
            </ul>

            <h2 id="cross-chain">Cross-Chain Bridge Architecture</h2>

            <h3>Wormhole Integration</h3>
            <p>Primary bridge protocol for Solana to EVM chains:</p>
            <pre className="text-xs bg-white/5 p-4 rounded overflow-x-auto">
{`Solana (SPL) --> Wormhole --> Ethereum (wMIGA)
                         --> Base (wMIGA)
                         --> Arbitrum (wMIGA)
                         --> Polygon (wMIGA)`}
            </pre>

            <h3>Lux Bridge</h3>
            <p>For Ethereum to Lux (privacy features):</p>
            <pre className="text-xs bg-white/5 p-4 rounded overflow-x-auto">
{`Ethereum --> Lux Bridge --> Lux (wMIGA)`}
            </pre>

            <h3>Bitcoin Integration (Planned)</h3>
            <p>Via Zeus Network for Runes/BRC-20:</p>
            <pre className="text-xs bg-white/5 p-4 rounded overflow-x-auto">
{`Bitcoin (Runes) <--> Zeus Network <--> Solana (SPL)`}
            </pre>

            <h2 id="shariah">Shariah Compliance Framework</h2>
            <p>
              MIGA offers optional Shariah-compliant strategies for users who require riba-free
              (interest-free) DeFi participation. Compliance is attestation-based, not claimed.
            </p>

            <h3>Compliant Mechanisms</h3>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Mechanism</th>
                  <th>Compliance</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Earn</td><td>Fee-based yield (mudarabah-style)</td><td>Scholar-attested</td></tr>
                <tr><td>Advance</td><td>Self-repaying (no interest)</td><td>Fee-only, riba-free</td></tr>
                <tr><td>Stake</td><td>Governance participation</td><td>Work-based rewards</td></tr>
              </tbody>
            </table>

            <h3>Attestation Process</h3>
            <ol>
              <li><strong>Strategy Design</strong>: Protocol designs compliant vault strategy</li>
              <li><strong>Scholar Review</strong>: Qualified scholars examine contract mechanics</li>
              <li><strong>Attestation</strong>: Signed attestation published to IPFS</li>
              <li><strong>On-chain Link</strong>: Attestation CID stored in vault metadata</li>
              <li><strong>Continuous Audit</strong>: MIZ DAO monitors ongoing compliance</li>
            </ol>

            <h3>What Makes It Compliant</h3>
            <ul>
              <li><strong>No riba (usury)</strong>: Advances repay via yield, not interest accrual</li>
              <li><strong>Fee-based only</strong>: One-time fees, not compounding interest</li>
              <li><strong>Real economic activity</strong>: Yield from actual protocol usage</li>
              <li><strong>Risk sharing</strong>: Depositors share in both gains and losses</li>
              <li><strong>No haram assets</strong>: Compliant pools exclude prohibited industries</li>
              <li><strong>Asset-backed options</strong>: DMCC-compliant gold/silver vaults (planned)</li>
            </ul>

            <blockquote>
              <p>
                <strong>Permissionless + Attestation:</strong> MIGA is permissionless DeFi. Anyone can
                use any strategy. Shariah attestations are proof artifacts for those who need them—not
                gatekeeping. Non-compliant strategies remain available for other users.
              </p>
            </blockquote>

            <h2 id="humanitarian">Humanitarian Crisis Response</h2>
            <p>
              The Persian diaspora has repeatedly mobilized during crises—earthquakes, floods,
              political upheaval, and ongoing humanitarian emergencies. MIGA provides permanent
              infrastructure for these efforts.
            </p>

            <h3>Current Crisis: Why This Matters Now</h3>
            <p>Iran faces compounding humanitarian challenges:</p>
            <ul>
              <li><strong>Economic collapse</strong>: Currency devaluation, unemployment, poverty</li>
              <li><strong>Healthcare crisis</strong>: Sanctions impacting medicine and equipment</li>
              <li><strong>Brain drain</strong>: Millions fleeing, families separated</li>
              <li><strong>Political repression</strong>: Ongoing human rights violations</li>
              <li><strong>Environmental</strong>: Water crisis, pollution, climate impacts</li>
            </ul>

            <blockquote>
              <p>
                <strong>Urgent Need:</strong> The diaspora sends an estimated $10–20 billion
                annually to Iran through informal channels. MIGA can make this transparent,
                efficient, and impactful—while protecting senders and recipients.
              </p>
            </blockquote>

            <h3>DAO Response Framework</h3>
            <table>
              <thead>
                <tr>
                  <th>DAO</th>
                  <th>Crisis Function</th>
                  <th>Example Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>SAL (Health)</td><td>Medical aid</td><td>Medicine procurement, doctor networks, mental health</td></tr>
                <tr><td>AMN (Security)</td><td>Protection</td><td>Secure comms, identity protection, evacuation</td></tr>
                <tr><td>KHAZ (Treasury)</td><td>Emergency funds</td><td>Rapid disbursement, currency stabilization</td></tr>
                <tr><td>PAY (Consular)</td><td>Coordination</td><td>Family reunification, legal aid, visa support</td></tr>
                <tr><td>FARH (Culture)</td><td>Preservation</td><td>Document archives, artist support, language programs</td></tr>
                <tr><td>DAN (Research)</td><td>Documentation</td><td>Human rights reports, crisis monitoring</td></tr>
                <tr><td>WAQF (Endowment)</td><td>Long-term</td><td>Orphan funds, scholarships, rebuilding reserves</td></tr>
              </tbody>
            </table>

            <h3>Emergency Response Mechanisms</h3>
            <h4>1. Rapid Response Fund</h4>
            <ul>
              <li>5% of treasury in stablecoin emergency reserve</li>
              <li>Can be deployed within 24 hours with multi-sig approval</li>
              <li>Pre-approved partner organizations for distribution</li>
            </ul>

            <h4>2. Crisis Governance Mode</h4>
            <ul>
              <li>Shortened voting periods (24 hours vs. 5 days)</li>
              <li>Lower quorum requirements for emergency proposals</li>
              <li>Automatic sunset after crisis ends</li>
            </ul>

            <h4>3. Mutual Aid Networks</h4>
            <ul>
              <li>Chapter-to-chapter coordination for refugee support</li>
              <li>Professional networks (doctors, lawyers, engineers)</li>
              <li>Housing and employment assistance databases</li>
            </ul>

            <h3>Privacy-Preserving Aid</h3>
            <p>For people in dangerous situations:</p>
            <ul>
              <li><strong>Shielded disbursements</strong>: Recipients cannot be traced</li>
              <li><strong>Plausible deniability</strong>: Multiple-hop transfers</li>
              <li><strong>Verified impact</strong>: Zero-knowledge proof of delivery</li>
              <li><strong>Protected voting</strong>: Beneficiaries can participate safely</li>
            </ul>

            <h3>Accountability Without Exposure</h3>
            <blockquote>
              <p>
                <strong>Public:</strong> Total funds disbursed, impact metrics, audit reports<br />
                <strong>Private:</strong> Individual recipients, transfer routes, operator identities
              </p>
            </blockquote>
            <p>The MIZ (Integrity) DAO conducts quarterly impact audits. Results are published. Names are not.</p>

            <h2 id="chapters">Community Chapters</h2>
            <p>
              A Chapter is a gauge. It represents a community—physical or virtual—that serves the diaspora.
            </p>

            <h3>Chapter Types</h3>
            <ul>
              <li><strong>City Chapters</strong>: Los Angeles, Toronto, London, Berlin, Sydney, Dubai</li>
              <li><strong>University Chapters</strong>: Stanford, MIT, Oxford, Toronto, TUM</li>
              <li><strong>Guild Chapters</strong>: Developers, Artists, Researchers, Entrepreneurs</li>
            </ul>

            <h3>Launching a Chapter</h3>
            <ol>
              <li>Gather 10 founding members with vePARS</li>
              <li>Submit proposal to governance</li>
              <li>Pass with 51% approval</li>
              <li>Receive initial budget, begin operations</li>
            </ol>
            <p>Chapters earn PARS emissions proportional to their votes. They report quarterly.</p>

            <h2 id="privacy">Privacy & Security</h2>

            <h3>Multi-Chain Privacy Stack</h3>
            <table>
              <thead>
                <tr>
                  <th>Chain</th>
                  <th>Function</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>C-Chain (Lux)</td><td>Public governance, receipts</td></tr>
                <tr><td>T-Chain (Lux)</td><td>Private voting (TFHE), threshold ops</td></tr>
                <tr><td>Z-Chain (Lux)</td><td>Shielded treasury + FHE private compute</td></tr>
                <tr><td>Q-Chain (Lux)</td><td>Post-quantum communications (ML-KEM)</td></tr>
              </tbody>
            </table>

            <h3>What Is Public vs. Private</h3>
            <table>
              <thead>
                <tr>
                  <th>Public</th>
                  <th>Private</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Outcomes, receipts, totals</td><td>Individual votes</td></tr>
                <tr><td>Rules, audit trails</td><td>Beneficiary identities</td></tr>
                <tr><td>Treasury balances</td><td>Operator keys</td></tr>
              </tbody>
            </table>

            <h3>Post-Quantum Security</h3>
            <p>Hybrid cryptography via Lux Network (ML-DSA, Ringtail, FHE):</p>
            <ul>
              <li><strong>Key Exchange</strong>: X25519 + ML-KEM-768</li>
              <li><strong>Signatures</strong>: Ed25519 + ML-DSA-65 (Ringtail)</li>
              <li><strong>Communication</strong>: AES-256-GCM + FHE for private compute</li>
            </ul>

            <h2 id="roadmap">Roadmap</h2>

            <h3>Phase 1: Foundation (2026–2027)</h3>
            <ul>
              <li>Legal entity establishment</li>
              <li>Core contract deployment (Solana + EVM)</li>
              <li>3 priority DAOs (KHAZ, AMN, MIZ)</li>
              <li>Wormhole bridge integration</li>
              <li>$5M+ initial funding</li>
              <li>1,000+ token holders</li>
            </ul>

            <h3>Phase 2: Civic OS (2027–2028)</h3>
            <ul>
              <li>All 10 DAOs operational</li>
              <li>Privacy layer live (TFHE, shielded rail)</li>
              <li>7-chain deployment complete</li>
              <li>10+ strategic partners</li>
              <li>10K+ token holders</li>
            </ul>

            <h3>Phase 3: Scale (2028–2030)</h3>
            <ul>
              <li>40+ countries with programs</li>
              <li>100K+ members</li>
              <li>$100M+ TVL</li>
              <li>Institutional partnerships</li>
              <li>Self-sustaining operations</li>
            </ul>

            <h3>Phase 4: Nation-Scale (2030+)</h3>
            <ul>
              <li>Full civic service capabilities</li>
              <li>Fully decentralized governance</li>
              <li>Multi-generational endowment</li>
              <li>Ready for return</li>
            </ul>

            <h2>Conclusion</h2>
            <p>
              MIGA is not about nostalgia. It is about building what tyrants cannot burn.
            </p>
            <p>
              We trace our lineage to Cyrus, to Darius, to Ferdowsi, to Rumi, to Hafez,
              to Mossadegh, to the millions who marched and the millions more who fled.
            </p>
            <p>
              We are not waiting for liberation. We are building the institutions we need—now,
              in code, beyond their reach.
            </p>
            <blockquote>
              <p>
                <em>The empire fell. The people scattered. The code endures.</em><br />
                <strong>One day, we go home.</strong>
              </p>
            </blockquote>

            <h2>Links</h2>
            <ul>
              <li><a href="https://miga.us.org">DAO Website</a></li>
              <li><a href="https://github.com/migaprotocol">GitHub</a></li>
              <li><a href="https://discord.gg/miga">Discord</a></li>
              <li><a href="https://x.com/MigaProtoc65742">X (Twitter)</a></li>
              <li><a href="https://t.me/MIGADAO">Telegram</a></li>
              <li><a href="https://realms.today/dao/miga">Governance (Realms)</a></li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
