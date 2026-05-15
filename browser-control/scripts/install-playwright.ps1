Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

. (Join-Path $PSScriptRoot "BrowserControl.Common.ps1")

$logFile = Join-Path (Get-LogDirectory) "install-playwright.log"
$browserControlRoot = Get-BrowserControlRoot

Write-BrowserLog -Message "Installing the browser-control Playwright runtime and browser binaries." -LogFile $logFile

Push-Location $browserControlRoot
try {
  Invoke-ExternalCommand -FilePath "npm" -Arguments @("install") -LogFile $logFile | Out-Null
  Invoke-ExternalCommand -FilePath "npx" -Arguments @("playwright", "install", "chromium", "firefox", "webkit") -LogFile $logFile | Out-Null
}
finally {
  Pop-Location
}

Write-BrowserLog -Message "Playwright browser setup complete." -LogFile $logFile
