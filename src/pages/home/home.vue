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
    mounted() {
      console.log(this.$router)
      // this.$router.push('')
    },
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

</style>
