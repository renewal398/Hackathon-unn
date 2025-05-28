"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Leaf, BookOpen, Trophy, User, LogOut, Menu, X } from "lucide-react"
import { useAuth } from "@/components/auth-context"

export default function Dashboard() {
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const stats = {
    lessonsCompleted: user?.completedLessons.length || 0,
    totalLessons: 12,
    nftsEarned: user?.nfts.length || 0,
    carbonSaved: 150,
    level: Math.floor((user?.completedLessons.length || 0) / 3) + 1,
  }

  const recentAchievements = [
    { name: "First Steps", description: "Completed your first lesson", date: "2 days ago" },
    { name: "Quiz Master", description: "Scored 100% on a quiz", date: "1 week ago" },
    { name: "Green Warrior", description: "Completed 5 lessons", date: "2 weeks ago" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
          <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <SidebarContent />
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1 items-center">
              <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <span className="text-sm text-gray-700">Welcome back, {user?.name}!</span>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Dashboard content */}
        <main className="py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Stats cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Lessons Completed</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.lessonsCompleted}/{stats.totalLessons}
                  </div>
                  <Progress value={(stats.lessonsCompleted / stats.totalLessons) * 100} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">NFTs Earned</CardTitle>
                  <Trophy className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.nftsEarned}</div>
                  <p className="text-xs text-muted-foreground">Digital badges collected</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Carbon Saved</CardTitle>
                  <Leaf className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.carbonSaved} kg</div>
                  <p className="text-xs text-muted-foreground">CO₂ equivalent</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Current Level</CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Level {stats.level}</div>
                  <p className="text-xs text-muted-foreground">Green Champion</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent achievements */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Achievements</CardTitle>
                  <CardDescription>Your latest accomplishments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentAchievements.map((achievement, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <Trophy className="h-8 w-8 text-yellow-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{achievement.name}</p>
                          <p className="text-sm text-gray-500">{achievement.description}</p>
                        </div>
                        <div className="flex-shrink-0">
                          <Badge variant="secondary">{achievement.date}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Continue your learning journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Link to="/lessons">
                      <Button className="w-full justify-start" variant="outline">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Continue Learning
                      </Button>
                    </Link>
                    <Link to="/nft-collection">
                      <Button className="w-full justify-start" variant="outline">
                        <Trophy className="h-4 w-4 mr-2" />
                        View NFT Collection
                      </Button>
                    </Link>
                    <Link to="/landing">
                      <Button className="w-full justify-start bg-green-600 hover:bg-green-700">
                        <Leaf className="h-4 w-4 mr-2" />
                        Explore Sustainability
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function SidebarContent() {
  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-2">
      <div className="flex h-16 shrink-0 items-center">
        <Leaf className="h-8 w-8 text-green-600 mr-2" />
        <span className="text-xl font-bold text-gray-900">GreenChain</span>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              <li>
                <Link
                  to="/dashboard"
                  className="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-700 hover:text-green-600 hover:bg-gray-50"
                >
                  <User className="h-6 w-6 shrink-0" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/landing"
                  className="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-700 hover:text-green-600 hover:bg-gray-50"
                >
                  <Leaf className="h-6 w-6 shrink-0" />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/lessons"
                  className="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-700 hover:text-green-600 hover:bg-gray-50"
                >
                  <BookOpen className="h-6 w-6 shrink-0" />
                  Lessons
                </Link>
              </li>
              <li>
                <Link
                  to="/nft-collection"
                  className="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-700 hover:text-green-600 hover:bg-gray-50"
                >
                  <Trophy className="h-6 w-6 shrink-0" />
                  NFT Collection
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  )
}
