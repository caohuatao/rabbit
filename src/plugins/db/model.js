/**
 * User: CHT
 * Date: 2020/7/21
 * Time: 9:13
 */

export default class Model {
  constructor(name, optional) {
    this.name = name
    this.optional = optional
    this.db = null
    this.readed = false
    this.cbList = []
  }
  
  init() {
    this.db.createObjectStore(this.name, this.optional)
  }
  
  ready() {
    this.readed = true
    this.cbList.forEach(cb => cb())
    this.cbList = []
  }
  
  resultPromise(requestFun) {
    return new Promise((resolve, reject) => {
      const cb = () => {
        const transaction = this.db.transaction([this.name], 'readwrite')
        const store = transaction.objectStore(this.name)
        const request = requestFun(store)
        request.onerror = evt => reject(evt)
        request.onsuccess = () => resolve(request.result)
      }
      if (this.readed) cb()
      else this.cbList.push(cb)
    })
  }
  
  one(taskId) {
    return this.resultPromise(store => store.get(taskId))
  }
  
  add(task) {
    return this.resultPromise(store => store.add(task))
  }
  
  remove(taskId) {
    return this.resultPromise(store => store.delete(taskId))
  }
  
  list() {
    return this.resultPromise(store => store.getAll())
  }
}

