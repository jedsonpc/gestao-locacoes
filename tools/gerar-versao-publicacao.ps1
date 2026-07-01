param(
  [string]$Version = "",
  [switch]$SkipZip
)

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$versionPath = Join-Path $root "version.json"
$packagePath = Join-Path $root "update-package.json"
$publicDir = Join-Path $root "publicacao-github-pages"
$zipName = "rio-dos-passos-atualizacao.zip"
$createdAt = (Get-Date).ToString("yyyy-MM-ddTHH:mm:sszzz")

if (-not $Version) {
  if (Test-Path -LiteralPath $versionPath) {
    $current = Get-Content -LiteralPath $versionPath -Raw | ConvertFrom-Json
    $Version = $current.version
  }
}
if (-not $Version) {
  throw "Informe a versao. Exemplo: .\tools\gerar-versao-publicacao.ps1 -Version local-1.8.5"
}

$metadata = [ordered]@{
  version = $Version
  commit = "local"
  deployedAt = $createdAt
}
$metadata | ConvertTo-Json -Depth 3 | Set-Content -LiteralPath $versionPath -Encoding UTF8

$updatePackage = [ordered]@{
  fileName = $zipName
  version = $Version
  versionedFileName = "rio-dos-passos-atualizacao-$Version.zip"
  commit = "local"
  createdAt = $createdAt
}
$updatePackage | ConvertTo-Json -Depth 3 | Set-Content -LiteralPath $packagePath -Encoding UTF8

$jsFiles = @(
  (Join-Path $root "app.js"),
  (Join-Path $publicDir "app.js")
)
foreach ($file in $jsFiles) {
  if (-not (Test-Path -LiteralPath $file)) { continue }
  $text = Get-Content -LiteralPath $file -Raw -Encoding UTF8
  $text = $text -replace 'const appVersion = "[^"]+";', "const appVersion = `"$Version`";"
  $text = $text -replace 'const appDeployedAt = "[^"]+";', "const appDeployedAt = `"$createdAt`";"
  Set-Content -LiteralPath $file -Value $text -Encoding UTF8
}

$swFiles = @(
  (Join-Path $root "sw.js"),
  (Join-Path $publicDir "sw.js")
)
foreach ($file in $swFiles) {
  if (-not (Test-Path -LiteralPath $file)) { continue }
  $text = Get-Content -LiteralPath $file -Raw -Encoding UTF8
  $text = $text -replace 'const appVersion = "[^"]+";', "const appVersion = `"$Version`";"
  Set-Content -LiteralPath $file -Value $text -Encoding UTF8
}

$htmlFiles = @(
  (Join-Path $root "index.html"),
  (Join-Path $publicDir "index.html")
)
$queryVersion = ($Version -replace '[^0-9A-Za-z_.-]', '-')
foreach ($file in $htmlFiles) {
  if (-not (Test-Path -LiteralPath $file)) { continue }
  $text = Get-Content -LiteralPath $file -Raw -Encoding UTF8
  $text = $text -replace 'styles\.css\?v=[^"]+', "styles.css?v=$queryVersion"
  $text = $text -replace 'supabase-sync\.js\?v=[^"]+', "supabase-sync.js?v=$queryVersion"
  $text = $text -replace 'update-checker\.js\?v=[^"]+', "update-checker.js?v=$queryVersion"
  $text = $text -replace 'app\.js\?v=[^"]+', "app.js?v=$queryVersion"
  $text = $text -replace '<strong id="metric-app-version">[^<]+</strong>', "<strong id=`"metric-app-version`">$Version</strong>"
  Set-Content -LiteralPath $file -Value $text -Encoding UTF8
}

$publishFiles = @(
  "index.html",
  "instalar-celular.html",
  "app.js",
  "styles.css",
  "supabase-config.js",
  "supabase-sync.js",
  "update-checker.js",
  "sw.js",
  "manifest.webmanifest",
  "version.json",
  "update-package.json",
  "icon.svg",
  "icon-192.png",
  "icon-512.png",
  "logo-imobiliaria-rio.svg",
  "login.html"
)
New-Item -ItemType Directory -Force -Path $publicDir | Out-Null
foreach ($name in $publishFiles) {
  $source = Join-Path $root $name
  if (Test-Path -LiteralPath $source) {
    Copy-Item -LiteralPath $source -Destination (Join-Path $publicDir $name) -Force
  }
}

if (-not $SkipZip) {
  $zipPath = Join-Path $root $zipName
  $versionedZipPath = Join-Path $root "rio-dos-passos-atualizacao-$Version.zip"
  if (Test-Path -LiteralPath $zipPath) { Remove-Item -LiteralPath $zipPath -Force }
  if (Test-Path -LiteralPath $versionedZipPath) { Remove-Item -LiteralPath $versionedZipPath -Force }
  Compress-Archive -Path (Join-Path $publicDir "*") -DestinationPath $zipPath -Force
  Copy-Item -LiteralPath $zipPath -Destination $versionedZipPath -Force
}

Write-Host "Versao/publicacao preparada: $Version ($createdAt)"
