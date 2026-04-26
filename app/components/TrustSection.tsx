'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ShieldCheck, Lock, Star, Eye, Clock, CreditCard } from 'lucide-react'
import { useRef } from 'react'
import Image from 'next/image'

const trustPoints = [
  { icon: <ShieldCheck className="w-6 h-6 md:w-8 md:h-8 text-[#C9A84C]" />, title: '100% Background Verified', desc: 'Every professional undergoes rigorous credential checks and background verification before joining.' },
  { icon: <Lock className="w-6 h-6 md:w-8 md:h-8 text-[#C9A84C]" />, title: 'NDA on Every Engagement', desc: 'Your privacy is sacred. Every professional signs a strict NDA before they meet you.' },
  { icon: <Star className="w-6 h-6 md:w-8 md:h-8 text-[#C9A84C]" />, title: '5-Star Client Reviews', desc: 'We maintain a 4.9/5 rating across all categories — mediocrity is never acceptable.' },
  { icon: <Eye className="w-6 h-6 md:w-8 md:h-8 text-[#C9A84C]" />, title: 'Anonymous Review Option', desc: 'Your identity stays yours. Leave reviews under "CEO, Fortune 500" — privacy guaranteed.' },
  { icon: <Clock className="w-6 h-6 md:w-8 md:h-8 text-[#C9A84C]" />, title: '24/7 Client Protection', desc: 'Our dedicated client support team is available around the clock. Always.' },
  { icon: <CreditCard className="w-6 h-6 md:w-8 md:h-8 text-[#C9A84C]" />, title: 'Secure Encrypted Payments', desc: 'Bank-grade encryption on all transactions. Your money, fully protected.' },
]

const testimonials = [
  { quote: 'Within 24 hours of joining Elite plan, I had a world-class consultant at my door. No platform compares.', from: 'CEO, Global Technology Firm' },
  { quote: 'I have used every executive service in existence. ATLAS is the only one that truly understands what excellence means.', from: 'Serial Entrepreneur, Forbes List' },
  { quote: 'The professionals here are exceptional. My personal mentor and communication coach have transformed my career.', from: 'COO, Fortune 500 Company' },
]

export default function TrustSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['8%', '-8%'])
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05])

  return (
    <section ref={ref} id="trust" className="relative py-20 md:py-28 overflow-hidden">
      {/* 3D Motion Background */}
      <motion.div className="absolute inset-0 z-0" style={{ y, scale: imageScale }}>
        <Image src="/eye.jpg.jpeg" alt="Trust Background" fill className="object-cover object-center" quality={90} />
        <div className="absolute inset-0 bg-[#0A0A0A]/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.06),transparent_70%)]" />
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
            <span className="text-[10px] md:text-xs tracking-[0.3em] text-[#C9A84C] uppercase">Trust & Credibility</span>
            <motion.div className="h-px bg-[#C9A84C]/50"
              initial={{ width: 0 }} whileInView={{ width: 40 }} viewport={{ once: true }} transition={{ duration: 1 }} />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-playfair font-black gold-text mb-4 md:mb-6">
            Why Trust Us
          </h2>
          <p className="text-[#E5E4E2]/60 text-sm md:text-lg max-w-xl mx-auto px-4">
            Elite clients do not trust easily. We earn it — through verification, privacy, and relentless excellence.
          </p>
        </motion.div>

        {/* Trust Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-24">
          {trustPoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: (index % 3) * 0.15 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-card rounded-2xl p-5 md:p-8 group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#C9A84C]/0 to-transparent group-hover:from-[#C9A84C]/5 transition-all duration-500 rounded-2xl" />
              <div className="mb-4 md:mb-5 p-2 md:p-3 inline-block border border-[#C9A84C]/20 rounded-xl bg-[#C9A84C]/5 relative z-10 group-hover:border-[#C9A84C]/50 transition-colors duration-300">
                {point.icon}
              </div>
              <h3 className="text-base md:text-xl font-playfair font-bold text-white mb-2 md:mb-3 group-hover:text-[#C9A84C] transition-colors duration-300 relative z-10">
                {point.title}
              </h3>
              <p className="text-[#E5E4E2]/50 text-xs md:text-sm leading-relaxed relative z-10">{point.desc}</p>
              <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent transition-all duration-700" />
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8 md:mb-12">
          <h3 className="text-xl md:text-3xl font-playfair font-bold text-white">
            Voices from the <span className="gold-text">Elite</span>
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              whileHover={{ y: -5 }}
              className="glass-card rounded-2xl p-5 md:p-8 border-l-2 border-l-[#C9A84C]/40 relative overflow-hidden group"
            >
              <div className="text-[#C9A84C]/30 text-4xl md:text-6xl font-playfair leading-none mb-3 md:mb-4">&ldquo;</div>
              <p className="text-[#E5E4E2]/65 text-xs md:text-sm leading-relaxed italic mb-4 md:mb-6">{t.quote}</p>
              <div className="flex items-center gap-3">
                <div className="w-6 md:w-8 h-px bg-[#C9A84C]/40" />
                <span className="text-[10px] tracking-widest text-[#C9A84C]/60 uppercase">{t.from}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}