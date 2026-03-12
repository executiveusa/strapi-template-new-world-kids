'use client'

import type { Locale } from 'next-intl'
import { useTranslations } from 'next-intl'

import type { BetterAuthSessionWithStrapi } from '@/types/better-auth'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Link } from '@/lib/navigation'

interface DashboardContentProps {
  session: BetterAuthSessionWithStrapi
  locale: Locale
}

export function DashboardContent({
  session,
  locale,
}: DashboardContentProps) {
  const t = useTranslations('dashboard')

  const userName = session.user?.name || session.user?.email || 'User'

  return (
    <div className="dashboard-wrapper">
      {/* Header */}
      <header className="dashboard-header">
        <div className="dashboard-header-content">
          <div>
            <h1 className="dashboard-title">Welcome, {userName}</h1>
            <p className="dashboard-subtitle">
              Your internal dashboard for New World Kids
            </p>
          </div>
          <Link href={`/${locale}/auth/signout`}>
            <Button variant="outline">Sign Out</Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* User Info Section */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>User Profile</CardTitle>
            <CardDescription>Your account information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="dashboard-info-grid">
              <div className="dashboard-info-item">
                <label className="dashboard-info-label">Email</label>
                <p className="dashboard-info-value">{session.user?.email}</p>
              </div>
              <div className="dashboard-info-item">
                <label className="dashboard-info-label">User ID</label>
                <p className="dashboard-info-value">{session.user?.id}</p>
              </div>
              {session.user?.provider && (
                <div className="dashboard-info-item">
                  <label className="dashboard-info-label">Provider</label>
                  <p className="dashboard-info-value capitalize">
                    {session.user.provider}
                  </p>
                </div>
              )}
              {session.user?.emailVerified && (
                <div className="dashboard-info-item">
                  <label className="dashboard-info-label">Email Verified</label>
                  <p className="dashboard-info-value text-green-600">✓ Verified</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Session Info */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Session Information</CardTitle>
            <CardDescription>Current session details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="dashboard-info-grid">
              <div className="dashboard-info-item">
                <label className="dashboard-info-label">Session Token</label>
                <p className="dashboard-info-value font-mono text-sm">
                  {session.session?.token?.substring(0, 20)}...
                </p>
              </div>
              <div className="dashboard-info-item">
                <label className="dashboard-info-label">Created At</label>
                <p className="dashboard-info-value">
                  {session.session?.createdAt
                    ? new Date(session.session.createdAt).toLocaleDateString()
                    : 'N/A'}
                </p>
              </div>
              {session.session?.expiresAt && (
                <div className="dashboard-info-item">
                  <label className="dashboard-info-label">Expires At</label>
                  <p className="dashboard-info-value">
                    {new Date(session.session.expiresAt).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your account settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="dashboard-actions">
              <Link href={`/${locale}/auth/change-password`}>
                <Button variant="secondary">Change Password</Button>
              </Link>
              <Link href={`/${locale}/auth/signout`}>
                <Button variant="outline">Sign Out</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
