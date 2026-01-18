/**
 * API Route: Activity Feed
 * Real-time activity stream for the observability dashboard
 */

import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/client'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface ActivityLog {
  id: string
  type: 'agent' | 'system' | 'user' | 'donation' | 'milestone'
  level: 'info' | 'success' | 'warning' | 'error'
  agent?: string
  message: string
  details?: string
  timestamp: string
  metadata?: Record<string, any>
}

/**
 * Retrieve recent activity logs, optionally filtered by agent or log level, and return them as ActivityLog items; falls back to a demo feed when no real logs are available.
 *
 * @param request - Incoming request; supports query parameters: `limit` (integer, default 50), `agent` (agent id to filter), and `level` (log level to filter)
 * @returns JSON object containing `success`, `activities` (array of ActivityLog), `isDemo` (true when demo data is returned), and `timestamp` (ISO 8601 string)
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const limit = parseInt(searchParams.get('limit') || '50')
  const agentFilter = searchParams.get('agent')
  const levelFilter = searchParams.get('level')

  try {
    // Try to fetch real logs from Supabase
    let query = supabase
      .from('agent_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (agentFilter) {
      query = query.eq('agent_id', agentFilter)
    }

    if (levelFilter) {
      query = query.eq('log_level', levelFilter)
    }

    const { data: logs, error } = await query

    if (error || !logs || logs.length === 0) {
      // Return demo activity feed
      return NextResponse.json({
        success: true,
        activities: generateDemoActivityFeed(),
        isDemo: true,
        timestamp: new Date().toISOString(),
      })
    }

    // Transform logs to activity format
    const activities: ActivityLog[] = logs.map((log: any) => ({
      id: log.id,
      type: 'agent' as const,
      level: mapLogLevel(log.log_level),
      agent: log.agent_id,
      message: log.message,
      details: log.thought_process,
      timestamp: log.created_at,
      metadata: log.metadata,
    }))

    return NextResponse.json({
      success: true,
      activities,
      isDemo: false,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('[Activity Feed] Error:', error)

    return NextResponse.json({
      success: true,
      activities: generateDemoActivityFeed(),
      isDemo: true,
      timestamp: new Date().toISOString(),
    })
  }
}

/**
 * Map various log level strings to the standardized ActivityLog level.
 *
 * @param level - The input log level string (for example: 'error', 'critical', 'warn', 'info')
 * @returns `'error'` if `level` is 'error' or 'critical', `'warning'` if `level` is 'warn', `'info'` if `level` is 'info', otherwise `'success'`
 */
function mapLogLevel(level: string): ActivityLog['level'] {
  switch (level) {
    case 'error':
    case 'critical':
      return 'error'
    case 'warn':
      return 'warning'
    case 'info':
      return 'info'
    default:
      return 'success'
  }
}

/**
 * Generate a static demo activity feed used as a fallback when real logs are unavailable.
 *
 * The returned entries cover a variety of activity `type` and `level` values and include
 * ISO-8601 `timestamp` strings computed relative to the current time.
 *
 * @returns An array of `ActivityLog` objects representing demo activities
 */
function generateDemoActivityFeed(): ActivityLog[] {
  const now = Date.now()

  return [
    {
      id: '1',
      type: 'agent',
      level: 'success',
      agent: 'Sirius',
      message: 'Completed task planning for donation campaign',
      details: 'Created 5 subtasks and assigned priorities',
      timestamp: new Date(now - 1 * 60000).toISOString(),
    },
    {
      id: '2',
      type: 'agent',
      level: 'info',
      agent: 'Vega',
      message: 'Running automated tests on donation form',
      details: 'Testing form validation and submission flow',
      timestamp: new Date(now - 3 * 60000).toISOString(),
    },
    {
      id: '3',
      type: 'donation',
      level: 'success',
      message: 'New donation received: $150',
      details: 'Donor: Sarah M. - Monthly recurring',
      timestamp: new Date(now - 5 * 60000).toISOString(),
    },
    {
      id: '4',
      type: 'agent',
      level: 'success',
      agent: 'Andromeda',
      message: 'Deployed new hero section to staging',
      details: 'Updated homepage with new impact stats',
      timestamp: new Date(now - 8 * 60000).toISOString(),
    },
    {
      id: '5',
      type: 'system',
      level: 'info',
      message: 'Daily backup completed successfully',
      timestamp: new Date(now - 12 * 60000).toISOString(),
    },
    {
      id: '6',
      type: 'agent',
      level: 'info',
      agent: 'Rigel',
      message: 'Researching grant opportunities',
      details: 'Found 3 potential grants matching criteria',
      timestamp: new Date(now - 15 * 60000).toISOString(),
    },
    {
      id: '7',
      type: 'milestone',
      level: 'success',
      message: 'Milestone achieved: 1,500 lives impacted!',
      details: 'Congratulations to the entire team!',
      timestamp: new Date(now - 20 * 60000).toISOString(),
    },
    {
      id: '8',
      type: 'agent',
      level: 'warning',
      agent: 'Betelgeuse',
      message: 'High memory usage detected on staging server',
      details: 'Recommended: Restart the Node.js process',
      timestamp: new Date(now - 25 * 60000).toISOString(),
    },
    {
      id: '9',
      type: 'agent',
      level: 'success',
      agent: 'Cassiopeia',
      message: 'Generated monthly impact report',
      details: 'Report ready for download in the admin panel',
      timestamp: new Date(now - 30 * 60000).toISOString(),
    },
    {
      id: '10',
      type: 'user',
      level: 'info',
      message: 'New volunteer registration: John D.',
      details: 'Skills: Web development, Marketing',
      timestamp: new Date(now - 35 * 60000).toISOString(),
    },
    {
      id: '11',
      type: 'agent',
      level: 'success',
      agent: 'Vega',
      message: 'All tests passed (24/24)',
      details: 'Donation flow, User registration, Contact form',
      timestamp: new Date(now - 40 * 60000).toISOString(),
    },
    {
      id: '12',
      type: 'donation',
      level: 'success',
      message: 'Recurring donation renewed: $50/month',
      details: 'Donor: Anonymous - 6th consecutive month',
      timestamp: new Date(now - 45 * 60000).toISOString(),
    },
  ]
}