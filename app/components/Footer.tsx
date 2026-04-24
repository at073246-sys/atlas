'use client'
import { motion } from 'framer-motion'
import { Mail, Phone } from 'lucide-react'

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
    <footer className="pt-20 pb-10 relative overflow-hidden bg-[#0A0A0A]">
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
            Your World, Our Promises.
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

        <div className="flex justify-center gap-6 mb-12">
          <a href="mailto:atlasofficial2090@gmail.com"
            className="w-12 h-12 border border-[#C9A84C]/20 flex items-center justify-center text-[#E5E4E2]/40 hover:text-[#C9A84C] hover:border-[#C9A84C]/50 transition-all duration-300 rounded-full">
            <Mail className="w-5 h-5" />
          </a>
          <a href="https://wa.me/917550124573" target="_blank" rel="noopener noreferrer"
            className="w-12 h-12 border border-[#C9A84C]/20 flex items-center justify-center text-[#E5E4E2]/40 hover:text-[#C9A84C] hover:border-[#C9A84C]/50 transition-all duration-300 rounded-full">
            <Phone className="w-5 h-5" />
          </a>
        </div>

        <div className="text-center mb-12">
          <p className="text-sm text-[#E5E4E2]/30 italic tracking-widest">
            "Trusted by the world&apos;s most demanding individuals."
          </p>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent mb-8 opacity-20" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] tracking-widest text-[#E5E4E2]/20 uppercase">
          <span>&copy; 2024 ATLAS. All rights reserved.</span>
          <span className="text-[#C9A84C]/40">Your World, Our Promises.</span>
          <span>Privacy · Security · Excellence</span>
        </div>
      </div>
    </footer>
  )
}
