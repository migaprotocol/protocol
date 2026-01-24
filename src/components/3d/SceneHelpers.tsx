import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useControls } from 'leva'
import * as THREE from 'three'

// Animated intro wrapper for pool and coin - grows and rotates into position
export function IntroAnimatedGroup({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null)
  const introProgress = useRef(0)

  useFrame(() => {
    if (groupRef.current) {
      if (introProgress.current < 1) {
        introProgress.current = Math.min(introProgress.current + 0.015, 1)
        // Ease out cubic for smooth deceleration
        const eased = 1 - Math.pow(1 - introProgress.current, 3)
        // Scale from 0.5 to 1
        const scale = 0.5 + eased * 0.5
        groupRef.current.scale.setScalar(scale)
        // Rise from below (y-axis) - start at -1, end at 0
        groupRef.current.position.y = -1 + eased * 1
        // Rotate Y during intro - half rotation
        groupRef.current.rotation.y = (1 - eased) * Math.PI * 0.5
      } else {
        // Ensure final position
        groupRef.current.scale.setScalar(1)
        groupRef.current.position.y = 0
        groupRef.current.rotation.y = 0
      }
    }
  })

  return (
    <group ref={groupRef} scale={0.5} position={[0, -1, 0]} rotation={[0, Math.PI * 0.5, 0]}>
      {children}
    </group>
  )
}

// Scene wrapper - static, no rotation
export function SceneWrapper({ children }: { children: React.ReactNode }) {
  return <group>{children}</group>
}

// Loading fallback
export function Loader() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 2
      meshRef.current.rotation.x = state.clock.elapsedTime
    }
  })

  return (
    <mesh ref={meshRef}>
      <octahedronGeometry args={[0.5, 0]} />
      <meshBasicMaterial color="#D4AF37" wireframe />
    </mesh>
  )
}

// Lighting setup - coherent night scene (no shadows)
export function Lighting() {
  return (
    <>
      {/* Main moonlight - cool tone */}
      <directionalLight
        position={[12, 20, -8]}
        intensity={0.7}
        color="#D0D8FF"
      />

      {/* Warm ground bounce */}
      <hemisphereLight
        color="#E8E0FF"
        groundColor="#4A3020"
        intensity={0.3}
      />

      {/* Rim light for depth */}
      <pointLight
        position={[-8, 4, -10]}
        intensity={0.5}
        color="#C9A86C"
        distance={25}
        decay={2}
      />

      {/* Additional fill from front */}
      <pointLight
        position={[5, 3, 8]}
        intensity={0.3}
        color="#FFE4B5"
        distance={20}
        decay={2}
      />
    </>
  )
}

// Atmospheric fog - tinted toward sky color
export function AtmosphericFog() {
  const { scene } = useThree()

  useEffect(() => {
    // Fog tinted slightly toward night sky purple
    scene.fog = new THREE.FogExp2('#0a0815', 0.03)
    return () => {
      scene.fog = null
    }
  }, [scene])

  return null
}

// Camera controls component with leva - bidirectional sync
export function CameraWithControls() {
  const { camera } = useThree()
  const controlsRef = useRef<any>(null)
  const isUserInteracting = useRef(false)

  const [{ camFov, camPosX, camPosY, camPosZ, targetX, targetY, targetZ }, set] = useControls('Camera', () => ({
    camFov: { value: 45, min: 10, max: 120, step: 1, label: 'FOV' },
    camPosX: { value: 0, min: -20, max: 20, step: 0.5, label: 'Camera X' },
    camPosY: { value: 14, min: 1, max: 30, step: 0.5, label: 'Camera Y (Height)' },
    camPosZ: { value: 8, min: 0, max: 25, step: 0.5, label: 'Camera Z (Distance)' },
    targetX: { value: 0, min: -10, max: 10, step: 0.1, label: 'Look At X' },
    targetY: { value: 2.5, min: -5, max: 10, step: 0.1, label: 'Look At Y' },
    targetZ: { value: -2, min: -10, max: 10, step: 0.1, label: 'Look At Z' },
  }))

  // Update camera from Leva values (when not interacting)
  useEffect(() => {
    if (!isUserInteracting.current && camera instanceof THREE.PerspectiveCamera) {
      camera.fov = camFov
      camera.position.set(camPosX, camPosY, camPosZ)
      camera.updateProjectionMatrix()
    }
  }, [camera, camFov, camPosX, camPosY, camPosZ])

  // Update target when controls change
  useEffect(() => {
    if (!isUserInteracting.current && controlsRef.current) {
      controlsRef.current.target.set(targetX, targetY, targetZ)
    }
  }, [targetX, targetY, targetZ])

  // Sync Leva when user moves camera with OrbitControls
  useFrame(() => {
    if (isUserInteracting.current && controlsRef.current && camera instanceof THREE.PerspectiveCamera) {
      const pos = camera.position
      const target = controlsRef.current.target

      // Only update if values have changed significantly
      const posChanged = Math.abs(pos.x - camPosX) > 0.1 ||
                         Math.abs(pos.y - camPosY) > 0.1 ||
                         Math.abs(pos.z - camPosZ) > 0.1
      const targetChanged = Math.abs(target.x - targetX) > 0.05 ||
                            Math.abs(target.y - targetY) > 0.05 ||
                            Math.abs(target.z - targetZ) > 0.05

      if (posChanged || targetChanged) {
        set({
          camPosX: Math.round(pos.x * 10) / 10,
          camPosY: Math.round(pos.y * 10) / 10,
          camPosZ: Math.round(pos.z * 10) / 10,
          targetX: Math.round(target.x * 10) / 10,
          targetY: Math.round(target.y * 10) / 10,
          targetZ: Math.round(target.z * 10) / 10,
        })
      }
    }
  })

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={true}
      enableZoom={true}
      enableRotate={true}
      target={[targetX, targetY, targetZ]}
      minDistance={3}
      maxDistance={40}
      minPolarAngle={0}
      maxPolarAngle={Math.PI * 0.85}
      enableDamping={true}
      dampingFactor={0.05}
      onStart={() => { isUserInteracting.current = true }}
      onEnd={() => {
        // Delay turning off to allow final sync
        setTimeout(() => { isUserInteracting.current = false }, 100)
      }}
    />
  )
}

// Interactive camera controls - drag to rotate, scroll to zoom
// Press 'P' to log current camera position to console
export function InteractiveCameraControls() {
  const { camera } = useThree()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'p' || e.key === 'P') {
        console.log('=== CAMERA SETTINGS ===')
        console.log(`position: [${camera.position.x.toFixed(2)}, ${camera.position.y.toFixed(2)}, ${camera.position.z.toFixed(2)}]`)
        console.log(`Copy this to Scene.tsx camera prop:`)
        console.log(`camera={{ position: [${camera.position.x.toFixed(2)}, ${camera.position.y.toFixed(2)}, ${camera.position.z.toFixed(2)}], fov: 40 }}`)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [camera])

  return (
    <OrbitControls
      enablePan={true}
      enableZoom={true}
      enableRotate={true}
      target={[0, 2, 0]}
      minDistance={5}
      maxDistance={30}
      minPolarAngle={0.2}
      maxPolarAngle={Math.PI / 2}
    />
  )
}
