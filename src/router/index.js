import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
  routes: [
    {
      path: '/login',
      name: 'admin-login',
      component: () => import('../views/admin/Login.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/DashBoard.vue'),
      children: [
        {
          path: 'products',
          name: 'admin-products',
          component: () => import('../views/admin/Products.vue'),
          meta: {
            title: '產品管理',
            requiresAuth: true
          }
        },
        {
          path: 'orders',
          name: 'admin-orders',
          component: () => import('../views/admin/Orders.vue'),
          meta: {
            title: '訂單管理',
            requiresAuth: true
          }
        },
        {
          path: 'articles',
          name: 'admin-articles',
          component: () => import('../views/admin/Articles.vue'),
          meta: {
            title: '文章管理',
            requiresAuth: true
          }
        },
        {
          path: 'coupons',
          name: 'admin-coupons',
          component: () => import('../views/admin/Coupons.vue'),
          meta: {
            title: '優惠券管理',
            requiresAuth: true
          }
        }
      ]
    },
    {
      path: '/',
      component: () => import('../views/user/User.vue'),
      children: [
        {
          path: '',
          name: 'index',
          component: () => import('../views/user/Index.vue')
        },
        {
          path: 'products',
          name: 'products',
          component: () => import('../views/user/Products.vue')
        },
        {
          path: 'products/:id',
          name: 'product',
          component: () => import('../views/user/Product.vue'),
          props: (route) => {
            return {
              id: route.params.id
            }
          }
        },
        {
          path: 'cart',
          name: 'cart',
          component: () => import('../views/user/Cart.vue')
        },
        {
          path: 'pay',
          name: 'pay',
          component: () => import('../views/user/CartPay.vue')
        },
        {
          path: 'orders',
          name: 'orders',
          component: () => import('../views/user/Orders.vue')
        },
        {
          path: 'orders/:id',
          name: 'order',
          component: () => import('../views/user/Order.vue'),
          props: (route) => {
            return { id: route.params.id }
          }
        },
        {
          path: 'collect',
          name: 'collect',
          component: () => import('../views/user/Collect.vue')
        },
        {
          path: 'articles',
          name: 'articles',
          component: () => import('../views/user/articles.vue')
        },
        {
          path: 'articles/:id',
          name: 'article',
          component: () => import('../views/user/article.vue'),
          props: (route) => {
            return {
              id: route.params.id
            }
          }
        }
      ]
    }
  ]
})

export default router
