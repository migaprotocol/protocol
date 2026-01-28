import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

interface PersianColumnProps {
  position: [number, number, number]
  height?: number
  depositAmount?: number
  chainColor?: string
  chainSymbol?: string
}

// Persian Column with shadow/glow at base and dynamic deposit display
export function PersianColumn({
  position,
  height = 3,
  depositAmount = 0,
  chainColor = '#FFD700',
  chainSymbol = ''
}: PersianColumnProps) {
  const groupRef = useRef<THREE.Group>(null)
  const textRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.PointLight>(null)
  const radius = 0.18

  // Format deposit amount for display
  const formatAmount = (amount: number) => {
    if (amount >= 1000000) return `${(amount / 1000000).toFixed(1)}M`
    if (amount >= 1000) return `${(amount / 1000).toFixed(1)}K`
    return amount.toFixed(0)
  }

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.12 + position[0]) * 0.002
    }
    // Pulse the deposit glow based on amount
    if (glowRef.current && depositAmount > 0) {
      const pulseIntensity = Math.min(depositAmount / 10000, 2) // Scale with deposit
      glowRef.current.intensity = 0.5 + pulseIntensity + Math.sin(state.clock.elapsedTime * 1.5) * 0.3
    }
  })

  return (
    <group ref={groupRef} position={[position[0], 0, position[2]]}>
      {/* Shadow/dark glow at base - circular gradient */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <circleGeometry args={[0.8, 16]} />
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </mesh>
      {/* Outer shadow ring - softer */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.003, 0]}>
        <ringGeometry args={[0.6, 1.2, 16]} />
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={0.2}
          depthWrite={false}
        />
      </mesh>

      {/* Wide stone base */}
      <mesh position={[0, 0.04, 0]}>
        <cylinderGeometry args={[radius * 2.4, radius * 2.8, 0.08, 16]} />
        <meshStandardMaterial color="#1a0f08" metalness={0.1} roughness={0.92} />
      </mesh>

      {/* Second tier */}
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[radius * 2, radius * 2.4, 0.08, 16]} />
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
        <cylinderGeometry args={[radius * 0.92, radius * 1.02, height, 16, 1]} />
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
        <cylinderGeometry args={[radius * 1.6, radius * 1.0, 0.12, 16]} />
        <meshStandardMaterial color="#DED5C8" metalness={0.04} roughness={0.75} />
      </mesh>

      {/* Capital abacus (top plate) - round disc instead of square */}
      <mesh position={[0, height + 0.42, 0]}>
        <cylinderGeometry args={[radius * 1.8, radius * 1.8, 0.08, 16]} />
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

      {/* Dynamic deposit display */}
      {depositAmount > 0 && (
        <>
          {/* Deposit amount text */}
          <Text
            ref={textRef}
            position={[0, height * 0.5 + 0.24, radius * 1.2]}
            fontSize={0.15}
            color={chainColor}
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.01}
            outlineColor="#000000"
          >
            {formatAmount(depositAmount)}
          </Text>

          {/* Chain symbol below amount */}
          <Text
            position={[0, height * 0.5 + 0.05, radius * 1.2]}
            fontSize={0.08}
            color="#FFFFFF"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.005}
            outlineColor="#000000"
          >
            {chainSymbol}
          </Text>

          {/* Deposit glow ring - intensity scales with amount */}
          <mesh position={[0, height * 0.5 + 0.24, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[radius * 1.1, 0.02, 12, 32]} />
            <meshStandardMaterial
              color={chainColor}
              emissive={chainColor}
              emissiveIntensity={Math.min(depositAmount / 5000, 1.5)}
              transparent
              opacity={0.7}
            />
          </mesh>

          {/* Point light that glows based on deposit amount */}
          <pointLight
            ref={glowRef}
            position={[0, height * 0.5 + 0.24, 0.3]}
            intensity={0.5}
            color={chainColor}
            distance={2}
            decay={2}
          />
        </>
      )}
    </group>
  )
}
