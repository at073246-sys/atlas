'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, QrCode, ArrowRight, ShieldCheck } from 'lucide-react'

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  planName: string
  duration: string
  price: string
  whatsappMsg: string
}

export default function CheckoutModal({
  isOpen,
  onClose,
  planName,
  duration,
  price,
  whatsappMsg
}: CheckoutModalProps) {
  const WHATSAPP_NUMBER = '917550124573'
  const UPI_ID = '7550124573@fam'

  const handleConfirmPaid = () => {
    const msg = `${whatsappMsg}%0A%0APlan: ${planName}%0ADuration: ${duration}%0APrice: ${price}%0A%0A*I have completed the payment via UPI. Please confirm my booking.*`
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank')
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-md bg-gradient-to-b from-[#111] to-[#0A0A0A] border border-[#C9A84C]/30 rounded-3xl p-6 md:p-8 pointer-events-auto shadow-[0_0_50px_rgba(201,168,76,0.15)] overflow-hidden relative"
            >
              {/* Gold Glow Top */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-[#C9A84C]/20 blur-[50px] rounded-full" />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-[#E5E4E2]/50 hover:text-[#C9A84C] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center mb-6 mt-4">
                <h3 className="text-2xl font-playfair font-black text-white mb-2">Secure Payment</h3>
                <p className="text-sm text-[#E5E4E2]/60">Scan the QR code below to complete your booking for the <strong className="text-[#C9A84C]">{planName}</strong> ({duration})</p>
              </div>

              {/* Order Summary */}
              <div className="bg-[#0A0A0A] border border-[#C9A84C]/20 rounded-xl p-4 mb-6 flex justify-between items-center">
                <span className="text-[#E5E4E2]/70 text-sm">Total Amount to Pay</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-[#C9A84C] to-[#F0D080] bg-clip-text text-transparent">
                  {price}
                </span>
              </div>

              {/* QR Code Area */}
              <div className="flex flex-col items-center justify-center mb-6">
                <div className="w-48 h-48 bg-white p-2 rounded-2xl mb-4 relative overflow-hidden group">
                  {/* Replace this div with an actual <img> tag pointing to your QR code image */}
                  <div className="w-full h-full bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300 relative">
                    <QrCode className="w-12 h-12 text-gray-400" />
                    {/* Instructions for the user */}
                    <p className="absolute inset-x-2 text-center text-[10px] text-gray-500 mt-16 font-medium">
                      (Please place your QR image in <br/>/public/qr.jpg and use an img tag here)
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[#E5E4E2]/50 text-xs uppercase tracking-widest">Or Pay via UPI ID</span>
                  <div className="bg-[#1A1A1A] px-4 py-2 rounded-lg border border-white/5 flex items-center gap-3">
                    <span className="text-[#C9A84C] font-mono font-bold tracking-wider">{UPI_ID}</span>
                    <button 
                      onClick={() => navigator.clipboard.writeText(UPI_ID)}
                      className="text-xs text-[#E5E4E2]/40 hover:text-white transition-colors uppercase"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-2 mb-8 text-[#E5E4E2]/40 text-xs">
                <ShieldCheck className="w-4 h-4 text-[#C9A84C]/70" />
                <span>100% Secure & Encrypted Payment</span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleConfirmPaid}
                  className="w-full bg-gradient-to-r from-[#C9A84C] to-[#F0D080] text-[#0A0A0A] font-bold py-4 rounded-xl uppercase tracking-widest text-xs hover:scale-[1.02] transition-transform duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(201,168,76,0.3)]"
                >
                  I Have Paid - Confirm
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-4 text-[#E5E4E2]/50 text-xs tracking-widest uppercase hover:text-white transition-colors"
                >
                  Cancel
                </button>
              </div>

            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
