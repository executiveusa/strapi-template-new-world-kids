Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
$PSNativeCommandUseErrorActionPreference = $false

function Get-ProjectRoot {
  return (Resolve-Path (Join-Path $PSScriptRoot "..\\..")).Path
}

function Get-BrowserControlRoot {
  return (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
}

function Ensure-Directory {
  param([Parameter(Mandatory = $true)][string]$Path)

  if (-not (Test-Path $Path)) {
    New-Item -ItemType Directory -Force -Path $Path | Out-Null
  }

  return (Resolve-Path $Path).Path
}

function Get-ArtifactDirectory {
  return Ensure-Directory -Path (Join-Path (Get-BrowserControlRoot) "artifacts")
}

function Get-LogDirectory {
  return Ensure-Directory -Path (Join-Path (Get-BrowserControlRoot) "logs")
}

function Write-BrowserLog {
  param(
    [Parameter(Mandatory = $true)][string]$Message,
    [string]$LogFile
  )

  $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
  $line = "[$timestamp] $Message"
  Write-Host $line
  if ($LogFile) {
    Add-Content -Path $LogFile -Value $line
  }
}

function Resolve-ExecutablePath {
  param([Parameter(Mandatory = $true)][string]$CommandName)

  $candidates = if ([System.IO.Path]::GetExtension($CommandName)) {
    @($CommandName)
  }
  else {
    @(
      "$CommandName.exe",
      "$CommandName.cmd",
      "$CommandName.bat",
      $CommandName
    )
  }

  foreach ($candidate in $candidates) {
    try {
      $command = Get-Command $candidate -ErrorAction Stop
      return $command.Source
    }
    catch {
      continue
    }
  }

  throw "Could not resolve executable path for '$CommandName'."
}

function Invoke-ExternalCommand {
  param(
    [Parameter(Mandatory = $true)][string]$FilePath,
    [Parameter(Mandatory = $true)][string[]]$Arguments,
    [string]$LogFile
  )

  $resolvedFilePath = Resolve-ExecutablePath -CommandName $FilePath
  Write-BrowserLog -Message ("Running: {0} {1}" -f $resolvedFilePath, ($Arguments -join " ")) -LogFile $LogFile
  $stdoutPath = Join-Path ([System.IO.Path]::GetTempPath()) ("browser-control-{0}.stdout.log" -f ([guid]::NewGuid()))
  $stderrPath = Join-Path ([System.IO.Path]::GetTempPath()) ("browser-control-{0}.stderr.log" -f ([guid]::NewGuid()))

  try {
    $process = Start-Process `
      -FilePath $resolvedFilePath `
      -ArgumentList $Arguments `
      -NoNewWindow `
      -PassThru `
      -Wait `
      -RedirectStandardOutput $stdoutPath `
      -RedirectStandardError $stderrPath

    [string]$stdout = ""
    if (Test-Path $stdoutPath) {
      $stdout = [string](Get-Content -Raw $stdoutPath)
    }

    [string]$stderr = ""
    if (Test-Path $stderrPath) {
      $stderr = [string](Get-Content -Raw $stderrPath)
    }

    $combinedParts = @()
    if (-not [string]::IsNullOrWhiteSpace($stdout)) {
      $combinedParts += $stdout.TrimEnd()
    }
    if (-not [string]::IsNullOrWhiteSpace($stderr)) {
      $combinedParts += $stderr.TrimEnd()
    }
    [string]$combined = $combinedParts -join [Environment]::NewLine

    if (-not [string]::IsNullOrWhiteSpace($combined)) {
      Write-BrowserLog -Message $combined -LogFile $LogFile
    }

    if (-not $process) {
      throw "Failed to start process for '$resolvedFilePath'."
    }

    if ($process.ExitCode -ne 0) {
      throw "{0} exited with code {1}" -f $FilePath, $process.ExitCode
    }

    return $combined.Trim()
  }
  finally {
    Remove-Item -Force -ErrorAction SilentlyContinue $stdoutPath, $stderrPath
  }
}

function Invoke-JsonCommand {
  param(
    [Parameter(Mandatory = $true)][string]$FilePath,
    [Parameter(Mandatory = $true)][string[]]$Arguments,
    [string]$LogFile
  )

  $output = Invoke-ExternalCommand -FilePath $FilePath -Arguments ($Arguments + @("--output-format=json")) -LogFile $LogFile
  $jsonLine = ($output -split "`r?`n" | Where-Object {
      $trimmed = $_.Trim()
      $trimmed.StartsWith("{") -or $trimmed.StartsWith("[")
    } | Select-Object -First 1)

  if (-not $jsonLine) {
    throw "No JSON payload found in output from '$FilePath'."
  }

  return $jsonLine | ConvertFrom-Json
}

function Get-ChromeExecutable {
  $candidates = @(
    "C:\Program Files\Google\Chrome\Application\chrome.exe",
    "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
  )

  foreach ($candidate in $candidates) {
    if (Test-Path $candidate) {
      return $candidate
    }
  }

  throw "Google Chrome was not found in the standard install locations."
}

function Get-IsolatedChromeProfilePath {
  return Ensure-Directory -Path (Join-Path $env:TEMP "new-world-kids-browser-control")
}

function Get-ChromeVersionInfo {
  try {
    $response = Invoke-RestMethod -Uri "http://127.0.0.1:9222/json/version" -TimeoutSec 3
    return $response
  }
  catch {
    return $null
  }
}

function Wait-ForChromeDebugPort {
  param(
    [int]$TimeoutSeconds = 30,
    [string]$LogFile
  )

  $deadline = (Get-Date).AddSeconds($TimeoutSeconds)
  $attempt = 0
  do {
    $attempt += 1
    $info = Get-ChromeVersionInfo
    if ($info) {
      Write-BrowserLog -Message ("Chrome remote debugging is live after {0} attempt(s)." -f $attempt) -LogFile $LogFile
      return $info
    }

    Write-BrowserLog -Message ("Waiting for Chrome remote debugging on 127.0.0.1:9222 (attempt {0})..." -f $attempt) -LogFile $LogFile
    Start-Sleep -Seconds 2
  } while ((Get-Date) -lt $deadline)

  throw "Chrome remote debugging was not reachable on http://127.0.0.1:9222 within $TimeoutSeconds seconds."
}

function Start-RemoteChrome {
  param(
    [string]$Url = "about:blank",
    [switch]$UseExistingProfile,
    [string]$LogFile
  )

  $chromePath = Get-ChromeExecutable
  $arguments = @("--remote-debugging-port=9222")

  if ($UseExistingProfile) {
    Write-BrowserLog -Message "Starting Chrome with remote debugging against an existing profile. Keep the work scoped and avoid exposing private tabs or account state." -LogFile $LogFile
  }
  else {
    $profileDir = Get-IsolatedChromeProfilePath
    $arguments += "--user-data-dir=$profileDir"
    Write-BrowserLog -Message "Starting Chrome with an isolated browser-control profile." -LogFile $LogFile
  }

  if ($Url) {
    $arguments += $Url
  }

  Write-BrowserLog -Message "Remote debugging warning: local applications can control this browser while port 9222 is open." -LogFile $LogFile
  Start-Process -FilePath $chromePath -ArgumentList $arguments | Out-Null

  return Wait-ForChromeDebugPort -TimeoutSeconds 30 -LogFile $LogFile
}

function Get-CdpWebSocketUrl {
  param([string]$LogFile)

  $info = Wait-ForChromeDebugPort -TimeoutSeconds 10 -LogFile $LogFile
  if (-not $info.webSocketDebuggerUrl) {
    throw "Chrome did not return webSocketDebuggerUrl from /json/version."
  }

  return $info.webSocketDebuggerUrl
}

function Get-AgentWorkspacePath {
  return (Resolve-Path (Join-Path (Get-BrowserControlRoot) "agent-workspace")).Path
}

function Invoke-BrowserHarnessScript {
  param(
    [Parameter(Mandatory = $true)][string]$ScriptPath,
    [string]$LogFile
  )

  $workspace = Get-AgentWorkspacePath
  $wsEndpoint = Get-CdpWebSocketUrl -LogFile $LogFile

  $previousWorkspace = $env:BH_AGENT_WORKSPACE
  $previousWs = $env:BU_CDP_WS
  $previousName = $env:BU_NAME
  $env:BH_AGENT_WORKSPACE = $workspace
  $env:BU_CDP_WS = $wsEndpoint
  $env:BU_NAME = "nwk-browser-control"

  try {
    Write-BrowserLog -Message ("Running Browser Harness script {0}" -f $ScriptPath) -LogFile $LogFile
    $pythonCommand = "exec(open(r'''$ScriptPath''', encoding='utf-8').read())"
    $browserHarnessPath = Resolve-ExecutablePath -CommandName "browser-harness"
    $pythonPath = Resolve-ExecutablePath -CommandName "python"

    $previousErrorActionPreference = $ErrorActionPreference
    $ErrorActionPreference = "Continue"
    $output = & $browserHarnessPath -c $pythonCommand 2>&1
    if ($LASTEXITCODE -ne 0) {
      Write-BrowserLog -Message "Browser Harness failed on the first attempt. Restarting the named daemon and retrying once." -LogFile $LogFile
      & $pythonPath -c "from browser_harness.admin import restart_daemon; restart_daemon('nwk-browser-control')" 2>&1 | Out-Null
      $output = & $browserHarnessPath -c $pythonCommand 2>&1
    }
    $ErrorActionPreference = $previousErrorActionPreference
    if ($LASTEXITCODE -ne 0) {
      throw "browser-harness exited with code $LASTEXITCODE"
    }

    $text = ($output | Out-String).Trim()
    if ($text) {
      Write-BrowserLog -Message $text -LogFile $LogFile
    }
    return $text
  }
  finally {
    $env:BH_AGENT_WORKSPACE = $previousWorkspace
    $env:BU_CDP_WS = $previousWs
    $env:BU_NAME = $previousName
  }
}
