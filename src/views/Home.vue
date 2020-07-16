<template>
  <div class="home">
    <el-select
      v-model="lang">
      <el-option
        v-for="item in langList"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-button type="primary">{{$t('msg')}}</el-button>
  </div>
</template>

<script>
  // @ is an alias to /src
  import HelloWorld from '@/components/HelloWorld.vue'

  // const {ipcRenderer} = window.require('electron')
  // const shell = window.require('shelljs')

  export default {
    name: 'Home',
    components: {
      HelloWorld
    },
    data() {
      return {
        langList: [
          {
            label: '简体中文',
            value: 'zh'
          },
          {
            label: 'English',
            value: 'en'
          }
        ]
      }
    },
    computed: {
      lang: {
        get() {
          return this.$i18n.locale
        },
        set(val) {
          this.$i18n.locale = val
        }
      }
    },
    methods: {
      runCommand() {
        // shell.exec('node -v', function (code, message) {
        //   if(code === 0) {
        //     console.log(message)
        //   }
        // })
      },
      change() {
        this.$i18n.locale = 'zh-cn'
      }
    }
  }
</script>
