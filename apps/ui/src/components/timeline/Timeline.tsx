'use client'

import React from 'react'

export interface TimelineStage {
  id: string
  title: string
  description?: string
  status: 'completed' | 'in-progress' | 'pending'
  icon?: React.ReactNode
  date?: string
}

interface TimelineProps {
  stages: TimelineStage[]
  className?: string
}

export function Timeline({ stages, className = '' }: TimelineProps) {
  return (
    <div className={`timeline-container ${className}`}>
      {stages.map((stage, idx) => (
        <div key={stage.id} className="timeline-item">
          <div className={`timeline-dot timeline-dot--${stage.status}`}>
            {stage.icon && <span className="timeline-dot-icon">{stage.icon}</span>}
          </div>
          {idx < stages.length - 1 && (
            <div className={`timeline-line timeline-line--${stage.status}`} />
          )}
          <div className="timeline-content">
            <div className="timeline-header">
              <h3 className="timeline-title">{stage.title}</h3>
              {stage.date && (
                <time className="timeline-date">{stage.date}</time>
              )}
            </div>
            {stage.description && (
              <p className="timeline-description">{stage.description}</p>
            )}
            <div className={`timeline-badge timeline-badge--${stage.status}`}>
              {stage.status === 'completed' && 'Completed'}
              {stage.status === 'in-progress' && 'In Progress'}
              {stage.status === 'pending' && 'Pending'}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Timeline
