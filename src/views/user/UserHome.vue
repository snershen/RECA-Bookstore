<template>
  <LoadingComponent></LoadingComponent>
  <main class="mb-5">
    <div class="mt-5">
      <h1 class="mt-5 fw-bold">尋找屬於自己的<span>命定之書</span></h1>
      <p class="text-center mt-2 fs-4">上萬本書籍等待你的閱讀</p>
    </div>
    <Banner></Banner>
  </main>
  <div class="bg-light">
    <div class="container">
      <ul class="d-flex gap-3 mb-5 py-4">
        <li v-for="item in categoryList">
          <a href="#" class="btn btn-outline-secondary rounded-pill px-3 fs-5"># {{ item }}</a>
        </li>
      </ul>
    </div>
  </div>
  <section class="container py-5 my-5">
    <div class="mb-5">
      <div class="text-center">
        <h2 class="fs-1 fw-bold">最新出版</h2>
        <p class="fw-bold fs-6">NEW RELEASES</p>
      </div>
    </div>
    <swiper
      :modules="modules"
      :slides-per-view="slidesPerView"
      :space-between="20"
      navigation
      @swiper="onSwiper"
      @slideChange="onSlideChange"
      class="h-100 mb-5"
      :autoplay="true"
    >
      <swiper-slide v-for="item in productList" class="h-auto">
        <product-card :item="item"></product-card>
      </swiper-slide>
    </swiper>
    <div class="text-center">
      <a href="#" class="rounded-0 more-btn"
        >more
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
          <path
            d="M7.78651 0.189649C7.81654 -0.0632164 8.18346 -0.0632164 8.21349 0.189649L8.4652 2.31096C8.79021 5.05015 10.9499 7.20979 13.689 7.53481L15.8103 7.78651C16.0632 7.81654 16.0632 8.18346 15.8103 8.21349L13.689 8.4652C10.9499 8.79021 8.79021 10.9499 8.4652 13.689L8.21349 15.8103C8.18346 16.0632 7.81654 16.0632 7.78651 15.8103L7.53481 13.689C7.20979 10.9499 5.05015 8.79021 2.31096 8.4652L0.189649 8.21349C-0.0632164 8.18346 -0.0632164 7.81654 0.189649 7.78651L2.31096 7.53481C5.05015 7.20979 7.20979 5.05015 7.53481 2.31096L7.78651 0.189649Z"
          /></svg
      ></a>
    </div>
  </section>
  <section class="bg-light py-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-4">
          <h2 class="fw-bold fs-1 pt-4 mb-4">編輯推薦</h2>
          <div>
            <router-link to="/user/article" class="rounded-0 more-btn"
              >more
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                <path
                  d="M7.78651 0.189649C7.81654 -0.0632164 8.18346 -0.0632164 8.21349 0.189649L8.4652 2.31096C8.79021 5.05015 10.9499 7.20979 13.689 7.53481L15.8103 7.78651C16.0632 7.81654 16.0632 8.18346 15.8103 8.21349L13.689 8.4652C10.9499 8.79021 8.79021 10.9499 8.4652 13.689L8.21349 15.8103C8.18346 16.0632 7.81654 16.0632 7.78651 15.8103L7.53481 13.689C7.20979 10.9499 5.05015 8.79021 2.31096 8.4652L0.189649 8.21349C-0.0632164 8.18346 -0.0632164 7.81654 0.189649 7.78651L2.31096 7.53481C5.05015 7.20979 7.20979 5.05015 7.53481 2.31096L7.78651 0.189649Z"
                /></svg
            ></router-link>
          </div>
        </div>
        <div class="col-lg-8">
          <ul class="row">
            <li v-for="item in articleList" class="col-12">
              <div>
                <ArticleCard :article="item"></ArticleCard>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
  <div class="bookstore-bg text-center">
    <h3 class="fs-1 text-white mb-4">開啟屬於你的閱讀旅程</h3>
    <router-link to="/user/products" class="btn btn-outline-light rounded-pill fs-5 px-5"
      >探索書店</router-link
    >
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import productStore from '@/stores/product.js'
import articleStore from '@/stores/article.js'

import LoadingComponent from '@/components/Loading.vue'
import Banner from '../../components/Banner.vue'
import ProductCard from '../../components/ProductCard.vue'
import ArticleCard from '../../components/ArticleCard.vue'

import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

export default {
  data() {
    return {
      // products: [],
      newestProduct: [],
      slidesPerView: 6,
      modules: [Navigation, Pagination, Scrollbar, A11y, Autoplay]
    }
  },
  components: {
    ProductCard,
    Banner,
    ArticleCard,
    Swiper,
    SwiperSlide,
    LoadingComponent
  },

  computed: {
    ...mapState(productStore, ['productList', 'categoryList']),
    ...mapState(articleStore, ['articleList'])
  },

  methods: {
    ...mapActions(productStore, ['getProducts']),
    ...mapActions(articleStore, ['getArticles']),
    updateSlidesPerView() {
      const screenWidth = window.innerWidth
      if (screenWidth <= 576) {
        this.slidesPerView = 1
      } else if (screenWidth <= 768) {
        this.slidesPerView = 2
      } else if (screenWidth <= 992) {
        this.slidesPerView = 3
      } else if (screenWidth <= 1200) {
        this.slidesPerView = 4
      } else {
        this.slidesPerView = 6
      }
    }
  },
  created() {
    this.getProducts()
    this.getArticles()
  },
  mounted() {
    // 在组件挂载时初始化 slides-per-view
    this.updateSlidesPerView()

    // 监听窗口大小变化，动态更新 slides-per-view
    window.addEventListener('resize', this.updateSlidesPerView)
  }
}
</script>

<style scoped>
h1 {
  margin: 0;
  padding-top: 30px;
  color: #1c1c1c;
  /* position: absolute; */
  /* z-index: -10; */
  /* top: 0; */
  text-align: center;
  /* width: 100%; */
  /* font-family: 'Noto sans TC', sans-serif; */
  /*   font-family: serif; */
  letter-spacing: 2px;
  font-size: 3rem;
  font-weight: 900;
}

h1 span {
  position: relative;
}

h1 span::after {
  content: '';
  position: absolute;
  bottom: 10px;
  display: inline-block;
  height: 20px;
  width: 0%;
  left: 0;
  z-index: -1;
  background: #ffae63;
  animation: stretch 3s infinite linear;
}

@keyframes stretch {
  30% {
    width: 100%;
  }

  100% {
    width: 100%;
  }
}

.bookstore-bg {
  padding-top: 100px;
  padding-bottom: 100px;
  background: url('../../assets/img/bookstore-bg.png');
  background-attachment: fixed;
}

.more-btn {
  border-top: 1px solid;
  border-bottom: 1px solid;
  padding-right: 12px;
  padding-left: 12px;
}

.more-btn:hover {
  color: white;
  background: black;
}

.more-btn:hover path {
  fill: white;
}
</style>
