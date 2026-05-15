Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

. (Join-Path $PSScriptRoot "BrowserControl.Common.ps1")

$projectRoot = Get-ProjectRoot
$browserControlRoot = Get-BrowserControlRoot
$logFile = Join-Path (Get-LogDirectory) "install-browser-harness.log"
$vendorRoot = Ensure-Directory -Path (Join-Path $browserControlRoot "vendor")
$repoPath = Join-Path $vendorRoot "browser-harness"

Write-BrowserLog -Message "Installing Browser Harness." -LogFile $logFile

if (-not (Test-Path $repoPath)) {
  Invoke-ExternalCommand -FilePath "git" -Arguments @("clone", "https://github.com/browser-use/browser-harness", $repoPath) -LogFile $logFile | Out-Null
}
else {
  Write-BrowserLog -Message "Browser Harness vendor checkout already exists." -LogFile $logFile
}

Push-Location $repoPath
try {
  Invoke-ExternalCommand -FilePath "uv" -Arguments @("sync") -LogFile $logFile | Out-Null
  Invoke-ExternalCommand -FilePath "uv" -Arguments @("tool", "install", "-e", ".", "--force") -LogFile $logFile | Out-Null
}
finally {
  Pop-Location
}

$codexHome = if ($env:CODEX_HOME) { $env:CODEX_HOME } else { Join-Path $env:USERPROFILE ".codex" }
$skillDir = Ensure-Directory -Path (Join-Path $codexHome "skills\\browser-harness")
Copy-Item -Force (Join-Path $repoPath "SKILL.md") (Join-Path $skillDir "SKILL.md")

Write-BrowserLog -Message "Browser Harness installed and skill registered for future Codex sessions." -LogFile $logFile
