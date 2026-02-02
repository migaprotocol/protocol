import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { HeroMedallionScene } from '@/components/3d'
import { RaceToNowruz } from '@/components/RaceToNowruz'
import { MigaCalculator } from '@/components/MigaCalculator'
import {
  ArrowDown,
  Check,
  ExternalLink,
  Shield,
  Users,
  Vote as VoteIcon,
  Wifi,
  Satellite,
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
} from 'lucide-react'
import { useState } from 'react'
import { MintPopup } from '@/components/MintPopup'
import { ChainMintDrawer } from '@/components/ChainMintDrawer'

export default function Index() {
  const [mintOpen, setMintOpen] = useState(false)
  const [drawerChainId, setDrawerChainId] = useState<string | null>(null)

  const handleSelectChain = (chainId: string) => {
    setDrawerChainId(chainId)
  }

  return (
    <div className="min-h-screen bg-[#07070A]">
      <Header />

      <main>
        {/* ============================================
            HERO with Medallion
            ============================================ */}
        <section className="relative min-h-screen flex flex-col bg-[#07070A]">
          {/* Content - stacked layout with medallion on top */}
          <div className="flex-1 flex flex-col items-center justify-center pt-16 sm:pt-20 pb-8 px-4 sm:px-6 lg:px-8">

            {/* 3D Medallion - large, interactive, click to mint */}
            <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-[400px] md:h-[400px] lg:w-[480px] lg:h-[480px] mb-4 sm:mb-6">
              <HeroMedallionScene onClick={() => setMintOpen(true)} />
            </div>
            <p className="text-xs text-gray-500 mb-4 sm:mb-6">Click medallion to mint</p>

            {/* Text content below medallion */}
            <div className="text-center max-w-4xl mx-auto">
              <a
                href="https://pars.network"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/20 mb-4 sm:mb-6 hover:bg-[#FFD700]/20 transition-colors"
              >
                <span className="text-xs sm:text-sm text-[#FFD700] font-medium">MIGA DAO on Pars Network</span>
              </a>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-5 leading-tight">
                <span className="text-white">Make Iran</span>
                <br />
                <span className="bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FFD700] bg-clip-text text-transparent">
                  Great Again
                </span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-xl mx-auto mb-6 sm:mb-8 px-2">
                A DAO funding anti-censorship technology, independent media, and cultural expression for the people of Iran.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10">
                <button
                  data-testid="mint-button-hero"
                  onClick={() => setMintOpen(true)}
                  className="w-full sm:w-auto bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold rounded-full px-8 py-4 hover:shadow-xl hover:shadow-[#FFD700]/30 transition-all text-base cursor-pointer"
                >
                  Mint MIGA
                </button>
                <a
                  href="#leaderboard"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full border border-white/20 text-white hover:bg-white/5 transition-all text-base font-medium"
                >
                  View Leaderboard
                  <ArrowDown size={18} />
                </a>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-sm sm:max-w-md mx-auto bg-white/[0.03] backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-white/[0.06]">
                <div className="text-center">
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">7B</p>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-1 uppercase tracking-wider">Supply</p>
                </div>
                <div className="text-center">
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">100%</p>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-1 uppercase tracking-wider">Treasury</p>
                </div>
                <div className="text-center">
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">0%</p>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-1 uppercase tracking-wider">VC</p>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="pb-6 text-center">
            <a href="#problem" className="inline-flex flex-col items-center gap-2 text-gray-500 hover:text-white transition-colors">
              <span className="text-xs uppercase tracking-wider">Scroll</span>
              <ArrowDown size={16} className="animate-bounce" />
            </a>
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
                  desc: 'Every transaction is publicly verifiable on Pars.Network',
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
                {
                  icon: Lock,
                  title: 'Censorship Resistant',
                  desc: 'No single entity can shut down, freeze, or censor the DAO or its treasury',
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
                    { label: 'Network', value: 'Pars.Network', badge: true },
                    { label: 'Total Supply', value: '7,000,000,000 MIGA' },
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

            {/* Why Pars.Network */}
            <div className="p-8 rounded-3xl bg-gradient-to-r from-[#FFD700]/5 to-[#FFA500]/5 border border-[#FFD700]/20">
              <h3 className="text-xl font-bold text-white mb-6 text-center">
                Why{' '}
                <a href="https://pars.network" target="_blank" rel="noopener noreferrer" className="text-[#FFD700] hover:underline">
                  Pars Network
                </a>
                ?
              </h3>
              <p className="text-gray-400 text-center mb-6 max-w-2xl mx-auto">
                A sovereign, privacy-first blockchain designed for communities under censorship. Quantum-safe encryption, private governance, and interoperability with 7+ chains.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  'Near-Zero Fees',
                  'Sub-Second Finality',
                  'Quantum-Safe Encryption',
                  'Private Voting',
                  'Multi-Chain Bridges',
                  'Global Access',
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

            <button
              data-testid="mint-button-footer"
              onClick={() => setMintOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-12 py-5 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold rounded-full hover:shadow-xl hover:shadow-[#FFD700]/30 transition-all text-xl cursor-pointer"
            >
              Mint MIGA
            </button>

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

        {/* ============================================
            LEADERSHIP
            ============================================ */}
        <section id="leadership" className="py-24 border-t border-white/[0.04]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-sm text-[#FFD700] font-medium uppercase tracking-wider">Leadership</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-white">
                Guided by <span className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">Vision</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                MIGA is led by dedicated individuals committed to preserving Persian heritage and empowering the global diaspora.
              </p>
            </div>

            {/* Cyrus the Greatest Featured */}
            <div className="max-w-3xl mx-auto mb-12">
              <div className="p-8 rounded-3xl bg-gradient-to-br from-[#FFD700]/10 to-transparent border border-[#FFD700]/20">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-40 h-40 rounded-full overflow-hidden flex-shrink-0 border-4 border-[#FFD700]/30">
                    <img
                      src="/images/cyrus-pahlavi.png"
                      alt="Cyrus the Greatest"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-2xl font-bold text-white mb-1">Cyrus the Greatest</h3>
                    <p className="text-[#FFD700] font-medium mb-4">Founding Chair</p>
                    <p className="text-gray-400 mb-6">
                      Leading with a vision of uniting the Persian diaspora and preserving our cultural heritage for future generations.
                    </p>
                    <div className="flex items-center justify-center md:justify-start gap-4">
                      <a
                        href="https://www.cyrusthegreatest1.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-[#FFD700] transition-colors"
                      >
                        <Globe size={20} />
                      </a>
                      <a
                        href="https://www.instagram.com/cyrusthegreatest11"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-[#FFD700] transition-colors"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* View Full Team Link */}
            <div className="text-center">
              <a
                href="/team"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/5 hover:border-[#FFD700]/30 transition-all font-medium"
              >
                View Full Team
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* ============================================
            CHAIN RACE LEADERBOARD
            ============================================ */}
        <RaceToNowruz onSelectChain={handleSelectChain} />

        {/* ============================================
            MIGA CALCULATOR
            ============================================ */}
        <MigaCalculator />
      </main>

      <Footer />

      {/* Mint Popup — pick a chain */}
      <MintPopup
        open={mintOpen}
        onClose={() => setMintOpen(false)}
        onSelectChain={handleSelectChain}
      />

      {/* Chain Mint Drawer — deposit on selected chain */}
      <ChainMintDrawer
        open={!!drawerChainId}
        chainId={drawerChainId}
        onClose={() => setDrawerChainId(null)}
      />
    </div>
  )
}
