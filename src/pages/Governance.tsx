import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  Vote,
  Clock,
  CheckCircle2,
  XCircle,
  Users,
  ArrowRight,
  ThumbsUp,
  ThumbsDown,
  MinusCircle,
  ChevronDown,
  ExternalLink,
  AlertCircle,
  Landmark,
  Shield,
  Building2,
  Scale,
  Filter
} from 'lucide-react';

type ProposalStatus = 'active' | 'passed' | 'rejected' | 'pending';
type VoteType = 'for' | 'against' | 'abstain' | null;

interface Proposal {
  id: string;
  title: string;
  pillar: string;
  pillarName: string;
  description: string;
  proposer: string;
  fundingAmount: number;
  votesFor: number;
  votesAgainst: number;
  votesAbstain: number;
  totalVotes: number;
  quorum: number;
  status: ProposalStatus;
  endTime: Date;
  createdAt: Date;
}

const MOCK_PROPOSALS: Proposal[] = [
  {
    id: 'MIP-001',
    title: 'Decentralized VPN Network for Iran',
    pillar: 'saz',
    pillarName: 'Infrastructure',
    description: 'Build a censorship-resistant VPN network using decentralized nodes operated by diaspora members. This will provide secure internet access for millions of Iranians facing internet restrictions.',
    proposer: '7xKQ...9mPr',
    fundingAmount: 150000,
    votesFor: 2450000,
    votesAgainst: 180000,
    votesAbstain: 95000,
    totalVotes: 2725000,
    quorum: 4000000,
    status: 'active',
    endTime: new Date(Date.now() + 48 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: 'MIP-002',
    title: 'Persian Language AI Translation Model',
    pillar: 'dan',
    pillarName: 'Research',
    description: 'Develop an open-source AI model specifically trained for Persian-English translation, including historical texts and modern colloquialisms.',
    proposer: '3pXY...4nRs',
    fundingAmount: 80000,
    votesFor: 1890000,
    votesAgainst: 420000,
    votesAbstain: 210000,
    totalVotes: 2520000,
    quorum: 4000000,
    status: 'active',
    endTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
  },
  {
    id: 'MIP-003',
    title: 'Emergency Medical Supply Chain',
    pillar: 'sal',
    pillarName: 'Health',
    description: 'Establish a decentralized supply chain for delivering critical medical supplies to hospitals and clinics inside Iran.',
    proposer: '9kLM...2wQz',
    fundingAmount: 200000,
    votesFor: 5200000,
    votesAgainst: 890000,
    votesAbstain: 340000,
    totalVotes: 6430000,
    quorum: 4000000,
    status: 'passed',
    endTime: new Date(Date.now() - 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 96 * 60 * 60 * 1000),
  },
  {
    id: 'MIP-004',
    title: 'Digital Archive of Persian Manuscripts',
    pillar: 'farh',
    pillarName: 'Culture',
    description: 'Digitize and preserve thousands of ancient Persian manuscripts currently at risk of deterioration.',
    proposer: '5mNO...8tPq',
    fundingAmount: 45000,
    votesFor: 1200000,
    votesAgainst: 2800000,
    votesAbstain: 450000,
    totalVotes: 4450000,
    quorum: 4000000,
    status: 'rejected',
    endTime: new Date(Date.now() - 72 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 168 * 60 * 60 * 1000),
  },
];

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(0)}K`;
  }
  return num.toString();
}

function formatTimeRemaining(endTime: Date): string {
  const now = new Date();
  const diff = endTime.getTime() - now.getTime();

  if (diff <= 0) return 'Ended';

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (hours >= 24) {
    const days = Math.floor(hours / 24);
    return `${days}d ${hours % 24}h remaining`;
  }

  return `${hours}h ${minutes}m remaining`;
}

function ProposalCard({ proposal, onVote }: { proposal: Proposal; onVote: (id: string, vote: VoteType) => void }) {
  const { connected } = useWallet();
  const [expanded, setExpanded] = useState(false);
  const [userVote, setUserVote] = useState<VoteType>(null);

  const forPercentage = proposal.totalVotes > 0 ? (proposal.votesFor / proposal.totalVotes) * 100 : 0;
  const againstPercentage = proposal.totalVotes > 0 ? (proposal.votesAgainst / proposal.totalVotes) * 100 : 0;
  const quorumReached = proposal.totalVotes >= proposal.quorum;

  const handleVote = (vote: VoteType) => {
    if (!connected || proposal.status !== 'active') return;
    setUserVote(vote);
    onVote(proposal.id, vote);
  };

  const statusColors = {
    active: 'bg-[#FFD36A]/20 text-[#FFD36A] border-[#FFD36A]/30',
    passed: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    rejected: 'bg-red-500/20 text-red-400 border-red-500/30',
    pending: 'bg-white/10 text-white/60 border-white/20',
  };

  const statusIcons = {
    active: <Clock size={14} />,
    passed: <CheckCircle2 size={14} />,
    rejected: <XCircle size={14} />,
    pending: <Clock size={14} />,
  };

  return (
    <div className="card hover:border-white/20 transition-all">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono text-white/40">{proposal.id}</span>
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border ${statusColors[proposal.status]}`}>
              {statusIcons[proposal.status]}
              {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-white/50">
              {proposal.pillarName}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">{proposal.title}</h3>
          <p className="text-sm text-white/50">
            by {proposal.proposer} | Requesting ${proposal.fundingAmount.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className={`body-sm mb-4 ${expanded ? '' : 'line-clamp-2'}`}>
        {proposal.description}
      </p>

      {expanded && (
        <>
          {/* Voting Bars */}
          <div className="mb-4 space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-emerald-400 flex items-center gap-1">
                  <ThumbsUp size={14} /> For
                </span>
                <span className="text-white/60">{formatNumber(proposal.votesFor)} ({forPercentage.toFixed(1)}%)</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2">
                <div
                  className="h-full bg-emerald-400 rounded-full transition-all"
                  style={{ width: `${forPercentage}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-red-400 flex items-center gap-1">
                  <ThumbsDown size={14} /> Against
                </span>
                <span className="text-white/60">{formatNumber(proposal.votesAgainst)} ({againstPercentage.toFixed(1)}%)</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2">
                <div
                  className="h-full bg-red-400 rounded-full transition-all"
                  style={{ width: `${againstPercentage}%` }}
                />
              </div>
            </div>

            <div className="text-sm text-white/40 flex items-center gap-2">
              <MinusCircle size={14} />
              Abstain: {formatNumber(proposal.votesAbstain)}
            </div>
          </div>

          {/* Quorum */}
          <div className="mb-4 p-3 bg-white/5 rounded-lg">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-white/60">Quorum Progress</span>
              <span className={quorumReached ? 'text-emerald-400' : 'text-white/40'}>
                {formatNumber(proposal.totalVotes)} / {formatNumber(proposal.quorum)}
              </span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-1.5">
              <div
                className={`h-full rounded-full transition-all ${quorumReached ? 'bg-emerald-400' : 'bg-[#FFD36A]'}`}
                style={{ width: `${Math.min((proposal.totalVotes / proposal.quorum) * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* Vote Buttons */}
          {proposal.status === 'active' && (
            <div className="space-y-3">
              {connected ? (
                <>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => handleVote('for')}
                      className={`py-2 px-4 rounded-lg border transition-all flex items-center justify-center gap-1 text-sm ${
                        userVote === 'for'
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                          : 'bg-white/5 border-white/10 text-white/60 hover:border-emerald-500/50'
                      }`}
                    >
                      <ThumbsUp size={14} /> For
                    </button>
                    <button
                      onClick={() => handleVote('against')}
                      className={`py-2 px-4 rounded-lg border transition-all flex items-center justify-center gap-1 text-sm ${
                        userVote === 'against'
                          ? 'bg-red-500/20 border-red-500 text-red-400'
                          : 'bg-white/5 border-white/10 text-white/60 hover:border-red-500/50'
                      }`}
                    >
                      <ThumbsDown size={14} /> Against
                    </button>
                    <button
                      onClick={() => handleVote('abstain')}
                      className={`py-2 px-4 rounded-lg border transition-all flex items-center justify-center gap-1 text-sm ${
                        userVote === 'abstain'
                          ? 'bg-white/20 border-white/50 text-white'
                          : 'bg-white/5 border-white/10 text-white/60 hover:border-white/30'
                      }`}
                    >
                      <MinusCircle size={14} /> Abstain
                    </button>
                  </div>
                  {userVote && (
                    <p className="text-sm text-center text-emerald-400">
                      <CheckCircle2 size={14} className="inline mr-1" />
                      Vote recorded: {userVote}
                    </p>
                  )}
                </>
              ) : (
                <button
                  onClick={() => document.querySelector<HTMLButtonElement>('.wallet-adapter-button')?.click()}
                  className="w-full btn-secondary py-2"
                >
                  Connect wallet to vote
                </button>
              )}
            </div>
          )}
        </>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
        <div className="flex items-center gap-4 text-sm text-white/40">
          <span className="flex items-center gap-1">
            <Users size={14} />
            {formatNumber(proposal.totalVotes)} votes
          </span>
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {formatTimeRemaining(proposal.endTime)}
          </span>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm text-[#FFD36A] flex items-center gap-1 hover:underline"
        >
          {expanded ? 'Show less' : 'View details'}
          <ChevronDown size={14} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </div>
  );
}

export default function Governance() {
  const { connected, publicKey } = useWallet();
  const [filter, setFilter] = useState<'all' | 'active' | 'passed' | 'rejected'>('all');
  const [proposals] = useState(MOCK_PROPOSALS);

  const filteredProposals = filter === 'all'
    ? proposals
    : proposals.filter(p => p.status === filter);

  const activeCount = proposals.filter(p => p.status === 'active').length;

  // Mock voting power
  const votingPower = connected ? 125000 : 0;

  const handleVote = (id: string, vote: VoteType) => {
    console.log(`Voted ${vote} on proposal ${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#07070A]">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="container-lg">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFD36A]/10 border border-[#FFD36A]/20 mb-4">
                <Vote size={16} className="text-[#FFD36A]" />
                <span className="text-sm text-[#FFD36A]">Governance</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                <span className="text-gradient-ember">Active</span> Proposals
              </h1>

              <p className="body-md">
                {activeCount} active proposal{activeCount !== 1 ? 's' : ''} awaiting your vote
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              {connected && (
                <div className="card py-3 px-5">
                  <div className="text-sm text-white/40 mb-1">Your Voting Power</div>
                  <div className="text-lg font-semibold text-[#FFD36A]">
                    {votingPower.toLocaleString()} MIGA
                  </div>
                </div>
              )}
              <Link to="/propose" className="btn-primary h-fit">
                New Proposal <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
            <Filter size={16} className="text-white/40 flex-shrink-0" />
            {(['all', 'active', 'passed', 'rejected'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  filter === f
                    ? 'bg-[#FFD36A] text-black'
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
                {f === 'all' && ` (${proposals.length})`}
                {f === 'active' && ` (${activeCount})`}
              </button>
            ))}
          </div>

          {/* Proposals List */}
          {filteredProposals.length > 0 ? (
            <div className="space-y-6">
              {filteredProposals.map((proposal) => (
                <ProposalCard
                  key={proposal.id}
                  proposal={proposal}
                  onVote={handleVote}
                />
              ))}
            </div>
          ) : (
            <div className="card text-center py-12">
              <p className="text-white/40 mb-4">No {filter} proposals found</p>
              <Link to="/propose" className="btn-primary">
                Submit a Proposal <ArrowRight size={18} />
              </Link>
            </div>
          )}

          {/* Voting Info */}
          <section className="mt-16 pt-16 border-t border-white/[0.04]">
            <h2 className="text-2xl font-semibold mb-8 text-center">
              How <span className="text-gradient-ember">Voting</span> Works
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="card text-center">
                <div className="icon-box-lg mx-auto mb-4">
                  <Scale className="text-[#FFD36A]" size={28} />
                </div>
                <h3 className="text-lg mb-2">1 MIGA = 1 Vote</h3>
                <p className="body-sm">
                  Your voting power equals your MIGA token balance at snapshot time.
                </p>
              </div>

              <div className="card text-center">
                <div className="icon-box-lg mx-auto mb-4">
                  <Users className="text-[#FFB14A]" size={28} />
                </div>
                <h3 className="text-lg mb-2">4% Quorum</h3>
                <p className="body-sm">
                  40M MIGA must participate for a vote to be valid.
                </p>
              </div>

              <div className="card text-center">
                <div className="icon-box-lg mx-auto mb-4">
                  <Clock className="text-[#FF7A2F]" size={28} />
                </div>
                <h3 className="text-lg mb-2">3 Day Voting</h3>
                <p className="body-sm">
                  All proposals have a 3-day voting period.
                </p>
              </div>

              <div className="card text-center">
                <div className="icon-box-lg mx-auto mb-4">
                  <Shield className="text-[#E85D75]" size={28} />
                </div>
                <h3 className="text-lg mb-2">24h Timelock</h3>
                <p className="body-sm">
                  Passed proposals have a 24-hour delay before execution.
                </p>
              </div>
            </div>
          </section>

          {/* External Links */}
          <div className="mt-12 text-center">
            <a
              href="https://realms.today/dao/miga"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-link"
            >
              View on Realms <ExternalLink size={14} />
            </a>
          </div>

          {/* Hidden wallet button */}
          <div className="hidden">
            <WalletMultiButton />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
