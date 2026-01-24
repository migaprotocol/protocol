import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Trail } from '@react-three/drei'
import * as THREE from 'three'

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
export function LightRibbons() {
  return (
    <group position={[0, 0, 0]}>
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
      meshRef.current.position.x = Math.cos(time) * radius
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
export function VolumetricFogSwirls() {
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
      lightRef.current.position.x = Math.cos(time) * radius
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
export function OrbitingReflectionLights() {
  return (
    <group>
      <OrbitingReflectionLight color="#FFD700" speed={0.3} radius={2.2} yOffset={2.9} intensity={1.8} />
      <OrbitingReflectionLight color="#FFA500" speed={0.25} radius={2.5} yOffset={2.7} intensity={1.3} reverse />
      <OrbitingReflectionLight color="#FFE4B5" speed={0.35} radius={1.8} yOffset={3.0} intensity={1.0} />
      <OrbitingReflectionLight color="#7C3AED" speed={0.28} radius={2.4} yOffset={2.5} intensity={0.7} reverse />
    </group>
  )
}
