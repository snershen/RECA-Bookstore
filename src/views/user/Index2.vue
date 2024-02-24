<template>
  <main>
    <section class="banner">
      <h1 class="banner-title fw-bold">踏上探索之旅<br />尋找屬於自己的命定之書</h1>
      <p class="banner-subtitle text-white text-center mt-2 fs-4">上萬本書籍等待你的閱讀</p>
      <div class="container d-lg-block d-none">
        <swiper
          :slidesPerView="bannerSlidesNum"
          :spaceBetween="80"
          :modules="modules"
          :navigation="true"
          :autoplay="true"
          :centeredSlides="true"
          :centeredSlidesBounds="true"
          :loop="true"
          class="banner-swiper my-5 px-3"
        >
          <swiper-slide v-for="item in productList" :key="item.id" class="h-auto">
            <RouterLink :to="`/products/${item.id}`">
              <img
                :src="item.imageUrl"
                :alt="item.title"
                class="mb-3 w-100 object-fit-contain"
                height="300"
              />
            </RouterLink>
          </swiper-slide>
        </swiper>
      </div>
    </section>

    <section class="container py-5 my-5">
      <div class="d-flex justify-content-between align-items-center">
        <h2 class="fw-bold fs-2">今日熱門</h2>
        <RouterLink :to="{ name: 'products' }">
          <BtnMore />
        </RouterLink>
      </div>
      <div class="position-relative px-5 px-xxl-0">
        <swiper
          :slidesPerView="6"
          :spaceBetween="40"
          :modules="modules"
          :navigation="true"
          :autoplay="true"
          :loop="true"
          class="swiper-today my-5 px-3 position-static"
        >
          <swiper-slide v-for="item in productList" :key="item.id" class="h-auto">
            <div class="today-card position-relative">
              <button
                type="button"
                class="like-btn btn btn-white position-absolute top-0 end-0 pt-2 pe-2 border-0"
                @click.prevent="handleCollectBtn(item, isSolid)"
              >
                <span class="rounded-circle bg-white shadow-sm">
                  <!-- <font-awesome-icon :icon="icon" class="text-primary" /> -->
                </span>
              </button>
              <div class="today-card-img">
                <img
                  :src="item.imageUrl"
                  :alt="item.title"
                  class="w-100 h-100 object-fit-contain"
                />
              </div>
              <div class="flex-grow-1 w-100">
                <h4 class="today-card-title fw-bold text-overflow-title flex-grow-1 mb-1">
                  {{ item.title }}
                </h4>
                <p class="text-gray">{{ item.author }}</p>
                <div
                  class="today-card-price align-items-center align-items-lg-start justify-content-center justify-content-lg-start flex-lg-column"
                >
                  <div class="d-flex align-items-center">
                    <p class="fw-bold me-2 fs-3">${{ item.price }}</p>
                    <p class="fs-7 text-gray text-decoration-line-through">
                      ${{ item.origin_price }}
                    </p>
                  </div>
                </div>
                <p class="today-card-content text-overflow-content" v-html="item.content"></p>

                <RouterLink :to="`/products/${item.id}`" class="stretched-link"></RouterLink>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </section>
    <section class="bg-primary-light py-5">
      <div class="container py-4">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2 class="fw-bold fs-2">最新出版</h2>
          <RouterLink :to="{ name: 'products' }">
            <BtnMore />
          </RouterLink>
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
              v-for="item in filterResult"
              :key="item.id"
              class="h-auto d-flex justify-content-center"
            >
              <ProductCard :item="item" />
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </section>
    <section class="container py-5">
      <h2 class="fw-bold pt-5 pb-4 fs-2">暢銷排行</h2>
      <div class="row">
        <div class="col-lg-3">
          <div class="px-4 py-lg-5">
            <swiper
              @swiper="setThumbsSwiper"
              :spaceBetween="20"
              :slidesPerView="rankSlidesNum"
              :freeMode="true"
              :modules="modules"
              direction="vertical"
              class="sold-swiper"
            >
              <swiper-slide v-for="(item, index) in productList">
                <div class="border-bottom py-3 text-truncate">
                  <span class="me-2 rank-number">{{ index + 1 }}</span> {{ item.title }}
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>
        <div class="col-lg-9">
          <swiper
            :loop="true"
            :slidesPerView="1"
            :spaceBetween="10"
            :thumbs="{ swiper: thumbsSwiper }"
            :modules="modules"
            :autoplay="true"
            class="sold-swiper-product"
          >
            <swiper-slide v-for="(item, index) in productList">
              <div class="today-card position-relative pb-5">
                <button
                  type="button"
                  class="like-btn btn btn-white position-absolute top-0 end-0 pt-2 pe-2 border-0"
                  @click.prevent="handleCollectBtn(item, isSolid)"
                >
                  <span class="rounded-circle bg-white shadow-sm">
                    <!-- <font-awesome-icon :icon="icon" class="text-primary" /> -->
                  </span>
                </button>
                <div class="today-card-img py-lg-5 py-3">
                  <img :src="item.imageUrl" :alt="item.title" />
                </div>
                <div class="flex-grow-1 w-100 py-lg-5">
                  <h4
                    class="fs-4 fs-lg-3 today-card-title fw-bold text-overflow-title flex-grow-1 text-center text-lg-start mb-1"
                  >
                    {{ item.title }}
                  </h4>
                  <div
                    class="today-card-price align-items-center align-items-lg-start justify-content-center justify-content-lg-start flex-lg-column"
                  >
                    <p class="text-gray mb-1">{{ item.author }}</p>
                    <div class="d-flex align-items-center">
                      <p class="fw-bold me-2 fs-3">${{ item.price }}</p>
                      <p class="fs-7 text-gray text-decoration-line-through">
                        ${{ item.origin_price }}
                      </p>
                    </div>
                  </div>
                  <RouterLink :to="`/products/${item.id}`" class="stretched-link"></RouterLink>
                  <p class="today-card-content text-overflow-content" v-html="item.content"></p>
                </div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </section>
    <section class="bg-primary-light py-5">
      <div class="container py-5">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2 class="fw-bold fs-2">編輯推薦</h2>
          <RouterLink :to="{ name: 'articles' }">
            <BtnMore />
          </RouterLink>
        </div>
        <ul class="row">
          <li class="col-lg-4" v-for="item in articleList">
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

      <router-link
        :to="{ name: 'products' }"
        class="btn btn-outline-light rounded-pill fs-6 px-4 py-2"
      >
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

import ProductCard from '@/components/user/ProductCard.vue'
import ArticleCard from '@/components/user/ArticleCard.vue'
import Tabs from '@/components/user/Tabs.vue'
import BtnMore from '@/components/user/BtnMore.vue'

import SwiperCore from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'

import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectCoverflow,
  FreeMode,
  Thumbs
} from 'swiper/modules'

export default {
  data() {
    return {
      newestProduct: [],
      slidesPerView: 6,
      bannerSlidesNum: 5,
      rankSlidesNum: 5,
      modules: [
        Navigation,
        Pagination,
        Scrollbar,
        A11y,
        Autoplay,
        EffectCoverflow,
        Thumbs,
        FreeMode
      ],
      literalResult: [],
      commercialResult: [],
      thumbsSwiper: null
    }
  },
  components: {
    ProductCard,
    ArticleCard,
    Tabs,
    BtnMore,
    Swiper,
    SwiperSlide
  },

  computed: {
    ...mapState(productStore, [
      'productList',
      'categoryList',
      'filterResult',
      'productAll',
      'isLoading'
    ]),
    ...mapState(articleStore, ['articleList'])
  },

  methods: {
    ...mapActions(productStore, ['getProducts', 'getProductAll', 'filterProduct']),
    ...mapActions(articleStore, ['getArticles']),
    updateSlidesPerView() {
      const screenWidth = window.innerWidth
      if (screenWidth <= 576) {
        this.slidesPerView = 1
        this.rankSlidesNum = 1
      } else if (screenWidth <= 768) {
        this.slidesPerView = 2
        this.bannerSlidesNum = 3
        this.rankSlidesNum = 1
      } else if (screenWidth <= 992) {
        this.slidesPerView = 3
        this.bannerSlidesNum = 3
        this.rankSlidesNum = 5
      } else if (screenWidth <= 1400) {
        this.slidesPerView = 4
        this.bannerSlidesNum = 3
        this.rankSlidesNum = 5
      } else {
        this.slidesPerView = 6
        this.bannerSlidesNum = 5
        this.rankSlidesNum = 5
      }
    },
    updateSlidersHandler() {
      this.updateSlidesPerView()
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
      await this.getProductAll()
      await this.filterCategoryProduct('文學小說', 'literalResult')
      await this.filterCategoryProduct('商業理財', 'commercialResult')
    },
    setThumbsSwiper(swiper) {
      this.thumbsSwiper = swiper
    }
  },
  created() {
    this.getProducts()
    this.getArticles()
    this.getProductAll()
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
    color: #c9a65c;
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

.banner-swiper {
  .swiper-slide {
    transition: transform 0.5s;
    padding: 30px 0;
    opacity: 0.8;
  }
  .swiper-slide-active {
    transform: scale(1.2);
    opacity: 1;
  }
}

.swiper-today {
  @include min-lg {
    height: 400px;
  }
  .swiper-slide {
    display: flex;
    align-items: center;
    transform-origin: top center;
    @include min-lg {
      transform: scale(1);
    }
    .today-card-img {
      margin-bottom: 12px;
      height: 200px;
    }
  }
  .today-card {
    padding: 40px 0;
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
      height: 100%;
      width: 100%;
      object-position: left;
      object-fit: contain;
    }
  }
  .swiper-slide-active {
    width: 100% !important;
    @include min-lg {
      width: 50% !important;
      height: 300px;
    }
    .today-card {
      display: flex;
      flex-direction: column;

      @include min-md {
        flex-direction: row;
      }
      &-title {
        font-size: 1.2rem;
        @include min-lg {
          font-size: 1.5rem;
        }
      }
      &-content {
        margin-top: 20px;
        display: -webkit-box;
        @include min-lg {
          margin-top: 40px;
        }
      }
      &-price {
        display: flex;
      }
      &-img {
        height: 350px;
        width: 100%;
        padding-right: 20px;
      }
      img {
        max-height: 400px;
        object-position: center;
        width: 100%;
        @include min-lg {
          max-height: initial;
          height: auto;
          margin-right: 20px;
          object-position: top right;
        }
      }
    }
  }
}

.sold-swiper {
  height: 100px;
  @include min-lg {
    height: 300px;
  }
  .swiper-slide {
    cursor: pointer;
    &:nth-child(-n + 3) .rank-number {
      background-image: url('../../assets/img/deco-crown.svg');
      background-size: contain;
      background-position: center 30%;
      background-repeat: no-repeat;
      color: white;
    }
    &:nth-child(-n + 9) .rank-number::before {
      content: '0';
    }
    .rank-number {
      padding: 10px;
      padding-top: 16px;
      font-size: 0.875rem;
    }
  }
  .swiper-slide-thumb-active {
    font-weight: bold;
  }
}

.sold-swiper-product {
  position: relative;
  &::before,
  &::after {
    content: '';
    display: inline-block;
    position: absolute;
    background-image: url('../../assets/img/deco-star.svg');
    width: 50px;
    height: 50px;
    background-repeat: no-repeat;
    background-size: contain;
    animation: bling 0.8s ease-in-out infinite alternate;
  }
  &::before {
    top: 0px;
    left: 0;
  }
  &::after {
    bottom: 0px;
    right: 0;
    animation-delay: 1s;
    @include min-lg {
      left: 40%;
    }
  }

  @keyframes bling {
    to {
      transform: scale(0.4);
    }
  }
  .swiper-wrapper {
    position: static !important;
  }
  .swiper-slide {
    display: flex;
    align-items: center;
    transform: scale(0.95);
  }
  .today-card {
    display: flex;
    flex-direction: column;
    @include min-lg {
      flex-direction: row;
    }
    &-title {
      font-size: 1.5rem;
    }
    &-content {
      margin-top: 12px;
      display: -webkit-box;
      @include min-lg {
        margin-top: 40px;
      }
    }
    &-price {
      display: flex;
    }
    &-img {
      margin-right: 20px;
      padding: 0 60px;
      object-position: top right;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
