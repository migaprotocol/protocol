import { useMemo } from 'react'
import { useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

interface CoinFaceProps {
  iconPath: string
  position: [number, number, number]
  rotation: [number, number, number]
  radius?: number
  edgeColor?: string
  isBack?: boolean
}

// Coin face with token icon texture - shows actual token image
export function CoinFace({
  iconPath,
  position,
  rotation,
  radius = 0.26,
  // edgeColor is kept in interface for API compatibility but not used
  isBack = false,
}: CoinFaceProps) {
  const baseTexture = useTexture(iconPath)
  const { gl } = useThree()

  // Clone and configure texture - need separate instance for back face to flip
  const texture = useMemo(() => {
    const tex = baseTexture.clone()
    const maxAniso = gl.capabilities.getMaxAnisotropy?.() ?? 1
    tex.colorSpace = THREE.SRGBColorSpace
    tex.anisotropy = maxAniso
    // Flip texture on back face so it shows correctly when viewed from outside
    if (isBack) {
      tex.repeat.set(-1, 1)
      tex.offset.set(1, 0)
      tex.wrapS = THREE.RepeatWrapping
    }
    tex.needsUpdate = true
    return tex
  }, [baseTexture, gl, isBack])

  return (
    <mesh position={position} rotation={rotation}>
      <circleGeometry args={[radius, 32]} />
      <meshStandardMaterial
        map={texture}
        metalness={0.2}
        roughness={0.3}
        color="#FFFFFF"
        envMapIntensity={1.5}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}
