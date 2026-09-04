import { useState, useEffect } from 'react'
import { useElectron } from './hooks/useElectron'
import './App.css'

export default function App() {
  const api = useElectron()
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')
  const [savedData, setSavedData] = useState(null)

  // Carregar dados ao abrir app
  useEffect(() => {
    const data = api.storageGet('app-data')
    if (data) {
      setCount(data.count || 0)
      setName(data.name || '')
      setSavedData(data)
    }
  }, [api])

  // Salvar dados
  const handleSave = () => {
    const data = { count, name, timestamp: new Date().toLocaleString() }
    api.storageSet('app-data', data)
    setSavedData(data)
    alert('✅ Dados salvos com sucesso!')
  }

  // Incrementar contador
  const handleIncrement = () => {
    setCount(count + 1)
  }

  // Resetar tudo
  const handleReset = () => {
    setCount(0)
    setName('')
    setSavedData(null)
    api.storageSet('app-data', null)
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🎉 FOKUS App</h1>
        <p>Electron + React + Base44</p>
      </header>

      <main className="app-main">
        <section className="card">
          <h2>📊 Contador</h2>
          <div className="counter-display">{count}</div>
          <button className="btn btn-primary" onClick={handleIncrement}>
            ➕ Incrementar
          </button>
        </section>

        <section className="card">
          <h2>📝 Seu Nome</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite seu nome..."
            className="input"
          />
        </section>

        <section className="card">
          <h2>💾 Ações</h2>
          <button className="btn btn-success" onClick={handleSave}>
            💾 Salvar Dados
          </button>
          <button className="btn btn-danger" onClick={handleReset}>
            🔄 Resetar Tudo
          </button>
        </section>

        {savedData && (
          <section className="card info-card">
            <h2>✅ Dados Salvos</h2>
            <div className="info-content">
              <p><strong>Nome:</strong> {savedData.name || 'Sem nome'}</p>
              <p><strong>Contador:</strong> {savedData.count}</p>
              <p><strong>Salvo em:</strong> {savedData.timestamp}</p>
            </div>
            <p className="info-text">
              📦 Dados armazenados em: <code>Electron Store</code>
            </p>
          </section>
        )}

        <section className="card">
          <h2>ℹ️ Sobre</h2>
          <p>Este app demonstra:</p>
          <ul>
            <li>✅ React components</li>
            <li>✅ Electron integration</li>
            <li>✅ Persistência de dados (Electron Store)</li>
            <li>✅ Tailwind CSS styling</li>
            <li>✅ Hot reload em desenvolvimento</li>
          </ul>
        </section>
      </main>

      <footer className="app-footer">
        <p>🚀 Seu app está rodando como Electron Desktop App</p>
        <p>Pressione F12 para abrir DevTools</p>
      </footer>
    </div>
  )
}
