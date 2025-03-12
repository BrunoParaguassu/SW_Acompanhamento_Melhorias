const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Aqui você pode adicionar funções seguras que o renderer process pode chamar
  // Por exemplo:
  // sendMessage: (message) => ipcRenderer.send('message', message),
  // onResponse: (callback) => ipcRenderer.on('response', callback)
});
