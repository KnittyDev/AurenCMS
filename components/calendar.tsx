"use client"

import { useState } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Calendar as CalendarIcon, 
  Plus, 
  ChevronLeft, 
  ChevronRight,
  Clock,
  Users,
  MapPin,
  Video,
  Phone,
  MoreVertical,
  Filter,
  Search
} from "lucide-react"

const events = [
  {
    id: 1,
    title: "Team Standup",
    time: "9:00 AM - 9:30 AM",
    date: "2024-01-15",
    type: "meeting",
    attendees: ["John Doe", "Sarah Wilson", "Mike Johnson"],
    location: "Conference Room A",
    description: "Daily team standup meeting"
  },
  {
    id: 2,
    title: "Client Presentation",
    time: "2:00 PM - 3:00 PM",
    date: "2024-01-15",
    type: "presentation",
    attendees: ["John Doe", "Emma Davis"],
    location: "Zoom",
    description: "Presenting new features to client"
  },
  {
    id: 3,
    title: "Code Review",
    time: "4:00 PM - 5:00 PM",
    date: "2024-01-16",
    type: "review",
    attendees: ["John Doe", "Alex Chen"],
    location: "Slack",
    description: "Reviewing pull request #123"
  },
  {
    id: 4,
    title: "Project Planning",
    time: "10:00 AM - 12:00 PM",
    date: "2024-01-17",
    type: "planning",
    attendees: ["John Doe", "Sarah Wilson", "Mike Johnson", "Emma Davis"],
    location: "Conference Room B",
    description: "Q1 project planning session"
  }
]

const eventTypes = {
  meeting: { color: "bg-blue-500/20 text-blue-400 border-blue-500/30", icon: Users },
  presentation: { color: "bg-purple-500/20 text-purple-400 border-purple-500/30", icon: Video },
  review: { color: "bg-green-500/20 text-green-400 border-green-500/30", icon: Clock },
  planning: { color: "bg-orange-500/20 text-orange-400 border-orange-500/30", icon: CalendarIcon }
}

const days = [
  { date: "2024-01-15", day: 15, isToday: true, isCurrentMonth: true },
  { date: "2024-01-16", day: 16, isToday: false, isCurrentMonth: true },
  { date: "2024-01-17", day: 17, isToday: false, isCurrentMonth: true },
  { date: "2024-01-18", day: 18, isToday: false, isCurrentMonth: true },
  { date: "2024-01-19", day: 19, isToday: false, isCurrentMonth: true },
  { date: "2024-01-20", day: 20, isToday: false, isCurrentMonth: true },
  { date: "2024-01-21", day: 21, isToday: false, isCurrentMonth: true }
]

const upcomingEvents = [
  {
    id: 1,
    title: "Team Standup",
    time: "9:00 AM",
    type: "meeting"
  },
  {
    id: 2,
    title: "Client Call",
    time: "2:00 PM",
    type: "presentation"
  },
  {
    id: 3,
    title: "Code Review",
    time: "4:00 PM",
    type: "review"
  }
]

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState("2024-01-15")
  const [view, setView] = useState("month")
  const [showCreateEvent, setShowCreateEvent] = useState(false)
  
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.2 })
  const { ref: calendarRef, isVisible: calendarVisible } = useScrollAnimation({ threshold: 0.3 })

  const getEventsForDate = (date: string) => {
    return events.filter(event => event.date === date)
  }

  const selectedDateEvents = getEventsForDate(selectedDate)

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
              <h1 className="text-4xl font-light text-white mb-2">Calendar</h1>
              <p className="text-white/70 text-lg">Manage your schedule and events</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Button
                  variant={view === "month" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setView("month")}
                >
                  Month
                </Button>
                <Button
                  variant={view === "week" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setView("week")}
                >
                  Week
                </Button>
                <Button
                  variant={view === "day" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setView("day")}
                >
                  Day
                </Button>
              </div>
              <Button
                onClick={() => setShowCreateEvent(true)}
                className="bg-white text-black hover:bg-white/90"
              >
                <Plus className="mr-2 h-4 w-4" />
                New Event
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div 
          ref={calendarRef}
          className={`grid lg:grid-cols-4 gap-6 transition-all duration-1000 delay-200 ${
            calendarVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          {/* Calendar */}
          <div className="lg:col-span-3">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <h2 className="text-2xl font-light text-white">January 2024</h2>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
                      <Search className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="p-2 text-center text-white/60 text-sm font-medium">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-1">
                  {days.map((day) => {
                    const dayEvents = getEventsForDate(day.date)
                    return (
                      <button
                        key={day.date}
                        onClick={() => setSelectedDate(day.date)}
                        className={`p-2 h-20 text-left rounded-lg transition-colors ${
                          day.isToday
                            ? 'bg-white/20 text-white'
                            : selectedDate === day.date
                            ? 'bg-white/10 text-white'
                            : 'text-white/70 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <div className="text-sm font-medium mb-1">{day.day}</div>
                        <div className="space-y-1">
                          {dayEvents.slice(0, 2).map((event) => {
                            const typeConfig = eventTypes[event.type as keyof typeof eventTypes]
                            return (
                              <div
                                key={event.id}
                                className={`text-xs px-1 py-0.5 rounded truncate ${typeConfig.color}`}
                              >
                                {event.title}
                              </div>
                            )
                          })}
                          {dayEvents.length > 2 && (
                            <div className="text-xs text-white/60">
                              +{dayEvents.length - 2} more
                            </div>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Events */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-lg">Today's Events</CardTitle>
                <CardDescription className="text-white/70">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingEvents.map((event) => {
                    const typeConfig = eventTypes[event.type as keyof typeof eventTypes]
                    const Icon = typeConfig.icon
                    return (
                      <div
                        key={event.id}
                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                      >
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center ${typeConfig.color}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium text-sm">{event.title}</p>
                          <p className="text-white/60 text-xs">{event.time}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Selected Date Events */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-lg">
                  {new Date(selectedDate).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </CardTitle>
                <CardDescription className="text-white/70">
                  {selectedDateEvents.length} events scheduled
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedDateEvents.length === 0 ? (
                  <div className="text-center py-4 text-white/60">
                    <CalendarIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No events scheduled</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {selectedDateEvents.map((event) => {
                      const typeConfig = eventTypes[event.type as keyof typeof eventTypes]
                      const Icon = typeConfig.icon
                      return (
                        <div
                          key={event.id}
                          className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <div className={`h-6 w-6 rounded flex items-center justify-center ${typeConfig.color}`}>
                                <Icon className="h-3 w-3" />
                              </div>
                              <h4 className="text-white font-medium text-sm">{event.title}</h4>
                            </div>
                            <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="space-y-1 text-xs text-white/70">
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-3 w-3" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="h-3 w-3" />
                              <span>{event.attendees.length} attendees</span>
                            </div>
                          </div>
                          <p className="text-xs text-white/60 mt-2">{event.description}</p>
                        </div>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10"
                >
                  <Video className="mr-2 h-4 w-4" />
                  Schedule Meeting
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Book Call
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Team Event
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Create Event Modal */}
      {showCreateEvent && (
        <CreateEventModal
          onClose={() => setShowCreateEvent(false)}
          onSubmit={(event) => {
            console.log('Creating event:', event)
            setShowCreateEvent(false)
          }}
        />
      )}
    </div>
  )
}

// Create Event Modal Component
function CreateEventModal({ onClose, onSubmit }: { onClose: () => void, onSubmit: (event: any) => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-[#1a1a1b] border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Create New Event</CardTitle>
          <CardDescription className="text-white/70">
            Schedule a new meeting or event
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-white/60">Event creation form would be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  )
}
