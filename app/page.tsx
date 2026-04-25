'use client'

import dynamic from 'next/dynamic'

const Hero = dynamic(() => import('./components/Hero'), { ssr: false })
const GoldDivider = dynamic(() => import('./components/GoldDivider'), { ssr: false })
const StatsSection = dynamic(() => import('./components/StatsSection'), { ssr: false })
const ServicesGrid = dynamic(() => import('./components/ServicesGrid'), { ssr: false })
const PricingPlans = dynamic(() => import('./components/PricingPlans'), { ssr: false })
const TrustSection = dynamic(() => import('./components/TrustSection'), { ssr: false })
const HowItWorks = dynamic(() => import('./components/HowItWorks'), { ssr: false })
const TalentRegister = dynamic(() => import('./components/TalentRegister'), { ssr: false })
const Footer = dynamic(() => import('./components/Footer'), { ssr: false })
const CinematicAssets = dynamic(() => import('./components/CinematicAssets'), { ssr: false })


export default function Home() {
  return (
    <main className="relative min-h-screen">
      <CinematicAssets />
      
      <div className="relative z-10">
        <Hero />
        <GoldDivider />
        <StatsSection />
        <GoldDivider />
        <ServicesGrid />
        <GoldDivider />
        <PricingPlans />
        <GoldDivider />
        <TrustSection />
        <GoldDivider />
        <HowItWorks />
        <GoldDivider />
        <TalentRegister />
        <GoldDivider />
        <Footer />
      </div>
    </main>
  )
}