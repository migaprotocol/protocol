import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'

export type QualityLevel = 'low' | 'medium' | 'high' | 'auto'

export interface PerformanceSettings {
  // Particle counts
  sparkleCount: number
  portalParticleCount: number
  energyParticleCount: number

  // Visual effects
  enableTrails: boolean
  enableFogSwirls: boolean
  enableReflections: boolean
  enableSparkles: boolean
  enablePortalBeams: boolean

  // Geometry detail
  geometrySegments: number

  // Rendering
  maxDpr: number
  reflectionResolution: number

  // Animation
  enableIntroAnimation: boolean

  // Trail settings
  trailLength: number

  // Spiral arms for portal
  swirlArms: number
}

const qualityPresets: Record<Exclude<QualityLevel, 'auto'>, PerformanceSettings> = {
  low: {
    sparkleCount: 30,
    portalParticleCount: 20,
    energyParticleCount: 0,
    enableTrails: false,
    enableFogSwirls: false,
    enableReflections: false,
    enableSparkles: true,
    enablePortalBeams: false,
    geometrySegments: 16,
    maxDpr: 1,
    reflectionResolution: 256,
    enableIntroAnimation: false,
    trailLength: 4,
    swirlArms: 3,
  },
  medium: {
    sparkleCount: 60,
    portalParticleCount: 40,
    energyParticleCount: 20,
    enableTrails: true,
    enableFogSwirls: false,
    enableReflections: true,
    enableSparkles: true,
    enablePortalBeams: false,
    geometrySegments: 32,
    maxDpr: 1.5,
    reflectionResolution: 512,
    enableIntroAnimation: true,
    trailLength: 6,
    swirlArms: 4,
  },
  high: {
    sparkleCount: 120,
    portalParticleCount: 60,
    energyParticleCount: 40,
    enableTrails: true,
    enableFogSwirls: true,
    enableReflections: true,
    enableSparkles: true,
    enablePortalBeams: true,
    geometrySegments: 64,
    maxDpr: 2,
    reflectionResolution: 1024,
    enableIntroAnimation: true,
    trailLength: 8,
    swirlArms: 5,
  },
}

interface PerformanceContextValue {
  quality: QualityLevel
  settings: PerformanceSettings
  setQuality: (quality: QualityLevel) => void
  fps: number
  isLowEndDevice: boolean
}

const PerformanceContext = createContext<PerformanceContextValue | null>(null)

// Detect low-end device based on hardware concurrency and memory
function detectLowEndDevice(): boolean {
  // Check hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency || 4
  if (cores <= 2) return true

  // Check device memory (if available)
  const memory = (navigator as any).deviceMemory
  if (memory && memory <= 4) return true

  // Check if mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  if (isMobile) return true

  return false
}

// Get initial quality based on device detection
function getInitialQuality(): QualityLevel {
  // Check localStorage first
  const stored = localStorage.getItem('miga-quality')
  if (stored && ['low', 'medium', 'high', 'auto'].includes(stored)) {
    return stored as QualityLevel
  }
  return 'auto'
}

export function PerformanceProvider({ children }: { children: ReactNode }) {
  const [quality, setQualityState] = useState<QualityLevel>(getInitialQuality)
  const [fps, setFps] = useState(60)
  const [isLowEndDevice] = useState(detectLowEndDevice)
  const [autoQuality, setAutoQuality] = useState<Exclude<QualityLevel, 'auto'>>('medium')

  // FPS monitoring for auto quality adjustment
  useEffect(() => {
    if (quality !== 'auto') return

    let frameCount = 0
    let lastTime = performance.now()
    let rafId: number

    const measureFps = () => {
      frameCount++
      const now = performance.now()
      const elapsed = now - lastTime

      if (elapsed >= 1000) {
        const currentFps = Math.round((frameCount * 1000) / elapsed)
        setFps(currentFps)

        // Adjust quality based on FPS
        if (currentFps < 25 && autoQuality !== 'low') {
          setAutoQuality('low')
        } else if (currentFps >= 25 && currentFps < 45 && autoQuality !== 'medium') {
          setAutoQuality('medium')
        } else if (currentFps >= 50 && autoQuality !== 'high') {
          setAutoQuality('high')
        }

        frameCount = 0
        lastTime = now
      }

      rafId = requestAnimationFrame(measureFps)
    }

    rafId = requestAnimationFrame(measureFps)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [quality, autoQuality])

  // Set initial auto quality based on device detection
  useEffect(() => {
    if (isLowEndDevice) {
      setAutoQuality('low')
    }
  }, [isLowEndDevice])

  const setQuality = useCallback((newQuality: QualityLevel) => {
    setQualityState(newQuality)
    localStorage.setItem('miga-quality', newQuality)
  }, [])

  // Get effective settings
  const effectiveQuality = quality === 'auto' ? autoQuality : quality
  const settings = qualityPresets[effectiveQuality]

  return (
    <PerformanceContext.Provider value={{ quality, settings, setQuality, fps, isLowEndDevice }}>
      {children}
    </PerformanceContext.Provider>
  )
}

export function usePerformance() {
  const context = useContext(PerformanceContext)
  if (!context) {
    throw new Error('usePerformance must be used within a PerformanceProvider')
  }
  return context
}

export { qualityPresets }
