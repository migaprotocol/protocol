import { useRef, useMemo, useState, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Float } from '@react-three/drei'
import * as THREE from 'three'

// Preload medallion model
useGLTF.preload('/models/MIGA-3D.glb')

// Mouse position for parallax - shared with Scene
export const mouseState = { x: 0, y: 0 }

interface MigaMedallionModelProps {
  onLoaded?: () => void
  onClick?: () => void
  x?: number
  y?: number
  z?: number
  scale?: number
  /** Allow OrbitControls to handle rotation instead of auto-rotate */
  interactive?: boolean
}

// MIGA Medallion - 3D model with intro animation, hover scale, click navigation
export function MigaMedallionModel({
  onLoaded,
  onClick,
  x = 0.8,
  y = 2.9,
  z = 0,
  scale = 2.8,
  interactive = false,
}: MigaMedallionModelProps) {
  const groupRef = useRef<THREE.Group>(null)
  const glowRef = useRef<THREE.PointLight>(null)
  const { scene } = useGLTF('/models/MIGA-3D.glb')
  const introProgress = useRef(0)
  const [hovered, setHovered] = useState(false)
  const currentScale = useRef(0.5)

  const handlePointerOver = useCallback(() => {
    setHovered(true)
    document.body.style.cursor = 'pointer'
  }, [])

  const handlePointerOut = useCallback(() => {
    setHovered(false)
    document.body.style.cursor = 'auto'
  }, [])

  const handleClick = useCallback(() => {
    if (onClick) onClick()
  }, [onClick])

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true)
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = false
        child.receiveShadow = false
        if (child.material instanceof THREE.MeshStandardMaterial) {
          child.material.envMapIntensity = 6
          child.material.metalness = Math.min(child.material.metalness * 1.4, 1)
          child.material.roughness = Math.max(child.material.roughness * 0.5, 0.05)
          child.material.needsUpdate = true
        }
      }
    })
    if (onLoaded) onLoaded()
    return clone
  }, [scene, onLoaded])

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime
      const targetScale = hovered ? scale * 1.15 : scale

      // Intro animation
      if (introProgress.current < 1) {
        introProgress.current = Math.min(introProgress.current + 0.015, 1)
        const eased = 1 - Math.pow(1 - introProgress.current, 3)
        currentScale.current = 0.5 + eased * (scale - 0.5)
        groupRef.current.scale.setScalar(currentScale.current)
        groupRef.current.position.y = (y - 2) + eased * 2 + Math.sin(time * 0.4) * 0.1
      } else {
        // Smooth hover scale lerp
        currentScale.current = THREE.MathUtils.lerp(currentScale.current, targetScale, 0.08)
        groupRef.current.scale.setScalar(currentScale.current)
        groupRef.current.position.y = y + Math.sin(time * 0.4) * 0.1
      }

      // Auto-rotate only when not interactive (OrbitControls handles it otherwise)
      if (!interactive) {
        groupRef.current.rotation.y = time * 0.08
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
      } else {
        groupRef.current.position.x = x
      }
      groupRef.current.position.z = z
    }
    if (glowRef.current) {
      const glowTarget = hovered ? 10 : 6
      glowRef.current.intensity = THREE.MathUtils.lerp(
        glowRef.current.intensity,
        glowTarget + Math.sin(state.clock.elapsedTime * 1.0) * 1.5,
        0.1
      )
    }
  })

  return (
    <Float speed={0.8} rotationIntensity={interactive ? 0 : 0.03} floatIntensity={0.2}>
      <group
        ref={groupRef}
        scale={0.5}
        position={[x, y - 2, z]}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <primitive object={clonedScene} />
        {/* Primary golden glow — consolidated from 6 lights to 2 */}
        <pointLight
          ref={glowRef}
          position={[0, 0, 0]}
          intensity={6}
          color="#FFD700"
          distance={12}
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
      </group>
    </Float>
  )
}

export default MigaMedallionModel
