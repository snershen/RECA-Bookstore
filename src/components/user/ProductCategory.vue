<template>
  <div class="d-md-block d-none">
    <div class="text-white bg-dark py-3 text-start w-100 rounded-0 px-4">所有分類</div>
    <ul class="border">
      <li>
        <RouterLink
          :to="{ name: 'products' }"
          class="px-4 py-lg-3 py-2 d-block fs-6"
          :class="{
            'bg-selected': !Object.keys(singleProduct).length && selectedCategory === '全部'
          }"
          @click.prevent="filterProduct('全部')"
          >全部</RouterLink
        >
      </li>
      <li v-for="item in categoryList">
        <RouterLink
          :to="{ name: 'products' }"
          class="px-4 py-lg-3 py-2 w-100 fs-6"
          :class="{
            'bg-selected':
              (singleProduct && singleProduct.category === item) ||
              (!Object.keys(singleProduct).length && selectedCategory === item)
          }"
          @click.prevent="filterProduct(item)"
        >
          {{ item }}
        </RouterLink>
      </li>
    </ul>
  </div>

  <!-- phone -->
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
          <RouterLink
            :to="{ name: 'products' }"
            class="ps-3 py-lg-3 py-2 d-block fs-6"
            :class="{
              'bg-selected': !Object.keys(singleProduct).length && selectedCategory === '全部'
            }"
            @click="filterProduct('全部')"
            >全部</RouterLink
          >
        </li>
        <li v-for="item in categoryList">
          <RouterLink
            :to="{ name: 'products' }"
            class="px-3 py-lg-3 py-2 w-100 fs-6"
            :class="{
              'bg-selected':
                (singleProduct && singleProduct.category === item) ||
                (!Object.keys(singleProduct).length && selectedCategory === item)
            }"
            @click.prevent="filterProduct(item)"
          >
            {{ item }}
          </RouterLink>
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
    ...mapState(productStore, ['categoryList', 'selectedCategory', 'singleProduct'])
  },
  methods: {
    ...mapActions(productStore, ['filterProduct', 'getProductAll'])
  },
  created() {
    this.getProductAll()
  }
}
</script>

<style lang="scss" scoped>
.bg-selected {
  background: rgb(243, 243, 243);
  font-weight: bold;
  &:hover {
    color: inherit;
  }
}
</style>
