'use client'
import { motion } from 'framer-motion'
import { ShieldCheck, Lock, CheckCircle, Shield } from 'lucide-react'

const badges = [
  { icon: <CheckCircle className="w-5 h-5" />, label: 'Verified Professionals' },
  { icon: <Lock className="w-5 h-5" />, label: 'NDA Protected' },
  { icon: <Shield className="w-5 h-5" />, label: 'Secure Platform' },
]

export default function StatsSection() {
  return (
    <section className="py-28 relative overflow-hidden">

      {/* Spinning Vinyl Record — blended 3D background */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        className="absolute -right-20 md:-right-40 top-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] pointer-events-none z-0 opacity-30 md:opacity-18"
      >
        <img
          src="/music.jpg.jpeg"
          alt=""
          className="w-full h-full object-cover rounded-full"
          style={{
            filter: 'brightness(0.8) saturate(1.4) sepia(0.2)',
            mixBlendMode: 'screen',
          }}
        />
      </motion.div>

      {/* Soft vignette so vinyl fades into background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_100%_at_100%_50%,transparent_30%,#0A0A0A_80%)] pointer-events-none z-[1]" />

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
            <span className="text-xs tracking-[0.4em] text-[#C9A84C] uppercase">The Concept</span>
            <div className="h-px w-12 bg-[#C9A84C]/50" />
          </div>
          <h2 className="text-4xl md:text-6xl font-playfair font-black text-white mb-6">
            We don't sell products.
            <br />
            <span className="bg-gradient-to-r from-[#C9A84C] to-[#F0D080] bg-clip-text text-transparent">
              We deliver people.
            </span>
          </h2>
          <p className="text-[#E5E4E2]/60 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            The right professional, for your exact need, at your exact time.
            Experience the future of elite human talent.
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
              className="flex items-center gap-2 px-6 py-3 border border-[#C9A84C]/20 bg-[#0D1B2A]/30 backdrop-blur-sm rounded-full text-[#C9A84C] text-sm tracking-wide"
            >
              {badge.icon}
              <span className="font-medium">{badge.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}