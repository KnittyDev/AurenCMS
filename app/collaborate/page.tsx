import Collaboration from "@/components/collaboration"

export const metadata = {
  title: 'Collaborate - Auren',
  description: 'Real-time collaboration tools and features',
}

export default function CollaboratePage() {
  return (
    <div className="min-h-screen bg-[#0F0F10]">
      <Collaboration />
    </div>
  )
}
