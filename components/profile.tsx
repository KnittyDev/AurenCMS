"use client"

import { useState } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Edit,
  Camera,
  Star,
  Award,
  Activity,
  MessageSquare,
  FolderOpen,
  BarChart3,
  Settings
} from "lucide-react"

const userStats = [
  {
    title: "Projects Completed",
    value: "24",
    icon: FolderOpen,
    color: "text-blue-400"
  },
  {
    title: "Tickets Resolved",
    value: "156",
    icon: MessageSquare,
    color: "text-green-400"
  },
  {
    title: "Team Members",
    value: "8",
    icon: User,
    color: "text-purple-400"
  },
  {
    title: "Performance Score",
    value: "98%",
    icon: Award,
    color: "text-yellow-400"
  }
]

const recentActivity = [
  {
    id: 1,
    action: "Completed project",
    description: "E-commerce Dashboard",
    time: "2 hours ago",
    type: "project"
  },
  {
    id: 2,
    action: "Resolved ticket",
    description: "TKT-001 - Login issues",
    time: "4 hours ago",
    type: "ticket"
  },
  {
    id: 3,
    action: "Joined team",
    description: "Frontend Development Team",
    time: "1 day ago",
    type: "team"
  },
  {
    id: 4,
    action: "Updated profile",
    description: "Added new skills",
    time: "2 days ago",
    type: "profile"
  }
]

const skills = [
  "React", "TypeScript", "Next.js", "Node.js", "Python", "PostgreSQL", "AWS", "Docker"
]

const achievements = [
  {
    title: "First Project",
    description: "Completed your first project",
    icon: Star,
    earned: true
  },
  {
    title: "Team Player",
    description: "Collaborated on 10+ projects",
    icon: User,
    earned: true
  },
  {
    title: "Problem Solver",
    description: "Resolved 100+ tickets",
    icon: MessageSquare,
    earned: true
  },
  {
    title: "Performance Master",
    description: "Achieved 95%+ performance score",
    icon: Award,
    earned: false
  }
]

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.2 })
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation({ threshold: 0.3 })
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({ threshold: 0.2 })

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
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder-user.jpg" alt="Profile" />
                <AvatarFallback className="bg-white/20 text-white text-2xl">JD</AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-white text-black hover:bg-white/90"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-4xl font-light text-white mb-2">John Doe</h1>
                  <p className="text-white/70 text-lg mb-2">Senior Frontend Developer</p>
                  <div className="flex items-center space-x-4 text-white/60">
                    <div className="flex items-center space-x-1">
                      <Mail className="h-4 w-4" />
                      <span>john.doe@example.com</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Phone className="h-4 w-4" />
                      <span>+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>San Francisco, CA</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-white/70 hover:text-white hover:bg-white/10"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-white/70 hover:text-white hover:bg-white/10"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div 
          ref={statsRef}
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 transition-all duration-1000 delay-200 ${
            statsVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          {userStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card
                key={stat.title}
                className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/60 text-sm">{stat.title}</p>
                      <p className="text-2xl font-light text-white mt-1">{stat.value}</p>
                    </div>
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div 
          ref={contentRef}
          className={`grid lg:grid-cols-3 gap-8 transition-all duration-1000 delay-400 ${
            contentVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          {/* About */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">About</CardTitle>
                <CardDescription className="text-white/70">
                  A brief description about yourself
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 leading-relaxed">
                  Passionate frontend developer with 5+ years of experience building modern web applications. 
                  I love creating intuitive user interfaces and solving complex problems with clean, efficient code. 
                  Currently focused on React, TypeScript, and Next.js development.
                </p>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Skills & Technologies</CardTitle>
                <CardDescription className="text-white/70">
                  Technologies and tools you're proficient with
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-white/10 text-white/80 hover:bg-white/20 transition-colors"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Activity className="mr-2 h-5 w-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription className="text-white/70">
                  Your latest actions and updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <div className="h-8 w-8 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                        {activity.type === 'project' && <FolderOpen className="h-4 w-4 text-blue-400" />}
                        {activity.type === 'ticket' && <MessageSquare className="h-4 w-4 text-green-400" />}
                        {activity.type === 'team' && <User className="h-4 w-4 text-purple-400" />}
                        {activity.type === 'profile' && <Edit className="h-4 w-4 text-orange-400" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium">{activity.action}</p>
                        <p className="text-white/70 text-sm">{activity.description}</p>
                        <p className="text-white/40 text-xs mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Achievements */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Achievements</CardTitle>
                <CardDescription className="text-white/70">
                  Your progress and milestones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => {
                    const Icon = achievement.icon
                    return (
                      <div
                        key={achievement.title}
                        className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                          achievement.earned ? 'bg-white/5' : 'bg-white/5 opacity-50'
                        }`}
                        style={{ transitionDelay: `${index * 100}ms` }}
                      >
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                          achievement.earned ? 'bg-yellow-500/20' : 'bg-white/10'
                        }`}>
                          <Icon className={`h-4 w-4 ${
                            achievement.earned ? 'text-yellow-400' : 'text-white/40'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium ${
                            achievement.earned ? 'text-white' : 'text-white/50'
                          }`}>
                            {achievement.title}
                          </p>
                          <p className={`text-sm ${
                            achievement.earned ? 'text-white/70' : 'text-white/30'
                          }`}>
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Member since</span>
                    <span className="text-white">Jan 2023</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Last active</span>
                    <span className="text-white">2 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Timezone</span>
                    <span className="text-white">PST</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Status</span>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      Online
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
