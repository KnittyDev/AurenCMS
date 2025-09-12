import Calendar from "@/components/calendar"

export const metadata = {
  title: 'Calendar - Auren',
  description: 'Manage your schedule and events',
}

export default function CalendarPage() {
  return (
    <div className="min-h-screen bg-[#0F0F10]">
      <Calendar />
    </div>
  )
}
