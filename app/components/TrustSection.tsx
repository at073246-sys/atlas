'use client'
import { motion } from 'framer-motion'
import { ShieldCheck, Lock, Star, Eye, Clock, CreditCard } from 'lucide-react'

const trustPoints = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-[#C9A84C]" />,
    title: 'Background Verified',
    desc: 'Every professional undergoes rigorous background and credential verification before joining.',
  },
  {
    icon: <Lock className="w-8 h-8 text-[#C9A84C]" />,
    title: 'NDA Protection',
    desc: 'Absolute privacy for every engagement. Non-disclosure agreements are standard on our platform.',
  },
  {
    icon: <CreditCard className="w-8 h-8 text-[#C9A84C]" />,
    title: 'Secure Payments',
    desc: 'Bank-grade encryption on all transactions. Your financial security is our top priority.',
  },
  {
    icon: <Star className="w-8 h-8 text-[#C9A84C]" />,
    title: 'Elite Reviews',
    desc: 'Real feedback from our world-class clients. Anonymous reviews available on request.',
  },
  {
    icon: <Clock className="w-8 h-8 text-[#C9A84C]" />,
    title: '24/7 Protection',
    desc: 'Round-the-clock client support and dispute resolution for every booking.',
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-[#C9A84C]" />,
    title: 'Certified Talent',
    desc: 'We only partner with recognized institutions and certified world-class professionals.',
  },
]

const testimonials = [
  {
    quote: 'Within 24 hours of joining Elite plan, I had a world-class consultant at my door. No platform compares.',
    from: 'CEO, Global Technology Firm',
  },
  {
    quote: 'I have used every executive service in existence. Elite Talent is the only one that truly understands.',
    from: 'Serial Entrepreneur, Forbes List',
  },
  {
    quote: 'The professionals here are exceptional. My personal chef and fitness trainer have transformed my life.',
    from: 'COO, Fortune 500 Company',
  },
]

export default function TrustSection() {
  return (
    <section id="trust" className="py-28 relative overflow-hidden">

      {/* Floating Crown — right side background */}
      <motion.div
        animate={{ y: [-20, 20, -20], rotate: [-3, 3, -3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -right-32 top-10 w-[500px] h-[500px] pointer-events-none z-0"
        style={{ opacity: 0.15 }}
      >
        <img
          src="/king.jpg"
          alt=""
          className="w-full h-full object-cover rounded-full"
          style={{
            filter: 'brightness(0.6) saturate(1.2)',
            mixBlendMode: 'screen',
          }}
        />
      </motion.div>

      {/* Right vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_100%_at_100%_0%,transparent_20%,#0A0A0A_70%)] pointer-events-none z-[1]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-[#C9A84C]/50" />
            <span className="text-xs tracking-[0.4em] text-[#C9A84C] uppercase">Trust & Credibility</span>
            <div className="h-px w-12 bg-[#C9A84C]/50" />
          </div>
          <h2 className="text-5xl md:text-7xl font-playfair font-black bg-gradient-to-r from-[#C9A84C] to-[#F0D080] bg-clip-text text-transparent mb-6">
            Why Trust Us
          </h2>
          <p className="text-[#E5E4E2]/60 text-lg max-w-xl mx-auto">
            Elite clients do not trust easily. We earn it — through verification, privacy, and relentless excellence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {trustPoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
              className="bg-gradient-to-br from-[#0A0A0A]/85 to-[#0D1B2A]/85 border border-[#C9A84C]/20 shadow-2xl rounded-2xl p-8 group hover:-translate-y-1 transition-all duration-300"
            >
              <div className="mb-5 p-3 inline-block border border-[#C9A84C]/20 rounded-xl bg-[#C9A84C]/5">
                {point.icon}
              </div>
              <h3 className="text-xl font-playfair font-bold text-white mb-3 group-hover:text-[#C9A84C] transition-colors duration-300">
                {point.title}
              </h3>
              <p className="text-[#E5E4E2]/60 text-sm leading-relaxed">{point.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mb-12">
          <h3 className="text-2xl font-playfair font-bold text-white">Voices from the Elite</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-gradient-to-br from-[#0A0A0A]/85 to-[#0D1B2A]/85 border border-[#C9A84C]/20 shadow-2xl rounded-2xl p-8 border-l-2 border-l-[#C9A84C]/40"
            >
              <div className="text-[#C9A84C]/40 text-5xl font-playfair leading-none mb-4">&ldquo;</div>
              <p className="text-[#E5E4E2]/70 text-sm leading-relaxed italic mb-6">{t.quote}</p>
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