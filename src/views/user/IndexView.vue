<template>
  <LoadingComponent :isLoading="indexLoading" />
  <main>
    <section class="banner py-6 vh-100">
      <h1 class="banner-title text-center fw-bold pt-lg-4">
        踏上探索之旅<br />尋找屬於自己的命定之書
      </h1>
      <p class="banner-subtitle text-center mt-2 fs-4 text-white">上萬本書籍等待你的閱讀</p>
      <div class="container">
        <swiper-container init="false" ref="bannerSwiper" class="container banner-swiper pt-5">
          <swiper-slide
            v-for="item in filterFeature"
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
          <swiper-slide v-for="item in filterToday" :key="`today${item.id}`" class="h-auto">
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
                  class="today-card-title fw-bold text-overflow-2 flex-grow-1 mb-1 text-center text-lg-start"
                  v-html="item.title"
                ></h4>
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
        <TabsComponent />
        <div class="position-relative">
          <swiper-container init="false" ref="publishSwiper" class="container px-5">
            <swiper-slide
              v-for="item in filterResult"
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
          <template v-if="rankList.length > 9">
            <swiper-container
              class="container rank-swiper"
              init="false"
              ref="rankSwiper"
              thumbs-swiper="#rank-thumbs"
            >
              <swiper-slide
                v-for="(item, index) in rankList"
                :key="`publish${index}`"
                :data-index="index + 1"
              >
                <div class="border-bottom py-2 text-truncate">
                  <span class="me-2 rank-number">{{ index + 1 }}</span>
                  {{ item.product.title }}
                </div>
              </swiper-slide>
            </swiper-container>
          </template>
          <template v-else>
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
                  <span class="me-2 rank-number">{{ index + 1 }}</span>
                  {{ item.title }}
                </div>
              </swiper-slide>
            </swiper-container>
          </template>
        </div>

        <div class="col-lg-9 rank-outer">
          <template v-if="rankList.length > 9">
            <swiper-container
              init="false"
              ref="rankContentSwiper"
              class="container rank-content-swiper"
              id="rank-thumbs"
            >
              <swiper-slide v-for="(item, index) in rankList" :key="`rand${index}`">
                <div
                  class="rank-card d-flex flex-column flex-md-row position-relative text-center text-lg-start"
                >
                  <div class="rank-card-img mb-3 mb-lg-0">
                    <img
                      :src="item.product.imageUrl"
                      :alt="item.product.title"
                      class="w-100 object-fit-contain"
                    />
                  </div>
                  <div class="flex-grow-1 w-100">
                    <h4
                      class="fs-4 fs-lg-3 rank-card-title fw-bold text-overflow-2 flex-grow-1 text-center text-md-start"
                    >
                      {{ item.product.title }}
                    </h4>
                    <div
                      class="rank-card-price align-items-center align-items-md-start justify-content-center justify-content-lg-start flex-column mb-3"
                    >
                      <p class="text-gray mb-1">{{ item.product.author }}</p>
                      <div class="d-flex align-items-center">
                        <p class="fw-bold me-2 fs-3">${{ item.product.price }}</p>
                        <del class="fs-7 text-gray"> ${{ item.product.origin_price }} </del>
                      </div>
                    </div>
                    <p class="today-card-content text-overflow-4 text-center text-md-start" v-html="item.product.content"></p>
                    <RouterLink
                      :to="`/products/${item.product.id}`"
                      class="stretched-link"
                    ></RouterLink>
                  </div>
                </div>
              </swiper-slide>
            </swiper-container>
          </template>
          <template v-else>
            <swiper-container
              init="false"
              ref="rankContentSwiper"
              class="container rank-content-swiper"
              id="rank-thumbs"
            >
              <swiper-slide v-for="(item, index) in productList" :key="`rank${index}`">
                <div
                  class="rank-card d-flex flex-column flex-md-row position-relative text-center text-lg-start"
                >
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
                    <p class="today-card-content text-overflow-4 text-center text-md-start" v-html="item.content"></p>
                    <RouterLink :to="`/products/${item.id}`" class="stretched-link"></RouterLink>
                  </div>
                </div>
              </swiper-slide>
            </swiper-container>
          </template>
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

    <section class="bookstore-bg text-center">
      <h3 class="fs-lg-1 fs-2 fw-bold text-primary mb-3">開啟屬於你的閱讀旅程</h3>
      <router-link
        :to="{ name: 'products' }"
        class="btn btn-outline-light rounded-pill fs-6 px-4 py-2"
      >
        探索書店
        <font-awesome-icon :icon="['fas', 'chevron-right']" class="ms-2 fa-sm" />
      </router-link>
    </section>
  </main>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useProductStore } from '@/stores/product.js'
import articleStore from '@/stores/article.js'
import adminOrderStore from '@/stores/admin/order.js'
import { userGetSingleArticle } from '@/assets/js/apis'

import ProductCard from '@/components/user/ProductCard.vue'
import ArticleCard from '@/components/user/ArticleCard.vue'
import LoadingComponent from '@/components/LoadingComponent.vue'
import TabsComponent from '@/components/user/TabsComponent.vue'
import BtnMore from '@/components/user/BtnMore.vue'

// import SwiperCore from 'swiper'
import { SwiperSlide } from 'swiper/vue'
// import { Thumbs } from 'swiper/modules'
import { Thumbs } from 'swiper/modules'

export default {
  data() {
    return {
      rankList: [],
      indexLoading: false,
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
        spaceBetween: 20,
        navigation: true,
        loop: true,
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
        loop: false,
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
        slidesPerView: 1,
        direction: 'vertical',
        watchSlidesProgress: true,
        autoScrollOffset: 1,
        observer: true,
        observeParents: true,
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
        observer: true,
        observeParents: true,
        slidesPerView: 1
      }
    }
  },

  components: {
    ProductCard,
    ArticleCard,
    TabsComponent,
    BtnMore,
    LoadingComponent,
    // Swiper,
    SwiperSlide
  },

  computed: {
    filterToday() {
      // eslint-disable-next-line array-callback-return
      return useProductStore().productAll.sort((a, b) => {
        if (a.time && b.time) {
          return b.time.localeCompare(a.time)
        }
      })
    },
    filterFeature() {
      return useProductStore().productAll.filter((item) => {
        return item.is_feature
      })
    },
    ...mapState(useProductStore, ['productList', 'categoryList', 'filterResult', 'isLoading']),
    ...mapState(articleStore, ['articleList']),
    ...mapState(adminOrderStore, ['sortSoldNum'])
  },

  methods: {
    ...mapActions(articleStore, ['getArticles']),
    initializeSwiper(el, config) {
      const swiperEl = el
      const params = {
        observer: true,
        observeParents: true,
        loop: true,
        autoplay: true,
        injectStylesUrls: ['./custom_swiper.css'],
        ...config
      }
      Object.assign(swiperEl, params)
      swiperEl.initialize()
    },
    async getRankArticle() {
      try {
        const res = await userGetSingleArticle('-NrQ8wc--1weD4FTHjHH')
        const content = res.data.article.content
        const result = JSON.parse(content)
        this.rankList = result
      } catch (err) {
        console.error(err)
        this.rankList = this.productList
      }
    }
  },

  async mounted() {
    this.indexLoading = true
    try {
      await Promise.all([
        useProductStore().getProducts(),
        this.getArticles(),
        useProductStore().getProductAll(),
        this.getRankArticle()
      ])
    } catch (error) {
      console.error('An error occurred during Promise.all:', error)
    }

    this.indexLoading = true
    this.initializeSwiper(this.$refs.bannerSwiper, this.bannerSwiper)
    this.initializeSwiper(this.$refs.todaySwiper, this.todaySwiper)
    this.initializeSwiper(this.$refs.publishSwiper, this.publishSwiper)
    this.initializeSwiper(this.$refs.rankSwiper, this.rankSwiper)
    this.initializeSwiper(this.$refs.rankContentSwiper, this.rankContentSwiper)
    this.indexLoading = false
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixin';

::-webkit-scrollbar {
  display: none;
}

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
    max-height: 250px;
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

:deep(.swiper-today) {
  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    transform-origin: bottom center;
    transition: 0.3s;
  }
  .today-card {
    height: 500px;
    @include min-lg {
      height: 400px;
    }
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
      margin-right: 40px;
      margin-left: 40px;
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

.rank-outer{
  @include min-lg{
    height: 300px;
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
    left: -20px;
    @include min-lg {
      top: -60px;
      left: -20px;
    }
  }
  &::after {
    bottom: 30%;
    right: 0;
    animation-delay: 1s;

    @include min-lg {
      left: 35%;
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
    height: 500px;
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
