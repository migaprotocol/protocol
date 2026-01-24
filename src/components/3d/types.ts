import type { ChainData } from './chainData'

// Coin settings type
export interface CoinSettings {
  radius: number
  thickness: number
  border: number
  edgeWidth: number
  innerOpacity: number
  outerOpacity: number
  glowIntensity: number
  faceOffset: number
  faceScale: number
  showFaces: boolean
  heightOffset: number
}

// Default coin settings - ADJUST THESE VALUES
export const defaultCoinSettings: CoinSettings = {
  radius: 0.42,
  thickness: 0.12,
  border: 0.04,
  edgeWidth: 0.035,
  innerOpacity: 0.3,
  outerOpacity: 0.5,
  glowIntensity: 1.5,
  faceOffset: 0.05,
  faceScale: 0.8,
  showFaces: true,
  heightOffset: 1.8, // Raised coins higher above pillars
}

// Scene default values - ADJUST THESE FOR LAYOUT
export const sceneDefaults = {
  // Medallion - centered above pool
  medallion: {
    x: 0,
    y: 5.5,      // Higher position
    z: 0,
    scale: 1.6,  // Slightly larger
    show: true,
  },
  // Pool - centered
  pool: {
    x: 0,
    z: 0.5,
    radius: 2.8,
    show: true,
  },
  // Pillars - horizontal row behind pool
  pillars: {
    radius: 7.0,   // Wider spread
    height: 2.0,   // Taller pillars
    show: true,
  },
  // Coins
  coins: {
    ...defaultCoinSettings,
  },
  // Effects
  effects: {
    showAll: true,
    showRibbons: true,
    showFog: true,
    showSparkles: true,
  },
}

// Props for chain coin
export interface ChainCoinProps {
  position: [number, number, number]
  chain: ChainData
  index: number
  onHover?: (chain: ChainData | null) => void
  onClick?: (chain: ChainData) => void
  coinSettings?: CoinSettings
}

// Props for pillar
export interface PillarProps {
  position: [number, number, number]
  chain: ChainData
  index: number
  height: number
  onHover?: (chain: ChainData | null) => void
  onClick?: (chain: ChainData) => void
}
