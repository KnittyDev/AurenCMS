import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import PricingSection from "@/components/pricing-section"
import FAQSection from "@/components/faq-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0F0F10]">
      <Navbar />
      <main>
        <div id="home">
          <HeroSection />
        </div>
        <div id="pricing">
          <PricingSection />
        </div>
        <div id="faq">
          <FAQSection />
        </div>
      </main>
      <Footer />
    </div>
  )
}
