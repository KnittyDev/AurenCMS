"use client"

import { useState, useEffect, useRef } from "react"
import { Search, X, ArrowRight, FileText, User, MessageSquare, FolderOpen, BarChart3 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const searchData = [
  {
    id: 1,
    title: "E-commerce Dashboard",
    description: "Modern dashboard for e-commerce analytics",
    type: "project",
    url: "/projects/1",
    icon: FolderOpen
  },
  {
    id: 2,
    title: "TKT-001 - Login Issues",
    description: "Authentication system problems",
    type: "ticket",
    url: "/tickets/1",
    icon: MessageSquare
  },
  {
    id: 3,
    title: "John Doe",
    description: "Senior Frontend Developer",
    type: "user",
    url: "/profile/john-doe",
    icon: User
  },
  {
    id: 4,
    title: "Analytics Report",
    description: "Q4 2023 performance metrics",
    type: "document",
    url: "/reports/analytics-q4",
    icon: FileText
  },
  {
    id: 5,
    title: "Mobile App Redesign",
    description: "Complete mobile interface redesign",
    type: "project",
    url: "/projects/2",
    icon: FolderOpen
  },
  {
    id: 6,
    title: "TKT-002 - Feature Request",
    description: "Dark mode toggle implementation",
    type: "ticket",
    url: "/tickets/2",
    icon: MessageSquare
  },
  {
    id: 7,
    title: "Performance Dashboard",
    description: "Real-time performance monitoring",
    type: "analytics",
    url: "/analytics/performance",
    icon: BarChart3
  }
]

const searchCategories = [
  { type: "all", label: "All", count: searchData.length },
  { type: "project", label: "Projects", count: searchData.filter(item => item.type === "project").length },
  { type: "ticket", label: "Tickets", count: searchData.filter(item => item.type === "ticket").length },
  { type: "user", label: "Users", count: searchData.filter(item => item.type === "user").length },
  { type: "document", label: "Documents", count: searchData.filter(item => item.type === "document").length }
]

export default function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const filteredData = searchData.filter(item => {
    const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase()) ||
                        item.description.toLowerCase().includes(query.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.type === selectedCategory
    return matchesQuery && matchesCategory
  })

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && !isOpen) {
        e.preventDefault()
        setIsOpen(true)
        setTimeout(() => inputRef.current?.focus(), 100)
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false)
        setQuery("")
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex(prev => Math.min(prev + 1, filteredData.length - 1))
      }
      if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex(prev => Math.max(prev - 1, 0))
      }
      if (e.key === "Enter") {
        e.preventDefault()
        if (filteredData[selectedIndex]) {
          handleSelect(filteredData[selectedIndex])
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, selectedIndex, filteredData])

  const handleSelect = (item: any) => {
    // Navigate to the item
    window.location.href = item.url
    setIsOpen(false)
    setQuery("")
  }

  const handleClose = () => {
    setIsOpen(false)
    setQuery("")
    setSelectedIndex(0)
  }

  if (!isOpen) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="text-white/70 hover:text-white hover:bg-white/10 relative"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline ml-2">Search...</span>
        <kbd className="hidden sm:inline ml-2 px-1.5 py-0.5 text-xs bg-white/10 rounded">/</kbd>
      </Button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
      <div className="w-full max-w-2xl mx-4">
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-0">
            {/* Search Input */}
            <div className="p-4 border-b border-white/10">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
                <Input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                    setSelectedIndex(0)
                  }}
                  placeholder="Search projects, tickets, users..."
                  className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 text-white/60 hover:text-white hover:bg-white/10"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Categories */}
            <div className="p-4 border-b border-white/10">
              <div className="flex space-x-2">
                {searchCategories.map((category) => (
                  <Button
                    key={category.type}
                    variant={selectedCategory === category.type ? "default" : "ghost"}
                    size="sm"
                    onClick={() => {
                      setSelectedCategory(category.type)
                      setSelectedIndex(0)
                    }}
                    className="text-xs"
                  >
                    {category.label} ({category.count})
                  </Button>
                ))}
              </div>
            </div>

            {/* Results */}
            <div className="max-h-96 overflow-y-auto">
              {filteredData.length === 0 ? (
                <div className="p-8 text-center text-white/60">
                  <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No results found</p>
                  <p className="text-sm">Try searching for projects, tickets, or users</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredData.map((item, index) => {
                    const Icon = item.icon
                    return (
                      <div
                        key={item.id}
                        className={`p-3 hover:bg-white/5 transition-colors cursor-pointer ${
                          index === selectedIndex ? 'bg-white/5' : ''
                        }`}
                        onClick={() => handleSelect(item)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="h-8 w-8 bg-white/10 rounded flex items-center justify-center flex-shrink-0">
                            <Icon className="h-4 w-4 text-white/60" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-medium text-sm">{item.title}</p>
                            <p className="text-white/60 text-xs">{item.description}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary" className="bg-white/10 text-white/60 text-xs">
                              {item.type}
                            </Badge>
                            <ArrowRight className="h-4 w-4 text-white/40" />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-white/10">
              <div className="flex items-center justify-between text-xs text-white/60">
                <div className="flex items-center space-x-4">
                  <span>↑↓ Navigate</span>
                  <span>↵ Select</span>
                  <span>Esc Close</span>
                </div>
                <span>{filteredData.length} results</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
