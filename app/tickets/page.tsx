import TicketSystem from "@/components/ticket-system"

export const metadata = {
  title: 'Ticket System - Auren',
  description: 'Manage your support tickets and get help from our team',
}

export default function TicketsPage() {
  return (
    <div className="min-h-screen bg-[#0F0F10]">
      <TicketSystem />
    </div>
  )
}
