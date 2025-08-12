"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Trophy, Star, ArrowRight, Shield, User } from "lucide-react"
import { useAuth, AuthProvider } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

function LoginForm() {
  const [loginType, setLoginType] = useState<"admin" | "user">("user")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { signIn } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const success = await signIn(email, password)
      if (success) {
        toast({
          title: "Welcome back!",
          description: "You have been successfully signed in.",
        })
        // Redirect based on login type
        if (loginType === "admin") {
          router.push("/admin")
        } else {
          router.push("/dashboard")
        }
      } else {
        toast({
          title: "Sign in failed",
          description: "Please check your credentials and try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md shadow-xl border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-2xl font-bold text-slate-700">Sign In</CardTitle>
        <CardDescription>Access your KEC Event Hub account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Role Selection */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant={loginType === "user" ? "default" : "outline"}
            onClick={() => setLoginType("user")}
            className="flex items-center gap-2"
          >
            <User className="w-4 h-4" />
            Student
          </Button>
          <Button
            variant={loginType === "admin" ? "default" : "outline"}
            onClick={() => setLoginType("admin")}
            className="flex items-center gap-2"
          >
            <Shield className="w-4 h-4" />
            Admin
          </Button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder={loginType === "admin" ? "admin@kec.edu.in" : "student@kec.edu.in"}
              className="h-11"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="h-11"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full h-11 bg-blue-600 hover:bg-blue-700 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <>
                Sign In as {loginType === "admin" ? "Admin" : "Student"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </form>

        <div className="text-center">
          <Button variant="link" className="text-sm text-slate-500">
            Forgot your password?
          </Button>
        </div>

        {/* Demo Credentials */}
        <div className="text-center p-3 bg-slate-100 rounded-lg">
          <p className="text-xs text-slate-600 mb-2">Demo Credentials:</p>
          <p className="text-xs text-slate-500">
            Admin: admin@kec.edu.in / password123
            <br />
            Student: student@kec.edu.in / password123
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default function HomePage() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
        {/* Header */}
        <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image src="/images/kec-logo.png" alt="KEC Logo" width={50} height={50} className="rounded-full" />
                <div>
                  <h1 className="text-xl font-bold text-slate-700">KEC EVENT HUB</h1>
                  <p className="text-sm text-slate-500">Kongu Engineering College</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                Est. 1984
              </Badge>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Hero Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-blue-600 hover:bg-blue-700">
                  <Star className="w-3 h-3 mr-1" />
                  College Event Management
                </Badge>
                <h2 className="text-4xl lg:text-5xl font-bold text-slate-700 leading-tight">
                  Welcome to
                  <span className="text-blue-600 block">KEC EVENT HUB</span>
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Your gateway to discovering, managing, and participating in all college events. From technical
                  symposiums to cultural festivals - everything in one place.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <Calendar className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-slate-700">50+</div>
                  <div className="text-sm text-slate-500">Events/Year</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <Users className="w-6 h-6 text-cyan-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-slate-700">5000+</div>
                  <div className="text-sm text-slate-500">Students</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <Trophy className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-slate-700">15+</div>
                  <div className="text-sm text-slate-500">Departments</div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>Easy event registration and management</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                  <span>Real-time updates and notifications</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>Comprehensive event analytics</span>
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex justify-center">
              <LoginForm />
            </div>
          </div>

          {/* Bottom Section - Quick Preview */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-slate-700 mb-8">What's Happening at KEC</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow bg-white/80">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-slate-700 mb-2">Upcoming Events</h4>
                  <p className="text-sm text-slate-500">
                    Discover and register for exciting events across all departments
                  </p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow bg-white/80">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-cyan-500" />
                  </div>
                  <h4 className="font-semibold text-slate-700 mb-2">My Registrations</h4>
                  <p className="text-sm text-slate-500">Track your event registrations and participation history</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow bg-white/80">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-slate-700 mb-2">Achievements</h4>
                  <p className="text-sm text-slate-500">Showcase your participation certificates and awards</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AuthProvider>
  )
}
