import { createRouter, createWebHashHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    console.log('Scroll behavior triggered:', to, from, savedPosition)
    return { top: 0 }
  },
  routes: [
    // {
    //   path: '/',
    //   component: () => import('../views/user/UserHome.vue')
    // },
    {
      path: '/login',
      component: () => import('../views/admin/Login.vue')
    },
    {
      path: '/admin',
      component: () => import('../views/admin/AdminBoard.vue'),
      children: [
        {
          path: 'products',
          component: () => import('../views/admin/AdminProducts.vue')
        },
        {
          path: 'orders',
          component: () => import('../views/admin/AdminOrders.vue')
        },
        {
          path: 'coupons',
          component: () => import('../views/admin/AdminCoupons.vue')
        },
        {
          path: 'articles',
          component: () => import('../views/admin/AdminArticles.vue')
        }
      ]
    },
    {
      path: '/user',
      component: () => import('../views/user/Userboard.vue'),
      children: [
        {
          path: 'home',
          component: () => import('../views/user/UserHome.vue')
        },
        {
          path: 'products',
          component: () => import('../views/user/UserProductList.vue')
        },
        {
          path: 'products/:productId',
          component: () => import('../views/user/UserProduct.vue')
        },
        {
          path: 'cart',
          component: () => import('../views/user/UserCart.vue')
        },
        {
          path: 'pay',
          component: () => import('../views/user/UserPay.vue')
        },
        {
          path: 'orderlist',
          component: () => import('../views/user/UserOrderList.vue')
        },
        // {
        //   path: 'order/final',
        //   component: () => import('../views/user/UserOrderFinal.vue')
        // },
        {
          path: 'order/:id',
          component: () => import('../views/user/UserOrderSingle.vue')
        },
        {
          path: 'article',
          component: () => import('../views/user/UserArticleList.vue')
        },
        {
          path: 'article/:id',
          component: () => import('../views/user/UserArticle.vue')
        }
      ]
    }
  ]
})

export default router
