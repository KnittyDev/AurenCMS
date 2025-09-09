"use client"

import { useState } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqData = [
  {
    id: 1,
    question: "Can I change plans anytime?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and we'll prorate any billing differences."
  },
  {
    id: 2,
    question: "Is there a free trial?",
    answer: "Professional plan comes with a 14-day free trial. No credit card required. You can cancel anytime during the trial period."
  },
  {
    id: 3,
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual plans."
  },
  {
    id: 4,
    question: "Do you offer refunds?",
    answer: "Yes, we offer a 30-day money-back guarantee for all paid plans. Contact our support team to process your refund."
  },
  {
    id: 5,
    question: "How does the team collaboration work?",
    answer: "Team collaboration allows you to invite team members, assign roles, and work together on projects in real-time with shared workspaces."
  },
  {
    id: 6,
    question: "What kind of support do you provide?",
    answer: "We provide email support for all plans, priority support for Professional plans, and 24/7 dedicated support for Enterprise customers."
  },
  {
    id: 7,
    question: "Can I cancel my subscription anytime?",
    answer: "Yes, you can cancel your subscription at any time from your account settings. Your access will continue until the end of your billing period."
  },
  {
    id: 8,
    question: "Do you offer custom integrations?",
    answer: "Yes, custom integrations are available for Enterprise customers. Our team can work with you to integrate with your existing tools and workflows."
  }
]

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([])
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({ threshold: 0.2 })
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 })

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-[#1a1a1b] to-[#0F0F10]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            headerVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Everything you need to know about our service. Can't find what you're looking for? 
            <a href="#" className="text-white hover:text-white/80 transition-colors ml-1">
              Contact our support team.
            </a>
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <div
                key={item.id}
                className={`bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm transition-all duration-500 ${
                  sectionVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors duration-200"
                >
                  <h3 className="text-lg font-medium text-white pr-4">
                    {item.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {openItems.includes(item.id) ? (
                      <ChevronUp className="h-5 w-5 text-white/60" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-white/60" />
                    )}
                  </div>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openItems.includes(item.id) 
                      ? 'max-h-96 opacity-100' 
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6">
                    <p className="text-white/70 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div 
          className={`mt-16 text-center transition-all duration-1000 delay-500 ${
            sectionVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-light text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-white/70 mb-6">
              Our support team is here to help you get the most out of our service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-all duration-300 hover:scale-105">
                Contact Support
              </button>
              <button className="px-6 py-3 border border-white/20 text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-105">
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
