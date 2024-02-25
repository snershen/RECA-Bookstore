<template>
  <nav class="navbar bg-body-tertiary fixed-top d-block d-lg-none">
    <div class="container-fluid">
      <a class="navbar-brand fw-bold" href="#">RECA 書店</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasNavbar"
        aria-controls="offcanvasNavbar"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
        ref="offcanvas"
      >
        <div class="offcanvas-header">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body px-0">
          <ul class="navbar-nav justify-content-end flex-grow-1">
            <li class="nav-item" v-for="item in childrenRoute">
              <RouterLink
                class="nav-link rounded-0"
                :to="{ name: item.name }"
                @click.prevent="hideCanvas"
                >{{ item.meta.title }}</RouterLink
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>

  <nav class="dashboard position-fixed start-0 top-0 vh-100 d-lg-flex d-none flex-column py-3 pt-4">
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
      ref="navbarCollapse"
    >
      <ul class="navbar-nav flex-column w-100">
        <li class="nav-item" v-for="item in childrenRoute">
          <RouterLink class="nav-link" :to="{ name: item.name }">{{ item.meta.title }}</RouterLink>
        </li>
      </ul>

      <a class="nav-link text-start w-100 mt-5" href="#" @click.prevent="logout">登出</a>
    </div>
  </nav>
</template>

<script>
import Offcanvas from 'bootstrap/js/dist/offcanvas'
import { apiLogout } from '@/assets/js/apis.js'
import toastMixin from '@/mixins/toastMixin.js'

export default {
  data() {
    return {
      childrenRoute: [],
      navbarOffcanvas: null
    }
  },
  mixins: [toastMixin],
  methods: {
    logout() {
      apiLogout()
        .then(() => {
          this.$router.push({ name: 'admin-login' })
          this.showToast({ title: '已登出', icon: 'success' })
          document.cookie = ''
        })
        .catch((err) => {
          console.error(err)
        })
    },
    openCanvas() {
      this.navbarOffcanvas.show()
    },
    hideCanvas() {
      this.navbarOffcanvas.hide()
    }
  },
  created() {
    this.childrenRoute = this.$router.options.routes.find(
      (route) => route.path === '/admin'
    ).children
  },
  mounted() {
    this.navbarOffcanvas = new Offcanvas(this.$refs.offcanvas, { backdrop: 'static' })
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
  }
}

.nav-link .nav-link:hover {
  background: #797979;
  color: #fff;
}
</style>
