'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

type AnimType = 'walk' | 'fall' | 'clock' | 'eye' | 'wind' | 'swirl' | 'float' | 'king'

interface Props {
  src: string
  opacity?: number
  anim?: AnimType
}

const animStyles: Record<AnimType, string> = {
  walk: 'cinematic-walk',
  fall: 'cinematic-fall',
  clock: 'cinematic-clock',
  eye: 'cinematic-eye',
  wind: 'cinematic-wind',
  swirl: 'cinematic-swirl',
  float: 'cinematic-float',
  king: 'cinematic-king',
}

export default function CinematicBg({ src, opacity = 0.85, anim = 'float' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.0, 1.12])

  return (
    <motion.div
      ref={ref}
      style={{ position: 'absolute', inset: 0, zIndex: 0, y, scale, willChange: 'transform', overflow: 'hidden' }}
    >
      <div className={animStyles[anim]} style={{ position: 'absolute', inset: '-20%', width: '140%', height: '140%' }}>
        <Image
          src={src}
          alt="bg"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          quality={85}
        />
      </div>
      <div style={{ position: 'absolute', inset: 0, background: `rgba(10,10,10,${opacity})` }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #0A0A0A 0%, transparent 25%, transparent 75%, #0A0A0A 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.06), transparent 70%)' }} />
    </motion.div>
  )
}