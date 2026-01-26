import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import {
  ArrowRight,
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
  Megaphone,
  Globe,
  Lock,
  Zap,
  Target,
  FileText,
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
            HERO
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

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/20 mb-8">
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
              MIGA is a DAO that funds anti-censorship technology to help people in Iran access free and open information.
            </p>

            {/* Primary CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <WalletMultiButton className="!bg-gradient-to-r !from-[#FFD700] !to-[#FFA500] !text-black !font-bold !rounded-full !px-10 !py-5 hover:!shadow-xl hover:!shadow-[#FFD700]/30 !transition-all !text-lg" />
              <a
                href="#problem"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white hover:bg-white/5 transition-all text-lg font-medium"
              >
                Learn More
                <ArrowDown size={18} />
              </a>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-8 max-w-xl mx-auto">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">1B</p>
                <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">Total Supply</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">100%</p>
                <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">Community</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">0%</p>
                <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">VC/Team</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            PROBLEM SECTION
            ============================================ */}
        <section id="problem" className="py-24 border-t border-white/[0.04]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-sm text-[#FFD700] font-medium uppercase tracking-wider">The Problem</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
                90 Million People <span className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">Cut Off</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Iran has some of the most severe internet restrictions in the world, cutting millions of people off from free information.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Stats */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20">
                <h3 className="text-2xl font-bold text-white mb-6">Government Censorship</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-gray-400">Websites Blocked</span>
                      <span className="text-3xl font-bold text-red-400">5M+</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: '95%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-gray-400">Internet Shutdowns (2022)</span>
                      <span className="text-3xl font-bold text-red-400">187 days</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: '51%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-gray-400">VPN Users Prosecuted</span>
                      <span className="text-3xl font-bold text-red-400">1000s</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: '70%' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Impact */}
              <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06]">
                <h3 className="text-2xl font-bold text-white mb-6">Human Impact</h3>
                <div className="space-y-4">
                  {[
                    { icon: Globe, text: 'Instagram, Twitter/X, YouTube, Telegram - all blocked' },
                    { icon: Lock, text: 'WhatsApp and Signal heavily restricted' },
                    { icon: Megaphone, text: 'Journalists and activists imprisoned for online speech' },
                    { icon: Wifi, text: 'Complete internet blackouts during protests' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02]">
                      <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="text-red-400" size={20} />
                      </div>
                      <p className="text-gray-300">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center p-8 rounded-3xl bg-gradient-to-r from-[#FFD700]/5 to-[#FFA500]/5 border border-[#FFD700]/20">
              <p className="text-xl text-gray-300 mb-4">
                During the 2022 Mahsa Amini protests, the government cut internet access for <span className="text-[#FFD700] font-bold">over 6 months</span> to prevent information from spreading.
              </p>
              <p className="text-gray-400">
                Traditional funding can be traced and blocked. <span className="text-white font-medium">Decentralized funding cannot.</span>
              </p>
            </div>
          </div>
        </section>

        {/* ============================================
            SOLUTION SECTION
            ============================================ */}
        <section id="solution" className="py-24 bg-gradient-to-b from-[#0A0A10] to-transparent">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-sm text-[#FFD700] font-medium uppercase tracking-wider">The Solution</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
                How <span className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">MIGA</span> Works
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                A decentralized treasury that funds anti-censorship technology through community governance.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {[
                {
                  step: '1',
                  icon: Wallet,
                  title: 'Acquire MIGA',
                  desc: 'Buy MIGA tokens on Solana. 100% of proceeds go to the community treasury.',
                },
                {
                  step: '2',
                  icon: VoteIcon,
                  title: 'Vote on Proposals',
                  desc: 'Token holders vote on which anti-censorship projects receive funding.',
                },
                {
                  step: '3',
                  icon: Zap,
                  title: 'Fund Freedom',
                  desc: 'Treasury funds are deployed to approved projects fighting censorship.',
                },
              ].map((item) => (
                <div key={item.step} className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06] text-center relative overflow-hidden group hover:border-[#FFD700]/30 transition-all">
                  <div className="absolute top-4 right-4 text-6xl font-bold text-white/[0.03] group-hover:text-[#FFD700]/10 transition-colors">
                    {item.step}
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FFD700]/20 to-[#FFA500]/10 flex items-center justify-center mx-auto mb-6">
                    <item.icon className="text-[#FFD700]" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Why Decentralized */}
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06]">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Why Decentralized?</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: 'Censorship Resistant', desc: 'No bank accounts to freeze, no organizations to shut down' },
                  { title: 'Transparent', desc: 'Every transaction visible on-chain, fully auditable' },
                  { title: 'Permissionless', desc: 'Anyone worldwide can contribute and participate' },
                  { title: 'Community Controlled', desc: 'No single point of failure or control' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-[#FFD700]/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <Check className="text-[#FFD700]" size={14} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            TOKEN SECTION
            ============================================ */}
        <section id="token" className="py-24 border-t border-white/[0.04]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-sm text-[#FFD700] font-medium uppercase tracking-wider">Tokenomics</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
                Token <span className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">Overview</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Token Specs */}
              <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06]">
                <h3 className="text-xl font-bold text-white mb-6">Token Details</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Token Name', value: 'MIGA' },
                    { label: 'Network', value: 'Solana', badge: true },
                    { label: 'Total Supply', value: '1,000,000,000' },
                    { label: 'Voting Power', value: '1 MIGA = 1 Vote' },
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

                {/* Contract Address */}
                <div className="mt-6">
                  <p className="text-sm text-gray-500 mb-2">Contract Address</p>
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.04]">
                    <code className="text-[#FFD700] font-mono text-sm flex-1 truncate">MIGAx...pending</code>
                    <button
                      onClick={copyAddress}
                      className="text-gray-500 hover:text-[#FFD700] transition-colors p-2"
                      title="Copy address"
                    >
                      {copied ? <Check size={18} /> : <Copy size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Distribution */}
              <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06]">
                <h3 className="text-xl font-bold text-white mb-6">Distribution</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Liquidity Pool</span>
                      <span className="text-white font-medium">10%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-3">
                      <div className="bg-[#FFD700] h-3 rounded-full" style={{ width: '10%' }} />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Initial DEX liquidity</p>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Bonding Curve</span>
                      <span className="text-white font-medium">40%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-3">
                      <div className="bg-[#FFA500] h-3 rounded-full" style={{ width: '40%' }} />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Year-long public distribution</p>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">DAO Treasury</span>
                      <span className="text-white font-medium">50%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-3">
                      <div className="bg-emerald-500 h-3 rounded-full" style={{ width: '50%' }} />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Community-governed funding</p>
                  </div>
                </div>

                <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-[#FFD700]/10 to-transparent border border-[#FFD700]/20 text-center">
                  <p className="text-lg font-bold text-[#FFD700]">Fair Launch</p>
                  <p className="text-sm text-gray-400">No presale. No VCs. No team allocation.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            ROADMAP SECTION
            ============================================ */}
        <section id="roadmap" className="py-24 bg-gradient-to-b from-[#0A0A10] to-transparent">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-sm text-[#FFD700] font-medium uppercase tracking-wider">Funding Roadmap</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
                What MIGA <span className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">Supports</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Token holders vote on funding allocation. Here's what the community can support:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {[
                {
                  icon: Wifi,
                  title: 'VPN Infrastructure',
                  desc: 'Fund free VPN services and mesh networking tools that help Iranians bypass government firewalls.',
                  examples: ['Outline VPN servers', 'Tor relay nodes', 'Mesh network development'],
                },
                {
                  icon: Satellite,
                  title: 'Satellite Internet',
                  desc: 'Support initiatives to provide satellite internet access that cannot be controlled by the government.',
                  examples: ['Starlink terminal distribution', 'Satellite modem smuggling', 'Ground station support'],
                },
                {
                  icon: GraduationCap,
                  title: 'Digital Literacy',
                  desc: 'Fund educational programs teaching secure communication and internet safety.',
                  examples: ['Security workshops', 'Circumvention tool guides', 'Safe messaging training'],
                },
                {
                  icon: Scale,
                  title: 'Legal Defense',
                  desc: 'Support legal funds for journalists, activists, and citizens prosecuted for online activity.',
                  examples: ['Legal representation', 'Family support funds', 'Advocacy campaigns'],
                },
              ].map((item) => (
                <div key={item.title} className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06] hover:border-[#FFD700]/20 transition-all">
                  <div className="w-14 h-14 rounded-2xl bg-[#FFD700]/10 flex items-center justify-center mb-6">
                    <item.icon className="text-[#FFD700]" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400 mb-4">{item.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.examples.map((example) => (
                      <span key={example} className="px-3 py-1 rounded-full bg-white/[0.04] text-xs text-gray-400">
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Funding Milestones */}
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06]">
              <h3 className="text-xl font-bold text-white mb-6 text-center">Funding Milestones</h3>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 hidden md:block" />

                <div className="space-y-8">
                  {[
                    { amount: '$100K', goal: 'Launch 10 VPN servers in neighboring countries' },
                    { amount: '$500K', goal: 'Fund satellite terminal distribution network' },
                    { amount: '$1M', goal: 'Establish permanent legal defense fund' },
                    { amount: '$5M', goal: 'Build independent mesh network infrastructure' },
                  ].map((milestone, i) => (
                    <div key={i} className={`flex items-center gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                      <div className={`flex-1 p-6 rounded-2xl bg-white/[0.02] ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                        <p className="text-2xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent mb-2">
                          {milestone.amount}
                        </p>
                        <p className="text-gray-400">{milestone.goal}</p>
                      </div>
                      <div className="w-4 h-4 rounded-full bg-[#FFD700] flex-shrink-0 hidden md:block" />
                      <div className="flex-1 hidden md:block" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            GOVERNANCE SECTION
            ============================================ */}
        <section id="governance" className="py-24 border-t border-white/[0.04]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-sm text-[#FFD700] font-medium uppercase tracking-wider">DAO Governance</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
                How <span className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">Governance</span> Works
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                MIGA operates as a fully decentralized DAO. Token holders control treasury allocation through on-chain voting.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Voting Process */}
              <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06]">
                <h3 className="text-xl font-bold text-white mb-6">Voting Process</h3>
                <div className="space-y-4">
                  {[
                    { step: '1', title: 'Proposal Submission', desc: 'Any token holder can submit a funding proposal' },
                    { step: '2', title: 'Community Discussion', desc: '7-day discussion period for feedback' },
                    { step: '3', title: 'On-Chain Vote', desc: '5-day voting period, 1 MIGA = 1 vote' },
                    { step: '4', title: 'Execution', desc: 'Approved proposals automatically funded from treasury' },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-[#FFD700]/20 flex items-center justify-center flex-shrink-0 text-sm font-bold text-[#FFD700]">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{item.title}</h4>
                        <p className="text-sm text-gray-400">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Governance Stats */}
              <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06]">
                <h3 className="text-xl font-bold text-white mb-6">Governance Parameters</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Proposal Threshold', value: '100,000 MIGA', desc: 'Minimum tokens to submit proposal' },
                    { label: 'Quorum', value: '4%', desc: 'Minimum participation for valid vote' },
                    { label: 'Pass Threshold', value: '50%+', desc: 'Simple majority to pass' },
                    { label: 'Timelock', value: '48 hours', desc: 'Delay before execution' },
                  ].map((item) => (
                    <div key={item.label} className="p-4 rounded-xl bg-white/[0.02]">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-400">{item.label}</span>
                        <span className="font-bold text-[#FFD700]">{item.value}</span>
                      </div>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Multi-token Governance */}
            <div className="p-8 rounded-3xl bg-gradient-to-r from-[#FFD700]/5 to-[#FFA500]/5 border border-[#FFD700]/20">
              <h3 className="text-xl font-bold text-white mb-4 text-center">Persian DAO Alliance</h3>
              <p className="text-gray-400 text-center mb-6">
                MIGA is part of a unified governance system for the Persian diaspora.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { token: 'MIGA', desc: 'Freedom of Information' },
                  { token: 'CYRUS', desc: 'Cultural Heritage' },
                  { token: 'PARS', desc: 'Network Infrastructure' },
                ].map((item) => (
                  <div key={item.token} className="text-center p-4 rounded-xl bg-white/[0.02]">
                    <p className="font-bold text-white">{item.token}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-center mt-4 text-sm text-gray-400">
                All tokens have equal voting power: <span className="text-[#FFD700]">1 Token = 1 Vote</span> at{' '}
                <a href="https://pars.vote" target="_blank" rel="noopener noreferrer" className="text-[#FFD700] hover:underline">
                  pars.vote
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* ============================================
            JOIN DAO SECTION
            ============================================ */}
        <section id="join" className="py-24 bg-gradient-to-b from-[#0A0A10] to-transparent">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Join the <span className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">Movement</span>
            </h2>

            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Get MIGA tokens and become part of a community fighting for freedom of information. Every token is a vote.
            </p>

            <WalletMultiButton className="!inline-flex !items-center !justify-center !gap-2 !px-12 !py-5 !bg-gradient-to-r !from-[#FFD700] !to-[#FFA500] !text-black !font-bold !rounded-full hover:!shadow-xl hover:!shadow-[#FFD700]/30 !transition-all !text-xl" />

            {connected && (
              <p className="mt-6 text-emerald-400 flex items-center justify-center gap-2">
                <Check size={18} /> Wallet Connected - Ready to participate
              </p>
            )}

            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Shield, label: 'Secure', desc: 'Audited contracts' },
                { icon: Users, label: 'Community', desc: 'Fully decentralized' },
                { icon: Target, label: 'Focused', desc: 'Clear mission' },
                { icon: FileText, label: 'Transparent', desc: 'On-chain treasury' },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-[#FFD700]/10 flex items-center justify-center mx-auto mb-3">
                    <item.icon className="text-[#FFD700]" size={24} />
                  </div>
                  <p className="font-semibold text-white">{item.label}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://miga.us.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#FFD700] hover:text-[#FFA500] transition-colors"
              >
                Learn about the Foundation
                <ExternalLink size={16} />
              </a>
              <span className="text-gray-600 hidden sm:block">|</span>
              <a
                href="https://pars.vote"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#FFD700] hover:text-[#FFA500] transition-colors"
              >
                Vote on Proposals
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
