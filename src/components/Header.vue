<template>
  <header class="position-sticky top-0">
    <div class="py-2 border-bottom bg-white position-relative">
      <div class="container">
        <div class="row align-items-center">
          <RouterLink to="/user/home" class="col-5 col-lg-2">
            <img src="@/assets/img/logo.svg" alt="" class="px-2 img-fluid"
          /></RouterLink>

          <div ref="headerCollapse" class="position-absolute top-100 start-0 d-lg-none w-100 px-0">
            <div
              class="collapse navbar-collapse bg-white py-3 shadow-sm"
              id="navbarSupportedContent"
            >
              <div class="container">
                <ul class="navbar-nav me-auto mb-3 mb-lg-0">
                  <li class="nav-item">
                    <RouterLink to="/user/products" class="nav-link">書籍類別</RouterLink>
                  </li>
                  <li class="nav-item">
                    <RouterLink to="/user/article" class="nav-link">編輯推薦</RouterLink>
                  </li>
                  <li class="nav-item">
                    <RouterLink to="/user/order" class="nav-link">查看訂單</RouterLink>
                  </li>
                </ul>
                <SearchModal></SearchModal>
              </div>
            </div>
          </div>

          <ul
            class="col-lg-6 col-8 py-3 list-unstyled d-none d-lg-flex gap-4 mb-0 justify-content-end justify-content-lg-start"
          >
            <li>
              <RouterLink to="/user/products" class="pe-2">書籍類別</RouterLink>
            </li>
            <li><RouterLink to="/user/article" class="px-2">編輯推薦</RouterLink></li>
          </ul>

          <div class="col-lg-4 col-7">
            <ul class="py-3 list-unstyled d-flex gap-4 mb-0 justify-content-end">
              <li class="d-none d-lg-block">
                <a href="#" class="px-2 btn rounded-pill border-0" @click.prevent="toggleCollapse">
                  <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="me-2" />搜尋</a
                >
              </li>
              <li class="d-none d-lg-block">
                <RouterLink to="/user/order" class="px-2 btn rounded-pill border-0">
                  <font-awesome-icon :icon="['far', 'file-lines']" class="me-1 fs-5" />
                  訂單</RouterLink
                >
              </li>
              <li>
                <RouterLink to="/user/collect" class="ps-1 position-relative"
                  ><font-awesome-icon :icon="['fas', 'heart']" class="fa-lg" />
                  <span
                    class="px-1 ms-1 text-white rounded bg-primary fs-8 position-absolute start-100 top-0 translate-middle-x d-inline-block"
                    >{{ collectStorage.length }}</span
                  ></RouterLink
                >
              </li>
              <li class="me-2">
                <RouterLink to="/user/cart" class="ps-1 position-relative"
                  ><font-awesome-icon :icon="['fas', 'cart-shopping']" class="fa-lg" /><span
                    class="px-1 ms-1 text-white rounded bg-primary fs-8 position-absolute start-100 top-0 translate-middle-x d-inline-block"
                    >{{ cartLength }}</span
                  ></RouterLink
                >
              </li>
              <button
                class="navbar-toggler d-lg-none"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
                @click.prevent="toggleCollapse"
              >
                <font-awesome-icon :icon="['fas', 'bars']" class="fa-lg" />
              </button>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div>
      <div class="position-absolute w-100 d-none d-lg-block">
        <div class="bg-light border-bottom">
          <div class="container">
            <SearchModal v-if="isShowCollapse" class="bg-light"></SearchModal>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import SearchModal from './SearchModal.vue'
import Collapse from 'bootstrap/js/dist/collapse'

import { mapState, mapActions } from 'pinia'
import cartStore from '@/stores/cart.js'
import productStore from '@/stores/product.js'

export default {
  data() {
    return {
      searchStr: '',
      searchResult: [],
      collapse: {}
    }
  },
  components: {
    SearchModal
  },
  computed: {
    ...mapState(cartStore, ['cartLength']),
    ...mapState(productStore, ['collectList', 'collectStorage', 'isShowCollapse'])
  },
  methods: {
    ...mapActions(productStore, ['toggleCollapse', 'getStorage'])
    // toggleCollapse() {
    //   // const searchComponent = this.$refs.SearchModal
    //   this.isShow = !this.isShow
    // }
    // showCollapse() {
    //   const searchComponent = this.$refs.SearchModal
    //   searchComponent.showCollapse()
    // }
    // getCollectListLength() {
    //   // this.collectListStorage = JSON.parse(localStorage.getItem('collectList'))
    // }
  },
  created() {
    this.getStorage()
  },
  mounted() {
    this.collapse = new Collapse(this.$refs.headerCollapse)
    this.collapse.hide()
  }
}
</script>

<style scoped>
header {
  z-index: 1000;
}
</style>
