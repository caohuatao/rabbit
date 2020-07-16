/**
 * User: CHT
 * Date: 2020/7/16
 * Time: 17:35
 */

const rabbitDB = indexedDB.open('RabbitDb', 1)


rabbitDB.addEventListener('success', e => {
  console.log('连接数据库成功')
})

rabbitDB.addEventListener('error', e => {
  console.log('连接数据库失败')
})


export default rabbitDB

