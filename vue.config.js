/**
 * User: CHT
 * Date: 2020/7/15
 * Time: 17:25
 */


const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
  pages: {
    index: {
      entry: 'src/pages/index/index.js',
      template: 'public/index.html',
      filename: 'index.html'
    },
    home: {
      entry: 'src/pages/home/home.js',
      template: 'public/index.html',
      filename: 'home.html'
    },
    terminal: {
      entry: 'src/pages/terminal/terminal.js',
      template: 'public/index.html',
      filename: 'terminal.html'
    }
  },
  chainWebpack: config => {
    // 添加别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@comp', resolve('src/components'))
  }
}
