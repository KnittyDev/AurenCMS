"use client"

import { useState, useEffect } from "react"
import { Menu, X, ChevronDown, User, Settings, LogOut, Bell, Home, Ticket, HelpCircle, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

const navigation = [
  { name: "Home", href: "#home", icon: Home },
  { name: "Pricing", href: "#pricing", icon: DollarSign },
  { name: "Tickets", href: "/tickets", icon: Ticket },
  { name: "FAQ", href: "#faq", icon: HelpCircle }
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavigation = (href: string) => {
    if (href.startsWith('/')) {
      window.location.href = href
    } else {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setIsOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-black/90 backdrop-blur-md border-b border-white/10' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-light text-white hover:text-white/80 transition-colors tracking-wide"
            >
              Auren
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors duration-200 font-light group"
                >
                  <Icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span>{item.name}</span>
                </button>
              )
            })}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/10 border-0"
            >
              Sign In
            </Button>
            <Button
              onClick={() => handleNavigation('#pricing')}
              className="bg-white text-black hover:bg-white/90 transition-all duration-300 hover:scale-105"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-white/80 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg mt-2">
              {/* Mobile Search */}
              <div className="px-3 py-2">
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
                    <Input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    />
                  </div>
                </form>
              </div>

              {/* Mobile Navigation */}
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 block w-full text-left px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors duration-200"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
              
              {/* Mobile Quick Actions */}
              <div className="px-3 py-2">
                <div className="text-white/60 text-sm font-medium mb-2">Quick Actions</div>
                {quickActions.map((action) => {
                  const Icon = action.icon
                  return (
                    <Link
                      key={action.name}
                      href={action.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-3 block w-full text-left px-3 py-1 text-white/60 hover:text-white hover:bg-white/10 rounded-md transition-colors duration-200 text-sm"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{action.name}</span>
                    </Link>
                  )
                })}
              </div>

              {/* Mobile User Section */}
              <div className="pt-4 pb-2 border-t border-white/10">
                <div className="px-3 py-2">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="h-8 w-8 bg-white/20 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">John Doe</p>
                      <p className="text-white/60 text-xs">john@auren.com</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Link
                      href="/profile"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-2 block w-full text-left px-3 py-1 text-white/60 hover:text-white hover:bg-white/10 rounded-md transition-colors duration-200 text-sm"
                    >
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      href="/settings"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-2 block w-full text-left px-3 py-1 text-white/60 hover:text-white hover:bg-white/10 rounded-md transition-colors duration-200 text-sm"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                    <button className="flex items-center space-x-2 block w-full text-left px-3 py-1 text-white/60 hover:text-white hover:bg-white/10 rounded-md transition-colors duration-200 text-sm">
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
