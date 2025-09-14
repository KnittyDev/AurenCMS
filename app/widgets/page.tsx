import DashboardWidgets from "@/components/dashboard-widgets"

export const metadata = {
  title: 'Dashboard Widgets - Auren',
  description: 'Advanced dashboard widgets and components',
}

export default function WidgetsPage() {
  return (
    <div className="min-h-screen bg-[#0F0F10]">
      <DashboardWidgets />
    </div>
  )
}
