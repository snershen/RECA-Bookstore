<template>
  <Loading :active="isLoading">
    <div class="loading-box">
      <img src="@/assets/img/icons8-book4.gif" alt="" />
    </div>
  </Loading>
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
          <a href="#" class="btn btn-outline-dark rounded-pill px-3 fs-5"># {{ item }}</a>
        </li>
      </ul>
    </div>
  </div>
  <div class="container">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="fs-2 fw-bold">最新出版</h2>
        <p class="fw-bold fs-6">NEW RELEASES</p>
      </div>
      <a href="#" class="rounded-0 more-btn"
        >more
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
          <path
            d="M7.78651 0.189649C7.81654 -0.0632164 8.18346 -0.0632164 8.21349 0.189649L8.4652 2.31096C8.79021 5.05015 10.9499 7.20979 13.689 7.53481L15.8103 7.78651C16.0632 7.81654 16.0632 8.18346 15.8103 8.21349L13.689 8.4652C10.9499 8.79021 8.79021 10.9499 8.4652 13.689L8.21349 15.8103C8.18346 16.0632 7.81654 16.0632 7.78651 15.8103L7.53481 13.689C7.20979 10.9499 5.05015 8.79021 2.31096 8.4652L0.189649 8.21349C-0.0632164 8.18346 -0.0632164 7.81654 0.189649 7.78651L2.31096 7.53481C5.05015 7.20979 7.20979 5.05015 7.53481 2.31096L7.78651 0.189649Z"
          /></svg
      ></a>
    </div>
    <productCard
      :colConfig="{ colClass: 'col-lg-2 col-md-4 col-6', products: products }"
    ></productCard>
  </div>
  <div class="bookstore-bg text-center">
    <h3 class="fs-1 text-white mb-4">開啟屬於你的閱讀旅程</h3>
    <router-link to="/user/products" class="btn btn-outline-light rounded-pill fs-5 px-5"
      >探索書店</router-link
    >
  </div>
</template>

<script>
import ProductCard from '../../components/ProductCard.vue'
import Banner from '../../components/Banner.vue'
import { userGetProduct } from '../../utils/apis'
import loadingMixin from '../../mixins/loadingMixin'

export default {
  data() {
    return {
      categoryList: [],
      products: []
    }
  },
  components: {
    ProductCard,
    Banner
  },
  mixins: [loadingMixin],
  methods: {
    getProduct() {
      this.startLoading()
      userGetProduct().then((res) => {
        // console.log(res)
        this.stopLoading()
        const category = {}
        const productList = res.data.products
        productList.forEach((item) => {
          // console.log(item)
          if (!category[item.category]) {
            category[item.category] = 1
          }
        })
        console.log(category)
        this.products = productList
        this.categoryList = Object.keys(category)
      })
    }
  },
  created() {
    this.getProduct()
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
