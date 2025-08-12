import { create } from "zustand"

export interface Event {
  id: number
  title: string
  description: string
  longDescription?: string
  date: string
  time: string
  endDate?: string
  endTime?: string
  location: string
  category: string
  organizer: string
  maxRegistrations: number
  registrations: number
  status: "draft" | "published" | "cancelled" | "completed"
  isFeatured: boolean
  image?: string
  requirements?: string[]
  prizes?: string[]
  contactEmail: string
  contactPhone?: string
  registrationDeadline?: string
  createdAt: string
  updatedAt: string
}

interface EventState {
  events: Event[]
  addEvent: (event: Omit<Event, "id" | "registrations" | "createdAt" | "updatedAt">) => void
  updateEvent: (id: number, event: Partial<Event>) => void
  deleteEvent: (id: number) => void
  getEvent: (id: number) => Event | undefined
  getEventsByStatus: (status: Event["status"]) => Event[]
  getEventsByCategory: (category: string) => Event[]
}

// Mock initial events data
const initialEvents: Event[] = [
  {
    id: 1,
    title: "Tech Symposium 2024",
    description: "Annual technical symposium featuring latest trends in technology, AI, and innovation.",
    longDescription:
      "Join us for the most anticipated technical event of the year! This symposium will feature keynote speakers from leading tech companies, hands-on workshops, and networking opportunities with industry professionals.",
    date: "2024-01-15",
    time: "09:00",
    endDate: "2024-01-15",
    endTime: "17:00",
    location: "Main Auditorium",
    category: "Technical",
    organizer: "Computer Science Department",
    maxRegistrations: 200,
    registrations: 156,
    status: "published",
    isFeatured: true,
    requirements: ["Laptop required", "Basic programming knowledge"],
    prizes: ["₹50,000 for winner", "₹25,000 for runner-up", "Certificates for all participants"],
    contactEmail: "techsymposium@kec.edu",
    contactPhone: "+91 9876543210",
    registrationDeadline: "2024-01-10",
    createdAt: "2024-01-01T10:00:00Z",
    updatedAt: "2024-01-05T15:30:00Z",
  },
  {
    id: 2,
    title: "Cultural Fest - Kaleidoscope",
    description: "Celebrate diversity through music, dance, drama, and art competitions.",
    longDescription:
      "Experience the vibrant cultural heritage of our college through this spectacular fest featuring competitions in music, dance, drama, art, and literature.",
    date: "2024-01-20",
    time: "14:00",
    endDate: "2024-01-22",
    endTime: "22:00",
    location: "Open Ground",
    category: "Cultural",
    organizer: "Cultural Committee",
    maxRegistrations: 300,
    registrations: 234,
    status: "published",
    isFeatured: false,
    requirements: ["Costume required for performances", "Registration per event"],
    prizes: ["Trophy and cash prizes for winners", "Participation certificates"],
    contactEmail: "cultural@kec.edu",
    registrationDeadline: "2024-01-15",
    createdAt: "2024-01-02T09:00:00Z",
    updatedAt: "2024-01-06T11:20:00Z",
  },
  {
    id: 3,
    title: "Workshop on Machine Learning",
    description: "Hands-on workshop covering fundamentals of ML and practical applications.",
    date: "2024-01-18",
    time: "10:00",
    endDate: "2024-01-18",
    endTime: "16:00",
    location: "CS Lab 1",
    category: "Workshop",
    organizer: "AI/ML Club",
    maxRegistrations: 50,
    registrations: 45,
    status: "published",
    isFeatured: false,
    requirements: ["Laptop with Python installed", "Basic programming knowledge"],
    contactEmail: "aimlclub@kec.edu",
    registrationDeadline: "2024-01-16",
    createdAt: "2024-01-03T14:00:00Z",
    updatedAt: "2024-01-07T09:15:00Z",
  },
]

export const useEvents = create<EventState>((set, get) => ({
  events: initialEvents,
  addEvent: (eventData) => {
    const newEvent: Event = {
      ...eventData,
      id: Date.now(),
      registrations: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    set((state) => ({ events: [...state.events, newEvent] }))
  },
  updateEvent: (id, eventData) => {
    set((state) => ({
      events: state.events.map((event) =>
        event.id === id ? { ...event, ...eventData, updatedAt: new Date().toISOString() } : event,
      ),
    }))
  },
  deleteEvent: (id) => {
    set((state) => ({ events: state.events.filter((event) => event.id !== id) }))
  },
  getEvent: (id) => {
    return get().events.find((event) => event.id === id)
  },
  getEventsByStatus: (status) => {
    return get().events.filter((event) => event.status === status)
  },
  getEventsByCategory: (category) => {
    return get().events.filter((event) => event.category === category)
  },
}))
