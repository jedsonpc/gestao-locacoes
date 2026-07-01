$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$gitDir = Join-Path $root ".git"
$hookDir = Join-Path $gitDir "hooks"
$hookPath = Join-Path $hookDir "post-commit"

if (-not (Test-Path -LiteralPath $gitDir)) {
  throw "Esta pasta ainda nao esta conectada ao Git."
}

New-Item -ItemType Directory -Force -Path $hookDir | Out-Null

$hook = @'
#!/bin/sh
branch="$(git branch --show-current)"
if [ -z "$branch" ]; then
  exit 0
fi

remote="$(git remote get-url origin 2>/dev/null)"
if [ -z "$remote" ]; then
  echo "Sem remoto origin configurado; envio automatico ignorado."
  exit 0
fi

echo ""
echo "Enviando automaticamente para o GitHub: origin/$branch"
git push -u origin "$branch"
'@

Set-Content -LiteralPath $hookPath -Value $hook -Encoding ASCII

Write-Host "Automacao local instalada."
Write-Host "A partir de agora, sempre que houver um commit nesta pasta, ele sera enviado ao GitHub automaticamente."
Write-Host "Para publicar uma nova versao sem lembrar comandos, use o arquivo PUBLICAR-ATUALIZACAO.bat."
