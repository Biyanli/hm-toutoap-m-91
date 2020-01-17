// 用于文章数据的获取
import request from '@/utils/requset'
// 获取文章推荐的数据
export function getArticle (params) {
  return request({
    url: 'http://ttapi.research.itcast.cn/app/v1_1/articles',
    params: { with_top: 1, ...params }
  })
}