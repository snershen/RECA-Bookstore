<template>
  <div class="container pb-5 mb-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="fw-bold mb-5">收藏清單</h1>
    </div>
    <ul class="row g-4" v-if="collectStorage.length !== 0">
      <li v-for="item in collectStorage" :key="item.id" class="col-lg-2 col-md-4 col-sm-6 mb-lg-0">
        <ProductCard :item="item"></ProductCard>
      </li>
    </ul>
    <div class="d-flex flex-column flex-lg-row align-items-center justify-content-center" v-else>
      <p class="fs-3 col-lg-4 fw-bold text-center mb-5">尚未收藏書本，<br />快去逛逛吧！</p>
      <div class="col-lg-4">
        <img src="@/assets/img/collect-empty.png" alt="" class="img-fluid" />
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from '../../components/ProductCard.vue'

import { mapState, mapActions } from 'pinia'
import productStore from '@/stores/product.js'
export default {
  data() {
    // return { collectListStorage: [] }
  },
  computed: {
    ...mapState(productStore, ['collectStorage'])
  },
  components: { ProductCard },
  methods: {
    ...mapActions(productStore, ['getStorage'])
  },
  created() {
    this.getStorage
  }
}
</script>
