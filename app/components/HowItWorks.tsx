'use client'
import { motion } from 'framer-motion'
import { Search, UserCheck, CreditCard, Sparkles } from 'lucide-react'
import Image from 'next/image'
import CinematicBg from './CinematicBg'

const steps = [
  { number: '01', icon: <Search size={22} style={{ color: '#0A0A0A' }} />, title: 'Choose Your Need', desc: 'Browse our curated categories. Tell us exactly what you need.', image: '/book.jpg.jpeg' },
  { number: '02', icon: <UserCheck size={22} style={{ color: '#0A0A0A' }} />, title: 'Pick Your Professional', desc: 'Browse verified profiles, fees, and availability. Only the best.', image: '/samuraye.jpg.jpeg' },
  { number: '03', icon: <CreditCard size={22} style={{ color: '#0A0A0A' }} />, title: 'One Payment, Full Access', desc: 'Book, pay securely, and they arrive. No hidden fees.', image: '/sun.jpg.jpeg' },
  { number: '04', icon: <Sparkles size={22} style={{ color: '#0A0A0A' }} />, title: 'Experience Excellence', desc: 'This is what it feels like when the world works for you.', image: '/ceow.jpg.jpeg' },
]

export default function HowItWorks() {
  return (
    <section style={{ position: 'relative', padding: '120px 0', overflow: 'hidden' }}>
      {/* watch.jpg — clock/dial rotation */}
      <CinematicBg src="/watch.jpg.jpeg" opacity={0.88} anim="clock" />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} style={{ textAlign: 'center', marginBottom: 80 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 24 }}>
            <motion.div style={{ height: 1, background: 'rgba(201,168,76,0.5)' }} initial={{ width: 0 }} whileInView={{ width: 40 }} viewport={{ once: true }} transition={{ duration: 1 }} />
            <span style={{ fontSize: 10, letterSpacing: '0.4em', color: '#C9A84C', textTransform: 'uppercase' }}>How It Works</span>
            <motion.div style={{ height: 1, background: 'rgba(201,168,76,0.5)' }} initial={{ width: 0 }} whileInView={{ width: 40 }} viewport={{ once: true }} transition={{ duration: 1 }} />
          </div>
          <h2 className="font-playfair" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontWeight: 900, color: 'white', marginBottom: 16 }}>
            Simple.<br /><span className="gold-text">Fast. Elite.</span>
          </h2>
          <p style={{ color: 'rgba(229,228,226,0.6)', fontSize: 16, maxWidth: 500, margin: '0 auto', lineHeight: 1.8 }}>
            Four steps stand between you and world-class service.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 32, maxWidth: 1100, margin: '0 auto 64px' }}>
          {steps.map((step, index) => (
            <motion.div key={step.number}
              initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: index * 0.2 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ position: 'relative', width: '100%', height: 140, borderRadius: 16, overflow: 'hidden', marginBottom: 24 }}>
                <Image src={step.image} alt={step.title} fill style={{ objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.5)' }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <motion.div whileHover={{ scale: 1.1, rotate: 5 }}
                    style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg, #C9A84C, #F0D080)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(201,168,76,0.5)' }}>
                    {step.icon}
                  </motion.div>
                </div>
                <div style={{ position: 'absolute', top: 8, right: 10, fontSize: 11, fontWeight: 900, color: '#C9A84C', fontFamily: 'Playfair Display, serif' }}>{step.number}</div>
              </div>
              <h3 className="font-playfair" style={{ fontSize: 17, fontWeight: 700, color: 'white', marginBottom: 8 }}>{step.title}</h3>
              <p style={{ color: 'rgba(229,228,226,0.45)', fontSize: 13, lineHeight: 1.7 }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <motion.a href="#membership" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="gold-button" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            Begin Your Journey <Sparkles size={16} />
          </motion.a>
        </div>
      </div>
    </section>
  )
}