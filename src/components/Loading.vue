<template>
  <Loading
    :active="isLoading || articleLoading || productLoading || orderLoading || cartLoading"
    class="loading"
  >
    <div class="loading-box">
      <Vue3Lottie :animationData="BarLoaderJSON" :height="150" :width="150" />
    </div>
  </Loading>
</template>

<script>
import { mapState } from 'pinia'
import { useProductStore } from '@/stores/product.js'
import articleStore from '@/stores/article.js'
import orderStore from '@/stores/order.js'
import cartStore from '@/stores/cart.js'

import { Vue3Lottie } from 'vue3-lottie'
import BarLoaderJSON from '@/assets/js/BarLoading.js'

export default {
  data() {
    return {
      BarLoaderJSON
    }
  },
  components: {
    Vue3Lottie
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState(articleStore, { articleLoading: 'isLoading' }),
    ...mapState(useProductStore, { productLoading: 'isLoading' }),
    ...mapState(orderStore, { orderLoading: 'isLoading' }),
    ...mapState(cartStore, { cartLoading: 'isLoading' })
  }
}
</script>

<style lang="scss" scoped>
.loading-box {
  background: white;
  opacity: 0.8;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
</style>
