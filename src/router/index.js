import Vue from 'vue'
import VueRouter from 'vue-router'
const Layout = () => import('@/views/layout') // 一级路由
const Home = () => import('@/views/home') // 二级路由
const Qusetion = () => import('@/views/question')// 二级路由
const Video = () => import('@/views/video')// 二级路由
const User = () => import('@/views/user')// 二级路由
const Profile = () => import('@/views/user/profile') // 一级路由
const Chat = () => import('@/views/user/chat') // 一级路由
const Login = () => import('@/views/login') // 一级路由
const Search = () => import('@/views/search') // 一级路由
const Result = () => import('@/views/search/result') // 一级路由
const Article = () => import('@/views/article') // 一级路由

Vue.use(VueRouter)
// 在路由表里指定哪个组件需要缓存
const routes = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
    children: [
      {
        path: '/', // 由于一级路由下存在二级路由 并且path相同
        component: Home,
        // meta属性存在二级路由 并且path相同的情况下 需要写到二级路由下
        meta: {
          isAlive: true // 是否缓存组件实例
        }
      },
      {
        path: '/question',
        component: Qusetion
      },
      {
        path: '/video',
        component: Video
      },
      {
        path: '/user',
        component: User
      }
    ]
  },
  {
    path: '/user/profile',
    component: Profile
  },
  {
    path: '/user/chat',
    component: Chat
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/search/result',
    component: Result
  },
  {
    path: '/article',
    component: Article
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
