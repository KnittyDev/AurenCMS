"use client"

import { useState } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Smartphone, 
  Download, 
  Play, 
  Apple, 
  Android,
  Home,
  Search,
  Bell,
  User,
  Menu,
  ChevronLeft,
  ChevronRight,
  Star,
  Heart,
  Share,
  MoreVertical,
  Camera,
  MapPin,
  Clock,
  MessageCircle,
  Settings,
  BarChart3,
  Calendar,
  FileText,
  Users
} from "lucide-react"

const mobileScreens = [
  {
    id: 1,
    name: "Home",
    icon: Home,
    description: "Main dashboard with key metrics",
    color: "bg-blue-500/20 text-blue-400"
  },
  {
    id: 2,
    name: "Projects",
    icon: FileText,
    description: "Project management and tracking",
    color: "bg-green-500/20 text-green-400"
  },
  {
    id: 3,
    name: "Analytics",
    icon: BarChart3,
    description: "Data visualization and reports",
    color: "bg-purple-500/20 text-purple-400"
  },
  {
    id: 4,
    name: "Calendar",
    icon: Calendar,
    description: "Schedule and event management",
    color: "bg-orange-500/20 text-orange-400"
  },
  {
    id: 5,
    name: "Team",
    icon: Users,
    description: "Team collaboration and chat",
    color: "bg-pink-500/20 text-pink-400"
  }
]

const appFeatures = [
  {
    title: "Real-time Sync",
    description: "Your data syncs instantly across all devices",
    icon: Smartphone
  },
  {
    title: "Offline Mode",
    description: "Work without internet connection",
    icon: Download
  },
  {
    title: "Push Notifications",
    description: "Stay updated with instant alerts",
    icon: Bell
  },
  {
    title: "Touch Gestures",
    description: "Intuitive mobile interactions",
    icon: Play
  }
]

const mockData = {
  projects: [
    { name: "Website Redesign", progress: 75, status: "active" },
    { name: "Mobile App", progress: 45, status: "active" },
    { name: "API Integration", progress: 90, status: "completed" }
  ],
  notifications: [
    { title: "New message from Sarah", time: "2m ago", unread: true },
    { title: "Project deadline approaching", time: "1h ago", unread: true },
    { title: "Team meeting in 30 min", time: "2h ago", unread: false }
  ],
  recentActivity: [
    { action: "Updated project status", user: "John Doe", time: "5m ago" },
    { action: "Added new team member", user: "Sarah Wilson", time: "1h ago" },
    { action: "Completed task", user: "Mike Johnson", time: "2h ago" }
  ]
}

export default function MobileApp() {
  const [selectedScreen, setSelectedScreen] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentDevice, setCurrentDevice] = useState("iphone")
  
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.2 })
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({ threshold: 0.3 })

  const renderScreenContent = (screenId: number) => {
    switch (screenId) {
      case 1: // Home
        return (
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-white font-semibold text-lg">Dashboard</h2>
              <Bell className="h-5 w-5 text-white/70" />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-white/70 text-xs">Active Projects</p>
                <p className="text-white text-xl font-semibold">12</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-white/70 text-xs">Team Members</p>
                <p className="text-white text-xl font-semibold">8</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-white font-medium text-sm">Recent Projects</h3>
              {mockData.projects.map((project, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white text-sm font-medium">{project.name}</span>
                    <Badge className={`text-xs ${
                      project.status === 'active' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {project.status}
                    </Badge>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1">
                    <div 
                      className="bg-white h-1 rounded-full" 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-white/60 text-xs mt-1">{project.progress}% complete</p>
                </div>
              ))}
            </div>
          </div>
        )
      
      case 2: // Projects
        return (
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-white font-semibold text-lg">Projects</h2>
              <Button size="sm" className="bg-white text-black text-xs">
                + New
              </Button>
            </div>
            
            <div className="space-y-3">
              {mockData.projects.map((project, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium text-sm">{project.name}</span>
                    <MoreVertical className="h-4 w-4 text-white/60" />
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-full bg-white/10 rounded-full h-1">
                      <div 
                        className="bg-white h-1 rounded-full" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-white/60 text-xs">{project.progress}%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-white/60">
                    <span>Due in 3 days</span>
                    <span>5 tasks</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      
      case 3: // Analytics
        return (
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-white font-semibold text-lg">Analytics</h2>
              <Calendar className="h-5 w-5 text-white/70" />
            </div>
            
            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-white font-medium">Performance</span>
                <span className="text-green-400 text-sm">+12.5%</span>
              </div>
              <div className="h-20 bg-white/10 rounded flex items-end space-x-1">
                {[40, 60, 45, 70, 55, 80, 65].map((height, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-t flex-1"
                    style={{ height: `${height}%` }}
                  ></div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-white/70 text-xs">Total Views</p>
                <p className="text-white text-lg font-semibold">2.4K</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-white/70 text-xs">Conversion</p>
                <p className="text-white text-lg font-semibold">3.2%</p>
              </div>
            </div>
          </div>
        )
      
      case 4: // Calendar
        return (
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-white font-semibold text-lg">Calendar</h2>
              <Button size="sm" className="bg-white text-black text-xs">
                + Event
              </Button>
            </div>
            
            <div className="space-y-2">
              <div className="bg-white/5 rounded-lg p-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">Team Meeting</p>
                    <p className="text-white/60 text-xs">9:00 AM - 10:00 AM</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">Client Call</p>
                    <p className="text-white/60 text-xs">2:00 PM - 3:00 PM</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">Project Review</p>
                    <p className="text-white/60 text-xs">4:00 PM - 5:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      
      case 5: // Team
        return (
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-white font-semibold text-lg">Team</h2>
              <MessageCircle className="h-5 w-5 text-white/70" />
            </div>
            
            <div className="space-y-2">
              {mockData.notifications.map((notification, index) => (
                <div key={index} className={`bg-white/5 rounded-lg p-3 ${notification.unread ? 'bg-white/10' : ''}`}>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-medium">J</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">{notification.title}</p>
                      <p className="text-white/60 text-xs">{notification.time}</p>
                    </div>
                    {notification.unread && (
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

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
              <h1 className="text-4xl font-light text-white mb-2">Mobile App</h1>
              <p className="text-white/70 text-lg">Experience Auren on mobile devices</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                className="text-white/70 hover:text-white hover:bg-white/10"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Play className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                {isPlaying ? 'Pause' : 'Play'} Demo
              </Button>
              <Button className="bg-white text-black hover:bg-white/90">
                <Download className="mr-2 h-4 w-4" />
                Download App
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div 
          ref={contentRef}
          className={`transition-all duration-1000 delay-200 ${
            contentVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Mobile Simulator */}
            <div className="lg:col-span-2">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">Mobile Preview</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant={currentDevice === "iphone" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setCurrentDevice("iphone")}
                      >
                        <Apple className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={currentDevice === "android" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setCurrentDevice("android")}
                      >
                        <Android className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center">
                    <div className={`relative ${currentDevice === "iphone" ? "w-64 h-[500px]" : "w-72 h-[500px]"}`}>
                      {/* Phone Frame */}
                      <div className={`absolute inset-0 rounded-[2rem] border-4 border-white/20 bg-black ${
                        currentDevice === "iphone" ? "rounded-[2rem]" : "rounded-[1.5rem]"
                      }`}>
                        {/* Status Bar */}
                        <div className="flex items-center justify-between px-4 py-2 text-white text-xs">
                          <span>9:41</span>
                          <div className="flex items-center space-x-1">
                            <div className="w-4 h-2 bg-white rounded-sm"></div>
                            <div className="w-4 h-2 bg-white rounded-sm"></div>
                          </div>
                        </div>
                        
                        {/* Screen Content */}
                        <div className="h-[calc(100%-60px)] bg-gradient-to-b from-[#1a1a1b] to-[#0F0F10] rounded-b-[1.5rem] overflow-hidden">
                          {renderScreenContent(selectedScreen)}
                        </div>
                        
                        {/* Bottom Navigation */}
                        <div className="absolute bottom-0 left-0 right-0 bg-white/5 backdrop-blur-sm border-t border-white/10">
                          <div className="flex items-center justify-around py-2">
                            {mobileScreens.map((screen) => {
                              const Icon = screen.icon
                              return (
                                <button
                                  key={screen.id}
                                  onClick={() => setSelectedScreen(screen.id)}
                                  className={`p-2 rounded-lg transition-colors ${
                                    selectedScreen === screen.id
                                      ? 'bg-white/20 text-white'
                                      : 'text-white/60 hover:text-white hover:bg-white/10'
                                  }`}
                                >
                                  <Icon className="h-5 w-5" />
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Screen Navigation */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Screens</CardTitle>
                  <CardDescription className="text-white/70">
                    Tap to switch between different app screens
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {mobileScreens.map((screen, index) => {
                    const Icon = screen.icon
                    return (
                      <button
                        key={screen.id}
                        onClick={() => setSelectedScreen(screen.id)}
                        className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                          selectedScreen === screen.id
                            ? 'bg-white/10 text-white'
                            : 'text-white/70 hover:text-white hover:bg-white/5'
                        }`}
                        style={{ transitionDelay: `${index * 100}ms` }}
                      >
                        <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${screen.color}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-sm">{screen.name}</p>
                          <p className="text-xs opacity-70">{screen.description}</p>
                        </div>
                      </button>
                    )
                  })}
                </CardContent>
              </Card>

              {/* App Features */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white text-lg">App Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {appFeatures.map((feature, index) => {
                    const Icon = feature.icon
                    return (
                      <div
                        key={feature.title}
                        className="flex items-start space-x-3"
                        style={{ transitionDelay: `${index * 100}ms` }}
                      >
                        <div className="h-8 w-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="h-4 w-4 text-white/70" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium text-sm">{feature.title}</h4>
                          <p className="text-white/70 text-xs">{feature.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>

              {/* Download Links */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Download</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-white text-black hover:bg-white/90">
                    <Apple className="mr-2 h-4 w-4" />
                    Download for iOS
                  </Button>
                  <Button className="w-full bg-white text-black hover:bg-white/90">
                    <Android className="mr-2 h-4 w-4" />
                    Download for Android
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
