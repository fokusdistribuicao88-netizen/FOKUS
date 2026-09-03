````markdown
# 🚀 Guia Rápido - Transformar FOKUS em App Windows

## ⏱️ 5 minutos para começar

### Passo 1: Instalar dependências

```bash
npm install
```

**Novas dependências adicionadas:**
- `electron` — Framework desktop
- `electron-builder` — Gerador de instalador .exe
- `electron-store` — Persistência de dados
- `concurrently` — Rodar Vite + Electron juntos
- `wait-on` — Aguardar Vite iniciar

### Passo 2: Configurar variáveis de ambiente

Crie `.env.local`:

```bash
VITE_BASE44_APP_ID=seu_id_aqui
VITE_BASE44_APP_BASE_URL=https://seu-backend.com
```

### Passo 3: Rodar em desenvolvimento

```bash
npm run dev
```

✅ Isso vai:
1. Iniciar servidor Vite (http://localhost:5173)
2. Abrir janela do Electron automaticamente
3. Carregar seu app React como desktop app

### Passo 4: Fazer build para Windows

```bash
npm run build
```

📦 Gera dois instaladores em `dist-electron/`:
- `FOKUS-0.0.0.exe` — Instalador padrão (recomendado)
- `FOKUS-0.0.0-portable.exe` — Versão portável

---

## 📁 Arquivos Criados

```
electron/
├── main.js           ← Processo principal (janela, menu, IPC)
├── preload.js        ← Bridge seguro para React
└── vite.config.js    ← Config de build

src/
├── hooks/
│   └── useElectron.js    ← Hook para usar API Electron em React
└── components/
    └── ElectronExample.jsx   ← Exemplo de uso

package.json         ← ATUALIZADO com Electron
.gitignore          ← ATUALIZADO (dist-electron, *.exe, etc)

ELECTRON-SETUP.md   ← Documentação completa
QUICK-START.md      ← Este arquivo
```

---

## 💻 Scripts npm

```bash
# Desenvolvimento
npm run dev              # Vite + Electron (RECOMENDADO)
npm run dev:vite        # Apenas modo web
npm run dev:electron    # Apenas Electron

# Build
npm run build           # Build completo para Windows
npm run build:vite      # Build web apenas
npm run build:electron  # Build Electron apenas

# Qualidade de código
npm run lint
npm run lint:fix
npm run typecheck
```

---

## 🔌 Usar API Electron em React

Qualquer componente pode acessar a API Electron:

```jsx
import { useElectron } from '@/hooks/useElectron'

export function MeuComponente() {
  const api = useElectron()

  // ✅ Salvar dados persistentemente
  api.storageSet('chave', { dados: 'valor' })

  // ✅ Recuperar dados
  const dados = api.storageGet('chave')
  console.log(dados) // { dados: 'valor' }

  return <div>Dados: {JSON.stringify(dados)}</div>
}
```

**Fallback automático:** Se rodar no navegador, usa `localStorage` em vez de Electron Store.

---

## 📋 Próximos passos recomendados

### 1. Testar no modo desktop
```bash
npm run dev
# Verifica se tudo funciona no Electron
```

### 2. Ver exemplo prático
Veja o componente `src/components/ElectronExample.jsx` para entender como usar a API.

### 3. Integrar com seu app
Copie a lógica do exemplo para seus próprios componentes.

### 4. Fazer build final
```bash
npm run build
# Seus instaladores .exe estão prontos em dist-electron/
```

### 5. Distribuir
Compartilhe os `.exe` com seus usuários Windows!

---

## ⚠️ Problemas comuns?

**Electron não abre:**
```bash
# Terminal 1: Iniciar Vite
npm run dev:vite

# Terminal 2 (aguarde 5s): Iniciar Electron
npm run dev:electron
```

**"electronAPI is undefined" no console:**
Verifique se está usando o hook correto:
```jsx
import { useElectron } from '@/hooks/useElectron'
const api = useElectron()
```

**Build falha:**
```bash
rm -rf node_modules dist dist-electron
npm install
npm run build
```

---

## 🎓 Entender a arquitetura

### Processo Principal (main.js)
- Gerencia janelas do app
- Cria menu nativo do Windows
- Lida com IPC (comunicação com React)

### Preload (preload.js)
- Bridge seguro entre Electron e React
- Expõe API em `window.electronAPI`
- Evita segurança vulnerável

### React (seu código)
- Funciona igual: componentes, hooks, etc
- Pode usar `useElectron()` quando quiser acessar OS
- Totalmente compatível com modo web

---

## 📚 Documentação completa

Leia **ELECTRON-SETUP.md** para:
- Configuração avançada
- Build assinado
- Troubleshooting detalhado
- Publicação profissional

---

## ✨ Resumo

| Ação | Comando |
|------|---------|
| **Desenvolvimento** | `npm run dev` |
| **Build Windows** | `npm run build` |
| **Exemplo de uso** | Ver `src/components/ElectronExample.jsx` |
| **Dados persistentes** | `useElectron()` no React |
| **Modo web** | `npm run dev:vite` |

---

**🎉 Pronto! Seu app FOKUS agora é um desktop app Windows com Electron!**

Qualquer dúvida, consulte ELECTRON-SETUP.md ou a documentação do Electron em https://www.electronjs.org/docs
````
