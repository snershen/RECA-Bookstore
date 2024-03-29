<template>
  <div class="container py-5">
    <BreadcrumbComponent
      class="mb-4"
      :breadConfig="{ path: 'products', subNav: '書籍類別', title: '書籍介紹' }"
    />
    <div class="row">
      <div class="col-md-3 d-none d-md-block mb-5">
        <ProductCategory />
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
                  <div class="col-lg-1 col-2 text-nowrap">作者：</div>
                  <div class="col-6 ms-5">{{ singleProduct.author }}</div>
                </li>
                <li class="mb-3 row">
                  <div class="col-lg-1 col-2 text-nowrap">出版社：</div>
                  <div class="col-6 ms-5">{{ singleProduct.publish }}</div>
                </li>
                <li class="mb-3 row">
                  <div class="col-lg-1 col-2 text-nowrap">出版日期：</div>
                  <div class="col-6 ms-5">{{ singleProduct.time }}</div>
                </li>
                <li class="mb-2 align-items-center row">
                  <div class="col-lg-1 col-2 text-nowrap">價格：</div>
                  <div class="col-6 ms-5 d-flex align-items-center">
                    <p class="fs-3 fw-bold me-2">${{ singleProduct.price }}</p>
                    <p class="fs-7 text-gray text-decoration-line-through">
                      ${{ singleProduct.origin_price }}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div class="row gx-2 d-lg-flex d-none">
              <div class="col-2 col-lg-2">
                <a
                  href="#"
                  class="btn btn-gray w-100 py-3 rounded-2 border-0"
                  :class="{ 'bg-danger ': isSolid }"
                  @click.prevent="handleCollectBtn(singleProduct)"
                >
                  <span class="fa-lg text-white">
                    <font-awesome-icon :icon="icon" />
                  </span>
                </a>
              </div>
              <div class="col-lg-5 col-5">
                <a
                  href="#"
                  class="btn btn-gray text-white w-100 py-3 rounded-0 mb-lg-0 mb-0 rounded-2"
                  @click.prevent="addCart(singleProduct.id)"
                  >加入購物車</a
                >
              </div>
              <div class="col-lg-5 col-5">
                <RouterLink
                  :to="{ name: 'cart' }"
                  class="btn btn-primary text-white w-100 py-3 rounded-0 mb-lg-0 mb-2 rounded-2"
                  @click.prevent="addCart(singleProduct.id)"
                  >立即購買</RouterLink
                >
              </div>
            </div>
            <div
              class="z-1000 row gx-2 position-fixed bottom-0 start-0 end-0 d-flex d-lg-none border-top py-2 px-2 bg-white shadow"
            >
              <div class="col-2 col-lg-2 order-1">
                <a
                  href="#"
                  class="btn btn-gray w-100 py-2 rounded-2 border-0"
                  :class="{ 'bg-danger ': isSolid }"
                  @click.prevent="handleCollectBtn(singleProduct)"
                >
                  <span class="fa-lg text-white">
                    <font-awesome-icon :icon="icon" />
                  </span>
                </a>
              </div>
              <div class="col-lg-5 col-5">
                <a
                  href="#"
                  class="btn btn-gray text-white w-100 py-2 rounded-0 mb-lg-0 mb-0 rounded-2"
                  @click.prevent="addCart(singleProduct.id)"
                  >加入購物車</a
                >
              </div>
              <div class="col-lg-5 col-5">
                <RouterLink
                  :to="{ name: 'cart' }"
                  class="btn btn-primary text-white w-100 py-2 rounded-0 mb-lg-0 rounded-2"
                  @click.prevent="addCart(singleProduct.id)"
                  >立即購買</RouterLink
                >
              </div>
            </div>
          </div>
          <div class="col-12 py-5">
            <ProductTab />
          </div>
          <div>
            <h3 class="font-sans fs-4 ms-2 mb-3 fw-bold">更多相關商品</h3>
            <div class="position-relative">
              <swiper-container init="false" ref="relatedSwiper" class="container px-5">
                <swiper-slide
                  v-for="item in relatedResult"
                  :key="item.id"
                  class="h-auto d-flex justify-content-center my-3 px-2"
                >
                  <ProductCard :item="item" />
                </swiper-slide>
              </swiper-container>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SwiperSlide } from 'swiper/vue'

import ProductCard from '@/components/user/ProductCard.vue'
import ProductCategory from '@/components/user/ProductCategory.vue'
import ProductTab from '@/components/user/ProductTab.vue'
import BreadcrumbComponent from '@/components/user/BreadcrumbComponent.vue'

import { mapState, mapActions } from 'pinia'
import cartStore from '@/stores/cart.js'
import { useProductStore } from '@/stores/product.js'

export default {
  data() {
    return {
      isSolid: false,
      relatedResult: [],
      relatedSwiper: {
        slidesPerView: 1,
        spaceBetween: 18,
        navigation: true,
        breakpoints: {
          576: {
            slidesPerView: 2
          },
          768: {
            slidesPerView: 3
          },
          1024: {
            slidesPerView: 4
          }
        }
      }
    }
  },
  props: ['id'],
  components: { ProductCard, ProductTab, ProductCategory, BreadcrumbComponent,  SwiperSlide },
  computed: {
    ...mapState(useProductStore, [
      'singleProduct',
      'productList',
      'alikeProduct',
      'collectList',
      'collectStorage',
      'isSolid',
      'selectedSingle',
      'filterResult'
    ]),
    icon() {
      return this.isSolid ? ['fas', 'heart'] : ['far', 'heart']
    }
  },

  methods: {
    ...mapActions(cartStore, ['getCart', 'addCart']),
    ...mapActions(useProductStore, [
      'getSingleProduct',
      'getProducts',
      'filterProduct',
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
        this.isSolid = !!storedItem[0].isSolid
      }
    },
    changeCollectIcon() {
      this.isSolid = !this.isSolid
    },
    handleCollectBtn(item) {
      this.changeCollectIcon()
      this.addOrRemoveCollect(item, this.isSolid)
    },
    initializeSwiper(el, config) {
      const swiperEl = el
      const params = {
        autoplay: true,
        injectStylesUrls: ['./custom_swiper.css'],
        ...config
      }
      Object.assign(swiperEl, params)
      swiperEl.initialize()
    }
  },

  async created() {
    await this.getSingleProduct(this.id)
    const relatedData = await this.filterProduct(this.singleProduct.category, 'related')
    this.relatedResult = await relatedData.filter((item) => item.id !== this.singleProduct.id)

    document.title = `${this.singleProduct.title}｜RECA BOOKSTORE`
  },
  mounted() {
    this.getStorage()
    setTimeout(() => {
      this.initializeIsSolid()
      this.initializeSwiper(this.$refs.relatedSwiper, this.relatedSwiper)
    }, 1000)
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
.z-1000 {
  z-index: 1000;
}
</style>
