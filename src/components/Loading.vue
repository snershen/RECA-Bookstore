<template>
  <Loading :active="isLoading">
    <div class="loading-box">
      <img src="@/assets/img/icons8-book4.gif" alt="" />
    </div>
  </Loading>
</template>

<script>
import { mapState } from 'pinia'
import productStore from '@/stores/product.js'
import cartStore from '@/stores/cart.js'

export default {
  computed: {
    ...mapState(productStore, ['isLoading'])
  }
}
</script>
