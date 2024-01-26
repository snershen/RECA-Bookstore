<template>
  <div class="d-md-block d-none">
    <div class="text-white bg-dark py-3 text-start w-100 rounded-0 px-4">所有分類</div>
    <ul class="border">
      <li>
        <a
          href="#"
          class="px-4 py-lg-3 py-2 d-block fs-6"
          :class="{ 'bg-selected': selectedCategory === '全部' }"
          @click.prevent="filterProduct('全部'), directProductPage()"
          >全部</a
        >
      </li>
      <li v-for="item in categoryList">
        <a
          href="#"
          class="px-4 py-lg-3 py-2 w-100 fs-6"
          :class="{ 'bg-selected': selectedCategory === item }"
          @click.prevent="filterProduct(item), directProductPage()"
        >
          {{ item }}
        </a>
      </li>
    </ul>
  </div>

  <div class="d-md-none d-block">
    <a
      class="btn btn-dark py-3 fw-bold text-start w-100 rounded-0"
      data-bs-toggle="collapse"
      href="#collapseExample"
      role="button"
      aria-expanded="false"
      aria-controls="collapseExample"
    >
      所有分類
    </a>
    <div class="collapse border" id="collapseExample">
      <ul>
        <li>
          <a
            href="#"
            class="ps-3 py-lg-3 py-2 d-block fs-6"
            :class="{ 'bg-selected': selectedCategory === '全部' }"
            @click.prevent="filterProduct('全部'), directProductPage()"
            >全部</a
          >
        </li>
        <li v-for="item in categoryList">
          <a
            href="#"
            class="px-3 py-lg-3 py-2 w-100 fs-6"
            :class="{ 'bg-selected': selectedCategory === item }"
            @click.prevent="filterProduct(item), directProductPage()"
          >
            {{ item }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import productStore from '@/stores/product.js'

export default {
  computed: {
    ...mapState(productStore, ['productList', 'categoryList', 'selectedCategory'])
  },
  methods: {
    ...mapActions(productStore, ['getProducts', 'filterProduct', 'getProductAll']),
    directProductPage() {
      this.$router.push('/products')
      this.searchString = ''
    }
  },
  created() {
    this.getProducts()
  }
}
</script>

<style lang="scss" scoped>
.bg-selected {
  background: rgb(243, 243, 243);
  // font-weight: bold;
  &:hover {
    color: inherit;
  }
}
</style>
