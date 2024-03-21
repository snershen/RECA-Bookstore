<template>
  <LoadingComponent />
  <div class="main-content">
    <NavbarComponent />
    <RouterView :key="$route.fullPath" class="mt-5" />
  </div>
  <FooterComponent />
</template>

<script>
import NavbarComponent from '@/components/user/NavbarComponent.vue'
import FooterComponent from '@/components/user/FooterComponent.vue'
import LoadingComponent from '@/components/LoadingComponent.vue'

import { mapActions } from 'pinia'
import cartStore from '@/stores/cart.js'

export default {
  components: { NavbarComponent, FooterComponent, LoadingComponent },
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
