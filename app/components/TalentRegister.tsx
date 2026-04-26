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

export default function TalentRegister() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [form, setForm] = useState({
    name: '', email: '', phone: '', category: '',
    experience: '', bio: '', portfolio: '', certification: '', rate: '',
  })

  const update = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }))
    setErrors(prev => ({ ...prev, [key]: '' }))
  }

  const validateStep1 = () => {
    const newErrors: { [key: string]: string } = {}
    if (!form.name.trim() || form.name.trim().length < 2)
      newErrors.name = '⚠️ Valid naam daalo (min 2 characters)'
    if (!validateEmail(form.email))
      newErrors.email = '⚠️ Valid email daalo (e.g. name@gmail.com)'
    if (!form.phone || !isValidPhoneNumber(form.phone))
      newErrors.phone = '⚠️ Valid phone number daalo'
    if (!form.category)
      newErrors.category = '⚠️ Category select karo'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors: { [key: string]: string } = {}
    if (!form.experience.trim())
      newErrors.experience = '⚠️ Experience daalo'
    if (!form.bio.trim() || form.bio.trim().length < 10)
      newErrors.bio = '⚠️ Bio thoda detail mein likho (min 10 characters)'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep3 = () => {
    const newErrors: { [key: string]: string } = {}
    if (!form.certification.trim())
      newErrors.certification = '⚠️ Certification / Qualification daalo'
    if (!form.rate.trim())
      newErrors.rate = '⚠️ Expected rate daalo'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateStep3()) return
    setLoading(true)
    try {
      await supabase.from('talent_registrations').insert({
        name: form.name, email: form.email, phone: form.phone,
        category: form.category, experience: form.experience,
        bio: form.bio, portfolio: form.portfolio || 'Not provided',
        certification: form.certification, rate: form.rate, status: 'pending'
      })

      await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'TALENT REGISTRATION', ...form }),
      })

      const msg =
        `🌟 *New Talent Registration on ATLAS!*%0A%0A` +
        `👤 *Name:* ${form.name}%0A` +
        `📱 *Phone:* ${form.phone}%0A` +
        `📧 *Email:* ${form.email}%0A` +
        `🎯 *Category:* ${form.category}%0A` +
        `⏳ *Experience:* ${form.experience}%0A` +
        `💰 *Rate:* ${form.rate}/day%0A` +
        `🔗 *Portfolio:* ${form.portfolio || 'Not provided'}%0A%0A` +
        `_ATLAS — Your World, Our Promise._`

      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank')
      setSubmitted(true)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const inputClass = (field: string) =>
    `w-full bg-[#0A0A0A]/80 border ${errors[field] ? 'border-red-500/50' : 'border-[#C9A84C]/20'} rounded-xl px-4 py-3 text-white placeholder-[#E5E4E2]/20 focus:outline-none focus:border-[#C9A84C]/60 transition-colors text-sm`

  const labelClass = "text-xs tracking-widest text-[#E5E4E2]/40 uppercase mb-2 block"

  return (
    <section id="join" className="relative py-28 overflow-hidden">

      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/samuraye.jpg.jpeg"
          alt="Join Background"
          fill
          className="object-cover object-center"
          quality={90}
        />
        <div className="absolute inset-0 bg-[#0A0A0A]/88" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.05),transparent_70%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
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
            <span className="text-xs tracking-[0.4em] text-[#C9A84C] uppercase">Join As Talent</span>
            <motion.div className="h-px bg-[#C9A84C]/50"
              initial={{ width: 0 }} whileInView={{ width: 48 }} viewport={{ once: true }} transition={{ duration: 1 }} />
          </div>
          <h2 className="text-5xl md:text-7xl font-playfair font-black text-white mb-6">
            Have a Skill?<br />
            <span className="gold-text">Get Paid For It.</span>
          </h2>
          <p className="text-[#E5E4E2]/60 text-lg max-w-2xl mx-auto">
            Join ATLAS as a verified professional. Share your expertise — we connect you with elite clients and you earn on your terms.
          </p>
        </motion.div>

        {/* 3 Steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 mb-20 max-w-4xl mx-auto"
        >
          {[
            { step: '01', title: 'Register', desc: 'Fill your profile with skills and certifications' },
            { step: '02', title: 'Get Verified', desc: 'Our team verifies your credentials within 48 hours' },
            { step: '03', title: 'Start Earning', desc: 'Get matched with elite clients and earn on your terms' },
          ].map((item, i) => (
            <motion.div
              key={item.step}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-card rounded-2xl p-6 text-center border border-[#C9A84C]/10"
            >
              <div className="text-3xl font-playfair font-black gold-text mb-3">{item.step}</div>
              <h3 className="text-lg font-playfair font-bold text-white mb-2">{item.title}</h3>
              <p className="text-[#E5E4E2]/50 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="glass-card border border-[#C9A84C]/20 rounded-3xl p-10">
            {submitted ? (
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', duration: 0.6 }}
                >
                  <CheckCircle className="w-16 h-16 text-[#C9A84C] mx-auto mb-6" />
                </motion.div>
                <h3 className="text-3xl font-playfair font-black gold-text mb-4">
                  Application Submitted!
                </h3>
                <p className="text-[#E5E4E2]/60 mb-2">
                  Thank you, <span className="text-white font-bold">{form.name}</span>!
                </p>
                <p className="text-[#E5E4E2]/60 mb-6">
                  Our team will contact you at <span className="text-[#C9A84C]">{form.email}</span> within 48 hours.
                </p>
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent mx-auto mb-6" />
                <p className="text-xs text-[#E5E4E2]/30 tracking-widest uppercase">
                  Welcome to the ATLAS family
                </p>
              </div>
            ) : (
              <>
                {/* Step Indicator */}
                <div className="flex items-center justify-center gap-3 mb-10">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className="flex items-center gap-3">
                      <motion.div
                        animate={{ scale: step === s ? 1.1 : 1 }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300
                          ${step >= s ? 'bg-gradient-to-r from-[#C9A84C] to-[#F0D080] text-[#0A0A0A]' : 'border border-[#C9A84C]/30 text-[#C9A84C]/50'}`}
                      >
                        {s}
                      </motion.div>
                      {s < 3 && <div className={`w-12 h-px transition-all duration-500 ${step > s ? 'bg-[#C9A84C]' : 'bg-[#C9A84C]/20'}`} />}
                    </div>
                  ))}
                </div>

                {/* STEP 1 */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-5"
                  >
                    <h3 className="text-xl font-playfair font-bold text-white mb-6">Basic Information</h3>

                    <div>
                      <label className={labelClass}>Full Name</label>
                      <input type="text" className={inputClass('name')}
                        placeholder="Your full name"
                        value={form.name} onChange={(e) => update('name', e.target.value)} />
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className={labelClass}>Email Address</label>
                      <input type="email" className={inputClass('email')}
                        placeholder="your@email.com"
                        value={form.email} onChange={(e) => update('email', e.target.value)} />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className={labelClass}>Phone Number</label>
                      <div className={`border ${errors.phone ? 'border-red-500/50' : 'border-[#C9A84C]/20'} rounded-xl overflow-hidden`}>
                        <PhoneInput
                          international
                          defaultCountry="IN"
                          value={form.phone}
                          onChange={(val) => update('phone', val || '')}
                          style={{ background: '#0A0A0A', padding: '12px 16px', color: 'white', fontSize: '14px' }}
                        />
                      </div>
                      {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className={labelClass}>Your Category</label>
                      <select className={inputClass('category')}
                        value={form.category}
                        onChange={(e) => update('category', e.target.value)}>
                        <option value="" disabled>Select your expertise</option>
                        <optgroup label="✅ Available Now">
                          {['Daily Planner', 'Dietitian', 'Content Writer', 'Digital Designer', 'Personal Editor', 'Communication Coach', 'Personal Mentor'].map(cat => (
                            <option key={cat} value={cat} className="bg-[#0A0A0A]">{cat}</option>
                          ))}
                        </optgroup>
                        <optgroup label="💻 Online — Creative & Content">
                          {['Video Editor', 'Thumbnail Designer', 'Social Media Manager', 'SEO Specialist', 'Copywriter', 'Scriptwriter', 'Podcast Editor', 'Motion Graphics Designer', 'UI/UX Designer', 'Logo & Brand Designer', 'Instagram Growth Expert', 'YouTube Channel Manager'].map(cat => (
                            <option key={cat} value={cat} className="bg-[#0A0A0A]">{cat}</option>
                          ))}
                        </optgroup>
                        <optgroup label="💻 Online — Tech & Development">
                          {['Web Developer', 'App Developer', 'WordPress Expert', 'Shopify Expert', 'Python Developer', 'Data Analyst', 'AI/ML Expert', 'Cybersecurity Expert', 'Database Manager', 'Tech Support Specialist'].map(cat => (
                            <option key={cat} value={cat} className="bg-[#0A0A0A]">{cat}</option>
                          ))}
                        </optgroup>
                        <optgroup label="💻 Online — Business & Finance">
                          {['Business Consultant', 'Financial Advisor', 'Investment Advisor', 'Tax Consultant', 'Accounting Expert', 'E-commerce Consultant', 'Amazon/Flipkart Seller Expert', 'Digital Marketing Expert', 'Performance Marketing Expert', 'Lead Generation Expert'].map(cat => (
                            <option key={cat} value={cat} className="bg-[#0A0A0A]">{cat}</option>
                          ))}
                        </optgroup>
                        <optgroup label="💻 Online — Education & Coaching">
                          {['Online Tutor', 'UPSC/IAS Coach', 'CAT/MBA Mentor', 'English Speaking Coach', 'Soft Skills Trainer', 'Interview Preparation Coach', 'Study Planner', 'Career Counselor', 'Life Coach', 'Relationship Coach'].map(cat => (
                            <option key={cat} value={cat} className="bg-[#0A0A0A]">{cat}</option>
                          ))}
                        </optgroup>
                        <optgroup label="💻 Online — Health & Wellness">
                          {['Online Fitness Trainer', 'Yoga Instructor', 'Meditation Coach', 'Mental Health Coach', 'Sleep Coach', 'Weight Loss Coach', 'Sports Nutritionist'].map(cat => (
                            <option key={cat} value={cat} className="bg-[#0A0A0A]">{cat}</option>
                          ))}
                        </optgroup>
                        <optgroup label="🏢 Offline — Professional Services">
                          {['Personal Trainer', 'Private Doctor', 'Personal Chef', 'Security Expert / Bodyguard', 'Event Planner', 'Wedding Planner', 'Interior Designer', 'Personal Stylist / Fashion Consultant', 'Makeup Artist', 'Photographer', 'Videographer', 'Music Teacher', 'Dance Teacher', 'Driving Instructor', 'Home Tutor', 'Legal Advisor / Lawyer', 'Real Estate Consultant', 'Private Investigator', 'Language Translator', 'Sign Language Expert'].map(cat => (
                            <option key={cat} value={cat} className="bg-[#0A0A0A]">{cat}</option>
                          ))}
                        </optgroup>
                      </select>
                      {errors.category && <p className="text-red-400 text-xs mt-1">{errors.category}</p>}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => { if (validateStep1()) setStep(2) }}
                      className="w-full bg-gradient-to-r from-[#C9A84C] to-[#F0D080] text-[#0A0A0A] font-bold py-4 uppercase tracking-widest text-sm flex items-center justify-center gap-2"
                    >
                      Next Step <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </motion.div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-5"
                  >
                    <h3 className="text-xl font-playfair font-bold text-white mb-6">Professional Details</h3>

                    <div>
                      <label className={labelClass}>Years of Experience</label>
                      <input type="text" className={inputClass('experience')}
                        placeholder="e.g. 3 years"
                        value={form.experience} onChange={(e) => update('experience', e.target.value)} />
                      {errors.experience && <p className="text-red-400 text-xs mt-1">{errors.experience}</p>}
                    </div>

                    <div>
                      <label className={labelClass}>Your Bio / About You</label>
                      <textarea className={inputClass('bio') + " h-32 resize-none"}
                        placeholder="Tell us about yourself, your expertise and achievements..."
                        value={form.bio} onChange={(e) => update('bio', e.target.value)} />
                      {errors.bio && <p className="text-red-400 text-xs mt-1">{errors.bio}</p>}
                    </div>

                    <div>
                      <label className={labelClass}>
                        Portfolio / Work Link
                        <span className="text-[#C9A84C]/50 ml-2 normal-case">(Optional)</span>
                      </label>
                      <input type="url" className={inputClass('portfolio')}
                        placeholder="https://yourportfolio.com (optional)"
                        value={form.portfolio} onChange={(e) => update('portfolio', e.target.value)} />
                      <p className="text-[10px] text-[#E5E4E2]/25 mt-1">
                        ✅ Agar koi portfolio/work link nahi hai toh chhod sakte ho
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setStep(1)}
                        className="flex-1 py-4 border border-[#C9A84C]/30 text-[#C9A84C] text-sm tracking-widest uppercase hover:bg-[#C9A84C]/5 transition-all duration-300">
                        ← Back
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => { if (validateStep2()) setStep(3) }}
                        className="flex-1 bg-gradient-to-r from-[#C9A84C] to-[#F0D080] text-[#0A0A0A] font-bold py-4 uppercase tracking-widest text-sm">
                        Next →
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-5"
                  >
                    <h3 className="text-xl font-playfair font-bold text-white mb-6">Certifications & Rate</h3>

                    <div>
                      <label className={labelClass}>Certifications / Qualifications</label>
                      <textarea className={inputClass('certification') + " h-28 resize-none"}
                        placeholder="e.g. MBA from IIM, Certified Nutritionist, 5 years teaching experience..."
                        value={form.certification} onChange={(e) => update('certification', e.target.value)} />
                      {errors.certification && <p className="text-red-400 text-xs mt-1">{errors.certification}</p>}
                      <p className="text-[10px] text-[#E5E4E2]/25 mt-1">
                        ✅ Degree, experience, skills — jo bhi hai likho
                      </p>
                    </div>

                    <div>
                      <label className={labelClass}>Expected Rate (per day in ₹)</label>
                      <input type="text" className={inputClass('rate')}
                        placeholder="e.g. ₹500"
                        value={form.rate} onChange={(e) => update('rate', e.target.value)} />
                      {errors.rate && <p className="text-red-400 text-xs mt-1">{errors.rate}</p>}
                    </div>

                    <div className="p-4 border border-[#C9A84C]/20 rounded-xl bg-[#C9A84C]/5">
                      <p className="text-sm text-white mb-1">📋 Document Verification</p>
                      <p className="text-xs text-[#E5E4E2]/40">
                        Submit karne ke baad hamari team email pe contact karegi — certificates aur ID proof verify karne ke liye.
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setStep(2)}
                        className="flex-1 py-4 border border-[#C9A84C]/30 text-[#C9A84C] text-sm tracking-widest uppercase hover:bg-[#C9A84C]/5 transition-all duration-300">
                        ← Back
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex-1 bg-gradient-to-r from-[#C9A84C] to-[#F0D080] text-[#0A0A0A] font-bold py-4 uppercase tracking-widest text-sm disabled:opacity-50">
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