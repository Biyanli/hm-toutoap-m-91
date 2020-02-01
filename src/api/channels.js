// 专门处理频道的请求
import request from '@/utils/requset'
// 获取我的频道
export function getMyChannels () {
  // 返回一个promise对象
  return request({
    url: 'user/channels'
  })
}
// 获取所有频道
export function getAllChannels () {
  return request({
    url: '/channels'
  })
}
