import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, Trophy, BookOpen } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image src="/images/kec-logo.png" alt="KEC Logo" width={60} height={60} className="rounded-full" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">KEC EVENT HUB</h1>
                <p className="text-sm text-gray-600">Kongu Engineering College</p>
              </div>
            </div>
            <Link href="/login">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Your Gateway to
              <span className="text-blue-600"> College Events</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Discover, register, and participate in exciting events at Kongu Engineering College. From technical
              workshops to cultural festivals, never miss an opportunity to grow and connect.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-3">
                  Join Events Now
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="px-8 py-3 bg-transparent">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need for Event Management</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A comprehensive platform designed specifically for college event management and student engagement.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Event Discovery</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Browse and discover upcoming events across all departments and clubs.</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Easy Registration</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Register for events with just a few clicks and manage your participation.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Trophy className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                <CardTitle>Track Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Keep track of your participation, certificates, and achievements.</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Learning Hub</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Access resources, materials, and updates from all your registered events.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h3>
            <p className="text-blue-100 mb-8 text-lg">
              Join thousands of students already using KEC Event Hub to enhance their college experience.
            </p>
            <Link href="/login">
              <Button size="lg" variant="secondary" className="px-8 py-3">
                Sign In Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <Image src="/images/kec-logo.png" alt="KEC Logo" width={40} height={40} className="rounded-full" />
              <div>
                <p className="font-semibold">KEC Event Hub</p>
                <p className="text-sm text-gray-400">Kongu Engineering College</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">© 2024 Kongu Engineering College. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
