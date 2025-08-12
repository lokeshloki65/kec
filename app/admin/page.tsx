"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Home,
  Calendar,
  Users,
  BarChart3,
  Settings,
  Search,
  Bell,
  Plus,
  TrendingUp,
  Eye,
  Edit,
  MoreHorizontal,
  UserCheck,
  Clock,
  MapPin,
  Trash2,
  Copy,
  Download,
  Filter,
} from "lucide-react"
import Image from "next/image"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

// Mock data for charts
const registrationData = [
  { name: "Jan", registrations: 120 },
  { name: "Feb", registrations: 190 },
  { name: "Mar", registrations: 300 },
  { name: "Apr", registrations: 250 },
  { name: "May", registrations: 400 },
  { name: "Jun", registrations: 350 },
]

const departmentData = [
  { name: "CSE", events: 12, registrations: 450 },
  { name: "ECE", events: 8, registrations: 320 },
  { name: "MECH", events: 6, registrations: 280 },
  { name: "CIVIL", events: 5, registrations: 200 },
  { name: "EEE", events: 7, registrations: 310 },
]

// Mock events data
const upcomingEvents = [
  {
    id: 1,
    title: "TechFest 2024",
    description: "Annual technical symposium featuring workshops, competitions, and tech talks",
    date: "2024-03-15",
    time: "09:00 AM",
    location: "Main Auditorium",
    registrations: 245,
    capacity: 300,
    status: "active",
    department: "CSE",
    category: "Technical",
    registrationDeadline: "2024-03-10",
    createdAt: "2024-02-15",
    tags: ["Workshop", "Competition", "Tech Talk"],
  },
  {
    id: 2,
    title: "Cultural Night",
    description: "Celebrate diversity with music, dance, and cultural performances",
    date: "2024-03-20",
    time: "06:00 PM",
    location: "Open Ground",
    registrations: 180,
    capacity: 500,
    status: "active",
    department: "Cultural Committee",
    category: "Cultural",
    registrationDeadline: "2024-03-18",
    createdAt: "2024-02-20",
    tags: ["Music", "Dance", "Performance"],
  },
  {
    id: 3,
    title: "Workshop on AI/ML",
    description: "Hands-on workshop on Machine Learning and Artificial Intelligence",
    date: "2024-03-25",
    time: "10:00 AM",
    location: "Lab Complex",
    registrations: 95,
    capacity: 100,
    status: "filling-fast",
    department: "CSE",
    category: "Workshop",
    registrationDeadline: "2024-03-22",
    createdAt: "2024-02-25",
    tags: ["AI", "ML", "Hands-on"],
  },
]

export default function AdminDashboard() {
  const { user, signOut } = useAuth()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false)
  const [isEditEventOpen, setIsEditEventOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [events, setEvents] = useState(upcomingEvents)
  const [eventFilter, setEventFilter] = useState("all")

  const [eventForm, setEventForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    capacity: "",
    department: "",
    category: "",
    registrationDeadline: "",
    tags: "",
  })

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "events", label: "Events", icon: Calendar },
    { id: "registrations", label: "Registrations", icon: Users },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  const handleCreateEvent = () => {
    const newEvent = {
      id: events.length + 1,
      ...eventForm,
      capacity: Number.parseInt(eventForm.capacity),
      registrations: 0,
      status: "active",
      createdAt: new Date().toISOString().split("T")[0],
      tags: eventForm.tags.split(",").map((tag) => tag.trim()),
    }
    setEvents([...events, newEvent])
    setEventForm({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      capacity: "",
      department: "",
      category: "",
      registrationDeadline: "",
      tags: "",
    })
    setIsCreateEventOpen(false)
  }

  const handleEditEvent = () => {
    const updatedEvents = events.map((event) =>
      event.id === selectedEvent.id
        ? {
            ...event,
            ...eventForm,
            capacity: Number.parseInt(eventForm.capacity),
            tags: eventForm.tags.split(",").map((tag) => tag.trim()),
          }
        : event,
    )
    setEvents(updatedEvents)
    setIsEditEventOpen(false)
    setSelectedEvent(null)
  }

  const handleDeleteEvent = (eventId: number) => {
    setEvents(events.filter((event) => event.id !== eventId))
  }

  const openEditDialog = (event: any) => {
    setSelectedEvent(event)
    setEventForm({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      capacity: event.capacity.toString(),
      department: event.department,
      category: event.category,
      registrationDeadline: event.registrationDeadline,
      tags: event.tags.join(", "),
    })
    setIsEditEventOpen(true)
  }

  const filteredEvents = events.filter((event) => {
    if (eventFilter === "all") return true
    if (eventFilter === "active") return event.status === "active"
    if (eventFilter === "filling-fast") return event.status === "filling-fast"
    return event.category.toLowerCase() === eventFilter
  })

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-200 z-50">
        {/* Logo */}
        <div className="flex items-center gap-3 p-6 border-b border-slate-200">
          <Image src="/images/kec-logo.png" alt="KEC Logo" width={40} height={40} className="rounded-full" />
          <div>
            <h1 className="font-bold text-slate-700">KEC EVENT HUB</h1>
            <p className="text-xs text-slate-500">Admin Panel</p>
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
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Top Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-slate-700">
                {activeTab === "dashboard" && "Dashboard"}
                {activeTab === "events" && "Events Management"}
                {activeTab === "registrations" && "Registrations"}
                {activeTab === "analytics" && "Analytics"}
                {activeTab === "settings" && "Settings"}
              </h2>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input placeholder="Search events..." className="pl-10 w-64" />
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
                  <DropdownMenuItem>Profile Settings</DropdownMenuItem>
                  <DropdownMenuItem>Preferences</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        {activeTab === "dashboard" && (
          <main className="p-6 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Total Events</p>
                      <p className="text-3xl font-bold text-slate-900">{events.length}</p>
                      <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                        <TrendingUp className="w-3 h-3" />
                        +12% from last month
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Total Registrations</p>
                      <p className="text-3xl font-bold text-slate-900">1,247</p>
                      <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                        <TrendingUp className="w-3 h-3" />
                        +8% from last month
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-cyan-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Active Events</p>
                      <p className="text-3xl font-bold text-slate-900">
                        {events.filter((e) => e.status === "active").length}
                      </p>
                      <p className="text-xs text-blue-600 flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" />
                        {events.filter((e) => e.status === "filling-fast").length} ending soon
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <UserCheck className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Departments</p>
                      <p className="text-3xl font-bold text-slate-900">15</p>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                        <BarChart3 className="w-3 h-3" />
                        All active
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Row */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Registration Trends */}
              <Card>
                <CardHeader>
                  <CardTitle>Registration Trends</CardTitle>
                  <CardDescription>Monthly registration statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={registrationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="registrations" stroke="#2563eb" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Department Participation */}
              <Card>
                <CardHeader>
                  <CardTitle>Department Participation</CardTitle>
                  <CardDescription>Events and registrations by department</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={departmentData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="registrations" fill="#0ea5e9" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Events */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>Events requiring your attention</CardDescription>
                </div>
                <Dialog open={isCreateEventOpen} onOpenChange={setIsCreateEventOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Event
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Create New Event</DialogTitle>
                      <DialogDescription>Fill in the details to create a new event for KEC students.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="title">Event Title</Label>
                          <Input
                            id="title"
                            value={eventForm.title}
                            onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                            placeholder="Enter event title"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <Select
                            value={eventForm.category}
                            onValueChange={(value) => setEventForm({ ...eventForm, category: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Technical">Technical</SelectItem>
                              <SelectItem value="Cultural">Cultural</SelectItem>
                              <SelectItem value="Sports">Sports</SelectItem>
                              <SelectItem value="Workshop">Workshop</SelectItem>
                              <SelectItem value="Seminar">Seminar</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={eventForm.description}
                          onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                          placeholder="Enter event description"
                          rows={3}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="date">Event Date</Label>
                          <Input
                            id="date"
                            type="date"
                            value={eventForm.date}
                            onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="time">Event Time</Label>
                          <Input
                            id="time"
                            type="time"
                            value={eventForm.time}
                            onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            value={eventForm.location}
                            onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                            placeholder="Enter event location"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="capacity">Capacity</Label>
                          <Input
                            id="capacity"
                            type="number"
                            value={eventForm.capacity}
                            onChange={(e) => setEventForm({ ...eventForm, capacity: e.target.value })}
                            placeholder="Enter maximum capacity"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="department">Department</Label>
                          <Select
                            value={eventForm.department}
                            onValueChange={(value) => setEventForm({ ...eventForm, department: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="CSE">Computer Science</SelectItem>
                              <SelectItem value="ECE">Electronics & Communication</SelectItem>
                              <SelectItem value="MECH">Mechanical</SelectItem>
                              <SelectItem value="CIVIL">Civil</SelectItem>
                              <SelectItem value="EEE">Electrical & Electronics</SelectItem>
                              <SelectItem value="Cultural Committee">Cultural Committee</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="registrationDeadline">Registration Deadline</Label>
                          <Input
                            id="registrationDeadline"
                            type="date"
                            value={eventForm.registrationDeadline}
                            onChange={(e) => setEventForm({ ...eventForm, registrationDeadline: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tags">Tags (comma separated)</Label>
                        <Input
                          id="tags"
                          value={eventForm.tags}
                          onChange={(e) => setEventForm({ ...eventForm, tags: e.target.value })}
                          placeholder="e.g., Workshop, AI, Hands-on"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsCreateEventOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleCreateEvent} className="bg-blue-600 hover:bg-blue-700">
                        Create Event
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {events.slice(0, 3).map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                    >
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
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium text-slate-900">
                            {event.registrations}/{event.capacity}
                          </p>
                          <p className="text-xs text-slate-500">registrations</p>
                        </div>
                        <Badge
                          variant={event.status === "filling-fast" ? "destructive" : "secondary"}
                          className={
                            event.status === "filling-fast"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-green-100 text-green-700"
                          }
                        >
                          {event.status === "filling-fast" ? "Filling Fast" : "Active"}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openEditDialog(event)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Event
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Users className="w-4 h-4 mr-2" />
                              View Registrations
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>
        )}

        {activeTab === "events" && (
          <main className="p-6 space-y-6">
            {/* Events Header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-700">All Events</h3>
                <p className="text-sm text-slate-500">Manage and monitor all college events</p>
              </div>
              <div className="flex items-center gap-3">
                <Select value={eventFilter} onValueChange={setEventFilter}>
                  <SelectTrigger className="w-40">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Events</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="filling-fast">Filling Fast</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="cultural">Cultural</SelectItem>
                    <SelectItem value="workshop">Workshop</SelectItem>
                  </SelectContent>
                </Select>
                <Dialog open={isCreateEventOpen} onOpenChange={setIsCreateEventOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Event
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Create New Event</DialogTitle>
                      <DialogDescription>Fill in the details to create a new event for KEC students.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="title">Event Title</Label>
                          <Input
                            id="title"
                            value={eventForm.title}
                            onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                            placeholder="Enter event title"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <Select
                            value={eventForm.category}
                            onValueChange={(value) => setEventForm({ ...eventForm, category: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Technical">Technical</SelectItem>
                              <SelectItem value="Cultural">Cultural</SelectItem>
                              <SelectItem value="Sports">Sports</SelectItem>
                              <SelectItem value="Workshop">Workshop</SelectItem>
                              <SelectItem value="Seminar">Seminar</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={eventForm.description}
                          onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                          placeholder="Enter event description"
                          rows={3}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="date">Event Date</Label>
                          <Input
                            id="date"
                            type="date"
                            value={eventForm.date}
                            onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="time">Event Time</Label>
                          <Input
                            id="time"
                            type="time"
                            value={eventForm.time}
                            onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            value={eventForm.location}
                            onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                            placeholder="Enter event location"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="capacity">Capacity</Label>
                          <Input
                            id="capacity"
                            type="number"
                            value={eventForm.capacity}
                            onChange={(e) => setEventForm({ ...eventForm, capacity: e.target.value })}
                            placeholder="Enter maximum capacity"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="department">Department</Label>
                          <Select
                            value={eventForm.department}
                            onValueChange={(value) => setEventForm({ ...eventForm, department: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="CSE">Computer Science</SelectItem>
                              <SelectItem value="ECE">Electronics & Communication</SelectItem>
                              <SelectItem value="MECH">Mechanical</SelectItem>
                              <SelectItem value="CIVIL">Civil</SelectItem>
                              <SelectItem value="EEE">Electrical & Electronics</SelectItem>
                              <SelectItem value="Cultural Committee">Cultural Committee</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="registrationDeadline">Registration Deadline</Label>
                          <Input
                            id="registrationDeadline"
                            type="date"
                            value={eventForm.registrationDeadline}
                            onChange={(e) => setEventForm({ ...eventForm, registrationDeadline: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tags">Tags (comma separated)</Label>
                        <Input
                          id="tags"
                          value={eventForm.tags}
                          onChange={(e) => setEventForm({ ...eventForm, tags: e.target.value })}
                          placeholder="e.g., Workshop, AI, Hands-on"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsCreateEventOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleCreateEvent} className="bg-blue-600 hover:bg-blue-700">
                        Create Event
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Events Table */}
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Registrations</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEvents.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-slate-900">{event.title}</p>
                            <p className="text-sm text-slate-500">
                              {event.department} • {event.category}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm font-medium">{event.date}</p>
                            <p className="text-sm text-slate-500">{event.time}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm">{event.location}</p>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm font-medium">
                              {event.registrations}/{event.capacity}
                            </p>
                            <div className="w-full bg-slate-200 rounded-full h-1.5 mt-1">
                              <div
                                className="bg-blue-600 h-1.5 rounded-full"
                                style={{ width: `${(event.registrations / event.capacity) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={event.status === "filling-fast" ? "destructive" : "secondary"}
                            className={
                              event.status === "filling-fast"
                                ? "bg-orange-100 text-orange-700"
                                : "bg-green-100 text-green-700"
                            }
                          >
                            {event.status === "filling-fast" ? "Filling Fast" : "Active"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => openEditDialog(event)}>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Event
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="w-4 h-4 mr-2" />
                                Duplicate Event
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="w-4 h-4 mr-2" />
                                Export Registrations
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteEvent(event.id)}>
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete Event
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </main>
        )}

        {/* Other tab contents would go here */}
        {activeTab !== "dashboard" && activeTab !== "events" && (
          <main className="p-6">
            <Card>
              <CardContent className="p-12 text-center">
                <h3 className="text-xl font-semibold text-slate-700 mb-2">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Section
                </h3>
                <p className="text-slate-500">This section is under development and will be available soon.</p>
              </CardContent>
            </Card>
          </main>
        )}
      </div>

      <Dialog open={isCreateEventOpen} onOpenChange={setIsCreateEventOpen}>
        <DialogTrigger asChild>
          <Button
            size="lg"
            className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all"
          >
            <Plus className="w-6 h-6" />
          </Button>
        </DialogTrigger>
      </Dialog>

      <Dialog open={isEditEventOpen} onOpenChange={setIsEditEventOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
            <DialogDescription>Update the event details below.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Event Title</Label>
                <Input
                  id="edit-title"
                  value={eventForm.title}
                  onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                  placeholder="Enter event title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-category">Category</Label>
                <Select
                  value={eventForm.category}
                  onValueChange={(value) => setEventForm({ ...eventForm, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technical">Technical</SelectItem>
                    <SelectItem value="Cultural">Cultural</SelectItem>
                    <SelectItem value="Sports">Sports</SelectItem>
                    <SelectItem value="Workshop">Workshop</SelectItem>
                    <SelectItem value="Seminar">Seminar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={eventForm.description}
                onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                placeholder="Enter event description"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-date">Event Date</Label>
                <Input
                  id="edit-date"
                  type="date"
                  value={eventForm.date}
                  onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-time">Event Time</Label>
                <Input
                  id="edit-time"
                  type="time"
                  value={eventForm.time}
                  onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-location">Location</Label>
                <Input
                  id="edit-location"
                  value={eventForm.location}
                  onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                  placeholder="Enter event location"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-capacity">Capacity</Label>
                <Input
                  id="edit-capacity"
                  type="number"
                  value={eventForm.capacity}
                  onChange={(e) => setEventForm({ ...eventForm, capacity: e.target.value })}
                  placeholder="Enter maximum capacity"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-department">Department</Label>
                <Select
                  value={eventForm.department}
                  onValueChange={(value) => setEventForm({ ...eventForm, department: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CSE">Computer Science</SelectItem>
                    <SelectItem value="ECE">Electronics & Communication</SelectItem>
                    <SelectItem value="MECH">Mechanical</SelectItem>
                    <SelectItem value="CIVIL">Civil</SelectItem>
                    <SelectItem value="EEE">Electrical & Electronics</SelectItem>
                    <SelectItem value="Cultural Committee">Cultural Committee</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-registrationDeadline">Registration Deadline</Label>
                <Input
                  id="edit-registrationDeadline"
                  type="date"
                  value={eventForm.registrationDeadline}
                  onChange={(e) => setEventForm({ ...eventForm, registrationDeadline: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-tags">Tags (comma separated)</Label>
              <Input
                id="edit-tags"
                value={eventForm.tags}
                onChange={(e) => setEventForm({ ...eventForm, tags: e.target.value })}
                placeholder="e.g., Workshop, AI, Hands-on"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditEventOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditEvent} className="bg-blue-600 hover:bg-blue-700">
              Update Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
