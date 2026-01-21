import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Vote as VoteIcon, ExternalLink, Users, Shield, Clock, CheckCircle2, XCircle, Timer } from 'lucide-react';
import { Link } from 'react-router-dom';

const activeProposals = [
  {
    id: 'MIP-001',
    title: 'Initialize KHAZ Treasury Allocation Strategy',
    description: 'Establish initial treasury allocation percentages and yield strategies for the KHAZ (Treasury) DAO.',
    status: 'active',
    votesFor: 2340000,
    votesAgainst: 156000,
    quorum: 5000000,
    endTime: '2 days',
    dao: 'KHAZ',
  },
  {
    id: 'MIP-002',
    title: 'Approve SAL Health Fund Partners',
    description: 'Whitelist verified healthcare organizations for direct disbursements from the SAL (Health) DAO.',
    status: 'active',
    votesFor: 1890000,
    votesAgainst: 423000,
    quorum: 3000000,
    endTime: '4 days',
    dao: 'SAL',
  },
];

const recentProposals = [
  {
    id: 'MIP-000',
    title: 'Genesis Parameter Configuration',
    description: 'Set initial protocol parameters including bonding curve rates and fee allocations.',
    status: 'passed',
    votesFor: 4200000,
    votesAgainst: 280000,
    dao: 'DAD',
  },
];

const daos = [
  { symbol: 'AMN', name: 'Amniyat', domain: 'Security', color: '#EF4444' },
  { symbol: 'KHAZ', name: 'Khazaneh', domain: 'Treasury', color: '#F59E0B' },
  { symbol: 'DAD', name: 'Dad', domain: 'Governance', color: '#8B5CF6' },
  { symbol: 'SAL', name: 'Salamat', domain: 'Health', color: '#10B981' },
  { symbol: 'FARH', name: 'Farhang', domain: 'Culture', color: '#EC4899' },
  { symbol: 'DAN', name: 'Danesh', domain: 'Research', color: '#3B82F6' },
  { symbol: 'SAZ', name: 'Sazandegi', domain: 'Infrastructure', color: '#6366F1' },
  { symbol: 'PAY', name: 'Payam', domain: 'Consular', color: '#14B8A6' },
  { symbol: 'WAQF', name: 'Waqf', domain: 'Endowment', color: '#A855F7' },
  { symbol: 'MIZ', name: 'Mizan', domain: 'Integrity', color: '#F97316' },
];

function ProposalCard({ proposal }: { proposal: typeof activeProposals[0] }) {
  const totalVotes = proposal.votesFor + proposal.votesAgainst;
  const forPercent = totalVotes > 0 ? (proposal.votesFor / totalVotes) * 100 : 0;
  const quorumPercent = (totalVotes / proposal.quorum) * 100;

  return (
    <div className="card rounded-xl p-6 hover:border-gold/20 transition-all">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono text-gold">{proposal.id}</span>
            <span className="text-xs px-2 py-0.5 rounded bg-white/5 text-white/50">{proposal.dao}</span>
            {proposal.status === 'active' && (
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 flex items-center gap-1">
                <Timer size={10} />
                Active
              </span>
            )}
            {proposal.status === 'passed' && (
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 flex items-center gap-1">
                <CheckCircle2 size={10} />
                Passed
              </span>
            )}
            {proposal.status === 'failed' && (
              <span className="text-xs px-2 py-0.5 rounded bg-red-500/10 text-red-400 flex items-center gap-1">
                <XCircle size={10} />
                Failed
              </span>
            )}
          </div>
          <h3 className="text-base font-medium text-white mb-1">{proposal.title}</h3>
          <p className="text-sm text-white/50">{proposal.description}</p>
        </div>
      </div>

      {/* Voting progress */}
      <div className="space-y-3">
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-emerald-400">For: {(proposal.votesFor / 1000000).toFixed(2)}M</span>
            <span className="text-red-400">Against: {(proposal.votesAgainst / 1000000).toFixed(2)}M</span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
              style={{ width: `${forPercent}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-white/50">Quorum Progress</span>
            <span className="text-white/50">{quorumPercent.toFixed(0)}%</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gold/60 rounded-full"
              style={{ width: `${Math.min(quorumPercent, 100)}%` }}
            />
          </div>
        </div>

        {'endTime' in proposal && (
          <div className="flex items-center justify-between pt-2 border-t border-white/5">
            <div className="flex items-center gap-1.5 text-xs text-white/40">
              <Clock size={12} />
              Ends in {proposal.endTime}
            </div>
            <button className="text-xs text-gold hover:text-gold/80 transition-colors">
              Vote →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Vote() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Hero */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-lg bg-[#C9A227]/10 flex items-center justify-center">
              <VoteIcon className="text-gold" />
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-medium tracking-tight">
                <span className="text-gold">Governance</span>
              </h1>
              <p className="text-white/50 text-sm mt-1">Shape the future of MIGA Protocol</p>
            </div>
          </div>

          {/* External Governance Link */}
          <a
            href="https://realms.today/dao/miga"
            target="_blank"
            rel="noopener noreferrer"
            className="card rounded-xl p-6 mb-12 flex items-center gap-4 hover:border-gold/30 transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <ExternalLink className="text-purple-400" size={20} />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-medium group-hover:text-gold transition-colors">Realms Governance Portal</h3>
              <p className="text-white/50 text-sm">Vote on proposals and manage your vePARS on Solana</p>
            </div>
            <ExternalLink className="text-white/30 group-hover:text-gold transition-colors" size={18} />
          </a>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="card rounded-xl p-4">
              <p className="text-xs text-white/40 mb-1">Total vePARS</p>
              <p className="text-2xl font-medium text-gold">12.4M</p>
            </div>
            <div className="card rounded-xl p-4">
              <p className="text-xs text-white/40 mb-1">Active Proposals</p>
              <p className="text-2xl font-medium">{activeProposals.length}</p>
            </div>
            <div className="card rounded-xl p-4">
              <p className="text-xs text-white/40 mb-1">Total Voters</p>
              <p className="text-2xl font-medium">1,247</p>
            </div>
            <div className="card rounded-xl p-4">
              <p className="text-xs text-white/40 mb-1">Proposals Passed</p>
              <p className="text-2xl font-medium text-emerald-400">24</p>
            </div>
          </div>

          {/* The Ten DAOs */}
          <section className="mb-12">
            <h2 className="text-xl font-medium mb-6 flex items-center gap-2">
              <Users size={20} className="text-gold" />
              The Ten DAOs
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {daos.map((dao) => (
                <div
                  key={dao.symbol}
                  className="card rounded-xl p-4 hover:border-gold/20 transition-all cursor-pointer group"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono font-bold mb-2"
                    style={{ backgroundColor: `${dao.color}20`, color: dao.color }}
                  >
                    {dao.symbol.substring(0, 3)}
                  </div>
                  <p className="text-sm font-medium group-hover:text-gold transition-colors">{dao.name}</p>
                  <p className="text-xs text-white/40">{dao.domain}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Active Proposals */}
          <section className="mb-12">
            <h2 className="text-xl font-medium mb-6 flex items-center gap-2">
              <Timer size={20} className="text-emerald-400" />
              Active Proposals
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {activeProposals.map((proposal) => (
                <ProposalCard key={proposal.id} proposal={proposal} />
              ))}
            </div>
          </section>

          {/* Recent Proposals */}
          <section className="mb-12">
            <h2 className="text-xl font-medium mb-6 flex items-center gap-2">
              <CheckCircle2 size={20} className="text-white/40" />
              Recent Proposals
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {recentProposals.map((proposal) => (
                <ProposalCard key={proposal.id} proposal={proposal as any} />
              ))}
            </div>
          </section>

          {/* Governance Process */}
          <section className="mb-12">
            <h2 className="text-xl font-medium mb-6 flex items-center gap-2">
              <Shield size={20} className="text-gold" />
              Governance Process
            </h2>
            <div className="card rounded-xl p-6">
              <div className="grid md:grid-cols-4 gap-6">
                <div>
                  <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold font-medium mb-3">1</div>
                  <h3 className="text-sm font-medium mb-1">Acquire vePARS</h3>
                  <p className="text-xs text-white/50">Lock PARS + MIGA tokens to receive vote-escrow governance power</p>
                </div>
                <div>
                  <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold font-medium mb-3">2</div>
                  <h3 className="text-sm font-medium mb-1">Submit Proposal</h3>
                  <p className="text-xs text-white/50">Create a proposal with required vePARS threshold (100K minimum)</p>
                </div>
                <div>
                  <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold font-medium mb-3">3</div>
                  <h3 className="text-sm font-medium mb-1">Voting Period</h3>
                  <p className="text-xs text-white/50">5-day voting period with private ballot option via TFHE</p>
                </div>
                <div>
                  <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold font-medium mb-3">4</div>
                  <h3 className="text-sm font-medium mb-1">Execution</h3>
                  <p className="text-xs text-white/50">Passed proposals execute after 2-day timelock</p>
                </div>
              </div>
            </div>
          </section>

          {/* vePARS Info */}
          <section>
            <h2 className="text-xl font-medium mb-6">Governance Power Formula</h2>
            <div className="card rounded-xl p-6">
              <div className="font-mono text-sm bg-white/5 p-4 rounded-lg mb-4 text-center">
                vePARS = min(PARS, MIGA) × √(lock_duration / max_duration)
              </div>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gold font-medium mb-1">Balance Requirement</p>
                  <p className="text-white/50 text-xs">Need both PARS and MIGA tokens—whales without MIGA cannot dominate</p>
                </div>
                <div>
                  <p className="text-gold font-medium mb-1">Commitment Multiplier</p>
                  <p className="text-white/50 text-xs">Longer lock periods earn more governance power</p>
                </div>
                <div>
                  <p className="text-gold font-medium mb-1">Anti-Capture Design</p>
                  <p className="text-white/50 text-xs">Square root prevents any single entity from gaining majority control</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Link
              to="/propose"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-black font-medium rounded-lg hover:bg-gold/90 transition-colors"
            >
              Submit a Proposal
            </Link>
            <p className="text-white/40 text-xs mt-3">Requires 100,000 vePARS minimum</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
