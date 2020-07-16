/**
 * User: CHT
 * Date: 2020/7/16
 * Time: 15:00
 */
import Vue from 'vue'
import App from './index.vue'
import ElementUI from 'element-ui'
import i18n from '../../i18n'
import router from './router'
import rabbitDB from '@/indexdDB/index'

import '../../style/index.less'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  render: h => h(App)
}).$mount('#app')
