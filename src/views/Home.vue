<template>
  <el-container class="home-container">
    <!-- 头部 -->
    <el-header >
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
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          :router="true"
        >
          <el-menu-item :index="'/discover'">
            <i class="el-icon-headset"></i>
            <span slot="title">发现音乐</span>
          </el-menu-item>
          <el-menu-item :index="'/playlists'">
            <i class="el-icon-s-data"></i>
            <span slot="title">推荐歌单</span>
          </el-menu-item>
          <el-menu-item :index="'/songs'">
            <i class="el-icon-document"></i>
            <span slot="title">最新音乐</span>
          </el-menu-item>
          <el-menu-item :index="'/mvs'">
            <i class="el-icon-film"></i>
            <span slot="title">最新MV</span>
          </el-menu-item>
        </el-menu>
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
.el-header {
  background-color: #fff;
  img {
    height: 30px;
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
