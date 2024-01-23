<template>
  <LoadingComponent></LoadingComponent>
  <main>
    <section class="banner">
      <h1 class="banner-title fw-bold">踏上探索之旅<br />尋找屬於自己的命定之書</h1>
      <p class="banner-subtitle text-white text-center mt-2 fs-4">上萬本書籍等待你的閱讀</p>
      <!-- <swiper
        :effect="'coverflow'"
        :grabCursor="true"
        :centeredSlides="true"
        :slidesPerView="slidesPerViewCoverFlow"
        :autoplay="true"
        spaceBetween="80"
        :coverflowEffect="{
          rotate: 0,
          stretch: 10,
          depth: 10,
          modifier: 5,
          slideShadows: true
        }"
        :modules="modules"
        class="mySwiper py-5"
      >
        <swiper-slide v-for="item in productList" class="align-items-center">
          <a href="#" @click.prevent="directSingleProduct(item.id)">
            <img :src="item.imageUrl" class="img-fluid" />
          </a>
        </swiper-slide>
      </swiper> -->
    </section>
    <section class="container py-5 my-5">
      <div class="d-flex justify-content-between align-items-center">
        <h2 class="fw-bold">今日熱門</h2>
        <RouterLink
          to="#"
          class="btn-more fs-lg-6 fs-7 px-lg-4 px-3 py-lg-2 py-1 text-white rounded-pill"
          >查看更多
          <font-awesome-icon :icon="['fas', 'chevron-right']" class="btn-more-arrow fa-sm"
        /></RouterLink>
      </div>
      <div class="position-relative px-5 px-xxl-0">
        <swiper
          :slidesPerView="slidesPerView"
          :spaceBetween="40"
          :modules="modules"
          :navigation="true"
          :loop="true"
          class="swiper-today my-5 px-3 position-static"
        >
          <swiper-slide v-for="item in productList" :key="item.id" class="h-auto">
            <div class="today-card">
              <button
                type="button"
                class="like-btn btn btn-white position-absolute top-0 end-0 pt-2 pe-2 border-0"
                @click.prevent="handleCollectBtn(item, isSolid)"
              >
                <span class="rounded-circle bg-white shadow-sm">
                  <font-awesome-icon :icon="icon" class="text-primary" />
                </span>
              </button>
              <img
                :src="item.imageUrl"
                :alt="item.title"
                class="mb-3 w-100 object-fit-contain"
                height="300"
              />
              <div class="flex-grow-1 w-100">
                <h4 class="today-card-title fw-bold text-overflow-title flex-grow-1">
                  {{ item.title }}
                </h4>
                <div class="today-card-price align-items-center">
                  <p class="fw-bold me-2 fs-4">${{ item.price }}</p>
                  <p class="fs-7 text-gray text-decoration-line-through">
                    ${{ item.origin_price }}
                  </p>
                </div>
                <p class="today-card-content text-overflow-content">{{ item.content }}</p>
                <!-- <RouterLink :to="`/products/${item.id}`" class="stretched-link"></RouterLink> -->
              </div>
              <!-- <div class="d-flex justify-content-between align-items-center">
      <a href="#" class="btn btn-outline-dark w-100 text-nowrap">放入購物車</a>
    </div> -->
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </section>
    <section class="bg-primary-light py-5">
      <div class="container py-4">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2 class="fw-bold">最新出版</h2>
          <RouterLink
            to="#"
            class="btn-more fs-lg-6 fs-7 px-lg-4 px-3 py-lg-2 py-1 text-white rounded-pill"
            >查看更多
            <font-awesome-icon :icon="['fas', 'chevron-right']" class="btn-more-arrow fa-sm"
          /></RouterLink>
        </div>
        <Tabs />
        <div class="position-relative px-5 px-xxl-0">
          <swiper
            :slidesPerView="slidesPerView"
            :spaceBetween="18"
            :scrollbar="true"
            :navigation="true"
            :modules="modules"
            class="mySwiper py-5 position-static px-3"
          >
            <swiper-slide
              v-for="item in productList"
              :key="item.id"
              class="h-auto d-flex justify-content-center"
            >
              <ProductCard :item="item" />
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </section>
    <section class="container">
      <div class="d-flex justify-content-between align-items-center">
        <h2 class="fw-bold py-5">暢銷排行</h2>
      </div>
    </section>
    <section class="bg-primary-light py-5">
      <div class="container py-5">
        <div class="d-flex justify-content-between align-items-center">
          <h2 class="fw-bold">編輯推薦</h2>
          <RouterLink
            to="#"
            class="btn-more fs-lg-6 fs-7 px-lg-4 px-3 py-lg-2 py-1 text-white rounded-pill"
            >查看更多
            <font-awesome-icon :icon="['fas', 'chevron-right']" class="btn-more-arrow fa-sm"
          /></RouterLink>
        </div>
        <ul class="row">
          <li class="col-lg-4 col-6" v-for="item in articleList">
            <ArticleCard :article="item" />
          </li>
        </ul>
      </div>
    </section>

    <!-- <div class="bg-light">
    <div class="d-flex justify-content-center">
      <ul class="d-flex gap-3 py-lg-5 py-4 overflow-x-auto">
        <li v-for="item in categoryList" :key="item">
          <a
            href="#"
            class="fs-4 btn btn-outline-secondary rounded-pill px-3 fs-6 text-nowrap"
            @click.prevent="directProductPage(item)"
            ># {{ item }}</a
          >
        </li>
      </ul>
    </div>
  </div> -->

    <div class="bookstore-bg text-center">
      <h3 class="fs-1 fw-bold text-primary mb-4">開啟屬於你的閱讀旅程</h3>
      <router-link :to="{ name: 'products' }" class="btn btn-outline-light rounded-pill fs-6 px-4">
        探索書店
        <font-awesome-icon :icon="['fas', 'chevron-right']" class="ms-2 fa-sm" />
      </router-link>
    </div>
  </main>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import productStore from '@/stores/product.js'
import articleStore from '@/stores/article.js'

import LoadingComponent from '@/components/Loading.vue'
import ProductCard from '@/components/user/ProductCard.vue'
import ArticleCard from '@/components/user/ArticleCard.vue'
import Tabs from '@/components/user/Tabs.vue'

import { Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectCoverflow } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

export default {
  data() {
    return {
      // products: [],
      newestProduct: [],
      slidesPerView: 6,
      slidesPerViewCoverFlow: 5,
      modules: [Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectCoverflow],
      literalResult: [],
      commercialResult: []
    }
  },
  components: {
    ProductCard,
    ArticleCard,
    Tabs,
    Swiper,
    SwiperSlide,
    LoadingComponent
  },

  computed: {
    ...mapState(productStore, ['productList', 'categoryList', 'filterResult', 'productAll']),
    ...mapState(articleStore, ['articleList'])
  },

  methods: {
    ...mapActions(productStore, ['getProducts', 'getProductsAll', 'filterProduct']),
    ...mapActions(articleStore, ['getArticles']),
    updateSlidesPerView() {
      const screenWidth = window.innerWidth
      if (screenWidth <= 576) {
        this.slidesPerView = 1
      } else if (screenWidth <= 768) {
        this.slidesPerView = 2
      } else if (screenWidth <= 992) {
        this.slidesPerView = 3
      } else if (screenWidth <= 1400) {
        this.slidesPerView = 4
      } else {
        this.slidesPerView = 6
      }
    },
    updateSlidesPerViewCoverFlow() {
      const screenWidth = window.innerWidth
      if (screenWidth <= 576) {
        this.slidesPerViewCoverFlow = 2
      } else if (screenWidth <= 768) {
        this.slidesPerViewCoverFlow = 3
      } else {
        this.slidesPerViewCoverFlow = 5
      }
    },
    updateSlidersHandler() {
      this.updateSlidesPerView()
      this.updateSlidesPerViewCoverFlow()
    },
    directProductPage(item) {
      this.getProductsAll()
      this.filterProduct(item)
      this.$router.push({ name: 'products' })
    },
    directSingleProduct(id) {
      this.$router.push(`/products/${id}`)
    },
    filterCategoryProduct(target, list) {
      const result = this.productAll.filter((item) => {
        return item.category === target
      })
      this[list] = result
    },
    async handler() {
      await this.getProductsAll()
      await this.filterCategoryProduct('文學小說', 'literalResult')
      await this.filterCategoryProduct('商業理財', 'commercialResult')
    }
  },
  created() {
    this.getProducts()
    this.getArticles()
    this.getProductsAll()
  },

  mounted() {
    this.updateSlidersHandler()
    window.addEventListener('resize', this.updateSlidersHandler)
    this.handler()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/mixin';

.banner {
  padding-top: 100px;
  padding-bottom: 100px;
  background-image: url('../../assets/img/banner-bg.png');
  background-position: center;
  background-size: cover;
  &-title {
    font-size: 2rem;
    text-align: center;
    color: #ffae63;
    @include min-lg {
      font-size: 3.625rem;
    }
  }
  &-subtitle {
    letter-spacing: 9px;
  }
}

.bookstore-bg {
  padding-top: 120px;
  padding-bottom: 120px;
  background-image: url('../../assets/img/bookstore-bg2.png');
  background-attachment: fixed;
}

::-webkit-scrollbar {
  display: none; /* Chrome Safari 兼容*/
}

.swiper-wrapper {
  display: flex;
  align-items: center;
}

.btn-more {
  background: #000;

  * {
    transition: 0.2s;
  }
  &:hover {
    background: #c9a65c;
  }
  &:hover &-arrow {
    transform: translateX(3px);
  }
}

.swiper-today {
  @include min-lg {
    height: 400px;
  }
  .swiper-slide {
    display: flex;
    align-items: center;
    transform: scale(0.95);
  }
  .today-card {
    &-title {
      font-size: 1rem;
    }
    &-content {
      display: none;
    }
    &-price {
      display: none;
    }
    img {
      height: 200px;
      object-position: left;
    }
  }
  .swiper-slide-active {
    transition: transform 0.5s;
    transform: scale(1);
    width: 100% !important;

    @include min-lg {
      width: 50% !important;
      height: 300px;
    }
    .today-card {
      display: flex;

      &-title {
        font-size: 1.5rem;
      }
      &-content {
        margin-top: 40px;
        display: -webkit-box;
      }
      &-price {
        display: flex;
      }
      img {
        margin-right: 20px;
        width: 40% !important;
        height: auto;
        object-position: top right;
      }
    }
  }
}
</style>
