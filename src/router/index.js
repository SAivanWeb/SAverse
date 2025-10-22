import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // PUBLIC ROUTES
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/public/HomeView.vue'),
      meta: { requiresGuest: true }
    },

    // PROTECTED ROUTES
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/DashboardView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/galaxy/:id',
      name: 'Galaxy',
      component: () => import('@/views/dashboard/GalaxyView.vue'),
      meta: { requiresAuth: true }
    },
    // FALLBACK
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

export default router