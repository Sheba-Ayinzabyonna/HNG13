import { createRouter, createWebHistory } from 'vue-router'
import { getSession } from '../services/authService'
import { showToast } from '../services/toastService'

const routes = [
  {
    path: '/',
    component: () => import('../views/Landing.vue')
  },
  {
    path: '/auth/login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/auth/signup',
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/tickets',
    component: () => import('../views/Ticket.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !getSession()) {
    showToast('Your session has expired — please log in again', 'error')
    next('/auth/login')
  } else {
    next()
  }
})

export default router
