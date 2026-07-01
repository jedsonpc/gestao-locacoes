$ErrorActionPreference = "Stop"

$packageRoot = Split-Path -Parent $PSScriptRoot
$sourceApp = Join-Path $packageRoot "app"
$installRoot = Join-Path $env:LOCALAPPDATA "RioDosPassosApp"
$installApp = Join-Path $installRoot "app"
$startScript = Join-Path $installRoot "iniciar-rio-dos-passos.ps1"
$iconFile = Join-Path $installApp "rio-dos-passos-atalho.ico"

if (!(Test-Path $sourceApp)) {
  throw "Pasta do app nao encontrada: $sourceApp"
}

New-Item -ItemType Directory -Force -Path $installRoot | Out-Null
New-Item -ItemType Directory -Force -Path $installApp | Out-Null

# Atualiza os arquivos por cima em vez de apagar a pasta inteira.
# O servidor local de uma instalacao anterior pode estar usando a pasta app
# como diretorio de trabalho, e nesse caso o Windows bloqueia Remove-Item.
Get-ChildItem -LiteralPath $sourceApp -Force | Copy-Item -Destination $installApp -Recurse -Force

@'
$ErrorActionPreference = "SilentlyContinue"

$AppDir = Join-Path $PSScriptRoot "app"
$IndexFile = Join-Path $AppDir "index.html"
$Url = "http://127.0.0.1:4173/?v=1.7.1"
$PidFile = Join-Path $PSScriptRoot "rio-dos-passos-server.pid"

function Open-Browser($target) {
  $edge = Get-Command "msedge.exe" -ErrorAction SilentlyContinue
  $chrome = Get-Command "chrome.exe" -ErrorAction SilentlyContinue

  if ($edge) {
    Start-Process -FilePath $edge.Source -ArgumentList "--app=$target"
    return
  }

  if ($chrome) {
    Start-Process -FilePath $chrome.Source -ArgumentList "--app=$target"
    return
  }

  Start-Process $target
}

function Test-LocalServer {
  try {
    $response = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 2
    return $response.StatusCode -ge 200 -and $response.StatusCode -lt 500
  } catch {
    return $false
  }
}

if (!(Test-Path $IndexFile)) {
  [System.Windows.Forms.MessageBox]::Show("Arquivo index.html nao encontrado em $AppDir", "Rio dos Passos")
  exit 1
}

if (!(Test-LocalServer)) {
  $py = Get-Command "py.exe" -ErrorAction SilentlyContinue
  $python = Get-Command "python.exe" -ErrorAction SilentlyContinue
  $python3 = Get-Command "python3.exe" -ErrorAction SilentlyContinue

  if ($py) {
    $process = Start-Process -FilePath $py.Source -ArgumentList "-3","-m","http.server","4173","--bind","127.0.0.1","--directory",$AppDir -WorkingDirectory $PSScriptRoot -WindowStyle Hidden -PassThru
  } elseif ($python) {
    $process = Start-Process -FilePath $python.Source -ArgumentList "-m","http.server","4173","--bind","127.0.0.1","--directory",$AppDir -WorkingDirectory $PSScriptRoot -WindowStyle Hidden -PassThru
  } elseif ($python3) {
    $process = Start-Process -FilePath $python3.Source -ArgumentList "-m","http.server","4173","--bind","127.0.0.1","--directory",$AppDir -WorkingDirectory $PSScriptRoot -WindowStyle Hidden -PassThru
  }

  if ($process) {
    Set-Content -LiteralPath $PidFile -Value $process.Id -Encoding ASCII
  }

  Start-Sleep -Seconds 2
}

if (Test-LocalServer) {
  Open-Browser $Url
} else {
  Open-Browser $IndexFile
}
'@ | Set-Content -LiteralPath $startScript -Encoding UTF8

$desktop = [Environment]::GetFolderPath("Desktop")
$programs = [Environment]::GetFolderPath("Programs")
$shortcutName = "Rio dos Passos.lnk"
$desktopShortcut = Join-Path $desktop $shortcutName
$startMenuDir = Join-Path $programs "Rio dos Passos"
$startMenuShortcut = Join-Path $startMenuDir $shortcutName

New-Item -ItemType Directory -Force -Path $startMenuDir | Out-Null

$shell = New-Object -ComObject WScript.Shell
$powershell = Join-Path $env:SystemRoot "System32\WindowsPowerShell\v1.0\powershell.exe"

foreach ($shortcutPath in @($desktopShortcut, $startMenuShortcut)) {
  $shortcut = $shell.CreateShortcut($shortcutPath)
  $shortcut.TargetPath = $powershell
  $shortcut.Arguments = "-NoProfile -ExecutionPolicy Bypass -File `"$startScript`""
  $shortcut.WorkingDirectory = $installRoot
  $shortcut.Description = "Abrir Rio dos Passos"
  if (Test-Path $iconFile) {
    $shortcut.IconLocation = $iconFile
  }
  $shortcut.Save()
}

Write-Host ""
Write-Host "Instalacao concluida."
Write-Host "Atalho criado na Area de Trabalho e no Menu Iniciar: Rio dos Passos"
Write-Host "Arquivos instalados em: $installRoot"
