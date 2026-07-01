# Automacao de versao e deploy

Este projeto esta preparado para publicar automaticamente a cada envio para a branch `main`.

## Fluxo recomendado

1. Alterar o app.
2. Dar duplo clique em `PUBLICAR-ATUALIZACAO.bat` ou rodar `npm run release:auto`.
3. O script gera nova versao, atualiza cache, roda build/testes, cria commit e envia ao GitHub.
4. O GitHub Actions publica no GitHub Pages.
5. Se os segredos da Vercel estiverem configurados, o GitHub Actions tambem publica em producao na Vercel.

## Automacao local para nao esquecer o envio

Rode uma unica vez:

```powershell
powershell -ExecutionPolicy Bypass -File tools\instalar-automacao-local.ps1
```

Isso instala um acionador local do Git. Depois disso, todo commit feito nesta pasta sera enviado automaticamente ao GitHub.

Para o uso do dia a dia, o caminho mais simples e abrir o arquivo:

```text
PUBLICAR-ATUALIZACAO.bat
```

Ele executa a publicacao completa e deixa a janela aberta no final para conferencia.

## Primeiro uso

Configure o remoto do GitHub uma unica vez:

```powershell
git remote add origin https://github.com/USUARIO/REPOSITORIO.git
git push -u origin main
```

Depois conecte a Vercel ao mesmo repositorio no painel da Vercel ou use:

```powershell
$env:NODE_OPTIONS="--use-system-ca"
npx vercel git connect https://github.com/USUARIO/REPOSITORIO.git
```

## Segredos do GitHub Actions

No GitHub, abra:

`Settings > Secrets and variables > Actions > New repository secret`

Crie:

- `VERCEL_TOKEN`: token criado em `https://vercel.com/account/tokens`
- `VERCEL_ORG_ID`: `team_BpbhrAtmNXjVLmewSDfyqliH`
- `VERCEL_PROJECT_ID`: `prj_qdvtHE04ZeOTG43pMEPy3wsammpD`

Sem esses segredos, o workflow ainda publica no GitHub Pages, mas pula a publicacao Vercel.

## Publicar manualmente na Vercel

Quando quiser publicar sem esperar o GitHub:

```powershell
npm run release:auto -- -NoPush -DeployVercel
```

## Versao manual

Para definir uma versao especifica:

```powershell
npm run release:auto -- -Version local-1.9.1 -Message "Publica local-1.9.1"
```
