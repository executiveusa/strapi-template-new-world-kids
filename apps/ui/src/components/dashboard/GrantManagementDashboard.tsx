"use client"

import { motion } from "framer-motion"
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
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"

interface Grant {
  id: string
  grantName: string
  funderOrganization: string
  fundingAmount: number
  deadline: string
  status: string
  priority: string
  fitScore?: number
  aiGeneratedContent?: any
}

export function GrantManagementDashboard() {
  const [grants, setGrants] = useState<Grant[]>([])
  const [filter, setFilter] = useState<string>("all")
  const [loading, setLoading] = useState(true)

  async function fetchGrants() {
    try {
      setLoading(true)
      const response = await fetch("/api/grants")
      const data = await response.json()
      setGrants(data.grants || [])
    } catch (error) {
      console.error("Error fetching grants:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    void fetchGrants()
  }, [])

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      discovered: "bg-blue-100 text-blue-800",
      researching: "bg-purple-100 text-purple-800",
      drafting: "bg-yellow-100 text-yellow-800",
      submitted: "bg-green-100 text-green-800",
      "under-review": "bg-orange-100 text-orange-800",
      awarded: "bg-emerald-100 text-emerald-800",
      rejected: "bg-red-100 text-red-800",
      withdrawn: "bg-gray-100 text-gray-800",
    }

    return colors[status] || "bg-gray-100 text-gray-800"
  }

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      urgent: "bg-red-500",
      high: "bg-orange-500",
      medium: "bg-yellow-500",
      low: "bg-gray-400",
    }

    return colors[priority] || "bg-gray-400"
  }

  const filteredGrants =
    filter === "all" ? grants : grants.filter((g) => g.status === filter)

  const stats = {
    total: grants.length,
    discovered: grants.filter((g) => g.status === "discovered").length,
    inProgress: grants.filter((g) =>
      ["researching", "drafting"].includes(g.status)
    ).length,
    submitted: grants.filter((g) => g.status === "submitted").length,
    awarded: grants.filter((g) => g.status === "awarded").length,
    totalFunding: grants
      .filter((g) => g.status === "awarded")
      .reduce((sum, g) => sum + (g.fundingAmount || 0), 0),
  }

  return (
    <div className="grant-dashboard">
      <div className="dashboard-header">
        <h1 className="mb-2 text-3xl font-bold">Grant Management</h1>
        <p className="mb-6 text-gray-600">
          AI-powered grant discovery and application system
        </p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Grants
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">
                In Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {stats.inProgress}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">
                Submitted
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {stats.submitted}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Funding
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-600">
                ${stats.totalFunding.toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Grants Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Grant Applications</CardTitle>
              <CardDescription>
                Manage and track all grant opportunities
              </CardDescription>
            </div>
            <Button
              onClick={() => (window.location.href = "/dashboard/grants/new")}
            >
              + New Grant
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={filter} onValueChange={setFilter}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
              <TabsTrigger value="discovered">
                Discovered ({stats.discovered})
              </TabsTrigger>
              <TabsTrigger value="drafting">Drafting</TabsTrigger>
              <TabsTrigger value="submitted">
                Submitted ({stats.submitted})
              </TabsTrigger>
              <TabsTrigger value="awarded">
                Awarded ({stats.awarded})
              </TabsTrigger>
            </TabsList>

            <div className="grants-list space-y-4">
              {loading ? (
                <div className="py-8 text-center text-gray-500">
                  Loading grants...
                </div>
              ) : filteredGrants.length === 0 ? (
                <div className="py-8 text-center text-gray-500">
                  No grants found
                </div>
              ) : (
                filteredGrants.map((grant, index) => (
                  <motion.div
                    key={grant.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="grant-card rounded-lg border p-4 transition-shadow hover:shadow-md"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <div
                            className={`h-8 w-1 rounded ${getPriorityColor(grant.priority)}`}
                          />
                          <div>
                            <h3 className="text-lg font-semibold">
                              {grant.grantName}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {grant.funderOrganization}
                            </p>
                          </div>
                        </div>

                        <div className="mt-2 flex gap-4 text-sm text-gray-600">
                          <span>
                            💰 ${grant.fundingAmount.toLocaleString()}
                          </span>
                          <span>
                            📅 Deadline:{" "}
                            {new Date(grant.deadline).toLocaleDateString()}
                          </span>
                          {grant.fitScore && (
                            <span>🎯 Fit: {grant.fitScore}%</span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <Badge className={getStatusColor(grant.status)}>
                          {grant.status.replace("-", " ").toUpperCase()}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            (window.location.href = `/dashboard/grants/${grant.id}`)
                          }
                        >
                          View Details
                        </Button>
                      </div>
                    </div>

                    {grant.aiGeneratedContent && (
                      <div className="mt-3 rounded-md bg-purple-50 p-3">
                        <span className="text-xs font-semibold text-purple-700">
                          ✨ AI Insights Available
                        </span>
                      </div>
                    )}
                  </motion.div>
                ))
              )}
            </div>
          </Tabs>
        </CardContent>
      </Card>

      <style jsx>{`
        .grant-dashboard {
          padding: 24px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .dashboard-header {
          margin-bottom: 32px;
        }

        .stats-grid {
          margin-bottom: 32px;
        }

        .grant-card {
          transition: all 0.2s ease;
        }

        .grant-card:hover {
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  )
}

export default GrantManagementDashboard
