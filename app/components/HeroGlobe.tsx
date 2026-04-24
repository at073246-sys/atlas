'use client'
import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial, Float, Stars, PerspectiveCamera, Torus } from '@react-three/drei'
import * as THREE from 'three'

function Globe() {
  const meshRef = useRef<THREE.Mesh>(null)
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    // Slow, elegant rotation for the main globe
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.03
      meshRef.current.rotation.z = time * 0.01
    }
    
    // Smooth, opposing rotations for the orbital rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.08
      ring1Ref.current.rotation.y = time * 0.05
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -time * 0.05
      ring2Ref.current.rotation.y = time * 0.07
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
      {/* Main Golden Globe */}
      <Sphere ref={meshRef} args={[1, 100, 100]} scale={2.4}>
        <MeshDistortMaterial
          color="#F0D080"
          speed={1.5}
          distort={0.25}
          metalness={0.7}
          roughness={0.2}
          emissive="#C9A84C"
          emissiveIntensity={0.8}
        />
      </Sphere>
      
      {/* Inner Orbital Ring (Gold) */}
      <Torus ref={ring1Ref} args={[3.2, 0.02, 16, 100]} rotation={[Math.PI/3, 0, 0]}>
        <meshStandardMaterial 
          color="#F0D080" 
          metalness={0.8} 
          roughness={0.1} 
          emissive="#C9A84C" 
          emissiveIntensity={1.2} 
          transparent 
          opacity={0.8} 
        />
      </Torus>

      {/* Outer Orbital Ring (Platinum) */}
      <Torus ref={ring2Ref} args={[4.5, 0.01, 16, 100]} rotation={[-Math.PI/4, Math.PI/4, 0]}>
        <meshStandardMaterial 
          color="#E5E4E2" 
          metalness={1} 
          roughness={0.1} 
          emissive="#ffffff" 
          emissiveIntensity={0.2} 
          transparent 
          opacity={0.3} 
        />
      </Torus>
    </Float>
  )
}

export default function HeroGlobe() {
  return (
    <div className="absolute inset-0 z-0 opacity-100">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        <ambientLight intensity={1.5} />
        <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={4} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={3} color="#F0D080" />
        
        <Globe />
        
        {/* Slow moving, subtle starfield background */}
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
      </Canvas>
    </div>
  )
}
