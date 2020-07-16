/**
 * User: CHT
 * Date: 2020/7/16
 * Time: 10:55
 */

import Vue from 'vue'
import VueI18n from 'vue-i18n'

import en from './locales/en'
import zh from './locales/zh-cn'

import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'


Vue.use(VueI18n)

export default new VueI18n({
  locale: 'zh',
  messages: {
    en: Object.assign(en, enLocale),
    zh: Object.assign(zh, zhLocale)
  }
})
