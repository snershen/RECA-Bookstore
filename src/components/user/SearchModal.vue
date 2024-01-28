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
          v-model.trim="searchString"
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
      'getProductAll',
      'searchProduct'
    ]),
    toggleCollapse() {
      this.collapse.toggle()
    },
    hideCollapse() {
      this.collapse.hide()
    },
    showCollapse() {
      this.collapse.show()
    },
    handleHotSearch(item) {
      // this.updateSearchStr(item)
      this.$router.push('/products')
      this.searchProduct(item)
      this.toggleCollapse()
    },
    handleSearch() {
      this.searchProduct(this.searchString)
      this.$router.push('/products')
      this.hideCollapse()
    }
  },
  watch: {
    $route(to, from) {
      this.hideCollapse()
    }
  },
  mounted() {
    // this.getProducts()
    this.getProductAll()
    this.collapse = new Collapse(this.$refs.collapse)
    setTimeout(() => {
      this.$refs.collapse.classList.remove('show')
    }, 500)
  }
}
</script>
