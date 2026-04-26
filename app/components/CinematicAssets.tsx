'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { 
  Float, 
  PerspectiveCamera, 
  useTexture, 
  Sparkles,
  MeshDistortMaterial
} from '@react-three/drei'
import { useRef, Suspense, useState, useEffect } from 'react'
import * as THREE from 'three'

// --- SHARED COMPONENTS ---

interface WorldImageProps {
  url: string
  position: [number, number, number]
  scale: [number, number, number]
  opacity?: number
  transparent?: boolean
  blending?: THREE.Blending
}

function WorldImage({ url, position, scale, opacity = 1, transparent = true, blending = THREE.NormalBlending }: WorldImageProps) {
  const texture = useTexture(url) as THREE.Texture
  return (
    <mesh position={position} scale={scale}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial 
        map={texture} 
        transparent={transparent} 
        opacity={opacity} 
        blending={blending}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// --- WORLD COMPONENTS ---

function World1({ scrollY }: { scrollY: number }) {
  const group = useRef<THREE.Group>(null)
  const range = scrollY / (window.innerHeight * 1)
  
  useFrame(() => {
    if (group.current) {
      group.current.position.z = Math.max(0, range * 10)
      group.current.position.y = range * -2
      group.current.visible = range < 1.2
    }
  })

  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <WorldImage url="/book.jpg.jpeg" position={[0, 0, -8]} scale={[30, 18, 1]} opacity={0.6} />
      </Float>
      <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
        <mesh position={[0, -1, -4]}>
          <capsuleGeometry args={[0.5, 2, 4, 16]} />
          <meshBasicMaterial color="#000000" transparent opacity={0.8} />
        </mesh>
      </Float>
      <Sparkles count={80} scale={25} size={3} speed={0.3} color="#C9A84C" />
    </group>
  )
}

function World2({ scrollY }: { scrollY: number }) {
  const group = useRef<THREE.Group>(null)
  const start = window.innerHeight * 1
  const range = (scrollY - start) / window.innerHeight

  useFrame(() => {
    if (group.current) {
      group.current.position.y = (1 - range) * 20
      group.current.visible = range > -0.5 && range < 1.5
    }
  })

  return (
    <group ref={group} position={[0, 0, -2]}>
      <WorldImage url="/eye.jpg.jpeg" position={[0, 0, 0]} scale={[18, 10, 1]} />
      <pointLight position={[0, 0, 2]} intensity={5} color="#C9A84C" />
    </group>
  )
}

function World3({ scrollY }: { scrollY: number }) {
  const group = useRef<THREE.Group>(null)
  const start = window.innerHeight * 2
  const range = (scrollY - start) / window.innerHeight

  useFrame(() => {
    if (group.current) {
      group.current.position.x = (1 - range) * -20
      group.current.visible = range > -0.5 && range < 1.5
    }
  })

  return (
    <group ref={group} position={[0, 0, -1]}>
      <WorldImage url="/samuraye.jpg.jpeg" position={[0, 0, 0]} scale={[20, 12, 1]} />
      <ambientLight intensity={0.2} color="#8b0000" />
    </group>
  )
}

function World4({ scrollY }: { scrollY: number }) {
  const group = useRef<THREE.Group>(null)
  const start = window.innerHeight * 3
  const range = (scrollY - start) / window.innerHeight

  useFrame(() => {
    if (group.current) {
      group.current.position.y = (1 - range) * -20
      group.current.visible = range > -0.5 && range < 1.5
    }
  })

  return (
    <group ref={group} position={[0, 0, -3]}>
      <WorldImage url="/peg.jpg.jpeg" position={[0, 0, 0]} scale={[22, 14, 1]} />
      <Sparkles count={100} scale={25} size={1} speed={0.5} color="#ffffff" />
    </group>
  )
}

function World5({ scrollY }: { scrollY: number }) {
  const group = useRef<THREE.Group>(null)
  const start = window.innerHeight * 4
  const range = (scrollY - start) / window.innerHeight
  const texture = useTexture('/sun.jpg.jpeg') as THREE.Texture

  useFrame((state) => {
    if (group.current) {
      group.current.scale.setScalar(0.2 + Math.max(0, range) * 2)
      group.current.rotation.z = state.clock.getElapsedTime() * 0.4
      group.current.visible = range > -0.5
    }
  })

  return (
    <group ref={group} position={[0, 0, -5]}>
      <mesh>
        <planeGeometry args={[30, 20, 32, 32]} />
        <MeshDistortMaterial 
          map={texture} 
          speed={3} 
          distort={0.4} 
          radius={1} 
          blending={THREE.AdditiveBlending} 
          transparent 
          opacity={0.8}
        />
      </mesh>
    </group>
  )
}

export default function CinematicAssets() {
  const [scrollY, setScrollY] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#020202]">
      <Canvas dpr={[1, 2]} gl={{ alpha: true, antialias: true, stencil: false }}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#C9A84C" />
        
        <Suspense fallback={null}>
          <World1 scrollY={scrollY} />
          <World2 scrollY={scrollY} />
          <World3 scrollY={scrollY} />
          <World4 scrollY={scrollY} />
          <World5 scrollY={scrollY} />
        </Suspense>
      </Canvas>
    </div>
  )
}
