'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Upload, CheckCircle, ArrowRight } from 'lucide-react'
import { supabase } from '../lib/supabase'

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || ''
const WHATSAPP_NUMBER = '917550124573'

const categories = [
  'Daily Planner', 'Dietitian', 'Content Writer', 'Digital Designer',
  'Personal Editor', 'Communication Coach', 'Personal Mentor',
  'Personal Trainer', 'Private Doctor', 'Personal Chef',
  'Security Expert', 'Financial Advisor'
]

const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
const validatePhone = (phone: string) => /^[6-9]\d{9}$/.test(phone.replace(/\s+/g, ''))

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
    if (!form.name.trim() || form.name.trim().length < 2) {
      newErrors.name = '⚠️ Valid naam daalo (min 2 characters)'
    }
    if (!validateEmail(form.email)) {
      newErrors.email = '⚠️ Valid email daalo (e.g. name@gmail.com)'
    }
    if (!validatePhone(form.phone)) {
      newErrors.phone = '⚠️ Valid 10 digit Indian mobile number daalo'
    }
    if (!form.category) {
      newErrors.category = '⚠️ Category select karo'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors: { [key: string]: string } = {}
    if (!form.experience.trim()) {
      newErrors.experience = '⚠️ Experience daalo'
    }
    if (!form.bio.trim() || form.bio.trim().length < 20) {
      newErrors.bio = '⚠️ Bio thoda detail mein likho (min 20 characters)'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep3 = () => {
    const newErrors: { [key: string]: string } = {}
    if (!form.certification.trim()) {
      newErrors.certification = '⚠️ Certification daalo'
    }
    if (!form.rate.trim()) {
      newErrors.rate = '⚠️ Expected rate daalo'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext1 = () => {
    if (validateStep1()) setStep(2)
  }

  const handleNext2 = () => {
    if (validateStep2()) setStep(3)
  }

  const handleSubmit = async () => {
    if (!validateStep3()) return
    setLoading(true)
    try {
      // 1. Save to Supabase
      const { error: dbError } = await supabase.from('talents').insert({
        name: form.name,
        email: form.email,
        phone: form.phone,
        category: form.category,
        experience: form.experience,
        bio: form.bio,
        portfolio: form.portfolio,
        certification: form.certification,
        rate: form.rate,
      })
      if (dbError) console.error('Supabase Error:', dbError)

      // 2. Send Email via Web3Forms
      if (WEB3FORMS_KEY) {
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            subject: '🌟 New Talent Registration on ATLAS',
            from_name: 'ATLAS Talent Portal',
            name: form.name,
            email: form.email,
            phone: form.phone,
            category: form.category,
            experience: form.experience,
            bio: form.bio,
            portfolio: form.portfolio,
            certification: form.certification,
            rate: form.rate,
          }),
        })
      }

      const msg =
        `🌟 *New Talent Registration on ATLAS!*%0A%0A` +
        `👤 *Name:* ${form.name}%0A` +
        `📱 *Phone:* ${form.phone}%0A` +
        `📧 *Email:* ${form.email}%0A` +
        `🎯 *Category:* ${form.category}%0A` +
        `⏳ *Experience:* ${form.experience}%0A` +
        `💰 *Expected Rate:* ${form.rate}/day%0A` +
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
    `w-full bg-[#0A0A0A] border ${errors[field] ? 'border-red-500/50' : 'border-[#C9A84C]/20'} rounded-xl px-4 py-3 text-white placeholder-[#E5E4E2]/20 focus:outline-none focus:border-[#C9A84C]/60 transition-colors text-sm`

  const labelClass = "text-xs tracking-widest text-[#E5E4E2]/40 uppercase mb-2 block"

  return (
    <section id="join" className="py-28 relative overflow-hidden">
      {/* Blended 3D Background Element — Brain/Balance */}
      <motion.div
        animate={{ 
          rotate: [-1, 1, -1],
          y: [-5, 5, -5]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: 'easeInOut' 
        }}
        className="absolute -left-5 md:-left-20 top-1/4 w-[250px] h-[250px] md:w-[450px] md:h-[450px] pointer-events-none z-0 opacity-30 md:opacity-15"
      >
        <img
          src="/brain.jpg.jpeg"
          alt=""
          className="w-full h-full object-contain"
          style={{
            filter: 'brightness(0.7) saturate(1.2) contrast(1.1)',
            mixBlendMode: 'screen',
          }}
        />
      </motion.div>

      {/* Soft vignette for the brain element */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_0%_30%,transparent_20%,#0A0A0A_80%)] pointer-events-none z-[1]" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(13,27,42,0.5),transparent_70%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-[#C9A84C]/50" />
            <span className="text-xs tracking-[0.4em] text-[#C9A84C] uppercase">Join As Talent</span>
            <div className="h-px w-12 bg-[#C9A84C]/50" />
          </div>
          <h2 className="text-5xl md:text-7xl font-playfair font-black text-white mb-6">
            Have a Skill?<br />
            <span className="bg-gradient-to-r from-[#C9A84C] to-[#F0D080] bg-clip-text text-transparent">
              Get Paid For It.
            </span>
          </h2>
          <p className="text-[#E5E4E2]/60 text-lg max-w-2xl mx-auto">
            Join ATLAS as a verified professional. Share your portfolio, certifications, and expertise — we connect you with elite clients and you earn on your terms.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 mb-20 max-w-4xl mx-auto"
        >
          {[
            { step: '01', title: 'Register', desc: 'Fill your profile with skills, portfolio and certifications' },
            { step: '02', title: 'Get Verified', desc: 'Our team reviews and verifies your credentials within 48 hours' },
            { step: '03', title: 'Start Earning', desc: 'Get matched with elite clients and earn on your own terms' },
          ].map((item) => (
            <div key={item.step} className="bg-gradient-to-br from-[#0A0A0A]/85 to-[#0D1B2A]/85 border border-[#C9A84C]/20 rounded-2xl p-6 text-center">
              <div className="text-3xl font-playfair font-black bg-gradient-to-r from-[#C9A84C] to-[#F0D080] bg-clip-text text-transparent mb-3">
                {item.step}
              </div>
              <h3 className="text-lg font-playfair font-bold text-white mb-2">{item.title}</h3>
              <p className="text-[#E5E4E2]/50 text-sm">{item.desc}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-gradient-to-br from-[#0A0A0A]/85 to-[#0D1B2A]/85 border border-[#C9A84C]/30 rounded-3xl p-10">
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-[#C9A84C] mx-auto mb-6" />
                <h3 className="text-3xl font-playfair font-black bg-gradient-to-r from-[#C9A84C] to-[#F0D080] bg-clip-text text-transparent mb-4">
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
                {/* Step indicator */}
                <div className="flex items-center justify-center gap-3 mb-10">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300
                        ${step >= s
                          ? 'bg-gradient-to-r from-[#C9A84C] to-[#F0D080] text-[#0A0A0A]'
                          : 'border border-[#C9A84C]/30 text-[#C9A84C]/50'}`}>
                        {s}
                      </div>
                      {s < 3 && <div className={`w-12 h-px transition-all duration-300 ${step > s ? 'bg-[#C9A84C]' : 'bg-[#C9A84C]/20'}`} />}
                    </div>
                  ))}
                </div>

                {/* STEP 1 */}
                {step === 1 && (
                  <div className="space-y-5">
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
                      <input type="tel" className={inputClass('phone')}
                        placeholder="10 digit mobile number"
                        value={form.phone} onChange={(e) => update('phone', e.target.value)} />
                      {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className={labelClass}>Your Category</label>
                      <select className={inputClass('category')}
                        value={form.category}
                        onChange={(e) => update('category', e.target.value)}>
                        <option value="" disabled>Select your expertise</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat} className="bg-[#0A0A0A]">{cat}</option>
                        ))}
                      </select>
                      {errors.category && <p className="text-red-400 text-xs mt-1">{errors.category}</p>}
                    </div>

                    <button onClick={handleNext1}
                      className="w-full bg-gradient-to-r from-[#C9A84C] to-[#F0D080] text-[#0A0A0A] font-bold py-4 uppercase tracking-widest text-sm hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                      Next Step <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <div className="space-y-5">
                    <h3 className="text-xl font-playfair font-bold text-white mb-6">Professional Details</h3>

                    <div>
                      <label className={labelClass}>Years of Experience</label>
                      <input type="text" className={inputClass('experience')}
                        placeholder="e.g. 5 years"
                        value={form.experience} onChange={(e) => update('experience', e.target.value)} />
                      {errors.experience && <p className="text-red-400 text-xs mt-1">{errors.experience}</p>}
                    </div>

                    <div>
                      <label className={labelClass}>Your Bio / About You</label>
                      <textarea className={inputClass('bio') + " h-32 resize-none"}
                        placeholder="Tell us about yourself, your expertise..."
                        value={form.bio} onChange={(e) => update('bio', e.target.value)} />
                      {errors.bio && <p className="text-red-400 text-xs mt-1">{errors.bio}</p>}
                    </div>

                    <div>
                      <label className={labelClass}>Portfolio Link (Optional)</label>
                      <input type="url" className={inputClass('portfolio')}
                        placeholder="https://yourportfolio.com"
                        value={form.portfolio} onChange={(e) => update('portfolio', e.target.value)} />
                    </div>

                    <div className="flex gap-3">
                      <button onClick={() => setStep(1)}
                        className="flex-1 py-4 border border-[#C9A84C]/30 text-[#C9A84C] text-sm tracking-widest uppercase hover:bg-[#C9A84C]/5 transition-all duration-300">
                        ← Back
                      </button>
                      <button onClick={handleNext2}
                        className="flex-1 bg-gradient-to-r from-[#C9A84C] to-[#F0D080] text-[#0A0A0A] font-bold py-4 uppercase tracking-widest text-sm hover:scale-105 transition-all duration-300">
                        Next →
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                  <div className="space-y-5">
                    <h3 className="text-xl font-playfair font-bold text-white mb-6">Certifications & Rate</h3>

                    <div>
                      <label className={labelClass}>Certifications</label>
                      <textarea className={inputClass('certification') + " h-28 resize-none"}
                        placeholder="List your certifications, degrees, awards..."
                        value={form.certification} onChange={(e) => update('certification', e.target.value)} />
                      {errors.certification && <p className="text-red-400 text-xs mt-1">{errors.certification}</p>}
                    </div>

                    <div>
                      <label className={labelClass}>Expected Rate (per day in ₹)</label>
                      <input type="text" className={inputClass('rate')}
                        placeholder="e.g. ₹500"
                        value={form.rate} onChange={(e) => update('rate', e.target.value)} />
                      {errors.rate && <p className="text-red-400 text-xs mt-1">{errors.rate}</p>}
                    </div>

                    <div className="p-4 border border-[#C9A84C]/20 rounded-xl">
                      <div className="flex items-start gap-3">
                        <Upload className="w-5 h-5 text-[#C9A84C] mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-white mb-1">Document Upload</p>
                          <p className="text-xs text-[#E5E4E2]/40">
                            Our team will contact you to collect certificates and ID proof via email.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button onClick={() => setStep(2)}
                        className="flex-1 py-4 border border-[#C9A84C]/30 text-[#C9A84C] text-sm tracking-widest uppercase hover:bg-[#C9A84C]/5 transition-all duration-300">
                        ← Back
                      </button>
                      <button onClick={handleSubmit}
                        disabled={loading}
                        className="flex-1 bg-gradient-to-r from-[#C9A84C] to-[#F0D080] text-[#0A0A0A] font-bold py-4 uppercase tracking-widest text-sm hover:scale-105 transition-all duration-300 disabled:opacity-50">
                        {loading ? 'Submitting...' : 'Submit Application'}
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}