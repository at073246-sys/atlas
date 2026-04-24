'use client'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { services } from '../data/services'

export default function ServicesGrid() {
  return (
    <section id="services" className="py-28 relative">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-[#C9A84C]/50" />
            <span className="text-xs tracking-[0.4em] text-[#C9A84C] uppercase">Our Services</span>
            <div className="h-px w-12 bg-[#C9A84C]/50" />
          </div>
          <h2 className="text-5xl md:text-7xl font-playfair font-black bg-gradient-to-r from-[#C9A84C] to-[#F0D080] bg-clip-text text-transparent mb-6">
            World-Class<br />Professionals
          </h2>
          <p className="text-[#E5E4E2]/60 text-lg max-w-2xl mx-auto">
            Every professional is verified, elite, and ready on demand.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
              className="bg-gradient-to-br from-[#0A0A0A]/85 to-[#0D1B2A]/85 backdrop-blur-xl border border-[#C9A84C]/20 shadow-2xl rounded-2xl p-8 group relative overflow-hidden hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-4xl mb-5">{service.icon}</div>
              <h3 className="text-2xl font-playfair font-bold text-white mb-3 group-hover:text-[#C9A84C] transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-[#E5E4E2]/60 text-sm leading-relaxed mb-6">{service.desc}</p>
              {service.pricing.length > 0 && (
                <div className="space-y-2 mb-4">
                  {service.pricing.map((p) => (
                    <div key={p.label} className="flex justify-between items-center py-2 border-b border-[#C9A84C]/10">
                      <span className="text-xs tracking-wider text-[#E5E4E2]/50 uppercase">{p.label}</span>
                      <span className="text-sm font-bold bg-gradient-to-r from-[#C9A84C] to-[#F0D080] bg-clip-text text-transparent">{p.price}</span>
                    </div>
                  ))}
                </div>
              )}
              
              <Link
                href={`/services/${service.id}`}
                className="flex items-center gap-2 text-xs tracking-widest text-[#C9A84C] uppercase mt-4 hover:gap-3 transition-all duration-300"
              >
                <span>View Details & Book</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}