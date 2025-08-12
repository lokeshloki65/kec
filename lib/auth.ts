// Authentication utilities and types
export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "user"
  department?: string
  year?: string
  rollNumber?: string
  avatar?: string
  createdAt: Date
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

// Mock authentication - replace with real auth service
export const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@kec.edu.in",
    name: "Dr. Admin Kumar",
    role: "admin",
    department: "Computer Science",
    avatar: "/admin-interface.png",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    email: "student@kec.edu.in",
    name: "Rajesh Kumar",
    role: "user",
    department: "Computer Science",
    year: "3rd Year",
    rollNumber: "21CS001",
    avatar: "/diverse-students-studying.png",
    createdAt: new Date("2024-01-15"),
  },
]

export async function signIn(email: string, password: string): Promise<User | null> {
  // Mock authentication logic
  await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call

  const user = mockUsers.find((u) => u.email === email)
  if (user && password === "password123") {
    return user
  }
  return null
}

export async function signOut(): Promise<void> {
  // Mock sign out
  await new Promise((resolve) => setTimeout(resolve, 500))
}

export function getStoredUser(): User | null {
  if (typeof window === "undefined") return null

  try {
    const stored = localStorage.getItem("kec-user")
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

export function storeUser(user: User): void {
  if (typeof window === "undefined") return
  localStorage.setItem("kec-user", JSON.stringify(user))
}

export function clearStoredUser(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem("kec-user")
}
