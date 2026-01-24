// Chain data and types
export { chainData, DEPOSIT_ADDRESS } from './chainData'
export type { ChainData } from './chainData'
export { defaultCoinSettings, sceneDefaults } from './types'
export type { CoinSettings, ChainCoinProps, PillarProps } from './types'

// 3D Components
export { CoinFace } from './CoinFace'
export { ChainCoin } from './ChainCoin'
export { PersianColumn } from './PersianColumn'
export { ReflectivePool, PoolEdge } from './PoolComponents'
export { MigaMedallionModel, mouseState } from './MigaMedallionModel'
export { MigaMedallion } from './MigaMedallion'

// Effects
export { LightRibbons, VolumetricFogSwirls, OrbitingReflectionLights } from './LightEffects'
export { AmbientSparkles } from './AmbientEffects'
export { BlackHolePortal } from './BlackHolePortal'

// Scene utilities
export {
  IntroAnimatedGroup,
  SceneWrapper,
  Loader,
  Lighting,
  AtmosphericFog,
  CameraWithControls,
  InteractiveCameraControls,
} from './SceneHelpers'

// Main scene
export { MigaScene, MigaSceneLite } from './Scene'
export { default as Scene } from './Scene'
