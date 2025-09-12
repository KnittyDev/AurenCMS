import MobileApp from "@/components/mobile-app"

export const metadata = {
  title: 'Mobile App - Auren',
  description: 'Mobile app simulation and preview',
}

export default function MobilePage() {
  return (
    <div className="min-h-screen bg-[#0F0F10]">
      <MobileApp />
    </div>
  )
}
