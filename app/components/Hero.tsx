'use client'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30
      const y = (e.clientY / window.innerHeight - 0.5) * 30
      mouseX.set(x)
      mouseY.set(y)
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [mouseX, mouseY])

  if (!mounted) return null

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* Cinematic Background */}
      <motion.div className="absolute inset-0 z-0" style={{ y, scale }}>
        <Image
          src="/sun.jpg.jpeg"
          alt="ATLAS Hero"
          fill
          className="object-cover object-center"
          priority
          quality={100}
        />
        {/* Dark overlay layers */}
        <div className="absolute inset-0 bg-[#0A0A0A]/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/60 via-transparent to-[#0A0A0A]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/40 via-transparent to-[#0A0A0A]/40" />
        {/* Gold radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.1),transparent_70%)]" />
      </motion.div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#C9A84C]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.6, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Parallax Mouse Layer */}
      <motion.div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{ x: springX, y: springY }}
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#C9A84C]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[#C9A84C]/5 rounded-full blur-3xl" />
      </motion.div>

      {/* Top Nav */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute top-8 w-full flex justify-between items-center px-8 md:px-16 z-10"
      >
        <div className="text-xs tracking-[0.3em] text-[#C9A84C] uppercase font-light">Est. 2024</div>
        <div className="hidden md:flex gap-8 text-xs tracking-widest text-[#E5E4E2]/50 uppercase">
          {['Services', 'Membership', 'Why Us', 'Join As Talent'].map((item) => (
            <a key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="hover:text-[#C9A84C] transition-colors duration-300 relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#C9A84C] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>
        <div className="text-xs tracking-[0.3em] text-[#E5E4E2]/30 uppercase font-light">Private. Verified. Elite.</div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-6 max-w-6xl mx-auto"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex items-center justify-center gap-4 mb-10"
        >
          <motion.div
            className="h-px bg-gradient-to-r from-transparent to-[#C9A84C]"
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
          <span className="text-xs tracking-[0.5em] text-[#C9A84C] uppercase font-light">
            The World&apos;s Most Exclusive Talent Platform
          </span>
          <motion.div
            className="h-px bg-gradient-to-l from-transparent to-[#C9A84C]"
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
        </motion.div>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotateY: 180 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.5, delay: 0.5, type: 'spring' }}
          className="flex justify-center mb-8"
          style={{ x: springX, y: springY }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-[#C9A84C]/20 blur-3xl rounded-full scale-150" />
            <Image
              src="/logo.png"
              alt="ATLAS Logo"
              width={280}
              height={280}
              className="object-contain relative z-10 drop-shadow-2xl"
            />
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-xl md:text-3xl font-light text-[#E5E4E2]/70 tracking-[0.3em] mb-16 italic font-cormorant"
        >
          &ldquo;Your World, Our Promise.&rdquo;
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a href="#services"
            className="gold-button flex items-center gap-3 group">
            Explore Our World
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
          </a>
          <a href="#join"
            className="px-8 py-4 border border-[#C9A84C]/30 text-[#C9A84C] text-sm tracking-widest uppercase hover:bg-[#C9A84C]/10 transition-all duration-500 backdrop-blur-sm">
            Join As Talent
          </a>
        </motion.div>

        {/* Bottom floating badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex flex-wrap justify-center gap-4 mt-16"
        >
          {['✓ Verified Professionals', '✓ NDA Protected', '✓ Elite Rated'].map((badge) => (
            <div key={badge}
              className="px-4 py-2 border border-[#C9A84C]/20 rounded-full text-xs text-[#C9A84C]/70 tracking-widest backdrop-blur-sm bg-[#0A0A0A]/30">
              {badge}
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[10px] tracking-[0.4em] text-[#E5E4E2]/30 uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-4 h-4 text-[#C9A84C]/50" />
        </motion.div>
      </motion.div>
    </section>
  )
}