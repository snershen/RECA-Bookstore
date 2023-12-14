<template>
  <Loading :active="isLoading">
    <div class="loading-box">
      <img src="@/assets/img/icons8-book4.gif" alt="" />
    </div>
  </Loading>
  <div class="container mb-5">
    <breadcrumb
      :breadConfig="{ navList: '書籍類別', path: 'products', title: singleProduct.title }"
    ></breadcrumb>
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
          <div>
            <a href="#" class="btn btn-dark w-100 py-3 rounded-0 mb-2" @click.prevent="addCart"
              ><font-awesome-icon
                :icon="['fas', 'cart-shopping']"
                class="fa-lg text-white me-2"
              />放入購物車</a
            ><br />
            <a href="#" class="btn btn-outline-dark w-100 py-3 rounded-0">加入收藏</a>
          </div>
        </div>
        <div class="offset-lg-2 col-8 py-5">
          <h2 class="fs-4 fw-bold mb-3">本書介紹</h2>
          <p>{{ singleProduct.description }}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-light py-5" v-if="products.length !== 0">
    <h2 class="text-center fw-bold mb-4">瀏覽更多書籍</h2>
    <div class="container">
      <product-card
        :colConfig="{ colClass: 'col-lg-2 col-md-4 col-6', products: products }"
      ></product-card>
    </div>
  </div>
</template>

<script>
import { userGetSingleProduct } from '../../utils/apis'
import { userGetProduct } from '../../utils/apis'
import { userPostCart } from '../../utils/apis'

import productCard from '../../components/ProductCard.vue'
import breadcrumb from '../../components/Breadcrumb.vue'
import loadingMixin from '../../mixins/loadingMixin'
import toastMixin from '../../mixins/toastMixin'
import Breadcrumb from '../../components/Breadcrumb.vue'

export default {
  data() {
    return {
      singleProduct: {},
      products: []
    }
  },
  components: { productCard, breadcrumb },
  mixins: [toastMixin, loadingMixin],
  methods: {
    getProduct() {
      userGetProduct().then((res) => {
        const productsArr = res.data.products
        const result = productsArr.filter((item) => {
          if (item.id !== this.singleProduct.id) {
            return item.category === this.singleProduct.category
          }
        })
        this.products = result
      })
    },
    getSingleProduct() {
      const path = this.$route.path
      const pathArr = path.split('/')
      const id = pathArr[pathArr.length - 1]
      this.startLoading()
      userGetSingleProduct(id).then((res) => {
        this.stopLoading()
        this.singleProduct = res.data.product
        this.getProduct()
      })
    },
    addCart() {
      const target = {
        data: {
          product_id: this.singleProduct.id,
          qty: 1
        }
      }
      userPostCart(target).then((res) => {
        // console.log(res)
        this.showToast({
          title: '成功加入購物車',
          icon: 'success'
        })
      })
    }
  },

  created() {
    this.getSingleProduct()
  }
}
</script>

<style scoped>
.book-img {
  width: 70%;
}
</style>
