/**
 * User: CHT
 * Date: 2020/7/15
 * Time: 17:25
 */


const path = require('path')
const fs = require('fs')
const resolve = dir => path.join(__dirname, dir)
const pages = {}
const dirList = fs.readdirSync(resolve('src/pages'))
dirList.forEach(dir => {
  pages[dir] = {
    entry: `src/pages/${dir}/${dir}.js`,
    template: 'public/index.html',
    filename: `${dir}.html`
  }
})

module.exports = {
  pages,
  chainWebpack: config => {
    // 添加别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@comp', resolve('src/components'))
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        productName: 'rabbit',
        copyright: 'Copyright © 2020',
        win: {
          icon: 'public/favion.ico',
          target: [
            {
              target: "nsis",
              arch: [
                "x64"
              ]
            }
          ]
        },
        nsis: {
          oneClick: false,
          perMachine: false,
          allowElevation: true,
          createDesktopShortcut: true,
          runAfterFinish: true,
          installerIcon: 'public/favicon.ico',
          uninstallerIcon: 'public/favicon.ico',
          include: 'public/installer.nsh'
        }
      }
    }
  }
}
