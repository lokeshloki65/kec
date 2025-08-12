"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users, Star } from "lucide-react"

interface EventCardProps {
  event: {
    id: number
    title: string
    description: string
    date: string
    time: string
    location: string
    category: string
    registrations: number
    maxRegistrations: number
    isRegistered?: boolean
    isFeatured?: boolean
    organizer: string
    image?: string
  }
  onRegister?: (eventId: number) => void
  onViewDetails?: (eventId: number) => void
}

export function EventCard({ event, onRegister, onViewDetails }: EventCardProps) {
  const registrationPercentage = (event.registrations / event.maxRegistrations) * 100

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 relative overflow-hidden">
      {event.isFeatured && (
        <div className="absolute top-3 right-3 z-10">
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Star className="h-3 w-3 mr-1" />
            Featured
          </Badge>
        </div>
      )}

      {event.image && (
        <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative">
          <div className="absolute inset-0 bg-black bg-opacity-20" />
          <div className="absolute bottom-4 left-4 text-white">
            <Badge variant="secondary" className="mb-2">
              {event.category}
            </Badge>
          </div>
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900 mb-1">{event.title}</h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{event.description}</p>
            <p className="text-xs text-gray-500">Organized by {event.organizer}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Event Details */}
          <div className="grid grid-cols-1 gap-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{event.location}</span>
            </div>
          </div>

          {/* Registration Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1 text-gray-600">
                <Users className="h-4 w-4" />
                {event.registrations} / {event.maxRegistrations} registered
              </span>
              <span className="text-gray-500">{Math.round(registrationPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(registrationPercentage, 100)}%` }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 bg-transparent"
              onClick={() => onViewDetails?.(event.id)}
            >
              View Details
            </Button>
            {event.isRegistered ? (
              <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                Registered
              </Button>
            ) : registrationPercentage >= 100 ? (
              <Button size="sm" className="flex-1" disabled>
                Full
              </Button>
            ) : (
              <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={() => onRegister?.(event.id)}>
                Register
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
