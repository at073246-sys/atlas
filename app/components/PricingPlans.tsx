'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { CheckCircle, Crown, Sparkles, Mail } from 'lucide-react'
import { useState, useRef } from 'react'
import Image from 'next/image'
import ParallaxBg from './ParallaxBg'

const WHATSAPP_NUMBER = '917550124573'

const plans = [
  {
    icon: '🔷',
    name: 'PRO PLAN',
    tagline: 'Starter Premium — Foundation build karna',
    suitable: 'Perfect for beginners jo structured growth chahte hain',
    services: [
      { name: 'Planner', value: 'Weekly + Monthly guidance' },
      { name: 'Dietitian', value: 'Weekly plan + progress tracking' },
      { name: 'Skills', value: 'Basic skill-building roadmap' },
      { name: 'Content Writer', value: '2 posts/month' },
    ],
    focus: '🌟 Focus: Consistency + Foundation',
    durations: [
      { label: '1 Week', price: '₹399' },
      { label: '1 Month', price: '₹1,299' },
    ],
    popular: false,
    comingSoon: false,
    color: 'border-[#E5E4E2]/10',
    whatsappMsg: 'Hi! I want to subscribe to the PRO PLAN on ATLAS.%0A%0APrice: ',
  },
  {
    icon: '🟡',
    name: 'GOLD PLAN',
    tagline: 'Advanced Growth — Fast improvement',
    suitable: 'For serious individuals jo fast improvement chahte hain',
    services: [
      { name: 'Planner', value: 'Advanced + personalized' },
      { name: 'Dietitian', value: 'Weekly + detailed tracking' },
      { name: 'Skills', value: 'Advanced learning system' },
      { name: 'Content Writer', value: '5 posts/month' },
      { name: 'Digital Designer', value: '3 designs/month' },
      { name: 'Personal Mentor', value: '2 weekend sessions/month' },
    ],
    focus: '🌟 Focus: Faster results + guided improvement',
    durations: [
      { label: '1 Week', price: '₹799' },
      { label: '1 Month', price: '₹2,499' },
    ],
    popular: false,
    comingSoon: false,
    color: 'border-[#C9A84C]/20',
    whatsappMsg: 'Hi! I want to subscribe to the GOLD PLAN on ATLAS.%0A%0APrice: ',
  },
  {
    icon: '🔶',
    name: 'ELITE PLAN',
    tagline: 'All-in Premium — Complete transformation',
    suitable: 'For high performers jo complete transformation chahte hain',
    services: [
      { name: 'Planner', value: 'Fully personalized + priority' },
      { name: 'Dietitian', value: 'Full month transformation plan' },
      { name: 'Skills', value: 'Complete mastery roadmap' },
      { name: 'Content Writer', value: '10 posts/month' },
      { name: 'Digital Designer', value: '5 premium designs' },
      { name: 'Personal Editor', value: '2 professional works' },
      { name: 'Personal Mentor', value: 'Every weekend sessions' },
    ],
    focus: '🌟 Focus: Total upgrade — lifestyle, skills & output',
    durations: [
      { label: '1 Month', price: '₹1,999' },
    ],
    popular: true,
    comingSoon: false,
    color: 'border-[#C9A84C]/50',
    whatsappMsg: 'Hi! I want to subscribe to the ELITE PLAN on ATLAS.%0A%0APrice: ',
  },
  {
    icon: '🔮',
    name: 'ANNUAL PLAN',
    tagline: 'The ultimate 12-month commitment',
    suitable: 'Coming soon — join the waitlist',
    services: [
      { name: 'All Elite Benefits', value: 'Included' },
      { name: 'Loyalty Rewards', value: 'Included' },
      { name: 'Early Access', value: 'New categories' },
      { name: 'Annual Strategy Session', value: 'Included' },
    ],
    focus: '🌟 Focus: Long-term mastery + exclusive perks',
    durations: [],
    popular: false,
    comingSoon: true,
    color: 'border-[#9B59B6]/20',
    whatsappMsg: 'Hi! I want to join the ANNUAL PLAN waitlist on ATLAS.',
  },
]

export default function PricingPlans() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['5%', '-5%'])
  const [selectedDurations, setSelectedDurations] = useState<{ [key: string]: string }>({
    'PRO PLAN': '1 Month',
    'GOLD PLAN': '1 Month',
    'ELITE PLAN': '1 Month',
  })

  const handleWhatsApp = (plan: typeof plans[0]) => {
    const duration = selectedDurations[plan.name] || plan.durations[0]?.label || '1 Month'
    const durationObj = plan.durations.find(d => d.label === duration)
    const price = durationObj?.price || ''
    const msg = `${plan.whatsappMsg}${price}%0ADuration: ${duration}%0A%0APlease confirm my booking.`
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank')
  }

  return (
    <section ref={ref} id="membership" className="relative py-28 overflow-hidden">
      {/* Cinematic Background */}
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <Image src="/king.jpg.jpeg" alt="Membership Background" fill className="object-cover object-center" quality={90} />
        <div className="absolute inset-0 bg-[#0A0A0A]/88" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.07),transparent_70%)]" />
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
            <span className="text-xs tracking-[0.4em] text-[#C9A84C] uppercase">Membership</span>
            <motion.div className="h-px bg-[#C9A84C]/50"
              initial={{ width: 0 }} whileInView={{ width: 48 }} viewport={{ once: true }} transition={{ duration: 1 }} />
          </div>
          <h2 className="text-5xl md:text-7xl font-playfair font-black text-white mb-6">
            Choose Your<br />
            <span className="gold-text">Level of Excellence</span>
          </h2>
          <p className="text-[#E5E4E2]/60 text-lg max-w-xl mx-auto">
            Every plan is designed to transform you. Pick your level and start today.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`relative glass-card rounded-3xl p-8 border-2 flex flex-col
                ${plan.color}
                ${plan.popular ? 'shadow-[0_0_80px_rgba(201,168,76,0.25)]' : ''}
                ${plan.comingSoon ? 'opacity-60' : ''}`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-1.5 bg-gradient-to-r from-[#C9A84C] to-[#F0D080] rounded-full whitespace-nowrap"
                >
                  <Crown className="w-3 h-3 text-[#0A0A0A]" />
                  <span className="text-[10px] font-black text-[#0A0A0A] uppercase tracking-widest">Most Popular</span>
                </motion.div>
              )}

              {plan.comingSoon && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-1.5 border border-[#9B59B6]/40 rounded-full bg-[#0A0A0A] whitespace-nowrap">
                  <Sparkles className="w-3 h-3 text-[#9B59B6]" />
                  <span className="text-[10px] text-[#9B59B6] uppercase tracking-widest">Coming Soon</span>
                </div>
              )}

              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
              )}

              {/* Icon & Name */}
              <div className="text-4xl mb-4 float-animation" style={{ animationDelay: `${index * 0.3}s` }}>
                {plan.icon}
              </div>

              <h3 className={`text-xl font-playfair font-black mb-1 tracking-widest
                ${plan.popular ? 'gold-text' : 'text-white'}`}>
                {plan.name}
              </h3>
              <p className="text-sm text-[#E5E4E2]/40 italic mb-1">{plan.tagline}</p>
              <p className="text-xs text-[#E5E4E2]/30 tracking-wider mb-4 pb-4 border-b border-[#C9A84C]/10">
                {plan.suitable}
              </p>

              {/* Services */}
              <ul className="space-y-2 mb-4 flex-1">
                {plan.services.map((service) => (
                  <li key={service.name} className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className={`w-3 h-3 mt-0.5 flex-shrink-0
                        ${plan.popular ? 'text-[#C9A84C]' : 'text-[#C9A84C]/50'}`} />
                      <span className="text-xs text-[#E5E4E2]/60">{service.name}</span>
                    </div>
                    <span className="text-[10px] text-[#C9A84C]/50 whitespace-nowrap text-right">{service.value}</span>
                  </li>
                ))}
              </ul>

              {/* Focus */}
              <div className="mb-4 p-3 border border-[#C9A84C]/10 rounded-xl bg-[#C9A84C]/3">
                <p className="text-[10px] text-[#E5E4E2]/40 leading-relaxed">{plan.focus}</p>
              </div>

              {/* Duration */}
              {plan.durations.length > 0 && (
                <div className="mb-4">
                  <p className="text-[10px] tracking-widest text-[#E5E4E2]/30 uppercase mb-2">Select Duration</p>
                  <div className="grid grid-cols-2 gap-2">
                    {plan.durations.map((d) => (
                      <motion.button
                        key={d.label}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedDurations(prev => ({ ...prev, [plan.name]: d.label }))}
                        className={`p-2 border rounded-lg text-center transition-all duration-300
                          ${selectedDurations[plan.name] === d.label
                            ? 'border-[#C9A84C] bg-[#C9A84C]/15'
                            : 'border-[#C9A84C]/15 hover:border-[#C9A84C]/40'}`}
                      >
                        <div className="text-[10px] text-[#E5E4E2]/40">{d.label}</div>
                        <div className="text-sm font-bold gold-text">{d.price}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              {plan.comingSoon ? (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  onClick={() => handleWhatsApp(plan)}
                  className="w-full py-3 border border-[#9B59B6]/40 text-[#9B59B6]/70 text-xs tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-[#9B59B6]/5 transition-all duration-300 rounded-xl"
                >
                  <Mail className="w-4 h-4" />
                  Join Waitlist
                </motion.button>
              ) : plan.popular ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleWhatsApp(plan)}
                  className="w-full bg-gradient-to-r from-[#C9A84C] to-[#F0D080] text-[#0A0A0A] font-bold py-4 uppercase tracking-widest text-xs flex items-center justify-center gap-2 rounded-xl gold-pulse"
                >
                  <Crown className="w-4 h-4" />
                  Book on WhatsApp
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleWhatsApp(plan)}
                  className="w-full py-4 border border-[#C9A84C]/30 text-[#C9A84C] text-xs tracking-widest uppercase hover:bg-[#C9A84C]/5 transition-all duration-300 rounded-xl"
                >
                  Book on WhatsApp
                </motion.button>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-xs tracking-[0.3em] text-[#E5E4E2]/20 uppercase">
            All plans include WhatsApp support · Annual plan coming soon
          </p>
        </motion.div>
      </div>
    </section>
  )
}
 <ParallaxBg src="/king.jpg.jpeg" opacity={0.88} />