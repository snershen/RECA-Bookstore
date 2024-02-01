<template>
  <main>
    <section class="banner py-6">
      <h1 class="banner-title text-center fw-bold">踏上探索之旅<br />尋找屬於自己的命定之書</h1>
      <p class="banner-subtitle text-center mt-2 fs-4 text-white">上萬本書籍等待你的閱讀</p>
      <div class="container">
        <swiper-container init="false" ref="bannerSwiper" class="container banner-swiper pt-5">
          <swiper-slide
            v-for="item in productList"
            :key="`banner${item.id}`"
            class="h-auto d-flex justify-content-center"
            lazy="true"
          >
            <RouterLink :to="`/products/${item.id}`">
              <img
                :src="item.imageUrl"
                :alt="item.title"
                class="w-100 h-100 object-fit-contain"
                loading="lazy"
              />
            </RouterLink>
          </swiper-slide>
        </swiper-container>
      </div>
    </section>

    <section class="container py-6">
      <div class="d-flex justify-content-between align-items-center">
        <h2 class="fw-bold fs-2">今日熱門</h2>
        <RouterLink :to="{ name: 'products' }">
          <BtnMore />
        </RouterLink>
      </div>
      <div class="position-relative">
        <swiper-container init="false" ref="todaySwiper" class="container swiper-today my-5">
          <swiper-slide v-for="item in productList" :key="`today${item.id}`" class="h-auto">
            <div class="today-card">
              <div class="today-card-img mb-3">
                <img
                  :src="item.imageUrl"
                  :alt="item.title"
                  class="w-100 h-100 object-fit-contain"
                />
              </div>
              <div class="flex-grow-1 w-100">
                <h4
                  class="today-card-title fw-bold text-overflow-1 flex-grow-1 mb-1 text-center text-lg-start"
                >
                  {{ item.title }}
                </h4>
                <p class="text-gray text-overflow-1 text-center text-lg-start">{{ item.author }}</p>
                <div
                  class="today-card-price align-items-center align-items-lg-start justify-content-center justify-content-lg-start flex-lg-column"
                >
                  <div class="d-flex align-items-center">
                    <p class="fw-bold me-2 fs-3">${{ item.price }}</p>
                    <del class="fs-7 text-gray"> ${{ item.origin_price }} </del>
                  </div>
                </div>
                <p
                  class="today-card-content text-overflow-4 text-center text-lg-start"
                  v-html="item.content"
                ></p>
                <RouterLink :to="`/products/${item.id}`" class="stretched-link"></RouterLink>
              </div>
            </div>
          </swiper-slide>
        </swiper-container>
      </div>
    </section>

    <section class="bg-primary-light py-6">
      <div class="container">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2 class="fw-bold fs-2">最新出版</h2>
          <RouterLink :to="{ name: 'products' }">
            <BtnMore />
          </RouterLink>
        </div>
        <Tabs />
        <div class="position-relative">
          <swiper-container init="false" ref="publishSwiper" class="container px-5">
            <swiper-slide
              v-for="item in productList"
              :key="`publish${item.id}`"
              class="h-auto d-flex justify-content-center my-5"
            >
              <ProductCard :item="item" />
            </swiper-slide>
          </swiper-container>
        </div>
      </div>
    </section>

    <section class="container py-6">
      <h2 class="fw-bold fs-2 mb-5">暢銷排行</h2>
      <div class="row">
        <div class="col-lg-3">
          <swiper-container
            class="container rank-swiper"
            init="false"
            ref="rankSwiper"
            thumbs-swiper="#rank-thumbs"
          >
            <swiper-slide
              v-for="(item, index) in productList"
              :key="`publish${index}`"
              :data-index="index + 1"
            >
              <div class="border-bottom py-2 text-truncate">
                <span class="me-2 rank-number">{{ index + 1 }}</span> {{ item.title }}
              </div>
            </swiper-slide>
          </swiper-container>
        </div>
        <div class="col-lg-9">
          <swiper-container
            init="false"
            ref="rankContentSwiper"
            class="container rank-content-swiper"
            id="rank-thumbs"
          >
            <swiper-slide v-for="(item, index) in productList">
              <div class="rank-card d-flex flex-column flex-md-row position-relative">
                <div class="rank-card-img mb-3 mb-lg-0">
                  <img :src="item.imageUrl" :alt="item.title" class="w-100 object-fit-contain" />
                </div>
                <div class="flex-grow-1 w-100">
                  <h4
                    class="fs-4 fs-lg-3 rank-card-title fw-bold text-overflow-2 flex-grow-1 text-center text-md-start"
                  >
                    {{ item.title }}
                  </h4>
                  <div
                    class="rank-card-price align-items-center align-items-md-start justify-content-center justify-content-lg-start flex-column mb-3"
                  >
                    <p class="text-gray mb-1">{{ item.author }}</p>
                    <div class="d-flex align-items-center">
                      <p class="fw-bold me-2 fs-3">${{ item.price }}</p>
                      <del class="fs-7 text-gray"> ${{ item.origin_price }} </del>
                    </div>
                  </div>
                  <p class="today-card-content text-overflow-4" v-html="item.content"></p>
                  <RouterLink :to="`/products/${item.id}`" class="stretched-link"></RouterLink>
                </div>
              </div>
            </swiper-slide>
          </swiper-container>
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
          <li class="col-md-4" v-for="item in articleList" :key="item.id">
            <ArticleCard :article="item" />
          </li>
        </ul>
      </div>
    </section>

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
// import { Thumbs } from 'swiper/modules'
import { Navigation, Pagination, Scrollbar, Autoplay, FreeMode, Thumbs } from 'swiper/modules'

export default {
  data() {
    return {
      // modules: [Navigation, Pagination, Scrollbar, Autoplay, FreeMode],
      bannerSwiper: {
        spaceBetween: 60,
        centeredSlides: true,
        breakpoints: {
          576: {
            slidesPerView: 1
          },
          768: {
            slidesPerView: 3
          },
          1024: {
            slidesPerView: 5
          }
        }
      },
      todaySwiper: {
        slidesPerView: 1,
        spaceBetween: 0,
        navigation: true,
        breakpoints: {
          576: {
            slidesPerView: 1
          },
          1024: {
            slidesPerView: 6
          },
          1300: {
            slidesPerView: 6
          }
        }
      },
      publishSwiper: {
        slidesPerView: 1,
        spaceBetween: 18,
        scrollbar: true,
        navigation: true,
        breakpoints: {
          576: {
            slidesPerView: 1
          },
          768: {
            slidesPerView: 3
          },
          1024: {
            slidesPerView: 4
          },
          1400: {
            slidesPerView: 6
          }
        }
      },
      rankSwiper: {
        slidesPerView: 5,
        direction: 'vertical',
        watchSlidesProgress: true,
        autoScrollOffset: 1,
        breakpoints: {
          576: {
            slidesPerView: 1
          },
          1024: {
            slidesPerView: 5
          }
        }
      },
      rankContentSwiper: {
        modules: [Thumbs],
        slidesPerView: 1
      }
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
    initializeSwiper(el, config) {
      const swiperEl = el
      const params = {
        autoplay: true,
        loop: true,
        injectStylesUrls: ['./custom_swiper.css'],
        ...config
      }
      Object.assign(swiperEl, params)
      swiperEl.initialize()
    }
  },
  created() {
    this.getProducts()
    this.getArticles()
    this.getProductAll()
  },
  mounted() {
    setTimeout(() => {
      this.initializeSwiper(this.$refs.bannerSwiper, this.bannerSwiper)
      this.initializeSwiper(this.$refs.todaySwiper, this.todaySwiper)
      this.initializeSwiper(this.$refs.publishSwiper, this.publishSwiper)
      this.initializeSwiper(this.$refs.rankSwiper, this.rankSwiper)
      this.initializeSwiper(this.$refs.rankContentSwiper, this.rankContentSwiper)
    }, 500)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/mixin';

.banner {
  background-image: url('../../assets/img/banner-bg.png');
  background-position: center;
  background-size: cover;
  &-title {
    font-size: 2rem;
    color: #c9a65c;
    @include min-lg {
      font-size: 3.625rem;
    }
  }
  &-subtitle {
    letter-spacing: 9px;
  }
  img {
    max-height: 300px;
  }
  .swiper-slide {
    padding: 30px 0;
    transition: transform 0.5s;
    opacity: 0.8;
  }
  .swiper-slide-active {
    transform: scale(1.2);
    opacity: 1;
  }
}

.swiper-today {
  padding-left: 60px;
  padding-right: 60px;
  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    transform-origin: bottom center;
    transition: 0.3s;
    padding-left: 30px;
  }
  .today-card {
    &-title {
      font-size: 1.1rem;
    }
    &-content {
      @include min-lg {
        display: none;
      }
    }
    &-price {
      @include min-lg {
        display: none;
      }
    }
    &-img {
      height: 240px;
    }
  }
  .swiper-slide-active {
    @include min-lg {
      width: 50% !important;
      height: 300px;
    }
    .today-card {
      display: flex;
      flex-direction: column;
      // max-width: 240px;
      padding-right: 40px;
      padding-left: 40px;
      @include min-lg {
        padding: 0;
        flex-direction: row;
        min-width: 100%;
      }
      &-title {
        font-size: 1.2rem;
        @include min-lg {
          font-size: 1.5rem;
        }
      }
      &-price {
        display: flex;
        margin: 0;
        @include min-lg {
          margin-bottom: 60px;
        }
      }
      &-content {
        display: -webkit-box;
        @include min-lg {
          margin-top: 40px;
        }
      }
      &-img {
        @include min-lg {
          height: 400px;
          width: 100%;
          padding-right: 20px;
        }
      }
      img {
        @include min-lg {
          object-position: top right;
          max-height: 500px;
          object-position: top;
          width: 100%;
        }
      }
    }
  }
}

.rank-swiper {
  height: 50px;
  margin-bottom: 40px;
  @include min-lg {
    height: 300px;
  }
  .swiper-slide {
    cursor: pointer;
    @for $i from 1 through 3 {
      &[data-index='#{$i}'] .rank-number {
        background-image: url('../../assets/img/deco-crown.svg');
        background-size: contain;
        background-position: center 30%;
        background-repeat: no-repeat;
        color: white;
      }
    }
    @for $i from 1 through 9 {
      &[data-index='#{$i}'] .rank-number::before {
        content: '0';
      }
    }
    .rank-number {
      padding: 10px;
      padding-top: 16px;
      font-size: 0.875rem;
    }
  }
  .swiper-slide-active {
    font-weight: bold;
  }
}

.rank-content-swiper {
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
    left: 10%;
    @include min-lg {
      top: -40px;
      left: -20px;
    }
  }
  &::after {
    bottom: 50%;
    right: 10%;
    animation-delay: 1s;

    @include min-lg {
      bottom: -40px;
      left: 32%;
    }
  }

  @keyframes bling {
    to {
      transform: scale(0.4);
    }
  }
  .swiper-slide {
    position: relative;
    display: flex;
    align-items: center;
    transform: scale(0.95);
  }
  .rank-card {
    // padding: 60px 0;
    @include min-lg {
      padding: 0;
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
      // padding: 0 60px;
      object-position: top right;
    }
    img {
      max-height: 300px;
      @include min-lg {
        max-height: 100%;
      }
    }
  }
}

.bookstore-bg {
  padding-top: 120px;
  padding-bottom: 120px;
  background-image: url('../../assets/img/bookstore-bg2.png');
  background-attachment: fixed;
}
</style>
