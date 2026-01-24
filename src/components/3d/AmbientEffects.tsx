import { Sparkles } from '@react-three/drei'

// More sparkles for magical atmosphere - smaller and tighter
export function AmbientSparkles() {
  return (
    <>
      {/* Main field of micro particles - smaller */}
      <Sparkles
        count={120}
        scale={[12, 6, 12]}
        size={0.15}
        speed={0.3}
        opacity={0.4}
        color="#FFE4B5"
      />
      {/* Gold dust spread - tighter */}
      <Sparkles
        count={80}
        scale={[10, 5, 10]}
        size={0.12}
        speed={0.4}
        opacity={0.45}
        color="#FFD700"
      />
      {/* Concentrated near coin - tiny */}
      <Sparkles
        count={50}
        scale={[4, 3, 4]}
        size={0.18}
        speed={0.6}
        opacity={0.55}
        color="#FFD700"
        position={[0, 2.8, 0]}
      />
      {/* Purple accent field - smaller */}
      <Sparkles
        count={60}
        scale={[10, 4, 10]}
        size={0.1}
        speed={0.3}
        opacity={0.3}
        color="#9D7AED"
      />
      {/* Amber micro dust */}
      <Sparkles
        count={50}
        scale={[8, 4, 8]}
        size={0.08}
        speed={0.4}
        opacity={0.35}
        color="#FF9944"
      />
      {/* Tiny fast magic dust near coin */}
      <Sparkles
        count={60}
        scale={[5, 3, 5]}
        size={0.1}
        speed={0.8}
        opacity={0.5}
        color="#FFFACD"
        position={[0, 2.6, 0]}
      />
      {/* Cream particles - tighter */}
      <Sparkles
        count={70}
        scale={[12, 5, 12]}
        size={0.08}
        speed={0.35}
        opacity={0.3}
        color="#E8D5B5"
      />
      {/* Micro white dust - smaller spread */}
      <Sparkles
        count={80}
        scale={[14, 4, 14]}
        size={0.06}
        speed={0.5}
        opacity={0.25}
        color="#FFFFFF"
      />
    </>
  )
}
