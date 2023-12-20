<template>
  <div>
    <ul>
      <li>
        <a
          href="#"
          class="ps-3 py-3 d-block"
          :class="{ 'bg-selected': selectedCategory === '全部' }"
          @click.prevent="filterProduct('全部'), directProductPage()"
          >全部</a
        >
      </li>
      <li v-for="item in categoryList">
        <a
          href="#"
          class="px-3 py-3 w-100"
          :class="{ 'bg-selected': selectedCategory === item }"
          @click.prevent="filterProduct(item), directProductPage()"
        >
          {{ item }}
        </a>
      </li>
    </ul>
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
    ...mapActions(productStore, ['getProducts', 'filterProduct']),
    directProductPage() {
      this.$router.push('/user/products')
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
