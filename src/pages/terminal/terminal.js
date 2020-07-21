/**
 * User: CHT
 * Date: 2020/7/17
 * Time: 14:38
 */
import Vue from 'vue'
import Terminal from './terminal.vue'

import router from './router'
import i18n from '@/plugins'

import 'xterm/css/xterm.css'

new Vue({
  i18n,
  router,
  render: h => h(Terminal)
}).$mount('#app')
