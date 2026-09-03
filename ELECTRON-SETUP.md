````markdown
# FOKUS - Desktop App com Electron

**Welcome to your Base44 project** transformado em aplicativo Windows desktop com Electron!

## O que mudou?

Este projeto agora pode ser executado como:
- ✅ **App web** (navegador)
- ✅ **Desktop Windows** (Electron)

## Instalação & Setup

### 1️⃣ Clonar e instalar dependências

```bash
git clone <seu-repo-url>
cd FOKUS
npm install
```

### 2️⃣ Configurar variáveis de ambiente

Crie um arquivo `.env.local` na raiz:

```
VITE_BASE44_APP_ID=your_app_id
VITE_BASE44_APP_BASE_URL=your_backend_url

# Exemplo:
VITE_BASE44_APP_ID=cbef744a8545c389ef439ea6
VITE_BASE44_APP_BASE_URL=https://my-to-do-list-81bfaad7.base44.app
```

## Rodando a aplicação

### Modo Web (navegador)

```bash
npm run dev
# Abre automaticamente em http://localhost:5173
```

### Modo Desktop (Electron)

```bash
npm run dev
# Isto roda Vite + Electron juntos
# Aguarde ~10s enquanto Vite inicia, depois Electron abre automaticamente
```

**Primeira vez?** O terminal vai mostrar:
```
VITE v6.1.0  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Opening Electron...
✅ Preload script carregado com sucesso
```

## Build para produção

### Versão web

```bash
npm run build:vite
# Gera: dist/
```

### Versão Windows (Electron)

```bash
npm run build
# Gera instalador .exe + versão portable
# Arquivos em: dist-electron/
```

**Resultado:**
- `FOKUS-0.0.0.exe` — Instalador clássico (recomendado)
- `FOKUS-0.0.0-portable.exe` — Versão portável (sem instalação)

## Desenvolvimento

### Scripts disponíveis

```bash
npm run dev              # Vite + Electron
npm run dev:vite        # Apenas Vite (web)
npm run dev:electron    # Apenas Electron (conexão manual)
npm run build           # Build completo (Vite + Electron)
npm run build:vite      # Build apenas web
npm run build:electron  # Build apenas Electron
npm run lint            # ESLint check
npm run lint:fix        # ESLint fix
npm run typecheck       # TypeScript check
npm run preview         # Preview da build
```

### Usar API do Electron no React

```jsx
import { useElectron } from '@/hooks/useElectron'

export function MyComponent() {
  const api = useElectron()

  const saveData = () => {
    // Salva persistentemente no disco (Windows)
    api.storageSet('minha-chave', { nome: 'João' })
    
    // Recupera dados
    const dados = api.storageGet('minha-chave')
    console.log(dados) // { nome: 'João' }
  }

  return <button onClick={saveData}>Salvar Dados</button>
}
```

**Nota:** Se rodar no navegador (modo web), fallback automático para `localStorage`.

## Estrutura de arquivos

```
FOKUS/
├── electron/
│   ├── main.js         ← Processo principal Electron
│   ├── preload.js      ← Bridge seguro Electron ↔ React
│   └── vite.config.js  ← Config de build (não precisa editar)
├── src/
│   ├── hooks/
│   │   └── useElectron.js  ← Hook React para API Electron
│   ├── main.jsx
│   ├── index.css
│   └── ...
├── package.json        ← ATUALIZADO com Electron
├── vite.config.js      ← MANTÉM config original
└── index.html
```

## Troubleshooting

### ❌ "Electron não abre"
```bash
# Verificar porta 5173 está livre:
npm run dev:vite
# Em outro terminal:
npm run dev:electron
```

### ❌ "API do Electron undefined"
Certifique-se que estou usando o hook correto:
```jsx
import { useElectron } from '@/hooks/useElectron'
const api = useElectron()
```

### ❌ "Build falha"
```bash
# Limpar cache e reinstalar
rm -rf node_modules dist dist-electron
npm install
npm run build
```

## Publicar no Windows

Para distribuir `.exe` profissional:

1. **Gerar certificado** (opcional, para assinatura digital)
2. **Configurar em package.json** (`build.win.certificateFile`)
3. **Executar:**
   ```bash
   npm run build
   ```
4. **Resultado:** `dist-electron/*.exe` pronto para distribuição

## Docs & Suporte

- **Base44:** [https://docs.base44.com/Integrations/Using-GitHub](https://docs.base44.com/Integrations/Using-GitHub)
- **Electron:** [https://www.electronjs.org/docs](https://www.electronjs.org/docs)
- **Base44 Suporte:** [https://app.base44.com/support](https://app.base44.com/support)

---

**🎉 Pronto para usar!** Execute `npm run dev` e aproveite seu app como desktop Windows.
````
