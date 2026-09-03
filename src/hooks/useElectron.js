import { useEffect } from 'react'

/**
 * Hook para usar a API do Electron no React
 * Exemplo: const api = useElectron()
 *          api.storageSet('key', value)
 */
export function useElectron() {
  const [api, setApi] = useEffect(null)

  useEffect(() => {
    // Verificar se estamos rodando no Electron
    if (window.electronAPI) {
      setApi(window.electronAPI)
    } else {
      console.warn('⚠️  API do Electron não disponível (modo web)')
      setApi(null)
    }
  }, [])

  return api || {
    // Fallbacks para modo web
    storageSet: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
    storageGet: (key) => JSON.parse(localStorage.getItem(key) || 'null'),
  }
}

export default useElectron
