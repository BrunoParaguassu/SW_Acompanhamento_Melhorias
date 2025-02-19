// Habilita cache do V8 para inicialização mais rápida
require('v8-compile-cache')

const { app, BrowserWindow } = require('electron')
const path = require('path')

// Determina se está em desenvolvimento baseado no processo
const isDev = process.env.NODE_ENV === 'development'

// Add these performance optimizations
app.commandLine.appendSwitch('disable-http-cache')
app.commandLine.appendSwitch('js-flags', '--max-old-space-size=4096')

// Mantém referência global
let mainWindow = null

function createWindow() {
  // Configurações otimizadas para performance
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false, // Não mostra até estar pronto
    backgroundColor: '#ffffff', // Previne flash branco
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: false,
      spellcheck: false,
      backgroundThrottling: false,
      devTools: isDev,
      webSecurity: !isDev
    }
  })

  // Carrega o conteúdo
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173')
    mainWindow.webContents.openDevTools()
  } else {
    const indexPath = path.join(app.getAppPath(), 'dist', 'index.html')
    mainWindow.loadFile(indexPath)
  }

  // Mostra a janela quando estiver pronta
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  // Remover menu padrão
  mainWindow.setMenu(null)

  // Limpa a referência quando a janela for fechada
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

// Otimiza a inicialização do app
if (!app.requestSingleInstanceLock()) {
  app.quit()
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })

  app.whenReady().then(createWindow)
}

// Otimiza o comportamento de quit
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (!mainWindow) {
    createWindow()
  }
})
