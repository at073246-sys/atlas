'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Mail } from 'lucide-react'
import { useRef, Suspense } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'

const Globe3D = dynamic(() => import('./Globe3D'), { ssr: false })

const links = [
  { label: 'About', href: '#' },
  { label: 'Services', href: '#services' },
  { label: 'Membership', href: '#membership' },
  { label: 'Join As Talent', href: '#join' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Contact', href: '#' },
]

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['5%', '-5%'])
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05])

  return (
    <footer ref={ref} style={{ position: 'relative', paddingTop: 80, paddingBottom: 40, overflow: 'hidden' }}>
      {/* 3D Motion Background */}
      <motion.div style={{ position: 'absolute', inset: 0, zIndex: 0, y, scale: imageScale }}>
        <Image src="/peg.jpg.jpeg" alt="Footer Background" fill style={{ objectFit: 'cover', objectPosition: 'center' }} quality={90} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.92)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #0A0A0A, transparent, #0A0A0A)' }} />
      </motion.div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>

        {/* 3D Globe + Brand */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          {/* Globe */}
          <div style={{ position: 'relative', width: '100%', maxWidth: 280, height: 280, margin: '0 auto 24px' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.1), transparent 70%)' }} />
            <Suspense fallback={null}>
              <Globe3D />
            </Suspense>
          </div>

          <h3 className="font-playfair gold-text" style={{ fontSize: 40, fontWeight: 900, marginBottom: 8 }}>
            ATLAS
          </h3>
          <p className="font-cormorant" style={{ fontSize: 20, color: 'rgba(229,228,226,0.4)', fontStyle: 'italic', letterSpacing: '0.2em' }}>
            &ldquo;Your World, Our Promise.&rdquo;
          </p>
        </motion.div>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px 32px', marginBottom: 40 }}
        >
          {links.map((link) => (
            <a key={link.label} href={link.href}
              style={{ fontSize: 11, letterSpacing: '0.15em', color: 'rgba(229,228,226,0.3)', textTransform: 'uppercase', textDecoration: 'none', transition: 'color 0.3s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#C9A84C')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(229,228,226,0.3)')}
            >
              {link.label}
            </a>
          ))}
        </motion.div>

        {/* Email */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
          <motion.a href="mailto:atlasofficial2090@gmail.com"
            whileHover={{ scale: 1.1, y: -3 }}
            style={{ width: 40, height: 40, border: '1px solid rgba(201,168,76,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(229,228,226,0.3)', borderRadius: 8, transition: 'all 0.3s', textDecoration: 'none' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#C9A84C'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.5)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(229,228,226,0.3)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.2)' }}
          >
            <Mail size={16} />
          </motion.a>
        </div>

        {/* Divider */}
        <motion.div
          style={{ height: 1, background: 'linear-gradient(to right, transparent, #C9A84C, transparent)', marginBottom: 32 }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        />

        {/* Bottom */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, textAlign: 'center' }}>
          <span style={{ fontSize: 10, letterSpacing: '0.15em', color: 'rgba(229,228,226,0.15)', textTransform: 'uppercase' }}>
            © 2024 Atlas. All rights reserved.
          </span>
          <span style={{ fontSize: 10, letterSpacing: '0.15em', color: 'rgba(201,168,76,0.3)', textTransform: 'uppercase' }}>
            Trusted by the world&apos;s most demanding individuals.
          </span>
        </div>
      </div>
    </footer>
  )
}