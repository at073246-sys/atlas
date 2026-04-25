'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { Search, UserCheck, CreditCard, Sparkles } from 'lucide-react'

const steps = [
  { number: '01', icon: <Search className="w-7 h-7 text-[#0A0A0A]" />, title: 'Choose Your Need', desc: 'Browse curated categories. Tell us exactly what you need.' },
  { number: '02', icon: <UserCheck className="w-7 h-7 text-[#0A0A0A]" />, title: 'Pick Your Professional', desc: 'Browse verified profiles, portfolios and availability.' },
  { number: '03', icon: <CreditCard className="w-7 h-7 text-[#0A0A0A]" />, title: 'One Payment', desc: 'Book, pay securely, and they arrive. No hidden fees.' },
  { number: '04', icon: <Sparkles className="w-7 h-7 text-[#0A0A0A]" />, title: 'Experience Excellence', desc: 'Sit back – your professional is on the way.' },
]

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['5%', '-5%'])

  return (
    <section ref={ref} className="relative py-28 overflow-hidden">
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <Image src="/watch.jpg.jpeg" alt="Time & Precision" fill className="object-cover object-center" quality={90} />
        <div className="absolute inset-0 bg-[#0A0A0A]/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.06),transparent_70%)]" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.div className="h-px bg-[#C9A84C]/50" initial={{ width: 0 }} whileInView={{ width: 48 }} viewport={{ once: true }} transition={{ duration: 1 }} />
            <span className="text-xs tracking-[0.4em] text-[#C9A84C] uppercase">How It Works</span>
            <motion.div className="h-px bg-[#C9A84C]/50" initial={{ width: 0 }} whileInView={{ width: 48 }} viewport={{ once: true }} transition={{ duration: 1 }} />
          </div>
          <h2 className="text-5xl md:text-7xl font-playfair font-black text-white mb-6">Simple.<br /><span className="gold-text">Fast. Elite.</span></h2>
          <p className="text-[#E5E4E2]/60 text-lg max-w-xl mx-auto">Four steps stand between you and world‑class service.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {steps.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 60, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="flex flex-col items-center text-center group glass-card rounded-2xl p-6"
            >
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#F0D080] flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-gold">
                  {step.icon}
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#0A0A0A] border border-[#C9A84C]/40 flex items-center justify-center">
                  <span className="text-[10px] font-black text-[#C9A84C]">{step.number}</span>
                </div>
              </div>
              <h3 className="text-xl font-playfair font-bold text-white mb-3 group-hover:text-[#C9A84C] transition-colors">{step.title}</h3>
              <p className="text-[#E5E4E2]/50 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mt-16">
          <a href="#membership" className="gold-button inline-flex items-center gap-3">Begin Your Journey</a>
        </motion.div>
      </div>
    </section>
  )
}