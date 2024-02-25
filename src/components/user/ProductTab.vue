<template>
  <ul class="nav border-bottom mb-3">
    <template v-if="singleProduct.content">
      <li class="nav-item" @click.prevent="content = singleProduct.content">
        <a
          class="nav-link fs-6 ps-2"
          aria-current="page"
          href="#"
          :class="{ active: content === singleProduct.content }"
          >本書簡介</a
        >
      </li>
    </template>
    <template v-if="singleProduct.author_content">
      <li class="nav-item">
        <a
          class="nav-link fs-6"
          href="#"
          :class="{ active: content === singleProduct.author_content }"
          @click.prevent="content = singleProduct.author_content"
          >作者介紹</a
        >
      </li>
    </template>
    <template v-if="singleProduct.description">
      <li class="nav-item">
        <a
          class="nav-link fs-6"
          href="#"
          :class="{ active: content === singleProduct.description }"
          @click.prevent="content = singleProduct.description"
          >目錄</a
        >
      </li>
    </template>
  </ul>
  <ul>
    <li v-html="content"></li>
  </ul>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useProductStore } from '@/stores/product.js'

export default {
  data() {
    return {
      content: ''
    }
  },

  computed: {
    ...mapState(useProductStore, ['singleProduct', 'singleProductId'])
  },
  methods: {
    ...mapActions(useProductStore, ['getSingleProduct'])
  },
  async created() {
    await this.getSingleProduct(this.$route.params.id)
    this.content = await this.singleProduct.content
  }
}
</script>

<style lang="scss" scoped>
.nav-link {
  color: rgb(159, 159, 159);
  &.active {
    color: #000;
  }
}
</style>
