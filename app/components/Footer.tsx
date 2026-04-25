'use client'
import Image from 'next/image'
import { Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative pt-20 pb-10 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/peg.jpg.jpeg"
          alt="Footer"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/80" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <h3 className="text-5xl md:text-6xl font-playfair font-black bg-gradient-to-r from-[#C9A84C] to-[#F0D080] bg-clip-text text-transparent mb-3">
          ATLAS
        </h3>
        <p className="text-xl text-white/50 italic mb-12">Your World, Our Promise.</p>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-8">
          <a href="#" className="text-xs text-white/40 uppercase hover:text-[#C9A84C]">About</a>
          <a href="#services" className="text-xs text-white/40 uppercase hover:text-[#C9A84C]">Services</a>
          <a href="#membership" className="text-xs text-white/40 uppercase hover:text-[#C9A84C]">Membership</a>
          <a href="#join" className="text-xs text-white/40 uppercase hover:text-[#C9A84C]">Join As Talent</a>
          <a href="#" className="text-xs text-white/40 uppercase hover:text-[#C9A84C]">Privacy</a>
          <a href="#" className="text-xs text-white/40 uppercase hover:text-[#C9A84C]">Contact</a>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <a href="mailto:atlasofficial2090@gmail.com" className="w-10 h-10 border border-[#C9A84C]/20 flex items-center justify-center text-white/40 hover:text-[#C9A84C] hover:border-[#C9A84C]/50 rounded-full transition">
            <Mail className="w-4 h-4" />
          </a>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent mb-6" />

        <div className="text-xs text-white/20 uppercase flex flex-col md:flex-row justify-between gap-2">
          <span>© 2025 ATLAS. All rights reserved.</span>
          <span className="text-[#C9A84C]/40">Trusted by the world's most demanding individuals.</span>
          <span>Privacy · Security · Excellence</span>
        </div>
      </div>
    </footer>
  )
}