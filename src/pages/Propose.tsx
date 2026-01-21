import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  FileText,
  Users,
  Calendar,
  DollarSign,
  Tag,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
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
  Plus,
  X
} from 'lucide-react';

const PILLARS = [
  { id: 'khaz', name: 'KHAZ', namePersian: 'خزانه', nameEnglish: 'Treasury', icon: Landmark },
  { id: 'amn', name: 'AMN', namePersian: 'امن', nameEnglish: 'Security', icon: Shield },
  { id: 'sal', name: 'SAL', namePersian: 'سلامت', nameEnglish: 'Health', icon: Heart },
  { id: 'farh', name: 'FARH', namePersian: 'فرهنگ', nameEnglish: 'Culture', icon: Palette },
  { id: 'dan', name: 'DAN', namePersian: 'دانش', nameEnglish: 'Research', icon: FlaskConical },
  { id: 'saz', name: 'SAZ', namePersian: 'زیرساخت', nameEnglish: 'Infrastructure', icon: Building2 },
  { id: 'dad', name: 'DAD', namePersian: 'داد', nameEnglish: 'Governance', icon: Scale },
  { id: 'pay', name: 'PAY', namePersian: 'پیام', nameEnglish: 'Consular', icon: Globe },
  { id: 'waqf', name: 'WAQF', namePersian: 'وقف', nameEnglish: 'Endowment', icon: HandHeart },
  { id: 'miz', name: 'MIZ', namePersian: 'میزان', nameEnglish: 'Integrity', icon: Eye },
];

interface TeamMember {
  name: string;
  role: string;
  wallet?: string;
}

export default function Propose() {
  const { connected, publicKey } = useWallet();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pillar, setPillar] = useState('');
  const [fundingAmount, setFundingAmount] = useState('');
  const [timeline, setTimeline] = useState('');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([{ name: '', role: '' }]);
  const [milestones, setMilestones] = useState('');

  const addTeamMember = () => {
    setTeamMembers([...teamMembers, { name: '', role: '' }]);
  };

  const removeTeamMember = (index: number) => {
    if (teamMembers.length > 1) {
      setTeamMembers(teamMembers.filter((_, i) => i !== index));
    }
  };

  const updateTeamMember = (index: number, field: keyof TeamMember, value: string) => {
    const updated = [...teamMembers];
    updated[index] = { ...updated[index], [field]: value };
    setTeamMembers(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!connected) return;

    setIsSubmitting(true);
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const selectedPillar = PILLARS.find(p => p.id === pillar);

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col bg-[#07070A]">
        <Header />
        <main className="flex-1 pt-24 pb-16 flex items-center justify-center">
          <div className="text-center max-w-lg mx-auto px-6">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} className="text-emerald-400" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Proposal Submitted</h1>
            <p className="body-md mb-8">
              Your proposal has been submitted to the {selectedPillar?.name} DAO.
              Community members will review and vote on your proposal.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/governance" className="btn-primary">
                View Active Proposals
              </Link>
              <Link to="/dao" className="btn-secondary">
                Back to DAO Portal
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#07070A]">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="container-md">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFD36A]/10 border border-[#FFD36A]/20 mb-6">
              <FileText size={16} className="text-[#FFD36A]" />
              <span className="text-sm text-[#FFD36A]">Submit Proposal</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-gradient-ember">Create</span> a Proposal
            </h1>

            <p className="body-md max-w-xl mx-auto">
              Submit your project idea to the MIGA DAO. Proposals that pass governance
              voting receive funding from the treasury.
            </p>
          </div>

          {/* Wallet Check */}
          {!connected ? (
            <div className="card max-w-lg mx-auto text-center py-12">
              <div className="w-16 h-16 rounded-full bg-[#FFD36A]/10 flex items-center justify-center mx-auto mb-6">
                <AlertCircle size={32} className="text-[#FFD36A]" />
              </div>
              <h2 className="text-xl font-semibold mb-4">Connect Your Wallet</h2>
              <p className="body-sm mb-6">
                You need to connect a Solana wallet to submit a proposal.
                A minimum of 1,000,000 MIGA tokens is required.
              </p>
              <WalletMultiButton />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step Indicator */}
              <div className="flex items-center justify-center gap-4 mb-8">
                {[1, 2, 3].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStep(s)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                      step === s
                        ? 'bg-[#FFD36A] text-black font-medium'
                        : step > s
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-white/5 text-white/40'
                    }`}
                  >
                    <span className="w-6 h-6 rounded-full bg-black/20 flex items-center justify-center text-sm">
                      {step > s ? <CheckCircle2 size={14} /> : s}
                    </span>
                    <span className="hidden sm:inline">
                      {s === 1 ? 'Details' : s === 2 ? 'Team' : 'Review'}
                    </span>
                  </button>
                ))}
              </div>

              {/* Step 1: Project Details */}
              {step === 1 && (
                <div className="card space-y-6">
                  <h2 className="text-xl font-semibold mb-2">Project Details</h2>

                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      <FileText size={14} className="inline mr-2" />
                      Proposal Title
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g., Decentralized VPN Network for Iran"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFD36A]/50 transition-colors"
                      required
                    />
                  </div>

                  {/* Pillar */}
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      <Tag size={14} className="inline mr-2" />
                      DAO Pillar
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                      {PILLARS.map((p) => {
                        const Icon = p.icon;
                        return (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => setPillar(p.id)}
                            className={`flex flex-col items-center gap-1 p-3 rounded-lg border transition-all ${
                              pillar === p.id
                                ? 'bg-[#FFD36A]/10 border-[#FFD36A]/50 text-[#FFD36A]'
                                : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20'
                            }`}
                          >
                            <Icon size={18} />
                            <span className="text-xs font-medium">{p.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Description
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe your project, its goals, and expected impact..."
                      rows={5}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFD36A]/50 transition-colors resize-none"
                      required
                    />
                  </div>

                  {/* Funding & Timeline */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        <DollarSign size={14} className="inline mr-2" />
                        Funding Requested (USD)
                      </label>
                      <input
                        type="number"
                        value={fundingAmount}
                        onChange={(e) => setFundingAmount(e.target.value)}
                        placeholder="50000"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFD36A]/50 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        <Calendar size={14} className="inline mr-2" />
                        Timeline (months)
                      </label>
                      <select
                        value={timeline}
                        onChange={(e) => setTimeline(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FFD36A]/50 transition-colors"
                        required
                      >
                        <option value="" className="bg-[#0F0F16]">Select timeline</option>
                        <option value="3" className="bg-[#0F0F16]">3 months</option>
                        <option value="6" className="bg-[#0F0F16]">6 months</option>
                        <option value="9" className="bg-[#0F0F16]">9 months</option>
                        <option value="12" className="bg-[#0F0F16]">12 months</option>
                        <option value="18" className="bg-[#0F0F16]">18 months</option>
                        <option value="24" className="bg-[#0F0F16]">24 months</option>
                      </select>
                    </div>
                  </div>

                  {/* Milestones */}
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Key Milestones
                    </label>
                    <textarea
                      value={milestones}
                      onChange={(e) => setMilestones(e.target.value)}
                      placeholder="List key milestones and deliverables (one per line)..."
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFD36A]/50 transition-colors resize-none"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="btn-primary"
                      disabled={!title || !pillar || !description || !fundingAmount || !timeline}
                    >
                      Next: Team <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Team */}
              {step === 2 && (
                <div className="card space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Team Members</h2>
                    <button
                      type="button"
                      onClick={addTeamMember}
                      className="btn-link text-sm"
                    >
                      <Plus size={16} /> Add Member
                    </button>
                  </div>

                  <div className="space-y-4">
                    {teamMembers.map((member, index) => (
                      <div key={index} className="flex gap-4 items-start">
                        <div className="flex-1 grid sm:grid-cols-2 gap-4">
                          <input
                            type="text"
                            value={member.name}
                            onChange={(e) => updateTeamMember(index, 'name', e.target.value)}
                            placeholder="Name"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFD36A]/50 transition-colors"
                          />
                          <input
                            type="text"
                            value={member.role}
                            onChange={(e) => updateTeamMember(index, 'role', e.target.value)}
                            placeholder="Role (e.g., Lead Developer)"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFD36A]/50 transition-colors"
                          />
                        </div>
                        {teamMembers.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeTeamMember(index)}
                            className="p-3 text-white/40 hover:text-red-400 transition-colors"
                          >
                            <X size={18} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <p className="body-sm mb-4">
                      <Users size={14} className="inline mr-2" />
                      Proposer wallet: <code className="text-[#FFD36A]">{publicKey?.toBase58().slice(0, 8)}...{publicKey?.toBase58().slice(-8)}</code>
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="btn-secondary"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="btn-primary"
                    >
                      Next: Review <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Review */}
              {step === 3 && (
                <div className="card space-y-6">
                  <h2 className="text-xl font-semibold">Review Proposal</h2>

                  <div className="space-y-4">
                    <div className="p-4 bg-white/5 rounded-lg">
                      <div className="text-sm text-white/40 mb-1">Title</div>
                      <div className="font-medium">{title}</div>
                    </div>

                    <div className="p-4 bg-white/5 rounded-lg">
                      <div className="text-sm text-white/40 mb-1">Pillar</div>
                      <div className="font-medium text-[#FFD36A]">
                        {selectedPillar?.name} ({selectedPillar?.nameEnglish})
                      </div>
                    </div>

                    <div className="p-4 bg-white/5 rounded-lg">
                      <div className="text-sm text-white/40 mb-1">Description</div>
                      <div className="text-sm text-white/80">{description}</div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="p-4 bg-white/5 rounded-lg">
                        <div className="text-sm text-white/40 mb-1">Funding</div>
                        <div className="font-medium">${parseInt(fundingAmount).toLocaleString()}</div>
                      </div>
                      <div className="p-4 bg-white/5 rounded-lg">
                        <div className="text-sm text-white/40 mb-1">Timeline</div>
                        <div className="font-medium">{timeline} months</div>
                      </div>
                    </div>

                    <div className="p-4 bg-white/5 rounded-lg">
                      <div className="text-sm text-white/40 mb-2">Team</div>
                      <div className="space-y-2">
                        {teamMembers.filter(m => m.name).map((member, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#FFD36A]/20 flex items-center justify-center text-[#FFD36A] text-sm font-medium">
                              {member.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-medium">{member.name}</span>
                            {member.role && (
                              <span className="text-sm text-white/40">- {member.role}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Warning */}
                  <div className="p-4 bg-[#FFD36A]/10 border border-[#FFD36A]/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertCircle size={20} className="text-[#FFD36A] flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <p className="text-[#FFD36A] font-medium mb-1">Before submitting:</p>
                        <ul className="text-white/60 space-y-1">
                          <li>Your proposal will be public and visible to all DAO members</li>
                          <li>Voting period is 3 days with 51% approval needed</li>
                          <li>Approved proposals have 24-hour timelock before execution</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="btn-secondary"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin">...</span> Submitting
                        </>
                      ) : (
                        <>
                          Submit Proposal <ArrowRight size={18} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
