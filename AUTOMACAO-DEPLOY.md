# Automacao de versao e deploy

Este projeto esta preparado para publicar automaticamente a cada envio para a branch `main`.

## Fluxo recomendado

1. Alterar o app.
2. Rodar `npm run release:auto`.
3. O script gera nova versao, atualiza cache, roda build/testes, cria commit e envia ao GitHub.
4. O GitHub Actions publica no GitHub Pages.
5. Se os segredos da Vercel estiverem configurados, o GitHub Actions tambem publica em producao na Vercel.

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
