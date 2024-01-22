<template>
  <LoadingComponent></LoadingComponent>
  <div>
    <Navbar class="mb-5" />
    <RouterView :key="$route.fullPath" />
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from '@/components/user/Navbar.vue'
import Footer from '@/components/user/Footer.vue'
import LoadingComponent from '@/components/Loading.vue'

import { mapState, mapActions } from 'pinia'
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
