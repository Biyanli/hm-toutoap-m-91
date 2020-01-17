// 专门处理频道的请求
import request from '@/utils/requset'
// 获取我的频道
export function getMyChannels () {
  // 返回一个promise对象
  return request({
    url: 'user/channels'
  })
}
