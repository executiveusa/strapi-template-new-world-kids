import React from 'react'
import type { Component } from '@repo/strapi-types'
import { Timeline, type TimelineStage } from '@/components/timeline/Timeline'
import '@/components/timeline/timeline.css'

type StrapiTimelineProps = {
  data: Component<'sections.timeline'>
}

export function StrapiTimeline({ data }: StrapiTimelineProps) {
  // Transform Strapi data format to Timeline component format
  const stages: TimelineStage[] = (data.stages || []).map((stage, index) => ({
    id: `stage-${index}`,
    title: stage.title,
    description: stage.description || undefined,
    status: stage.status as 'completed' | 'in-progress' | 'pending',
    date: stage.date || undefined,
    icon: stage.icon ? <span>{stage.icon}</span> : undefined,
  }))

  return (
    <section className="strapi-timeline-section py-12">
      <div className="container mx-auto px-4">
        {data.title && (
          <h2 className="text-3xl font-bold text-center mb-4">{data.title}</h2>
        )}
        {data.description && (
          <p className="text-lg text-center text-gray-600 mb-8 max-w-3xl mx-auto">
            {data.description}
          </p>
        )}
        <Timeline stages={stages} className="max-w-4xl mx-auto" />
      </div>
    </section>
  )
}

export default StrapiTimeline
