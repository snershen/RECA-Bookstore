<template>
  <nav class="dashboard position-fixed start-0 top-0 vh-100 d-flex flex-column py-3 pt-4">
    <a class="navbar-brand fs-4 text-white d-flex align-items-center gap-2" href="#">
      <span class="fs-4 fw-bold border-secondary border-4 ps-4">RECA書店</span>
    </a>

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
        <li class="nav-item" v-for="item in childrenRoute">
          <RouterLink
            class="nav-link"
            :to="{ name: item.name }"
            :class="{ active: currentRoute === item.meta.title }"
            @click.prevent="currentRoute = item.meta.title"
            >{{ item.meta.title }}</RouterLink
          >
        </li>
      </ul>

      <a class="nav-link text-start w-100 mt-5" href="#" @click.prevent="logout">登出</a>
    </div>
  </nav>
</template>

<script>
import { apiLogout } from '@/utils/apis.js'
import toastMixin from '@/mixins/toastMixin.js'

export default {
  data() {
    return {
      childrenRoute: [],
      currentRoute: '產品管理'
    }
  },
  mixins: [toastMixin],
  methods: {
    logout() {
      apiLogout()
        .then((res) => {
          this.$router.push({ name: 'admin-login' })
          this.showToast({ title: '已登出', icon: 'success' })
        })
        .catch((err) => {
          console.error(err)
        })
    }
  },
  created() {
    this.childrenRoute = this.$router.options.routes.find(
      (route) => route.path === '/admin'
    ).children
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  background: #1a1a1a;
}
.nav-link {
  color: rgb(163, 163, 163);
  position: relative;
  margin-bottom: 10px;
  padding: 16px 140px 16px 20px;
  border-radius: 4px;
  &.active {
    color: white;

    background: #000;
    // &::after {
    //   content: '';
    //   position: absolute;
    //   width: 4px;
    //   height: 100%;
    //   background: #c9a65c;
    //   left: 0;
    //   top: 0;
    // }
  }
}

.nav-link .nav-link:hover {
  background: #797979;
  color: #fff;
}
</style>
