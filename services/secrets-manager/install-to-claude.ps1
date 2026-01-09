# Install Secrets Manager to Claude Desktop
# Run this script to add the secrets manager to Claude Desktop

$claudeConfigPath = "$env:APPDATA\Claude\claude_desktop_config.json"
$secretsManagerPath = "c:\Users\Trevor\OneDrive\One Drive Total Dump\Srpski\NEW WORLD KIDS 11.23.2025\strapi-template-new-world-kids\services\secrets-manager\dist\index.js"

Write-Host "🔐 Installing Secrets Manager to Claude Desktop..." -ForegroundColor Cyan

# Check if Claude config exists
if (!(Test-Path $claudeConfigPath)) {
    Write-Host "❌ Claude Desktop config not found at: $claudeConfigPath" -ForegroundColor Red
    Write-Host "Please install Claude Desktop first" -ForegroundColor Yellow
    exit 1
}

# Read existing config
$config = Get-Content $claudeConfigPath | ConvertFrom-Json

# Ensure mcpServers exists
if (!$config.mcpServers) {
    $config | Add-Member -MemberType NoteProperty -Name "mcpServers" -Value @{}
}

# Add secrets-manager
$config.mcpServers | Add-Member -MemberType NoteProperty -Name "secrets-manager" -Value @{
    command = "node"
    args = @($secretsManagerPath)
    env = @{
        VAULT_ENCRYPTION_KEY = ""  # Will be auto-generated on first use
    }
} -Force

# Save config
$config | ConvertTo-Json -Depth 10 | Set-Content $claudeConfigPath

Write-Host "Secrets Manager installed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Restart Claude Desktop"
Write-Host "2. Ask Claude to list available MCP tools"
Write-Host "3. You should see store_secret, get_secret, etc."
Write-Host ""
Write-Host "Example usage:" -ForegroundColor Cyan
Write-Host "  Store my OpenAI API key"
Write-Host "  Generate a new JWT secret"
Write-Host "  Export production secrets to env file"
