import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import { usePerformance } from '@/contexts/PerformanceContext'

// Lazy load the actual 3D scene
const MigaScene = lazy(() => import('./Scene').then(module => ({ default: module.MigaScene })))

// Lightweight placeholder while loading
function ScenePlaceholder() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#0a0815] to-[#07070A]">
      {/* MIGA logo spinner */}
      <div className="relative w-24 h-24 mb-6">
        <img
          src="/images/migacoin.png"
          alt="MIGA"
          className="w-full h-full rounded-full animate-pulse"
          style={{ filter: 'drop-shadow(0 0 20px #FFD700)' }}
        />
        {/* Spinning ring */}
        <div
          className="absolute inset-0 rounded-full border-2 border-transparent animate-spin"
          style={{
            borderTopColor: '#FFD700',
            borderRightColor: '#FFA500',
            animationDuration: '1.5s'
          }}
        />
      </div>
      <div className="text-white/70 text-sm">Loading 3D Scene...</div>
    </div>
  )
}

// Quality selector UI component
function QualitySelector() {
  const { quality, setQuality, fps, isLowEndDevice } = usePerformance()
  const [showDropdown, setShowDropdown] = useState(false)

  const qualityOptions = [
    { value: 'auto', label: 'Auto', desc: 'Adjust based on performance' },
    { value: 'low', label: 'Low', desc: 'Best for older devices' },
    { value: 'medium', label: 'Medium', desc: 'Balanced performance' },
    { value: 'high', label: 'High', desc: 'Best visuals' },
  ] as const

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="w-10 h-10 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-all"
        title={`Quality: ${quality} (${fps} FPS)`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 20V10" />
          <path d="M18 20V4" />
          <path d="M6 20v-4" />
        </svg>
      </button>

      {showDropdown && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowDropdown(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur-md border border-white/10 rounded-lg shadow-xl z-50 overflow-hidden">
            <div className="px-3 py-2 border-b border-white/10">
              <div className="text-xs text-white/50">Quality Settings</div>
              <div className="text-xs text-emerald-400">{fps} FPS</div>
              {isLowEndDevice && (
                <div className="text-xs text-amber-400 mt-1">Low-end device detected</div>
              )}
            </div>

            {qualityOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setQuality(option.value)
                  setShowDropdown(false)
                }}
                className={`w-full px-3 py-2 text-left hover:bg-white/5 transition-colors ${
                  quality === option.value ? 'bg-white/10' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white">{option.label}</span>
                  {quality === option.value && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
                <div className="text-xs text-white/50">{option.desc}</div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

interface LazyMigaSceneProps {
  className?: string
}

export function LazyMigaScene({ className = '' }: LazyMigaSceneProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [shouldLoad, setShouldLoad] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Use Intersection Observer to detect when component is in viewport
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            // Once visible, start loading (with small delay for smoother UX)
            setTimeout(() => setShouldLoad(true), 100)
            // Disconnect after first intersection
            observer.disconnect()
          }
        })
      },
      {
        // Start loading when element is 100px from entering viewport
        rootMargin: '100px',
        threshold: 0,
      }
    )

    observer.observe(container)

    return () => observer.disconnect()
  }, [])

  // Also load after a timeout as fallback (in case IntersectionObserver fails)
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!shouldLoad) {
        setShouldLoad(true)
      }
    }, 2000) // Load after 2s regardless

    return () => clearTimeout(timeout)
  }, [shouldLoad])

  return (
    <div ref={containerRef} className={`w-full h-full relative ${className}`}>
      {shouldLoad ? (
        <Suspense fallback={<ScenePlaceholder />}>
          <MigaScene className={className} />
        </Suspense>
      ) : (
        <ScenePlaceholder />
      )}

      {/* Quality selector - only show when scene is loaded */}
      {shouldLoad && isVisible && (
        <div className="absolute bottom-4 right-4 z-50">
          <QualitySelector />
        </div>
      )}
    </div>
  )
}

export { QualitySelector }
export default LazyMigaScene
