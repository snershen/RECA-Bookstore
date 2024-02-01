<template>
  <div class="collapse border-0" id="collapseExample" ref="collapse">
    <SearchInput />
  </div>
</template>

<script>
import Collapse from 'bootstrap/js/dist/collapse'

import SearchInput from './SearchInput.vue'

export default {
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
  }
}
</script>
