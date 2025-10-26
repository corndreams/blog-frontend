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
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
