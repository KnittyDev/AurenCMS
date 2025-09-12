import Chat from "@/components/chat"

export const metadata = {
  title: 'Chat - Auren',
  description: 'Real-time messaging and team communication',
}

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-[#0F0F10]">
      <Chat />
    </div>
  )
}
