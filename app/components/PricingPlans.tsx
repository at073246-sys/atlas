'use client'
import { motion } from 'framer-motion'
import { CheckCircle, Crown, Sparkles } from 'lucide-react'
import { useState } from 'react'

const plans = [
  {
    icon: '🥉',
    name: 'PRO PLAN',
    tagline: 'Essential access at a smarter price',
    suitable: 'Students & early professionals',
    services: [
      { name: 'Daily Planner', value: '₹299/month' },
      { name: 'Communication Coach', value: '₹499/month' },
      { name: 'Content Writer', value: '₹299 for 5 posts' },
      { name: 'Dietitian', value: '₹399/month' },
    ],
    note: 'Pick any 3 services',
    totalValue: '₹1,200',
    durations: [
      { label: '1 Week', price: '₹299' },
      { label: '1 Month', price: '₹799' },
    ],
    popular: false,
    color: 'border-[#E5E4E2]/20',
    whatsappMsg: 'Hi! I want to subscribe to the PRO PLAN on ATLAS.',
  },
  {
    icon: '🥇',
    name: 'GOLD PLAN',
    tagline: 'Expanded access with priority support',
    suitable: 'Creators & entrepreneurs',
    services: [
      { name: 'All PRO Services', value: 'Included' },
      { name: 'Digital Designer', value: '₹999 for 5 posts' },
      { name: 'Personal Mentor', value: '₹799/month' },
      { name: 'Communication Coach', value: '₹499/month' },
      { name: 'Content Writer', value: '₹599/month' },
    ],
    note: 'Pick any 5 services',
    totalValue: '₹2,500',
    durations: [
      { label: '1 Week', price: '₹599' },
      { label: '1 Month', price: '₹1,499' },
    ],
    popular: false,
    color: 'border-[#C9A84C]/30',
    whatsappMsg: 'Hi! I want to subscribe to the GOLD PLAN on ATLAS.',
  },
  {
    icon: '💎',
    name: 'ELITE PLAN',
    tagline: 'Everything. Unlimited. No compromise.',
    suitable: 'High-level clients who want it all',
    services: [
      { name: 'Daily Planner', value: 'Included' },
      { name: 'Dietitian', value: 'Included' },
      { name: 'Content Writer', value: 'Included' },
      { name: 'Digital Designer', value: 'Included' },
      { name: 'Personal Editor', value: 'Included' },
      { name: 'Communication Coach', value: 'Included' },
      { name: 'Personal Mentor', value: 'Included' },
    ],
    note: 'All 7 services included',
    totalValue: '₹5,000+',
    durations: [
      { label: '1 Week', price: '₹999' },
      { label: '1 Month', price: '₹2,499' },
    ],
    popular: true,
    color: 'border-[#C9A84C]/60',
    whatsappMsg: 'Hi! I want to subscribe to the ELITE PLAN on ATLAS.',
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
    note: 'All Elite benefits + more',
    totalValue: 'Best Value',
    durations: [],
    popular: false,
    comingSoon: true,
    color: 'border-[#9B59B6]/30',
    whatsappMsg: 'Hi! I want to join the ANNUAL PLAN waitlist on ATLAS.',
  },
]

const WHATSAPP_NUMBER = '917550124573'

export default function PricingPlans() {
  const [selectedDurations, setSelectedDurations] = useState<{ [key: string]: string }>({
    'PRO PLAN': '1 Month',
    'GOLD PLAN': '1 Month',
    'ELITE PLAN': '1 Month',
  })

  const handleWhatsApp = (plan: typeof plans[0]) => {
    const duration = selectedDurations[plan.name] || '1 Month'
    const durationObj = plan.durations.find(d => d.label === duration)
    const price = durationObj?.price || ''
    const msg = `${plan.whatsappMsg}%0A%0APlan: ${plan.name}%0ADuration: ${duration}%0APrice: ${price}%0A%0APlease confirm my booking.`
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank')
  }

  return (
    <section id="membership" className="py-28 relative">
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-[#C9A84C]/50" />
            <span className="text-xs tracking-[0.4em] text-[#C9A84C] uppercase">Membership</span>
            <div className="h-px w-12 bg-[#C9A84C]/50" />
          </div>
          <h2 className="text-5xl md:text-7xl font-playfair font-black text-white mb-6">
            Choose Your<br />
            <span className="bg-gradient-to-r from-[#C9A84C] to-[#F0D080] bg-clip-text text-transparent">
              Level of Excellence
            </span>
          </h2>
          <p className="text-[#E5E4E2]/60 text-lg max-w-xl mx-auto">
            Every plan saves you money. Pay less, get more, live elite.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className={`relative bg-gradient-to-br from-[#0A0A0A]/85 to-[#0D1B2A]/85 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border-2 flex flex-col
                ${plan.color}
                ${plan.popular ? 'scale-105 shadow-[0_0_60px_rgba(201,168,76,0.2)]' : ''}
                ${plan.comingSoon ? 'opacity-70' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-1.5 bg-gradient-to-r from-[#C9A84C] to-[#F0D080] rounded-full whitespace-nowrap">
                  <Crown className="w-3 h-3 text-[#0A0A0A]" />
                  <span className="text-[10px] font-black text-[#0A0A0A] uppercase tracking-widest">Most Popular</span>
                </div>
              )}
              {plan.comingSoon && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-1.5 border border-[#9B59B6]/40 rounded-full bg-[#0A0A0A] whitespace-nowrap">
                  <Sparkles className="w-3 h-3 text-[#9B59B6]" />
                  <span className="text-[10px] text-[#9B59B6] uppercase tracking-widest">Coming Soon</span>
                </div>
              )}

              {/* Icon & Name */}
              <div className="text-4xl mb-4">{plan.icon}</div>
              <h3 className={`text-xl font-playfair font-black mb-1 tracking-widest
                ${plan.popular ? 'bg-gradient-to-r from-[#C9A84C] to-[#F0D080] bg-clip-text text-transparent' : 'text-white'}`}>
                {plan.name}
              </h3>
              <p className="text-sm text-[#E5E4E2]/40 italic mb-1">{plan.tagline}</p>
              <p className="text-xs text-[#E5E4E2]/30 tracking-wider mb-6 pb-4 border-b border-[#C9A84C]/10">
                {plan.suitable}
              </p>

              {/* Services included */}
              <p className="text-[10px] tracking-widest text-[#C9A84C] uppercase mb-3">{plan.note}</p>
              <ul className="space-y-2 mb-6 flex-1">
                {plan.services.map((service) => (
                  <li key={service.name} className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-[#C9A84C]/60 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-[#E5E4E2]/70">{service.name}</span>
                    </div>
                    <span className="text-[10px] text-[#C9A84C]/60 whitespace-nowrap">{service.value}</span>
                  </li>
                ))}
              </ul>

              {/* Total Value */}
              {!plan.comingSoon && (
                <div className="flex justify-between items-center mb-4 p-3 border border-[#C9A84C]/10 rounded-xl">
                  <span className="text-xs text-[#E5E4E2]/40">Total Value</span>
                  <span className="text-sm font-bold text-[#E5E4E2]/40 line-through">{plan.totalValue}</span>
                </div>
              )}

              {/* Duration Selection */}
              {plan.durations.length > 0 && (
                <div className="mb-4">
                  <p className="text-[10px] tracking-widest text-[#E5E4E2]/30 uppercase mb-2">Select Duration</p>
                  <div className="grid grid-cols-2 gap-2">
                    {plan.durations.map((d) => (
                      <button
                        key={d.label}
                        onClick={() => setSelectedDurations(prev => ({ ...prev, [plan.name]: d.label }))}
                        className={`p-2 border rounded-lg text-center transition-all duration-300
                          ${selectedDurations[plan.name] === d.label
                            ? 'border-[#C9A84C] bg-[#C9A84C]/10'
                            : 'border-[#C9A84C]/20 hover:border-[#C9A84C]/40'}`}
                      >
                        <div className="text-[10px] text-[#E5E4E2]/50">{d.label}</div>
                        <div className="text-sm font-bold bg-gradient-to-r from-[#C9A84C] to-[#F0D080] bg-clip-text text-transparent">
                          {d.price}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Button */}
              {plan.comingSoon ? (
                <button
                  onClick={() => handleWhatsApp(plan)}
                  className="w-full py-3 border border-[#9B59B6]/40 text-[#9B59B6]/70 text-xs tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-[#9B59B6]/5 transition-all duration-300"
                >
                  Join Waitlist
                </button>
              ) : plan.popular ? (
                <button
                  onClick={() => handleWhatsApp(plan)}
                  className="w-full bg-gradient-to-r from-[#C9A84C] to-[#F0D080] text-[#0A0A0A] font-bold py-4 uppercase tracking-widest text-xs hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Crown className="w-4 h-4" />
                  Book on WhatsApp
                </button>
              ) : (
                <button
                  onClick={() => handleWhatsApp(plan)}
                  className="w-full py-4 border border-[#C9A84C]/40 text-[#C9A84C] text-xs tracking-widest uppercase hover:bg-[#C9A84C]/5 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Book on WhatsApp
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}