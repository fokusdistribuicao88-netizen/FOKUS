import { useState } from 'react'
import { useElectron } from '@/hooks/useElectron'

/**
 * Exemplo de componente React que usa a API do Electron
 * Funciona tanto em modo web (localStorage) quanto em modo desktop (Electron Store)
 */
export function ElectronExample() {
  const api = useElectron()
  const [dados, setDados] = useState(null)
  const [inputValue, setInputValue] = useState('')
  const [isElectron, setIsElectron] = useState(!!window.electronAPI)

  const salvarDados = () => {
    if (!inputValue.trim()) return

    const novosDados = {
      id: Date.now(),
      texto: inputValue,
      dataCriacao: new Date().toLocaleString('pt-BR')
    }

    // Salvar no Electron Store (ou localStorage em modo web)
    api.storageSet('meus-dados', novosDados)
    setDados(novosDados)
    setInputValue('')

    alert('✅ Dados salvos com sucesso!')
  }

  const carregarDados = () => {
    const dadosSalvos = api.storageGet('meus-dados')
    if (dadosSalvos) {
      setDados(dadosSalvos)
    } else {
      alert('ℹ️ Nenhum dado salvo ainda')
    }
  }

  const limparDados = () => {
    api.storageSet('meus-dados', null)
    setDados(null)
    alert('🗑️ Dados deletados')
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h1 className="text-2xl font-bold text-blue-900 mb-2">
          🖥️ Exemplo - API Electron + React
        </h1>
        <p className="text-blue-700">
          {isElectron
            ? '✅ Rodando no Electron (Windows Desktop)'
            : '🌐 Rodando no navegador (modo web)'}
        </p>
      </div>

      {/* Formulário de entrada */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Salvar Dados</h2>
        
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Digite algo para salvar..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && salvarDados()}
          />
          <button
            onClick={salvarDados}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition"
          >
            Salvar
          </button>
        </div>

        <p className="text-sm text-gray-600">
          💾 Os dados serão salvos de forma persistente no seu computador
        </p>
      </div>

      {/* Área de exibição de dados */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Dados Salvos</h2>
          <button
            onClick={carregarDados}
            className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 font-medium transition"
          >
            🔄 Recarregar
          </button>
        </div>

        {dados ? (
          <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-semibold text-gray-700">ID:</span>
                <span className="text-gray-600 ml-2">{dados.id}</span>
              </p>
              <p className="text-sm">
                <span className="font-semibold text-gray-700">Texto:</span>
                <span className="text-gray-600 ml-2">{dados.texto}</span>
              </p>
              <p className="text-sm">
                <span className="font-semibold text-gray-700">Data:</span>
                <span className="text-gray-600 ml-2">{dados.dataCriacao}</span>
              </p>
            </div>

            <button
              onClick={limparDados}
              className="mt-4 w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition"
            >
              🗑️ Deletar Dados
            </button>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">
            Nenhum dado salvo. Clique em "Recarregar" ou salve um novo item.
          </p>
        )}
      </div>

      {/* Informações técnicas */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">ℹ️ Informações Técnicas</h3>
        
        <div className="space-y-2 text-sm text-gray-700">
          <p>
            <span className="font-semibold">Armazenamento:</span>
            {isElectron ? ' Electron Store (disco)' : ' localStorage (navegador)'}
          </p>
          <p>
            <span className="font-semibold">Persistência:</span> ✅ Os dados continuam salvos após fechar a janela
          </p>
          <p>
            <span className="font-semibold">Hook usado:</span> <code className="bg-gray-200 px-2 py-1 rounded">useElectron()</code>
          </p>
          <p>
            <span className="font-semibold">Localização:</span> <code className="bg-gray-200 px-2 py-1 rounded">src/hooks/useElectron.js</code>
          </p>
        </div>

        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-sm text-yellow-800">
            <span className="font-semibold">💡 Dica:</span> Este é apenas um exemplo. 
            Você pode usar a mesma API em qualquer componente React importando o hook.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ElectronExample
