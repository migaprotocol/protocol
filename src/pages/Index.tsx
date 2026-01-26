import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { MigaSceneLite } from '@/components/3d'
import {
  ArrowDown,
  Check,
  Copy,
  ExternalLink,
  Wallet,
  Shield,
  Users,
  Vote as VoteIcon,
  Wifi,
  Satellite,
  GraduationCap,
  Scale,
  Globe,
  Lock,
  Zap,
  Target,
  FileText,
  X,
  Clock,
  Ban,
  DollarSign,
  Building,
  Eye,
  Radio,
  Newspaper,
  Music,
  Film,
  BookOpen,
  Megaphone,
  Calendar,
  Sword,
  Flag,
  Users2,
  AlertTriangle,
  Heart,
} from 'lucide-react'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useState } from 'react'

export default function Index() {
  const { connected } = useWallet()
  const [copied, setCopied] = useState(false)

  const copyAddress = () => {
    navigator.clipboard.writeText('MIGAx...pending')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#07070A]">
      <Header />

      <main>
        {/* ============================================
            HERO with 3D Scene
            ============================================ */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A12] via-[#07070A] to-[#07070A]" />

          {/* 3D Scene - Full width behind content */}
          <div className="absolute inset-0 z-0">
            <MigaSceneLite />
          </div>

          {/* Content overlay */}
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/20 mb-8 backdrop-blur-sm">
              <span className="text-sm text-[#FFD700] font-medium">Decentralized Autonomous Organization on Solana</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight drop-shadow-2xl">
              <span className="text-white">Freedom of</span>
              <br />
              <span className="bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FFD700] bg-clip-text text-transparent">
                Information
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 drop-shadow-lg">
              MIGA is a DAO that funds anti-censorship technology, independent media, and cultural expression for the people of Iran.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <WalletMultiButton className="!bg-gradient-to-r !from-[#FFD700] !to-[#FFA500] !text-black !font-bold !rounded-full !px-10 !py-5 hover:!shadow-xl hover:!shadow-[#FFD700]/30 !transition-all !text-lg" />
              <a
                href="#token"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white hover:bg-white/5 transition-all text-lg font-medium backdrop-blur-sm"
              >
                View Token Details
                <ArrowDown size={18} />
              </a>
            </div>

            <div className="grid grid-cols-3 gap-8 max-w-xl mx-auto backdrop-blur-sm bg-black/20 rounded-2xl p-6">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">1B</p>
                <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">Total Supply</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">100%</p>
                <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">Community Treasury</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">0%</p>
                <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">VC Allocation</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            THE PROBLEM
            ============================================ */}
        <section id="problem" className="py-24 border-t border-white/[0.04]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-sm text-[#FFD700] font-medium uppercase tracking-wider">The Problem</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-white">
                Millions Live Under <span className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">Restrictions</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Millions of Iranians live under severe restrictions that limit their access to information, culture, and free expression.
              </p>
            </div>

            {/* Daily Reality */}
            <div className="mb-12">
              <h3 className="text-xl font-bold text-white mb-6 text-center">Daily Reality for Iranians</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { icon: Lock, label: 'Information Censorship' },
                  { icon: Wifi, label: 'Internet Blackouts' },
                  { icon: Radio, label: 'Restricted Media' },
                  { icon: Newspaper, label: 'Limited News Access' },
                  { icon: Music, label: 'Cultural Repression' },
                ].map((item) => (
                  <div key={item.label} className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20 text-center">
                    <item.icon className="mx-auto text-red-400 mb-3" size={28} />
                    <p className="text-sm text-gray-400">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Why NGOs Fail */}
            <div className="mb-12">
              <h3 className="text-xl font-bold text-white mb-6 text-center">Why Traditional NGOs Fail</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { icon: Clock, label: 'Slow' },
                  { icon: Flag, label: 'Politicized' },
                  { icon: Ban, label: 'Blocked' },
                  { icon: DollarSign, label: 'Underfunded' },
                  { icon: Building, label: 'Centralized' },
                ].map((item) => (
                  <div key={item.label} className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center">
                    <item.icon className="mx-auto text-gray-500 mb-3" size={28} />
                    <p className="text-sm text-gray-400">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center p-8 rounded-3xl bg-gradient-to-r from-[#FFD700]/5 to-[#FFA500]/5 border border-[#FFD700]/20">
              <p className="text-2xl text-white font-bold">
                Freedom needs a new financial and governance layer.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================
            THE SOLUTION
            ============================================ */}
        <section id="solution" className="py-24 bg-gradient-to-b from-[#0A0A10] to-transparent">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-sm text-[#FFD700] font-medium uppercase tracking-wider">The Solution</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-white">
                <span className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">MIGA</span> DAO
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                MIGA is a Decentralized Autonomous Organization (DAO) that enables transparent, community-driven funding for freedom-of-information infrastructure.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: Globe,
                  title: 'Global Fundraising',
                  desc: 'Raise funds from anywhere in the world without borders or restrictions',
                },
                {
                  icon: Eye,
                  title: 'On-Chain Transparency',
                  desc: 'Every transaction is publicly verifiable on the Solana blockchain',
                },
                {
                  icon: Users,
                  title: 'Community Governance',
                  desc: 'Token holders vote on which missions receive funding',
                },
                {
                  icon: Zap,
                  title: 'Automatic Execution',
                  desc: 'Smart contracts release grants without intermediaries',
                },
                {
                  icon: Shield,
                  title: 'Freedom Infrastructure',
                  desc: 'Supporting tools for free information flow in Iran',
                },
              ].map((item) => (
                <div key={item.title} className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06] hover:border-[#FFD700]/30 transition-all">
                  <div className="w-14 h-14 rounded-2xl bg-[#FFD700]/10 flex items-center justify-center mb-6">
                    <item.icon className="text-[#FFD700]" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {['No Borders', 'No Intermediaries', 'No Single Owner'].map((tag) => (
                <span key={tag} className="px-6 py-3 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/20 text-[#FFD700] font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================
            TOKEN OVERVIEW
            ============================================ */}
        <section id="token" className="py-24 border-t border-white/[0.04]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-sm text-[#FFD700] font-medium uppercase tracking-wider">Token Overview</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-white">
                Simple & <span className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">Transparent</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                A simple, transparent token designed purely for community governance.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Token Specs */}
              <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06]">
                <h3 className="text-xl font-bold text-white mb-6">Token Specifications</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Token Name', value: 'MIGA' },
                    { label: 'Network', value: 'Solana', badge: true },
                    { label: 'Total Supply', value: '1,000,000,000 MIGA' },
                    { label: 'Utility', value: 'Governance & Voting' },
                    { label: 'Voting Power', value: '1 MIGA = 1 Vote' },
                    { label: 'Treasury', value: '100% to DAO' },
                    { label: 'Custody', value: 'On-chain Multi-sig Vault' },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center py-3 border-b border-white/[0.04]">
                      <span className="text-gray-500">{item.label}</span>
                      <span className="font-medium text-[#EDEDF2] flex items-center gap-2">
                        {item.badge && <span className="w-2 h-2 bg-emerald-400 rounded-full" />}
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fair Launch */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-[#FFD700]/10 to-transparent border border-[#FFD700]/20">
                <h3 className="text-xl font-bold text-white mb-6">Fair Launch Guarantee</h3>
                <p className="text-gray-400 mb-6">
                  MIGA is built on principles of radical transparency. Every token exists to serve the community, not insiders.
                </p>
                <div className="space-y-4 mb-8">
                  {[
                    'No founders allocation',
                    'No VC allocation',
                    'No hidden wallets',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <Check className="text-emerald-400" size={14} />
                      </div>
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="p-6 rounded-2xl bg-white/[0.04] text-center">
                  <p className="text-5xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent mb-2">100%</p>
                  <p className="text-gray-400">of raised funds go to DAO treasury</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            FUNDING ROADMAP
            ============================================ */}
        <section id="roadmap" className="py-24 bg-gradient-to-b from-[#0A0A10] to-transparent">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-sm text-[#FFD700] font-medium uppercase tracking-wider">Funding Roadmap</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-white">
                Growing <span className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">Impact</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Each phase unlocks new governance modules and expands MIGA's impact.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {[
                {
                  phase: 'I',
                  amount: '$5M',
                  items: ['Independent media', 'Encrypted communications', 'Awareness campaigns'],
                },
                {
                  phase: 'II',
                  amount: '$10M',
                  items: ['Global cultural campaigns', 'Community hubs', 'Satellite connectivity'],
                },
                {
                  phase: 'III',
                  amount: '$50M',
                  items: ['Regional digital freedom infrastructure'],
                },
                {
                  phase: 'IV',
                  amount: '$100M',
                  items: ['Global censorship-resistant network for Iranian voices'],
                },
              ].map((phase, i) => (
                <div key={phase.phase} className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.06] relative overflow-hidden">
                  <div className="absolute top-4 right-4 text-6xl font-bold text-white/[0.03]">
                    {phase.phase}
                  </div>
                  <p className="text-sm text-[#FFD700] font-medium mb-2">Phase {phase.phase}</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent mb-4">
                    {phase.amount}
                  </p>
                  <ul className="space-y-2">
                    {phase.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-400">
                        <span className="text-[#FFD700]">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* What MIGA Supports */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Can Fund */}
              <div className="p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/20">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <Check className="text-emerald-400" size={24} />
                  What MIGA Can Fund
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Newspaper, label: 'Independent journalism' },
                    { icon: Shield, label: 'Anti-censorship tech' },
                    { icon: Satellite, label: 'Satellite access' },
                    { icon: Wifi, label: 'VPN & mesh networks' },
                    { icon: Film, label: 'Cultural content' },
                    { icon: BookOpen, label: 'Educational platforms' },
                    { icon: FileText, label: 'Human-rights docs' },
                    { icon: Megaphone, label: 'Awareness campaigns' },
                    { icon: Calendar, label: 'Community events' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2 text-sm text-gray-300">
                      <item.icon size={16} className="text-emerald-400 flex-shrink-0" />
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Will Never Fund */}
              <div className="p-8 rounded-3xl bg-red-500/5 border border-red-500/20">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <X className="text-red-400" size={24} />
                  What MIGA Will Never Fund
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Sword, label: 'Violence' },
                    { icon: Flag, label: 'Political parties' },
                    { icon: Target, label: 'Military activity' },
                    { icon: Users2, label: 'Armed groups' },
                    { icon: VoteIcon, label: 'Election interference' },
                    { icon: AlertTriangle, label: 'State overthrow' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2 text-sm text-gray-400">
                      <item.icon size={16} className="text-red-400 flex-shrink-0" />
                      {item.label}
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 rounded-xl bg-white/[0.02]">
                  <p className="text-sm text-gray-400 italic text-center">
                    "MIGA is about freedom of information and culture, not power."
                  </p>
                </div>
              </div>
            </div>

            <p className="text-center text-gray-400 mt-8">
              MIGA supports only <span className="text-white font-medium">non-violent, civil, and informational</span> initiatives.
            </p>
          </div>
        </section>

        {/* ============================================
            GOVERNANCE
            ============================================ */}
        <section id="governance" className="py-24 border-t border-white/[0.04]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-sm text-[#FFD700] font-medium uppercase tracking-wider">DAO Governance</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-white">
                How <span className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">Governance</span> Works
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                A transparent, community-driven process from proposal to execution.
              </p>
            </div>

            {/* Steps */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-16">
              {[
                { step: '1', title: 'Submit Proposal', desc: 'Anyone can submit a mission proposal to the DAO' },
                { step: '2', title: 'Committee Review', desc: 'DAO committee reviews for legality & safety' },
                { step: '3', title: 'Token Holder Vote', desc: 'MIGA holders vote on approved proposals' },
                { step: '4', title: 'Automatic Execution', desc: 'Smart contracts release funds upon approval' },
                { step: '5', title: 'Transparent Reporting', desc: 'All spending is publicly documented on-chain' },
              ].map((item, i) => (
                <div key={item.step} className="relative">
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center h-full">
                    <div className="w-10 h-10 rounded-full bg-[#FFD700] flex items-center justify-center text-black font-bold mx-auto mb-4">
                      {item.step}
                    </div>
                    <h4 className="font-semibold text-white mb-2 text-sm">{item.title}</h4>
                    <p className="text-xs text-gray-400">{item.desc}</p>
                  </div>
                  {i < 4 && (
                    <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 text-[#FFD700]">
                      →
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Why Solana */}
            <div className="p-8 rounded-3xl bg-gradient-to-r from-[#FFD700]/5 to-[#FFA500]/5 border border-[#FFD700]/20">
              <h3 className="text-xl font-bold text-white mb-6 text-center">Why Solana?</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  'Low Fees',
                  'Fast Voting',
                  'Global Access',
                  'Transparent Treasury',
                  'Real-time Governance',
                ].map((feature) => (
                  <span key={feature} className="px-4 py-2 rounded-full bg-white/[0.04] text-sm text-gray-300">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            THE MOVEMENT
            ============================================ */}
        <section id="join" className="py-24 bg-gradient-to-b from-[#0A0A10] to-transparent">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
              The <span className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">Movement</span>
            </h2>

            <div className="mb-12">
              <p className="text-2xl text-gray-300 mb-6">
                MIGA is <span className="text-white font-bold">not</span> against Iran.
              </p>
              <p className="text-3xl md:text-4xl text-white font-bold mb-8">
                It is <span className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">for</span> the Iranian people.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {[
                  { icon: Shield, label: 'For Freedom' },
                  { icon: Music, label: 'For Culture' },
                  { icon: Megaphone, label: 'For Voices' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.04] border border-white/[0.06]">
                    <item.icon className="text-[#FFD700]" size={20} />
                    <span className="text-white font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <WalletMultiButton className="!inline-flex !items-center !justify-center !gap-2 !px-12 !py-5 !bg-gradient-to-r !from-[#FFD700] !to-[#FFA500] !text-black !font-bold !rounded-full hover:!shadow-xl hover:!shadow-[#FFD700]/30 !transition-all !text-xl" />

            {connected && (
              <p className="mt-6 text-emerald-400 flex items-center justify-center gap-2">
                <Check size={18} /> Wallet Connected
              </p>
            )}

            <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
              <a
                href="https://miga.us.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-[#FFD700] transition-colors"
              >
                Learn about the Foundation
                <ExternalLink size={14} />
              </a>
              <span className="text-gray-600 hidden sm:block">|</span>
              <a
                href="https://pars.vote"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-[#FFD700] transition-colors"
              >
                Vote on Proposals
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
