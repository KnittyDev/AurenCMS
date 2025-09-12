"use client"

import { useState } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Users, 
  Video, 
  MessageSquare, 
  Share2, 
  Edit, 
  Eye,
  Clock,
  Globe,
  Lock,
  Plus,
  MoreVertical,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  ScreenShare,
  Hand,
  ThumbsUp,
  Smile,
  Send
} from "lucide-react"

const activeUsers = [
  { id: 1, name: "John Doe", avatar: "/placeholder-user.jpg", status: "typing", color: "bg-blue-500" },
  { id: 2, name: "Sarah Wilson", avatar: "/placeholder-user.jpg", status: "viewing", color: "bg-green-500" },
  { id: 3, name: "Mike Johnson", avatar: "/placeholder-user.jpg", status: "editing", color: "bg-purple-500" },
  { id: 4, name: "Emma Davis", avatar: "/placeholder-user.jpg", status: "idle", color: "bg-orange-500" }
]

const recentActivities = [
  {
    id: 1,
    user: "Sarah Wilson",
    action: "edited",
    target: "Project Proposal",
    time: "2 minutes ago",
    type: "edit"
  },
  {
    id: 2,
    user: "Mike Johnson",
    action: "commented on",
    target: "Dashboard Design",
    time: "5 minutes ago",
    type: "comment"
  },
  {
    id: 3,
    user: "Emma Davis",
    action: "shared",
    target: "Meeting Notes",
    time: "10 minutes ago",
    type: "share"
  },
  {
    id: 4,
    user: "John Doe",
    action: "created",
    target: "New Project",
    time: "15 minutes ago",
    type: "create"
  }
]

const sharedDocuments = [
  {
    id: 1,
    name: "Project Proposal",
    type: "document",
    sharedBy: "John Doe",
    lastModified: "2 min ago",
    viewers: 4,
    editors: 2,
    isPublic: false
  },
  {
    id: 2,
    name: "Dashboard Design",
    type: "design",
    sharedBy: "Sarah Wilson",
    lastModified: "5 min ago",
    viewers: 6,
    editors: 3,
    isPublic: true
  },
  {
    id: 3,
    name: "Meeting Notes",
    type: "document",
    sharedBy: "Emma Davis",
    lastModified: "10 min ago",
    viewers: 3,
    editors: 1,
    isPublic: false
  }
]

const collaborationTools = [
  {
    name: "Whiteboard",
    description: "Collaborative drawing and brainstorming",
    icon: Edit,
    color: "bg-blue-500/20 text-blue-400",
    users: 3
  },
  {
    name: "Code Editor",
    description: "Real-time code collaboration",
    icon: MessageSquare,
    color: "bg-green-500/20 text-green-400",
    users: 2
  },
  {
    name: "Video Call",
    description: "HD video meetings with screen sharing",
    icon: Video,
    color: "bg-purple-500/20 text-purple-400",
    users: 5
  },
  {
    name: "Document Editor",
    description: "Collaborative document editing",
    icon: Share2,
    color: "bg-orange-500/20 text-orange-400",
    users: 4
  }
]

export default function Collaboration() {
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isMicOn, setIsMicOn] = useState(true)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [activeTool, setActiveTool] = useState("whiteboard")
  
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.2 })
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({ threshold: 0.3 })

  return (
    <div className="min-h-screen bg-[#0F0F10]">
      {/* Header */}
      <div 
        ref={headerRef}
        className={`bg-gradient-to-b from-[#0F0F10] to-[#1a1a1b] border-b border-white/10 transition-all duration-1000 ${
          headerVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div>
              <h1 className="text-4xl font-light text-white mb-2">Collaborate</h1>
              <p className="text-white/70 text-lg">Real-time collaboration tools and features</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                className="text-white/70 hover:text-white hover:bg-white/10"
              >
                <Plus className="mr-2 h-4 w-4" />
                Start Session
              </Button>
              <Button
                variant="ghost"
                className="text-white/70 hover:text-white hover:bg-white/10"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div 
          ref={contentRef}
          className={`grid lg:grid-cols-3 gap-6 transition-all duration-1000 delay-200 ${
            contentVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          {/* Main Collaboration Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Users */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Active Collaborators
                </CardTitle>
                <CardDescription className="text-white/70">
                  {activeUsers.length} people are currently online
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  {activeUsers.map((user) => (
                    <div key={user.id} className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback className="bg-white/20 text-white text-sm">
                            {user.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-[#0F0F10] ${user.color}`}></div>
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">{user.name}</p>
                        <p className="text-white/60 text-xs capitalize">{user.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Collaboration Tools */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Collaboration Tools</CardTitle>
                <CardDescription className="text-white/70">
                  Choose your preferred collaboration method
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {collaborationTools.map((tool) => {
                    const Icon = tool.icon
                    return (
                      <button
                        key={tool.name}
                        onClick={() => setActiveTool(tool.name.toLowerCase().replace(' ', '-'))}
                        className={`p-4 rounded-lg border transition-all duration-200 text-left ${
                          activeTool === tool.name.toLowerCase().replace(' ', '-')
                            ? 'border-white/40 bg-white/10'
                            : 'border-white/10 hover:border-white/20 hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center space-x-3 mb-2">
                          <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${tool.color}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="text-white font-medium">{tool.name}</h3>
                            <p className="text-white/60 text-sm">{tool.users} users</p>
                          </div>
                        </div>
                        <p className="text-white/70 text-sm">{tool.description}</p>
                      </button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Video Call Interface */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Video className="mr-2 h-5 w-5" />
                  Video Call
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-black/50 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <Video className="h-12 w-12 text-white/40 mx-auto mb-2" />
                    <p className="text-white/60">Video call interface would be here</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-center space-x-4">
                  <Button
                    variant={isMicOn ? "default" : "destructive"}
                    size="sm"
                    onClick={() => setIsMicOn(!isMicOn)}
                  >
                    {isMicOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant={isVideoOn ? "default" : "destructive"}
                    size="sm"
                    onClick={() => setIsVideoOn(!isVideoOn)}
                  >
                    {isVideoOn ? <Camera className="h-4 w-4" /> : <CameraOff className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant={isScreenSharing ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setIsScreenSharing(!isScreenSharing)}
                  >
                    <ScreenShare className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Hand className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-lg">Recent Activity</CardTitle>
                <CardDescription className="text-white/70">
                  Latest collaboration updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className="h-8 w-8 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-medium">{activity.user[0]}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm">
                          <span className="font-medium">{activity.user}</span> {activity.action}{' '}
                          <span className="text-white/70">{activity.target}</span>
                        </p>
                        <p className="text-white/60 text-xs">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Shared Documents */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-lg">Shared Documents</CardTitle>
                <CardDescription className="text-white/70">
                  Currently shared files and folders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sharedDocuments.map((doc) => (
                    <div key={doc.id} className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="h-6 w-6 bg-white/10 rounded flex items-center justify-center">
                            <Edit className="h-3 w-3" />
                          </div>
                          <h4 className="text-white font-medium text-sm">{doc.name}</h4>
                          {doc.isPublic ? (
                            <Globe className="h-3 w-3 text-green-400" />
                          ) : (
                            <Lock className="h-3 w-3 text-yellow-400" />
                          )}
                        </div>
                        <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10">
                          <MoreVertical className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="space-y-1 text-xs text-white/60">
                        <p>Shared by {doc.sharedBy}</p>
                        <p>Modified {doc.lastModified}</p>
                        <div className="flex items-center space-x-4">
                          <span>{doc.viewers} viewers</span>
                          <span>{doc.editors} editors</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Invite People
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Screen
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Start Chat
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10"
                >
                  <Clock className="mr-2 h-4 w-4" />
                  Schedule Meeting
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
