import { create } from "zustand"
import { persist } from "zustand/middleware"

export type UserRole = "admin" | "user"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  department?: string
  year?: string
  rollNumber?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string, role: UserRole) => Promise<boolean>
  logout: () => void
  register: (userData: Omit<User, "id"> & { password: string }) => Promise<boolean>
}

// Mock user data for demonstration
const mockUsers = [
  {
    id: "1",
    email: "admin@kec.edu",
    password: "admin123",
    name: "Admin User",
    role: "admin" as UserRole,
  },
  {
    id: "2",
    email: "student@kec.edu",
    password: "student123",
    name: "John Doe",
    role: "user" as UserRole,
    department: "Computer Science",
    year: "3rd Year",
    rollNumber: "CS21001",
  },
]

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string, role: UserRole) => {
        // Mock authentication logic
        const user = mockUsers.find((u) => u.email === email && u.password === password && u.role === role)

        if (user) {
          const { password: _, ...userWithoutPassword } = user
          set({ user: userWithoutPassword, isAuthenticated: true })
          return true
        }
        return false
      },
      logout: () => {
        set({ user: null, isAuthenticated: false })
      },
      register: async (userData) => {
        // Mock registration logic
        const newUser = {
          ...userData,
          id: Date.now().toString(),
        }
        const { password: _, ...userWithoutPassword } = newUser
        set({ user: userWithoutPassword, isAuthenticated: true })
        return true
      },
    }),
    {
      name: "kec-auth-storage",
    },
  ),
)
