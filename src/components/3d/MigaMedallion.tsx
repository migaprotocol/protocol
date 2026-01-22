import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import coinEdgeTexture from '@/assets/coin-edge.png'

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

// Inner ornate ring with coin edge texture
function InnerRing() {
  const edgeTexture = useLoader(THREE.TextureLoader, coinEdgeTexture)
  const { gl } = useThree()

  useEffect(() => {
    const maxAniso = gl.capabilities.getMaxAnisotropy?.() ?? 1
    edgeTexture.colorSpace = THREE.SRGBColorSpace
    edgeTexture.wrapS = THREE.RepeatWrapping
    edgeTexture.wrapT = THREE.RepeatWrapping
    edgeTexture.repeat.set(12, 1)
    edgeTexture.anisotropy = maxAniso
    edgeTexture.needsUpdate = true
  }, [edgeTexture, gl])

  return (
    <mesh position={[0, 0, 0.05]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[1.3, 0.12, 16, 128]} />
      <meshStandardMaterial
        map={edgeTexture}
        bumpMap={edgeTexture}
        bumpScale={0.2}
        color="#D4A846"
        metalness={0.95}
        roughness={0.15}
        envMapIntensity={1.5}
      />
    </mesh>
  )
}

// Outer reeded edge rings with parallax effect
function ReededEdgeRings() {
  const ring1Ref = useRef<THREE.Group>(null)
  const ring2Ref = useRef<THREE.Group>(null)
  const ring3Ref = useRef<THREE.Group>(null)

  const edgeTexture = useLoader(THREE.TextureLoader, coinEdgeTexture)
  const { gl } = useThree()

  useEffect(() => {
    const maxAniso = gl.capabilities.getMaxAnisotropy?.() ?? 1
    edgeTexture.colorSpace = THREE.SRGBColorSpace
    edgeTexture.wrapS = THREE.RepeatWrapping
    edgeTexture.wrapT = THREE.RepeatWrapping
    edgeTexture.anisotropy = maxAniso
    edgeTexture.needsUpdate = true
  }, [edgeTexture, gl])

  // Fibonacci-inspired spacing for rings
  const ringThickness = 0.04
  const rings = useMemo(() => [
    { radius: 2.45, repeat: 16 },
    { radius: 2.70, repeat: 18 },
    { radius: 3.00, repeat: 20 },
  ], [])

  // Parallax rotation - rings follow at different speeds
  useFrame((state) => {
    const t = state.clock.elapsedTime

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = Math.sin(t * 0.3) * 0.08
      ring1Ref.current.rotation.y = t * 0.1
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = Math.sin(t * 0.25 + 1) * 0.06
      ring2Ref.current.rotation.y = t * 0.08
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = Math.sin(t * 0.2 + 2) * 0.04
      ring3Ref.current.rotation.y = t * 0.06
    }
  })

  const createRingMaterial = (repeat: number) => {
    const tex = edgeTexture.clone()
    tex.repeat.set(repeat, 1)
    tex.needsUpdate = true
    return tex
  }

  return (
    <Float speed={0.5} rotationIntensity={0.01} floatIntensity={0.05}>
      {/* Inner ring */}
      <group ref={ring1Ref}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[rings[0].radius, ringThickness, 16, 128]} />
          <meshStandardMaterial
            map={createRingMaterial(rings[0].repeat)}
            bumpMap={createRingMaterial(rings[0].repeat)}
            bumpScale={0.15}
            metalness={0.95}
            roughness={0.15}
            color="#D4AF37"
            emissive="#C9A227"
            emissiveIntensity={0.2}
          />
        </mesh>
      </group>

      {/* Middle ring */}
      <group ref={ring2Ref}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[rings[1].radius, ringThickness, 16, 128]} />
          <meshStandardMaterial
            map={createRingMaterial(rings[1].repeat)}
            bumpMap={createRingMaterial(rings[1].repeat)}
            bumpScale={0.15}
            metalness={0.95}
            roughness={0.15}
            color="#C9A227"
            emissive="#B8860B"
            emissiveIntensity={0.15}
          />
        </mesh>
      </group>

      {/* Outer ring */}
      <group ref={ring3Ref}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[rings[2].radius, ringThickness, 16, 128]} />
          <meshStandardMaterial
            map={createRingMaterial(rings[2].repeat)}
            bumpMap={createRingMaterial(rings[2].repeat)}
            bumpScale={0.15}
            metalness={0.95}
            roughness={0.15}
            color="#B8860B"
            emissive="#8B7500"
            emissiveIntensity={0.1}
          />
        </mesh>
      </group>
    </Float>
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

// The M logo (three pillars) with glowing crystal material
function MLogo() {
  const groupRef = useRef<THREE.Group>(null)
  const leftGlowRef = useRef<THREE.PointLight>(null)
  const centerGlowRef = useRef<THREE.PointLight>(null)
  const rightGlowRef = useRef<THREE.PointLight>(null)

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle breathing effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.02
      groupRef.current.scale.set(scale, scale, scale)
    }
    // Pulsing glow lights for each crystal
    const t = state.clock.elapsedTime
    if (leftGlowRef.current) {
      leftGlowRef.current.intensity = 1.5 + Math.sin(t * 1.8) * 0.5
    }
    if (centerGlowRef.current) {
      centerGlowRef.current.intensity = 2.0 + Math.sin(t * 2.0 + 1) * 0.6
    }
    if (rightGlowRef.current) {
      rightGlowRef.current.intensity = 1.5 + Math.sin(t * 1.6 + 2) * 0.5
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

  // Glowing crystal material - enhanced with emissive glow
  const crystalMaterial = (color: string, emissiveColor: string) => (
    <meshPhysicalMaterial
      color={color}
      emissive={emissiveColor}
      emissiveIntensity={0.8}
      metalness={0.15}
      roughness={0.05}
      transmission={0.5}
      thickness={0.5}
      clearcoat={1}
      clearcoatRoughness={0.08}
      ior={1.6}
      envMapIntensity={2.0}
    />
  )

  return (
    <group ref={groupRef} position={[0, 0, 0.1]}>
      {/* Left pillar - cyan crystal */}
      <mesh geometry={pillarGeometry} position={[-0.35, 0, 0]}>
        {crystalMaterial('#88DDFF', '#44AAFF')}
      </mesh>
      <pointLight
        ref={leftGlowRef}
        position={[-0.35, 0, 0.15]}
        intensity={1.5}
        color="#88DDFF"
        distance={1.5}
        decay={2}
      />

      {/* Center pillar - magenta crystal (brightest) */}
      <mesh geometry={pillarGeometry} position={[0, 0.05, 0]}>
        {crystalMaterial('#FFB6FF', '#FF66FF')}
      </mesh>
      <pointLight
        ref={centerGlowRef}
        position={[0, 0.05, 0.15]}
        intensity={2.0}
        color="#FFB6FF"
        distance={2}
        decay={2}
      />

      {/* Right pillar - green crystal */}
      <mesh geometry={pillarGeometry} position={[0.35, 0, 0]}>
        {crystalMaterial('#88FFAA', '#44FF88')}
      </mesh>
      <pointLight
        ref={rightGlowRef}
        position={[0.35, 0, 0.15]}
        intensity={1.5}
        color="#88FFAA"
        distance={1.5}
        decay={2}
      />

      {/* Central combined glow for overall illumination */}
      <pointLight
        position={[0, 0, 0.2]}
        intensity={1.0}
        color="#FFFFFF"
        distance={2}
        decay={2}
      />
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
export function MigaMedallion({ enableEffects = true, showRings = true }: { enableEffects?: boolean; showRings?: boolean }) {
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

        {/* Inner decorative ring with coin edge texture */}
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

      {/* Reeded edge rings with parallax */}
      {showRings && <ReededEdgeRings />}
    </Float>
  )
}

export default MigaMedallion
