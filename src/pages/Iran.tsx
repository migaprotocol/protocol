import { useState, useEffect, useCallback } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Globe, Mountain, Utensils, Palette, Building2, Heart, Sun, Volume2, VolumeX, Minimize2, Maximize2, X, Maximize, Mail, ArrowRight, Send, Check } from 'lucide-react'

// Video playlist - Iran travel documentaries and vlogs
const videoPlaylist = [
  { id: 'ZXvjKn1Fst8', title: 'Mio Iran - Sebastian Linda', description: 'A German tourist shares the experience of travelling to Iran' },
  { id: 'CYoa9hI3CXg', title: 'Rick Steves\' Iran', description: '55-minute documentary exploring Tehran, Shiraz, Esfahan, Persepolis' },
  { id: 'l2DVlpo6dds', title: 'Is IRAN Safe? - Drew Binsky', description: 'Realizations from 14 days in Iran' },
  { id: 'gW00UM85KaA', title: 'My First 24 Hours in IRAN - Drew Binsky', description: 'Exploring the North-Western city of Tabriz' },
]

export default function Iran() {
  // Video rotation state
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)

  // Video state
  const [isMuted, setIsMuted] = useState(true)
  const [isPiP, setIsPiP] = useState(false)
  const [showPiP, setShowPiP] = useState(true)
  const [pipSize, setPipSize] = useState<'normal' | 'double' | 'fullscreen'>('normal')
  const [isMobile, setIsMobile] = useState(false)
  const [isHeroHovered, setIsHeroHovered] = useState(false)
  const [isPipHovered, setIsPipHovered] = useState(false)

  // PiP dragging state
  const [pipPosition, setPipPosition] = useState(() => {
    const pipWidth = 384
    const pipHeight = pipWidth * 9 / 16
    const margin = 24
    return {
      x: typeof window !== 'undefined' ? window.innerWidth - pipWidth - margin : 0,
      y: typeof window !== 'undefined' ? window.innerHeight - pipHeight - margin : 0
    }
  })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [hasDragged, setHasDragged] = useState(false)
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0, time: 0 })

  // Newsletter state
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const PIP_WIDTH_BASE = 384
  const PIP_MARGIN = 24

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Cycle videos every 60 seconds (longer for documentaries)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % videoPlaylist.length)
    }, 60000) // 60 seconds
    return () => clearInterval(interval)
  }, [])

  // Get current video info
  const currentVideo = videoPlaylist[currentVideoIndex]

  // Scroll detection for PiP
  useEffect(() => {
    const handleScroll = () => {
      const videoSection = document.getElementById('video-hero-section')
      if (videoSection) {
        const rect = videoSection.getBoundingClientRect()
        const shouldShowPiP = rect.bottom < 100
        setIsPiP(shouldShowPiP)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Calculate current PiP width based on size mode
  const getCurrentPipWidth = useCallback(() => {
    return pipSize === 'double' ? PIP_WIDTH_BASE * 2 : PIP_WIDTH_BASE
  }, [pipSize])

  const snapToEdgeOrCorner = useCallback(() => {
    const pipWidth = getCurrentPipWidth()
    const pipHeight = pipWidth * 9 / 16
    const maxX = window.innerWidth - pipWidth - PIP_MARGIN
    const maxY = window.innerHeight - pipHeight - PIP_MARGIN
    return { x: maxX, y: maxY }
  }, [getCurrentPipWidth])

  // PiP dragging handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (pipSize === 'fullscreen') return
    setIsDragging(true)
    setHasDragged(false)
    setDragStart({
      x: e.clientX - pipPosition.x,
      y: e.clientY - pipPosition.y
    })
  }

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || pipSize === 'fullscreen') return

    const currentTime = Date.now()
    const newX = e.clientX - dragStart.x
    const newY = e.clientY - dragStart.y

    const distanceMoved = Math.sqrt(Math.pow(newX - pipPosition.x, 2) + Math.pow(newY - pipPosition.y, 2))
    if (distanceMoved > 5) {
      setHasDragged(true)
    }

    setLastMousePosition({
      x: e.clientX,
      y: e.clientY,
      time: currentTime
    })

    const pipWidth = getCurrentPipWidth()
    const maxX = window.innerWidth - pipWidth - PIP_MARGIN
    const maxY = window.innerHeight - (pipWidth * 9 / 16) - PIP_MARGIN

    setPipPosition({
      x: Math.max(PIP_MARGIN, Math.min(newX, maxX)),
      y: Math.max(PIP_MARGIN, Math.min(newY, maxY))
    })
  }, [isDragging, pipSize, dragStart.x, dragStart.y, pipPosition.x, pipPosition.y, getCurrentPipWidth])

  const handleMouseUp = useCallback(() => {
    if (isDragging && hasDragged) {
      const snapped = snapToEdgeOrCorner()
      setPipPosition(snapped)
    }
    setIsDragging(false)
    setHasDragged(false)
  }, [isDragging, hasDragged, snapToEdgeOrCorner])

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  // Initialize PiP position
  useEffect(() => {
    const pipWidth = getCurrentPipWidth()
    const pipHeight = pipWidth * 9 / 16
    const defaultX = window.innerWidth - pipWidth - PIP_MARGIN
    const defaultY = window.innerHeight - pipHeight - PIP_MARGIN
    setPipPosition({ x: defaultX, y: defaultY })
  }, [getCurrentPipWidth])

  // Recalculate position when size changes
  useEffect(() => {
    if (pipSize !== 'fullscreen') {
      const snapped = snapToEdgeOrCorner()
      setPipPosition(snapped)
    }
  }, [pipSize, snapToEdgeOrCorner])

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // Handle newsletter subscription
      setIsSubscribed(true)
      setEmail('')
    }
  }

  return (
    <div className="min-h-screen bg-[#07070A]">
      {/* Persian-themed background elements */}
      <div className="persian-bg" />
      <div className="persian-stars" />
      <div className="persian-glow" />

      <Header />

      <main>
        {/* Full-Width Video Hero Section */}
        <section
          id="video-hero-section"
          className="relative h-screen flex items-center justify-center overflow-hidden"
          style={{
            background: 'radial-gradient(ellipse 120% 80% at center center, rgba(26,10,46,0.8) 0%, rgba(15,8,24,0.9) 35%, rgba(7,7,10,1) 70%)',
            paddingTop: '70px',
            paddingBottom: '10px'
          }}
        >
          {/* Cinematic Video Container */}
          <div className="relative w-full h-full flex items-center justify-center px-2 animate-fade-in">
            <div
              className="relative w-full max-h-full aspect-video bg-black rounded-[30px] overflow-hidden group transition-all duration-500"
              style={{ maxWidth: '90vw', maxHeight: 'calc(100vh - 140px)' }}
              onMouseEnter={() => setIsHeroHovered(true)}
              onMouseLeave={() => setIsHeroHovered(false)}
            >
              {/* Underlit glow effects - Persian Gold theme */}
              <div className="absolute -inset-24 bg-gradient-radial from-amber-500/30 via-amber-500/10 to-transparent blur-[100px] opacity-60" />
              <div className="absolute -inset-12 bg-gradient-radial from-amber-400/20 via-amber-400/10 to-transparent blur-[60px] opacity-50" />

              {/* Outer glow ring - gold accent */}
              <div className="absolute -inset-2 rounded-[30px] bg-gradient-to-r from-amber-500/40 via-amber-400/30 to-amber-500/40 opacity-75 blur-xl animate-pulse-glow" />

              {/* Border frame */}
              <div className="absolute inset-0 rounded-[30px] border border-amber-500/20 shadow-[0_0_60px_rgba(214,177,90,0.3)]" />

              {/* Inner frame with glass effect */}
              <div className="absolute inset-0 pointer-events-none z-10">
                <div
                  className="absolute inset-0 rounded-[30px] border border-white/10 bg-gradient-to-b from-white/5 to-transparent"
                  style={{
                    boxShadow: 'inset 0 2px 20px rgba(255,255,255,0.05), inset 0 -2px 20px rgba(0,0,0,0.5)',
                  }}
                />
              </div>

              {/* Cinematic Vignette */}
              <div
                className="absolute inset-0 z-20 pointer-events-none"
                style={{
                  boxShadow: 'inset 0 0 120px 60px rgba(0,0,0,0.7)',
                }}
              />

              {/* YouTube Video */}
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${currentVideo.id}?autoplay=1&mute=${isPiP || isMuted ? '1' : '0'}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&loop=1&playlist=${currentVideo.id}`}
                title="Mio Iran - Journey Through the Land of Unexpected Wonders"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />

              {/* Video Controls - fade in on hover */}
              <div
                className={`absolute bottom-6 left-6 flex items-center gap-3 z-30 transition-opacity duration-300 ${isHeroHovered ? 'opacity-100' : 'opacity-0'}`}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsMuted(!isMuted)
                  }}
                  className="flex items-center gap-2 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full hover:bg-black transition-all duration-300 border border-white/10"
                >
                  {isMuted ? <VolumeX className="h-4 w-4 text-white" /> : <Volume2 className="h-4 w-4 text-white" />}
                  <span className="text-xs text-white/90 font-medium tracking-wider uppercase">{isMuted ? 'Unmute' : 'Mute'}</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    const elem = document.getElementById('video-hero-section')
                    if (elem) {
                      if (document.fullscreenElement) {
                        document.exitFullscreen()
                      } else {
                        elem.requestFullscreen()
                      }
                    }
                  }}
                  className="flex items-center gap-2 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full hover:bg-black transition-all duration-300 border border-white/10"
                >
                  <Maximize className="h-4 w-4 text-white" />
                  <span className="text-xs text-white/90 font-medium tracking-wider uppercase">Fullscreen</span>
                </button>
              </div>

              {/* Video Title Badge */}
              <div className="absolute top-6 left-6 flex items-center gap-2 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-amber-500/20 z-30">
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(214,177,90,0.8)]" />
                <span className="text-xs text-white/90 font-medium tracking-widest uppercase">Iran</span>
              </div>
            </div>
          </div>

          {/* Hero Text Overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 z-30 pb-8">
            <div className="container-xl">
              <div className="text-center max-w-3xl mx-auto">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
                  <span className="text-gradient-ember">Iran</span>
                  <span className="text-[#EDEDF2] block mt-1 text-xl md:text-2xl lg:text-3xl">The Land of Unexpected Wonders</span>
                </h1>
                <p className="text-sm md:text-base text-[#9999A5] max-w-2xl mx-auto">
                  The former great Persian Empire — probably among the most misunderstood countries of our time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Picture-in-Picture Video - Desktop only */}
        {isPiP && showPiP && !isMobile && (
          <div
            className={`fixed z-50 transition-all ease-out group ${
              pipSize === 'fullscreen' ? 'inset-0 bg-black/98 backdrop-blur-xl duration-500' : isDragging ? 'duration-75' : 'duration-300'
            } ${isDragging ? 'cursor-grabbing scale-105 shadow-2xl' : pipSize === 'fullscreen' ? '' : 'cursor-grab hover:scale-105'}`}
            style={
              pipSize !== 'fullscreen'
                ? {
                    left: `${pipPosition.x}px`,
                    top: `${pipPosition.y}px`,
                    filter: isDragging ? 'brightness(1.1) drop-shadow(0 20px 40px rgba(0,0,0,0.5))' : 'brightness(1)',
                  }
                : {}
            }
            onMouseDown={handleMouseDown}
            onMouseEnter={() => setIsPipHovered(true)}
            onMouseLeave={() => setIsPipHovered(false)}
          >
            <div
              className={`relative bg-black overflow-hidden transition-all duration-500 ${
                pipSize === 'fullscreen'
                  ? 'w-full h-full'
                  : pipSize === 'double'
                  ? 'aspect-video rounded-2xl'
                  : 'w-96 aspect-video rounded-2xl'
              }`}
              style={pipSize === 'double' ? { width: '768px' } : {}}
            >
              {/* PiP Glow Effects */}
              {pipSize !== 'fullscreen' && (
                <>
                  <div className="absolute -inset-12 rounded-full bg-gradient-radial from-amber-500/20 via-amber-500/5 to-transparent blur-3xl opacity-60" />
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-500/30 via-amber-400/15 to-amber-500/30 opacity-75 blur-xl animate-pulse-glow" />
                  <div className="absolute inset-0 pointer-events-none z-10">
                    <div
                      className="absolute inset-0 rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent"
                      style={{
                        boxShadow: 'inset 0 2px 20px rgba(255,255,255,0.05), inset 0 -2px 20px rgba(0,0,0,0.5)',
                      }}
                    />
                  </div>
                </>
              )}

              {/* YouTube Video */}
              <div className="absolute inset-0 overflow-hidden">
                <iframe
                  className={`absolute top-0 left-0 w-full h-full object-cover ${pipSize !== 'fullscreen' ? 'rounded-2xl' : ''}`}
                  style={{
                    aspectRatio: '16 / 9',
                    pointerEvents: 'none',
                  }}
                  src={`https://www.youtube.com/embed/${currentVideo.id}?autoplay=1&mute=${!isPiP || isMuted ? '1' : '0'}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&loop=1&playlist=${currentVideo.id}`}
                  title="Mio Iran PiP"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <div className="absolute inset-0 z-5" />
              </div>

              {/* PiP Controls */}
              <div
                className={`absolute ${pipSize === 'fullscreen' ? 'bottom-10 right-10' : 'bottom-3 right-3'} flex items-center gap-2 z-30 transition-opacity duration-300 ${isPipHovered ? 'opacity-100' : 'opacity-0'}`}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsMuted(!isMuted)
                  }}
                  className="relative p-2.5 bg-black/90 backdrop-blur-md rounded-full hover:bg-black transition-all duration-300 shadow-lg hover:scale-110 border border-white/10"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="h-4 w-4 text-white" /> : <Volume2 className="h-4 w-4 text-white" />}
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    if (pipSize === 'normal') {
                      setPipSize('double')
                    } else if (pipSize === 'double') {
                      setPipSize('fullscreen')
                    } else {
                      setPipSize('normal')
                    }
                  }}
                  className="relative p-2.5 bg-black/90 backdrop-blur-md rounded-full hover:bg-black transition-all duration-300 shadow-lg hover:scale-110 border border-white/10"
                  title={pipSize === 'fullscreen' ? 'Normal Size' : pipSize === 'double' ? 'Fullscreen' : 'Double Size'}
                >
                  {pipSize === 'fullscreen' ? (
                    <Minimize2 className="h-4 w-4 text-white" />
                  ) : (
                    <Maximize2 className="h-4 w-4 text-white" />
                  )}
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowPiP(false)
                  }}
                  className="relative p-2.5 bg-black/90 backdrop-blur-md rounded-full hover:bg-red-600 transition-all duration-300 shadow-lg hover:scale-110 border border-white/10"
                  title="Close"
                >
                  <X className="h-4 w-4 text-white" />
                </button>
              </div>

              {/* PiP Badge */}
              {pipSize !== 'fullscreen' && (
                <div className="absolute top-3 right-3 z-20">
                  <div className="flex items-center gap-2 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-amber-500/20">
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(214,177,90,0.8)]" />
                    <span className="text-[10px] text-white/80 font-medium tracking-widest uppercase">Iran</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Introduction */}
        <section className="container-xl py-16">
          <div className="max-w-4xl mx-auto">
            <div className="prose-custom text-center">
              <p className="text-lg text-[#B8B8C6] leading-relaxed">
                Most visitors who experienced Iran agree that they lived an experience beyond expectations!
                Because Iran is simply nothing as you can expect and moreover nothing like what Western media
                and politics depict. So, here is a bite of what Iran truly is!
              </p>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="container-xl pb-20">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">

            {/* Persian Empire */}
            <div className="glass-card p-8 rounded-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-amber-400" />
                </div>
                <h2 className="text-2xl font-semibold text-[#EDEDF2]">In the Footsteps of the Persian Empire</h2>
              </div>
              <p className="text-[#9999A5] leading-relaxed mb-4">
                Iran is the land of great history, the cradle of one of the world's oldest civilizations
                and the homeland to the powerful dynasties of the glorious Persian Empire. Thus, visiting
                Iran is entering millions of years of history.
              </p>
              <p className="text-[#9999A5] leading-relaxed mb-4">
                This legacy remains alive on the World Heritage Sites of Persepolis, Golestan Palace,
                Bam citadel, and many other historical places all over the country. Indeed, Iran doesn't
                have fewer than <span className="text-amber-400 font-semibold">26 sites listed by UNESCO!</span>
              </p>
              <p className="text-[#9999A5] leading-relaxed">
                History is the cement of the Persian culture. Nowadays' culture is deeply rooted in the
                traditions of Zoroastrianism, one of the world's oldest religions, later influenced by
                Islam and its mystic branch, Sufism, which has inspired many famous Persian poets,
                from Rumi to Hafez.
              </p>
            </div>

            {/* Hospitality */}
            <div className="glass-card p-8 rounded-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500/20 to-pink-500/20 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-rose-400" />
                </div>
                <h2 className="text-2xl font-semibold text-[#EDEDF2]">The Friendliest People on Earth</h2>
              </div>
              <p className="text-[#9999A5] leading-relaxed mb-4">
                It's this remarkable combination of origins that has given Iranian people their main
                characteristics, among which there is an <span className="text-rose-400">unrivalled sense of hospitality</span>.
              </p>
              <p className="text-[#9999A5] leading-relaxed mb-4">
                No visitor has ever come to Iran without falling in love with these warm-hearted people,
                amazed by the way Iranians greet their visitors. Iran is a land where you can discover
                the true meaning of the word "hospitality".
              </p>
              <p className="text-[#9999A5] leading-relaxed">
                Iranians are always so keen to help, start chatting, share tea or even invite you over
                for a homemade family dinner. There is no doubt that your many encounters will create
                the most striking and sweet memories of your trip.
              </p>
            </div>

            {/* Architecture */}
            <div className="glass-card p-8 rounded-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-blue-400" />
                </div>
                <h2 className="text-2xl font-semibold text-[#EDEDF2]">Beauty of Islamic Architecture</h2>
              </div>
              <p className="text-[#9999A5] leading-relaxed mb-4">
                Thinking about Iran immediately brings to mind the image of the masterpieces of
                Isfahan's blue-domed mosques, embellished with the most beautiful tile work knowledge,
                and whose golden minarets stand proudly at the horizon.
              </p>
              <p className="text-[#9999A5] leading-relaxed">
                Iran presents some of the best examples of Islamic architecture in the world, but not
                only. Christian, Jewish, Zoroastrian, and Babylonian influences have left striking
                monuments as their heritage. The great empires of Persia have also granted their land
                with architectural treasures, from the grandeur of Persepolis to the refinement of
                Qajar houses.
              </p>
            </div>

            {/* Nature */}
            <div className="glass-card p-8 rounded-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
                  <Mountain className="w-6 h-6 text-emerald-400" />
                </div>
                <h2 className="text-2xl font-semibold text-[#EDEDF2]">A Land of Four Seasons</h2>
              </div>
              <p className="text-[#9999A5] leading-relaxed mb-4">
                The magic lies in Iran's astonishing nature and landscapes. The fantastic sight of sand
                dunes spreading at the horizon is one of the most famous images associated with the country.
                It has many beautiful deserts, from the flawless Maranjab to the otherworldly sand formations
                of the <span className="text-emerald-400">Dasht-e-Lut, the hottest spot on earth</span>.
              </p>
              <p className="text-[#9999A5] leading-relaxed">
                However, Iran is so much more than a desert! The Alborz and Zagros Mountains are paradises
                for climbers and skiers. From the humid Hyrcanian forests near the Caspian Sea to the
                mangroves of the Persian Gulf, Iran is a kaleidoscope of natural wonders.
              </p>
            </div>

            {/* Arts & Crafts */}
            <div className="glass-card p-8 rounded-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-violet-500/20 flex items-center justify-center">
                  <Palette className="w-6 h-6 text-purple-400" />
                </div>
                <h2 className="text-2xl font-semibold text-[#EDEDF2]">Ancestral Traditions of Finest Arts</h2>
              </div>
              <p className="text-[#9999A5] leading-relaxed mb-4">
                Through centuries, nature and life have been muses for craftspeople who developed some
                of the best handicrafts in the world. Walking in Shiraz or Isfahan's Bazaars gives a
                hint of the diversity and grace of Persian arts.
              </p>
              <p className="text-[#9999A5] leading-relaxed">
                The greatest ambassadors are the <span className="text-purple-400">Persian carpets</span>:
                recognized worldwide for their quality and the beauty of their designs. In Iran, carpets
                aren't just furniture—it's truly an art passed over generations. So are the ancestral
                techniques of woodcarving, glasswork, embroidery, marquetry and dozens of other traditional
                handicrafts.
              </p>
            </div>

            {/* Food */}
            <div className="glass-card p-8 rounded-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center">
                  <Utensils className="w-6 h-6 text-orange-400" />
                </div>
                <h2 className="text-2xl font-semibold text-[#EDEDF2]">Delights of Persian Foods</h2>
              </div>
              <p className="text-[#9999A5] leading-relaxed mb-4">
                It would be impossible to talk about Iran without mentioning its food. Once again,
                Persian cuisine is nothing like you can imagine. Iranian dishes are delicate,
                sophisticated, colourful and delightful.
              </p>
              <p className="text-[#9999A5] leading-relaxed">
                From roasted eggplants to pomegranate stew, saffron rice, and meat Kebab, the variety
                of its traditional dishes is endless. UNESCO has even given recognition to
                <span className="text-orange-400"> Rasht</span>, the capital city of Gilan Province,
                for its exceptional traditional gastronomy—a combination of ancient recipes and techniques.
              </p>
            </div>
          </div>
        </section>

        {/* Closing CTA Section */}
        <section className="container-xl py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="glass-card p-10 rounded-2xl">
              <Sun className="w-16 h-16 text-amber-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-[#EDEDF2] mb-6">Experience the Journey Yourself</h2>
              <p className="text-lg text-[#9999A5] leading-relaxed mb-8">
                Iran is a land of contrasts and diversity; a modern country with a vibrant history;
                and a colourful combination of ethnicities with their traditions, cultures, and languages.
                Words can only fail to describe the wonders it has to offer to the curious and open-minded
                visitor. The only way is to experience this enchanting journey by yourself.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://dao.miga.network/fund"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-cta-btn"
                >
                  Support the Movement
                </a>
                <a href="/docs" className="hero-btn-outline">
                  Learn About MIGA
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 border-t border-white/5">
          <div className="container-xl">
            <div className="max-w-3xl mx-auto text-center">
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 mb-6">
                  <Mail className="w-8 h-8 text-amber-400" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#EDEDF2] mb-4">
                  Stay Connected with Iran
                </h2>
                <p className="text-lg text-[#9999A5] max-w-xl mx-auto">
                  Subscribe to receive updates about Iran, Persian culture, and the MIGA Protocol's mission
                  to support the Iranian people.
                </p>
              </div>

              {isSubscribed ? (
                <div className="glass-card p-8 rounded-2xl">
                  <div className="flex items-center justify-center gap-3 text-emerald-400 mb-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                    <span className="text-xl font-semibold">Thank you for subscribing!</span>
                  </div>
                  <p className="text-[#9999A5]">
                    You'll receive our updates about Iran and the MIGA Protocol.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                  <div className="flex-1 relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-full text-white placeholder-[#6B6B7B] focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-all"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="hero-cta-btn flex items-center justify-center gap-2 px-8"
                  >
                    <Send className="w-4 h-4" />
                    Subscribe
                  </button>
                </form>
              )}

              <p className="text-xs text-[#6B6B7B] mt-6">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
