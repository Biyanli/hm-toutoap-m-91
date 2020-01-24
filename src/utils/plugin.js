import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn' // 引入中文汉化包
dayjs.extend(relativeTime)

export default {
  // vue.use(obj) 会调用obj里面的install方法
  install (Vue) {
    //   插件
    Vue.prototype.$gnotify = (params) => Vue.prototype.$notify({ duration: 1000, ...params }) // 小伎俩
    Vue.prototype.$sleep = sleep // 封装一个休眠函数
    Vue.filter('relTime', relTime) // 注册一个全局相对时间的过滤器
  }
}
// function(time = 500) 如果传time用传的 如果不传用500
function sleep (time = 500) {
  return new Promise(function (resolve) {
    setTimeout(() => resolve(), time) // 表示 等待time时间后，才能执行resolve
  })
}
// 得到一个相对时间
function relTime (value) {
  return dayjs().locale('zh-cn').from(value)
}
