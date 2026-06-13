import { createRouter, createWebHistory } from 'vue-router'
import { trackVisit } from '@/api/visits'
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
        path: '/articles',
        name: '文章列表',
        component: () => import('@/views/ArticlesView.vue'),
      },
      {
        path: '/notes',
        name: '随记',
        component: () => import('@/views/NotesView.vue'),
      },
      {
        path: '/notes/:id',
        name: '随记详情',
        component: () => import('@/views/NotesView.vue'),
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

router.afterEach((to) => {
  const pageName = typeof to.name === 'string' && to.name !== 'home' ? to.name : ''
  document.title = pageName ? `${pageName} - 晚风漫记` : '晚风漫记'
  trackVisit(to.path).catch(() => undefined)
})

export default router
