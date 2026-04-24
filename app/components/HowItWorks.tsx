'use client'
import { motion } from 'framer-motion'
import { Search, UserCheck, CreditCard, Sparkles } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: <Search className="w-7 h-7 text-[#0A0A0A]" />,
    title: 'Choose Your Need',
    desc: 'Browse categories and find your service. Tell us exactly what you need.',
  },
  {
    number: '02',
    icon: <UserCheck className="w-7 h-7 text-[#0A0A0A]" />,
    title: 'Pick Your Professional',
    desc: 'View portfolios, fees, and availability. Choose the elite talent that fits your vision.',
  },
  {
    number: '03',
    icon: <CreditCard className="w-7 h-7 text-[#0A0A0A]" />,
    title: 'One Payment, Full Access',
    desc: 'Book, pay, and they arrive. Simple, seamless, and absolutely professional.',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-28 relative overflow-hidden">

      {/* Clock — left side, very slow rotation like time passing */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
        className="absolute -left-20 md:-left-48 top-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[550px] md:h-[550px] pointer-events-none z-0 opacity-25 md:opacity-12"
      >
        <img
          src="/watch.jpg.jpeg"
          alt=""
          className="w-full h-full object-cover rounded-full"
          style={{
            filter: 'brightness(0.6) saturate(0.8) hue-rotate(180deg)',
            mixBlendMode: 'screen',
          }}
        />
      </motion.div>

      {/* Left vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_100%_at_0%_50%,transparent_20%,#0A0A0A_75%)] pointer-events-none z-[1]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-[#C9A84C]/50" />
            <span className="text-xs tracking-[0.4em] text-[#C9A84C] uppercase">How It Works</span>
            <div className="h-px w-12 bg-[#C9A84C]/50" />
          </div>
          <h2 className="text-5xl md:text-7xl font-playfair font-black text-white mb-6">
            Simple.<br />
            <span className="bg-gradient-to-r from-[#C9A84C] to-[#F0D080] bg-clip-text text-transparent">Fast. Elite.</span>
          </h2>
          <p className="text-[#E5E4E2]/60 text-lg max-w-xl mx-auto">
            Four steps stand between you and world-class service.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="relative mb-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#F0D080] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_0_30px_rgba(201,168,76,0.3)]">
                  {step.icon}
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#0A0A0A] border border-[#C9A84C]/40 flex items-center justify-center">
                  <span className="text-[10px] font-black text-[#C9A84C]">{step.number}</span>
                </div>
              </div>
              <h3 className="text-xl font-playfair font-bold text-white mb-3 group-hover:text-[#C9A84C] transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-[#E5E4E2]/50 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-20"
        >
          <a href="#membership" className="relative overflow-hidden bg-gradient-to-r from-[#C9A84C] to-[#F0D080] text-[#0A0A0A] font-bold px-8 py-4 uppercase tracking-widest text-sm transition-all duration-300 hover:scale-105 inline-flex items-center gap-3">
            Begin Your Journey
          </a>
          <p className="text-xs text-[#E5E4E2]/30 mt-4 tracking-widest uppercase">
            No waiting. No complexity. Just excellence.
          </p>
        </motion.div>
      </div>
    </section>
  )
}