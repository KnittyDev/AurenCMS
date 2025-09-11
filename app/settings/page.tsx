import Settings from "@/components/settings"

export const metadata = {
  title: 'Settings - Auren',
  description: 'Manage your account settings and preferences',
}

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-[#0F0F10]">
      <Settings />
    </div>
  )
}
