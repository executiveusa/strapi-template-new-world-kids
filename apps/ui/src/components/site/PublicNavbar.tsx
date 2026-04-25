import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MenuSquare,
  Youtube,
} from "lucide-react"

import { Link } from "@/lib/navigation"

import { primaryNavigation, siteLinks, socialLinks } from "./siteData"

const iconMap = {
  email: Mail,
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
} as const

export function PublicNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#091109]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 md:px-10">
        <Link
          href="/"
          className="flex items-center gap-3 text-white transition-opacity hover:opacity-90"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#c9a84c] text-sm font-black text-[#091109]">
            NW
          </span>
          <span className="min-w-0">
            <span className="block font-serif text-lg font-semibold tracking-tight">
              New World Kids
            </span>
            <span className="block text-xs tracking-[0.26em] text-[#c9a84c] uppercase">
              Food. Water. Energy. Shelter.
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {primaryNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/72 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          {socialLinks.map((item) => {
            const Icon = iconMap[item.key]

            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-[#c9a84c]/40 hover:text-[#f7e7a7]"
              >
                <Icon className="h-4 w-4" />
              </a>
            )
          })}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-[#c9a84c]/25 bg-[#c9a84c]/10 px-4 py-2 text-[11px] tracking-[0.22em] text-[#f7e7a7] uppercase md:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            501(c)(3) fiscal sponsor
          </div>
          <Link
            href={siteLinks.donate}
            className="inline-flex items-center gap-2 rounded-full bg-[#c9a84c] px-5 py-3 text-sm font-semibold text-[#091109] transition-transform hover:-translate-y-0.5"
          >
            Donate
          </Link>
          <div className="rounded-full border border-white/10 bg-white/5 p-2 text-white/60 lg:hidden">
            <MenuSquare className="h-5 w-5" />
          </div>
        </div>
      </div>

      <div className="border-t border-white/8 lg:hidden">
        <div className="no-scrollbar mx-auto flex max-w-7xl gap-5 overflow-x-auto px-6 py-3 text-sm text-white/70 md:px-10">
          {primaryNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={siteLinks.dashboard}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 transition-colors hover:text-white"
          >
            Dashboard
          </a>
        </div>
      </div>
    </header>
  )
}
