import { copyFileSync, existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".git") {
      continue;
    }

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }

    if (!entry.isFile() || !entry.name.endsWith(".example")) {
      continue;
    }

    const targetPath = fullPath.slice(0, -".".length - "example".length);
    if (!existsSync(targetPath)) {
      copyFileSync(fullPath, targetPath);
    }
  }
}

if (statSync(root).isDirectory()) {
  walk(root);
}
