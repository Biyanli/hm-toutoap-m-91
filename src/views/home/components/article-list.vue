<template>
  <!--这里注意 这个div设置了滚动条 目的是给后面做阅读记忆 留下伏笔  -->
  <div class="scroll-wrapper">
    <!-- 放置list组件 list组件可以实现上拉加载 -->
    <van-list v-model="upLoading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <!-- v-for 渲染数据 -->
      <van-cell v-for="article in articles" :key="article" :title="article"></van-cell>
    </van-list>
  </div>
</template>

<script>
export default {
  name: 'article-list',
  data () {
    return {
      upLoading: false, // 是否开启上拉加载
      finished: false, // 是否已经完成全部的数据加载
      articles: [] // 定义一个数组来接收上拉加载的数据
    }
  },
  methods: {
    //   上拉加载方法
    onLoad () {
      setTimeout(() => {
        // 给数据设置一个上限 不超过50条
        if (this.articles.length < 50) {
          let arr = Array.from(Array(10), (value, index) => this.articles.length + index + 1)
          this.articles.push(...arr) // 将数组解构成一个个的元素
          // 关闭状态
          this.upLoading = false
        } else {
          this.finished = true // 告诉list组件，数据已经加载完成，不要再去触发onload事件
        }
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
