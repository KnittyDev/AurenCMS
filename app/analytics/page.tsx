import Analytics from "@/components/analytics"

export const metadata = {
  title: 'Analytics - Auren',
  description: 'Detailed analytics and performance metrics for your projects',
}

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-[#0F0F10]">
      <Analytics />
    </div>
  )
}
