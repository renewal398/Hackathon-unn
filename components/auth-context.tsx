"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  email: string
  name: string
  nfts: NFT[]
  completedLessons: string[]
  badges: string[]
}

interface NFT {
  id: string
  name: string
  image: string
  description: string
  rarity: "common" | "rare" | "epic" | "legendary"
  earnedDate: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, name: string) => Promise<boolean>
  logout: () => void
  updateUser: (updates: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Only run on client side
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("greenchain_user")
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser))
        } catch (error) {
          console.error("Error parsing saved user:", error)
          localStorage.removeItem("greenchain_user")
        }
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (email && password) {
      const newUser: User = {
        id: "1",
        email,
        name: email.split("@")[0],
        nfts: [
          {
            id: "1",
            name: "Green Starter Badge",
            image: "/placeholder.svg?height=200&width=200",
            description: "Welcome to GreenChain!",
            rarity: "common",
            earnedDate: new Date().toISOString(),
          },
        ],
        completedLessons: [],
        badges: ["starter"],
      }
      setUser(newUser)
      if (typeof window !== "undefined") {
        localStorage.setItem("greenchain_user", JSON.stringify(newUser))
      }
      setLoading(false)
      return true
    }
    setLoading(false)
    return false
  }

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (email && password && name) {
      const newUser: User = {
        id: "1",
        email,
        name,
        nfts: [
          {
            id: "1",
            name: "Green Starter Badge",
            image: "/placeholder.svg?height=200&width=200",
            description: "Welcome to GreenChain!",
            rarity: "common",
            earnedDate: new Date().toISOString(),
          },
        ],
        completedLessons: [],
        badges: ["starter"],
      }
      setUser(newUser)
      if (typeof window !== "undefined") {
        localStorage.setItem("greenchain_user", JSON.stringify(newUser))
      }
      setLoading(false)
      return true
    }
    setLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    if (typeof window !== "undefined") {
      localStorage.removeItem("greenchain_user")
    }
  }

  const updateUser = (updates: Partial<User>) => {
    if (user && typeof window !== "undefined") {
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      localStorage.setItem("greenchain_user", JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
