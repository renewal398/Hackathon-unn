"use client"

import { useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Clock, Trophy } from "lucide-react"

const lessonContent = {
  "1": {
    title: "What is Climate Change?",
    duration: "15 min",
    difficulty: "Beginner",
    sections: [
      {
        title: "Introduction to Climate Change",
        content: `Climate change refers to long-term shifts in global or regional climate patterns. It's primarily attributed to increased levels of greenhouse gases in the atmosphere, particularly carbon dioxide from burning fossil fuels.

The Earth's climate has always varied naturally, but the current rate of change is unprecedented in human history. Since the mid-20th century, scientists have observed warming temperatures, changing precipitation patterns, and more frequent extreme weather events.`,
      },
      {
        title: "Causes of Climate Change",
        content: `The primary cause of current climate change is human activities, particularly:

• **Burning Fossil Fuels**: Coal, oil, and natural gas release carbon dioxide when burned for electricity, heat, and transportation.

• **Deforestation**: Trees absorb CO₂, so cutting them down reduces the Earth's capacity to absorb these gases.

• **Industrial Processes**: Manufacturing and chemical processes release various greenhouse gases.

• **Agriculture**: Livestock produce methane, and certain farming practices release nitrous oxide.`,
      },
      {
        title: "Effects and Impacts",
        content: `Climate change affects our planet in numerous ways:

• **Rising Temperatures**: Global average temperatures have increased by about 1.1°C since pre-industrial times.

• **Sea Level Rise**: Thermal expansion of oceans and melting ice sheets cause sea levels to rise.

• **Extreme Weather**: More frequent and intense hurricanes, droughts, floods, and heatwaves.

• **Ecosystem Disruption**: Changes in habitats affect wildlife migration patterns and biodiversity.

• **Human Impact**: Threats to food security, water resources, and human health.`,
      },
    ],
  },
}

export default function LessonDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [currentSection, setCurrentSection] = useState(0)

  const lesson = lessonContent[id as keyof typeof lessonContent]

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Lesson Not Found</CardTitle>
            <CardDescription>The requested lesson could not be found.</CardDescription>
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

  const progress = ((currentSection + 1) / lesson.sections.length) * 100
  const isLastSection = currentSection === lesson.sections.length - 1

  const handleNext = () => {
    if (isLastSection) {
      navigate(`/quiz/${id}`)
    } else {
      setCurrentSection(currentSection + 1)
    }
  }

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <Link to="/lessons">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Lessons
              </Button>
            </Link>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">{lesson.difficulty}</Badge>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-1" />
                {lesson.duration}
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">{lesson.title}</h1>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>
                Section {currentSection + 1} of {lesson.sections.length}
              </span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">{lesson.sections[currentSection].title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg max-w-none">
              {lesson.sections[currentSection].content.split("\n\n").map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                  {paragraph.split("\n").map((line, lineIndex) => (
                    <span key={lineIndex}>
                      {line}
                      {lineIndex < paragraph.split("\n").length - 1 && <br />}
                    </span>
                  ))}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={handlePrevious} disabled={currentSection === 0}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <div className="flex space-x-2">
            {lesson.sections.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentSection ? "bg-green-600" : index < currentSection ? "bg-green-300" : "bg-gray-300"
                }`}
                onClick={() => setCurrentSection(index)}
              />
            ))}
          </div>

          <Button onClick={handleNext} className="bg-green-600 hover:bg-green-700">
            {isLastSection ? (
              <>
                Take Quiz
                <Trophy className="h-4 w-4 ml-2" />
              </>
            ) : (
              <>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
