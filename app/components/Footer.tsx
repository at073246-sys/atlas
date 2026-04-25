'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { Mail, Globe, Instagram, Linkedin } from 'lucide-react'

const links = [
  { label: 'About', href: '#' },
  { label: 'Services', href: '#services' },
  { label: 'Membership', href: '#membership' },
  { label: 'Join As Talent', href: '#join' },
  { label: 'Privacy', href: '#' },
  { label: 'Contact', href: '#' },
]

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['5%', '-5%'])

  return (
    <footer ref={ref} className="relative pt-20 pb-10 overflow-hidden">
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <Image src="/peg.jpg.jpeg" alt="Footer" fill className="object-cover object-center" quality={90} />
        <div className="absolute inset-0 bg-[#0A0A0A]/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(201,168,76,0.05),transparent_80%)]" />
      </motion.div>

      {/* floating particles */}
      <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#C9A84C]"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, opacity: Math.random() * 0.4 }}
            animate={{ y: [0, -50, 0], opacity: [0.1, 0.5, 0.1] }}
            transition={{ duration: Math.random() * 5 + 4, repeat: Infinity, delay: Math.random() * 5 }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h3 className="text-5xl md:text-6xl font-playfair font-black gold-text mb-3">ATLAS</h3>
          <p className="text-xl text-[#E5E4E2]/50 italic tracking-[0.2em]">Your World, Our Promise.</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-12">
          {links.map(link => (
            <a key={link.label} href={link.href} className="text-xs tracking-widest text-[#E5E4E2]/40 uppercase hover:text-[#C9A84C] transition-colors duration-300">{link.label}</a>
          ))}
        </div>

        <div className="flex justify-center gap-4 mb-12">
          {[<Globe />, <Instagram />, <Linkedin />, <Mail />].map((icon, i) => (
            <a key={i} href="#" className="w-10 h-10 border border-[#C9A84C]/20 flex items-center justify-center text-[#E5E4E2]/40 hover:text-[#C9A84C] hover:border-[#C9A84C]/50 transition-all duration-300 rounded-full">
              {icon}
            </a>
          ))}
        </div>

        <div className="section-divider my-8" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs tracking-widest text-[#E5E4E2]/20 uppercase">
          <span>© 2025 ATLAS. All rights reserved.</span>
          <span className="text-[#C9A84C]/40">Trusted by the world's most demanding individuals.</span>
          <span>Privacy · Security · Excellence</span>
        </div>
      </div>
    </footer>
  )
}