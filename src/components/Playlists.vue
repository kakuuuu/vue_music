<template>
  <div class="playlists-container">
    <!-- 同步 -->
    <div class="top-card">
      <!-- 封面 -->
      <div class="icon-wrap">
        <img :src="topPlayList.coverImgUrl + '?param=200y200'" alt="" />
      </div>
      <div class="content-wrap">
        <div class="tag">精品歌单</div>
        <!-- 标题 -->
        <div class="title">
          {{ topPlayList.title }}
        </div>
        <!-- 介绍 -->
        <div class="info">
          {{ topPlayList.description }}
        </div>
      </div>
      <!-- 背景 -->
      <img :src="topPlayList.coverImgUrl" alt="" class="bg" />
      <div class="bg-mask"></div>
    </div>

    <div class="tab-container">
      <!-- tab栏 顶部 -->
      <div class="tab-bar">
        <span
          class="item"
          @click="tag = '全部'"
          :class="{ active: tag === '全部' }"
          >全部</span
        >
        <span
          class="item"
          @click="tag = '欧美'"
          :class="{ active: tag === '欧美' }"
          >欧美</span
        >
        <span
          class="item"
          @click="tag = '华语'"
          :class="{ active: tag === '华语' }"
          >华语</span
        >
        <span
          class="item"
          @click="tag = '流行'"
          :class="{ active: tag === '流行' }"
          >流行</span
        >
        <span
          class="item"
          @click="tag = '说唱'"
          :class="{ active: tag === '说唱' }"
          >说唱</span
        >
        <span
          class="item"
          @click="tag = '摇滚'"
          :class="{ active: tag === '摇滚' }"
          >摇滚</span
        >
        <span
          class="item"
          @click="tag = '民谣'"
          :class="{ active: tag === '民谣' }"
          >民谣</span
        >
        <span
          class="item"
          @click="tag = '电子'"
          :class="{ active: tag === '电子' }"
          >电子</span
        >
        <span
          class="item"
          @click="tag = '轻音乐'"
          :class="{ active: tag === '轻音乐' }"
          >轻音乐</span
        >
        <span
          class="item"
          @click="tag = '影视原声'"
          :class="{ active: tag === '影视原声' }"
          >影视原声</span
        >
        <span
          class="item"
          @click="tag = 'ACG'"
          :class="{ active: tag === 'ACG' }"
          >ACG</span
        >
      </div>
      <!-- tab的内容区域 -->
      <div class="tab-content">
        <div class="items">
          <div
            class="item"
            v-for="(item, index) in playlists"
            :key="index"
            @click="toPlaylist(item.id)"
          >
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">{{ item.playCount }}</span>
              </div>
              <img :src="item.coverImgUrl + '?param=200y200'" alt="" />
            </div>
            <p class="name">{{ item.name }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页器 -->
  </div>
</template>

<script>
export default {
  name: 'recommend',
  data() {
    return {
      // 总条数
      total: 0,
      // 页码
      pageNum: 1,
      pageSize: 24,
      tag: '全部',
      // 顶部精品歌单
      topPlayList: {},
      // 歌单列表
      playlists: []
    }
  },

  async created() {
    this.getTopPlaylist()
    this.getPlaylist()
  },

  methods: {
    // 页码改变事件
    handleCurrentChange(val) {
      // 保存页码
      this.pageNum = val
      // 重新获取数据
      this._getPlaylist()
    },

    // 获取精品歌单
    async getTopPlaylist() {
      const { data: resp } = await this.$http.get(
        'http://www.liaowang.xyz:3000/top/playlist/highquality?limit=1&cat=' + this.tag
      )
      this.topPlayList = resp.playlists[0]
    },
    // 获取歌单列表
    async getPlaylist() {
      const { data: resp } = await this.$http.get(
        'http://www.liaowang.xyz:3000/top/playlist/highquality?cat=' +
          this.tag +
          '&limit=' +
          this.pageSize
      )
      this.playlists = resp.playlists
      this.total = resp.total
    },
    toPlaylist(id) {
      this.$router.push(`/playlist?id=${id}`)
    }
  },
  watch: {
    tag() {
      this.pageNum = 1
      this.getTopPlaylist()
      this.getPlaylist()
    }
  }
}
</script>

<style lang="less" scoped>
.top-card {
  line-height: 20px;
  padding: 20px;
  height: 150px;
  display: flex;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
  .icon-wrap {
    margin-right: 20px;
    z-index: 1;
    img {
      width: 160px;
      height: 160px;
    }
  }
  .content-wrap {
    z-index: 1;
    .tag {
      color: #dfac67;
      border: 1px solid #dfac67;
      width: 100px;
      height: 30px;
      text-align: center;
      border-radius: 5px;
      font-size: 16px;
      line-height: 30px;
      cursor: pointer;
    }
    .title {
      color: white;
      padding-top: 10px;
    }
    .info {
      color: #888482;
      font-size: 14px;
      padding-top: 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 5;
    }
  }
  .bg {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    filter: blur(20px);
  }
  .bg-mask {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
}
.tab-container {
  padding-top: 30px;
  .tab-bar {
    display: flex;
    // justify-content: flex-end;
    justify-content: flex-start;
  }
  .item {
    font-size: 15px;
    color: gray;
    margin-right: 20px;
    cursor: pointer;
    .active {
      color: #dd6d60;
    }
  }
}
.playlists-container {
  line-height: 20px;
}
.tab-container .tab-content {
  margin-top: 20px;
}

.playlists-container .tab-container .tab-content .items {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.playlists-container .tab-container .tab-content .items .item {
  width: 200px;
  margin: 10px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.playlists-container .tab-container .tab-content .items .item img {
  width: 200px;
  height: 200px;
  border-radius: 5px;
}

.playlists-container .tab-container .tab-content .items .item .num-wrap {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 14px;
  color: white;
  line-height: 30px;
  background: rgba(0, 0, 0, 0.5);
  height: 30px;
  width: 100%;
  padding-left: 5px;
  top: -30px;
  overflow: hidden;
}

.playlists-container .tab-container .tab-content .items .item:hover .num-wrap {
  top: 0;
}

.playlists-container .tab-container .tab-content .items .item .img-wrap {
  position: relative;
}

.playlists-container
  .tab-container
  .tab-content
  .items
  .item
  .img-wrap
  .icon-play::before {
  transform: translateX(3px);
}

.playlists-container
  .tab-container
  .tab-content
  .items
  .item
  .img-wrap:hover
  .icon-play {
  opacity: 1;
}

.playlists-container .tab-container .tab-content .items .item .name {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: 14px;
}
</style>
