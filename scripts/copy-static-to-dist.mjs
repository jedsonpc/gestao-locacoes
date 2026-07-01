import { copyFile, mkdir, stat } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const dist = join(root, "dist");

const requiredFiles = [
  "app.js",
  "login.html",
  "styles.css",
  "supabase-config.js",
  "supabase-sync.js",
  "update-checker.js",
  "sw.js",
  "version.json",
  "update-package.json",
  "manifest.webmanifest",
  "icon.svg",
  "icon-192.png",
  "icon-512.png",
  "logo-imobiliaria-rio.svg",
  "logo Imobiliaria Rio.jpg",
];

const optionalFiles = [
  "rio-passos-atualizacao.zip",
  "rio-passos-atualizacao-local-1.8.4.zip",
  "Rio-Passos-Icone-Atalho.ico",
  "Rio-Passos-Icone-Atalho.png",
  "rio-passos-atalho.ico",
  "rio-passos-atalho.png",
  "Abrir Rio Passos no Navegador.url",
  "abrir-rio-passos-navegador.bat",
  "instalar-atalho-windows.bat",
  "INSTALAR-ANDROID-IOS.md",
  "LEIA-ME-INSTALACAO.txt",
  "LEIA-ME-ATUALIZACAO.txt",
  "LEIA-ME-ATUALIZAR-OUTRA-MAQUINA.txt",
];

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function copyRootFile(fileName, { required = true } = {}) {
  const source = join(root, fileName);
  const target = join(dist, fileName);
  if (!(await exists(source))) {
    if (required) throw new Error(`Arquivo obrigatorio ausente: ${fileName}`);
    return;
  }
  await copyFile(source, target);
}

await mkdir(dist, { recursive: true });
await Promise.all(requiredFiles.map((fileName) => copyRootFile(fileName)));
await Promise.all(optionalFiles.map((fileName) => copyRootFile(fileName, { required: false })));

