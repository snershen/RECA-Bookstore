<template>
  <LoadingComponent />
  <div class="main-content">
    <Navbar />
    <RouterView :key="$route.fullPath" class="mt-5" />
  </div>
  <Footer />
</template>

<script>
import Navbar from '@/components/user/Navbar.vue'
import Footer from '@/components/user/Footer.vue'
import LoadingComponent from '@/components/Loading.vue'

import { mapActions } from 'pinia'
import cartStore from '@/stores/cart.js'

export default {
  components: { Navbar, Footer, LoadingComponent },
  methods: {
    ...mapActions(cartStore, ['getCart'])
  },
  created() {
    this.getCart()
  }
}
</script>

<style lang="scss" scoped>
.main-content {
  min-height: calc(100vh - 232px);
}
</style>
