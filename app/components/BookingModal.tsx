'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Copy, Check, Smartphone, CreditCard, Building2 } from 'lucide-react'
import { useState } from 'react'
import { supabase } from '../lib/supabase'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

const WHATSAPP_NUMBER = '917550124573'
const UPI_ID = '7550124573@fam'

const durations = [
  { label: '1 Day', multiplier: 1 },
  { label: '1 Week', multiplier: 5 },
  { label: '1 Month', multiplier: 15 },
]

const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)

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
    if (!name.trim() || name.trim().length < 2) newErrors.name = '⚠️ Enter  Valid name '
    if (!phone || !isValidPhoneNumber(phone)) newErrors.phone = '⚠️ Enter  Valid phone number '
    if (!validateEmail(email)) newErrors.email = '⚠️ Enter  Valid email '
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const sendWhatsApp = (msg: string) => {
    const a = document.createElement('a')
    a.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`
    a.target = '_blank'
    a.rel = 'noopener noreferrer'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const handleConfirmPayment = async () => {
    if (!paymentConfirmed) { setPayError('⚠️ Checkbox tick karo'); return }
    if (!transactionId.trim() || transactionId.trim().length < 10) {
      setPayError('⚠️ Enter Valid Transaction ID (min 10 digits)')
      return
    }
    setPayError('')
    setLoading(true)

    // WhatsApp notification — PEHLE
    const waMsg =
      `✅ *New Booking — ATLAS!*%0A%0A` +
      `👤 *Name:* ${encodeURIComponent(name)}%0A` +
      `📱 *Phone:* ${encodeURIComponent(phone)}%0A` +
      `📧 *Email:* ${encodeURIComponent(email)}%0A` +
      `🛠 *Service:* ${encodeURIComponent(service.title)}%0A` +
      `⏳ *Duration:* ${encodeURIComponent(durations[selectedDuration].label)}%0A` +
      `💰 *Amount:* ₹${finalPrice}%0A` +
      `💳 *Payment:* ${encodeURIComponent(paymentMethod)}%0A` +
      `🔖 *Txn ID:* ${encodeURIComponent(transactionId)}%0A%0A` +
      `_ATLAS — Your World, Our Promise._`

    sendWhatsApp(waMsg)

    try {
      // 1. Supabase save
      await supabase.from('bookings').insert({
        client_name: name,
        client_phone: phone,
        client_email: email,
        service_name: service.title,
        duration: durations[selectedDuration].label,
        amount: `₹${finalPrice}`,
        payment_method: paymentMethod,
        transaction_id: transactionId,
        status: 'confirmed',
      })

      // 2. Email via API route
      await fetch('/api/email', {
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
    transition: 'border-color 0.3s',
  })

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, overflowY: 'auto', background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(6px)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3 }}
          style={{ width: '100%', maxWidth: 520, background: '#0D1B2A', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 24, padding: 28, position: 'relative', margin: 'auto' }}
          onClick={e => e.stopPropagation()}
        >
          <button onClick={onClose} style={{ position: 'absolute', top: 14, right: 14, background: 'none', border: 'none', color: 'rgba(229,228,226,0.4)', cursor: 'pointer' }}>
            <X size={20} />
          </button>

          {!done && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <div style={{ height: 1, width: 28, background: 'rgba(201,168,76,0.5)' }} />
                <span style={{ fontSize: 9, letterSpacing: '0.4em', color: '#C9A84C', textTransform: 'uppercase' }}>Book Service</span>
              </div>
              <h3 className="font-playfair" style={{ fontSize: 18, fontWeight: 900, color: 'white', marginBottom: 16 }}>{service.title}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {['Details', 'Pay', 'Done'].map((s, i) => (
                  <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1 }}>
                    <div style={{ width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, background: step >= i + 1 ? 'linear-gradient(135deg,#C9A84C,#F0D080)' : 'transparent', color: step >= i + 1 ? '#0A0A0A' : 'rgba(201,168,76,0.4)', border: step >= i + 1 ? 'none' : '1px solid rgba(201,168,76,0.3)' }}>
                      {i + 1}
                    </div>
                    <span style={{ fontSize: 9, color: step === i + 1 ? '#C9A84C' : 'rgba(229,228,226,0.2)', textTransform: 'uppercase', flex: 1 }}>{s}</span>
                    {i < 2 && <div style={{ width: 10, height: 1, background: 'rgba(201,168,76,0.15)' }} />}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 1 — Details */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <p style={{ fontSize: 9, letterSpacing: '0.15em', color: 'rgba(229,228,226,0.4)', textTransform: 'uppercase', marginBottom: 8 }}>Select Duration</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                  {durations.map((d, i) => (
                    <button key={d.label} onClick={() => setSelectedDuration(i)}
                      style={{ padding: '10px 6px', border: `1px solid ${selectedDuration === i ? '#C9A84C' : 'rgba(201,168,76,0.2)'}`, borderRadius: 10, background: selectedDuration === i ? 'rgba(201,168,76,0.12)' : 'transparent', cursor: 'pointer', textAlign: 'center', transition: 'all 0.3s' }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: 'white', marginBottom: 3 }}>{d.label}</div>
                      <div style={{ fontSize: 10, color: '#C9A84C' }}>₹{numericPrice * d.multiplier}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p style={{ fontSize: 9, letterSpacing: '0.15em', color: 'rgba(229,228,226,0.4)', textTransform: 'uppercase', marginBottom: 6 }}>Full Name</p>
                <input type="text" value={name}
                  onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: '' })) }}
                  placeholder="Your full name" style={inputStyle('name')} />
                {errors.name && <p style={{ color: 'rgba(239,68,68,0.8)', fontSize: 11, marginTop: 4 }}>{errors.name}</p>}
              </div>

              <div>
                <p style={{ fontSize: 9, letterSpacing: '0.15em', color: 'rgba(229,228,226,0.4)', textTransform: 'uppercase', marginBottom: 6 }}>Phone Number</p>
                <div style={{ border: `1px solid ${errors.phone ? 'rgba(239,68,68,0.5)' : 'rgba(201,168,76,0.25)'}`, borderRadius: 12, overflow: 'hidden' }}>
                  <PhoneInput international defaultCountry="IN" value={phone}
                    onChange={val => { setPhone(val || ''); setErrors(p => ({ ...p, phone: '' })) }}
                    style={{ background: 'rgba(10,10,10,0.9)', padding: '12px 14px', color: 'white', fontSize: 14 }} />
                </div>
                {errors.phone && <p style={{ color: 'rgba(239,68,68,0.8)', fontSize: 11, marginTop: 4 }}>{errors.phone}</p>}
              </div>

              <div>
                <p style={{ fontSize: 9, letterSpacing: '0.15em', color: 'rgba(229,228,226,0.4)', textTransform: 'uppercase', marginBottom: 6 }}>Email Address</p>
                <input type="email" value={email}
                  onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: '' })) }}
                  placeholder="your@email.com" style={inputStyle('email')} />
                {errors.email && <p style={{ color: 'rgba(239,68,68,0.8)', fontSize: 11, marginTop: 4 }}>{errors.email}</p>}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', border: '1px solid rgba(201,168,76,0.25)', borderRadius: 12, background: 'rgba(201,168,76,0.04)' }}>
                <span style={{ color: 'rgba(229,228,226,0.6)', fontSize: 13 }}>Total Amount</span>
                <span className="font-playfair gold-text" style={{ fontSize: 24, fontWeight: 900 }}>₹{finalPrice}</span>
              </div>

              <button onClick={() => { if (validateStep1()) setStep(2) }}
                className="gold-button" style={{ width: '100%', justifyContent: 'center' }}>
                Proceed to Payment →
              </button>
            </div>
          )}

          {/* STEP 2 — Payment */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                {[
                  { id: 'upi_qr', label: 'QR Code', icon: <Smartphone size={14} /> },
                  { id: 'upi_id', label: 'UPI ID', icon: <CreditCard size={14} /> },
                  { id: 'bank', label: 'Net Banking', icon: <Building2 size={14} /> },
                ].map(m => (
                  <button key={m.id} onClick={() => setPaymentMethod(m.id)}
                    style={{ padding: '10px 6px', border: `1px solid ${paymentMethod === m.id ? '#C9A84C' : 'rgba(201,168,76,0.2)'}`, borderRadius: 10, background: paymentMethod === m.id ? 'rgba(201,168,76,0.12)' : 'transparent', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, transition: 'all 0.3s' }}>
                    <span style={{ color: '#C9A84C' }}>{m.icon}</span>
                    <span style={{ fontSize: 10, color: 'white' }}>{m.label}</span>
                  </button>
                ))}
              </div>

              {paymentMethod === 'upi_qr' && (
                <div style={{ padding: 16, border: '1px solid rgba(201,168,76,0.2)', borderRadius: 14, textAlign: 'center' }}>
                  <p style={{ fontSize: 9, letterSpacing: '0.3em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: 12 }}>Scan & Pay</p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/pay.jpg.jpeg" alt="QR" style={{ width: 156, height: 156, borderRadius: 12, border: '1px solid rgba(201,168,76,0.25)', objectFit: 'cover', margin: '0 auto 10px', display: 'block' }} />
                  <p style={{ fontSize: 12, color: 'rgba(229,228,226,0.5)', marginBottom: 8 }}>{UPI_ID}</p>
                  <div style={{ background: 'rgba(201,168,76,0.1)', borderRadius: 10, padding: '8px 16px', display: 'inline-block' }}>
                    <span className="gold-text font-playfair" style={{ fontSize: 20, fontWeight: 900 }}>₹{finalPrice}</span>
                  </div>
                  <p style={{ fontSize: 9, color: 'rgba(229,228,226,0.3)', marginTop: 8 }}>GPay / PhonePe / Paytm → Scan → Pay</p>
                </div>
              )}

              {paymentMethod === 'upi_id' && (
                <div style={{ padding: 16, border: '1px solid rgba(201,168,76,0.2)', borderRadius: 14 }}>
                  <p style={{ fontSize: 9, letterSpacing: '0.2em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: 10 }}>UPI ID Copy Karo</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(10,10,10,0.9)', padding: '10px 14px', borderRadius: 10, marginBottom: 10 }}>
                    <span style={{ color: 'white', fontWeight: 700, fontSize: 14 }}>{UPI_ID}</span>
                    <button onClick={copyUPI} style={{ background: 'none', border: 'none', color: '#C9A84C', cursor: 'pointer', padding: 4 }}>
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                  <div style={{ textAlign: 'center', background: 'rgba(201,168,76,0.1)', borderRadius: 10, padding: 8 }}>
                    <span className="gold-text font-playfair" style={{ fontSize: 20, fontWeight: 900 }}>₹{finalPrice}</span>
                  </div>
                  <p style={{ fontSize: 9, color: 'rgba(229,228,226,0.3)', marginTop: 8 }}>UPI ID copy karo → GPay/PhonePe → Pay</p>
                </div>
              )}

              {paymentMethod === 'bank' && (
                <div style={{ padding: 16, border: '1px solid rgba(201,168,76,0.2)', borderRadius: 14, textAlign: 'center' }}>
                  <p style={{ color: 'white', fontSize: 14, marginBottom: 8 }}>Bank transfer ke liye contact karo</p>
                  <p style={{ fontSize: 13, color: 'rgba(229,228,226,0.5)', marginBottom: 4 }}>📧 atlasofficial2090@gmail.com</p>
                  <p style={{ fontSize: 13, color: 'rgba(229,228,226,0.5)' }}>📱 +91 7550124573</p>
                </div>
              )}

              <div style={{ padding: 16, border: '2px solid rgba(201,168,76,0.4)', borderRadius: 14, background: 'rgba(201,168,76,0.04)' }}>
                <p style={{ fontSize: 9, letterSpacing: '0.15em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: 10 }}>⚠️ Transaction ID / UTR Number (Required)</p>
                <input type="text" value={transactionId}
                  onChange={e => { setTransactionId(e.target.value); setPayError('') }}
                  placeholder="e.g. 426789123456 (min 10 digits)"
                  style={{ width: '100%', background: 'rgba(10,10,10,0.9)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 10, padding: '12px 14px', color: 'white', fontSize: 13, outline: 'none', boxSizing: 'border-box' as const }} />
                <p style={{ fontSize: 9, color: 'rgba(229,228,226,0.3)', marginTop: 6 }}>GPay → Transaction History → UTR number copy karo</p>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: 14, border: '1px solid rgba(201,168,76,0.2)', borderRadius: 12 }}>
                <input type="checkbox" id="payconfirm" checked={paymentConfirmed}
                  onChange={e => { setPaymentConfirmed(e.target.checked); setPayError('') }}
                  style={{ width: 16, height: 16, marginTop: 2, accentColor: '#C9A84C', flexShrink: 0, cursor: 'pointer' }} />
                <label htmlFor="payconfirm" style={{ fontSize: 12, color: 'rgba(229,228,226,0.65)', cursor: 'pointer', lineHeight: 1.6 }}>
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
                  style={{ flex: 1, padding: 14, border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C', background: 'transparent', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', borderRadius: 8 }}>
                  ← Back
                </button>
                <button onClick={handleConfirmPayment}
                  disabled={loading || !transactionId.trim() || transactionId.trim().length < 10 || !paymentConfirmed}
                  className="gold-button"
                  style={{ flex: 2, justifyContent: 'center', opacity: (loading || !transactionId.trim() || transactionId.trim().length < 10 || !paymentConfirmed) ? 0.45 : 1 }}>
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
              <div style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 16, padding: '20px 24px', marginBottom: 20, textAlign: 'left' }}>
                <p style={{ color: 'rgba(229,228,226,0.6)', marginBottom: 8, fontSize: 13 }}>🛠 Service: <strong style={{ color: 'white' }}>{service.title}</strong></p>
                <p style={{ color: 'rgba(229,228,226,0.6)', marginBottom: 8, fontSize: 13 }}>⏳ Duration: <strong style={{ color: 'white' }}>{durations[selectedDuration].label}</strong></p>
                <p style={{ color: 'rgba(229,228,226,0.6)', marginBottom: 8, fontSize: 13 }}>💰 Amount Paid: <strong className="gold-text">₹{finalPrice}</strong></p>
                <p style={{ color: 'rgba(229,228,226,0.6)', fontSize: 12 }}>🔖 Txn ID: <strong style={{ color: 'white', fontSize: 11 }}>{transactionId}</strong></p>
              </div>
              <p style={{ fontSize: 11, color: 'rgba(229,228,226,0.35)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 24 }}>
                Hamari team 2 ghante mein {phone} pe contact karegi
              </p>
              <button onClick={onClose} className="gold-button" style={{ margin: '0 auto' }}>Done ✓</button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}