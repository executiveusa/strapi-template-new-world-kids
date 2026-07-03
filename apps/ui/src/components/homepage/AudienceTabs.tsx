"use client"

import { useState } from "react"

function TabItem({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "relative shrink-0 py-3 text-sm font-medium transition-colors",
        active ? "text-white" : "text-white/45 hover:text-white/70",
      ].join(" ")}
    >
      {label}
      {active && (
        <span className="absolute right-0 bottom-0 left-0 h-0.5 rounded-t-full bg-[#c9a84c]" />
      )}
    </button>
  )
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
}

export function AudienceTabs() {
  const [active, setActive] = useState<"donor" | "client">("donor")

  return (
    <nav
      className="sticky top-0 z-40 border-b border-[var(--color-border-subtle)] bg-[#060e08]/95 backdrop-blur"
      aria-label="Audience selector"
    >
      <div className="mx-auto flex max-w-5xl items-center gap-6 overflow-x-auto px-6 md:px-10">
        <TabItem
          label="I want to donate"
          active={active === "donor"}
          onClick={() => {
            setActive("donor")
            scrollToId("support")
          }}
        />
        <TabItem
          label="I need an AI system for my nonprofit"
          active={active === "client"}
          onClick={() => {
            setActive("client")
            scrollToId("studio")
          }}
        />
      </div>
    </nav>
  )
}
