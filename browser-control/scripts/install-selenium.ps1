Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

. (Join-Path $PSScriptRoot "BrowserControl.Common.ps1")

$browserControlRoot = Get-BrowserControlRoot
$logFile = Join-Path (Get-LogDirectory) "install-selenium.log"
$venvPath = Join-Path $browserControlRoot ".venv-selenium"
$pythonPath = Join-Path $venvPath "Scripts\\python.exe"

Write-BrowserLog -Message "Installing optional Selenium fallback environment." -LogFile $logFile

if (-not (Test-Path $pythonPath)) {
  Invoke-ExternalCommand -FilePath "uv" -Arguments @("venv", $venvPath) -LogFile $logFile | Out-Null
}

Invoke-ExternalCommand -FilePath "uv" -Arguments @("pip", "install", "--python", $pythonPath, "selenium", "webdriver-manager") -LogFile $logFile | Out-Null

Write-BrowserLog -Message ("Selenium fallback is ready at {0}" -f $venvPath) -LogFile $logFile
