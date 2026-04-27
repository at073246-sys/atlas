'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react'
import { useState, useRef } from 'react'
import Image from 'next/image'
import BookingModal from './BookingModal'
import ParallaxBg from './ParallaxBg'

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
    fullDesc: `From the cricket field to the forefront of health, our Dietitian's journey is one of dedication and transformation. As an SGFI-certified cricketer, they represented their state and KVS on the national stage — mastering discipline, resilience, and the power of precision. Today, that same commitment drives their approach to nutrition. With a masterful understanding of the body's potential, every one-week or one-month plan is a personal story of balance, focus, and peak performance.`,
    pricing: [
      { label: '1 Week', price: '₹199' },
      { label: '1 Month', price: '₹599' },
    ],
  },
  {
    icon: '✍️',
    title: 'Content Writer',
    desc: 'Words crafted with purpose, strategy, and impact.',
    fullDesc: `There was a time when words were just tools — until this Content Writer discovered their true mastery. With a profound command of English and a deep passion for storytelling, every piece they craft is a bridge between insight and emotion. Whether it's a single sharp post or a month of transformative storytelling, they bring quiet dedication to every line.`,
    pricing: [
      { label: 'Per Post', price: '₹99' },
      { label: '5 Posts', price: '₹499' },
    ],
  },
  {
    icon: '🎨',
    title: 'Digital Designer',
    desc: 'Visual elegance that speaks before words do.',
    fullDesc: `This Digital Designer's path is a fusion of imagination and discipline. With a relentless drive for perfection, they transform concepts into visual elegance. Each design is a personal signature — timeless, bold, and crafted for those who aspire to stand out in a world full of noise.`,
    pricing: [
      { label: '1 Post', price: '₹99' },
      { label: '5 Posts', price: '₹399' },
    ],
  },
  {
    icon: '✂️',
    title: 'Personal Editor',
    desc: 'Every word refined. Every edit purposeful.',
    fullDesc: `This Editor's journey is one of quiet dedication and unwavering focus. With a deep passion for language and a disciplined approach to their craft, they refine every word with care and every edit with purpose. Because the difference between good and great often lies in a single, perfectly chosen word.`,
    pricing: [
      { label: '1 Work', price: '₹1,199' },
      { label: '5 Works', price: '₹5,599' },
    ],
  },
  {
    icon: '🧠',
    title: 'Skills Coach',
    desc: 'Master any skill with a structured elite roadmap.',
    fullDesc: `Whether you are starting from scratch or refining your expertise, our Skills Coach builds a personalized learning roadmap designed for real, measurable progress. From basic foundations to advanced mastery — every session is purposeful, every week is a transformation. Built for those who refuse to plateau.`,
    pricing: [
      { label: '1 Week', price: '₹499' },
      { label: '1 Month', price: '₹1,899' },
    ],
  },
  {
    icon: '🗣️',
    title: 'Communication Coach',
    desc: 'Turn your voice into your greatest asset.',
    fullDesc: `Once a quiet observer, now a voice that commands attention — our Communication Coach's story is one of discovery and mastery. With a Master's degree in English and a lifelong passion for language, they guide individuals from all walks of life on a journey to unlock their true voice. Speak with power. Lead with clarity. Transform every room you walk into.`,
    pricing: [
      { label: '1 Week', price: '₹499' },
      { label: '1 Month', price: '₹1,899' },
    ],
  },
  {
    icon: '🎓',
    title: 'Personal Mentor',
    desc: 'From defense discipline to Google innovation — elite guidance.',
    fullDesc: `This Mentor's journey is a testament to reinvention and purpose. Once a disciplined leader in the defense forces, they now bring the same precision and resilience to Google's innovation hubs. Each weekend session is a bridge connecting past discipline with future ambition. Your potential is limitless — this mentor will help you prove it.`,
    pricing: [
      { label: 'Weekend', price: '₹699' },
      { label: '4 Weekends', price: '₹2,499' },
    ],
    note: '*Different rates for Pro, Gold & Elite members',
  },
]

function ServiceCard({ service, index, onBook }: {
  service: typeof services[0]
  index: number
  onBook: (s: typeof services[0]) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientY - rect.top - rect.height / 2) / 15
    const y = -(e.clientX - rect.left - rect.width / 2) / 15
    setRotateX(x)
    setRotateY(y)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setHovered(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: hovered ? 'transform 0.1s ease' : 'transform 0.5s ease',
      }}
      className="glass-card rounded-2xl p-8 relative overflow-hidden group cursor-pointer"
    >
      <div className={`absolute inset-0 bg-gradient-to-br from-[#C9A84C]/0 to-[#C9A84C]/0
        ${hovered ? 'from-[#C9A84C]/5' : ''} transition-all duration-500 rounded-2xl`} />

      <div className={`absolute top-0 left-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent
        transition-all duration-700 ${hovered ? 'w-full' : 'w-0'}`} />

      <div className="relative z-10">
        <motion.div
          animate={{ y: hovered ? -5 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-4xl mb-5"
        >
          {service.icon}
        </motion.div>

        <h3 className={`text-2xl font-playfair font-bold mb-3 transition-colors duration-300
          ${hovered ? 'text-[#C9A84C]' : 'text-white'}`}>
          {service.title}
        </h3>

        <p className="text-[#E5E4E2]/60 text-sm leading-relaxed mb-4">{service.desc}</p>

        {service.fullDesc && (
          <div>
            {expanded && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[#E5E4E2]/45 text-xs leading-relaxed mb-4 border-t border-[#C9A84C]/10 pt-4"
              >
                {service.fullDesc}
              </motion.p>
            )}
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 text-[10px] tracking-widest text-[#C9A84C]/60 uppercase mb-4 hover:text-[#C9A84C] transition-colors"
            >
              {expanded
                ? <><ChevronUp className="w-3 h-3" /> Read Less</>
                : <><ChevronDown className="w-3 h-3" /> Read More</>}
            </button>
          </div>
        )}

        {service.pricing.length > 0 && (
          <div className="space-y-2 mb-4">
            {service.pricing.map((p) => (
              <div key={p.label} className="flex justify-between items-center py-2 border-b border-[#C9A84C]/10">
                <span className="text-xs tracking-wider text-[#E5E4E2]/40 uppercase">{p.label}</span>
                <span className="text-sm font-bold gold-text">{p.price}</span>
              </div>
            ))}
          </div>
        )}

        {service.note && (
          <p className="text-[10px] text-[#C9A84C]/50 italic mb-4">{service.note}</p>
        )}

        <motion.button
          onClick={() => onBook(service)}
          whileHover={{ x: 5 }}
          className="flex items-center gap-2 text-xs tracking-widest text-[#C9A84C] uppercase mt-4 group/btn"
        >
          <span>Book Now</span>
          <ArrowUpRight className="w-3 h-3 group-hover/btn:rotate-45 transition-transform duration-300" />
        </motion.button>
      </div>
    </motion.div>
  )
}

export default function ServicesGrid() {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['5%', '-5%'])

  return (
    <section ref={ref} id="services" className="relative py-28 overflow-hidden">
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <Image src="/book.jpg.jpeg" alt="Services Background" fill className="object-cover object-center" quality={90} />
        <div className="absolute inset-0 bg-[#0A0A0A]/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,168,76,0.05),transparent_60%)]" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
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
            <span className="text-xs tracking-[0.4em] text-[#C9A84C] uppercase">Our Services</span>
            <motion.div className="h-px bg-[#C9A84C]/50"
              initial={{ width: 0 }} whileInView={{ width: 48 }} viewport={{ once: true }} transition={{ duration: 1 }} />
          </div>
          <h2 className="text-5xl md:text-7xl font-playfair font-black gold-text mb-6">
            World-Class<br />Professionals
          </h2>
          <p className="text-[#E5E4E2]/60 text-lg max-w-2xl mx-auto">
            Every professional is verified, elite, and ready on demand. Your standards are our minimum.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
              onBook={setSelectedService}
            />
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
<ParallaxBg src="/book.jpg.jpeg" opacity={0.85} />