/**
 * User: CHT
 * Date: 2020/7/21
 * Time: 16:16
 */
import {
  app,
  protocol,
  BrowserWindow, ipcMain
} from 'electron'

import {
  createProtocol
} from 'vue-cli-plugin-electron-builder/lib'

protocol.registerSchemesAsPrivileged([
  {scheme: 'app', privileges: {secure: true, standard: true}}
])


function registerEmit() {
  const emitMap = {
    router: (e, arg) => {
      switch (arg.id) {
        case 'home':
          return this.crateHome(arg.params)
        case 'terminal':
          return this.crateTerminal(arg.params)
        default:
          return
      }
    }
  }
  Object.keys(emitMap).forEach(key => {
    ipcMain.on(key, emitMap[key])
  })
}

class MainProcessConf {
  constructor() {
    this.map = {
      main: null,
      setting: null,
      home: null,
      terminalList: []
    }
    registerEmit.call(this)
  }
  
  createWin(html, options = {}) {
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
  
  crateMain() {
    if (this.map.main === null) {
      this.map.main = this.createWin('index.html', {
        fullscreenable: false,
        maximizable: false
      })
      this.map.main.on('closed', () => {
        this.map.main = null
        app.quit()
      })
    } else {
      this.map.main.focus()
    }
  }
  
  crateHome(params) {
    if (this.map.home === null) {
      this.map.home = this.createWin(`home.html${params}`, {
        width: 1000,
        height: 800,
        minWidth: 1000,
        minHeight: 800,
        resizable: true
      })
      this.map.home.on('closed', () => this.map.home = null)
    } else {
      this.map.home.focus()
    }
  }
  
  crateTerminal() {
    const win = this.createWin('terminal.html', {
      width: 1000,
      height: 800,
      minWidth: 800,
      minHeight: 600,
      center: true,
      resizable: true,
      frame: false
    })
    this.map.terminalList.push(win)
    win.on('closed', () => {
      const idx = this.map.terminalList.indexOf(win)
      this.map.terminalList.splice(idx, 1)
    })
  }
}



export default new MainProcessConf()
