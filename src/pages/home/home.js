/**
 * User: CHT
 * Date: 2020/7/16
 * Time: 15:01
 */
import Vue from 'vue'
import App from './home.vue'

import router from './router'
import store from './store'

import i18n from '@/plugins'

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
