<template>
  <div class="d-lg-block d-none">
    <ul>
      <li>
        <a
          href="#"
          class="ps-3 py-lg-3 py-2 d-block"
          :class="{ 'bg-selected': selectedCategory === '全部' }"
          @click.prevent="filterProduct('全部'), directProductPage()"
          >全部</a
        >
      </li>
      <li v-for="item in categoryList">
        <a
          href="#"
          class="px-3 py-lg-3 py-2 w-100"
          :class="{ 'bg-selected': selectedCategory === item }"
          @click.prevent="filterProduct(item), directProductPage()"
        >
          {{ item }}
        </a>
      </li>
    </ul>
  </div>

  <div class="d-lg-none">
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
    ...mapActions(productStore, ['getProducts', 'filterProduct', 'getProductsAll']),
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

<style scoped>
.bg-selected {
  background: rgb(243, 243, 243);
  font-weight: bold;
}
</style>
