<template>
  <Loading :active="articleLoading || productLoading || orderLoading || cartLoading">
    <div class="loading-box">
      <img src="@/assets/img/icons8-book4.gif" alt="loading" />
    </div>
  </Loading>
</template>

<script>
import { mapState } from 'pinia'
import productStore from '@/stores/product.js'
import articleStore from '@/stores/article.js'
import orderStore from '@/stores/order.js'
import cartStore from '@/stores/cart.js'

export default {
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
  opacity: 1;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
</style>
