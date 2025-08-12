"use client"

import type React from "react"

import { useAuth } from "@/hooks/use-auth"
import { AuthProvider } from "@/hooks/use-auth"
import { redirect } from "next/navigation"
import { useEffect } from "react"

function UserLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isAuthenticated } = useAuth()

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== "user")) {
      redirect("/")
    }
  }, [user, isLoading, isAuthenticated])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!isAuthenticated || user?.role !== "user") {
    return null
  }

  return <>{children}</>
}

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <UserLayoutContent>{children}</UserLayoutContent>
    </AuthProvider>
  )
}
