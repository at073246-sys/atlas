'use client'
import { motion } from 'framer-motion'
import { ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import BookingModal from './BookingModal'

const services = [
  {
    icon: '📅',
    title: 'Daily Planner',
    desc: 'Structure your day with precision and purpose.',
    fullDesc: `Every goal begins with a single step, and for our Daily Planner, each step is anchored in discipline. An SGFI-certified sportsman who once pushed boundaries on the field, now crafts every day with precision and purpose. Whether you choose a single day, a week, or an entire month, each plan is a reflection of dedication — from early morning focus sessions to evening goal reviews. Designed for those who demand structure — whether you're a student in your 20s, a professional in your 30s, or a visionary balancing life's many demands — this is more than a planner. It is a daily ritual, a bridge between ambition and achievement, crafted for those who shape every day with intention.`,
    pricing: [
      { label: '1 Day', price: '₹49' },
      { label: '1 Week', price: '₹249' },
      { label: '1 Month', price: '₹499' },
    ],
  },
  {
    icon: '🥗',
    title: 'Dietitian',
    desc: 'Personalized nutrition from a certified elite professional.',
    fullDesc: `From the cricket field to the forefront of health, our Dietitian's journey is one of dedication and transformation. As an SGFI-certified cricketer, they represented their state and KVS on the national stage — mastering discipline, resilience, and the power of precision. Today, that same commitment drives their approach to nutrition. With a masterful understanding of the body's potential, every one-week or one-month plan is a personal story of balance, focus, and peak performance. Whether you're beginning your athletic journey or refining your top-tier edge, this is a path where every bite is purposeful, every step is inspired, and every success is within reach.`,
    pricing: [
      { label: '1 Week', price: '₹199' },
      { label: '1 Month', price: '₹599' },
    ],
  },
  {
    icon: '✍️',
    title: 'Content Writer',
    desc: 'Words crafted with purpose, strategy, and impact.',
    fullDesc: `There was a time when words were just tools — until this Content Writer discovered their true mastery. With a profound command of English and a deep passion for storytelling, every piece they craft is a bridge between insight and emotion. Whether it's a single day of sharp, impactful copy, a week of strategic messaging, or a month of transformative storytelling, they bring quiet dedication to every line. For students, professionals, and visionaries — whether in their 20s or 50s — this is a journey of voice, purpose, and impact, word by word.`,
    pricing: [
      { label: '1 Post', price: '₹99' },
      { label: '5 Posts', price: '₹499' },
    ],
  },
  {
    icon: '🎨',
    title: 'Digital Designer',
    desc: 'Visual elegance that speaks before words do.',
    fullDesc: `This Digital Designer's path is a fusion of imagination and discipline. With a relentless drive for perfection, they transform concepts into visual elegance — no matter if it's a one-day spark, a focused week, or a full month of creative evolution. Once a dedicated student of balance and craft, they now harness every pixel with intention — inviting visionaries in their 20s, 30s, and beyond to reimagine their brand, their story, and their world. Each design is a personal signature — timeless, bold, and crafted for those who aspire to stand out.`,
    pricing: [
      { label: '1 Post', price: '₹99' },
      { label: '5 Posts', price: '₹399' },
    ],
  },
  {
    icon: '✂️',
    title: 'Personal Editor',
    desc: 'Every word refined. Every edit purposeful.',
    fullDesc: `This Editor's journey is one of quiet dedication and unwavering focus. With a deep passion for language and a disciplined approach to their craft, they refine every word with care and every edit with purpose. Whether it's a single day of revision, a week of focused refinement, or a full month of transformation, their guidance is a personal commitment to clarity, balance, and the power of a well-crafted voice. Because the difference between good and great often lies in a single, perfectly chosen word.`,
    pricing: [
      { label: '1 Work', price: '₹1,199' },
      { label: '5 Works', price: '₹5,599' },
    ],
  },
  {
    icon: '🗣️',
    title: 'Communication Coach',
    desc: 'Turn your voice into your greatest asset.',
    fullDesc: `Once a quiet observer, now a voice that commands attention — our Communication Coach's story is one of discovery and mastery. With a Master's degree in English and a lifelong passion for language, they guide individuals from all walks of life — from ambitious students to visionary leaders — on a journey to unlock their true voice. In each week or month, they craft a personal narrative, turning words into influence and confidence into decisive action. Speak with power. Lead with clarity. Transform every room you walk into.`,
    pricing: [
      { label: '1 Week', price: '₹499' },
      { label: '1 Month', price: '₹1,899' },
    ],
  },
  {
    icon: '🎓',
    title: 'Personal Mentor',
    desc: 'From defense discipline to Google innovation — elite guidance.',
    fullDesc: `This Mentor's journey is a testament to reinvention and purpose. Once a disciplined leader in the defense forces, they now bring the same precision and resilience to Google's innovation hubs. As a personal mentor, they guide individuals from their 20s to their 30s — students, entrepreneurs, and future visionaries — helping them uncover their true purpose and lead with unwavering confidence. Each weekend session is a bridge connecting past discipline with future ambition. Your potential is limitless — this mentor will help you prove it.`,
    pricing: [
      { label: 'Weekend', price: '₹699' },
      { label: '4 Weekends', price: '₹2,499' },
    ],
    note: '*Different rates for Pro, Gold & Elite members',
  },
  {
    icon: '🏋️',
    title: 'Personal Trainer',
    desc: 'World-class fitness professionals to transform your performance.',
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
    desc: 'Michelin-level cuisine prepared exclusively for you.',
    pricing: [],
    comingSoon: true,
  },
  {
    icon: '🔐',
    title: 'Security Expert',
    desc: 'Discreet, professional protection for those who demand it.',
    pricing: [],
    comingSoon: true,
  },
  {
    icon: '📊',
    title: 'Financial Advisor',
    desc: 'Elite wealth management and investment strategy.',
    pricing: [],
    comingSoon: true,
  },
]

export default function ServicesGrid() {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

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
            Every professional is verified, elite, and ready on demand. Your standards are our minimum.
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

              <p className="text-[#E5E4E2]/60 text-sm leading-relaxed mb-4">{service.desc}</p>

              {service.fullDesc && (
                <div>
                  {expandedCard === service.title && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="text-[#E5E4E2]/50 text-xs leading-relaxed mb-4 border-t border-[#C9A84C]/10 pt-4"
                    >
                      {service.fullDesc}
                    </motion.p>
                  )}
                  <button
                    onClick={() => setExpandedCard(expandedCard === service.title ? null : service.title)}
                    className="flex items-center gap-1 text-[10px] tracking-widest text-[#C9A84C]/60 uppercase mb-4 hover:text-[#C9A84C] transition-colors"
                  >
                    {expandedCard === service.title ? (
                      <><ChevronUp className="w-3 h-3" /> Read Less</>
                    ) : (
                      <><ChevronDown className="w-3 h-3" /> Read More</>
                    )}
                  </button>
                </div>
              )}

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