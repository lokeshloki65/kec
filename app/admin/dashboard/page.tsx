"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { StatsCard } from "@/components/admin/stats-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, UserCheck, TrendingUp, Clock, MapPin, Eye, Edit, Plus } from "lucide-react"

// Mock data for demonstration
const stats = [
  {
    title: "Total Events",
    value: 24,
    description: "Active events this semester",
    icon: Calendar,
    trend: { value: 12, isPositive: true },
  },
  {
    title: "Total Registrations",
    value: 1247,
    description: "Across all events",
    icon: UserCheck,
    trend: { value: 8, isPositive: true },
  },
  {
    title: "Active Users",
    value: 892,
    description: "Registered students",
    icon: Users,
    trend: { value: 15, isPositive: true },
  },
  {
    title: "Engagement Rate",
    value: "78%",
    description: "Average participation",
    icon: TrendingUp,
    trend: { value: 5, isPositive: true },
  },
]

const recentEvents = [
  {
    id: 1,
    title: "Tech Symposium 2024",
    date: "2024-01-15",
    time: "09:00 AM",
    location: "Main Auditorium",
    registrations: 156,
    status: "upcoming",
    category: "Technical",
  },
  {
    id: 2,
    title: "Cultural Fest",
    date: "2024-01-20",
    time: "02:00 PM",
    location: "Open Ground",
    registrations: 234,
    status: "upcoming",
    category: "Cultural",
  },
  {
    id: 3,
    title: "Workshop on AI/ML",
    date: "2024-01-12",
    time: "10:00 AM",
    location: "CS Lab",
    registrations: 89,
    status: "completed",
    category: "Workshop",
  },
  {
    id: 4,
    title: "Sports Meet",
    date: "2024-01-25",
    time: "08:00 AM",
    location: "Sports Complex",
    registrations: 178,
    status: "upcoming",
    category: "Sports",
  },
]

const recentRegistrations = [
  { id: 1, studentName: "Arjun Kumar", event: "Tech Symposium 2024", time: "2 hours ago" },
  { id: 2, studentName: "Priya Sharma", event: "Cultural Fest", time: "3 hours ago" },
  { id: 3, studentName: "Rahul Patel", event: "Workshop on AI/ML", time: "5 hours ago" },
  { id: 4, studentName: "Sneha Reddy", event: "Sports Meet", time: "1 day ago" },
  { id: 5, studentName: "Vikram Singh", event: "Tech Symposium 2024", time: "1 day ago" },
]

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") {
      router.push("/login")
    }
  }, [isAuthenticated, user, router])

  if (!isAuthenticated || user?.role !== "admin") {
    return null
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user.name}! Here's what's happening today.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Event
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Events */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Events</CardTitle>
            <CardDescription>Latest events and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{event.title}</h4>
                      <Badge
                        variant={event.status === "upcoming" ? "default" : "secondary"}
                        className={
                          event.status === "upcoming" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }
                      >
                        {event.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {event.date} at {event.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {event.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {event.registrations} registered
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Registrations */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Registrations</CardTitle>
            <CardDescription>Latest student registrations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRegistrations.map((registration) => (
                <div key={registration.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{registration.studentName}</p>
                    <p className="text-sm text-gray-600">{registration.event}</p>
                  </div>
                  <span className="text-sm text-gray-500">{registration.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
              <Calendar className="h-6 w-6" />
              Create New Event
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
              <Users className="h-6 w-6" />
              Manage Users
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
              <TrendingUp className="h-6 w-6" />
              View Analytics
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
