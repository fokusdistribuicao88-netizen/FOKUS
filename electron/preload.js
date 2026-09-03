import { contextBridge, ipcRenderer } from 'electron'

// Expor APIs seguras para o renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  // Persistência de dados
  storageSet: (key, value) => {
    ipcRenderer.send('store-set', key, value)
  },
  storageGet: (key) => {
    return ipcRenderer.sendSync('store-get', key)
  },
  
  // Versão do app
  getAppVersion: () => {
    return ipcRenderer.invoke('get-app-version')
  }
})

console.log('✅ Preload script carregado com sucesso')
