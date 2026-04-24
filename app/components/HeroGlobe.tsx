'use client'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Float, 
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
      {/* 1. Core Globe - standard blending so texture is clearly visible */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          emissiveMap={texture}
          emissive="#C9A84C"
          emissiveIntensity={0.8}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>

      {/* 2. Outer glow shell - additive so it adds golden glow without obscuring */}
      <mesh ref={auraRef}>
        <sphereGeometry args={[2.7, 32, 32]} />
        <meshBasicMaterial
          color="#C9A84C"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* 3. Network wireframe overlay - rotates slightly faster for depth effect */}
      <mesh ref={networkRef}>
        <sphereGeometry args={[2.52, 24, 24]} />
        <meshBasicMaterial
          color="#C9A84C"
          wireframe
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* 4. Sparkles & Stars */}
      <Sparkles count={80} scale={8} size={1.2} speed={0.15} color="#C9A84C" />
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
    </group>
  )
}

export default function HeroGlobe() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <Canvas dpr={[1, 2]} gl={{ alpha: true }}>
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
