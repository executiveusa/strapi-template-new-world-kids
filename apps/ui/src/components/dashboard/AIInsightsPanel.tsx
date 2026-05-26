"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

interface AIInsight {
  id: string
  type: "recommendation" | "prediction" | "alert" | "learning"
  title: string
  description: string
  confidence: number
  priority: "low" | "medium" | "high" | "urgent"
  actionable: boolean
  action?: {
    label: string
    handler: () => void
  }
  timestamp: Date
}

interface AgentActivity {
  agent: string
  status: "idle" | "processing" | "completed"
  lastActivity: string
  tasksCompleted: number
}

export function AIInsightsPanel() {
  const [insights, setInsights] = useState<AIInsight[]>([])
  const [agents, setAgents] = useState<AgentActivity[]>([])
  const [loading, setLoading] = useState(true)

  function generateMockInsights(): AIInsight[] {
    return [
      {
        id: "1",
        type: "recommendation",
        title: "High-Value Grant Opportunity Detected",
        description:
          "The Smith Foundation grant matches your mission with 87% fit score. Deadline in 21 days.",
        confidence: 87,
        priority: "high",
        actionable: true,
        action: {
          label: "Analyze Grant",
          handler: () => console.log("Analyzing grant..."),
        },
        timestamp: new Date(),
      },
      {
        id: "2",
        type: "alert",
        title: "Upcoming Deadline",
        description:
          'Grant application for "Tech Education Fund" due in 5 days. Current status: Drafting',
        confidence: 100,
        priority: "urgent",
        actionable: true,
        action: {
          label: "Review Draft",
          handler: () => console.log("Opening draft..."),
        },
        timestamp: new Date(),
      },
      {
        id: "3",
        type: "learning",
        title: "Pattern Identified",
        description:
          'Grants mentioning "STEM education" and "underserved communities" have 92% success rate for your organization.',
        confidence: 92,
        priority: "medium",
        actionable: false,
        timestamp: new Date(),
      },
      {
        id: "4",
        type: "prediction",
        title: "Timeline Content Suggestion",
        description:
          "Based on recent activities, consider adding a timeline event about your summer program impact.",
        confidence: 78,
        priority: "low",
        actionable: true,
        action: {
          label: "Create Event",
          handler: () => console.log("Creating timeline event..."),
        },
        timestamp: new Date(),
      },
    ]
  }

  function generateMockAgents(): AgentActivity[] {
    return [
      {
        agent: "Hermes (Mission Operator)",
        status: "idle",
        lastActivity: "Monitored grant database 5 min ago",
        tasksCompleted: 47,
      },
      {
        agent: "Grant Hunter",
        status: "processing",
        lastActivity: "Analyzing 3 new grant opportunities",
        tasksCompleted: 23,
      },
      {
        agent: "Content Engine",
        status: "completed",
        lastActivity: "Generated social media content 1 hour ago",
        tasksCompleted: 89,
      },
      {
        agent: "Trust Steward",
        status: "idle",
        lastActivity: "Updated transparency dashboard 2 hours ago",
        tasksCompleted: 34,
      },
    ]
  }

  async function fetchInsights() {
    try {
      const response = await fetch("/api/ai/insights")
      const data = await response.json()
      setInsights(data.insights || generateMockInsights())
    } catch (error) {
      console.error("Error fetching insights:", error)
      setInsights(generateMockInsights())
    }
  }

  async function fetchAgentStatus() {
    try {
      const response = await fetch("/api/ai/agent-status")
      const data = await response.json()
      setAgents(data.agents || generateMockAgents())
    } catch (error) {
      console.error("Error fetching agent status:", error)
      setAgents(generateMockAgents())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    void fetchInsights()
    void fetchAgentStatus()

    const interval = setInterval(() => {
      void fetchInsights()
      void fetchAgentStatus()
    }, 30000)
    /* eslint-enable react-hooks/set-state-in-effect */

    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      urgent: "bg-red-100 text-red-800 border-red-300",
      high: "bg-orange-100 text-orange-800 border-orange-300",
      medium: "bg-yellow-100 text-yellow-800 border-yellow-300",
      low: "bg-blue-100 text-blue-800 border-blue-300",
    }

    return colors[priority] || "bg-gray-100 text-gray-800"
  }

  const getTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      recommendation: "💡",
      prediction: "🔮",
      alert: "⚠️",
      learning: "🧠",
    }

    return icons[type] || "📊"
  }

  const getAgentStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      idle: "bg-gray-400",
      processing: "bg-blue-500 animate-pulse",
      completed: "bg-green-500",
    }

    return colors[status] || "bg-gray-400"
  }

  return (
    <div className="ai-insights-panel">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">🤖</span>
            AI Insights & Agent Activity
          </CardTitle>
          <CardDescription>
            Real-time recommendations and agent status from the AI orchestration
            system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="insights">
            <TabsList className="mb-4">
              <TabsTrigger value="insights">Insights</TabsTrigger>
              <TabsTrigger value="agents">Agents</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="insights" className="space-y-4">
              {loading ? (
                <div className="py-8 text-center text-gray-500">
                  Loading insights...
                </div>
              ) : insights.length === 0 ? (
                <div className="py-8 text-center text-gray-500">
                  No insights available
                </div>
              ) : (
                <AnimatePresence>
                  {insights.map((insight, index) => (
                    <motion.div
                      key={insight.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ delay: index * 0.1 }}
                      className={`insight-card rounded-lg border-l-4 p-4 ${getPriorityColor(insight.priority)}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="mb-2 flex items-center gap-2">
                            <span className="text-2xl">
                              {getTypeIcon(insight.type)}
                            </span>
                            <h3 className="font-semibold">{insight.title}</h3>
                            <Badge variant="outline" className="text-xs">
                              {insight.confidence}% confidence
                            </Badge>
                          </div>
                          <p className="mb-3 text-sm text-gray-700">
                            {insight.description}
                          </p>
                          <span className="text-xs text-gray-500">
                            {insight.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        {insight.actionable && insight.action && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={insight.action.handler}
                            className="ml-4"
                          >
                            {insight.action.label}
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </TabsContent>

            <TabsContent value="agents" className="space-y-4">
              {agents.map((agent, index) => (
                <motion.div
                  key={agent.agent}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="agent-card rounded-lg border p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-3 w-3 rounded-full ${getAgentStatusColor(agent.status)}`}
                      />
                      <div>
                        <h3 className="font-semibold">{agent.agent}</h3>
                        <p className="text-sm text-gray-600">
                          {agent.lastActivity}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">
                        {agent.tasksCompleted}
                      </div>
                      <div className="text-xs text-gray-500">
                        Tasks Completed
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="analytics">
              <div className="analytics-grid grid grid-cols-1 gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Total Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{insights.length}</div>
                    <p className="mt-1 text-xs text-gray-500">Last 24 hours</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">
                      Average Confidence
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600">
                      {Math.round(
                        insights.reduce((sum, i) => sum + i.confidence, 0) /
                          insights.length || 0
                      )}
                      %
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Across all insights
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Active Agents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600">
                      {agents.filter((a) => a.status === "processing").length}
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Currently working
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <style jsx>{`
        .ai-insights-panel {
          width: 100%;
        }

        .insight-card {
          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .insight-card:hover {
          transform: translateX(4px);
        }

        .agent-card {
          transition: all 0.2s ease;
        }

        .agent-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  )
}

export default AIInsightsPanel
