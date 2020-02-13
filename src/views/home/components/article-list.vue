<template>
  <!--这里注意 这个div设置了滚动条 目的是给后面做阅读记忆 留下伏笔  -->
  <div ref="myScroll" class="scroll-wrapper" @scroll="remember">
    <van-pull-refresh v-model="downLoading" @refresh="onRefresh" :success-text="refreshSuccessText">
      <!-- 放置list组件 list组件可以实现上拉加载 -->
      <van-list v-model="upLoading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <!-- v-for 渲染数据 -->
        <!-- 点击van-cell 跳转到文章详情 -->
        <van-cell :to="`/article?articleId=${article.art_id.toString()}`" v-for="article in articles" :key="article.art_id.toString()">
          <div class="article_item">
            <h3 class="van-ellipsis">{{article.title}}</h3>
            <!-- 三图模式 -->
            <div class="img_box" v-if="article.cover.type === 3">
              <van-image lazy-load class="w33" fit="cover" :src="article.cover.images[0]" />
              <van-image lazy-load class="w33" fit="cover" :src="article.cover.images[1]" />
              <van-image lazy-load class="w33" fit="cover" :src="article.cover.images[2]" />
            </div>
            <!-- 单图模式 -->
            <div class="img_box" v-if="article.cover.type === 1">
              <van-image lazy-load class="w100" fit="cover" :src="article.cover.images[0]" />
            </div>
            <div class="info_box">
              <span>{{article.aut_name}}</span>
              <span>{{article.comm_count}}评论</span>
              <!-- 使用过滤器  表达式 | 过滤器名称 -->
              <span>{{article.pubdate | relTime}}</span>
              <!-- 判断是否显示插件图标 -->
              <!-- 点击叉号 告诉父组件我要反馈 stop事件修饰符 阻止冒泡-->
              <span class="close" v-if="user.token" @click.stop="$emit('showAction',article.art_id.toString())">
                <van-icon name="cross"></van-icon>
              </span>
            </div>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticle } from '@/api/article'
import { mapState } from 'vuex'
import eventBus from '@/utils/eventBus'

export default {
  name: 'article-list',
  data () {
    return {
      downLoading: false, // 是否开启下拉刷新加载
      upLoading: false, // 是否开启上拉加载
      finished: false, // 是否已经完成全部的数据加载
      articles: [], // 定义一个数组来接收上拉加载的数据
      refreshSuccessText: '', // 下拉成功显示的文本
      timestamp: null, // 定义一个时间戳 这个时间戳用来告诉服务器 现在我要求什么样的时间的数据
      scrollTop: 0 // 用该属性来记录文章列表实例所滚动的位置
    }
  },
  props: {
    channel_id: {
      type: Number, // 指定要传的props类型
      required: true, // 要求props必须传
      default: null // 给props一个默认值
    }
  },
  // 映射vuex中的store对象到计算属性上
  computed: {
    ...mapState(['user'])
  },
  // 即使启动了组件缓存 created函数也依然会执行 但是自始至终只会执行一次
  created () {
    // 开启监听
    // 监听删除文章事件
    eventBus.$on('delArticle', (articleId, channelId) => {
      if (this.channel_id === channelId) {
        // 这个条件表示 该列表就是当前激活的列表
        let index = this.articles.findIndex(item => item.art_id.toString() === articleId) // 查找对应的文章
        // 如果index大于-1 表示找到了就要删除
        if (index > -1) {
          this.articles.splice(index, 1) // 删除不喜欢的文章
        }
      }
    })
    // 只要开启一次监听 以后触发了事件 就会进入到我们的回调函数
    // 开启一个新的监听 监听当前tab切换的事件
    eventBus.$on('changeTab', id => {
      // 判断一个id是否等于该组件通过props得到的频道id
      if (id === this.channel_id) {
        // 如果相等 说明找对了article-list
        // 因为article-list是有多个的
        // 为什么这里没有滚动
        // 是因为 切换事件之后会执行dom的更新 dom更新是异步的
        // 如何保证自己是在上一次完成页面渲染更新之后 执行逻辑
        // this.$nextTick 会在数据响应式之后页面渲染完毕之后执行
        // this.$nextTick 会保证在changeTab动作切换完成并且完成界面渲染之后执行
        this.$nextTick(() => {
          if (this.scrollTop && this.$refs.myScroll) {
          // 表示该文章列表是存在滚动的
            this.$refs.myScroll.scrollTop = this.scrollTop
          }
        })
      }
    })
  },
  methods: {
    // 定义一个记录位置的方法
    // 当绑定事件只写方法名时，第一个参数是event
    remember (event) {
      // console.log('滚动位置')
      // 记录此次滚动事件中的滚动条距离顶部的高度
      // evernt.target指的是什么
      this.scrollTop = event.target.scrollTop // 记录位置
    },
    //   上拉加载方法
    async onLoad () {
      await this.$sleep() // 等待sleep resolve
      // setTimeout(() => {
      //   // 给数据设置一个上限 不超过50条
      //   if (this.articles.length < 50) {
      //     let arr = Array.from(
      //       Array(10),
      //       (value, index) => this.articles.length + index + 1
      //     )
      //     this.articles.push(...arr) // 将数组解构成一个个的元素
      //     // 关闭状态
      //     this.upLoading = false
      //   } else {
      //     this.finished = true // 告诉list组件，数据已经加载完成，不要再去触发onload事件
      //   }
      // }, 1000)
      // 请求数据 如果时间戳为空就传当前时间
      const data = await getArticle({
        channel_id: this.channel_id,
        timestamp: this.timestamp || Date.now()
      })
      this.articles.push(...data.results)
      // 关掉加载的状态
      this.upLoading = false // 关掉状态
      // 判断历史时间戳 如果你有历史 表示我还可以继续往下看 否则就不看了
      if (data.pre_timestamp) {
        this.timestamp = data.pre_timestamp
      } else {
        // 否则认为 没有历史了 木有必要继续加载了
        this.finished = true // 告诉list组件  我已经加载完了 不要再去触发onLoad事件了
      }
    },
    // 下拉刷新方法
    async onRefresh () {
      await this.$sleep() // 等待sleep resolve
      // console.log('下拉刷新加载')
      // setTimeout(() => {
      //   let arr = Array.from(Array(10), (value, index) => '追加' + (index + 1))
      //   this.articles.unshift(...arr)
      //   this.downLoading = false // 关闭状态
      //   this.refreshSuccessText = `更新了${arr.length}条数据`
      // }, 1000)
      // 下拉刷新永远拉取最新的数据
      const data = await getArticle({
        channel_id: this.channel_id,
        timestamp: Date.now()
      })
      this.downLoading = false // 关掉下拉状态
      // 有可能没有最新的数据
      if (data.results.length) {
        // 如果长度大于0，则表示有数据
        this.articles = data.results // 将历史数据全部都覆盖掉
        // 假如之前已经将上拉加载finished设置成true
        // 表示还要继续往下拉，需要把原来的状态再次打开
        this.finished = false
        // 注意：我们依然要获取此次的历史时间戳
        this.timestamp = data.pre_timestamp // 赋值给历史时间戳 因为当你下拉刷新之后，再上拉加载的时候，要用到历史时间戳
        this.refreshSuccessText = `更新了${data.results.length}条数据`
      } else {
        // 没有数据的更新，什么都不需要变化
        this.refreshSuccessText = '已是最新数据'
      }
    }
  },
  // activated函数 第一次并不会执行 而是在已经缓存之后执行
  // 激活函数 当组件被keep-alive包裹=> router-view=> home=> article-list
  activated () {
    console.log('我被唤醒了' + this.channel_id + this.$refs.myScroll)
    // 唤醒的时候 需要把记录的位置恢复回去
    // 需要在组件重新激活的时候 重新设置原来的滚动条
    if (this.scrollTop && this.$refs.myScroll) {
      // 当滚动距离不为0且dom元素存在的情况下 才去做滚动
      this.$refs.myScroll.scrollTop = this.scrollTop // 将原来记录的位置赋值给冬眠元素
    }
  }

}
</script>

<style lang="less" scoped>
.article_item {
  h3 {
    font-weight: normal;
    line-height: 2;
  }
  .img_box {
    display: flex;
    justify-content: space-between;
    .w33 {
      width: 33%;
      height: 90px;
    }
    .w100 {
      width: 100%;
      height: 180px;
    }
  }
  .info_box {
    color: #999;
    line-height: 2;
    position: relative;
    font-size: 12px;
    span {
      padding-right: 10px;
      &.close {
        border: 1px solid #ddd;
        border-radius: 2px;
        line-height: 15px;
        height: 12px;
        width: 16px;
        text-align: center;
        padding-right: 0;
        font-size: 8px;
        position: absolute;
        right: 0;
        top: 7px;
      }
    }
  }
}
</style>
