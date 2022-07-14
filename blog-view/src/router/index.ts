import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useStore } from 'vuex'

import Index from '../views/Index.vue'
import Home from '@/views/home/Home.vue'

import { SET_IS_BLOG_RENDER_COMPLETE } from '@/store/mutations-types'

import store from '@/store'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    component: () => import('@/views/Login.vue'),
    meta: { title: '登录' },
  },
  {
    path: '/',
    component: Index,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
          title: '首页',
        },
      },
      {
        path: '/archives',
        name: 'archives',
        component: () => import(/* webpackChunkName: "about" */ '@/views/archives/Archives.vue'),
        meta: {
          title: '归档',
        },
      },
      {
        path: '/blog/:id',
        name: 'blog',
        component: () => import('@/views/blog/Blog.vue'),
        meta: {
          title: '博客',
        },
        // 路由到博客文章页面之前，应将文章的渲染完成状态置为 false
        beforeEnter(to, from, next) {
          store.commit(SET_IS_BLOG_RENDER_COMPLETE, false)
          next()
        },
      },
      {
        path: '/tag/:name',
        name: 'tag',
        component: () => import('@/views/tag/Tag.vue'),
        meta: { title: '标签' },
      },
      {
        path: '/category/:name',
        name: 'category',
        component: () => import('@/views/category/Category.vue'),
        meta: { title: '分类' },
      },
      {
        path: '/moments',
        name: 'moments',
        component: () => import('@/views/moments/Moments.vue'),
        meta: { title: '动态' },
      },
      {
        path: '/friends',
        name: 'friends',
        component: () => import('@/views/friends/Friends.vue'),
        meta: { title: '友人帐' },
      },
      {
        path: '/about/',
        name: 'about',
        component: () => import('@/views/about/About.vue'),
        meta: { title: '关于我' },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 路由切换时，滚动到页面顶部
    if (savedPosition) return savedPosition
    else return { top: 0, behavior: 'smooth' }
  },
})
//挂载路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    if (store.state.siteInfo.webTitleSuffix) {
      document.title = to.meta.title + store.state.siteInfo.webTitleSuffix
    } else {
      document.title = to.meta.title as string
    }
  }
  next()
})
export default router
