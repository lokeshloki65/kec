"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Home,
  Calendar,
  Search,
  Bell,
  User,
  Heart,
  MapPin,
  Clock,
  Users,
  Star,
  Filter,
  Trophy,
  Zap,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
} from "lucide-react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

// Mock events data
const featuredEvents = [
  {
    id: 1,
    title: "TechFest 2024",
    description: "Annual technical symposium featuring workshops, competitions, and tech talks",
    date: "2024-03-15",
    time: "09:00 AM",
    location: "Main Auditorium",
    department: "CSE",
    category: "Technical",
    registrations: 245,
    capacity: 300,
    image: "/placeholder-3cral.png",
    tags: ["Workshop", "Competition", "Tech Talk"],
    featured: true,
    registrationDeadline: "2024-03-10",
    prerequisites: "Basic programming knowledge",
    contactEmail: "techfest@kec.edu.in",
    organizer: "Dr. Kumar",
  },
  {
    id: 2,
    title: "Cultural Night 2024",
    description: "Celebrate diversity with music, dance, and cultural performances",
    date: "2024-03-20",
    time: "06:00 PM",
    location: "Open Ground",
    department: "Cultural Committee",
    category: "Cultural",
    registrations: 180,
    capacity: 500,
    image: "/colorful-cultural-stage.png",
    tags: ["Music", "Dance", "Performance"],
    featured: true,
    registrationDeadline: "2024-03-18",
    prerequisites: "None",
    contactEmail: "cultural@kec.edu.in",
    organizer: "Cultural Committee",
  },
  {
    id: 3,
    title: "AI/ML Workshop",
    description: "Hands-on workshop on Machine Learning and Artificial Intelligence",
    date: "2024-03-25",
    time: "10:00 AM",
    location: "Lab Complex",
    department: "CSE",
    category: "Workshop",
    registrations: 95,
    capacity: 100,
    image: "/ai-ml-workshop.png",
    tags: ["AI", "ML", "Hands-on"],
    featured: false,
    registrationDeadline: "2024-03-22",
    prerequisites: "Python programming basics",
    contactEmail: "aiml@kec.edu.in",
    organizer: "Prof. Sharma",
  },
]

const initialRegistrations = [
  {
    id: 1,
    title: "Web Development Bootcamp",
    date: "2024-03-12",
    time: "02:00 PM",
    location: "Computer Lab",
    status: "confirmed",
    category: "Workshop",
    registrationDate: "2024-02-20",
  },
  {
    id: 2,
    title: "Sports Day",
    date: "2024-03-18",
    time: "08:00 AM",
    location: "Sports Ground",
    status: "confirmed",
    category: "Sports",
    registrationDate: "2024-02-25",
  },
  {
    id: 3,
    title: "Coding Competition",
    date: "2024-02-28",
    time: "10:00 AM",
    location: "Lab Complex",
    status: "completed",
    category: "Competition",
    registrationDate: "2024-02-15",
  },
]

const quickStats = [
  { label: "Events Attended", value: "12", icon: Calendar, color: "blue" },
  { label: "Certificates Earned", value: "8", icon: Trophy, color: "yellow" },
  { label: "Upcoming Events", value: "3", icon: Clock, color: "green" },
  { label: "Favorite Events", value: "5", icon: Heart, color: "red" },
]

export default function UserDashboard() {
  const { user, signOut } = useAuth()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("home")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [isEventDetailsOpen, setIsEventDetailsOpen] = useState(false)
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)
  const [myRegistrations, setMyRegistrations] = useState(initialRegistrations)
  const [registrationForm, setRegistrationForm] = useState({
    specialRequirements: "",
    emergencyContact: "",
    dietaryRestrictions: "",
  })

  const sidebarItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "explore", label: "Explore Events", icon: Search },
    { id: "my-events", label: "My Events", icon: Calendar },
    { id: "profile", label: "Profile", icon: User },
  ]

  const filteredEvents = featuredEvents.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.department.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleEventRegistration = () => {
    if (!selectedEvent) return

    const newRegistration = {
      id: selectedEvent.id,
      title: selectedEvent.title,
      date: selectedEvent.date,
      time: selectedEvent.time,
      location: selectedEvent.location,
      status: "confirmed",
      category: selectedEvent.category,
      registrationDate: new Date().toISOString().split("T")[0],
      specialRequirements: registrationForm.specialRequirements,
      emergencyContact: registrationForm.emergencyContact,
      dietaryRestrictions: registrationForm.dietaryRestrictions,
    }

    // Check if already registered
    const alreadyRegistered = myRegistrations.some((reg) => reg.id === selectedEvent.id)
    if (alreadyRegistered) {
      toast({
        title: "Already Registered",
        description: "You are already registered for this event.",
        variant: "destructive",
      })
      return
    }

    setMyRegistrations([...myRegistrations, newRegistration])
    setRegistrationForm({
      specialRequirements: "",
      emergencyContact: "",
      dietaryRestrictions: "",
    })
    setIsRegistrationOpen(false)
    setIsEventDetailsOpen(false)

    toast({
      title: "Registration Successful!",
      description: `You have successfully registered for ${selectedEvent.title}`,
    })
  }

  const handleCancelRegistration = (eventId: number) => {
    setMyRegistrations(myRegistrations.filter((reg) => reg.id !== eventId))
    toast({
      title: "Registration Cancelled",
      description: "Your registration has been cancelled successfully.",
    })
  }

  const openEventDetails = (event: any) => {
    setSelectedEvent(event)
    setIsEventDetailsOpen(true)
  }

  const openRegistrationDialog = (event: any) => {
    setSelectedEvent(event)
    setIsRegistrationOpen(true)
  }

  const isRegistered = (eventId: number) => {
    return myRegistrations.some((reg) => reg.id === eventId)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-200 z-50">
        {/* Logo */}
        <div className="flex items-center gap-3 p-6 border-b border-slate-200">
          <Image src="/images/kec-logo.png" alt="KEC Logo" width={40} height={40} className="rounded-full" />
          <div>
            <h1 className="font-bold text-slate-700">KEC EVENT HUB</h1>
            <p className="text-xs text-slate-500">Student Portal</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === item.id
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            )
          })}
        </nav>

        {/* Quick Stats */}
        <div className="p-4 mt-8">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">Quick Stats</h3>
          <div className="space-y-3">
            {quickStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-${stat.color}-100`}>
                    <Icon className={`w-4 h-4 text-${stat.color}-600`} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{stat.value}</p>
                    <p className="text-xs text-slate-500">{stat.label}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Top Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-slate-700">
                {activeTab === "home" && `Welcome back, ${user?.name?.split(" ")[0]}!`}
                {activeTab === "explore" && "Explore Events"}
                {activeTab === "my-events" && "My Events"}
                {activeTab === "profile" && "Profile"}
              </h2>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search events..."
                  className="pl-10 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
              </Button>

              {/* Profile Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setActiveTab("profile")}>Profile Settings</DropdownMenuItem>
                  <DropdownMenuItem>My Certificates</DropdownMenuItem>
                  <DropdownMenuItem>Preferences</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Home Tab */}
        {activeTab === "home" && (
          <main className="p-6 space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl p-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Ready for your next event?</h3>
                  <p className="text-blue-100 mb-4">
                    Discover amazing events happening at KEC and expand your horizons!
                  </p>
                  <Button
                    variant="secondary"
                    onClick={() => setActiveTab("explore")}
                    className="bg-white text-blue-600 hover:bg-blue-50"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Explore Events
                  </Button>
                </div>
                <div className="hidden md:block">
                  <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                    <Zap className="w-16 h-16 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Events */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-700">Featured Events</h3>
                <Button variant="outline" onClick={() => setActiveTab("explore")}>
                  View All
                </Button>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredEvents
                  .filter((event) => event.featured)
                  .map((event) => (
                    <Card key={event.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                      <div className="relative">
                        <img
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          className="w-full h-48 object-cover"
                        />
                        <Badge className="absolute top-3 left-3 bg-blue-600">{event.category}</Badge>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="absolute top-3 right-3 bg-white/80 hover:bg-white"
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-slate-900 mb-2">{event.title}</h4>
                        <p className="text-sm text-slate-600 mb-3 line-clamp-2">{event.description}</p>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Clock className="w-3 h-3" />
                            {event.date} at {event.time}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            <MapPin className="w-3 h-3" />
                            {event.location}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Users className="w-3 h-3" />
                            {event.registrations}/{event.capacity} registered
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {event.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEventDetails(event)}
                            className="flex-1"
                          >
                            View Details
                          </Button>
                          {isRegistered(event.id) ? (
                            <Button disabled className="flex-1 bg-green-600">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Registered
                            </Button>
                          ) : (
                            <Button
                              onClick={() => openRegistrationDialog(event)}
                              className="flex-1 bg-blue-600 hover:bg-blue-700"
                            >
                              Register Now
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>

            {/* My Upcoming Events */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-700">My Upcoming Events</h3>
                <Button variant="outline" onClick={() => setActiveTab("my-events")}>
                  View All
                </Button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {myRegistrations
                  .filter((event) => event.status === "confirmed")
                  .map((event) => (
                    <Card key={event.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-slate-900">{event.title}</h4>
                          <Badge className="bg-green-100 text-green-700">Confirmed</Badge>
                        </div>
                        <div className="space-y-1 text-sm text-slate-500">
                          <div className="flex items-center gap-2">
                            <Clock className="w-3 h-3" />
                            {event.date} at {event.time}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3 h-3" />
                            {event.location}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          </main>
        )}

        {/* Explore Tab */}
        {activeTab === "explore" && (
          <main className="p-6 space-y-6">
            {/* Filters */}
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                All Categories
              </Button>
              <Button variant="outline" size="sm">
                Technical
              </Button>
              <Button variant="outline" size="sm">
                Cultural
              </Button>
              <Button variant="outline" size="sm">
                Sports
              </Button>
              <Button variant="outline" size="sm">
                Workshop
              </Button>
            </div>

            {/* Events Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <Card key={event.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="relative">
                    <img
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-3 left-3 bg-blue-600">{event.category}</Badge>
                    <Button size="icon" variant="ghost" className="absolute top-3 right-3 bg-white/80 hover:bg-white">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-slate-900 mb-2">{event.title}</h4>
                    <p className="text-sm text-slate-600 mb-3 line-clamp-2">{event.description}</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Clock className="w-3 h-3" />
                        {event.date} at {event.time}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <MapPin className="w-3 h-3" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Users className="w-3 h-3" />
                        {event.registrations}/{event.capacity} registered
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {event.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => openEventDetails(event)} className="flex-1">
                        View Details
                      </Button>
                      {isRegistered(event.id) ? (
                        <Button disabled className="flex-1 bg-green-600">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Registered
                        </Button>
                      ) : (
                        <Button
                          onClick={() => openRegistrationDialog(event)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700"
                        >
                          Register Now
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </main>
        )}

        {/* My Events Tab */}
        {activeTab === "my-events" && (
          <main className="p-6 space-y-6">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-slate-900">
                    {myRegistrations.filter((e) => e.status === "confirmed").length}
                  </p>
                  <p className="text-sm text-slate-500">Upcoming Events</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-slate-900">
                    {myRegistrations.filter((e) => e.status === "completed").length}
                  </p>
                  <p className="text-sm text-slate-500">Completed Events</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Star className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-slate-900">8</p>
                  <p className="text-sm text-slate-500">Certificates Earned</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-700">My Registrations</h3>
              {myRegistrations.map((event) => (
                <Card key={event.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900">{event.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {event.date} at {event.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {event.location}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-1">Registered on: {event.registrationDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={event.status === "completed" ? "secondary" : "default"}
                          className={
                            event.status === "completed" ? "bg-gray-100 text-gray-700" : "bg-green-100 text-green-700"
                          }
                        >
                          {event.status === "completed" ? "Completed" : "Confirmed"}
                        </Badge>
                        {event.status === "confirmed" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCancelRegistration(event.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Cancel
                          </Button>
                        )}
                        {event.status === "completed" && (
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-1" />
                            Certificate
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </main>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <main className="p-6">
            <Card>
              <CardContent className="p-12 text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-2xl">{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-2xl font-bold text-slate-700 mb-2">{user?.name}</h3>
                <p className="text-slate-500 mb-1">{user?.department} Department</p>
                <p className="text-slate-500 mb-4">
                  {user?.year} • Roll No: {user?.rollNumber}
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700">Edit Profile</Button>
              </CardContent>
            </Card>
          </main>
        )}
      </div>

      {/* Event Details Dialog */}
      <Dialog open={isEventDetailsOpen} onOpenChange={setIsEventDetailsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedEvent.title}</DialogTitle>
                <DialogDescription className="text-base">{selectedEvent.description}</DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="relative">
                  <img
                    src={selectedEvent.image || "/placeholder.svg"}
                    alt={selectedEvent.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <Badge className="absolute top-3 left-3 bg-blue-600">{selectedEvent.category}</Badge>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Event Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-slate-500" />
                          <span>
                            {selectedEvent.date} at {selectedEvent.time}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-slate-500" />
                          <span>{selectedEvent.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-slate-500" />
                          <span>
                            {selectedEvent.registrations}/{selectedEvent.capacity} registered
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-slate-500" />
                          <span>Registration deadline: {selectedEvent.registrationDeadline}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedEvent.tags.map((tag: string, index: number) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Organizer Information</h4>
                      <div className="space-y-1 text-sm">
                        <p>
                          <span className="font-medium">Department:</span> {selectedEvent.department}
                        </p>
                        <p>
                          <span className="font-medium">Organizer:</span> {selectedEvent.organizer}
                        </p>
                        <p>
                          <span className="font-medium">Contact:</span> {selectedEvent.contactEmail}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Prerequisites</h4>
                      <p className="text-sm text-slate-600">{selectedEvent.prerequisites}</p>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEventDetailsOpen(false)}>
                  Close
                </Button>
                {isRegistered(selectedEvent.id) ? (
                  <Button disabled className="bg-green-600">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Already Registered
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      setIsEventDetailsOpen(false)
                      openRegistrationDialog(selectedEvent)
                    }}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Register for Event
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Registration Dialog */}
      <Dialog open={isRegistrationOpen} onOpenChange={setIsRegistrationOpen}>
        <DialogContent className="max-w-md">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle>Register for {selectedEvent.title}</DialogTitle>
                <DialogDescription>
                  Please fill in the additional information to complete your registration.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="emergency-contact">Emergency Contact</Label>
                  <Input
                    id="emergency-contact"
                    placeholder="Emergency contact number"
                    value={registrationForm.emergencyContact}
                    onChange={(e) => setRegistrationForm({ ...registrationForm, emergencyContact: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dietary-restrictions">Dietary Restrictions</Label>
                  <Input
                    id="dietary-restrictions"
                    placeholder="Any dietary restrictions (optional)"
                    value={registrationForm.dietaryRestrictions}
                    onChange={(e) => setRegistrationForm({ ...registrationForm, dietaryRestrictions: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="special-requirements">Special Requirements</Label>
                  <Textarea
                    id="special-requirements"
                    placeholder="Any special requirements or notes (optional)"
                    value={registrationForm.specialRequirements}
                    onChange={(e) => setRegistrationForm({ ...registrationForm, specialRequirements: e.target.value })}
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsRegistrationOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleEventRegistration} className="bg-blue-600 hover:bg-blue-700">
                  Complete Registration
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
