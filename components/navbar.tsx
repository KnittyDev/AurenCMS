"use client"

import { useState, useEffect } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const navigation = [
  { name: "Home", href: "#home" },
  { name: "Pricing", href: "#pricing" },
  { name: "FAQ", href: "#faq" },
  { name: "Contact", href: "#contact" }
]

const solutions = [
  { name: "Web Design", href: "#" },
  { name: "Mobile Apps", href: "#" },
  { name: "E-commerce", href: "#" },
  { name: "Analytics", href: "#" }
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false)
  const { ref: navbarRef, isVisible: navbarVisible } = useScrollAnimation({ threshold: 0.1 })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  return (
    <nav
      ref={navbarRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        navbarVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      } ${
        isScrolled 
          ? 'bg-black/80 backdrop-blur-md border-b border-white/10' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection('#home')}
              className="text-2xl font-light text-white hover:text-white/80 transition-colors"
            >
              Auren
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-white/80 hover:text-white transition-colors duration-200 font-light"
              >
                {item.name}
              </button>
            ))}
            
            {/* Solutions Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setIsSolutionsOpen(true)}
                onMouseLeave={() => setIsSolutionsOpen(false)}
                className="flex items-center text-white/80 hover:text-white transition-colors duration-200 font-light"
              >
                Solutions
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {isSolutionsOpen && (
                <div
                  onMouseEnter={() => setIsSolutionsOpen(true)}
                  onMouseLeave={() => setIsSolutionsOpen(false)}
                  className="absolute top-full left-0 mt-2 w-48 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg py-2 shadow-xl"
                >
                  {solutions.map((solution) => (
                    <button
                      key={solution.name}
                      className="block w-full text-left px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-200"
                    >
                      {solution.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              className="text-white hover:bg-white/10 border-0"
            >
              Sign In
            </Button>
            <Button
              onClick={() => scrollToSection('#pricing')}
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
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors duration-200"
                >
                  {item.name}
                </button>
              ))}
              
              {/* Mobile Solutions */}
              <div className="px-3 py-2">
                <div className="text-white/60 text-sm font-medium mb-2">Solutions</div>
                {solutions.map((solution) => (
                  <button
                    key={solution.name}
                    className="block w-full text-left px-3 py-1 text-white/60 hover:text-white hover:bg-white/10 rounded-md transition-colors duration-200 text-sm"
                  >
                    {solution.name}
                  </button>
                ))}
              </div>

              {/* Mobile CTA Buttons */}
              <div className="pt-4 pb-2 space-y-2">
                <Button
                  variant="ghost"
                  className="w-full text-white hover:bg-white/10 border-0"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => scrollToSection('#pricing')}
                  className="w-full bg-white text-black hover:bg-white/90 transition-all duration-300"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
