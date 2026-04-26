'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ShieldCheck, Lock, Star } from 'lucide-react'
import Image from 'next/image'

const badges = [
  { icon: <ShieldCheck className="w-4 h-4 md:w-5 md:h-5" />, label: 'Background Verified' },
  { icon: <Lock className="w-4 h-4 md:w-5 md:h-5" />, label: 'NDA Protected' },
  { icon: <Star className="w-4 h-4 md:w-5 md:h-5" />, label: 'Elite Rated' },
]

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['8%', '-8%'])
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05])

  return (
    <section ref={ref} className="relative py-20 md:py-32 overflow-hidden">
      {/* 3D Motion Background */}
      <motion.div className="absolute inset-0 z-0" style={{ y, scale: imageScale }}>
        <Image src="/globe.jpg.jpeg" alt="Globe" fill className="object-cover object-center" quality={90} />
        <div className="absolute inset-0 bg-[#0A0A0A]/82" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.08),transparent_70%)]" />
      </motion.div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-12 md:mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.div className="h-px bg-[#C9A84C]/50"
              initial={{ width: 0 }} whileInView={{ width: 40 }} viewport={{ once: true }} transition={{ duration: 1 }} />
            <span className="text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.4em] text-[#C9A84C] uppercase">Who We Are</span>
            <motion.div className="h-px bg-[#C9A84C]/50"
              initial={{ width: 0 }} whileInView={{ width: 40 }} viewport={{ once: true }} transition={{ duration: 1 }} />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-6xl font-playfair font-black text-white mb-4 md:mb-6 leading-tight">
            We Don&apos;t Sell Products.
            <br />
            <span className="gold-text">We Deliver People.</span>
          </h2>
          <p className="text-[#E5E4E2]/60 text-sm md:text-lg max-w-2xl mx-auto font-light leading-relaxed px-4">
            ATLAS connects you with the right professional — verified, elite, and ready on demand. Your exact need. Your exact time. Zero compromise.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 mb-10 md:mb-16 max-w-4xl mx-auto">
          {[
            { icon: '🌍', title: 'Global Reach', desc: 'Professionals from across the world, at your service' },
            { icon: '⚡', title: 'On Demand', desc: 'Request a professional and get matched within hours' },
            { icon: '💎', title: 'Elite Only', desc: 'Every professional is handpicked and verified by our team' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-card rounded-2xl p-6 md:p-8 text-center relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#C9A84C]/0 to-[#C9A84C]/0 group-hover:from-[#C9A84C]/5 transition-all duration-500 rounded-2xl" />
              <div className="text-3xl md:text-5xl mb-4 md:mb-5 float-animation" style={{ animationDelay: `${i * 0.5}s` }}>
                {item.icon}
              </div>
              <h3 className="text-lg md:text-xl font-playfair font-bold text-white mb-2 md:mb-3 group-hover:text-[#C9A84C] transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-[#E5E4E2]/50 text-xs md:text-sm leading-relaxed">{item.desc}</p>
              <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent transition-all duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 md:gap-4"
        >
          {badges.map((badge) => (
            <motion.div
              key={badge.label}
              whileHover={{ scale: 1.05, y: -3 }}
              className="flex items-center gap-2 px-4 py-2 border border-[#C9A84C]/20 rounded-full text-[#C9A84C] text-xs md:text-sm tracking-wide glass-card"
            >
              {badge.icon}
              <span>{badge.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}