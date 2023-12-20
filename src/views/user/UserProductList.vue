<template>
  <LoadingComponent></LoadingComponent>
  <div class="container mb-5">
    <h1 class="fw-bold mb-4 ps-2">全部書籍</h1>
    <div class="row">
      <div class="col-3">
        <product-category></product-category>
      </div>
      <div class="col-9">
        <ul class="row g-3" v-if="searchResult.length === 0 && filterResult.length === 0">
          <li v-for="item in productList" class="col-3 d-flex">
            <product-card :item="item"></product-card>
          </li>
        </ul>
        <ul class="row g-3" v-else-if="searchResult.length === 0 && filterResult.length !== 0">
          <li v-for="item in filterResult" class="col-3 d-flex">
            <product-card :item="item"></product-card>
          </li>
        </ul>
        <ul class="row g-3" v-if="searchResult.length !== 0">
          <li v-for="item in searchResult" class="col-3 d-flex">
            <product-card :item="item"></product-card>
          </li>
        </ul>
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
  data() {
    return {}
  },

  components: {
    ProductCategory,
    ProductCard,
    LoadingComponent
  },

  computed: {
    ...mapState(productStore, ['productList', 'filterResult', 'searchResult'])
  },

  methods: {
    ...mapActions(productStore, ['getProducts'])
  },

  created() {
    this.getProducts()
  }
}
</script>
