/**
 * Game-style Skeleton Loading Components
 * Futuristic animated placeholders for loading states
 */

'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/styles'

interface SkeletonProps {
  className?: string
}

/**
 * Renders a rounded rectangular skeleton placeholder with a shimmering gradient.
 *
 * Use `className` to add or override Tailwind classes on the root container.
 *
 * @param className - Additional CSS classes applied to the skeleton container.
 * @returns The skeleton element (a div) that visually indicates a loading surface with a shimmer effect.
 */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg bg-slate-800/50',
        'before:absolute before:inset-0',
        'before:bg-gradient-to-r before:from-transparent before:via-slate-700/30 before:to-transparent',
        'before:animate-shimmer',
        className
      )}
    />
  )
}

/**
 * Renders a rounded skeleton block that emits a subtle pulsing glow.
 *
 * @param className - Optional additional Tailwind or utility classes to apply to the root element
 * @returns A JSX element representing the glow-animated skeleton block
 */
export function GlowSkeleton({ className }: SkeletonProps) {
  return (
    <motion.div
      className={cn(
        'rounded-lg bg-slate-800/50 border border-slate-700/30',
        className
      )}
      animate={{
        boxShadow: [
          '0 0 0 0 rgba(34, 211, 238, 0)',
          '0 0 20px 2px rgba(34, 211, 238, 0.1)',
          '0 0 0 0 rgba(34, 211, 238, 0)',
        ],
      }}
      transition={{ repeat: Infinity, duration: 2 }}
    />
  )
}

/**
 * Renders a skeleton placeholder representing an agent/list card to indicate loading state.
 *
 * The skeleton visually mimics an agent card with avatar, title and subtitle lines, content rows,
 * three action blocks, and a row of rounded action placeholders.
 *
 * @returns A React element representing the agent card loading skeleton.
 */
export function AgentCardSkeleton() {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-slate-700 to-slate-600 rounded-2xl blur opacity-20" />
      <div className="relative bg-slate-900/90 rounded-2xl p-6 border border-slate-700/50">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Skeleton className="w-12 h-12 rounded-xl" />
            <div>
              <Skeleton className="h-6 w-32 mb-2" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
          <Skeleton className="w-3 h-3 rounded-full" />
        </div>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-4" />
        <div className="grid grid-cols-3 gap-2 mb-4">
          <Skeleton className="h-14 rounded-lg" />
          <Skeleton className="h-14 rounded-lg" />
          <Skeleton className="h-14 rounded-lg" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </div>
    </div>
  )
}

/**
 * Renders a skeleton card used as a placeholder for a statistics/metric tile.
 *
 * @returns A JSX element containing a blurred background layer and a rounded foreground with skeleton blocks that mimic an icon, a main metric, and a secondary line.
 */
export function StatsCardSkeleton() {
  return (
    <div className="relative">
      <div className="absolute -inset-0.5 bg-slate-700/30 rounded-xl blur" />
      <div className="relative bg-slate-900/80 rounded-xl p-4 border border-slate-700/50">
        <div className="flex items-center gap-2 mb-1">
          <Skeleton className="w-4 h-4 rounded" />
          <Skeleton className="h-3 w-16" />
        </div>
        <Skeleton className="h-8 w-12 mb-1" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  )
}

/**
 * Renders a skeleton placeholder for a single activity feed entry.
 *
 * The placeholder includes an avatar block, title/subtitle lines, content lines, and a trailing timestamp/action line to match typical activity item layout.
 *
 * @returns A JSX element rendering an activity item loading placeholder
 */
export function ActivitySkeleton() {
  return (
    <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/50">
      <div className="flex items-start gap-3">
        <Skeleton className="w-10 h-10 rounded-lg flex-shrink-0" />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16 rounded-full" />
          </div>
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-3 w-2/3" />
        </div>
        <Skeleton className="h-3 w-12" />
      </div>
    </div>
  )
}

/**
 * Renders a compact skeleton card for an impact/metrics widget.
 *
 * Displays a blurred background layer and a foreground rounded card containing placeholders for an icon, a primary metric, and two secondary text lines.
 *
 * @returns A JSX element representing the metric card skeleton placeholder.
 */
export function MetricCardSkeleton() {
  return (
    <div className="relative">
      <div className="absolute -inset-0.5 bg-slate-700/20 rounded-xl blur" />
      <div className="relative bg-slate-900/80 rounded-xl p-4 border border-slate-700/50">
        <Skeleton className="w-8 h-8 rounded-lg mb-3" />
        <Skeleton className="h-8 w-16 mb-2" />
        <Skeleton className="h-3 w-20 mb-1" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  )
}

/**
 * Renders a chat message loading placeholder aligned for user or other messages.
 *
 * The skeleton shows a rounded message bubble with three placeholder lines and,
 * for non-user messages, an avatar placeholder to the left. For user messages
 * the bubble is aligned to the right and the avatar is omitted.
 *
 * @param isUser - When `true`, aligns the skeleton to the right and hides the avatar; when `false`, aligns to the left and shows an avatar placeholder.
 * @returns A JSX element representing the message skeleton.
 */
export function MessageSkeleton({ isUser = false }: { isUser?: boolean }) {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-start gap-3 max-w-[80%] ${isUser ? 'flex-row-reverse' : ''}`}>
        {!isUser && <Skeleton className="w-8 h-8 rounded-xl flex-shrink-0" />}
        <div className={`rounded-2xl px-4 py-3 ${isUser ? 'bg-cyan-500/20' : 'bg-slate-800'}`}>
          <Skeleton className="h-4 w-48 mb-2" />
          <Skeleton className="h-4 w-32 mb-2" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </div>
  )
}

/**
 * Renders a full-page loading skeleton composed of a header, a responsive stats grid, and a grid of agent card placeholders.
 *
 * @returns A React element representing the page-level loading UI (header bar, four stats cards, and multiple agent card skeletons).
 */
export function PageLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header skeleton */}
      <div className="border-b border-slate-700/50 bg-slate-900/80 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Skeleton className="w-12 h-12 rounded-xl" />
            <div>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <div className="flex gap-4">
            <Skeleton className="h-10 w-24 rounded-xl" />
            <Skeleton className="h-10 w-24 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCardSkeleton />
          <StatsCardSkeleton />
          <StatsCardSkeleton />
          <StatsCardSkeleton />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AgentCardSkeleton />
          <AgentCardSkeleton />
          <AgentCardSkeleton />
          <AgentCardSkeleton />
          <AgentCardSkeleton />
          <AgentCardSkeleton />
        </div>
      </div>
    </div>
  )
}

/**
 * Renders an inline circular loading spinner with configurable size and wrapper classes.
 *
 * @param size - Preset spinner size: 'sm' | 'md' | 'lg'. Each preset adjusts the spinner's dimensions and border thickness.
 * @param className - Additional class names applied to the spinner wrapper.
 * @returns A JSX element containing a spinning bordered circle with a pulsing (ping) ring overlay.
 */
export function LoadingSpinner({ size = 'md', className }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const sizes = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-3',
  }

  return (
    <div className={cn('relative', className)}>
      <div
        className={cn(
          'animate-spin rounded-full border-cyan-500 border-t-transparent',
          sizes[size]
        )}
      />
      <div
        className={cn(
          'absolute inset-0 animate-ping rounded-full border-cyan-500 opacity-20',
          sizes[size]
        )}
      />
    </div>
  )
}

/**
 * Renders an animated pulsing dot indicator for status or presence.
 *
 * @param color - Visual color key for the dot; supported values: `cyan`, `green`, `purple`, `amber`, `red`. Default: `cyan`.
 * @param size - Size of the dot; supported values: `sm`, `md`, `lg`. Default: `md`.
 * @returns A circular, animated dot element representing a pulsing indicator.
 */
export function PulsingDot({ color = 'cyan', size = 'md' }: { color?: string; size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-3 h-3',
  }

  const colors: Record<string, string> = {
    cyan: 'bg-cyan-400',
    green: 'bg-green-400',
    purple: 'bg-purple-400',
    amber: 'bg-amber-400',
    red: 'bg-red-400',
  }

  return (
    <motion.div
      className={cn('rounded-full', sizes[size], colors[color])}
      animate={{ scale: [1, 1.2, 1], opacity: [1, 0.6, 1] }}
      transition={{ repeat: Infinity, duration: 2 }}
    />
  )
}