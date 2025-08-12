"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { UserHeader } from "@/components/user/user-header"
import { DashboardStats } from "@/components/user/dashboard-stats"
import { EventCard } from "@/components/user/event-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Calendar, Filter, TrendingUp } from "lucide-react"

// Mock data
const userStats = {
  eventsRegistered: 8,
  eventsAttended: 5,
  upcomingEvents: 3,
  achievements: 12,
}

const upcomingEvents = [
  {
    id: 1,
    title: "Tech Symposium 2024",
    description: "Annual technical symposium featuring latest trends in technology, AI, and innovation.",
    date: "January 15, 2024",
    time: "09:00 AM",
    location: "Main Auditorium",
    category: "Technical",
    registrations: 156,
    maxRegistrations: 200,
    organizer: "Computer Science Department",
    isFeatured: true,
    image: "/tech-symposium.png",
  },
  {
    id: 2,
    title: "Cultural Fest - Kaleidoscope",
    description: "Celebrate diversity through music, dance, drama, and art competitions.",
    date: "January 20, 2024",
    time: "02:00 PM",
    location: "Open Ground",
    category: "Cultural",
    registrations: 234,
    maxRegistrations: 300,
    organizer: "Cultural Committee",
    image: "/vibrant-cultural-fest.png",
  },
  {
    id: 3,
    title: "Workshop on Machine Learning",
    description: "Hands-on workshop covering fundamentals of ML and practical applications.",
    date: "January 18, 2024",
    time: "10:00 AM",
    location: "CS Lab 1",
    category: "Workshop",
    registrations: 45,
    maxRegistrations: 50,
    organizer: "AI/ML Club",
  },
  {
    id: 4,
    title: "Inter-College Sports Meet",
    description: "Annual sports competition featuring various indoor and outdoor games.",
    date: "January 25, 2024",
    time: "08:00 AM",
    location: "Sports Complex",
    category: "Sports",
    registrations: 178,
    maxRegistrations: 250,
    organizer: "Sports Committee",
  },
]

const registeredEvents = [
  {
    id: 5,
    title: "Hackathon 2024",
    description: "24-hour coding challenge to solve real-world problems.",
    date: "January 22, 2024",
    time: "09:00 AM",
    location: "IT Block",
    category: "Technical",
    registrations: 89,
    maxRegistrations: 100,
    organizer: "Coding Club",
    isRegistered: true,
  },
  {
    id: 6,
    title: "Photography Contest",
    description: "Capture the beauty of campus life through your lens.",
    date: "January 28, 2024",
    time: "All Day",
    location: "Campus Wide",
    category: "Competition",
    registrations: 67,
    maxRegistrations: 100,
    organizer: "Photography Club",
    isRegistered: true,
  },
]

export default function UserDashboard() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("upcoming")

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "user") {
      router.push("/login")
    }
  }, [isAuthenticated, user, router])

  const handleRegister = (eventId: number) => {
    toast({
      title: "Registration Successful!",
      description: "You have been registered for the event.",
    })
  }

  const handleViewDetails = (eventId: number) => {
    // Navigate to event details page
    console.log("View details for event:", eventId)
  }

  if (!isAuthenticated || user?.role !== "user") {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <UserHeader />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.name}!</h1>
          <p className="text-gray-600">Discover and participate in exciting events happening at KEC.</p>
        </div>

        {/* Stats */}
        <div className="mb-8">
          <DashboardStats stats={userStats} />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Events Section */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex items-center justify-between mb-6">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
                  <TabsTrigger value="registered">My Events</TabsTrigger>
                </TabsList>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>

              <TabsContent value="upcoming" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {upcomingEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onRegister={handleRegister}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="registered" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {registeredEvents.map((event) => (
                    <EventCard key={event.id} event={event} onViewDetails={handleViewDetails} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  View Calendar
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  My Progress
                </Button>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Achievements</CardTitle>
                <CardDescription>Your latest accomplishments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Badge className="w-4 h-4 bg-yellow-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Event Enthusiast</p>
                    <p className="text-xs text-gray-500">Registered for 5+ events</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Badge className="w-4 h-4 bg-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Tech Explorer</p>
                    <p className="text-xs text-gray-500">Attended tech workshop</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Badge className="w-4 h-4 bg-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Active Participant</p>
                    <p className="text-xs text-gray-500">100% attendance rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Deadlines */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Deadlines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Hackathon Registration</p>
                    <p className="text-xs text-gray-500">Closes in 2 days</p>
                  </div>
                  <Badge variant="outline" className="text-orange-600 border-orange-200">
                    Soon
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Cultural Fest Auditions</p>
                    <p className="text-xs text-gray-500">Closes in 5 days</p>
                  </div>
                  <Badge variant="outline" className="text-blue-600 border-blue-200">
                    Open
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
