import { createRouter, createWebHistory } from 'vue-router'
import {useUserStore} from "@/store/useUserStore";
import {useLoadingStore} from "@/store/useLoadingStore";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/public/HomeView.vue'),
      meta: { requiresGuest: true }
    },
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
    {
      path: '/planet/:id',
      name: 'Planet',
      component: () => import('@/views/dashboard/NoteView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  useLoadingStore().startLoading()

  const userStore = useUserStore()

  const hasToken = !!localStorage.getItem('access_token')
  const isAuthenticated = !!userStore.currentUser

  if (!isAuthenticated && hasToken) {
    try {
      await userStore.initUser()
    } catch (e) {
      userStore.logout()
    }
  }
  if (to.meta.requiresAuth && !hasToken) {
    return next({ name: 'Home' })
  }
  if (to.meta.requiresGuest && hasToken) {
    return next({ name: 'Dashboard' })
  }
  return next()
})

router.afterEach(() => {
  useLoadingStore().stopLoading()
})

export default router
