'use strict'

import {
  app,
  ipcMain,
  protocol,
  BrowserWindow,
} from 'electron'

import {
  createProtocol
} from 'vue-cli-plugin-electron-builder/lib'

import installExtension, {
  VUEJS_DEVTOOLS
} from 'electron-devtools-installer'

const isDevelopment = process.env.NODE_ENV !== 'production'

const windowMap = {
  main: null,
  setting: null,
  home: null,
  terminalList: []
}

function createWin(html, options = {}) {
  options = Object.assign({
    width: 320,
    height: 680,
    center: true,
    resizable: false,
    frame: false,
    transparent: true,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  }, options)
  
  const win = new BrowserWindow(options)
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    win.loadURL(`${process.env.WEBPACK_DEV_SERVER_URL}${html}`).catch(console.error)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    win.loadURL(`app://./${html}`).catch(console.error)
  }
  win.once('ready-to-show', () => {
    win.show()
  })
  return win
}

function crateMain() {
  if(windowMap.main === null) {
    windowMap.main = createWin('index.html', {
      fullscreen: false
    })
    windowMap.main.on('closed', () => {
      windowMap.main = null
      app.quit()
    })
  } else {
    windowMap.main.focus()
  }
}

function crateHome(params) {
  if (windowMap.home === null) {
    windowMap.home = createWin(`home.html${params}`, {
      width: 1000,
      height: 800,
      minWidth: 1000,
      minHeight: 800,
      resizable: true
    })
    windowMap.home.on('closed', () => windowMap.home = null)
  } else {
    windowMap.home.focus()
  }
}

function crateTerminal() {
  const win = createWin('terminal.html', {
    width: 1000,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    center: true,
    resizable: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  })
  windowMap.terminalList.push(win)
  win.on('closed', () => {
    const idx = windowMap.terminalList.indexOf(win)
    windowMap.terminalList.splice(idx, 1)
  })
}

protocol.registerSchemesAsPrivileged([
  {scheme: 'app', privileges: {secure: true, standard: true}}
])

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (windowMap.main === null) {
    crateMain()
  }
})

app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  crateMain()
})

if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

ipcMain.on('router', (e, arg) => {
  switch (arg.id) {
    case 'home':
      return crateHome(arg.params)
    case 'terminal':
      return crateTerminal(arg.params)
    default:
      return
  }
})
