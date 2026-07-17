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
$pwaDir = Join-Path $root "Rio-dos-Passos-App-PWA-para-publicar"
$installerDir = Join-Path $root "Rio-dos-Passos-Instalador-Completo"
$pwaZipName = "Rio-dos-Passos-App-PWA-para-publicar.zip"
$installerZipName = "Rio-dos-Passos-Instalador-Completo.zip"
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
  $text = $text -replace 'const cacheName = `gestao-locacoes-\$\{appVersion\}`;', 'const cacheName = `gestao-locacoes-${appVersion}-mobile-refresh`;'
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
if (Test-Path -LiteralPath $publicDir) { Remove-Item -LiteralPath $publicDir -Recurse -Force }
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
  $pwaZipPath = Join-Path $root $pwaZipName
  $versionedPwaZipPath = Join-Path $root "Rio-dos-Passos-App-PWA-para-publicar-$Version.zip"
  $installerZipPath = Join-Path $root $installerZipName
  $versionedInstallerZipPath = Join-Path $root "Rio-dos-Passos-Instalador-Completo-$Version.zip"
  $pwaTempZipPath = Join-Path $root "_tmp-pwa-publicacao.zip"
  $installerTempZipPath = Join-Path $root "_tmp-instalador-completo.zip"

  foreach ($dir in @($pwaDir, $installerDir)) {
    if (Test-Path -LiteralPath $dir) { Remove-Item -LiteralPath $dir -Recurse -Force }
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
  }

  Copy-Item -Path (Join-Path $publicDir "*") -Destination $pwaDir -Recurse -Force

  $installerAppDir = Join-Path $installerDir "app"
  New-Item -ItemType Directory -Force -Path $installerAppDir | Out-Null
  Copy-Item -Path (Join-Path $publicDir "*") -Destination $installerAppDir -Recurse -Force

  $installerRootFiles = @(
    "instalar-atalho-windows.bat",
    "abrir-rio-dos-passos-navegador.bat",
    "INSTALAR-ANDROID-IOS.md",
    "LEIA-ME-PRIMEIRO.txt",
    "LEIA-ME-INSTALACAO.txt",
    "LEIA-ME-ATUALIZACAO.txt",
    "LEIA-ME-ATUALIZAR-OUTRA-MAQUINA.txt"
  )
  foreach ($name in $installerRootFiles) {
    $source = Join-Path $root $name
    if (Test-Path -LiteralPath $source) {
      Copy-Item -LiteralPath $source -Destination (Join-Path $installerDir $name) -Force
    }
  }

  foreach ($name in $installerRootFiles) {
    $docPath = Join-Path $installerDir $name
    if (-not (Test-Path -LiteralPath $docPath)) { continue }
    $doc = Get-Content -LiteralPath $docPath -Raw -Encoding UTF8
    $doc = $doc -replace 'local-\d+\.\d+\.\d+', $Version
    $doc = $doc -replace 'rio-passos-atualizacao-local-\d+\.\d+\.\d+\.zip', "rio-dos-passos-atualizacao-$Version.zip"
    $doc = $doc -replace 'rio-dos-passos-atualizacao-local-\d+\.\d+\.\d+\.zip', "rio-dos-passos-atualizacao-$Version.zip"
    $doc = $doc -replace 'Rio dos Passos - Atualizacao [^\r\n]+', "Rio dos Passos - Atualizacao $Version"
    $doc = $doc -replace 'Rio Passos - Atualizacao [^\r\n]+', "Rio dos Passos - Atualizacao $Version"
    $doc = $doc -replace 'Versao do pacote: [^\r\n]+', "Versao do pacote: $Version"
    Set-Content -LiteralPath $docPath -Value $doc -Encoding UTF8
  }

  $installersSource = Join-Path $root "installers"
  if (Test-Path -LiteralPath $installersSource) {
    Copy-Item -LiteralPath $installersSource -Destination (Join-Path $installerDir "installers") -Recurse -Force
    $generatedInstallerScript = Join-Path $installerDir "installers\instalar-atalho-windows.ps1"
    if (Test-Path -LiteralPath $generatedInstallerScript) {
      $installerText = Get-Content -LiteralPath $generatedInstallerScript -Raw -Encoding UTF8
      $installerText = $installerText -replace 'local-\d+\.\d+\.\d+', $Version
      Set-Content -LiteralPath $generatedInstallerScript -Value $installerText -Encoding UTF8
    }
  }

  $readmePath = Join-Path $installerDir "LEIA-ME-PRIMEIRO.txt"
  if (Test-Path -LiteralPath $readmePath) {
    $readme = Get-Content -LiteralPath $readmePath -Raw -Encoding UTF8
    $readme = $readme -replace 'Versao: [^\r\n]+', "Versao: $Version"
    $readme = $readme -replace 'Gerado em: [^\r\n]+', "Gerado em: $createdAt"
    Set-Content -LiteralPath $readmePath -Value $readme -Encoding UTF8
  }

  if (Test-Path -LiteralPath $zipPath) { Remove-Item -LiteralPath $zipPath -Force }
  if (Test-Path -LiteralPath $versionedZipPath) { Remove-Item -LiteralPath $versionedZipPath -Force }
  if (Test-Path -LiteralPath $pwaZipPath) { Remove-Item -LiteralPath $pwaZipPath -Force }
  if (Test-Path -LiteralPath $versionedPwaZipPath) { Remove-Item -LiteralPath $versionedPwaZipPath -Force }
  if (Test-Path -LiteralPath $installerZipPath) { Remove-Item -LiteralPath $installerZipPath -Force }
  if (Test-Path -LiteralPath $versionedInstallerZipPath) { Remove-Item -LiteralPath $versionedInstallerZipPath -Force }
  if (Test-Path -LiteralPath $pwaTempZipPath) { Remove-Item -LiteralPath $pwaTempZipPath -Force }
  if (Test-Path -LiteralPath $installerTempZipPath) { Remove-Item -LiteralPath $installerTempZipPath -Force }

  Compress-Archive -Path (Join-Path $publicDir "*") -DestinationPath $zipPath -Force
  Copy-Item -LiteralPath $zipPath -Destination $versionedZipPath -Force

  Compress-Archive -Path (Join-Path $pwaDir "*") -DestinationPath $pwaTempZipPath -Force
  Move-Item -LiteralPath $pwaTempZipPath -Destination $pwaZipPath -Force
  Copy-Item -LiteralPath $pwaZipPath -Destination $versionedPwaZipPath -Force

  Compress-Archive -Path (Join-Path $installerDir "*") -DestinationPath $installerTempZipPath -Force
  Move-Item -LiteralPath $installerTempZipPath -Destination $installerZipPath -Force
  Copy-Item -LiteralPath $installerZipPath -Destination $versionedInstallerZipPath -Force
}

Write-Host "Versao/publicacao preparada: $Version ($createdAt)"
