"use client"

import { useState } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Code, 
  Copy, 
  Play, 
  Book, 
  Key, 
  Globe,
  Shield,
  Zap,
  Database,
  Users,
  FileText,
  Settings,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Info
} from "lucide-react"

const apiEndpoints = [
  {
    id: 1,
    method: "GET",
    path: "/api/v1/users",
    description: "Retrieve all users",
    category: "Users",
    auth: true,
    rateLimit: "100/hour"
  },
  {
    id: 2,
    method: "POST",
    path: "/api/v1/users",
    description: "Create a new user",
    category: "Users",
    auth: true,
    rateLimit: "50/hour"
  },
  {
    id: 3,
    method: "GET",
    path: "/api/v1/projects",
    description: "List all projects",
    category: "Projects",
    auth: true,
    rateLimit: "200/hour"
  },
  {
    id: 4,
    method: "PUT",
    path: "/api/v1/projects/{id}",
    description: "Update a project",
    category: "Projects",
    auth: true,
    rateLimit: "100/hour"
  },
  {
    id: 5,
    method: "GET",
    path: "/api/v1/tickets",
    description: "Get support tickets",
    category: "Support",
    auth: true,
    rateLimit: "150/hour"
  },
  {
    id: 6,
    method: "POST",
    path: "/api/v1/tickets",
    description: "Create a new ticket",
    category: "Support",
    auth: false,
    rateLimit: "20/hour"
  }
]

const codeExamples = {
  javascript: `// Get all users
const response = await fetch('https://api.auren.com/v1/users', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const users = await response.json();
console.log(users);`,
  
  python: `import requests

# Get all users
headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}

response = requests.get('https://api.auren.com/v1/users', headers=headers)
users = response.json()
print(users)`,
  
  curl: `curl -X GET "https://api.auren.com/v1/users" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`
}

const responseExamples = {
  success: {
    status: 200,
    data: {
      users: [
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          created_at: "2024-01-15T10:30:00Z"
        }
      ],
      pagination: {
        page: 1,
        limit: 20,
        total: 1
      }
    }
  },
  error: {
    status: 401,
    error: {
      code: "UNAUTHORIZED",
      message: "Invalid API key"
    }
  }
}

export default function ApiDocs() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedEndpoint, setSelectedEndpoint] = useState(apiEndpoints[0])
  const [selectedLanguage, setSelectedLanguage] = useState("javascript")
  
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.2 })
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({ threshold: 0.3 })

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET": return "bg-green-500/20 text-green-400 border-green-500/30"
      case "POST": return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "PUT": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "DELETE": return "bg-red-500/20 text-red-400 border-red-500/30"
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30"
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
              <h1 className="text-4xl font-light text-white mb-2">API Documentation</h1>
              <p className="text-white/70 text-lg">Complete API reference and integration guide</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                className="text-white/70 hover:text-white hover:bg-white/10"
              >
                <Key className="mr-2 h-4 w-4" />
                Get API Key
              </Button>
              <Button className="bg-white text-black hover:bg-white/90">
                <Play className="mr-2 h-4 w-4" />
                Try API
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div 
          ref={contentRef}
          className={`grid lg:grid-cols-4 gap-6 transition-all duration-1000 delay-200 ${
            contentVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Start */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-sm">Quick Start</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10"
                >
                  <Zap className="mr-2 h-4 w-4" />
                  Authentication
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10"
                >
                  <Globe className="mr-2 h-4 w-4" />
                  Base URL
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10"
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Rate Limits
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10"
                >
                  <Code className="mr-2 h-4 w-4" />
                  SDKs
                </Button>
              </CardContent>
            </Card>

            {/* API Endpoints */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-sm">Endpoints</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                {apiEndpoints.map((endpoint) => (
                  <button
                    key={endpoint.id}
                    onClick={() => setSelectedEndpoint(endpoint)}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                      selectedEndpoint.id === endpoint.id
                        ? 'bg-white/10 text-white'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Badge className={`text-xs ${getMethodColor(endpoint.method)}`}>
                        {endpoint.method}
                      </Badge>
                      <span className="text-sm">{endpoint.path}</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-white/5 border-white/10">
                <TabsTrigger value="overview" className="data-[state=active]:bg-white/10">Overview</TabsTrigger>
                <TabsTrigger value="endpoints" className="data-[state=active]:bg-white/10">Endpoints</TabsTrigger>
                <TabsTrigger value="examples" className="data-[state=active]:bg-white/10">Examples</TabsTrigger>
                <TabsTrigger value="errors" className="data-[state=active]:bg-white/10">Errors</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">Getting Started</CardTitle>
                    <CardDescription className="text-white/70">
                      Learn how to integrate with our API
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-white font-medium mb-3">Base URL</h3>
                      <div className="bg-black/50 rounded-lg p-4 font-mono text-green-400">
                        https://api.auren.com/v1
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-white font-medium mb-3">Authentication</h3>
                      <p className="text-white/70 mb-3">
                        All API requests require authentication using an API key. Include your API key in the Authorization header:
                      </p>
                      <div className="bg-black/50 rounded-lg p-4 font-mono text-sm">
                        <div className="text-gray-400">Authorization: Bearer YOUR_API_KEY</div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-white font-medium mb-3">Rate Limits</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-white/5 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <CheckCircle className="h-4 w-4 text-green-400" />
                            <span className="text-white font-medium">Free Tier</span>
                          </div>
                          <p className="text-white/70 text-sm">1,000 requests per month</p>
                        </div>
                        <div className="p-4 bg-white/5 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <Zap className="h-4 w-4 text-blue-400" />
                            <span className="text-white font-medium">Pro Tier</span>
                          </div>
                          <p className="text-white/70 text-sm">10,000 requests per month</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Endpoints Tab */}
              <TabsContent value="endpoints" className="space-y-6">
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-white flex items-center space-x-3">
                          <Badge className={getMethodColor(selectedEndpoint.method)}>
                            {selectedEndpoint.method}
                          </Badge>
                          <span className="font-mono">{selectedEndpoint.path}</span>
                        </CardTitle>
                        <CardDescription className="text-white/70 mt-2">
                          {selectedEndpoint.description}
                        </CardDescription>
                      </div>
                      <Button className="bg-white text-black hover:bg-white/90">
                        <Play className="mr-2 h-4 w-4" />
                        Try it
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-white font-medium mb-3">Parameters</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                          <div>
                            <span className="text-white font-mono">id</span>
                            <span className="text-white/60 text-sm ml-2">(required)</span>
                          </div>
                          <span className="text-white/60 text-sm">string</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                          <div>
                            <span className="text-white font-mono">limit</span>
                            <span className="text-white/60 text-sm ml-2">(optional)</span>
                          </div>
                          <span className="text-white/60 text-sm">number</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-white font-medium mb-3">Response</h3>
                      <div className="bg-black/50 rounded-lg p-4 font-mono text-sm">
                        <div className="text-gray-400">Status: 200 OK</div>
                        <div className="text-white mt-2">
                          {JSON.stringify(responseExamples.success, null, 2)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Examples Tab */}
              <TabsContent value="examples" className="space-y-6">
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">Code Examples</CardTitle>
                    <CardDescription className="text-white/70">
                      See how to use our API in different programming languages
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex space-x-2">
                        {Object.keys(codeExamples).map((lang) => (
                          <Button
                            key={lang}
                            variant={selectedLanguage === lang ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setSelectedLanguage(lang)}
                            className="capitalize"
                          >
                            {lang}
                          </Button>
                        ))}
                      </div>
                      
                      <div className="bg-black/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                        <pre className="text-green-400">
                          {codeExamples[selectedLanguage as keyof typeof codeExamples]}
                        </pre>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10">
                          <Copy className="mr-2 h-4 w-4" />
                          Copy Code
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Errors Tab */}
              <TabsContent value="errors" className="space-y-6">
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">Error Codes</CardTitle>
                    <CardDescription className="text-white/70">
                      Common error responses and how to handle them
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border-l-4 border-red-500 bg-red-500/10 rounded-r-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <AlertCircle className="h-4 w-4 text-red-400" />
                          <span className="text-white font-medium">401 Unauthorized</span>
                        </div>
                        <p className="text-white/70 text-sm">
                          Invalid or missing API key. Check your authorization header.
                        </p>
                      </div>
                      
                      <div className="p-4 border-l-4 border-yellow-500 bg-yellow-500/10 rounded-r-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <AlertCircle className="h-4 w-4 text-yellow-400" />
                          <span className="text-white font-medium">429 Too Many Requests</span>
                        </div>
                        <p className="text-white/70 text-sm">
                          Rate limit exceeded. Wait before making more requests.
                        </p>
                      </div>
                      
                      <div className="p-4 border-l-4 border-blue-500 bg-blue-500/10 rounded-r-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Info className="h-4 w-4 text-blue-400" />
                          <span className="text-white font-medium">400 Bad Request</span>
                        </div>
                        <p className="text-white/70 text-sm">
                          Invalid request parameters. Check your request body and parameters.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
