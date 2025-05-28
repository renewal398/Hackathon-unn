"use client"

import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, Trophy, CheckCircle, Lock, ArrowLeft } from "lucide-react"
import { useAuth } from "@/components/auth-context"

const lessons = [
  {
    id: "1",
    title: "What is Climate Change?",
    description: "Understanding the basics of climate change, its causes, and global impact on our planet.",
    duration: "15 min",
    difficulty: "Beginner",
    completed: false,
    locked: false,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "2",
    title: "Renewable Energy Sources",
    description: "Explore solar, wind, hydro, and other renewable energy technologies.",
    duration: "20 min",
    difficulty: "Beginner",
    completed: false,
    locked: false,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "3",
    title: "Sustainable Transportation",
    description: "Learn about eco-friendly transportation options and their environmental benefits.",
    duration: "18 min",
    difficulty: "Intermediate",
    completed: false,
    locked: false,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "4",
    title: "Waste Reduction Strategies",
    description: "Discover effective methods to reduce, reuse, and recycle in daily life.",
    duration: "22 min",
    difficulty: "Beginner",
    completed: false,
    locked: true,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "5",
    title: "Green Building Design",
    description: "Understanding sustainable architecture and eco-friendly construction practices.",
    duration: "25 min",
    difficulty: "Advanced",
    completed: false,
    locked: true,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "6",
    title: "Carbon Footprint Calculation",
    description: "Learn how to measure and reduce your personal carbon footprint.",
    duration: "20 min",
    difficulty: "Intermediate",
    completed: false,
    locked: true,
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function LessonsPage() {
  const { user } = useAuth()
  const completedLessons = user?.completedLessons || []
  const totalLessons = lessons.length
  const completedCount = completedLessons.length
  const progressPercentage = (completedCount / totalLessons) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Sustainability Lessons</h1>
                <p className="text-gray-600 mt-1">Learn about environmental protection and earn rewards</p>
              </div>
            </div>
          </div>

          {/* Progress Overview */}
          <div className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Your Progress</CardTitle>
                    <CardDescription>
                      {completedCount} of {totalLessons} lessons completed
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    {Math.round(progressPercentage)}% Complete
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Progress value={progressPercentage} className="h-3" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => {
            const isCompleted = completedLessons.includes(lesson.id)
            const isLocked = lesson.locked && !isCompleted

            return (
              <Card
                key={lesson.id}
                className={`relative overflow-hidden transition-all hover:shadow-lg ${isLocked ? "opacity-60" : ""}`}
              >
                {isLocked && (
                  <div className="absolute top-4 right-4 z-10">
                    <Lock className="h-6 w-6 text-gray-400" />
                  </div>
                )}
                {isCompleted && (
                  <div className="absolute top-4 right-4 z-10">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                )}

                <div className="aspect-video bg-gray-200 relative">
                  <img
                    src={lesson.image || "/placeholder.svg"}
                    alt={lesson.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <Badge variant="secondary" className="bg-white/90 text-gray-900">
                      {lesson.difficulty}
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-lg">{lesson.title}</CardTitle>
                  <CardDescription className="text-sm">{lesson.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      {lesson.duration}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <BookOpen className="h-4 w-4 mr-1" />
                      Lesson
                    </div>
                  </div>

                  {isLocked ? (
                    <Button disabled className="w-full">
                      <Lock className="h-4 w-4 mr-2" />
                      Locked
                    </Button>
                  ) : isCompleted ? (
                    <div className="space-y-2">
                      <Link to={`/lesson/${lesson.id}`}>
                        <Button variant="outline" className="w-full">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Review Lesson
                        </Button>
                      </Link>
                      <Badge variant="secondary" className="w-full justify-center py-2">
                        <Trophy className="h-4 w-4 mr-2" />
                        Completed
                      </Badge>
                    </div>
                  ) : (
                    <Link to={`/lesson/${lesson.id}`}>
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Start Lesson
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
