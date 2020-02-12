import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '@/utils/auth'

Vue.use(Vuex)

// vuex和缓存数据的同步
export default new Vuex.Store({
  state: {
    user: auth.getUser(), // 从缓存中读的
    photo: null // 用户头像 把头像作为公共的数据作为数据共享
  },
  mutations: {
    // payload载荷中携带user
    updateUser (state, payload) {
      state.user = payload.user // 更新数据
      auth.setUser(payload.user) // 将数据同步设置到本地存储中
    },
    // 清除数据
    clearUser (state) {
      state.user = {}
      auth.delUser() // 将缓存中的数据也清空
    },
    // 更新用户头像的方法 载荷（携带参数）
    updatePhoto (state, payload) {
      state.photo = payload.photo // 将载荷里面的数据设置给state
    }
  },
  actions: {
  },
  modules: {
  }
})
