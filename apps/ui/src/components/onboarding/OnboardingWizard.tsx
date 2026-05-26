"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"

interface OnboardingStep {
  id: string
  title: string
  description: string
  icon: string
}

interface OnboardingData {
  organizationName: string
  mission: string
  targetPopulation: string
  fundingGoals: string
  achievements: string[]
  contactEmail: string
  skipUsername?: string
  skipPassword?: string
  geminiApiKey?: string
}

export function OnboardingWizard({
  onComplete,
}: {
  onComplete?: (data: OnboardingData) => void
}) {
  const [currentStep, setCurrentStep] = useState(0)
  const [data, setData] = useState<OnboardingData>({
    organizationName: "",
    mission: "",
    targetPopulation: "",
    fundingGoals: "",
    achievements: [],
    contactEmail: "",
  })

  const steps: OnboardingStep[] = [
    {
      id: "welcome",
      title: "Welcome to AI-Powered Grant Management",
      description:
        "Let's set up your organization profile to unlock intelligent grant discovery and automation.",
      icon: "👋",
    },
    {
      id: "organization",
      title: "Organization Details",
      description:
        "Tell us about your nonprofit so our AI can find the best grant opportunities.",
      icon: "🏢",
    },
    {
      id: "mission",
      title: "Mission & Impact",
      description:
        "Share your mission and achievements to help AI match you with aligned funders.",
      icon: "🎯",
    },
    {
      id: "automation",
      title: "Automation Setup",
      description:
        "Configure optional automation features for grant applications.",
      icon: "⚙️",
    },
    {
      id: "complete",
      title: "All Set!",
      description:
        "Your AI-powered grant system is ready to discover opportunities.",
      icon: "🎉",
    },
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Complete onboarding
      if (onComplete) {
        onComplete(data)
      }
      saveOnboardingData()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateData = (field: keyof OnboardingData, value: any) => {
    setData({ ...data, [field]: value })
  }

  const saveOnboardingData = async () => {
    try {
      await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
    } catch (error) {
      console.error("Error saving onboarding data:", error)
    }
  }

  const isStepValid = () => {
    switch (steps[currentStep].id) {
      case "organization":
        return data.organizationName && data.contactEmail
      case "mission":
        return data.mission && data.targetPopulation

      default:
        return true
    }
  }

  return (
    <div className="onboarding-wizard mx-auto max-w-3xl p-6">
      {/* Progress Bar */}
      <div className="progress-bar mb-8">
        <div className="mb-2 flex justify-between">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`step-indicator flex flex-col items-center ${
                index <= currentStep ? "active" : "inactive"
              }`}
            >
              <div
                className={`step-circle flex h-10 w-10 items-center justify-center rounded-full ${
                  index < currentStep
                    ? "bg-green-500 text-white"
                    : index === currentStep
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-500"
                }`}
              >
                {index < currentStep ? "✓" : index + 1}
              </div>
              <span className="mt-1 hidden text-xs md:block">
                {step.title.split(" ")[0]}
              </span>
            </div>
          ))}
        </div>
        <div className="progress-track h-2 overflow-hidden rounded-full bg-gray-200">
          <motion.div
            className="progress-fill h-full bg-blue-500"
            initial={{ width: "0%" }}
            animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <div className="mb-4 text-6xl">{steps[currentStep].icon}</div>
              <CardTitle>{steps[currentStep].title}</CardTitle>
              <CardDescription>
                {steps[currentStep].description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Welcome Step */}
              {steps[currentStep].id === "welcome" && (
                <div className="space-y-4">
                  <h3 className="mb-3 text-lg font-semibold">
                    What you&apos;ll get:
                  </h3>
                  <div className="features-list space-y-3">
                    <div className="feature-item flex items-start gap-3">
                      <span className="text-2xl">🔍</span>
                      <div>
                        <h4 className="font-semibold">
                          AI-Powered Grant Discovery
                        </h4>
                        <p className="text-sm text-gray-600">
                          Automatically find grants that match your mission with
                          high fit scores
                        </p>
                      </div>
                    </div>
                    <div className="feature-item flex items-start gap-3">
                      <span className="text-2xl">✍️</span>
                      <div>
                        <h4 className="font-semibold">
                          Intelligent Application Drafting
                        </h4>
                        <p className="text-sm text-gray-600">
                          Generate compelling letters of intent and applications
                          using Gemini AI
                        </p>
                      </div>
                    </div>
                    <div className="feature-item flex items-start gap-3">
                      <span className="text-2xl">🤖</span>
                      <div>
                        <h4 className="font-semibold">Automated Submissions</h4>
                        <p className="text-sm text-gray-600">
                          Schedule and automate grant submissions to platforms
                          like Skip
                        </p>
                      </div>
                    </div>
                    <div className="feature-item flex items-start gap-3">
                      <span className="text-2xl">📊</span>
                      <div>
                        <h4 className="font-semibold">Real-Time Insights</h4>
                        <p className="text-sm text-gray-600">
                          Get AI-powered recommendations and deadline alerts
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Organization Step */}
              {steps[currentStep].id === "organization" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="orgName">Organization Name *</Label>
                    <Input
                      id="orgName"
                      value={data.organizationName}
                      onChange={(e) =>
                        updateData("organizationName", e.target.value)
                      }
                      placeholder="New World Kids"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Contact Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={data.contactEmail}
                      onChange={(e) =>
                        updateData("contactEmail", e.target.value)
                      }
                      placeholder="grants@newworldkids.org"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fundingGoals">Annual Funding Goals</Label>
                    <Input
                      id="fundingGoals"
                      value={data.fundingGoals}
                      onChange={(e) =>
                        updateData("fundingGoals", e.target.value)
                      }
                      placeholder="$250,000"
                    />
                  </div>
                </div>
              )}

              {/* Mission Step */}
              {steps[currentStep].id === "mission" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="mission">Organization Mission *</Label>
                    <Textarea
                      id="mission"
                      value={data.mission}
                      onChange={(e) => updateData("mission", e.target.value)}
                      placeholder="Empowering underserved youth through technology education..."
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label htmlFor="targetPop">Target Population *</Label>
                    <Input
                      id="targetPop"
                      value={data.targetPopulation}
                      onChange={(e) =>
                        updateData("targetPopulation", e.target.value)
                      }
                      placeholder="Underserved youth ages 5-18"
                    />
                  </div>
                  <div>
                    <Label htmlFor="achievements">
                      Key Achievements (one per line)
                    </Label>
                    <Textarea
                      id="achievements"
                      value={data.achievements.join("\n")}
                      onChange={(e) =>
                        updateData("achievements", e.target.value.split("\n"))
                      }
                      placeholder="Served 500+ students in 2023&#10;90% program completion rate&#10;Partnership with 15 schools"
                      rows={4}
                    />
                  </div>
                </div>
              )}

              {/* Automation Step */}
              {steps[currentStep].id === "automation" && (
                <div className="space-y-4">
                  <p className="mb-4 text-sm text-gray-600">
                    These settings are optional but unlock powerful automation
                    features.
                  </p>
                  <div>
                    <Label htmlFor="geminiKey">Gemini API Key (Optional)</Label>
                    <Input
                      id="geminiKey"
                      type="password"
                      value={data.geminiApiKey || ""}
                      onChange={(e) =>
                        updateData("geminiApiKey", e.target.value)
                      }
                      placeholder="Your Gemini API key for AI features"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Get your API key from{" "}
                      <a
                        href="https://ai.google.dev/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        Google AI Studio
                      </a>
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="skipUser">
                      Skip Platform Username (Optional)
                    </Label>
                    <Input
                      id="skipUser"
                      value={data.skipUsername || ""}
                      onChange={(e) =>
                        updateData("skipUsername", e.target.value)
                      }
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="skipPass">
                      Skip Platform Password (Optional)
                    </Label>
                    <Input
                      id="skipPass"
                      type="password"
                      value={data.skipPassword || ""}
                      onChange={(e) =>
                        updateData("skipPassword", e.target.value)
                      }
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              )}

              {/* Complete Step */}
              {steps[currentStep].id === "complete" && (
                <div className="space-y-4 text-center">
                  <div className="checkmark-animation mb-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", duration: 0.5 }}
                      className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100"
                    >
                      <span className="text-5xl">✓</span>
                    </motion.div>
                  </div>
                  <h3 className="text-xl font-semibold">
                    Your AI Grant System is Ready!
                  </h3>
                  <p className="text-gray-600">
                    Our AI agents are now analyzing grant opportunities and will
                    notify you of high-value matches.
                  </p>
                  <div className="next-steps mt-6 rounded-lg bg-blue-50 p-4">
                    <h4 className="mb-2 font-semibold">Next Steps:</h4>
                    <ul className="space-y-2 text-left text-sm">
                      <li>
                        ✓ Explore the grant dashboard to see discovered
                        opportunities
                      </li>
                      <li>✓ Review AI insights and recommendations</li>
                      <li>
                        ✓ Add your first grant manually or let AI discover them
                      </li>
                      <li>✓ Set up timeline events to showcase your impact</li>
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="mt-6 flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          Previous
        </Button>
        <Button onClick={handleNext} disabled={!isStepValid()}>
          {currentStep === steps.length - 1 ? "Get Started" : "Next"}
        </Button>
      </div>

      <style jsx>{`
        .step-indicator {
          flex: 1;
          position: relative;
        }

        .step-indicator:not(:last-child)::after {
          content: "";
          position: absolute;
          top: 20px;
          left: 50%;
          width: 100%;
          height: 2px;
          background: #e5e7eb;
          z-index: -1;
        }

        .step-indicator.active:not(:last-child)::after {
          background: #3b82f6;
        }
      `}</style>
    </div>
  )
}

export default OnboardingWizard
