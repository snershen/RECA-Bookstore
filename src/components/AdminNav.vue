<template>
  <nav class="navbar navbar-expand-lg bg-dark vh-100 d-flex flex-column">
    <a class="navbar-brand fw-bold mb-4 px-4 pt-4 text-white" href="#">RECA 書店後台管理</a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div
      class="collapse navbar-collapse d-block flex-column justify-content-between w-100"
      id="navbarNav"
    >
      <ul class="navbar-nav flex-column w-100">
        <li class="nav-item">
          <RouterLink class="nav-link text-white px-4 py-3 active" to="/admin/products"
            >產品列表管理</RouterLink
          >
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link text-white px-4 py-3" to="/admin/orders">訂單管理</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link text-white px-4 py-3" to="/admin/coupons"
            >優惠券管理</RouterLink
          >
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link text-white px-4 py-3" to="/admin/articles"
            >文章管理</RouterLink
          >
        </li>
      </ul>

      <a class="nav-link text-white px-4 py-3 text-start w-100" href="#" @click.prevent="logout"
        >登出</a
      >
    </div>
  </nav>
</template>

<script>
import { apiLogout } from '../utils/apis.js'
import toastMixin from '../mixins/toastMixin.js'

export default {
  mixins: [toastMixin],
  methods: {
    logout() {
      apiLogout().then((res) => {
        const message = res.data.message
        if (res.data.success) {
          this.$router.push('/login')
          this.showToast({ title: message, icon: 'success' })
        }
      })
    }
  }
}
</script>

<style scoped>
.nav-link:hover {
  background: #434343;
  color: #fff;
}
</style>
