param(
  [string]$Url = "about:blank",
  [switch]$UseExistingProfile
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

. (Join-Path $PSScriptRoot "BrowserControl.Common.ps1")

$logFile = Join-Path (Get-LogDirectory) "start-chrome-remote-debugging.log"
$info = Start-RemoteChrome -Url $Url -UseExistingProfile:$UseExistingProfile -LogFile $logFile

[pscustomobject]@{
  browser = $info.Browser
  debugger = $info.webSocketDebuggerUrl
  url = $info.webSocketDebuggerUrl
  note = "Chrome is listening on http://127.0.0.1:9222 while remote debugging remains enabled."
} | ConvertTo-Json -Depth 5
