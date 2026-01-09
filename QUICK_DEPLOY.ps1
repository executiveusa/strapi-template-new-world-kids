# Quick Deployment Script for New World Kids Platform
# Run this to deploy instantly to Vercel and prepare for Coolify

Write-Host "🚀 NEW WORLD KIDS - DEPLOYMENT ORCHESTRATION" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

# Check prerequisites
Write-Host "📋 Checking prerequisites..." -ForegroundColor Yellow

# Check Node
$nodeVersion = node --version
Write-Host "✓ Node: $nodeVersion"

# Check Yarn
$yarnVersion = yarn --version
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Yarn not found. Installing..." -ForegroundColor Red
    npm install -g yarn@1.22.19
}
Write-Host "✓ Yarn: $(yarn --version)"

# Check Vercel CLI
$vercelVersion = vercel --version
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Vercel CLI not found. Installing..." -ForegroundColor Red
    npm install -g vercel
}
Write-Host "✓ Vercel CLI installed"

Write-Host ""
Write-Host "📦 PHASE 1: Installing Dependencies" -ForegroundColor Cyan
Write-Host ""

yarn install --legacy-peer-deps

if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Dependency installation failed" -ForegroundColor Red
    exit 1
}

Write-Host "✓ Dependencies installed" -ForegroundColor Green

Write-Host ""
Write-Host "🔨 PHASE 2: Building Project" -ForegroundColor Cyan
Write-Host ""

yarn turbo run build --parallel

if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Build failed. Check errors above." -ForegroundColor Red
    exit 1
}

Write-Host "✓ Build successful" -ForegroundColor Green

Write-Host ""
Write-Host "🔐 PHASE 3: Configuring Vercel Secrets" -ForegroundColor Cyan
Write-Host ""

# Get env vars from .env.local
$envVars = @(
    "DATABASE_URL",
    "SUPABASE_URL",
    "NEXT_PUBLIC_GHOST_URL",
    "OPENAI_API_KEY",
    "ANTHROPIC_API_KEY",
    "GOOGLE_API_KEY",
    "STRIPE_SECRET_KEY"
)

foreach ($var in $envVars) {
    $value = [Environment]::GetEnvironmentVariable($var)
    if ($value) {
        Write-Host "✓ Found $var"
    }
}

Write-Host ""
Write-Host "🌐 PHASE 4: Deploying to Vercel" -ForegroundColor Cyan
Write-Host ""

$deploy = Read-Host "Deploy to (p)roduction or (s)taging? [p/s]"

if ($deploy -eq "p") {
    Write-Host "🚀 Deploying to PRODUCTION..." -ForegroundColor Red
    vercel deploy --prod
} else {
    Write-Host "🚀 Deploying to staging..." -ForegroundColor Yellow
    vercel deploy
}

if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Deployment failed" -ForegroundColor Red
    exit 1
}

Write-Host "✓ Deployment successful!" -ForegroundColor Green

Write-Host ""
Write-Host "🎯 PHASE 5: Starting MCP Servers" -ForegroundColor Cyan
Write-Host ""

Write-Host "Starting Secrets Manager (port 3017)..." -ForegroundColor Yellow
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot'; yarn start:secrets-manager"

Write-Host "Starting Coolify Deploy MCP (port 3016)..." -ForegroundColor Yellow
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot'; node services/coolify-mcp/src/index.js"

Write-Host "Starting Rube MCP (port 3015)..." -ForegroundColor Yellow
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot'; node services/rube-mcp/src/index.js"

Write-Host ""
Write-Host "✅ DEPLOYMENT COMPLETE!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Verify your Vercel deployment is live"
Write-Host "2. Test MCP servers: curl http://localhost:3017/health"
Write-Host "3. Start Claude Code to connect to MCP servers"
Write-Host "4. When ready for production, push to GitHub for Coolify deployment"
Write-Host ""
Write-Host "📚 Documentation: DEPLOYMENT_ORCHESTRATION.md" -ForegroundColor Cyan
