'use client'

import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'
import VideoPlayer from '../video/VideoPlayer'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export interface TimelineVideo {
  id: string
  url: string
  thumbnail?: string
  title?: string
  description?: string
}

export interface TimelineImage {
  id: string
  url: string
  alt?: string
  caption?: string
}

export interface TimelineEventData {
  id: string
  title: string
  date: string
  description?: string
  expandedContent?: string
  status: 'completed' | 'in-progress' | 'pending'
  images?: TimelineImage[]
  videos?: TimelineVideo[]
  location?: string
  category?: string
}

interface EnhancedTimelineProps {
  events: TimelineEventData[]
  className?: string
  animationDelay?: number
}

export function EnhancedTimeline({
  events,
  className = '',
  animationDelay = 0.1,
}: EnhancedTimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null)
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null)

  useEffect(() => {
    if (!timelineRef.current) return

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('.enhanced-timeline-item')

      items.forEach((item, index) => {
        gsap.fromTo(
          item,
          {
            opacity: 0,
            x: index % 2 === 0 ? -50 : 50,
            scale: 0.9,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              end: 'top 50%',
              scrub: 1,
              toggleActions: 'play none none reverse',
            },
          }
        )
      })

      const line = timelineRef.current?.querySelector('.timeline-progress-line')
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0, transformOrigin: 'top' },
          {
            scaleY: 1,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 70%',
              end: 'bottom 30%',
              scrub: 1,
            },
          }
        )
      }
    }, timelineRef)

    return () => ctx.revert()
  }, [events])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#10b981'
      case 'in-progress':
        return '#f59e0b'
      case 'pending':
        return '#6b7280'
      default:
        return '#6b7280'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return '✓'
      case 'in-progress':
        return '⟳'
      case 'pending':
        return '○'
      default:
        return '○'
    }
  }

  return (
    <div ref={timelineRef} className={`enhanced-timeline ${className}`}>
      <div className="timeline-line-container">
        <div className="timeline-base-line" />
        <div className="timeline-progress-line" />
      </div>

      <div className="timeline-events">
        {events.map((event, index) => (
          <div
            key={event.id}
            className={`enhanced-timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
          >
            <div className="timeline-marker">
              <div
                className="timeline-dot"
                style={{ backgroundColor: getStatusColor(event.status) }}
              >
                <span className="timeline-icon">{getStatusIcon(event.status)}</span>
              </div>
            </div>

            <motion.div
              className="timeline-card"
              whileHover={{ scale: 1.02, boxShadow: '0 12px 40px rgba(0,0,0,0.15)' }}
              transition={{ duration: 0.2 }}
            >
              <div className="timeline-card-header">
                <div className="timeline-meta">
                  <time className="timeline-date">{event.date}</time>
                  {event.category && (
                    <span className="timeline-category">{event.category}</span>
                  )}
                </div>
                <h3 className="timeline-event-title">{event.title}</h3>
                {event.location && (
                  <div className="timeline-location">
                    📍 {event.location}
                  </div>
                )}
              </div>

              {event.description && (
                <p className="timeline-description">{event.description}</p>
              )}

              {(event.expandedContent || event.images?.length || event.videos?.length) && (
                <Accordion
                  type="single"
                  collapsible
                  value={expandedEvent === event.id ? event.id : ''}
                  onValueChange={(value) => setExpandedEvent(value || null)}
                >
                  <AccordionItem value={event.id}>
                    <AccordionTrigger className="timeline-expand-trigger">
                      {expandedEvent === event.id ? 'Show Less' : 'Show More'}
                    </AccordionTrigger>
                    <AccordionContent>
                      <AnimatePresence>
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="timeline-expanded-content"
                        >
                          {event.expandedContent && (
                            <div
                              className="timeline-rich-content"
                              dangerouslySetInnerHTML={{ __html: event.expandedContent }}
                            />
                          )}

                          {event.videos && event.videos.length > 0 && (
                            <div className="timeline-videos">
                              <h4 className="timeline-section-title">Videos</h4>
                              <div className="timeline-video-grid">
                                {event.videos.map((video) => (
                                  <VideoPlayer
                                    key={video.id}
                                    url={video.url}
                                    thumbnail={video.thumbnail}
                                    title={video.title}
                                    description={video.description}
                                    height="300px"
                                  />
                                ))}
                              </div>
                            </div>
                          )}

                          {event.images && event.images.length > 0 && (
                            <div className="timeline-images">
                              <h4 className="timeline-section-title">Gallery</h4>
                              <div className="timeline-image-grid">
                                {event.images.map((image) => (
                                  <motion.div
                                    key={image.id}
                                    className="timeline-image-item"
                                    whileHover={{ scale: 1.05 }}
                                  >
                                    <img src={image.url} alt={image.alt || event.title} />
                                    {image.caption && (
                                      <p className="image-caption">{image.caption}</p>
                                    )}
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}

              <div className={`timeline-status-badge status-${event.status}`}>
                {event.status === 'completed' && 'Completed'}
                {event.status === 'in-progress' && 'In Progress'}
                {event.status === 'pending' && 'Upcoming'}
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .enhanced-timeline {
          position: relative;
          padding: 60px 20px;
        }

        .timeline-line-container {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 4px;
          transform: translateX(-50%);
          z-index: 0;
        }

        .timeline-base-line {
          position: absolute;
          width: 100%;
          height: 100%;
          background: #e5e7eb;
        }

        .timeline-progress-line {
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
          transform-origin: top;
        }

        .timeline-events {
          position: relative;
          z-index: 1;
        }

        .enhanced-timeline-item {
          position: relative;
          margin-bottom: 60px;
          display: flex;
          align-items: flex-start;
        }

        .enhanced-timeline-item.left {
          flex-direction: row;
          justify-content: flex-end;
        }

        .enhanced-timeline-item.right {
          flex-direction: row-reverse;
          justify-content: flex-end;
        }

        .timeline-marker {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
        }

        .timeline-dot {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 4px solid white;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .timeline-icon {
          color: white;
          font-size: 20px;
          font-weight: bold;
        }

        .timeline-card {
          width: calc(50% - 60px);
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .timeline-card-header {
          margin-bottom: 16px;
        }

        .timeline-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        }

        .timeline-date {
          font-size: 0.875rem;
          color: #6b7280;
          font-weight: 500;
        }

        .timeline-category {
          font-size: 0.75rem;
          padding: 4px 12px;
          background: #e0e7ff;
          color: #4f46e5;
          border-radius: 12px;
          font-weight: 600;
        }

        .timeline-event-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #111827;
          margin: 0 0 8px 0;
        }

        .timeline-location {
          font-size: 0.875rem;
          color: #6b7280;
        }

        .timeline-description {
          color: #4b5563;
          line-height: 1.6;
          margin-bottom: 16px;
        }

        .timeline-expand-trigger {
          width: 100%;
          margin-top: 12px;
        }

        .timeline-expanded-content {
          padding-top: 16px;
        }

        .timeline-section-title {
          font-size: 1.125rem;
          font-weight: 600;
          margin: 16px 0 12px 0;
          color: #111827;
        }

        .timeline-video-grid,
        .timeline-image-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 16px;
          margin-top: 12px;
        }

        .timeline-image-item {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .timeline-image-item img {
          width: 100%;
          height: auto;
          display: block;
        }

        .image-caption {
          padding: 8px 12px;
          background: #f9fafb;
          font-size: 0.875rem;
          color: #6b7280;
          margin: 0;
        }

        .timeline-status-badge {
          display: inline-block;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 600;
          margin-top: 16px;
        }

        .status-completed {
          background: #d1fae5;
          color: #065f46;
        }

        .status-in-progress {
          background: #fef3c7;
          color: #92400e;
        }

        .status-pending {
          background: #f3f4f6;
          color: #374151;
        }

        @media (max-width: 768px) {
          .timeline-line-container {
            left: 24px;
          }

          .timeline-marker {
            left: 24px;
          }

          .enhanced-timeline-item {
            flex-direction: row !important;
            justify-content: flex-start !important;
            padding-left: 60px;
          }

          .timeline-card {
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}

export default EnhancedTimeline
