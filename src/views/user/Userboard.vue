<template>
  <div>
    <navbar class="mb-5"></navbar>
    <RouterView :key="$route.fullPath" />
    <Footer></Footer>
  </div>
</template>

<script>
import navbar from '../../components/Header.vue'
import Footer from '../../components/Footer.vue'

import { mapState, mapActions } from 'pinia'
import cartStore from '@/stores/cart.js'

export default {
  components: { navbar, Footer },
  methods: {
    ...mapActions(cartStore, ['getCart'])
  },
  created() {
    this.getCart()
  }
}
</script>
