'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { supabase } from '../lib/supabase'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import Image from 'next/image'

const FORMSPREE_URL = 'https://formspree.io/f/mqewwolv'
const WHATSAPP_NUMBER = '917550124573'
const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

const categoryGroups = [
  { label: '✅ Available Now', options: ['Daily Planner', 'Dietitian', 'Content Writer', 'Digital Designer', 'Personal Editor', 'Communication Coach', 'Personal Mentor'] },
  { label: '💻 Online — Creative & Content', options: ['Video Editor', 'Thumbnail Designer', 'Social Media Manager', 'SEO Specialist', 'Copywriter', 'Scriptwriter', 'Podcast Editor', 'Motion Graphics Designer', 'UI/UX Designer', 'Logo & Brand Designer', 'Instagram Growth Expert', 'YouTube Channel Manager'] },
  { label: '💻 Online — Tech & Development', options: ['Web Developer', 'App Developer', 'WordPress Expert', 'Shopify Expert', 'Python Developer', 'Data Analyst', 'AI/ML Expert', 'Cybersecurity Expert', 'Database Manager', 'Tech Support Specialist'] },
  { label: '💻 Online — Business & Finance', options: ['Business Consultant', 'Financial Advisor', 'Investment Advisor', 'Tax Consultant', 'Accounting Expert', 'E-commerce Consultant', 'Amazon/Flipkart Seller Expert', 'Digital Marketing Expert', 'Performance Marketing Expert', 'Lead Generation Expert'] },
  { label: '💻 Online — Education & Coaching', options: ['Online Tutor', 'UPSC/IAS Coach', 'CAT/MBA Mentor', 'English Speaking Coach', 'Soft Skills Trainer', 'Interview Preparation Coach', 'Study Planner', 'Career Counselor', 'Life Coach', 'Relationship Coach'] },
  { label: '💻 Online — Health & Wellness', options: ['Online Fitness Trainer', 'Yoga Instructor', 'Meditation Coach', 'Mental Health Coach', 'Sleep Coach', 'Weight Loss Coach', 'Sports Nutritionist'] },
  { label: '🏢 Offline — Professional Services', options: ['Personal Trainer', 'Private Doctor', 'Personal Chef', 'Security Expert / Bodyguard', 'Event Planner', 'Wedding Planner', 'Interior Designer', 'Personal Stylist / Fashion Consultant', 'Makeup Artist', 'Photographer', 'Videographer', 'Music Teacher', 'Dance Teacher', 'Driving Instructor', 'Home Tutor', 'Legal Advisor / Lawyer', 'Real Estate Consultant', 'Private Investigator', 'Language Translator', 'Sign Language Expert'] },
  { label: '✏️ Other', options: ['Other — I will describe below'] },
]

export default function TalentRegister() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [form, setForm] = useState({
    name: '', email: '', phone: '', category: '', otherCategory: '',
    experience: '', bio: '', portfolio: '', certification: '', rate: '',
  })

  const update = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }))
    setErrors(prev => ({ ...prev, [key]: '' }))
  }

  const finalCategory = form.category === 'Other — I will describe below'
    ? `Other: ${form.otherCategory}`
    : form.category

  const validateStep1 = () => {
    const newErrors: { [key: string]: string } = {}
    if (!form.name.trim() || form.name.trim().length < 2) newErrors.name = '⚠️ Enter a valid name'
    if (!validateEmail(form.email)) newErrors.email = '⚠️ Valid email daalo'
    if (!form.phone || !isValidPhoneNumber(form.phone)) newErrors.phone = '⚠️ Enter a valid phone number'
    if (!form.category) newErrors.category = '⚠️ Select a category '
    if (form.category === 'Other — I will deseribe below' && !form.otherCategory.trim()) newErrors.otherCategory = '⚠️ Describe your category'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors: { [key: string]: string } = {}
    if (!form.experience.trim()) newErrors.experience = '⚠️ Enter your experience'
    if (!form.bio.trim() || form.bio.trim().length < 10) newErrors.bio = '⚠️ Write your bio in detail'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep3 = () => {
    const newErrors: { [key: string]: string } = {}
    if (!form.certification.trim()) newErrors.certification = '⚠️ Enter your certification'
    if (!form.rate.trim()) newErrors.rate = '⚠️ Enter your expected rate'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const sendWhatsApp = (msg: string) => {
    const link = document.createElement('a')
    link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleSubmit = async () => {
    if (!validateStep3()) return
    setLoading(true)

    const waMsg =
      `🌟 *New Talent Registration — ATLAS!*%0A%0A` +
      `👤 *Name:* ${encodeURIComponent(form.name)}%0A` +
      `📱 *Phone:* ${encodeURIComponent(form.phone)}%0A` +
      `📧 *Email:* ${encodeURIComponent(form.email)}%0A` +
      `🎯 *Category:* ${encodeURIComponent(finalCategory)}%0A` +
      `⏳ *Experience:* ${encodeURIComponent(form.experience)}%0A` +
      `💰 *Rate:* ${encodeURIComponent(form.rate)}/day%0A` +
      `🔗 *Portfolio:* ${encodeURIComponent(form.portfolio || 'Not provided')}%0A%0A` +
      `_ATLAS — Your World, Our Promise._`

    // Send WhatsApp FIRST
    sendWhatsApp(waMsg)

    try {
      await supabase.from('talent_registrations').insert({
        name: form.name, email: form.email, phone: form.phone,
        category: finalCategory, experience: form.experience,
        bio: form.bio, portfolio: form.portfolio || 'Not provided',
        certification: form.certification, rate: form.rate, status: 'pending'
      })

      await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: `🌟 New Talent Registration — ${finalCategory} — ATLAS`,
          _replyto: form.email,
          type: 'TALENT REGISTRATION',
          name: form.name, email: form.email, phone: form.phone,
          category: finalCategory, experience: form.experience,
          bio: form.bio, portfolio: form.portfolio || 'Not provided',
          certification: form.certification, rate: form.rate,
        }),
      })

      setSubmitted(true)
    } catch (err) {
      console.error(err)
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = (field: string) => ({
    width: '100%', background: 'rgba(10,10,10,0.8)',
    border: `1px solid ${errors[field] ? 'rgba(239,68,68,0.5)' : 'rgba(201,168,76,0.2)'}`,
    borderRadius: 12, padding: '12px 16px', color: 'white', fontSize: 14,
    outline: 'none', boxSizing: 'border-box' as const,
  })

  const labelStyle = { fontSize: 10, letterSpacing: '0.15em', color: 'rgba(229,228,226,0.4)', textTransform: 'uppercase' as const, display: 'block', marginBottom: 8 }

  return (
    <section id="join" style={{ position: 'relative', padding: '120px 0', overflow: 'hidden' }}>
      {/* Cinematic Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Image src="/samuraye.jpg.jpeg" alt="Join" fill style={{ objectFit: 'cover', objectPosition: 'center' }} quality={90} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.88)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #0A0A0A, transparent, #0A0A0A)' }} />
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 24 }}>
            <motion.div style={{ height: 1, background: 'rgba(201,168,76,0.5)' }} initial={{ width: 0 }} whileInView={{ width: 40 }} viewport={{ once: true }} transition={{ duration: 1 }} />
            <span style={{ fontSize: 10, letterSpacing: '0.4em', color: '#C9A84C', textTransform: 'uppercase' }}>Join As Talent</span>
            <motion.div style={{ height: 1, background: 'rgba(201,168,76,0.5)' }} initial={{ width: 0 }} whileInView={{ width: 40 }} viewport={{ once: true }} transition={{ duration: 1 }} />
          </div>
          <h2 className="font-playfair" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontWeight: 900, color: 'white', marginBottom: 16 }}>
            Have a Skill?<br /><span className="gold-text">Get Paid For It.</span>
          </h2>
          <p style={{ color: 'rgba(229,228,226,0.6)', fontSize: 16, maxWidth: 600, margin: '0 auto', lineHeight: 1.8 }}>
            Join ATLAS as a verified professional. Share your expertise — we connect you with elite clients and you earn on your terms.
          </p>
        </motion.div>

        {/* 3 Steps */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, maxWidth: 800, margin: '0 auto 64px' }}>
          {[
            { step: '01', title: 'Register', desc: 'Fill your profile with skills and certifications' },
            { step: '02', title: 'Get Verified', desc: 'Our team verifies your credentials within 48 hours' },
            { step: '03', title: 'Start Earning', desc: 'Get matched with elite clients and earn on your terms' },
          ].map((item, i) => (
            <motion.div key={item.step} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.2 }}
              whileHover={{ y: -5 }} className="glass-card" style={{ borderRadius: 16, padding: '28px 20px', textAlign: 'center' }}>
              <div className="font-playfair gold-text" style={{ fontSize: 28, fontWeight: 900, marginBottom: 10 }}>{item.step}</div>
              <h3 className="font-playfair" style={{ fontSize: 16, fontWeight: 700, color: 'white', marginBottom: 6 }}>{item.title}</h3>
              <p style={{ color: 'rgba(229,228,226,0.5)', fontSize: 12, lineHeight: 1.7 }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Form */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ maxWidth: 680, margin: '0 auto' }}>
          <div className="glass-card" style={{ borderRadius: 24, padding: 40, border: '1px solid rgba(201,168,76,0.2)' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', duration: 0.6 }}>
                  <CheckCircle size={64} style={{ color: '#C9A84C', margin: '0 auto 24px' }} />
                </motion.div>
                <h3 className="font-playfair gold-text" style={{ fontSize: 28, fontWeight: 900, marginBottom: 16 }}>Application Submitted!</h3>
                <p style={{ color: 'rgba(229,228,226,0.6)', marginBottom: 8 }}>Thank you, <strong style={{ color: 'white' }}>{form.name}</strong>!</p>
                <p style={{ color: 'rgba(229,228,226,0.6)', marginBottom: 24 }}>Our team will contact you at <span style={{ color: '#C9A84C' }}>{form.email}</span> within 48 hours.</p>
                <div style={{ width: 80, height: 1, background: 'linear-gradient(to right, transparent, #C9A84C, transparent)', margin: '0 auto 16px' }} />
                <p style={{ fontSize: 10, color: 'rgba(229,228,226,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Welcome to the ATLAS family</p>
              </div>
            ) : (
              <>
                {/* Step Indicator */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 40 }}>
                  {[1, 2, 3].map((s) => (
                    <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <motion.div animate={{ scale: step === s ? 1.1 : 1 }}
                        style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, background: step >= s ? 'linear-gradient(to right, #C9A84C, #F0D080)' : 'transparent', color: step >= s ? '#0A0A0A' : 'rgba(201,168,76,0.5)', border: step >= s ? 'none' : '1px solid rgba(201,168,76,0.3)', transition: 'all 0.3s' }}>
                        {s}
                      </motion.div>
                      {s < 3 && <div style={{ width: 40, height: 1, background: step > s ? '#C9A84C' : 'rgba(201,168,76,0.2)', transition: 'background 0.5s' }} />}
                    </div>
                  ))}
                </div>

                {/* STEP 1 */}
                {step === 1 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <h3 className="font-playfair" style={{ fontSize: 20, fontWeight: 700, color: 'white' }}>Basic Information</h3>

                    <div>
                      <label style={labelStyle}>Full Name</label>
                      <input type="text" style={inputStyle('name')} placeholder="Your full name" value={form.name} onChange={e => update('name', e.target.value)} />
                      {errors.name && <p style={{ color: 'rgba(239,68,68,0.8)', fontSize: 11, marginTop: 4 }}>{errors.name}</p>}
                    </div>

                    <div>
                      <label style={labelStyle}>Email Address</label>
                      <input type="email" style={inputStyle('email')} placeholder="your@email.com" value={form.email} onChange={e => update('email', e.target.value)} />
                      {errors.email && <p style={{ color: 'rgba(239,68,68,0.8)', fontSize: 11, marginTop: 4 }}>{errors.email}</p>}
                    </div>

                    <div>
                      <label style={labelStyle}>Phone Number</label>
                      <div style={{ border: `1px solid ${errors.phone ? 'rgba(239,68,68,0.5)' : 'rgba(201,168,76,0.2)'}`, borderRadius: 12, overflow: 'hidden' }}>
                        <PhoneInput international defaultCountry="IN" value={form.phone}
                          onChange={val => update('phone', val || '')}
                          style={{ background: 'rgba(10,10,10,0.8)', padding: '12px 16px', color: 'white', fontSize: 14 }} />
                      </div>
                      {errors.phone && <p style={{ color: 'rgba(239,68,68,0.8)', fontSize: 11, marginTop: 4 }}>{errors.phone}</p>}
                    </div>

                    <div>
                      <label style={labelStyle}>Your Category</label>
                      <select style={{ ...inputStyle('category'), cursor: 'pointer' }} value={form.category} onChange={e => update('category', e.target.value)}>
                        <option value="" disabled>Select your expertise</option>
                        {categoryGroups.map(group => (
                          <optgroup key={group.label} label={group.label}>
                            {group.options.map(opt => (
                              <option key={opt} value={opt} style={{ background: '#0A0A0A' }}>{opt}</option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                      {errors.category && <p style={{ color: 'rgba(239,68,68,0.8)', fontSize: 11, marginTop: 4 }}>{errors.category}</p>}
                    </div>

                    {form.category === 'Other — I will describe below' && (
                      <div>
                        <label style={labelStyle}>Describe Your Skill / Category</label>
                        <input type="text" style={inputStyle('otherCategory')}
                          placeholder="e.g. Astrologer, Voice Artist, Tarot Reader..."
                          value={form.otherCategory} onChange={e => update('otherCategory', e.target.value)} />
                        {errors.otherCategory && <p style={{ color: 'rgba(239,68,68,0.8)', fontSize: 11, marginTop: 4 }}>{errors.otherCategory}</p>}
                        <p style={{ fontSize: 10, color: 'rgba(229,228,226,0.25)', marginTop: 4 }}>✅ Apni skill apne words mein likho</p>
                      </div>
                    )}

                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      onClick={() => { if (validateStep1()) setStep(2) }}
                      className="gold-button" style={{ width: '100%', justifyContent: 'center' }}>
                      Next Step <ArrowRight size={16} />
                    </motion.button>
                  </motion.div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <h3 className="font-playfair" style={{ fontSize: 20, fontWeight: 700, color: 'white' }}>Professional Details</h3>

                    <div>
                      <label style={labelStyle}>Years of Experience</label>
                      <input type="text" style={inputStyle('experience')} placeholder="e.g. 3 years" value={form.experience} onChange={e => update('experience', e.target.value)} />
                      {errors.experience && <p style={{ color: 'rgba(239,68,68,0.8)', fontSize: 11, marginTop: 4 }}>{errors.experience}</p>}
                    </div>

                    <div>
                      <label style={labelStyle}>Your Bio / About You</label>
                      <textarea style={{ ...inputStyle('bio'), height: 120, resize: 'none' }}
                        placeholder="Tell us about yourself, your expertise and achievements..."
                        value={form.bio} onChange={e => update('bio', e.target.value)} />
                      {errors.bio && <p style={{ color: 'rgba(239,68,68,0.8)', fontSize: 11, marginTop: 4 }}>{errors.bio}</p>}
                    </div>

                    <div>
                      <label style={labelStyle}>Portfolio / Work Link <span style={{ color: 'rgba(201,168,76,0.5)', textTransform: 'none', letterSpacing: 0 }}>(Optional)</span></label>
                      <input type="url" style={inputStyle('portfolio')} placeholder="https://yourportfolio.com" value={form.portfolio} onChange={e => update('portfolio', e.target.value)} />
                      <p style={{ fontSize: 10, color: 'rgba(229,228,226,0.25)', marginTop: 4 }}>✅ Nahi hai toh chhod sakte ho</p>
                    </div>

                    <div style={{ display: 'flex', gap: 10 }}>
                      <button onClick={() => setStep(1)} style={{ flex: 1, padding: 14, border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C', background: 'transparent', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', borderRadius: 6 }}>← Back</button>
                      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        onClick={() => { if (validateStep2()) setStep(3) }}
                        className="gold-button" style={{ flex: 2, justifyContent: 'center' }}>Next →</motion.button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <h3 className="font-playfair" style={{ fontSize: 20, fontWeight: 700, color: 'white' }}>Certifications & Rate</h3>

                    <div>
                      <label style={labelStyle}>Certifications / Qualifications</label>
                      <textarea style={{ ...inputStyle('certification'), height: 100, resize: 'none' }}
                        placeholder="e.g. MBA from IIM, Certified Nutritionist, 5 years teaching experience..."
                        value={form.certification} onChange={e => update('certification', e.target.value)} />
                      {errors.certification && <p style={{ color: 'rgba(239,68,68,0.8)', fontSize: 11, marginTop: 4 }}>{errors.certification}</p>}
                    </div>

                    <div>
                      <label style={labelStyle}>Expected Rate (per day in ₹)</label>
                      <input type="text" style={inputStyle('rate')} placeholder="e.g. ₹500" value={form.rate} onChange={e => update('rate', e.target.value)} />
                      {errors.rate && <p style={{ color: 'rgba(239,68,68,0.8)', fontSize: 11, marginTop: 4 }}>{errors.rate}</p>}
                    </div>

                    <div style={{ padding: 16, border: '1px solid rgba(201,168,76,0.2)', borderRadius: 12, background: 'rgba(201,168,76,0.04)' }}>
                      <p style={{ fontSize: 13, color: 'white', marginBottom: 4 }}>📋 Document Verification</p>
                      <p style={{ fontSize: 11, color: 'rgba(229,228,226,0.4)', lineHeight: 1.7 }}>After submission, our team will contact you via email to verify your certificates and ID proof..</p>
                    </div>

                    <div style={{ display: 'flex', gap: 10 }}>
                      <button onClick={() => setStep(2)} style={{ flex: 1, padding: 14, border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C', background: 'transparent', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', borderRadius: 6 }}>← Back</button>
                      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        onClick={handleSubmit} disabled={loading}
                        className="gold-button" style={{ flex: 2, justifyContent: 'center', opacity: loading ? 0.5 : 1 }}>
                        {loading ? 'Submitting...' : 'Submit Application'}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}