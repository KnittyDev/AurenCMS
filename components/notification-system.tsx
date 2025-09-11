"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Bell, 
  X, 
  Check, 
  AlertCircle, 
  Info, 
  CheckCircle, 
  Star,
  MessageSquare,
  User,
  Calendar,
  Settings
} from "lucide-react"

const notificationTypes = {
  info: { icon: Info, color: "text-blue-400", bgColor: "bg-blue-500/20" },
  success: { icon: CheckCircle, color: "text-green-400", bgColor: "bg-green-500/20" },
  warning: { icon: AlertCircle, color: "text-yellow-400", bgColor: "bg-yellow-500/20" },
  error: { icon: AlertCircle, color: "text-red-400", bgColor: "bg-red-500/20" }
}

const mockNotifications = [
  {
    id: 1,
    type: "success",
    title: "Project Completed",
    message: "E-commerce Dashboard project has been successfully completed",
    time: "2 minutes ago",
    read: false,
    category: "project"
  },
  {
    id: 2,
    type: "info",
    title: "New Team Member",
    message: "Sarah Wilson has joined the Frontend Development team",
    time: "1 hour ago",
    read: false,
    category: "team"
  },
  {
    id: 3,
    type: "warning",
    title: "Deadline Approaching",
    message: "Mobile App Redesign project deadline is in 3 days",
    time: "3 hours ago",
    read: true,
    category: "project"
  },
  {
    id: 4,
    type: "info",
    title: "New Ticket Assigned",
    message: "TKT-005 - API Integration issues has been assigned to you",
    time: "5 hours ago",
    read: true,
    category: "ticket"
  },
  {
    id: 5,
    type: "success",
    title: "Payment Received",
    message: "Payment of $2,500 has been received for Project Alpha",
    time: "1 day ago",
    read: true,
    category: "payment"
  },
  {
    id: 6,
    type: "error",
    title: "System Maintenance",
    message: "Scheduled maintenance will occur tonight from 2-4 AM",
    time: "2 days ago",
    read: true,
    category: "system"
  }
]

export default function NotificationSystem() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [isOpen, setIsOpen] = useState(false)
  const [filter, setFilter] = useState("all")

  const unreadCount = notifications.filter(n => !n.read).length

  const filteredNotifications = notifications.filter(notification => {
    if (filter === "all") return true
    if (filter === "unread") return !notification.read
    return notification.category === filter
  })

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    )
  }

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  return (
    <div className="relative">
      {/* Notification Bell */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="text-white/70 hover:text-white hover:bg-white/10 relative"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
            {unreadCount}
          </span>
        )}
      </Button>

      {/* Notification Panel */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-96 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-xl z-50">
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-medium">Notifications</h3>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-white/60 hover:text-white hover:bg-white/10 text-xs"
                  >
                    Mark all read
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAll}
                  className="text-white/60 hover:text-white hover:bg-white/10 text-xs"
                >
                  Clear all
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white/60 hover:text-white hover:bg-white/10"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Filter */}
            <div className="flex space-x-2">
              <Button
                variant={filter === "all" ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilter("all")}
                className="text-xs"
              >
                All
              </Button>
              <Button
                variant={filter === "unread" ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilter("unread")}
                className="text-xs"
              >
                Unread
              </Button>
              <Button
                variant={filter === "project" ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilter("project")}
                className="text-xs"
              >
                Projects
              </Button>
              <Button
                variant={filter === "ticket" ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilter("ticket")}
                className="text-xs"
              >
                Tickets
              </Button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {filteredNotifications.length === 0 ? (
              <div className="p-4 text-center text-white/60">
                <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No notifications</p>
              </div>
            ) : (
              <div className="space-y-1">
                {filteredNotifications.map((notification) => {
                  const typeConfig = notificationTypes[notification.type as keyof typeof notificationTypes]
                  const Icon = typeConfig.icon
                  
                  return (
                    <div
                      key={notification.id}
                      className={`p-3 hover:bg-white/5 transition-colors ${
                        !notification.read ? 'bg-white/5 border-l-2 border-white/20' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${typeConfig.bgColor}`}>
                          <Icon className={`h-4 w-4 ${typeConfig.color}`} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="text-white font-medium text-sm">{notification.title}</p>
                              <p className="text-white/70 text-xs mt-1">{notification.message}</p>
                              <p className="text-white/40 text-xs mt-1">{notification.time}</p>
                            </div>
                            
                            <div className="flex items-center space-x-1 ml-2">
                              {!notification.read && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => markAsRead(notification.id)}
                                  className="h-6 w-6 p-0 text-white/60 hover:text-white hover:bg-white/10"
                                >
                                  <Check className="h-3 w-3" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteNotification(notification.id)}
                                className="h-6 w-6 p-0 text-white/60 hover:text-white hover:bg-white/10"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
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
            <Button
              variant="ghost"
              className="w-full text-white/70 hover:text-white hover:bg-white/10"
            >
              View all notifications
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

// Hook for using notifications
export function useNotifications() {
  const [notifications, setNotifications] = useState(mockNotifications)

  const addNotification = (notification: Omit<typeof mockNotifications[0], 'id'>) => {
    const newNotification = {
      ...notification,
      id: Date.now(),
      time: 'Just now'
    }
    setNotifications(prev => [newNotification, ...prev])
  }

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  return {
    notifications,
    addNotification,
    removeNotification,
    markAsRead
  }
}
