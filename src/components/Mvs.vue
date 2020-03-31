<template>
  <div class="mvs-container">
    <div class="filter-wrap">
      <div class="seciton-wrap">
        <span class="section-type">地区:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span
              class="title"
              @click="area = '内地'"
              :class="{ active: area === '内地' }"
              >内地</span
            >
          </li>
          <li class="tab">
            <span
              class="title"
              @click="area = '港台'"
              :class="{ active: area === '港台' }"
              >港台</span
            >
          </li>
          <li class="tab">
            <span
              class="title"
              @click="area = '欧美'"
              :class="{ active: area === '欧美' }"
              >欧美</span
            >
          </li>
          <li class="tab">
            <span
              class="title"
              @click="area = '日本'"
              :class="{ active: area === '日本' }"
              >日本</span
            >
          </li>
          <li class="tab">
            <span
              class="title"
              @click="area = '韩国'"
              :class="{ active: area === '韩国' }"
              >韩国</span
            >
          </li>
        </ul>
      </div>
    </div>
    <!-- mv容器 -->
    <div class="mvs">
      <div class="items">
        <div
          class="item"
          @click="toMv(item.id)"
          v-for="(item, index) in mvs"
          :key="index"
        >
          <div class="img-wrap">
            <img :src="item.cover + '?param=250y150'" alt="" />
            <div class="num-wrap">
              <div class="iconfont icon-play"></div>
              <div class="num">{{ item.playCount | playNumFormat }}</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">{{ item.name }}</div>
            <div class="singer">{{ item.artistName }}</div>
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
</template>

<script>
export default {
  name: 'mvs',
  data() {
    return {
      // 总条数
      total: 20,
      // 页码
      pageNum: 1,
      pageSize: 8,
      area: '',
      type: '全部',
      order: '最热',
      mvs: []
    }
  },

  created() {
    this.getMvs()
  },

  watch: {
    area() {
      this.pageNum = 1
      this.getMvs()
    },
    type() {
      this.pageNum = 1
      this.getMvs()
    },
    order() {
      this.pageNum = 1
      this.getMvs()
    }
  },

  methods: {
    // 页码改变事件
    handleCurrentChange(val) {
      // 保存页码
      this.pageNum = val
      this.getMvs()
    },

    async getMvs() {
      const { data: resp } = await this.$http.get(
        'http://www.liaowang.xyz:3000/top/mv?area=' +
          this.area +
          '&offset=' +
          (this.pageNum - 1) * this.pageSize +
          '&limit=' +
          this.pageSize
      )
      if (resp.code !== 200) {
        return this.$message.error('获取失败')
        // this.total = resp.count
      }
      this.mvs = resp.data
    },
    toMv(id) {
      this.$router.push(`/mv?id=${id}`)
    }
  }
}
</script>

<style lang="less" scoped>
.mvs-container {
  li {
    list-style: none;
  }
  line-height: 20px;
  padding: 20px;
}

.mvs-container .filter-wrap > div {
  margin-bottom: 30px;
  vertical-align: baseline;
  display: flex;
  justify-content: center;
  align-items: center;
}

.mvs-container .filter-wrap > div span {
  font-size: 14px;
  height: 100%;
}

.mvs-container .filter-wrap > div span.title {
  margin: 20px;
  color: gray;
  cursor: pointer;
  padding: 5px 20px;
}

.mvs-container .filter-wrap > div span.title.active {
  color: #dd6d60;
  background-color: #fcf6f5;
  border-radius: 20px;
}

.mvs-container .filter-wrap > div span.title::before {
  content: '', pos;
}

.mvs-container .filter-wrap > div ul {
  display: flex;
}

.mvs-container .filter-wrap > div ul li:not(:last-child) {
  border-right: 1px solid #f2f2f1;
}

.mvs-container .mvs .items {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.mvs-container .mvs .items .item {
  width: 250px;
  cursor: pointer;
  margin-right: 25px;
  margin-bottom: 30px;
}

.mvs-container .mvs .items .item .img-wrap {
  width: 100%;
  position: relative;
}

.mvs-container .mvs .items .item .img-wrap img {
  width: 100%;
  border-radius: 5px;
}

.mvs-container .mvs .items .item .img-wrap .num-wrap {
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

.mvs-container .mvs .items .item .img-wrap .num-wrap .icon-play {
  font-size: 12px;
  display: flex;
  align-items: center;
  margin-right: 5px;
}

.mvs-container .mvs .items .item .info-wrap .name {
  font-size: 15px;
}

.mvs-container .mvs .items .item .info-wrap .singer {
  font-size: 14px;
  color: #c5c5c5;
}
</style>
