'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Search, UserCheck, CreditCard, Sparkles } from 'lucide-react'
import { useRef } from 'react'
import Image from 'next/image'

const steps = [
  {
    number: '01',
    icon: <Search className="w-5 h-5 md:w-7 md:h-7 text-[#0A0A0A]" />,
    title: 'Choose Your Need',
    desc: 'Browse our curated categories. Tell us exactly what you need — we listen to every detail.',
    image: '/book.jpg.jpeg',
  },
  {
    number: '02',
    icon: <UserCheck className="w-5 h-5 md:w-7 md:h-7 text-[#0A0A0A]" />,
    title: 'Pick Your Professional',
    desc: 'Browse verified profiles, portfolios, fees, and availability. Only the best make it here.',
    image: '/samuraye.jpg.jpeg',
  },
  {
    number: '03',
    icon: <CreditCard className="w-5 h-5 md:w-7 md:h-7 text-[#0A0A0A]" />,
    title: 'One Payment, Full Access',
    desc: 'Book, pay securely, and they arrive. No hidden fees. Just seamless elite service.',
    image: '/sun.jpg.jpeg',
  },
  {
    number: '04',
    icon: <Sparkles className="w-5 h-5 md:w-7 md:h-7 text-[#0A0A0A]" />,
    title: 'Experience Excellence',
    desc: 'Sit back. Your professional is on the way. This is what it feels like when the world works for you.',
    image: '/ceow.jpg.jpeg',
  },
]

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['8%', '-8%'])
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05])

  return (
    <section ref={ref} className="relative py-20 md:py-28 overflow-hidden">
      {/* 3D Motion Background */}
      <motion.div className="absolute inset-0 z-0" style={{ y, scale: imageScale }}>
        <Image src="/watch.jpg.jpeg" alt="How It Works" fill className="object-cover object-center" quality={90} />
        <div className="absolute inset-0 bg-[#0A0A0A]/88" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(201,168,76,0.06),transparent_70%)]" />
      </motion.div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.div className="h-px bg-[#C9A84C]/50"
              initial={{ width: 0 }} whileInView={{ width: 40 }} viewport={{ once: true }} transition={{ duration: 1 }} />
            <span className="text-[10px] md:text-xs tracking-[0.3em] text-[#C9A84C] uppercase">How It Works</span>
            <motion.div className="h-px bg-[#C9A84C]/50"
              initial={{ width: 0 }} whileInView={{ width: 40 }} viewport={{ once: true }} transition={{ duration: 1 }} />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-playfair font-black text-white mb-4 md:mb-6">
            Simple.<br />
            <span className="gold-text">Fast. Elite.</span>
          </h2>
          <p className="text-[#E5E4E2]/60 text-sm md:text-lg max-w-xl mx-auto px-4">
            Four steps stand between you and world-class service. We made sure they are effortless.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="relative w-full h-20 md:h-28 mb-4 md:mb-6 rounded-xl overflow-hidden">
                <Image src={step.image} alt={step.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-[#0A0A0A]/50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#F0D080] flex items-center justify-center shadow-[0_0_30px_rgba(201,168,76,0.5)]"
                  >
                    {step.icon}
                  </motion.div>
                </div>
                <div className="absolute top-1 right-2 text-[10px] font-black text-[#C9A84C] font-playfair">
                  {step.number}
                </div>
              </div>

              <h3 className="text-sm md:text-lg font-playfair font-bold text-white mb-2 group-hover:text-[#C9A84C] transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-[#E5E4E2]/45 text-xs leading-relaxed hidden md:block">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-12 md:mt-20"
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
        </motion.div>
      </div>
    </section>
  )
}