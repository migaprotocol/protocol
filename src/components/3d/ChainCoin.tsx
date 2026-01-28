import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { ChainData } from './chainData'
import type { CoinSettings } from './types'
import { defaultCoinSettings } from './types'
import { CoinFace } from './CoinFace'

interface ChainCoinProps {
  position: [number, number, number]
  chain: ChainData
  index: number
  onHover?: (chain: ChainData | null) => void
  onClick?: (chain: ChainData) => void
  coinSettings?: CoinSettings
}

// Interactive floating coin above pillar - rotates around X axis
export function ChainCoin({
  position,
  chain,
  index,
  onHover,
  onClick,
  coinSettings,
}: ChainCoinProps) {
  // Default settings if not provided
  const settings = coinSettings || defaultCoinSettings
  const groupRef = useRef<THREE.Group>(null)
  const coinRef = useRef<THREE.Group>(null)
  const glowRef = useRef<THREE.PointLight>(null)
  const [hovered, setHovered] = useState(false)

  const isLive = (chain.status as string) === 'live'
  const isNext = (chain.status as string) === 'next'
  const isMystery = (chain.status as string) === 'mystery'

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime
      // Float up and down - position coins at adjustable height above pillars
      groupRef.current.position.y = position[1] + settings.heightOffset + Math.sin(time * 0.5 + index) * 0.12
    }
    if (coinRef.current) {
      const time = state.clock.elapsedTime
      // Rotate around X axis (like a spinning coin)
      coinRef.current.rotation.x = time * 0.8 + index
      // Slight wobble on Y
      coinRef.current.rotation.y = Math.sin(time * 0.3 + index) * 0.1
    }
    if (glowRef.current) {
      // Enhanced brightness - brighter base intensities
      const baseIntensity = isLive ? 4 : isNext ? 2.5 : 1.5
      glowRef.current.intensity = baseIntensity + Math.sin(state.clock.elapsedTime * 1.2 + index) * 1.0
    }
  })

  // Enhanced emissive - brighter coins
  const baseEmissive = isLive ? 1.0 : isNext ? 0.6 : 0.3
  const emissiveIntensity = hovered ? 1.8 : baseEmissive
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
      <group ref={groupRef} position={[position[0], position[1] + settings.heightOffset, position[2]]}>
        {/* Question mark orb - pulsing */}
        <mesh
          scale={coinScale}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          onClick={handleClick}
        >
          <sphereGeometry args={[0.25, 16, 16]} />
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
          <torusGeometry args={[0.35, 0.02, 8, 24]} />
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
    <group ref={groupRef} position={[position[0], position[1] + settings.heightOffset, position[2]]}>
      {/* Rotating coin */}
      <group ref={coinRef} scale={coinScale}>
        {/* Invisible hitbox for better hover detection */}
        <mesh
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          onClick={handleClick}
        >
          <cylinderGeometry args={[settings.radius * 1.1, settings.radius * 1.1, settings.thickness * 2, 12]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>

        {/* Coin edge - open-ended cylinder (side only, no caps) */}
        <mesh>
          <cylinderGeometry args={[settings.radius, settings.radius, settings.thickness, 32, 1, true]} />
          <meshStandardMaterial
            color={coinColor}
            emissive={coinEmissive}
            emissiveIntensity={emissiveIntensity * 0.4}
            metalness={0.95}
            roughness={0.18}
          />
        </mesh>

        {/* Front face with token icon - shows actual token image */}
        {settings.showFaces && (
          <CoinFace
            iconPath={chain.icon}
            position={[0, settings.thickness / 2 + 0.001, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            radius={settings.radius * 0.92}
            edgeColor={chain.color}
          />
        )}

        {/* Back face with token icon - shows actual token image */}
        {settings.showFaces && (
          <CoinFace
            iconPath={chain.icon}
            position={[0, -settings.thickness / 2 - 0.001, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            radius={settings.radius * 0.92}
            edgeColor={chain.color}
            isBack={true}
          />
        )}


      </group>

      {/* Single glow light per coin — consolidated from 3 to 1 */}
      <pointLight
        ref={glowRef}
        position={[0, 0, 0]}
        intensity={isLive ? 4 : 2.5}
        color={chain.color}
        distance={5}
        decay={2}
      />
    </group>
  )
}
