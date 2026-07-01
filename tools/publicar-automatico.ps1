param(
  [string]$Version = "",
  [string]$Message = "",
  [switch]$NoPush,
  [switch]$DeployVercel
)

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$versionPath = Join-Path $root "version.json"

function Get-NextLocalVersion {
  if (-not (Test-Path -LiteralPath $versionPath)) {
    return "local-1.0.0"
  }

  $current = Get-Content -LiteralPath $versionPath -Raw | ConvertFrom-Json
  $currentVersion = [string]$current.version
  if ($currentVersion -match '^local-(\d+)\.(\d+)\.(\d+)$') {
    $major = [int]$Matches[1]
    $minor = [int]$Matches[2]
    $patch = [int]$Matches[3] + 1
    return "local-$major.$minor.$patch"
  }

  return "local-$(Get-Date -Format 'yyyyMMdd.HHmm')"
}

function Invoke-Step([string]$Name, [scriptblock]$Command) {
  Write-Host ""
  Write-Host "==> $Name"
  & $Command
}

if (-not $Version) {
  $Version = Get-NextLocalVersion
}

if (-not $Message) {
  $Message = "Publica $Version"
}

Invoke-Step "Preparando versao $Version" {
  & (Join-Path $root "tools\gerar-versao-publicacao.ps1") -Version $Version
}

Invoke-Step "Gerando build" {
  Push-Location $root
  try {
    npm run build
  } finally {
    Pop-Location
  }
}

Invoke-Step "Validando app" {
  Push-Location $root
  try {
    npm run verify:app
  } finally {
    Pop-Location
  }
}

Invoke-Step "Registrando no Git" {
  Push-Location $root
  try {
    git add -A
    $pending = git status --porcelain
    if (-not $pending) {
      Write-Host "Nenhuma alteracao para commit."
    } else {
      git commit -m $Message
    }
  } finally {
    Pop-Location
  }
}

if (-not $NoPush) {
  Invoke-Step "Enviando para GitHub" {
    Push-Location $root
    try {
      $remote = git remote get-url origin 2>$null
      if (-not $remote) {
        throw "Nenhum remoto 'origin' configurado. Configure com: git remote add origin https://github.com/USUARIO/REPOSITORIO.git"
      }
      $branch = git branch --show-current
      if (-not $branch) { $branch = "main" }
      git push -u origin $branch
    } finally {
      Pop-Location
    }
  }
}

if ($DeployVercel) {
  Invoke-Step "Publicando na Vercel" {
    Push-Location $root
    try {
      $env:NODE_OPTIONS = "--use-system-ca"
      npx vercel deploy --prod --yes
    } finally {
      Pop-Location
    }
  }
}

Write-Host ""
Write-Host "Publicacao automatica concluida para $Version."
