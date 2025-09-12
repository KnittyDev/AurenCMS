"use client"

import { useState } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  BarChart3, 
  PieChart, 
  LineChart, 
  TrendingUp, 
  Download, 
  Share2,
  Filter,
  Calendar,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  Plus,
  Settings
} from "lucide-react"

const reportTypes = [
  {
    id: 1,
    name: "Revenue Report",
    type: "financial",
    description: "Monthly revenue analysis and trends",
    lastGenerated: "2024-01-15",
    frequency: "Monthly",
    status: "active",
    views: 24,
    icon: TrendingUp,
    color: "bg-green-500/20 text-green-400"
  },
  {
    id: 2,
    name: "User Analytics",
    type: "analytics",
    description: "User behavior and engagement metrics",
    lastGenerated: "2024-01-14",
    frequency: "Weekly",
    status: "active",
    views: 18,
    icon: BarChart3,
    color: "bg-blue-500/20 text-blue-400"
  },
  {
    id: 3,
    name: "Project Performance",
    type: "project",
    description: "Project completion rates and timelines",
    lastGenerated: "2024-01-13",
    frequency: "Bi-weekly",
    status: "active",
    views: 12,
    icon: PieChart,
    color: "bg-purple-500/20 text-purple-400"
  },
  {
    id: 4,
    name: "Support Tickets",
    type: "support",
    description: "Ticket resolution times and categories",
    lastGenerated: "2024-01-12",
    frequency: "Daily",
    status: "paused",
    views: 8,
    icon: LineChart,
    color: "bg-orange-500/20 text-orange-400"
  }
]

const chartData = {
  revenue: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue",
        data: [12000, 15000, 18000, 22000, 25000, 28000],
        color: "bg-blue-500"
      }
    ]
  },
  users: {
    labels: ["Desktop", "Mobile", "Tablet"],
    datasets: [
      { label: "Desktop", value: 65, color: "bg-blue-500" },
      { label: "Mobile", value: 25, color: "bg-green-500" },
      { label: "Tablet", value: 10, color: "bg-purple-500" }
    ]
  }
}

const kpiMetrics = [
  {
    title: "Total Revenue",
    value: "$125,430",
    change: "+12.5%",
    changeType: "positive",
    trend: "up"
  },
  {
    title: "Active Users",
    value: "2,847",
    change: "+8.2%",
    changeType: "positive",
    trend: "up"
  },
  {
    title: "Conversion Rate",
    value: "3.24%",
    change: "-0.5%",
    changeType: "negative",
    trend: "down"
  },
  {
    title: "Avg. Session",
    value: "4m 32s",
    change: "+15.3%",
    changeType: "positive",
    trend: "up"
  }
]

export default function Reports() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedReport, setSelectedReport] = useState(reportTypes[0])
  const [dateRange, setDateRange] = useState("30d")
  
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
              <h1 className="text-4xl font-light text-white mb-2">Reports</h1>
              <p className="text-white/70 text-lg">Advanced reporting and data visualization</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-2 bg-white/10 border border-white/20 text-white rounded-lg focus:border-white/40 focus:outline-none"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <Button
                variant="ghost"
                className="text-white/70 hover:text-white hover:bg-white/10"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
              <Button className="bg-white text-black hover:bg-white/90">
                <Plus className="mr-2 h-4 w-4" />
                New Report
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
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white/5 border-white/10">
              <TabsTrigger value="overview" className="data-[state=active]:bg-white/10">Overview</TabsTrigger>
              <TabsTrigger value="reports" className="data-[state=active]:bg-white/10">Reports</TabsTrigger>
              <TabsTrigger value="charts" className="data-[state=active]:bg-white/10">Charts</TabsTrigger>
              <TabsTrigger value="export" className="data-[state=active]:bg-white/10">Export</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* KPI Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpiMetrics.map((metric, index) => (
                  <Card
                    key={metric.title}
                    className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white/60 text-sm font-medium">{metric.title}</p>
                          <p className="text-2xl font-light text-white mt-1">{metric.value}</p>
                          <div className="flex items-center mt-2">
                            <Badge 
                              className={`${
                                metric.changeType === 'positive' 
                                  ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                                  : 'bg-red-500/20 text-red-400 border-red-500/30'
                              }`}
                            >
                              {metric.change}
                            </Badge>
                            <span className="text-white/60 text-sm ml-2">vs last period</span>
                          </div>
                        </div>
                        <div className="h-12 w-12 bg-white/10 rounded-lg flex items-center justify-center">
                          <TrendingUp className={`h-6 w-6 ${
                            metric.changeType === 'positive' ? 'text-green-400' : 'text-red-400'
                          }`} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Quick Charts */}
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">Revenue Trend</CardTitle>
                    <CardDescription className="text-white/70">
                      Monthly revenue over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center text-white/60">
                      <div className="text-center">
                        <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>Revenue chart would be rendered here</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">User Distribution</CardTitle>
                    <CardDescription className="text-white/70">
                      Device usage breakdown
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center text-white/60">
                      <div className="text-center">
                        <PieChart className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>Pie chart would be rendered here</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reportTypes.map((report, index) => {
                  const Icon = report.icon
                  return (
                    <Card
                      key={report.id}
                      className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer"
                      style={{ transitionDelay: `${index * 100}ms` }}
                      onClick={() => setSelectedReport(report)}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${report.color}`}>
                              <Icon className="h-5 w-5" />
                            </div>
                            <div>
                              <CardTitle className="text-white text-lg">{report.name}</CardTitle>
                              <CardDescription className="text-white/70 text-sm">
                                {report.description}
                              </CardDescription>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-white/60">Last Generated</span>
                            <span className="text-white">{report.lastGenerated}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-white/60">Frequency</span>
                            <Badge className="bg-white/10 text-white/80 text-xs">
                              {report.frequency}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-white/60">Views</span>
                            <span className="text-white">{report.views}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-white/60">Status</span>
                            <Badge 
                              className={`text-xs ${
                                report.status === 'active' 
                                  ? 'bg-green-500/20 text-green-400 border-green-500/30'
                                  : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                              }`}
                            >
                              {report.status}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            {/* Charts Tab */}
            <TabsContent value="charts" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">Revenue Analysis</CardTitle>
                    <CardDescription className="text-white/70">
                      Monthly revenue breakdown
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 flex items-center justify-center text-white/60">
                      <div className="text-center">
                        <LineChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                        <p>Interactive revenue chart would be here</p>
                        <p className="text-sm mt-2">With zoom, pan, and data point interactions</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">User Engagement</CardTitle>
                    <CardDescription className="text-white/70">
                      Daily active users over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 flex items-center justify-center text-white/60">
                      <div className="text-center">
                        <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-50" />
                        <p>Interactive engagement chart would be here</p>
                        <p className="text-sm mt-2">With filtering and drill-down capabilities</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Export Tab */}
            <TabsContent value="export" className="space-y-6">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Export Reports</CardTitle>
                  <CardDescription className="text-white/70">
                    Download reports in various formats
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <Button className="bg-white text-black hover:bg-white/90 h-20 flex flex-col items-center space-y-2">
                        <Download className="h-6 w-6" />
                        <span>PDF Export</span>
                      </Button>
                      <Button className="bg-white text-black hover:bg-white/90 h-20 flex flex-col items-center space-y-2">
                        <Download className="h-6 w-6" />
                        <span>Excel Export</span>
                      </Button>
                      <Button className="bg-white text-black hover:bg-white/90 h-20 flex flex-col items-center space-y-2">
                        <Download className="h-6 w-6" />
                        <span>CSV Export</span>
                      </Button>
                    </div>
                    
                    <div className="pt-4 border-t border-white/10">
                      <h4 className="text-white font-medium mb-3">Scheduled Exports</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                          <div>
                            <p className="text-white font-medium">Monthly Revenue Report</p>
                            <p className="text-white/60 text-sm">Exports every 1st of the month</p>
                          </div>
                          <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                          <div>
                            <p className="text-white font-medium">Weekly Analytics</p>
                            <p className="text-white/60 text-sm">Exports every Monday</p>
                          </div>
                          <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
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
