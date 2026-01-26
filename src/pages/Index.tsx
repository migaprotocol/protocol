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
            HERO - BUY FOCUSED
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
            {/* Live Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-sm text-emerald-400 font-medium">Live on Solana</span>
            </div>

            {/* Main headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              <span className="text-white">Get</span>
              {' '}
              <span className="bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FFD700] bg-clip-text text-transparent">
                MIGA
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-12">
              Join the Freedom of Information DAO. <br className="hidden md:block" />
              1 MIGA = 1 Vote in community governance.
            </p>

            {/* Primary CTA - Wallet Connect */}
            <div className="flex flex-col items-center gap-6 mb-16">
              <WalletMultiButton className="!bg-gradient-to-r !from-[#FFD700] !to-[#FFA500] !text-black !font-bold !rounded-full !px-12 !py-5 hover:!shadow-xl hover:!shadow-[#FFD700]/30 !transition-all !text-xl" />

              {connected && (
                <p className="text-emerald-400 flex items-center gap-2">
                  <Check size={18} /> Wallet Connected - Ready to mint
                </p>
              )}
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-8 max-w-xl mx-auto mb-16">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">1B</p>
                <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">Total Supply</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">100%</p>
                <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">To Treasury</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">0%</p>
                <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">VC/Team</p>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
              <div className="flex flex-col items-center gap-2 text-gray-500">
                <span className="text-sm">Token Details</span>
                <ArrowDown size={20} className="animate-bounce" />
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            TOKEN DETAILS
            ============================================ */}
        <section id="token" className="py-24 border-t border-white/[0.04]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Token <span className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">Details</span>
              </h2>
            </div>

            {/* Token Card */}
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06] mb-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left - Specs */}
                <div className="space-y-4">
                  {[
                    { label: 'Token Name', value: 'MIGA' },
                    { label: 'Network', value: 'Solana', badge: true },
                    { label: 'Total Supply', value: '1,000,000,000' },
                    { label: 'Voting Power', value: '1 MIGA = 1 Vote' },
                    { label: 'Treasury', value: '100% Community Controlled' },
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

                {/* Right - Contract + CTA */}
                <div className="flex flex-col justify-between">
                  <div>
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

                  <div className="mt-6 p-6 rounded-xl bg-gradient-to-br from-[#FFD700]/10 to-transparent border border-[#FFD700]/20 text-center">
                    <p className="text-4xl font-bold text-[#FFD700] mb-1">Fair Launch</p>
                    <p className="text-sm text-gray-400">No presale • No VCs • No team allocation</p>
                  </div>
                </div>
              </div>
            </div>

            {/* How to Buy Steps */}
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { step: '1', icon: Wallet, title: 'Connect Wallet', desc: 'Use Phantom, Solflare, or any Solana wallet' },
                { step: '2', icon: ArrowRight, title: 'Swap SOL', desc: 'Exchange SOL for MIGA tokens' },
                { step: '3', icon: VoteIcon, title: 'Start Voting', desc: 'Participate in DAO governance' },
              ].map((item) => (
                <div key={item.step} className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04] text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] flex items-center justify-center text-black font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold mb-2 text-[#EDEDF2]">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================
            WHY MIGA - BRIEF
            ============================================ */}
        <section className="py-24 bg-gradient-to-b from-[#0A0A10] to-transparent">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why <span className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">MIGA</span>?
              </h2>
              <p className="text-lg text-gray-400">
                A DAO funding freedom of information for Iran
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                { icon: Shield, title: 'Anti-Censorship', desc: 'Fund tech that breaks through information barriers' },
                { icon: Users, title: 'Community Governed', desc: 'Every token holder votes on treasury spending' },
                { icon: Check, title: 'Fully Transparent', desc: 'All funds on-chain, publicly verifiable' },
              ].map((item) => (
                <div key={item.title} className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04] text-center">
                  <div className="w-12 h-12 rounded-xl bg-[#FFD700]/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="text-[#FFD700]" size={24} />
                  </div>
                  <h3 className="font-semibold mb-2 text-[#EDEDF2]">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Link to Foundation */}
            <div className="text-center">
              <a
                href="https://miga.us.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#FFD700] hover:text-[#FFA500] transition-colors"
              >
                Learn more about our mission
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* ============================================
            FINAL CTA
            ============================================ */}
        <section className="py-24 border-t border-white/[0.04]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to <span className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">Join</span>?
            </h2>

            <p className="text-xl text-gray-300 mb-8">
              Get MIGA tokens and become part of the movement.
            </p>

            <WalletMultiButton className="!inline-flex !items-center !justify-center !gap-2 !px-12 !py-5 !bg-gradient-to-r !from-[#FFD700] !to-[#FFA500] !text-black !font-bold !rounded-full hover:!shadow-xl hover:!shadow-[#FFD700]/30 !transition-all !text-xl" />

            <p className="mt-8 text-sm text-gray-500">
              100% of funds go to the community treasury
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
