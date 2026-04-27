'use client'
import { motion } from 'framer-motion'
import { ShieldCheck, Lock, Star } from 'lucide-react'
import ParallaxBg from './ParallaxBg'

export default function StatsSection() {
  return (
    <section style={{ position: 'relative', padding: '120px 0', overflow: 'hidden' }}>
      <ParallaxBg src="/globe.jpg.jpeg" opacity={0.82} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 24 }}>
            <motion.div style={{ height: 1, background: 'rgba(201,168,76,0.5)' }} initial={{ width: 0 }} whileInView={{ width: 40 }} viewport={{ once: true }} transition={{ duration: 1 }} />
            <span style={{ fontSize: 10, letterSpacing: '0.4em', color: '#C9A84C', textTransform: 'uppercase' }}>Who We Are</span>
            <motion.div style={{ height: 1, background: 'rgba(201,168,76,0.5)' }} initial={{ width: 0 }} whileInView={{ width: 40 }} viewport={{ once: true }} transition={{ duration: 1 }} />
          </div>
          <h2 className="font-playfair" style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', fontWeight: 900, color: 'white', marginBottom: 16, lineHeight: 1.1 }}>
            We Don&apos;t Sell Products.<br /><span className="gold-text">We Deliver People.</span>
          </h2>
          <p style={{ color: 'rgba(229,228,226,0.6)', fontSize: 16, maxWidth: 600, margin: '0 auto', lineHeight: 1.8, padding: '0 16px' }}>
            ATLAS connects you with the right professional — verified, elite, and ready on demand.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24, maxWidth: 900, margin: '0 auto 48px' }}>
          {[
            { icon: '🌍', title: 'Global Reach', desc: 'Professionals from across the world, at your service' },
            { icon: '⚡', title: 'On Demand', desc: 'Request a professional and get matched within hours' },
            { icon: '💎', title: 'Elite Only', desc: 'Every professional is handpicked and verified by our team' },
          ].map((item, i) => (
            <motion.div key={item.title}
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.2 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-card" style={{ borderRadius: 16, padding: '32px 24px', textAlign: 'center' }}>
              <div className="float-animation" style={{ fontSize: 40, marginBottom: 16, animationDelay: `${i * 0.5}s` }}>{item.icon}</div>
              <h3 className="font-playfair" style={{ fontSize: 18, fontWeight: 700, color: 'white', marginBottom: 8 }}>{item.title}</h3>
              <p style={{ color: 'rgba(229,228,226,0.5)', fontSize: 13, lineHeight: 1.7 }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
          {[
            { icon: <ShieldCheck size={16} />, label: 'Background Verified' },
            { icon: <Lock size={16} />, label: 'NDA Protected' },
            { icon: <Star size={16} />, label: 'Elite Rated' },
          ].map(badge => (
            <motion.div key={badge.label} whileHover={{ scale: 1.05, y: -3 }}
              className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 100, color: '#C9A84C', fontSize: 13 }}>
              {badge.icon}<span>{badge.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}