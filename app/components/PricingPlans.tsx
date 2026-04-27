'use client'
import { motion } from 'framer-motion'
import { CheckCircle, Crown, Sparkles, Mail } from 'lucide-react'
import { useState } from 'react'
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
      { name: 'Skills Coach', value: 'Basic skill-building roadmap' },
      { name: 'Content Writer', value: '2 posts/month' },
    ],
    focus: '🌟 Focus: Consistency + Foundation',
    durations: [
      { label: '1 Week', price: '₹399' },
      { label: '1 Month', price: '₹1,299' },
    ],
    popular: false,
    comingSoon: false,
    borderColor: 'rgba(229,228,226,0.12)',
    whatsappMsg: 'Hi! I want to subscribe to the PRO PLAN on ATLAS.',
  },
  {
    icon: '🟡',
    name: 'GOLD PLAN',
    tagline: 'Advanced Growth — Fast improvement',
    suitable: 'For serious individuals jo fast improvement chahte hain',
    services: [
      { name: 'Planner', value: 'Advanced + personalized' },
      { name: 'Dietitian', value: 'Weekly + detailed tracking' },
      { name: 'Skills Coach', value: 'Advanced learning system' },
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
    borderColor: 'rgba(201,168,76,0.25)',
    whatsappMsg: 'Hi! I want to subscribe to the GOLD PLAN on ATLAS.',
  },
  {
    icon: '🔶',
    name: 'ELITE PLAN',
    tagline: 'All-in Premium — Complete transformation',
    suitable: 'For high performers jo complete transformation chahte hain',
    services: [
      { name: 'Planner', value: 'Fully personalized + priority' },
      { name: 'Dietitian', value: 'Full month transformation plan' },
      { name: 'Skills Coach', value: 'Complete mastery roadmap' },
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
    borderColor: 'rgba(201,168,76,0.55)',
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
    focus: '🌟 Focus: Long-term mastery + exclusive perks',
    durations: [],
    popular: false,
    comingSoon: true,
    borderColor: 'rgba(155,89,182,0.25)',
    whatsappMsg: 'Hi! I want to join the ANNUAL PLAN waitlist on ATLAS.',
  },
]

const sendWhatsApp = (number: string, msg: string) => {
  const link = document.createElement('a')
  link.href = `https://wa.me/${number}?text=${msg}`
  link.target = '_blank'
  link.rel = 'noopener noreferrer'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export default function PricingPlans() {
  const [selectedDurations, setSelectedDurations] = useState<{ [key: string]: string }>({
    'PRO PLAN': '1 Month',
    'GOLD PLAN': '1 Month',
    'ELITE PLAN': '1 Month',
  })

  const handleWhatsApp = (plan: typeof plans[0]) => {
    const duration = selectedDurations[plan.name] || plan.durations[0]?.label || '1 Month'
    const durationObj = plan.durations.find(d => d.label === duration)
    const price = durationObj?.price || ''
    const msg = `${encodeURIComponent(plan.whatsappMsg)}%0A%0APlan: ${encodeURIComponent(plan.name)}%0ADuration: ${encodeURIComponent(duration)}%0APrice: ${encodeURIComponent(price)}%0A%0APlease confirm my booking.`
    sendWhatsApp(WHATSAPP_NUMBER, msg)
  }

  return (
    <section id="membership" style={{ position: 'relative', padding: '120px 0', overflow: 'hidden' }}>
      {/* 3D Parallax Background */}
      <ParallaxBg src="/king.jpg.jpeg" opacity={0.88} />

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 24 }}>
            <motion.div style={{ height: 1, background: 'rgba(201,168,76,0.5)' }} initial={{ width: 0 }} whileInView={{ width: 40 }} viewport={{ once: true }} transition={{ duration: 1 }} />
            <span style={{ fontSize: 10, letterSpacing: '0.4em', color: '#C9A84C', textTransform: 'uppercase' }}>Membership</span>
            <motion.div style={{ height: 1, background: 'rgba(201,168,76,0.5)' }} initial={{ width: 0 }} whileInView={{ width: 40 }} viewport={{ once: true }} transition={{ duration: 1 }} />
          </div>
          <h2 className="font-playfair" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontWeight: 900, color: 'white', marginBottom: 16 }}>
            Choose Your<br /><span className="gold-text">Level of Excellence</span>
          </h2>
          <p style={{ color: 'rgba(229,228,226,0.6)', fontSize: 16, maxWidth: 500, margin: '0 auto', lineHeight: 1.8 }}>
            Every plan is designed to transform you. Pick your level and start today.
          </p>
        </motion.div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, maxWidth: 1300, margin: '0 auto' }}>
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass-card"
              style={{
                borderRadius: 24,
                padding: 28,
                border: `2px solid ${plan.borderColor}`,
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                opacity: plan.comingSoon ? 0.65 : 1,
                boxShadow: plan.popular ? '0 0 80px rgba(201,168,76,0.2)' : 'none',
              }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 6, padding: '6px 16px', background: 'linear-gradient(to right, #C9A84C, #F0D080)', borderRadius: 100, whiteSpace: 'nowrap' }}
                >
                  <Crown size={12} style={{ color: '#0A0A0A' }} />
                  <span style={{ fontSize: 10, fontWeight: 900, color: '#0A0A0A', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Most Popular</span>
                </motion.div>
              )}

              {plan.comingSoon && (
                <div style={{ position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 6, padding: '6px 16px', border: '1px solid rgba(155,89,182,0.4)', borderRadius: 100, background: '#0A0A0A', whiteSpace: 'nowrap' }}>
                  <Sparkles size={12} style={{ color: '#9B59B6' }} />
                  <span style={{ fontSize: 10, color: '#9B59B6', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Coming Soon</span>
                </div>
              )}

              {plan.popular && (
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(to right, transparent, #C9A84C, transparent)', borderRadius: '24px 24px 0 0' }} />
              )}

              {/* Icon & Name */}
              <div className="float-animation" style={{ fontSize: 36, marginBottom: 12, animationDelay: `${index * 0.3}s` }}>{plan.icon}</div>

              <h3 className="font-playfair" style={{ fontSize: 18, fontWeight: 900, marginBottom: 4, letterSpacing: '0.08em', ...(plan.popular ? {} : { color: 'white' }) }}>
                {plan.popular ? <span className="gold-text">{plan.name}</span> : plan.name}
              </h3>
              <p style={{ fontSize: 13, color: 'rgba(229,228,226,0.4)', fontStyle: 'italic', marginBottom: 4 }}>{plan.tagline}</p>
              <p style={{ fontSize: 11, color: 'rgba(229,228,226,0.3)', letterSpacing: '0.05em', marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid rgba(201,168,76,0.1)' }}>{plan.suitable}</p>

              {/* Services */}
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: 16, flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {plan.services.map(service => (
                  <li key={service.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      <CheckCircle size={13} style={{ color: plan.popular ? '#C9A84C' : 'rgba(201,168,76,0.5)', flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontSize: 12, color: 'rgba(229,228,226,0.6)' }}>{service.name}</span>
                    </div>
                    <span style={{ fontSize: 10, color: 'rgba(201,168,76,0.5)', whiteSpace: 'nowrap', textAlign: 'right' }}>{service.value}</span>
                  </li>
                ))}
              </ul>

              {/* Focus */}
              <div style={{ padding: '10px 14px', border: '1px solid rgba(201,168,76,0.12)', borderRadius: 10, background: 'rgba(201,168,76,0.04)', marginBottom: 16 }}>
                <p style={{ fontSize: 11, color: 'rgba(229,228,226,0.4)', lineHeight: 1.6 }}>{plan.focus}</p>
              </div>

              {/* Duration */}
              {plan.durations.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <p style={{ fontSize: 10, letterSpacing: '0.1em', color: 'rgba(229,228,226,0.3)', textTransform: 'uppercase', marginBottom: 8 }}>Select Duration</p>
                  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${plan.durations.length}, 1fr)`, gap: 8 }}>
                    {plan.durations.map(d => (
                      <motion.button key={d.label}
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedDurations(prev => ({ ...prev, [plan.name]: d.label }))}
                        style={{ padding: '10px 8px', border: `1px solid ${selectedDurations[plan.name] === d.label ? '#C9A84C' : 'rgba(201,168,76,0.18)'}`, borderRadius: 10, background: selectedDurations[plan.name] === d.label ? 'rgba(201,168,76,0.15)' : 'transparent', cursor: 'pointer', textAlign: 'center', transition: 'all 0.3s' }}>
                        <div style={{ fontSize: 10, color: 'rgba(229,228,226,0.4)', marginBottom: 4 }}>{d.label}</div>
                        <div className="font-playfair gold-text" style={{ fontSize: 15, fontWeight: 700 }}>{d.price}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              {plan.comingSoon ? (
                <motion.button whileHover={{ scale: 1.02 }} onClick={() => handleWhatsApp(plan)}
                  style={{ width: '100%', padding: '14px', border: '1px solid rgba(155,89,182,0.4)', color: 'rgba(155,89,182,0.7)', background: 'transparent', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <Mail size={14} /> Join Waitlist
                </motion.button>
              ) : plan.popular ? (
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleWhatsApp(plan)}
                  className="gold-button" style={{ width: '100%', justifyContent: 'center', borderRadius: 12 }}>
                  <Crown size={14} /> Book on WhatsApp
                </motion.button>
              ) : (
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={() => handleWhatsApp(plan)}
                  style={{ width: '100%', padding: '14px', border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C', background: 'transparent', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', borderRadius: 10, transition: 'all 0.3s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(201,168,76,0.07)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  Book on WhatsApp
                </motion.button>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ textAlign: 'center', marginTop: 40 }}>
          <p style={{ fontSize: 11, letterSpacing: '0.2em', color: 'rgba(229,228,226,0.2)', textTransform: 'uppercase' }}>
            All plans include WhatsApp support · Annual plan coming soon
          </p>
        </motion.div>
      </div>
    </section>
  )
}