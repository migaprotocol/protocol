import { Sparkles } from '@react-three/drei'

// Ambient sparkle atmosphere - optimized to 3 instances, ~80 total particles
export function AmbientSparkles() {
  return (
    <>
      {/* Main gold dust field */}
      <Sparkles
        count={30}
        scale={[10, 5, 10]}
        size={0.14}
        speed={0.35}
        opacity={0.4}
        color="#FFD700"
      />
      {/* Concentrated near medallion */}
      <Sparkles
        count={25}
        scale={[4, 3, 4]}
        size={0.16}
        speed={0.6}
        opacity={0.5}
        color="#FFE4B5"
        position={[0, 2.8, 0]}
      />
      {/* Purple accent spread */}
      <Sparkles
        count={25}
        scale={[8, 4, 8]}
        size={0.1}
        speed={0.3}
        opacity={0.3}
        color="#9D7AED"
      />
    </>
  )
}
