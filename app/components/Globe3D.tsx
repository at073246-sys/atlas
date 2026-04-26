'use client'
import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, Sparkles, OrbitControls, useTexture } from '@react-three/drei'
import * as THREE from 'three'

function GlobeInner() {
  const meshRef = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const texture = useTexture('/globe.jpg.jpeg') as THREE.Texture

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0015
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.002
      ringRef.current.rotation.x = 1.2
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= 0.003
      ring2Ref.current.rotation.x = 0.5
    }
    if (glowRef.current) {
      glowRef.current.rotation.y -= 0.001
      const pulse = Math.sin(state.clock.getElapsedTime() * 0.8) * 0.05
      glowRef.current.scale.setScalar(1 + pulse)
    }
  })

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={4} color="#C9A84C" />
      <pointLight position={[-5, -3, 3]} intensity={2} color="#F0D080" />
      <pointLight position={[0, -5, -5]} intensity={1} color="#0D1B2A" />

      {/* Main Globe with texture */}
      <Sphere ref={meshRef} args={[2, 64, 64]}>
        <meshStandardMaterial
          map={texture}
          roughness={0.7}
          metalness={0.2}
          emissive="#C9A84C"
          emissiveIntensity={0.05}
        />
      </Sphere>

      {/* Wireframe overlay */}
      <Sphere args={[2.02, 20, 20]}>
        <meshBasicMaterial
          color="#C9A84C"
          wireframe
          transparent
          opacity={0.08}
        />
      </Sphere>

      {/* Outer glow */}
      <Sphere ref={glowRef} args={[2.4, 32, 32]}>
        <meshBasicMaterial
          color="#C9A84C"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Ring 1 */}
      <mesh ref={ringRef}>
        <torusGeometry args={[2.9, 0.012, 8, 128]} />
        <meshBasicMaterial color="#C9A84C" transparent opacity={0.5} />
      </mesh>

      {/* Ring 2 */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[3.3, 0.006, 8, 128]} />
        <meshBasicMaterial color="#F0D080" transparent opacity={0.25} />
      </mesh>

      {/* Sparkles */}
      <Sparkles
        count={100}
        scale={9}
        size={0.5}
        speed={0.15}
        color="#C9A84C"
        opacity={0.6}
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
          rotateSpeed={0.4}
        />
      </Canvas>
    </div>
  )
}