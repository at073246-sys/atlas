'use client'
import { motion } from 'framer-motion'
import { ShieldCheck, Lock, Star } from 'lucide-react'

const badges = [
  { icon: <ShieldCheck className="w-5 h-5" />, label: 'Background Verified' },
  { icon: <Lock className="w-5 h-5" />, label: 'NDA Protected' },
  { icon: <Star className="w-5 h-5" />, label: 'Elite Rated' },
]

export default function StatsSection() {
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-[#C9A84C]/50" />
            <span className="text-xs tracking-[0.4em] text-[#C9A84C] uppercase">Who We Are</span>
            <div className="h-px w-12 bg-[#C9A84C]/50" />
          </div>
          <h2 className="text-4xl md:text-6xl font-playfair font-black text-white mb-6">
            We Don&apos;t Sell Products.
            <br />
            <span className="bg-gradient-to-r from-[#C9A84C] to-[#F0D080] bg-clip-text text-transparent">
              We Deliver People.
            </span>
          </h2>
          <p className="text-[#E5E4E2]/60 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            ATLAS connects you with the right professional — verified, elite, and ready on demand.
            Your exact need. Your exact time. Zero compromise.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-6"
        >
          {badges.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-2 px-5 py-2 border border-[#C9A84C]/20 rounded-full text-[#C9A84C] text-sm tracking-wide"
            >
              {badge.icon}
              <span>{badge.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}