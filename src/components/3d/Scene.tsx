import { Suspense, useRef, useMemo, useEffect, useState, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  useGLTF,
  Float,
  MeshReflectorMaterial,
  Environment,
  Sparkles,
  Trail,
  OrbitControls,
  TransformControls,
  Text,
  useTexture,
} from '@react-three/drei'
import { useControls, Leva, button, folder } from 'leva'
import * as THREE from 'three'

// Preload medallion model
useGLTF.preload('/models/MIGA-3D.glb')

// Mouse position for parallax
const mouseState = { x: 0, y: 0 }

// Ground plane removed - was showing ugly square

// Deposit address for bridge minting
const DEPOSIT_ADDRESS = '0x14aa5a41133199c68d06f4dfa5417abb4eef44e9'

// Chain data - 7 chains for 7 pillars
// Status: live = minting complete, next = coming soon, mystery = vote to decide
const chainData = [
  {
    name: 'Solana',
    symbol: 'SOL',
    color: '#14F195',
    icon: '/images/tokens/solana.png',
    status: 'live',
    mintUrl: '/mint/solana',
    contractAddress: '0x...',
    description: 'Fair launch complete on Solana',
  },
  {
    name: 'Lux',
    symbol: 'LUX',
    color: '#FFD700',
    icon: '/images/tokens/lux.png',
    status: 'live',
    mintUrl: '/mint/lux',
    contractAddress: '0x...',
    description: 'Live on Lux Network',
  },
  {
    name: 'Zoo',
    symbol: 'ZOO',
    color: '#FF6B6B',
    icon: '/images/tokens/zoo.png',
    status: 'live',
    mintUrl: '/mint/zoo',
    contractAddress: '0x...',
    description: 'Minting complete on Zoo',
  },
  {
    name: 'Base',
    symbol: 'BASE',
    color: '#0052FF',
    icon: '/images/tokens/base.png',
    status: 'next',
    mintUrl: '/mint/base',
    contractAddress: '0x...',
    description: 'Coming soon to Base',
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    color: '#627EEA',
    icon: '/images/tokens/ethereum.png',
    status: 'next',
    mintUrl: '/mint/ethereum',
    contractAddress: '0x...',
    description: 'Coming soon to Ethereum',
  },
  {
    name: 'TON',
    symbol: 'TON',
    color: '#0098EA',
    icon: '/images/tokens/ton.png',
    status: 'next',
    mintUrl: '/mint/ton',
    contractAddress: '0x...',
    description: 'Coming soon to TON',
  },
  {
    name: 'Mystery',
    symbol: '?',
    color: '#9D7AED',
    icon: '/images/tokens/mystery.png',
    status: 'mystery',
    mintUrl: '/vote',
    description: 'Vote with LuxFHE for the 7th chain',
    voteOptions: ['Bitcoin', 'Avalanche', 'BSC', 'Cardano', 'Polygon', 'Arbitrum'],
  },
]

type ChainData = typeof chainData[number]

// Coin face with token icon texture
function CoinFace({
  iconPath,
  position,
  rotation,
  radius = 0.26,
  opacity = 1,
}: {
  iconPath: string
  position: [number, number, number]
  rotation: [number, number, number]
  radius?: number
  opacity?: number
}) {
  const texture = useTexture(iconPath)
  const materialRef = useRef<THREE.MeshStandardMaterial>(null)

  // Configure texture on load
  useEffect(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace
      texture.minFilter = THREE.LinearFilter
      texture.magFilter = THREE.LinearFilter
      texture.generateMipmaps = false
      texture.needsUpdate = true
      if (materialRef.current) {
        materialRef.current.needsUpdate = true
      }
    }
  }, [texture])

  return (
    <mesh position={position} rotation={rotation} renderOrder={100}>
      <circleGeometry args={[radius, 64]} />
      <meshStandardMaterial
        ref={materialRef}
        map={texture}
        transparent={true}
        opacity={opacity}
        side={THREE.DoubleSide}
        depthWrite={true}
        depthTest={true}
        polygonOffset={true}
        polygonOffsetFactor={-4}
        polygonOffsetUnits={-4}
        emissive="#ffffff"
        emissiveIntensity={0.1}
        emissiveMap={texture}
      />
    </mesh>
  )
}

// Coin settings type
interface CoinSettings {
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
}

// Interactive floating coin above pillar - rotates around X axis
function ChainCoin({
  position,
  chain,
  index,
  onHover,
  onClick,
  coinSettings,
}: {
  position: [number, number, number]
  chain: ChainData
  index: number
  onHover?: (chain: ChainData | null) => void
  onClick?: (chain: ChainData) => void
  coinSettings?: CoinSettings
}) {
  // Default settings if not provided
  const settings = coinSettings || {
    radius: 0.42,
    thickness: 0.12,
    border: 0.04,
    edgeWidth: 0.035,
    innerOpacity: 0.3,
    outerOpacity: 0.5,
    glowIntensity: 1.5,
    faceOffset: 0.02,
    faceScale: 0.7,
    showFaces: true,
  }
  const groupRef = useRef<THREE.Group>(null)
  const coinRef = useRef<THREE.Group>(null)
  const glowRef = useRef<THREE.PointLight>(null)
  const [hovered, setHovered] = useState(false)

  const isLive = chain.status === 'live'
  const isNext = chain.status === 'next'
  const isMystery = chain.status === 'mystery'

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime
      // Float up and down - position coins nicely above pillars
      groupRef.current.position.y = position[1] + 3.8 + Math.sin(time * 0.5 + index) * 0.12
    }
    if (coinRef.current) {
      const time = state.clock.elapsedTime
      // Rotate around X axis (like a spinning coin)
      coinRef.current.rotation.x = time * 0.8 + index
      // Slight wobble on Y
      coinRef.current.rotation.y = Math.sin(time * 0.3 + index) * 0.1
    }
    if (glowRef.current) {
      const baseIntensity = isLive ? 2 : isNext ? 1 : 0.5
      glowRef.current.intensity = baseIntensity + Math.sin(state.clock.elapsedTime * 1.2 + index) * 0.5
    }
  })

  const opacity = isLive ? 1 : isNext ? 0.7 : 0.4
  const baseEmissive = isLive ? 0.6 : isNext ? 0.3 : 0.1
  const emissiveIntensity = hovered ? 1.2 : baseEmissive
  const coinScale = hovered ? 1.15 : 1
  // On hover, coin turns golden
  const coinColor = hovered ? '#FFD700' : chain.color
  const coinEmissive = hovered ? '#FFD700' : chain.color

  const handlePointerOver = () => {
    setHovered(true)
    document.body.style.cursor = 'pointer'
    onHover?.(chain)
  }

  const handlePointerOut = () => {
    setHovered(false)
    document.body.style.cursor = 'auto'
    onHover?.(null)
  }

  const handleClick = () => {
    onClick?.(chain)
    // Navigate to mint page internally
    if (chain.mintUrl) {
      window.location.href = chain.mintUrl
    }
  }

  // Mystery chain shows empty pedestal
  if (isMystery) {
    return (
      <group ref={groupRef} position={[position[0], position[1] + 3.8, position[2]]}>
        {/* Question mark orb - pulsing */}
        <mesh
          scale={coinScale}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          onClick={handleClick}
        >
          <sphereGeometry args={[0.25, 32, 32]} />
          <meshStandardMaterial
            color={chain.color}
            emissive={chain.color}
            emissiveIntensity={0.3}
            metalness={0.5}
            roughness={0.3}
            transparent
            opacity={0.6}
          />
        </mesh>
        {/* Outer mystery ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.35, 0.02, 16, 32]} />
          <meshStandardMaterial
            color={chain.color}
            emissive={chain.color}
            emissiveIntensity={0.2}
            transparent
            opacity={0.4}
          />
        </mesh>
        <pointLight
          ref={glowRef}
          position={[0, 0, 0]}
          intensity={0.5}
          color={chain.color}
          distance={2}
          decay={2}
        />
      </group>
    )
  }

  return (
    <group ref={groupRef} position={[position[0], position[1] + 3.8, position[2]]}>
      {/* Rotating coin */}
      <group ref={coinRef} scale={coinScale}>
        {/* Invisible hitbox for better hover detection */}
        <mesh
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          onClick={handleClick}
        >
          <cylinderGeometry args={[settings.radius * 1.1, settings.radius * 1.1, settings.thickness * 2, 16]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>

        {/* Main coin body - open-ended cylinder (edge ring only) */}
        <mesh>
          <cylinderGeometry args={[settings.radius, settings.radius, settings.thickness, 48, 1, true]} />
          <meshStandardMaterial
            color={coinColor}
            emissive={coinEmissive}
            emissiveIntensity={emissiveIntensity * 0.4}
            metalness={0.85}
            roughness={0.15}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Top cap - colored background for the face */}
        <mesh position={[0, settings.thickness / 2 + 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]} renderOrder={5}>
          <circleGeometry args={[settings.radius - 0.01, 48]} />
          <meshStandardMaterial
            color={coinColor}
            emissive={coinEmissive}
            emissiveIntensity={emissiveIntensity * 0.3}
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>

        {/* Bottom cap - colored background for the face */}
        <mesh position={[0, -settings.thickness / 2 - 0.001, 0]} rotation={[Math.PI / 2, 0, 0]} renderOrder={5}>
          <circleGeometry args={[settings.radius - 0.01, 48]} />
          <meshStandardMaterial
            color={coinColor}
            emissive={coinEmissive}
            emissiveIntensity={emissiveIntensity * 0.3}
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>

        {/* Gold edge rim - single torus around circumference */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[settings.radius, settings.edgeWidth, 16, 48]} />
          <meshStandardMaterial
            color="#D4AF37"
            emissive="#FFD700"
            emissiveIntensity={hovered ? 0.6 : 0.25}
            metalness={0.95}
            roughness={0.08}
          />
        </mesh>

        {/* Front face with token icon - positioned above top cap */}
        {settings.showFaces && (
          <CoinFace
            iconPath={chain.icon}
            position={[0, settings.thickness / 2 + settings.faceOffset, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            radius={settings.radius * settings.faceScale}
            opacity={1}
          />
        )}

        {/* Back face with token icon - positioned below bottom cap, mirrored */}
        {settings.showFaces && (
          <CoinFace
            iconPath={chain.icon}
            position={[0, -settings.thickness / 2 - settings.faceOffset, 0]}
            rotation={[Math.PI / 2, Math.PI, 0]}
            radius={settings.radius * settings.faceScale}
            opacity={1}
          />
        )}

        {/* Inner glow light */}
        <pointLight
          position={[0, 0, 0]}
          intensity={hovered ? settings.glowIntensity * 2 : settings.glowIntensity}
          color={coinColor}
          distance={2}
          decay={2}
        />

      </group>

      {/* Glow light */}
      <pointLight
        ref={glowRef}
        position={[0, 0, 0]}
        intensity={isLive ? 2.5 : 1.5}
        color={chain.color}
        distance={4}
        decay={2}
      />
    </group>
  )
}

// Persian Column with shadow/glow at base
function PersianColumn({ position, height = 3 }: { position: [number, number, number], height?: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const radius = 0.18

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.12 + position[0]) * 0.002
    }
  })

  return (
    <group ref={groupRef} position={[position[0], 0, position[2]]}>
      {/* Shadow/dark glow at base - circular gradient */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <circleGeometry args={[0.8, 32]} />
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </mesh>
      {/* Outer shadow ring - softer */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.003, 0]}>
        <ringGeometry args={[0.6, 1.2, 32]} />
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={0.2}
          depthWrite={false}
        />
      </mesh>

      {/* Wide stone base */}
      <mesh position={[0, 0.04, 0]}>
        <cylinderGeometry args={[radius * 2.4, radius * 2.8, 0.08, 24]} />
        <meshStandardMaterial color="#1a0f08" metalness={0.1} roughness={0.92} />
      </mesh>

      {/* Second tier */}
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[radius * 2, radius * 2.4, 0.08, 24]} />
        <meshStandardMaterial color="#2a1810" metalness={0.12} roughness={0.88} />
      </mesh>

      {/* Base ornament ring */}
      <mesh position={[0, 0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius * 1.5, 0.028, 16, 48]} />
        <meshStandardMaterial
          color="#C9A86C"
          metalness={0.75}
          roughness={0.2}
          emissive="#FFD700"
          emissiveIntensity={0.08}
        />
      </mesh>

      {/* Main column shaft - marble-like */}
      <mesh position={[0, height / 2 + 0.24, 0]}>
        <cylinderGeometry args={[radius * 0.92, radius * 1.02, height, 32, 1]} />
        <meshStandardMaterial
          color="#DED5C8"
          metalness={0.02}
          roughness={0.7}
        />
      </mesh>

      {/* Gold ring decorations */}
      {[0.25, 0.5, 0.75].map((t, i) => (
        <mesh
          key={i}
          position={[0, height * t + 0.24, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <torusGeometry args={[radius * 1.02, 0.016, 12, 48]} />
          <meshStandardMaterial
            color="#D4AF37"
            metalness={0.92}
            roughness={0.08}
            emissive="#FFD700"
            emissiveIntensity={0.12}
          />
        </mesh>
      ))}

      {/* Capital echinus */}
      <mesh position={[0, height + 0.3, 0]}>
        <cylinderGeometry args={[radius * 1.6, radius * 1.0, 0.12, 24]} />
        <meshStandardMaterial color="#DED5C8" metalness={0.04} roughness={0.75} />
      </mesh>

      {/* Capital abacus (top plate) - round disc instead of square */}
      <mesh position={[0, height + 0.42, 0]}>
        <cylinderGeometry args={[radius * 1.8, radius * 1.8, 0.08, 32]} />
        <meshStandardMaterial color="#C9A86C" metalness={0.4} roughness={0.45} />
      </mesh>

      {/* Gold ring around top */}
      <mesh position={[0, height + 0.42, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius * 1.8, 0.02, 12, 32]} />
        <meshStandardMaterial
          color="#D4AF37"
          metalness={0.9}
          roughness={0.1}
          emissive="#FFD700"
          emissiveIntensity={0.15}
        />
      </mesh>
    </group>
  )
}

// Energy beam particle traveling between two points
function EnergyParticle({
  start,
  end,
  color,
  speed = 1,
  delay = 0
}: {
  start: [number, number, number]
  end: [number, number, number]
  color: string
  speed?: number
  delay?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const progress = useRef(delay)

  useFrame((state) => {
    if (meshRef.current) {
      progress.current += 0.008 * speed
      if (progress.current > 1) progress.current = 0

      // Lerp between start and end
      const t = progress.current
      meshRef.current.position.x = start[0] + (end[0] - start[0]) * t
      meshRef.current.position.y = start[1] + (end[1] - start[1]) * t + Math.sin(t * Math.PI) * 0.3
      meshRef.current.position.z = start[2] + (end[2] - start[2]) * t

      // Pulse scale
      const scale = 0.8 + Math.sin(t * Math.PI) * 0.4
      meshRef.current.scale.setScalar(scale)

      // Fade at edges
      const mat = meshRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = Math.sin(t * Math.PI) * 0.8
    }
  })

  return (
    <mesh ref={meshRef} raycast={() => null}>
      <sphereGeometry args={[0.06, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} depthWrite={false} />
    </mesh>
  )
}

// Energy connections between all coins - light dancing between pillars
function EnergyConnections({ positions, pillarsHeight }: {
  positions: [number, number, number][]
  pillarsHeight: number
}) {
  // Calculate coin positions (above pillars)
  const coinPositions = useMemo(() => {
    return positions.map(pos => [pos[0], pillarsHeight + 4.2, pos[2]] as [number, number, number])
  }, [positions, pillarsHeight])

  // Create connections between adjacent coins
  const connections = useMemo(() => {
    const conns: { start: [number, number, number], end: [number, number, number], color: string }[] = []
    const colors = ['#FFD700', '#14F195', '#FF6B6B', '#0052FF', '#627EEA', '#0098EA', '#9D7AED']

    for (let i = 0; i < coinPositions.length; i++) {
      // Connect to next coin (circular)
      const next = (i + 1) % coinPositions.length
      conns.push({
        start: coinPositions[i],
        end: coinPositions[next],
        color: colors[i % colors.length]
      })
      // Connect to coin across (skip one)
      if (coinPositions.length > 3) {
        const across = (i + 2) % coinPositions.length
        conns.push({
          start: coinPositions[i],
          end: coinPositions[across],
          color: colors[(i + 1) % colors.length]
        })
      }
    }
    return conns
  }, [coinPositions])

  return (
    <group>
      {/* Multiple particles per connection for continuous flow */}
      {connections.map((conn, i) => (
        <group key={i}>
          <EnergyParticle
            start={conn.start}
            end={conn.end}
            color={conn.color}
            speed={0.8 + Math.random() * 0.4}
            delay={Math.random()}
          />
          <EnergyParticle
            start={conn.start}
            end={conn.end}
            color={conn.color}
            speed={0.6 + Math.random() * 0.4}
            delay={0.33 + Math.random() * 0.2}
          />
          <EnergyParticle
            start={conn.end}
            end={conn.start}
            color="#FFFFFF"
            speed={0.7 + Math.random() * 0.3}
            delay={0.66 + Math.random() * 0.2}
          />
        </group>
      ))}

      {/* Ambient energy sparkles around the coin circle */}
      <Sparkles
        count={80}
        scale={[12, 3, 12]}
        size={0.15}
        speed={0.8}
        opacity={0.5}
        color="#FFD700"
        position={[0.5, pillarsHeight + 4.2, -2]}
      />
      <Sparkles
        count={60}
        scale={[10, 2, 10]}
        size={0.12}
        speed={1.0}
        opacity={0.4}
        color="#FFFFFF"
        position={[0.5, pillarsHeight + 4.5, -2]}
      />
    </group>
  )
}

// Animated intro wrapper for pool and coin - grows and rotates into position
function IntroAnimatedGroup({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null)
  const introProgress = useRef(0)

  useFrame(() => {
    if (groupRef.current) {
      if (introProgress.current < 1) {
        introProgress.current = Math.min(introProgress.current + 0.015, 1)
        // Ease out cubic for smooth deceleration
        const eased = 1 - Math.pow(1 - introProgress.current, 3)
        // Scale from 0.5 to 1
        const scale = 0.5 + eased * 0.5
        groupRef.current.scale.setScalar(scale)
        // Rise from below (y-axis) - start at -1, end at 0
        groupRef.current.position.y = -1 + eased * 1
        // Rotate Y during intro - half rotation
        groupRef.current.rotation.y = (1 - eased) * Math.PI * 0.5
      } else {
        // Ensure final position
        groupRef.current.scale.setScalar(1)
        groupRef.current.position.y = 0
        groupRef.current.rotation.y = 0
      }
    }
  })

  return (
    <group ref={groupRef} scale={0.5} position={[0, -1, 0]} rotation={[0, Math.PI * 0.5, 0]}>
      {children}
    </group>
  )
}

// Reflective Pool with proper reflections from HDRI - larger and more prominent
function ReflectivePool({ x = 0.5, z = 0, radius = 5 }: { x?: number; z?: number; radius?: number }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.01, z]} receiveShadow>
      <circleGeometry args={[radius, 96]} />
      <MeshReflectorMaterial
        blur={[400, 200]}
        resolution={1024}
        mixBlur={0.8}
        mixStrength={40}
        depthScale={1.5}
        minDepthThreshold={0.6}
        color="#0a1825"
        metalness={0.95}
        roughness={0.08}
        mirror={0.95}
      />
    </mesh>
  )
}

// Pool Edge with gold trim - no shadows
function PoolEdge({ x = 0.5, z = 0, radius = 5 }: { x?: number; z?: number; radius?: number }) {
  const innerGoldRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (innerGoldRef.current) {
      const mat = innerGoldRef.current.material as THREE.MeshStandardMaterial
      mat.emissiveIntensity = 0.25 + Math.sin(state.clock.elapsedTime * 0.8) * 0.1
    }
  })

  // Scale edge sizes based on pool radius
  const r = radius

  return (
    <group position={[x, 0, z]}>
      {/* Inner stone edge */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[r - 0.1, r + 0.1, 96]} />
        <meshStandardMaterial color="#1a0f08" metalness={0.18} roughness={0.82} />
      </mesh>

      {/* Inner gold trim - prominent */}
      <mesh ref={innerGoldRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.025, 0]}>
        <ringGeometry args={[r, r + 0.25, 96]} />
        <meshStandardMaterial
          color="#D4AF37"
          metalness={0.96}
          roughness={0.04}
          emissive="#FFD700"
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* Middle stone */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.018, 0]}>
        <ringGeometry args={[r + 0.25, r + 0.6, 96]} />
        <meshStandardMaterial color="#2a1a0a" metalness={0.12} roughness={0.88} />
      </mesh>

      {/* Outer gold accent */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.022, 0]}>
        <ringGeometry args={[r + 0.58, r + 0.72, 96]} />
        <meshStandardMaterial
          color="#C9A86C"
          metalness={0.85}
          roughness={0.12}
          emissive="#FFD700"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Outer stone edge */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}>
        <ringGeometry args={[r + 0.72, r + 1.2, 96]} />
        <meshStandardMaterial color="#1a0f08" metalness={0.08} roughness={0.92} />
      </mesh>
    </group>
  )
}

// MIGA Medallion - with intro animation (scale up + fade in)
function MigaMedallion({ onLoaded, x = 0.8, y = 2.9, z = 0, scale = 2.8 }: { onLoaded?: () => void; x?: number; y?: number; z?: number; scale?: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const glowRef = useRef<THREE.PointLight>(null)
  const { scene } = useGLTF('/models/MIGA-3D.glb')
  const introProgress = useRef(0)

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true)
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // No shadows for cleaner look
        child.castShadow = false
        child.receiveShadow = false
        if (child.material instanceof THREE.MeshStandardMaterial) {
          // Enhanced reflectivity to catch light swirls
          child.material.envMapIntensity = 6
          child.material.metalness = Math.min(child.material.metalness * 1.4, 1)
          child.material.roughness = Math.max(child.material.roughness * 0.5, 0.05)
          child.material.needsUpdate = true
        }
      }
    })
    // Notify that model is loaded
    if (onLoaded) onLoaded()
    return clone
  }, [scene, onLoaded])

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime

      // Intro animation
      if (introProgress.current < 1) {
        introProgress.current = Math.min(introProgress.current + 0.015, 1)
        const eased = 1 - Math.pow(1 - introProgress.current, 3) // easeOutCubic
        const s = 0.5 + eased * (scale - 0.5)
        groupRef.current.scale.setScalar(s)
        // Start from below and rise up
        groupRef.current.position.y = (y - 2) + eased * 2 + Math.sin(time * 0.4) * 0.1
      } else {
        // Use props for final position
        groupRef.current.scale.setScalar(scale)
        groupRef.current.position.y = y + Math.sin(time * 0.4) * 0.1
      }

      // Subtle slow rotation
      groupRef.current.rotation.y = time * 0.08
      // Subtle tilt based on mouse
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mouseState.y * 0.05,
        0.02
      )
      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x,
        -mouseState.x * 0.15 + x,
        0.02
      )
      groupRef.current.position.z = z
    }
    if (glowRef.current) {
      glowRef.current.intensity = 6 + Math.sin(state.clock.elapsedTime * 1.0) * 1.5
    }
  })

  return (
    <Float speed={0.8} rotationIntensity={0.03} floatIntensity={0.2}>
      <group ref={groupRef} scale={0.5} position={[x, y - 2, z]}>
        <primitive object={clonedScene} />
        {/* Primary golden glow */}
        <pointLight
          ref={glowRef}
          position={[0, 0, 0]}
          intensity={6}
          color="#FFD700"
          distance={15}
          decay={2}
        />
        {/* Warm accent from below */}
        <pointLight
          position={[0, -0.3, 0.3]}
          intensity={2}
          color="#FF9900"
          distance={6}
          decay={2}
        />
        {/* Subtle cool accent for contrast */}
        <pointLight
          position={[0.4, 0.2, -0.3]}
          intensity={0.8}
          color="#7C3AED"
          distance={4}
          decay={2}
        />
        {/* Additional reflection accent lights */}
        <pointLight
          position={[1.2, 0.5, 0.8]}
          intensity={1.2}
          color="#FFD700"
          distance={5}
          decay={2}
        />
        <pointLight
          position={[-0.8, 0.3, 0.6]}
          intensity={1.0}
          color="#FFA500"
          distance={4}
          decay={2}
        />
        <pointLight
          position={[0, -0.2, 1.0]}
          intensity={0.8}
          color="#E8D5B5"
          distance={4}
          decay={2}
        />
      </group>
    </Float>
  )
}

// Orbiting point light that creates dynamic reflections on the coin
function OrbitingReflectionLight({ color, speed, radius, yOffset, intensity, reverse = false }: {
  color: string
  speed: number
  radius: number
  yOffset: number
  intensity: number
  reverse?: boolean
}) {
  const lightRef = useRef<THREE.PointLight>(null)

  useFrame((state) => {
    if (lightRef.current) {
      const time = state.clock.elapsedTime * speed * (reverse ? -1 : 1)
      lightRef.current.position.x = Math.cos(time) * radius + 0.8
      lightRef.current.position.z = Math.sin(time) * radius
      lightRef.current.position.y = yOffset + Math.sin(time * 0.8) * 0.3
      // Pulsing intensity
      lightRef.current.intensity = intensity + Math.sin(time * 2) * (intensity * 0.3)
    }
  })

  return (
    <pointLight
      ref={lightRef}
      color={color}
      intensity={intensity}
      distance={6}
      decay={2}
    />
  )
}

// Multiple orbiting lights for dynamic coin reflections - tighter
function OrbitingReflectionLights() {
  return (
    <group>
      <OrbitingReflectionLight color="#FFD700" speed={0.3} radius={2.2} yOffset={2.9} intensity={1.8} />
      <OrbitingReflectionLight color="#FFA500" speed={0.25} radius={2.5} yOffset={2.7} intensity={1.3} reverse />
      <OrbitingReflectionLight color="#FFE4B5" speed={0.35} radius={1.8} yOffset={3.0} intensity={1.0} />
      <OrbitingReflectionLight color="#7C3AED" speed={0.28} radius={2.4} yOffset={2.5} intensity={0.7} reverse />
    </group>
  )
}

// Light Ribbon Trail - orbiting around medallion
function LightRibbon({ color, speed, radius, yOffset, reverse = false }: {
  color: string
  speed: number
  radius: number
  yOffset: number
  reverse?: boolean
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime * speed * (reverse ? -1 : 1)
      meshRef.current.position.x = Math.cos(time) * radius
      meshRef.current.position.z = Math.sin(time) * radius
      meshRef.current.position.y = yOffset + Math.sin(time * 1.5) * 0.3
    }
  })

  return (
    <Trail
      width={0.12}
      length={8}
      color={color}
      attenuation={(t) => t * t}
      decay={1}
    >
      <mesh ref={meshRef} raycast={() => null}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </Trail>
  )
}

// Multiple light ribbon trails - tighter arcs around medallion
function LightRibbons() {
  return (
    <group position={[0.8, 0, 0]}>
      {/* Outer arcs - tighter */}
      <LightRibbon color="#FFD700" speed={0.25} radius={2.8} yOffset={2.8} />
      <LightRibbon color="#FFA500" speed={0.22} radius={3.0} yOffset={3.0} reverse />
      <LightRibbon color="#FFE4B5" speed={0.28} radius={3.2} yOffset={2.5} />
      {/* Mid-range arcs - closer */}
      <LightRibbon color="#FF8866" speed={0.3} radius={2.4} yOffset={2.9} />
      <LightRibbon color="#7C3AED" speed={0.26} radius={2.6} yOffset={2.6} reverse />
      <LightRibbon color="#C9A86C" speed={0.32} radius={2.2} yOffset={2.4} />
      {/* Inner accent arcs - tight */}
      <LightRibbon color="#FFCC00" speed={0.35} radius={1.8} yOffset={3.1} reverse />
      <LightRibbon color="#E8A838" speed={0.38} radius={1.6} yOffset={2.7} />
      <LightRibbon color="#9D7AED" speed={0.34} radius={2.0} yOffset={2.8} reverse />
    </group>
  )
}

// Volumetric fog swirl
function FogSwirl({ radius, speed, yOffset, opacity, color, reverse = false }: {
  radius: number
  speed: number
  yOffset: number
  opacity: number
  color: string
  reverse?: boolean
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime * speed * (reverse ? -1 : 1)
      meshRef.current.position.x = Math.cos(time) * radius + 0.8
      meshRef.current.position.z = Math.sin(time) * radius
      meshRef.current.position.y = yOffset + Math.sin(time * 0.7) * 0.4
      meshRef.current.rotation.x = time * 0.3
      meshRef.current.rotation.z = time * 0.2
    }
  })

  return (
    <mesh ref={meshRef} raycast={() => null}>
      <sphereGeometry args={[0.3, 12, 12]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        depthWrite={false}
      />
    </mesh>
  )
}

// Volumetric fog swirls around the medallion - tighter
function VolumetricFogSwirls() {
  return (
    <group>
      {/* Outer wisps - closer in */}
      <FogSwirl radius={2.8} speed={0.1} yOffset={2.6} opacity={0.025} color="#FFD700" />
      <FogSwirl radius={3.0} speed={0.09} yOffset={2.9} opacity={0.02} color="#FFA500" reverse />
      <FogSwirl radius={2.6} speed={0.11} yOffset={2.3} opacity={0.02} color="#E8D5B5" />

      {/* Mid-range wisps - tighter */}
      <FogSwirl radius={2.2} speed={0.14} yOffset={2.7} opacity={0.03} color="#9D7AED" reverse />
      <FogSwirl radius={2.4} speed={0.12} yOffset={3.0} opacity={0.025} color="#C9A86C" />
      <FogSwirl radius={2.0} speed={0.15} yOffset={2.4} opacity={0.03} color="#7C3AED" />

      {/* Inner accent wisps - compact */}
      <FogSwirl radius={1.6} speed={0.18} yOffset={2.8} opacity={0.035} color="#FFD700" reverse />
      <FogSwirl radius={1.8} speed={0.16} yOffset={2.6} opacity={0.03} color="#FFCC00" />
    </group>
  )
}

// Light beam escaping UPWARD from black hole portal in pool
function EscapingLightBeam({ angle, speed, delay }: { angle: number; speed: number; delay: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const progress = useRef(delay)

  useFrame((state) => {
    if (meshRef.current) {
      progress.current += 0.006 * speed
      if (progress.current > 1) progress.current = 0

      // Beam shoots UPWARD from pool center, spiraling outward slightly
      const height = progress.current * 6 // Goes up to 6 units high
      const spiralRadius = progress.current * 1.5 // Spirals outward as it rises
      meshRef.current.position.x = Math.cos(angle + progress.current * 2) * spiralRadius
      meshRef.current.position.y = height // Shoots UP
      meshRef.current.position.z = Math.sin(angle + progress.current * 2) * spiralRadius

      // Scale grows then shrinks
      const scale = Math.sin(progress.current * Math.PI) * 1.2
      meshRef.current.scale.setScalar(Math.max(0.05, scale))

      // Fade out as it travels up
      const mat = meshRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = (1 - progress.current) * 0.7
    }
  })

  return (
    <mesh ref={meshRef} raycast={() => null}>
      <sphereGeometry args={[0.06, 8, 8]} />
      <meshBasicMaterial color="#FFD700" transparent opacity={0.6} depthWrite={false} />
    </mesh>
  )
}

// Spiral arm for swirl vortex
function SpiralArm({ index, totalArms, speed, radius, thickness, color, opacity, reverse = false }: {
  index: number
  totalArms: number
  speed: number
  radius: number
  thickness: number
  color: string
  opacity: number
  reverse?: boolean
}) {
  const groupRef = useRef<THREE.Group>(null)
  const startAngle = (index / totalArms) * Math.PI * 2

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime * speed * (reverse ? -1 : 1)
      groupRef.current.rotation.y = startAngle + time
    }
  })

  // Create spiral trail of spheres
  const points = useMemo(() => {
    const pts = []
    for (let i = 0; i < 12; i++) {
      const t = i / 12
      const r = t * radius
      const angle = t * Math.PI * 1.5 // Spiral twist
      pts.push({
        x: Math.cos(angle) * r,
        z: Math.sin(angle) * r,
        y: t * 0.3, // Rise slightly
        scale: 1 - t * 0.5, // Smaller toward outside
      })
    }
    return pts
  }, [radius])

  return (
    <group ref={groupRef}>
      {points.map((pt, i) => (
        <mesh key={i} position={[pt.x, pt.y, pt.z]} scale={pt.scale} raycast={() => null}>
          <sphereGeometry args={[thickness, 8, 8]} />
          <meshBasicMaterial color={color} transparent opacity={opacity * (1 - i/12 * 0.5)} depthWrite={false} />
        </mesh>
      ))}
    </group>
  )
}

// Swirl vortex portal with spiral arms and particles
function BlackHolePortal() {
  const groupRef = useRef<THREE.Group>(null)
  const coreRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.PointLight>(null)

  // Leva controls for portal
  const [
    {
      portalX, portalY, portalZ,
      portalRotX, portalRotY, portalRotZ,
      portalScale,
      coreRadius,
      showSwirl, showBeams,
      // Swirl controls
      swirlArms, swirlSpeed, swirlRadius, swirlThickness, swirlOpacity,
      // Particle controls
      particleCount, particleSize, particleSpeed,
    },
    setPortal
  ] = useControls('Portal', () => ({
    portalX: { value: 0.5, min: -10, max: 10, step: 0.1 },
    portalY: { value: 0.05, min: -5, max: 5, step: 0.01 },
    portalZ: { value: 0, min: -10, max: 10, step: 0.1 },
    portalRotX: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
    portalRotY: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
    portalRotZ: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
    portalScale: { value: 0.8, min: 0.1, max: 3, step: 0.1 },
    coreRadius: { value: 0.3, min: 0.1, max: 3, step: 0.1 },
    showSwirl: true,
    showBeams: true,
    // Swirl settings - tighter
    swirlArms: { value: 5, min: 2, max: 12, step: 1 },
    swirlSpeed: { value: 0.4, min: 0.1, max: 2, step: 0.1 },
    swirlRadius: { value: 2.5, min: 1, max: 10, step: 0.5 },
    swirlThickness: { value: 0.08, min: 0.02, max: 0.5, step: 0.01 },
    swirlOpacity: { value: 0.5, min: 0, max: 1, step: 0.1 },
    // Particle settings - smaller and tighter
    particleCount: { value: 60, min: 20, max: 300, step: 10 },
    particleSize: { value: 0.12, min: 0.05, max: 1, step: 0.05 },
    particleSpeed: { value: 1.5, min: 0.5, max: 5, step: 0.5 },
  }))

  // Listen for preset changes
  useEffect(() => {
    const handlePreset = (e: CustomEvent<string>) => {
      switch (e.detail) {
        case 'full':
          setPortal({
            showSwirl: true,
            showBeams: true,
            swirlArms: 8,
            swirlSpeed: 0.6,
            swirlRadius: 5,
            swirlThickness: 0.18,
            swirlOpacity: 0.7,
            particleCount: 200,
            particleSize: 0.35,
            particleSpeed: 2.5,
          })
          break
        case 'minimal':
          setPortal({
            showSwirl: false,
            showBeams: false,
            particleCount: 30,
            particleSize: 0.15,
            particleSpeed: 1,
          })
          break
        case 'performance':
          setPortal({
            showSwirl: true,
            showBeams: false,
            swirlArms: 4,
            swirlSpeed: 0.3,
            swirlRadius: 3,
            swirlThickness: 0.1,
            swirlOpacity: 0.5,
            particleCount: 50,
            particleSize: 0.2,
            particleSpeed: 1.5,
          })
          break
      }
    }
    window.addEventListener('miga-preset', handlePreset as EventListener)
    return () => window.removeEventListener('miga-preset', handlePreset as EventListener)
  }, [setPortal])

  useFrame((state) => {
    if (groupRef.current) {
      // Slow rotation of entire portal
      groupRef.current.rotation.y = portalRotY + state.clock.elapsedTime * 0.1
    }
    if (coreRef.current) {
      // Pulsing core
      const pulse = 0.8 + Math.sin(state.clock.elapsedTime * 2) * 0.2
      coreRef.current.scale.setScalar(pulse)
    }
    if (glowRef.current) {
      glowRef.current.intensity = 3 + Math.sin(state.clock.elapsedTime * 1.5) * 1
    }
  })

  // Generate escaping light beams at various angles
  const beams = useMemo(() => {
    const result = []
    for (let i = 0; i < 24; i++) {
      const angle = (i / 24) * Math.PI * 2
      result.push({
        angle,
        speed: 0.8 + Math.random() * 0.4,
        delay: Math.random()
      })
    }
    return result
  }, [])

  // Colors for spiral arms
  const swirlColors = ['#FFD700', '#FFA500', '#FF8866', '#9D7AED', '#7C3AED', '#C9A86C']

  return (
    <group ref={groupRef} position={[portalX, portalY, portalZ]} rotation={[portalRotX, 0, portalRotZ]} scale={portalScale}>
      {/* Glowing center core */}
      <mesh ref={coreRef} position={[0, 0.02, 0]}>
        <sphereGeometry args={[coreRadius, 32, 32]} />
        <meshBasicMaterial color="#FFD700" transparent opacity={0.8} />
      </mesh>

      {/* Inner glow ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <ringGeometry args={[coreRadius * 0.8, coreRadius * 1.2, 64]} />
        <meshBasicMaterial color="#FFA500" transparent opacity={0.5} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>

      {/* Swirl spiral arms */}
      {showSwirl && (
        <group>
          {Array.from({ length: swirlArms }).map((_, i) => (
            <SpiralArm
              key={i}
              index={i}
              totalArms={swirlArms}
              speed={swirlSpeed}
              radius={swirlRadius}
              thickness={swirlThickness}
              color={swirlColors[i % swirlColors.length]}
              opacity={swirlOpacity}
              reverse={i % 2 === 1}
            />
          ))}
        </group>
      )}

      {/* Escaping light beams shooting upward */}
      {showBeams && (
        <group>
          {beams.map((beam, i) => (
            <EscapingLightBeam key={i} {...beam} />
          ))}
        </group>
      )}

      {/* Core glow light */}
      <pointLight
        ref={glowRef}
        position={[0, 0.2, 0]}
        intensity={3}
        color="#FFD700"
        distance={10}
        decay={2}
      />

      {/* Purple accent light */}
      <pointLight
        position={[0, 1, 0]}
        intensity={1.5}
        color="#9D7AED"
        distance={6}
        decay={2}
      />

      {/* Particles rising from swirl - gold */}
      <Sparkles
        count={particleCount}
        scale={[swirlRadius * 2, 8, swirlRadius * 2]}
        size={particleSize}
        speed={particleSpeed}
        opacity={0.6}
        color="#FFD700"
        position={[0, 2, 0]}
      />
      {/* Particles - purple accent */}
      <Sparkles
        count={Math.floor(particleCount * 0.6)}
        scale={[swirlRadius * 1.5, 6, swirlRadius * 1.5]}
        size={particleSize * 0.8}
        speed={particleSpeed * 1.2}
        opacity={0.5}
        color="#9D7AED"
        position={[0, 1.5, 0]}
      />
      {/* Particles - orange */}
      <Sparkles
        count={Math.floor(particleCount * 0.4)}
        scale={[swirlRadius, 4, swirlRadius]}
        size={particleSize * 0.6}
        speed={particleSpeed * 0.8}
        opacity={0.55}
        color="#FFA500"
        position={[0, 1, 0]}
      />
    </group>
  )
}

// More sparkles for magical atmosphere - smaller and tighter
function AmbientSparkles() {
  return (
    <>
      {/* Main field of micro particles - smaller */}
      <Sparkles
        count={120}
        scale={[12, 6, 12]}
        size={0.15}
        speed={0.3}
        opacity={0.4}
        color="#FFE4B5"
      />
      {/* Gold dust spread - tighter */}
      <Sparkles
        count={80}
        scale={[10, 5, 10]}
        size={0.12}
        speed={0.4}
        opacity={0.45}
        color="#FFD700"
      />
      {/* Concentrated near coin - tiny */}
      <Sparkles
        count={50}
        scale={[4, 3, 4]}
        size={0.18}
        speed={0.6}
        opacity={0.55}
        color="#FFD700"
        position={[0.8, 2.8, 0]}
      />
      {/* Purple accent field - smaller */}
      <Sparkles
        count={60}
        scale={[10, 4, 10]}
        size={0.1}
        speed={0.3}
        opacity={0.3}
        color="#9D7AED"
      />
      {/* Amber micro dust */}
      <Sparkles
        count={50}
        scale={[8, 4, 8]}
        size={0.08}
        speed={0.4}
        opacity={0.35}
        color="#FF9944"
      />
      {/* Tiny fast magic dust near coin */}
      <Sparkles
        count={60}
        scale={[5, 3, 5]}
        size={0.1}
        speed={0.8}
        opacity={0.5}
        color="#FFFACD"
        position={[0.8, 2.6, 0]}
      />
      {/* Cream particles - tighter */}
      <Sparkles
        count={70}
        scale={[12, 5, 12]}
        size={0.08}
        speed={0.35}
        opacity={0.3}
        color="#E8D5B5"
      />
      {/* Micro white dust - smaller spread */}
      <Sparkles
        count={80}
        scale={[14, 4, 14]}
        size={0.06}
        speed={0.5}
        opacity={0.25}
        color="#FFFFFF"
      />
    </>
  )
}

// Interactive camera controls - drag to rotate, scroll to zoom
// Press 'P' to log current camera position to console
function InteractiveCameraControls() {
  const { camera } = useThree()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'p' || e.key === 'P') {
        console.log('=== CAMERA SETTINGS ===')
        console.log(`position: [${camera.position.x.toFixed(2)}, ${camera.position.y.toFixed(2)}, ${camera.position.z.toFixed(2)}]`)
        console.log(`Copy this to Scene.tsx camera prop:`)
        console.log(`camera={{ position: [${camera.position.x.toFixed(2)}, ${camera.position.y.toFixed(2)}, ${camera.position.z.toFixed(2)}], fov: 40 }}`)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [camera])

  return (
    <OrbitControls
      enablePan={true}
      enableZoom={true}
      enableRotate={true}
      target={[0.5, 2, 0]}
      minDistance={5}
      maxDistance={30}
      minPolarAngle={0.2}
      maxPolarAngle={Math.PI / 2}
    />
  )
}

// Static camera with subtle mouse parallax
function CameraController() {
  const { camera } = useThree()
  // Base position - looking down at scene from above
  const baseX = 0
  const baseY = 12
  const baseZ = 10

  useFrame(() => {
    // Subtle mouse parallax around the fixed position
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, baseX + mouseState.x * 0.5, 0.02)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, baseY + mouseState.y * 0.2, 0.02)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, baseZ, 0.02)
    // Look at scene center
    camera.lookAt(0.5, 2, 0)
  })

  return null
}

// Lighting setup - coherent night scene (no shadows)
function Lighting() {
  return (
    <>
      {/* Main moonlight - cool tone */}
      <directionalLight
        position={[12, 20, -8]}
        intensity={0.7}
        color="#D0D8FF"
      />

      {/* Warm ground bounce */}
      <hemisphereLight
        color="#E8E0FF"
        groundColor="#4A3020"
        intensity={0.3}
      />

      {/* Rim light for depth */}
      <pointLight
        position={[-8, 4, -10]}
        intensity={0.5}
        color="#C9A86C"
        distance={25}
        decay={2}
      />

      {/* Additional fill from front */}
      <pointLight
        position={[5, 3, 8]}
        intensity={0.3}
        color="#FFE4B5"
        distance={20}
        decay={2}
      />
    </>
  )
}

// Atmospheric fog - tinted toward sky color
function AtmosphericFog() {
  const { scene } = useThree()

  useEffect(() => {
    // Fog tinted slightly toward night sky purple
    scene.fog = new THREE.FogExp2('#0a0815', 0.03)
    return () => {
      scene.fog = null
    }
  }, [scene])

  return null
}

// Loading fallback
function Loader() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 2
      meshRef.current.rotation.x = state.clock.elapsedTime
    }
  })

  return (
    <mesh ref={meshRef}>
      <octahedronGeometry args={[0.5, 0]} />
      <meshBasicMaterial color="#D4AF37" wireframe />
    </mesh>
  )
}

// Scene wrapper - static, no rotation
function SceneWrapper({ children }: { children: React.ReactNode }) {
  return <group>{children}</group>
}

// Camera controls component with leva - bidirectional sync
function CameraWithControls() {
  const { camera, gl } = useThree()
  const controlsRef = useRef<any>(null)
  const isUserInteracting = useRef(false)

  const [{ camFov, camPosX, camPosY, camPosZ, targetX, targetY, targetZ }, set] = useControls('Camera', () => ({
    camFov: { value: 45, min: 10, max: 120, step: 1, label: 'FOV' },
    camPosX: { value: 0, min: -20, max: 20, step: 0.5, label: 'Camera X' },
    camPosY: { value: 12, min: 1, max: 25, step: 0.5, label: 'Camera Y (Height)' },
    camPosZ: { value: 10, min: 0, max: 25, step: 0.5, label: 'Camera Z (Distance)' },
    targetX: { value: 0.5, min: -10, max: 10, step: 0.1, label: 'Look At X' },
    targetY: { value: 2, min: -5, max: 10, step: 0.1, label: 'Look At Y' },
    targetZ: { value: 0, min: -10, max: 10, step: 0.1, label: 'Look At Z' },
  }))

  // Update camera from Leva values (when not interacting)
  useEffect(() => {
    if (!isUserInteracting.current && camera instanceof THREE.PerspectiveCamera) {
      camera.fov = camFov
      camera.position.set(camPosX, camPosY, camPosZ)
      camera.updateProjectionMatrix()
    }
  }, [camera, camFov, camPosX, camPosY, camPosZ])

  // Update target when controls change
  useEffect(() => {
    if (!isUserInteracting.current && controlsRef.current) {
      controlsRef.current.target.set(targetX, targetY, targetZ)
    }
  }, [targetX, targetY, targetZ])

  // Sync Leva when user moves camera with OrbitControls
  useFrame(() => {
    if (isUserInteracting.current && controlsRef.current && camera instanceof THREE.PerspectiveCamera) {
      const pos = camera.position
      const target = controlsRef.current.target

      // Only update if values have changed significantly
      const posChanged = Math.abs(pos.x - camPosX) > 0.1 ||
                         Math.abs(pos.y - camPosY) > 0.1 ||
                         Math.abs(pos.z - camPosZ) > 0.1
      const targetChanged = Math.abs(target.x - targetX) > 0.05 ||
                            Math.abs(target.y - targetY) > 0.05 ||
                            Math.abs(target.z - targetZ) > 0.05

      if (posChanged || targetChanged) {
        set({
          camPosX: Math.round(pos.x * 10) / 10,
          camPosY: Math.round(pos.y * 10) / 10,
          camPosZ: Math.round(pos.z * 10) / 10,
          targetX: Math.round(target.x * 10) / 10,
          targetY: Math.round(target.y * 10) / 10,
          targetZ: Math.round(target.z * 10) / 10,
        })
      }
    }
  })

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={true}
      enableZoom={true}
      enableRotate={true}
      target={[targetX, targetY, targetZ]}
      minDistance={3}
      maxDistance={40}
      minPolarAngle={0}
      maxPolarAngle={Math.PI * 0.85}
      enableDamping={true}
      dampingFactor={0.05}
      onStart={() => { isUserInteracting.current = true }}
      onEnd={() => {
        // Delay turning off to allow final sync
        setTimeout(() => { isUserInteracting.current = false }, 100)
      }}
    />
  )
}

// Main scene content
function SceneContent({ onChainHover }: { onChainHover?: (chain: ChainData | null) => void }) {
  // Medallion controls
  const { medallionX, medallionY, medallionZ, medallionScale, showMedallion } = useControls('Medallion', {
    showMedallion: { value: true, label: 'Show' },
    medallionX: { value: 0.8, min: -5, max: 5, step: 0.1 },
    medallionY: { value: 2.9, min: 0, max: 10, step: 0.1 },
    medallionZ: { value: 0, min: -5, max: 5, step: 0.1 },
    medallionScale: { value: 2.8, min: 0.5, max: 5, step: 0.1 },
  })

  // Pool controls - smaller default for tighter composition
  const { poolX, poolZ, poolRadius, showPool } = useControls('Pool', {
    showPool: { value: true, label: 'Show' },
    poolX: { value: 0.5, min: -5, max: 5, step: 0.1 },
    poolZ: { value: 0, min: -5, max: 5, step: 0.1 },
    poolRadius: { value: 3.5, min: 1, max: 10, step: 0.5 },
  })

  // Pillars controls - tighter default
  const { showPillars, pillarsRadius, pillarsHeight } = useControls('Pillars', {
    showPillars: { value: true, label: 'Show' },
    pillarsRadius: { value: 5, min: 3, max: 15, step: 0.5 },
    pillarsHeight: { value: 2.5, min: 1, max: 6, step: 0.5 },
  })

  // Coin controls
  const { coinRadius, coinThickness, coinBorder, coinEdgeWidth, coinInnerOpacity, coinOuterOpacity, coinGlowIntensity, coinFaceOffset, coinFaceScale, showCoinFaces } = useControls('Coins', {
    coinRadius: { value: 0.42, min: 0.1, max: 1.0, step: 0.02, label: 'Size' },
    coinThickness: { value: 0.12, min: 0.05, max: 0.6, step: 0.02, label: 'Thickness' },
    coinBorder: { value: 0.04, min: 0.01, max: 0.15, step: 0.01, label: 'Border' },
    coinEdgeWidth: { value: 0.035, min: 0.01, max: 0.1, step: 0.005, label: 'Edge Width' },
    showCoinFaces: { value: true, label: 'Show Faces' },
    coinFaceOffset: { value: 0.02, min: 0.005, max: 0.1, step: 0.005, label: 'Face Offset' },
    coinFaceScale: { value: 0.7, min: 0.3, max: 0.95, step: 0.05, label: 'Face Scale' },
    coinInnerOpacity: { value: 0.3, min: 0, max: 1, step: 0.05, label: 'Inner Glow' },
    coinOuterOpacity: { value: 0.5, min: 0, max: 1, step: 0.05, label: 'Outer Opacity' },
    coinGlowIntensity: { value: 1.5, min: 0, max: 5, step: 0.1, label: 'Light Intensity' },
  })

  // Effects controls
  const { showEffects, showRibbons, showFog, showSparkles } = useControls('Effects', {
    showEffects: { value: true, label: 'Show All' },
    showRibbons: { value: true, label: 'Light Ribbons' },
    showFog: { value: true, label: 'Fog Swirls' },
    showSparkles: { value: true, label: 'Sparkles' },
  })

  // 7 columns arranged in a semicircle behind the pool - WIDER spacing to prevent intersection
  // Now dynamically positioned based on pillarsRadius
  const columnPositions: [number, number, number][] = useMemo(() => {
    const r = pillarsRadius
    return [
      // Semicircle arrangement - 7 pillars with proper spacing
      [-r * 1.14, 0, -r * 0.14],      // Far left front
      [-r * 0.86, 0, -r * 0.57],      // Left back
      [-r * 0.43, 0, -r * 0.86],      // Left center back
      [0.5, 0, -r],                    // Center back (behind pool)
      [r * 0.57, 0, -r * 0.86],       // Right center back
      [r, 0, -r * 0.57],              // Right back
      [r * 1.28, 0, -r * 0.14],       // Far right front
    ]
  }, [pillarsRadius])

  return (
    <>
      <AtmosphericFog />
      <Lighting />

      {/* HDRI environment for proper IBL - night preset */}
      <Environment
        preset="night"
        background={false}
        environmentIntensity={0.7}
      />

      {/* Static scene group */}
      <SceneWrapper>
        {/* Swirl portal */}
        <BlackHolePortal />

        {/* Pool and coin with intro animation - grows into position */}
        <IntroAnimatedGroup>
          {showPool && (
            <>
              <ReflectivePool x={poolX} z={poolZ} radius={poolRadius} />
              <PoolEdge x={poolX} z={poolZ} radius={poolRadius} />
            </>
          )}
          {showMedallion && (
            <MigaMedallion x={medallionX} y={medallionY} z={medallionZ} scale={medallionScale} />
          )}
        </IntroAnimatedGroup>

        {/* Persian columns behind the pool with chain coins */}
        {showPillars && columnPositions.map((pos, i) => (
          <group key={i}>
            <PersianColumn position={pos} height={pillarsHeight} />
            <ChainCoin
              position={pos}
              chain={chainData[i]}
              index={i}
              onHover={onChainHover}
              coinSettings={{
                radius: coinRadius,
                thickness: coinThickness,
                border: coinBorder,
                edgeWidth: coinEdgeWidth,
                innerOpacity: coinInnerOpacity,
                outerOpacity: coinOuterOpacity,
                glowIntensity: coinGlowIntensity,
                faceOffset: coinFaceOffset,
                faceScale: coinFaceScale,
                showFaces: showCoinFaces,
              }}
            />
          </group>
        ))}

        {/* Energy connections removed - was too busy */}

        {/* Effects outside intro animation so they're visible immediately */}
        {showEffects && (
          <>
            {showRibbons && <LightRibbons />}
            {showFog && <VolumetricFogSwirls />}
            <OrbitingReflectionLights />
            {showSparkles && <AmbientSparkles />}
          </>
        )}
      </SceneWrapper>

      {/* Camera with leva controls */}
      <CameraWithControls />
    </>
  )
}

interface MigaSceneProps {
  className?: string
}

export function MigaScene({ className = '' }: MigaSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isModelLoaded, setIsModelLoaded] = useState(false)
  const [showPanel, setShowPanel] = useState(false) // Hidden by default
  const [hoveredChain, setHoveredChain] = useState<ChainData | null>(null)
  const [loadingProgress, setLoadingProgress] = useState(0)

  // Screenshot function
  const takeScreenshot = useCallback(() => {
    const canvas = containerRef.current?.querySelector('canvas')
    if (canvas) {
      // Capture the canvas content
      const dataUrl = canvas.toDataURL('image/png')

      // Create download link
      const link = document.createElement('a')
      link.download = `miga-scene-${Date.now()}.png`
      link.href = dataUrl
      link.click()

      console.log('Screenshot saved!')
    }
  }, [])

  // Export settings function - captures all Leva storage
  const exportSettings = useCallback(() => {
    // Collect all settings from localStorage (Leva stores values there)
    const settings: Record<string, any> = {}

    // Get all localStorage keys that might contain leva data
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key) {
        try {
          const value = localStorage.getItem(key)
          if (value) {
            // Try to parse as JSON, otherwise store as string
            try {
              settings[key] = JSON.parse(value)
            } catch {
              settings[key] = value
            }
          }
        } catch (e) {
          console.warn('Failed to read key:', key)
        }
      }
    }

    // Add metadata
    settings._exportMeta = {
      timestamp: new Date().toISOString(),
      version: '1.0',
      source: 'miga-scene'
    }

    // Create downloadable JSON
    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.download = `miga-scene-settings-${new Date().toISOString().slice(0,10)}.json`
    link.href = url
    link.click()
    URL.revokeObjectURL(url)

    console.log('Settings exported!')
    alert('Settings exported! Check your downloads folder.')
  }, [])

  // Import settings function
  const importSettings = useCallback(() => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const settings = JSON.parse(event.target?.result as string)

          // Apply settings to localStorage
          Object.entries(settings).forEach(([key, value]) => {
            localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value))
          })

          // Reload to apply settings
          window.location.reload()
        } catch (err) {
          console.error('Failed to import settings:', err)
          alert('Failed to import settings. Invalid file format.')
        }
      }
      reader.readAsText(file)
    }
    input.click()
  }, [])

  // Presets control - exposed for leva
  useControls('Presets', () => ({
    'Full Effects': button(() => {
      window.dispatchEvent(new CustomEvent('miga-preset', { detail: 'full' }))
    }),
    'Minimal': button(() => {
      window.dispatchEvent(new CustomEvent('miga-preset', { detail: 'minimal' }))
    }),
    'Performance': button(() => {
      window.dispatchEvent(new CustomEvent('miga-preset', { detail: 'performance' }))
    }),
    'Screenshot': button(takeScreenshot),
  }), [takeScreenshot])

  // Export/Import controls
  useControls('Settings I/O', () => ({
    'Export Settings': button(exportSettings),
    'Import Settings': button(importSettings),
  }), [exportSettings, importSettings])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        mouseState.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
        mouseState.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Simulate loading progress
  useEffect(() => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 15
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        setIsModelLoaded(true)
      }
      setLoadingProgress(Math.min(progress, 100))
    }, 200)
    return () => clearInterval(interval)
  }, [])

  // Trigger fade-in after model loaded
  useEffect(() => {
    if (isModelLoaded) {
      const timer = setTimeout(() => setIsLoaded(true), 300)
      return () => clearTimeout(timer)
    }
  }, [isModelLoaded])

  return (
    <div
      ref={containerRef}
      className={`w-full h-full relative ${className}`}
    >
      {/* Loading overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm transition-opacity duration-500">
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

          {/* Loading text */}
          <div className="text-white/90 text-lg font-medium mb-4">
            Loading 3D Scene...
          </div>

          {/* Progress bar */}
          <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] transition-all duration-300 ease-out rounded-full"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <div className="text-white/50 text-sm mt-2">
            {Math.round(loadingProgress)}%
          </div>
        </div>
      )}

      {/* Main scene - fades in when loaded */}
      <div className={`w-full h-full transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Leva debug panel - wrapped for proper z-index */}
        <div className="fixed top-0 left-0 z-[100]" style={{ pointerEvents: showPanel ? 'auto' : 'none' }}>
          <Leva hidden={!showPanel} collapsed={false} />
          {/* Close button for panel - positioned at top right of panel */}
          {showPanel && (
            <button
              onClick={() => setShowPanel(false)}
              className="fixed top-2 left-[295px] w-8 h-8 rounded-full bg-red-500/80 hover:bg-red-500 border border-red-400 flex items-center justify-center text-white transition-all z-[101]"
              title="Close Settings"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Control buttons - fixed position */}
        <div className="fixed top-20 right-4 z-50 flex flex-col gap-2">
          {/* Toggle button for debug panel - gear icon */}
          <button
            onClick={() => setShowPanel(!showPanel)}
            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
              showPanel
                ? 'bg-white/20 border-white/40 text-white'
                : 'bg-black/50 border-white/20 text-white/70 hover:text-white hover:bg-black/70'
            }`}
            title={showPanel ? 'Hide Settings' : 'Show Settings'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
            </svg>
          </button>

          {/* Screenshot button */}
          <button
            onClick={takeScreenshot}
            className="w-10 h-10 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-all"
            title="Take Screenshot"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2v11z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
          </button>
        </div>

      {/* Chain tooltip overlay with icon */}
      {hoveredChain && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
          <div
            className="px-6 py-4 rounded-xl backdrop-blur-md border shadow-2xl max-w-sm"
            style={{
              background: `linear-gradient(135deg, ${hoveredChain.color}20, ${hoveredChain.color}10)`,
              borderColor: `${hoveredChain.color}40`,
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              {/* Token icon */}
              <img
                src={hoveredChain.icon}
                alt={hoveredChain.name}
                className="w-10 h-10 rounded-full"
                style={{
                  boxShadow: `0 0 15px ${hoveredChain.color}`,
                  border: `2px solid ${hoveredChain.color}60`,
                }}
              />
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg">{hoveredChain.name}</span>
                <span
                  className="px-2 py-0.5 rounded text-xs font-medium w-fit"
                  style={{
                    backgroundColor:
                      hoveredChain.status === 'live' ? '#14F19530' :
                      hoveredChain.status === 'next' ? '#FFA50030' : '#9D7AED30',
                    color:
                      hoveredChain.status === 'live' ? '#14F195' :
                      hoveredChain.status === 'next' ? '#FFA500' : '#9D7AED',
                  }}
                >
                  {hoveredChain.status === 'live' ? 'LIVE' :
                   hoveredChain.status === 'next' ? 'COMING SOON' : 'VOTE'}
                </span>
              </div>
            </div>
            <p className="text-white/80 text-sm mb-2">{hoveredChain.description}</p>
            {'voteOptions' in hoveredChain && hoveredChain.voteOptions && (
              <div className="flex flex-wrap gap-1 mt-2">
                {hoveredChain.voteOptions.map((opt) => (
                  <span key={opt} className="px-2 py-0.5 bg-white/10 rounded text-xs text-white/60">
                    {opt}
                  </span>
                ))}
              </div>
            )}
            <div className="mt-3 text-xs text-white/50">
              Click to {hoveredChain.status === 'mystery' ? 'vote' : 'view mint'}
            </div>
          </div>
        </div>
      )}

        {/* 3D Canvas */}
        <Canvas
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            preserveDrawingBuffer: true, // Required for screenshots
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.2,
            outputColorSpace: THREE.SRGBColorSpace,
          }}
          dpr={[1, Math.min(window.devicePixelRatio, 2)]}
          camera={{ position: [0, 12, 10], fov: 45 }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={<Loader />}>
            <SceneContent onChainHover={setHoveredChain} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  )
}

export function MigaSceneLite({ className = '' }: { className?: string }) {
  return <MigaScene className={className} />
}

export default MigaScene
