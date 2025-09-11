import Dashboard from "@/components/dashboard"

export const metadata = {
  title: 'Dashboard - Auren',
  description: 'Your personal dashboard with analytics and quick actions',
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#0F0F10]">
      <Dashboard />
    </div>
  )
}
