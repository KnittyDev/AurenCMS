"use client"

import { useState, useRef, useEffect } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Send, 
  Paperclip, 
  Smile, 
  MoreVertical,
  Phone,
  Video,
  Search,
  Settings,
  Users,
  Hash,
  Lock,
  Star,
  Pin,
  Archive
} from "lucide-react"

const channels = [
  { id: 1, name: "general", type: "public", unread: 3, lastMessage: "Hey everyone! 👋", lastTime: "2m" },
  { id: 2, name: "frontend-team", type: "private", unread: 0, lastMessage: "React 19 is amazing!", lastTime: "1h" },
  { id: 3, name: "design", type: "public", unread: 7, lastMessage: "New mockups are ready", lastTime: "30m" },
  { id: 4, name: "random", type: "public", unread: 0, lastMessage: "Coffee break anyone?", lastTime: "2h" }
]

const directMessages = [
  { id: 1, name: "Sarah Wilson", status: "online", lastMessage: "Can you review the PR?", lastTime: "5m", unread: 2 },
  { id: 2, name: "Mike Johnson", status: "away", lastMessage: "Thanks for the help!", lastTime: "1h", unread: 0 },
  { id: 3, name: "Emma Davis", status: "offline", lastMessage: "See you tomorrow", lastTime: "3h", unread: 1 }
]

const messages = [
  {
    id: 1,
    user: "Sarah Wilson",
    avatar: "/placeholder-user.jpg",
    message: "Hey team! I've finished the new dashboard design. What do you think?",
    time: "2:30 PM",
    type: "text",
    reactions: [{ emoji: "👍", count: 3 }, { emoji: "❤️", count: 1 }]
  },
  {
    id: 2,
    user: "John Doe",
    avatar: "/placeholder-user.jpg",
    message: "Looks amazing! The color scheme is perfect 👌",
    time: "2:32 PM",
    type: "text",
    reactions: []
  },
  {
    id: 3,
    user: "Mike Johnson",
    avatar: "/placeholder-user.jpg",
    message: "I have some suggestions for the mobile version. Should I create a ticket?",
    time: "2:35 PM",
    type: "text",
    reactions: []
  },
  {
    id: 4,
    user: "Sarah Wilson",
    avatar: "/placeholder-user.jpg",
    message: "Yes, please! That would be great",
    time: "2:36 PM",
    type: "text",
    reactions: []
  },
  {
    id: 5,
    user: "Emma Davis",
    avatar: "/placeholder-user.jpg",
    message: "I've uploaded the new assets to the shared drive",
    time: "2:40 PM",
    type: "file",
    file: { name: "dashboard-assets.zip", size: "2.4 MB", type: "zip" },
    reactions: []
  }
]

export default function Chat() {
  const [selectedChannel, setSelectedChannel] = useState(channels[0])
  const [selectedDM, setSelectedDM] = useState(null)
  const [message, setMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.2 })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      // Handle sending message
      console.log('Sending message:', message)
      setMessage("")
    }
  }

  const currentMessages = selectedDM ? [] : messages

  return (
    <div className="min-h-screen bg-[#0F0F10]">
      {/* Header */}
      <div 
        ref={headerRef}
        className={`bg-gradient-to-b from-[#0F0F10] to-[#1a1a1b] border-b border-white/10 transition-all duration-1000 ${
          headerVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-light text-white mb-1">Team Chat</h1>
              <p className="text-white/70">Stay connected with your team</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Channels */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-sm flex items-center">
                  <Hash className="mr-2 h-4 w-4" />
                  Channels
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                {channels.map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => {
                      setSelectedChannel(channel)
                      setSelectedDM(null)
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                      selectedChannel.id === channel.id
                        ? 'bg-white/10 text-white'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Hash className="h-4 w-4" />
                      <span className="text-sm">{channel.name}</span>
                      {channel.type === 'private' && <Lock className="h-3 w-3" />}
                    </div>
                    {channel.unread > 0 && (
                      <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                        {channel.unread}
                      </Badge>
                    )}
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Direct Messages */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-sm flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  Direct Messages
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                {directMessages.map((dm) => (
                  <button
                    key={dm.id}
                    onClick={() => {
                      setSelectedDM(dm)
                      setSelectedChannel(null)
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                      selectedDM?.id === dm.id
                        ? 'bg-white/10 text-white'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <div className="h-6 w-6 bg-white/20 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium">{dm.name[0]}</span>
                        </div>
                        <div className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-[#0F0F10] ${
                          dm.status === 'online' ? 'bg-green-400' :
                          dm.status === 'away' ? 'bg-yellow-400' : 'bg-gray-400'
                        }`}></div>
                      </div>
                      <span className="text-sm">{dm.name}</span>
                    </div>
                    {dm.unread > 0 && (
                      <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                        {dm.unread}
                      </Badge>
                    )}
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm h-full flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 bg-white/20 rounded-full flex items-center justify-center">
                      {selectedDM ? (
                        <span className="text-sm font-medium">{selectedDM.name[0]}</span>
                      ) : (
                        <Hash className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-white font-medium">
                        {selectedDM ? selectedDM.name : `#${selectedChannel.name}`}
                      </h3>
                      <p className="text-white/60 text-sm">
                        {selectedDM ? selectedDM.status : `${selectedChannel.unread} unread messages`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {currentMessages.map((msg) => (
                  <div key={msg.id} className="flex space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={msg.avatar} />
                      <AvatarFallback className="bg-white/20 text-white text-xs">
                        {msg.user[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-white font-medium text-sm">{msg.user}</span>
                        <span className="text-white/40 text-xs">{msg.time}</span>
                      </div>
                      <div className="text-white/80 text-sm">
                        {msg.type === 'file' ? (
                          <div className="flex items-center space-x-2 p-2 bg-white/5 rounded-lg">
                            <Paperclip className="h-4 w-4" />
                            <div>
                              <p className="font-medium">{msg.file?.name}</p>
                              <p className="text-xs text-white/60">{msg.file?.size}</p>
                            </div>
                          </div>
                        ) : (
                          <p>{msg.message}</p>
                        )}
                      </div>
                      {msg.reactions.length > 0 && (
                        <div className="flex space-x-2 mt-2">
                          {msg.reactions.map((reaction, index) => (
                            <button
                              key={index}
                              className="flex items-center space-x-1 px-2 py-1 bg-white/10 rounded-full text-xs hover:bg-white/20 transition-colors"
                            >
                              <span>{reaction.emoji}</span>
                              <span className="text-white/60">{reaction.count}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-white/10">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-white/70 hover:text-white hover:bg-white/10"
                  >
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={`Message #${selectedChannel.name}`}
                    className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-white/70 hover:text-white hover:bg-white/10"
                  >
                    <Smile className="h-4 w-4" />
                  </Button>
                  <Button
                    type="submit"
                    size="sm"
                    className="bg-white text-black hover:bg-white/90"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
