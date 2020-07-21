/**
 * User: CHT
 * Date: 2020/7/16
 * Time: 17:35
 */

import Model from './model'

const rabbitDB = indexedDB.open('RabbitDb', 1)

const tasks = new Model('tasks', {
  autoIncrement: true,
  keyPath: 'taskId'
})

rabbitDB.onsuccess = evt => {
  tasks.db = rabbitDB.result
  tasks.ready()
}

rabbitDB.onerror = err => {
  console.log('连接数据库失败')
}

rabbitDB.onupgradeneeded = evt => {
  tasks.db = evt.target.result
  tasks.init()
}

export default {
  tasks,
  install(Vue) {
    Vue.prototype.tasks = tasks
  }
}
