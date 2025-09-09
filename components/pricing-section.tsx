"use client"

import { useState } from "react"
import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useScrollAnimation, useScrollAnimationWithDelay } from "@/hooks/use-scroll-animation"

const pricingPlans = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for individuals and small projects",
    price: 29,
    period: "month",
    popular: false,
    features: [
      "Up to 5 projects",
      "10GB storage",
      "Basic support",
      "Standard templates",
      "Mobile responsive",
      "SSL certificate"
    ],
    limitations: [
      "No custom domain",
      "Limited analytics"
    ],
    buttonText: "Get Started",
    buttonVariant: "outline" as const
  },
  {
    id: "professional",
    name: "Professional",
    description: "Best for growing businesses and teams",
    price: 79,
    period: "month",
    popular: true,
    features: [
      "Unlimited projects",
      "100GB storage",
      "Priority support",
      "Premium templates",
      "Custom domain",
      "Advanced analytics",
      "Team collaboration",
      "API access",
      "White-label options"
    ],
    limitations: [],
    buttonText: "Start Free Trial",
    buttonVariant: "default" as const
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large organizations with custom needs",
    price: 199,
    period: "month",
    popular: false,
    features: [
      "Everything in Professional",
      "Unlimited storage",
      "24/7 dedicated support",
      "Custom integrations",
      "Advanced security",
      "SLA guarantee",
      "Custom training",
      "Dedicated account manager"
    ],
    limitations: [],
    buttonText: "Contact Sales",
    buttonVariant: "outline" as const
  }
]

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false)
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({ threshold: 0.2 })
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimationWithDelay(200)
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimationWithDelay(400)

  const getPrice = (price: number) => {
    return isAnnual ? Math.round(price * 10) : price
  }

  const getPeriod = () => {
    return isAnnual ? "year" : "month"
  }

  const getDiscount = () => {
    return isAnnual ? "Save 20%" : ""
  }

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-[#0F0F10] to-[#1a1a1b]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            headerVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
            Choose the perfect plan for your needs. No hidden fees, no surprises.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-lg ${!isAnnual ? 'text-white' : 'text-white/60'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#0F0F10]"
            >
              <span
                className={`${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </button>
            <span className={`text-lg ${isAnnual ? 'text-white' : 'text-white/60'}`}>
              Annual
            </span>
            {isAnnual && (
              <Badge variant="secondary" className="ml-2 bg-green-500/20 text-green-400 border-green-500/30">
                {getDiscount()}
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div 
          ref={cardsRef}
          className={`grid md:grid-cols-3 gap-8 max-w-6xl mx-auto transition-all duration-1000 ${
            cardsVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          {pricingPlans.map((plan, index) => (
            <Card
              key={plan.id}
              className={`relative bg-white/5 border-white/10 backdrop-blur-sm transition-all duration-500 hover:scale-105 ${
                plan.popular 
                  ? 'ring-2 ring-white/20 shadow-2xl shadow-white/10' 
                  : 'hover:ring-1 hover:ring-white/10'
              } ${
                cardsVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-white text-black hover:bg-white/90 px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-light text-white mb-2">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-white/70 text-lg">
                  {plan.description}
                </CardDescription>
                <div className="mt-6">
                  <span className="text-5xl font-light text-white">
                    ${getPrice(plan.price)}
                  </span>
                  <span className="text-white/60 text-lg ml-2">
                    /{getPeriod()}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-white/80">{feature}</span>
                    </li>
                  ))}
                  {plan.limitations.map((limitation, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <X className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                      <span className="text-white/50">{limitation}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="pt-6">
                <Button
                  variant={plan.buttonVariant}
                  className={`w-full ${
                    plan.popular
                      ? 'bg-white text-black hover:bg-white/90'
                      : 'bg-transparent border-white/20 text-white hover:bg-white/10'
                  }`}
                >
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

      </div>
    </section>
  )
}
