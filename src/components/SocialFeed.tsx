import { useState } from 'react'
import { ExternalLink, MessageCircle, Heart, Repeat2, RefreshCw } from 'lucide-react'

// Mock social posts - in production these would come from APIs
const mockXPosts = [
  {
    id: '1',
    author: '@RezaPahlavi',
    handle: 'RezaPahlavi',
    avatar: 'https://pbs.twimg.com/profile_images/1234567890/reza_normal.jpg',
    content: 'The future of Iran belongs to its people. Join us in building a transparent, democratic system with #MIGA. Every voice matters. 🇮🇷',
    likes: 4523,
    retweets: 1245,
    replies: 342,
    timestamp: '2h',
    verified: true,
  },
  {
    id: '2',
    author: '@MIGAProtocol',
    handle: 'MIGAProtocol',
    avatar: '/images/freedom-lion.png',
    content: 'Race to Nowruz update: Over $400K invested across 7 chains! Solana leads with $125K. Which chain will win? #MIGA #Nowruz',
    likes: 892,
    retweets: 234,
    replies: 89,
    timestamp: '4h',
    verified: true,
  },
  {
    id: '3',
    author: '@PersianCrypto',
    handle: 'PersianCrypto',
    content: 'Just bridged to #MIGA on Lux. The quantum-safe privacy features are incredible. Finally crypto that protects the diaspora. 🔒',
    likes: 234,
    retweets: 56,
    replies: 23,
    timestamp: '6h',
    verified: false,
  },
  {
    id: '4',
    author: '@IranFreedom',
    handle: 'IranFreedom',
    content: 'The 10 DAOs model in #MIGA is revolutionary. Health, security, culture - all governed transparently. This is what civil government should look like.',
    likes: 567,
    retweets: 123,
    replies: 45,
    timestamp: '8h',
    verified: false,
  },
]

const mockFarcasterPosts = [
  {
    id: '1',
    author: 'vitalik.eth',
    fid: '1',
    avatar: 'https://i.imgur.com/vitalik.jpg',
    content: 'Interesting approach to diaspora governance with $MIGA. The FHE privacy layer makes it viable for high-threat communities.',
    likes: 1234,
    recasts: 345,
    replies: 89,
    timestamp: '3h',
    channel: '/crypto',
  },
  {
    id: '2',
    author: 'miga.eth',
    fid: '23456',
    avatar: '/images/freedom-lion.png',
    content: 'Race to Nowruz is heating up! 🔥 7 chains competing for 2.8B MIGA tokens. Proportional distribution based on investment. fairlaunch.fyi/miga',
    likes: 456,
    recasts: 123,
    replies: 34,
    timestamp: '5h',
    channel: '/defi',
  },
  {
    id: '3',
    author: 'persian.eth',
    fid: '34567',
    avatar: 'https://i.imgur.com/persian.jpg',
    content: 'Finally a crypto project for Iranians that actually understands operational security. #MIGA privacy features are next level.',
    likes: 234,
    recasts: 67,
    replies: 23,
    timestamp: '7h',
    channel: '/iran',
  },
]

export function SocialFeed() {
  const [activeTab, setActiveTab] = useState<'x' | 'farcaster'>('x')
  const [isLoading, setIsLoading] = useState(false)

  const handleRefresh = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => setIsLoading(false), 1000)
  }

  const formatNumber = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  return (
    <section className="section border-t border-white/[0.04]">
      <div className="container-lg">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="mb-4">
            <span className="text-gradient-ember">#MIGA</span> Community
          </h2>
          <p className="body-md max-w-2xl mx-auto">
            Join the conversation. See what the community is saying across social platforms.
          </p>
        </div>

        {/* Tab selector */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab('x')}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all
              ${activeTab === 'x'
                ? 'bg-white text-black'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
              }
            `}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            X / Twitter
          </button>
          <button
            onClick={() => setActiveTab('farcaster')}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all
              ${activeTab === 'farcaster'
                ? 'bg-[#8A63D2] text-white'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
              }
            `}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5.5 3h13A2.5 2.5 0 0121 5.5v13a2.5 2.5 0 01-2.5 2.5h-13A2.5 2.5 0 013 18.5v-13A2.5 2.5 0 015.5 3zm6.5 4a4 4 0 100 8 4 4 0 000-8z"/>
            </svg>
            Farcaster
          </button>
          <button
            onClick={handleRefresh}
            className={`p-3 rounded-full bg-white/5 text-white/60 hover:bg-white/10 transition-all ${isLoading ? 'animate-spin' : ''}`}
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Posts grid */}
        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {activeTab === 'x' ? (
            mockXPosts.map((post) => (
              <div key={post.id} className="card hover:border-white/10 transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-white/10 flex-shrink-0">
                    <img
                      src={post.avatar}
                      alt={post.author}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/freedom-lion.png'
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="font-medium truncate">{post.author}</span>
                      {post.verified && (
                        <svg className="w-4 h-4 text-blue-400 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                      )}
                      <span className="text-[#6B6B7B] text-sm">· {post.timestamp}</span>
                    </div>
                    <p className="text-sm text-[#EDEDF2] mt-1 break-words">{post.content}</p>
                    <div className="flex items-center gap-6 mt-3 text-[#6B6B7B]">
                      <button className="flex items-center gap-1 text-xs hover:text-blue-400 transition-colors">
                        <MessageCircle className="w-3.5 h-3.5" />
                        {formatNumber(post.replies)}
                      </button>
                      <button className="flex items-center gap-1 text-xs hover:text-green-400 transition-colors">
                        <Repeat2 className="w-3.5 h-3.5" />
                        {formatNumber(post.retweets)}
                      </button>
                      <button className="flex items-center gap-1 text-xs hover:text-red-400 transition-colors">
                        <Heart className="w-3.5 h-3.5" />
                        {formatNumber(post.likes)}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            mockFarcasterPosts.map((post) => (
              <div key={post.id} className="card hover:border-[#8A63D2]/30 transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-white/10 flex-shrink-0">
                    <img
                      src={post.avatar}
                      alt={post.author}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/freedom-lion.png'
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium truncate">{post.author}</span>
                      <span className="text-xs px-1.5 py-0.5 bg-[#8A63D2]/20 text-[#8A63D2] rounded">
                        {post.channel}
                      </span>
                      <span className="text-[#6B6B7B] text-sm">· {post.timestamp}</span>
                    </div>
                    <p className="text-sm text-[#EDEDF2] mt-1 break-words">{post.content}</p>
                    <div className="flex items-center gap-6 mt-3 text-[#6B6B7B]">
                      <button className="flex items-center gap-1 text-xs hover:text-[#8A63D2] transition-colors">
                        <MessageCircle className="w-3.5 h-3.5" />
                        {formatNumber(post.replies)}
                      </button>
                      <button className="flex items-center gap-1 text-xs hover:text-green-400 transition-colors">
                        <Repeat2 className="w-3.5 h-3.5" />
                        {formatNumber(post.recasts)}
                      </button>
                      <button className="flex items-center gap-1 text-xs hover:text-red-400 transition-colors">
                        <Heart className="w-3.5 h-3.5" />
                        {formatNumber(post.likes)}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* View more links */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <a
            href="https://x.com/search?q=%23MIGA"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            X / Twitter
          </a>
          <a
            href="https://warpcast.com/~/search?q=miga"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5.5 3h13A2.5 2.5 0 0121 5.5v13a2.5 2.5 0 01-2.5 2.5h-13A2.5 2.5 0 013 18.5v-13A2.5 2.5 0 015.5 3zm6.5 4a4 4 0 100 8 4 4 0 000-8z"/>
            </svg>
            Farcaster
          </a>
          <a
            href="https://t.me/MIGAProtocol"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.67-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.37-.49 1.02-.75 3.99-1.73 6.65-2.87 7.97-3.43 3.8-1.57 4.59-1.85 5.1-1.86.11 0 .37.03.54.18.14.12.18.28.2.45-.01.06.01.24 0 .38z"/>
            </svg>
            Telegram
          </a>
          <a
            href="https://discord.gg/miga"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            Discord
          </a>
        </div>
      </div>
    </section>
  )
}
