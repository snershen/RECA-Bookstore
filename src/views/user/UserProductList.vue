<template>
  <Loading :active="isLoading">
    <div class="loading-box">
      <img src="@/assets/img/icons8-book4.gif" alt="" />
    </div>
  </Loading>
  <div class="container mb-5">
    <h1 class="fw-bold mb-4 ps-2">全部書籍</h1>
    <div class="row">
      <div class="col-3">
        <product-category
          :inner-productList="products"
          @filter-product="getProduct"
        ></product-category>
      </div>
      <div class="col-9">
        <ul class="row g-3">
          <li v-for="item in products" class="col-3 d-flex">
            <product-card :item="item"></product-card>
          </li>
        </ul>
        <!-- <product-card
          v-if="searchResult.length !== 0"
          :colConfig="{ colClass: 'col-lg-3 col-md-4 col-6', products: searchResult }"
        ></product-card> -->
      </div>
    </div>
  </div>
</template>

<script>
import ProductCategory from '../../components/ProductCategory.vue'
import ProductCard from '../../components/ProductCard.vue'

import { userGetProduct } from '../../utils/apis.js'
import loadingMixin from '../../mixins/loadingMixin'

export default {
  data() {
    return {
      products: [],
      filterProduct: [],
      searchResult: [],
      searchStr: ''
    }
  },

  mixins: [loadingMixin],

  components: {
    ProductCategory,
    ProductCard
  },

  methods: {
    //取得所有產品
    getProduct(category) {
      this.startLoading()
      userGetProduct().then((res) => {
        this.stopLoading()
        if (res.data.success) {
          // const productList = res.data.products
          const allProducts = res.data.products
          this.products = allProducts
          this.pagination = res.data.pagination
          if (category === '全部') {
            this.filterProduct = allProducts
          } else {
            const filterArr = [...allProducts].filter((item) => {
              return item.category === category
            })
            this.filterProduct = filterArr
          }
          console.log(this.products)
          console.log(allProducts)
        }
      })
    },
    filterProducts() {
      const searchStr = this.$route.fullPath.split('=')
      console.log(searchStr)
      this.searchStr = searchStr[searchStr.length - 1]
      const filterResult = this.products.filter((item) => {
        return item.title.includes(this.searchStr)
      })
      this.searchResult = filterResult
      console.log(this.searchResult)
    }
  },

  created() {
    this.getProduct('全部')
  }
}
</script>
