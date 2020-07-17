/**
 * User: CHT
 * Date: 2020/7/16
 * Time: 17:35
 */

const rabbitDB = indexedDB.open('RabbitDb', 1)





let db

rabbitDB.onsuccess = evt => {
  db = rabbitDB.result
}
rabbitDB.onerror = err => {
  console.log('连接数据库失败')
}
rabbitDB.onupgradeneeded = evt => {
  db = evt.target.result
}





export default rabbitDB

