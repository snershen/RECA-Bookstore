<template>
  <div class="container py-5">
    <Breadcrumb
      :breadConfig="{ path: 'products', subNav: '書籍類別', title: '書籍介紹' }"
    ></Breadcrumb>
    <div class="row">
      <div class="col-md-3 d-none d-md-block mb-5">
        <ProductCategory></ProductCategory>
      </div>
      <div class="col-md-9 col-12">
        <div class="row">
          <div class="col-lg-4 mb-3 mb-lg-0 text-center">
            <div class="px-5 mx-5 px-lg-0 mx-lg-0">
              <img :src="singleProduct.imageUrl" :alt="singleProduct" class="img-fluid" />
            </div>
          </div>
          <div class="col-lg-8 d-flex flex-column justify-content-between">
            <div class="mb-3 mb-lg-0">
              <h3 class="font-sans fw-bold mb-3 mb-lg-5 fs-lg-2 fs-4">{{ singleProduct.title }}</h3>
              <ul>
                <li class="mb-3 row">
                  <div class="col-1 text-nowrap">作者：</div>
                  <div class="col-6 ms-3">{{ singleProduct.author }}</div>
                </li>
                <li class="mb-3 row">
                  <div class="col-1 text-nowrap">出版社：</div>
                  <div class="col-6 ms-3">{{ singleProduct.publish }}</div>
                </li>
                <li class="mb-2 align-items-center row">
                  <div class="col-1 text-nowrap">價格：</div>
                  <div class="col-6 ms-3 d-flex align-items-center">
                    <p class="fs-3 fw-bold me-2">${{ singleProduct.price }}</p>
                    <p class="fs-7 text-gray text-decoration-line-through">
                      ${{ singleProduct.origin_price }}
                    </p>
                  </div>
                </li>
              </ul>
              <!-- <p v-html="singleProduct.description"></p> -->
            </div>
            <div class="row">
              <div class="col-2 order-1 order-lg-0">
                <a
                  href="#"
                  class="btn btn-gray w-100 py-3 rounded-2 border-0"
                  :class="{ 'bg-danger ': isSolid }"
                  @click.prevent="handleCollectBtn(singleProduct)"
                >
                  <span class="fa-lg text-white">
                    <font-awesome-icon :icon="icon" />
                  </span>
                  <!-- <span v-if="isSolid">已加入收藏</span>
                  <span v-else>加入收藏</span> -->
                </a>
              </div>
              <div class="col-lg-5 col-10 order-1 order-lg-0">
                <a
                  href="#"
                  class="btn btn-gray text-white w-100 py-3 rounded-0 mb-lg-0 mb-0 rounded-2"
                  @click.prevent="addCart(singleProduct.id)"
                  >加入購物車</a
                >
              </div>
              <div class="col-lg-5">
                <a
                  href="#"
                  class="btn btn-primary text-white w-100 py-3 rounded-0 mb-lg-0 mb-2 rounded-2"
                  @click.prevent="addCart(singleProduct.id)"
                  >立即購買</a
                >
              </div>
            </div>
          </div>
          <div class="col-12 py-5">
            <ProductTab />
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
import ProductCard from '@/components/user/ProductCard.vue'

import ProductCategory from '@/components/user/ProductCategory.vue'
import ProductTab from '@/components/user/ProductTab.vue'
import Breadcrumb from '@/components/user/Breadcrumb.vue'

import { mapState, mapActions } from 'pinia'
import cartStore from '@/stores/cart.js'
import productStore from '@/stores/product.js'

export default {
  data() {
    return {
      isSolid: false
    }
  },
  props: ['id'],
  components: { ProductCard, ProductTab, ProductCategory, Breadcrumb },
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

  async created() {
    await this.getSingleProduct(this.id)
    await this.getProducts()
    document.title = `${this.singleProduct.title}｜RECA BOOKSTORE`
  },
  mounted() {
    this.getStorage()
    setTimeout(() => {
      this.initializeIsSolid()
    }, 500)
  },
  watch: {
    'singleProduct.title': 'updateDocumentTitle'
  }
}
</script>

<style scoped>
.book-img {
  width: 70%;
}
</style>
