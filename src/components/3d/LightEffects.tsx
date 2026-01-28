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
        <sphereGeometry args={[0.04, 6, 6]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </Trail>
  )
}

// Reduced from 9 ribbons to 4
export function LightRibbons() {
  return (
    <group position={[0, 0, 0]}>
      <LightRibbon color="#FFD700" speed={0.25} radius={2.8} yOffset={2.8} />
      <LightRibbon color="#FFA500" speed={0.22} radius={3.0} yOffset={3.0} reverse />
      <LightRibbon color="#7C3AED" speed={0.26} radius={2.6} yOffset={2.6} reverse />
      <LightRibbon color="#FFCC00" speed={0.35} radius={1.8} yOffset={3.1} reverse />
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
      <sphereGeometry args={[0.3, 8, 8]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        depthWrite={false}
      />
    </mesh>
  )
}

// Reduced from 8 fog swirls to 3
export function VolumetricFogSwirls() {
  return (
    <group>
      <FogSwirl radius={2.8} speed={0.1} yOffset={2.6} opacity={0.025} color="#FFD700" />
      <FogSwirl radius={2.2} speed={0.14} yOffset={2.7} opacity={0.03} color="#9D7AED" reverse />
      <FogSwirl radius={1.6} speed={0.18} yOffset={2.8} opacity={0.035} color="#FFD700" reverse />
    </group>
  )
}

// Reduced from 4 orbiting lights to 2
export function OrbitingReflectionLights() {
  const light1Ref = useRef<THREE.PointLight>(null)
  const light2Ref = useRef<THREE.PointLight>(null)

  useFrame((state) => {
    const time = state.clock.elapsedTime
    if (light1Ref.current) {
      const t = time * 0.3
      light1Ref.current.position.x = Math.cos(t) * 2.2
      light1Ref.current.position.z = Math.sin(t) * 2.2
      light1Ref.current.position.y = 2.9 + Math.sin(t * 0.8) * 0.3
      light1Ref.current.intensity = 1.8 + Math.sin(t * 2) * 0.54
    }
    if (light2Ref.current) {
      const t = time * -0.25
      light2Ref.current.position.x = Math.cos(t) * 2.5
      light2Ref.current.position.z = Math.sin(t) * 2.5
      light2Ref.current.position.y = 2.7 + Math.sin(t * 0.8) * 0.3
      light2Ref.current.intensity = 1.3 + Math.sin(t * 2) * 0.39
    }
  })

  return (
    <group>
      <pointLight ref={light1Ref} color="#FFD700" intensity={1.8} distance={6} decay={2} />
      <pointLight ref={light2Ref} color="#FFA500" intensity={1.3} distance={6} decay={2} />
    </group>
  )
}
