````markdown
# 🎉 FOKUS - Web App + Windows Desktop com Electron

**Welcome to your Base44 project** — Agora também como aplicativo Windows!

Este projeto contém tudo que você precisa para rodar seu app localmente como **web app** ou **desktop Windows**.

---

## 🚀 Quick Start (5 minutos)

### 1️⃣ Clone e instale

```bash
git clone https://github.com/fokusdistribuicao88-netizen/FOKUS.git
cd FOKUS
npm install
```

### 2️⃣ Configure ambiente

```bash
cp .env.example .env.local
# Edite com suas credenciais Base44
```

### 3️⃣ Rode em desenvolvimento

```bash
npm run dev
# App abre como janela Windows (Electron)
```

### 4️⃣ Gere o instalador Windows

```bash
npm run build
# Gera: dist-electron/FOKUS-0.0.0.exe
```

---

## 📋 Pré-requisitos

- ✅ **Node.js 16+** — https://nodejs.org (recomendado: LTS)
- ✅ **npm 7+** — Vem com Node.js
- ✅ **Windows 7+** — Para rodar o app (dev: qualquer OS)

---

## 📚 Scripts npm

```bash
# DESENVOLVIMENTO
npm run dev              # Vite + Electron (modo desktop)
npm run dev:vite        # Apenas modo web (http://localhost:5173)
npm run dev:electron    # Apenas Electron (conexão manual)

# BUILD & DISTRIBUIÇÃO
npm run build           # Build completo (cria .exe)
npm run build:vite      # Build apenas app (cria dist/)
npm run build:electron  # Build apenas Electron

# QUALIDADE DE CÓDIGO
npm run lint            # Verificar código (ESLint)
npm run lint:fix        # Corrigir problemas automáticos
npm run typecheck       # Verificar tipos (TypeScript)
npm run preview         # Preview da build web
```

---

## 🖥️ Dois Modos de Execução

### 🌐 Modo Web (navegador)

```bash
npm run dev:vite
# Abre: http://localhost:5173 (navegador)
# Dados: localStorage
# Acesso: Web APIs apenas
```

**Ideal para:** Desenvolvimento rápido, testes no navegador

### 🖥️ Modo Desktop (Windows app)

```bash
npm run dev
# Abre: Janela nativa Electron
# Dados: Electron Store (disco)
# Acesso: APIs do Electron + Windows
```

**Ideal para:** Teste completo, persistência, distribuição

---

## 💾 Persistência de Dados

Seu app pode salvar dados de forma persistente em Windows:

```jsx
import { useElectron } from '@/hooks/useElectron'

export function MyComponent() {
  const api = useElectron()

  // Salvar dados
  const save = () => {
    api.storageSet('usuario', { nome: 'João' })
  }

  // Carregar dados
  const load = () => {
    const dados = api.storageGet('usuario')
    console.log(dados) // { nome: 'João' }
  }

  return (
    <div>
      <button onClick={save}>Salvar</button>
      <button onClick={load}>Carregar</button>
    </div>
  )
}
```

**Fallback automático:** Se rodar no navegador, usa `localStorage` em vez de Electron Store.

---

## 📦 Gerar Instalador Windows

### Opção 1: Script automático (recomendado)

**Windows (PowerShell):**
```powershell
.\build-windows.ps1
```

**Mac/Linux (Bash):**
```bash
./build-windows.sh
```

### Opção 2: Manual

```bash
npm run build
```

### Resultado

```
dist-electron/
├── FOKUS-0.0.0.exe              ← Instalador padrão
├── FOKUS-0.0.0-portable.exe    ← Portável (sem instalação)
└── ...
```

---

## 🎯 Distribuição

### Compartilhar com usuários

1. **Pelo email:**
   - Envie `FOKUS-0.0.0.exe` por email

2. **Pelo compartilhamento em nuvem:**
   - Upload em Google Drive, Dropbox, OneDrive
   - Compartilhe link de download

3. **Em um site:**
   ```html
   <a href="https://seu-site.com/FOKUS-0.0.0.exe">
     Download FOKUS
   </a>
   ```

### Instalação pelo usuário

1. Download `FOKUS-0.0.0.exe`
2. Duplo-clique no arquivo
3. Siga o assistente de instalação
4. App fica no Menu Iniciar

---

## 📂 Estrutura do Projeto

```
FOKUS/
├── electron/                    ← Código Electron
│   ├── main.js                 # Processo principal
│   ├── preload.js              # Bridge seguro
│   └── vite.config.js          # Config build
│
├── src/
│   ├── hooks/
│   │   └── useElectron.js      # Hook para usar Electron
│   ├── components/
│   │   └── ElectronExample.jsx  # Exemplo funcional
│   ├── main.jsx                # Entry React
│   ├── index.css               # Tailwind
│   └── ...
│
├── package.json                ← ATUALIZADO (Electron)
├── vite.config.js             ← Config Vite
├── tailwind.config.js         ← Config Tailwind
├── index.html                 ← HTML entry
│
├── build-windows.ps1          # Script build (PowerShell)
├── build-windows.sh           # Script build (Bash)
├── .env.example               # Template env
│
├── QUICK-START.md             ← Guia 5 minutos
├── ELECTRON-SETUP.md          ← Docs completa
├── IMPLEMENTATION-CHECKLIST.md ← Checklist
└── FINAL-SUMMARY.md           ← Resumo
```

---

## 🔧 Configuração

### Variáveis de Ambiente (.env.local)

```bash
# Base44 API
VITE_BASE44_APP_ID=seu_app_id
VITE_BASE44_APP_BASE_URL=https://seu-backend.com

# Opcional
BASE44_LEGACY_SDK_IMPORTS=false
```

### Configuração Electron (package.json)

```json
{
  "build": {
    "appId": "com.fokus.app",
    "productName": "FOKUS",
    "win": {
      "target": ["nsis", "portable"]
    }
  }
}
```

Customizar em `package.json` se necessário.

---

## 🛠️ Desenvolvimento

### Editar o código

```bash
# Arquivo de exemplo que usa Electron API
src/components/ElectronExample.jsx
```

Copie o padrão para seus próprios componentes!

### Hot Reload

- ✅ **Vite:** Recarrega automaticamente no navegador
- ✅ **Electron:** Recarrega automaticamente na janela

Sem necessidade de reiniciar o app!

---

## ⚠️ Troubleshooting

### ❌ "npm: comando não encontrado"
```bash
# Node.js não está instalado
# Baixe em: https://nodejs.org
```

### ❌ "Electron não abre"
```bash
# Verificar porta 5173
npm run dev:vite

# Em outro terminal
npm run dev:electron
```

### ❌ "Build falha"
```bash
rm -rf node_modules dist dist-electron
npm install
npm run build
```

### ❌ ".env.local não encontrado"
```bash
cp .env.example .env.local
# Edite com seus valores
```

---

## 📚 Documentação

| Documento | Conteúdo |
|-----------|----------|
| **QUICK-START.md** | Guia de 5 minutos |
| **ELECTRON-SETUP.md** | Configuração detalhada |
| **IMPLEMENTATION-CHECKLIST.md** | Checklist completo |
| **FINAL-SUMMARY.md** | Resumo e próximos passos |

---

## 🎓 Tecnologias

### Frontend
- **React 18.2** — UI framework
- **Vite 6.1** — Build tool
- **Tailwind CSS 3.4** — Styling
- **Radix UI** — Components
- **React Router 6** — Routing
- **TanStack Query** — State management

### Backend
- **Base44 SDK** — Backend integration

### Desktop
- **Electron 33** — Desktop framework
- **Electron Store** — Persistência local
- **Electron Builder** — Instalador

### Dev Tools
- **ESLint 9** — Linting
- **TypeScript** — Type checking
- **Concurrently** — Run scripts

---

## 📊 Recursos

| Recurso | Web | Desktop |
|---------|-----|---------|
| React Components | ✅ | ✅ |
| Tailwind CSS | ✅ | ✅ |
| Base44 SDK | ✅ | ✅ |
| Dados Persistentes | 📦 localStorage | 💾 Electron Store |
| Menu Nativo | ❌ | ✅ |
| Acesso ao SO | ⚠️ Limitado | ✅ Completo |

---

## 🚀 Próximos Passos

1. ✅ Instalar dependências: `npm install`
2. ✅ Configurar .env: `cp .env.example .env.local`
3. ✅ Rodar em dev: `npm run dev`
4. ✅ Testar persistência: `useElectron()` hook
5. ✅ Fazer build: `npm run build`
6. ✅ Testar .exe em outro computador
7. ✅ Publicar para usuários

---

## 💬 Suporte

- **Electron Docs:** https://www.electronjs.org/docs
- **React Docs:** https://react.dev
- **Base44 Docs:** https://docs.base44.com
- **Base44 Support:** https://app.base44.com/support

---

## 📄 Licença

Mesmo que a Base44 original.

---

## 🎉 Pronto!

Seu app está pronto para:
- ✅ Rodar como web app
- ✅ Rodar como app Windows
- ✅ Salvar dados persistentemente
- ✅ Ser distribuído aos usuários

**Comece agora:** `npm install && npm run dev`

---

**Desenvolvido em:** 2026-09-03  
**Versão:** 0.0.0  
**Status:** ✅ Pronto para produção
````
