import { useState, useEffect, useRef } from 'react'
import { Play, CalendarDays, ExternalLink, ChevronRight, Newspaper } from 'lucide-react'

// Reza Pahlavi YouTube video IDs for autoplay embed
const FEATURED_VIDEO = {
  id: 'HFfXvfFaRC8', // Replace with actual featured video ID
  title: 'Message from Crown Prince Reza Pahlavi',
  description: 'A message to the global Persian diaspora about building a better future for Iran.',
}

// News items from Cyrus Foundation
const newsItems = [
  {
    id: '1',
    title: 'Crown Prince Reza Pahlavi Addresses UN Human Rights Council',
    excerpt: 'In a powerful statement, Reza Pahlavi called for international support in the Iranian people\'s struggle for democracy and human rights.',
    image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800',
    date: '2025-01-15',
    category: 'press-release',
    source: 'Cyrus Foundation',
    url: 'https://cyrus.foundation/news/un-address',
  },
  {
    id: '2',
    title: 'MIGA Protocol Partners with Cyrus Foundation for Humanitarian Aid',
    excerpt: 'A new partnership leverages blockchain technology to deliver transparent humanitarian assistance to Iranians in need.',
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800',
    date: '2025-01-10',
    category: 'partnership',
    source: 'MIGA Protocol',
    url: '/news/cyrus-partnership',
  },
  {
    id: '3',
    title: 'Woman, Life, Freedom: The Continuing Movement',
    excerpt: 'An analysis of the ongoing civil resistance movement in Iran and the role of the diaspora in supporting democratic change.',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800',
    date: '2025-01-05',
    category: 'analysis',
    source: 'Iran Wire',
    url: 'https://iranwire.com/woman-life-freedom',
  },
  {
    id: '4',
    title: 'Decentralized Governance: A Model for Future Iran',
    excerpt: 'How DAOs and blockchain technology could enable transparent, accountable governance in a post-revolution Iran.',
    image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800',
    date: '2024-12-28',
    category: 'technology',
    source: 'MIGA Protocol',
    url: '/docs/governance',
  },
]

interface YouTubeEmbedProps {
  videoId: string
  title: string
  scrollAutoplay?: boolean
}

function YouTubeEmbed({ videoId, title, scrollAutoplay = true }: YouTubeEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const videoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
        if (entry.isIntersecting && !isPlaying && scrollAutoplay) {
          setTimeout(() => setIsPlaying(true), 300)
        }
      },
      { threshold: 0.4, rootMargin: '0px 0px -50px 0px' }
    )

    if (videoRef.current) {
      observer.observe(videoRef.current)
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current)
      }
    }
  }, [scrollAutoplay, isPlaying])

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=${isPlaying ? '1' : '0'}&mute=1&rel=0&modestbranding=1&enablejsapi=1&controls=1&playsinline=1`
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  const shouldShowIframe = isPlaying || (scrollAutoplay && isInView)

  return (
    <div ref={videoRef} className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden">
      {!shouldShowIframe ? (
        <div className="relative w-full h-full cursor-pointer group" onClick={() => setIsPlaying(true)}>
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-all">
            <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center group-hover:bg-red-700 group-hover:scale-110 transition-all shadow-2xl">
              <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <h3 className="text-white font-semibold text-lg md:text-xl mb-2">{title}</h3>
            <p className="text-gray-300 text-sm">Click to play</p>
          </div>
        </div>
      ) : (
        <iframe
          src={embedUrl}
          title={title}
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      )}
    </div>
  )
}

function NewsCard({ news }: { news: typeof newsItems[0] }) {
  const categoryColors: Record<string, string> = {
    'press-release': 'bg-red-500/20 text-red-400',
    'partnership': 'bg-[#FFD36A]/20 text-[#FFD36A]',
    'analysis': 'bg-emerald-500/20 text-emerald-400',
    'technology': 'bg-blue-500/20 text-blue-400',
  }

  return (
    <a
      href={news.url}
      target={news.url.startsWith('http') ? '_blank' : undefined}
      rel={news.url.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="block card hover:border-[#FFD36A]/30 transition-all group"
    >
      {news.image && (
        <div className="relative h-40 -mx-4 -mt-4 mb-4 overflow-hidden rounded-t-xl">
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <span className={`absolute top-3 left-3 px-2 py-1 rounded text-xs font-medium ${categoryColors[news.category] || 'bg-white/20 text-white'}`}>
            {news.category.toUpperCase().replace('-', ' ')}
          </span>
        </div>
      )}

      <h3 className="font-medium text-[#EDEDF2] mb-2 line-clamp-2 group-hover:text-[#FFD36A] transition-colors">
        {news.title}
      </h3>

      <p className="text-sm text-[#9999A5] mb-3 line-clamp-2">
        {news.excerpt}
      </p>

      <div className="flex items-center justify-between text-xs text-[#6B6B7B]">
        <div className="flex items-center gap-1">
          <CalendarDays className="w-3 h-3" />
          <time>{new Date(news.date).toLocaleDateString()}</time>
        </div>
        <span className="text-[#FFD36A]">{news.source}</span>
      </div>
    </a>
  )
}

export function RezaNews() {
  return (
    <section className="section border-t border-white/[0.04] bg-gradient-to-b from-transparent to-[#0A0A10]">
      <div className="container-lg">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
            <Newspaper className="w-4 h-4 text-[#FFD36A]" />
            <span className="text-sm text-[#9999A5]">News & Updates</span>
          </div>
          <h2 className="mb-4">
            From <span className="text-gradient-ember">Cyrus Foundation</span>
          </h2>
          <p className="body-md max-w-2xl mx-auto">
            Updates on the movement for a free, democratic Iran.
            Powered by Reza Pahlavi and the global Persian diaspora.
          </p>
        </div>

        {/* Featured Video */}
        <div className="max-w-4xl mx-auto mb-12">
          <YouTubeEmbed
            videoId={FEATURED_VIDEO.id}
            title={FEATURED_VIDEO.title}
            scrollAutoplay={true}
          />
          <div className="mt-4 text-center">
            <h3 className="text-xl font-medium mb-2">{FEATURED_VIDEO.title}</h3>
            <p className="text-sm text-[#9999A5]">{FEATURED_VIDEO.description}</p>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {newsItems.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>

        {/* View More */}
        <div className="flex justify-center gap-4 mt-10">
          <a
            href="https://cyrus.foundation/news"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            Cyrus Foundation News <ExternalLink className="w-4 h-4" />
          </a>
          <a
            href="https://x.com/RezaPahlavi"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2"
          >
            Follow Reza Pahlavi <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
