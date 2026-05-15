Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

. (Join-Path $PSScriptRoot "BrowserControl.Common.ps1")

$browserControlRoot = Get-BrowserControlRoot
$logFile = Join-Path (Get-LogDirectory) "install-chrome-devtools-mcp.log"
$vendorRoot = Ensure-Directory -Path (Join-Path $browserControlRoot "vendor")
$repoPath = Join-Path $vendorRoot "chrome-devtools-mcp"

Write-BrowserLog -Message "Installing Chrome DevTools MCP." -LogFile $logFile

if (-not (Test-Path $repoPath)) {
  Invoke-ExternalCommand -FilePath "git" -Arguments @("clone", "https://github.com/ChromeDevTools/chrome-devtools-mcp", $repoPath) -LogFile $logFile | Out-Null
}
else {
  Write-BrowserLog -Message "Chrome DevTools MCP vendor checkout already exists." -LogFile $logFile
}

Invoke-ExternalCommand -FilePath "codex" -Arguments @("mcp", "add", "chrome-devtools", "--", "npx", "chrome-devtools-mcp@latest") -LogFile $logFile | Out-Null
Invoke-ExternalCommand -FilePath "npm" -Arguments @("install", "-g", "chrome-devtools-mcp@latest") -LogFile $logFile | Out-Null
Invoke-ExternalCommand -FilePath "codex" -Arguments @("mcp", "list") -LogFile $logFile | Out-Null
Invoke-ExternalCommand -FilePath "chrome-devtools" -Arguments @("--version") -LogFile $logFile | Out-Null

Write-BrowserLog -Message "Chrome DevTools MCP is installed globally and declared in the repo MCP config." -LogFile $logFile
