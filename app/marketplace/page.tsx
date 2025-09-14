import Marketplace from "@/components/marketplace"

export const metadata = {
  title: 'Marketplace - Auren',
  description: 'Integration marketplace and third-party services',
}

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-[#0F0F10]">
      <Marketplace />
    </div>
  )
}
