"use client"

import { useEffect, useState } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation({ threshold: 0.3 })

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#0F0F10] via-[#1a1a1b] to-[#0F0F10]"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className={`absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl transition-all duration-2000 ${
            heroVisible ? 'animate-pulse scale-100' : 'scale-75 opacity-50'
          }`}
        />
        <div 
          className={`absolute bottom-1/4 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl transition-all duration-2000 delay-500 ${
            heroVisible ? 'animate-pulse scale-100' : 'scale-75 opacity-50'
          }`}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-8">
        <div className="text-center max-w-4xl">
          <div 
            className={`mb-4 opacity-70 transition-all duration-1000 ${
              isVisible ? 'translate-y-0 opacity-70' : 'translate-y-8 opacity-0'
            }`}
          >
            <span className="text-white/60 text-lg font-light tracking-wider uppercase">
              Clean & Modern
            </span>
          </div>

          <h1
            className={`text-6xl md:text-8xl font-light text-white mb-8 leading-tight transition-all duration-1000 delay-200 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            Minimalist Design
          </h1>

          <p
            className={`text-xl md:text-2xl text-white/80 font-light leading-relaxed max-w-2xl mx-auto transition-all duration-1000 delay-400 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            Experience the power of simplicity with our carefully crafted minimalist approach to design and functionality.
          </p>

          {/* CTA Buttons */}
          <div 
            className={`mt-12 flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-600 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <button className="px-8 py-4 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-all duration-300 hover:scale-105">
              Get Started
            </button>
            <button className="px-8 py-4 border border-white/20 text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-105">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 transition-all duration-1000 delay-800 ${
          heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-white/60 text-sm font-light mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
