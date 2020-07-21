/**
 * User: CHT
 * Date: 2020/7/16
 * Time: 15:00
 */
import Vue from 'vue'
import App from './index.vue'

import i18n from '@/plugins'

new Vue({
  i18n,
  render: h => h(App)
}).$mount('#app')
