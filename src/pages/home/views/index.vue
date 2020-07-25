<template>
  <el-container>
    <el-header height="40px">
      <el-col
        class="header__title"
        :span="16">
        <i class="el-icon-document"></i>
        <h3>111</h3>
      </el-col>
      <el-col :span="8">
        <el-button
          size="mini"
          type="danger"
          icon="el-icon-delete">
          {{$t('remove')}}
        </el-button>
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-upload">
          {{$t('publish')}}
        </el-button>
      </el-col>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <header></header>
        <ul>
          <li></li>
        </ul>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
  }
</script>
