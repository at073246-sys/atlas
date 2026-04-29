'use client'
import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const COUNT = 800

function Particles() {
  const mesh = useRef<THREE.Points>(null)

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(COUNT * 3)
    const col = new Float32Array(COUNT * 3)
    const color = new THREE.Color()

    for (let i = 0; i < COUNT; i++) {
      const t = i / COUNT
      const phi = Math.acos(1 - 2 * t)
      const theta = Math.PI * (1 + Math.sqrt(5)) * i
      const r = 4 + Math.random() * 6

      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)

      const hue = 0.1 + Math.random() * 0.06
      const sat = 0.6 + Math.random() * 0.4
      const lit = 0.4 + Math.random() * 0.3
      color.setHSL(hue, sat, lit)
      col[i * 3]     = color.r
      col[i * 3 + 1] = color.g
      col[i * 3 + 2] = color.b
    }
    return [pos, col]
  }, [])

  useFrame(({ clock }) => {
    if (!mesh.current) return
    const t = clock.getElapsedTime()
    mesh.current.rotation.y = t * 0.04
    mesh.current.rotation.x = t * 0.02
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

function FloatingRing() {
  const mesh = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (!mesh.current) return
    const t = clock.getElapsedTime()
    mesh.current.rotation.x = t * 0.1
    mesh.current.rotation.z = t * 0.05
  })

  return (
    <mesh ref={mesh}>
      <torusGeometry args={[5, 0.015, 8, 120]} />
      <meshBasicMaterial color="#C9A84C" transparent opacity={0.25} />
    </mesh>
  )
}

function FloatingRing2() {
  const mesh = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (!mesh.current) return
    const t = clock.getElapsedTime()
    mesh.current.rotation.x = -t * 0.07
    mesh.current.rotation.y = t * 0.12
  })

  return (
    <mesh ref={mesh}>
      <torusGeometry args={[6.5, 0.008, 8, 120]} />
      <meshBasicMaterial color="#F0D080" transparent opacity={0.12} />
    </mesh>
  )
}

export default function HeroParticles() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 55 }}
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.3} />
        <Particles />
        <FloatingRing />
        <FloatingRing2 />
      </Canvas>
    </div>
  )
}