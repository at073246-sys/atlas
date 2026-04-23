'use client'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import BookingModal from './BookingModal'

const services = [
  {
    icon: '📅',
    title: 'Daily Planner',
    desc: 'Stay organized with a personal planning expert who structures your life for maximum productivity.',
    pricing: [
      { label: '1 Day', price: '₹29' },
      { label: '1 Week', price: '₹99' },
      { label: '1 Month', price: '₹299' },
    ],
  },
  {
    icon: '🥗',
    title: 'Dietitian',
    desc: 'Personalized nutrition plans from certified dietary experts. Eat right, live elite.',
    pricing: [
      { label: '1 Week', price: '₹199' },
      { label: '1 Month', price: '₹399' },
    ],
  },
  {
    icon: '✍️',
    title: 'Content Writer',
    desc: 'Premium content crafted for your brand. Stories that convert, captivate, and command attention.',
    pricing: [
      { label: '1 Post', price: '₹149' },
      { label: '5 Posts', price: '₹299' },
      { label: 'Monthly', price: '₹599' },
    ],
  },
  {
    icon: '🎨',
    title: 'Digital Designer',
    desc: 'Visuals that stop the scroll. World-class design for your brand, content, and campaigns.',
    pricing: [
      { label: '1 Post', price: '₹299' },
      { label: '5 Posts', price: '₹999' },
      { label: 'Monthly', price: '₹1,499' },
    ],
  },
  {
    icon: '✂️',
    title: 'Personal Editor',
    desc: 'Flawless video and content editing. Every frame perfected to your standard.',
    pricing: [
      { label: 'Per Project', price: '₹1,199' },
    ],
  },
  {
    icon: '🗣️',
    title: 'Communication Coach',
    desc: 'Master the art of influence. Expert coaching to elevate your presence and persuasion.',
    pricing: [
      { label: '1 Week', price: '₹299' },
      { label: '1 Month', price: '₹499' },
    ],
  },
  {
    icon: '🎓',
    title: 'Personal Mentor',
    desc: 'One-on-one mentorship to unlock your highest potential. Elite guidance, real results.',
    pricing: [
      { label: 'Weekend', price: '₹399' },
      { label: '1 Month', price: '₹799' },
    ],
    note: '*Different rates for Pro, Gold & Elite members',
  },
  {
    icon: '🏋️',
    title: 'Personal Trainer',
    desc: 'World-class fitness professionals to transform your body and performance.',
    pricing: [],
    comingSoon: true,
  },
  {
    icon: '👨‍⚕️',
    title: 'Private Doctor',
    desc: 'Concierge medical care. Your health, your schedule, absolute privacy.',
    pricing: [],
    comingSoon: true,
  },
  {
    icon: '🍳',
    title: 'Personal Chef',
    desc: 'Michelin-level cuisine prepared exclusively for you, in your own home.',
    pricing: [],
    comingSoon: true,
  },
  {
    icon: '🔐',
    title: 'Security Expert',
    desc: 'Discreet, professional protection for those who demand absolute security.',
    pricing: [],
    comingSoon: true,
  },
  {
    icon: '📊',
    title: 'Financial Advisor',
    desc: 'Wealth management and investment strategy from elite financial professionals.',
    pricing: [],
    comingSoon: true,
  },
]

export default function ServicesGrid() {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null)

  return (
    <section id="services" className="py-28 relative">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-[#C9A84C]/50" />
            <span className="text-xs tracking-[0.4em] text-[#C9A84C] uppercase">Our Services</span>
            <div className="h-px w-12 bg-[#C9A84C]/50" />
          </div>
          <h2 className="text-5xl md:text-7xl font-playfair font-black bg-gradient-to-r from-[#C9A84C] to-[#F0D080] bg-clip-text text-transparent mb-6">
            World-Class<br />Professionals
          </h2>
          <p className="text-[#E5E4E2]/60 text-lg max-w-2xl mx-auto">
            Every professional is verified, elite, and ready on demand.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
              className={`bg-gradient-to-br from-[#0A0A0A]/85 to-[#0D1B2A]/85 backdrop-blur-xl border border-[#C9A84C]/20 shadow-2xl rounded-2xl p-8 group relative overflow-hidden hover:-translate-y-2 transition-all duration-300 ${service.comingSoon ? 'opacity-60' : ''}`}
            >
              {service.comingSoon && (
                <div className="absolute top-4 right-4 px-3 py-1 border border-[#C9A84C]/30 rounded-full text-[10px] tracking-widest text-[#C9A84C] uppercase">
                  Coming Soon
                </div>
              )}
              <div className="text-4xl mb-5">{service.icon}</div>
              <h3 className="text-2xl font-playfair font-bold text-white mb-3 group-hover:text-[#C9A84C] transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-[#E5E4E2]/60 text-sm leading-relaxed mb-6">{service.desc}</p>
              {service.pricing.length > 0 && (
                <div className="space-y-2 mb-4">
                  {service.pricing.map((p) => (
                    <div key={p.label} className="flex justify-between items-center py-2 border-b border-[#C9A84C]/10">
                      <span className="text-xs tracking-wider text-[#E5E4E2]/50 uppercase">{p.label}</span>
                      <span className="text-sm font-bold bg-gradient-to-r from-[#C9A84C] to-[#F0D080] bg-clip-text text-transparent">{p.price}</span>
                    </div>
                  ))}
                </div>
              )}
              {service.note && (
                <p className="text-[10px] text-[#C9A84C]/50 italic mb-4">{service.note}</p>
              )}
              {!service.comingSoon && (
                <button
                  onClick={() => setSelectedService(service)}
                  className="flex items-center gap-2 text-xs tracking-widest text-[#C9A84C] uppercase mt-4 hover:gap-3 transition-all duration-300"
                >
                  <span>Book Now</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {selectedService && (
        <BookingModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </section>
  )
}