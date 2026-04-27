'use client'
import { motion } from 'framer-motion'
import { ShieldCheck, Lock, Star, Eye, Clock, CreditCard } from 'lucide-react'
import ParallaxBg from './ParallaxBg'

const trustPoints = [
  { icon: <ShieldCheck size={28} style={{ color: '#C9A84C' }} />, title: '100% Background Verified', desc: 'Every professional undergoes rigorous credential checks and background verification before joining.' },
  { icon: <Lock size={28} style={{ color: '#C9A84C' }} />, title: 'NDA on Every Engagement', desc: 'Your privacy is sacred. Every professional signs a strict NDA before they meet you.' },
  { icon: <Star size={28} style={{ color: '#C9A84C' }} />, title: 'Quality Guaranteed', desc: 'If you are not satisfied, we will make it right. Your satisfaction is our promise.' },
  { icon: <Eye size={28} style={{ color: '#C9A84C' }} />, title: 'Complete Privacy', desc: 'Your personal details, bookings, and engagements are strictly confidential. Always.' },
  { icon: <Clock size={28} style={{ color: '#C9A84C' }} />, title: '24/7 Support', desc: 'Our team is available via WhatsApp and email. No question goes unanswered.' },
  { icon: <CreditCard size={28} style={{ color: '#C9A84C' }} />, title: 'Secure Payments', desc: 'Every transaction is verified manually. Your payment is safe and tracked at every step.' },
]

const whyAtlas = [
  { icon: '🎯', title: 'Purpose-Driven', desc: 'ATLAS was built to make elite professionals accessible to everyone serious about growth.' },
  { icon: '🤝', title: 'Real Professionals', desc: 'Every professional is personally reviewed by our team before being listed.' },
  { icon: '🚀', title: 'Results First', desc: 'We are here to deliver real, measurable transformation in your life, career, and skills.' },
]

export default function TrustSection() {
  return (
    <section id="trust" style={{ position: 'relative', padding: '120px 0', overflow: 'hidden' }}>
      <ParallaxBg src="/eye.jpg.jpeg" opacity={0.85} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 24 }}>
            <motion.div style={{ height: 1, background: 'rgba(201,168,76,0.5)' }} initial={{ width: 0 }} whileInView={{ width: 40 }} viewport={{ once: true }} transition={{ duration: 1 }} />
            <span style={{ fontSize: 10, letterSpacing: '0.4em', color: '#C9A84C', textTransform: 'uppercase' }}>Trust & Credibility</span>
            <motion.div style={{ height: 1, background: 'rgba(201,168,76,0.5)' }} initial={{ width: 0 }} whileInView={{ width: 40 }} viewport={{ once: true }} transition={{ duration: 1 }} />
          </div>
          <h2 className="font-playfair gold-text" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontWeight: 900, marginBottom: 16 }}>Why Trust Us</h2>
          <p style={{ color: 'rgba(229,228,226,0.6)', fontSize: 16, maxWidth: 580, margin: '0 auto', lineHeight: 1.8 }}>
            We built ATLAS on three principles — Transparency, Quality, and Results. No shortcuts. No compromises.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 80 }}>
          {trustPoints.map((point, index) => (
            <motion.div key={point.title}
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: (index % 3) * 0.15 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-card" style={{ borderRadius: 16, padding: 28, position: 'relative', overflow: 'hidden' }}>
              <div style={{ marginBottom: 16, padding: 10, display: 'inline-block', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 12, background: 'rgba(201,168,76,0.05)' }}>
                {point.icon}
              </div>
              <h3 className="font-playfair" style={{ fontSize: 17, fontWeight: 700, color: 'white', marginBottom: 8 }}>{point.title}</h3>
              <p style={{ color: 'rgba(229,228,226,0.5)', fontSize: 13, lineHeight: 1.7 }}>{point.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 32 }}>
          <h3 className="font-playfair" style={{ fontSize: 28, fontWeight: 700, color: 'white', marginBottom: 8 }}>
            Why <span className="gold-text">ATLAS</span> Exists
          </h3>
          <p style={{ color: 'rgba(229,228,226,0.4)', fontSize: 14, maxWidth: 500, margin: '0 auto' }}>
            We are a growing platform. Here is what we stand for.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
          {whyAtlas.map((item, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.2 }}
              whileHover={{ y: -5 }}
              className="glass-card" style={{ borderRadius: 16, padding: 28, borderLeft: '2px solid rgba(201,168,76,0.4)' }}>
              <div className="float-animation" style={{ fontSize: 32, marginBottom: 12, animationDelay: `${i * 0.4}s` }}>{item.icon}</div>
              <h4 className="font-playfair" style={{ fontSize: 16, fontWeight: 700, color: 'white', marginBottom: 8 }}>{item.title}</h4>
              <p style={{ color: 'rgba(229,228,226,0.55)', fontSize: 13, lineHeight: 1.7 }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}