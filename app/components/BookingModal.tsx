'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CreditCard, Smartphone, Building2 } from 'lucide-react'
import { useState } from 'react'

const FORMSPREE_URL = 'https://formspree.io/f/mqewwolv'
const WHATSAPP_NUMBER = '917550124573'

const durations = [
  { label: '1 Day', multiplier: 1 },
  { label: '1 Week', multiplier: 5 },
  { label: '1 Month', multiplier: 15 },
]

const paymentMethods = [
  { id: 'upi', label: 'UPI / GPay / PhonePe', icon: <Smartphone className="w-5 h-5" /> },
  { id: 'card', label: 'Credit / Debit Card', icon: <CreditCard className="w-5 h-5" /> },
  { id: 'bank', label: 'Net Banking', icon: <Building2 className="w-5 h-5" /> },
]

interface Props {
  service: { title: string; pricing: { label: string; price: string }[] }
  onClose: () => void
}

export default function BookingModal({ service, onClose }: Props) {
  const [selectedDuration, setSelectedDuration] = useState(0)
  const [selectedPayment, setSelectedPayment] = useState('upi')
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [booked, setBooked] = useState(false)
  const [loading, setLoading] = useState(false)

  const basePrice = service.pricing[0]?.price || '₹99'
  const numericPrice = parseInt(basePrice.replace(/[^\d]/g, '')) || 99
  const finalPrice = numericPrice * durations[selectedDuration].multiplier

  const handleBook = async () => {
    if (!name || !phone || !email) return
    setLoading(true)

    try {
      // Send to Formspree (Email notification)
      await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'BOOKING',
          client_name: name,
          client_phone: phone,
          client_email: email,
          service_name: service.title,
          duration: durations[selectedDuration].label,
          amount: `₹${finalPrice}`,
          payment_method: selectedPayment,
        }),
      })

      // Send WhatsApp notification
      const msg = `🔔 *New Booking on ATLAS!*%0A%0A` +
        `👤 *Name:* ${name}%0A` +
        `📱 *Phone:* ${phone}%0A` +
        `📧 *Email:* ${email}%0A` +
        `🛠 *Service:* ${service.title}%0A` +
        `⏳ *Duration:* ${durations[selectedDuration].label}%0A` +
        `💰 *Amount:* ₹${finalPrice}%0A` +
        `💳 *Payment:* ${selectedPayment}%0A%0A` +
        `_ATLAS — Your World, Our Promise._`

      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank')

      setBooked(true)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
        style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-lg bg-[#0D1B2A] border border-[#C9A84C]/30 rounded-3xl p-8 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-[#E5E4E2]/40 hover:text-[#C9A84C] transition-colors">
            <X className="w-6 h-6" />
          </button>

          {booked ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-6">🎉</div>
              <h3 className="text-3xl font-playfair font-black bg-gradient-to-r from-[#C9A84C] to-[#F0D080] bg-clip-text text-transparent mb-4">
                Booking Confirmed!
              </h3>
              <p className="text-[#E5E4E2]/60 mb-2">Service: <span className="text-white font-bold">{service.title}</span></p>
              <p className="text-[#E5E4E2]/60 mb-2">Duration: <span className="text-white font-bold">{durations[selectedDuration].label}</span></p>
              <p className="text-[#E5E4E2]/60 mb-6">Amount: <span className="text-[#C9A84C] font-bold">₹{finalPrice}</span></p>
              <p className="text-xs text-[#E5E4E2]/40 tracking-widest uppercase mb-8">
                Our team will contact you within 2 hours on {phone}
              </p>
              <button onClick={onClose} className="bg-gradient-to-r from-[#C9A84C] to-[#F0D080] text-[#0A0A0A] font-bold px-8 py-3 uppercase tracking-widest text-sm hover:scale-105 transition-all duration-300">
                Done
              </button>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-px w-8 bg-[#C9A84C]/50" />
                  <span className="text-xs tracking-[0.4em] text-[#C9A84C] uppercase">Book Service</span>
                </div>
                <h3 className="text-2xl font-playfair font-black text-white">{service.title}</h3>
              </div>

              {step === 1 && (
                <>
                  <div className="mb-6">
                    <p className="text-xs tracking-widest text-[#E5E4E2]/40 uppercase mb-4">Select Duration</p>
                    <div className="grid grid-cols-3 gap-3">
                      {durations.map((d, i) => (
                        <button key={d.label} onClick={() => setSelectedDuration(i)}
                          className={`p-4 border rounded-xl text-center transition-all duration-300
                            ${selectedDuration === i ? 'border-[#C9A84C] bg-[#C9A84C]/10' : 'border-[#C9A84C]/20 hover:border-[#C9A84C]/50'}`}>
                          <div className="text-sm font-bold text-white mb-1">{d.label}</div>
                          <div className="text-xs text-[#C9A84C]">₹{numericPrice * d.multiplier}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-xs tracking-widest text-[#E5E4E2]/40 uppercase mb-4">Payment Method</p>
                    <div className="space-y-3">
                      {paymentMethods.map((method) => (
                        <button key={method.id} onClick={() => setSelectedPayment(method.id)}
                          className={`w-full flex items-center gap-4 p-4 border rounded-xl transition-all duration-300
                            ${selectedPayment === method.id ? 'border-[#C9A84C] bg-[#C9A84C]/10' : 'border-[#C9A84C]/20 hover:border-[#C9A84C]/50'}`}>
                          <span className="text-[#C9A84C]">{method.icon}</span>
                          <span className="text-sm text-white">{method.label}</span>
                          {selectedPayment === method.id && <span className="ml-auto w-3 h-3 rounded-full bg-[#C9A84C]" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-6 p-4 border border-[#C9A84C]/20 rounded-xl">
                    <span className="text-[#E5E4E2]/60 text-sm">Total Amount</span>
                    <span className="text-2xl font-playfair font-black bg-gradient-to-r from-[#C9A84C] to-[#F0D080] bg-clip-text text-transparent">
                      ₹{finalPrice}
                    </span>
                  </div>

                  <button onClick={() => setStep(2)}
                    className="w-full bg-gradient-to-r from-[#C9A84C] to-[#F0D080] text-[#0A0A0A] font-bold py-4 uppercase tracking-widest text-sm hover:scale-105 transition-all duration-300">
                    Continue →
                  </button>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="space-y-4 mb-8">
                    <div>
                      <p className="text-xs tracking-widest text-[#E5E4E2]/40 uppercase mb-2">Your Name</p>
                      <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                        placeholder="Full Name"
                        className="w-full bg-[#0A0A0A] border border-[#C9A84C]/20 rounded-xl px-4 py-3 text-white placeholder-[#E5E4E2]/20 focus:outline-none focus:border-[#C9A84C]/60 transition-colors" />
                    </div>
                    <div>
                      <p className="text-xs tracking-widest text-[#E5E4E2]/40 uppercase mb-2">Phone Number</p>
                      <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full bg-[#0A0A0A] border border-[#C9A84C]/20 rounded-xl px-4 py-3 text-white placeholder-[#E5E4E2]/20 focus:outline-none focus:border-[#C9A84C]/60 transition-colors" />
                    </div>
                    <div>
                      <p className="text-xs tracking-widest text-[#E5E4E2]/40 uppercase mb-2">Email</p>
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full bg-[#0A0A0A] border border-[#C9A84C]/20 rounded-xl px-4 py-3 text-white placeholder-[#E5E4E2]/20 focus:outline-none focus:border-[#C9A84C]/60 transition-colors" />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => setStep(1)}
                      className="flex-1 py-4 border border-[#C9A84C]/30 text-[#C9A84C] text-sm tracking-widest uppercase hover:bg-[#C9A84C]/5 transition-all duration-300">
                      ← Back
                    </button>
                    <button onClick={handleBook}
                      disabled={!name || !phone || !email || loading}
                      className="flex-1 bg-gradient-to-r from-[#C9A84C] to-[#F0D080] text-[#0A0A0A] font-bold py-4 uppercase tracking-widest text-sm hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                      {loading ? 'Booking...' : 'Confirm Booking'}
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}