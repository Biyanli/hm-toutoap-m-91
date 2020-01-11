import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css' // 样式文件
import Vant from 'vant' // 引入vant组件库
import 'amfe-flexible'

Vue.use(Vant) // 一旦引入vant,可以在任意位置使用vant组件

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
