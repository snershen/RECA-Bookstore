<template>
  <div class="py-3 px-0 border-0">
    <div class="position-relative mb-3">
      <font-awesome-icon
        :icon="['fas', 'magnifying-glass']"
        class="text-dark position-absolute top-50 start-0 translate-middle-y text-gray ms-3 top-0"
      />
      <input
        type="text"
        class="form-control shadow-none ps-5 py-3"
        v-model.trim="searchString"
        placeholder="請輸入書名"
      />
      <button
        class="btn btn-outline-secondary position-absolute end-0 top-50 translate-middle-y me-3"
        :class="{ disabled: !searchString }"
        @click.prevent="handleSearch"
      >
        搜尋
      </button>
    </div>
    <div class="text-gray d-flex align-items-center">
      <span>熱門關鍵字：</span>
      <button
        class="btn px-2 py-0 border-0"
        type="button"
        v-for="item in hotString"
        :key="item"
        @click.prevent="handleHotSearch(item)"
      >
        #{{ item }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import productStore from '@/stores/product.js'

export default {
  data() {
    return {
      collapse: {},
      searchString: '',
      hotString: ['筆記法', '貝果', '塔羅牌']
    }
  },

  computed: {
    ...mapState(productStore, ['searchResult', 'searchStr', 'selectedCategory', 'productAll'])
  },
  methods: {
    ...mapActions(productStore, ['getProducts', 'getProductAll', 'searchProduct']),
    handleHotSearch(item) {
      this.searchProduct(item)
      this.$emit('close-collapse')
      this.$router.push('/products')
      this.searchString = ''
    },
    handleSearch() {
      this.searchProduct(this.searchString)
      this.$emit('close-collapse')
      this.$router.push('/products')
    }
  },
  mounted() {
    this.getProducts()
    this.getProductAll()
  }
}
</script>
