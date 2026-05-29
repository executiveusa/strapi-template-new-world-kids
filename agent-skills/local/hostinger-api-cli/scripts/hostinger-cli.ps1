param(
  [Parameter(Mandatory = $true)]
  [ValidateSet('list', 'search', 'call', 'bake', 'login', 'logout')]
  [string]$Command,

  [string]$Tool,
  [string[]]$Args = @(),
  [string]$Binary = 'hostinger-api-mcp',
  [string]$BakeName = 'hostinger-vps',
  [string[]]$EnvPaths = @(
    'E:\THE PAULI FILES\.ENV',
    'E:\THE PAULI FILES\.env files.txt'
  )
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Read-DeploymentMap {
  param([string[]]$Paths)
  $map = [ordered]@{}
  foreach ($path in $Paths) {
    if (-not (Test-Path $path)) { continue }
    $raw = Get-Content $path -Raw
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

function Get-HostingerToken {
  param([hashtable]$Map)
  if ($env:HOSTINGER_API_TOKEN) { return $env:HOSTINGER_API_TOKEN }
  if ($Map.ContainsKey('HOSTINGER_API_TOKEN') -and $Map['HOSTINGER_API_TOKEN']) { return [string]$Map['HOSTINGER_API_TOKEN'] }
  if ($Map.ContainsKey('HOSTINGER_TOKEN') -and $Map['HOSTINGER_TOKEN']) { return [string]$Map['HOSTINGER_TOKEN'] }
  throw 'HOSTINGER_API_TOKEN was not found in process env or approved env files.'
}

$envMap = Read-DeploymentMap -Paths $EnvPaths
$token = Get-HostingerToken -Map $envMap
$serverCmd = "npx $Binary"
$previousToken = $env:HOSTINGER_API_TOKEN
$previousApiToken = $env:API_TOKEN
$env:HOSTINGER_API_TOKEN = $token
$env:API_TOKEN = $token

switch ($Command) {
  'login' {
    & npx hostinger-api-mcp --login
  }
  'logout' {
    & npx hostinger-api-mcp --logout
  }
  'list' {
    & uvx mcp2cli --mcp-stdio $serverCmd --list
  }
  'search' {
    if (-not $Args -or $Args.Count -eq 0) { throw 'search requires a keyword' }
    & uvx mcp2cli --mcp-stdio $serverCmd --search $Args[0]
  }
  'call' {
    if (-not $Tool) { throw 'call requires --Tool <tool-name>' }
    & uvx mcp2cli --mcp-stdio $serverCmd $Tool @Args
  }
  'bake' {
    & uvx mcp2cli bake create $BakeName --mcp-stdio $serverCmd --env HOSTINGER_API_TOKEN
    & uvx mcp2cli bake install $BakeName
  }
}

if ($null -ne $previousToken) {
  $env:HOSTINGER_API_TOKEN = $previousToken
} else {
  Remove-Item Env:HOSTINGER_API_TOKEN -ErrorAction SilentlyContinue
}

if ($null -ne $previousApiToken) {
  $env:API_TOKEN = $previousApiToken
} else {
  Remove-Item Env:API_TOKEN -ErrorAction SilentlyContinue
}
