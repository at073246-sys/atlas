'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Search, UserCheck, CreditCard, Sparkles } from 'lucide-react'
import { useRef } from 'react'
import Image from 'next/image'

const steps = [
  {
    number: '01',
    icon: <Search className="w-7 h-7 text-[#0A0A0A]" />,
    title: 'Choose Your Need',
    desc: 'Browse our curated categories. Tell us exactly what you need — we listen to every detail.',
    image: '/book.jpg.jpeg',
  },
  {
    number: '02',
    icon: <UserCheck className="w-7 h-7 text-[#0A0A0A]" />,
    title: 'Pick Your Professional',
    desc: 'Browse verified profiles, portfolios, fees, and availability. Only the best make it here.',
    image: '/samuraye.jpg.jpeg',
  },
  {
    number: '03',
    icon: <CreditCard className="w-7 h-7 text-[#0A0A0A]" />,
    title: 'One Payment, Full Access',
    desc: 'Book, pay securely, and they arrive. No hidden fees. Just seamless elite service.',
    image: '/sun.jpg.jpeg',
  },
  {
    number: '04',
    icon: <Sparkles className="w-7 h-7 text-[#0A0A0A]" />,
    title: 'Experience Excellence',
    desc: 'Sit back. Your professional is on the way. This is what it feels like when the world works for you.',
    image: '/ceow.jpg.jpeg',
  },
]

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['5%', '-5%'])

  return (
    <section ref={ref} className="relative py-28 overflow-hidden">
      {/* Cinematic Background */}
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <Image
          src="/watch.jpg.jpeg"
          alt="How It Works Background"
          fill
          className="object-cover object-center"
          quality={90}
        />
        <div className="absolute inset-0 bg-[#0A0A0A]/88" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(201,168,76,0.06),transparent_70%)]" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-24"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.div className="h-px bg-[#C9A84C]/50"
              initial={{ width: 0 }} whileInView={{ width: 48 }} viewport={{ once: true }} transition={{ duration: 1 }} />
            <span className="text-xs tracking-[0.4em] text-[#C9A84C] uppercase">How It Works</span>
            <motion.div className="h-px bg-[#C9A84C]/50"
              initial={{ width: 0 }} whileInView={{ width: 48 }} viewport={{ once: true }} transition={{ duration: 1 }} />
          </div>
          <h2 className="text-5xl md:text-7xl font-playfair font-black text-white mb-6">
            Simple.<br />
            <span className="gold-text">Fast. Elite.</span>
          </h2>
          <p className="text-[#E5E4E2]/60 text-lg max-w-xl mx-auto">
            Four steps stand between you and world-class service. We made sure they are effortless.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative max-w-6xl mx-auto">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-16 left-[12%] right-[12%] h-px">
            <motion.div
              className="h-full bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="flex flex-col items-center text-center group"
              >
                {/* Mini image preview */}
                <div className="relative w-32 h-20 mb-6 rounded-xl overflow-hidden">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-[#0A0A0A]/50" />

                  {/* Icon circle */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-14 h-14 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#F0D080] flex items-center justify-center shadow-[0_0_30px_rgba(201,168,76,0.5)] relative z-10"
                    >
                      {step.icon}
                    </motion.div>
                  </div>

                  {/* Step number */}
                  <div className="absolute top-1 right-2 text-[10px] font-black text-[#C9A84C] font-playfair">
                    {step.number}
                  </div>
                </div>

                <h3 className="text-lg font-playfair font-bold text-white mb-3 group-hover:text-[#C9A84C] transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-[#E5E4E2]/45 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-20"
        >
          <motion.a
            href="#membership"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="gold-button inline-flex items-center gap-3"
          >
            Begin Your Journey
            <Sparkles className="w-4 h-4" />
          </motion.a>
          <p className="text-xs text-[#E5E4E2]/25 mt-4 tracking-widest uppercase">
            No waiting. No complexity. Just excellence.
          </p>
        </motion.div>
      </div>
    </section>
  )
}