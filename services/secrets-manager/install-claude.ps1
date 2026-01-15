# Install Secrets Manager to Claude Desktop

$claudeConfigPath = "$env:APPDATA\Claude\claude_desktop_config.json"
$secretsManagerPath = "c:\Users\Trevor\OneDrive\One Drive Total Dump\Srpski\NEW WORLD KIDS 11.23.2025\strapi-template-new-world-kids\services\secrets-manager\dist\index.js"

Write-Host "Installing Secrets Manager to Claude Desktop..." -ForegroundColor Cyan

if (!(Test-Path $claudeConfigPath)) {
    Write-Host "Claude Desktop config not found at: $claudeConfigPath" -ForegroundColor Red
    Write-Host "Please install Claude Desktop first" -ForegroundColor Yellow
    exit 1
}

$config = Get-Content $claudeConfigPath | ConvertFrom-Json

if (!$config.mcpServers) {
    $config | Add-Member -MemberType NoteProperty -Name "mcpServers" -Value @{}
}

$config.mcpServers | Add-Member -MemberType NoteProperty -Name "secrets-manager" -Value @{
    command = "node"
    args = @($secretsManagerPath)
} -Force

$config | ConvertTo-Json -Depth 10 | Set-Content $claudeConfigPath

Write-Host "SUCCESS: Secrets Manager installed!" -ForegroundColor Green
Write-Host ""
Write-Host "Next: Restart Claude Desktop" -ForegroundColor Yellow
Write-Host "Then ask Claude to list MCP tools" -ForegroundColor Yellow
