import Vue from 'vue'
import VueRouter from 'vue-router'
import index from './views/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: index
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
