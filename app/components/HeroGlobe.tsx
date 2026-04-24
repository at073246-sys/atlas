'use client'
import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial, Float, Stars, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

function Globe() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.05
      meshRef.current.rotation.z = time * 0.03
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[1, 100, 100]} scale={2.4}>
        <MeshDistortMaterial
          color="#C9A84C"
          speed={2}
          distort={0.3}
          metalness={1}
          roughness={0.1}
          emissive="#201505"
          emissiveIntensity={0.5}
        />
      </Sphere>
    </Float>
  )
}

export default function HeroGlobe() {
  return (
    <div className="absolute inset-0 z-0 opacity-70">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#C9A84C" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#F0D080" />
        
        <Globe />
        
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1.5} />
      </Canvas>
    </div>
  )
}
