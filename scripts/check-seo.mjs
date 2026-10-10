// Search-readiness check. Fetches every public page in English and Spanish and checks the things Google reads:
// title and description length, one h1, canonical, hreflang pairs, Open Graph, structured data, lang, viewport,
// noindex, image alt, internal link status, plus robots.txt, sitemap.xml, and security headers.
//
//   BASE_URL=http://localhost:3101 node scripts/check-seo.mjs      (run the site with SITE_MODE=live)
const BASE = process.env.BASE_URL ?? "http://localhost:3101"
const routes = ["/", "/first-12", "/projects", "/gallery", "/transparency", "/donate", "/safeguarding", "/safeguarding/policy", "/privacy", "/refer", "/mentor", "/opportunity"]
const problems = []
const note = (route, msg) => problems.push(`${route}  ${msg}`)
const get = async (path) => { const r = await fetch(BASE + path, { redirect: "manual" }); return { r, text: await r.text() } }
const attr = (html, re) => html.match(re)?.[1]

let pages = 0
for (const locale of ["en", "es"]) {
  for (const route of routes) {
    const path = locale === "es" ? (route === "/" ? "/es" : `/es${route}`) : route
    const { r, text: html } = await get(path)
    pages++
    if (r.status !== 200) { note(path, `status ${r.status}`); continue }
    const title = attr(html, /<title[^>]*>([^<]*)<\/title>/)
    const desc = attr(html, /<meta name="description" content="([^"]*)"/)
    if (!title || title.length < 15 || title.length > 65) note(path, `title length ${title?.length ?? 0}: ${title}`)
    if (!desc || desc.length < 70 || desc.length > 170) note(path, `description length ${desc?.length ?? 0}`)
    const h1 = (html.match(/<h1[\s>]/g) ?? []).length
    if (h1 !== 1) note(path, `h1 count ${h1}`)
    const canonical = attr(html, /<link rel="canonical" href="([^"]*)"/)
    if (!canonical?.startsWith("http")) note(path, "canonical missing or relative")
    const alts = [...html.matchAll(/<link rel="alternate" hrefLang="([^"]*)"/gi)].map((m) => m[1])
    for (const need of ["en", "es", "x-default"]) if (!alts.includes(need)) note(path, `hreflang ${need} missing`)
    if (!/<html[^>]* lang="(en|es)"/.test(html)) note(path, "html lang missing")
    if (!html.includes('name="viewport"')) note(path, "viewport missing")
    if (/<meta name="robots" content="[^"]*noindex/.test(html)) note(path, "has noindex")
    for (const p of ["og:title", "og:description", "og:image"]) if (!html.includes(`property="${p}"`)) note(path, `${p} missing`)
    const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    if (!ld.length) note(path, "no JSON-LD")
    for (const m of ld) { try { JSON.parse(m[1]) } catch { note(path, "JSON-LD invalid") } }
    for (const m of html.matchAll(/<img\b[^>]*>/g)) if (!/\balt=/.test(m[0])) note(path, "img without alt")
    if (locale === "en" && route === "/") {
      const links = new Set([...html.matchAll(/<a [^>]*href="(\/[^"#?]*)"/g)].map((m) => m[1]))
      for (const l of links) { const { r: lr } = await get(l); if (lr.status >= 400) note(path, `link ${l} -> ${lr.status}`) }
    }
  }
}

const robots = await get("/robots.txt")
if (!/Sitemap:/.test(robots.text)) note("/robots.txt", "no sitemap line")
if (/Disallow:\s*\/\s*$/m.test(robots.text)) note("/robots.txt", "blocks everything (site is hidden)")
const sm = await get("/sitemap.xml")
const urls = (sm.text.match(/<loc>/g) ?? []).length
if (urls < routes.length * 2) note("/sitemap.xml", `only ${urls} urls`)
const home = await get("/")
for (const h of ["content-security-policy", "x-frame-options", "x-content-type-options", "referrer-policy", "permissions-policy", "strict-transport-security"])
  if (!home.r.headers.get(h)) note("/", `header ${h} missing`)
const missing = await get("/this-page-does-not-exist-xyz")
if (missing.r.status !== 404) note("/404", `unknown page returns ${missing.r.status}, expected 404`)

console.log(problems.length ? problems.map((p) => `- ${p}`).join("\n") : "no problems")
console.log(`\n${pages} pages checked, ${urls} sitemap urls, ${problems.length} problems`)
process.exit(problems.length ? 1 : 0)
