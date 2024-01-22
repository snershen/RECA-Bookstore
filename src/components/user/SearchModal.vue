<template>
  <div class="collapse border-0" id="collapseExample" ref="collapse">
    <div class="py-3 px-0 border-0">
      <div class="position-relative mb-3">
        <font-awesome-icon
          :icon="['fas', 'magnifying-glass']"
          class="text-dark position-absolute top-50 start-0 translate-middle-y text-gray ms-3 top-0"
        />
        <input
          type="text"
          class="form-control shadow-none ps-5 py-3"
          v-model="searchString"
          placeholder="請輸入書名"
        />
        <button
          class="btn btn-outline-secondary position-absolute end-0 top-50 translate-middle-y me-3"
          @click.prevent="handleSearch"
        >
          搜尋
        </button>
      </div>
      <div class="text-gray">
        <span>熱門關鍵字：</span>
        <a href="#" v-for="item in hotString" class="mx-2" @click.prevent="handleHotSearch(item)"
          >#{{ item }}</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import Collapse from 'bootstrap/js/dist/collapse'

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
    ...mapActions(productStore, [
      'getProducts',
      'updateSearchStr',
      'toggleCollapse',
      'getProductsAll'
    ]),

    directProductPage() {
      this.$router.push('/products')
    },

    handleSearch() {
      this.updateSearchStr(this.searchString), this.directProductPage(), this.toggleCollapse()
    },

    handleHotSearch(item) {
      this.updateSearchStr(item)
      this.directProductPage(), this.toggleCollapse()
    }
    // toggleCollapse() {
    //   this.collapse.toggle()
    // },
    // showCollapse() {
    //   this.collapse.show()
    // },
    // hideCollapse() {
    //   this.collapse.hide()
    // }
  },

  mounted() {
    // this.getProducts()
    this.getProductsAll()
    this.collapse = new Collapse(this.$refs.collapse)
  }
}
</script>
