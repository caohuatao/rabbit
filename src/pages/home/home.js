/**
 * User: CHT
 * Date: 2020/7/16
 * Time: 15:01
 */
import Vue from 'vue'
import App from './home.vue'
import ElementUI from 'element-ui'
import i18n from '../../i18n'
import router from './router'
import store from './store'
import rabbitDB from '@/DB'

import '../../style/index.less'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
