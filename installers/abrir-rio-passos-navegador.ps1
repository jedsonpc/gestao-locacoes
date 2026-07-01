$ErrorActionPreference = "SilentlyContinue"

$packageRoot = Split-Path -Parent $PSScriptRoot
$portableApp = Join-Path $packageRoot "app"
$installedApp = Join-Path $env:LOCALAPPDATA "RioPassosApp\app"
$appDir = if (Test-Path (Join-Path $installedApp "index.html")) { $installedApp } else { $portableApp }
$indexFile = Join-Path $appDir "index.html"
$url = "http://127.0.0.1:4173/?v=1.7.1"

function Test-LocalServer {
  try {
    $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 2
    return $response.StatusCode -ge 200 -and $response.StatusCode -lt 500
  } catch {
    return $false
  }
}

if (!(Test-Path $indexFile)) {
  Write-Host "Arquivo index.html nao encontrado em: $appDir"
  pause
  exit 1
}

if (!(Test-LocalServer)) {
  $py = Get-Command "py.exe" -ErrorAction SilentlyContinue
  $python = Get-Command "python.exe" -ErrorAction SilentlyContinue
  $python3 = Get-Command "python3.exe" -ErrorAction SilentlyContinue

  if ($py) {
    Start-Process -FilePath $py.Source -ArgumentList "-3","-m","http.server","4173","--bind","127.0.0.1","--directory",$appDir -WorkingDirectory $packageRoot -WindowStyle Hidden
  } elseif ($python) {
    Start-Process -FilePath $python.Source -ArgumentList "-m","http.server","4173","--bind","127.0.0.1","--directory",$appDir -WorkingDirectory $packageRoot -WindowStyle Hidden
  } elseif ($python3) {
    Start-Process -FilePath $python3.Source -ArgumentList "-m","http.server","4173","--bind","127.0.0.1","--directory",$appDir -WorkingDirectory $packageRoot -WindowStyle Hidden
  } else {
    Start-Process $indexFile
    exit 0
  }

  Start-Sleep -Seconds 2
}

if (Test-LocalServer) {
  Start-Process $url
} else {
  Start-Process $indexFile
}
