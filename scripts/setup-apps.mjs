import { copyFile, mkdir, readdir, stat } from "node:fs/promises"
import { dirname, join, resolve } from "node:path"

const root = resolve(process.cwd())
const blockedDirectories = new Set([
  ".git",
  ".next",
  ".turbo",
  "dist",
  "external",
  "node_modules",
])

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true })

  for (const entry of entries) {
    const absolutePath = join(directory, entry.name)

    if (blockedDirectories.has(entry.name)) {
      continue
    }

    if (entry.isDirectory()) {
      await walk(absolutePath)
      continue
    }

    if (!entry.isFile() || !entry.name.endsWith(".example")) {
      continue
    }

    const targetPath = absolutePath.slice(0, -".example".length)

    try {
      await stat(targetPath)
    } catch {
      await mkdir(dirname(targetPath), { recursive: true })
      await copyFile(absolutePath, targetPath)
    }
  }
}

await walk(root)
