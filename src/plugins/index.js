/**
 * User: CHT
 * Date: 2020/7/21
 * Time: 17:03
 */

import Vue from 'vue'
import i18n from './i18n'
import db from '@/plugins/db'
import ElementUI from 'element-ui'
import '@/style/index.less'

Vue.use(db)
Vue.use(ElementUI)
Vue.config.productionTip = false

export default i18n

