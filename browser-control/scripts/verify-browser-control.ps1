Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

. (Join-Path $PSScriptRoot "BrowserControl.Common.ps1")

$artifactDir = Get-ArtifactDirectory
$logFile = Join-Path (Get-LogDirectory) "verify-browser-control.log"
$summaryPath = Join-Path $artifactDir "browser-control-summary.json"
$targetUrl = "https://github.com/browser-use/browser-harness"
$chromeDevtoolsPath = Resolve-ExecutablePath -CommandName "chrome-devtools"

function Invoke-ChromeDevToolsText {
  param([Parameter(Mandatory = $true)][string[]]$Arguments)

  Write-BrowserLog -Message ("Running: {0} {1}" -f $chromeDevtoolsPath, ($Arguments -join " ")) -LogFile $logFile
  $output = & $chromeDevtoolsPath @Arguments 2>&1
  if ($LASTEXITCODE -ne 0) {
    throw "chrome-devtools exited with code $LASTEXITCODE"
  }

  $text = ($output | Out-String).Trim()
  if ($text) {
    Write-BrowserLog -Message $text -LogFile $logFile
  }

  return $text
}

function Invoke-ChromeDevToolsJson {
  param([Parameter(Mandatory = $true)][string[]]$Arguments)

  $output = Invoke-ChromeDevToolsText -Arguments ($Arguments + @("--output-format=json"))
  $jsonLine = ($output -split "`r?`n" | Where-Object {
      $trimmed = $_.Trim()
      $trimmed.StartsWith("{") -or $trimmed.StartsWith("[")
    } | Select-Object -First 1)

  if (-not $jsonLine) {
    throw "No JSON payload found in chrome-devtools output."
  }

  return $jsonLine | ConvertFrom-Json
}

Write-BrowserLog -Message "Starting browser-control verification." -LogFile $logFile
$null = Start-RemoteChrome -Url "about:blank" -LogFile $logFile

$harnessRaw = Invoke-BrowserHarnessScript -ScriptPath (Join-Path $PSScriptRoot "smoke\\browser-harness-open.py") -LogFile $logFile
$harnessJsonLine = ($harnessRaw -split "`r?`n" | Where-Object { $_.Trim() } | Select-Object -Last 1)
$harnessResult = $harnessJsonLine | ConvertFrom-Json
Set-Content -Path (Join-Path $artifactDir "browser-harness-smoke.json") -Value ($harnessResult | ConvertTo-Json -Depth 8)

$pages = Invoke-ChromeDevToolsJson -Arguments @("list_pages")
$page = $pages.pages | Where-Object { $_.url -like "*github.com/browser-use/browser-harness*" } | Select-Object -Last 1
if (-not $page) {
  throw "Chrome DevTools CLI did not expose the verification page."
}

Invoke-ChromeDevToolsText -Arguments @("select_page", [string]$page.id, "--bringToFront") | Out-Null

$devtoolsScreenshotRelative = "browser-control/artifacts/chrome-devtools-smoke.png"
$devtoolsScreenshotPath = Join-Path $artifactDir "chrome-devtools-smoke.png"
Invoke-ChromeDevToolsText -Arguments @("take_screenshot", "--filePath", $devtoolsScreenshotRelative) | Out-Null
$devtoolsTitle = [string]$harnessResult.page.title
if ($devtoolsTitle.StartsWith("🟢 ")) {
  $devtoolsTitle = $devtoolsTitle.Substring(2).Trim()
}
$devtoolsPage = [ordered]@{
  title = $devtoolsTitle
  url = $page.url
}
$devtoolsConsole = Invoke-ChromeDevToolsJson -Arguments @("list_console_messages")
$devtoolsNetwork = Invoke-ChromeDevToolsJson -Arguments @("list_network_requests")

$browserControlRoot = Get-BrowserControlRoot
Push-Location $browserControlRoot
try {
  $nodePath = Resolve-ExecutablePath -CommandName "node"
  Write-BrowserLog -Message ("Running: {0} .\\scripts\\smoke\\playwright-cdp-smoke.mjs" -f $nodePath) -LogFile $logFile
  $playwrightOutput = & $nodePath ".\scripts\smoke\playwright-cdp-smoke.mjs" 2>&1
  if ($LASTEXITCODE -ne 0) {
    throw "node exited with code $LASTEXITCODE"
  }

  $playwrightRaw = ($playwrightOutput | Out-String).Trim()
  if ($playwrightRaw) {
    Write-BrowserLog -Message $playwrightRaw -LogFile $logFile
  }
}
finally {
  Pop-Location
}

$playwrightJsonLine = ($playwrightRaw -split "`r?`n" | Where-Object { $_.Trim() } | Select-Object -Last 1)
$playwrightResult = $playwrightJsonLine | ConvertFrom-Json

$summary = [ordered]@{
  targetUrl = $targetUrl
  harness = $harnessResult
  chromeDevTools = [ordered]@{
    selectedPage = $page
    page = $devtoolsPage
    console = $devtoolsConsole
    network = $devtoolsNetwork
    screenshot = $devtoolsScreenshotPath
  }
  playwright = $playwrightResult
}

$summary | ConvertTo-Json -Depth 10 | Set-Content -Path $summaryPath
Write-BrowserLog -Message ("Verification summary written to {0}" -f $summaryPath) -LogFile $logFile

$summary | ConvertTo-Json -Depth 10
