<template>
  <LoadingComponent></LoadingComponent>
  <Breadcrumb></Breadcrumb>
  <div class="container mb-5">
    <div>
      <div class="row">
        <div class="offset-lg-2 col-lg-4 col-12 mb-3 mb-lg-0 text-center">
          <div class="px-5 mx-5 px-lg-0 mx-lg-0">
            <img :src="singleProduct.imageUrl" :alt="singleProduct" class="img-fluid book-img" />
          </div>
        </div>
        <div class="col-lg-4 col-12 d-flex flex-column justify-content-between">
          <div>
            <h1 class="fw-bold mb-3 mb-lg-0 fs-3">{{ singleProduct.title }}</h1>
            <p>{{ singleProduct.content }}</p>
          </div>
          <div class="row">
            <div class="col-lg-6">
              <a
                href="#"
                class="btn btn-secondary w-100 py-3 rounded-0 mb-2"
                @click.prevent="addCart(singleProduct.id)"
                ><font-awesome-icon
                  :icon="['fas', 'cart-shopping']"
                  class="fa-lg text-white me-2"
                />放入購物車</a
              >
            </div>
            <div class="col-lg-6">
              <a href="#" class="btn btn-outline-secondary w-100 py-3 rounded-0">加入收藏</a>
            </div>
          </div>
        </div>
        <div class="offset-lg-2 col-8 py-5">
          <h2 class="fs-4 fw-bold mb-3">本書介紹</h2>
          <p>{{ singleProduct.description }}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-light py-5" v-if="productList.length !== 0">
    <h2 class="text-center fw-bold mb-4">瀏覽更多書籍</h2>
    <div class="container">
      <ul class="row g-3">
        <li v-for="item in productList" class="col-2 d-flex">
          <product-card :item="item"></product-card>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import productCard from '../../components/ProductCard.vue'

import Breadcrumb from '../../components/Breadcrumb.vue'
import LoadingComponent from '@/components/Loading.vue'

import { mapState, mapActions } from 'pinia'
import cartStore from '@/stores/cart.js'
import productStore from '@/stores/product.js'

export default {
  // data() {
  //   return {
  //     singleProduct: {},
  //     products: []
  //   }
  // },
  components: { productCard, Breadcrumb, LoadingComponent },
  computed: {
    ...mapState(productStore, ['singleProduct', 'productList'])
  },

  methods: {
    ...mapActions(cartStore, ['getCart', 'addCart']),
    ...mapActions(productStore, ['getSingleProduct', 'getProducts'])
  },

  created() {
    const path = this.$route.path
    const pathArr = path.split('/')
    const id = pathArr[pathArr.length - 1]
    console.log(id)
    this.getSingleProduct(id)
    this.getProducts()
  }
}
</script>

<style scoped>
.book-img {
  width: 70%;
}
</style>
