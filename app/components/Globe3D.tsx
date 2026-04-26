'use client'
import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial, Sparkles, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function GlobeInner() {
  const meshRef = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.002
      ringRef.current.rotation.x = 1.2
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= 0.003
      ring2Ref.current.rotation.x = 0.8
    }
  })

  return (
    <>
      {/* Ambient light */}
      <ambientLight intensity={0.2} />

      {/* Gold point light */}
      <pointLight position={[5, 5, 5]} intensity={3} color="#C9A84C" />
      <pointLight position={[-5, -5, 5]} intensity={1} color="#F0D080" />

      {/* Main Globe */}
      <Sphere ref={meshRef} args={[2, 64, 64]}>
        <MeshDistortMaterial
          color="#0D1B2A"
          emissive="#C9A84C"
          emissiveIntensity={0.08}
          distort={0.15}
          speed={1.5}
          roughness={0.8}
          metalness={0.3}
          wireframe={false}
        />
      </Sphere>

      {/* Wireframe overlay */}
      <Sphere args={[2.01, 24, 24]}>
        <meshBasicMaterial
          color="#C9A84C"
          wireframe
          transparent
          opacity={0.06}
        />
      </Sphere>

      {/* Outer glow sphere */}
      <Sphere args={[2.3, 32, 32]}>
        <meshBasicMaterial
          color="#C9A84C"
          transparent
          opacity={0.03}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Ring 1 */}
      <mesh ref={ringRef}>
        <torusGeometry args={[2.8, 0.015, 8, 128]} />
        <meshBasicMaterial color="#C9A84C" transparent opacity={0.4} />
      </mesh>

      {/* Ring 2 */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[3.2, 0.008, 8, 128]} />
        <meshBasicMaterial color="#F0D080" transparent opacity={0.2} />
      </mesh>

      {/* Sparkles */}
      <Sparkles
        count={80}
        scale={8}
        size={0.6}
        speed={0.2}
        color="#C9A84C"
        opacity={0.5}
      />
    </>
  )
}

export default function Globe3D() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <GlobeInner />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}