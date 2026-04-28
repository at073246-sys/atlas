'use client'
import { motion } from 'framer-motion'
import { ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import BookingModal from './BookingModal'
import CinematicBg from './CinematicBg'

const services = [
  {
    icon: '📅',
    title: 'Daily Planner',
    desc: 'Structure your day with precision and purpose.',
    fullDesc: `Every goal begins with a single step, and for our Daily Planner, each step is anchored in discipline. An SGFI-certified sportsman who once pushed boundaries on the field, now crafts every day with precision and purpose. Whether you choose a single day, a week, or an entire month, each plan is a reflection of dedication — from early morning focus sessions to evening goal reviews. Designed for those who demand structure — whether you're a student in your 20s, a professional in your 30s, or a visionary balancing life's many demands.`,
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
    fullDesc: `From the cricket field to the forefront of health, our Dietitian's journey is one of dedication and transformation. As an SGFI-certified cricketer, they represented their state and KVS on the national stage — mastering discipline, resilience, and the power of precision. Today, that same commitment drives their approach to nutrition.`,
    pricing: [
      { label: '1 Week', price: '₹199' },
      { label: '1 Month', price: '₹599' },
    ],
  },
  {
    icon: '✍️',
    title: 'Content Writer',
    desc: 'Words crafted with purpose, strategy, and impact.',
    fullDesc: `There was a time when words were just tools — until this Content Writer discovered their true mastery. With a profound command of English and a deep passion for storytelling, every piece they craft is a bridge between insight and emotion.`,
    pricing: [
      { label: 'Per Post', price: '₹99' },
      { label: '5 Posts', price: '₹499' },
    ],
  },
  {
    icon: '🎨',
    title: 'Digital Designer',
    desc: 'Visual elegance that speaks before words do.',
    fullDesc: `This Digital Designer's path is a fusion of imagination and discipline. With a relentless drive for perfection, they transform concepts into visual elegance. Each design is a personal signature — timeless, bold, and crafted for those who aspire to stand out.`,
    pricing: [
      { label: '1 Post', price: '₹99' },
      { label: '5 Posts', price: '₹399' },
    ],
  },
  {
    icon: '✂️',
    title: 'Personal Editor',
    desc: 'Every word refined. Every edit purposeful.',
    fullDesc: `This Editor's journey is one of quiet dedication and unwavering focus. With a deep passion for language and a disciplined approach to their craft, they refine every word with care. Because the difference between good and great often lies in a single, perfectly chosen word.`,
    pricing: [
      { label: '1 Work', price: '₹1,199' },
      { label: '5 Works', price: '₹5,599' },
    ],
  },
  {
    icon: '🗣️',
    title: 'Communication Coach',
    desc: 'Turn your voice into your greatest asset.',
    fullDesc: `Once a quiet observer, now a voice that commands attention — our Communication Coach's story is one of discovery and mastery. With a Master's degree in English and a lifelong passion for language, they guide individuals from all walks of life on a journey to unlock their true voice.`,
    pricing: [
      { label: '1 Week', price: '₹499' },
      { label: '1 Month', price: '₹1,899' },
    ],
  },
  {
    icon: '🎓',
    title: 'Personal Mentor',
    desc: 'From defense discipline to Google innovation — elite guidance.',
    fullDesc: `This Mentor's journey is a testament to reinvention and purpose. Once a disciplined leader in the defense forces, they now bring the same precision and resilience to Google's innovation hubs. Each session is a bridge connecting past discipline with future ambition.`,
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.12 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setRotateX(0); setRotateY(0); setHovered(false) }}
      className="glass-card"
      style={{
        borderRadius: 16,
        padding: 28,
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: hovered ? 'transform 0.1s ease' : 'transform 0.5s ease',
      }}
    >
      {/* Top shine on hover */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.8), transparent)',
        opacity: hovered ? 1 : 0, transition: 'opacity 0.4s',
      }} />

      {/* Hover glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at top left, rgba(201,168,76,0.06), transparent 60%)',
        opacity: hovered ? 1 : 0, transition: 'opacity 0.4s', borderRadius: 16,
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <motion.div animate={{ y: hovered ? -4 : 0 }} transition={{ duration: 0.3 }} style={{ fontSize: 36, marginBottom: 16 }}>
          {service.icon}
        </motion.div>

        <h3 className="font-playfair" style={{ fontSize: 20, fontWeight: 700, marginBottom: 10, color: hovered ? '#C9A84C' : 'white', transition: 'color 0.3s' }}>
          {service.title}
        </h3>

        <p style={{ color: 'rgba(229,228,226,0.6)', fontSize: 13, lineHeight: 1.7, marginBottom: 14 }}>{service.desc}</p>

        {service.fullDesc && (
          <div>
            {expanded && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                style={{ color: 'rgba(229,228,226,0.45)', fontSize: 12, lineHeight: 1.8, marginBottom: 12, borderTop: '1px solid rgba(201,168,76,0.1)', paddingTop: 12 }}>
                {service.fullDesc}
              </motion.p>
            )}
            <button onClick={() => setExpanded(!expanded)}
              style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: 'rgba(201,168,76,0.6)', textTransform: 'uppercase', letterSpacing: '0.15em', background: 'none', border: 'none', cursor: 'pointer', marginBottom: 14, padding: 0 }}>
              {expanded ? <><ChevronUp size={12} /> Read Less</> : <><ChevronDown size={12} /> Read More</>}
            </button>
          </div>
        )}

        {service.pricing.length > 0 && (
          <div style={{ marginBottom: 14 }}>
            {service.pricing.map(p => (
              <div key={p.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
                <span style={{ fontSize: 11, letterSpacing: '0.1em', color: 'rgba(229,228,226,0.4)', textTransform: 'uppercase' }}>{p.label}</span>
                <span className="font-playfair gold-text" style={{ fontSize: 14, fontWeight: 700 }}>{p.price}</span>
              </div>
            ))}
          </div>
        )}

        {service.note && <p style={{ fontSize: 10, color: 'rgba(201,168,76,0.5)', fontStyle: 'italic', marginBottom: 12 }}>{service.note}</p>}

        <motion.button onClick={() => onBook(service)} whileHover={{ x: 5 }}
          style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, letterSpacing: '0.15em', color: '#C9A84C', textTransform: 'uppercase', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          Book Now <ArrowUpRight size={12} />
        </motion.button>
      </div>
    </motion.div>
  )
}

export default function ServicesGrid() {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null)

  return (
    <section id="services" style={{ position: 'relative', padding: '120px 0', overflow: 'hidden' }}>
      {/* 3D Parallax Background */}
      <CinematicBg src="/book.jpg.jpeg" opacity={0.85} anim="fall" />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 24 }}>
            <motion.div style={{ height: 1, background: 'rgba(201,168,76,0.5)' }} initial={{ width: 0 }} whileInView={{ width: 40 }} viewport={{ once: true }} transition={{ duration: 1 }} />
            <span style={{ fontSize: 10, letterSpacing: '0.4em', color: '#C9A84C', textTransform: 'uppercase' }}>Our Services</span>
            <motion.div style={{ height: 1, background: 'rgba(201,168,76,0.5)' }} initial={{ width: 0 }} whileInView={{ width: 40 }} viewport={{ once: true }} transition={{ duration: 1 }} />
          </div>
          <h2 className="font-playfair gold-text" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontWeight: 900, marginBottom: 16 }}>
            World-Class<br />Professionals
          </h2>
          <p style={{ color: 'rgba(229,228,226,0.6)', fontSize: 16, maxWidth: 580, margin: '0 auto', lineHeight: 1.8 }}>
            Every professional is verified, elite, and ready on demand. Your standards are our minimum.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} onBook={setSelectedService} />
          ))}
        </div>
      </div>

      {selectedService && (
        <BookingModal service={selectedService} onClose={() => setSelectedService(null)} />
      )}
    </section>
  )
}