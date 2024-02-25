<template>
  <div class="container py-5">
    <div class="d-flex justify-content-between align-items-center mb-lg-2">
      <h1 class="fw-bold">收藏清單</h1>
    </div>
    <ul class="row g-4" v-if="collectStorage.length !== 0">
      <li
        v-for="item in collectStorage"
        :key="item.id"
        class="col-xl-2 col-lg-3 col-md-4 col-6 mb-lg-0"
      >
        <ProductCard :item="item" />
      </li>
    </ul>
    <div class="row mt-4" v-else>
      <div class="col-lg-6 offset-lg-3 text-center">
        <p class="fs-4 fs-lg-3 fw-bold mb-2">尚未收藏書本，<br />快去逛逛吧！</p>
        <RouterLink :to="{ name: 'products' }" class="mb-4"
          ><BtnMore><template v-slot:text>瀏覽書籍</template></BtnMore></RouterLink
        >
      </div>
      <div class="col-lg-4 offset-lg-4 text-center">
        <img src="@/assets/img/collect-empty.png" alt="無收藏清單" class="img-fluid" />
      </div>
    </div>
  </div>
</template>

<script>
import BtnMore from '@/components/user/BtnMore.vue'
import ProductCard from '@/components/user/ProductCard.vue'

import { mapState, mapActions } from 'pinia'
import { useProductStore } from '@/stores/product.js'
export default {
  computed: {
    ...mapState(useProductStore, ['collectStorage'])
  },
  components: { ProductCard, BtnMore },
  methods: {
    ...mapActions(useProductStore, ['getStorage'])
  },
  created() {
    this.getStorage()
  }
}
</script>

<style lang="scss" scoped></style>
