'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

type AnimType = 'walk' | 'fall' | 'clock' | 'eye' | 'king' | 'wind' | 'swirl' | 'float'

const animMap: Record<AnimType, string> = {
  walk: 'bg-anim-walk',
  fall: 'bg-anim-fall',
  clock: 'bg-anim-clock',
  eye: 'bg-anim-eye',
  king: 'bg-anim-king',
  wind: 'bg-anim-wind',
  swirl: 'bg-anim-swirl',
  float: 'bg-anim-float',
}

interface Props {
  src: string
  opacity?: number
  anim?: AnimType
}

export default function CinematicBg({ src, opacity = 0.85, anim = 'float' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <motion.div
      ref={ref}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        y: parallaxY,
        willChange: 'transform',
        overflow: 'hidden',
      }}
    >
      {/* Image with CSS animation */}
      <div
        className={animMap[anim]}
        style={{
          position: 'absolute',
          inset: '-25%',
          width: '150%',
          height: '150%',
        }}
      >
        <Image
          src={src}
          alt="section background"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          quality={80}
        />
      </div>

      {/* Dark overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `rgba(10,10,10,${opacity})`,
      }} />

      {/* Gradient top/bottom fade */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, #0A0A0A 0%, transparent 20%, transparent 80%, #0A0A0A 100%)',
      }} />

      {/* Gold radial glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.05), transparent 70%)',
      }} />
    </motion.div>
  )
}