<template>
  <div class="more-action">
      <!-- 第一个单元格组 -->
    <van-cell-group v-if="!isReport">
        <!-- 点击按钮，要去触发父组件调用不感兴趣的接口 -->
      <van-cell @click="$emit('dislike')">不感兴趣</van-cell>
      <van-cell is-link @click="isReport=true">反馈垃圾内容</van-cell>
      <van-cell>拉黑作者</van-cell>
    </van-cell-group>
    <!-- 第二个单元格组 -->
    <van-cell-group v-else>
      <van-cell icon="arrow-left" @click="isReport=false">返回</van-cell>
      <!-- 点击举报按钮，触发父组件调用举报文章的接口 -->
      <van-cell @click="$emit('report',item.value)" v-for="item in reports" :key="item.value">{{item.label}}</van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { reports } from '@/api/constants'
import eventBus from '@/utils/eventBus'
export default {
  data () {
    return {
      isReport: false, // 用来控制第一个和第二个单元格组的显示
      reports
    }
  },
  created () {
    eventBus.$on('delArticle', () => { this.isReport = false }) // 重置状态
  }
}
</script>

<style lang='less' scoped>
.more-action {
  border-radius: 4px;
}
</style>
