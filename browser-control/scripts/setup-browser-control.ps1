param([switch]$IncludeSelenium)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

. (Join-Path $PSScriptRoot "BrowserControl.Common.ps1")

$logFile = Join-Path (Get-LogDirectory) "setup-browser-control.log"
Write-BrowserLog -Message "Running browser-control setup." -LogFile $logFile

& (Join-Path $PSScriptRoot "install-browser-harness.ps1")
& (Join-Path $PSScriptRoot "install-chrome-devtools-mcp.ps1")
& (Join-Path $PSScriptRoot "install-playwright.ps1")

if ($IncludeSelenium) {
  & (Join-Path $PSScriptRoot "install-selenium.ps1")
}

Write-BrowserLog -Message "Browser-control setup complete." -LogFile $logFile
