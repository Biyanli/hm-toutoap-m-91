const USER_TOKEN = 'hm-toutiao-91-m'
// 设置用户信息
export function setUser (user) {
  localStorage.setItem(USER_TOKEN, JSON.stringify(user))
}
// 读取用户信息
export function getUser (user) {
  return JSON.parse(localStorage.getItem(USER_TOKEN || '{}')) // 短路表达式
}
// 删除用户信息
export function delUser (user) {
  localStorage.removeItem(USER_TOKEN)
}
