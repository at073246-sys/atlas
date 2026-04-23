'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Upload, CheckCircle, ArrowRight } from 'lucide-react'

const categories = [
  'Daily Planner', 'Dietitian', 'Content Writer', 'Digital Designer',
  'Personal Editor', 'Communication Coach', 'Personal Mentor',
  'Personal Trainer', 'Private Doctor', 'Personal Chef',
  'Security Expert', 'Financial Advisor'
]

export default function TalentRegister() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    experience: '',
    bio: '',
    portfolio: '',
    certification: '',
    rate: '',
  })

  const update = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  const inputClass = "w-full bg-[#0A0A0A] border border-[#C9A84C]/20 rounded-xl px-4 py-3 text-white placeholder-[#E5E4E2]/20 focus:outline-none focus:border-[#C9A84C]/60 transition-colors text-sm"
  const labelClass = "text-xs tracking-widest text-[#E5E4E2]/40 uppercase mb-2 block"

  return (
    <section id="join" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(13,27,42,0.5),transparent_70%)]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
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

        {/* How it works for talent */}
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

        {/* Registration Form */}
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
                  Our team will review your profile and contact you at <span className="text-[#C9A84C]">{form.email}</span> within 48 hours.
                </p>
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent mx-auto mb-6" />
                <p className="text-xs text-[#E5E4E2]/30 tracking-widest uppercase">
                  Welcome to the ATLAS family
                </p>
              </div>
            ) : (
              <>
                {/* Steps indicator */}
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

                {/* Step 1 - Basic Info */}
                {step === 1 && (
                  <div className="space-y-5">
                    <h3 className="text-xl font-playfair font-bold text-white mb-6">Basic Information</h3>
                    <div>
                      <label className={labelClass}>Full Name</label>
                      <input type="text" className={inputClass} placeholder="Your full name"
                        value={form.name} onChange={(e) => update('name', e.target.value)} />
                    </div>
                    <div>
                      <label className={labelClass}>Email Address</label>
                      <input type="email" className={inputClass} placeholder="your@email.com"
                        value={form.email} onChange={(e) => update('email', e.target.value)} />
                    </div>
                    <div>
                      <label className={labelClass}>Phone Number</label>
                      <input type="tel" className={inputClass} placeholder="+91 XXXXX XXXXX"
                        value={form.phone} onChange={(e) => update('phone', e.target.value)} />
                    </div>
                    <div>
                      <label className={labelClass}>Your Category</label>
                      <select className={inputClass} value={form.category}
                        onChange={(e) => update('category', e.target.value)}>
                        <option value="" disabled>Select your expertise</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat} className="bg-[#0A0A0A]">{cat}</option>
                        ))}
                      </select>
                    </div>
                    <button
                      onClick={() => setStep(2)}
                      disabled={!form.name || !form.email || !form.phone || !form.category}
                      className="w-full bg-gradient-to-r from-[#C9A84C] to-[#F0D080] text-[#0A0A0A] font-bold py-4 uppercase tracking-widest text-sm hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      Next Step <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Step 2 - Professional Info */}
                {step === 2 && (
                  <div className="space-y-5">
                    <h3 className="text-xl font-playfair font-bold text-white mb-6">Professional Details</h3>
                    <div>
                      <label className={labelClass}>Years of Experience</label>
                      <input type="text" className={inputClass} placeholder="e.g. 5 years"
                        value={form.experience} onChange={(e) => update('experience', e.target.value)} />
                    </div>
                    <div>
                      <label className={labelClass}>Your Bio / About You</label>
                      <textarea className={inputClass + " h-32 resize-none"} placeholder="Tell us about yourself, your expertise and what makes you elite..."
                        value={form.bio} onChange={(e) => update('bio', e.target.value)} />
                    </div>
                    <div>
                      <label className={labelClass}>Portfolio Link</label>
                      <input type="url" className={inputClass} placeholder="https://yourportfolio.com"
                        value={form.portfolio} onChange={(e) => update('portfolio', e.target.value)} />
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => setStep(1)}
                        className="flex-1 py-4 border border-[#C9A84C]/30 text-[#C9A84C] text-sm tracking-widest uppercase hover:bg-[#C9A84C]/5 transition-all duration-300">
                        ← Back
                      </button>
                      <button
                        onClick={() => setStep(3)}
                        disabled={!form.experience || !form.bio}
                        className="flex-1 bg-gradient-to-r from-[#C9A84C] to-[#F0D080] text-[#0A0A0A] font-bold py-4 uppercase tracking-widest text-sm hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next →
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3 - Certifications & Rate */}
                {step === 3 && (
                  <div className="space-y-5">
                    <h3 className="text-xl font-playfair font-bold text-white mb-6">Certifications & Rate</h3>
                    <div>
                      <label className={labelClass}>Certifications</label>
                      <textarea className={inputClass + " h-28 resize-none"}
                        placeholder="List your certifications, degrees, awards (e.g. MBA from IIM, Certified Nutritionist...)"
                        value={form.certification} onChange={(e) => update('certification', e.target.value)} />
                    </div>
                    <div>
                      <label className={labelClass}>Your Expected Rate (per day in ₹)</label>
                      <input type="text" className={inputClass} placeholder="e.g. ₹500"
                        value={form.rate} onChange={(e) => update('rate', e.target.value)} />
                    </div>
                    <div className="p-4 border border-[#C9A84C]/20 rounded-xl">
                      <div className="flex items-start gap-3">
                        <Upload className="w-5 h-5 text-[#C9A84C] mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-white mb-1">Document Upload</p>
                          <p className="text-xs text-[#E5E4E2]/40">After registration, our team will contact you to collect your certificates and ID proof via email.</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => setStep(2)}
                        className="flex-1 py-4 border border-[#C9A84C]/30 text-[#C9A84C] text-sm tracking-widest uppercase hover:bg-[#C9A84C]/5 transition-all duration-300">
                        ← Back
                      </button>
                      <button
                        onClick={handleSubmit}
                        disabled={!form.certification || !form.rate}
                        className="flex-1 bg-gradient-to-r from-[#C9A84C] to-[#F0D080] text-[#0A0A0A] font-bold py-4 uppercase tracking-widest text-sm hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Submit Application
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