/**
 * User: CHT
 * Date: 2020/7/17
 * Time: 14:38
 */
import Vue from 'vue'
import Terminal from './terminal.vue'
import i18n from '../../i18n'
import ElementUI from 'element-ui'
import router from './router'
import rabbitDB from '@/db/index'

import '../../style/index.less'
import 'xterm/css/xterm.css'

Vue.use(ElementUI)
Vue.config.productionTip = false


new Vue({
  i18n,
  router,
  render: h => h(Terminal)
}).$mount('#app')
