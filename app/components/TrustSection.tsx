'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ShieldCheck, Lock, Star, Eye, Clock, CreditCard } from 'lucide-react'
import { useRef } from 'react'
import Image from 'next/image'

const trustPoints = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-[#C9A84C]" />,
    title: '100% Background Verified',
    desc: 'Every professional undergoes rigorous credential checks and background verification before joining.',
  },
  {
    icon: <Lock className="w-8 h-8 text-[#C9A84C]" />,
    title: 'NDA on Every Engagement',
    desc: 'Your privacy is sacred. Every professional signs a strict NDA before they meet you.',
  },
  {
    icon: <Star className="w-8 h-8 text-[#C9A84C]" />,
    title: '5-Star Client Reviews',
    desc: 'We maintain a 4.9/5 rating across all categories — mediocrity is never acceptable.',
  },
  {
    icon: <Eye className="w-8 h-8 text-[#C9A84C]" />,
    title: 'Anonymous Review Option',
    desc: 'Your identity stays yours. Leave reviews under "CEO, Fortune 500" — privacy guaranteed.',
  },
  {
    icon: <Clock className="w-8 h-8 text-[#C9A84C]" />,
    title: '24/7 Client Protection',
    desc: 'Our dedicated client support team is available around the clock. Always.',
  },
  {
    icon: <CreditCard className="w-8 h-8 text-[#C9A84C]" />,
    title: 'Secure Encrypted Payments',
    desc: 'Bank-grade encryption on all transactions. Your money, fully protected.',
  },
]

const testimonials = [
  {
    quote: 'Within 24 hours of joining Elite plan, I had a world-class consultant at my door. No platform compares.',
    from: 'CEO, Global Technology Firm',
  },
  {
    quote: 'I have used every executive service in existence. ATLAS is the only one that truly understands what excellence means.',
    from: 'Serial Entrepreneur, Forbes List',
  },
  {
    quote: 'The professionals here are exceptional. My personal mentor and communication coach have transformed my career.',
    from: 'COO, Fortune 500 Company',
  },
]

export default function TrustSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['5%', '-5%'])

  return (
    <section ref={ref} id="trust" className="relative py-28 overflow-hidden">
      {/* Cinematic Background */}
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <Image
          src="/eye.jpg.jpeg"
          alt="Trust Background"
          fill
          className="object-cover object-center"
          quality={90}
        />
        <div className="absolute inset-0 bg-[#0A0A0A]/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.06),transparent_70%)]" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.div className="h-px bg-[#C9A84C]/50"
              initial={{ width: 0 }} whileInView={{ width: 48 }} viewport={{ once: true }} transition={{ duration: 1 }} />
            <span className="text-xs tracking-[0.4em] text-[#C9A84C] uppercase">Trust & Credibility</span>
            <motion.div className="h-px bg-[#C9A84C]/50"
              initial={{ width: 0 }} whileInView={{ width: 48 }} viewport={{ once: true }} transition={{ duration: 1 }} />
          </div>
          <h2 className="text-5xl md:text-7xl font-playfair font-black gold-text mb-6">
            Why Trust Us
          </h2>
          <p className="text-[#E5E4E2]/60 text-lg max-w-xl mx-auto">
            Elite clients do not trust easily. We earn it — through verification, privacy, and relentless excellence.
          </p>
        </motion.div>

        {/* Trust Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {trustPoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 50, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: (index % 3) * 0.15 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-card rounded-2xl p-8 group relative overflow-hidden"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Top shine */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />

              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#C9A84C]/0 to-transparent group-hover:from-[#C9A84C]/5 transition-all duration-500 rounded-2xl" />

              <div className="mb-5 p-3 inline-block border border-[#C9A84C]/20 rounded-xl bg-[#C9A84C]/5 relative z-10 group-hover:border-[#C9A84C]/50 transition-colors duration-300">
                {point.icon}
              </div>
              <h3 className="text-xl font-playfair font-bold text-white mb-3 group-hover:text-[#C9A84C] transition-colors duration-300 relative z-10">
                {point.title}
              </h3>
              <p className="text-[#E5E4E2]/50 text-sm leading-relaxed relative z-10">{point.desc}</p>

              {/* Bottom line */}
              <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent transition-all duration-700" />
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-playfair font-bold text-white">
            Voices from the <span className="gold-text">Elite</span>
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, x: i === 0 ? -30 : i === 2 ? 30 : 0 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              whileHover={{ y: -5 }}
              className="glass-card rounded-2xl p-8 border-l-2 border-l-[#C9A84C]/40 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#C9A84C]/3 rounded-full blur-2xl group-hover:bg-[#C9A84C]/8 transition-all duration-500" />
              <div className="text-[#C9A84C]/30 text-6xl font-playfair leading-none mb-4">&ldquo;</div>
              <p className="text-[#E5E4E2]/65 text-sm leading-relaxed italic mb-6 font-cormorant text-lg">
                {t.quote}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-[#C9A84C]/40" />
                <span className="text-xs tracking-widest text-[#C9A84C]/60 uppercase">{t.from}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}