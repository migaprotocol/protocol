import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Float } from '@react-three/drei'
import * as THREE from 'three'

// Preload medallion model
useGLTF.preload('/models/MIGA-3D.glb')

// Mouse position for parallax - shared with Scene
export const mouseState = { x: 0, y: 0 }

interface MigaMedallionModelProps {
  onLoaded?: () => void
  x?: number
  y?: number
  z?: number
  scale?: number
}

// MIGA Medallion - 3D model with intro animation (scale up + fade in)
export function MigaMedallionModel({
  onLoaded,
  x = 0.8,
  y = 2.9,
  z = 0,
  scale = 2.8
}: MigaMedallionModelProps) {
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

export default MigaMedallionModel
