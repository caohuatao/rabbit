<!--
 * User: CHT
 * Date: 2020/7/16
 * Time: 15:00
-->
<template>
  <el-container class="rabbit__index-page">
    <el-header>
      <h3>Rabbit</h3>
      <el-button-group>
        <el-button
          v-if="$route.name === 'Index'"
          @click="setting"
          class="setting-btn"
          type="text"
          icon="el-icon-setting">
        </el-button>
        <el-button
          v-else
          @click="back"
          class="setting-btn"
          type="text"
          icon="el-icon-arrow-left">
        </el-button>
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
  </el-container>
</template>

<script>
  export default {
    methods: {
      setting() {
        this.$router.push('/setting')
      },
      back() {
        this.$router.push('/')
      },
      minus() {
        console.log('minus')
      },
      close() {
        console.log('close')
      }
    }
  }
</script>

<style lang="less">
  html,
  body {
    height : 100%;
  }

  .rabbit__index-page {
    background : var(--backgroud-color-black) url(/image/starry-sky.svg) no-repeat center/auto 100%;
    height     : 100%;
    overflow   : hidden;

    > .el-header {
      @color              : var(--header-font-color);

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
          &.setting-btn {
            font-size : 16px;
          }

          color        : @color;
          font-size    : 18px;
          padding-left : 12px;
        }
      }

    }

    > .el-main {
      /*background-color: #000000;*/

    }
  }
</style>
