<template>
  <header class="position-fixed top-0 w-100">
    <nav class="navbar navbar-expand-lg bg-white position-relative border-bottom">
      <div class="container">
        <RouterLink :to="{ name: 'index' }" class="me-4">
          <img src="@/assets/img/logo.svg" alt="" class="px-2 img-fluid"
        /></RouterLink>

        <button
          class="navbar-toggler order-1"
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
          class="collapse navbar-collapse order-2 order-lg-0"
          id="navbarNav"
          ref="headerCollapse"
        >
          <ul class="navbar-nav py-3 py-lg-1">
            <li class="nav-item">
              <RouterLink
                :to="{ name: 'products' }"
                class="nav-link px-lg-3"
                :class="{
                  active: this.$route.name === 'products' || this.$route.name === 'product'
                }"
                >書籍類別</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink
                :to="{ name: 'articles' }"
                class="nav-link px-lg-3"
                :class="{
                  active: this.$route.name === 'articles' || this.$route.name === 'article'
                }"
                >書評推薦</RouterLink
              >
            </li>
            <li class="nav-item d-lg-none d-block">
              <RouterLink
                :to="{ name: 'orders' }"
                class="nav-link"
                :class="{ active: this.$route.name === 'orders' || this.$route.name === 'order' }"
                >查看訂單</RouterLink
              >
            </li>
            <li class="d-lg-none">
              <SearchInput></SearchInput>
            </li>
          </ul>
        </div>

        <ul class="d-flex align-items-center gap-3 ms-auto mx pe-3">
          <li class="d-lg-block d-none">
            <button type="button" class="px-2 btn rounded-pill border-0" @click="toggleCollapse">
              <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="me-2" />搜尋
            </button>
          </li>
          <li class="d-lg-block d-none">
            <RouterLink
              :to="{ name: 'orders' }"
              class="px-2 btn rounded-pill border-0"
              :class="{
                'fw-bold': this.$route.name === 'orders' || this.$route.name === 'order'
              }"
            >
              <font-awesome-icon :icon="['far', 'file-lines']" class="me-1 fs-5" />
              訂單</RouterLink
            >
          </li>
          <li>
            <RouterLink :to="{ name: 'collect' }" class="ps-1 position-relative pt-1"
              ><font-awesome-icon :icon="['fas', 'heart']" class="fa-lg" />
              <span
                class="button-count ms-1 text-white bg-primary position-absolute start-100 top-0 translate-middle-x"
                >{{ collectStorage.length }}</span
              ></RouterLink
            >
          </li>
          <li class="me-2">
            <RouterLink :to="{ name: 'cart' }" class="ps-1 position-relative pt-1"
              ><font-awesome-icon :icon="['fas', 'cart-shopping']" class="fa-lg" /><span
                class="button-count ms-1 text-white bg-primary position-absolute start-100 top-0 translate-middle-x"
                >{{ cartLength }}</span
              ></RouterLink
            >
          </li>
        </ul>

        <div class="bg-light position-absolute top-100 w-100 start-0 d-lg-block d-none">
          <div class="container">
            <SearchModal ref="SearchModal"></SearchModal>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import Collapse from 'bootstrap/js/dist/collapse'

import SearchModal from './SearchCollapse.vue'
import SearchInput from './SearchInput.vue'

import { mapState, mapActions } from 'pinia'
import cartStore from '@/stores/cart.js'
import productStore from '@/stores/product.js'

export default {
  data() {
    return {
      headerCollapse: {}
    }
  },
  components: {
    SearchModal,
    SearchInput
  },
  computed: {
    ...mapState(cartStore, ['cartLength']),
    ...mapState(productStore, ['collectList', 'collectStorage'])
  },
  methods: {
    ...mapActions(productStore, ['getStorage']),
    toggleCollapse() {
      const searchComponent = this.$refs.SearchModal
      searchComponent.toggleCollapse()
    }
  },

  created() {
    this.getStorage()
  },

  watch: {
    $route(to, from) {
      this.headerCollapse.hide()
    }
  },

  mounted() {
    this.headerCollapse = new Collapse(this.$refs.headerCollapse)
    this.headerCollapse.hide()
  }
}
</script>

<style lang="scss" scoped>
header {
  z-index: 50;
}

.button-count {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.6rem;
  width: 14px;
  height: 14px;
  border-radius: 50%;
}

.nav-link.active {
  font-weight: bold;
}
</style>
