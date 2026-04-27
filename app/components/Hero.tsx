'use client'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState, Suspense } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'

const Globe3D = dynamic(() => import('./Globe3D'), { ssr: false })

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 })

  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)

    const handleMouse = (e: MouseEvent) => {
      if (window.innerWidth < 768) return
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 20)
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 20)
    }
    window.addEventListener('mousemove', handleMouse)
    return () => {
      window.removeEventListener('mousemove', handleMouse)
      window.removeEventListener('resize', checkMobile)
    }
  }, [mouseX, mouseY])

  if (!mounted) return null

  return (
    <section ref={ref} style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>

      {/* Cinematic Background */}
      <motion.div style={{ position: 'absolute', inset: 0, zIndex: 0, y: bgY, scale: bgScale }}>
        <Image src="/sun.jpg.jpeg" alt="ATLAS" fill style={{ objectFit: 'cover', objectPosition: 'center' }} priority quality={100} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.72)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,10,0.6), transparent, #0A0A0A)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.08), transparent 70%)' }} />
      </motion.div>

      {/* Particles */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', overflow: 'hidden' }}>
        {[...Array(12)].map((_, i) => (
          <motion.div key={i}
            style={{ position: 'absolute', width: 3, height: 3, borderRadius: '50%', background: '#C9A84C', left: `${10 + i * 8}%`, top: `${20 + (i % 5) * 15}%` }}
            animate={{ y: [0, -20, 0], opacity: [0.1, 0.5, 0.1] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </div>

      {/* Nav */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: isMobile ? '16px' : '28px 64px' }}
      >
        <span style={{ fontSize: 10, letterSpacing: '0.3em', color: '#C9A84C', textTransform: 'uppercase', fontWeight: 300 }}>Est. 2024</span>
        {!isMobile && (
          <div style={{ display: 'flex', gap: 32 }}>
            {['Services', 'Membership', 'Why Us', 'Join As Talent'].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                style={{ fontSize: 11, letterSpacing: '0.15em', color: 'rgba(229,228,226,0.5)', textTransform: 'uppercase', textDecoration: 'none', transition: 'color 0.3s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#C9A84C')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(229,228,226,0.5)')}
              >
                {item}
              </a>
            ))}
          </div>
        )}
        <span style={{ fontSize: 10, letterSpacing: '0.2em', color: 'rgba(229,228,226,0.25)', textTransform: 'uppercase', fontWeight: 300, display: isMobile ? 'none' : 'block' }}>Private. Verified. Elite.</span>
      </motion.div>

      {/* Main Content */}
      <motion.div style={{ opacity: contentOpacity, position: 'relative', zIndex: 10, width: '100%', maxWidth: 1280, margin: '0 auto', padding: isMobile ? '80px 16px 40px' : '0 48px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', gap: isMobile ? 24 : 40 }}>

        {/* Left Text */}
        <div style={{ flex: 1, textAlign: isMobile ? 'center' : 'left' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: isMobile ? 'center' : 'flex-start', gap: 12, marginBottom: 24 }}
          >
            <motion.div style={{ height: 1, background: 'linear-gradient(to right, transparent, #C9A84C)' }}
              initial={{ width: 0 }} animate={{ width: 40 }} transition={{ duration: 1.5, delay: 0.5 }} />
            <span style={{ fontSize: 10, letterSpacing: '0.35em', color: '#C9A84C', textTransform: 'uppercase', fontWeight: 300 }}>
              World&apos;s Most Exclusive Talent Platform
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="font-playfair"
            style={{ fontSize: isMobile ? 'clamp(4rem, 22vw, 8rem)' : 'clamp(5rem, 12vw, 11rem)', fontWeight: 900, lineHeight: 0.9, marginBottom: 20 }}
          >
            <span className="gold-text">ATLAS</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="font-cormorant"
            style={{ fontSize: isMobile ? 18 : 24, fontWeight: 300, color: 'rgba(229,228,226,0.6)', letterSpacing: '0.2em', marginBottom: 32, fontStyle: 'italic' }}
          >
            &ldquo;Your World, Our Promise.&rdquo;
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 12, justifyContent: isMobile ? 'center' : 'flex-start', alignItems: 'center', marginBottom: 24 }}
          >
            <a href="#services" className="gold-button">
              Explore Our World
              <ArrowRight size={16} />
            </a>
            <a href="#join" style={{ padding: '14px 28px', border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none', transition: 'all 0.4s', backdropFilter: 'blur(8px)', whiteSpace: 'nowrap' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(201,168,76,0.1)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              Join As Talent
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.3 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: isMobile ? 'center' : 'flex-start' }}
          >
            {['✓ Verified', '✓ NDA Protected', '✓ Elite Rated'].map(b => (
              <span key={b} style={{ padding: '6px 14px', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 100, fontSize: 10, color: 'rgba(201,168,76,0.6)', letterSpacing: '0.1em', background: 'rgba(10,10,10,0.3)', backdropFilter: 'blur(8px)' }}>
                {b}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Right Globe */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.6, type: 'spring' }}
          style={{ flex: 1, width: '100%', ...(isMobile ? {} : { x: springX, y: springY }) }}
        >
          <div style={{ position: 'relative', width: '100%', height: isMobile ? 280 : 540 }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.1), transparent 70%)', borderRadius: '50%' }} />
            <Suspense fallback={null}>
              <Globe3D />
            </Suspense>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
        style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, zIndex: 10 }}
      >
        <span style={{ fontSize: 9, letterSpacing: '0.4em', color: 'rgba(229,228,226,0.25)', textTransform: 'uppercase' }}>Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown size={14} style={{ color: 'rgba(201,168,76,0.4)' }} />
        </motion.div>
      </motion.div>
    </section>
  )
}