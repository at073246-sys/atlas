'use client'
import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'

const links = [
  { label: 'About', href: '#' },
  { label: 'Services', href: '#services' },
  { label: 'Membership', href: '#membership' },
  { label: 'Join As Talent', href: '#join' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Contact', href: '#' },
]

export default function Footer() {
  return (
    <footer className="pt-20 pb-10 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="text-5xl md:text-6xl font-playfair font-black bg-gradient-to-r from-[#C9A84C] to-[#F0D080] bg-clip-text text-transparent mb-3">
            ATLAS
          </h3>
          <p className="text-xl text-[#E5E4E2]/50 italic tracking-[0.2em]">
            Your World, Our Promise.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-12">
          {links.map((link) => (
            <a key={link.label} href={link.href}
              className="text-xs tracking-widest text-[#E5E4E2]/40 uppercase hover:text-[#C9A84C] transition-colors duration-300">
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex justify-center gap-4 mb-12">
          <a href="mailto:contact@atlas.com"
            className="w-10 h-10 border border-[#C9A84C]/20 flex items-center justify-center text-[#E5E4E2]/40 hover:text-[#C9A84C] transition-all duration-300">
            <Mail className="w-4 h-4" />
          </a>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs tracking-widest text-[#E5E4E2]/20 uppercase">
          <span>2024 Atlas. All rights reserved.</span>
          <span className="text-[#C9A84C]/40">Your World, Our Promise.</span>
          <span>Privacy · Security · Excellence</span>
        </div>
      </div>
    </footer>
  )
}
