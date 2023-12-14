<template>
  <div class="collapse border-0 bg-light border-bottom" id="collapseExample" ref="collapse">
    <div class="card card-body py-3 container px-0 border-0 bg-light">
      <div class="position-relative mb-3">
        <font-awesome-icon
          :icon="['fas', 'magnifying-glass']"
          class="text-dark position-absolute top-50 start-0 translate-middle-y text-gray ms-3 position-absolute top-0"
        />
        <input
          type="text"
          class="form-control shadow-none ps-5 py-3"
          v-model="searchString"
          placeholder="請輸入書名"
        />
        <button
          class="btn btn-outline-dark position-absolute end-0 top-50 translate-middle-y me-3"
          @click.prevent="goFilterPage(searchString)"
        >
          搜尋
        </button>
      </div>
      <div class="text-gray">
        <span>熱門關鍵字：</span>
        <a href="#">#神在他方</a>
      </div>
    </div>
  </div>
</template>

<script>
// import modalMixin from '../mixins/modalMixin'
import Collapse from 'bootstrap/js/dist/collapse'
export default {
  // mixins: [modalMixin]
  data() {
    return {
      collapse: {},
      searchString: ''
    }
  },
  methods: {
    toggleCollapse() {
      this.collapse.toggle()
    },
    hideCollapse() {
      this.collapse.hide()
      console.log('hide')
    },
    showCollapse() {
      this.collapse.show()
      console.log('hide')
    },
    goFilterPage(search) {
      const searchStr = search.trim()

      this.$router.push(`/user/products?search=${searchStr}`)
      this.isShow = false
    }
  },
  mounted() {
    this.collapse = new Collapse(this.$refs.collapse)
    this.hideCollapse()
    this.$nextTick(() => {
      this.collapse.classList.remove('show')
    })
  }
}
</script>

<style scoped>
.modal-dialog {
  width: 100%;
  max-width: 50%;
}
</style>
