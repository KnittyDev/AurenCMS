"use client"

import { useState } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Activity, 
  Plus, 
  ArrowUpRight,
  Calendar,
  Clock,
  Star,
  MessageSquare,
  FileText,
  BarChart3
} from "lucide-react"

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231",
    change: "+20.1%",
    changeType: "positive",
    icon: DollarSign,
    description: "from last month"
  },
  {
    title: "Active Users",
    value: "2,350",
    change: "+15.3%",
    changeType: "positive",
    icon: Users,
    description: "from last month"
  },
  {
    title: "Conversion Rate",
    value: "12.5%",
    change: "+2.4%",
    changeType: "positive",
    icon: TrendingUp,
    description: "from last month"
  },
  {
    title: "Active Sessions",
    value: "1,234",
    change: "-5.2%",
    changeType: "negative",
    icon: Activity,
    description: "from last month"
  }
]

const recentActivities = [
  {
    id: 1,
    type: "ticket",
    title: "New ticket created",
    description: "Login issues with authentication system",
    time: "2 minutes ago",
    status: "open"
  },
  {
    id: 2,
    type: "project",
    title: "Project updated",
    description: "E-commerce dashboard design completed",
    time: "1 hour ago",
    status: "completed"
  },
  {
    id: 3,
    type: "user",
    title: "New user registered",
    description: "john.doe@example.com joined the platform",
    time: "3 hours ago",
    status: "success"
  },
  {
    id: 4,
    type: "payment",
    title: "Payment received",
    description: "$299.00 from Premium subscription",
    time: "5 hours ago",
    status: "success"
  }
]

const quickActions = [
  {
    title: "Create Ticket",
    description: "Submit a new support request",
    icon: MessageSquare,
    href: "/tickets/new",
    color: "bg-blue-500/20 text-blue-400 border-blue-500/30"
  },
  {
    title: "New Project",
    description: "Start a new project",
    icon: FileText,
    href: "/projects/new",
    color: "bg-green-500/20 text-green-400 border-green-500/30"
  },
  {
    title: "View Analytics",
    description: "Check performance metrics",
    icon: BarChart3,
    href: "/analytics",
    color: "bg-purple-500/20 text-purple-400 border-purple-500/30"
  },
  {
    title: "Schedule Meeting",
    description: "Book a team meeting",
    icon: Calendar,
    href: "/meetings/new",
    color: "bg-orange-500/20 text-orange-400 border-orange-500/30"
  }
]

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("7d")
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.2 })
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation({ threshold: 0.3 })
  const { ref: activitiesRef, isVisible: activitiesVisible } = useScrollAnimation({ threshold: 0.2 })

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
              <h1 className="text-4xl font-light text-white mb-2">Dashboard</h1>
              <p className="text-white/70 text-lg">Welcome back! Here's what's happening with your projects.</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2 focus:border-white/40 focus:outline-none"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <Button className="bg-white text-black hover:bg-white/90">
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div 
          ref={statsRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 transition-all duration-1000 delay-200 ${
            statsVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          {stats.map((stat, index) => {
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
                      <p className="text-white/60 text-sm font-medium">{stat.title}</p>
                      <p className="text-2xl font-light text-white mt-1">{stat.value}</p>
                      <div className="flex items-center mt-2">
                        <Badge 
                          className={`${
                            stat.changeType === 'positive' 
                              ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                              : 'bg-red-500/20 text-red-400 border-red-500/30'
                          }`}
                        >
                          {stat.change}
                        </Badge>
                        <span className="text-white/60 text-sm ml-2">{stat.description}</span>
                      </div>
                    </div>
                    <div className="h-12 w-12 bg-white/10 rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-white/60" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card 
              ref={activitiesRef}
              className={`bg-white/5 border-white/10 backdrop-blur-sm transition-all duration-1000 delay-400 ${
                activitiesVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}
            >
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Activity className="mr-2 h-5 w-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription className="text-white/70">
                  Latest updates from your projects and team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <div className="h-8 w-8 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                        {activity.type === 'ticket' && <MessageSquare className="h-4 w-4 text-blue-400" />}
                        {activity.type === 'project' && <FileText className="h-4 w-4 text-green-400" />}
                        {activity.type === 'user' && <Users className="h-4 w-4 text-purple-400" />}
                        {activity.type === 'payment' && <DollarSign className="h-4 w-4 text-orange-400" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium">{activity.title}</p>
                        <p className="text-white/70 text-sm">{activity.description}</p>
                        <div className="flex items-center mt-1">
                          <Clock className="h-3 w-3 text-white/40 mr-1" />
                          <span className="text-white/40 text-xs">{activity.time}</span>
                          <Badge 
                            className={`ml-2 text-xs ${
                              activity.status === 'open' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                              activity.status === 'completed' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                              'bg-blue-500/20 text-blue-400 border-blue-500/30'
                            }`}
                          >
                            {activity.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card 
              className={`bg-white/5 border-white/10 backdrop-blur-sm transition-all duration-1000 delay-600 ${
                activitiesVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}
            >
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
                <CardDescription className="text-white/70">
                  Common tasks and shortcuts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon
                    return (
                      <Button
                        key={action.title}
                        variant="ghost"
                        className="w-full justify-start p-4 h-auto hover:bg-white/10"
                        style={{ transitionDelay: `${index * 100}ms` }}
                      >
                        <div className="flex items-center space-x-3 w-full">
                          <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${action.color}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1 text-left">
                            <p className="text-white font-medium">{action.title}</p>
                            <p className="text-white/60 text-sm">{action.description}</p>
                          </div>
                          <ArrowUpRight className="h-4 w-4 text-white/40" />
                        </div>
                      </Button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
