"use client"

import { useState, useEffect, createContext, useContext, type ReactNode } from "react"
import {
  type AuthState,
  signIn as authSignIn,
  signOut as authSignOut,
  getStoredUser,
  storeUser,
  clearStoredUser,
} from "@/lib/auth"

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<boolean>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  })

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = getStoredUser()
    setAuthState({
      user: storedUser,
      isLoading: false,
      isAuthenticated: !!storedUser,
    })
  }, [])

  const signIn = async (email: string, password: string): Promise<boolean> => {
    setAuthState((prev) => ({ ...prev, isLoading: true }))

    try {
      const user = await authSignIn(email, password)
      if (user) {
        storeUser(user)
        setAuthState({
          user,
          isLoading: false,
          isAuthenticated: true,
        })
        return true
      } else {
        setAuthState((prev) => ({ ...prev, isLoading: false }))
        return false
      }
    } catch (error) {
      setAuthState((prev) => ({ ...prev, isLoading: false }))
      return false
    }
  }

  const signOut = async (): Promise<void> => {
    setAuthState((prev) => ({ ...prev, isLoading: true }))

    try {
      await authSignOut()
      clearStoredUser()
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      })
    } catch (error) {
      setAuthState((prev) => ({ ...prev, isLoading: false }))
    }
  }

  return <AuthContext.Provider value={{ ...authState, signIn, signOut }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
