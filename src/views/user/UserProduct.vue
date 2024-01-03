<template>
  <LoadingComponent></LoadingComponent>

  <div class="container">
    <Breadcrumb
      :breadConfig="{ path: 'products', subNav: '書籍類別', title: singleProduct.title }"
    ></Breadcrumb>
    <div class="row">
      <div class="col-3 d-none d-lg-block mb-5">
        <ProductCategory></ProductCategory>
      </div>
      <div class="col-lg-9">
        <div class="row">
          <div class="col-lg-4 mb-3 mb-lg-0 text-center">
            <div class="px-5 mx-5 px-lg-0 mx-lg-0">
              <img :src="singleProduct.imageUrl" :alt="singleProduct" class="img-fluid" />
            </div>
          </div>
          <div class="col-lg-8 d-flex flex-column justify-content-between">
            <div class="mb-3 mb-lg-0">
              <h1 class="fw-bold mb-3 mb-lg-0 fs-3">{{ singleProduct.title }}</h1>
              <p v-html="singleProduct.description"></p>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="mb-4">
                  <span class="fs-4 me-2 text-secondary fw-bold"
                    >售價 ${{ singleProduct.price }}</span
                  >
                  <del class="opacity-50">${{ singleProduct.origin_price }}</del>
                </div>
              </div>
              <div class="col-lg-6">
                <a
                  href="#"
                  class="btn btn-secondary w-100 py-3 rounded-0 mb-lg-0 mb-2"
                  @click.prevent="addCart(singleProduct.id)"
                  ><font-awesome-icon
                    :icon="['fas', 'cart-shopping']"
                    class="fa-lg text-white me-2"
                  />放入購物車</a
                >
              </div>
              <div class="col-lg-6">
                <a
                  href="#"
                  class="btn btn-outline-secondary w-100 py-3 rounded-0"
                  :class="{ 'opacity-75 bg-dark text-white': isSolid }"
                  @click.prevent="handleCollectBtn(singleProduct)"
                >
                  <span class="me-2 fa-lg">
                    <font-awesome-icon :icon="icon" class="text-primary" />
                  </span>
                  <span v-if="isSolid">已加入收藏</span>
                  <span v-else>加入收藏</span>
                </a>
              </div>
            </div>
          </div>
          <div class="col-12 py-5">
            <h2 class="fs-4 fw-bold mb-3">本書介紹</h2>
            <p v-html="singleProduct.content"></p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- <div class="container mb-5">
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
  </div> -->
  <div class="bg-light py-5" v-if="showAlikeProduct.length !== 0">
    <h2 class="text-center fw-bold mb-4">瀏覽更多書籍</h2>
    <div class="container">
      <ul class="row g-3">
        <li v-for="item in alikeProduct" class="col-2 d-flex">
          <ProductCard :item="item"></ProductCard>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue'

import ProductCategory from '@/components/ProductCategory.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import LoadingComponent from '@/components/Loading.vue'

import { mapState, mapActions } from 'pinia'
import cartStore from '@/stores/cart.js'
import productStore from '@/stores/product.js'

export default {
  data() {
    return {
      isSolid: false
    }
  },
  components: { ProductCard, ProductCategory, Breadcrumb, LoadingComponent },
  computed: {
    ...mapState(productStore, [
      'singleProduct',
      'singleProductId',
      'productList',
      'alikeProduct',
      'collectList',
      'collectStorage',
      'isSolid'
    ]),
    icon() {
      return this.isSolid ? ['fas', 'heart'] : ['far', 'heart']
    }
  },

  methods: {
    ...mapActions(cartStore, ['getCart', 'addCart']),
    ...mapActions(productStore, [
      'getSingleProduct',
      'getProducts',
      'showAlikeProduct',
      'getProductsAll',
      'getStorage',
      'addOrRemoveCollect'
    ]),
    initializeIsSolid() {
      const copyCollectList = Array.from(this.collectStorage)
      const storedItem = copyCollectList.filter(
        (storedItem) => storedItem.id === this.singleProduct.id
      )
      if (storedItem.length > 0) {
        this.isSolid = storedItem[0].isSolid ? true : false
      }
    },
    changeCollectIcon() {
      this.isSolid = !this.isSolid
    },
    handleCollectBtn(item) {
      this.changeCollectIcon()
      this.addOrRemoveCollect(item, this.isSolid)
    }
  },

  created() {
    const path = this.$route.path
    const pathArr = path.split('/')
    const id = pathArr[pathArr.length - 1]
    this.getSingleProduct(id)
    this.getProducts()
    this.getProductsAll()
  },
  mounted() {
    this.getStorage()
    setTimeout(() => {
      this.initializeIsSolid()
    }, 500)
  }
}
</script>

<style scoped>
.book-img {
  width: 70%;
}
</style>
