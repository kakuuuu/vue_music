<template>
  <div class="playmusic-container">
    <div class="top-wrap">
      <div class="img-wrap">
        <!-- 封面 -->
        <img :src="playmusic.al.picUrl" alt="" />
      </div>
      <div>
        <div class="info-wrap">
          <!-- 名字 -->
          <p class="title">{{ playmusic.name }}</p>
          <div class="introduce">
            <span>专辑：{{ playmusic.al.name }}</span>
            <span>歌手：{{ playmusic.ar[0].name }}</span>
          </div>
        </div>
        <div class="lyric-content" ref="lyric">
          <div class="lyric-item-wrapper">
            <div
              :class="['lyric-item', { active: activeIndex === index }]"
              v-for="(item, index) in playingLyric"
              :key="index"
              @click="lyricClick(item)"
            >
              {{ item.txt }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-wrap">
      <div>
        <div
          class="comment-wrap"
          v-if="hotComments !== undefined && hotComments.length !== 0"
        >
          <p class="title">
            精彩评论<span class="number">({{ hotComments.length }})</span>
          </p>
          <div class="comments-wrap">
            <!-- 评论 -->
            <div class="item" v-for="(item, index) in hotComments" :key="index">
              <div class="icon-wrap">
                <!-- 头像 -->
                <img :src="item.user.avatarUrl + '?param=50y50'" alt="" />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <span class="name">{{ item.user.nickname }}</span>
                  <span class="comment">：{{ item.content }}</span>
                </div>
                <!-- 回复 -->
                <div class="re-content" v-if="item.beReplied.length !== 0">
                  <span class="name">{{
                    item.beReplied[0].user.nickname
                  }}</span>
                  <span class="comment">：{{ item.beReplied[0].content }}</span>
                </div>
                <div class="date">{{ item.time | dateFormat }}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 最新评论 -->
        <div class="comment-wrap">
          <p class="title">
            最新评论<span class="number">({{ total }})</span>
          </p>
          <div class="comments-wrap">
            <!-- 评论 -->
            <div class="item" v-for="(item, index) in comments" :key="index">
              <div class="icon-wrap">
                <!-- 头像 -->
                <img :src="item.user.avatarUrl + '?param=50y50'" alt="" />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <span class="name">{{ item.user.nickname }}</span>
                  <span class="comment">：{{ item.content }}</span>
                </div>
                <!-- 回复 -->
                <div class="re-content" v-if="item.beReplied.length !== 0">
                  <span class="name">{{
                    item.beReplied[0].user.nickname
                  }}</span>
                  <span class="comment">：{{ item.beReplied[0].content }}</span>
                </div>
                <div class="date">{{ item.time | dateFormat }}</div>
              </div>
            </div>
          </div>
        </div>
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
    </div>
  </div>
</template>

<script>
import Lyric from 'lyric-parser'
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      playmusic: {},
      lyrics: {},
      currentLyric: null,
      playingLyric: null,
      id: '',
      activeIndex: 0,
      // 总条数
      total: 0,
      // 页码
      pageNum: 1,
      pageSize: 10,
      hotComments: [],
      comments: [],
      scroll: null
    }
  },
  created() {
    this.playmusic = this.$store.state.currentsong
    this.getlyrics()
    this.getPlaymusicComments()
  },
  methods: {
    throttle(fn, interval) {
      var last
      var timer
      interval = interval || 200
      return function() {
        var th = this
        var args = arguments
        var now = +new Date()
        if (last && now - last < interval) {
          clearTimeout(timer)
          timer = setTimeout(function() {
            last = now
            fn.apply(th, args)
          }, interval)
        } else {
          last = now
          fn.apply(th, args)
        }
      }
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.getPlaymusicComments()
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
      this.$store.commit('changesong', resp2.songs[0])
      this.$store.commit('changemusicurl', resp.data[0].url)
    },
    async getlyrics() {
      const { data: resp } = await this.$http.get(
        'http://www.liaowang.xyz:3000/lyric?id=' + this.playmusic.id
      )
      if (resp.lrc.lyric !== null) {
        this.lyrics = resp.lrc.lyric
        this.currentLyric = new Lyric(resp.lrc.lyric)
        this.playingLyric = this.currentLyric.lines
      }
    },
    async getPlaymusicComments() {
      const { data: resp } = await this.$http.get(
        'http://www.liaowang.xyz:3000/comment/music?id=' +
          this.playmusic.id +
          '&limit=' +
          this.pageSize +
          '&offset=' +
          (this.pageNum - 1) * this.pageSize
      )
      this.comments = resp.comments
      this.hotComments = resp.hotComments
      this.total = resp.total
    },
    init() {
      if (this.playmusic) {
        this.$parent.$parent.$parent.$parent.$refs.audio.addEventListener(
          'timeupdate',
          e => {
            var timeStamp = e.target.currentTime * 1000
            this.activeIndex = this.playingLyric.findIndex((item, index) => {
              return item.time < timeStamp && this.playingLyric[index + 1]
                ? this.playingLyric[index + 1].time > timeStamp
                : true
            })
            if (this.activeIndex <= this.playingLyric.length - 7) {
              this.scroll.scrollTo(0, -27 * this.activeIndex, 1000)
            }
          }
        )
      }
    },
    lyricScrollInit() {
      this.scroll = new BScroll(this.$refs.lyric)
    }
  },
  mounted() {
    this.throttle(this.init(), 500)
    this.lyricScrollInit()
  }
}
</script>

<style lang="less" scoped>
.top-wrap {
  display: flex;
  justify-content: center;
}
.img-wrap img {
  width: 300px;
  margin-right: 20px;
}
.info-wrap {
  margin-left: 20px;
  p {
    font-size: 26px;
  }
  .introduce span {
    font-size: 12px;
    margin-right: 20px;
  }
}
.comment-wrap {
  width: 80%;
  padding: 0 10% 0 10%;
  margin-top: 50px;
  margin-bottom: 70px;
}

.comment-wrap .title {
  font-size: 18px;
}

.comment-wrap .title .number {
  color: black;
  font-size: 16px;
}

.comment-wrap .item {
  display: flex;
  padding-top: 20px;
}

.comment-wrap .item .icon-wrap {
  margin-right: 15px;
}

.comment-wrap .item .icon-wrap img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.comment-wrap .item:not(:last-child) .content-wrap {
  border-bottom: 1px solid #f2f2f1;
}

.comment-wrap .item .date {
  color: #bebebe;
  font-size: 14px;
}

.comment-wrap .item .content-wrap {
  padding-bottom: 20px;
  flex: 1;
}

.comment-wrap .item .content-wrap .name {
  color: #517eaf;
  font-size: 14px;
}

.comment-wrap .item .content-wrap .comment {
  font-size: 14px;
}

.comment-wrap .item .content-wrap .content,
.comment-wrap .item .content-wrap .re-content {
  margin-bottom: 10px;
}

.comment-wrap .item .content-wrap .re-content {
  padding: 10px;
  background-color: #e6e5e6;
  border-radius: 5px;
}
.lyric-content {
  position: relative;
  height: 189px;
  margin-top: 30px;
  overflow: hidden;
  // background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  user-select: none;
  .lyric-item-wrapper {
    .lyric-item {
      color: #999;
      height: 27px;
      transition: all 1s;
      cursor: pointer;
      padding-left: 1em;
      &.active {
        color: #333;
      }
    }
  }
  .play-btn {
    position: absolute;
    right: 10px;
    top: 10px;
    color: #999;
    cursor: pointer;
    font-size: 14px;
    &:hover {
      color: #333;
    }
  }
}
</style>
