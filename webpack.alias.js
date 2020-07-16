/**
 * User: CHT
 * Date: 2020/7/15
 * Time: 17:25
 */
const {resolve} = require('path')

module.exports = {
  context: resolve(__dirname, './'),
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
      '@comp': resolve('src/components')
    }
  }
}
