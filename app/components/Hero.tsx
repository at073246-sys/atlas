'use client'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import HeroGlobe from './HeroGlobe'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[#0A0A0A]" />
      <HeroGlobe />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(13,27,42,0.9),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(201,168,76,0.06),transparent_50%)]" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Top Nav */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute top-8 w-full flex justify-between items-center px-8 md:px-16"
      >
        <div className="text-xs tracking-[0.3em] text-[#C9A84C] uppercase font-light">Est. 2024</div>
        <div className="hidden md:flex gap-8 text-xs tracking-widest text-[#E5E4E2]/50 uppercase">
          <a href="#services" className="hover:text-[#C9A84C] transition-colors duration-300">Services</a>
          <a href="#membership" className="hover:text-[#C9A84C] transition-colors duration-300">Membership</a>
          <a href="#trust" className="hover:text-[#C9A84C] transition-colors duration-300">Why Us</a>
          <a href="#join" className="hover:text-[#C9A84C] transition-colors duration-300">Join As Talent</a>
        </div>
        <div className="text-xs tracking-[0.3em] text-[#E5E4E2]/40 uppercase font-light">Private. Verified. Elite.</div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#C9A84C]" />
          <span className="text-xs tracking-[0.5em] text-[#C9A84C] uppercase font-light">
            The World&apos;s Most Exclusive Talent Platform
          </span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#C9A84C]" />
        </motion.div>

        {/* ATLAS Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="relative z-10 mb-8"
        >
          <h1 className="text-7xl md:text-9xl font-playfair font-black tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-b from-[#E5E4E2] via-[#C9A84C] to-[#8A6D3B] drop-shadow-[0_0_50px_rgba(201,168,76,0.3)]">
            ATLAS
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="text-2xl md:text-4xl font-light text-[#E5E4E2]/70 tracking-[0.2em] mb-16 italic"
        >
          Your World, Our Promises.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a href="#services" className="relative overflow-hidden bg-gradient-to-r from-[#C9A84C] to-[#F0D080] text-[#0A0A0A] font-bold px-8 py-4 uppercase tracking-widest text-sm transition-all duration-300 hover:scale-105 flex items-center gap-3 group">
            Explore Our World
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
          <a href="#join" className="px-8 py-4 border border-[#C9A84C]/30 text-[#C9A84C] text-sm tracking-widest uppercase hover:bg-[#C9A84C]/5 transition-all duration-300">
            Join As Talent
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-[0.3em] text-[#E5E4E2]/30 uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown className="w-4 h-4 text-[#C9A84C]/50" />
        </motion.div>
      </motion.div>
    </section>
  )
}