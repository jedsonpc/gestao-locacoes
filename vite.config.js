import { copyFile, mkdir, stat } from 'node:fs/promises'
import { join } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const requiredStaticFiles = [
  'app.js',
  'instalar-celular.html',
  'login.html',
  'styles.css',
  'supabase-config.js',
  'supabase-sync.js',
  'update-checker.js',
  'sw.js',
  'version.json',
  'update-package.json',
  'manifest.webmanifest',
  'icon.svg',
  'icon-192.png',
  'icon-512.png',
  'logo-imobiliaria-rio.svg',
  'logo Imobiliaria Rio.jpg',
]

const optionalStaticFiles = [
  'rio-dos-passos-atualizacao.zip',
  'rio-dos-passos-atualizacao-local-1.9.0.zip',
  'Rio-dos-Passos-Icone-Atalho.ico',
  'Rio-dos-Passos-Icone-Atalho.png',
  'rio-dos-passos-atalho.ico',
  'rio-dos-passos-atalho.png',
  'Abrir Rio dos Passos no Navegador.url',
  'abrir-rio-dos-passos-navegador.bat',
  'instalar-atalho-windows.bat',
  'INSTALAR-ANDROID-IOS.md',
  'LEIA-ME-INSTALACAO.txt',
  'LEIA-ME-ATUALIZACAO.txt',
  'LEIA-ME-ATUALIZAR-OUTRA-MAQUINA.txt',
]

async function exists(path) {
  try {
    await stat(path)
    return true
  } catch {
    return false
  }
}

function copyStaticToDist() {
  return {
    name: 'copy-static-to-dist',
    apply: 'build',
    async closeBundle() {
      const root = process.cwd()
      const dist = join(root, 'dist')

      async function copyRootFile(fileName, { required = true } = {}) {
        const source = join(root, fileName)
        const target = join(dist, fileName)

        if (!(await exists(source))) {
          if (required) throw new Error(`Arquivo obrigatorio ausente: ${fileName}`)
          return
        }

        await copyFile(source, target)
      }

      await mkdir(dist, { recursive: true })
      await Promise.all(requiredStaticFiles.map((fileName) => copyRootFile(fileName)))
      await Promise.all(optionalStaticFiles.map((fileName) => copyRootFile(fileName, { required: false })))
    },
  }
}

export default defineConfig({
  plugins: [react(), copyStaticToDist()],
})

