'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ShieldCheck, Lock, Star } from 'lucide-react'
import Image from 'next/image'

const badges = [
  { icon: <ShieldCheck className="w-5 h-5" />, label: 'Background Verified' },
  { icon: <Lock className="w-5 h-5" />, label: 'NDA Protected' },
  { icon: <Star className="w-5 h-5" />, label: 'Elite Rated' },
]

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['10%', '-10%'])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Cinematic Background */}
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <Image
          src="/globe.jpg.jpeg"
          alt="Globe"
          fill
          className="object-cover object-center"
          quality={90}
        />
        <div className="absolute inset-0 bg-[#0A0A0A]/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.08),transparent_70%)]" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="container mx-auto px-6 relative z-10"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.div
              className="h-px bg-[#C9A84C]/50"
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            />
            <span className="text-xs tracking-[0.4em] text-[#C9A84C] uppercase">Who We Are</span>
            <motion.div
              className="h-px bg-[#C9A84C]/50"
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            />
          </div>

          <h2 className="text-5xl md:text-7xl font-playfair font-black text-white mb-6 leading-tight">
            We Don&apos;t Sell Products.
            <br />
            <span className="gold-text">We Deliver People.</span>
          </h2>
          <p className="text-[#E5E4E2]/60 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            ATLAS connects you with the right professional — verified, elite, and ready on demand.
            Your exact need. Your exact time. Zero compromise.
          </p>
        </motion.div>

        {/* 3D Floating Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
          {[
            { icon: '🌍', title: 'Global Reach', desc: 'Professionals from across the world, at your service' },
            { icon: '⚡', title: 'On Demand', desc: 'Request a professional and get matched within hours' },
            { icon: '💎', title: 'Elite Only', desc: 'Every professional is handpicked and verified by our team' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 60, rotateX: 20 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              whileHover={{ y: -10, rotateX: 5, scale: 1.02 }}
              className="glass-card rounded-2xl p-8 text-center relative overflow-hidden group"
              style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
            >
              {/* Gold shimmer on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#C9A84C]/0 to-[#C9A84C]/0 group-hover:from-[#C9A84C]/5 group-hover:to-transparent transition-all duration-500 rounded-2xl" />

              <div className="text-5xl mb-5 float-animation" style={{ animationDelay: `${i * 0.5}s` }}>
                {item.icon}
              </div>
              <h3 className="text-xl font-playfair font-bold text-white mb-3 group-hover:text-[#C9A84C] transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-[#E5E4E2]/50 text-sm leading-relaxed">{item.desc}</p>

              {/* Bottom gold line */}
              <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent transition-all duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {badges.map((badge, i) => (
            <motion.div
              key={badge.label}
              whileHover={{ scale: 1.05, y: -3 }}
              className="flex items-center gap-2 px-5 py-3 border border-[#C9A84C]/20 rounded-full text-[#C9A84C] text-sm tracking-wide glass-card"
            >
              {badge.icon}
              <span>{badge.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}