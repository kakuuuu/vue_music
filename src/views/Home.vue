<template>
  <div class="body">
    <!-- 主体区 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '100px'">
        <!-- 侧边导航 -->
        <el-menu
          default-active="/discover"
          class="el-menu-vertical-demo"
          :router="true"
          background-color="#eaeff2"
          text-color="#8e8e8e"
          active-text-color="#000"
        >
          <div class="main-nav">
            <el-menu-item :index="'/mvs'">
              <!-- <i class="el-icon-film"></i> -->
              <span slot="title">MVS</span>
            </el-menu-item>
            <el-menu-item :index="'/playlists'">
              <!-- <i class="el-icon-s-data"></i> -->
              <span slot="title">PLAYLIST</span>
            </el-menu-item>
            <el-menu-item :index="'/discover'">
              <!-- <i class="el-icon-headset"></i> -->
              <span slot="title">DISCOVER</span>
            </el-menu-item>
            <el-menu-item :index="'/myplaylist'" class="small-menu-item">
              <i class="el-icon-arrow-left"></i>
            </el-menu-item>
          </div>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 头部 -->
        <el-header>
          <div class="top-container">
            <div class="leftf">
              <i class="el-icon-house" @click="gohome"></i>
              <i class="el-icon-arrow-left" @click="goback"></i>
              <i class="el-icon-arrow-right" @click="goright"></i>
            </div>
            <div class="rightf" @keyup.enter="toResult">
              <el-input
                placeholder="SEARCH"
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
            <div class="song" v-if="cursong">
              <div class="img-wrap" @click="toPlayer">
                <el-image
                  style="width: 50px; height: 50px;"
                  :src=cursong.al.picUrl
                >
                </el-image>
              </div>
              <div>
                <p>{{cursong.name}}</p>
                <p>{{cursong.ar[0].name}}</p>
              </div>
            </div>
            <audio :src="musicUrl" ref="audio" autoplay controls id="music"></audio>
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
      btnStatus: 0,
      cursong: {}
    }
  },
  watch: {
    '$store.state.currentsong': function() {
      this.cursong = this.$store.state.currentsong
    },
    '$store.state.musicurl': function () {
      this.musicUrl = this.$store.state.musicurl
    }
  },
  created() {
    this.getMyPlaylist()
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
    },
    async getMyPlaylist() {
      const { data: resp } = await this.$http.get(
        'http://www.liaowang.xyz:3000/playlist/detail?id=4951102632'
      )
      this.$store.commit('changelist', resp.playlist)
      this.$store.commit('changesong', resp.playlist.tracks[0])
      this.cursong = resp.playlist.tracks[0]
      const { data: resp2 } = await this.$http.get(
        'http://www.liaowang.xyz:3000/song/url?id=' + resp.playlist.tracks[0].id
      )
      if (!resp2.data[0].url) {
        return this.$message.error('该资源为VIP专享，暂不支持播放 ！')
      }
      this.$store.commit('changemusicurl', resp2.data[0].url)
    },
    toPlayer(id) {
      this.$router.push('/player')
    },
    gohome() {
      this.$router.push('/home')
    },
    goback() {
      this.$router.go(-1)
    },
    goright() {
      this.$router.go(1)
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
  i{
    margin-left: 10px;
  }
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
  height: 1000px;
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
.small-menu-item {
  width: 40px;
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
  width: 1000px;
  display: flex;
  position: fixed;
  justify-content: center;
  bottom: 0;
  left: 0;
  width: 100%;
}
.song {
  width: 20%;
  font-size: 12px;
  line-height: 12px;
    display: flex;
  align-items: center;
}
</style>
