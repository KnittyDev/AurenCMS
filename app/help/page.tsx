import HelpCenter from "@/components/help-center"

export const metadata = {
  title: 'Help Center - Auren',
  description: 'Help center and knowledge base',
}

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-[#0F0F10]">
      <HelpCenter />
    </div>
  )
}
