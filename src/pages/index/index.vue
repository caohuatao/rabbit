<!--
 * User: CHT
 * Date: 2020/7/16
 * Time: 15:00
-->
<template>
  <el-container class="page-container rabbit__index-page">
    <el-header height="40px">
      <h3>Rabbit</h3>
      <el-button-group>
        <el-button
          @click="minus"
          type="text"
          icon="el-icon-minus">
        </el-button>
        <el-button
          @click="close"
          type="text"
          icon="el-icon-close">
        </el-button>
      </el-button-group>
    </el-header>
    <el-main>
      <ul class="task-list__container">
        <li v-for="item in 2">{{item}}</li>
      </ul>
    </el-main>
    <el-footer height="32px">
      <el-button
        @click="setting"
        class="setting-btn"
        type="text"
        icon="el-icon-setting">
      </el-button>
      <el-select
        size="mini"
        v-model="lang">
        <el-option
          v-for="item in langList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-footer>
  </el-container>
</template>

<script>
  const {ipcRenderer, remote} = window.require('electron')
  const win = remote.getCurrentWindow()
  export default {
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
      setting() {
        ipcRenderer.send('router', {
          id: 'home',
          params: ''
        })
      },
      minus() {
        win.minimize()
      },
      close() {
        win.close()
      }
    }
  }
</script>

<style lang="less">
  .rabbit__index-page.page-container {

    > .el-main {
      padding : 24px 12px;

      .task-list__container {
        li {
          width            : 100%;
          background-color : rgba(33, 44, 61, 0.9);
          margin           : 20px 0;
          height           : 100px;
          border-radius    : 4px;
          box-shadow       : 0 0 12px 0 rgba(10, 10, 10, 0.16);

          &:first-child {
            margin-top : 0;
          }

          &:last-child {
            margin-bottom : 0;
          }

          &:hover {
            box-shadow : 0 2px 8px 8px rgba(0, 0, 0, 0.2);
          }
        }
      }
    }

    > .el-footer {
      display         : flex;
      align-items     : center;
      justify-content : flex-start;

      .el-select {
        width : 96px;

        &:hover {
          input {
            color : #FFFFFF;
          }
        }

        input {
          background-color : transparent;
          color            : var(--header-font-color);
          border           : none;
        }
      }

      .el-button {
        font-size : 16px;
        padding   : 6px 6px 6px 0;
      }
    }
  }
</style>
