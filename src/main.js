import Vue from 'vue'
import App from './App.vue'
import router from './permission' // 经过权限处理之后的router
import store from './store'
import 'vant/lib/index.css' // 样式文件
import '@/styles/index.less' // 全局样式
import Vant from 'vant' // 引入vant组件库
import 'amfe-flexible'

Vue.use(Vant) // 一旦引入vant,可以在任意位置使用vant组件

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
