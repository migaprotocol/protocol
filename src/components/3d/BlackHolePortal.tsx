import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { Sparkles } from '@react-three/drei'
import * as THREE from 'three'

// Light beam escaping UPWARD from black hole portal in pool
function EscapingLightBeam({ angle, speed, delay }: { angle: number; speed: number; delay: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const progress = useRef(delay)

  useFrame(() => {
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
    for (let i = 0; i < 8; i++) {
      const t = i / 8
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
export function BlackHolePortal() {
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
    portalX: { value: 0, min: -10, max: 10, step: 0.1 },
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
    swirlArms: { value: 3, min: 2, max: 12, step: 1 },
    swirlSpeed: { value: 0.4, min: 0.1, max: 2, step: 0.1 },
    swirlRadius: { value: 2.5, min: 1, max: 10, step: 0.5 },
    swirlThickness: { value: 0.08, min: 0.02, max: 0.5, step: 0.01 },
    swirlOpacity: { value: 0.5, min: 0, max: 1, step: 0.1 },
    // Particle settings - smaller and tighter
    particleCount: { value: 30, min: 20, max: 300, step: 10 },
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
    for (let i = 0; i < 10; i++) {
      const angle = (i / 10) * Math.PI * 2
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
        <sphereGeometry args={[coreRadius, 16, 16]} />
        <meshBasicMaterial color="#FFD700" transparent opacity={0.8} />
      </mesh>

      {/* Inner glow ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <ringGeometry args={[coreRadius * 0.8, coreRadius * 1.2, 32]} />
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

      {/* Single sparkle instance for portal particles */}
      <Sparkles
        count={particleCount}
        scale={[swirlRadius * 2, 8, swirlRadius * 2]}
        size={particleSize}
        speed={particleSpeed}
        opacity={0.6}
        color="#FFD700"
        position={[0, 2, 0]}
      />
    </group>
  )
}
