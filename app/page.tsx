"use client"
import { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "@/components/login-page"
import RegisterPage from "@/components/register-page"
import Dashboard from "@/components/dashboard"
import LandingPage from "@/components/landing-page"
import LessonsPage from "@/components/lessons-page"
import LessonDetail from "@/components/lesson-detail"
import QuizPage from "@/components/quiz-page"
import NFTCollection from "@/components/nft-collection"
import LoadingSpinner from "@/components/loading-spinner"
import { AuthProvider, useAuth } from "@/components/auth-context"

function AppContent() {
  const { user, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <Routes>
      <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/dashboard" />} />
      <Route path="/register" element={!user ? <RegisterPage /> : <Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/landing" element={user ? <LandingPage /> : <Navigate to="/login" />} />
      <Route path="/lessons" element={user ? <LessonsPage /> : <Navigate to="/login" />} />
      <Route path="/lesson/:id" element={user ? <LessonDetail /> : <Navigate to="/login" />} />
      <Route path="/quiz/:lessonId" element={user ? <QuizPage /> : <Navigate to="/login" />} />
      <Route path="/nft-collection" element={user ? <NFTCollection /> : <Navigate to="/login" />} />
      <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
    </Routes>
  )
}

export default function App() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Show loading spinner during hydration
  if (!isClient) {
    return <LoadingSpinner />
  }

  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <AppContent />
        </div>
      </AuthProvider>
    </Router>
  )
}
