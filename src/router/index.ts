import { createRouter, createWebHistory } from 'vue-router'
import {useUserStore} from "@/store/useUserStore";
import {useLoadingStore} from "@/store/useLoadingStore";

const router = createRouter({
  history: createWebHistory(),
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
    {
      path: '/planet/:id',
      name: 'Planet',
      component: () => import('@/views/dashboard/NoteView.vue'),
      meta: { requiresAuth: true }
    },

    // FALLBACK
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  // прячем текущий контент и запускаем прелоадер до того,
  // как новая страница начнёт монтироваться и подгружать данные
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
  // снимаем "флаг перехода"; итоговая видимая длительность прелоадера
  // (минимум 2с) контролируется в App.vue
  useLoadingStore().stopLoading()
})

export default router
