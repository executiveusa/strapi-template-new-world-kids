// Viewport audit for apps/ui. Opens every public route at phone, tablet, and desktop sizes and reports:
// horizontal overflow, console errors, tap targets under 44px, text under 12px, low contrast, missing alt text,
// heading and landmark mistakes. Read-only: it never submits a form.
//
//   BASE_URL=http://localhost:3100 node scripts/audit-viewports.mjs [--routes /en,/es] [--json out.json]
//
// Needs Chromium (PLAYWRIGHT_BROWSERS_PATH is set in the cloud environment). Run the site with SITE_MODE=live.
import fs from "node:fs"
import path from "node:path"
import { pathToFileURL } from "node:url"

async function loadPlaywright() {
  try {
    return await import("playwright-core")
  } catch {
    const pnpm = path.resolve("node_modules/.pnpm")
    const dir = fs.readdirSync(pnpm).find((name) => name.startsWith("playwright-core@"))
    if (!dir) throw new Error("playwright-core not found. Run pnpm install.")
    return import(pathToFileURL(path.join(pnpm, dir, "node_modules/playwright-core/index.mjs")).href)
  }
}

const BASE = process.env.BASE_URL ?? "http://localhost:3100"
const args = process.argv.slice(2)
const argValue = (flag) => (args.includes(flag) ? args[args.indexOf(flag) + 1] : undefined)

const ROUTES = (argValue("--routes")?.split(",") ?? [
  "/", "/es", "/first-12", "/es/first-12", "/projects", "/gallery", "/transparency", "/donate",
  "/safeguarding", "/privacy", "/refer", "/mentor", "/opportunity", "/blog", "/coming-soon", "/es/coming-soon",
]).map((r) => r.trim())

const VIEWPORTS = [
  [320, 568], [360, 800], [375, 812], [390, 844], [414, 896], [430, 932], [768, 1024], [1024, 768], [1280, 800], [1440, 900],
]

const { chromium } = await loadPlaywright()
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH ?? "/opt/pw-browsers/chromium" })

const pageChecks = () => {
  const out = { tap: [], tiny: [], contrast: [], alt: [], headings: [], landmarks: [] }
  const visible = (el) => {
    const r = el.getBoundingClientRect()
    const cs = getComputedStyle(el)
    return r.width > 0 && r.height > 0 && cs.visibility !== "hidden" && cs.display !== "none" && cs.opacity !== "0"
  }
  const label = (el) => `${el.tagName.toLowerCase()}${el.id ? "#" + el.id : ""} "${(el.innerText || el.getAttribute("aria-label") || el.getAttribute("name") || "").trim().slice(0, 40)}"`

  for (const el of document.querySelectorAll("a[href], button, input:not([type=hidden]), select, textarea, summary, [role=button]")) {
    if (!visible(el)) continue
    const r = el.getBoundingClientRect()
    if (r.left < -1 || r.top > 1e5) continue
    const inline = el.tagName === "A" && el.closest("p, li") && getComputedStyle(el).display === "inline"
    const isCheck = el.type === "checkbox"
    const box = isCheck && el.closest("label") ? el.closest("label").getBoundingClientRect() : r
    if (!inline && (box.height < 44 || box.width < 44)) out.tap.push(`${label(el)} ${Math.round(box.width)}x${Math.round(box.height)}`)
  }

  const luminance = (rgb) => {
    const [r, g, b] = rgb.map((v) => { const c = v / 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4 })
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
  }
  const parse = (c) => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number); return { rgb: p.slice(0, 3), a: p[3] ?? 1 } }
  const bgOf = (el) => {
    let node = el
    const layers = []
    while (node) {
      const c = parse(getComputedStyle(node).backgroundColor)
      if (c && c.a > 0) { layers.push(c); if (c.a >= 1) break }
      node = node.parentElement
    }
    let base = [255, 255, 255]
    for (const l of layers.reverse()) base = base.map((v, i) => l.rgb[i] * l.a + v * (1 - l.a))
    return base
  }
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
  const seen = new Set()
  while (walker.nextNode()) {
    const node = walker.currentNode
    const text = node.textContent.trim()
    const el = node.parentElement
    if (!text || !el || seen.has(el) || !visible(el) || el.closest("[aria-hidden=true], script, style, noscript")) continue
    if (el.closest(".sr-only")) continue
    seen.add(el)
    const cs = getComputedStyle(el)
    const size = parseFloat(cs.fontSize)
    if (size < 12) out.tiny.push(`${label(el)} ${size}px`)
    const fg = parse(cs.color)
    if (!fg) continue
    const bg = bgOf(el)
    const fgRgb = fg.rgb.map((v, i) => v * fg.a + bg[i] * (1 - fg.a))
    const ratio = (Math.max(luminance(fgRgb), luminance(bg)) + 0.05) / (Math.min(luminance(fgRgb), luminance(bg)) + 0.05)
    const large = size >= 24 || (size >= 18.66 && parseInt(cs.fontWeight, 10) >= 700)
    // text on photos has no flat background, skip the ones inside a positioned image block
    if (ratio < (large ? 3 : 4.5) && !el.closest("[data-hero], figure")) out.contrast.push(`${label(el)} ${ratio.toFixed(2)}:1`)
  }

  for (const img of document.images) if (!img.hasAttribute("alt")) out.alt.push(img.src.slice(-50))
  const h1 = document.querySelectorAll("h1").length
  if (h1 !== 1) out.headings.push(`h1 count ${h1}`)
  const levels = [...document.querySelectorAll("h1,h2,h3,h4")].map((h) => +h.tagName[1])
  for (let i = 1; i < levels.length; i++) if (levels[i] - levels[i - 1] > 1) out.headings.push(`skips h${levels[i - 1]} to h${levels[i]}`)
  if (document.querySelectorAll("main").length !== 1) out.landmarks.push(`main count ${document.querySelectorAll("main").length}`)
  if (!document.documentElement.lang) out.landmarks.push("no html lang")
  return out
}

const rows = []
for (const route of ROUTES) {
  for (const [w, h] of VIEWPORTS) {
    const context = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, hasTouch: w < 1000, isMobile: w < 800 })
    const page = await context.newPage()
    const errors = []
    page.on("console", (m) => m.type() === "error" && errors.push(m.text().slice(0, 120)))
    page.on("pageerror", (e) => errors.push(String(e).slice(0, 120)))
    let status = 0
    try {
      const resp = await page.goto(BASE + route, { waitUntil: "load", timeout: 90000 })
      status = resp?.status() ?? 0
      await page.waitForTimeout(500)
      const overflow = await page.evaluate(() => {
        const sw = document.documentElement.scrollWidth, iw = window.innerWidth
        if (sw <= iw) return null
        const culprits = [...document.querySelectorAll("body *")].filter((el) => el.getBoundingClientRect().right > iw + 1).slice(0, 3).map((el) => el.tagName.toLowerCase() + "." + String(el.className).slice(0, 40))
        return { sw, iw, culprits }
      })
      const checks = await page.evaluate(pageChecks)
      rows.push({ route, w, h, status, overflow, errors, ...checks })
    } catch (e) {
      rows.push({ route, w, h, status, fatal: String(e).slice(0, 160) })
    }
    await context.close()
  }
}
await browser.close()

const phones = (r) => r.w < 800
const summary = {}
const add = (key, row, items) => { if (!items?.length) return; ;(summary[key] ??= {}); for (const item of items) { const k = `${row.route}  ${item}`; (summary[key][k] ??= new Set()).add(row.w) } }
for (const row of rows) {
  if (row.fatal) add("fatal", row, [row.fatal])
  if (row.status && row.status !== 200) add("status", row, [String(row.status)])
  if (row.overflow) add("overflow", row, [JSON.stringify(row.overflow)])
  add("console", row, row.errors)
  add("tap targets < 44px", row, phones(row) ? row.tap : [])
  add("text < 12px", row, row.tiny)
  add("contrast", row, row.contrast)
  add("img without alt", row, row.alt)
  add("headings", row, row.headings)
  add("landmarks", row, row.landmarks)
}
let total = 0
for (const [key, items] of Object.entries(summary)) {
  const entries = Object.entries(items)
  total += entries.length
  console.log(`\n## ${key} (${entries.length})`)
  for (const [k, widths] of entries.slice(0, 40)) console.log(`- ${k}  [${[...widths].join(",")}]`)
  if (entries.length > 40) console.log(`  … ${entries.length - 40} more`)
}
console.log(`\n${rows.length} page views, ${total} distinct findings`)
if (argValue("--json")) fs.writeFileSync(argValue("--json"), JSON.stringify(rows, null, 2))
process.exit(total ? 1 : 0)
