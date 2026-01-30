import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import {
  Share2, Copy, Check, Twitter, MessageCircle, Link as LinkIcon,
  Users, TrendingUp, Gift, Wallet, ExternalLink, Trophy,
  Sparkles, Target, Coins, Shield
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { CONSOLIDATED_CHAINS } from '@/lib/bondingCurve'

const SHARE_BASE_URL = 'https://migaprotocol.xyz'
const PARS_ID_URL = 'https://pars.id'

// Affiliate reward tiers
const REWARD_TIERS = [
  {
    name: 'Supporter',
    minReferrals: 1,
    reward: '1%',
    bonus: 'Early Supporter Badge',
    color: '#C0C0C0'
  },
  {
    name: 'Ambassador',
    minReferrals: 10,
    reward: '2%',
    bonus: 'Ambassador NFT',
    color: '#FFD700'
  },
  {
    name: 'Champion',
    minReferrals: 50,
    reward: '3%',
    bonus: 'DAO Council Eligibility',
    color: '#E5A00D'
  },
  {
    name: 'Legend',
    minReferrals: 100,
    reward: '5%',
    bonus: 'Founding Member Status',
    color: '#FF6B35'
  },
]

export default function Share() {
  const [copiedIdx, setCopiedIdx] = useState<string | null>(null)
  const [connected, setConnected] = useState(false)
  const [parsId, setParsId] = useState<string | null>(null)
  const [referralCode, setReferralCode] = useState<string | null>(null)
  const [stats, setStats] = useState({ referrals: 0, earned: 0, pending: 0 })

  // Check for existing pars.id connection
  useEffect(() => {
    const storedId = localStorage.getItem('pars_id')
    const storedCode = localStorage.getItem('referral_code')
    if (storedId) {
      setParsId(storedId)
      setReferralCode(storedCode)
      setConnected(true)
      // Mock stats - would come from API
      setStats({ referrals: 3, earned: 15000, pending: 5000 })
    }
  }, [])

  const connectParsId = async () => {
    // In production, this would open pars.id OAuth flow
    // For now, generate a demo ID
    const demoId = `pars_${Math.random().toString(36).substring(2, 10)}`
    const code = Math.random().toString(36).substring(2, 8).toUpperCase()

    localStorage.setItem('pars_id', demoId)
    localStorage.setItem('referral_code', code)
    setParsId(demoId)
    setReferralCode(code)
    setConnected(true)
  }

  const copyText = async (text: string, idx: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedIdx(idx)
    setTimeout(() => setCopiedIdx(null), 2000)
  }

  const referralLink = referralCode
    ? `${SHARE_BASE_URL}/mint?ref=${referralCode}`
    : `${SHARE_BASE_URL}/mint`

  const currentTier = REWARD_TIERS.reduce((acc, tier) =>
    stats.referrals >= tier.minReferrals ? tier : acc,
    null as typeof REWARD_TIERS[0] | null
  )

  const nextTier = REWARD_TIERS.find(tier => stats.referrals < tier.minReferrals)

  return (
    <div className="min-h-screen flex flex-col bg-[#07070A]">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-6">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/20 text-[#FFD700] text-sm mb-6">
              <Gift size={16} />
              <span>Earn MIGA Rewards</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Share & <span className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">Earn</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Connect your <a href={PARS_ID_URL} target="_blank" rel="noopener" className="text-[#FFD700] hover:underline">pars.id</a> to get your unique referral link.
              Earn MIGA rewards for every friend who mints.
            </p>
          </div>

          {/* Connect Section */}
          {!connected ? (
            <div className="max-w-xl mx-auto mb-16">
              <div className="p-8 rounded-3xl bg-gradient-to-br from-[#FFD700]/10 to-transparent border border-[#FFD700]/20 text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#FFD700]/20 flex items-center justify-center mx-auto mb-6">
                  <Wallet className="text-[#FFD700]" size={32} />
                </div>
                <h2 className="text-2xl font-bold mb-3">Connect Your Identity</h2>
                <p className="text-gray-400 mb-6">
                  Link your pars.id to create your unique referral link and start earning rewards.
                </p>
                <button
                  onClick={connectParsId}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#FFD700] text-black font-bold rounded-xl hover:bg-[#FFE57A] transition-colors"
                >
                  <Shield size={20} />
                  Connect with pars.id
                </button>
                <p className="text-xs text-gray-500 mt-4">
                  Don't have a pars.id? <a href={PARS_ID_URL} target="_blank" rel="noopener" className="text-[#FFD700] hover:underline">Create one free</a>
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Dashboard */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {/* Referral Link Card */}
                <div className="md:col-span-2 p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Your Referral Link</h3>
                    <span className="text-xs px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded">Active</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-black/30 rounded-xl mb-4">
                    <LinkIcon size={18} className="text-[#FFD700] flex-shrink-0" />
                    <code className="text-sm flex-1 truncate text-gray-300">{referralLink}</code>
                    <button
                      onClick={() => copyText(referralLink, 'referral-link')}
                      className="flex items-center gap-2 px-4 py-2 bg-[#FFD700] text-black font-medium rounded-lg hover:bg-[#FFE57A] transition-colors"
                    >
                      {copiedIdx === 'referral-link' ? <Check size={16} /> : <Copy size={16} />}
                      {copiedIdx === 'referral-link' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>Code: <strong className="text-white">{referralCode}</strong></span>
                    <span className="text-gray-600">|</span>
                    <a href={`${PARS_ID_URL}/${parsId}`} target="_blank" rel="noopener" className="flex items-center gap-1 text-[#FFD700] hover:underline">
                      View pars.id <ExternalLink size={12} />
                    </a>
                  </div>
                </div>

                {/* Current Tier */}
                <div className="p-6 rounded-2xl border" style={{
                  backgroundColor: currentTier ? `${currentTier.color}10` : 'rgba(255,255,255,0.03)',
                  borderColor: currentTier ? `${currentTier.color}30` : 'rgba(255,255,255,0.1)'
                }}>
                  <div className="flex items-center gap-2 mb-4">
                    <Trophy size={20} style={{ color: currentTier?.color || '#888' }} />
                    <h3 className="text-lg font-medium">{currentTier?.name || 'No Tier'}</h3>
                  </div>
                  <div className="text-3xl font-bold mb-2" style={{ color: currentTier?.color || '#888' }}>
                    {currentTier?.reward || '0%'}
                  </div>
                  <p className="text-sm text-gray-400">reward per referral</p>
                  {nextTier && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <p className="text-xs text-gray-500">
                        {nextTier.minReferrals - stats.referrals} more referrals to <strong className="text-white">{nextTier.name}</strong>
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4 mb-12">
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
                  <Users className="mx-auto text-[#FFD700] mb-3" size={24} />
                  <div className="text-3xl font-bold mb-1">{stats.referrals}</div>
                  <p className="text-sm text-gray-400">Referrals</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
                  <Coins className="mx-auto text-emerald-400 mb-3" size={24} />
                  <div className="text-3xl font-bold mb-1">{(stats.earned / 1000).toFixed(0)}K</div>
                  <p className="text-sm text-gray-400">MIGA Earned</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
                  <Target className="mx-auto text-blue-400 mb-3" size={24} />
                  <div className="text-3xl font-bold mb-1">{(stats.pending / 1000).toFixed(0)}K</div>
                  <p className="text-sm text-gray-400">Pending</p>
                </div>
              </div>
            </>
          )}

          {/* Reward Tiers */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-2 text-center">Reward Tiers</h2>
            <p className="text-gray-400 text-center mb-8">Earn more as you refer more. Unlock exclusive perks.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {REWARD_TIERS.map((tier) => {
                const isActive = currentTier?.name === tier.name
                const isUnlocked = stats.referrals >= tier.minReferrals
                return (
                  <div
                    key={tier.name}
                    className={`p-6 rounded-2xl border transition-all ${
                      isActive
                        ? 'border-2 scale-105'
                        : 'border-white/10'
                    }`}
                    style={{
                      borderColor: isActive ? tier.color : undefined,
                      backgroundColor: isActive ? `${tier.color}10` : 'rgba(255,255,255,0.02)'
                    }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium" style={{ color: tier.color }}>{tier.name}</span>
                      {isUnlocked && <Check size={16} className="text-emerald-400" />}
                    </div>
                    <div className="text-4xl font-bold mb-2" style={{ color: tier.color }}>{tier.reward}</div>
                    <p className="text-xs text-gray-500 mb-4">{tier.minReferrals}+ referrals</p>
                    <div className="flex items-center gap-2 text-xs">
                      <Sparkles size={12} style={{ color: tier.color }} />
                      <span className="text-gray-400">{tier.bonus}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Quick Share */}
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-6">Share on Social</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Make Iran Great Again 🇮🇷\n\nMIGA is a DAO for the Iranian people. Mint from 7 chains and earn rewards.\n\n${referralLink}`)}`}
                target="_blank"
                rel="noopener"
                className="flex items-center justify-between p-4 bg-[#1DA1F2]/10 border border-[#1DA1F2]/30 rounded-xl hover:bg-[#1DA1F2]/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Twitter size={20} className="text-[#1DA1F2]" />
                  <span>Twitter / X</span>
                </div>
                <ExternalLink size={16} className="text-gray-500" />
              </a>
              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent('MIGA — Make Iran Great Again 🇮🇷')}`}
                target="_blank"
                rel="noopener"
                className="flex items-center justify-between p-4 bg-[#0088CC]/10 border border-[#0088CC]/30 rounded-xl hover:bg-[#0088CC]/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <MessageCircle size={20} className="text-[#0088CC]" />
                  <span>Telegram</span>
                </div>
                <ExternalLink size={16} className="text-gray-500" />
              </a>
              <button
                onClick={() => copyText(referralLink, 'share-link')}
                className="flex items-center justify-between p-4 bg-white/[0.03] border border-white/10 rounded-xl hover:border-[#FFD700]/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <LinkIcon size={20} className="text-[#FFD700]" />
                  <span>Copy Link</span>
                </div>
                {copiedIdx === 'share-link' ? (
                  <Check size={16} className="text-emerald-400" />
                ) : (
                  <Copy size={16} className="text-gray-500" />
                )}
              </button>
            </div>
          </section>

          {/* Chain Links */}
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-4">Direct Chain Links</h2>
            <p className="text-sm text-gray-500 mb-4">
              Share a link to mint on a specific chain. Your referral code is automatically included.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {CONSOLIDATED_CHAINS.map((chain) => {
                const chainLink = referralCode
                  ? `${SHARE_BASE_URL}/mint/${chain.id.toLowerCase()}?ref=${referralCode}`
                  : `${SHARE_BASE_URL}/mint/${chain.id.toLowerCase()}`
                return (
                  <button
                    key={chain.id}
                    onClick={() => copyText(chainLink, `chain-${chain.id}`)}
                    className="flex items-center gap-2 p-3 bg-white/[0.03] border border-white/10 rounded-lg hover:border-white/20 transition-colors"
                  >
                    <img
                      src={chain.icon}
                      alt={chain.name}
                      className="w-5 h-5 rounded-full"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                    />
                    <span className="text-xs truncate flex-1">{chain.symbol}</span>
                    {copiedIdx === `chain-${chain.id}` ? (
                      <Check size={12} className="text-emerald-400 flex-shrink-0" />
                    ) : (
                      <Copy size={12} className="text-white/20 flex-shrink-0" />
                    )}
                  </button>
                )
              })}
            </div>
          </section>

          {/* How It Works */}
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-6">How Rewards Work</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-[#FFD700]/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-[#FFD700]">1</span>
                </div>
                <h3 className="font-medium mb-2">Connect pars.id</h3>
                <p className="text-sm text-gray-400">
                  Link your decentralized identity to get your unique referral code
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-[#FFD700]/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-[#FFD700]">2</span>
                </div>
                <h3 className="font-medium mb-2">Share Your Link</h3>
                <p className="text-sm text-gray-400">
                  Every mint through your link earns you MIGA rewards
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-[#FFD700]/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-[#FFD700]">3</span>
                </div>
                <h3 className="font-medium mb-2">Claim at Nowruz</h3>
                <p className="text-sm text-gray-400">
                  Rewards are claimable on Pars Network after the race ends
                </p>
              </div>
            </div>
          </section>

          {/* Key Facts */}
          <section>
            <h2 className="text-xl font-bold mb-6">Quick Facts</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                '7,000,000,000 total MIGA supply',
                '0% founders / VC allocation',
                '100% of raised funds → DAO treasury',
                '1 MIGA = 1 vote in governance',
                '7 supported chains for minting',
                '1B base allocation per chain',
                'Mint closes at Nowruz (March 20)',
                'Claim rewards on Pars Network',
                'Referral rewards up to 5%',
                'Earn exclusive NFT badges',
              ].map((fact) => (
                <div
                  key={fact}
                  className="flex items-start gap-2 p-3 bg-white/[0.02] border border-white/5 rounded-lg"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FFD700] mt-1.5 flex-shrink-0" />
                  <span className="text-sm text-gray-400">{fact}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
