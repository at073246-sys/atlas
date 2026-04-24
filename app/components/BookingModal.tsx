'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Copy, Check, Smartphone, CreditCard, Building2 } from 'lucide-react'
import { useState } from 'react'

const FORMSPREE_URL = 'https://formspree.io/f/mqewwolv'
const WHATSAPP_NUMBER = '917550124573'
const UPI_ID = '7550124573@fam'

const durations = [
  { label: '1 Day', multiplier: 1 },
  { label: '1 Week', multiplier: 5 },
  { label: '1 Month', multiplier: 15 },
]

interface Props {
  service: { title: string; pricing: { label: string; price: string }[] }
  onClose: () => void
}

export default function BookingModal({ service, onClose }: Props) {
  const [step, setStep] = useState(1)
  const [selectedDuration, setSelectedDuration] = useState(0)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('upi_qr')
  const [transactionId, setTransactionId] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const basePrice = service.pricing[0]?.price || '₹99'
  const numericPrice = parseInt(basePrice.replace(/[^\d]/g, '')) || 99
  const finalPrice = numericPrice * durations[selectedDuration].multiplier

  const copyUPI = () => {
    navigator.clipboard.writeText(UPI_ID)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleConfirmPayment = async () => {
    if (!transactionId.trim()) {
      setError('⚠️ Please enter your Transaction ID / UTR Number')
      return
    }
    setError('')
    setLoading(true)
    try {
      await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: '✅ NEW BOOKING — PAYMENT RECEIVED',
          client_name: name,
          client_phone: phone,
          client_email: email,
          service_name: service.title,
          duration: durations[selectedDuration].label,
          amount: `₹${finalPrice}`,
          payment_method: paymentMethod,
          transaction_id: transactionId,
        }),
      })

      const msg =
        `✅ *Payment Received — New Booking!*%0A%0A` +
        `👤 *Name:* ${name}%0A` +
        `📱 *Phone:* ${phone}%0A` +
        `📧 *Email:* ${email}%0A` +
        `🛠 *Service:* ${service.title}%0A` +
        `⏳ *Duration:* ${durations[selectedDuration].label}%0A` +
        `💰 *Amount:* ₹${finalPrice}%0A` +
        `💳 *Payment:* ${paymentMethod}%0A` +
        `🔖 *Transaction ID:* ${transactionId}%0A%0A` +
        `_ATLAS — Your World, Our Promise._`

      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank')
      setDone(true)
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
        className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto py-8"
        style={{ backgroundColor: 'rgba(0,0,0,0.88)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-lg bg-[#0D1B2A] border border-[#C9A84C]/30 rounded-3xl p-8 relative my-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button onClick={onClose} className="absolute top-4 right-4 text-[#E5E4E2]/40 hover:text-[#C9A84C] transition-colors">
            <X className="w-6 h-6" />
          </button>

          {/* Header */}
          {!done && (
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-1">
                <div className="h-px w-8 bg-[#C9A84C]/50" />
                <span className="text-xs tracking-[0.4em] text-[#C9A84C] uppercase">Book Service</span>
              </div>
              <h3 className="text-xl font-playfair font-black text-white">{service.title}</h3>

              {/* Steps */}
              <div className="flex items-center gap-1 mt-4">
                {['Details', 'Pay', 'Confirm'].map((s, i) => (
                  <div key={s} className="flex items-center gap-1 flex-1">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all
                      ${step > i + 1 ? 'bg-[#C9A84C] text-[#0A0A0A]' :
                        step === i + 1 ? 'bg-gradient-to-r from-[#C9A84C] to-[#F0D080] text-[#0A0A0A]' :
                        'border border-[#C9A84C]/30 text-[#C9A84C]/40'}`}>
                      {i + 1}
                    </div>
                    <span className={`text-[10px] tracking-wider uppercase flex-1
                      ${step === i + 1 ? 'text-[#C9A84C]' : 'text-[#E5E4E2]/20'}`}>
                      {s}
                    </span>
                    {i < 2 && <div className="w-4 h-px bg-[#C9A84C]/20" />}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 1 — Details */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <p className="text-xs tracking-widest text-[#E5E4E2]/40 uppercase mb-3">Select Duration</p>
                <div className="grid grid-cols-3 gap-2">
                  {durations.map((d, i) => (
                    <button key={d.label} onClick={() => setSelectedDuration(i)}
                      className={`p-3 border rounded-xl text-center transition-all duration-300
                        ${selectedDuration === i ? 'border-[#C9A84C] bg-[#C9A84C]/10' : 'border-[#C9A84C]/20 hover:border-[#C9A84C]/50'}`}>
                      <div className="text-xs font-bold text-white">{d.label}</div>
                      <div className="text-xs text-[#C9A84C] mt-1">₹{numericPrice * d.multiplier}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs tracking-widest text-[#E5E4E2]/40 uppercase mb-2">Full Name</p>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full bg-[#0A0A0A] border border-[#C9A84C]/20 rounded-xl px-4 py-3 text-white placeholder-[#E5E4E2]/20 focus:outline-none focus:border-[#C9A84C]/60 transition-colors text-sm" />
              </div>

              <div>
                <p className="text-xs tracking-widest text-[#E5E4E2]/40 uppercase mb-2">Phone Number</p>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full bg-[#0A0A0A] border border-[#C9A84C]/20 rounded-xl px-4 py-3 text-white placeholder-[#E5E4E2]/20 focus:outline-none focus:border-[#C9A84C]/60 transition-colors text-sm" />
              </div>

              <div>
                <p className="text-xs tracking-widest text-[#E5E4E2]/40 uppercase mb-2">Email</p>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-[#0A0A0A] border border-[#C9A84C]/20 rounded-xl px-4 py-3 text-white placeholder-[#E5E4E2]/20 focus:outline-none focus:border-[#C9A84C]/60 transition-colors text-sm" />
              </div>

              <div className="flex justify-between items-center p-3 border border-[#C9A84C]/20 rounded-xl">
                <span className="text-[#E5E4E2]/50 text-sm">Total Amount</span>
                <span className="text-xl font-playfair font-black bg-gradient-to-r from-[#C9A84C] to-[#F0D080] bg-clip-text text-transparent">
                  ₹{finalPrice}
                </span>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!name || !phone || !email}
                className="w-full bg-gradient-to-r from-[#C9A84C] to-[#F0D080] text-[#0A0A0A] font-bold py-4 uppercase tracking-widest text-sm hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                Proceed to Payment →
              </button>
            </div>
          )}

          {/* STEP 2 — Payment */}
          {step === 2 && (
            <div className="space-y-4">
              <p className="text-xs tracking-widest text-[#E5E4E2]/40 uppercase mb-2">Payment Method</p>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'upi_qr', label: 'QR Code', icon: <Smartphone className="w-4 h-4" /> },
                  { id: 'upi_id', label: 'UPI ID', icon: <CreditCard className="w-4 h-4" /> },
                  { id: 'bank', label: 'Net Banking', icon: <Building2 className="w-4 h-4" /> },
                ].map((m) => (
                  <button key={m.id} onClick={() => setPaymentMethod(m.id)}
                    className={`p-3 border rounded-xl flex flex-col items-center gap-1 transition-all
                      ${paymentMethod === m.id ? 'border-[#C9A84C] bg-[#C9A84C]/10' : 'border-[#C9A84C]/20'}`}>
                    <span className="text-[#C9A84C]">{m.icon}</span>
                    <span className="text-[10px] text-white">{m.label}</span>
                  </button>
                ))}
              </div>

              {/* QR Code */}
              {paymentMethod === 'upi_qr' && (
                <div className="p-4 border border-[#C9A84C]/20 rounded-2xl text-center">
                  <p className="text-xs text-[#C9A84C] tracking-widest uppercase mb-3">Scan & Pay</p>
                  <div className="flex justify-center mb-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/qr.jpg" alt="UPI QR" width={160} height={160}
                      className="rounded-xl border border-[#C9A84C]/20" />
                  </div>
                  <p className="text-sm font-bold text-white">Ayan Thakur</p>
                  <p className="text-xs text-[#E5E4E2]/50 mb-2">{UPI_ID}</p>
                  <div className="p-2 bg-[#C9A84C]/10 rounded-xl">
                    <p className="text-lg font-black text-[#C9A84C]">₹{finalPrice}</p>
                  </div>
                  <p className="text-[10px] text-[#E5E4E2]/30 mt-2">GPay / PhonePe / Paytm → Scan → Pay</p>
                </div>
              )}

              {/* UPI ID */}
              {paymentMethod === 'upi_id' && (
                <div className="p-4 border border-[#C9A84C]/20 rounded-2xl">
                  <p className="text-xs text-[#C9A84C] tracking-widest uppercase mb-3">UPI ID Copy Karo</p>
                  <div className="flex items-center justify-between bg-[#0A0A0A] px-4 py-3 rounded-xl mb-3">
                    <span className="text-white font-bold text-sm">{UPI_ID}</span>
                    <button onClick={copyUPI} className="text-[#C9A84C] hover:scale-110 transition-transform ml-2">
                      {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                  <div className="p-2 bg-[#C9A84C]/10 rounded-xl text-center">
                    <p className="text-lg font-black text-[#C9A84C]">₹{finalPrice}</p>
                  </div>
                  <p className="text-[10px] text-[#E5E4E2]/30 mt-2">UPI ID copy karo → GPay/PhonePe → Pay</p>
                </div>
              )}

              {/* Net Banking */}
              {paymentMethod === 'bank' && (
                <div className="p-4 border border-[#C9A84C]/20 rounded-2xl text-center">
                  <p className="text-sm text-white mb-2">Bank transfer ke liye contact karo</p>
                  <p className="text-xs text-[#E5E4E2]/40">📧 atlasofficial2090@gmail.com</p>
                  <p className="text-xs text-[#E5E4E2]/40">📱 +91 7550124573</p>
                </div>
              )}

              {/* Transaction ID — REQUIRED */}
              <div className="p-4 border-2 border-[#C9A84C]/40 rounded-2xl bg-[#C9A84C]/5">
                <p className="text-xs tracking-widest text-[#C9A84C] uppercase mb-2">
                  ⚠️ Payment karne ke baad Transaction ID daalo
                </p>
                <input
                  type="text"
                  value={transactionId}
                  onChange={(e) => { setTransactionId(e.target.value); setError('') }}
                  placeholder="UTR / Transaction ID (e.g. 426789123456)"
                  className="w-full bg-[#0A0A0A] border border-[#C9A84C]/30 rounded-xl px-4 py-3 text-white placeholder-[#E5E4E2]/20 focus:outline-none focus:border-[#C9A84C]/60 transition-colors text-sm"
                />
                {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
                <p className="text-[10px] text-[#E5E4E2]/30 mt-2">
                  GPay/PhonePe → Transaction History → UTR number copy karo
                </p>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(1)}
                  className="flex-1 py-3 border border-[#C9A84C]/30 text-[#C9A84C] text-xs tracking-widest uppercase hover:bg-[#C9A84C]/5 transition-all duration-300">
                  ← Back
                </button>
                <button
                  onClick={handleConfirmPayment}
                  disabled={loading || !transactionId.trim()}
                  className="flex-1 bg-gradient-to-r from-[#C9A84C] to-[#F0D080] text-[#0A0A0A] font-bold py-3 uppercase tracking-widest text-xs hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? 'Confirming...' : '✅ Confirm Payment'}
                </button>
              </div>
            </div>
          )}

          {/* DONE */}
          {done && (
            <div className="text-center py-8">
              <div className="text-6xl mb-6">🎉</div>
              <h3 className="text-3xl font-playfair font-black bg-gradient-to-r from-[#C9A84C] to-[#F0D080] bg-clip-text text-transparent mb-4">
                Booking Confirmed!
              </h3>
              <p className="text-[#E5E4E2]/60 mb-2">Service: <span className="text-white font-bold">{service.title}</span></p>
              <p className="text-[#E5E4E2]/60 mb-2">Duration: <span className="text-white font-bold">{durations[selectedDuration].label}</span></p>
              <p className="text-[#E5E4E2]/60 mb-2">Amount: <span className="text-[#C9A84C] font-bold">₹{finalPrice}</span></p>
              <p className="text-[#E5E4E2]/60 mb-6">Transaction ID: <span className="text-white font-bold">{transactionId}</span></p>
              <p className="text-xs text-[#E5E4E2]/40 tracking-widest uppercase mb-8">
                Hamari team 2 ghante mein {phone} pe contact karegi
              </p>
              <button onClick={onClose}
                className="bg-gradient-to-r from-[#C9A84C] to-[#F0D080] text-[#0A0A0A] font-bold px-8 py-3 uppercase tracking-widest text-sm hover:scale-105 transition-all duration-300">
                Done
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}