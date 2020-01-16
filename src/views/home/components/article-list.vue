<template>
  <!--这里注意 这个div设置了滚动条 目的是给后面做阅读记忆 留下伏笔  -->
  <div class="scroll-wrapper">
      <!-- 放置list组件 list组件可以实现上拉加载 -->
      <van-list v-model="upLoading" :finished="finished" finished-text="没有更多了" @load="onLoad"></van-list>
  </div>
</template>

<script>
export default {
  name: 'article-list',
  data () {
    return {
      upLoading: false, // 是否开启上拉加载
      finished: false // 是否已经完成全部的数据加载
    }
  },
  methods: {
    //   上拉加载方法
    onLoad () {
      console.log('开始加载数据')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
