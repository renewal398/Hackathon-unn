"use client"

import { useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Trophy, CheckCircle, XCircle } from "lucide-react"
import { useAuth } from "@/components/auth-context"

const quizData = {
  "1": {
    title: "Climate Change Quiz",
    questions: [
      {
        id: 1,
        question: "What is the primary cause of climate change?",
        options: ["Deforestation", "Plastic pollution", "Carbon emissions", "Overfishing"],
        correct: 2,
        explanation: "Carbon emissions from burning fossil fuels are the primary driver of current climate change.",
      },
      {
        id: 2,
        question: "Which greenhouse gas is most abundant in the atmosphere?",
        options: ["Carbon dioxide (CO₂)", "Methane (CH₄)", "Nitrous oxide (N₂O)", "Fluorinated gases"],
        correct: 0,
        explanation: "Carbon dioxide makes up about 76% of all greenhouse gas emissions.",
      },
      {
        id: 3,
        question: "What is the global temperature increase since pre-industrial times?",
        options: ["About 0.5°C", "About 1.1°C", "About 2.0°C", "About 3.0°C"],
        correct: 1,
        explanation: "Global temperatures have increased by approximately 1.1°C since the late 1800s.",
      },
    ],
  },
}

export default function QuizPage() {
  const { lessonId } = useParams()
  const navigate = useNavigate()
  const { user, updateUser } = useAuth()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const quiz = quizData[lessonId as keyof typeof quizData]

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Quiz Not Found</CardTitle>
            <CardDescription>The requested quiz could not be found.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/lessons">
              <Button>Back to Lessons</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100
  const currentQ = quiz.questions[currentQuestion]

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const calculateScore = () => {
    let correct = 0
    quiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct) {
        correct++
      }
    })
    return correct
  }

  const handleCompleteQuiz = () => {
    const score = calculateScore()
    const percentage = (score / quiz.questions.length) * 100

    if (percentage >= 70 && user) {
      // Add lesson to completed lessons
      const updatedCompletedLessons = [...(user.completedLessons || []), lessonId!]

      // Add new NFT reward
      const newNFT = {
        id: `nft-${lessonId}-${Date.now()}`,
        name: `Climate Change Expert Badge`,
        image: "/placeholder.svg?height=200&width=200",
        description: `Earned by completing the Climate Change lesson with ${percentage}% score`,
        rarity: percentage === 100 ? ("epic" as const) : ("rare" as const),
        earnedDate: new Date().toISOString(),
      }

      const updatedNFTs = [...(user.nfts || []), newNFT]

      updateUser({
        completedLessons: updatedCompletedLessons,
        nfts: updatedNFTs,
      })
    }

    setQuizCompleted(true)
  }

  const score = calculateScore()
  const percentage = (score / quiz.questions.length) * 100

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Trophy className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-3xl">Congratulations!</CardTitle>
            <CardDescription className="text-lg">
              {percentage >= 70 ? "You earned a Green Badge NFT!" : "Quiz completed!"}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="text-6xl font-bold text-green-600">
              {score}/{quiz.questions.length}
            </div>
            <p className="text-xl text-gray-600">You scored {percentage}% on this quiz</p>
            {percentage >= 70 && (
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-green-800 font-medium">🎉 You've earned a new NFT badge for your achievement!</p>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/nft-collection">
                <Button className="bg-green-600 hover:bg-green-700">View Profile</Button>
              </Link>
              <Link to="/lessons">
                <Button variant="outline">Continue Learning</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Quiz Results</CardTitle>
              <CardDescription>
                You scored {score} out of {quiz.questions.length} questions correctly ({percentage}%)
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="space-y-6">
            {quiz.questions.map((question, index) => {
              const userAnswer = selectedAnswers[index]
              const isCorrect = userAnswer === question.correct

              return (
                <Card key={question.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">
                        Question {index + 1}: {question.question}
                      </CardTitle>
                      {isCorrect ? (
                        <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                      ) : (
                        <XCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      {question.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className={`p-3 rounded-lg border ${
                            optionIndex === question.correct
                              ? "bg-green-50 border-green-200"
                              : optionIndex === userAnswer && !isCorrect
                                ? "bg-red-50 border-red-200"
                                : "bg-gray-50 border-gray-200"
                          }`}
                        >
                          <div className="flex items-center">
                            <span className="font-medium mr-2">{String.fromCharCode(65 + optionIndex)}.</span>
                            {option}
                            {optionIndex === question.correct && (
                              <CheckCircle className="h-4 w-4 text-green-600 ml-auto" />
                            )}
                            {optionIndex === userAnswer && !isCorrect && (
                              <XCircle className="h-4 w-4 text-red-600 ml-auto" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Explanation:</strong> {question.explanation}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="mt-8 text-center">
            <Button onClick={handleCompleteQuiz} className="bg-green-600 hover:bg-green-700">
              Complete Quiz
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <Link to={`/lesson/${lessonId}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Lesson
              </Button>
            </Link>
            <Badge variant="secondary">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </Badge>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">{quiz.title}</h1>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>
                Question {currentQuestion + 1} of {quiz.questions.length}
              </span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{currentQ.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedAnswers[currentQuestion]?.toString()}
              onValueChange={(value) => handleAnswerSelect(Number.parseInt(value))}
            >
              {currentQ.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
            Previous
          </Button>

          <Button
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestion] === undefined}
            className="bg-green-600 hover:bg-green-700"
          >
            {currentQuestion === quiz.questions.length - 1 ? "Submit Answer" : "Next Question"}
          </Button>
        </div>
      </div>
    </div>
  )
}
