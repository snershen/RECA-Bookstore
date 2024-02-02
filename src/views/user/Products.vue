<template>
  <div class="container py-5">
    <div class="mb-3 ps-2">
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
        "{{ searchString }}" 搜尋結果<br />
        <span class="fs-4">共有 {{ searchResult.length }} 筆商品符合</span>
      </h1>
      <h1 class="fw-bold" v-else-if="isEmptyResult">
        "{{ searchString }}" 搜尋結果<br />
        <span class="fs-4">查無商品符合</span>
      </h1>
    </div>

    <div class="row">
      <div class="col-lg-3"></div>
      <div class="col-lg-9">
        <div class="d-flex justify-content-end mb-3">
          <button
            type="button"
            class="sort-btn btn border-0"
            :class="{ active: sortTarget === 'time' }"
            @click="sortProduct('time')"
          >
            出版日期
            <template v-if="sortTarget === 'time'">
              <span v-if="!sortStatus">由新到舊</span>
              <span v-else>由舊到新 </span>
            </template>
          </button>
          <button
            type="button"
            class="sort-btn btn border-0"
            @click="sortProduct('price')"
            :class="{ active: sortTarget === 'price' }"
          >
            價格
            <template v-if="sortTarget === 'price'">
              <span v-if="!sortStatus">由高到低</span>
              <span v-else>由低到高 </span>
            </template>
          </button>
          <button
            type="button"
            class="sort-btn btn border-0"
            @click="sortProduct('soldNum')"
            :class="{ active: sortTarget === 'soldNum' }"
          >
            暢銷度
            <template v-if="sortTarget === 'soldNum'">
              <span v-if="!sortStatus">由高到低</span>
              <span v-else>由低到高 </span>
            </template>
          </button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-3 mb-5 mb-lg-0">
        <product-category></product-category>
      </div>
      <div class="col-lg-9">
        <template v-if="searchResult.length !== 0">
          <ul class="row g-3">
            <li v-for="item in searchResult" :key="item.id" class="col-lg-3 col-6 d-flex">
              <product-card :item="item" data-aos="fade-up"></product-card>
            </li>
          </ul>
          <Pagination
            class="py-5"
            :inner-pagination="pagination"
            @emit-page="getProducts"
          ></Pagination>
        </template>

        <template v-if="!isEmptyResult && searchResult.length === 0">
          <ul class="row g-3">
            <li v-for="item in filterResult" :key="item.id" class="col-lg-3 col-6 d-flex">
              <product-card :item="item" data-aos="fade-up"></product-card>
            </li>
          </ul>
          <Pagination
            class="py-5"
            :inner-pagination="pagination"
            @emit-page="getProducts"
          ></Pagination>
        </template>

        <div
          class="d-flex flex-column align-items-center text-center"
          data-aos="fade-up"
          v-else-if="isEmptyResult"
        >
          <div class="fw-bold mb-5">
            <p class="fs-4">喔不，沒有找到任何相關書籍</p>
            <p class="fs-2 mb-4">請再次輸入，火速為您尋找</p>
            <BtnMore @click.prevent="filterProduct('全部')">
              <template v-slot:text>瀏覽全部書籍</template></BtnMore
            >
          </div>
          <img src="@/assets/img/noResult.png" alt="" class="img-fluid" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCategory from '@/components/user/ProductCategory.vue'
import BtnMore from '@/components/user/BtnMore.vue'
import ProductCard from '@/components/user/ProductCard.vue'
import Pagination from '@/components/Pagination.vue'

import { mapState, mapActions } from 'pinia'
import productStore from '@/stores/product.js'

export default {
  components: {
    ProductCategory,
    ProductCard,
    Pagination,
    BtnMore
  },

  computed: {
    ...mapState(productStore, [
      'pagination',
      'filterResult',
      'searchResult',
      'searchString',
      'selectedCategory',
      'isEmptyResult',
      'sortStatus',
      'sortTarget'
    ])
  },

  methods: {
    ...mapActions(productStore, ['getProducts', 'filterProduct', 'getProductAll', 'sortProduct'])
  },

  created() {
    this.getProducts()
  }
}
</script>

<style lang="scss" scoped>
.sort-btn {
  opacity: 0.5;
  &.active {
    opacity: 1;
  }
}
</style>
