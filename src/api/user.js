//  用户相关的请求模块
import request from '@/utils/requset' // 引入封装的模块
export function login (data) {
  return request({
    url: '/authorizations',
    data,
    method: 'post'
  }) // 得到一个promise对象 返回
}
// 关注用户
export function followUser (data) {
  return request({
    url: '/user/followings',
    data,
    method: 'post'
  })
}
// 取消关注用户
export function unFollowUser (target) {
  return request({
    url: `/user/followings/${target}`,
    method: 'delete'
  })
}
// 获取用户个人信息 文章 发表状态
export function getUserInfo () {
  return request({
    url: '/user'
  })
}
// 获取用户个人资料
export function getUserProfile () {
  return request({
    url: '/user/profile' // 获取用户个人资料的接口地址
  })
}
// 封装一个编辑用户头像的api
export function updateImg (data) {
  return request({
    url: '/user/photo', // 编辑头像的地址
    data,
    method: 'patch' // 设置头像的类型
  })
}
// 封装一个保存用户的方法
export function saveUserInfo (data) {
  return request({
    url: '/user/profile', // 编辑资料的地址
    data,
    method: 'patch'
  })
}
