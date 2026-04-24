'use client'
import { motion } from 'framer-motion'
import { CheckCircle, Crown, Sparkles } from 'lucide-react'
import { useState } from 'react'
import CheckoutModal from './CheckoutModal'

const plans = [
  {
    icon: '🥉',
    name: 'PRO PLAN',
    tagline: 'Build Your Foundation. Move with Clarity.',
    suitable: 'A strong beginning for disciplined growth.',
    services: [
      { name: 'Planner', value: 'Included' },
      { name: 'Writer', value: 'Included' },
      { name: 'Designer', value: 'Included' },
    ],
    note: 'Build consistency and momentum',
    totalValue: '₹1200 – ₹1500',
    offerPrice: '₹899',
    savings: 'Save ₹700',
    durations: [
      { label: '1 Week', price: '₹349' },
      { label: '1 Month', price: '₹899' },
    ],
    popular: false,
    color: 'border-[#E5E4E2]/20',
    whatsappMsg: 'Hi! I want to subscribe to the PRO PLAN on ATLAS.',
  },
  {
    icon: '🥇',
    name: 'GOLD PLAN',
    tagline: 'Step Into Your Next Level.',
    suitable: 'Where consistency turns into visible results.',
    services: [
      { name: 'Planner', value: 'Included' },
      { name: 'Writer', value: 'Included' },
      { name: 'Designer', value: 'Included' },
      { name: 'Communication Skills', value: 'Included' },
      { name: 'Dietitian', value: 'Included' },
    ],
    note: 'Deeper support, smarter execution',
    totalValue: '₹2500 – ₹3500',
    offerPrice: '₹1699',
    savings: 'Save ₹1800',
    durations: [
      { label: '1 Week', price: '₹649' },
      { label: '1 Month', price: '₹1699' },
    ],
    popular: true,
    color: 'border-[#C9A84C]/60',
    whatsappMsg: 'Hi! I want to subscribe to the GOLD PLAN on ATLAS.',
  },
  {
    icon: '💎',
    name: 'ELITE PLAN',
    tagline: 'Operate at Your Highest Standard.',
    suitable: 'For those who choose excellence without compromise.',
    services: [
      { name: 'Planner', value: 'Unlimited' },
      { name: 'Writer', value: 'Unlimited' },
      { name: 'Designer', value: 'Unlimited' },
      { name: 'Communication', value: 'Unlimited' },
      { name: 'Dietitian', value: 'Unlimited' },
      { name: 'Editing', value: 'Unlimited' },
      { name: 'Personal Mentor', value: 'Weekend Sessions' },
    ],
    note: 'Full access. Highest priority.',
    totalValue: '₹5000 – ₹8000+',
    offerPrice: '₹2999',
    savings: 'Save ₹5000+',
    durations: [
      { label: '1 Week', price: '₹1199' },
      { label: '1 Month', price: '₹2999' },
    ],
    popular: false,
    color: 'border-[#C9A84C]/80',
    whatsappMsg: 'Hi! I want to subscribe to the ELITE PLAN on ATLAS.',
  },
  {
    icon: '🔮',
    name: 'ANNUAL PLAN',
    tagline: 'The ultimate 12-month commitment',
    suitable: 'Coming soon — join the waitlist',
    services: [
      { name: 'All Elite Benefits', value: '12 Months' },
      { name: 'Exclusive Perks', value: 'Included' },
      { name: 'Loyalty Rewards', value: 'Included' },
    ],
    note: 'Extended partnership',
    totalValue: 'Best Value',
    offerPrice: 'TBA',
    savings: 'Coming Soon',
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
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<any>(null)

  const handleBookNow = (plan: typeof plans[0]) => {
    const duration = selectedDurations[plan.name] || '1 Month'
    const durationObj = plan.durations.find(d => d.label === duration)
    const price = durationObj?.price || plan.offerPrice
    
    setSelectedPlanForCheckout({
      name: plan.name,
      duration,
      price,
      whatsappMsg: plan.whatsappMsg
    })
    setIsCheckoutOpen(true)
  }

  const handleWhatsApp = (plan: typeof plans[0]) => {
    const duration = selectedDurations[plan.name] || '1 Month'
    const durationObj = plan.durations.find(d => d.label === duration)
    const price = durationObj?.price || plan.offerPrice
    const msg = `🌟 *New Membership Inquiry on ATLAS*%0A%0A` +
      `🏆 *Plan:* ${plan.name}%0A` +
      `⏳ *Duration:* ${duration}%0A` +
      `💰 *Price:* ${price}%0A` +
      `🎁 *Savings:* ${plan.savings}%0A%0A` +
      `_Please confirm my membership. Your World, Our Promises._`
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

              {/* Pricing */}
              {!plan.comingSoon && (
                <div className="mb-6 space-y-2">
                  <div className="flex justify-between items-center text-[10px] tracking-widest text-[#E5E4E2]/30 uppercase">
                    <span>Actual Value</span>
                    <span className="line-through">{plan.totalValue}</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="text-3xl font-playfair font-black text-white">{plan.offerPrice}</div>
                    <div className="text-[10px] font-bold text-[#C9A84C] px-2 py-1 bg-[#C9A84C]/10 rounded-lg uppercase tracking-widest">
                      {plan.savings}
                    </div>
                  </div>
                  <p className="text-[10px] text-[#E5E4E2]/40 italic">One single payment. Zero extra charges.</p>
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
                  onClick={() => handleBookNow(plan)}
                  className="w-full bg-gradient-to-r from-[#C9A84C] to-[#F0D080] text-[#0A0A0A] font-bold py-4 uppercase tracking-widest text-xs hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Crown className="w-4 h-4" />
                  Book Now
                </button>
              ) : (
                <button
                  onClick={() => handleBookNow(plan)}
                  className="w-full py-4 border border-[#C9A84C]/40 text-[#C9A84C] text-xs tracking-widest uppercase hover:bg-[#C9A84C]/5 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Book Now
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {selectedPlanForCheckout && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          planName={selectedPlanForCheckout.name}
          duration={selectedPlanForCheckout.duration}
          price={selectedPlanForCheckout.price}
          whatsappMsg={selectedPlanForCheckout.whatsappMsg}
        />
      )}
    </section>
  )
}