import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

import { chromium } from "@playwright/test"

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const targetUrl =
  process.env.BROWSER_CONTROL_TARGET_URL ??
  "https://github.com/browser-use/browser-harness"
const artifactsDir =
  process.env.BROWSER_CONTROL_ARTIFACTS_DIR ??
  path.resolve(scriptDir, "../../artifacts")
const screenshotPath = path.join(artifactsDir, "playwright-cdp-smoke.png")
const outputPath = path.join(artifactsDir, "playwright-cdp-smoke.json")

await fs.mkdir(artifactsDir, { recursive: true })

const browser = await chromium.connectOverCDP("http://127.0.0.1:9222")

try {
  const context = browser.contexts()[0] ?? (await browser.newContext())
  const page = await context.newPage()
  const consoleMessages = []
  const networkRequests = []

  page.on("console", (message) => {
    consoleMessages.push({
      type: message.type(),
      text: message.text(),
    })
  })

  page.on("request", (request) => {
    networkRequests.push({
      method: request.method(),
      resourceType: request.resourceType(),
      url: request.url(),
    })
  })

  await page.goto(targetUrl, { waitUntil: "domcontentloaded", timeout: 45000 })
  await page.waitForLoadState("networkidle", { timeout: 45000 })

  const heading = page.locator("main h1").first()
  await heading.waitFor({ state: "visible", timeout: 15000 })

  const title = await page.title()
  const headingText = (await heading.textContent())?.trim() ?? null

  await page.screenshot({ path: screenshotPath, fullPage: false })

  const result = {
    tool: "playwright",
    mode: "cdp",
    loaded: /browser-harness/i.test(title),
    title,
    heading: headingText,
    url: page.url(),
    screenshot: screenshotPath,
    consoleMessages,
    networkRequests: networkRequests.slice(0, 25),
  }

  await fs.writeFile(outputPath, JSON.stringify(result, null, 2))
  process.stdout.write(JSON.stringify(result))
} finally {
  await browser.close()
}
