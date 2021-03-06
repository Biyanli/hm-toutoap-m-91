// 用于文章数据的获取
import request from '@/utils/requset'
// 获取文章推荐的数据
export function getArticle (params) {
  return request({
    url: 'http://ttapi.research.itcast.cn/app/v1_1/articles',
    params: { with_top: 1, ...params }
  })
}
// 不喜欢文章接口
export function disLikeArticle (data) {
  return request({
    url: '/article/dislikes',
    method: 'post',
    data
  })
}
// 封装一个举报文章的api
export function reportArticle (data) {
  return request({
    url: '/article/reports',
    data,
    method: 'post'
  })
}
// 获取文章搜索的建议
export function suggestion (params) {
  return request({
    url: '/suggestion',
    params
  })
}
// 获取文章搜索的结果
export function searchArticle (params) {
  return request({
    url: '/search',
    params
  })
}
// 获取文章详情
export function getArticleInfo (articleId) {
  return request({
    url: `/articles/${articleId}`
  })
}
// 获取列表或获取评论回复
export function getComments (params) {
  return request({
    url: '/comments',
    params
  })
}
// 封装评论或者回复评论的方法
export function commentOrReply (data) {
  return request({
    url: '/comments', // 请求地址
    method: 'post', // 请求类型不同
    data
  })
}
