export default {
  // vue.use(obj) 会调用obj里面的install方法
  install (Vue) {
    //   插件
    Vue.prototype.$gnotify = (params) => Vue.prototype.$notify({ duration: 1000, ...params }) // 小伎俩
  }
}
