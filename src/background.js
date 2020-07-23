'use strict'

import {app} from 'electron'

import installExtension, {VUEJS_DEVTOOLS} from 'electron-devtools-installer'

import MainConf from '@/MainConf'

const isDevelopment = process.env.NODE_ENV !== 'production'

app.disableHardwareAcceleration()

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (MainConf.map.main === null) {
    MainConf.crateMain()
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
  MainConf.crateMain()
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
