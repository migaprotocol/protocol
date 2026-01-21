import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Link } from 'react-router-dom';
import {
  Landmark,
  Shield,
  Heart,
  Palette,
  FlaskConical,
  Building2,
  Scale,
  Globe,
  HandHeart,
  Eye,
  ArrowRight,
  Users,
  Target,
  ChevronRight
} from 'lucide-react';

// The 10 Pillars of MIGA DAO
const PILLARS = [
  {
    id: 'khaz',
    name: 'KHAZ',
    namePersian: 'خزانه',
    nameEnglish: 'Treasury',
    description: 'Financial reserves and economic development fund for the Iranian diaspora. Manages protocol revenue, grants, and investment strategies.',
    icon: Landmark,
    fundingGoal: 500000,
    raised: 125000,
    contributors: 342,
    image: '/dao/treasury.jpg',
    color: '#FFD36A'
  },
  {
    id: 'amn',
    name: 'AMN',
    namePersian: 'امن',
    nameEnglish: 'Security',
    description: 'Digital security infrastructure, privacy tools, and protection services for activists and journalists in hostile environments.',
    icon: Shield,
    fundingGoal: 300000,
    raised: 89000,
    contributors: 187,
    image: '/dao/security.jpg',
    color: '#FFB14A'
  },
  {
    id: 'sal',
    name: 'SAL',
    namePersian: 'سلامت',
    nameEnglish: 'Health',
    description: 'Healthcare access initiatives, medical supply chains, and telemedicine networks for underserved Persian communities.',
    icon: Heart,
    fundingGoal: 400000,
    raised: 156000,
    contributors: 423,
    image: '/dao/health.jpg',
    color: '#FF7A2F'
  },
  {
    id: 'farh',
    name: 'FARH',
    namePersian: 'فرهنگ',
    nameEnglish: 'Culture',
    description: 'Preservation and promotion of Persian art, music, literature, and heritage through digital archives and artist grants.',
    icon: Palette,
    fundingGoal: 250000,
    raised: 78000,
    contributors: 256,
    image: '/dao/culture.jpg',
    color: '#E85D75'
  },
  {
    id: 'dan',
    name: 'DAN',
    namePersian: 'دانش',
    nameEnglish: 'Research',
    description: 'Academic research, scholarships, and educational programs connecting Persian scholars worldwide.',
    icon: FlaskConical,
    fundingGoal: 350000,
    raised: 112000,
    contributors: 198,
    image: '/dao/research.jpg',
    color: '#9B59B6'
  },
  {
    id: 'saz',
    name: 'SAZ',
    namePersian: 'زیرساخت',
    nameEnglish: 'Infrastructure',
    description: 'Technical infrastructure including censorship-resistant communication networks and decentralized hosting.',
    icon: Building2,
    fundingGoal: 450000,
    raised: 203000,
    contributors: 312,
    image: '/dao/infrastructure.jpg',
    color: '#3498DB'
  },
  {
    id: 'dad',
    name: 'DAD',
    namePersian: 'داد',
    nameEnglish: 'Governance',
    description: 'Democratic decision-making frameworks, voting systems, and community coordination tools.',
    icon: Scale,
    fundingGoal: 200000,
    raised: 67000,
    contributors: 145,
    image: '/dao/governance.jpg',
    color: '#1ABC9C'
  },
  {
    id: 'pay',
    name: 'PAY',
    namePersian: 'پیام',
    nameEnglish: 'Consular',
    description: 'Diaspora services including legal aid, immigration support, and consular assistance programs.',
    icon: Globe,
    fundingGoal: 280000,
    raised: 91000,
    contributors: 234,
    image: '/dao/consular.jpg',
    color: '#F39C12'
  },
  {
    id: 'waqf',
    name: 'WAQF',
    namePersian: 'وقف',
    nameEnglish: 'Endowment',
    description: 'Long-term charitable endowment for perpetual funding of humanitarian initiatives and community projects.',
    icon: HandHeart,
    fundingGoal: 1000000,
    raised: 345000,
    contributors: 567,
    image: '/dao/endowment.jpg',
    color: '#27AE60'
  },
  {
    id: 'miz',
    name: 'MIZ',
    namePersian: 'میزان',
    nameEnglish: 'Integrity',
    description: 'Oversight, auditing, and transparency mechanisms ensuring accountability across all DAO operations.',
    icon: Eye,
    fundingGoal: 150000,
    raised: 42000,
    contributors: 98,
    image: '/dao/integrity.jpg',
    color: '#8E44AD'
  }
];

function formatCurrency(amount: number): string {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}K`;
  }
  return `$${amount}`;
}

function ProgressBar({ raised, goal, color }: { raised: number; goal: number; color: string }) {
  const percentage = Math.min((raised / goal) * 100, 100);
  return (
    <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${percentage}%`, backgroundColor: color }}
      />
    </div>
  );
}

function PillarCard({ pillar }: { pillar: typeof PILLARS[0] }) {
  const { connected } = useWallet();
  const Icon = pillar.icon;
  const percentage = Math.round((pillar.raised / pillar.fundingGoal) * 100);

  return (
    <div className="card group hover:border-[#FFD36A]/30 transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${pillar.color}15`, border: `1px solid ${pillar.color}30` }}
          >
            <Icon size={24} style={{ color: pillar.color }} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{pillar.name}</h3>
            <p className="text-sm text-[#FFD36A]">{pillar.namePersian} / {pillar.nameEnglish}</p>
          </div>
        </div>
        <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/60">
          {percentage}% funded
        </span>
      </div>

      {/* Description */}
      <p className="body-sm mb-4 line-clamp-2">{pillar.description}</p>

      {/* Progress */}
      <div className="mb-4">
        <ProgressBar raised={pillar.raised} goal={pillar.fundingGoal} color={pillar.color} />
        <div className="flex justify-between mt-2 text-sm">
          <span className="text-white/80">{formatCurrency(pillar.raised)} raised</span>
          <span className="text-white/40">of {formatCurrency(pillar.fundingGoal)}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 mb-4 text-sm">
        <div className="flex items-center gap-1.5">
          <Users size={14} className="text-white/40" />
          <span className="text-white/60">{pillar.contributors} contributors</span>
        </div>
      </div>

      {/* CTA */}
      {connected ? (
        <button className="w-full btn-primary py-3 text-sm">
          Fund this project
        </button>
      ) : (
        <button
          onClick={() => document.querySelector<HTMLButtonElement>('.wallet-adapter-button')?.click()}
          className="w-full btn-secondary py-3 text-sm"
        >
          Connect wallet to fund
        </button>
      )}
    </div>
  );
}

export default function DAO() {
  const { connected } = useWallet();

  const totalRaised = PILLARS.reduce((sum, p) => sum + p.raised, 0);
  const totalGoal = PILLARS.reduce((sum, p) => sum + p.fundingGoal, 0);
  const totalContributors = PILLARS.reduce((sum, p) => sum + p.contributors, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#07070A]">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        {/* Hero */}
        <section className="container-lg mb-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFD36A]/10 border border-[#FFD36A]/20 mb-6">
              <Landmark size={16} className="text-[#FFD36A]" />
              <span className="text-sm text-[#FFD36A]">MIGA DAO Portal</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-gradient-ember">Fund the Future</span>
              <br />
              <span className="text-white">of Iran</span>
            </h1>

            <p className="body-lg mb-8 max-w-2xl mx-auto">
              The MIGA DAO is organized into 10 pillars, each focused on a critical area
              of development for the Persian diaspora. Choose a cause and contribute.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-8">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gradient-ember">
                  {formatCurrency(totalRaised)}
                </div>
                <div className="text-sm text-white/50">Total Raised</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">
                  {totalContributors.toLocaleString()}
                </div>
                <div className="text-sm text-white/50">Contributors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">
                  10
                </div>
                <div className="text-sm text-white/50">Active DAOs</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/propose" className="btn-primary">
                Submit Proposal <ArrowRight size={18} />
              </Link>
              <Link to="/governance" className="btn-secondary">
                View Active Votes
              </Link>
              {/* Hidden wallet button */}
              <div className="hidden">
                <WalletMultiButton />
              </div>
            </div>
          </div>
        </section>

        {/* Pillars Grid */}
        <section className="container-lg">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold">
              <span className="text-gradient-ember">10 Pillars</span> of MIGA
            </h2>
            <Link to="/propose" className="btn-link">
              Submit a proposal <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PILLARS.map((pillar) => (
              <PillarCard key={pillar.id} pillar={pillar} />
            ))}
          </div>
        </section>

        {/* How it Works */}
        <section className="section border-t border-white/[0.04] mt-16">
          <div className="container-md">
            <div className="text-center mb-12">
              <h2 className="mb-4">How DAO Funding Works</h2>
              <p className="body-md max-w-xl mx-auto">
                Transparent, community-driven allocation of resources.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="flow-step">
                <div className="flow-number mb-4">1</div>
                <h3 className="mb-2">Connect</h3>
                <p className="body-sm">
                  Connect your Solana wallet to access the DAO funding portal.
                </p>
              </div>

              <div className="flow-step">
                <div className="flow-number mb-4">2</div>
                <h3 className="mb-2">Choose</h3>
                <p className="body-sm">
                  Select a pillar that aligns with your values and funding goals.
                </p>
              </div>

              <div className="flow-step">
                <div className="flow-number mb-4">3</div>
                <h3 className="mb-2">Fund</h3>
                <p className="body-sm">
                  Contribute MIGA tokens. Your allocation is recorded on-chain.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-sm">
          <div className="container-md text-center">
            <h2 className="mb-6">
              Have a <span className="text-gradient-ember">Project Idea?</span>
            </h2>
            <p className="body-lg mb-8 max-w-xl mx-auto">
              Submit a proposal to any pillar. If approved by governance vote,
              your project receives funding from the DAO treasury.
            </p>
            <Link to="/propose" className="btn-primary">
              Submit Proposal <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
