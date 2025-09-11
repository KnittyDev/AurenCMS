"use client"

import { useState } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  TrendingUp, 
  TrendingDown,
  Users, 
  DollarSign, 
  Activity, 
  Eye,
  MousePointer,
  Clock,
  BarChart3,
  PieChart,
  LineChart,
  Download
} from "lucide-react"

const overviewStats = [
  {
    title: "Total Page Views",
    value: "2.4M",
    change: "+12.5%",
    changeType: "positive",
    icon: Eye,
    description: "vs last month"
  },
  {
    title: "Unique Visitors",
    value: "145.2K",
    change: "+8.2%",
    changeType: "positive",
    icon: Users,
    description: "vs last month"
  },
  {
    title: "Conversion Rate",
    value: "3.24%",
    change: "+0.5%",
    changeType: "positive",
    icon: TrendingUp,
    description: "vs last month"
  },
  {
    title: "Bounce Rate",
    value: "42.1%",
    change: "-2.3%",
    changeType: "positive",
    icon: TrendingDown,
    description: "vs last month"
  }
]

const topPages = [
  { page: "/dashboard", views: 12543, change: "+12.5%", changeType: "positive" },
  { page: "/tickets", views: 8942, change: "+8.2%", changeType: "positive" },
  { page: "/projects", views: 6734, change: "-2.1%", changeType: "negative" },
  { page: "/analytics", views: 4521, change: "+15.3%", changeType: "positive" },
  { page: "/settings", views: 3124, change: "+5.7%", changeType: "positive" }
]

const trafficSources = [
  { source: "Direct", visitors: 45231, percentage: 45.2, color: "bg-blue-500" },
  { source: "Search", visitors: 32156, percentage: 32.1, color: "bg-green-500" },
  { source: "Social", visitors: 12345, percentage: 12.3, color: "bg-purple-500" },
  { source: "Referral", visitors: 10268, percentage: 10.4, color: "bg-orange-500" }
]

const deviceStats = [
  { device: "Desktop", users: 67890, percentage: 67.8, color: "bg-blue-500" },
  { device: "Mobile", users: 25678, percentage: 25.7, color: "bg-green-500" },
  { device: "Tablet", users: 6432, percentage: 6.5, color: "bg-purple-500" }
]

export default function Analytics() {
  const [selectedPeriod, setSelectedPeriod] = useState("30d")
  const [activeTab, setActiveTab] = useState("overview")
  
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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div>
              <h1 className="text-4xl font-light text-white mb-2">Analytics</h1>
              <p className="text-white/70 text-lg">Track your performance and make data-driven decisions</p>
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
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Overview Stats */}
        <div 
          ref={statsRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 transition-all duration-1000 delay-200 ${
            statsVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          {overviewStats.map((stat, index) => {
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

        {/* Analytics Tabs */}
        <div 
          ref={contentRef}
          className={`transition-all duration-1000 delay-400 ${
            contentVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white/5 border-white/10">
              <TabsTrigger value="overview" className="data-[state=active]:bg-white/10">Overview</TabsTrigger>
              <TabsTrigger value="traffic" className="data-[state=active]:bg-white/10">Traffic</TabsTrigger>
              <TabsTrigger value="devices" className="data-[state=active]:bg-white/10">Devices</TabsTrigger>
              <TabsTrigger value="pages" className="data-[state=active]:bg-white/10">Pages</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <LineChart className="mr-2 h-5 w-5" />
                      Page Views Over Time
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center text-white/60">
                      <div className="text-center">
                        <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>Chart visualization would go here</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <PieChart className="mr-2 h-5 w-5" />
                      Traffic Sources
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {trafficSources.map((source, index) => (
                        <div key={source.source} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`h-3 w-3 rounded-full ${source.color}`}></div>
                            <span className="text-white">{source.source}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-white/60">{source.visitors.toLocaleString()}</span>
                            <span className="text-white/40">({source.percentage}%)</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="traffic" className="space-y-6">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Traffic Sources</CardTitle>
                  <CardDescription className="text-white/70">
                    Where your visitors are coming from
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {trafficSources.map((source, index) => (
                      <div key={source.source} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-white font-medium">{source.source}</span>
                          <span className="text-white/60">{source.visitors.toLocaleString()} visitors</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${source.color}`}
                            style={{ width: `${source.percentage}%` }}
                          ></div>
                        </div>
                        <div className="text-right">
                          <span className="text-white/40 text-sm">{source.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="devices" className="space-y-6">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Device Breakdown</CardTitle>
                  <CardDescription className="text-white/70">
                    How users access your platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {deviceStats.map((device, index) => (
                      <div key={device.device} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-white font-medium">{device.device}</span>
                          <span className="text-white/60">{device.users.toLocaleString()} users</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${device.color}`}
                            style={{ width: `${device.percentage}%` }}
                          ></div>
                        </div>
                        <div className="text-right">
                          <span className="text-white/40 text-sm">{device.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pages" className="space-y-6">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Top Pages</CardTitle>
                  <CardDescription className="text-white/70">
                    Most visited pages on your platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topPages.map((page, index) => (
                      <div key={page.page} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className="h-8 w-8 bg-white/10 rounded flex items-center justify-center">
                            <span className="text-white/60 text-sm font-medium">{index + 1}</span>
                          </div>
                          <div>
                            <p className="text-white font-medium">{page.page}</p>
                            <p className="text-white/60 text-sm">{page.views.toLocaleString()} views</p>
                          </div>
                        </div>
                        <Badge 
                          className={`${
                            page.changeType === 'positive' 
                              ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                              : 'bg-red-500/20 text-red-400 border-red-500/30'
                          }`}
                        >
                          {page.change}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
