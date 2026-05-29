param(
  [Parameter(Mandatory = $true)]
  [string]$ApplicationUuid,

  [string]$CoolifyUrl = "https://app.coolify.io",

  [string[]]$SupportEnvPaths = @(
    "E:\THE PAULI FILES\.ENV",
    "E:\THE PAULI FILES\.env files.txt"
  ),

  [string[]]$AppEnvPaths = @(
    "E:\THE PAULI FILES\.ENV",
    "E:\THE PAULI FILES\.env files.txt"
  ),

  [string]$AppEnvAllowPattern = '^(NEXT_PUBLIC_|SUPABASE_|OPENROUTER_API_KEY|OPENAI_API_KEY|ANTHROPIC_API_KEY|FIRECRAWL_API_KEY|STRIPE_|TWILIO_|DATABASE_URL$|PG_|NEXTAUTH_|AUTH_|NODE_ENV$|HEALTH_CHECK_PATH$)',

  [string]$HealthUrl,

  [string]$GitRepository,
  [string]$GitBranch,
  [string]$ProjectUuid,
  [string]$ServerUuid,
  [string]$EnvironmentName,
  [string]$BuildPack,
  [string]$PortsExposes,
  [string]$Domains,
  [string]$BaseDirectory,
  [string]$HealthCheckPath,
  [string]$StartCommand,
  [string]$BuildCommand,
  [string]$PublishDirectory,
  [switch]$InstantDeploy,
  [switch]$AutoDeployEnabled,
  [switch]$ForceHttps,
  [switch]$Restart,
  [switch]$Deploy,

  [string]$HostingerSshHost,
  [string]$HostingerSshUser = "root",
  [string]$HostingerSshKeyPath,
  [string]$HostingerBootstrapCommand = "hostname && whoami",

  [string]$ReportPath = (Join-Path $PSScriptRoot "..\..\..\ops\reports\coolify-one-click-deploy.json")
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Write-Report {
  param([Parameter(Mandatory = $true)][object]$Data)
  $dir = Split-Path -Parent $ReportPath
  if (-not (Test-Path $dir)) {
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
  }
  $Data | ConvertTo-Json -Depth 12 | Set-Content -Path $ReportPath
}

function Read-DeploymentMap {
  param([string[]]$Paths)
  $map = [ordered]@{}

  foreach ($path in $Paths) {
    if (-not (Test-Path $path)) { continue }
    $raw = Get-Content $path -Raw
    foreach ($match in [regex]::Matches($raw, '"name"\s*:\s*"(?<key>[^"]+)"\s*,\s*"value"\s*:\s*"(?<value>(?:\\.|[^"])*)"')) {
      $key = $match.Groups['key'].Value
      $value = $match.Groups['value'].Value -replace '\\n', "`n" -replace '\\"', '"'
      if ($key) { $map[$key] = $value }
    }

    foreach ($line in ($raw -split "`r?`n")) {
      $trim = $line.Trim()
      if (-not $trim -or $trim.StartsWith('#')) { continue }
      if ($trim -match '^(?<key>[A-Za-z0-9_]+)\s*=\s*(?<value>.*)$') {
        $key = $matches['key']
        $value = $matches['value'].Trim()
        if (($value.StartsWith('"') -and $value.EndsWith('"')) -or ($value.StartsWith("'") -and $value.EndsWith("'"))) {
          if ($value.Length -ge 2) { $value = $value.Substring(1, $value.Length - 2) }
        }
        if ($key) { $map[$key] = $value }
      }
    }
  }

  return $map
}

function Get-AuthHeader {
  param([string[]]$CandidateKeys, [hashtable]$SupportMap)

  $candidateTokens = New-Object System.Collections.Generic.List[string]
  foreach ($key in $CandidateKeys) {
    if ($SupportMap.ContainsKey($key) -and $SupportMap[$key]) {
      $candidateTokens.Add([string]$SupportMap[$key])
    }
  }

  foreach ($token in $candidateTokens) {
    foreach ($prefix in @('Bearer ', 'Token ', '')) {
      try {
        $headers = @{ Authorization = ($prefix + $token) }
        Invoke-RestMethod -Method Get -Uri ($CoolifyUrl.TrimEnd('/') + '/api/v1/version') -Headers $headers -TimeoutSec 20 | Out-Null
        return $headers
      }
      catch {
        continue
      }
    }
  }

  throw "No valid Coolify API token worked against /api/v1/version. Provide a current app.coolify.io API token or sign in through the browser."
}

function Invoke-CoolifyApi {
  param(
    [Parameter(Mandatory = $true)][ValidateSet('GET', 'POST', 'PATCH', 'DELETE')][string]$Method,
    [Parameter(Mandatory = $true)][string]$Path,
    [Parameter(Mandatory = $false)]$Body = $null,
    [Parameter(Mandatory = $true)][hashtable]$Headers
  )

  $uri = $CoolifyUrl.TrimEnd('/') + '/api/v1' + $Path
  $params = @{
    Method = $Method
    Uri = $uri
    Headers = $Headers
    TimeoutSec = 60
  }
  if ($null -ne $Body) {
    $params.ContentType = 'application/json'
    $params.Body = ($Body | ConvertTo-Json -Depth 12)
  }

  try {
    return Invoke-RestMethod @params
  }
  catch {
    throw "Coolify API call failed: $Method $Path :: $($_.Exception.Message)"
  }
}

function Get-AllowedEnvEntries {
  param(
    [hashtable]$AppMap,
    [string]$AllowPattern
  )

  $entries = @()
  foreach ($key in $AppMap.Keys) {
    if ($key -match $AllowPattern) {
      $value = [string]$AppMap[$key]
      $entries += [pscustomobject]@{
        key           = $key
        value         = $value
        is_preview    = $false
        is_literal    = $true
        is_multiline  = ($value -match "`n")
        is_shown_once = ($value -match '(?i)private key|BEGIN RSA PRIVATE KEY|BEGIN OPENSSH PRIVATE KEY')
      }
    }
  }
  return $entries
}

function Sync-EnvBulk {
  param(
    [hashtable]$Headers,
    [array]$Entries
  )

  if (-not $Entries -or $Entries.Count -eq 0) {
    return @()
  }

  $results = @()
  $chunkSize = 25
  for ($i = 0; $i -lt $Entries.Count; $i += $chunkSize) {
    $chunk = $Entries[$i..([Math]::Min($i + $chunkSize - 1, $Entries.Count - 1))]
    $body = @{ data = @($chunk) }
    $results += Invoke-CoolifyApi -Method PATCH -Path "/applications/$ApplicationUuid/envs/bulk" -Body $body -Headers $Headers
  }
  return $results
}

function Build-AppPatch {
  $patch = @{}
  $pairs = @(
    @{ Name = 'project_uuid'; Value = $ProjectUuid },
    @{ Name = 'server_uuid'; Value = $ServerUuid },
    @{ Name = 'environment_name'; Value = $EnvironmentName },
    @{ Name = 'git_repository'; Value = $GitRepository },
    @{ Name = 'git_branch'; Value = $GitBranch },
    @{ Name = 'build_pack'; Value = $BuildPack },
    @{ Name = 'ports_exposes'; Value = $PortsExposes },
    @{ Name = 'domains'; Value = $Domains },
    @{ Name = 'base_directory'; Value = $BaseDirectory },
    @{ Name = 'health_check_path'; Value = $HealthCheckPath },
    @{ Name = 'start_command'; Value = $StartCommand },
    @{ Name = 'build_command'; Value = $BuildCommand },
    @{ Name = 'publish_directory'; Value = $PublishDirectory }
  )

  foreach ($pair in $pairs) {
    if ($null -ne $pair.Value -and [string]$pair.Value -ne '') {
      $patch[$pair.Name] = $pair.Value
    }
  }

  if ($InstantDeploy.IsPresent) { $patch['instant_deploy'] = $true }
  if ($AutoDeployEnabled.IsPresent) { $patch['is_auto_deploy_enabled'] = $true }
  if ($ForceHttps.IsPresent) { $patch['is_force_https_enabled'] = $true }

  return $patch
}

$supportMap = Read-DeploymentMap -Paths $SupportEnvPaths
$appMap = Read-DeploymentMap -Paths $AppEnvPaths
$headers = Get-AuthHeader -CandidateKeys @('COOLIFY_API_TOKEN', 'COOLIFY_API_TOKEN_ALT', 'COOLIFY_API_TOKEN_ALT2', 'COOLIFY_CLOUD_TOKEN') -SupportMap $supportMap

$app = Invoke-CoolifyApi -Method GET -Path "/applications/$ApplicationUuid" -Headers $headers
$currentEnvs = Invoke-CoolifyApi -Method GET -Path "/applications/$ApplicationUuid/envs" -Headers $headers
$allowedEntries = Get-AllowedEnvEntries -AppMap $appMap -AllowPattern $AppEnvAllowPattern
$syncResult = Sync-EnvBulk -Headers $headers -Entries $allowedEntries

$patch = Build-AppPatch
if ($patch.Count -gt 0) {
  [void](Invoke-CoolifyApi -Method PATCH -Path "/applications/$ApplicationUuid" -Body $patch -Headers $headers)
}

$deployResult = $null
if ($Restart.IsPresent) {
  $deployResult = Invoke-CoolifyApi -Method GET -Path "/applications/$ApplicationUuid/restart" -Headers $headers
}
elseif ($Deploy.IsPresent) {
  $deployResult = Invoke-CoolifyApi -Method GET -Path "/applications/$ApplicationUuid/start" -Headers $headers
}

$health = $null
if ($HealthUrl) {
  try {
    $health = Invoke-WebRequest -Uri $HealthUrl -TimeoutSec 30 -UseBasicParsing
  }
  catch {
    $health = [pscustomobject]@{ error = $_.Exception.Message }
  }
}

if ($HostingerSshHost -and $HostingerSshKeyPath) {
  $sshArgs = @('-i', $HostingerSshKeyPath, '-o', 'StrictHostKeyChecking=accept-new', "$HostingerSshUser@$HostingerSshHost", $HostingerBootstrapCommand)
  try {
    $sshOutput = & ssh @sshArgs 2>&1
    $sshExit = $LASTEXITCODE
  }
  catch {
    $sshOutput = $_.Exception.Message
    $sshExit = 1
  }
}

$report = [ordered]@{
  application_uuid = $ApplicationUuid
  application      = [ordered]@{
    name            = $app.name
    fqdn            = $app.fqdn
    git_repository  = $app.git_repository
    git_branch      = $app.git_branch
    build_pack      = $app.build_pack
    ports_exposes   = $app.ports_exposes
    server_uuid     = $app.server_uuid
    project_uuid    = $app.project_uuid
    environment     = $app.environment_name
  }
  env_sync = [ordered]@{
    candidate_count = $allowedEntries.Count
    synced_count    = ($syncResult | Measure-Object).Count
    allow_pattern   = $AppEnvAllowPattern
  }
  patch = $patch
  deploy = $deployResult
  health = $health
  hostinger = if ($HostingerSshHost -and $HostingerSshKeyPath) {
    [ordered]@{
      host  = $HostingerSshHost
      exit  = $sshExit
      output = ($sshOutput | Out-String).Trim()
    }
  } else { $null }
  report_path = $ReportPath
}

Write-Report -Data $report
$report | ConvertTo-Json -Depth 12
