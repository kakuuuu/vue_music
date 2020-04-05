<template>
  <div class="result-container">
    <div class="title-wrap">
      <h2 class="title" :keywords="(keywords = $route.query.q)">
        {{ $route.query.q }}
      </h2>
      <span class="sub-title">{{ count }}</span>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲" name="songs">
        <el-table
          :data="songs"
          stripe
          highlight-current-row
          style="width: 100%;"
          @row-dblclick="playMusic"
        >
          <el-table-column type="index"> </el-table-column>
          <el-table-column prop="name" label="音乐标题" width="180">
          </el-table-column>
          <el-table-column prop="artists[0].name" label="歌手" width="180">
          </el-table-column>
          <el-table-column prop="item.album.name" label="专辑">
          </el-table-column>
          <el-table-column label="时长">
            <template slot-scope="scope">
              {{ scope.row.duration | playTimeFormat }}
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="歌单" name="lists">
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
                <span class="num">{{ item.playCount | playNumFormat }}</span>
              </div>
              <img :src="item.coverImgUrl + '?param=200y200'" alt="" />
            </div>
            <p class="name">{{ item.name }}</p>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="MV" name="mv">
        <div class="items mv">
          <div
            class="item"
            v-for="(item, index) in mvs"
            :key="index"
            @click="toMv(item.id)"
          >
            <div class="img-wrap">
              <img :src="item.cover + '?param=250y150'" alt="" />
              <div class="num-wrap">
                <div class="num">{{ item.playCount | playNumFormat }}</div>
              </div>
              <span class="time">{{ item.duration | playTimeFormat }}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{ item.name }}</div>
              <div class="singer">{{ item.artistName }}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- 分页器 -->
    <el-pagination
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="pageNum"
      :page-size="pageSize"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'result',
  data() {
    return {
      // 总条数
      total: 0,
      // 页码
      pageNum: 1,
      pageSize: 12,
      keywords: '',
      activeIndex: 'songs',
      songs: [],
      count: 0,
      playlists: [],
      mvs: [],
      songId: 0,
      type: 1
    }
  },

  created() {
    // this._search()
  },

  watch: {
    keywords() {
      this.search()
    },
    activeIndex() {
      switch (this.activeIndex) {
        case 'songs':
          this.type = 1
          this.pageNum = 1
          break
        case 'lists':
          this.type = 1000
          this.pageNum = 1
          break
        case 'mv':
          this.type = 1004
          this.pageNum = 1
          break

        default:
          break
      }
      this.search()
    }
  },

  methods: {
    // 页码改变事件
    handleCurrentChange(val) {
      // 保存页码
      this.pageNum = val
      // 重新获取数据
      this.search()
    },

    async search() {
      const { data: resp } = await this.$http.get(
        'http://www.liaowang.xyz:3000/search?keywords=' +
          this.keywords +
          '&type=' +
          this.type +
          '&limit=' +
          (this.type === 1004 ? 8 : 12) +
          '&offset=' +
          (this.pageNum - 1) * (this.type === 1004 ? 8 : 12)
      )
      if (resp.code !== 200) {
        return
      }
      if (this.type === 1) {
        this.songs = resp.result.songs
        this.count = resp.result.songCount
      } else if (this.type === 1000) {
        this.playlists = resp.result.playlists
        this.count = resp.result.playlistCount
      } else if (this.type === 1004) {
        this.mvs = resp.result.mvs
        this.count = resp.result.mvCount
      }
      this.total = this.count
    },
    async playMusic(row) {
      // 获取歌曲播放地址
      const { data: resp } = await this.$http.get(
        'http://www.liaowang.xyz:3000/song/url?id=' + row.id
      )
      if (!resp.data[0].url) {
        return this.$message.error('该资源为VIP专享，暂不支持播放 ！')
      }
      const { data: resp2 } = await this.$http.get(
        'http://www.liaowang.xyz:3000/song/detail?ids=' + row.id
      )
      // 设置给父组件的播放地址
      this.$store.commit('changesong', resp2.songs[0])
      this.$store.commit('changemusicurl', resp.data[0].url)
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
.result-container {
  line-height: 20px;
}
.result-container .title-wrap {
  display: flex;
  align-items: flex-end;
  margin-bottom: 30px;
}

.result-container .title-wrap .title {
  margin-right: 10px;
}

.result-container .title-wrap .sub-title {
  font-size: 15px;
  color: #bebebe;
}

.result-container .el-tabs__item {
  font-size: 18px;
}

.result-container .el-table td,
.result-container .el-table th.is-leaf {
  border-bottom: none;
}

.result-container .items {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.result-container .items .item {
  width: 200px;
  cursor: pointer;
  margin-right: 20px;
  margin-bottom: 20px;
}

.result-container .items .item .img-wrap {
  width: 100%;
  position: relative;
}

.result-container .items .item .img-wrap > .icon-play {
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

.result-container .items .item .img-wrap > .icon-play::before {
  transform: translateX(3px);
}

.result-container .items .item .img-wrap:hover > .icon-play {
  opacity: 1;
}

.result-container .items .item .img-wrap img {
  width: 100%;
  border-radius: 5px;
}

.result-container .items .item .img-wrap .num-wrap {
  position: absolute;
  color: white;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  font-size: 15px;
  padding-right: 5px;
  padding-top: 2px;
}

.result-container .items .item .img-wrap .num-wrap .icon-play {
  font-size: 12px;
  display: flex;
  align-items: center;
  margin-right: 5px;
}

.result-container .items .item .img-wrap .time {
  position: absolute;
  bottom: 5px;
  right: 5px;
  color: white;
  font-size: 15px;
}

.result-container .items .item .name {
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.result-container .items .item .singer {
  font-size: 14px;
  color: #c5c5c5;
}

.result-container .items.mv .item {
  width: 250px;
}
</style>
