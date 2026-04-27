'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

interface Props {
  src: string
  opacity?: number
}

export default function ParallaxBg({ src, opacity = 0.85 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.0, 1.15])

  return (
    <motion.div
      ref={ref}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        y,
        scale,
        willChange: 'transform',
      }}
    >
      <Image
        src={src}
        alt="background"
        fill
        style={{ objectFit: 'cover', objectPosition: 'center' }}
        quality={85}
      />
      <div style={{ position: 'absolute', inset: 0, background: `rgba(10,10,10,${opacity})` }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #0A0A0A 0%, transparent 25%, transparent 75%, #0A0A0A 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.06), transparent 70%)' }} />
    </motion.div>
  )
}