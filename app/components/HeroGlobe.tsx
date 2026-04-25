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

function FloatingSamurai() {
  const meshRef = useRef<THREE.Mesh>(null)
  const texture = useLoader(THREE.TextureLoader, '/samuraye.jpg.jpeg')

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(time * 0.4) * 0.2
      meshRef.current.rotation.y = Math.sin(time * 0.2) * 0.1
    }
  })

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const position: [number, number, number] = isMobile ? [0, -3.5, 0] : [5.5, 0, -2]
  const scale: [number, number, number] = isMobile ? [3, 4.5, 1] : [4, 6, 1]

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial 
          map={texture} 
          transparent 
          opacity={0.9} 
          emissive="#8b0000" 
          emissiveIntensity={0.3}
          side={THREE.DoubleSide}
        />
        {/* Glow behind samurai */}
        <mesh position={[0, 0, -0.1]} scale={[1.1, 1.1, 1]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial color="#4a0404" transparent opacity={0.1} />
        </mesh>
      </mesh>
    </Float>
  )
}

function SuperPremiumGlobe() {
  const meshRef = useRef<THREE.Mesh>(null)
  const networkRef = useRef<THREE.Mesh>(null)
  const auraRef = useRef<THREE.Mesh>(null)
  
  const texture = useLoader(THREE.TextureLoader, '/globe.jpg.jpeg')
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.05
    }
    if (networkRef.current) {
      networkRef.current.rotation.y = time * 0.07
      networkRef.current.rotation.z = Math.sin(time * 0.2) * 0.1
    }
    if (auraRef.current) {
      auraRef.current.scale.setScalar(1 + Math.sin(time * 0.5) * 0.03)
    }
  })

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const scale = isMobile ? 1.5 : 2.5
  const auraScale = isMobile ? 1.7 : 2.7
  const position: [number, number, number] = isMobile ? [0, 1.5, 0] : [-3, 0, 0]

  return (
    <group position={position}>
      {/* 1. Core Globe */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[scale, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          emissiveMap={texture}
          emissive="#C9A84C"
          emissiveIntensity={1}
          metalness={0.4}
          roughness={0.3}
        />
      </mesh>

      {/* 2. Outer glow shell */}
      <mesh ref={auraRef}>
        <sphereGeometry args={[auraScale, 32, 32]} />
        <meshBasicMaterial
          color="#8b0000"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 3. Network wireframe overlay */}
      <mesh ref={networkRef}>
        <sphereGeometry args={[scale + 0.05, 24, 24]} />
        <meshBasicMaterial
          color="#C9A84C"
          wireframe
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 4. Sparkles & Stars */}
      <Sparkles count={100} scale={8} size={1.5} speed={0.2} color="#C9A84C" />
    </group>
  )
}

export default function HeroGlobe() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <Canvas dpr={[1, 2]} gl={{ alpha: true, antialias: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={40} />
        
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={2.5} color="#C9A84C" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#8b0000" />
        <spotLight position={[0, 20, 0]} intensity={2} color="#4a0404" />

        <Suspense fallback={null}>
          <SuperPremiumGlobe />
          <FloatingSamurai />
        </Suspense>
        
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  )
}

