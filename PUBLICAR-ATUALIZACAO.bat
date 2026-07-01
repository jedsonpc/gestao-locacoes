@echo off
setlocal
cd /d "%~dp0"
set NODE_OPTIONS=--use-system-ca
echo Publicando atualizacao do Rio Passos...
echo.
npm run release:auto
echo.
echo Processo finalizado. Confira acima se houve alguma mensagem de erro.
pause
