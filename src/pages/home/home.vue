<!--
 * User: CHT
 * Date: 2020/7/16
 * Time: 15:01
-->
<template>
  <el-container class="page-container rabbit__home-page">
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
      <router-view></router-view>
    </el-main>
    <el-footer height="32px">
    </el-footer>
  </el-container>
</template>

<script>
  const {ipcRenderer, remote} = window.require('electron')
  const win = remote.getCurrentWindow()
  export default {
    methods: {
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
  .page-container.rabbit__home-page {
    color : var(--header-font-color);

    > .el-main {
      > .el-container {

        .el-header,
        .el-aside,
        .el-main {
          background-color : var(--background-color-current);
          border-radius    : 4px;
        }

        .el-header {
          margin-bottom   : 16px;
          display         : flex;
          justify-content : space-between;
          align-items     : center;

          .header__title {
            display : flex;
            > i {
              margin-right : 6px;
            }
          }

          .el-col:last-child {
            text-align : right;
          }

          .el-button {
            letter-spacing   : 2px;
            border-color     : rgba(0, 0, 0, 0.1);
            background-color : rgba(0, 0, 0, 0.4);
            color            : var(--header-font-color);

            &:hover {
              color            : var(--header-hover-font-color);
              background-color : rgba(0, 0, 0, 0.2);
            }
          }
        }

        .el-aside {
          margin-right : 16px;
        }
      }


      > section {
        width         : 100%;
        height        : 100%;
        border-radius : 4px;
      }
    }
  }
</style>
