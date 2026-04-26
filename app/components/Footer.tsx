'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Mail } from 'lucide-react'
import { useRef } from 'react'
import Image from 'next/image'

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

  return (
    <footer ref={ref} className="relative pt-20 pb-10 overflow-hidden">
      {/* Cinematic Background */}
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <Image
          src="/peg.jpg.jpeg"
          alt="Footer Background"
          fill
          className="object-cover object-center"
          quality={90}
        />
        <div className="absolute inset-0 bg-[#0A0A0A]/92" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,168,76,0.05),transparent_60%)]" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Logo & Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Logo */}
          <motion.div
            className="flex justify-center mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[#C9A84C]/10 blur-2xl rounded-full scale-150" />
              <Image
                src="/logo.png"
                alt="ATLAS Logo"
                width={120}
                height={120}
                className="object-contain relative z-10"
              />
            </div>
          </motion.div>

          <h3 className="text-4xl md:text-5xl font-playfair font-black gold-text mb-3">
            ATLAS
          </h3>
          <p className="text-xl text-[#E5E4E2]/40 italic tracking-[0.2em] font-cormorant">
            &ldquo;Your World, Our Promise.&rdquo;
          </p>
        </motion.div>

        {/* Nav Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-12"
        >
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -2, color: '#C9A84C' }}
              className="text-xs tracking-widest text-[#E5E4E2]/30 uppercase hover:text-[#C9A84C] transition-colors duration-300"
            >
              {link.label}
            </motion.a>
          ))}
        </motion.div>

        {/* Social */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4 mb-12"
        >
          <motion.a
            href="mailto:atlasofficial2090@gmail.com"
            whileHover={{ scale: 1.1, y: -3 }}
            className="w-10 h-10 border border-[#C9A84C]/20 flex items-center justify-center text-[#E5E4E2]/30 hover:text-[#C9A84C] hover:border-[#C9A84C]/50 transition-all duration-300 glass-card rounded-xl"
          >
            <Mail className="w-4 h-4" />
          </motion.a>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="h-px mb-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          style={{ background: 'linear-gradient(to right, transparent, #C9A84C, transparent)' }}
        />

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs tracking-widest text-[#E5E4E2]/15 uppercase"
        >
          <span>© 2024 Atlas. All rights reserved.</span>
          <span className="text-[#C9A84C]/30">Trusted by the world&apos;s most demanding individuals.</span>
          <span>Privacy · Security · Excellence</span>
        </motion.div>
      </div>
    </footer>
  )
}