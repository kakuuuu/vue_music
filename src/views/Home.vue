<template>
  <el-container class="home-container">
    <!-- 头部 -->
    <el-header>
      <div>
        <img src="../assets/logo.png" />
        <span>音乐</span>
      </div>
    </el-header>
    <!-- 主体区 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <!-- 侧边导航 -->
      </el-aside>
      <!-- 右侧内容 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.el-header{
  img{
    height: 30px
  }
}
/* .el-header img {
  height: 30px;
}
.el-header span{
  height: 30px;
  line-height: 30px;
  text-align: center
} */
</style>
