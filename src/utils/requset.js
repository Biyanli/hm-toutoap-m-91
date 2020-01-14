import axios from 'axios'
import JSONBig from 'json-bigint'
import store from '@/store'
import router from '@/router'

// 创建一个新的插件实例
// baseURL 给request一个默认的请求地址
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0/', // 设置请求地址常量
  transformResponse: [function (data) {
    // data是后台响应的字符串 默认转化的是JSON.parse 处理大数字有问题，需要用JSONBig替换
    // return data ? JSONBig.parse(data) : {}
    try {
      return JSONBig.parse(data)
    } catch (error) {
      return data
    }
  }]
}) // 创建一个axios的请求工具
// 请求拦截器
instance.interceptors.request.use(function (config) {
  // 配置信息
  if (store.state.user.token) {
    // 统一注入token
    config.headers['Authorization'] = `Bearer ${store.state.user.token}`
  }
  // return config
}, function (error) {
  // 返回失败
  return Promise.reject(error) // 直接返回promise数据
})
// 处理响应处理 响应拦截器
instance.interceptors.response.use(function (response) {
  // 得到了response 实际被axios包了一层数据
  try {
    // 将数据结构
    return response.data.data
  } catch (error) {
    return response.data
  }
}, async function (error) {
  // 如何拿到token过期的标识
  // error config(请求配置) response(响应)
  if (error.state && error.response.state === 401) {
    let toPath = {
      path: '/login',
      query: {
        redirectURL: router.currentRoute.path // 当前页面地址 做成参数传到登录页 } }
        // 地址传参有两种方式
        // params (动态路由 /user/:)
        // query (/user?id=123)
      }
    }
    // 判断本地有没有 refresh_token 续命的标志
    if (store.state.user.refesh_token) {
      // 可以续命
      // 为什么不能继续用instance再继续请求刷新token 用原始的axios
      try {
        let result = await axios({
          url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
          headers: {
            Authorization: `Bearer ${store.state.user.refesh_token}`
          },
          method: 'put'
        })
        // 将数据同步到vuex和本地存储中
        store.commit('updateUser', {
          user: {
            token: result.data.data.token, // 更新到本地
            refesh_token: store.state.user.refesh_token
          }
        })
        return instance(error.config) // 将刚才401错误的请求再次发送出去
      } catch (error) {
        // refesh_token 已经无法续命 还有必要留着吗？没有必要
        // 删掉用户信息直接登录
        store.commit('clearUser')
        // 直接回登录
        router.push(toPath)
      }
    } else {
      store.commit('clearUser')
      // 否则应该回到登录页 当你在一个页面去登陆，希望登陆之后回到这个页面
      router.push(toPath)
    }
  }
  return Promise.reject(error)
})
export default instance
