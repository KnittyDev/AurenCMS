"use client"

import { useState } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  Filter,
  Star,
  Download,
  ExternalLink,
  CheckCircle,
  Clock,
  Zap,
  Shield,
  Globe,
  Users,
  BarChart3,
  MessageSquare,
  Calendar,
  FileText,
  Settings,
  CreditCard,
  Mail,
  Phone,
  Video,
  Database,
  Cloud,
  Lock,
  Play,
  Pause,
  MoreVertical,
  ChevronRight,
  TrendingUp,
  Heart,
  Share2
} from "lucide-react"

const categories = [
  {
    id: 1,
    name: "Productivity",
    description: "Tools to boost your productivity",
    icon: Zap,
    color: "bg-blue-500/20 text-blue-400",
    count: 24
  },
  {
    id: 2,
    name: "Communication",
    description: "Chat, video, and collaboration tools",
    icon: MessageSquare,
    color: "bg-green-500/20 text-green-400",
    count: 18
  },
  {
    id: 3,
    name: "Analytics",
    description: "Data analysis and reporting tools",
    icon: BarChart3,
    color: "bg-purple-500/20 text-purple-400",
    count: 15
  },
  {
    id: 4,
    name: "Storage",
    description: "File storage and management",
    icon: Database,
    color: "bg-orange-500/20 text-orange-400",
    count: 12
  },
  {
    id: 5,
    name: "Security",
    description: "Security and authentication tools",
    icon: Shield,
    color: "bg-red-500/20 text-red-400",
    count: 8
  },
  {
    id: 6,
    name: "Marketing",
    description: "Marketing and growth tools",
    icon: TrendingUp,
    color: "bg-pink-500/20 text-pink-400",
    count: 20
  }
]

const integrations = [
  {
    id: 1,
    name: "Slack",
    description: "Team communication and collaboration",
    category: "Communication",
    icon: MessageSquare,
    color: "bg-purple-500/20 text-purple-400",
    rating: 4.8,
    reviews: 1250,
    price: "Free",
    status: "active",
    features: ["Real-time messaging", "File sharing", "Video calls"],
    isInstalled: true
  },
  {
    id: 2,
    name: "Google Analytics",
    description: "Website traffic and user behavior analytics",
    category: "Analytics",
    icon: BarChart3,
    color: "bg-orange-500/20 text-orange-400",
    rating: 4.6,
    reviews: 890,
    price: "Free",
    status: "active",
    features: ["Traffic analysis", "User insights", "Conversion tracking"],
    isInstalled: false
  },
  {
    id: 3,
    name: "Dropbox",
    description: "Cloud storage and file synchronization",
    category: "Storage",
    icon: Database,
    color: "bg-blue-500/20 text-blue-400",
    rating: 4.5,
    reviews: 2100,
    price: "$9.99/month",
    status: "active",
    features: ["Cloud storage", "File sync", "Collaboration"],
    isInstalled: true
  },
  {
    id: 4,
    name: "Zoom",
    description: "Video conferencing and webinars",
    category: "Communication",
    icon: Video,
    color: "bg-blue-500/20 text-blue-400",
    rating: 4.7,
    reviews: 1800,
    price: "Free",
    status: "active",
    features: ["HD video calls", "Screen sharing", "Recording"],
    isInstalled: false
  },
  {
    id: 5,
    name: "Stripe",
    description: "Payment processing and billing",
    category: "Productivity",
    icon: CreditCard,
    color: "bg-green-500/20 text-green-400",
    rating: 4.9,
    reviews: 3200,
    price: "2.9% + 30¢",
    status: "active",
    features: ["Payment processing", "Billing", "Invoicing"],
    isInstalled: true
  },
  {
    id: 6,
    name: "Auth0",
    description: "Authentication and user management",
    category: "Security",
    icon: Lock,
    color: "bg-red-500/20 text-red-400",
    rating: 4.8,
    reviews: 950,
    price: "$23/month",
    status: "active",
    features: ["SSO", "MFA", "User management"],
    isInstalled: false
  },
  {
    id: 7,
    name: "Mailchimp",
    description: "Email marketing and automation",
    category: "Marketing",
    icon: Mail,
    color: "bg-yellow-500/20 text-yellow-400",
    rating: 4.4,
    reviews: 1500,
    price: "Free",
    status: "active",
    features: ["Email campaigns", "Automation", "Analytics"],
    isInstalled: false
  },
  {
    id: 8,
    name: "AWS S3",
    description: "Cloud object storage service",
    category: "Storage",
    icon: Cloud,
    color: "bg-orange-500/20 text-orange-400",
    rating: 4.6,
    reviews: 2800,
    price: "Pay as you go",
    status: "active",
    features: ["Object storage", "CDN", "Backup"],
    isInstalled: true
  }
]

const featuredIntegrations = [
  {
    name: "Slack",
    description: "Connect your team communication",
    users: "2.5M+",
    rating: 4.8,
    icon: MessageSquare,
    color: "bg-purple-500/20 text-purple-400"
  },
  {
    name: "Google Workspace",
    description: "Complete productivity suite",
    users: "5M+",
    rating: 4.7,
    icon: Settings,
    color: "bg-blue-500/20 text-blue-400"
  },
  {
    name: "Salesforce",
    description: "Customer relationship management",
    users: "1.8M+",
    rating: 4.5,
    icon: Users,
    color: "bg-green-500/20 text-green-400"
  }
]

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("popular")
  const [priceFilter, setPriceFilter] = useState("all")
  
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.2 })
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({ threshold: 0.3 })

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || integration.category === selectedCategory
    const matchesPrice = priceFilter === "all" || 
                        (priceFilter === "free" && integration.price === "Free") ||
                        (priceFilter === "paid" && integration.price !== "Free")
    return matchesSearch && matchesCategory && matchesPrice
  })

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
          <div className="text-center">
            <h1 className="text-4xl font-light text-white mb-4">Integration Marketplace</h1>
            <p className="text-white/70 text-lg mb-8">Connect with 100+ tools and services to extend Auren's capabilities</p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                <Input
                  placeholder="Search integrations, tools, and services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40 focus:outline-none text-lg"
                />
              </div>
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
          {/* Featured Integrations */}
          <div className="mb-12">
            <h2 className="text-2xl font-light text-white mb-6">Featured Integrations</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredIntegrations.map((integration, index) => {
                const Icon = integration.icon
                return (
                  <Card
                    key={integration.name}
                    className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${integration.color}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-medium text-lg mb-1">{integration.name}</h3>
                          <p className="text-white/70 text-sm mb-3">{integration.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-white text-sm">{integration.rating}</span>
                              <span className="text-white/60 text-sm">({integration.users})</span>
                            </div>
                            <Button size="sm" className="bg-white text-black hover:bg-white/90">
                              Connect
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

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
                    <span className="text-sm">All Integrations</span>
                    <Badge className="bg-white/10 text-white/80 text-xs">
                      {integrations.length}
                    </Badge>
                  </button>
                  {categories.map((category) => {
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

              {/* Filters */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white text-sm">Filters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-white font-medium text-sm mb-2">Price</h4>
                    <div className="space-y-1">
                      {["all", "free", "paid"].map((price) => (
                        <button
                          key={price}
                          onClick={() => setPriceFilter(price)}
                          className={`w-full text-left p-2 rounded-lg text-sm transition-colors ${
                            priceFilter === price
                              ? 'bg-white/10 text-white'
                              : 'text-white/70 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {price === "all" ? "All Prices" : price === "free" ? "Free" : "Paid"}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-medium text-sm mb-2">Sort By</h4>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full p-2 bg-white/10 border border-white/20 text-white rounded-lg focus:border-white/40 focus:outline-none text-sm"
                    >
                      <option value="popular">Most Popular</option>
                      <option value="rating">Highest Rated</option>
                      <option value="newest">Newest</option>
                      <option value="name">Name A-Z</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-light text-white">
                  {selectedCategory === "all" ? "All Integrations" : selectedCategory}
                </h2>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10">
                    <Filter className="mr-2 h-4 w-4" />
                    More Filters
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {filteredIntegrations.map((integration, index) => {
                  const Icon = integration.icon
                  return (
                    <Card
                      key={integration.id}
                      className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${integration.color}`}>
                              <Icon className="h-5 w-5" />
                            </div>
                            <div>
                              <h3 className="text-white font-medium text-lg">{integration.name}</h3>
                              <p className="text-white/70 text-sm">{integration.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            {integration.isInstalled ? (
                              <Badge className="bg-green-500/20 text-green-400 text-xs">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Installed
                              </Badge>
                            ) : (
                              <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-2">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-white">{integration.rating}</span>
                              <span className="text-white/60">({integration.reviews} reviews)</span>
                            </div>
                            <span className="text-white font-medium">{integration.price}</span>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {integration.features.slice(0, 2).map((feature, idx) => (
                              <Badge key={idx} className="bg-white/10 text-white/80 text-xs">
                                {feature}
                              </Badge>
                            ))}
                            {integration.features.length > 2 && (
                              <Badge className="bg-white/10 text-white/80 text-xs">
                                +{integration.features.length - 2} more
                              </Badge>
                            )}
                          </div>

                          <div className="flex items-center justify-between pt-2">
                            <Badge className={`text-xs ${
                              integration.status === 'active' 
                                ? 'bg-green-500/20 text-green-400' 
                                : 'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {integration.status}
                            </Badge>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-white/60 hover:text-white hover:bg-white/10"
                              >
                                <Heart className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-white/60 hover:text-white hover:bg-white/10"
                              >
                                <Share2 className="h-4 w-4" />
                              </Button>
                              {integration.isInstalled ? (
                                <Button size="sm" className="bg-green-500/20 text-green-400 hover:bg-green-500/30">
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Installed
                                </Button>
                              ) : (
                                <Button size="sm" className="bg-white text-black hover:bg-white/90">
                                  <Download className="mr-2 h-4 w-4" />
                                  Install
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {filteredIntegrations.length === 0 && (
                <div className="text-center py-12">
                  <Search className="h-12 w-12 text-white/40 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">No integrations found</h3>
                  <p className="text-white/60">Try adjusting your search or filter criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
