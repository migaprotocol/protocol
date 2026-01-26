import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import {
  ArrowRight,
  ArrowDown,
  Globe,
  Shield,
  Wifi,
  Radio,
  Film,
  Ban,
  Vote as VoteIcon,
  Zap,
  Eye,
  Check,
  X as XIcon,
  ExternalLink,
  Copy,
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
            HERO SECTION
            ============================================ */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A12] via-[#07070A] to-[#07070A]" />
          
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/20 mb-8">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-sm text-[#FFD700] font-medium">Decentralized Autonomous Organization on Solana</span>
            </div>

            {/* Main headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              <span className="text-white">Freedom of</span>
              <br />
              <span className="bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FFD700] bg-clip-text text-transparent">
                Information
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12">
              MIGA is a DAO that funds anti-censorship technology, independent media, and cultural expression for the people of Iran.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <WalletMultiButton className="!bg-gradient-to-r !from-[#FFD700] !to-[#FFA500] !text-black !font-bold !rounded-full !px-8 !py-4 hover:!shadow-xl hover:!shadow-[#FFD700]/30 !transition-all !text-lg" />
              <a
                href="#token"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-medium rounded-full hover:bg-white/5 transition-all text-lg"
              >
                View Token Details
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">1B</p>
                <p className="text-sm text-gray-400 mt-2">Total Supply</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">100%</p>
                <p className="text-sm text-gray-400 mt-2">Community Treasury</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">0%</p>
                <p className="text-sm text-gray-400 mt-2">VC Allocation</p>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
              <div className="flex flex-col items-center gap-2 text-gray-500">
                <span className="text-sm">Scroll</span>
                <ArrowDown size={20} className="animate-bounce" />
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            THE PROBLEM
            ============================================ */}
        <section id="problem" className="py-24 border-t border-white/[0.04]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                The <span className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">Problem</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Millions of Iranians live under severe restrictions that limit their access to information, culture, and free expression.
              </p>
            </div>

            {/* Daily Reality Cards */}
            <div className="mb-16">
              <h3 className="text-xl font-semibold text-center mb-8 text-gray-400">Daily Reality for Iranians</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { icon: Ban, label: 'Information Censorship' },
                  { icon: Wifi, label: 'Internet Blackouts' },
                  { icon: Radio, label: 'Restricted Media' },
                  { icon: Shield, label: 'Limited News Access' },
                  { icon: Film, label: 'Cultural Repression' },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
                    <item.icon className="text-red-400/70" size={28} />
                    <span className="text-sm text-gray-400 text-center">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Traditional NGOs Fail */}
            <div>
              <h3 className="text-xl font-semibold text-center mb-8 text-gray-400">Why Traditional NGOs Fail</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {['Slow', 'Politicized', 'Blocked', 'Underfunded', 'Centralized'].map((reason) => (
                  <span key={reason} className="px-6 py-3 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium">
                    {reason}
                  </span>
                ))}
              </div>
              <p className="text-center text-xl text-gray-300 mt-12 font-medium">
                Freedom needs a new financial and governance layer.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================
            THE SOLUTION
            ============================================ */}
        <section id="solution" className="py-24 bg-gradient-to-b from-[#0A0A10] to-transparent">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                The <span className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">Solution</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                MIGA is a Decentralized Autonomous Organization (DAO) that enables transparent, community-driven funding for freedom-of-information infrastructure.
              </p>
            </div>

            {/* Solution Features */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {[
                { icon: Globe, title: 'Global Fundraising', desc: 'Raise funds from anywhere in the world without borders or restrictions' },
                { icon: Eye, title: 'On-Chain Transparency', desc: 'Every transaction is publicly verifiable on the Solana blockchain' },
                { icon: VoteIcon, title: 'Community Governance', desc: 'Token holders vote on which missions receive funding' },
                { icon: Zap, title: 'Automatic Execution', desc: 'Smart contracts release grants without intermediaries' },
              ].map((feature) => (
                <div key={feature.title} className="flex gap-5 p-8 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-[#FFD700]/20 transition-all">
                  <div className="w-14 h-14 rounded-xl bg-[#FFD700]/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="text-[#FFD700]" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-[#EDEDF2]">{feature.title}</h3>
                    <p className="text-gray-400">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex justify-center gap-4 flex-wrap">
              <span className="px-4 py-2 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/20 text-[#FFD700] text-sm font-medium">No Borders</span>
              <span className="px-4 py-2 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/20 text-[#FFD700] text-sm font-medium">No Intermediaries</span>
              <span className="px-4 py-2 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/20 text-[#FFD700] text-sm font-medium">No Single Owner</span>
            </div>
          </div>
        </section>

        {/* ============================================
            TOKEN OVERVIEW
            ============================================ */}
        <section id="token" className="py-24 border-t border-white/[0.04]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Token <span className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">Overview</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                A simple, transparent token designed purely for community governance.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Token Specifications */}
              <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
                <h3 className="text-xl font-semibold mb-6 text-[#FFD700]">Token Specifications</h3>
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
                      <span className="text-gray-400">{item.label}</span>
                      <span className="font-medium text-[#EDEDF2] flex items-center gap-2">
                        {item.badge && <span className="w-2 h-2 bg-emerald-400 rounded-full" />}
                        {item.value}
                      </span>
                    </div>
                  ))}
                  {/* Contract Address */}
                  <div className="flex justify-between items-start py-3">
                    <span className="text-gray-400">Contract</span>
                    <div className="text-right flex items-center gap-2">
                      <code className="text-sm text-[#FFD700] font-mono">MIGAx...pending</code>
                      <button
                        onClick={copyAddress}
                        className="text-gray-500 hover:text-[#FFD700] transition-colors"
                        title="Copy address"
                      >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fair Launch Guarantee */}
              <div className="p-8 rounded-2xl bg-gradient-to-br from-[#FFD700]/10 to-transparent border border-[#FFD700]/20">
                <h3 className="text-xl font-semibold mb-6 text-[#FFD700]">Fair Launch Guarantee</h3>
                <p className="text-gray-300 mb-8">
                  MIGA is built on principles of radical transparency. Every token exists to serve the community, not insiders.
                </p>
                <div className="space-y-4 mb-8">
                  {['No founders allocation', 'No VC allocation', 'No hidden wallets'].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <Check className="text-emerald-400" size={20} />
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="p-6 rounded-xl bg-white/[0.03] text-center">
                  <p className="text-5xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">100%</p>
                  <p className="text-gray-400 mt-2">of raised funds go to DAO treasury</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            FUNDING ROADMAP
            ============================================ */}
        <section id="roadmap" className="py-24 bg-gradient-to-b from-[#0A0A10] to-transparent">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Funding <span className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">Roadmap</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Each phase unlocks new governance modules and expands MIGA's impact.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                { phase: 'Phase I', amount: '$5M', items: ['Independent media', 'Encrypted communications', 'Awareness campaigns'] },
                { phase: 'Phase II', amount: '$10M', items: ['Global cultural campaigns', 'Community hubs', 'Satellite connectivity'] },
                { phase: 'Phase III', amount: '$50M', items: ['Regional digital freedom infrastructure'] },
                { phase: 'Phase IV', amount: '$100M', items: ['Global censorship-resistant network for Iranian voices'] },
              ].map((phase, index) => (
                <div key={phase.phase} className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-[#FFD700]/20 transition-all">
                  {index < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-[#FFD700]/30 to-transparent" />
                  )}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-sm text-gray-500">{phase.phase}</span>
                    <ArrowRight size={16} className="text-[#FFD700]" />
                    <span className="text-2xl font-bold text-[#FFD700]">{phase.amount}</span>
                  </div>
                  <ul className="space-y-2">
                    {phase.items.map((item) => (
                      <li key={item} className="text-sm text-gray-400 flex items-start gap-2">
                        <span className="text-[#FFD700] mt-1">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================
            WHAT MIGA SUPPORTS
            ============================================ */}
        <section className="py-24 border-t border-white/[0.04]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                What MIGA <span className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">Supports</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                MIGA supports only non-violent, civil, and informational initiatives.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* What MIGA Can Fund */}
              <div className="p-8 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
                <h3 className="text-xl font-semibold mb-6 text-emerald-400 flex items-center gap-2">
                  <Check size={24} /> What MIGA Can Fund
                </h3>
                <ul className="space-y-3">
                  {[
                    'Independent journalism',
                    'Anti-censorship technologies',
                    'Satellite communication access',
                    'VPN & mesh network tools',
                    'Cultural content (film, music, art, literature)',
                    'Educational platforms',
                    'Human-rights documentation',
                    'Global awareness campaigns',
                    'Community events & gatherings',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-gray-300">
                      <Check className="text-emerald-400 flex-shrink-0" size={18} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* What MIGA Will Never Fund */}
              <div className="p-8 rounded-2xl bg-red-500/5 border border-red-500/20">
                <h3 className="text-xl font-semibold mb-6 text-red-400 flex items-center gap-2">
                  <XIcon size={24} /> What MIGA Will Never Fund
                </h3>
                <ul className="space-y-3">
                  {[
                    'Violence',
                    'Political parties',
                    'Military activity',
                    'Armed groups',
                    'Election interference',
                    'State overthrow',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-gray-300">
                      <XIcon className="text-red-400 flex-shrink-0" size={18} />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-8 text-sm text-gray-400 italic border-t border-red-500/20 pt-6">
                  "MIGA is about freedom of information and culture, not power."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            HOW GOVERNANCE WORKS
            ============================================ */}
        <section id="governance" className="py-24 bg-gradient-to-b from-[#0A0A10] to-transparent">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                How Governance <span className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">Works</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                A transparent, community-driven process from proposal to execution.
              </p>
            </div>

            <div className="grid md:grid-cols-5 gap-4 mb-12">
              {[
                { step: '1', title: 'Submit Proposal', desc: 'Anyone can submit a mission proposal to the DAO' },
                { step: '2', title: 'Committee Review', desc: 'DAO committee reviews for legality & safety' },
                { step: '3', title: 'Token Holder Vote', desc: 'MIGA holders vote on approved proposals' },
                { step: '4', title: 'Automatic Execution', desc: 'Smart contracts release funds upon approval' },
                { step: '5', title: 'Transparent Reporting', desc: 'All spending is publicly documented on-chain' },
              ].map((item, index) => (
                <div key={item.step} className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04] text-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] flex items-center justify-center text-black font-bold mb-4 mx-auto">
                    {item.step}
                  </div>
                  <h3 className="font-semibold mb-2 text-[#EDEDF2]">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                  {index < 4 && (
                    <div className="hidden md:block absolute top-10 -right-2 w-4 h-px bg-[#FFD700]/30" />
                  )}
                </div>
              ))}
            </div>

            {/* Why Solana */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-400 mb-4">Why Solana?</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {['Low Fees', 'Fast Voting', 'Global Access', 'Transparent Treasury', 'Real-time Governance'].map((item) => (
                  <span key={item} className="px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.04] text-sm text-gray-300">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            THE MOVEMENT - FINAL CTA
            ============================================ */}
        <section className="py-24 border-t border-white/[0.04]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              The <span className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">Movement</span>
            </h2>

            <p className="text-2xl text-gray-300 mb-8">
              MIGA is not against Iran.
            </p>

            <p className="text-3xl font-semibold text-white mb-12">
              It is <span className="text-[#FFD700]">for</span> the Iranian people.
            </p>

            {/* Values */}
            <div className="flex justify-center gap-6 flex-wrap mb-12">
              <span className="px-8 py-4 rounded-2xl bg-[#FFD700]/10 border border-[#FFD700]/20 text-[#FFD700] font-semibold text-lg">For Freedom</span>
              <span className="px-8 py-4 rounded-2xl bg-[#FFD700]/10 border border-[#FFD700]/20 text-[#FFD700] font-semibold text-lg">For Culture</span>
              <span className="px-8 py-4 rounded-2xl bg-[#FFD700]/10 border border-[#FFD700]/20 text-[#FFD700] font-semibold text-lg">For Voices</span>
            </div>

            {/* Final CTA */}
            <WalletMultiButton className="!inline-flex !items-center !justify-center !gap-2 !px-12 !py-5 !bg-gradient-to-r !from-[#FFD700] !to-[#FFA500] !text-black !font-bold !rounded-full hover:!shadow-xl hover:!shadow-[#FFD700]/30 !transition-all !text-xl" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
