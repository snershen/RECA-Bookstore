<template>
  <div class="nav-wrapper">
    <ul
      class="nav nav-pills mb-3 flex-nowrap text-nowrap overflow-x-scroll"
      id="pills-tab"
      role="tablist"
    >
      <li class="nav-item" role="presentation" v-for="item in categoryList" :key="item">
        <button
          class="nav-link"
          :class="{ active: selectedCategory === item }"
          id="pills-home-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-home"
          type="button"
          role="tab"
          aria-controls="pills-home"
          aria-selected="true"
          @click="handleFilter(item)"
        >
          {{ item }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useProductStore } from '@/stores/product.js'
export default {
  computed: {
    ...mapState(useProductStore, ['productList', 'categoryList', 'selectedCategory'])
  },
  methods: {
    ...mapActions(useProductStore, [
      'getProducts',
      'filterProduct',
      'getProductAll',
      'sortProduct',
      'sortTimeLower'
    ]),
    directProductPage() {
      this.$router.push('/products')
      this.searchString = ''
    },
    async handleFilter(item) {
      await this.filterProduct(item)
      await this.sortTimeLower()
    }
  },
  async created() {
    await this.getProducts()
    await this.filterProduct(this.categoryList[0])
    await this.sortTimeLower()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixin';

.nav-wrapper {
  position: relative;
  &::before,
  &::after {
    content: '';
    position: absolute;
    display: inline-block;
    width: 30px;
    height: 30px;
    top: 0;
  }
  &::before {
    left: -20px;
    background: linear-gradient(90deg, rgba(255, 252, 246, 1) 30%, rgba(255, 252, 246, 0.2) 60%);
  }
  &::after {
    right: 0px;
    background: linear-gradient(90deg, rgba(255, 252, 246, 0.2) 30%, rgba(255, 252, 246, 1) 60%);
  }
}

.nav {
  margin-left: -20px;
  overflow: hidden;
}

.nav-link {
  color: #6f6462;
  padding: 0px 20px;
  &.active {
    background: none;
    color: #121212;
    font-weight: bold;
  }
}

.nav-item + .nav-item {
  padding-top: 0;
  position: relative;
  &::after {
    content: '';
    background-color: #837674;
    display: inline-block;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 1px;
    height: 70%;
  }
}
</style>
