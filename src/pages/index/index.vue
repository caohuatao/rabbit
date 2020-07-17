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
    </el-main>
    <el-footer height="30px">
      <el-button
        class="setting-btn"
        type="text"
        icon="el-icon-edit">
      </el-button>
      <el-button
        @click="setting"
        class="setting-btn"
        type="text"
        icon="el-icon-setting">
      </el-button>
    </el-footer>
  </el-container>
</template>

<script>

  const {ipcRenderer} = window.require('electron')

  export default {
    methods: {
      setting() {
        console.log('setting')
      },
      minus() {
        ipcRenderer.send('open-terminal')
      },
      close() {
        console.log('close')
      }
    }
  }
</script>

<style lang="less">


  .rabbit__index-page {
    @color : var(--header-font-color);

    > .el-header {

      -webkit-user-select : none;
      -webkit-app-region  : drag;

      display             : flex;
      justify-content     : space-between;
      align-items         : center;

      cursor              : move;
      color               : @color;
      background-color    : rgba(0, 0, 0, 0.3);
      box-shadow          : 0 5px 120px rgba(68, 185, 68, 0.3);

      > .el-button-group {
        -webkit-app-region : no-drag;

        > .el-button {
          color        : @color;
          font-size    : 18px;
          padding-left : 12px;
        }
      }

    }

    > .el-main {
      /*background-color: #000000;*/
    }

    > .el-footer {
      display          : flex;
      align-items      : center;
      justify-content  : flex-end;
      background-color : rgba(0, 0, 0, 0.3);
      box-shadow       : 0 -5px 120px rgba(68, 185, 68, 0.3);

      .el-button {
        color        : @color;
        font-size    : 16px;
        padding-left : 0;
      }
    }
  }
</style>
