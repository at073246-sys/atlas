'use client'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle, ShieldCheck, Lock, Star } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { services } from '../../data/services'
import BookingModal from '../../components/BookingModal'
import Footer from '../../components/Footer'

export default function ServiceDetail() {
  const { id } = useParams()
  const router = useRouter()
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  
  const service = services.find((s) => s.id === id)

  if (!service) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-playfair mb-4">Service Not Found</h1>
        <Link href="/" className="text-[#C9A84C] border-b border-[#C9A84C]">Return to World</Link>
      </div>
    )
  }

  return (
    <main className="bg-[#0A0A0A] min-h-screen text-white font-inter">
      {/* Premium Header */}
      <section className="relative py-20 overflow-hidden border-b border-[#C9A84C]/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(201,168,76,0.1),transparent_50%)]" />
        
        <div className="container mx-auto px-6 relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-[#E5E4E2]/40 hover:text-[#C9A84C] transition-colors mb-12 uppercase tracking-widest text-xs">
            <ArrowLeft className="w-4 h-4" />
            Back to World
          </Link>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-5xl mb-6">{service.icon}</div>
              <h1 className="text-5xl md:text-7xl font-playfair font-black mb-6 bg-gradient-to-r from-[#C9A84C] to-[#F0D080] bg-clip-text text-transparent">
                {service.title}
              </h1>
              <p className="text-2xl text-[#E5E4E2]/70 font-light mb-8 italic">
                "{service.powerStatement}"
              </p>
              <p className="text-[#E5E4E2]/50 text-lg leading-relaxed mb-10 max-w-xl">
                {service.desc} Our professionals are hand-picked for their exceptional expertise and commitment to your success.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-10">
                <div className="flex items-center gap-2 px-4 py-2 bg-[#0D1B2A] border border-[#C9A84C]/20 rounded-full text-[#C9A84C] text-xs">
                  <ShieldCheck className="w-4 h-4" />
                  Verified Elite
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-[#0D1B2A] border border-[#C9A84C]/20 rounded-full text-[#C9A84C] text-xs">
                  <Lock className="w-4 h-4" />
                  NDA Protected
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-[#0D1B2A] border border-[#C9A84C]/20 rounded-full text-[#C9A84C] text-xs">
                  <Star className="w-4 h-4" />
                  Global Standards
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-[#0D1B2A]/80 to-[#0A0A0A] border border-[#C9A84C]/30 rounded-3xl p-10 backdrop-blur-xl shadow-2xl"
            >
              <h2 className="text-2xl font-playfair font-bold mb-8 text-white">Select Your Engagement</h2>
              <div className="space-y-4 mb-10">
                {service.pricing.map((p) => (
                  <div key={p.label} className="flex justify-between items-center p-5 border border-[#C9A84C]/10 rounded-2xl bg-[#0A0A0A]/50 hover:border-[#C9A84C]/40 transition-colors group">
                    <span className="text-sm tracking-widest text-[#E5E4E2]/60 uppercase">{p.label}</span>
                    <span className="text-xl font-bold text-[#C9A84C]">{p.price}</span>
                  </div>
                ))}
              </div>
              
              <button
                onClick={() => setIsBookingOpen(true)}
                className="w-full bg-gradient-to-r from-[#C9A84C] to-[#F0D080] text-[#0A0A0A] font-bold py-5 rounded-xl uppercase tracking-widest text-sm hover:scale-[1.02] transition-all duration-300 shadow-[0_0_30px_rgba(201,168,76,0.3)]"
              >
                Secure This Professional
              </button>
              <p className="text-center mt-6 text-[10px] text-[#E5E4E2]/30 tracking-widest uppercase">
                Instant Confirmation · 24/7 Priority Support
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-24 container mx-auto px-6">
        <div className="max-w-4xl">
          <h2 className="text-3xl font-playfair font-bold mb-12">The Elite Experience</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-[#C9A84C] font-bold mb-4 uppercase tracking-widest text-xs">What to Expect</h3>
              <ul className="space-y-4">
                {[
                  'Initial strategy alignment call',
                  'Dedicated professional dedicated to your vision',
                  'Daily progress reporting and refinement',
                  '24/7 direct access for urgent requests',
                  'Absolute confidentiality guarantee'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#E5E4E2]/60">
                    <CheckCircle className="w-4 h-4 text-[#C9A84C] mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[#C9A84C] font-bold mb-4 uppercase tracking-widest text-xs">Our Commitment</h3>
              <p className="text-sm text-[#E5E4E2]/50 leading-relaxed italic">
                "We do not just deliver a service; we deliver peace of mind. Every ATLAS professional is a master of their craft, ensuring that your world remains as extraordinary as you are."
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {isBookingOpen && (
        <BookingModal
          service={service}
          onClose={() => setIsBookingOpen(false)}
        />
      )}
    </main>
  )
}
