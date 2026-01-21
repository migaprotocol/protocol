import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

// Create octagram (8-pointed star) shape
function createOctagramShape(outerRadius: number, innerRadius: number, indent: number): THREE.Shape {
  const shape = new THREE.Shape()
  const points = 8
  const angleStep = (Math.PI * 2) / points
  const halfStep = angleStep / 2

  for (let i = 0; i < points; i++) {
    const angle = i * angleStep - Math.PI / 2
    const nextAngle = angle + halfStep

    // Outer point
    const outerX = Math.cos(angle) * outerRadius
    const outerY = Math.sin(angle) * outerRadius

    // Inner indent
    const innerX = Math.cos(nextAngle) * innerRadius
    const innerY = Math.sin(nextAngle) * innerRadius

    if (i === 0) {
      shape.moveTo(outerX, outerY)
    } else {
      shape.lineTo(outerX, outerY)
    }

    // Add curves for ornate look
    const controlX = Math.cos(nextAngle) * (innerRadius + indent)
    const controlY = Math.sin(nextAngle) * (innerRadius + indent)
    shape.quadraticCurveTo(controlX, controlY, innerX, innerY)
  }
  shape.closePath()
  return shape
}

// Ornate frame geometry
function OrnateFrame() {
  const meshRef = useRef<THREE.Mesh>(null)

  const geometry = useMemo(() => {
    const shape = createOctagramShape(2.2, 1.5, 0.3)
    const extrudeSettings = {
      depth: 0.15,
      bevelEnabled: true,
      bevelThickness: 0.08,
      bevelSize: 0.05,
      bevelSegments: 3,
    }
    return new THREE.ExtrudeGeometry(shape, extrudeSettings)
  }, [])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.02
    }
  })

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, 0, -0.1]}>
      <meshStandardMaterial
        color="#D4A846"
        metalness={0.95}
        roughness={0.15}
        envMapIntensity={2}
      />
    </mesh>
  )
}

// Inner ornate ring
function InnerRing() {
  return (
    <mesh position={[0, 0, 0.05]}>
      <torusGeometry args={[1.3, 0.12, 16, 64]} />
      <meshStandardMaterial
        color="#8B6914"
        metalness={0.9}
        roughness={0.25}
        envMapIntensity={1.5}
      />
    </mesh>
  )
}

// Amber gems at star points
function AmberGems() {
  const gemPositions = useMemo(() => {
    const positions: [number, number, number][] = []
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI * 2) / 8 - Math.PI / 2
      positions.push([
        Math.cos(angle) * 1.85,
        Math.sin(angle) * 1.85,
        0.12,
      ])
    }
    return positions
  }, [])

  return (
    <>
      {gemPositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <boxGeometry args={[0.18, 0.18, 0.1]} />
          <meshStandardMaterial
            color="#FF8C00"
            emissive="#FF6B00"
            emissiveIntensity={0.8}
            metalness={0.3}
            roughness={0.2}
            transparent
            opacity={0.95}
          />
        </mesh>
      ))}
    </>
  )
}

// Central dark disc
function CenterDisc() {
  return (
    <mesh position={[0, 0, 0.02]}>
      <circleGeometry args={[1.15, 64]} />
      <meshStandardMaterial
        color="#0a0a15"
        metalness={0.1}
        roughness={0.8}
      />
    </mesh>
  )
}

// The M logo (three pillars) with glass-like material
function MLogo() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle breathing effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.02
      groupRef.current.scale.set(scale, scale, scale)
    }
  })

  const pillarGeometry = useMemo(() => {
    const shape = new THREE.Shape()
    // Create parallelogram shape for pillars
    shape.moveTo(-0.08, -0.4)
    shape.lineTo(0.08, -0.4)
    shape.lineTo(0.15, 0.4)
    shape.lineTo(-0.01, 0.4)
    shape.closePath()

    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.08,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.015,
      bevelSegments: 2,
    })
  }, [])

  // Glass-like material settings
  const glassMaterial = (color: string) => (
    <meshPhysicalMaterial
      color={color}
      metalness={0.1}
      roughness={0.05}
      transmission={0.6}
      thickness={0.5}
      clearcoat={1}
      clearcoatRoughness={0.1}
      ior={1.5}
    />
  )

  return (
    <group ref={groupRef} position={[0, 0, 0.1]}>
      {/* Left pillar */}
      <mesh geometry={pillarGeometry} position={[-0.35, 0, 0]}>
        {glassMaterial('#88DDFF')}
      </mesh>
      {/* Center pillar */}
      <mesh geometry={pillarGeometry} position={[0, 0.05, 0]}>
        {glassMaterial('#FFB6FF')}
      </mesh>
      {/* Right pillar */}
      <mesh geometry={pillarGeometry} position={[0.35, 0, 0]}>
        {glassMaterial('#88FFAA')}
      </mesh>
    </group>
  )
}

// Fire/Energy particles swirling around
function FireParticles() {
  const particlesRef = useRef<THREE.Points>(null)
  const count = 200

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 2 + Math.random() * 1.5
      pos[i * 3] = Math.cos(angle) * radius
      pos[i * 3 + 1] = Math.sin(angle) * radius
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.5
    }
    return pos
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      const positionsArray = particlesRef.current.geometry.attributes.position.array as Float32Array
      const time = state.clock.elapsedTime

      for (let i = 0; i < count; i++) {
        const idx = i * 3
        const x = positionsArray[idx]
        const y = positionsArray[idx + 1]
        const angle = Math.atan2(y, x)
        const radius = Math.sqrt(x * x + y * y)

        // Spiral inward and outward
        const newAngle = angle + 0.015
        const radiusMod = Math.sin(time + i * 0.1) * 0.3

        positionsArray[idx] = Math.cos(newAngle) * (radius + radiusMod * 0.01)
        positionsArray[idx + 1] = Math.sin(newAngle) * (radius + radiusMod * 0.01)
        positionsArray[idx + 2] = Math.sin(time * 2 + i) * 0.2
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#FF7B00"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

// Emissive outer glow ring
function GlowRing() {
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ringRef.current) {
      const material = ringRef.current.material as THREE.MeshStandardMaterial
      material.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 3) * 0.3
    }
  })

  return (
    <mesh ref={ringRef} position={[0, 0, -0.15]}>
      <ringGeometry args={[2.3, 2.8, 64]} />
      <meshStandardMaterial
        color="#FF8C00"
        emissive="#FF6B00"
        emissiveIntensity={0.5}
        transparent
        opacity={0.4}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// Main Medallion component
export function MigaMedallion({ enableEffects = true }: { enableEffects?: boolean }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating rotation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef}>
        {/* Glow effect behind */}
        {enableEffects && <GlowRing />}

        {/* Main frame */}
        <OrnateFrame />

        {/* Inner decorative ring */}
        <InnerRing />

        {/* Amber gems */}
        <AmberGems />

        {/* Dark center */}
        <CenterDisc />

        {/* Glass M logo */}
        <MLogo />

        {/* Fire particles */}
        {enableEffects && <FireParticles />}

        {/* Sparkle effects */}
        {enableEffects && (
          <Sparkles
            count={50}
            scale={5}
            size={3}
            speed={0.4}
            color="#FFD700"
            opacity={0.6}
          />
        )}
      </group>
    </Float>
  )
}

export default MigaMedallion
