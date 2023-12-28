<template>
  <LoadingComponent></LoadingComponent>
  <div class="container mb-5 pb-5">
    <div class="mb-lg-5 mb-3 ps-2">
      <h1
        class="fw-bold"
        v-if="selectedCategory === '全部' && searchResult.length === 0 && !isEmptyResult"
      >
        全部書籍
      </h1>
      <h1
        class="fw-bold"
        v-else-if="searchResult.length === 0 && filterResult.length !== 0 && !isEmptyResult"
      >
        分類：{{ selectedCategory }}
      </h1>
      <h1 class="fw-bold" v-else-if="searchResult.length !== 0 && !isEmptyResult">
        "{{ searchString }}"搜尋結果
        <span class="fs-4 ms-4">共有 {{ searchResult.length }} 筆商品符合</span>
      </h1>
      <h1 class="fw-bold" v-else-if="isEmptyResult">
        "{{ searchString }}" 搜尋結果
        <span class="fs-4 ms-4">查無商品符合</span>
      </h1>
    </div>
    <div class="row">
      <div class="col-lg-3 mb-5 mb-lg-0">
        <product-category></product-category>
      </div>
      <div class="col-lg-9">
        <ul
          class="row g-3"
          v-if="searchResult.length === 0 && !isEmptyResult && filterResult.length === 0"
        >
          <li v-for="item in productList" class="col-lg-3 col-6 d-flex">
            <product-card :item="item"></product-card>
          </li>
        </ul>
        <ul
          class="row g-3"
          v-else-if="searchResult.length === 0 && filterResult.length !== 0 && !isEmptyResult"
        >
          <li v-for="item in filterResult" class="col-lg-3 col-6 d-flex">
            <product-card :item="item"></product-card>
          </li>
        </ul>
        <ul class="row g-3" v-else-if="searchResult.length !== 0 && !isEmptyResult">
          <li v-for="item in searchResult" class="col-lg-3 col-6 d-flex">
            <product-card :item="item"></product-card>
          </li>
        </ul>
        <div class="text-center py-3" v-else-if="isEmptyResult">
          <div class="fw-bold mb-5">
            <p>喔不，沒有找到任何相關書籍</p>
            <p class="fs-2 mb-4">請再次輸入，火速為您尋找</p>
            <button
              type="button"
              class="btn btn-dark rounded-pill px-3"
              @click="filterProduct('全部')"
            >
              瀏覽全部書籍
            </button>
          </div>
          <img src="@/assets/img/noResult.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCategory from '../../components/ProductCategory.vue'
import ProductCard from '../../components/ProductCard.vue'

import LoadingComponent from '@/components/Loading.vue'

import { mapState, mapActions } from 'pinia'
import productStore from '@/stores/product.js'

export default {
  components: {
    ProductCategory,
    ProductCard,
    LoadingComponent
  },

  computed: {
    ...mapState(productStore, [
      'productList',
      'filterResult',
      'searchResult',
      'searchString',
      'selectedCategory',
      'isEmptyResult'
    ])
  },

  methods: {
    ...mapActions(productStore, ['getProducts', 'filterProduct'])
  },

  created() {
    this.getProducts()
  }
}
</script>
