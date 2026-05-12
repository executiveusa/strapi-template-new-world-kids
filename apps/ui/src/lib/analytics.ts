export interface AnalyticsEvent {
  event: string
  category: string
  label?: string
  value?: number
  properties?: Record<string, any>
}

export class Analytics {
  private static instance: Analytics
  private events: AnalyticsEvent[] = []

  private constructor() {}

  static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics()
    }
    return Analytics.instance
  }

  track(event: AnalyticsEvent): void {
    this.events.push({
      ...event,
      properties: {
        ...event.properties,
        timestamp: new Date().toISOString(),
        url: typeof window !== 'undefined' ? window.location.href : '',
      },
    })

    // Send to backend
    this.sendToBackend(event)

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics]', event)
    }
  }

  private async sendToBackend(event: AnalyticsEvent): Promise<void> {
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      })
    } catch (error) {
      console.error('Failed to send analytics event:', error)
    }
  }

  // Grant-specific tracking
  trackGrantDiscovery(grantId: string, fitScore: number): void {
    this.track({
      event: 'grant_discovered',
      category: 'grants',
      label: grantId,
      value: fitScore,
      properties: { fitScore },
    })
  }

  trackGrantAnalysis(grantId: string, analysisType: string): void {
    this.track({
      event: 'grant_analyzed',
      category: 'grants',
      label: grantId,
      properties: { analysisType },
    })
  }

  trackGrantSubmission(grantId: string, method: 'manual' | 'automated'): void {
    this.track({
      event: 'grant_submitted',
      category: 'grants',
      label: grantId,
      properties: { method },
    })
  }

  trackTimelineEvent(eventId: string, action: 'create' | 'update' | 'view'): void {
    this.track({
      event: `timeline_event_${action}`,
      category: 'timeline',
      label: eventId,
    })
  }

  trackAIInteraction(interactionType: string, agentName: string, success: boolean): void {
    this.track({
      event: 'ai_interaction',
      category: 'ai',
      label: interactionType,
      properties: { agentName, success },
    })
  }

  trackOnboardingStep(step: string, completed: boolean): void {
    this.track({
      event: 'onboarding_step',
      category: 'onboarding',
      label: step,
      value: completed ? 1 : 0,
    })
  }

  trackVideoPlay(videoId: string, videoUrl: string): void {
    this.track({
      event: 'video_play',
      category: 'media',
      label: videoId,
      properties: { videoUrl },
    })
  }

  getEvents(): AnalyticsEvent[] {
    return this.events
  }

  clearEvents(): void {
    this.events = []
  }
}

// Export singleton instance
export const analytics = Analytics.getInstance()

// Helper functions for common tracking
export const trackEvent = (event: AnalyticsEvent) => analytics.track(event)
export const trackGrantDiscovery = (grantId: string, fitScore: number) =>
  analytics.trackGrantDiscovery(grantId, fitScore)
export const trackGrantAnalysis = (grantId: string, analysisType: string) =>
  analytics.trackGrantAnalysis(grantId, analysisType)
export const trackGrantSubmission = (grantId: string, method: 'manual' | 'automated') =>
  analytics.trackGrantSubmission(grantId, method)
export const trackTimelineEvent = (eventId: string, action: 'create' | 'update' | 'view') =>
  analytics.trackTimelineEvent(eventId, action)
export const trackAIInteraction = (interactionType: string, agentName: string, success: boolean) =>
  analytics.trackAIInteraction(interactionType, agentName, success)
export const trackOnboardingStep = (step: string, completed: boolean) =>
  analytics.trackOnboardingStep(step, completed)
export const trackVideoPlay = (videoId: string, videoUrl: string) =>
  analytics.trackVideoPlay(videoId, videoUrl)
