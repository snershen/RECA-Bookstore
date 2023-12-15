<template>
  <header class="position-sticky top-0">
    <div class="py-2 border-bottom bg-white">
      <div class="container">
        <div class="row align-items-center">
          <RouterLink to="/user/home" class="col-4 col-lg-2">
            <img src="@/assets/img/logo.svg" alt="" class="px-2 img-fluid"
          /></RouterLink>
          <ul
            class="col-lg-4 col-8 py-3 list-unstyled d-flex gap-4 mb-0 justify-content-end justify-content-lg-start"
          >
            <li>
              <RouterLink to="/user/products" class="pe-2">書籍類別</RouterLink>
            </li>
            <li><RouterLink to="/user/article" class="px-2">編輯推薦</RouterLink></li>
          </ul>

          <div class="col-6 d-none d-lg-block">
            <ul class="py-3 list-unstyled d-flex gap-4 mb-0 justify-content-end">
              <li>
                <a href="#" class="px-2 btn rounded-pill border-0" @click.prevent="toggleCollapse">
                  <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="me-2" />搜尋</a
                >
              </li>
              <li>
                <RouterLink to="/user/orderlist" class="px-2 btn rounded-pill border-0">
                  <font-awesome-icon :icon="['far', 'clipboard']" class="me-1 fs-5" />
                  訂單</RouterLink
                >
              </li>
              <li>
                <RouterLink to="/user/like" class="ps-1 position-relative"
                  ><font-awesome-icon :icon="['fas', 'heart']" class="fa-lg" />
                  <span
                    class="px-1 ms-1 text-white rounded bg-primary fs-8 position-absolute start-100 top-0 translate-middle-x d-inline-block"
                    >{{ 10 }}</span
                  ></RouterLink
                >
              </li>
              <li>
                <RouterLink to="/user/cart" class="ps-1 position-relative"
                  ><font-awesome-icon :icon="['fas', 'cart-shopping']" class="fa-lg" /><span
                    class="px-1 ms-1 text-white rounded bg-primary fs-8 position-absolute start-100 top-0 translate-middle-x d-inline-block"
                    >{{ cartNum }}</span
                  ></RouterLink
                >
              </li>
              <li><router-link to="/admin/products">後台</router-link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="position-absolute w-100">
        <search-modal ref="SearchModal" v-show="isShow"></search-modal>
      </div>
    </div>
  </header>
</template>

<script>
import { userGetCart } from '../utils/apis'
import searchModal from './SearchModal.vue'

export default {
  data() {
    return {
      cartNum: 0,
      productList: {},
      searchStr: '',
      searchResult: [],
      isShow: false
    }
  },
  components: {
    searchModal
  },
  methods: {
    getCart() {
      userGetCart().then((res) => {
        console.log(res)
        this.cartNum = res.data.data.carts.length
      })
    },
    toggleCollapse() {
      // const searchComponent = this.$refs.SearchModal
      this.isShow = !this.isShow
    }
  },
  created() {
    this.getCart()
  },
  beforeRouteUpdate(to, from, next) {
    this.isShow = false
    next()
  }
}
</script>

<style scoped>
header {
  z-index: 1000;
}
</style>
