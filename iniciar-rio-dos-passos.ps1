$ErrorActionPreference = "SilentlyContinue"

$Url = "https://gestao-locacoes-opal.vercel.app/?v=local-1.9.31"

function Open-AppMaximized {
  param([string]$Target)

  $browserPaths = @(
    (Join-Path ${env:ProgramFiles(x86)} "Microsoft\Edge\Application\msedge.exe"),
    (Join-Path $env:ProgramFiles "Microsoft\Edge\Application\msedge.exe"),
    (Join-Path $env:LOCALAPPDATA "Microsoft\Edge\Application\msedge.exe"),
    (Join-Path $env:ProgramFiles "Google\Chrome\Application\chrome.exe"),
    (Join-Path ${env:ProgramFiles(x86)} "Google\Chrome\Application\chrome.exe"),
    (Join-Path $env:LOCALAPPDATA "Google\Chrome\Application\chrome.exe")
  ) | Where-Object { $_ -and (Test-Path -LiteralPath $_) }

  $browser = $browserPaths | Select-Object -First 1
  if ($browser) {
    Start-Process -FilePath $browser -ArgumentList @("--start-maximized", "--app=$Target")
    return
  }

  Start-Process -FilePath $Target -WindowStyle Maximized
}

Open-AppMaximized -Target $Url
