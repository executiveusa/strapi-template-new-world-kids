'use client'

import { DashboardConfig } from '@/lib/voice-agent/dashboard-builder'

type DashboardPreviewProps = {
  config: DashboardConfig
}

export function DashboardPreview({ config }: DashboardPreviewProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-6 py-16">
      <div className="max-w-4xl w-full rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
        <h2 className="text-3xl font-semibold mb-2">Your dashboard preview</h2>
        <p className="text-slate-300 mb-6">Theme: {config.theme}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {config.widgets.map((widget) => (
            <div key={widget.id} className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
              <p className="text-sm text-slate-400">{widget.type}</p>
              <p className="text-lg font-semibold">{widget.title}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-sm text-slate-300">
          Active modules: {config.modules.join(', ')}
        </div>
      </div>
    </div>
  )
}
