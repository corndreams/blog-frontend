import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: '首页',
        component: HomeView,
      },
      {
        path: '/about',
        name: '关于我',
        component: () => import('@/views/AboutMe.vue'),
      },
      {
        path: '/login',
        name: '登录',
        component: () => import('@/views/LoginView.vue'),
      },
      {
        path: '/archive',
        name: '归档',
        component: () => import('@/views/ArchiveView.vue'),
      },
      {
        path: '/message',
        name: '留言',
        component: () => import('@/views/MessageView.vue'),
      },
      {
        path: '/article/:id',
        name: '文章详情',
        component: () => import('@/views/ArticleDetail.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

export default router
