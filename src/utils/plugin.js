export default {
  // vue.use(obj) 会调用obj里面的install方法
  install (Vue) {
    //   插件
    Vue.prototype.$gnotify = (params) => Vue.prototype.$notify({ duration: 1000, ...params }) // 小伎俩
    Vue.prototype.$sleep = sleep // 封装一个休眠函数
  }
}
// function(time = 500) 如果传time用传的 如果不传用500
function sleep (time = 500) {
  return new Promise(function (resolve) {
    setTimeout(() => resolve(), time) // 表示 等待time时间后，才能执行resolve
  })
}
