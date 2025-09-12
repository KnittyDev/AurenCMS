"use client"

import { useState } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  Book, 
  MessageSquare, 
  Phone, 
  Mail, 
  Video,
  FileText,
  Play,
  Download,
  Star,
  ThumbsUp,
  ThumbsDown,
  ChevronRight,
  HelpCircle,
  Settings,
  Users,
  Zap,
  Shield,
  Globe
} from "lucide-react"

const categories = [
  {
    id: 1,
    name: "Getting Started",
    description: "Learn the basics of using Auren",
    icon: Play,
    color: "bg-blue-500/20 text-blue-400",
    articles: 12
  },
  {
    id: 2,
    name: "Account & Billing",
    description: "Manage your account and subscription",
    icon: Settings,
    color: "bg-green-500/20 text-green-400",
    articles: 8
  },
  {
    id: 3,
    name: "Projects & Teams",
    description: "Working with projects and team collaboration",
    icon: Users,
    color: "bg-purple-500/20 text-purple-400",
    articles: 15
  },
  {
    id: 4,
    name: "API & Integrations",
    description: "Connect with external services",
    icon: Zap,
    color: "bg-orange-500/20 text-orange-400",
    articles: 10
  },
  {
    id: 5,
    name: "Security & Privacy",
    description: "Keep your data safe and secure",
    icon: Shield,
    color: "bg-red-500/20 text-red-400",
    articles: 6
  },
  {
    id: 6,
    name: "Troubleshooting",
    description: "Common issues and solutions",
    icon: HelpCircle,
    color: "bg-yellow-500/20 text-yellow-400",
    articles: 20
  }
]

const popularArticles = [
  {
    id: 1,
    title: "How to create your first project",
    description: "Step-by-step guide to setting up your first project in Auren",
    category: "Getting Started",
    views: 1250,
    helpful: 98,
    lastUpdated: "2 days ago"
  },
  {
    id: 2,
    title: "Setting up team permissions",
    description: "Learn how to manage team member access and permissions",
    category: "Projects & Teams",
    views: 890,
    helpful: 95,
    lastUpdated: "1 week ago"
  },
  {
    id: 3,
    title: "API authentication guide",
    description: "Complete guide to authenticating with our API",
    category: "API & Integrations",
    views: 756,
    helpful: 92,
    lastUpdated: "3 days ago"
  },
  {
    id: 4,
    title: "Troubleshooting login issues",
    description: "Common login problems and how to fix them",
    category: "Troubleshooting",
    views: 634,
    helpful: 88,
    lastUpdated: "5 days ago"
  }
]

const contactMethods = [
  {
    name: "Live Chat",
    description: "Get instant help from our support team",
    icon: MessageSquare,
    availability: "24/7",
    responseTime: "2 minutes",
    color: "bg-blue-500/20 text-blue-400"
  },
  {
    name: "Email Support",
    description: "Send us a detailed message",
    icon: Mail,
    availability: "24/7",
    responseTime: "4 hours",
    color: "bg-green-500/20 text-green-400"
  },
  {
    name: "Phone Support",
    description: "Speak directly with our team",
    icon: Phone,
    availability: "Mon-Fri 9AM-6PM",
    responseTime: "Immediate",
    color: "bg-purple-500/20 text-purple-400"
  },
  {
    name: "Video Call",
    description: "Screen sharing and video support",
    icon: Video,
    availability: "By appointment",
    responseTime: "Scheduled",
    color: "bg-orange-500/20 text-orange-400"
  }
]

const faqItems = [
  {
    question: "How do I reset my password?",
    answer: "You can reset your password by clicking the 'Forgot Password' link on the login page. We'll send you an email with instructions to create a new password."
  },
  {
    question: "Can I invite team members to my project?",
    answer: "Yes! You can invite team members by going to your project settings and clicking 'Invite Members'. Enter their email addresses and set their permission levels."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual subscriptions."
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes! We offer a 14-day free trial with full access to all features. No credit card required to start your trial."
  }
]

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.2 })
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({ threshold: 0.3 })

  const filteredArticles = popularArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory
    return matchesSearch && matchesCategory
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
            <h1 className="text-4xl font-light text-white mb-4">Help Center</h1>
            <p className="text-white/70 text-lg mb-8">Find answers, get support, and learn how to use Auren</p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                <Input
                  placeholder="Search for help articles, guides, and tutorials..."
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
          {/* Categories */}
          <div className="mb-12">
            <h2 className="text-2xl font-light text-white mb-6">Browse by Category</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, index) => {
                const Icon = category.icon
                return (
                  <Card
                    key={category.id}
                    className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${category.color}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-medium text-lg mb-2">{category.name}</h3>
                          <p className="text-white/70 text-sm mb-3">{category.description}</p>
                          <div className="flex items-center justify-between">
                            <Badge className="bg-white/10 text-white/80 text-xs">
                              {category.articles} articles
                            </Badge>
                            <ChevronRight className="h-4 w-4 text-white/60" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Popular Articles */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-light text-white">Popular Articles</h2>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 bg-white/10 border border-white/20 text-white rounded-lg focus:border-white/40 focus:outline-none"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.name}>{category.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-4">
                  {filteredArticles.map((article, index) => (
                    <Card
                      key={article.id}
                      className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-white font-medium text-lg">{article.title}</h3>
                              <Badge className="bg-white/10 text-white/80 text-xs">
                                {article.category}
                              </Badge>
                            </div>
                            <p className="text-white/70 text-sm mb-3">{article.description}</p>
                            <div className="flex items-center space-x-4 text-xs text-white/60">
                              <span>{article.views} views</span>
                              <span>{article.helpful}% helpful</span>
                              <span>Updated {article.lastUpdated}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10">
                              <ThumbsUp className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10">
                              <ThumbsDown className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div>
                <h2 className="text-2xl font-light text-white mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {faqItems.map((item, index) => (
                    <Card
                      key={index}
                      className="bg-white/5 border-white/10 backdrop-blur-sm"
                    >
                      <CardContent className="p-0">
                        <button
                          onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                          className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                        >
                          <h3 className="text-white font-medium">{item.question}</h3>
                          <ChevronRight 
                            className={`h-4 w-4 text-white/60 transition-transform ${
                              expandedFaq === index ? 'rotate-90' : ''
                            }`} 
                          />
                        </button>
                        {expandedFaq === index && (
                          <div className="px-6 pb-6">
                            <p className="text-white/70">{item.answer}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Support */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Contact Support</CardTitle>
                  <CardDescription className="text-white/70">
                    Can't find what you're looking for? We're here to help!
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {contactMethods.map((method, index) => {
                    const Icon = method.icon
                    return (
                      <div
                        key={method.name}
                        className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                        style={{ transitionDelay: `${index * 100}ms` }}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`h-8 w-8 rounded flex items-center justify-center ${method.color}`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-medium text-sm">{method.name}</h4>
                            <p className="text-white/70 text-xs mb-1">{method.description}</p>
                            <div className="flex items-center space-x-4 text-xs text-white/60">
                              <span>{method.availability}</span>
                              <span>{method.responseTime}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Quick Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10"
                  >
                    <Book className="mr-2 h-4 w-4" />
                    User Guide
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10"
                  >
                    <Video className="mr-2 h-4 w-4" />
                    Video Tutorials
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Resources
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10"
                  >
                    <Globe className="mr-2 h-4 w-4" />
                    Community Forum
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
