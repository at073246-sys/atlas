'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Copy, Check, Smartphone, CreditCard, Building2 } from 'lucide-react'
import { useState } from 'react'
import { supabase } from '../lib/supabase'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

const FORMSPREE_URL = 'https://formspree.io/f/mqewwolv'
const WHATSAPP_NUMBER = '917550124573'
const UPI_ID = '7550124573@fam'

const durations = [
  { label: '1 Day', multiplier: 1 },
  { label: '1 Week', multiplier: 5 },
  { label: '1 Month', multiplier: 15 },
]

const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

interface Props {
  service: { title: string; pricing: { label: string; price: string }[] }
  onClose: () => void
}

export default function BookingModal({ service, onClose }: Props) {
  const [step, setStep] = useState(1)
  const [selectedDuration, setSelectedDuration] = useState(0)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState<string>('')
  const [email, setEmail] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('upi_qr')
  const [transactionId, setTransactionId] = useState('')
  const [paymentConfirmed, setPaymentConfirmed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [done, setDone] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [payError, setPayError] = useState('')

  const basePrice = service.pricing[0]?.price || '₹99'
  const numericPrice = parseInt(basePrice.replace(/[^\d]/g, '')) || 99
  const finalPrice = numericPrice * durations[selectedDuration].multiplier

  const copyUPI = () => {
    navigator.clipboard.writeText(UPI_ID)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const validateStep1 = () => {
    const newErrors: { [key: string]: string } = {}
    if (!name.trim() || name.trim().length < 2) {
      newErrors.name = '⚠️ Valid naam daalo (min 2 characters)'
    }
    if (!phone || !isValidPhoneNumber(phone)) {
      newErrors.phone = '⚠️ Valid phone number daalo'
    }
    if (!validateEmail(email)) {
      newErrors.email = '⚠️ Valid email daalo (e.g. name@gmail.com)'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleConfirmPayment = async () => {
    if (!paymentConfirmed) {
      setPayError('⚠️ Pehle payment confirm karo — checkbox tick karo')
      return
    }
    if (!transactionId.trim() || transactionId.trim().length < 10) {
      setPayError('⚠️ Valid Transaction ID / UTR Number daalo (min 10 digits)')
      return
    }
    setPayError('')
    setLoading(true)
    try {
      await supabase.from('bookings').insert({
        client_name: name,
        client_phone: phone,
        client_email: email,
        service_name: service.title,
        duration: durations[selectedDuration].label,
        amount: `₹${finalPrice}`,
        payment_method: paymentMethod,
        transaction_id: transactionId,
        status: 'confirmed'
      })

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
          <button onClick={onClose} className="absolute top-4 right-4 text-[#E5E4E2]/40 hover:text-[#C9A84C] transition-colors">
            <X className="w-6 h-6" />
          </button>

          {!done && (
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-1">
                <div className="h-px w-8 bg-[#C9A84C]/50" />
                <span className="text-xs tracking-[0.4em] text-[#C9A84C] uppercase">Book Service</span>
              </div>
              <h3 className="text-xl font-playfair font-black text-white">{service.title}</h3>
              <div className="flex items-center gap-1 mt-4">
                {['Details', 'Pay', 'Done'].map((s, i) => (
                  <div key={s} className="flex items-center gap-1 flex-1">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all
                      ${step > i + 1 ? 'bg-[#C9A84C] text-[#0A0A0A]' :
                        step === i + 1 ? 'bg-gradient-to-r from-[#C9A84C] to-[#F0D080] text-[#0A0A0A]' :
                        'border border-[#C9A84C]/30 text-[#C9A84C]/40'}`}>
                      {i + 1}
                    </div>
                    <span className={`text-[10px] tracking-wider uppercase flex-1 ${step === i + 1 ? 'text-[#C9A84C]' : 'text-[#E5E4E2]/20'}`}>
                      {s}
                    </span>
                    {i < 2 && <div className="w-4 h-px bg-[#C9A84C]/20" />}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 1 */}
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
                <input type="text" value={name}
                  onChange={(e) => { setName(e.target.value); setErrors(p => ({ ...p, name: '' })) }}
                  placeholder="Your full name"
                  className={`w-full bg-[#0A0A0A] border ${errors.name ? 'border-red-500/50' : 'border-[#C9A84C]/20'} rounded-xl px-4 py-3 text-white placeholder-[#E5E4E2]/20 focus:outline-none focus:border-[#C9A84C]/60 transition-colors text-sm`} />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* International Phone */}
              <div>
                <p className="text-xs tracking-widest text-[#E5E4E2]/40 uppercase mb-2">Phone Number</p>
                <div className={`border ${errors.phone ? 'border-red-500/50' : 'border-[#C9A84C]/20'} rounded-xl overflow-hidden`}
                  style={{
                    '--PhoneInputCountryFlag-height': '1em',
                    '--PhoneInput-color--focus': '#C9A84C',
                  } as React.CSSProperties}>
                  <PhoneInput
                    international
                    defaultCountry="IN"
                    value={phone}
                    onChange={(val) => { setPhone(val || ''); setErrors(p => ({ ...p, phone: '' })) }}
                    className="phone-input-dark"
                    style={{
                      background: '#0A0A0A',
                      padding: '12px 16px',
                      color: 'white',
                      fontSize: '14px',
                    }}
                  />
                </div>
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div>
                <p className="text-xs tracking-widest text-[#E5E4E2]/40 uppercase mb-2">Email</p>
                <input type="email" value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors(p => ({ ...p, email: '' })) }}
                  placeholder="your@email.com"
                  className={`w-full bg-[#0A0A0A] border ${errors.email ? 'border-red-500/50' : 'border-[#C9A84C]/20'} rounded-xl px-4 py-3 text-white placeholder-[#E5E4E2]/20 focus:outline-none focus:border-[#C9A84C]/60 transition-colors text-sm`} />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>

              <div className="flex justify-between items-center p-3 border border-[#C9A84C]/20 rounded-xl">
                <span className="text-[#E5E4E2]/50 text-sm">Total Amount</span>
                <span className="text-xl font-playfair font-black bg-gradient-to-r from-[#C9A84C] to-[#F0D080] bg-clip-text text-transparent">
                  ₹{finalPrice}
                </span>
              </div>

              <button onClick={() => { if (validateStep1()) setStep(2) }}
                className="w-full bg-gradient-to-r from-[#C9A84C] to-[#F0D080] text-[#0A0A0A] font-bold py-4 uppercase tracking-widest text-sm hover:scale-105 transition-all duration-300">
                Proceed to Payment →
              </button>
            </div>
          )}

          {/* STEP 2 */}
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

              {paymentMethod === 'upi_qr' && (
                <div className="p-4 border border-[#C9A84C]/20 rounded-2xl text-center">
                  <p className="text-xs text-[#C9A84C] tracking-widest uppercase mb-3">Scan & Pay</p>
                  <div className="flex justify-center mb-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/qr.jpg" alt="UPI QR"
                      className="rounded-xl border border-[#C9A84C]/20 w-40 h-40 object-cover" />
                  </div>
                  <p className="text-sm font-bold text-white">Ayan Thakur</p>
                  <p className="text-xs text-[#E5E4E2]/50 mb-2">{UPI_ID}</p>
                  <div className="p-2 bg-[#C9A84C]/10 rounded-xl">
                    <p className="text-lg font-black text-[#C9A84C]">₹{finalPrice}</p>
                  </div>
                  <p className="text-[10px] text-[#E5E4E2]/30 mt-2">GPay / PhonePe / Paytm → Scan QR → Pay</p>
                </div>
              )}

              {paymentMethod === 'upi_id' && (
                <div className="p-4 border border-[#C9A84C]/20 rounded-2xl">
                  <p className="text-xs text-[#C9A84C] tracking-widest uppercase mb-3">UPI ID Copy Karo</p>
                  <div className="flex items-center justify-between bg-[#0A0A0A] px-4 py-3 rounded-xl mb-3">
                    <span className="text-white font-bold text-sm">{UPI_ID}</span>
                    <button onClick={copyUPI} className="text-[#C9A84C] hover:scale-110 transition-transform ml-2">
                      {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                  <div className="p-2 bg-[#C9A84C]/10 rounded-xl text-center mb-2">
                    <p className="text-lg font-black text-[#C9A84C]">₹{finalPrice}</p>
                  </div>
                  <p className="text-[10px] text-[#E5E4E2]/30">UPI ID copy karo → GPay/PhonePe → Pay</p>
                </div>
              )}

              {paymentMethod === 'bank' && (
                <div className="p-4 border border-[#C9A84C]/20 rounded-2xl text-center">
                  <p className="text-sm text-white mb-3">Bank transfer ke liye contact karo</p>
                  <p className="text-xs text-[#E5E4E2]/40 mb-1">📧 atlasofficial2090@gmail.com</p>
                  <p className="text-xs text-[#E5E4E2]/40">📱 +91 7550124573</p>
                </div>
              )}

              <div className="p-4 border-2 border-[#C9A84C]/40 rounded-2xl bg-[#C9A84C]/5">
                <p className="text-xs tracking-widest text-[#C9A84C] uppercase mb-2">Transaction ID / UTR Number</p>
                <input type="text" value={transactionId}
                  onChange={(e) => { setTransactionId(e.target.value); setPayError('') }}
                  placeholder="e.g. 426789123456 (min 10 digits)"
                  className="w-full bg-[#0A0A0A] border border-[#C9A84C]/30 rounded-xl px-4 py-3 text-white placeholder-[#E5E4E2]/20 focus:outline-none focus:border-[#C9A84C]/60 transition-colors text-sm" />
                <p className="text-[10px] text-[#E5E4E2]/30 mt-2">GPay/PhonePe → Transaction History → UTR number</p>
              </div>

              <div className="flex items-start gap-3 p-3 border border-[#C9A84C]/20 rounded-xl">
                <input type="checkbox" id="payconfirm" checked={paymentConfirmed}
                  onChange={(e) => { setPaymentConfirmed(e.target.checked); setPayError('') }}
                  className="mt-0.5 w-4 h-4 flex-shrink-0 accent-[#C9A84C]" />
                <label htmlFor="payconfirm" className="text-xs text-[#E5E4E2]/60 cursor-pointer leading-relaxed">
                  ✅ Maine <span className="text-[#C9A84C] font-bold">₹{finalPrice}</span> ka payment kar diya hai aur Transaction ID bilkul sahi hai
                </label>
              </div>

              {payError && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl">
                  <p className="text-red-400 text-xs">{payError}</p>
                </div>
              )}

              <div className="flex gap-3">
                <button onClick={() => setStep(1)}
                  className="flex-1 py-3 border border-[#C9A84C]/30 text-[#C9A84C] text-xs tracking-widest uppercase hover:bg-[#C9A84C]/5 transition-all duration-300">
                  ← Back
                </button>
                <button onClick={handleConfirmPayment}
                  disabled={loading || !transactionId.trim() || transactionId.trim().length < 10 || !paymentConfirmed}
                  className="flex-1 bg-gradient-to-r from-[#C9A84C] to-[#F0D080] text-[#0A0A0A] font-bold py-3 uppercase tracking-widest text-xs hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? 'Confirming...' : '✅ Confirm Booking'}
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
              <p className="text-[#E5E4E2]/60 mb-2">Amount Paid: <span className="text-[#C9A84C] font-bold">₹{finalPrice}</span></p>
              <p className="text-[#E5E4E2]/60 mb-6">Transaction ID: <span className="text-white font-bold text-xs">{transactionId}</span></p>
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