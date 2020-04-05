<template>
  <div class="playlist-container">
    <div class="top-wrap">
      <div class="img-wrap">
        <!-- 封面 -->
        <img :src="playlist.tracks[0].al.picUrl" alt="" />
      </div>
      <div class="info-wrap">
        <!-- 名字 -->
        <p class="title"><el-tag type="danger"> 歌单</el-tag>{{ playlist.name }}</p>
        <div class="author-wrap">
          <img
            class="avatar"
            :src="playlist.creator.avatarUrl"
            v-if="playlist.creator !== undefined"
            alt=""
          />
          <!-- 名字 -->
          <span class="name" v-if="playlist.creator !== undefined">{{
            playlist.creator.nickname
          }}</span>
          <!-- 时间 -->
          <span class="time">{{ playlist.createTime | dateFormat }}</span>
        </div>
        <div class="tag-wrap">
          <span class="title">标签:</span>
          <el-tag
            type="info"
            v-for="(item, index) in playlist.tags"
            :key="index"
            >{{ item }}</el-tag
          >
        </div>
        <el-collapse>
          <el-collapse-item title="简介:">
            <div>
              {{ playlist.description }}
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲列表" name="1">
        <el-table :data="playlist.tracks" stripe highlight-current-row style="width: 100%;" @row-dblclick="playMusic">
          <el-table-column type="index" > </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-image
                style="width: 70px; height: 70px;"
                :src="scope.row.al.picUrl"
                :fit="fit"
              ></el-image>
            </template>
          </el-table-column >
          <el-table-column prop="name" label="音乐标题" sortable width="180">
          </el-table-column>
          <el-table-column prop="ar[0].name" label="歌手" sortable width="180">
          </el-table-column>
          <el-table-column prop="al.name" label="专辑"> </el-table-column>
          <el-table-column label="时长">
            <template slot-scope="scope">
              {{ scope.row.dt | playTimeFormat }}
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'playlist',
  data() {
    return {
      id: '',
      activeIndex: '1',
      // 总条数
      total: 0,
      // 页码
      pageNum: 1,
      pageSize: 10,

      playlist: {}

    }
  },
  created() {
    this.playlist = this.$store.state.myplaylist
  },
  methods: {
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
    }
  }
}
</script>

<style lang="less" scoped>
.top-wrap {
  display: flex;
}
.img-wrap img {
  width: 230px;
  margin-right: 20px;
}
.info-wrap {
  p {
    font-size: 1em;
  }
  .el-button {
    margin-bottom: 25px;
  }
  .tag-wrap {
    margin-bottom: 15px;
  }
  .author-wrap {
    font-size: 17px;
    line-height: 30px;
    margin-bottom: 25px;
    img {
      width: 30px;
      height: 30px;
      border-radius: 25px;
      margin-left: 10px;
    }
    span{
      margin-left: 10px;
    }
  }
  .desc-wrap {
    .title {
      margin-right: 20px;
    }
    .desc {
      font-size: 15px;
    }
  }
}
.el-tag {
  margin: 0 0 0 10px;
}
.el-button i {
  font-size: 20px;
}
.el-collapse-item {
  width: 840px;
}
.el-table-column img {
  width: 70px;
  height: 70px;
}
.playlist-container .comment-wrap {
  margin-bottom: 70px;
}

.playlist-container .comment-wrap .title {
  font-size: 20px;
}

.playlist-container .comment-wrap .title .number {
  color: black;
  font-size: 18px;
}

.playlist-container .comment-wrap .item {
  display: flex;
  padding-top: 20px;
}

.playlist-container .comment-wrap .item .icon-wrap {
  margin-right: 15px;
}

.playlist-container .comment-wrap .item .icon-wrap img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.playlist-container .comment-wrap .item:not(:last-child) .content-wrap {
  border-bottom: 1px solid #f2f2f1;
}

.playlist-container .comment-wrap .item .date {
  color: #bebebe;
  font-size: 14px;
}

.playlist-container .comment-wrap .item .content-wrap {
  padding-bottom: 20px;
  flex: 1;
}

.playlist-container .comment-wrap .item .content-wrap .name {
  color: #517eaf;
  font-size: 14px;
}

.playlist-container .comment-wrap .item .content-wrap .comment {
  font-size: 14px;
}

.playlist-container .comment-wrap .item .content-wrap .content,
.playlist-container .comment-wrap .item .content-wrap .re-content {
  margin-bottom: 10px;
}

.playlist-container .comment-wrap .item .content-wrap .re-content {
  padding: 10px;
  background-color: #e6e5e6;
  border-radius: 5px;
}
</style>
