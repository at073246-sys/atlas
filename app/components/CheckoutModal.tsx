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

              <div className="text-center mb-8 mt-4">
                <div className="inline-block px-3 py-1 border border-[#C9A84C]/30 rounded-full mb-4">
                  <span className="text-[10px] text-[#C9A84C] uppercase tracking-[0.3em] font-bold">Elite Concierge</span>
                </div>
                <h3 className="text-3xl font-playfair font-black text-white mb-2 tracking-tight">Finalize Selection</h3>
                <p className="text-xs text-[#E5E4E2]/50 tracking-wide">The <strong className="text-[#C9A84C]">{planName}</strong> awaits you.</p>
              </div>

              {/* Order Summary */}
              <div className="bg-gradient-to-r from-[#1A1A1A] to-[#0A0A0A] border border-[#C9A84C]/20 rounded-2xl p-5 mb-8 flex justify-between items-center group hover:border-[#C9A84C]/40 transition-colors duration-500">
                <div className="flex flex-col">
                  <span className="text-[#E5E4E2]/40 text-[10px] uppercase tracking-widest mb-1">Membership Value</span>
                  <span className="text-[#E5E4E2]/80 text-xs font-medium uppercase tracking-widest">{duration} Access</span>
                </div>
                <span className="text-3xl font-playfair font-bold bg-gradient-to-r from-[#C9A84C] to-[#F0D080] bg-clip-text text-transparent">
                  {price}
                </span>
              </div>

              {/* QR Code Area */}
              <div className="flex flex-col items-center justify-center mb-8">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="w-60 h-60 bg-white p-4 rounded-3xl mb-6 relative overflow-hidden group shadow-[0_0_50px_rgba(201,168,76,0.15)] hover:shadow-[0_0_60px_rgba(201,168,76,0.25)] transition-shadow duration-500"
                >
                  <img 
                    src="/qr.jpg.jpeg" 
                    alt="Payment QR Code" 
                    className="w-full h-full object-contain rounded-xl"
                  />
                  <div className="absolute inset-0 border-[3px] border-[#C9A84C]/10 rounded-3xl pointer-events-none" />
                </motion.div>
                
                <div className="flex flex-col items-center gap-3 w-full">
                  <span className="text-[#E5E4E2]/40 text-[10px] uppercase tracking-[0.4em] font-light">Direct UPI Transfer</span>
                  <div className="bg-[#111] w-full px-6 py-4 rounded-2xl border border-[#C9A84C]/10 flex items-center justify-between group hover:border-[#C9A84C]/30 transition-all duration-300">
                    <span className="text-[#C9A84C] font-mono font-bold tracking-[0.15em] text-sm">{UPI_ID}</span>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(UPI_ID)
                      }}
                      className="text-[10px] text-[#C9A84C] hover:text-white transition-colors uppercase font-black tracking-widest"
                    >
                      Copy ID
                    </button>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-3 mb-10 text-[#E5E4E2]/30 text-[10px] uppercase tracking-[0.2em]">
                <ShieldCheck className="w-4 h-4 text-[#C9A84C]/50" />
                <span>Verified ATLAS Secure Payment</span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4">
                <button
                  onClick={handleConfirmPaid}
                  className="w-full bg-gradient-to-r from-[#C9A84C] via-[#F0D080] to-[#C9A84C] bg-[length:200%_auto] hover:bg-right text-[#0A0A0A] font-black py-5 rounded-2xl uppercase tracking-[0.2em] text-[11px] transition-all duration-500 flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(201,168,76,0.2)] hover:scale-[1.02]"
                >
                  I have completed payment
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-2 text-[#E5E4E2]/30 text-[10px] tracking-[0.3em] uppercase hover:text-white transition-colors font-medium"
                >
                  Return to selection
                </button>
              </div>

            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
