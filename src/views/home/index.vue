<template>
  <div class="container">
    <van-tabs v-model="activeIndex" swipeable>
      <van-tab :title="channel.name" v-for="channel in channels" :key="channel.id">
        <!-- 因为一个tab标签对应一个article-list组件 -->
        <!-- 如果要监听子组件的事件，就应该在子组件的标签上写监听 -->
        <article-list @showAction="openMoreAction" :channel_id="channel_id"></article-list>
      </van-tab>
    </van-tabs>
    <span class="bar_btn">
      <van-icon name="wap-nav" />
    </span>
    <!-- 放置弹层 -->
    <van-popup v-model="showMoreAction" :style="{width:'80%'}">
      <!-- 包裹反馈组件 -->
      <!-- report事件中的第一个参数$event实际上就是MoreAction组件中传出的type -->
      <more-action @dislike="dislikeOrReport($event,'dislike')" @report="dislikeOrReport($event,'report')"></more-action>
    </van-popup>
  </div>
</template>

<script>
import ArticleList from './components/article-list'
import MoreAction from './components/more-action'
import { getMyChannels } from '@/api/channels'
import { disLikeArticle, reportArticle } from '@/api/article'
import eventBus from '@/utils/eventBus'
export default {
  name: 'home', // devtools里面可以看到name组件里面的名称
  data () {
    return {
      channel_id: 0,
      activeIndex: 0,
      channels: [], // 声明接收频道的数据
      showMoreAction: false, // 用来控制显示反馈弹层
      articleId: null // 用来接收文章id
    }
  },
  components: {
    ArticleList, MoreAction
  },
  methods: {
    async  getMyChannels () {
      // 获取频道列表数据
      let data = await getMyChannels()
      this.channels = data.channels // 将频道赋值给声明的变量
    },
    // 监听子组件触发的事件 打开弹层
    openMoreAction (artId) {
      this.showMoreAction = true // 打开弹层
      this.articleId = artId // 接收不喜欢的文章id
    },
    // // 调用不喜欢的文章接口
    // async  dislike () {
    //   try {
    //     await disLikeArticle({ target: this.articleId })
    //     this.$gnotify({
    //       type: 'success',
    //       message: '操作成功'
    //     })
    //     // 触发一个事件 发出一个广播 听到广播的文章列表 去删除对应的数据
    //     // 文章id 频道id
    //     eventBus.$emit('delArticle', this.articleId, this.channels[this.activeIndex].id)
    //     this.showMoreAction = false // 关闭弹层
    //   } catch (error) {
    //     this.$gnotify({
    //       type: 'danger',
    //       message: '操作失败'
    //     })
    //   }
    // },
    // // 调用举报文章的接口
    // async  report (type) {
    //   try {
    //     await reportArticle({ target: this.articleId, type })
    //     this.$gnotify({
    //       type: 'success',
    //       message: '操作成功'
    //     })
    //     // 同理，也要将当前的文章数据删除掉
    //     eventBus.$emit('delArticle', this.articleId, this.channels[this.activeIndex].id)
    //     this.showMoreAction = false // 关闭弹层
    //   } catch (error) {
    //     this.$gnotify({
    //       type: 'danger',
    //       message: '操作失败'
    //     })
    //   }
    // },
    // 不喜欢或者举报
    // operatetype 操作类型 dislike / report
    // params是举报类型参数
    async dislikeOrReport (params, operatetype) {
      try {
        operatetype === 'dislike' ? await disLikeArticle({ target: this.articleId })
          : await reportArticle({ target: this.articleId, type: params })
        this.$gnotify({
          type: 'success',
          message: '操作成功'
        })
        // 触发一个事件 发出一个广播 听到广播的文章列表 去删除对应的数据
        // 文章id 频道id
        eventBus.$emit('delArticle', this.articleId, this.channels[this.activeIndex].id)
        this.showMoreAction = false // 关闭弹层
      } catch (error) {
        this.$gnotify({
          type: 'danger',
          message: '操作失败'
        })
      }
    }
  },
  created () {
    this.getMyChannels() // 获取频道
  }
}
</script>

<style lang="less" scoped>
.van-tabs {
  height: 100%;
  display: flex;
  flex-direction: column;
  /deep/ .van-tabs__wrap {
    height: 36px;
    padding-right: 36px;
    .van-tab {
      line-height: 36px;
    }
    .van-tabs__line {
      background-color: #3296fa;
      height: 2px;
    }
  }
  /deep/ .van-tabs__content {
    flex: 1;
    overflow: hidden;
  }
  /deep/ .van-tab__pane {
    height: 100%;
    .scroll-wrapper {
      height: 100%;
      overflow-y: auto;
    }
  }
}
.bar_btn {
  width: 36px;
  height: 35px;
  position: absolute;
  top: 0;
  right: 0;
  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 999;
    box-shadow: 0 0 10px #999;
    transform: scale(1, 0.6);
  }
  .van-icon-wap-nav {
    width: 100%;
    height: 100%;
    background: #fff;
    text-align: center;
    line-height: 35px;
    position: relative;
    z-index: 1000;
    &::before {
      font-size: 20px;
    }
  }
}
</style>
