import { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Environment, Sparkles, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

// Preload medallion model
useGLTF.preload('/models/MIGA-medallion.glb')

// Simple loading fallback
function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial color="#D4A846" metalness={0.9} roughness={0.1} />
    </mesh>
  )
}

// The 3D medallion model
function MedallionModel({ scale = 1 }: { scale?: number }) {
  const { scene } = useGLTF('/models/MIGA-medallion.glb')
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating rotation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.3}>
      <group ref={groupRef} scale={scale}>
        <primitive object={scene.clone()} />
        {/* Glow behind medallion */}
        <pointLight
          position={[0, 0, -0.5]}
          intensity={3}
          color="#FFD700"
          distance={5}
          decay={2}
        />
      </group>
    </Float>
  )
}

// Ambient sparkles around medallion
function AmbientSparkles() {
  return (
    <Sparkles
      count={60}
      scale={8}
      size={4}
      speed={0.3}
      color="#FFD700"
      opacity={0.5}
    />
  )
}

// Camera that adjusts based on mobile/desktop
function ResponsiveCamera() {
  const { camera, size } = useThree()

  useEffect(() => {
    const isMobile = size.width < 768
    // Pull back on mobile, closer on desktop
    camera.position.z = isMobile ? 7 : 5
    camera.position.y = isMobile ? 0.5 : 0
    camera.updateProjectionMatrix()
  }, [camera, size])

  return null
}

// The scene content
function SceneContent({ isMobile }: { isMobile: boolean }) {
  const scale = isMobile ? 0.8 : 1

  return (
    <>
      <ResponsiveCamera />

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.5}
        color="#FFFFFF"
      />
      <pointLight position={[-3, 3, 2]} intensity={0.8} color="#FFD700" />
      <pointLight position={[3, -3, 2]} intensity={0.5} color="#8B7500" />

      {/* The medallion */}
      <Suspense fallback={<LoadingFallback />}>
        <MedallionModel scale={scale} />
      </Suspense>

      {/* Sparkles */}
      <AmbientSparkles />

      {/* Environment for reflections */}
      <Environment preset="night" />

      {/* Background gradient via fog */}
      <fog attach="fog" args={['#07070A', 8, 20]} />
    </>
  )
}

// Main exported component
export function HeroMedallionScene({ className = '' }: { className?: string }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <SceneContent isMobile={isMobile} />
      </Canvas>
    </div>
  )
}

export default HeroMedallionScene
