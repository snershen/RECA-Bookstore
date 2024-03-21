import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  },
  routes: [
    {
      path: '/login',
      name: 'admin-login',
      component: () => import('../views/LoginView.vue'),
      meta: {
        title: 'RECA | 登入'
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/DashboardView.vue'),
      children: [
        {
          path: 'products',
          name: 'admin-products',
          component: () => import('../views/admin/ProductsView.vue'),
          meta: {
            title: '產品管理',
            requiresAuth: true
          }
        },
        {
          path: 'orders',
          name: 'admin-orders',
          component: () => import('../views/admin/OrdersView.vue'),
          meta: {
            title: '訂單管理',
            requiresAuth: true
          }
        },
        {
          path: 'articles',
          name: 'admin-articles',
          component: () => import('../views/admin/ArticlesView.vue'),
          meta: {
            title: '文章管理',
            requiresAuth: true
          }
        },
        {
          path: 'coupons',
          name: 'admin-coupons',
          component: () => import('../views/admin/CouponsView.vue'),
          meta: {
            title: '優惠券管理',
            requiresAuth: true
          }
        }
      ]
    },
    {
      path: '/',
      component: () => import('../views/user/UserLayout.vue'),
      children: [
        {
          path: '',
          name: 'index',
          component: () => import('../views/user/IndexView.vue'),
          meta: {
            title: '首頁｜RECA BOOKSTORE'
          }
        },
        {
          path: 'products',
          name: 'products',
          component: () => import('../views/user/ProductsView.vue'),
          meta: {
            title: '產品類別｜RECA BOOKSTORE'
          }
        },
        {
          path: 'products/:id',
          name: 'product',
          component: () => import('../views/user/ProductView.vue'),
          props: (route) => {
            return {
              id: route.params.id
            }
          }
        },
        {
          path: 'cart',
          name: 'cart',
          component: () => import('../views/user/CartView.vue'),
          meta: {
            title: '購物車｜RECA BOOKSTORE'
          }
        },
        {
          path: 'pay',
          name: 'pay',
          component: () => import('../views/user/CartPayView.vue'),
          meta: {
            title: '付款頁面｜RECA BOOKSTORE'
          }
        },
        {
          path: 'orders',
          name: 'orders',
          component: () => import('../views/user/OrdersView.vue'),
          meta: {
            title: '訂單總覽｜RECA BOOKSTORE'
          }
        },
        {
          path: 'orders/:id',
          name: 'order',
          component: () => import('../views/user/OrderView.vue'),
          props: (route) => {
            return { id: route.params.id }
          },
          meta: {
            title: '訂單詳細｜RECA BOOKSTORE'
          }
        },
        {
          path: 'collect',
          name: 'collect',
          component: () => import('../views/user/CollectView.vue'),
          meta: {
            title: '收藏清單｜RECA BOOKSTORE'
          }
        },
        {
          path: 'articles',
          name: 'articles',
          component: () => import('../views/user/ArticlesView.vue'),
          meta: {
            title: '書評推薦｜RECA BOOKSTORE'
          }
        },
        {
          path: 'articles/:id',
          name: 'article',
          component: () => import('../views/user/ArticleView.vue'),
          props: (route) => {
            return {
              id: route.params.id
            }
          }
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/NotFound.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
