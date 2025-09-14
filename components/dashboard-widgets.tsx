"use client"

import { useState } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  BarChart3, 
  PieChart, 
  LineChart, 
  TrendingUp, 
  TrendingDown,
  Users,
  DollarSign,
  Clock,
  Target,
  Zap,
  Activity,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Star,
  Heart,
  MessageSquare,
  Calendar,
  FileText,
  Settings,
  MoreVertical,
  RefreshCw,
  Download,
  Share2,
  Eye,
  Edit,
  Trash2
} from "lucide-react"

const widgetCategories = [
  {
    id: 1,
    name: "Analytics",
    description: "Charts and data visualization widgets",
    icon: BarChart3,
    color: "bg-blue-500/20 text-blue-400",
    count: 8
  },
  {
    id: 2,
    name: "Performance",
    description: "KPI and metrics widgets",
    icon: TrendingUp,
    color: "bg-green-500/20 text-green-400",
    count: 6
  },
  {
    id: 3,
    name: "Social",
    description: "Social media and engagement widgets",
    icon: Users,
    color: "bg-purple-500/20 text-purple-400",
    count: 4
  },
  {
    id: 4,
    name: "System",
    description: "System monitoring and status widgets",
    icon: Activity,
    color: "bg-orange-500/20 text-orange-400",
    count: 5
  }
]

const widgets = [
  {
    id: 1,
    name: "Revenue Chart",
    type: "chart",
    category: "Analytics",
    description: "Monthly revenue visualization with trend analysis",
    size: "large",
    icon: LineChart,
    color: "bg-blue-500/20 text-blue-400",
    data: { value: "$125,430", change: "+12.5%", trend: "up" }
  },
  {
    id: 2,
    name: "User Growth",
    type: "metric",
    category: "Performance",
    description: "Active users and growth rate",
    size: "small",
    icon: Users,
    color: "bg-green-500/20 text-green-400",
    data: { value: "2,847", change: "+8.2%", trend: "up" }
  },
  {
    id: 3,
    name: "Conversion Rate",
    type: "metric",
    category: "Performance",
    description: "Website conversion rate tracking",
    size: "small",
    icon: Target,
    color: "bg-purple-500/20 text-purple-400",
    data: { value: "3.24%", change: "-0.5%", trend: "down" }
  },
  {
    id: 4,
    name: "Traffic Sources",
    type: "chart",
    category: "Analytics",
    description: "Website traffic by source breakdown",
    size: "medium",
    icon: PieChart,
    color: "bg-orange-500/20 text-orange-400",
    data: { organic: 45, direct: 30, social: 15, paid: 10 }
  },
  {
    id: 5,
    name: "Server Status",
    type: "status",
    category: "System",
    description: "Real-time server health monitoring",
    size: "small",
    icon: Activity,
    color: "bg-green-500/20 text-green-400",
    data: { status: "healthy", uptime: "99.9%" }
  },
  {
    id: 6,
    name: "Recent Activity",
    type: "feed",
    category: "Social",
    description: "Latest user activities and events",
    size: "medium",
    icon: MessageSquare,
    color: "bg-blue-500/20 text-blue-400",
    data: { activities: 12, new: 3 }
  }
]

const mockActivities = [
  { user: "John Doe", action: "created a new project", time: "2m ago", type: "create" },
  { user: "Sarah Wilson", action: "commented on dashboard", time: "5m ago", type: "comment" },
  { user: "Mike Johnson", action: "uploaded files", time: "10m ago", type: "upload" },
  { user: "Emma Davis", action: "completed task", time: "15m ago", type: "complete" }
]

export default function DashboardWidgets() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedWidget, setSelectedWidget] = useState(widgets[0])
  const [isEditing, setIsEditing] = useState(false)
  
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.2 })
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({ threshold: 0.3 })

  const filteredWidgets = selectedCategory === "all" 
    ? widgets 
    : widgets.filter(widget => widget.category === selectedCategory)

  const renderWidgetPreview = (widget: any) => {
    switch (widget.type) {
      case "chart":
        return (
          <div className="h-32 bg-white/5 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <widget.icon className="h-8 w-8 text-white/40 mx-auto mb-2" />
              <p className="text-white/60 text-sm">Chart Preview</p>
            </div>
          </div>
        )
      
      case "metric":
        return (
          <div className="h-32 bg-white/5 rounded-lg p-4 flex flex-col justify-center">
            <div className="text-center">
              <p className="text-2xl font-semibold text-white">{widget.data.value}</p>
              <div className="flex items-center justify-center space-x-1 mt-1">
                {widget.data.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 text-green-400" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-400" />
                )}
                <span className={`text-sm ${
                  widget.data.trend === "up" ? "text-green-400" : "text-red-400"
                }`}>
                  {widget.data.change}
                </span>
              </div>
            </div>
          </div>
        )
      
      case "status":
        return (
          <div className="h-32 bg-white/5 rounded-lg p-4 flex flex-col justify-center">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-white font-medium">{widget.data.status}</span>
              </div>
              <p className="text-white/60 text-sm">Uptime: {widget.data.uptime}</p>
            </div>
          </div>
        )
      
      case "feed":
        return (
          <div className="h-32 bg-white/5 rounded-lg p-4 overflow-y-auto">
            <div className="space-y-2">
              {mockActivities.slice(0, 3).map((activity, index) => (
                <div key={index} className="flex items-center space-x-2 text-xs">
                  <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                  <span className="text-white/70">{activity.user} {activity.action}</span>
                </div>
              ))}
            </div>
          </div>
        )
      
      default:
        return (
          <div className="h-32 bg-white/5 rounded-lg flex items-center justify-center">
            <widget.icon className="h-8 w-8 text-white/40" />
          </div>
        )
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
              <h1 className="text-4xl font-light text-white mb-2">Dashboard Widgets</h1>
              <p className="text-white/70 text-lg">Advanced widgets and components for your dashboard</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                className="text-white/70 hover:text-white hover:bg-white/10"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit className="mr-2 h-4 w-4" />
                {isEditing ? 'Done Editing' : 'Edit Layout'}
              </Button>
              <Button className="bg-white text-black hover:bg-white/90">
                <Download className="mr-2 h-4 w-4" />
                Export Widgets
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
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Categories */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white text-sm">Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                      selectedCategory === "all"
                        ? 'bg-white/10 text-white'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="text-sm">All Widgets</span>
                    <Badge className="bg-white/10 text-white/80 text-xs">
                      {widgets.length}
                    </Badge>
                  </button>
                  {widgetCategories.map((category) => {
                    const Icon = category.icon
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.name)}
                        className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                          selectedCategory === category.name
                            ? 'bg-white/10 text-white'
                            : 'text-white/70 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <Icon className="h-4 w-4" />
                          <span className="text-sm">{category.name}</span>
                        </div>
                        <Badge className="bg-white/10 text-white/80 text-xs">
                          {category.count}
                        </Badge>
                      </button>
                    )
                  })}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white text-sm">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh All
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Widget Settings
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10"
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Layout
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Widget Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                {filteredWidgets.map((widget, index) => {
                  const Icon = widget.icon
                  return (
                    <Card
                      key={widget.id}
                      className={`bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer ${
                        isEditing ? 'ring-2 ring-white/20' : ''
                      }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                      onClick={() => setSelectedWidget(widget)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${widget.color}`}>
                              <Icon className="h-4 w-4" />
                            </div>
                            <div>
                              <CardTitle className="text-white text-sm">{widget.name}</CardTitle>
                              <CardDescription className="text-white/60 text-xs">
                                {widget.category}
                              </CardDescription>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Badge className={`text-xs ${
                              widget.size === 'large' ? 'bg-blue-500/20 text-blue-400' :
                              widget.size === 'medium' ? 'bg-green-500/20 text-green-400' :
                              'bg-purple-500/20 text-purple-400'
                            }`}>
                              {widget.size}
                            </Badge>
                            <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10">
                              <MoreVertical className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {renderWidgetPreview(widget)}
                        <p className="text-white/60 text-xs mt-3">{widget.description}</p>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {/* Selected Widget Details */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${selectedWidget.color}`}>
                        <selectedWidget.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-white">{selectedWidget.name}</CardTitle>
                        <CardDescription className="text-white/70">
                          {selectedWidget.description}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-white font-medium mb-3">Widget Preview</h4>
                      <div className="h-48 bg-white/5 rounded-lg flex items-center justify-center">
                        {renderWidgetPreview(selectedWidget)}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-3">Configuration</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-white/70 text-sm">Size</span>
                          <Badge className="bg-white/10 text-white/80 text-xs">
                            {selectedWidget.size}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-white/70 text-sm">Category</span>
                          <span className="text-white text-sm">{selectedWidget.category}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-white/70 text-sm">Type</span>
                          <span className="text-white text-sm capitalize">{selectedWidget.type}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-white/70 text-sm">Status</span>
                          <Badge className="bg-green-500/20 text-green-400 text-xs">
                            Active
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
