import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/text-analyze',
      name: 'text-analyze',
      component: () => import('../views/TextAnalyze.vue')
    }
  ]
})

export default router
