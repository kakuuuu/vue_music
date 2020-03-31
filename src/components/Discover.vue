<template>
  <div class="discovery-container">
    <!-- 轮播图 -->
    <div class="carousel">
      <el-carousel class="" :interval="4000" type="card">
        <el-carousel-item v-for="(item, index) in banners" :key="index">
          <img :src="item.imageUrl" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 推荐歌单 -->
    <div class="recommend">
      <h3 class="title">
        推荐歌单
      </h3>
      <div class="items">
        <div class="item" v-for="(item, index) in playList" :key="index" @click="toPlaylist(item.id)">
          <div class="img-wrap">
            <div class="desc-wrap">
              <span class="desc">{{ item.copywriter }}</span>
            </div>
            <img :src="item.coverImgUrl+'?param=200y200'" alt="" />
          </div>
          <p class="name">{{ item.name }}</p>
        </div>
      </div>
    </div>
    <!-- 最新音乐 -->
    <div class="news">
      <h3 class="title">
        最新音乐
      </h3>
      <div class="items">
        <div
          class="item"
          v-for="(item, index) in newSongs"
          :key="index"
          @click="playMusic(item.id)"
        >
          <div class="img-wrap">
            <img :src="item.picUrl + '?param=130y130'" alt="" />
            <span class="iconfont icon-play"></span>
          </div>
          <div class="song-wrap">
            <div class="song-name">{{ item.name }}</div>
            <div class="singer">{{ item.song.artists[0].name }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 推荐MV -->
    <div class="mvs">
      <h3 class="title">推荐MV</h3>
      <div class="items">
        <div
          class="item"
          v-for="(item, index) in mvs"
          :key="index"
          @click="toMv(item.id)"
        >
          <div class="img-wrap">
            <img :src="item.cover + '?param=250y150'" alt="" />
            <div class="num-wrap">
              <div class="num">{{ item.playCount }}</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">{{ item.name }}</div>
            <div class="singer">{{ item.artistName }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'discovery',
  data() {
    return {
      // 轮播图
      banners: [],
      // 推荐歌单
      playList: [],
      // 最新歌曲
      newSongs: {},
      mvs: []
    }
  },

  created() {
    this.getBanner()
    this.getPersonalizedPlaylist()
    this.getPersonalizedMv()
    this.getPersonalizedNewsong()
  },

  methods: {
    async getBanner() {
      const { data: res } = await this.$http.get('http://www.liaowang.xyz:3000/banner')
      if (res.code !== 200) return this.$message.error(res)
      this.banners = res.banners
    },
    async getPersonalizedPlaylist() {
      const { data: res } = await this.$http.get(
        'http://www.liaowang.xyz:3000/top/playlist?limit=12&order=new'
      )
      // console.log(res)
      if (res.code !== 200) return this.$message.error(res)
      this.playList = res.playlists
    },
    async getPersonalizedMv() {
      const { data: res } = await this.$http.get(
        'http://www.liaowang.xyz:3000/mv/first?limit=5'
      )
      // console.log(res)
      this.mvs = res.data
    },
    async getPersonalizedNewsong() {
      const { data: res } = await this.$http.get(
        'http://www.liaowang.xyz:3000/personalized/newsong'
      )
      // console.log(res)
      this.newSongs = res.result
    },
    async login() {},
    async playMusic(id) {
      // 获取歌曲播放地址
      const { data: resp } = await this.$http.get(
        'http://www.liaowang.xyz:3000/song/url?id=' + id
      )
      if (!resp.data[0].url) {
        return this.$message.error('该资源为VIP专享，暂不支持播放 ！')
      }
      // 设置给父组件的播放地址
      this.$parent.$parent.$parent.$parent.musicUrl = resp.data[0].url
    },
    toPlaylist(id) {
      this.$router.push(`/playlist?id=${id}`)
    },

    toMv(id) {
      this.$router.push(`/mv?id=${id}`)
    }
  }
}
</script>

<style lang="less" scoped>
.carousel {
  text-align: center;
}
.el-carousel {
  width: 100%;
  text-align: center;
  img {
    width: 550px;
    // height: 300px;
  }
}
.discovery-container {
  .title {
    font-size: 30px;
    line-height: 50px;
  }
  line-height: 16px;
}

.discovery-container .recommend {
  margin-bottom: 40px;
}

.discovery-container .recommend .items {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.discovery-container .recommend .items .item {
  width: 200px;
  margin: 10px;
  position: relative;
  overflow: hidden;
}

.discovery-container .recommend .items .item img {
  width: 200px;
  height: 200px;
  border-radius: 5px;
}

.discovery-container .recommend .items .item .desc-wrap {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  font-size: 16px;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  max-height: 50px;
  padding: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  top: -50px;
}

.discovery-container .recommend .items .item .desc-wrap span {
  font-size: 14px;
}

.discovery-container .recommend .items .item:hover .desc-wrap {
  top: 0;
}

.discovery-container .recommend .items .item .img-wrap {
  position: relative;
}

.discovery-container .recommend .items .item .name {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  font-size: 14px;
}
.discovery-container .news {
  margin-bottom: 40px;
}

.discovery-container .news .items {
  height: 500px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding-left: 15px;
  margin-left: 15px;
}

.discovery-container .news .items .item {
  height: 100px;
  width: 50%;
  display: flex;
  align-items: center;
}

.discovery-container .news .items .item:hover {
  background-color: #f5f5f5;
}

.discovery-container .news .items .item .index {
  margin-right: 15px;
  font-size: 15px;
}

.discovery-container .news .items .item .img-wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.discovery-container .news .items .item .img-wrap img {
  width: 80px;
  height: 80px;
}

.discovery-container .news .items .item .img-wrap .el-icon-caret-right {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.discovery-container .news .items .item .img-wrap .iconfont::before {
  transform: translateX(3px);
}

.discovery-container .news .items .item .img-wrap:hover .iconfont {
  opacity: 1;
}

.discovery-container .news .items .item .song-wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  line-height: 16px;
  padding: 10px;
  font-size: 16px;
}

.discovery-container .news .items .item .song-wrap .singer {
  font-size: 14px;
  color: gray;
}
.discovery-container .mvs .items {
  display: flex;
  justify-content: space-around;
}

.discovery-container .mvs .items .item {
  width: 250px;
  cursor: pointer;
}

.discovery-container .mvs .items .item .img-wrap {
  width: 100%;
  position: relative;
}

.discovery-container .mvs .items .item .img-wrap > .icon-play {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  color: #dd6d60;
  font-size: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
  opacity: 0;
}

.discovery-container .mvs .items .item .img-wrap > .icon-play::before {
  transform: translateX(3px);
}

.discovery-container .mvs .items .item .img-wrap:hover > .icon-play {
  opacity: 1;
}

.discovery-container .mvs .items .item .img-wrap img {
  width: 100%;
  border-radius: 5px;
}

.discovery-container .mvs .items .item .img-wrap .num-wrap {
  position: absolute;
  color: white;
  top: 0;
  right: 0;
  display: flex;
  align-content: center;
  font-size: 15px;
  padding-right: 5px;
  padding-top: 2px;
}

.discovery-container .mvs .items .item .info-wrap .name {
  line-height: 15px;
  height: 15px;
  width: 100%;
  font-size: 15px;
  margin-bottom: 0;
  margin-top: 0px;
}

.discovery-container .mvs .items .item .info-wrap .singer {
  font-size: 14px;
  color: #c5c5c5;
}
</style>
