"use client"

import { Megaphone } from "lucide-react"
import { useMemo } from "react"

import { Link } from "@/lib/navigation"

import { siteLinks } from "../site/siteData"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"

type SocialChannel = {
  name: string
  status: "ready" | "scheduled" | "needs-approval" | "paused"
  nextAction: string
  outcome: string
}

const CHANNELS: SocialChannel[] = [
  {
    name: "Instagram",
    status: "scheduled",
    nextAction: "Queue story sequence",
    outcome: "Keeps the mission visible between launches.",
  },
  {
    name: "LinkedIn",
    status: "ready",
    nextAction: "Approve leadership post",
    outcome:
      "Supports partnerships, credibility, and higher-value inbound leads.",
  },
  {
    name: "Facebook",
    status: "needs-approval",
    nextAction: "Review community update",
    outcome: "Reaches local supporters without extra manual posting.",
  },
  {
    name: "YouTube",
    status: "paused",
    nextAction: "Prep short-form clip",
    outcome:
      "Turns video into a repeatable story engine when the team is ready.",
  },
]

const STATUS_STYLES: Record<SocialChannel["status"], string> = {
  ready: "bg-emerald-100 text-emerald-800",
  scheduled: "bg-blue-100 text-blue-800",
  "needs-approval": "bg-amber-100 text-amber-800",
  paused: "bg-gray-100 text-gray-800",
}

export function SocialMediaOpsPanel() {
  const totals = useMemo(() => {
    const scheduled = CHANNELS.filter(
      (channel) => channel.status === "scheduled"
    ).length
    const ready = CHANNELS.filter(
      (channel) => channel.status === "ready"
    ).length
    const needsApproval = CHANNELS.filter(
      (channel) => channel.status === "needs-approval"
    ).length

    return { scheduled, ready, needsApproval }
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Megaphone className="h-5 w-5 text-[#c9a84c]" />
          POST-MAXX Control
        </CardTitle>
        <CardDescription>
          POST-MAXX publishing for the agent: schedule, review, and ship social
          content from one place.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border bg-[#0b1710] p-4">
            <p className="text-xs tracking-[0.2em] text-[#c9a84c] uppercase">
              Scheduled
            </p>
            <p className="mt-2 text-3xl font-bold text-white">
              {totals.scheduled}
            </p>
          </div>
          <div className="rounded-lg border bg-[#0b1710] p-4">
            <p className="text-xs tracking-[0.2em] text-[#c9a84c] uppercase">
              Ready to publish
            </p>
            <p className="mt-2 text-3xl font-bold text-white">{totals.ready}</p>
          </div>
          <div className="rounded-lg border bg-[#0b1710] p-4">
            <p className="text-xs tracking-[0.2em] text-[#c9a84c] uppercase">
              Pending approval
            </p>
            <p className="mt-2 text-3xl font-bold text-white">
              {totals.needsApproval}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {CHANNELS.map((channel) => (
            <div
              key={channel.name}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-white">
                      {channel.name}
                    </h3>
                    <Badge className={STATUS_STYLES[channel.status]}>
                      {channel.status.replace("-", " ")}
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm text-white/60">
                    {channel.outcome}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs tracking-[0.18em] text-white/45 uppercase">
                    Next action
                  </p>
                  <p className="mt-1 text-sm text-white/85">
                    {channel.nextAction}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild>
            <Link href={siteLinks.postMaxx}>Open POST-MAXX</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/ops">Open Ops overview</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
