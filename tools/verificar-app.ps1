$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$errors = New-Object System.Collections.Generic.List[string]

function Fail([string]$Message) {
  $errors.Add($Message) | Out-Null
}

$version = Get-Content -LiteralPath (Join-Path $root "version.json") -Raw | ConvertFrom-Json
$package = Get-Content -LiteralPath (Join-Path $root "update-package.json") -Raw | ConvertFrom-Json
$app = Get-Content -LiteralPath (Join-Path $root "app.js") -Raw -Encoding UTF8
$html = Get-Content -LiteralPath (Join-Path $root "index.html") -Raw -Encoding UTF8

if ($version.version -ne $package.version) {
  Fail "version.json e update-package.json estao com versoes diferentes."
}
if ($app -notmatch [regex]::Escape("const appVersion = `"$($version.version)`";")) {
  Fail "app.js nao esta sincronizado com version.json."
}
if ($app -notmatch "const appDeployedAt = `"[^`"]+`";") {
  Fail "app.js precisa manter appDeployedAt como reserva para a data da versao."
}
foreach ($required in @("bindFinancialCompetenceFields", "confirmDuplicateFinancialLaunch", "isValidDateTime")) {
  if ($app -notmatch $required) {
    Fail "Funcao obrigatoria ausente: $required"
  }
}
if ($html -notmatch "app\.js\?v=" -or $html -notmatch "update-checker\.js\?v=") {
  Fail "index.html precisa manter cache busting nos scripts principais."
}

if ($errors.Count) {
  $errors | ForEach-Object { Write-Error $_ }
  exit 1
}

Write-Host "Verificacao concluida sem pendencias."