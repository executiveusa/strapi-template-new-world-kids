'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

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
  const [filter, setFilter] = useState<string>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGrants()
  }, [])

  const fetchGrants = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/grants')
      const data = await response.json()
      setGrants(data.grants || [])
    } catch (error) {
      console.error('Error fetching grants:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'discovered': 'bg-blue-100 text-blue-800',
      'researching': 'bg-purple-100 text-purple-800',
      'drafting': 'bg-yellow-100 text-yellow-800',
      'submitted': 'bg-green-100 text-green-800',
      'under-review': 'bg-orange-100 text-orange-800',
      'awarded': 'bg-emerald-100 text-emerald-800',
      'rejected': 'bg-red-100 text-red-800',
      'withdrawn': 'bg-gray-100 text-gray-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      'urgent': 'bg-red-500',
      'high': 'bg-orange-500',
      'medium': 'bg-yellow-500',
      'low': 'bg-gray-400',
    }
    return colors[priority] || 'bg-gray-400'
  }

  const filteredGrants = filter === 'all'
    ? grants
    : grants.filter(g => g.status === filter)

  const stats = {
    total: grants.length,
    discovered: grants.filter(g => g.status === 'discovered').length,
    inProgress: grants.filter(g => ['researching', 'drafting'].includes(g.status)).length,
    submitted: grants.filter(g => g.status === 'submitted').length,
    awarded: grants.filter(g => g.status === 'awarded').length,
    totalFunding: grants.filter(g => g.status === 'awarded').reduce((sum, g) => sum + (g.fundingAmount || 0), 0),
  }

  return (
    <div className="grant-dashboard">
      <div className="dashboard-header">
        <h1 className="text-3xl font-bold mb-2">Grant Management</h1>
        <p className="text-gray-600 mb-6">AI-powered grant discovery and application system</p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">Total Grants</CardTitle>
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
              <CardTitle className="text-sm font-medium text-gray-600">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{stats.inProgress}</div>
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
              <CardTitle className="text-sm font-medium text-gray-600">Submitted</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{stats.submitted}</div>
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
              <CardTitle className="text-sm font-medium text-gray-600">Total Funding</CardTitle>
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
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Grant Applications</CardTitle>
              <CardDescription>Manage and track all grant opportunities</CardDescription>
            </div>
            <Button onClick={() => window.location.href = '/dashboard/grants/new'}>
              + New Grant
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={filter} onValueChange={setFilter}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
              <TabsTrigger value="discovered">Discovered ({stats.discovered})</TabsTrigger>
              <TabsTrigger value="drafting">Drafting</TabsTrigger>
              <TabsTrigger value="submitted">Submitted ({stats.submitted})</TabsTrigger>
              <TabsTrigger value="awarded">Awarded ({stats.awarded})</TabsTrigger>
            </TabsList>

            <div className="grants-list space-y-4">
              {loading ? (
                <div className="text-center py-8 text-gray-500">Loading grants...</div>
              ) : filteredGrants.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No grants found</div>
              ) : (
                filteredGrants.map((grant, index) => (
                  <motion.div
                    key={grant.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="grant-card border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div
                            className={`w-1 h-8 rounded ${getPriorityColor(grant.priority)}`}
                          />
                          <div>
                            <h3 className="font-semibold text-lg">{grant.grantName}</h3>
                            <p className="text-sm text-gray-600">{grant.funderOrganization}</p>
                          </div>
                        </div>

                        <div className="flex gap-4 text-sm text-gray-600 mt-2">
                          <span>💰 ${grant.fundingAmount.toLocaleString()}</span>
                          <span>📅 Deadline: {new Date(grant.deadline).toLocaleDateString()}</span>
                          {grant.fitScore && (
                            <span>🎯 Fit: {grant.fitScore}%</span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <Badge className={getStatusColor(grant.status)}>
                          {grant.status.replace('-', ' ').toUpperCase()}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.location.href = `/dashboard/grants/${grant.id}`}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>

                    {grant.aiGeneratedContent && (
                      <div className="mt-3 p-3 bg-purple-50 rounded-md">
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
