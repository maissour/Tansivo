import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '@/components/layout/AuthLayout.vue'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import DefaultLayout from '@/components/layout/DefaultLayout.vue'
import HomeView from '@/views/HomeView.vue'
import InvoiceView from '@/views/InvoiceView.vue'
import CreateTemplateView from '@/views/CreateTemplateView.vue'
import { authStore } from '@/stores/authStore'
import api from '@/api/api'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'auth',
      component: AuthLayout,
      children: [
        {
          path: '/',
          name: 'login',
          component: LoginView
        },
        {
          path: '/register',
          name: 'register',
          component: RegisterView
        }
      ]
    },
    {
      path: '/site',
      name: 'site',
      component: DefaultLayout,
      children: [
        {
          path: '/site/home',
          name: 'home',
          component: HomeView
        },
        {
          path: '/site/invoice',
          name: 'invoice',
          component: InvoiceView
        },
        {
          path: '/site/create',
          name: 'createTemplate',
          component: CreateTemplateView
        },
      ]
    },
  ],
})

// middleware 
let isAuthChecked = false; // Prevent duplicate calls on each route
router.beforeEach(async (to, from, next) => {
  const store = authStore();

  // Call only once per page load
  if (!isAuthChecked) {
    try {
      const response = await api.checkAuthenticated();
      if (response.data.success) {
        store.isAuthenticated = true;
        store.userName = response.data.userName;
        store.role = response.data.userRole;
      } else {
        store.$reset();
        isAuthChecked = true;
        if (to.path.startsWith("/register")) {
          return next()
        }
        return next({ name: 'login' })
      }
    } catch (err) {
      console.error("Failed to fetch auth status", err);
      store.$reset();
    }
    isAuthChecked = true;
  }

  next();
});
export default router
