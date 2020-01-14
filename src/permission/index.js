// 路由的拦截 导航守卫
import router from '@/router' // 引入路由实例
import store from '@/store' // 引入store
// 前置守卫 当路由发生改变之前触发
// to:到哪里去
// from:从哪里来
// next: 函数 必须用next才能调用resolve这个钩子 如果前面不执行next，后面永远不执行
// next(false) 终止当前的导航跳转
// next(地址) 去跳到另外一个地址
// next() 放行
router.beforeEach(function (to, from, next) {
  if (to.path.startsWith('/user') && !store.state.user.token) {
    // 拦截 判断是否有token 有就放行，没有就登录
    let topath = {
      path: '/login',
      query: {
        redirectURL: to.path // 携带要去的地址到登录页 登录成功后，有了权限，再回到刚才没有权限的地址
      }
    }
    next(topath)
  } else {
    next() // 直接放行
  }
})
// 后置守卫
export default router
