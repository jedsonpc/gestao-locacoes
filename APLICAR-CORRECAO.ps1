$ErrorActionPreference = "Stop"

$source = Split-Path -Parent $MyInvocation.MyCommand.Path
$appRoot = "C:\App Imobiliaria"
$backupRoot = Join-Path $appRoot ("backup-codex-" + (Get-Date -Format "yyyyMMdd-HHmmss"))

if (-not (Test-Path -LiteralPath $appRoot)) {
  throw "A pasta C:\App Imobiliaria nao foi encontrada."
}

New-Item -ItemType Directory -Force -Path $backupRoot | Out-Null

$files = @(
  "app.js",
  "login.html",
  "styles.css",
  "supabase-sync.js",
  "Rio-Passos-Instalador-Completo\app\app.js",
  "Rio-Passos-Instalador-Completo\app\login.html",
  "Rio-Passos-Instalador-Completo\app\styles.css",
  "Rio-Passos-Instalador-Completo\app\supabase-sync.js"
)

foreach ($file in $files) {
  $target = Join-Path $appRoot $file
  if (Test-Path -LiteralPath $target) {
    $backupFile = Join-Path $backupRoot $file
    New-Item -ItemType Directory -Force -Path (Split-Path -Parent $backupFile) | Out-Null
    Copy-Item -LiteralPath $target -Destination $backupFile -Force
  }
}

foreach ($file in $files) {
  $from = Join-Path $source $file
  $to = Join-Path $appRoot $file
  New-Item -ItemType Directory -Force -Path (Split-Path -Parent $to) | Out-Null
  Copy-Item -LiteralPath $from -Destination $to -Force
}

Write-Host "Atualizacao aplicada com sucesso."
Write-Host "Backup dos arquivos anteriores: $backupRoot"
