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
    if (!name.trim() || name.trim().length < 2) newErrors.name = '⚠️ Valid naam daalo'
    if (!phone || !isValidPhoneNumber(phone)) newErrors.phone = '⚠️ Valid phone number daalo'
    if (!validateEmail(email)) newErrors.email = '⚠️ Valid email daalo'
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

  const handleConfirmPayment = async () => {
    if (!paymentConfirmed) {
      setPayError('⚠️ First confirm the payment — tick the checkbox')
      return
    }
    if (!transactionId.trim() || transactionId.trim().length < 10) {
      setPayError('⚠️ Enter a valid Transaction ID / UTR number (min 10 digits)')
      return
    }
    setPayError('')
    setLoading(true)

    const waMsg =
      `✅ *New Booking — ATLAS!*%0A%0A` +
      `👤 *Name:* ${encodeURIComponent(name)}%0A` +
      `📱 *Phone:* ${encodeURIComponent(phone)}%0A` +
      `📧 *Email:* ${encodeURIComponent(email)}%0A` +
      `🛠 *Service:* ${encodeURIComponent(service.title)}%0A` +
      `⏳ *Duration:* ${encodeURIComponent(durations[selectedDuration].label)}%0A` +
      `💰 *Amount:* ₹${finalPrice}%0A` +
      `💳 *Payment:* ${encodeURIComponent(paymentMethod)}%0A` +
      `🔖 *Transaction ID:* ${encodeURIComponent(transactionId)}%0A%0A` +
      `_ATLAS — Your World, Our Promise._`

    // Send WhatsApp FIRST (before async)
    sendWhatsApp(waMsg)

    try {
      // Save to Supabase
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

      // Send Email via Formspree
      await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: `🔔 New Booking — ${service.title} — ATLAS`,
          _replyto: email,
          type: 'NEW BOOKING',
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

      setDone(true)
    } catch (err) {
      console.error(err)
      setDone(true)
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = (field: string) => ({
    width: '100%',
    background: 'rgba(10,10,10,0.9)',
    border: `1px solid ${errors[field] ? 'rgba(239,68,68,0.5)' : 'rgba(201,168,76,0.25)'}`,
    borderRadius: 12,
    padding: '12px 16px',
    color: 'white',
    fontSize: 14,
    outline: 'none',
    boxSizing: 'border-box' as const,
  })

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, overflowY: 'auto', background: 'rgba(0,0,0,0.88)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          style={{ width: '100%', maxWidth: 520, background: '#0D1B2A', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 24, padding: 32, position: 'relative', margin: 'auto' }}
          onClick={e => e.stopPropagation()}
        >
          <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', color: 'rgba(229,228,226,0.4)', cursor: 'pointer', padding: 4 }}>
            <X size={22} />
          </button>

          {/* Header */}
          {!done && (
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
                <div style={{ height: 1, width: 32, background: 'rgba(201,168,76,0.5)' }} />
                <span style={{ fontSize: 10, letterSpacing: '0.4em', color: '#C9A84C', textTransform: 'uppercase' }}>Book Service</span>
              </div>
              <h3 className="font-playfair" style={{ fontSize: 20, fontWeight: 900, color: 'white', marginBottom: 16 }}>{service.title}</h3>
              {/* Step indicators */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {['Details', 'Pay', 'Done'].map((s, i) => (
                  <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1 }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, background: step > i + 1 ? '#C9A84C' : step === i + 1 ? 'linear-gradient(to right, #C9A84C, #F0D080)' : 'transparent', color: step >= i + 1 ? '#0A0A0A' : 'rgba(201,168,76,0.4)', border: step >= i + 1 ? 'none' : '1px solid rgba(201,168,76,0.3)' }}>
                      {i + 1}
                    </div>
                    <span style={{ fontSize: 10, color: step === i + 1 ? '#C9A84C' : 'rgba(229,228,226,0.2)', textTransform: 'uppercase', letterSpacing: '0.1em', flex: 1 }}>{s}</span>
                    {i < 2 && <div style={{ width: 12, height: 1, background: 'rgba(201,168,76,0.2)' }} />}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 1 */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Duration */}
              <div>
                <p style={{ fontSize: 10, letterSpacing: '0.15em', color: 'rgba(229,228,226,0.4)', textTransform: 'uppercase', marginBottom: 10 }}>Select Duration</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                  {durations.map((d, i) => (
                    <button key={d.label} onClick={() => setSelectedDuration(i)}
                      style={{ padding: '12px 8px', border: `1px solid ${selectedDuration === i ? '#C9A84C' : 'rgba(201,168,76,0.2)'}`, borderRadius: 12, background: selectedDuration === i ? 'rgba(201,168,76,0.1)' : 'transparent', cursor: 'pointer', textAlign: 'center', transition: 'all 0.3s' }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: 'white', marginBottom: 4 }}>{d.label}</div>
                      <div style={{ fontSize: 11, color: '#C9A84C' }}>₹{numericPrice * d.multiplier}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p style={{ fontSize: 10, letterSpacing: '0.15em', color: 'rgba(229,228,226,0.4)', textTransform: 'uppercase', marginBottom: 8 }}>Full Name</p>
                <input type="text" value={name} onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: '' })) }}
                  placeholder="Your full name" style={inputStyle('name')} />
                {errors.name && <p style={{ color: 'rgba(239,68,68,0.8)', fontSize: 11, marginTop: 4 }}>{errors.name}</p>}
              </div>

              <div>
                <p style={{ fontSize: 10, letterSpacing: '0.15em', color: 'rgba(229,228,226,0.4)', textTransform: 'uppercase', marginBottom: 8 }}>Phone Number</p>
                <div style={{ border: `1px solid ${errors.phone ? 'rgba(239,68,68,0.5)' : 'rgba(201,168,76,0.25)'}`, borderRadius: 12, overflow: 'hidden' }}>
                  <PhoneInput international defaultCountry="IN" value={phone}
                    onChange={val => { setPhone(val || ''); setErrors(p => ({ ...p, phone: '' })) }}
                    style={{ background: 'rgba(10,10,10,0.9)', padding: '12px 16px', color: 'white', fontSize: 14 }} />
                </div>
                {errors.phone && <p style={{ color: 'rgba(239,68,68,0.8)', fontSize: 11, marginTop: 4 }}>{errors.phone}</p>}
              </div>

              <div>
                <p style={{ fontSize: 10, letterSpacing: '0.15em', color: 'rgba(229,228,226,0.4)', textTransform: 'uppercase', marginBottom: 8 }}>Email</p>
                <input type="email" value={email} onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: '' })) }}
                  placeholder="your@email.com" style={inputStyle('email')} />
                {errors.email && <p style={{ color: 'rgba(239,68,68,0.8)', fontSize: 11, marginTop: 4 }}>{errors.email}</p>}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 12 }}>
                <span style={{ color: 'rgba(229,228,226,0.5)', fontSize: 14 }}>Total Amount</span>
                <span className="font-playfair gold-text" style={{ fontSize: 22, fontWeight: 900 }}>₹{finalPrice}</span>
              </div>

              <button onClick={() => { if (validateStep1()) setStep(2) }}
                className="gold-button" style={{ width: '100%', justifyContent: 'center' }}>
                Proceed to Payment →
              </button>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <p style={{ fontSize: 10, letterSpacing: '0.15em', color: 'rgba(229,228,226,0.4)', textTransform: 'uppercase' }}>Payment Method</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                {[
                  { id: 'upi_qr', label: 'QR Code', icon: <Smartphone size={16} /> },
                  { id: 'upi_id', label: 'UPI ID', icon: <CreditCard size={16} /> },
                  { id: 'bank', label: 'Net Banking', icon: <Building2 size={16} /> },
                ].map(m => (
                  <button key={m.id} onClick={() => setPaymentMethod(m.id)}
                    style={{ padding: '12px 8px', border: `1px solid ${paymentMethod === m.id ? '#C9A84C' : 'rgba(201,168,76,0.2)'}`, borderRadius: 12, background: paymentMethod === m.id ? 'rgba(201,168,76,0.1)' : 'transparent', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, transition: 'all 0.3s' }}>
                    <span style={{ color: '#C9A84C' }}>{m.icon}</span>
                    <span style={{ fontSize: 10, color: 'white' }}>{m.label}</span>
                  </button>
                ))}
              </div>

              {/* QR Code */}
              {paymentMethod === 'upi_qr' && (
                <div style={{ padding: 16, border: '1px solid rgba(201,168,76,0.2)', borderRadius: 16, textAlign: 'center' }}>
                  <p style={{ fontSize: 10, letterSpacing: '0.3em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: 12 }}>Scan & Pay</p>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/pay.jpg.jpeg" alt="UPI QR" style={{ width: 160, height: 160, borderRadius: 12, border: '1px solid rgba(201,168,76,0.2)', objectFit: 'cover' }} />
                  </div>
                  <p style={{ fontSize: 12, color: 'rgba(229,228,226,0.5)', marginBottom: 8 }}>{UPI_ID}</p>
                  <div style={{ background: 'rgba(201,168,76,0.1)', borderRadius: 10, padding: '8px 16px', display: 'inline-block' }}>
                    <span className="font-playfair gold-text" style={{ fontSize: 18, fontWeight: 900 }}>₹{finalPrice}</span>
                  </div>
                  <p style={{ fontSize: 10, color: 'rgba(229,228,226,0.3)', marginTop: 8 }}>GPay / PhonePe / Paytm → Scan QR → Pay</p>
                </div>
              )}

              {/* UPI ID */}
              {paymentMethod === 'upi_id' && (
                <div style={{ padding: 16, border: '1px solid rgba(201,168,76,0.2)', borderRadius: 16 }}>
                  <p style={{ fontSize: 10, letterSpacing: '0.15em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: 10 }}>UPI ID Copy Karo</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(10,10,10,0.9)', padding: '12px 16px', borderRadius: 10, marginBottom: 10 }}>
                    <span style={{ color: 'white', fontWeight: 700, fontSize: 14 }}>{UPI_ID}</span>
                    <button onClick={copyUPI} style={{ background: 'none', border: 'none', color: '#C9A84C', cursor: 'pointer', padding: 4 }}>
                      {copied ? <Check size={18} /> : <Copy size={18} />}
                    </button>
                  </div>
                  <div style={{ background: 'rgba(201,168,76,0.1)', borderRadius: 10, padding: '8px 16px', textAlign: 'center' }}>
                    <span className="font-playfair gold-text" style={{ fontSize: 18, fontWeight: 900 }}>₹{finalPrice}</span>
                  </div>
                  <p style={{ fontSize: 10, color: 'rgba(229,228,226,0.3)', marginTop: 8 }}>UPI ID copy karo → GPay/PhonePe → Pay</p>
                </div>
              )}

              {/* Net Banking */}
              {paymentMethod === 'bank' && (
                <div style={{ padding: 16, border: '1px solid rgba(201,168,76,0.2)', borderRadius: 16, textAlign: 'center' }}>
                  <p style={{ color: 'white', fontSize: 13, marginBottom: 8 }}>Bank transfer ke liye contact karo</p>
                  <p style={{ fontSize: 12, color: 'rgba(229,228,226,0.4)', marginBottom: 4 }}>📧 atlasofficial2090@gmail.com</p>
                  <p style={{ fontSize: 12, color: 'rgba(229,228,226,0.4)' }}>📱 +91 7550124573</p>
                </div>
              )}

              {/* Transaction ID */}
              <div style={{ padding: 16, border: '2px solid rgba(201,168,76,0.4)', borderRadius: 16, background: 'rgba(201,168,76,0.04)' }}>
                <p style={{ fontSize: 10, letterSpacing: '0.15em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: 10 }}>Transaction ID / UTR Number</p>
                <input type="text" value={transactionId}
                  onChange={e => { setTransactionId(e.target.value); setPayError('') }}
                  placeholder="e.g. 426789123456 (min 10 digits)"
                  style={{ width: '100%', background: 'rgba(10,10,10,0.9)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 10, padding: '12px 16px', color: 'white', fontSize: 13, outline: 'none', boxSizing: 'border-box' }} />
                <p style={{ fontSize: 10, color: 'rgba(229,228,226,0.3)', marginTop: 6 }}>GPay/PhonePe → Transaction History → UTR number</p>
              </div>

              {/* Checkbox */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: 14, border: '1px solid rgba(201,168,76,0.2)', borderRadius: 12 }}>
                <input type="checkbox" id="payconfirm" checked={paymentConfirmed}
                  onChange={e => { setPaymentConfirmed(e.target.checked); setPayError('') }}
                  style={{ width: 16, height: 16, marginTop: 2, accentColor: '#C9A84C', flexShrink: 0 }} />
                <label htmlFor="payconfirm" style={{ fontSize: 12, color: 'rgba(229,228,226,0.6)', cursor: 'pointer', lineHeight: 1.6 }}>
                  ✅ Maine <strong style={{ color: '#C9A84C' }}>₹{finalPrice}</strong> ka payment kar diya hai aur Transaction ID bilkul sahi hai
                </label>
              </div>

              {payError && (
                <div style={{ padding: '10px 14px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10 }}>
                  <p style={{ color: 'rgba(239,68,68,0.9)', fontSize: 12 }}>{payError}</p>
                </div>
              )}

              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={() => setStep(1)}
                  style={{ flex: 1, padding: '14px', border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C', background: 'transparent', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', borderRadius: 6 }}>
                  ← Back
                </button>
                <button onClick={handleConfirmPayment}
                  disabled={loading || !transactionId.trim() || transactionId.trim().length < 10 || !paymentConfirmed}
                  className="gold-button"
                  style={{ flex: 2, justifyContent: 'center', opacity: (loading || !transactionId.trim() || transactionId.trim().length < 10 || !paymentConfirmed) ? 0.5 : 1, cursor: (loading || !transactionId.trim() || transactionId.trim().length < 10 || !paymentConfirmed) ? 'not-allowed' : 'pointer' }}>
                  {loading ? 'Confirming...' : '✅ Confirm Booking'}
                </button>
              </div>
            </div>
          )}

          {/* DONE */}
          {done && (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
              <h3 className="font-playfair gold-text" style={{ fontSize: 28, fontWeight: 900, marginBottom: 16 }}>Booking Confirmed!</h3>
              <p style={{ color: 'rgba(229,228,226,0.6)', marginBottom: 8, fontSize: 14 }}>Service: <strong style={{ color: 'white' }}>{service.title}</strong></p>
              <p style={{ color: 'rgba(229,228,226,0.6)', marginBottom: 8, fontSize: 14 }}>Duration: <strong style={{ color: 'white' }}>{durations[selectedDuration].label}</strong></p>
              <p style={{ color: 'rgba(229,228,226,0.6)', marginBottom: 8, fontSize: 14 }}>Amount: <strong className="gold-text">₹{finalPrice}</strong></p>
              <p style={{ color: 'rgba(229,228,226,0.6)', marginBottom: 20, fontSize: 12 }}>Transaction ID: <strong style={{ color: 'white', fontSize: 11 }}>{transactionId}</strong></p>
              <p style={{ fontSize: 11, color: 'rgba(229,228,226,0.35)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 24 }}>
                Hamari team 2 ghante mein {phone} pe contact karegi
              </p>
              <button onClick={onClose} className="gold-button" style={{ margin: '0 auto' }}>Done</button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}