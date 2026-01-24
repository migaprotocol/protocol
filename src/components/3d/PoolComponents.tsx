import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshReflectorMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Reflective Pool with proper reflections from HDRI - larger and more prominent
export function ReflectivePool({ x = 0.5, z = 0, radius = 5 }: { x?: number; z?: number; radius?: number }) {
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
export function PoolEdge({ x = 0.5, z = 0, radius = 5 }: { x?: number; z?: number; radius?: number }) {
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
