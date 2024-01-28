<template>
  <Loading :active="articleLoading || productLoading || orderLoading || cartLoading || isLoading">
    <div class="loading-box">
      <Vue3Lottie :animationData="BarLoaderJSON" :height="150" :width="150" />
      <!-- <lottie-player
        autoplay
        controls
        loop
        mode="normal"
        src="https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json"
        style="width: 320px"
      ></lottie-player> -->

      <!-- <img src="@/assets/img/icons8-book4.gif" alt="loading" /> -->
    </div>
  </Loading>
</template>

<script>
import { mapState } from 'pinia'
import productStore from '@/stores/product.js'
import articleStore from '@/stores/article.js'
import orderStore from '@/stores/order.js'
import cartStore from '@/stores/cart.js'

// import { onMounted, ref } from 'vue'
// import BarLoaderJSON from '@/assets/js/AnikiHamster.json'
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
    ...mapState(productStore, { productLoading: 'isLoading' }),
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
  z-index: 1000;
}
</style>
