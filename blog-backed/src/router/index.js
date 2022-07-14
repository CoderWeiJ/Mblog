import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/404',
    component: () => import('@/views/404'),
    meta: { title: '404 NOT FOUND' },
    hidden: true
  },

  {
    path: '/login',
    component: () => import('@/views/login/index'),
    meta: { title: '后台管理登录' },
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  {
    path: '/blog',
    name: 'Blog',
    redirect: '/blog/write',
    component: Layout,
    meta: { title: '博客管理', icon: 'el-icon-menu' },
    children: [
      {
        path: 'write',
        name: 'WriteBlog',
        component: () => import('@/views/blog/blog/WriteBlog.vue'),
        meta: { title: '写文章', icon: 'el-icon-edit' }
      },
      {
        path: 'moment/write',
        name: 'WriteMoment',
        component: () => import('@/views/blog/moment/WriteMoment'),
        meta: { title: '写动态', icon: 'el-icon-edit' }
      },
      {
        path: 'list',
        name: 'BlogList',
        component: () => import('@/views/blog/blog/BlogList.vue'),
        meta: { title: '文章管理', icon: 'el-icon-s-order' }
      },
      {
        path: 'category/list',
        name: 'CategoryList',
        component: () => import('@/views/blog/category/CategoryList.vue'),
        meta: { title: '分类管理', icon: 'el-icon-s-opportunity' }
      },
      {
        path: 'tag/list',
        name: 'TagList',
        component: () => import('@/views/blog/tag/TagList.vue'),
        meta: { title: '标签管理', icon: 'biaoqian' }
      },
      {
        path: 'comment/list',
        name: 'CommentList',
        component: () => import('@/views/blog/comment/CommentList.vue'),
        meta: { title: '评论管理', icon: 'el-icon-s-comment' }
      },

      {
        path: 'moment/edit/:id',
        name: 'EditMoment',
        component: () => import('@/views/blog/moment/WriteMoment'),
        meta: { title: '编辑动态', icon: 'el-icon-edit' },
        hidden: true
      },
      {
        path: 'edit/:id',
        name: 'EditBlog',
        component: () => import('@/views/blog/blog/WriteBlog.vue'),
        meta: { title: '编辑文章', icon: 'el-icon-edit' },
        hidden: true
      },
      {
        path: 'moment/list',
        name: 'EditMoment',
        component: () => import('@/views/blog/moment/MomentList.vue'),
        meta: { title: '动态管理', icon: 'el-icon-chat-dot-round' }
      }
      
    ]
  },
  {
    path: '/page',
    name: 'Page',
    redirect: '/page/about',
    component: Layout,
    meta: { title: '页面管理', icon: 'el-icon-document-copy' },
    children: [
      {
        path: 'friend',
        name: 'Friend',
        component: () => import('@/views/page/Friend.vue'),
        meta: { title: '友链管理', icon: 'friend' }
      },
      {
        path: 'site',
        name: 'SiteSetting',
        component: () => import('@/views/page/SiteSetting.vue'),
        meta: { title: '站点设置', icon: 'bianjizhandian' },
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/page/About.vue'),
        meta: { title: '关于我', icon: 'el-icon-tickets' },
      },
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
