'use client'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Float, 
  Sphere,
  Stars,
  Sparkles
} from '@react-three/drei'
import { useRef, Suspense, useMemo } from 'react'
import * as THREE from 'three'

function SuperPremiumGlobe() {
  const meshRef = useRef<THREE.Mesh>(null)
  const networkRef = useRef<THREE.Mesh>(null)
  const auraRef = useRef<THREE.Mesh>(null)
  
  const texture = useLoader(THREE.TextureLoader, '/globe.jpg.jpeg')
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.05 // Very slow, graceful
    }
    if (networkRef.current) {
      networkRef.current.rotation.y = time * 0.07 // Slightly faster for parallax
      networkRef.current.rotation.z = Math.sin(time * 0.2) * 0.1
    }
    if (auraRef.current) {
      auraRef.current.scale.setScalar(1 + Math.sin(time * 0.5) * 0.03)
    }
  })

  return (
    <group>
      {/* 1. Core Globe Layer (Texture from photo) */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          emissiveMap={texture}
          emissive="#C9A84C"
          emissiveIntensity={3}
          transparent={true}
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* 2. Network / Wireframe Overlay (Popping lines like in the photo) */}
      <mesh ref={networkRef}>
        <sphereGeometry args={[2.52, 32, 32]} />
        <meshBasicMaterial 
          color="#C9A84C" 
          wireframe 
          transparent 
          opacity={0.15} 
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 3. Atmospheric Aura (Soft blending edges) */}
      <mesh ref={auraRef}>
        <sphereGeometry args={[2.8, 64, 64]} />
        <meshBasicMaterial 
          color="#C9A84C" 
          transparent 
          opacity={0.05} 
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 4. Global Glow (Deep atmosphere) */}
      <Sphere args={[3.2, 32, 32]}>
        <meshBasicMaterial 
          color="#C9A84C" 
          transparent 
          opacity={0.02} 
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>

      {/* 5. Golden Particles (Sparkles like in the photo) */}
      <Sparkles count={100} scale={10} size={1.5} speed={0.2} color="#C9A84C" />
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
    </group>
  )
}

export default function HeroGlobe() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <Canvas dpr={[1, 2]} alpha>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={35} />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#C9A84C" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#8A6D3B" />

        <Suspense fallback={null}>
          <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.3}>
            <SuperPremiumGlobe />
          </Float>
        </Suspense>
        
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  )
}
