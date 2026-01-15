'use client';

import React from 'react';
import {
  BarChart3,
  Users,
  TrendingUp,
  Heart,
  Target,
  Zap,
  Award,
  Activity,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface KPIMetric {
  id: string;
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  description?: string;
  trend?: 'up' | 'down' | 'stable';
  color?: 'primary' | 'success' | 'warning' | 'danger';
}

interface SectionCardsProps {
  metrics?: KPIMetric[];
  isLoading?: boolean;
  className?: string;
}

const defaultMetrics: KPIMetric[] = [
  {
    id: 'total-donations',
    title: 'Total Donations',
    value: '$12,450',
    change: 12,
    icon: <Heart className="h-5 w-5 text-red-500" />,
    description: 'This month',
    trend: 'up',
    color: 'success',
  },
  {
    id: 'active-supporters',
    title: 'Active Supporters',
    value: '342',
    change: 8,
    icon: <Users className="h-5 w-5 text-blue-500" />,
    description: 'Growing community',
    trend: 'up',
    color: 'primary',
  },
  {
    id: 'conversion-rate',
    title: 'Conversion Rate',
    value: '3.2%',
    change: -2,
    icon: <TrendingUp className="h-5 w-5 text-emerald-500" />,
    description: 'vs. last month',
    trend: 'down',
    color: 'warning',
  },
  {
    id: 'campaign-progress',
    title: 'Campaign Goal',
    value: '48%',
    change: 15,
    icon: <Target className="h-5 w-5 text-purple-500" />,
    description: '60-day sprint',
    trend: 'up',
    color: 'primary',
  },
  {
    id: 'engagement',
    title: 'Engagement',
    value: '8.4k',
    change: 23,
    icon: <Zap className="h-5 w-5 text-yellow-500" />,
    description: 'Actions this week',
    trend: 'up',
    color: 'success',
  },
  {
    id: 'top-donor',
    title: 'Top Supporter',
    value: '$2,150',
    change: 5,
    icon: <Award className="h-5 w-5 text-amber-500" />,
    description: 'Single contribution',
    trend: 'up',
    color: 'success',
  },
];

const getTrendColor = (trend?: 'up' | 'down' | 'stable') => {
  switch (trend) {
    case 'up':
      return 'text-emerald-600 dark:text-emerald-400';
    case 'down':
      return 'text-red-600 dark:text-red-400';
    default:
      return 'text-slate-600 dark:text-slate-400';
  }
};

const getTrendIcon = (trend?: 'up' | 'down' | 'stable') => {
  if (trend === 'up') return '↑';
  if (trend === 'down') return '↓';
  return '→';
};

/**
 * Renders a responsive grid of KPI cards showing title, icon, value, and optional trend/change; displays skeleton cards when loading.
 *
 * @param metrics - Array of KPI metrics to render; defaults to the component's sample metrics.
 * @param isLoading - If true, renders six placeholder skeleton cards instead of the provided metrics.
 * @param className - Optional additional CSS classes applied to the grid container.
 * @returns A React element containing the grid of KPI cards or loading placeholders.
 */
export function SectionCards({
  metrics = defaultMetrics,
  isLoading = false,
  className,
}: SectionCardsProps) {
  if (isLoading) {
    return (
      <div className={cn('grid gap-4 md:grid-cols-2 lg:grid-cols-3 px-4 lg:px-6', className)}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-3">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mb-2" />
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className={cn('grid gap-4 md:grid-cols-2 lg:grid-cols-3 px-4 lg:px-6', className)}>
      {metrics.map((metric) => (
        <Card
          key={metric.id}
          className="transition-all hover:shadow-lg dark:hover:shadow-slate-900/50"
        >
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {metric.title}
            </CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
              {metric.icon}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                {metric.value}
              </div>
              <div className="flex items-center gap-2">
                {metric.change !== undefined && (
                  <>
                    <span
                      className={cn(
                        'inline-flex items-center gap-0.5 text-xs font-semibold',
                        getTrendColor(metric.trend),
                      )}
                    >
                      {getTrendIcon(metric.trend)}
                      {Math.abs(metric.change)}%
                    </span>
                    <CardDescription className="text-xs">
                      {metric.description || 'vs. last period'}
                    </CardDescription>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default SectionCards;