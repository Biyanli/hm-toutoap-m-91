import axios from 'axios'
import JSONBig from 'json-bigint'
import store from '@/store'

// 创建一个新的插件实例
// baseURL 给request一个默认的请求地址
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0/',
  transformResponse: [function (data) {
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
    config.headers['Authorization'] = `Bearer ${store.state.user.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error) // 直接返回promise数据
})
// 处理响应处理 响应拦截器
instance.interceptors.response.use(function (response) {
  try {
    return response.data.data
  } catch (error) {
    return response.data
  }
}, function (error) {
  return Promise.reject(error)
})
export default instance
