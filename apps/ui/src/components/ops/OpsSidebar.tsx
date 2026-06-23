"use client"

import {
  BarChart2,
  Building2,
  ExternalLink,
  FileText,
  Globe,
  Instagram,
  LayoutDashboard,
  Leaf,
  MessageSquare,
  Clock,
  Plug,
  Settings,
  Users,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navMain = [
  { icon: LayoutDashboard, label: "Mission control", href: "/ops" },
  { icon: MessageSquare, label: "Hermes chat", href: "/ops/chat" },
  {
    icon: Clock,
    label: "Action ledger",
    href: "/ops/ledger",
    badge: "3",
    badgeType: "warn",
  },
  { icon: Leaf, label: "Indigo Azul", href: "/ops/indigo-azul" },
  { icon: Users, label: "Culture Shock", href: "/ops/culture-shock" },
  { icon: Building2, label: "Studio", href: "/ops/studio" },
]

const navTools = [
  { icon: FileText, label: "Grant tracker", href: "/ops/grants" },
  { icon: Instagram, label: "Content", href: "/ops/content" },
  { icon: BarChart2, label: "Impact", href: "/ops/impact" },
  { icon: Plug, label: "Integrations", href: "/ops/integrations" },
]

const navPublic = [
  { icon: Globe, label: "Mission ledger", href: "/mission", external: false },
  { icon: ExternalLink, label: "nwkids.org", href: "/", external: true },
]

type NavItemData = {
  icon: React.ComponentType<{ className?: string }>
  label: string
  href: string
  badge?: string
  badgeType?: string
  external?: boolean
}

function NavItem({ item, active }: { item: NavItemData; active: boolean }) {
  const Icon = item.icon

  return (
    <Link
      href={item.href}
      target={item.external ? "_blank" : undefined}
      className={[
        "flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors",
        active
          ? "bg-[#1a3a2a]/40 font-medium text-white"
          : "text-white/50 hover:bg-white/5 hover:text-white/80",
      ].join(" ")}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" />
      <span className="flex-1 truncate">{item.label}</span>
      {item.badge && (
        <span
          className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium ${
            item.badgeType === "warn"
              ? "bg-amber-500/20 text-amber-300"
              : "bg-[#c9a84c]/20 text-[#c9a84c]"
          }`}
        >
          {item.badge}
        </span>
      )}
    </Link>
  )
}

export function OpsSidebar() {
  const pathname = usePathname()

  function isActive(href: string) {
    if (href === "/ops") return pathname.endsWith("/ops")

    return pathname.includes(href.split("/ops/")[1] ?? "")
  }

  return (
    <aside className="flex w-52 shrink-0 flex-col border-r border-white/5 bg-[#08110a] py-3">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-3 pb-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#1a3a2a] text-xs font-semibold text-[#c9a84c]">
          N
        </div>
        <span className="text-sm font-medium text-white">NWKids Ops</span>
      </div>

      {/* Main nav */}
      <div className="space-y-0.5 px-2">
        {navMain.map((item) => (
          <NavItem key={item.href} item={item} active={isActive(item.href)} />
        ))}
      </div>

      {/* Tools */}
      <div className="mt-4 px-2">
        <p className="px-2 pt-2 pb-1 text-[10px] tracking-widest text-white/25 uppercase">
          Tools
        </p>
        <div className="space-y-0.5">
          {navTools.map((item) => (
            <NavItem key={item.href} item={item} active={isActive(item.href)} />
          ))}
        </div>
      </div>

      {/* Public */}
      <div className="mt-4 px-2">
        <p className="px-2 pt-2 pb-1 text-[10px] tracking-widest text-white/25 uppercase">
          Public
        </p>
        <div className="space-y-0.5">
          {navPublic.map((item) => (
            <NavItem key={item.href} item={item} active={false} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto border-t border-white/5 px-3 pt-3">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1a3a2a] text-[11px] font-medium text-[#c9a84c]">
            B
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-white/80">Bambu</p>
            <p className="truncate text-[10px] text-white/30">
              executiveusa@gmail.com
            </p>
          </div>
          <Link href="/ops/settings">
            <Settings className="h-3.5 w-3.5 text-white/30 transition-colors hover:text-white/60" />
          </Link>
        </div>
      </div>
    </aside>
  )
}
