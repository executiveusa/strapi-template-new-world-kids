#!/usr/bin/env node

/**
 * Simple Build Script - Bypasses package manager issues with deeply nested OneDrive paths
 * Builds the Next.js web app directly with TypeScript compilation
 */

import { execSync } from "child_process";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = __dirname;
const appDir = path.join(projectRoot, "apps/web");

console.log("🚀 Simple Build Script Started");
console.log(`📁 Project Root: ${projectRoot}`);
console.log(`📁 App Directory: ${appDir}`);

try {
  // Step 1: Check if node_modules exists, if not try to restore
  const nodeModulesPath = path.join(projectRoot, "node_modules");
  console.log(
    `\n📦 Checking node_modules at: ${nodeModulesPath.substring(0, 80)}...`
  );

  if (!fs.existsSync(nodeModulesPath)) {
    console.log("⚠️ node_modules not found, attempting package installation...");

    // Try npm install with minimal flags
    try {
      console.log("🔄 Running npm install (legacy peer deps)...");
      execSync("npm install --legacy-peer-deps --prefer-offline --no-audit", {
        cwd: projectRoot,
        stdio: "inherit",
      });
    } catch (e) {
      console.log("⚠️ npm install failed, trying with force...");
      execSync(
        "npm install --legacy-peer-deps --prefer-offline --no-audit --force",
        {
          cwd: projectRoot,
          stdio: "inherit",
        }
      );
    }
  } else {
    console.log("✅ node_modules found");
  }

  // Step 2: Build the Next.js app
  console.log("\n🏗️ Building Next.js application...");
  console.log("📍 Working directory: " + appDir);

  // First ensure dependencies are installed in app directory
  const appNodeModules = path.join(appDir, "node_modules");
  if (!fs.existsSync(appNodeModules)) {
    console.log("📦 Installing app-specific dependencies...");
    execSync("npm install --legacy-peer-deps --prefer-offline --no-audit", {
      cwd: appDir,
      stdio: "inherit",
    });
  }

  // Build with next
  console.log("\n🔨 Running next build...");
  execSync("next build", {
    cwd: appDir,
    stdio: "inherit",
    env: {
      ...process.env,
      NODE_ENV: "production",
    },
  });

  console.log("\n✅ Build completed successfully!");
  console.log("📁 Output: " + path.join(appDir, ".next"));

  // Step 3: Verify build artifacts
  const nextDir = path.join(appDir, ".next");
  if (fs.existsSync(nextDir)) {
    console.log("✅ Build artifacts verified");
    const standalonePath = path.join(nextDir, "standalone");
    if (fs.existsSync(standalonePath)) {
      console.log("✅ Standalone export available for deployment");
    }
  }

  console.log("\n🎉 Build Pipeline Complete!");
  console.log("Next steps:");
  console.log("1. Run: npm run dev (for local testing)");
  console.log("2. Run: docker-compose -f docker-compose.coolify.yml up");
  console.log("3. Run: ./deploy-production.sh production");

  process.exit(0);
} catch (error) {
  console.error("\n❌ Build failed:");
  console.error(error.message);

  // Print debug info
  console.error("\n📋 Debug Information:");
  console.error("Current working directory:", process.cwd());
  console.error("App directory exists:", fs.existsSync(appDir));
  const nodeModulesPath = path.join(projectRoot, "node_modules");
  console.error("node_modules exists:", fs.existsSync(nodeModulesPath));

  if (fs.existsSync(nodeModulesPath)) {
    const count = fs.readdirSync(nodeModulesPath).length;
    console.error("node_modules count:", count);
  }

  process.exit(1);
}
