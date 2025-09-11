import Profile from "@/components/profile"

export const metadata = {
  title: 'Profile - Auren',
  description: 'View and manage your user profile',
}

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#0F0F10]">
      <Profile />
    </div>
  )
}
