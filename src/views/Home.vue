<template>
  <div class="body">
    <!-- 主体区 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '100px'">
        <!-- 侧边导航 -->
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          :router="true"
          background-color="#eaeff2"
          text-color="#8e8e8e"
          active-text-color="#000"
        >
          <div class="main-nav">
            <el-menu-item :index="'/mvs'">
              <i class="el-icon-film"></i>
              <span slot="title">最新MV</span>
            </el-menu-item>
            <el-menu-item :index="'/playlists'">
              <i class="el-icon-s-data"></i>
              <span slot="title">推荐歌单</span>
            </el-menu-item>
            <el-menu-item :index="'/discover'">
              <i class="el-icon-headset"></i>
              <span slot="title">发现音乐</span>
            </el-menu-item>
          </div>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 头部 -->
        <el-header>
          <div class="top-container">
            <div class="leftf">
            </div>
            <div class="rightf" @keyup.enter="toResult">
              <el-input
                placeholder="请输入内容"
                v-model="inputVal"
                class="input-with-select"
              >
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </div>
          </div>
        </el-header>
        <el-main>
          <div class="main">
            <transition name="fold-left">
              <router-view></router-view>
            </transition>
          </div>
          <div class="player">
            <audio :src="musicUrl" autoplay controls id="music"></audio>
          </div>
        </el-main>
      </el-container>
      <!-- 右侧内容 -->
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
      this.musicUrl = val
    }
  }
}
</script>

<style lang="less" scoped>
.fold-left-enter-active {
  animation-name: fold-left-in;
  animation-duration: 0.5s;
}
.fold-left-leave-active {
  animation-name: fold-left-out;
  animation-duration: 0.5s;
}
@keyframes fold-left-in {
  0% {
    transform: translate3d(100%, 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes fold-left-out {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-100%, 0, 0);
  }
}

.body {
  background-color: #ffffff;
}
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
  background-color: #fff;
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
.el-input {
  width: 400px;
  margin-right: 40px;
}
.el-aside {
  background-color: #eaeff2;
  color: #333;
  text-align: center;
  line-height: 200px;
  height: 700px;
}
.main-nav {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: row;
  flex-direction: row;
  position: absolute;
  top: 250px;
  left: calc(100% - 53px);
  transform: translateX(-50%) rotate(-90deg);
}
.el-menu-item {
  font-size: 20px;
  width: 150px;
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
