<template>
  <div>
    <!-- 头部 -->
    <el-header>
      <div class="top-container">
        <div class="leftf">
          <img src="../assets/logo.png" />
          <span>音乐</span>
        </div>
        <div class="rightf" @keyup.enter="toResult">
          <el-input
            placeholder="请输入内容"
            v-model="inputVal"
            class="input-with-select"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="toResult"
            ></el-button>
          </el-input>
        </div>
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
          <el-menu-item :index="'/mvs'">
            <i class="el-icon-film"></i>
            <span slot="title">最新MV</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 右侧内容 -->
      <div class="main">
        <router-view></router-view>
      </div>
      <div class="player">
        <audio :src="musicUrl" autoplay controls id="music"></audio>
      </div>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      musicUrl: '',
      query: '',
      inputVal: '',
      n: 0,
      btnStatus: 0
    }
  },
  methods: {
    toResult() {
      if (this.inputVal === '') {
        // 提示用户
        this.$message.warning('请输入内容!')
      } else {
        // 携带数据去搜索页面
        this.$router.push(`/result?q=${this.inputVal}`)
      }
    },
    setUrl(val) {
      console.log(val)
      this.musicUrl = val
    }
  }
}
</script>

<style lang="less" scoped>
.player {
  height: 30px;
  width: 1000px;
}
audio {
  width: 100%;
  border-radius: none;
  outline: none;
}
.top-container {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  width: 100%;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
  img {
    height: 30px;
  }
}
.rightf {
  float: right;
}
.leftf {
  float: left;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
  height: 600px;
}

.el-menu-item {
  font-size: 20px;
  width: 200px;
}
.main {
  height: 550px;
  flex: 1;
  overflow-y: scroll;
  padding: 10px 20px;
}
.player {
  background: #f1f3f4;
  height: 60px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>
