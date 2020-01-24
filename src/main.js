import Vue from 'vue'
import App from './App.vue'
import router from './permission' // 经过权限处理之后的router
import store from './store'
import 'vant/lib/index.less' // 样式文件 换成less
import '@/styles/index.less' // 全局样式
import Vant, { Lazyload } from 'vant' // 引入vant组件库 导入lazyload，注册，实现图片懒加载
import 'amfe-flexible'
import plugin from '@/utils/plugin'

Vue.use(Vant) // 一旦引入vant,可以在任意位置使用vant组件
Vue.use(plugin) // 调用小插件，会调用插件中的install方法
Vue.use(Lazyload) // 注册好了 支持v-lazy指令

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
