<template>
  <div class="border-0" ref="collapse">
    <SearchInput @close-collapse="hideCollapse" />
  </div>
</template>

<script>
import Collapse from 'bootstrap/js/dist/collapse'
import SearchInput from './SearchInput.vue'

export default {
  data() {
    return {
      collapse: {}
    }
  },
  components: {
    SearchInput
  },
  methods: {
    toggleCollapse() {
      this.collapse.toggle()
    },
    hideCollapse() {
      this.collapse.hide()
    },
    showCollapse() {
      this.collapse.show()
    }
  },
  watch: {
    $route(to, from) {
      this.hideCollapse()
    }
  },
  mounted() {
    this.collapse = new Collapse(this.$refs.collapse)
    setTimeout(() => {
      this.$refs.collapse.classList.remove('show')
    }, 500)
  }
}
</script>
